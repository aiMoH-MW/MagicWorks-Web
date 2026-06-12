import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

const HR_EMAIL = "hr@magicworksitsolutions.com";

// ── Email transport ───────────────────────────────────────────────────────────
// Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local to activate.
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

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData();

    const job_slug     = fd.get("job_slug")     as string;
    const job_title    = fd.get("job_title")    as string;
    const name         = fd.get("name")         as string;
    const email        = fd.get("email")        as string;
    const phone        = fd.get("phone")        as string | null;
    const linkedin_url = fd.get("linkedin_url") as string | null;
    const portfolio_url= fd.get("portfolio_url")as string | null;
    const cover_letter = fd.get("cover_letter") as string | null;
    const resumeFile   = fd.get("resume") as File | null;

    if (!name || !email || !job_slug) {
      return NextResponse.json({ error: "Name, email, and job are required" }, { status: 400 });
    }

    // ── Supabase insert ───────────────────────────────────────────────────────
    const { error: dbError } = await supabase.from("career_applications").insert({
      job_slug,
      job_title: job_title || job_slug,
      name,
      email,
      phone:         phone         || null,
      linkedin_url:  linkedin_url  || null,
      portfolio_url: portfolio_url || null,
      cover_letter:  cover_letter  || null,
      resume_filename: resumeFile?.name || null,
    });

    if (dbError) throw dbError;

    // ── Email (fires only when SMTP is configured) ────────────────────────────
    const transport = makeTransport();
    if (transport) {
      const attachments: nodemailer.Attachment[] = [];
      if (resumeFile) {
        const buf = Buffer.from(await resumeFile.arrayBuffer());
        attachments.push({ filename: resumeFile.name, content: buf });
      }

      const body = `
New job application received via MagicWorks website.

Role:       ${job_title || job_slug}
Name:       ${name}
Email:      ${email}
Phone:      ${phone || "—"}
LinkedIn:   ${linkedin_url || "—"}
Portfolio:  ${portfolio_url || "—"}

Cover letter / note:
${cover_letter || "—"}

${resumeFile ? `Resume attached: ${resumeFile.name}` : "No resume uploaded."}
      `.trim();

      await transport.sendMail({
        from:        `"MagicWorks Careers" <${process.env.SMTP_USER}>`,
        to:          HR_EMAIL,
        replyTo:     email,
        subject:     `Application: ${job_title || job_slug} — ${name}`,
        text:        body,
        attachments,
      });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[careers/route]", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
