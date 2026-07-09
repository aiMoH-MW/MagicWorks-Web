/**
 * patch-blog-dates.mjs
 * 1. Spreads the 13 Dec-28-2025 blog posts across Sep–Dec 2025
 * 2. Moves SEO Executive job to position 2 on careers page
 *
 * Run: node patch-blog-dates.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envRaw = fs.readFileSync(path.join(__dirname, ".env.local"), "utf8");
const env = Object.fromEntries(
  envRaw.split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-06-03",
  token:     env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
});

// ── 1. Blog date patches ───────────────────────────────────────────────────────
// Spread the 13 Dec-28-2025 posts evenly from Sep 8 → Dec 1 2025
const blogPatches = [
  { id: "insight-wp-094dlbcrbvw9", date: "2025-09-08T09:00:00.000Z" }, // 9 Essential Steps to Start an Online Business
  { id: "insight-wp-1f7rltnbj0r",  date: "2025-09-15T09:00:00.000Z" }, // How to Hire the Best Digital Marketing Agency
  { id: "insight-wp-989195",        date: "2025-09-22T09:00:00.000Z" }, // How to Build a Customer-Led Content Strategy
  { id: "insight-wp-989236",        date: "2025-09-29T09:00:00.000Z" }, // 7 Proven Methods to Increase Website Conversions
  { id: "insight-wp-989261",        date: "2025-10-06T09:00:00.000Z" }, // The Complete Social Media Marketing Guide
  { id: "insight-wp-989272",        date: "2025-10-13T09:00:00.000Z" }, // Why Strategic Digital Marketing Firms Are Critical
  { id: "insight-wp-989280",        date: "2025-10-20T09:00:00.000Z" }, // The Foundation of Digital Success
  { id: "insight-wp-989299",        date: "2025-10-27T09:00:00.000Z" }, // From Spend to Scale
  { id: "insight-wp-989313",        date: "2025-11-03T09:00:00.000Z" }, // The Startup Digital Playbook
  { id: "insight-wp-989320",        date: "2025-11-10T09:00:00.000Z" }, // How AI is Transforming Performance Marketing
  { id: "insight-wp-989331",        date: "2025-11-17T09:00:00.000Z" }, // Beyond Code: India's Top Web Development Agencies
  { id: "insight-wp-989337",        date: "2025-11-24T09:00:00.000Z" }, // Shopify Website Development for Indian E-Commerce
  { id: "insight-wp-989347",        date: "2025-12-01T09:00:00.000Z" }, // How the Best Digital Marketing Agencies Transform
];

// ── 2. Job reorder — give SEO Executive postedAt just behind Client Servicing ──
// Client Servicing Manager is 2026-06-30, so SEO Executive gets 2026-06-29
const jobPatch = { id: "job-seo-executive", postedAt: "2026-06-29T00:00:00.000Z" };

async function main() {
  console.log("Patching blog dates...");
  for (const { id, date } of blogPatches) {
    await client.patch(id).set({ publishedAt: date }).commit();
    console.log(`  ${id} → ${date.slice(0, 10)}`);
  }

  console.log("\nReordering SEO Executive job...");
  await client.patch(jobPatch.id).set({ postedAt: jobPatch.postedAt }).commit();
  console.log(`  ${jobPatch.id} → ${jobPatch.postedAt.slice(0, 10)}`);

  console.log("\nAll done! Commit and deploy to see the date format change.");
}

main().catch((err) => { console.error(err); process.exit(1); });
