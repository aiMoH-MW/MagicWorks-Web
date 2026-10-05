import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { sendNotification } from "@/lib/email";
import { syncLeadToMagicPipeline } from "@/lib/magicpipeline";
import { getAttribution, extraColumns, withAttributionFallback, attributionSummary } from "@/lib/attribution";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const attr = getAttribution(req);

    const { error } = await withAttributionFallback(
      (extra) =>
        createServiceClient().from("contact_submissions").insert({
          name,
          email,
          phone: phone || null,
          subject: subject || null,
          message,
          ...extra,
        }),
      extraColumns(attr, true)
    );

    if (error) throw error;

    await syncLeadToMagicPipeline({
      formName: `Contact Us${subject ? `: ${subject}` : ""}`,
      name,
      email,
      phone,
      message,
      utmSource: attr.utm_source || undefined,
      utmCampaign: attr.utm_campaign || undefined,
      utmMedium: attr.utm_medium || undefined,
      utmTerm: attr.utm_term || undefined,
      utmContent: attr.utm_content || undefined,
    });

    const phoneRow = phone ? "<p><strong>Phone:</strong> " + phone + "</p>" : "";
    const subjectRow = subject ? "<p><strong>Subject:</strong> " + subject + "</p>" : "";
    const msgBody = message.replace(/\n/g, "<br>");

    await sendNotification(
      "New contact form submission: " + name,
      "<h2>New Contact Form Submission</h2>" +
      "<p><strong>Name:</strong> " + name + "</p>" +
      "<p><strong>Email:</strong> <a href=\"mailto:" + email + "\">" + email + "</a></p>" +
      phoneRow +
      subjectRow +
      "<p><strong>Message:</strong><br>" + msgBody + "</p>" +
      "<p><strong>Attribution:</strong> " + (attributionSummary(attr) || "direct / none captured") + "</p>" +
      "<p style=\"color:#888;font-size:12px;\">Submitted via the Contact page on magicworksitsolutions.com</p>"
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
