/**
 * patch-internship-scoring-budget.mjs
 *
 * Sets internalScoringBudget on the 2 live internship listings. This field is
 * never queried by any public-facing page/query (see getJobSalaryForScoring()
 * in sanity/queries.ts, used only server-side by the AI scoring routes) — it
 * exists solely so the AI CTC-fit guardrail in lib/gemini-score.ts has a real
 * number to compare expected CTC against, since the public "salary" field for
 * these two roles is deliberately non-numeric ("Performance-based").
 *
 * Safe to re-run — it's a plain .set() patch, idempotent.
 *
 * Run: node scripts/patch-internship-scoring-budget.mjs
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

const BUDGET = "₹5,000 to ₹7,000 per month";

const SLUGS = [
  "seo-aeo-geo-intern",
  "web-app-development-intern",
];

async function main() {
  console.log("🔍  Patching internalScoringBudget on internship listings…\n");

  for (const slug of SLUGS) {
    const doc = await client.fetch(
      `*[_type == "jobOpening" && slug.current == $slug][0]{ _id, title }`,
      { slug }
    );
    if (!doc) { console.log(`⚠️   ${slug}: no document found — skipping`); continue; }

    await client.patch(doc._id).set({ internalScoringBudget: BUDGET }).commit();
    console.log(`✅  ${doc.title} (${doc._id}): internalScoringBudget -> "${BUDGET}"`);
  }

  console.log("\n🎉  Done. Existing applications for these roles still need a rescore");
  console.log("    (click \"Score All\" in /admin, or POST /api/admin/rescore) to pick up the new budget.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
