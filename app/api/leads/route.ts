import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { sendNotification } from "@/lib/email";
import { syncLeadToMagicPipeline } from "@/lib/magicpipeline";

function buildMagicPipelineFormName(pillar?: string | null, sourcePage?: string | null) {
  if (sourcePage && sourcePage.toLowerCase().startsWith("playbook-")) {
    return `Playbook Download: ${sourcePage.replace(/^playbook-/i, "")}`;
  }
  if (pillar === "AI Consultation" || pillar === "Platform Consultation") {
    return `Consultation Enquiry: ${pillar}`;
  }
  return `Service Enquiry: ${pillar || "Unknown"}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, website, pillar, message, source_page, _gotcha } = body;

    // Honeypot — bots fill hidden fields, humans don't
    if (_gotcha) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const utm_source = req.nextUrl.searchParams.get("utm_source");
    const utm_campaign = req.nextUrl.searchParams.get("utm_campaign");

    const { error } = await createServiceClient().from("leads").insert({
      name,
      email,
      phone: phone || null,
      company: company || null,
      website: website || null,
      pillar: pillar || null,
      message: message || null,
      source_page: source_page || null,
      utm_source,
      utm_medium: req.nextUrl.searchParams.get("utm_medium"),
      utm_campaign,
    });

    if (error) throw error;

    await syncLeadToMagicPipeline({
      formName: buildMagicPipelineFormName(pillar, source_page),
      name,
      email,
      phone,
      company,
      website,
      message,
      pageUrl: source_page || undefined,
      utmSource: utm_source || undefined,
      utmCampaign: utm_campaign || undefined,
    });

    await sendNotification(
      `New lead from ${source_page ?? "website"}: ${name}`,
      `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        ${pillar ? `<p><strong>Service interest:</strong> ${pillar}</p>` : ""}
        ${message ? `<p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>` : ""}
        <p><strong>Source page:</strong> ${source_page ?? "unknown"}</p>
      `
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
