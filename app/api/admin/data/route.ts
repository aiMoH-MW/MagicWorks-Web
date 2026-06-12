import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "magicworks-admin-2026";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyFilters(q: any, from: string | null, to: string | null, asc: boolean) {
  if (from) q = q.gte("created_at", `${from}T00:00:00.000Z`);
  if (to)   q = q.lte("created_at", `${to}T23:59:59.999Z`);
  return q.order("created_at", { ascending: asc });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-secret");
  if (auth !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sp   = req.nextUrl.searchParams;
  const tab  = sp.get("tab") ?? "newsletter";
  const from = sp.get("from");
  const to   = sp.get("to");
  const asc  = sp.get("sort") === "asc";
  const client = createServiceClient();

  try {
    if (tab === "newsletter") {
      const { data, error } = await applyFilters(
        client.from("newsletter_subscribers").select("*").not("source", "ilike", "whitepaper%"),
        from, to, asc
      );
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (tab === "whitepaper") {
      const { data, error } = await applyFilters(
        client.from("whitepaper_subscribers").select("*"),
        from, to, asc
      );
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (tab === "leads") {
      const { data, error } = await applyFilters(
        client.from("leads").select("*")
          .not("source_page", "ilike", "playbook-%")
          .in("pillar", ["Digital Marketing", "Web Development", "Not sure yet"]),
        from, to, asc
      );
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (tab === "consultation") {
      const { data, error } = await applyFilters(
        client.from("leads").select("*")
          .in("pillar", ["AI Consultation", "Platform Consultation"]),
        from, to, asc
      );
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (tab === "playbooks") {
      const { data, error } = await applyFilters(
        client.from("leads").select("*").ilike("source_page", "playbook-%"),
        from, to, asc
      );
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (tab === "careers") {
      const { data, error } = await applyFilters(
        client.from("career_applications").select("*"),
        from, to, asc
      );
      if (error) throw error;
      return NextResponse.json({ data });
    }

    return NextResponse.json({ data: [] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
