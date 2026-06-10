import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { sendNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanSource = source || "footer";
    const db = createServiceClient();

    // Both newsletter and whitepaper opt-ins go into newsletter_subscribers.
    // Source field encodes the variant: "footer", "insights", "whitepaper-{slug}", etc.
    const { error } = await db
      .from("newsletter_subscribers")
      .upsert({ email: cleanEmail, source: cleanSource }, { onConflict: "email" });

    if (error) throw error;

    const isWhitepaper = cleanSource.startsWith("whitepaper-");
    const subject = isWhitepaper
      ? `New whitepaper opt-in: ${cleanSource.replace("whitepaper-", "")}`
      : `New newsletter subscriber: ${cleanSource}`;

    sendNotification(
      subject,
      `<p><strong>Email:</strong> ${cleanEmail}</p><p><strong>Source:</strong> ${cleanSource}</p>`
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[subscribe] error:", err);
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
