import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { job_slug, job_title, name, email, phone, linkedin_url, portfolio_url, cover_letter } = body;

    if (!name || !email || !job_slug) {
      return NextResponse.json({ error: "Name, email, and job are required" }, { status: 400 });
    }

    const { error } = await supabase.from("career_applications").insert({
      job_slug,
      job_title: job_title || job_slug,
      name,
      email,
      phone: phone || null,
      linkedin_url: linkedin_url || null,
      portfolio_url: portfolio_url || null,
      cover_letter: cover_letter || null,
    });

    if (error) throw error;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}
