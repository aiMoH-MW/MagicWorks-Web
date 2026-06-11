import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "magicworks-admin-2026";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-secret");
  if (auth !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tab = req.nextUrl.searchParams.get("tab") ?? "newsletter";
  const client = createServiceClient();

  try {
    if (tab === "newsletter") {
      const { data, error } = await client
        .from("newsletter_subscribers")
        .select("*")
        .not("source", "ilike", "whitepaper%")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (tab === "whitepaper") {
      const { data, error } = await client
        .from("whitepaper_subscribers")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (tab === "leads") {
      const { data, error } = await client
        .from("leads")
        .select("*")
        .not("source_page", "ilike", "playbook-%")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (tab === "playbooks") {
      const { data, error } = await client
        .from("leads")
        .select("*")
        .ilike("source_page", "playbook-%")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (tab === "contact") {
      const { data, error } = await client
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (tab === "careers") {
      const { data, error } = await client
        .from("career_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json({ data });
    }

    return NextResponse.json({ data: [] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
