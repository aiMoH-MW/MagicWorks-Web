/**
 * Seed static content into Sanity:
 *   - 1 team member (Swapnil Ughade, founder)
 *   - 4 verified case studies (SimpliDistance, Aishwaryam, SRJ Steel, Trexova)
 *   - 8 job openings
 *
 * Usage:  node scripts/seed-content.mjs
 * Re-run safe — uses createOrReplace so existing docs are updated, not duplicated.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomBytes } from "crypto";

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
  } catch { /* .env.local not found — rely on process.env */ }
}
loadEnv();

const client = createClient({
  projectId: "wa86etuq",
  dataset: "production",
  apiVersion: "2025-06-03",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const k = () => randomBytes(6).toString("hex");

// ─────────────────────────────────────────────────────────────────────────────
// TEAM MEMBER
// ─────────────────────────────────────────────────────────────────────────────
const teamMembers = [
  {
    _id: "team-member-swapnil-ughade",
    _type: "teamMember",
    name: "Swapnil Ughade",
    role: "Founder",
    isFounder: true,
    bio: "Founded MagicWorks IT Solutions in 2009 and incorporated it in 2012. Seventeen years building digital marketing, web development, and AI advisory practices for ambitious Indian businesses across education, real estate, manufacturing, and professional services.",
    order: 1,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDIES
// ─────────────────────────────────────────────────────────────────────────────
const caseStudies = [
  {
    _id: "case-study-simplidistance",
    _type: "caseStudy",
    title: "SimpliDistance Scales MBA Enrollments With High-Intent Search Advertising",
    slug: { _type: "slug", current: "simplidistance-mba-enrollments" },
    client: "SimpliDistance",
    heroMetric: "75,000+",
    heroMetricLabel: "Qualified leads per year",
    industry: "education",
    pillar: "digital-marketing",
    featured: true,
    publishedAt: new Date("2024-03-01").toISOString(),
    situation:
      "SimpliDistance is one of India's fastest-growing portals for distance and online MBA admissions, connecting students with universities across multiple programs and regions. Operating in a highly competitive education market, the platform required a scalable, cost-efficient lead generation engine without compromising lead quality. Key targets: a 4–8% admission conversion rate and CPL significantly below direct university acquisition costs.",
    intervention:
      "MagicWorks designed a Google Search-first performance marketing framework built around deep intent targeting to capture students actively searching for distance and online MBA programs, a hyper-intent keyword strategy aligned to course type, university, eligibility, and admission timelines, conversion-optimised landing pages engineered for enquiry completion, continuous A/B testing across ads, keywords, and landing experiences, and a scalable campaign architecture enabling rapid expansion across programs and locations. Google Search Ads became the core growth engine — optimised not just for traffic, but for enrollment-ready leads.",
    result:
      "SimpliDistance achieved 75,000+ qualified leads per year, a consistent 4–8% admission conversion rate, cost per lead delivered 30–40% below direct university acquisition benchmarks, consistent performance even during low-demand seasons, and 4x lead volume growth by Year 3 of the engagement. The campaign compounded: each cohort of data improved targeting for the next.",
    metrics: [
      { _key: k(), value: "75,000+", label: "Qualified leads per year" },
      { _key: k(), value: "4–8%", label: "Admission conversion rate" },
      { _key: k(), value: "30–40%", label: "Below benchmark CPL" },
      { _key: k(), value: "4×", label: "Lead growth by Year 3" },
    ],
  },
  {
    _id: "case-study-aishwaryam",
    _type: "caseStudy",
    title: "Aishwaryam Group Drives 6,500+ Units Into Pipeline With Dual-Funnel Campaigns",
    slug: { _type: "slug", current: "aishwaryam-real-estate-pipeline" },
    client: "Aishwaryam Group",
    heroMetric: "6,500+",
    heroMetricLabel: "Units in pipeline",
    industry: "real-estate",
    pillar: "digital-marketing",
    featured: false,
    publishedAt: new Date("2024-06-01").toISOString(),
    situation:
      "Aishwaryam Group is a Pune-based residential developer with projects spanning budget and premium segments. To drive enquiries across both tiers simultaneously, the team needed a performance marketing approach that could run distinct buyer journeys in parallel without cannibalising budgets or creating intent confusion between the two audiences.",
    intervention:
      "MagicWorks built a dual-funnel campaign architecture — one optimised for budget flat buyers (high intent, shorter cycle, Search-led with Meta retargeting) and one for premium buyers (longer consideration, Display and YouTube alongside Search). Each funnel had its own creative brief, audience segmentation, dedicated landing pages, and attribution model. Google Search and Meta campaigns were coordinated with shared remarketing data to close the loop between discovery and intent.",
    result:
      "The campaign drove 6,500+ units into the enquiry pipeline, with cost per lead delivered below industry benchmark throughout the engagement. The dual-funnel architecture prevented audience crossover and kept CPL consistent across both the budget and premium segments.",
    metrics: [
      { _key: k(), value: "6,500+", label: "Units in pipeline" },
      { _key: k(), value: "Below benchmark", label: "Cost per lead" },
      { _key: k(), value: "2", label: "Funnels run in parallel" },
      { _key: k(), value: "Pune", label: "Primary market" },
    ],
  },
  {
    _id: "case-study-srj-steel",
    _type: "caseStudy",
    title: "SRJ Steel Builds a Full-Funnel Digital Presence From Zero to 110+ RFQs Per Month",
    slug: { _type: "slug", current: "srj-steel-b2b-digital-presence" },
    client: "SRJ Steel",
    heroMetric: "110+",
    heroMetricLabel: "Qualified RFQs per month",
    industry: "manufacturing",
    pillar: "digital-marketing",
    featured: false,
    publishedAt: new Date("2024-09-01").toISOString(),
    situation:
      "SRJ Steel had grown entirely through dealer relationships and trade fairs, with no independent digital presence beyond a basic website. When key dealer relationships became uncertain, the company needed a predictable digital channel for qualified B2B inbound leads — with zero existing data, audience, or ranking history to build from.",
    intervention:
      "MagicWorks built from zero across five channels simultaneously: Google Ads targeting B2B Search queries for procurement and sourcing, SEO to earn Top 10 rankings for core product and industry keywords, Meta Ads for brand awareness among industrial buyers, YouTube for product and capability content, and Google Business Profile to capture local and regional industrial search. Every channel fed into a single attribution model and a unified reporting layer that tracked RFQ volume, not just traffic.",
    result:
      "SRJ moved from zero digital inbound to 110+ qualified RFQs per month. The business achieved Top 10 rankings across core keyword categories, a 30% lift in export enquiries, and 25% growth in buyers from regions it had not previously reached through trade channels.",
    metrics: [
      { _key: k(), value: "110+", label: "RFQs per month" },
      { _key: k(), value: "Top 10", label: "Keyword rankings" },
      { _key: k(), value: "30%", label: "Export inquiry lift" },
      { _key: k(), value: "25%", label: "New regional buyers" },
    ],
  },
  {
    _id: "case-study-trexova",
    _type: "caseStudy",
    title: "Trexova Builds a Global Wellness Tourism Pipeline With 3,400 Leads and 36% Conversion",
    slug: { _type: "slug", current: "trexova-wellness-tourism-pipeline" },
    client: "Trexova",
    heroMetric: "3,400+",
    heroMetricLabel: "Qualified leads in Year 1",
    industry: "other",
    pillar: "digital-marketing",
    featured: false,
    publishedAt: new Date("2024-12-01").toISOString(),
    situation:
      "Trexova is a global wellness tourism portal launching into a category with low awareness and high purchase consideration. The challenge was to build brand recognition, attract qualified intent traffic, and generate bookable leads from zero — in a sector where traditional travel and wellness brand marketing rarely produce attributable results.",
    intervention:
      "MagicWorks combined brand positioning work with performance marketing across Google Search, Meta, and SEO. We built the brand voice and content architecture alongside the performance layer, ensuring that early SEO and paid traffic landed on pages built to convert. The content strategy answered the pre-purchase questions of wellness-motivated travellers, increasing organic authority quickly.",
    result:
      "In Year 1, Trexova generated 3,400+ qualified leads with a 36% lead-to-conversion rate — significantly above category benchmarks. Regular SEO lead flow started arriving within three months of launch, reducing dependence on paid spend over time.",
    metrics: [
      { _key: k(), value: "3,400+", label: "Qualified leads in Year 1" },
      { _key: k(), value: "36%", label: "Lead-to-conversion rate" },
      { _key: k(), value: "3 months", label: "Time to first SEO leads" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// JOB OPENINGS
// ─────────────────────────────────────────────────────────────────────────────
const postedAt = new Date("2026-06-01").toISOString();

const jobOpenings = [
  {
    _id: "job-performance-marketing-executive",
    _type: "jobOpening",
    title: "Performance Marketing Executive",
    slug: { _type: "slug", current: "performance-marketing-executive" },
    department: "digital-marketing",
    location: "Pune, India",
    type: "full-time",
    experience: "1–3 years",
    status: "active",
    postedAt,
    summary:
      "Run and optimise Google Ads and Meta campaigns for our clients across education, real estate, and manufacturing. Own campaign performance from setup to monthly reporting.",
    responsibilities: [
      "Build, manage, and optimise Google Search, Performance Max, and Meta Ad campaigns",
      "Set up and maintain conversion tracking via Google Tag Manager",
      "Produce monthly reports tied to CPL and ROAS targets",
      "Conduct A/B tests on ad copy, audiences, and landing pages",
      "Flag performance anomalies and propose corrective action within 24 hours",
    ],
    requirements: [
      "1–3 years of hands-on Google Ads and/or Meta Ads experience",
      "Working knowledge of Google Analytics 4 and Google Tag Manager",
      "Comfortable reading data and building client-facing performance summaries",
    ],
    niceToHave: [
      "Google Ads or Meta Blueprint certification",
      "Experience with Performance Max campaigns",
      "Familiarity with SEO basics",
    ],
  },
  {
    _id: "job-seo-content-strategist",
    _type: "jobOpening",
    title: "SEO & Content Strategist",
    slug: { _type: "slug", current: "seo-content-strategist" },
    department: "digital-marketing",
    location: "Pune, India",
    type: "full-time",
    experience: "2–4 years",
    status: "active",
    postedAt,
    summary:
      "Own organic search and AEO strategy for MagicWorks and its clients. Build content and technical SEO programmes that earn rankings and AI answer citations.",
    responsibilities: [
      "Develop and execute SEO and AEO strategies for client sites",
      "Conduct technical SEO audits and prioritise fixes",
      "Build content briefs and editorial calendars aligned to target queries",
      "Track rankings, AI citations, and organic traffic",
      "Collaborate with developers on structured data and Core Web Vitals",
    ],
    requirements: [
      "2–4 years of SEO experience with demonstrable ranking improvements",
      "Solid understanding of technical SEO — schema, Core Web Vitals, crawl budget",
      "Awareness of answer engine optimisation (Google AI Overviews, Perplexity)",
      "Strong writing skills for briefs and content outlines",
    ],
    niceToHave: [
      "Experience with Screaming Frog, Ahrefs, or Semrush",
      "Experience writing structured FAQ content for FAQPage schema",
    ],
  },
  {
    _id: "job-social-media-manager",
    _type: "jobOpening",
    title: "Social Media Manager",
    slug: { _type: "slug", current: "social-media-manager" },
    department: "digital-marketing",
    location: "Pune, India",
    type: "full-time",
    experience: "1–3 years",
    status: "active",
    postedAt,
    summary:
      "Manage LinkedIn, Instagram, and Facebook presences for MagicWorks clients. Write content in the client's voice, run engagement programmes, and measure what matters.",
    responsibilities: [
      "Build monthly content calendars for 3–5 client accounts",
      "Write posts and captions in each client's brand voice",
      "Manage community engagement: replies, DMs, and comments",
      "Support founder ghostwriting where requested",
      "Track reach, engagement, and follower growth with monthly reports",
    ],
    requirements: [
      "1–3 years managing brand social media accounts",
      "Strong written English with an ear for different brand voices",
      "Familiarity with LinkedIn, Instagram, and Facebook business tools",
    ],
    niceToHave: [
      "Experience writing LinkedIn content for founders or executives",
      "Canva or basic design capability for post graphics",
    ],
  },
  {
    _id: "job-web-developer-nextjs",
    _type: "jobOpening",
    title: "Web Developer (Next.js)",
    slug: { _type: "slug", current: "web-developer-nextjs" },
    department: "web-development",
    location: "Pune, India",
    type: "full-time",
    experience: "2–4 years",
    status: "active",
    postedAt,
    summary:
      "Build AI-native websites on Next.js, Tailwind CSS, and headless CMS. Own the front-end quality of every site we ship.",
    responsibilities: [
      "Build responsive, performant Next.js sites against design specs",
      "Set up and configure Sanity or Payload CMS for client content needs",
      "Integrate LLM-backed features: chat agents, intelligent search, personalisation",
      "Ensure every build passes Core Web Vitals on launch",
      "Maintain MagicWorks-built sites on AMC contracts",
    ],
    requirements: [
      "2–4 years of React and Next.js development experience",
      "Proficient with Tailwind CSS and TypeScript",
      "Experience with at least one headless CMS",
      "Understanding of SEO-friendly HTML, schema markup, and performance",
    ],
    niceToHave: [
      "Experience integrating OpenAI or Anthropic APIs",
      "Familiarity with Supabase",
      "Portfolio of live Next.js sites",
    ],
  },
  {
    _id: "job-account-manager",
    _type: "jobOpening",
    title: "Client Account Manager",
    slug: { _type: "slug", current: "client-account-manager" },
    department: "operations",
    location: "Pune, India",
    type: "full-time",
    experience: "2–5 years",
    status: "active",
    postedAt,
    summary:
      "Own the client relationship for a portfolio of Digital Marketing and Web retainers. Be the single point of contact who keeps every client informed, satisfied, and growing.",
    responsibilities: [
      "Manage day-to-day communication across 8–12 retainer accounts",
      "Coordinate monthly reporting calls and quarterly business reviews",
      "Translate client goals into clear briefs for the delivery team",
      "Identify upsell and cross-sell opportunities within your portfolio",
      "Track SLAs and flag issues before clients notice them",
    ],
    requirements: [
      "2–5 years of account management in a digital agency",
      "Strong client communication and presentation skills",
      "Ability to read and interpret digital marketing performance data",
    ],
    niceToHave: [
      "Experience managing retainers in education, real estate, or manufacturing",
      "Working knowledge of Google Ads, Meta, or SEO reporting",
    ],
  },
  {
    _id: "job-dm-intern",
    _type: "jobOpening",
    title: "Digital Marketing Intern",
    slug: { _type: "slug", current: "digital-marketing-intern" },
    department: "digital-marketing",
    location: "Pune, India",
    type: "internship",
    experience: "Fresher / 0–1 year",
    status: "active",
    postedAt,
    summary:
      "Assist the digital marketing team across Google Ads, Meta, SEO, and content. Learn by doing on live client accounts.",
    responsibilities: [
      "Support campaign setup and keyword research",
      "Assist with reporting from Google Analytics and Ads",
      "Help build social media content calendars",
      "Conduct competitor research and SERP analysis",
    ],
    requirements: [
      "Currently pursuing or recently completed a degree in marketing or a related field",
      "Genuine curiosity about digital marketing and measurable results",
      "Strong written English",
    ],
    niceToHave: [
      "Google Digital Garage or similar certification",
      "Personal blog, LinkedIn presence, or creative portfolio",
    ],
  },
  {
    _id: "job-content-writing-intern",
    _type: "jobOpening",
    title: "Content Writing Intern",
    slug: { _type: "slug", current: "content-writing-intern" },
    department: "digital-marketing",
    location: "Pune, India",
    type: "internship",
    experience: "Fresher / 0–1 year",
    status: "active",
    postedAt,
    summary:
      "Research and write articles, social posts, and content briefs for MagicWorks clients and our own Insights channel.",
    responsibilities: [
      "Research and draft blog articles on digital marketing, AI, and business growth",
      "Write LinkedIn posts and captions in client brand voices",
      "Build content briefs from keyword research and competitor analysis",
      "Proofread and edit copy for the delivery team",
    ],
    requirements: [
      "Strong written English with a clear, confident style",
      "Genuine interest in digital marketing, AI, or B2B business",
      "Ability to write in different tones without losing clarity",
    ],
    niceToHave: [
      "Published articles, a blog, or a writing portfolio",
      "Familiarity with SEO basics",
    ],
  },
  {
    _id: "job-webdev-intern",
    _type: "jobOpening",
    title: "Web Development Intern",
    slug: { _type: "slug", current: "web-development-intern" },
    department: "web-development",
    location: "Pune, India",
    type: "internship",
    experience: "Fresher / 0–1 year",
    status: "active",
    postedAt,
    summary:
      "Support the web development team on Next.js and CMS projects. Learn how AI-native sites are built by working on real client builds.",
    responsibilities: [
      "Assist with component building in React and Tailwind CSS",
      "Support CMS setup and content modelling in Sanity",
      "Run basic QA and cross-browser testing on builds",
      "Help with Supabase form integrations and API wiring",
    ],
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Some exposure to React or Next.js (coursework, tutorials, or personal projects)",
      "Comfortable with Git basics",
    ],
    niceToHave: [
      "A personal project or GitHub portfolio",
      "Familiarity with Tailwind CSS",
      "Interest in AI-powered web features",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEED
// ─────────────────────────────────────────────────────────────────────────────
async function seed() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌  SANITY_API_TOKEN is not set. Check your .env.local file.");
    process.exit(1);
  }

  console.log("🌱  Seeding MagicWorks Sanity content…\n");

  // Team members
  for (const doc of teamMembers) {
    await client.createOrReplace(doc);
    console.log(`  ✓  Team member: ${doc.name}`);
  }

  // Case studies
  console.log("");
  for (const doc of caseStudies) {
    await client.createOrReplace(doc);
    console.log(`  ✓  Case study: ${doc.client} — ${doc.heroMetric} ${doc.heroMetricLabel}`);
  }

  // Job openings
  console.log("");
  for (const doc of jobOpenings) {
    await client.createOrReplace(doc);
    console.log(`  ✓  Job: ${doc.title} (${doc.type})`);
  }

  console.log(`
✅  Seed complete.
   Team members: ${teamMembers.length}
   Case studies: ${caseStudies.length}
   Job openings: ${jobOpenings.length}

📰  To import blog posts from the WordPress CSV, run:
   node scripts/import-wordpress.mjs
`);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
