/**
 * Patch all 8 active job openings with new fields:
 *   area, salary, subtitle, qualification, mandatory, closing
 *
 * Usage:  node scripts/patch-job-fields.mjs
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

// Keyed by slug.current
const PATCHES = {
  "performance-marketing-executive": {
    area: "Paid Media",
    salary: "₹2.50 to 3.60 LPA",
    subtitle: "Google Ads & Meta Ads",
    qualification: "B.Comm / M.Comm / B.E.",
    mandatory: "Must have prior experience in a digital marketing agency.",
    closing: "Candidates with multi-client handling experience and a track record of measurable ROAS improvement will be preferred. Immediate joiners are a plus.",
  },
  "digital-marketing-manager": {
    area: "Leadership",
    salary: "₹3.00 to 6.00 LPA",
    qualification: "MBA (Marketing) / B.E. / B.Sc.",
    mandatory: "Must have prior experience managing a team in a digital marketing agency.",
    closing: "Candidates who have grown client accounts and built high-performing teams will be strongly preferred.",
  },
  "seo-executive": {
    area: "SEO",
    salary: "₹1.80 to 3.00 LPA",
    subtitle: "SEO, GEO & AEO",
    qualification: "B.Sc. / B.E. / B.A.",
    mandatory: "Must have hands-on SEO experience from a digital marketing agency.",
    closing: "Candidates already experimenting with GEO and AEO will be given preference. Show us a ranking win.",
  },
  "sales-executive-ai-product": {
    area: "AI Product (MagicFlow AI)",
    salary: "₹3.00 to 6.00 LPA + incentives",
    qualification: "Any graduate",
    mandatory: "Must have prior B2B sales or SaaS sales experience.",
    closing: "3 openings available. Candidates who can demonstrate a closed deal pipeline will be preferred. Immediate joiners are a plus.",
  },
  "digital-marketing-sales-executive": {
    area: "Digital Marketing Agency",
    salary: "₹3.00 to 6.00 LPA + incentives",
    qualification: "Any graduate / MBA (Marketing)",
    mandatory: "Must have prior sales experience in a digital marketing or creative agency.",
    closing: "Candidates with an existing network of marketing decision-makers and a demonstrable sales track record will be preferred.",
  },
  "web-developer-full-stack": {
    area: "Technology",
    salary: "Competitive",
    subtitle: "Full Stack: React, Node.js & AI-Assisted",
    qualification: "B.E. / B.Tech / B.Sc. (CS)",
    mandatory: "Must have shipped production React.js applications.",
    closing: "Candidates who actively use AI coding tools (Claude Code, Copilot) in their daily workflow will be strongly preferred over those who use them occasionally.",
  },
  "seo-aeo-geo-intern": {
    area: "SEO / AEO / GEO",
    salary: "Performance-based stipend",
    qualification: "Pursuing / completed degree in Marketing or related field",
    closing: "Standout interns receive a certificate, LinkedIn recommendation, and are considered for a pre-placement offer (PPO).",
  },
  "digital-marketing-intern": {
    area: "",
    salary: "Performance-based stipend",
    qualification: "Pursuing / completed degree in Marketing or related field",
    closing: "Standout interns receive a certificate, LinkedIn recommendation, and are considered for a pre-placement offer (PPO).",
  },
};

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌  SANITY_API_TOKEN not set in .env.local");
    process.exit(1);
  }

  const jobs = await client.fetch(
    `*[_type == "jobOpening" && status == "active"] { _id, title, "slug": slug.current }`
  );

  console.log(`\nFound ${jobs.length} active job(s).\n`);

  for (const job of jobs) {
    const patch = PATCHES[job.slug];
    if (!patch) {
      console.log(`⚠️  No patch data for slug "${job.slug}" — skipping.`);
      continue;
    }
    await client.patch(job._id).set(patch).commit();
    console.log(`✓ Patched: ${job.title}`);
  }

  console.log("\n✅  All done. Refresh Sanity Studio to verify.\n");
}

run().catch(err => {
  console.error("Error:", err.message);
  process.exit(1);
});
