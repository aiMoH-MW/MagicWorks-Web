/**
 * Seed authors and assign them to blog posts.
 *
 * Creates:
 *   - Swapnil Ughade (founder, strategic articles)
 *   - Editorial Team (general, how-to articles)
 *
 * Then patches all existing insight documents to assign the correct author
 * based on article title keywords.
 *
 * Usage:  node scripts/seed-authors.mjs
 * Re-run safe — uses createOrReplace + patch.
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

// ─────────────────────────────────────────────────────────────────────────────
// TEAM MEMBERS
// ─────────────────────────────────────────────────────────────────────────────

const SWAPNIL_ID = "team-member-swapnil-ughade";
const EDITORIAL_ID = "team-member-editorial-team";

const teamMembers = [
  {
    _id: SWAPNIL_ID,
    _type: "teamMember",
    name: "Swapnil Ughade",
    role: "Founder · Digital Marketing Strategist · AI Automation Expert · Author",
    bio: "Swapnil Ughade is the Founder of MagicWorks IT Solutions and a seasoned digital marketing strategist with 20+ years of experience helping businesses grow through smart, data-driven strategies and AI-powered automation. He has a deep command of the full digital growth stack — from SEO, AEO, and Google Ads to social media, content marketing, and end-to-end AI workflow automation. His approach is always outcome-first: turning digital presence into measurable, predictable revenue for his clients. As an author, Swapnil distils complex marketing and AI concepts into clear, actionable frameworks that help business owners and marketers navigate the rapidly evolving digital landscape. His thinking sits at the intersection of search strategy, AI intelligence, and real-world business outcomes.",
    linkedin: "https://www.linkedin.com/in/swapnilughade/",
    isFounder: true,
    order: 1,
  },
  {
    _id: EDITORIAL_ID,
    _type: "teamMember",
    name: "Editorial Team",
    role: "Content & Editorial",
    bio: "The MagicWorks editorial team — digital marketing practitioners, strategists, and researchers writing from inside a working AI-first agency in Pune. We cover digital marketing, web development, SEO, AEO, and business growth for Indian businesses.",
    isFounder: false,
    order: 2,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AUTHOR ASSIGNMENT RULES
// Keywords in the article title → author ID
// Swapnil = strategic, CEO-voice, Indian market, AI investment, real costs
// Editorial Team = tactical how-tos, social media, performance marketing guides
// ─────────────────────────────────────────────────────────────────────────────

const SWAPNIL_KEYWORDS = [
  "ceo",
  "real cost",
  "indian b2b",
  "b2b companies spend",
  "geo for indian",
  "google ai overviews",
  "ai max",
  "ai investment",
  "ai chatbots vs",
  "80% of indian",
  "strategy gap",
  "cheap website",
  "crores",
  "operator",
  "honest numbers",
  "5 use cases",
];

function assignAuthor(title) {
  const t = title.toLowerCase();
  if (SWAPNIL_KEYWORDS.some((kw) => t.includes(kw))) return SWAPNIL_ID;
  return EDITORIAL_ID;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌  SANITY_API_TOKEN not set — check .env.local");
    process.exit(1);
  }

  console.log("👤  Creating / updating team members…\n");

  for (const member of teamMembers) {
    await client.createOrReplace(member);
    console.log(`  ✓  ${member.name}`);
  }

  // ── Fetch all existing insights ──────────────────────────────────────────
  console.log("\n📰  Fetching existing insights from Sanity…");

  const insights = await client.fetch(
    `*[_type == "insight"]{ _id, title, "authorRef": author._ref }`
  );

  console.log(`    Found ${insights.length} insight documents\n`);

  // ── Patch author on each insight ─────────────────────────────────────────
  console.log("🔗  Assigning authors…\n");

  let swapnilCount = 0;
  let editorialCount = 0;

  for (const doc of insights) {
    const authorId = assignAuthor(doc.title);
    const authorName = authorId === SWAPNIL_ID ? "Swapnil Ughade" : "Editorial Team";

    await client
      .patch(doc._id)
      .set({ author: { _type: "reference", _ref: authorId } })
      .commit();

    if (authorId === SWAPNIL_ID) swapnilCount++;
    else editorialCount++;

    console.log(`  ${authorId === SWAPNIL_ID ? "✦" : "○"}  [${authorName.padEnd(18)}]  ${doc.title.substring(0, 65)}`);
  }

  console.log(`
✅  Done.

   Team members created/updated: ${teamMembers.length}
   Articles → Swapnil Ughade:    ${swapnilCount}
   Articles → Editorial Team:    ${editorialCount}

📸  Next step — upload Swapnil's photo in Sanity Studio:
   1. Go to magic-works-web.vercel.app/studio
   2. Open Team Members → Swapnil Ughade
   3. Upload his photo to the Photo field
   4. Save
`);
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
