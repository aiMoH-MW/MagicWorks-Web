/**
 * Sanity cleanup:
 *   1. Delete event / gallery posts (Diwali, Christmas, Anniversary, Retreat)
 *   2. Deduplicate insights — keep the one with the longest body, delete the rest
 *
 * Usage:  node scripts/cleanup-sanity.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

function loadEnv() {
  try {
    const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../.env.local");
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const k = t.slice(0, eq).trim();
      const v = t.slice(eq + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  } catch { /* ignore */ }
}
loadEnv();

const client = createClient({
  projectId: "wa86etuq",
  dataset: "production",
  apiVersion: "2025-06-03",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const EVENT_KEYWORDS = [
  "diwali",
  "christmas",
  "anniversary",
  "new year bash",
  "annual team retreat",
  "team retreat",
  "celebration",
];

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌  SANITY_API_TOKEN not set");
    process.exit(1);
  }

  // ── Fetch all insights ───────────────────────────────────────────────────
  const all = await client.fetch(
    `*[_type == "insight"]{ _id, title, slug, "bodyLen": length(pt::text(body)), publishedAt }`
  );

  console.log(`📋  Total insights in Sanity: ${all.length}\n`);

  // ── 1. Delete event posts ────────────────────────────────────────────────
  const events = all.filter((d) => {
    const t = (d.title || "").toLowerCase();
    return EVENT_KEYWORDS.some((kw) => t.includes(kw));
  });

  if (events.length) {
    console.log(`🗑   Deleting ${events.length} event/gallery posts…`);
    for (const doc of events) {
      await client.delete(doc._id);
      console.log(`  ✗  Deleted: ${doc.title}`);
    }
  } else {
    console.log("✓  No event posts found.");
  }

  // ── 2. Deduplicate by slug ───────────────────────────────────────────────
  const remaining = all.filter((d) => {
    const t = (d.title || "").toLowerCase();
    return !EVENT_KEYWORDS.some((kw) => t.includes(kw));
  });

  // Group by slug
  const bySlug = {};
  for (const doc of remaining) {
    const key = doc.slug?.current || doc.title;
    if (!bySlug[key]) bySlug[key] = [];
    bySlug[key].push(doc);
  }

  const dupeGroups = Object.values(bySlug).filter((g) => g.length > 1);
  console.log(`\n🔍  Found ${dupeGroups.length} duplicate groups`);

  let deleted = 0;
  for (const group of dupeGroups) {
    // Keep the one with the longest body (most content), or latest publishedAt
    const sorted = group.sort((a, b) => {
      if ((b.bodyLen || 0) !== (a.bodyLen || 0)) return (b.bodyLen || 0) - (a.bodyLen || 0);
      return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
    });

    const keep = sorted[0];
    const toDelete = sorted.slice(1);

    console.log(`\n  Keep  → ${keep.title?.substring(0, 60)} (${keep.bodyLen || 0} chars)`);
    for (const doc of toDelete) {
      await client.delete(doc._id);
      console.log(`  Dupe  ✗ ${doc._id} (${doc.bodyLen || 0} chars)`);
      deleted++;
    }
  }

  // ── Summary ──────────────────────────────────────────────────────────────
  const finalCount = await client.fetch(`count(*[_type == "insight"])`);

  console.log(`
✅  Cleanup complete.
   Events deleted:     ${events.length}
   Duplicates deleted: ${deleted}
   Insights remaining: ${finalCount}
`);
}

run().catch((err) => {
  console.error("Cleanup failed:", err.message);
  process.exit(1);
});
