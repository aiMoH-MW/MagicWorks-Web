/**
 * rescore-last-4-days.mjs
 *
 * Re-scores every career application submitted in the last 4 days (regardless
 * of whether it already has an ai_score — this is a deliberate refresh, not
 * the "only unscored" behavior of /api/admin/rescore's default batch mode)
 * using the now-fixed CTC guardrail:
 *   - internships now have a hidden internalScoringBudget (₹5,000-7,000/mo)
 *     so the guardrail engages instead of silently no-op'ing on the vague
 *     public "Performance-based" salary text
 *   - a new extreme-mismatch override force-caps the overall score (not just
 *     ctc_score) when expected CTC is more than 3x the role's budget
 *
 * This mirrors lib/gemini-score.ts + app/api/admin/rescore/route.ts exactly
 * (kept as a standalone plain-JS script, not a TS import, so it can run with
 * plain `node` — no ts-node/tsx dependency needed).
 *
 * Run: node scripts/rescore-last-4-days.mjs
 * Requires .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 * GEMINI_API_KEY, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * SANITY_API_TOKEN.
 */

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createSanityClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// ── Load .env.local ─────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
if (!fs.existsSync(envPath)) { console.error("❌  .env.local not found"); process.exit(1); }

const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const [kk, ...v] = line.split("=");
  if (kk?.trim() && v.length) env[kk.trim()] = v.join("=").trim().replace(/^['"]|['"]$/g, "");
}

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const GEMINI_API_KEY = env.GEMINI_API_KEY;
const SANITY_PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const SANITY_TOKEN = env.SANITY_API_TOKEN;

for (const [k, v] of Object.entries({
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: SUPABASE_KEY,
  GEMINI_API_KEY,
  NEXT_PUBLIC_SANITY_PROJECT_ID: SANITY_PROJECT_ID,
  SANITY_API_TOKEN: SANITY_TOKEN,
})) {
  if (!v) { console.error(`❌  ${k} missing from .env.local`); process.exit(1); }
}

const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_KEY);
const sanity = createSanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: SANITY_TOKEN,
  useCdn: false,
});

const RESUME_BUCKET = "resumes";
const DAYS_BACK = 4;

// ── parseAnnualINR — identical logic to lib/gemini-score.ts ────────────────
function parseAnnualINR(raw) {
  if (!raw) return null;
  const s = raw.toLowerCase().replace(/,/g, "").trim();
  if (!s || /^(na|n\/a|none|nil|-)$/.test(s)) return null;

  const nums = (s.match(/\d+(\.\d+)?/g) || []).map(Number).filter((n) => n > 0);
  if (nums.length === 0) return null;

  const n = Math.max(...nums);
  const hasLpaMarker = /lpa|lakh|\blac\b|\bl\b/.test(s);
  if (hasLpaMarker) return n * 100000;

  if (n < 100) return n * 100000;
  if (n >= 200000) return n;
  if (n >= 1000) return n * 12;
  return n * 100000;
}

