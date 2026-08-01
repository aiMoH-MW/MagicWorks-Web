/**
 * publish-5-ai-consultation-blogs.mjs
 *
 * Publishes the 5 AI Consultation blog posts (author: Mohan Chute) to Sanity:
 *   1. From Audit to Action                    — 2026-07-24 (today)
 *   2. Build, Buy, or Wait                      — 2026-07-21 (backdated)
 *   3. Inside an Embedded Advisory Engagement    — 2026-07-18 (backdated)
 *   4. The AI Literacy Gap                       — 2026-07-15 (backdated)
 *   5. Vendor Due Diligence Checklist            — 2026-07-12 (backdated)
 *
 * What it does:
 *   - Creates the Mohan Chute author record if it doesn't already exist
 *   - Uploads each hero image from content-drafts/*.png
 *   - Reads the pre-converted Portable Text body + FAQ JSON from scripts/blog-data/
 *   - Creates each post as a published "insight" document (skips any slug that already exists)
 *
 * Run: node scripts/publish-5-ai-consultation-blogs.mjs
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// ── Load .env.local ────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
if (!fs.existsSync(envPath)) { console.error("❌  .env.local not found"); process.exit(1); }

const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const [kk, ...v] = line.split("=");
  if (kk?.trim() && v.length) env[kk.trim()] = v.join("=").trim().replace(/^['"]|['"]$/g, "");
}

const PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN      = env.SANITY_API_TOKEN;

if (!PROJECT_ID) { console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID missing"); process.exit(1); }
if (!TOKEN)      { console.error("❌  SANITY_API_TOKEN missing"); process.exit(1); }

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: "2024-01-01",
  token:     TOKEN,
  useCdn:    false,
});

const DATA_DIR    = path.join(__dirname, "blog-data");
const IMAGE_DIR   = path.join(__dirname, "../content-drafts");

// ── Blog configuration ─────────────────────────────────────────────────────
const BLOGS = [
  {
    jsonFile: "blog-1-from-audit-to-action.json",
    pngFile:  "blog-1-from-audit-to-action.png",
    slug: "from-audit-to-action-ai-roadmap",
    title: "From Audit to Action: Turning AI Process-Audit Findings Into a Roadmap You Can Actually Execute",
    excerpt: "An AI process audit only matters once it becomes a roadmap someone actually executes. How to turn findings into a sequenced, defensible 12-month plan.",
    publishedAt: "2026-07-24T09:00:00.000Z",
    tags: ["AI process audit", "AI roadmap execution", "AI consultation India", "build vs buy AI"],
  },
  {
    jsonFile: "blog-2-build-buy-or-wait.json",
    pngFile:  "blog-2-build-buy-or-wait.png",
    slug: "build-buy-or-wait-ai-investment-decision",
    title: "Build, Buy, or Wait: A Practical Framework for Your Next AI Investment Decision",
    excerpt: "Build, buy, or wait: the three-option framework for your next AI investment, with real cost, timeline, and risk trade-offs for Indian mid-market firms.",
    publishedAt: "2026-07-21T09:00:00.000Z",
    tags: ["build vs buy AI", "AI investment decision", "AI vendor evaluation India", "AI consultation"],
  },
  {
    jsonFile: "blog-3-embedded-advisory-engagement.json",
    pngFile:  "blog-3-embedded-advisory-engagement.png",
    slug: "vendor-neutral-ai-advisor-embedded-engagement",
    title: "What Does a Vendor-Neutral AI Advisor Actually Do? Inside an Embedded Advisory Engagement",
    excerpt: "What a vendor-neutral, embedded AI advisor actually does month to month — and how it differs from a consulting project or an in-house AI hire.",
    publishedAt: "2026-07-18T09:00:00.000Z",
    tags: ["embedded AI advisor", "vendor-neutral AI consulting", "AI advisory retainer India"],
  },
  {
    jsonFile: "blog-4-ai-literacy-gap.json",
    pngFile:  "blog-4-ai-literacy-gap.png",
    slug: "ai-literacy-gap-leadership-alignment",
    title: "The AI Literacy Gap: Why Leadership Alignment Has to Come Before Any Roadmap",
    excerpt: "Why AI roadmaps stall without leadership alignment first, and what an AI literacy session needs to cover to fix the real gap: judgment, not tool training.",
    publishedAt: "2026-07-15T09:00:00.000Z",
    tags: ["AI literacy workshop", "leadership AI alignment", "AI roadmap adoption India"],
  },
  {
    jsonFile: "blog-5-ai-vendor-due-diligence-checklist.json",
    pngFile:  "blog-5-ai-vendor-due-diligence-checklist.png",
    slug: "how-to-evaluate-ai-vendor-india-due-diligence-checklist",
    title: "How to Evaluate an AI Vendor in India: A CXO's Technical & Commercial Due Diligence Checklist",
    excerpt: "A CXO's due diligence checklist for evaluating AI vendors in India: data ownership, integration depth, pricing scalability, and contract terms that matter.",
    publishedAt: "2026-07-12T09:00:00.000Z",
    tags: ["AI vendor due diligence", "evaluate AI vendor India", "AI vendor contract checklist"],
  },
];

// ── Author: ensure Mohan Chute exists ──────────────────────────────────────
async function ensureAuthor() {
  console.log("\n🔍  Checking for author Mohan Chute…");
  const existing = await client.fetch(
    `*[_type == "teamMember" && (slug.current == "mohan-chute" || name == "Mohan Chute")][0]{ _id, name }`
  );
  if (existing) {
    console.log(`✅  Author exists: ${existing.name} (${existing._id})`);
    return existing._id;
  }
  console.log("📝  Creating author Mohan Chute…");
  const created = await client.createIfNotExists({
    _id: "author-mohan-chute",
    _type: "teamMember",
    name: "Mohan Chute",
    slug: { _type: "slug", current: "mohan-chute" },
    role: "Founder, MagicWorks IT Solutions",
    bio: "Founder of MagicWorks IT Solutions, with 17+ years across digital marketing, web strategy, and AI. He writes from inside live client engagements, not theory.",
    linkedin: "https://www.linkedin.com/in/mohanchute/",
    isFounder: true,
    order: 1,
  });
  console.log(`✅  Created: ${created._id}`);
  return created._id;
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const authorId = await ensureAuthor();

  for (const blog of BLOGS) {
    console.log(`\n── ${blog.title} ──`);

    const existing = await client.fetch(
      `*[_type == "insight" && slug.current == $slug][0]{ _id }`,
      { slug: blog.slug }
    );
    if (existing) {
      console.log(`⏭️   Already exists (${existing._id}) — skipping.`);
      continue;
    }

    const dataPath = path.join(DATA_DIR, blog.jsonFile);
    if (!fs.existsSync(dataPath)) { console.error(`❌  Missing data file: ${dataPath}`); continue; }
    const { blocks, faq } = JSON.parse(readFileSync(dataPath, "utf8"));

    const pngPath = path.join(IMAGE_DIR, blog.pngFile);
    if (!fs.existsSync(pngPath)) { console.error(`❌  Missing hero image: ${pngPath}`); continue; }

    console.log(`📤  Uploading hero image (${blog.pngFile})…`);
    const asset = await client.assets.upload("image", fs.createReadStream(pngPath), {
      filename: blog.pngFile,
      contentType: "image/png",
    });
    console.log(`✅  Image uploaded: ${asset._id}`);

    const doc = {
      _type: "insight",
      title: blog.title,
      slug: { _type: "slug", current: blog.slug },
      excerpt: blog.excerpt,
      categories: ["AI & Automation"],
      pillar: "AI Consultation",
      publishedAt: blog.publishedAt,
      author: { _type: "reference", _ref: authorId },
      coverImage: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: blog.title,
      },
      tags: blog.tags,
      body: blocks,
      faq: faq.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
    };

    console.log("💾  Creating document…");
    const created = await client.create(doc);
    console.log(`✅  Created: ${created._id}  (publishedAt: ${blog.publishedAt})`);
    console.log(`    Studio: https://${PROJECT_ID}.sanity.studio/structure/insight;${created._id}`);
  }

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
