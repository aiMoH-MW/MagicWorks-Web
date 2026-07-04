/**
 * Upload an evidence/data screenshot to Sanity and attach it to a case study.
 * Usage: node scripts/upload-evidence-image.mjs <image-file-path> <case-study-id> [caption]
 *
 * Example:
 *   node scripts/upload-evidence-image.mjs "C:/Users/sudhi/Downloads/bing-screenshot.png" "the-holistic-care-case-study" "Microsoft Bing Webmaster Tools — AI Performance (3-month view, Copilot citations)"
 */

// Load .env.local
import { readFileSync, createReadStream } from "fs";
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

const [,, imagePath, docId, caption] = process.argv;

if (!imagePath || !docId) {
  console.error("Usage: node scripts/upload-evidence-image.mjs <image-path> <document-id> [caption]");
  console.error('Example: node scripts/upload-evidence-image.mjs "C:/Downloads/bing.png" "the-holistic-care-case-study" "Bing AI Performance"');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "wa86etuq",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

async function main() {
  const filename = basename(imagePath);
  console.log(`Uploading ${filename}...`);

  const stream = createReadStream(imagePath);
  const asset = await client.assets.upload("image", stream, {
    filename,
    contentType: imagePath.endsWith(".png") ? "image/png" : "image/jpeg",
  });

  console.log("Asset uploaded:", asset._id);

  console.log(`Patching case study ${docId}...`);
  await client
    .patch(docId)
    .set({
      evidenceImage: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: caption || filename,
        caption: caption || "",
      },
    })
    .commit();

  console.log("Done. Evidence image is now attached to the case study.");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
