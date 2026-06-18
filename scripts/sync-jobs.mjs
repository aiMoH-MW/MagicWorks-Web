/**
 * Sync job openings in Sanity:
 *   1. Delete 5 old/irrelevant job openings
 *   2. Create 5 new job openings matching the current careers page
 *
 * Usage:
 *   node scripts/sync-jobs.mjs           — dry run (no changes)
 *   node scripts/sync-jobs.mjs --confirm  — execute changes
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

// ── Jobs to DELETE (titles to match, case-insensitive) ───────────────────────
const DELETE_TITLES = [
  "client account manager",
  "content writing intern",
  "seo & content strategist",
  "social media manager",
  "web development intern",
];

// ── Jobs to CREATE ───────────────────────────────────────────────────────────
const NEW_JOBS = [
  {
    _type: "jobOpening",
    title: "Digital Marketing Manager",
    slug: { _type: "slug", current: "digital-marketing-manager" },
    department: "digital-marketing",
    location: "Pune, India",
    type: "full-time",
    experience: "4+ years",
    status: "active",
    postedAt: "2026-06-17T00:00:00.000Z",
    summary:
      "Lead end-to-end digital marketing strategy for diverse client portfolios, managing cross-functional teams across SEO, paid media, social, content, and email.",
    responsibilities: [
      "Own digital marketing strategy and execution across 5–10 client accounts",
      "Lead and mentor a team of SEO, paid media, social, and content specialists",
      "Set KPIs, track campaign performance, and present results to clients and leadership",
      "Identify upsell and cross-sell opportunities within existing client relationships",
      "Stay current with algorithm updates, AI marketing tools, and industry trends",
      "Collaborate with the sales team on pitches, proposals, and new business onboarding",
    ],
    requirements: [
      "4+ years in digital marketing, with at least 1 year managing a team",
      "Proven track record running multi-channel campaigns (SEO + Paid + Social + Content)",
      "Strong command of GA4, Google Ads, and Meta Ads Manager",
      "Experience in an agency environment handling multiple client accounts simultaneously",
      "Excellent communication, reporting, and presentation skills",
    ],
    niceToHave: [
      "Hands-on experience with AI marketing tools (ChatGPT, Jasper, Perplexity, etc.)",
      "Knowledge of CRO, landing page optimisation, and A/B testing",
      "Familiarity with marketing automation or CRM platforms",
    ],
  },
  {
    _type: "jobOpening",
    title: "SEO Executive",
    slug: { _type: "slug", current: "seo-executive" },
    department: "digital-marketing",
    location: "Pune, India",
    type: "full-time",
    experience: "1–3 years",
    status: "active",
    postedAt: "2026-06-17T00:00:00.000Z",
    summary:
      "Manage SEO, GEO (Generative Engine Optimisation), and AEO (Answer Engine Optimisation) for multiple clients from an agency background.",
    responsibilities: [
      "Handle on-page, off-page, and technical SEO for 5–8 client websites",
      "Conduct keyword research, gap analysis, and produce detailed content briefs",
      "Implement GEO strategies to improve clients' visibility in AI-generated search results",
      "Optimise for AEO — featured snippets, Q&A schema, and voice search",
      "Build quality backlinks through digital PR, outreach, and content collaboration",
      "Track and report monthly on keyword rankings, organic traffic, and conversions",
    ],
    requirements: [
      "1–3 years of SEO experience, preferably in a digital marketing agency",
      "Proficiency with SEMrush, Ahrefs, or Moz for research and audits",
      "Working knowledge of Google Search Console and GA4",
      "Understanding of GEO and AEO principles and their growing importance",
      "Basic familiarity with HTML and technical SEO concepts (crawl, index, Core Web Vitals)",
    ],
    niceToHave: [
      "Experience using AI content tools for briefs, drafts, or optimisation",
      "Knowledge of schema markup and structured data implementation",
      "Prior work on e-commerce or SaaS client SEO",
    ],
  },
  {
    _type: "jobOpening",
    title: "Sales Executive — AI Product",
    slug: { _type: "slug", current: "sales-executive-ai-product" },
    department: "sales",
    location: "Pune, India",
    type: "full-time",
    experience: "1–3 years",
    status: "active",
    postedAt: "2026-06-17T00:00:00.000Z",
    summary:
      "Own the full sales cycle for MagicFlow AI — our AI-powered lead qualification chatbot — from prospecting to close, targeting SMEs and growth-focused businesses.",
    responsibilities: [
      "Prospect, qualify, and close deals for MagicFlow AI across SME and growth-stage businesses",
      "Conduct live product demos tailored to each prospect's use case",
      "Build and manage a pipeline of 50+ active leads using CRM tools",
      "Develop outbound sequences via email, LinkedIn, and phone",
      "Negotiate pricing and handle objections through to contract signing",
      "Relay prospect feedback to the product team to inform the roadmap",
    ],
    requirements: [
      "1–3 years of B2B sales experience, ideally in SaaS or tech products",
      "Strong communication, presentation, and negotiation skills",
      "Comfortable with CRM tools (HubSpot, Zoho, or similar)",
      "Self-driven with a hunter mindset and a bias for action",
      "Based in or willing to work from Pune (on-site role — 3 openings)",
    ],
    niceToHave: [
      "Prior experience selling AI, chatbot, or automation products",
      "Existing network of SME owners or marketing decision-makers in India",
      "Familiarity with lead qualification concepts and sales frameworks (BANT, SPIN)",
    ],
  },
  {
    _type: "jobOpening",
    title: "Digital Marketing Sales Executive",
    slug: { _type: "slug", current: "digital-marketing-sales-executive" },
    department: "sales",
    location: "Pune, India",
    type: "full-time",
    experience: "1–3 years",
    status: "active",
    postedAt: "2026-06-17T00:00:00.000Z",
    summary:
      "Sell integrated digital marketing services — SEO retainers, paid media, social, and content — to ambitious businesses. Prior agency sales experience required.",
    responsibilities: [
      "Identify and prospect businesses that would benefit from MagicWorks' digital marketing services",
      "Pitch tailored proposals across SEO, paid media, social media, and content packages",
      "Build and manage a pipeline of 30+ qualified leads at any given time",
      "Prepare proposals, service decks, and respond to client briefs or RFPs",
      "Attend industry events, networking meetups, and business forums to generate leads",
      "Coordinate handoffs to the delivery team and support client onboarding",
    ],
    requirements: [
      "1–3 years of sales experience in a digital marketing or creative agency",
      "Solid understanding of SEO, paid media, and social media services and their value",
      "Strong written and verbal communication skills",
      "Proven ability to meet or exceed revenue targets",
      "Based in Pune",
    ],
    niceToHave: [
      "Existing relationships with marketing managers or business owners in Pune/Mumbai",
      "Experience using LinkedIn Sales Navigator for outreach",
      "Familiarity with proposal tools like PandaDoc or similar",
    ],
  },
  {
    _type: "jobOpening",
    title: "SEO / AEO / GEO Intern",
    slug: { _type: "slug", current: "seo-aeo-geo-intern" },
    department: "digital-marketing",
    location: "Pune, India",
    type: "internship",
    experience: "Fresher / 0–1 year",
    status: "active",
    postedAt: "2026-06-17T00:00:00.000Z",
    summary:
      "Join the search team and gain hands-on experience in SEO, AEO, and Generative Engine Optimisation (GEO) — one of the most in-demand emerging skills. Work on live client projects from day one.",
    responsibilities: [
      "Assist with on-page optimisation across client websites (meta tags, headings, content)",
      "Conduct keyword research and help create structured content briefs",
      "Support GEO efforts — optimising content for visibility in AI-generated search answers",
      "Help implement AEO strategies including featured snippet targeting and Q&A schema",
      "Track keyword rankings and organic performance weekly using GSC and GA4",
      "Assist with backlink research, outreach tracking, and competitor monitoring",
    ],
    requirements: [
      "Currently pursuing or recently completed a degree in marketing, communications, or a related field",
      "Basic understanding of how search engines work and what SEO involves",
      "Strong written English and good research instincts",
      "Eagerness to learn about GEO, AEO, and AI's impact on search",
      "Internship duration: 3–6 months, Pune (on-site)",
    ],
    niceToHave: [
      "Any prior exposure to tools like SEMrush, Ahrefs, or Google Search Console",
      "Interest in AI tools and how they are changing digital marketing",
      "A personal blog or any published writing (shows initiative)",
    ],
  },
];

const isDryRun = !process.argv.includes("--confirm");

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌  SANITY_API_TOKEN not set in .env.local");
    process.exit(1);
  }

  const allJobs = await client.fetch(
    `*[_type == "jobOpening"] { _id, title, status } | order(title asc)`
  );

  console.log(`\nFound ${allJobs.length} existing job(s) in Sanity.\n`);

  // ── Find jobs to delete ────────────────────────────────────────────────────
  const toDelete = allJobs.filter((j) =>
    DELETE_TITLES.includes(j.title.toLowerCase().trim())
  );

  // ── Check for slugs that already exist (avoid duplicates) ─────────────────
  const existingSlugs = await client.fetch(
    `*[_type == "jobOpening"] { "slug": slug.current }`
  );
  const slugSet = new Set(existingSlugs.map((j) => j.slug));

  const toCreate = NEW_JOBS.filter(
    (j) => !slugSet.has(j.slug.current)
  );
  const alreadyExist = NEW_JOBS.filter(
    (j) => slugSet.has(j.slug.current)
  );

  // ── Report ─────────────────────────────────────────────────────────────────
  console.log("🗑️  DELETE:");
  if (toDelete.length === 0) {
    console.log("   (none found)");
  } else {
    toDelete.forEach((j) => console.log(`   • ${j.title}`));
  }

  console.log("\n✨  CREATE:");
  if (toCreate.length === 0) {
    console.log("   (all already exist)");
  } else {
    toCreate.forEach((j) => console.log(`   • ${j.title}`));
  }

  if (alreadyExist.length > 0) {
    console.log("\n⏭️  SKIP (already in Sanity):");
    alreadyExist.forEach((j) => console.log(`   • ${j.title}`));
  }

  if (isDryRun) {
    console.log(
      `\n⚠️  DRY RUN — nothing changed. Run with --confirm to apply ${toDelete.length} deletion(s) and ${toCreate.length} creation(s).\n`
    );
    return;
  }

  // ── Execute deletions ──────────────────────────────────────────────────────
  console.log(`\nDeleting ${toDelete.length} job(s)...`);
  for (const job of toDelete) {
    await client.delete(job._id);
    console.log(`   ✓ Deleted: ${job.title}`);
  }

  // ── Execute creations ──────────────────────────────────────────────────────
  console.log(`\nCreating ${toCreate.length} job(s)...`);
  for (const job of toCreate) {
    const created = await client.create(job);
    console.log(`   ✓ Created: ${job.title} (${created._id})`);
  }

  console.log("\n✅  Done. Refresh the Sanity Studio to see changes.\n");
}

run().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
