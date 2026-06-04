/**
 * patch-ai-cost-images.mjs
 *
 * Uploads the two key images from the WordPress version of the AI cost article
 * into Sanity, then patches the Sanity document:
 *   • coverImage  → iceberg hero
 *   • body        → inserts comparison-matrix image after the first h2
 *
 * Run:
 *   node scripts/patch-ai-cost-images.mjs
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN   (must have write access)
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as http from "http";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// ── Load .env.local ─────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");

if (!fs.existsSync(envPath)) {
  console.error("❌  .env.local not found at", envPath);
  process.exit(1);
}

const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const [k, ...v] = line.split("=");
  if (k && v.length) env[k.trim()] = v.join("=").trim().replace(/^['"]|['"]$/g, "");
}

const PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN = env.SANITY_API_TOKEN;

if (!PROJECT_ID) {
  console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID missing in .env.local");
  process.exit(1);
}
if (!TOKEN) {
  console.error("❌  SANITY_API_TOKEN missing in .env.local (needs write access)");
  process.exit(1);
}

// ── Sanity client ────────────────────────────────────────────────────────────
const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// ── Images to import ─────────────────────────────────────────────────────────
const IMAGES = [
  {
    key: "hero",
    url: "https://magicworksitsolutions.com/wp-content/uploads/2026/05/real-cost-ai-india-hero.webp",
    filename: "real-cost-ai-india-hero.webp",
    alt: "An iceberg visualization showing the small visible vendor license price above the waterline and the much larger hidden costs of AI implementation below — for Indian businesses in 2026.",
    role: "cover", // sets as coverImage
  },
  {
    key: "matrix",
    url: "https://magicworksitsolutions.com/wp-content/uploads/2026/05/5-use-case-comparison-matrix.webp",
    filename: "5-use-case-comparison-matrix.webp",
    alt: "Comparison matrix of 5 AI use cases for Indian marketing and sales in 2026 — budget ranges, payback timelines, hidden cost intensity, and best-fit profiles.",
    caption: "Five AI use cases compared: budget ranges from ₹2L to ₹50L+, payback 4–18 months.",
    role: "body", // inserts into body after the first heading
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────

const SLUG = "real-cost-of-ai-indian-marketing-sales-2026";

async function main() {
  console.log(`\n🔍  Looking up article: ${SLUG}`);
  const doc = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id, title, coverImage, body }`,
    { slug: SLUG }
  );

  if (!doc) {
    console.error(`❌  Article not found in Sanity (slug: ${SLUG})`);
    process.exit(1);
  }

  console.log(`✅  Found: "${doc.title}" (${doc._id})\n`);

  const uploadedAssets = {};

  for (const img of IMAGES) {
    console.log(`📥  Downloading ${img.key}: ${img.filename}`);
    let buffer;
    try {
      buffer = await fetchBuffer(img.url);
      console.log(`    ${(buffer.length / 1024).toFixed(1)} KB downloaded`);
    } catch (err) {
      console.error(`    ⚠️  Download failed: ${err.message}`);
      console.log(`    Skipping ${img.key}`);
      continue;
    }

    console.log(`☁️   Uploading to Sanity…`);
    try {
      const asset = await client.assets.upload("image", buffer, {
        filename: img.filename,
        contentType: "image/webp",
      });
      console.log(`    ✅  Uploaded → ${asset._id}`);
      uploadedAssets[img.key] = { asset, img };
    } catch (err) {
      console.error(`    ⚠️  Upload failed: ${err.message}`);
    }
  }

  // ── Patch coverImage ───────────────────────────────────────────────────────
  const heroData = uploadedAssets["hero"];
  if (heroData && !doc.coverImage?.asset?._ref) {
    console.log(`\n🖼️   Setting coverImage…`);
    await client
      .patch(doc._id)
      .set({
        coverImage: {
          _type: "image",
          asset: { _type: "reference", _ref: heroData.asset._id },
          alt: heroData.img.alt,
        },
      })
      .commit();
    console.log("    ✅  coverImage set");
  } else if (doc.coverImage?.asset?._ref) {
    console.log("\n⏭️   coverImage already set — skipping");
  }

  // ── Insert comparison matrix into body ─────────────────────────────────────
  const matrixData = uploadedAssets["matrix"];
  if (matrixData) {
    const body = doc.body ?? [];

    // Check if the image is already in the body (idempotent)
    const alreadyIn = body.some(
      (b) => b._type === "image" && b.asset?._ref === matrixData.asset._id
    );

    if (alreadyIn) {
      console.log("\n⏭️   Comparison matrix already in body — skipping");
    } else {
      console.log("\n📄  Inserting comparison matrix into body…");

      // Find a good insertion point: after the first h2 block
      let insertAt = body.length; // default: end
      for (let i = 0; i < body.length; i++) {
        const block = body[i];
        if (block._type === "block" && block.style === "h2") {
          // Insert after the next paragraph following this h2
          for (let j = i + 1; j < body.length; j++) {
            if (body[j]._type === "block" && body[j].style === "normal") {
              insertAt = j + 1;
              break;
            }
          }
          break;
        }
      }

      const imageBlock = {
        _type: "image",
        _key: `matrix-${Date.now()}`,
        asset: { _type: "reference", _ref: matrixData.asset._id },
        alt: matrixData.img.alt,
        caption: matrixData.img.caption,
      };

      const newBody = [
        ...body.slice(0, insertAt),
        imageBlock,
        ...body.slice(insertAt),
      ];

      await client.patch(doc._id).set({ body: newBody }).commit();
      console.log(`    ✅  Inserted at position ${insertAt} of ${body.length} blocks`);
    }
  }

  console.log("\n🎉  Done! Refresh Sanity Studio to see changes.");
  console.log(
    `    Studio URL: https://${PROJECT_ID}.sanity.studio/structure/insight;${doc._id}\n`
  );
}

main().catch((err) => {
  console.error("\n❌  Fatal error:", err.message);
  process.exit(1);
});
