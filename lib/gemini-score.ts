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
ROLE:          ${app.job_title}
APPLICANT:     ${app.name}
TOTAL EXP:     ${app.total_experience || "Not provided"}
RELEVANT EXP:  ${app.relevant_experience || "Not provided"}
CURRENT CTC:   ${app.current_ctc || "Not provided"}
EXPECTED CTC:  ${app.expected_ctc || "Not provided"}
LINKEDIN:      ${app.linkedin_url || "Not provided"}
PORTFOLIO:     ${app.portfolio_url || "Not provided"}
COVER LETTER:  ${app.cover_letter?.trim() || "Not provided"}
PROFILE CHECK: ${profileDetails}
RESUME:        ${app.resumeBuffer ? "Attached as PDF — analyse it" : "Not provided"}
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
ctc_score         — Is the expected CTC realistic for this role at an Indian agency in 2026?
                    Interns/stipend: ₹5K–25K/month = 80–100. Way above = 20–40.
                    Freshers/juniors: ₹3–8 LPA = 80–100.
                    Seniors: ₹6–18 LPA = 80–100.
                    Missing = 50 (neutral).

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
      console.error("[gemini-score] API error", res.status, err.slice(0, 300));
      return null;
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

    return {
      overall_score: Math.round(Number(parsed.overall_score)),
      breakdown: {
        resume_score:     Math.round(Number(parsed.resume_score)),
        experience_score: Math.round(Number(parsed.experience_score)),
        cover_score:      Math.round(Number(parsed.cover_score)),
        profile_score:    Math.round(Number(parsed.profile_score)),
        ctc_score:        Math.round(Number(parsed.ctc_score)),
      },
      label:   parsed.label,
      summary: parsed.summary,
    };
  } catch (err) {
    console.error("[gemini-score] Failed:", err);
    return null;
  }
}
