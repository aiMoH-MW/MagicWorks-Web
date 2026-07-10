/**
 * Update SimpliDistance case study with corrected metrics + evidence image.
 * Run: node scripts/update-simplidistance.mjs [image-file-path]
 *
 * Example (no image):  node scripts/update-simplidistance.mjs
 * Example (with image): node scripts/update-simplidistance.mjs "C:/Users/sudhi/Downloads/google-ads-simplidistance.png"
 */

// Load .env.local
import { readFileSync, createReadStream, existsSync } from "fs";
import { resolve, basename } from "path";

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

const [,, imagePath] = process.argv;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wa86etuq",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  // Find the document by slug
  const doc = await client.fetch(
    `*[_type == "caseStudy" && slug.current == "simplidistance-mba-enrollments"][0]{ _id }`
  );

  if (!doc?._id) {
    console.error("SimpliDistance case study not found in Sanity.");
    process.exit(1);
  }

  console.log("Found document:", doc._id);

  // Build the patch
  const patch = client.patch(doc._id).set({
    heroMetric: "50,000+",
    heroMetricLabel: "Qualified Leads in 16 Months",
    situation:
      "SimpliDistance is one of India's fastest-growing portals for distance and online MBA admissions, connecting students with universities across India. Despite strong brand recognition, their paid search activity was fragmented and not driving consistent, high-intent lead volume. MagicWorks was brought in to overhaul their Google Ads strategy and build a performance engine capable of generating leads at scale.",
    intervention:
      "MagicWorks restructured SimpliDistance's Google Ads campaigns from the ground up, focusing on high-intent keywords across MBA, distance education, and university-specific queries. We built tightly themed ad groups, wrote conversion-focused ad copy, and implemented a continuous optimisation loop. Alongside paid search, we deployed a chatbot lead capture layer to recover intent signals from users who did not convert via the main form, adding a second pipeline of qualified enquiries.",
    result:
      "Over 16 months, the campaign generated 50,000+ qualified leads across two channels: 40,100+ conversions directly from Google Ads forms (849K clicks, cost per conversion Rs 495) and over 10,000 additional leads captured via the integrated chatbot. Total ad spend of Rs 19.8M was managed with disciplined cost-per-lead targets, delivering one of the strongest lead volumes in the distance MBA segment.",
    metrics: [
      { _key: "m1", value: "50,000+", label: "Total qualified leads" },
      { _key: "m2", value: "40,100+", label: "Leads via Google Ads forms" },
      { _key: "m3", value: "10,000+", label: "Leads via chatbot" },
      { _key: "m4", value: "849K",    label: "Total clicks" },
      { _key: "m5", value: "Rs 495",  label: "Cost per conversion" },
      { _key: "m6", value: "16",      label: "Months of campaign data" },
    ],
  });

  // Upload and attach evidence image if provided
  if (imagePath && existsSync(imagePath)) {
    console.log("Uploading evidence image...");
    const stream = createReadStream(imagePath);
    const asset = await client.assets.upload("image", stream, {
      filename: basename(imagePath),
      contentType: imagePath.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg",
    });
    console.log("Asset uploaded:", asset._id);

    patch.set({
      evidenceImage: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: "Google Ads dashboard — SimpliDistance campaign overview (Mar 2022 to Jun 2023)",
        caption: "Google Ads campaign overview — 849K clicks, 40,100+ conversions, Rs 495 cost per lead (16-month period)",
      },
    });
  } else if (imagePath) {
    console.warn("Image file not found at:", imagePath);
  }

  await patch.commit();
  console.log("Case study updated.");
  console.log("Live at: https://magicworksitsolutions.com/work/simplidistance-mba-enrollments");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
