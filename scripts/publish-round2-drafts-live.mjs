/**
 * publish-round2-drafts-live.mjs
 *
 * Takes the 5 draft posts created by publish-5-ai-consultation-blogs-round2.mjs
 * and publishes them for real (same thing as opening each in Sanity Studio and
 * clicking "Publish" — this just does all 5 in one go).
 *
 * For each slug: reads the draft (drafts.insight-<slug>), writes the same
 * content as the published document (insight-<slug>), then deletes the draft.
 *
 * Run: node scripts/publish-round2-drafts-live.mjs
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

const SLUGS = [
  "data-readiness-before-ai-initiatives",
  "change-management-ai-adoption-playbook",
  "in-house-ai-hire-vs-embedded-advisor",
  "measure-roi-ai-pilot-before-scaling",
  "ai-pilot-trap-portfolio-strategy",
];

async function main() {
  for (const slug of SLUGS) {
    const draftId = `drafts.insight-${slug}`;
    const publishedId = `insight-${slug}`;

    console.log(`\n── ${slug} ──`);

    const draft = await client.getDocument(draftId);
    if (!draft) {
      // Maybe it was already published (no draft left) — check for the published doc.
      const already = await client.getDocument(publishedId);
      if (already) {
        console.log(`✅  Already published (${publishedId}) — nothing to do.`);
      } else {
        console.error(`❌  No draft or published doc found for "${slug}" — did the create script run? Skipping.`);
      }
      continue;
    }

    const { _id, _rev, ...rest } = draft;
    const publishedDoc = { _id: publishedId, ...rest };

    console.log("📤  Publishing…");
    await client
      .transaction()
      .createOrReplace(publishedDoc)
      .delete(draftId)
      .commit();

    console.log(`✅  Published: ${publishedId}`);
    console.log(`    Live at: https://magicworksitsolutions.com/blog/${slug}`);
  }

  console.log("\n🎉  Done. All 5 posts are now live (or already were).\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
