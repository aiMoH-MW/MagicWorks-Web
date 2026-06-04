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
import { createReadStream, readFileSync } from "fs";
import { randomBytes } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

// Load .env.local manually so this works on Windows without setting env vars
function loadEnv() {
  try {
    const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../.env.local");
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const k = trimmed.slice(0, eq).trim();
      const v = trimmed.slice(eq + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {
    // .env.local not found — rely on process.env
  }
}
loadEnv();

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

/** Map WordPress category string + title to Sanity category value */
function mapCategory(text) {
  if (!text) return "industry-insights";
  const c = text.toLowerCase();
  if (c.includes("seo") || c.includes("aeo") || c.includes("google ai overview") || c.includes("answer engine")) return "seo-aeo";
  if (c.includes(" ai ") || c.includes("artificial intelligence") || c.includes("ai-powered") || c.includes("ai investment") || c.includes("ai in ")) return "ai-automation";
  if (c.includes("web") || c.includes("website") || c.includes("development")) return "web-development";
  if (c.includes("social media") || c.includes("digital marketing") || c.includes("ppc") || c.includes("performance marketing") || c.includes("ads")) return "digital-marketing";
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

// CSV lives in the parent folder: MagicWorks Web/Docs/
const CSV_PATH = path.join(__dirname, "../../Docs/mwits-Posts-Export-2026-June-03-0916.csv");

async function importPosts() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌  SANITY_API_TOKEN is not set.");
    console.error("   Get it from sanity.io/manage → project wa86etuq → API → Tokens");
    process.exit(1);
  }

  // ── STRATEGY: read by column INDEX (0–14) not by name.
  // The CSV has Elementor JSON in column 21 (_elementor_data) which contains
  // unescaped commas and quotes that shift all subsequent column indices,
  // scrambling Status, Slug, etc. Columns 0–14 (ID through Categories) are
  // always correct because they come before the Elementor columns.
  // Col indices: 0=ID, 1=Title, 2=Content, 3=Excerpt, 4=Date,
  //              5=PostType, 6=Permalink, 14=Categories
  const records = [];

  await new Promise((resolve, reject) => {
    createReadStream(CSV_PATH)
      .pipe(
        parse({
          columns: false,        // read as arrays, not objects
          skip_empty_lines: true,
          relax_quotes: true,
          relax_column_count: true,
          from_line: 2,          // skip header row
        })
      )
      .on("data", (row) => records.push(row))
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`📄  Read ${records.length} rows from CSV`);

  // Event/gallery title keywords to skip
  const eventKeywords = ["diwali", "christmas", "anniversary", "celebration", "bash", "retreat", "party"];
  // Site page titles to skip (WordPress pages that aren't blog posts)
  const pageSkip = ["home", "contact", "about", "services", "work", "careers", "privacy", "terms"];

  const posts = records.filter((row) => {
    const title = (row[1] || "").trim();
    const content = row[2] || "";
    const postType = (row[5] || "").trim();

    // Must be a "post" type
    if (postType !== "post") return false;
    // Must have meaningful content (> 200 chars of raw HTML)
    if (content.length < 200) return false;
    // Skip events
    const tl = title.toLowerCase();
    if (eventKeywords.some((kw) => tl.includes(kw))) return false;
    if (pageSkip.some((kw) => tl === kw)) return false;
    // Skip Simpli Distance duplicate (already a case study)
    if (tl.includes("simpli distance") || tl.includes("simplidistance")) return false;
    // Skip Aishwaryam / SRJ duplicates
    if (tl.includes("aishwaryam") || tl.includes("srj")) return false;
    return true;
  });

  console.log(`✅  ${posts.length} posts to import`);

  let created = 0;

  for (const row of posts) {
    const wpId = (row[0] || "").trim() || Math.random().toString(36).slice(2);
    const title = stripHtml(row[1] || "Untitled").trim();
    const rawContent = row[2] || "";
    const rawExcerpt = row[3] || "";
    const date = row[4] || "";
    const permalink = row[6] || "";
    const categories = row[14] || "";

    // Derive slug from permalink or title
    const permalinkSlug = permalink.replace(/.*\/([^/]+)\/?$/, "$1");
    const slug = permalinkSlug && permalinkSlug.length > 3
      ? permalinkSlug
      : slugify(title);

    const sanityId = `insight-wp-${wpId}`;

    const excerpt = stripHtml(rawExcerpt).substring(0, 155) ||
      stripHtml(rawContent).substring(0, 155);

    const body = htmlToBlocks(rawContent);
    const publishedAt = date
      ? new Date(date).toISOString()
      : new Date().toISOString();

    const doc = {
      _id: sanityId,
      _type: "insight",
      title,
      slug: { _type: "slug", current: slug },
      excerpt: excerpt.substring(0, 155),
      publishedAt,
      category: mapCategory(categories + " " + title),
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
    };

    try {
      await client.createOrReplace(doc);
      console.log(`  ✓  Imported: ${title}`);
      created++;
    } catch (err) {
      console.error(`  ✗  Failed: ${title} — ${err.message}`);
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 100));
  }

  console.log(`\n🎉  Done. Imported/updated: ${created} posts (re-run safe — uses createOrReplace).`);
}

importPosts().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
