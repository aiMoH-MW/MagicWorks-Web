/**
 * WordPress CSV → Sanity import script
 *
 * Usage:
 *   SANITY_API_TOKEN=your_token node scripts/import-wordpress.mjs
 *
 * Get the token from:
 *   sanity.io/manage → your project (wa86etuq) → API → Tokens → Add token (Editor role)
 *
 * The CSV to import: Docs/mwits-Posts-Export-2026-June-03-0916.csv
 */

import { createClient } from "@sanity/client";
import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { randomBytes } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Sanity client (needs write token) ─────────────────────
const client = createClient({
  projectId: "wa86etuq",
  dataset: "production",
  apiVersion: "2025-06-03",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ── Helpers ────────────────────────────────────────────────

function key() {
  return randomBytes(8).toString("hex");
}

/** Strip HTML tags and decode entities — produces plain text */
function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Convert HTML string → Sanity Portable Text block array */
function htmlToBlocks(html) {
  if (!html) return [];

  const blocks = [];

  // Split on block-level tags
  const sections = html
    .replace(/<\/?(div|section|article|aside|header|footer)[^>]*>/gi, "\n")
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  for (const section of sections) {
    // Headings
    const hMatch = section.match(/^<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/i);
    if (hMatch) {
      const level = parseInt(hMatch[1].replace("h", ""), 10);
      const text = stripHtml(hMatch[2]);
      if (text) {
        blocks.push({
          _type: "block",
          _key: key(),
          style: `h${level}`,
          children: [{ _type: "span", _key: key(), text, marks: [] }],
          markDefs: [],
        });
      }
      continue;
    }

    // List items — wrap in bullet list blocks
    if (/<ul|<ol/i.test(section)) {
      const items = [...section.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)];
      for (const item of items) {
        const text = stripHtml(item[1]);
        if (text) {
          blocks.push({
            _type: "block",
            _key: key(),
            style: "normal",
            listItem: "bullet",
            level: 1,
            children: [{ _type: "span", _key: key(), text, marks: [] }],
            markDefs: [],
          });
        }
      }
      continue;
    }

    // Paragraph (strip remaining tags)
    const text = stripHtml(section);
    if (text && text.length > 2) {
      blocks.push({
        _type: "block",
        _key: key(),
        style: "normal",
        children: [{ _type: "span", _key: key(), text, marks: [] }],
        markDefs: [],
      });
    }
  }

  return blocks;
}

/** Map WordPress category string to Sanity category value */
function mapCategory(wpCategories) {
  if (!wpCategories) return "industry-insights";
  const c = wpCategories.toLowerCase();
  if (c.includes("seo") || c.includes("aeo") || c.includes("search")) return "seo-aeo";
  if (c.includes("digital marketing") || c.includes("ppc") || c.includes("ads")) return "digital-marketing";
  if (c.includes("web") || c.includes("development")) return "web-development";
  if (c.includes("ai") || c.includes("automation")) return "ai-automation";
  return "industry-insights";
}

/** Slugify a string */
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 96);
}

// ── Main import ────────────────────────────────────────────

const CSV_PATH = path.join(__dirname, "../Docs/mwits-Posts-Export-2026-June-03-0916.csv");

async function importPosts() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌  SANITY_API_TOKEN is not set.");
    console.error("   Get it from sanity.io/manage → project wa86etuq → API → Tokens");
    process.exit(1);
  }

  const records = [];

  await new Promise((resolve, reject) => {
    createReadStream(CSV_PATH)
      .pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          relax_quotes: true,
          relax_column_count: true,
        })
      )
      .on("data", (row) => records.push(row))
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`📄  Read ${records.length} rows from CSV`);

  const posts = records.filter(
    (r) => r["Status"] === "publish" && r["Post Type"] === "post"
  );

  console.log(`✅  ${posts.length} published posts to import`);

  let created = 0;
  let skipped = 0;

  for (const post of posts) {
    const slug = post["Slug"] || slugify(post["Title"] || `post-${post["ID"]}`);

    // Check if already imported
    const existing = await client.fetch(
      `*[_type == "insight" && slug.current == $slug][0]._id`,
      { slug }
    );
    if (existing) {
      console.log(`  ↩  Skipping (exists): ${slug}`);
      skipped++;
      continue;
    }

    const title = post["Title"] || "Untitled";
    const rawContent = post["Content"] || "";
    const excerpt =
      post["_yoast_wpseo_metadesc"] ||
      post["Excerpt"] ||
      stripHtml(rawContent).substring(0, 155);

    const body = htmlToBlocks(rawContent);
    const publishedAt = post["Date"]
      ? new Date(post["Date"]).toISOString()
      : new Date().toISOString();

    const doc = {
      _type: "insight",
      title,
      slug: { _type: "slug", current: slug },
      excerpt: excerpt.substring(0, 155),
      publishedAt,
      category: mapCategory(post["Categories"]),
      isGated: false,
      body: body.length ? body : [
        {
          _type: "block",
          _key: key(),
          style: "normal",
          children: [{ _type: "span", _key: key(), text: stripHtml(rawContent).substring(0, 500), marks: [] }],
          markDefs: [],
        },
      ],
      seoTitle: post["_yoast_wpseo_title"] || undefined,
    };

    try {
      await client.create(doc);
      console.log(`  ✓  Imported: ${title}`);
      created++;
    } catch (err) {
      console.error(`  ✗  Failed: ${title} — ${err.message}`);
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log(`\n🎉  Done. Created: ${created}, Skipped (already existed): ${skipped}`);
}

importPosts().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
