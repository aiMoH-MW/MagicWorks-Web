/**
 * POST /api/admin/rescore
 * One-time (and on-demand) endpoint to AI-score existing career applications.
 * Protected by the same ADMIN_SECRET used by the rest of the admin API.
 *
 * Body (JSON, optional):
 *   { limit: 20, offset: 0 }   — defaults: limit 20, offset 0
 *
 * Returns:
 *   { scored: number, skipped: number, failed: number, total_unscored: number }
 */

import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { scoreApplication } from "@/lib/gemini-score";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "magicworks-admin-2026";
const RESUME_BUCKET = "resumes";

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-admin-secret");
  if (auth !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let limit = 20;
  let offset = 0;
  try {
    const body = await req.json().catch(() => ({}));
    if (body.limit) limit = Number(body.limit);
    if (body.offset) offset = Number(body.offset);
  } catch { /* no body */ }

  const client = createServiceClient();

  // Count total unscored
  const { count: totalUnscored } = await client
    .from("career_applications")
    .select("id", { count: "exact", head: true })
    .is("ai_score", null);

  // Fetch a batch of unscored applications
  const { data: apps, error } = await client
    .from("career_applications")
    .select("id, job_title, job_slug, name, total_experience, relevant_experience, current_ctc, expected_ctc, phone, linkedin_url, portfolio_url, cover_letter, resume_url")
    .is("ai_score", null)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let scored = 0;
  let skipped = 0;
  let failed = 0;

  for (const app of (apps ?? [])) {
    try {
      // Download resume from Supabase Storage if path exists
      let resumeBuffer: Buffer | null = null;
      let resumeMimeType: string | null = null;

      if (app.resume_url && !app.resume_url.startsWith("http")) {
        // Stored as path (e.g. "web-development/12345-john.pdf")
        const { data: fileData, error: dlErr } = await client
          .storage
          .from(RESUME_BUCKET)
          .download(app.resume_url);

        if (!dlErr && fileData) {
          const buf = Buffer.from(await fileData.arrayBuffer());
          // Only pass to Gemini if PDF and under 4 MB
          if (app.resume_url.endsWith(".pdf") && buf.length <= 4 * 1024 * 1024) {
            resumeBuffer = buf;
            resumeMimeType = "application/pdf";
          }
        }
      }

      const score = await scoreApplication({
        job_title:          app.job_title || app.job_slug || "Unknown Role",
        job_slug:           app.job_slug || "",
        name:               app.name,
        total_experience:   app.total_experience,
        relevant_experience: app.relevant_experience,
        current_ctc:        app.current_ctc,
        expected_ctc:       app.expected_ctc,
        phone:              app.phone,
        linkedin_url:       app.linkedin_url,
        portfolio_url:      app.portfolio_url,
        cover_letter:       app.cover_letter,
        resumeBuffer,
        resumeMimeType,
      });

      if (!score) { skipped++; continue; }

      const { error: updateErr } = await client
        .from("career_applications")
        .update({
          ai_score:           score.overall_score,
          ai_score_breakdown: score.breakdown,
          ai_score_label:     score.label,
          ai_score_summary:   score.summary,
          ai_scored_at:       new Date().toISOString(),
        })
        .eq("id", app.id);

      if (updateErr) { console.error("[rescore] update failed:", updateErr); failed++; }
      else scored++;

      // Small delay to avoid hitting Gemini rate limits
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error("[rescore] error for", app.id, err);
      failed++;
    }
  }

  return NextResponse.json({
    scored,
    skipped,
    failed,
    total_unscored: totalUnscored ?? 0,
    batch_size: limit,
    offset,
    next_offset: offset + limit,
  });
}