const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// ── scoreApplication — identical logic to lib/gemini-score.ts ──────────────
async function scoreApplication(app) {
  const signals = [
    !!app.phone,
    !!app.linkedin_url,
    !!app.portfolio_url,
    !!(app.cover_letter && app.cover_letter.trim()),
    !!app.resumeBuffer,
  ];
  const profileScore = signals.filter(Boolean).length * 20;
  const profileDetails = [
    app.phone ? "✓ Phone" : "✗ Phone",
    app.linkedin_url ? "✓ LinkedIn" : "✗ LinkedIn",
    app.portfolio_url ? "✓ Portfolio" : "✗ Portfolio",
    app.cover_letter ? "✓ Cover letter" : "✗ Cover letter",
    app.resumeBuffer ? "✓ Resume" : "✗ Resume",
  ].join(", ");

  const prompt = `You are a senior HR recruiter at MagicWorks, an AI-first digital marketing agency in Pune, India.

Evaluate the job application below and respond ONLY with a valid JSON object — no markdown, no code fences, no explanation.

═══ APPLICATION ═══
ROLE:                ${app.job_title}
ROLE'S BUDGETED CTC:  ${app.job_salary_range || "Not specified for this posting"}
APPLICANT:           ${app.name}
TOTAL EXP:           ${app.total_experience || "Not provided"}
RELEVANT EXP:        ${app.relevant_experience || "Not provided"}
CURRENT CTC:         ${app.current_ctc || "Not provided"}
EXPECTED CTC:        ${app.expected_ctc || "Not provided"}
LINKEDIN:            ${app.linkedin_url || "Not provided"}
PORTFOLIO:           ${app.portfolio_url || "Not provided"}
COVER LETTER:        ${(app.cover_letter && app.cover_letter.trim()) || "Not provided"}
PROFILE CHECK:       ${profileDetails}
RESUME:              ${app.resumeBuffer ? "Attached as PDF — analyse it" : "Not provided"}
═══════════════════

Score each dimension 0–100 (integers only):

resume_score      — How well does the resume content match the role requirements?
                    0 = no resume. Assess skills, relevant experience, education fit.
experience_score  — Does TOTAL EXP and RELEVANT EXP match the seniority this role needs?
                    0 = no experience info. Weight RELEVANT EXP higher than TOTAL EXP —
                    a candidate with less total experience but directly relevant experience
                    should score higher than one with more total but unrelated experience.
                    Missing/unclear = 50 (neutral).
cover_score       — Quality and role-relevance of the cover letter.
                    0 = blank or copy-paste generic. Reward specificity and genuine motivation.
profile_score     — Use exactly ${profileScore} (pre-calculated based on fields present).
ctc_score         — Compare the applicant's EXPECTED CTC against THIS ROLE'S BUDGETED CTC
                    above — not a generic Indian-market guess. This posting's budget is the
                    only number that matters here.
                    Expected CTC at or below the top of the budgeted range: 80–100.
                    Expected CTC up to ~20% above the top of the budgeted range: 50–70
                    (possibly negotiable, but note the gap).
                    Expected CTC more than ~20% above the top of the budgeted range: 10–30.
                    Score low here regardless of how strong the rest of the profile is —
                    a candidate who will not accept an offer at this budget is a poor fit
                    for this specific opening, however qualified they are on paper.
                    If ROLE'S BUDGETED CTC is not specified, or EXPECTED CTC is not provided,
                    use 50 (neutral) and say so in the summary.

overall_score — Weighted: resume 30% + experience 20% + cover 20% + profile 10% + ctc 20%.
label         — "Strong Fit" if overall ≥ 80, "Good Fit" ≥ 60, "Moderate Fit" ≥ 40, else "Weak Fit".
summary       — 2–3 sentences for the HR manager. Lead with the strongest signal, then the key concern. Be specific and actionable.

Respond with ONLY this JSON (no extra keys, no markdown):
{"resume_score":0,"experience_score":0,"cover_score":0,"profile_score":${profileScore},"ctc_score":0,"overall_score":0,"label":"Moderate Fit","summary":"..."}`;

  const parts = [];
  if (app.resumeBuffer && app.resumeMimeType === "application/pdf") {
    const maxBytes = 4 * 1024 * 1024;
    if (app.resumeBuffer.length <= maxBytes) {
      parts.push({ inline_data: { mime_type: "application/pdf", data: app.resumeBuffer.toString("base64") } });
    }
  }
  parts.push({ text: prompt });

  try {
    // Retry on 429 (rate limit / quota) with increasing backoff — the flat
    // 1s-between-applications delay isn't enough once a batch this size hits
    // a lower-tier RPM cap; back off and retry a few times before giving up.
    const MAX_ATTEMPTS = 4;
    let res;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      res = await fetch(`${ENDPOINT}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 512,
            responseMimeType: "application/json",
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      });

      if (res.ok) break;
      if (res.status !== 429 || attempt === MAX_ATTEMPTS) break;

      const backoffMs = attempt * 15000; // 15s, 30s, 45s
      console.log(`   ⏳  429 rate limit — waiting ${backoffMs / 1000}s before retry ${attempt + 1}/${MAX_ATTEMPTS}…`);
      await new Promise((r) => setTimeout(r, backoffMs));
    }

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini HTTP ${res.status}: ${err.slice(0, 200)}`);
    }

    const data = await res.json();
    const allParts = data?.candidates?.[0]?.content?.parts ?? [];
    const textPart = allParts.find((p) => !p.thought && p.text != null);
    const raw = textPart?.text ?? "";
    const clean = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(clean);

    const required = ["resume_score", "experience_score", "cover_score", "profile_score", "ctc_score", "overall_score", "label", "summary"];
    for (const f of required) if (parsed[f] === undefined) throw new Error(`Missing field: ${f}`);

    let resumeScore = Math.round(Number(parsed.resume_score));
    let experienceScore = Math.round(Number(parsed.experience_score));
    let coverScore = Math.round(Number(parsed.cover_score));
    let profileScoreOut = Math.round(Number(parsed.profile_score));
    let ctcScore = Math.round(Number(parsed.ctc_score));
    let overallScore = Math.round(Number(parsed.overall_score));
    let summary = parsed.summary;

    const budgetMax = parseAnnualINR(app.job_salary_range);
    const expectedCtc = parseAnnualINR(app.expected_ctc);
    if (budgetMax && expectedCtc) {
      const overBudgetRatio = expectedCtc / budgetMax;
      let cappedCtcScore = null;
      if (overBudgetRatio > 1.5) cappedCtcScore = Math.min(ctcScore, 20);
      else if (overBudgetRatio > 1.2) cappedCtcScore = Math.min(ctcScore, 45);

      if (cappedCtcScore !== null && cappedCtcScore < ctcScore) {
        ctcScore = cappedCtcScore;
        overallScore = Math.round(resumeScore * 0.30 + experienceScore * 0.20 + coverScore * 0.20 + profileScoreOut * 0.10 + ctcScore * 0.20);
        const pct = Math.round((overBudgetRatio - 1) * 100);
        summary = `${summary} (CTC guardrail: expected CTC is ~${pct}% above this role's budgeted range — ctc_score and overall score adjusted down accordingly.)`;
      }

      const EXTREME_OVER_BUDGET_RATIO = 3.0;
      const EXTREME_OVERALL_CAP = 35;
      if (overBudgetRatio > EXTREME_OVER_BUDGET_RATIO && overallScore > EXTREME_OVERALL_CAP) {
        overallScore = EXTREME_OVERALL_CAP;
        const pct = Math.round(overBudgetRatio * 100);
        summary = `${summary} (Extreme CTC mismatch: expected CTC is ~${pct}% of this role's budgeted ceiling — more than 3x over budget. Overall score capped regardless of other signals; this candidate is very unlikely to accept an offer within budget.)`;
      }
    }

    const label = overallScore >= 80 ? "Strong Fit" : overallScore >= 60 ? "Good Fit" : overallScore >= 40 ? "Moderate Fit" : "Weak Fit";

    return {
      overall_score: overallScore,
      breakdown: { resume_score: resumeScore, experience_score: experienceScore, cover_score: coverScore, profile_score: profileScoreOut, ctc_score: ctcScore },
      label,
      summary,
    };
  } catch (err) {
    console.error("[score] Failed:", err.message);
    return null;
  }
}

