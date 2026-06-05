/**
 * patch-blog2-google-ads-rewrite.mjs
 *
 * Full rewrite of "Google AI Mode India Advertisers 2026" blog post.
 *
 * Updates: body (PortableText), faq, excerpt, seoTitle, tags
 * Preserves: existing cover image, slug, author, publishedAt, category
 *
 * Run: node scripts/patch-blog2-google-ads-rewrite.mjs
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// ── Load .env.local ───────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
if (!fs.existsSync(envPath)) { console.error("❌  .env.local not found"); process.exit(1); }

const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const [k, ...v] = line.split("=");
  if (k?.trim() && v.length) env[k.trim()] = v.join("=").trim().replace(/^['"]|['"]$/g, "");
}

const PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN      = env.SANITY_API_TOKEN;

if (!PROJECT_ID) { console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID missing"); process.exit(1); }
if (!TOKEN)      { console.error("❌  SANITY_API_TOKEN missing"); process.exit(1); }

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// ── Key generator ─────────────────────────────────────────────────────────────
let _n = 0;
function k(prefix = "b") { return `${prefix}${++_n}`; }

// ── PortableText block builders ───────────────────────────────────────────────
function p(text) {
  return { _type: "block", _key: k(), style: "normal", markDefs: [],
    children: [{ _type: "span", _key: k("s"), text, marks: [] }] };
}

function pM(parts) {
  // parts: [{ text, marks? }]
  return { _type: "block", _key: k(), style: "normal", markDefs: [],
    children: parts.map(pt => ({ _type: "span", _key: k("s"), text: pt.text, marks: pt.marks ?? [] })) };
}

function h2(text) {
  return { _type: "block", _key: k(), style: "h2", markDefs: [],
    children: [{ _type: "span", _key: k("s"), text, marks: [] }] };
}

function h3(text) {
  return { _type: "block", _key: k(), style: "h3", markDefs: [],
    children: [{ _type: "span", _key: k("s"), text, marks: [] }] };
}

function h4(text) {
  return { _type: "block", _key: k(), style: "h4", markDefs: [],
    children: [{ _type: "span", _key: k("s"), text, marks: [] }] };
}

function li(text) {
  return { _type: "block", _key: k(), style: "normal", listItem: "bullet", level: 1, markDefs: [],
    children: [{ _type: "span", _key: k("s"), text, marks: [] }] };
}

function liM(parts) {
  return { _type: "block", _key: k(), style: "normal", listItem: "bullet", level: 1, markDefs: [],
    children: parts.map(pt => ({ _type: "span", _key: k("s"), text: pt.text, marks: pt.marks ?? [] })) };
}

function ol(text) {
  return { _type: "block", _key: k(), style: "normal", listItem: "number", level: 1, markDefs: [],
    children: [{ _type: "span", _key: k("s"), text, marks: [] }] };
}

// Numbered list item with the source name hyperlinked
// linkText: the anchor text, href: the URL, suffix: rest of the text
function olLink(linkText, href, suffix = "") {
  const linkKey = k("lk");
  return {
    _type: "block", _key: k(), style: "normal", listItem: "number", level: 1,
    markDefs: [{ _type: "link", _key: linkKey, href }],
    children: [
      { _type: "span", _key: k("s"), text: linkText, marks: [linkKey] },
      ...(suffix ? [{ _type: "span", _key: k("s"), text: suffix, marks: [] }] : []),
    ],
  };
}

function pq(text, attribution = "") {
  return { _type: "pullquote", _key: k("pq"), text, attribution };
}

function co(title, body, variant = "key-takeaway", items = []) {
  const obj = { _type: "callout", _key: k("co"), title, body, variant };
  if (items.length) obj.items = items;
  return obj;
}

function sr(...stats) {
  return { _type: "statRow", _key: k("sr"),
    stats: stats.map(s => ({ _type: "object", _key: k("st"), value: s.value, label: s.label, note: s.note ?? "" })) };
}

// ── Full body ─────────────────────────────────────────────────────────────────
function buildBody() {
  return [

    // ── The Short Answer ──────────────────────────────────────────────────────
    h2("The Short Answer"),
    p("On April 15, 2026, Google announced that AI Max for Search was moving out of beta. Starting in September 2026, eligible Search campaigns using Dynamic Search Ads, automatically created assets, or campaign-level broad match settings will automatically upgrade to AI Max. This is documented in the official Google Ads blog post titled \"Dynamic Search Ads are upgrading to AI Max.\""),

    sr(
      { value: "93%", label: "of Google AI Mode queries end without a click", note: "Semrush, Sept 2025" },
      { value: "Sept 2026", label: "auto-upgrade deadline for DSA campaigns", note: "Google Ads Blog, April 2026" },
      { value: "5.5 months", label: "migration window — shorter than any prior Google Ads sunset", note: "" },
    ),

    // ── What This Article Covers ──────────────────────────────────────────────
    h2("What This Article Covers"),
    li("What changed in Google Ads in early 2026"),
    li("Why this matters more for sales heads than for marketing teams"),
    li("How AI Mode and AI Max will likely hit your pipeline"),
    li("Does AI Max for Search actually work? What independent data shows"),
    li("A 90-day Google Ads action plan, by week"),
    li("How to read your Google Ads data when reporting becomes less transparent"),
    li("Industry-specific notes for education, travel, manufacturing, and B2B services"),
    li("What to brief your CEO before the September 2026 deadline"),
    li("Frequently asked questions"),

    // ── What Changed in Google Ads in Early 2026 ─────────────────────────────
    h2("What Changed in Google Ads in Early 2026"),
    p("Two changes matter, and they happened almost on top of each other. If you run Google Ads in India and you have not adjusted to either, your account is already operating on assumptions that no longer hold."),

    h3("Change 1: Ads in AI Overviews are Now Available in India"),
    p("Google Ads Help currently states that ads in AI Overviews are available in English on mobile and desktop in India and several other markets. When a customer in India types or speaks a query into Google, an AI-generated answer is now increasingly appearing at the top of the results page. Your ads can show above, below, or inside that AI answer. You cannot opt out. Reporting does not separate AI Overview performance from regular search results."),
    p("Three things flow from this. First, the queries triggering AI Overviews tend to be longer and more conversational, which means traditional exact-match keyword strategies are losing ground to broader matching. Second, click-through rates are dropping on queries where AI Overviews appear, by 61 percent on average according to Seer Interactive's November 2025 study covering 25.1 million impressions. Third, the user often gets their answer from the AI summary and never clicks anything. Semrush data from September 2025 shows that 93 percent of Google AI Mode queries end without a single click to any external website."),

    h3("Change 2: AI Max for Search Went Generally Available on April 15, 2026"),
    p("On April 15, 2026, Google announced that AI Max for Search moved out of beta. Starting in September 2026, eligible Search campaigns using Dynamic Search Ads, automatically created assets, or campaign-level broad match settings will automatically upgrade to AI Max."),
    p("AI Max for Search is a suite of three AI-powered features you can enable on existing Search campaigns: search term matching, text customization, and final URL expansion. Search term matching uses broad match and keywordless technology to expand reach beyond your keyword list. Text customization generates headlines and descriptions based on your landing pages, ads, and keywords. Final URL expansion routes users to the page on your site that Google's AI considers most relevant to their intent."),
    p("The September 2026 deadline matters specifically. If your account uses Dynamic Search Ads, automatically created assets, or campaign-level broad match, those campaigns will be automatically upgraded to AI Max in September. You have roughly five and a half months to prepare. This is shorter than any previous major Google Ads campaign-type sunset. The 2022 Smart Shopping to Performance Max migration ran nine months. This one runs five and a half."),

    pq("For sales heads in India, the question is not whether AI Max will affect your lead flow. It will. The question is whether you will be the team that prepared, or the team that finds out from a quarterly pipeline review that something changed and nobody knows what."),

    // ── Why AI Mode Matters More for Sales Heads ──────────────────────────────
    h2("Why AI Mode Matters More for Sales Heads Than Marketing Teams"),
    p("Most articles about Google Ads changes are written for marketers, in marketer language: CTR, CPM, quality score, asset optimization. Important, but not how a sales head reads the world. A sales head reads the world in lead quality, sales cycle length, conversion rate from lead to opportunity, opportunity to close, and average deal size. Those are exactly the metrics that move when Google's underlying matching technology changes, and they often move before anyone notices the marketing dashboard has shifted."),

    h3("Lead Volume Becomes More Variable"),
    p("Keywordless matching means your ads will start showing up for queries you never bid on, including queries you might not even recognize. Some of these will produce excellent leads. Some will produce noise. The variance is wider than what you are used to. A sales team that was getting 200 reasonably qualified leads a month from Google Ads might suddenly see 280 leads, of which 80 are completely unrelated to what your sales team can actually sell."),

    h3("The Lead Quality Drift Will Not Show Up in Marketing Reports"),
    p("Standard Google Ads reports will show CTR up, conversion volume up, cost per lead steady or improved. The marketing team will report progress. Meanwhile, the sales team will be calling more leads, talking to more wrong-fit prospects, and closing the same number of deals. This is the gap that destroys trust between marketing and sales heads if it is not caught early."),

    h3("Sales Cycle Length Will Lengthen for Some Categories"),
    p("Customers who used to land on a specific service page directly from a tightly-matched ad now sometimes land on a different page chosen by AI. A buyer searching for \"online MBA fees Pune\" who lands on a generic homepage instead of the program-specific page is a slower-moving lead than one who landed where they expected to. Add a week or two to your sales cycle for some segments. Plan for it."),

    h3("Cost Per Lead Will Look Fine While Pipeline Value Drops"),
    p("This is the most dangerous pattern. Cost per lead — the number most marketing teams report up — can stay flat or improve while qualified pipeline value drops. The sales team feels it immediately. The marketing team does not see it for a quarter. By the time someone connects the dots, three months of budget have been spent in the wrong direction."),

    // ── Does AI Max Actually Work? ────────────────────────────────────────────
    h2("Does AI Max for Search Actually Work? What Independent Data Shows"),
    p("Google's AI Max communication includes two different performance claims that should not be mixed. Google's 2025 AI Max announcement says advertisers activating AI Max in Search campaigns typically see 14 percent more conversions or conversion value at similar CPA/ROAS. Google's April 2026 DSA-upgrade post says Search campaigns using the full AI Max feature suite see 7 percent more conversions compared with using search term matching alone."),

    co("Independent Testing Results: The Full Picture", "", "stat", [
      "Google internal data 2026: +7% conversions, full-feature AI Max vs matching-only AI Max. Smaller than the 14% headline, and not a comparison to standard Search.",
      "SMEC agency testing 2026: +13% revenue, +16% CPA improvement — genuine gains in well-prepared accounts.",
      "Brainlabs 2026: 40% of test campaigns saw success. Most campaigns did not see improvement.",
      "Monks Agency, 30,000+ AI Max search terms: 99% of impressions drove zero conversions. Severe waste in poorly-prepared accounts.",
      "Adriaan Dekker LinkedIn poll, PPC professionals: 16% reported good performance, 84% reported neutral or negative results.",
    ]),

    p("The honest reading of this data: AI Max can deliver meaningful gains in well-prepared accounts and can deliver serious damage in poorly-prepared ones. The variance is much wider than for any previous major Google Ads change. The accounts that win with AI Max are not the ones that simply enable it. They are the ones that prepare specific things in advance and review weekly for the first 60 days after activation."),

    pq("AI Max is the rare Google Ads feature where it is genuinely possible to materially damage your account by enabling it without preparation. Most previous changes punished inattention with mediocre results. This one can punish it with significant losses."),

    // ── 90-Day Plan ───────────────────────────────────────────────────────────
    h2("How to Prepare Google Ads for AI Mode: A 90-Day Plan"),
    p("This plan is built for a sales head and marketing head working together. It is structured by week so the work is bounded and the pipeline impact stays visible. The total time commitment is roughly 6 to 10 hours per week of dedicated focus across the two functions."),

    h3("Weeks 1 to 2: Audit Your Current State Honestly"),
    li("Pull a 90-day report on cost per qualified lead by campaign and by ad group. This is the baseline. If you do not have the SQL data flowing back from your CRM into Google Ads, fix that this week. Without it, you cannot detect lead quality drift later."),
    li("List every campaign that uses Dynamic Search Ads, automatically created assets, or campaign-level broad match. These are your auto-upgrade candidates for September 2026. Your account team or agency should produce this list within three working days."),
    li("For each of these campaigns, document the current performance: CTR, conversion rate, cost per conversion, and most importantly cost per qualified lead. Save these baselines."),
    li("Run a quick search on the 10 most important commercial queries in your category. Note whether AI Overviews are appearing for those queries."),

    h3("Weeks 3 to 4: Voluntary AI Max Migration on a Test Campaign"),
    li("Choose one Search campaign to migrate to AI Max voluntarily in week 3. Do not pick your largest campaign. Pick a mid-sized one that you can monitor closely without risking your top revenue line."),
    li("Run it as a 50-50 split experiment against an unchanged control campaign. This is the best way to measure incrementality rather than coincidence."),
    li("Set up daily review for the first 14 days. Watch search term reports closely for queries that should not be triggering your ads. Add aggressive negative keywords as patterns emerge."),
    li("Critical for sales heads: have your sales team rate the first 50 leads from the new AI Max traffic on a 1 to 5 quality scale. Compare to the rating of the previous 50 leads from the same campaign. This single piece of data is worth more than any Google Ads dashboard report."),

    h3("Weeks 5 to 6: Strengthen Your AI Overview Readiness"),
    li("Identify the 20 long-tail conversational queries most likely to trigger AI Overviews in your category. Instead of \"online MBA,\" think \"what is the best online MBA for working professionals in India under 30.\" These longer queries are where AI Overviews live."),
    li("Audit whether your existing landing pages can win for those queries. Most cannot, because they were optimized for short keywords, not for being cited inside an AI-generated answer."),
    li("Rebuild your top three landing pages to be answer-first. The first 200 words must directly answer the question. Add structured FAQ schema. Add named author credentials."),
    li("Update your Performance Max creative assets if you run them. AI Overview ads pull from existing campaign creative. Weak creative gets weak placement."),

    h3("Weeks 7 to 8: Build the Cross-Functional Review Rhythm"),
    li("Establish a 30-minute weekly call between marketing head and sales head, with one shared dashboard tracking: cost per qualified lead, SQL rate from each major campaign, sales team's qualitative lead quality rating, and average sales cycle length by source."),
    li("Add a single new metric to this dashboard: pipeline value generated per ₹1 lakh of Google Ads spend, broken down by campaign. This is the metric that exposes the silent damage scenarios from earlier."),
    li("Write down the three numbers that, if they move past a defined threshold, will trigger an immediate review. For most accounts: SQL rate dropping more than 3 percentage points, average sales cycle growing more than 7 days, or pipeline value per spend rupee dropping more than 15 percent. These are your tripwires."),

    h3("Weeks 9 to 10: Decide on Full Migration Strategy"),
    li("Review the experiment results from your test AI Max campaign. If the split test shows positive sales-qualified outcomes, plan migration of additional campaigns starting week 11. If results are negative or unclear, document what you learned and plan a second test with adjustments before broader migration."),
    li("For campaigns you do not voluntarily migrate, confirm with your team or agency exactly when the September 2026 auto-upgrade affects each campaign. Get this in writing."),
    li("Begin the brand control work. AI Max introduced text guidelines (term exclusions and messaging restrictions). Use this layer to lock down what AI-generated copy can and cannot say about your brand."),

    h3("Weeks 11 to 13: Lock in the New Operating Model"),
    p("By this point, you have one campaign successfully on AI Max, baselines on the others, and a working sales-marketing review rhythm. Use weeks 11 to 13 to migrate additional campaigns voluntarily, in priority order by lowest risk first. Document what you have learned in a one-page playbook for your team. Brief your CEO. They will ask."),

    // ── Reading Google Ads Data ───────────────────────────────────────────────
    h2("How to Read Google Ads Data When Reporting Becomes Less Transparent"),
    p("One of the most uncomfortable parts of the new Google Ads era is that reporting transparency is going down, not up. Ads in AI Overviews do not get segmented reporting, by Google's own admission. AI Max search terms often cannot be traced back to a specific keyword. The dashboard tells you less about why something happened than it used to."),

    h3("Track Outcomes, Not Platforms"),
    p("Stop measuring success by what Google Ads tells you happened. Measure success by what your CRM tells you happened. If your sales team is closing more deals from leads tagged as Google Ads source, your campaign is working, regardless of what the dashboard says about CTR or CPC."),

    h3("Use Experiments, Not Feelings"),
    p("Every meaningful change to a campaign should run as an A/B experiment for at least four weeks. With AI Max, this has become non-negotiable. The variance in results is too wide to trust gut feel or short-term data."),

    h3("Build Pipeline-Source Attribution by Hand if You Must"),
    p("For high-value B2B businesses, manual lead source tagging at the moment of first conversation often beats automated attribution. Train your sales team to ask every new lead one question: how did you find us. Three months of this data is worth more than any platform-level attribution report."),

    h3("Watch the Search Terms Report Like a Hawk"),
    p("The single most valuable diagnostic tool for AI Max performance is the search terms report. Look for queries that should not be triggering your ads. Add them as negatives. Do this weekly for the first 60 days after enabling AI Max, monthly thereafter."),

    // ── Industry-Specific Notes ───────────────────────────────────────────────
    h2("Industry-Specific Notes: Education, Travel, Manufacturing, B2B"),

    h3("Education and EdTech"),
    p("Education is the most exposed sector to lead quality drift. Course-specific pages, fee-specific queries, and program-specific landing pages are precisely the kind of tightly-matched setups that AI Max's final URL expansion can route around. A user searching for a specific online MBA program who lands on a generic course catalog page is a much weaker lead than one who landed where they expected. The decision cycle is already long in education (often 30 to 90 days from inquiry to enrollment). Sales heads in education should pay particular attention to the time-from-first-inquiry-to-counsellor-call metric, which is sensitive to landing page quality."),

    h3("Travel, Hospitality, and Wellness"),
    p("Travel and wellness benefit from AI Mode in an unusual way: long, conversational, identity-driven queries are exactly the kind that AI Overviews handle well. \"Where should I go for a wellness retreat in Kerala in November as a first-timer\" is a query that AI is going to synthesize an answer for, and the brand cited inside that answer captures meaningful consideration. The risk is on the paid ads side. Travel campaigns that depend on tightly-matched destination keywords will see traffic shift to broader matching, which will pull in users in earlier stages of consideration. Plan for longer nurturing cycles."),

    h3("Manufacturing and Industrial B2B"),
    p("Manufacturing and industrial B2B accounts have the most to lose from lead quality drift, because each unqualified lead consumes meaningful sales-team time. Negative keyword discipline becomes the single most important practice for these accounts. The good news: well-prepared B2B accounts often see the largest gains from AI Max, because the keywordless matching surfaces real high-intent queries that traditional keyword strategies missed. The two outcomes (gain or loss) hinge almost entirely on the quality of negative keyword management in the first 60 days."),

    h3("B2B Services"),
    p("B2B services sit between manufacturing and education in their exposure. The lead quality risk is real, but the AI Mode visibility upside is substantial because B2B buyers are heavy users of AI search for early-stage research, particularly Claude (favoured for senior decision-maker research) and Microsoft Copilot (embedded into the Microsoft 365 environment most Indian B2B operations run on). Plan for two distinct workstreams: protecting paid lead quality, and capturing AI Overview visibility for high-consideration B2B queries."),

    // ── CEO Brief ─────────────────────────────────────────────────────────────
    h2("What to Brief Your CEO Before September 2026"),
    p("Most CEOs of growing Indian businesses are aware that \"AI is changing search\" but have not connected that change to specific implications for the business this year."),

    co("The Three-Point CEO Brief", "", "key-takeaway", [
      "First: Google has changed how its advertising platform works in two specific ways that directly affect our pipeline, and the changes are happening across Q2 and Q3 2026.",
      "Second: the marketing dashboard is becoming less transparent about what is actually driving results, which means we will rely more on what the sales team and CRM are telling us than on the platform reports.",
      "Third: if we do nothing, our cost per qualified lead will likely deteriorate before we notice. We are running a 90-day plan to get ahead of this. Here is what we are doing, and here are the three numbers we will report on monthly.",
    ]),

    p("CEOs read by exception. They want to know what would trigger action and what good looks like. They do not want a Google Ads tutorial."),

    // ── What to Do This Week ──────────────────────────────────────────────────
    h2("What to Do This Week"),

    co("Five Immediate Actions", "", "key-takeaway", [
      "Get the list of campaigns auto-upgrading in September. Three working days, from your team or agency.",
      "Confirm that sales-qualified lead data flows from your CRM into Google Ads as a conversion. If it does not, fix it this week. Nothing else matters as much as this.",
      "Schedule a 30-minute marketing-sales weekly review starting next week. Make it permanent.",
      "Identify one mid-sized Search campaign to use as your AI Max test campaign. Have it ready to migrate in two weeks.",
      "Draft a one-page brief for your CEO. Send it within two weeks. Do not wait until September.",
    ]),

    pq("The bottom line: Indian advertisers running Google Ads in 2026 must voluntarily test AI Max on one campaign before September, fix CRM-to-Google-Ads conversion tracking, and establish a weekly sales-marketing review rhythm. Skip these three steps and you will spend the rest of the year diagnosing problems you could have prevented."),

    // ── About the Author ──────────────────────────────────────────────────────
    h2("About the Author"),
    p("Swapnil Ughade is Founder of MagicWorks IT Solutions Pvt Ltd, an AI-first digital marketing agency based in Pune. MagicWorks helps Indian businesses across education, travel and wellness, manufacturing, and B2B services run Google and Meta advertising operations that prioritise sales-qualified pipeline over vanity metrics."),

    co("Need Help Preparing for the September 2026 Deadline?", "MagicWorks runs a Google Ads AI Readiness Audit that maps every campaign exposed to the September auto-upgrade, baselines current sales-qualified lead performance, and gives you a written 90-day migration plan.\n\nCall: +91-9764566644 | Email: sales@magicworksitsolutions.com", "info"),

    // ── Sources Cited ─────────────────────────────────────────────────────────
    h2("Sources Cited"),
    olLink("Google Ads Help: \"About ads and AI Overviews\"", "https://support.google.com/google-ads/answer/16297775?hl=en"),
    olLink("Google Ads blog: \"Dynamic Search Ads are upgrading to AI Max\" (April 2026)", "https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/"),
    olLink("Search Engine Land: \"Google Zero misses the real problem\" (Semrush 93% AI Mode zero-click data)", "https://searchengineland.com/google-zero-misses-real-problem-473050"),
    olLink("Search Engine Land: \"AI Max for Search: Everything you need to know\"", "https://searchengineland.com/ai-max-for-search-everything-you-need-to-know-462923"),
    olLink("ALM Corp: \"Google AI Max Recommendation 2026\" (independent testing including Monks Agency findings)", "https://almcorp.com/blog/google-ads-ai-max-recommendation-2026/"),
    olLink("Digital Applied: \"Google AI Max GA: DSA Sunset Playbook\" (April 2026 timeline analysis)", "https://www.digitalapplied.com/blog/google-ai-max-ga-dsa-sunset-agency-playbook-2026"),
    olLink("Similarweb: \"Generative AI Statistics for 2026\"", "https://www.similarweb.com/blog/marketing/geo/gen-ai-stats/"),
    olLink("Exchange4media: \"Google AI Mode in India setting marketers on a new Search?\"", "https://www.exchange4media.com/digital-news/google-ai-mode-in-india-setting-marketers-on-a-new-search-145049.html"),
    olLink("Google India Blog: \"Google Search: Introducing AI Mode in India\"", "https://blog.google/intl/en-in/products/google-search-introducing-ai-mode-in-india/"),
    olLink("Google Ads Blog: \"Unlock next-level performance with AI Max for Search campaigns\"", "https://blog.google/products/ads-commerce/google-ai-max-for-search-campaigns/"),
  ];
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = [
  {
    question: "Are ads in AI Overviews available in India?",
    answer: "Yes. Google Ads Help currently lists India among the countries where ads in AI Overviews are available in English on mobile and desktop. Ads may appear above, below, or within AI Overviews, depending on the query, the AI Overview content, and existing campaign eligibility.",
  },
  {
    question: "What is AI Max for Search and how does it differ from Performance Max?",
    answer: "AI Max for Search is an optional suite of three AI-powered features — search term matching, text customization, and final URL expansion — that you enable on existing Google Search campaigns. It is not a new campaign type. Performance Max is a separate campaign type that runs across Google channels including Search, Display, YouTube, Gmail, Discover, and Maps. AI Max focuses on Search and provides more Search-specific controls than Performance Max. AI Max moved out of beta on April 15, 2026.",
  },
  {
    question: "When does Google auto-upgrade my campaigns to AI Max?",
    answer: "Google will automatically upgrade campaigns using Dynamic Search Ads, automatically created assets, or campaign-level broad match settings to AI Max in September 2026. Advertisers can voluntarily migrate before the auto-upgrade deadline to maintain control over default settings. The total migration window is approximately 5.5 months from announcement to completion.",
  },
  {
    question: "Will AI Max hurt my Google Ads lead quality?",
    answer: "It depends entirely on account preparation. Independent testing data shows wide variance: SMEC agency reported a 13 percent revenue increase, while Monks Agency found 99 percent of impressions on AI Max search terms drove zero conversions in their testing of 30,000 search terms. A LinkedIn poll found 16 percent of PPC professionals reported good performance with AI Max while 84 percent reported neutral or negative results. Well-prepared accounts (with clean conversion tracking, comprehensive negative keywords, and strong landing pages) typically see gains. Poorly-prepared accounts often see significant lead quality drift that does not show up in standard marketing reports for several weeks.",
  },
  {
    question: "Should I enable AI Max now or wait for the September auto-upgrade?",
    answer: "Voluntary early migration is generally the better choice for accounts running Dynamic Search Ads, automatically created assets, or campaign-level broad match. Voluntary migration gives you control over which features activate, time to set up A/B experiments, and the ability to add aggressive negative keywords before performance drifts. Waiting for the September auto-upgrade means default settings are applied and you are managing reactively. The exception: if your account does not currently use any of those three older campaign types, you do not face the auto-upgrade deadline and can plan migration on your own timeline.",
  },
  {
    question: "How do I track Google Ads performance now that AI Overview reporting is not segmented?",
    answer: "Build supplementary measurement practices because the Google Ads dashboard alone is no longer sufficient. Track outcomes (sales-qualified leads, closed deals, pipeline value) from your CRM rather than relying on platform CTR and conversion metrics. Run every meaningful change as a four-week A/B experiment. Train your sales team to manually tag lead source at first conversation. And review the search terms report weekly for the first 60 days after enabling AI Max, monthly thereafter.",
  },
  {
    question: "How is GEO related to Google AI Mode advertising strategy?",
    answer: "Generative Engine Optimization (GEO) is the practice of structuring content to be cited inside AI-generated answers, including Google AI Overviews. GEO and Google Ads strategy now work together in a way they did not in 2024. The brands that show up inside AI Overviews organically (through GEO) are also the brands that get stronger ad placements in those AI Overviews when they show up paid. Investing in GEO and paid AI Mode advertising in parallel produces compounding results over 12 to 24 months.",
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
const SLUG = "google-ai-mode-india-advertisers-2026";

async function main() {
  console.log(`\n🔍  Looking up article: ${SLUG}`);
  const doc = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id, title, externalCoverImageUrl }`,
    { slug: SLUG }
  );
  if (!doc) { console.error(`❌  Article not found`); process.exit(1); }
  console.log(`✅  Found: "${doc.title}" (${doc._id})\n`);

  const body = buildBody();
  console.log(`📝  Body: ${body.length} blocks`);

  const patches = {
    body,
    faq: FAQ.map(f => ({ _type: "object", _key: k("faq"), question: f.question, answer: f.answer })),
    excerpt: "Google AI Overviews ads and AI Max are changing Search in India. A 90-day playbook for advertisers before the Sept 2026 upgrade.",
    seoTitle: "Google AI Overviews & AI Max in India: 90-Day Playbook",
    tags: [
      "Google AI Mode India",
      "AI Max for Search 2026",
      "AI Overview ads India",
      "Google Ads September 2026",
      "DSA upgrade India",
      "Performance Max India",
    ],
  };

  console.log(`\n💾  Patching document…`);
  await client.patch(doc._id).set(patches).commit();
  console.log(`✅  Rewrite complete! ${body.length} blocks, ${FAQ.length} FAQ items.\n`);
  console.log(`🎉  Open in Studio to review:`);
  console.log(`    https://${PROJECT_ID}.sanity.studio/structure/insight;${doc._id}\n`);
}

main().catch(err => { console.error(`\n❌  Fatal:`, err.message); process.exit(1); });
