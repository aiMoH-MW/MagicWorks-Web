import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, website, pillar, message, source_page } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      company: company || null,
      website: website || null,
      pillar: pillar || null,
      message: message || null,
      source_page: source_page || null,
      utm_source: req.nextUrl.searchParams.get("utm_source"),
      utm_medium: req.nextUrl.searchParams.get("utm_medium"),
      utm_campaign: req.nextUrl.searchParams.get("utm_campaign"),
    });

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
