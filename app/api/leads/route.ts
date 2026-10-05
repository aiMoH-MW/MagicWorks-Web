import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { sendNotification } from "@/lib/email";
import { syncLeadToMagicPipeline } from "@/lib/magicpipeline";
import { getAttribution, extraColumns, withAttributionFallback, attributionSummary } from "@/lib/attribution";

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

    // UTMs + click IDs captured on landing (cookie), query string as fallback
    const attr = getAttribution(req);

    const { error } = await withAttributionFallback(
      (extra) =>
        createServiceClient().from("leads").insert({
          name,
          email,
          phone: phone || null,
          company: company || null,
          website: website || null,
          pillar: pillar || null,
          message: message || null,
          source_page: source_page || null,
          utm_source: attr.utm_source,
          utm_medium: attr.utm_medium,
          utm_campaign: attr.utm_campaign,
          ...extra,
        }),
      extraColumns(attr, false)
    );

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
      utmSource: attr.utm_source || undefined,
      utmCampaign: attr.utm_campaign || undefined,
      utmMedium: attr.utm_medium || undefined,
      utmTerm: attr.utm_term || undefined,
      utmContent: attr.utm_content || undefined,
      gclid: attr.gclid || undefined,
      fbclid: attr.fbclid || undefined,
      landingPage: attr.landing_page || undefined,
      referrer: attr.referrer || undefined,
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
        <p><strong>Attribution:</strong> ${attributionSummary(attr) || "direct / none captured"}</p>
      `
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
