import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";
import { getInsightSlugs, getAllCaseStudies, getActiveJobOpenings } from "@/sanity/queries";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://magicworksitsolutions.com";

// Maps Sanity document types to the live canonical URLs
function urlsForDocument(docType: string, slug: string): string[] {
  switch (docType) {
    case "insight":
      // /blog/{slug} is canonical — never ping redirecting /insights/ URLs
      return [`${BASE}/blog/${slug}`];
    case "caseStudy":
      return [`${BASE}/work/${slug}`];
    case "jobOpening":
      return [`${BASE}/careers/${slug}`];
    default:
      return [];
  }
}

export async function POST(req: NextRequest) {
  // Authenticate via shared secret set in Sanity webhook headers
  const secret = process.env.INDEXNOW_WEBHOOK_SECRET;
  if (secret) {
    const provided = req.headers.get("x-webhook-secret");
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const action = req.nextUrl.searchParams.get("action");

  // ?action=bulk — seed all known URLs (run once after deploy or on-demand)
  if (action === "bulk") {
    const [insights, caseStudies, jobs] = await Promise.all([
      getInsightSlugs().catch(() => [] as { slug: string }[]),
      getAllCaseStudies().catch(() => [] as { slug: { current: string } }[]),
      getActiveJobOpenings().catch(() => [] as { slug: { current: string } }[]),
    ]);

    const urls = [
      BASE,
      `${BASE}/services`,
      `${BASE}/blog`,
      `${BASE}/work`,
      `${BASE}/about`,
      `${BASE}/contact`,
      ...insights.flatMap((s: { slug: string }) => urlsForDocument("insight", s.slug)),
      ...caseStudies.flatMap((s: { slug: { current: string } }) => urlsForDocument("caseStudy", s.slug.current)),
      ...jobs.flatMap((j: { slug: { current: string } }) => urlsForDocument("jobOpening", j.slug.current)),
    ];

    const result = await submitToIndexNow(urls);
    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  }

  // Default — Sanity webhook for a single published/updated document
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const docType = typeof body._type === "string" ? body._type : "";
  // Sanity slug field can be { current: string } or a plain string
  const slugRaw = body.slug;
  const slug =
    slugRaw && typeof slugRaw === "object" && "current" in (slugRaw as object)
      ? (slugRaw as { current: string }).current
      : typeof slugRaw === "string"
        ? slugRaw
        : "";

  if (!docType || !slug) {
    return NextResponse.json({ error: "Missing _type or slug in payload" }, { status: 400 });
  }

  const urls = urlsForDocument(docType, slug);
  if (!urls.length) {
    return NextResponse.json({ message: `No URL mapping for type "${docType}"` });
  }

  const result = await submitToIndexNow(urls);
  return NextResponse.json(result, { status: result.success ? 200 : 500 });
}
