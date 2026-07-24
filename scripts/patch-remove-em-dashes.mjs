/**
 * patch-remove-em-dashes.mjs
 *
 * Removes em dashes from the 5 already-published Mohan Chute AI-consultation
 * blog posts, per the site-wide "no em dash" rule. Re-uploads the corrected
 * body (Portable Text) + faq from scripts/blog-data/*.json (already
 * regenerated from the em-dash-free source markdown), and patches the one
 * excerpt that also contained an em dash.
 *
 * Safe to re-run: it always overwrites body/faq/excerpt with the current
 * corrected values, so running it twice is a no-op the second time.
 *
 * Run: node scripts/patch-remove-em-dashes.mjs
 * Requires the same .env.local as the other publish/fix scripts.
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

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

const DATA_DIR = path.join(__dirname, "blog-data");

const BLOGS = [
  {
    jsonFile: "blog-1-from-audit-to-action.json",
    slug: "from-audit-to-action-ai-roadmap",
  },
  {
    jsonFile: "blog-2-build-buy-or-wait.json",
    slug: "build-buy-or-wait-ai-investment-decision",
  },
  {
    jsonFile: "blog-3-embedded-advisory-engagement.json",
    slug: "vendor-neutral-ai-advisor-embedded-engagement",
    excerpt: "What a vendor-neutral, embedded AI advisor actually does month to month, and how it differs from a consulting project or an in-house AI hire.",
  },
  {
    jsonFile: "blog-4-ai-literacy-gap.json",
    slug: "ai-literacy-gap-leadership-alignment",
  },
  {
    jsonFile: "blog-5-ai-vendor-due-diligence-checklist.json",
    slug: "how-to-evaluate-ai-vendor-india-due-diligence-checklist",
  },
];

async function main() {
  console.log("🔍  Patching em-dash-free content onto 5 published posts…\n");

  for (const blog of BLOGS) {
    const dataPath = path.join(DATA_DIR, blog.jsonFile);
    if (!fs.existsSync(dataPath)) { console.error(`❌  Missing data file: ${dataPath}`); continue; }
    const { blocks, faq } = JSON.parse(readFileSync(dataPath, "utf8"));

    const doc = await client.fetch(
      `*[_type == "insight" && slug.current == $slug][0]{ _id }`,
      { slug: blog.slug }
    );
    if (!doc) { console.log(`⚠️   ${blog.slug}: no published document found — skipping`); continue; }

    const patch = {
      body: blocks,
      faq: faq.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
    };
    if (blog.excerpt) patch.excerpt = blog.excerpt;

    await client.patch(doc._id).set(patch).commit();
    console.log(`✅  ${blog.slug} (${doc._id}): body + faq${blog.excerpt ? " + excerpt" : ""} updated, em dashes removed`);
  }

  console.log("\n🎉  Done. Refresh the live pages to confirm em dashes are gone.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
