/**
 * create-purva-draft-technical-seo-audit-q4.mjs
 *
 * Creates "The Technical SEO Audit Every Indian B2B Website Needs Before Q4"
 * (author: Purva Desai, existing author record) in Sanity as a DRAFT ONLY
 * (not visible on the live site until promoted).
 *
 * Source: Docs/Blogs/Purva/The Technical SEO Audit Every Indian B2B Website Needs Before Q4/
 *   - The Technical SEO Audit Every Indian B2B Website Needs Before Q4.docx / .pdf  (article content)
 *   - The Technical SEO Audit Every Indian B2B Website Needs Before Q4.jpg          (cover image)
 *
 * This script ONLY creates a draft. It does not publish. Scheduled for
 * Tuesday 29 Sep 2026 — promote it that day (or whenever ready) with:
 *   node scripts/publish-draft.mjs insight-purva-technical-seo-audit-q4
 *
 * Run: node scripts/create-purva-draft-technical-seo-audit-q4.mjs
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
if (!fs.existsSync(envPath)) { console.error("❌  .env.local not found"); process.exit(1); }

const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const [kk, ...v] = line.split("=");
  if (kk?.trim() && v.length) env[kk.trim()] = v.join("=").trim().replace(/^['"]|['"]$/g, "");
}

const PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN      = env.SANITY_API_TOKEN;

if (!PROJECT_ID) { console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID missing"); process.exit(1); }
if (!TOKEN)      { console.error("❌  SANITY_API_TOKEN missing"); process.exit(1); }

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: "2024-01-01",
  token:     TOKEN,
  useCdn:    false,
});

const POST_DIR = path.join(
  __dirname, "..", "..", "Docs", "Blogs", "Purva",
  "The Technical SEO Audit Every Indian B2B Website Needs Before Q4"
);

// ── Portable Text helpers ────────────────────────────────────────────────
let _k = 0;
const _prefix = "pvtsa";
const k = () => `${_prefix}${String(++_k).padStart(3, "0")}`;

const span   = (text, marks = []) => ({ _type: "span", _key: k(), text, marks });
const strong = (text) => span(text, ["strong"]);
const plain  = (text) => span(text);
const linked = (text, markKey) => span(text, [markKey]);

function block(style, children, markDefs = [], listItem = null) {
  const b = { _type: "block", _key: k(), style, markDefs, children };
  if (listItem !== null) { b.listItem = listItem; b.level = 1; }
  return b;
}

const h2 = (text) => block("h2", [plain(text)]);
const h3 = (text) => block("h3", [plain(text)]);
const p  = (text) => block("normal", [plain(text)]);
const bullet = (text) => block("normal", [plain(text)], [], "bullet");
const bulletBold = (leadIn, rest) => block("normal", [strong(leadIn), plain(" " + rest)], [], "bullet");
const numberedBold = (leadIn, rest) => block("normal", [strong(leadIn), plain(" " + rest)], [], "number");

const linkPara = (before, linkText, href, after = "") => {
  const mk = k();
  return block("normal", [plain(before), linked(linkText, mk), plain(after)], [{ _key: mk, _type: "link", href }]);
};

const callout = (title, bodyText, variant = "key-takeaway") => ({ _type: "callout", _key: k(), title, body: bodyText, variant });

// ══════════════════════════════════════════════════════════════════════════
// BODY
// ══════════════════════════════════════════════════════════════════════════
const body = [
  p("Traffic held steady this quarter. Leads did not. Before anyone in the room starts questioning the campaigns, the pages those campaigns are sending people to deserve a look first, because a technical fault on the website can quietly cancel out perfectly good marketing upstream of it."),
  p("That gap is more common than most marketing teams assume. A significant share of websites carry at least one critical technical SEO factor left unresolved (BloggersIdeas, 2026), and B2B sites are not exempt just because their audience is smaller and more deliberate than an e-commerce storefront's. An independent 2023 Ahrefs analysis of 850 B2B websites found that more than 60% had at least one critical crawlability issue, and nearly a quarter had key commercial pages either blocked from crawling or accidentally marked noindex (cited via MV3 Marketing, 2026). Those are not obscure edge cases. Those are the pricing page, the service page, and the contact form quietly invisible to the search engine you are paying to rank on."),
  p("This checklist is written for the person who has to decide, before Q4 planning locks in, whether the website itself is pulling its weight, and what a technical SEO service or technical SEO agency would actually be checking if you brought one in."),

  h2("Why This Belongs on Every Q4 Checklist, Not Just the Redesign Brief"),
  p("Technical SEO rarely gets attention on its own schedule. It gets attention after a traffic drop, after a migration goes wrong, or after someone finally asks why a page that reads well is not ranking. By then, the fix is reactive instead of planned."),
  p("A technical SEO audit is the process of confirming that search engines, and increasingly AI answer engines, can actually find, render, and understand every page you want found. It sits underneath content strategy, not alongside it. A well-written service page with a broken canonical tag, blocked in robots.txt, or three redirect hops deep is functionally invisible, regardless of how good the writing is."),
  p("For a B2B website specifically, the stakes are concentrated on a small number of pages: the handful of service, pricing, and case study pages that actually influence a buying decision. A technical fault on one of those pages is not a minor inconvenience. It is a fault on the exact page a technical seo audit is meant to protect."),

  h2("The Crawlability Layer: Can Google Even Find Your Pages"),
  p("Before a page can rank, it has to be found, and found repeatedly enough that its content stays current in the index. This is where crawl budget lives, the finite number of pages a search engine is willing to crawl on your site in a given window."),
  p("Larger sites feel this most directly. Sites carrying 10,000 or more pages can lose up to 30% of their crawl coverage to duplicate, low-quality, or blocked URLs, wasting crawler visits on pages that were never going to rank in the first place (Digital Applied, 2026). A mid-sized B2B site will not lose crawl budget at that scale, but the same pattern shows up in miniature: parameter-heavy URLs, old campaign landing pages nobody redirected, and staging subdomains accidentally left indexable."),
  p("What to check in this layer:"),
  bullet("Run a full crawl and cross-reference every indexable URL against your XML sitemap. Anything in one list and not the other is worth investigating."),
  bullet("Confirm robots.txt is not accidentally blocking commercial pages or the CSS and JavaScript files Google needs to render them properly."),
  bullet("Find orphan pages, pages with no internal links pointing to them, since a page nothing links to is a page crawlers rarely revisit."),
  bullet("Audit every redirect chain on the site. A single 301 hop is fine. A chain of three or more hops wastes crawl budget and quietly dilutes the link equity the redirect was supposed to preserve."),
  bullet("Confirm every important page returns a clean 200 status, carries a self-referencing canonical, and has no accidental noindex directive left over from a staging build."),

  h2("The Core Web Vitals Layer: Speed as a Tiebreaker, Not a Miracle Cure"),
  p("Core Web Vitals get treated, in most marketing conversations, as either irrelevant or as the single lever that will fix rankings overnight. Neither framing is accurate. The honest read is closer to a tiebreaker: in a competitive B2B category where the top results already have comparable content quality and topical authority, being the slowest or least stable site in that set is what costs positions, not a specific metric in isolation."),
  p("The current gap between requirement and reality is wide. Only around a third of websites pass Google's Core Web Vitals threshold overall, and on mobile just 42% of measured origins pass all three metrics (Digital Applied, 2026). At the same time, pages sitting in the top Largest Contentful Paint quartile see roughly 24% higher organic click-through rate than pages failing that threshold, based on Google Search Console data cited in the same report. Treat that figure as directional rather than a guaranteed lift for your specific site, since click-through behaviour varies by industry and query intent, but the direction of the relationship is consistent with what most technical SEO practitioners see in practice."),
  p("What to check in this layer:"),
  bullet("Largest Contentful Paint (LCP) under 2.5 seconds, measured on real-user field data from Chrome UX Report or Search Console, not lab data alone."),
  bullet("Interaction to Next Paint (INP) under 200 milliseconds. INP replaced First Input Delay as the responsiveness metric in 2024 and remains the most commonly failed of the three vitals."),
  bullet("Cumulative Layout Shift (CLS) under 0.1, which usually means reserving explicit dimensions for images, embeds, and any content injected after initial load."),
  bullet("Confirm mobile performance specifically and separately from desktop, since Google's indexing has been mobile-first for years and a site that performs well on an office desktop connection can still fail badly on a mid-range Indian mobile network."),

  h2("The Structured Data Layer: Speaking a Language Search and AI Engines Both Understand"),
  p("Structured data remains one of the more accessible technical wins available, precisely because so few sites bother with it properly. Only around 17% of the ten million most-visited websites implement any form of schema markup at all (Digital Applied, 2026), which means a B2B site that implements it correctly is competing in a category most of its peers have not entered."),
  p("The relevance of this has grown for a second reason beyond traditional search. AI answer engines like ChatGPT, Perplexity, and Google AI Overviews rely heavily on structured, well-labelled content to extract facts they can cite confidently. A page that clearly marks up its organisation details, its article structure, its breadcrumb position, and its frequently asked questions is easier for both a search crawler and an AI crawler to parse correctly, which matters increasingly for any brand also investing in answer-engine optimisation."),
  p("What to check in this layer:"),
  bullet("Organization schema on the homepage, with consistent name, logo, and contact details that match every other place your business is listed online."),
  bullet("Article schema on every blog post, with author, publish date, and publisher fields completed."),
  bullet("BreadcrumbList schema matching the actual navigation path a visitor takes to reach the page."),
  bullet("FAQPage schema on any page answering a genuine set of buyer questions, which also improves the odds of an expanded result in traditional search."),
  bullet("Service or Product schema on commercial pages, where applicable, so both engines understand what is actually being sold."),
  bullet("Validate everything through Google's Rich Results Test before publishing, since malformed schema is often worse than no schema at all."),
  bullet("Check whether AI crawlers, PerplexityBot, ChatGPT-User, and similar user agents, can actually access your content, since a robots.txt rule blocking traditional crawlers by mistake often blocks these too."),

  h2("The 12-Point Technical SEO Audit Checklist"),
  p("Everything above collapses into a working list. Treat this as the order to run through, not twelve equally weighted items."),
  numberedBold("Crawl the full site", "with a tool such as Screaming Frog and export every indexable URL."),
  numberedBold("Cross-reference the crawl against your XML sitemap", "and investigate every mismatch."),
  numberedBold("Find and fix orphan pages", "with no internal links pointing to them."),
  numberedBold("Audit every redirect chain,", "flattening anything longer than a single hop."),
  numberedBold("Confirm every important page returns 200,", "carries a self-referencing canonical, and has no leftover noindex directive."),
  numberedBold("Check mobile-first parity,", "confirming the mobile version contains the same content and structured data as desktop."),
  numberedBold("Measure LCP, INP, and CLS on field data,", "not lab data alone, for your highest-traffic and highest-value pages first."),
  numberedBold("Validate all structured data", "through the Rich Results Test."),
  numberedBold("Check AI-crawler access", "for PerplexityBot, ChatGPT-User, and Anthropic's crawler alongside traditional Googlebot access."),
  numberedBold("Map internal link depth,", "confirming priority commercial pages sit within three clicks of the homepage."),
  numberedBold("Review hreflang implementation", "if the site serves multiple regions or languages, since roughly a third of international websites carry at least one conflicting or broken hreflang directive, most often a missing return tag (Search Engine Land, 2023)."),
  numberedBold("Re-run this entire audit quarterly,", "not annually, since technical health drifts as pages, plugins, and redirects accumulate."),

  h3("For Marketing Heads and Founders: Where to Start This Week"),
  p("The full audit above is thorough by design, but it does not all need to happen before Friday. Three places to start immediately:"),
  bulletBold("Pull your Google Search Console coverage report", "and sort by “Excluded” reasons. Anything marked “Blocked by robots.txt” or “Noindexed” on a page you actually want ranking is your fastest, highest-confidence fix."),
  bulletBold("Check the Core Web Vitals report in Search Console for your top 10 commercial pages specifically,", "not the site-wide average, since one slow pricing page can matter more than a hundred fast blog posts."),
  bulletBold("Open your XML sitemap and your live navigation side by side.", "Any page in the sitemap that a visitor cannot actually reach by clicking through the site is a page worth investigating before it becomes a bigger problem."),

  h2("What This Means for Your Business"),
  p("A technical SEO audit does not replace content strategy, but it decides whether that content strategy ever gets a fair chance to work. Start with crawlability, since a page Google cannot find cannot rank regardless of anything else on this list. Move to Core Web Vitals next, treating them as a tiebreaker in competitive categories rather than a guaranteed ranking lift. Close with structured data, the checklist item most B2B sites skip entirely and the one with the clearest current opportunity, for both traditional search and the AI answer engines increasingly deciding what gets cited."),

  callout(
    "Want This Audit Run Properly",
    "MagicWorks' Search & Answer Engine Optimisation service runs this exact audit for Indian B2B websites, prioritised by actual ranking impact rather than by how many issues a crawler tool reports. If speed specifically is the concern, our Site Performance & Conversion service works from the same Core Web Vitals data with a fixed scope and a measurable before-and-after.",
    "key-takeaway"
  ),
  linkPara("Explore ", "Search & Answer Engine Optimisation", "/services/digital-marketing/seo-aeo", ", "),
  linkPara("", "Site Performance & Conversion", "/services/digital-marketing/site-performance-conversion", ", or"),
  linkPara("", "book a discovery call", "/contact", ". We'll look at your specific site and give you honest next steps."),

  p("Purva Desai is a Digital Marketing Executive at MagicWorks IT Solutions, Pune, working across SEO, AEO, GEO, brand strategy, and content strategy."),
];

const faq = [
  { _key: k(), question: "What is a technical SEO audit and how is it different from a content audit?", answer: "A technical SEO audit reviews whether search engines can crawl, render, and index your site correctly: sitemap accuracy, crawl budget, Core Web Vitals, structured data, and mobile parity. A content audit looks at what is on the page, keywords, quality, and freshness. A site can have excellent content and still rank poorly because of technical faults a content audit would never catch." },
  { _key: k(), question: "How often should a B2B website run a technical SEO audit?", answer: "Once a quarter is the practical minimum for an active B2B site, and immediately after any replatforming, major redesign, or CMS migration. Technical health drifts quietly as pages get added, redirects stack up, and plugins update, so a single annual audit usually misses issues for months before anyone notices the traffic drop." },
  { _key: k(), question: "Do Core Web Vitals actually affect Google rankings?", answer: "Core Web Vitals function more as a tiebreaker than a primary ranking signal. In categories where competing pages already have comparable content quality and authority, being the slowest or least stable site in that set is what costs positions, not a specific vital in isolation." },
  { _key: k(), question: "Why does structured data matter for a B2B website that is not selling products online?", answer: "Structured data (Organization, Article, BreadcrumbList, FAQPage, and Service schema) helps both traditional search and AI answer engines understand who you are, what you offer, and how your pages relate to each other. Very few B2B sites implement it correctly today, which makes it one of the more accessible technical wins available." },
  { _key: k(), question: "Can our internal team run this audit, or do we need a technical SEO agency?", answer: "A structured checklist, like the one in this article, is enough for a small site or a team with some technical comfort to work through independently. Larger or older sites, or those carrying years of redirect and content debt, usually benefit from a technical SEO agency that can prioritise findings by actual ranking impact rather than by how many issues a crawler tool reports." },
];

const POST = {
  id: "insight-purva-technical-seo-audit-q4",
  title: "The Technical SEO Audit Every Indian B2B Website Needs Before Q4",
  seoTitle: "Technical SEO Audit for Indian B2B Websites · MagicWorks",
  slug: "technical-seo-audit-checklist-indian-b2b-websites",
  excerpt: "A practical technical SEO audit for Indian B2B websites: crawlability, Core Web Vitals, and structured data, covered before Q4 planning locks in.",
  publishedAt: "2026-09-29T03:30:00.000Z",
  imagePath: path.join(POST_DIR, "The Technical SEO Audit Every Indian B2B Website Needs Before Q4.jpg"),
  imageFilename: "technical-seo-audit-indian-b2b-q4-hero.jpg",
  imageAlt: "Dashboard illustration of a technical SEO audit checklist covering crawlability, Core Web Vitals, and structured data for a B2B website",
  categories: ["digital-marketing"],
  pillar: "digital-marketing",
  tags: ["technical seo service", "technical seo audit", "technical seo agency", "core web vitals", "structured data schema", "B2B website SEO India"],
};

if (POST.title.length > 100) throw new Error(`Title too long (${POST.title.length}/100)`);
if (POST.excerpt.length > 155) throw new Error(`Excerpt too long (${POST.excerpt.length}/155)`);
if (POST.seoTitle.length > 60) throw new Error(`SEO title too long (${POST.seoTitle.length}/60)`);

async function main() {
  console.log("\n=== Creating DRAFT: Technical SEO Audit Q4 (Purva Desai) ===\n");

  console.log("🔍  Looking up existing author Purva Desai…");
  const author = await client.fetch(
    `*[_type == "teamMember" && (slug.current == "purva-desai" || name == "Purva Desai")][0]{ _id, name }`
  );
  if (!author) {
    console.error("❌  Could not find an existing Purva Desai teamMember record. Aborting — not creating a new one.");
    process.exit(1);
  }
  console.log(`✅  Found author: ${author.name} (${author._id})\n`);

  const existing = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id }`,
    { slug: POST.slug }
  );
  if (existing) {
    console.log(`⏭️   Post already exists (${existing._id}) — skipping.`);
    return;
  }

  if (!fs.existsSync(POST.imagePath)) {
    console.error(`❌  Hero image not found: ${POST.imagePath}`);
    process.exit(1);
  }
  console.log("📤  Uploading hero image…");
  const asset = await client.assets.upload("image", fs.createReadStream(POST.imagePath), {
    filename: POST.imageFilename,
  });
  console.log(`✅  Image uploaded: ${asset._id}`);

  const doc = {
    _id: `drafts.${POST.id}`,
    _type: "insight",
    title: POST.title,
    seoTitle: POST.seoTitle,
    slug: { _type: "slug", current: POST.slug },
    excerpt: POST.excerpt,
    author: { _type: "reference", _ref: author._id },
    publishedAt: POST.publishedAt,
    categories: POST.categories,
    pillar: POST.pillar,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: POST.imageAlt,
    },
    body,
    faq,
    tags: POST.tags,
    isGated: false,
  };

  console.log("💾  Creating DRAFT document…");
  const created = await client.create(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    NOTE: this is a DRAFT — it is not live on the site until published.`);
  console.log(`    To publish: node scripts/publish-draft.mjs ${POST.id}`);

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
