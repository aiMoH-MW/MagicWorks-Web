/**
 * anonymize-simplidistance-case-study.mjs
 *
 * Anonymizes the SimpliDistance case study on /work so it no longer names
 * the brand:
 *   - Drops the "SIMPLIDISTANCE" eyebrow label (unsets `client`)
 *   - Drops the "Visit website" link (unsets `clientUrl`)
 *   - Retitles the case study to a generic, stat-led headline
 *   - Rewrites the Situation opening line to "Our client is..."
 *   - Replaces "SimpliDistance's" with "the platform's" in the Intervention text
 *   - Replaces the Google Ads evidence screenshot with a redacted version
 *     (brand name blacked out in the account breadcrumb)
 *
 * Run: node scripts/anonymize-simplidistance-case-study.mjs
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

const NEW_TITLE = "How a Leading Distance & Online MBA Platform Scaled to 50,000+ Qualified Leads With High-Intent Search Advertising";
const REDACTED_EVIDENCE_IMAGE = path.join(__dirname, "media", "simplidistance-evidence-redacted.png");

async function main() {
  console.log("\n🔍  Looking up case study by slug 'simplidistance-mba-enrollments'…");
  const doc = await client.fetch(
    `*[_type == "caseStudy" && slug.current == "simplidistance-mba-enrollments"][0]`
  );

  if (!doc) {
    console.error("❌  No caseStudy document found with that slug. Nothing to change.");
    process.exit(1);
  }

  console.log(`✅  Found: "${doc.title}" (${doc._id})`);
  console.log(`    Current client field: ${doc.client ?? "(none)"}`);
  console.log(`    Current clientUrl: ${doc.clientUrl ?? "(none)"}\n`);

  if (!fs.existsSync(REDACTED_EVIDENCE_IMAGE)) {
    console.error(`❌  Redacted evidence image not found: ${REDACTED_EVIDENCE_IMAGE}`);
    process.exit(1);
  }

  const patches = { set: {}, unset: [] };

  if (doc.evidenceImage) {
    console.log("📤  Uploading redacted evidence screenshot…");
    const evidenceAsset = await client.assets.upload("image", fs.createReadStream(REDACTED_EVIDENCE_IMAGE), {
      filename: "simplidistance-evidence-redacted.png",
    });
    console.log(`✅  Uploaded: ${evidenceAsset._id}\n`);
    patches.set.evidenceImage = {
      ...doc.evidenceImage,
      asset: { _type: "reference", _ref: evidenceAsset._id },
    };
  }

  patches.set.title = NEW_TITLE;

  if (doc.client) patches.unset.push("client");
  if (doc.clientUrl) patches.unset.push("clientUrl");

  if (doc.situation) {
    patches.set.situation = doc.situation.replace(
      /^SimpliDistance is one of/,
      "Our client is one of"
    );
  }

  if (doc.intervention) {
    patches.set.intervention = doc.intervention.replace(
      /SimpliDistance's/g,
      "the platform's"
    );
  }

  // Catch-all: replace any remaining standalone mentions of the brand name
  // in text fields, in case the wording differs slightly from what we expect.
  for (const field of ["situation", "intervention", "result"]) {
    const current = patches.set[field] ?? doc[field];
    if (current && /SimpliDistance/.test(current)) {
      patches.set[field] = current.replace(/SimpliDistance/g, "the platform");
    }
  }

  console.log("💾  Applying patch…");
  console.log("    New title:", patches.set.title);
  if (patches.unset.length) console.log("    Unsetting:", patches.unset.join(", "));
  if (patches.set.situation) console.log("    New situation opening:", patches.set.situation.slice(0, 80) + "…");
  if (patches.set.intervention) console.log("    New intervention opening:", patches.set.intervention.slice(0, 80) + "…");
  if (patches.set.evidenceImage) console.log("    Evidence image: swapped to redacted screenshot");

  let p = client.patch(doc._id).set(patches.set);
  if (patches.unset.length) p = p.unset(patches.unset);
  const result = await p.commit();

  console.log(`\n✅  Updated: ${result._id}`);
  console.log(`    Live URL: https://magicworksitsolutions.com/work/${doc.slug.current}\n`);
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
