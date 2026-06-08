import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const { error } = await supabase.from("subscribers").insert({
      email: email.toLowerCase().trim(),
      source: source || "footer",
    });

    // Ignore duplicate email errors — silently succeed so we don't leak info
    if (error && !error.message.includes("duplicate")) throw error;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
