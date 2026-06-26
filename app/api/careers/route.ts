import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import nodemailer from "nodemailer";
import { scoreApplication } from "@/lib/gemini-score";

const HR_EMAIL = "careers@magicworksitsolutions.com";
const RESUME_BUCKET = "resumes";

function makeTransport() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function uploadResume(
  file: File,
  jobSlug: string,
  applicantName: string,
): Promise<{ path: string; buf: Buffer } | null> {
  try {
    const ext      = file.name.split(".").pop() ?? "pdf";
    const safeName = applicantName.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40);
    const path     = `${jobSlug}/${Date.now()}-${safeName}.${ext}`;
    const buf      = Buffer.from(await file.arrayBuffer());

    const svc = createServiceClient();
    const { error } = await svc.storage.from(RESUME_BUCKET).upload(path, buf, {
      contentType: file.type || "application/pdf",
      upsert: false,
    });
    if (error) { console.error("[careers/route] storage upload:", error); return null; }

    return { path, buf };
  } catch (e) {
    console.error("[careers/route] uploadResume:", e);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();

    const job_slug      = fd.get("job_slug")      as string;
    const job_title     = fd.get("job_title")     as string;
    const name          = fd.get("name")          as string;
    const email         = fd.get("email")         as string;
    const phone         = fd.get("phone")         as string | null;
    const linkedin_url  = fd.get("linkedin_url")  as string | null;
    const portfolio_url = fd.get("portfolio_url") as string | null;
    const cover_letter  = fd.get("cover_letter")  as string | null;
    const current_ctc   = fd.get("current_ctc")   as string | null;
    const expected_ctc  = fd.get("expected_ctc")  as string | null;
    const resumeFile    = fd.get("resume") as File | null;

    if (!name || !email || !job_slug) {
      return NextResponse.json({ error: "Name, email, and job are required" }, { status: 400 });
    }

    // ── Upload resume to Supabase Storage ─────────────────────────────────────
    const uploaded = resumeFile ? await uploadResume(resumeFile, job_slug, name) : null;
    const resume_path = uploaded?.path ?? null;

    // Generate a 7-day signed URL for the email body
    let resume_signed_url: string | null = null;
    if (resume_path) {
      const { data: signed } = await createServiceClient()
        .storage.from(RESUME_BUCKET)
        .createSignedUrl(resume_path, 7 * 24 * 3600);
      resume_signed_url = signed?.signedUrl ?? null;
    }

    // ── Supabase insert — use service client so .select("id") isn't blocked by RLS
    const svc = createServiceClient();
    const { data: inserted, error: dbError } = await svc
      .from("career_applications")
      .insert({
        job_slug,
        job_title:     job_title || job_slug,
        name,
        email,
        phone:         phone         || null,
        linkedin_url:  linkedin_url  || null,
        portfolio_url: portfolio_url || null,
        cover_letter:  cover_letter  || null,
        resume_url:    resume_path   || null,
        current_ctc:   current_ctc   || null,
        expected_ctc:  expected_ctc  || null,
      })
      .select("id")
      .single();

    if (dbError) throw dbError;

    // ── Gemini AI Scoring (async — does not block the response) ───────────────
    if (inserted?.id) {
      const rowId = inserted.id as string;
      scoreApplication({
        job_title: job_title || job_slug,
        job_slug,
        name,
        current_ctc,
        expected_ctc,
        phone,
        linkedin_url,
        portfolio_url,
        cover_letter,
        resumeBuffer:   uploaded?.buf ?? null,
        resumeMimeType: resumeFile?.type ?? null,
      })
        .then(async (score) => {
          if (!score) return;
          const { error: scoreErr } = await createServiceClient()
            .from("career_applications")
            .update({
              ai_score:           score.overall_score,
              ai_score_breakdown: score.breakdown,
              ai_score_label:     score.label,
              ai_score_summary:   score.summary,
              ai_scored_at:       new Date().toISOString(),
            })
            .eq("id", rowId);
          if (scoreErr) {
            console.error("[careers/score] DB update failed:", scoreErr);
          } else {
            console.log(`[careers/score] ${name} → ${score.overall_score} (${score.label})`);
          }
        })
        .catch((err) => console.error("[careers/score] error:", err));
    }

    // ── Email notification ────────────────────────────────────────────────────
    try {
      const transport = makeTransport();
      if (transport) {
        const attachments: { filename: string; content: Buffer }[] = [];
        if (uploaded?.buf) {
          attachments.push({ filename: resumeFile!.name, content: uploaded.buf });
        }

        const body = [
          "New job application received via MagicWorks website.",
          "",
          `Role:         ${job_title || job_slug}`,
          `Name:         ${name}`,
          `Email:        ${email}`,
          `Phone:        ${phone || "—"}`,
          `LinkedIn:     ${linkedin_url || "—"}`,
          `Portfolio:    ${portfolio_url || "—"}`,
          `Current CTC:  ${current_ctc || "—"}`,
          `Expected CTC: ${expected_ctc || "—"}`,
          "",
          "Cover letter / note:",
          cover_letter || "—",
          "",
          resume_signed_url
            ? `Resume download (valid 7 days): ${resume_signed_url}`
            : uploaded
              ? `Resume: attached to this email (${resumeFile!.name})`
              : "No resume uploaded.",
          "",
          "AI score will appear in the admin dashboard within ~30 seconds.",
        ].join("\n");

        await transport.sendMail({
          from:        '"MagicWorks Careers" <noreply@magicworksitsolutions.com>',
          to:          HR_EMAIL,
          replyTo:     email,
          subject:     `Application: ${job_title || job_slug} — ${name}`,
          text:        body,
          attachments,
        });
      }
    } catch (mailErr) {
      console.error("[careers/route] email failed:", mailErr);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[careers/route]", err);
    return NextResponse.json({ error: "Submission failed" }, { 