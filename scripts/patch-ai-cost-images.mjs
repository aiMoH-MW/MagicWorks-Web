/**
 * patch-ai-cost-images.mjs
 *
 * Patches the AI cost article in Sanity with all 5 images using EXTERNAL URLs
 * (no Sanity asset upload required — bypasses "create" permission issue).
 *
 * Sets:
 *   externalCoverImageUrl  → hero iceberg image
 *   body (externalImage blocks) → 4 inline images at correct positions
 *
 * Run:  node scripts/patch-ai-cost-images.mjs
 *
 * Requires .env.local:  NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// ── Load .env.local ───────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
if (!fs.existsSync(envPath)) { console.error("❌  .env.local not found"); process.exit(1); }

const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const [k, ...v] = line.split("=");
  if (k?.trim() && v.length) env[k.trim()] = v.join("=").trim().replace(/^['"]|['"]$/g, "");
}

const PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN      = env.SANITY_API_TOKEN;

if (!PROJECT_ID) { console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID missing"); process.exit(1); }
if (!TOKEN)      { console.error("❌  SANITY_API_TOKEN missing"); process.exit(1); }

const client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: "2024-01-01", token: TOKEN, useCdn: false });

// ── Image definitions (BerqWP CDN — publicly accessible, no upload needed) ───
// URLs verified via WordPress REST API (/wp-json/wp/v2/media?parent=996538)
const CDN = "https://images.berqwp.com/?domain=magicworksitsolutions.com&w=300&mw=1920&q=90&url=";
const WP  = "https://magicworksitsolutions.com/wp-content/uploads/2026/05/";

const IMAGES = [
  {
    key: "hero",
    url: `${CDN}${encodeURIComponent(WP + "real-cost-ai-india-hero.webp")}`,
    alt: "AI cost iceberg: vendor license (₹15 Lakh) is the visible tip; integration ₹25–40L, training ₹20–30L, maintenance ₹15–25L, multilingual ₹10–20L, LLM API ₹20–35L, and governance ₹10–15L are hidden below the waterline. Total hidden cost: ₹100–165 Lakh+.",
    caption: "",
    role: "cover",
  },
  {
    key: "matrix",
    url: `${CDN}${encodeURIComponent(WP + "5-use-case-comparison-matrix.webp")}`,
    alt: "Comparison matrix of 5 AI use cases for Indian marketing and sales in 2026 — AI Chatbot Deployment (₹3–25L, 8–14 months, High hidden cost intensity), Marketing Automation+AI (₹8–50L, 12–18 months, Very High), Sales Enablement+Conversation Intel (₹6–40L, 9–15 months, High), AI Content Production (₹2–15L, 4–8 months, Medium), AI Analytics & Reporting (₹5–30L, 6–12 months, Medium).",
    caption: "Five AI use cases compared by budget range, realistic payback timeline, hidden cost intensity, and best-fit business profile.",
    insertAfterPattern: /article covers|what this article|use cases? (this|the) article/i,
    role: "body",
  },
  {
    key: "iceberg",
    url: `${CDN}${encodeURIComponent(WP + "ai-cost-iceberg.webp")}`,
    alt: "The AI cost iceberg: platform licence / vendor sticker price is the visible cost at 25–35% of total. Hidden below: integration with existing systems 150–200% of platform cost, implementation and onboarding 20–50%, team training ₹30K–₹1.5L per project, multilingual layer 20–30% premium, LLM API usage 30–50% of ongoing cost, annual maintenance 15–30% of initial cost.",
    caption: "Vendor pricing pages show only 25–35% of true first-year cost. The remaining 65–75% is hidden below the waterline.",
    insertAfterPattern: /reason 1|vendor pricing pages|25.{0,10}35 percent of true|platform license is the entry fee|entry fee\.|entry fee,/i,
    role: "body",
  },
  {
    key: "hubspot",
    url: `${CDN}${encodeURIComponent(WP + "hubspot-vs-salesforce-tco.webp")}`,
    alt: "First-Year Total Cost of Ownership comparison for a typical mid-sized Indian business (20 sales users + 5 marketing users): HubSpot Professional ₹35–60 lakh vs Salesforce Marketing Cloud ₹80 lakh–1.5 crore. The 2–3× gap is driven almost entirely by hidden operational costs, not licence fees. Per Avidly Agency 2026 research.",
    caption: "HubSpot Professional vs Salesforce Marketing Cloud TCO comparison. The 2–3× gap is in hidden operational costs, not licences. Per Avidly Agency 2026 research.",
    insertAfterPattern: /HubSpot Professional|Salesforce Marketing Cloud|three cost layers nobody|reality check|cost layers.{0,20}nobody compares/i,
    role: "body",
  },
  {
    key: "probability",
    url: `${CDN}${encodeURIComponent(WP + "probability-weighted-ai-cost.webp")}`,
    alt: "Probability-weighted expected value: a ₹15 lakh AI project has 95% probability of zero measurable return (MIT Project NANDA) and 5% probability of 3–5× return, producing a net expected return of −₹10 to −₹12 lakh. This is why shutdown discipline matters more than budget size.",
    caption: "The probability-weighted math shows most AI investments have a negative expected return without proper shutdown discipline. MIT Project NANDA: 95% of enterprise GenAI pilots produce no measurable return.",
    insertAfterPattern: /probability.{0,15}weighted|95 percent|NANDA|hidden 95 percent|the probability-weighted math|probability of measurable/i,
    role: "body",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function blockText(block) {
  if (block._type !== "block" || !Array.isArray(block.children)) return "";
  return block.children.map((c) => c.text ?? "").join("");
}

function findInsertionIndex(body, pattern) {
  for (let i = 0; i < body.length; i++) {
    if (pattern.test(blockText(body[i]))) {
      // Find a good paragraph after the match to insert after
      for (let j = i + 1; j < Math.min(i + 5, body.length); j++) {
        if (body[j]._type === "block" && body[j].style === "normal" && blockText(body[j]).length > 20) {
          return j + 1;
        }
      }
      return i + 1;
    }
  }
  return -1;
}

// ── Main ──────────────────────────────────────────────────────────────────────
const SLUG = "real-cost-of-ai-indian-marketing-sales-2026";

async function main() {
  console.log(`\n🔍  Looking up article: ${SLUG}`);
  const doc = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id, title, externalCoverImageUrl, coverImage, body }`,
    { slug: SLUG }
  );
  if (!doc) { console.error(`❌  Article not found`); process.exit(1); }
  console.log(`✅  Found: "${doc.title}" (${doc._id})\n`);

  const patches = {};

  // ── Cover image ─────────────────────────────────────────────────────────────
  const heroImg = IMAGES.find((i) => i.key === "hero");
  if (!doc.coverImage?.asset && !doc.externalCoverImageUrl) {
    patches.externalCoverImageUrl = heroImg.url;
    console.log("🖼️   Will set externalCoverImageUrl (cover image)");
  } else if (doc.externalCoverImageUrl) {
    console.log("⏭️   externalCoverImageUrl already set");
  } else {
    console.log("⏭️   Sanity coverImage already set — skipping external cover");
  }

  // ── Body images ──────────────────────────────────────────────────────────────
  let body = [...(doc.body ?? [])];

  // Which external images are already in body
  const existingUrls = new Set(
    body.filter((b) => b._type === "externalImage" && b.url).map((b) => b.url)
  );

  const insertions = [];
  for (const img of IMAGES.filter((i) => i.role === "body")) {
    if (existingUrls.has(img.url)) {
      console.log(`⏭️   ${img.key}: already in body`);
      continue;
    }
    let idx = img.insertAfterPattern ? findInsertionIndex(body, img.insertAfterPattern) : -1;
    if (idx === -1) { idx = body.length; console.log(`📄  ${img.key}: pattern not matched — appending`); }
    else { console.log(`📄  ${img.key}: will insert at body index ${idx}`); }
    insertions.push({
      idx,
      block: {
        _type: "externalImage",
        _key: `extimg-${img.key}-${Date.now()}`,
        url: img.url,
        alt: img.alt,
        caption: img.caption ?? "",
      },
    });
  }

  // Insert in reverse order to preserve indices
  insertions.sort((a, b) => b.idx - a.idx);
  for (const { idx, block } of insertions) {
    body = [...body.slice(0, idx), block, ...body.slice(idx)];
  }

  if (insertions.length > 0) patches.body = body;

  // ── Commit ───────────────────────────────────────────────────────────────────
  if (Object.keys(patches).length === 0) {
    console.log("\n✅  Nothing to patch — all images already set.");
    return;
  }

  console.log(`\n💾  Patching document with ${Object.keys(patches).join(", ")}…`);
  await client.patch(doc._id).set(patches).commit();
  console.log("✅  Patched successfully!");
  console.log(`\n🎉  Done! Open in Studio to verify:`);
  console.log(`    https://${PROJECT_ID}.sanity.studio/structure/insight;${doc._id}\n`);
}

main().catch((err) => { console.error("\n❌  Fatal:", err.message); process.exit(1); });
