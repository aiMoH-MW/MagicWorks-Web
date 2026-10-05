import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "magicworks-admin-2026";

const TABLE_MAP: Record<string, string> = {
  newsletter:   "newsletter_subscribers",
  whitepaper:   "whitepaper_subscribers",
  leads:        "leads",
  consultation: "leads",
  playbooks:    "leads",
  careers:      "career_applications",
};

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-admin-secret");
  if (auth !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { ids?: unknown; tab?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { ids, tab } = body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "ids must be a non-empty array" }, { status: 400 });
  }
  if (typeof tab !== "string" || !TABLE_MAP[tab]) {
    return NextResponse.json({ error: "Invalid tab" }, { status: 400 });
  }

  const table = TABLE_MAP[tab];
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error("[admin/delete] SUPABASE_SERVICE_ROLE_KEY is not set");
    return NextResponse.json({ error: "Server misconfiguration: service key missing" }, { status: 500 });
  }

  const { data: deleted, error } = await createServiceClient()
    .from(table)
    .delete()
    .in("id", ids)
    .select("id");

  if (error) {
    console.error("[admin/delete] Supabase error:", JSON.stringify(error));
    return NextResponse.json({ error: `Supabase: ${error.message} (code ${error.code})` }, { status: 500 });
  }

  const actualCount = deleted?.length ?? 0;
  if (actualCount === 0) {
    // Rows found in UI but Supabase deleted 0 — RLS blocking or ID mismatch
    console.warn("[admin/delete] 0 rows deleted from", table, "for ids:", ids);
    return NextResponse.json(
      { error: `RLS blocked delete on '${table}' — check Supabase policies or service key` },
      { status: 403 }
    );
  }

  return NextResponse.json({ deleted: actualCount });
}
