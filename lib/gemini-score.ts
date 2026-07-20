/**
 * lib/gemini-score.ts
 * AI-powered candidate screening using Gemini 1.5 Flash.
 * Called server-side after every career application submission.
 */

export interface ScoreBreakdown {
  resume_score: number;
  experience_score: number;
  cover_score: number;
  profile_score: number;
  ctc_score: number;
}

export interface ScoreResult {
  overall_score: number;
  breakdown: ScoreBreakdown;
  label: "Strong Fit" | "Good Fit" | "Moderate Fit" | "Weak Fit";
  summary: string;
}

export interface ApplicationInput {
  job_title: string;
  job_slug: string;
  name: string;
  total_experience?: string | null;
  relevant_experience?: string | null;
  current_ctc?: string | null;
  expected_ctc?: string | null;
  phone?: string | null;
  linkedin_url?: string | null;
  portfolio_url?: string | null;
  cover_letter?: string | null;
  resumeBuffer?: Buffer | null;
  resumeMimeType?: string | null;
  /** The role's own posted salary/stipend range, e.g. "₹2.50 to 3.60 LPA" — from
   *  the Sanity job listing. Used to score CTC fit against THIS role's actual
   *  budget rather than a generic market-rate guess. */
  job_salary_range?: string | null;
}

/**
 * Best-effort parse of a free-text CTC/salary string into an annual INR figure.
 * Used only as a deterministic safety net on top of the LLM's ctc_score — real
 * applicant data is messy ("84000", "3.5 LPA", "3 to 3.6 LPA", "NA"), so this
 * returns null whenever it can't parse confidently rather than guessing.
 */
function parseAnnualINR(raw?: string | null): number | null {
  if (!raw) return null;
  const s = raw.toLowerCase().replace(/,/g, "").trim();
  if (!s || /^(na|n\/a|none|nil|-)$/.test(s)) return null;

  const nums = (s.match(/\d+(\.\d+)?/g) || []).map(Number).filter((n) => n > 0);
  if (nums.length === 0) return null;

  // Ranges ("3 to 3.6 LPA") — use the upper bound, it's the more conservative
  // figure for both "job budget" (max they'll pay) and "candidate expects".
  const n = Math.max(...nums);

  const hasLpaMarker = /lpa|lakh|\blac\b|\bl\b/.test(s);
  if (hasLpaMarker) return n * 100000;

  // No LPA marker — a small bare number ("3.5", "6") is almost always meant as
  // LPA shorthand; a large one is a raw rupee figure that could be monthly or
  // annual depending on magnitude.
  if (n < 100) return n * 100000;
  if (n >= 200000) return n;      // already looks annual
  if (n >= 1000) return n * 12;   // looks monthly -> annualize
  return n * 100000;
}

