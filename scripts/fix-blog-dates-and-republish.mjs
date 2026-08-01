/**
 * fix-blog-dates-and-republish.mjs
 *
 * 1. Checks all 5 Mohan Chute AI-consultation posts and republishes any
 *    that are currently draft-only (i.e. got accidentally unpublished),
 *    without you needing to say which one — it just checks all 5.
 * 2. Patches publishedAt on two posts:
 *      - "Build, Buy, or Wait"        -> 2026-05-02 14:30
 *      - "Vendor-Neutral AI Advisor"  -> 2026-05-20 14:30
 *
 * Run: node scripts/fix-blog-dates-and-republish.mjs
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

const ALL_SLUGS = [
  "from-audit-to-action-ai-roadmap",
  "build-buy-or-wait-ai-investment-decision",
  "vendor-neutral-ai-advisor-embedded-engagement",
  "ai-literacy-gap-leadership-alignment",
  "how-to-evaluate-ai-vendor-india-due-diligence-checklist",
];

const DATE_PATCHES = {
  "build-buy-or-wait-ai-investment-decision": "2026-05-02T14:30:00.000Z",
  "vendor-neutral-ai-advisor-embedded-engagement": "2026-05-20T14:30:00.000Z",
};

// ── Step 1: republish anything that's draft-only ───────────────────────────
async function ensurePublished(slug) {
  const docs = await client.fetch(
    `*[_type == "insight" && slug.current == $slug]{ _id }`,
    { slug },
    { perspective: "raw" }
  );

  if (docs.length === 0) {
    console.log(`  ⚠️  ${slug}: no document found at all`);
    return null;
  }

  const draft = docs.find((d) => d._id.startsWith("drafts."));
  const published = docs.find((d) => !d._id.startsWith("drafts."));

  if (published) {
    console.log(`  ✅  ${slug}: already published (${published._id})`);
    return published._id;
  }

  // Draft-only — republish it.
  const draftDoc = await client.getDocument(draft._id);
  const publishedId = draft._id.replace(/^drafts\./, "");
  const { _id, _rev, ...rest } = draftDoc;
  await client.createOrReplace({ _id: publishedId, ...rest });
  await client.delete(draft._id);
  console.log(`  📢  ${slug}: was draft-only — republished as ${publishedId}`);
  return publishedId;
}

// ── Step 2: patch publishedAt on the two specified posts ───────────────────
async function patchDate(slug, publishedAt, publishedId) {
  if (!publishedId) { console.log(`  ⚠️  ${slug}: skipped date patch (no published doc)`); return; }
  await client.patch(publishedId).set({ publishedAt }).commit();
  console.log(`  🗓️   ${slug}: publishedAt -> ${publishedAt}`);
}

async function main() {
  console.log("🔍  Checking publish state of all 5 posts…");
  const idsBySlug = {};
  for (const slug of ALL_SLUGS) {
    idsBySlug[slug] = await ensurePublished(slug);
  }

  console.log("\n🗓️   Applying date patches…");
  for (const [slug, date] of Object.entries(DATE_PATCHES)) {
    await patchDate(slug, date, idsBySlug[slug]);
  }

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
