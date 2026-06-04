import { NextResponse } from "next/server";
import { getSanityClient } from "@/sanity/config";

export const dynamic = "force-dynamic";

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const hasToken = !!process.env.SANITY_API_READ_TOKEN;

  try {
    const client = getSanityClient();
    const count = await client.fetch(`count(*[_type == "insight"])`);
    const sample = await client.fetch(
      `*[_type == "insight"][0..2]{ _id, title, isGated }`
    );

    return NextResponse.json({
      ok: true,
      projectId,
      dataset,
      hasToken,
      insightCount: count,
      sample,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      projectId,
      dataset,
      hasToken,
      error: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
