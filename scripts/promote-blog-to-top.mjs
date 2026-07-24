/**
 * promote-blog-to-top.mjs
 *
 * The blog listing (sanity/queries.ts getAllInsights) sorts purely by
 * publishedAt desc — there's no "featured"/"pinned" field in the schema.
 * So to put "From Audit to Action" in the #1 slot, the only lever is its
 * publishedAt date.
 *
 * This script finds the latest publishedAt among ALL published insight
 * documents, then sets "From Audit to Action"'s publishedAt to one day
 * after that latest date — guaranteeing it sorts first no matter what
 * that current top date actually is.
 *
 * "Until new blog comes in": the next post you publish with a publishedAt
 * later than this new date will naturally retake the #1 spot, since sort
 * order is still pure date-desc. No code change needed for that to happen.
 *
 * Run: node scripts/promote-blog-to-top.mjs
 * Requires the same .env.local as the other scripts.
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

const TARGET_SLUG = "from-audit-to-action-ai-roadmap";

async function main() {
  console.log("🔍  Finding the current #1 post by publishedAt…");

  const all = await client.fetch(
    `*[_type == "insight" && defined(publishedAt)]{ _id, title, "slug": slug.current, publishedAt } | order(publishedAt desc)`
  );

  if (!all.length) { console.error("❌  No published insight documents found"); process.exit(1); }

  console.log(`   Current #1: "${all[0].title}" (${all[0].publishedAt})`);

  const target = all.find((d) => d.slug === TARGET_SLUG);
  if (!target) { console.error(`❌  Could not find post with slug "${TARGET_SLUG}"`); process.exit(1); }

  if (all[0].slug === TARGET_SLUG) {
    console.log(`✅  "${target.title}" is already #1 — nothing to do.`);
    return;
  }

  const latest = new Date(all[0].publishedAt);
  const newDate = new Date(latest.getTime() + 24 * 60 * 60 * 1000); // +1 day
  const newDateIso = newDate.toISOString();

  await client.patch(target._id).set({ publishedAt: newDateIso }).commit();

  console.log(`\n📌  "${target.title}"`);
  console.log(`     publishedAt: ${target.publishedAt} -> ${newDateIso}`);
  console.log(`\n🎉  Done. It will now sort as #1 on /blog until a newer post is published after ${newDateIso}.\n`);
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
