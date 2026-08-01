/**
 * publish-5-ai-consultation-blogs-round2.mjs
 *
 * Creates the SECOND batch of 5 AI Consultation blog posts (author: Mohan Chute,
 * same author record created by publish-5-ai-consultation-blogs.mjs) in Sanity
 * as DRAFTS — they will NOT be live on the site. Open each one in Sanity Studio
 * and click "Publish" when you're ready to make it go live.
 *   6.  The Data Readiness Audit                — 2026-08-01
 *   7.  AI Adoption Fails on People, Not Tech    — 2026-08-01
 *   8.  In-House AI Hire vs Embedded Advisor     — 2026-06-02
 *   9.  How to Measure ROI on an AI Pilot        — 2026-07-21
 *   10. The AI Pilot Trap                        — 2026-06-12
 *
 * What it does:
 *   - Reuses the existing "Mohan Chute" author record (creates it only if missing)
 *   - Reads the pre-converted Portable Text body + FAQ JSON from scripts/blog-data/
 *   - Uploads each hero image from Docs/Blogs/magicworks_blog-post_images/images blogs/
 *   - Creates each post as a DRAFT "insight" document (skips any slug that already exists)
 *
 * Run: node scripts/publish-5-ai-consultation-blogs-round2.mjs
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

const DATA_DIR  = path.join(__dirname, "blog-data");
const IMAGE_DIR = path.join(__dirname, "../../Docs/Blogs/magicworks_blog-post_images/images blogs");

// ── Blog configuration ─────────────────────────────────────────────────────
const BLOGS = [
  {
    jsonFile: "blog-6-data-readiness-before-ai.json",
    imgFile: "1. The Data Readiness Audit.png",
    slug: "data-readiness-before-ai-initiatives",
    title: "The Data Readiness Audit: Why Most AI Initiatives Fail Before the AI Ever Arrives",
    excerpt: "Most AI initiatives fail for a reason that has nothing to do with AI: the data was never fit to feed it. What a real data-readiness check covers.",
    publishedAt: "2026-08-01T09:00:00.000Z",
    tags: ["AI data readiness", "AI process audit India", "data quality before AI", "AI consultation"],
  },
  {
    jsonFile: "blog-7-change-management-ai-adoption.json",
    imgFile: "2. AI Adoption Fails on People, Not Technology.png",
    slug: "change-management-ai-adoption-playbook",
    title: "AI Adoption Fails on People, Not Technology: A Change-Management Playbook for Mid-Market Leaders",
    excerpt: "AI tools rarely fail on technology. They fail on adoption. A change-management playbook for getting mid-market teams to trust and use AI.",
    publishedAt: "2026-08-01T09:00:00.000Z",
    tags: ["AI change management", "AI adoption playbook", "AI consultation India"],
  },
  {
    jsonFile: "blog-8-in-house-hire-vs-embedded-advisor.json",
    imgFile: "3. In-House AI Hire or Embedded Adviso.png",
    slug: "in-house-ai-hire-vs-embedded-advisor",
    title: "In-House AI Hire or Embedded Advisor? A Framework for 50-500 Person Companies",
    excerpt: "In-house AI hire or embedded advisor? A practical framework for 50-500 person companies deciding how to build real AI capability.",
    publishedAt: "2026-06-02T09:00:00.000Z",
    tags: ["AI hiring decision", "embedded AI advisor", "AI consultation India"],
  },
  {
    jsonFile: "blog-9-measure-roi-ai-pilot.json",
    imgFile: "4. How to Measure ROI on an AI Pilot Before You Scale It.png",
    slug: "measure-roi-ai-pilot-before-scaling",
    title: "How to Measure ROI on an AI Pilot Before You Scale It",
    excerpt: "\"The pilot went well\" isn't a measurement. How to define real ROI metrics for an AI pilot before you commit budget to scaling it.",
    publishedAt: "2026-07-21T09:00:00.000Z",
    tags: ["AI pilot ROI", "AI pilot measurement", "AI consultation India"],
  },
  {
    jsonFile: "blog-10-ai-pilot-trap-portfolio-strategy.json",
    imgFile: "5. The AI Pilot Trap.png",
    slug: "ai-pilot-trap-portfolio-strategy",
    title: "The AI Pilot Trap: Why Running Five Small Pilots Is Worse Than Running One",
    excerpt: "Running five AI pilots at once feels like progress. Usually it means none of them get the attention needed to actually succeed.",
    publishedAt: "2026-06-12T09:00:00.000Z",
    tags: ["AI pilot strategy", "AI portfolio governance", "AI consultation India"],
  },
];

// ── Sanity field length checks (fail fast, before hitting the API) ─────────
for (const b of BLOGS) {
  if (b.title.length > 100) throw new Error(`Title too long (${b.title.length}/100): ${b.title}`);
  if (b.excerpt.length > 155) throw new Error(`Excerpt too long (${b.excerpt.length}/155): ${b.excerpt}`);
}

// ── Author: reuse Mohan Chute if it exists, create only if missing ─────────
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

    let coverImage;
    const imgPath = path.join(IMAGE_DIR, blog.imgFile);
    if (fs.existsSync(imgPath)) {
      console.log(`📤  Uploading hero image (${blog.imgFile})…`);
      const asset = await client.assets.upload("image", fs.createReadStream(imgPath), {
        filename: blog.imgFile,
        contentType: "image/png",
      });
      console.log(`✅  Image uploaded: ${asset._id}`);
      coverImage = {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: blog.title,
      };
    } else {
      console.warn(`⚠️   Hero image not found (${imgPath}) — publishing without one.`);
    }

    const doc = {
      // "drafts." prefix = created as a DRAFT, not published. It will show up
      // in Sanity Studio for review but will NOT appear on the live site until
      // someone clicks "Publish" in Studio.
      _id: `drafts.insight-${blog.slug}`,
      _type: "insight",
      title: blog.title,
      slug: { _type: "slug", current: blog.slug },
      excerpt: blog.excerpt,
      categories: ["AI & Automation"],
      pillar: "AI Consultation",
      publishedAt: blog.publishedAt,
      author: { _type: "reference", _ref: authorId },
      ...(coverImage ? { coverImage } : {}),
      tags: blog.tags,
      body: blocks,
      faq: faq.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
    };

    console.log("💾  Creating DRAFT document (unpublished)…");
    const created = await client.create(doc);
    console.log(`✅  Created draft: ${created._id}  (publishedAt once you publish it: ${blog.publishedAt})`);
    console.log(`    Review in Studio: https://${PROJECT_ID}.sanity.studio/structure/insight;${created._id.replace(/^drafts\./, "")}`);
  }

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