// ── Sanity job lookup (with internalScoringBudget), cached per slug ────────
const salaryCache = new Map();
async function getSalaryForSlug(slug) {
  if (!slug) return null;
  if (salaryCache.has(slug)) return salaryCache.get(slug);
  const job = await sanity
    .fetch(`*[_type == "jobOpening" && slug.current == $slug][0]{ salary, internalScoringBudget }`, { slug })
    .catch(() => null);
  const salary = job?.internalScoringBudget || job?.salary || null;
  salaryCache.set(slug, salary);
  return salary;
}

async function main() {
  const cutoff = new Date(Date.now() - DAYS_BACK * 24 * 3600 * 1000).toISOString();
  console.log(`🔍  Fetching applications since ${cutoff} (last ${DAYS_BACK} days)…\n`);

  const { data: apps, error } = await supabase
    .from("career_applications")
    .select("id, job_title, job_slug, name, total_experience, relevant_experience, current_ctc, expected_ctc, phone, linkedin_url, portfolio_url, cover_letter, resume_url, ai_score, ai_score_label, created_at")
    .gte("created_at", cutoff)
    .order("created_at", { ascending: false });

  if (error) { console.error("❌  Supabase query failed:", error.message); process.exit(1); }
  if (!apps || apps.length === 0) { console.log("No applications found in this window."); return; }

  console.log(`Found ${apps.length} application(s) to rescore.\n`);

  let scored = 0, failed = 0;

  for (const app of apps) {
    try {
      let resumeBuffer = null;
      let resumeMimeType = null;
      if (app.resume_url && !app.resume_url.startsWith("http")) {
        const { data: fileData, error: dlErr } = await supabase.storage.from(RESUME_BUCKET).download(app.resume_url);
        if (!dlErr && fileData) {
          const buf = Buffer.from(await fileData.arrayBuffer());
          if (app.resume_url.endsWith(".pdf") && buf.length <= 4 * 1024 * 1024) {
            resumeBuffer = buf;
            resumeMimeType = "application/pdf";
          }
        }
      }

      const job_salary_range = await getSalaryForSlug(app.job_slug);

      const score = await scoreApplication({
        job_title: app.job_title || app.job_slug || "Unknown Role",
        job_slug: app.job_slug || "",
        job_salary_range,
        name: app.name,
        total_experience: app.total_experience,
        relevant_experience: app.relevant_experience,
        current_ctc: app.current_ctc,
        expected_ctc: app.expected_ctc,
        phone: app.phone,
        linkedin_url: app.linkedin_url,
        portfolio_url: app.portfolio_url,
        cover_letter: app.cover_letter,
        resumeBuffer,
        resumeMimeType,
      });

      if (!score) { failed++; console.log(`⚠️   ${app.name} (${app.job_title}): scoring returned null — skipped`); continue; }

      const { error: updateErr } = await supabase
        .from("career_applications")
        .update({
          ai_score: score.overall_score,
          ai_score_breakdown: score.breakdown,
          ai_score_label: score.label,
          ai_score_summary: score.summary,
          ai_scored_at: new Date().toISOString(),
        })
        .eq("id", app.id);

      if (updateErr) { failed++; console.error(`❌  ${app.name}: DB update failed — ${updateErr.message}`); continue; }

      scored++;
      const before = app.ai_score != null ? `${app.ai_score} (${app.ai_score_label})` : "unscored";
      const after = `${score.overall_score} (${score.label})`;
      const changed = before !== after ? "  ← CHANGED" : "";
      console.log(`✅  ${app.name.padEnd(28)} ${app.job_title.slice(0, 30).padEnd(32)} ${before} -> ${after}${changed}`);

      await new Promise((r) => setTimeout(r, 4000)); // stay well within Gemini rate limits
    } catch (err) {
      failed++;
      console.error(`❌  ${app.name}: ${err.message}`);
    }
  }

  console.log(`\n🎉  Done. Scored: ${scored}, Failed: ${failed}, Total: ${apps.length}\n`);
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