const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export async function scoreApplication(
  app: ApplicationInput,
): Promise<ScoreResult | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("[gemini-score] GEMINI_API_KEY not set — skipping scoring");
    return null;
  }

  // Pre-calculate profile completeness (each of 5 signals = 20 pts)
  const signals = [
    !!app.phone,
    !!app.linkedin_url,
    !!app.portfolio_url,
    !!app.cover_letter?.trim(),
    !!app.resumeBuffer,
  ];
  const profileScore = signals.filter(Boolean).length * 20;
  const profileDetails = [
    app.phone          ? "✓ Phone"     : "✗ Phone",
    app.linkedin_url   ? "✓ LinkedIn"  : "✗ LinkedIn",
    app.portfolio_url  ? "✓ Portfolio" : "✗ Portfolio",
    app.cover_letter   ? "✓ Cover letter" : "✗ Cover letter",
    app.resumeBuffer   ? "✓ Resume"    : "✗ Resume",
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
COVER LETTER:        ${app.cover_letter?.trim() || "Not provided"}
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

  // Build content parts — attach PDF resume if available
  const parts: object[] = [];

  if (app.resumeBuffer && app.resumeMimeType === "application/pdf") {
    const maxBytes = 4 * 1024 * 1024; // 4 MB inline limit
    if (app.resumeBuffer.length <= maxBytes) {
      parts.push({
        inline_data: {
          mime_type: "application/pdf",
          data: app.resumeBuffer.toString("base64"),
        },
      });
    }
  }

  parts.push({ text: prompt });

  try {
    const res = await fetch(`${ENDPOINT}?key=${apiKey}`, {
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

    if (!res.ok) {
      const err = await res.text();
      console.error("[gemini-score] API error", res.status, err.slice(0, 500));
      throw new Error(`Gemini HTTP ${res.status}: ${err.slice(0, 200)}`);
    }

    const data = await res.json();
    // Thinking models return thought parts first — find the actual text part
    const allParts: Array<{ text?: string; thought?: boolean }> =
      data?.candidates?.[0]?.content?.parts ?? [];
    const textPart = allParts.find((p) => !p.thought && p.text != null);
    const raw: string = textPart?.text ?? "";

    // Strip any accidental code fences
    const clean = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(clean);

    // Validate required fields
    const required = [
      "resume_score",
      "experience_score",
      "cover_score",
      "profile_score",
      "ctc_score",
      "overall_score",
      "label",
      "summary",
    ];
    for (const f of required) {
      if (parsed[f] === undefined) throw new Error(`Missing field: ${f}`);
    }

    let resumeScore     = Math.round(Number(parsed.resume_score));
    let experienceScore = Math.round(Number(parsed.experience_score));
    let coverScore       = Math.round(Number(parsed.cover_score));
    let profileScoreOut  = Math.round(Number(parsed.profile_score));
    let ctcScore         = Math.round(Number(parsed.ctc_score));
    let overallScore     = Math.round(Number(parsed.overall_score));
    let summary: string  = parsed.summary;

    // ── Deterministic CTC guardrail ────────────────────────────────────────
    // The LLM is asked to score CTC fit against the role's actual budget, but
    // free-text numbers are exactly the kind of thing an LLM can misjudge
    // (temperature is low but not zero). Where both figures parse confidently,
    // hard-cap ctc_score and recompute the overall score so a candidate who
    // wants well beyond budget can never outscore a well-matched one on CTC
    // grounds alone — this is not left to the model's discretion.
    const budgetMax = parseAnnualINR(app.job_salary_range);
    const expectedCtc = parseAnnualINR(app.expected_ctc);
    if (budgetMax && expectedCtc) {
      const overBudgetRatio = expectedCtc / budgetMax;
      let cappedCtcScore: number | null = null;
      if (overBudgetRatio > 1.5) cappedCtcScore = Math.min(ctcScore, 20);
      else if (overBudgetRatio > 1.2) cappedCtcScore = Math.min(ctcScore, 45);

      if (cappedCtcScore !== null && cappedCtcScore < ctcScore) {
        ctcScore = cappedCtcScore;
        overallScore = Math.round(
          resumeScore * 0.30 +
          experienceScore * 0.20 +
          coverScore * 0.20 +
          profileScoreOut * 0.10 +
          ctcScore * 0.20
        );
        const pct = Math.round((overBudgetRatio - 1) * 100);
        summary = `${summary} (CTC guardrail: expected CTC is ~${pct}% above this role's budgeted range — ctc_score and overall score adjusted down accordingly.)`;
      }
    }

    const label: ScoreResult["label"] =
      overallScore >= 80 ? "Strong Fit" :
      overallScore >= 60 ? "Good Fit" :
      overallScore >= 40 ? "Moderate Fit" : "Weak Fit";

    return {
      overall_score: overallScore,
      breakdown: {
        resume_score:     resumeScore,
        experience_score: experienceScore,
        cover_score:      coverScore,
        profile_score:    profileScoreOut,
        ctc_score:        ctcScore,
      },
      label,
      summary,
    };
  } catch (err) {
    console.error("[gemini-score] Failed:", err);
    return null;
  }
}
