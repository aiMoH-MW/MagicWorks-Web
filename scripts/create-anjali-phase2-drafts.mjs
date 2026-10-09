/**
 * create-anjali-phase2-drafts.mjs
 *
 * Creates the four "Same War, New Weapons" Phase 2 articles by Anjali Kalaskar
 * in Sanity as DRAFTS (not visible on the live site until promoted):
 *
 *   08  What the Dashboard Hides                      -> Tue 13 Oct 2026
 *   09  Vanity vs Value                               -> Tue 20 Oct 2026
 *   10  Attribution Is a Story You Tell Yourself      -> Tue 27 Oct 2026
 *   11  The Sunday Problem                            -> Tue  3 Nov 2026
 *
 * Each goes live at 8:00 AM IST on its date (publishedAt). Draft documents are
 * promoted by running publish-draft.mjs on the day (reminders are set up).
 *
 * Source: Docs/Blogs/Anjali/MagicWorks_SWNW_P2_NN_*  (article text converted by
 * scripts/anjali-p2/_convert.py into scripts/anjali-p2/NN.json).
 *
 * Images: the infographic and chart in each pack are inserted inline. No
 * separate "feature image" was supplied, so the infographic is used as the
 * cover image. To use a proper feature image instead, save it in that article's
 * images/ folder as feature.jpg (or .png/.webp) and re-run this script: it is
 * picked up automatically and the draft is replaced.
 *
 * Downloads (PDF/XLSX) are copied to public/downloads and linked at
 * /downloads/<file> (commit + push so they are live before the post).
 *
 * Run all:    node scripts/create-anjali-phase2-drafts.mjs
 * Run one:    node scripts/create-anjali-phase2-drafts.mjs 08
 * Publish:    node scripts/publish-draft.mjs insight-anjali-what-the-dashboard-hides
 *             node scripts/publish-draft.mjs insight-anjali-vanity-vs-value-metrics
 *             node scripts/publish-draft.mjs insight-anjali-reading-ga4-attribution-honestly
 *             node scripts/publish-draft.mjs insight-anjali-the-sunday-problem
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

const AUTHOR_ID = "author-anjali-kalaskar";

// 8:00 AM IST = 02:30 UTC
const SCHEDULE = {
  "08": "2026-10-13T02:30:00.000Z",
  "09": "2026-10-20T02:30:00.000Z",
  "10": "2026-10-27T02:30:00.000Z",
  "11": "2026-11-03T02:30:00.000Z",
};

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

async function uploadImage(absPath) {
  const asset = await client.assets.upload("image", fs.createReadStream(absPath), {
    filename: path.basename(absPath),
    contentType: MIME[path.extname(absPath).toLowerCase()],
  });
  return asset._id;
}

function findFeature(imagesDir) {
  for (const ext of [".jpg", ".jpeg", ".png", ".webp"]) {
    const p = path.join(imagesDir, "feature" + ext);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function createOne(id) {
  const data = JSON.parse(readFileSync(path.join(__dirname, "anjali-p2", `${id}.json`), "utf8"));
  const folder = path.join(ROOT, data.folder);
  const imagesDir = path.join(folder, "images");

  console.log(`\n=== ${id}: ${data.title} ===`);

  // 1. Download file -> public/downloads
  const dlDir = path.join(folder, "downloadable");
  if (fs.existsSync(dlDir)) {
    const pubDir = path.join(__dirname, "../public/downloads");
    fs.mkdirSync(pubDir, { recursive: true });
    for (const f of fs.readdirSync(dlDir)) {
      fs.copyFileSync(path.join(dlDir, f), path.join(pubDir, f));
      console.log(`📎  Copied download -> public/downloads/${f}`);
    }
  }

  // 2. Inline images
  const body = [];
  for (const block of data.body) {
    if (block._type === "image") {
      const abs = path.join(ROOT, block.__file);
      if (!fs.existsSync(abs)) { console.error(`❌  Missing image: ${abs}`); process.exit(1); }
      console.log(`📤  Uploading inline image ${path.basename(abs)}…`);
      const assetId = await uploadImage(abs);
      body.push({ _type: "image", _key: block._key, asset: { _type: "reference", _ref: assetId }, alt: block.alt });
    } else {
      body.push(block);
    }
  }

  // 3. Cover image: feature.* if supplied, else the infographic master
  let coverPath = findFeature(imagesDir);
  let coverAlt = data.imageAlt;
  if (!coverPath) {
    coverPath = fs.readdirSync(imagesDir)
      .filter((f) => /infographic\.jpg$/i.test(f))
      .map((f) => path.join(imagesDir, f))[0];
    coverAlt = data.infographicAlt || data.imageAlt;
    console.log("ℹ️   No feature image supplied; using the infographic as cover.");
  }
  console.log(`📤  Uploading cover ${path.basename(coverPath)}…`);
  const coverId = await uploadImage(coverPath);

  const docId = `drafts.insight-anjali-${data.slug}`;
  const doc = {
    _id: docId,
    _type: "insight",
    title: data.title,
    seoTitle: data.seoTitle,
    slug: { _type: "slug", current: data.slug },
    excerpt: data.excerpt,
    author: { _type: "reference", _ref: AUTHOR_ID },
    publishedAt: SCHEDULE[id],
    categories: ["digital-marketing"],
    pillar: "digital-marketing",
    coverImage: { _type: "image", asset: { _type: "reference", _ref: coverId }, alt: coverAlt },
    body,
    faq: data.faq,
    tags: data.tags,
    isGated: false,
  };

  const created = await client.createOrReplace(doc);
  console.log(`✅  Draft created: ${created._id}  (live date ${SCHEDULE[id]})`);
  console.log(`    Publish with: node scripts/publish-draft.mjs insight-anjali-${data.slug}`);
}

async function main() {
  const only = process.argv[2];
  const ids = only ? [only] : Object.keys(SCHEDULE);
  for (const id of ids) {
    if (!SCHEDULE[id]) { console.error(`❌  Unknown article "${id}". Use 08, 09, 10 or 11.`); process.exit(1); }
  }

  const author = await client.fetch(`*[_id == $id][0]{ _id, name }`, { id: AUTHOR_ID });
  if (!author) { console.error(`❌  Author ${AUTHOR_ID} not found in Sanity`); process.exit(1); }
  console.log(`👤  Author: ${author.name}`);

  for (const id of ids) await createOne(id);
  console.log("\n✅  Done. Commit and push public/downloads so the files are live before each post.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
