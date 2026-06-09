import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanSource = source || "footer";

    if (cleanSource.startsWith("whitepaper-")) {
      // ── Whitepaper opt-in → dedicated table ────────────────────
      const whitepaperSlug = cleanSource.replace("whitepaper-", "");
      const { error } = await supabase
        .from("whitepaper_subscribers")
        .insert({ email: cleanEmail, whitepaper: whitepaperSlug });

      // Silently succeed on duplicate (same email + same whitepaper)
      if (error && error.code !== "23505") throw error;

      sendNotification(
        `New whitepaper opt-in: ${whitepaperSlug}`,
        `<p><strong>Email:</strong> ${cleanEmail}</p><p><strong>Whitepaper:</strong> ${whitepaperSlug}</p>`
      );
    } else {
      // ── Newsletter → newsletter_subscribers ────────────────────
      const { error } = await supabase
        .from("newsletter_subscribers")
        .upsert({ email: cleanEmail, source: cleanSource }, { onConflict: "email" });

      if (error) throw error;

      sendNotification(
        `New newsletter subscriber: ${cleanSource}`,
        `<p><strong>Email:</strong> ${cleanEmail}</p><p><strong>Source:</strong> ${cleanSource}</p>`
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
