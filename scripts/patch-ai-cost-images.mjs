/**
 * patch-ai-cost-images.mjs
 *
 * Downloads all 5 images from the WordPress version of the AI cost article,
 * uploads them to Sanity CDN, then patches the document:
 *   • coverImage  → real-cost-ai-india-hero.webp
 *   • body insert → ai-cost-iceberg.webp         (after "Reason 1" / 25-35% text)
 *   • body insert → 5-use-case-comparison-matrix (after "What this article covers")
 *   • body insert → hubspot-vs-salesforce-tco.webp (after HubSpot/Salesforce cost text)
 *   • body insert → probability-weighted-ai-cost.webp (after 95 percent / probability text)
 *
 * All 5 image URLs verified via WordPress REST API (/wp-json/wp/v2/media?parent=996538).
 *
 * Run:
 *   node scripts/patch-ai-cost-images.mjs
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET       (defaults to "production")
 *   SANITY_API_TOKEN                 (must have write/editor access)
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
  if (k?.trim() && v.length) env[k.trim()] = v.join("=").trim().replace(/^['"]|['"]$/g, "");
}

const PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN      = env.SANITY_API_TOKEN;

if (!PROJECT_ID) { console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID missing"); process.exit(1); }
if (!TOKEN)      { console.error("❌  SANITY_API_TOKEN missing (needs write access)"); process.exit(1); }

// ── Sanity client ─────────────────────────────────────────────────────────────
const client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: "2024-01-01", token: TOKEN, useCdn: false });

// ── All 5 images (URLs verified via WP REST API) ──────────────────────────────
const SLUG = "real-cost-of-ai-indian-marketing-sales-2026";

const IMAGES = [
  {
    key: "hero",
    wpUrl: "https://magicworksitsolutions.com/wp-content/uploads/2026/05/real-cost-ai-india-hero.webp",
    filename: "real-cost-ai-india-hero.webp",
    alt: "An iceberg visualization showing the small visible vendor sticker price (₹15 Lakh) above the waterline and the much larger hidden costs of AI implementation — integration, training, maintenance, multilingual, LLM API, governance — below the waterline for Indian businesses in 2026.",
    caption: "",
    role: "cover", // set as coverImage
  },
  {
    key: "matrix",
    wpUrl: "https://magicworksitsolutions.com/wp-content/uploads/2026/05/5-use-case-comparison-matrix.webp",
    filename: "5-use-case-comparison-matrix.webp",
    alt: "Comparison matrix of 5 AI use cases for Indian marketing and sales in 2026 — AI Chatbot (₹3–25L, 8–14 months), Marketing Automation+AI (₹8–50L, 12–18 months), Sales Enablement+Conversation Intel (₹6–40L, 9–15 months), AI Content Production (₹2–15L, 4–8 months), AI Analytics & Reporting (₹5–30L, 6–12 months) — with hidden cost intensity and best-fit profiles.",
    caption: "Five AI use cases compared: budget ranges, realistic payback timelines, and hidden cost intensity.",
    // Insert after "What this article covers" heading or early in article
    insertAfterPattern: /article covers|what this article/i,
    role: "body",
  },
  {
    key: "iceberg",
    wpUrl: "https://magicworksitsolutions.com/wp-content/uploads/2026/05/ai-cost-iceberg.webp",
    filename: "ai-cost-iceberg.webp",
    alt: "The AI cost iceberg: platform license / vendor sticker price is the visible cost (25–35% of total). Below the waterline — integration with existing systems 150–200% of platform cost, implementation and onboarding 20–50%, team training ₹30K–₹1.5L per project, multilingual layer 20–30% premium, LLM API usage 30–50% of ongoing cost, annual maintenance 15–30% of initial cost.",
    caption: "The AI cost iceberg: what vendors quote is only 25–35% of what you will actually spend in year one.",
    // Insert after text about "25 to 35 percent" or "Reason 1"
    insertAfterPattern: /reason 1|vendor pricing pages|25.?to.?35 percent of true cost|platform license is the entry fee/i,
    role: "body",
  },
  {
    key: "hubspot",
    wpUrl: "https://magicworksitsolutions.com/wp-content/uploads/2026/05/hubspot-vs-salesforce-tco.webp",
    filename: "hubspot-vs-salesforce-tco.webp",
    alt: "First-Year Total Cost of Ownership Comparison for a typical mid-sized Indian business with 20 sales users and 5 marketing users: HubSpot Professional ₹35–60 lakh (first-year total) versus Salesforce Marketing Cloud ₹80 lakh–1.5 crore (first-year total) — a 2–3× gap driven almost entirely by hidden operational costs, not license fees.",
    caption: "HubSpot Professional vs Salesforce Marketing Cloud: the 2–3× TCO gap is driven by hidden operational costs, not licence fees. Per Avidly Agency 2026 research.",
    // Insert after HubSpot/Salesforce comparison text
    insertAfterPattern: /HubSpot Professional|Salesforce Marketing Cloud|three cost layers|cost layers nobody|reality check/i,
    role: "body",
  },
  {
    key: "probability",
    wpUrl: "https://magicworksitsolutions.com/wp-content/uploads/2026/05/probability-weighted-ai-cost.webp",
    filename: "probability-weighted-ai-cost.webp",
    alt: "Probability-weighted expected value diagram: a ₹15 lakh AI project has 95% probability of zero measurable return (per MIT Project NANDA) and only 5% probability of 3–5× return, resulting in a net expected return of −₹10 to −₹12 lakh. This is why shutdown discipline matters more than budget size.",
    caption: "The probability-weighted math: without shutdown discipline, a ₹15L AI investment has a negative expected value. MIT Project NANDA found 95% of enterprise GenAI pilots produce no measurable return.",
    // Insert after 95 percent / probability-weighted text
    insertAfterPattern: /probability.weighted|95 percent|MIT.*NANDA|NANDA.*95|hidden 95 percent|probability-weighted math/i,
    role: "body",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function fetchBuffer(url, retryWithBerqWP = true) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MagicWorksBot/1.0; +https://magicworksitsolutions.com)",
        "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
      },
    };
    const mod = url.startsWith("https") ? https : http;
    const req = mod.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location, false).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        if (retryWithBerqWP && url.includes("magicworksitsolutions.com/wp-content")) {
          // Fall back to BerqWP CDN
          const berqUrl = `https://images.berqwp.com/?domain=magicworksitsolutions.com&w=300&mw=1920&q=85&url=${encodeURIComponent(url)}`;
          console.log(`    ↩  Falling back to BerqWP CDN for ${url.split("/").pop()}`);
          return fetchBuffer(berqUrl, false).then(resolve).catch(reject);
        }
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

/** Extract all text from a PortableText block */
function blockText(block) {
  if (block._type !== "block" || !Array.isArray(block.children)) return "";
  return block.children.map((c) => c.text ?? "").join("");
}

