import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { sendNotification } from "@/lib/email";
import { syncLeadToMagicPipeline } from "@/lib/magicpipeline";
import { getAttribution, extraColumns, withAttributionFallback, attributionSummary } from "@/lib/attribution";

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanSource = source || "footer";
    const db = createServiceClient();
    const attr = getAttribution(req);
    const utmFields = {
      utmSource: attr.utm_source || undefined,
      utmCampaign: attr.utm_campaign || undefined,
      utmMedium: attr.utm_medium || undefined,
      utmTerm: attr.utm_term || undefined,
      utmContent: attr.utm_content || undefined,
      gclid: attr.gclid || undefined,
      fbclid: attr.fbclid || undefined,
      landingPage: attr.landing_page || undefined,
      referrer: attr.referrer || undefined,
    };
    const attrRow = `<p><strong>Attribution:</strong> ${attributionSummary(attr) || "direct / none captured"}</p>`;

    if (cleanSource.startsWith("whitepaper-")) {
      // ── Whitepaper opt-in → dedicated table ────────────────────────────────
      const whitepaperSlug = cleanSource.replace("whitepaper-", "");
      const { error } = await withAttributionFallback(
        (extra) =>
          db
            .from("whitepaper_subscribers")
            .insert({ email: cleanEmail, whitepaper: whitepaperSlug, ...extra }),
        extraColumns(attr, true)
      );

      // Silently succeed on duplicate (same email + same whitepaper)
      if (error && error.code !== "23505") throw error;

      await syncLeadToMagicPipeline({
        formName: `Whitepaper Opt-in: ${whitepaperSlug}`,
        email: cleanEmail,
        ...utmFields,
      });

      await sendNotification(
        `New whitepaper opt-in: ${whitepaperSlug}`,
        `<p><strong>Email:</strong> ${cleanEmail}</p><p><strong>Whitepaper:</strong> ${whitepaperSlug}</p>${attrRow}`
      );
    } else {
      // ── Newsletter → newsletter_subscribers ────────────────────────────────
      const { error } = await withAttributionFallback(
        (extra) =>
          db
            .from("newsletter_subscribers")
            .upsert({ email: cleanEmail, source: cleanSource, ...extra }, { onConflict: "email" }),
        extraColumns(attr, true)
      );

      if (error) throw error;

      await syncLeadToMagicPipeline({
        formName: `Newsletter Signup: ${cleanSource}`,
        email: cleanEmail,
        ...utmFields,
      });

      await sendNotification(
        `New newsletter subscriber: ${cleanSource}`,
        `<p><strong>Email:</strong> ${cleanEmail}</p><p><strong>Source:</strong> ${cleanSource}</p>${attrRow}`
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[subscribe] error:", err);
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
