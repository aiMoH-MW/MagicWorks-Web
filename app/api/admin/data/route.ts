import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

// Always execute fresh — this endpoint serves live admin data and must never
// be cached at the CDN/edge layer (was previously served stale, e.g. new
// leads not appearing until a cache-busting request forced revalidation).
export const dynamic = "force-dynamic";
export const revalidate = 0;

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "magicworks-admin-2026";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyFilters(q: any, from: string | null, to: string | null, asc: boolean) {
  if (from) q = q.gte("created_at", `${from}T00:00:00.000Z`);
  if (to)   q = q.lte("created_at", `${to}T23:59:59.999Z`);
  return q.order("created_at", { ascending: asc });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function noStoreJson(body: any, init?: number | ResponseInit) {
  const res = NextResponse.json(body, typeof init === "number" ? { status: init } : init);
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  return res;
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-secret");
  if (auth !== ADMIN_SECRET) {
    return noStoreJson({ error: "Unauthorized" }, 401);
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
      return noStoreJson({ data });
    }

    if (tab === "whitepaper") {
      // whitepaper_subscribers has no created_at — order by id instead
      const { data, error } = await client
        .from("whitepaper_subscribers")
        .select("*")
        .order("id", { ascending: asc });
      if (error) throw error;
      return noStoreJson({ data });
    }

    if (tab === "leads") {
      const { data, error } = await applyFilters(
        client.from("leads").select("*")
          .not("source_page", "ilike", "playbook-%")
          .in("pillar", ["Digital Marketing", "Web Development", "Brand, Research & Publishing", "Not sure yet"]),
        from, to, asc
      );
      if (error) throw error;
      return noStoreJson({ data });
    }

    if (tab === "consultation") {
      const { data, error } = await applyFilters(
        client.from("leads").select("*")
          .in("pillar", ["AI Consultation", "Platform Consultation"]),
        from, to, asc
      );
      if (error) throw error;
      return noStoreJson({ data });
    }

    if (tab === "playbooks") {
      const { data, error } = await applyFilters(
        client.from("leads").select("*").ilike("source_page", "playbook-%"),
        from, to, asc
      );
      if (error) throw error;
      return noStoreJson({ data });
    }

    if (tab === "careers") {
      const { data, error } = await applyFilters(
        client.from("career_applications").select("*"),
        from, to, asc
      );
      if (error) throw error;

      // Generate 1-hour signed URLs so resume downloads work regardless of bucket visibility
      const rows = await Promise.all(
        (data ?? []).map(async (row: Record<string, unknown>) => {
          const rawPath = row.resume_url as string | null;
          if (!rawPath) return row;
          // Handle both stored paths ("job-slug/file.pdf") and legacy full URLs
          const path = rawPath.startsWith("http")
            ? rawPath.split("/resumes/")[1] ?? rawPath
            : rawPath;
          const { data: signed } = await client.storage.from("resumes").createSignedUrl(path, 3600);
          return { ...row, resume_url: signed?.signedUrl ?? null };
        })
      );

      return noStoreJson({ data: rows });
    }

    return noStoreJson({ data: [] });
  } catch (err) {
    console.error(err);
    return noStoreJson({ error: "Failed to fetch data" }, 500);
  }
}
