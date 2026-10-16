/**
 * create-purva-oct-drafts.mjs
 *
 * Creates two Purva Desai articles in Sanity as DRAFTS (not visible on the live
 * site until promoted):
 *
 *   where-listed   Where Your Business Should Be Listed Online in India...
 *                  -> Thu 22 Oct 2026, 9:00 AM IST
 *   voice-search   Voice Search in India: How Customers Ask Out Loud...
 *                  -> Tue 27 Oct 2026, 9:00 AM IST
 *
 * ORDER MATTERS: the Voice Search article links to the Where-Listed article,
 * so Where-Listed must go live first (it does, 5 days earlier).
 *
 * Source: Docs/Blogs/Purva/<folder>/<folder>.docx (+ .jpg banner used as the
 * cover image), converted by scripts/purva-p2/_convert.py into
 * scripts/purva-p2/*.json.
 *
 * Author "Purva Desai" is looked up from the existing teamMember record.
 *
 * Run all:  node scripts/create-purva-oct-drafts.mjs
 * Run one:  node scripts/create-purva-oct-drafts.mjs where-listed
 * Publish:  node scripts/publish-draft.mjs insight-purva-where-listed-online
 *           node scripts/publish-draft.mjs insight-purva-voice-search-india
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "../.."); // "MagicWorks Web" folder (contains Docs/)

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

// 9:00 AM IST = 03:30 UTC
const POSTS = {
  "where-listed": { id: "insight-purva-where-listed-online", publishedAt: "2026-10-22T03:30:00.000Z" },
  "voice-search": { id: "insight-purva-voice-search-india",  publishedAt: "2026-10-27T03:30:00.000Z" },
};

async function createOne(key, author) {
  const data = JSON.parse(readFileSync(path.join(__dirname, "purva-p2", `${key}.json`), "utf8"));
  const cfg = POSTS[key];

  if (data.title.length > 100) throw new Error(`Title too long (${data.title.length}/100)`);
  if (data.excerpt.length > 155) throw new Error(`Excerpt too long (${data.excerpt.length}/155)`);
  if (data.seoTitle.length > 60) throw new Error(`SEO title too long (${data.seoTitle.length}/60)`);

  const imagePath = path.join(ROOT, data.image);
  if (!fs.existsSync(imagePath)) { console.error(`❌  Hero image not found: ${imagePath}`); process.exit(1); }

  console.log(`\n=== ${data.title} ===`);
  console.log("📤  Uploading cover image…");
  const asset = await client.assets.upload("image", fs.createReadStream(imagePath), {
    filename: path.basename(imagePath),
  });
  console.log(`✅  Image uploaded: ${asset._id}`);

  const doc = {
    _id: `drafts.${cfg.id}`,
    _type: "insight",
    title: data.title,
    seoTitle: data.seoTitle,
    slug: { _type: "slug", current: data.slug },
    excerpt: data.excerpt,
    author: { _type: "reference", _ref: author._id },
    publishedAt: cfg.publishedAt,
    categories: ["digital-marketing"],
    pillar: "digital-marketing",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: data.imageAlt },
    body: data.body,
    faq: data.faq,
    tags: data.tags,
    isGated: false,
  };

  const created = await client.createOrReplace(doc);
  console.log(`✅  Draft created: ${created._id}  (live date ${cfg.publishedAt})`);
  console.log(`    Publish with: node scripts/publish-draft.mjs ${cfg.id}`);
}

async function main() {
  const only = process.argv[2];
  const keys = only ? [only] : Object.keys(POSTS);
  for (const k of keys) if (!POSTS[k]) { console.error(`❌  Unknown article "${k}". Use where-listed or voice-search.`); process.exit(1); }

  const author = await client.fetch(
    `*[_type == "teamMember" && (slug.current == "purva-desai" || name == "Purva Desai")][0]{ _id, name }`
  );
  if (!author) { console.error("❌  Could not find the Purva Desai teamMember record."); process.exit(1); }
  console.log(`👤  Author: ${author.name} (${author._id})`);

  for (const k of keys) await createOne(k, author);
  console.log("\n✅  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