/** Find the best insertion index for an image based on a text pattern */
function findInsertionIndex(body, pattern) {
  // Find the block whose text matches the pattern
  for (let i = 0; i < body.length; i++) {
    const text = blockText(body[i]);
    if (pattern.test(text)) {
      // Insert after the paragraph following this match (or after the match itself)
      for (let j = i + 1; j < Math.min(i + 4, body.length); j++) {
        const t = blockText(body[j]);
        // Skip empty blocks or heading blocks; insert after a paragraph
        if (body[j]._type === "block" && body[j].style === "normal" && t.length > 30) {
          return j + 1;
        }
      }
      return i + 1; // fallback: insert immediately after the matched block
    }
  }
  return -1; // not found — will append to end
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🔍  Looking up article: ${SLUG}`);
  const doc = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id, title, coverImage, body }`,
    { slug: SLUG }
  );

  if (!doc) { console.error(`❌  Article not found (slug: ${SLUG})`); process.exit(1); }
  console.log(`✅  Found: "${doc.title}" (${doc._id})\n`);

  // ── Upload all images to Sanity ──────────────────────────────────────────
  const uploaded = {}; // key → { asset, img }

  for (const img of IMAGES) {
    console.log(`📥  ${img.key}: downloading ${img.filename}`);
    let buffer;
    try {
      buffer = await fetchBuffer(img.wpUrl);
      console.log(`    ${(buffer.length / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`    ⚠️  Download failed: ${err.message} — skipping`);
      continue;
    }
    try {
      const asset = await client.assets.upload("image", buffer, {
        filename: img.filename,
        contentType: "image/webp",
      });
      console.log(`    ✅  Uploaded → ${asset._id}`);
      uploaded[img.key] = { asset, img };
    } catch (err) {
      console.error(`    ⚠️  Sanity upload failed: ${err.message}`);
    }
  }

  // ── Set coverImage ────────────────────────────────────────────────────────
  const heroData = uploaded["hero"];
  if (heroData) {
    if (!doc.coverImage?.asset?._ref) {
      console.log(`\n🖼️   Setting coverImage…`);
      await client.patch(doc._id).set({
        coverImage: {
          _type: "image",
          asset: { _type: "reference", _ref: heroData.asset._id },
          alt: heroData.img.alt,
        },
      }).commit();
      console.log("    ✅  coverImage set");
    } else {
      console.log("\n⏭️   coverImage already set — skipping");
    }
  }

  // ── Insert body images ────────────────────────────────────────────────────
  const bodyImages = ["matrix", "iceberg", "hubspot", "probability"];
  let body = [...(doc.body ?? [])];

  // Check which images are already in the body (idempotent)
  const existingRefs = new Set(
    body
      .filter((b) => b._type === "image" && b.asset?._ref)
      .map((b) => b.asset._ref)
  );

  // Build sorted insertion list (insert in reverse order to preserve indices)
  const insertions = [];

  for (const key of bodyImages) {
    const data = uploaded[key];
    if (!data) continue;
    if (existingRefs.has(data.asset._id)) {
      console.log(`\n⏭️   ${key} already in body — skipping`);
      continue;
    }

    const img = data.img;
    let idx = img.insertAfterPattern ? findInsertionIndex(body, img.insertAfterPattern) : -1;
    if (idx === -1) {
      idx = body.length; // append if not found
      console.log(`\n📄  ${key}: pattern not matched — will append`);
    } else {
      console.log(`\n📄  ${key}: inserting at body index ${idx}`);
    }

    insertions.push({
      idx,
      block: {
        _type: "image",
        _key: `img-${key}-${Date.now()}`,
        asset: { _type: "reference", _ref: data.asset._id },
        alt: img.alt,
        caption: img.caption ?? "",
      },
    });
  }

  // Insert in reverse order so earlier insertions don't shift later indices
  insertions.sort((a, b) => b.idx - a.idx);
  for (const { idx, block } of insertions) {
    body = [...body.slice(0, idx), block, ...body.slice(idx)];
  }

  if (insertions.length > 0) {
    console.log(`\n💾  Saving updated body (${body.length} blocks)…`);
    await client.patch(doc._id).set({ body }).commit();
    console.log("    ✅  Body saved");
  } else {
    console.log("\n⏭️   No body changes needed");
  }

  const summary = Object.keys(uploaded);
  console.log(`\n🎉  Done! Uploaded: ${summary.join(", ")}`);
  console.log(`    Studio: https://${PROJECT_ID}.sanity.studio/structure/insight;${doc._id}\n`);
}

main().catch((err) => { console.error("\n❌  Fatal:", err.message); process.exit(1); });
