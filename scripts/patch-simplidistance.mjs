/**
 * Patch SimpliDistance case study:
 * - Remove hero metric label
 * - Fix metrics grid (remove 16 months, keep 4 metrics)
 * - Add clientUrl backlink
 *
 * Run: node scripts/patch-simplidistance.mjs
 */

// Load .env.local
import { readFileSync } from "fs";
import { resolve } from "path";

try {
  const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx < 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (key && !(key in process.env)) process.env[key] = val;
  }
} catch { /* rely on existing env */ }

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wa86etuq",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  const doc = await client.fetch(
    `*[_type == "caseStudy" && slug.current == "simplidistance-mba-enrollments"][0]{ _id }`
  );

  if (!doc?._id) {
    console.error("SimpliDistance case study not found.");
    process.exit(1);
  }

  await client
    .patch(doc._id)
    .set({
      // Remove hero metric label (spacing fix)
      heroMetricLabel: "",

      // 4-metric grid — remove "16 months of campaign data"
      metrics: [
        { _key: "m1", value: "50,000+",  label: "Total qualified leads" },
        { _key: "m2", value: "40,100+",  label: "Leads via Google Ads forms" },
        { _key: "m3", value: "10,000+",  label: "Leads via chatbot" },
        { _key: "m4", value: "Rs 495",   label: "Cost per conversion" },
      ],

      // Backlink
      clientUrl: "https://simplidistance.com/",
    })
    .commit();

  console.log("Done. Changes live at:");
  console.log("https://magicworksitsolutions.com/work/simplidistance-mba-enrollments");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
