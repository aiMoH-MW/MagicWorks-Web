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

    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: cleanEmail,
      source: cleanSource,
    });

    // Ignore duplicate email errors — silently succeed
    if (error && !error.message.includes("duplicate")) throw error;

    // Send notification email (non-blocking)
    const label = cleanSource.startsWith("whitepaper-")
      ? `Whitepaper opt-in: ${cleanSource.replace("whitepaper-", "")}`
      : "Footer newsletter";

    sendNotification(
      `New subscriber — ${label}`,
      `<p><strong>Email:</strong> ${cleanEmail}</p><p><strong>Source:</strong> ${cleanSource}</p>`
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
