/**
 * patch-reorder-mohan-before-anjali.mjs
 *
 * One-off fix: the blog listing sorts by publishedAt desc. Anjali's
 * "Campaigns You Should Have Killed Last Month" was promoted early (today)
 * via publish-draft.mjs, which keeps its original scheduled publishedAt
 * (2026-09-09, tomorrow) untouched — so it outranks Mohan's "Sales Operating
 * System" post, which was published today with today's actual timestamp.
 *
 * This patches ONLY Anjali's Campaigns post, setting its publishedAt to
 * 1 minute before Mohan's Sales Operating System post, so the listing shows:
 *   Mohan's Sales Operating System post  →  first
 *   Anjali's Campaigns post              →  second
 * All other posts and their dates are untouched.
 *
 * Run: node scripts/patch-reorder-mohan-before-anjali.mjs
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
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

const MOHAN_SLUG  = "website-sales-operating-system";
const ANJALI_SLUG = "campaigns-you-should-have-killed";

async function main() {
  const mohan = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id, title, publishedAt }`,
    { slug: MOHAN_SLUG }
  );
  if (!mohan) { console.error(`❌  Mohan's post not found (slug: ${MOHAN_SLUG}). Publish it first.`); process.exit(1); }
  console.log(`✅  Found Mohan's post: "${mohan.title}" — publishedAt: ${mohan.publishedAt}`);

  const anjali = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id, title, publishedAt }`,
    { slug: ANJALI_SLUG }
  );
  if (!anjali) { console.error(`❌  Anjali's post not found (slug: ${ANJALI_SLUG}).`); process.exit(1); }
  console.log(`✅  Found Anjali's post: "${anjali.title}" — publishedAt: ${anjali.publishedAt}`);

  if (new Date(anjali.publishedAt) < new Date(mohan.publishedAt)) {
    console.log("\n✅  Anjali's post already sorts after Mohan's — nothing to do.");
    return;
  }

  const newAnjaliDate = new Date(new Date(mohan.publishedAt).getTime() - 60 * 1000).toISOString();
  console.log(`\n💾  Patching Anjali's publishedAt → ${newAnjaliDate} (1 minute before Mohan's)…`);
  await client.patch(anjali._id).set({ publishedAt: newAnjaliDate }).commit();
  console.log("✅  Patched.");

  console.log("\n🎉  Done. Mohan's Sales Operating System post will now show before Anjali's Campaigns post in the blog listing.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
