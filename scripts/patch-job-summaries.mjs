/**
 * Patch em dashes out of two job summaries in Sanity.
 * Usage:
 *   node scripts/patch-job-summaries.mjs            — dry run
 *   node scripts/patch-job-summaries.mjs --confirm  — apply changes
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

const PATCHES = [
  {
    slug: "sales-executive-ai-product",
    summary:
      "Own the full sales cycle for MagicFlow AI, our AI-powered lead qualification chatbot, from prospecting to close, targeting SMEs and growth-focused businesses.",
  },
  {
    slug: "digital-marketing-sales-executive",
    summary:
      "Sell integrated digital marketing services: SEO retainers, paid media, social, and content, to ambitious businesses. Prior agency sales experience required.",
  },
];

const isDryRun = !process.argv.includes("--confirm");

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌  SANITY_API_TOKEN not set in .env.local");
    process.exit(1);
  }

  for (const patch of PATCHES) {
    const job = await client.fetch(
      `*[_type == "jobOpening" && slug.current == $slug][0] { _id, title, summary }`,
      { slug: patch.slug }
    );

    if (!job) {
      console.log(`⚠️  Not found: ${patch.slug}`);
      continue;
    }

    console.log(`\n📝  ${job.title}`);
    console.log(`   Before: ${job.summary}`);
    console.log(`   After:  ${patch.summary}`);

    if (!isDryRun) {
      await client.patch(job._id).set({ summary: patch.summary }).commit();
      console.log(`   ✓ Patched`);
    }
  }

  if (isDryRun) {
    console.log("\n⚠️  DRY RUN — nothing changed. Run with --confirm to apply.\n");
  } else {
    console.log("\n✅  Done.\n");
  }
}

run().catch((err) => { console.error(err); process.exit(1); });
