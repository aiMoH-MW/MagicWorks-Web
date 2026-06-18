/**
 * Delete old job openings from Sanity that are no longer needed.
 *
 * Jobs to KEEP (currently live on the careers page):
 *   - Performance Marketing Executive
 *   - Digital Marketing Manager
 *   - SEO Executive
 *   - Sales Executive — AI Product
 *   - Digital Marketing Sales Executive
 *   - Web Developer (Full Stack)
 *   - SEO / AEO / GEO Intern
 *   - Digital Marketing Intern
 *
 * Usage:
 *   node scripts/cleanup-old-jobs.mjs           — dry run (shows what would be deleted)
 *   node scripts/cleanup-old-jobs.mjs --confirm  — actually deletes
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

// Exact titles of jobs to KEEP (case-insensitive match)
const KEEP_TITLES = [
  "performance marketing executive",
  "digital marketing manager",
  "seo executive",
  "sales executive — ai product",
  "sales executive - ai product",
  "digital marketing sales executive",
  "web developer",
  "seo / aeo / geo intern",
  "seo/aeo/geo intern",
  "digital marketing intern",
];

function shouldKeep(title) {
  const lower = title.toLowerCase();
  return KEEP_TITLES.some((k) => lower.includes(k));
}

const isDryRun = !process.argv.includes("--confirm");

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌  SANITY_API_TOKEN not set in .env.local");
    process.exit(1);
  }

  const allJobs = await client.fetch(
    `*[_type == "jobOpening"] { _id, title, status } | order(title asc)`
  );

  console.log(`\nFound ${allJobs.length} job opening(s) in Sanity:\n`);

  const toDelete = [];
  const toKeep = [];

  for (const job of allJobs) {
    if (shouldKeep(job.title)) {
      toKeep.push(job);
    } else {
      toDelete.push(job);
    }
  }

  console.log("✅  KEEP:");
  toKeep.forEach((j) => console.log(`   • ${j.title} [${j.status}]`));

  console.log("\n🗑️   DELETE:");
  if (toDelete.length === 0) {
    console.log("   (none — all jobs are in the keep list)");
  } else {
    toDelete.forEach((j) => console.log(`   • ${j.title} [${j.status ?? "draft"}]`));
  }

  if (isDryRun) {
    console.log(
      `\n⚠️  DRY RUN — nothing deleted. Run with --confirm to actually delete ${toDelete.length} job(s).\n`
    );
    return;
  }

  if (toDelete.length === 0) {
    console.log("\nNothing to delete.\n");
    return;
  }

  console.log(`\nDeleting ${toDelete.length} job(s)...`);
  for (const job of toDelete) {
    await client.delete(job._id);
    console.log(`   ✓ Deleted: ${job.title}`);
  }
  console.log("\nDone.\n");
}

run().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
