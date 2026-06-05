/**
 * patch-blog1-geo-rewrite.mjs
 *
 * Full rewrite of "GEO for Indian Businesses 2026" blog post.
 *
 * Updates: body (PortableText), faq, excerpt, seoTitle, tags
 * Preserves: existing cover image, slug, author, publishedAt, category
 *
 * Run: node scripts/patch-blog1-geo-rewrite.mjs
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

    // ── Short Answer ──────────────────────────────────────────────────────────
    h2("The Short Answer"),
    p("Generative Engine Optimization, or GEO, is the practice of structuring your business content so AI search platforms like ChatGPT, Claude, Microsoft Copilot, Google AI Mode, Gemini, and Perplexity cite your brand inside the answers they generate for users. Unlike traditional SEO, which optimizes for ranking in a list of links, GEO optimizes for being quoted inside a conversation. ChatGPT now has more than 900 million weekly active users globally, while Gemini, Copilot, Claude, and Perplexity are increasingly important in search, workplace, enterprise, and B2B research contexts. Google says AI Overviews are used by more than 1.5 billion people monthly globally. For Indian businesses, this means a structural shift: customers now make decisions inside AI answers, often without visiting your website. Most Indian SMEs have not started GEO yet. MagicWorks' working estimate is that the first-mover window remains open for roughly 6 to 12 more months in many Indian categories."),

    sr(
      { value: "900M+", label: "ChatGPT weekly active users globally", note: "OpenAI, 2026" },
      { value: "93%",   label: "of Google AI Mode queries end without a click", note: "Semrush, Sept 2025" },
      { value: "6.5×",  label: "more likely to be cited via third-party sources", note: "AIVO, March 2026" },
    ),

    // ── What This Article Covers ──────────────────────────────────────────────
    h2("What This Article Covers"),
    li("What is Generative Engine Optimization (GEO)?"),
    li("How is GEO different from SEO?"),
    li("The major AI search platforms in 2026 and how they differ"),
    li("Where do AI engines actually find their citations in 2026?"),
    li("Why does GEO matter more for Indian businesses?"),
    li("A 90-day GEO action plan for Indian SMEs"),
    li("How do you measure GEO when nobody is clicking?"),
    li("Five mistakes Indian businesses make when they start GEO"),
    li("What to do this week"),
    li("Frequently asked questions about GEO"),

    // ── Why Search is Changing ────────────────────────────────────────────────
    h2("Why Search is Changing Faster Than Most Indian Businesses Realise"),
    p("For 25 years, Indian businesses have followed one rule of online visibility: get to page one of Google. The whole digital marketing industry was built around that single goal. Keywords. Backlinks. On-page optimization. Domain authority. Every agency, every freelancer, every YouTube tutorial pointed at the same destination. That rule is breaking, and most business owners have not noticed yet."),
    p("When a customer asks a question today, the answer increasingly does not come from a list of blue links. It comes from inside ChatGPT, Claude, Microsoft Copilot, Google AI Mode, Gemini, or Perplexity. The user reads the answer. The user often makes a decision. The user often never clicks anything. Semrush data from September 2025 found that 93 percent of Google AI Mode queries end without a single click to any external website. Independent research by Seer Interactive, covering 25.1 million impressions over 16 months, found organic click-through rates dropped 61 percent on queries that triggered AI Overviews. Major publishers like Reuters and The Guardian receive less than 1 percent of their referral traffic from AI platforms, even though those platforms cite them frequently. The visibility is real. The traffic is not."),

    pq("The decision is being made inside the AI answer. The brand mentioned in that answer is the brand that gets the business. Whether the customer ever visits your website has become almost optional."),

    p("For an Indian SME spending lakhs every year on SEO and Google Ads, this raises an uncomfortable question. If your customers are getting their answers from ChatGPT, Claude, or Microsoft Copilot, and those platforms are not mentioning your brand, do you actually exist in their world? The honest answer in most categories today is: not really. This is the problem GEO is built to solve."),

    // ── What is GEO ──────────────────────────────────────────────────────────
    h2("What is Generative Engine Optimization (GEO)?"),
    p("Generative Engine Optimization, or GEO, is the practice of structuring your content, brand, and online presence so that generative AI systems include your business inside the answers they produce for users. Where traditional SEO targets a position in a list of blue links, GEO targets inclusion inside an AI-generated answer. The term GEO was helped into mainstream marketing vocabulary by a 2024 KDD paper titled \"GEO: Generative Engine Optimization\", which tested methods for improving visibility in generative engines and reported meaningful visibility gains from tactics such as statistics, citations, and authoritative language. By 2025 it was a marketing concept. By early 2026, it had become a boardroom priority for enterprise marketing teams worldwide. Most Indian SMEs are still behind that curve, which is exactly why the opportunity is significant right now."),

    // ── GEO vs SEO ───────────────────────────────────────────────────────────
    h2("How is GEO Different from SEO?"),
    co("GEO vs SEO: Key Differences", "", "stat", [
      "Goal: SEO ranks in a list of links. GEO gets quoted inside an AI-generated answer.",
      "Primary metric: SEO measures click-through rate. GEO measures citation frequency.",
      "Content style: SEO favours keyword-targeted pages. GEO favours answer-first, fact-dense content.",
      "Authority signal: SEO builds backlinks. GEO builds third-party mentions and citations.",
      "Authorship: SEO often uses anonymous content. GEO requires named, credentialed authors.",
    ]),

    p("The most important thing to understand is this: GEO is not a replacement for SEO. It is a new layer that sits on top of it. Strong SEO fundamentals are still the foundation. GEO adds new requirements on top: citation-friendliness, answer-first formatting, original data, and named authorship."),
    p("But here is the part that changed in early 2026 and most Indian businesses do not yet know. AIVO research published in March 2026 found that 80 percent of citations by ChatGPT, Perplexity, and Microsoft Copilot do not rank in Google's top 100 results for the original query. Only 38 percent of AI Overview citations come from the top 10 organic results, down from 76 percent in mid-2025. This is the divergence that matters: AI engines are increasingly trusting content that traditional Google ranking has missed."),
    p("Brands that win at GEO are almost always brands that also have strong SEO foundations. The brands that abandon SEO chasing GEO will lose both. The brands that ignore GEO and stick to SEO alone will gradually disappear from the answers AI is generating for their customers."),

    // ── AI Platforms ─────────────────────────────────────────────────────────
    h2("The Major AI Search Platforms in 2026 and How They Differ"),
    p("AI search is no longer a single channel. In 2026, there are at least six major platforms your customers may be using, each with different retrieval logic, different citation sources, and different user bases. A GEO strategy that optimises for one platform and ignores the others will miss significant share of your customers' information journey."),

    co("Platform Priority for Indian Businesses", "", "info", [
      "B2B priority order: ChatGPT → Microsoft Copilot → Claude → Google AI Mode → Perplexity",
      "Consumer priority order: ChatGPT → Google AI Mode/Gemini → Microsoft Copilot → Claude/Perplexity",
      "Microsoft Copilot is critical for B2B: embedded in Microsoft 365, which most Indian enterprises and SMEs run on.",
      "Claude is important for senior decision-maker and regulated-industry research.",
      "Perplexity is citation-first — disproportionately important for understanding GEO effectiveness.",
    ]),

    // ── Where Do AI Engines Find Citations ───────────────────────────────────
    h2("Where Do AI Engines Actually Find Their Citations in 2026?"),
    p("To do GEO well, you need to understand where AI models pull their answers from. This is the part most Indian businesses get wrong, because they assume AI works like Google. It does not. Importantly, the rankings shift faster than any other digital channel."),

    h3("Source 1: YouTube and Branded Video Content"),
    p("Several third-party GEO studies in 2025 and 2026 identify YouTube and branded video transcripts as important AI-citation inputs, especially for \"how to\", comparison, and \"best of\" queries. AI engines can parse YouTube transcripts heavily when the video title, description, and spoken content are clear. A well-titled, well-described YouTube video with a clean transcript is one of the highest-leverage GEO assets a business can create. This is severely underused by Indian SMEs."),

    h3("Source 2: Reddit, Quora, and Community Forums"),
    p("Reddit is still highly cited, but its dominance is now platform-specific. Google AI Overviews still heavily cite Reddit (roughly 21 percent of responses reference it). Perplexity's retrieval pipeline continues to favor Reddit user-generated content (24 percent of total citations). Reddit citation share reached above 5 percent on ChatGPT during January 2026, while the same metric was just 0.1 percent on Google Gemini, according to Tinuiti's Q1 2026 AI Citations Trends Report. Research published by AIVO in March 2026 found that brand presence on Reddit and Quora yields 4 times higher citation rates compared to brands without community presence. For Indian businesses, this also extends to Quora, IndiaMart Q&A, and active LinkedIn comment threads."),

    h3("Source 3: Review Platforms (Trustpilot, G2, Google Business)"),
    p("Brands with active presence on Trustpilot and G2 receive 3 times more ChatGPT citations than brands without, according to ConvertMate's 2026 GEO benchmark study. Brands with active review management across Google Business, Trustpilot, and G2 also see 47 percent fewer negative AI citations. For Indian businesses, this means Google Business Profile management has shifted from a \"nice to have\" local SEO tactic to a foundational GEO asset."),

    h3("Source 4: Wikipedia and Authoritative Reference Sites"),
    p("Wikipedia accounts for 47.9 percent of top sources cited by ChatGPT, according to citation analysis. AI engines treat Wikipedia, government domains, and established industry bodies as foundational truth. While most Indian SMEs cannot get into Wikipedia easily, getting cited on industry association websites, government MSME portals, and trade publications has the same effect."),

    h3("Source 5: Original Research, Data, and Named Frameworks on Your Own Site"),
    p("The 2024 GEO research found that adding statistics, credible quotations, and authoritative language can improve visibility in generative-engine responses. A blog post that says \"industry experts say SEO matters\" gets ignored. A blog post that says \"across the 100 client accounts we manage at MagicWorks, here are the three patterns we see in 2026\" is more citation-friendly. Original data, real numbers, and named frameworks turn your site from a content factory into a citation source."),

    h3("Source 6: Third-Party Publications, Podcasts, and Earned Media"),
    p("AI engines trust mentions of you on other websites more than they trust your own claims about yourself. Research published by Stacker in December 2025 found that distributing earned media content across multiple publications can increase AI citations by up to 325 percent compared to publishing only on your own site. AIVO's March 2026 data went further: brands are 6.5 times more likely to be cited through third-party sources than through their own domains. For Indian businesses, this means a guest article in a Tier 1 Indian publication, a podcast appearance with a credible host, or a quote in a trade journal carries much more GEO weight than ten posts on your own blog. This is the highest-leverage activity nobody is investing in."),

    pq("AI engines do not trust what your website says about you. They trust what other websites say about you. Brands are 6.5 times more likely to be cited through third-party sources than through their own domains. This single insight changes how a serious GEO strategy is built."),

    // ── Why GEO Matters More for Indian Businesses ────────────────────────────
    h2("Why GEO Matters More for Indian Businesses Than Western Ones"),
    p("There is a specific reason GEO is more urgent for Indian SMEs than for businesses in mature Western markets, and almost nobody is talking about it. Indian search has historically been brutal. Hundreds of competitors, all chasing the same keywords, all running similar Google Ads campaigns, all producing similar SEO content. For most Indian SMEs, getting to page one of Google in a competitive category is a 12 to 24-month investment, sometimes longer. The cost-per-click on Indian Google Ads has roughly doubled in the last five years across most categories."),
    p("AI search resets this competitive dynamic. When a customer asks ChatGPT, Claude, Microsoft Copilot, or Google AI Mode a question, the AI is not running an auction. It is not ranking pages by domain authority alone. It is synthesising an answer from sources it has decided are trustworthy in your category. In many Indian categories, that trust map is still forming."),
    p("There is also a uniquely Indian advantage. Indian buyers ask questions in a wider variety of ways than Western buyers, including in mixed Hindi-English (Hinglish), regional languages, and very long, context-rich queries. AI handles these query types far better than traditional Google search ever did."),

    h3("What This Means in Practice"),
    p("A small architectural firm in Pune, a manufacturing SME in Coimbatore, a wellness clinic in Hyderabad, an EdTech startup in Bengaluru — all of these can now realistically compete for AI search visibility against businesses 10 times their size, in ways they could never realistically compete in traditional search. The barrier to entry is lower. The advantages of being early are higher. And the window is open."),

    // ── 90-Day GEO Action Plan ────────────────────────────────────────────────
    h2("A 90-Day GEO Action Plan for Indian SMEs"),
    p("This is the practical core of the article. The plan below is the same approach we run at MagicWorks for our clients. It is built to be doable by an SME with a small marketing team, or by an agency partner. It does not require enterprise budgets. It requires discipline and clarity."),

    h3("Days 1 to 14: The Visibility Audit"),
    p("Before you build anything new, you need to know where you stand today. Most businesses skip this and waste months optimizing in the wrong direction."),
    li("Identify the 15 to 20 most important questions your customers actually ask. Not what they search on Google. What they would type into ChatGPT, Claude, or Perplexity. Read your sales team's notes. Listen to recorded calls. Pull questions from your customer support inbox."),
    li("Run each question through ChatGPT, Claude, Microsoft Copilot, Google AI Mode, and Perplexity. Manually. Note which brands are being cited. Note where there is no clear citation leader. These gaps are your opportunities. Run each query at least three times because AI responses vary significantly between runs."),
    li("Categorise the questions: where is your brand already cited, where is no clear leader, where is a competitor dominating. This becomes your GEO priority list."),
    li("Audit your Google Business Profile, Trustpilot, and G2 listings. For Indian B2B businesses, also audit your IndiaMart, JustDial, and Sulekha presence."),

    h3("Days 15 to 45: The Content Rebuild"),
    p("In this phase, you are not creating new content. You are rebuilding 5 to 10 existing pages on your site to be GEO-friendly, plus creating 3 to 5 high-leverage new pieces."),

    h4("How a GEO-Friendly Page is Structured"),
    co("GEO Page Checklist", "", "key-takeaway", [
      "First 200 words: directly answer the primary question. No long introduction. No setup. Growth Memo research found 44.2% of all LLM citations come from the first 30% of a page.",
      "Headings: clear H2 and H3 headings that include the actual questions a user might ask. Foundation Marketing research found 68.7% of ChatGPT citations follow logical heading hierarchies.",
      "Original data wherever possible. Real numbers from your own work. Real ranges. Real client outcomes (with permission).",
      "Named author with credentials. Anonymous bylines are now a GEO penalty. AI engines trust named experts.",
      "Schema markup applied correctly: Article, FAQ, HowTo, where appropriate. ConvertMate research found 61% of cited pages use structured data markup.",
      "Last-updated dates within 90 days. Roughly 50% of content cited in AI answers is less than 13 weeks old.",
      "Citation-friendly sentences. Short, factual, declarative. AI engines extract sentences. Make yours extractable.",
    ]),

    h3("Days 46 to 75: The Third-Party Citation Campaign"),
    p("This is where most businesses stop, which is precisely why most businesses fail at GEO. Your own website can only do so much. AI engines weigh third-party mentions far more heavily than self-published content."),
    li("Identify 10 to 15 industry publications, podcasts, and trade websites in your category. Indian-specific where possible. Pitch original commentary, guest articles, expert quotes, or interview opportunities. The earned media payoff is substantial: distributing the same content across multiple publications can increase AI citations by up to 325 percent."),
    li("Pitch your founder or senior team as named experts to journalists covering your industry. Use platforms like HARO, Qwoted, or build relationships with 2 to 3 trade journalists directly."),
    li("Create one piece of \"citation magnet\" content. Original research, a benchmark study, or a proprietary framework. \"The 2026 State of Digital Marketing for Indian SMEs\" is more powerful than 10 generic blog posts. Other publications and AI systems will cite it for years."),
    li("Engage actively in 2 to 3 high-quality industry communities. Reddit, Quora, LinkedIn comment sections, niche Slack groups, and trade forums. Reddit and Quora presence yields 4x higher citation rates than absence."),
    li("Strengthen your review platform presence. Encourage satisfied clients to leave reviews on Google Business, Trustpilot, G2 (for SaaS), and category-specific platforms. Brands active across these platforms see 3x more ChatGPT citations."),

    h3("Days 76 to 90: Measurement and Adjustment"),
    p("In the final stretch, you set up the measurement infrastructure that will tell you whether GEO is actually working."),
    li("Set up branded search tracking in Google Search Console and Google Trends. As your AI visibility improves, brand searches will rise even if AI never sends you any direct traffic."),
    li("Run a monthly manual citation audit. Take your 15 to 20 priority questions and re-test them across ChatGPT, Claude, Microsoft Copilot, Google AI Mode, and Perplexity once a month. Track citation frequency over time in a simple sheet."),
    li("Watch direct traffic and brand-name searches as leading indicators, since AI platforms typically do not pass through referral data."),
    li("Set up Bing Webmaster Tools. Bing powers ChatGPT's web search and Microsoft Copilot. Most Indian businesses ignore Bing entirely, which is now a meaningful mistake."),

    // ── How to Measure GEO ────────────────────────────────────────────────────
    h2("How Do You Measure GEO When Nobody is Clicking?"),
    p("The hardest thing about GEO is that the traditional digital marketing dashboards do not show you whether it is working. Clicks are not the metric. Impressions are not the metric. There is no Google Search Console for AI Mode. So how do you know? There are four signals that, taken together, give you a reliable picture."),

    h3("Signal 1: Citation Frequency"),
    p("Manually testing whether your brand appears inside AI answers for your priority questions. Tedious but essential. Track on a spreadsheet, monthly. This is the most direct measure available right now. Important caveat: AI recommendations are highly variable. Research from SparkToro in January 2026 found that the same prompt asked 100 times rarely produces the exact same brand list, so multi-sample your testing."),

    h3("Signal 2: Branded Search Volume"),
    p("When users see your brand cited in an AI answer, a percentage of them search your brand name directly afterwards. Branded search volume is becoming the strongest leading indicator of AI visibility. Track it in Google Search Console and Google Trends."),

    h3("Signal 3: Direct Traffic and Referral Patterns"),
    p("AI platforms typically do not pass referral data, so traffic from them often shows up as direct traffic. A steady rise in direct traffic, especially when matched with rising branded searches, is a strong signal that AI is sending you visibility even if it is not sending clicks."),

    h3("Signal 4: Conversion Rate Quality"),
    p("Reports from Semrush's 2026 data show that visitors arriving from AI platforms convert at 4.4 times the rate of traditional search visitors. The volume is lower. The quality is dramatically higher. If your overall conversion rate starts climbing without obvious explanation, AI search is often the hidden reason. HubSpot's 2026 State of Marketing report found that AI referral traffic converts 3 times better than traditional search, with leads from LLMs up 1,850 percent year-over-year."),

    // ── Five Mistakes ─────────────────────────────────────────────────────────
    h2("Five Mistakes Indian Businesses Make When They Start GEO"),

    h3("Mistake 1: Treating GEO as Content Marketing on Autopilot"),
    p("GEO does not reward volume. AI engines do not cite filler. Twenty average blog posts will not outperform two excellent ones with original data and named authorship. Most Indian businesses default to volume because that is what content agencies sell. It is exactly the wrong instinct for GEO."),

    h3("Mistake 2: Anonymous Content"),
    p("Posts written by \"content team\" or with no byline at all are now a GEO penalty. AI engines weight author credentials heavily. Every important piece of content on your site should have a named author with verifiable credentials and a real online presence."),

    h3("Mistake 3: Ignoring Third-Party Citations"),
    p("Indian businesses are very good at writing on their own blogs and very poor at getting written about on others. AI engines weight external mentions far more than self-published content (6.5 times more, according to AIVO 2026 data). The single highest-leverage GEO activity is getting cited by other websites, not publishing more on your own."),

    h3("Mistake 4: Chasing Every AI Platform Equally"),
    p("There are now half a dozen major AI search platforms, and they cite different sources very differently. Tinuiti research found Reddit citation share at over 5 percent on ChatGPT but only 0.1 percent on Google Gemini in January 2026. ChatGPT and Perplexity share only 11 percent of cited domains. Trying to optimize for all platforms equally dilutes effort. Pick the two or three that matter most for your business and focus there."),

    h3("Mistake 5: Expecting Traffic to Grow"),
    p("This is the most disorienting part of GEO. You can be doing everything right, gaining significant AI visibility, and your traffic numbers may stay flat or even drop. The decision is being made inside the AI answer. The customer often arrives ready to buy without ever browsing your site. Expect lower traffic and higher conversion rates."),

    // ── What to Do This Week ──────────────────────────────────────────────────
    h2("What to Do This Week"),
    co("Five Actions — Start This Week", "", "key-takeaway", [
      "Pick 5 questions your customers genuinely ask. Test each one in ChatGPT, Claude, Microsoft Copilot, Google AI Mode, and Perplexity. See whether your brand is mentioned anywhere across the five.",
      "Pick one existing page on your website that targets one of those questions. Rewrite the first 200 words to answer the question directly, without setup or introduction.",
      "Add a named author byline to that page. Real person. Real credentials. Real LinkedIn profile linked.",
      "Audit your Google Business Profile and Trustpilot/G2 presence. If incomplete or unverified, fix this week.",
      "Identify one industry publication, podcast, or trade journal where you could realistically appear as a guest expert in the next 60 days. Reach out this week.",
    ]),

    pq("The bottom line: Indian businesses that start GEO in 2026 can build durable visibility inside AI answers. The ones that wait risk being absent from the answers their customers are reading, long before they understand what changed."),

    // ── About the Author ──────────────────────────────────────────────────────
    h2("About the Author"),
    p("Swapnil Ughade is Founder of MagicWorks IT Solutions Pvt Ltd, an AI-first digital marketing agency based in Pune. MagicWorks helps Indian businesses across education, travel and wellness, manufacturing, and B2B services build AI-driven marketing systems that turn traffic into measurable revenue."),

    co("Want a GEO Audit for Your Business?", "MagicWorks runs a 14-day GEO Visibility Audit for Indian businesses, covering citation analysis across ChatGPT, Claude, Microsoft Copilot, Google AI Mode, Gemini, and Perplexity, content gap mapping, third-party platform readiness assessment, and a custom 90-day action plan.\n\nCall: +91-9764566644 | Email: sales@magicworksitsolutions.com", "info"),

    // ── Sources Cited ─────────────────────────────────────────────────────────
    h2("Sources Cited"),
    olLink("Search Engine Land: \"Google Zero misses the real problem\"", "https://searchengineland.com/google-zero-misses-real-problem-473050", " — Semrush 93% AI Mode zero-click data"),
    olLink("AIVO: GEO Data Nobody is Talking About", "https://www.tryaivo.com/blog/geo-data-nobody-talking-about-march-2026", " — March 2026: 80% of LLM citations not ranking in Google top 100"),
    olLink("ConvertMate: GEO Benchmark Study 2026", "https://www.convertmate.io/research/geo-benchmark-2026"),
    olLink("Princeton/Georgia Tech: GEO research paper", "https://arxiv.org/abs/2311.09735", " — 2024 foundational study"),
    olLink("Similarweb: AI Chatbot Market Share 2026", "https://www.similarweb.com/blog/marketing/geo/gen-ai-stats/"),
    olLink("Position Digital: 150+ AI SEO Statistics for 2026", "https://www.position.digital/blog/ai-seo-statistics/"),
    olLink("Firebrand: GEO Best Practices for 2026", "https://www.firebrand.marketing/2025/12/geo-best-practices-2026/"),
    olLink("Press Gazette / Similarweb: ChatGPT referrals to publishers less than 1%", "https://pressgazette.co.uk/platforms/chatgpt-perplexity-news-ai-referral-search/"),
    olLink("Stackmatix: AI Search Market Share 2026", "https://www.stackmatix.com/blog/ai-search-market-share-2026"),
    olLink("OpenAI: \"Scaling AI for everyone\"", "https://openai.com/index/scaling-ai-for-everyone", " — ChatGPT weekly-active-user update"),
    olLink("Google India Blog: \"Google Search: Introducing AI Mode in India\"", "https://blog.google/intl/en-in/products/google-search-introducing-ai-mode-in-india/"),
    olLink("Princeton/KDD 2024: \"GEO: Generative Engine Optimization\"", "https://collaborate.princeton.edu/en/publications/geo-generative-engine-optimization/"),
  ];
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = [
  {
    question: "What is Generative Engine Optimization (GEO)?",
    answer: "Generative Engine Optimization (GEO) is the practice of structuring your content and digital presence so that AI search platforms like ChatGPT, Claude, Microsoft Copilot, Google AI Mode, Gemini, and Perplexity cite your brand inside the answers they generate for users. SEO optimizes for ranking in a list of links so users will click through to your site. GEO optimizes for being quoted inside an AI-generated answer, where the user often makes a decision without ever clicking. SEO and GEO share foundational requirements (technical health, content quality, authority) but diverge in execution: SEO rewards keyword discipline and backlinks, while GEO rewards answer-first content, original data, named authors, and third-party citations.",
  },
  {
    question: "How do I get my business cited by ChatGPT?",
    answer: "To increase the likelihood of being cited by ChatGPT, focus on five things. Publish content with original data and named expert authors on your own site. Get cited by third-party publications, since ChatGPT weights external mentions heavily. Maintain Wikipedia presence where possible, since Wikipedia accounts for approximately 47.9 percent of top sources cited by ChatGPT. Keep content fresh, since 50 percent of content cited in AI answers is less than 13 weeks old. And invest in YouTube, since YouTube is among the most-cited domains in LLM responses.",
  },
  {
    question: "How long does GEO take to show results?",
    answer: "GEO results typically begin to appear within 90 days of consistent optimization, with substantial gains visible by 6 to 12 months and the full citation flywheel compounding by 18 to 24 months. The timeline is similar to SEO but with one important difference: GEO compounds more rapidly once initial citations begin because AI engines tend to favor sources they have already trusted. Indian businesses that start GEO in early 2026 should see initial citation appearances by mid-2026, meaningful share of voice gains by end of 2026, and dominant category positioning by mid-2027.",
  },
  {
    question: "What is the difference between AEO and GEO?",
    answer: "AEO (Answer Engine Optimization) is a subset of GEO focused specifically on getting your content extracted as a direct answer inside AI responses, primarily through structured data, FAQ schema, and answer-first content formatting. GEO is the broader discipline that includes AEO plus off-page authority work: brand entity consistency, third-party citations, multi-platform presence, and topic cluster depth. In practice, AEO covers what happens on your page; GEO covers everything that determines whether AI engines trust your brand enough to cite you in the first place.",
  },
  {
    question: "Is SEO still relevant in 2026?",
    answer: "Yes, but its role has changed. Traditional SEO is no longer sufficient on its own because 93 percent of Google AI Mode queries end without a click and AI Overviews appear on a growing share of all searches. However, strong SEO foundations are still required for GEO to work. Brands that abandon SEO chasing GEO will lose both. Brands that ignore GEO and stick to SEO alone will gradually disappear from AI-generated answers. The right approach in 2026 is SEO plus GEO running together, with budget rebalanced to invest in both.",
  },
  {
    question: "Where do AI engines find their citations?",
    answer: "AI engines pull citations from six primary source types in 2026. YouTube and branded video transcripts are important AI-citation inputs for how-to, comparison, and best-of queries. Reddit and community forums account for significant share, especially on Perplexity (24 percent of total citations) and Google AI Overviews (around 21 percent). Wikipedia and authoritative reference sites are heavily trusted, with Wikipedia accounting for 47.9 percent of top ChatGPT sources. Review platforms like Trustpilot and G2 yield 3 times more ChatGPT citations for active brands. Original research and frameworks on your own website earn citations when content includes verifiable data. Third-party publications carry the highest authority weight because AI engines trust external mentions 6.5 times more than self-published claims.",
  },
  {
    question: "How do I measure GEO success when AI search produces fewer clicks?",
    answer: "GEO requires four measurement signals because traditional dashboards do not show AI citations directly. Citation frequency: manually test your priority questions across ChatGPT, Claude, Microsoft Copilot, Google AI Mode, and Perplexity at least monthly. Branded search volume: track in Google Search Console and Google Trends, since AI exposure drives brand-name searches even without direct clicks. Direct traffic patterns: AI platforms often pass no referral data, so AI-driven visits show as direct traffic. Conversion rate quality: AI-referred visitors convert at 4.4 times the rate of traditional search visitors per Semrush 2026 data.",
  },
  {
    question: "Should I invest in GEO if I am a small business?",
    answer: "Yes, and small businesses often benefit more from GEO than large ones. Traditional SEO disadvantages small Indian businesses because larger competitors have years of accumulated domain authority and backlinks. AI search resets that advantage by weighting content quality, named expert authorship, third-party citations, and topic-cluster depth more than raw domain age. A small Pune wellness clinic with strong original content, named expert authors, and active third-party publications can realistically be cited by AI alongside national chains. The barrier to entry is lower for GEO than for traditional SEO.",
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
const SLUG = "geo-for-indian-businesses-2026";

async function main() {
  console.log(`\n🔍  Looking up article: ${SLUG}`);
  const doc = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id, title }`,
    { slug: SLUG }
  );
  if (!doc) { console.error(`❌  Article not found`); process.exit(1); }
  console.log(`✅  Found: "${doc.title}" (${doc._id})\n`);

  const body = buildBody();
  console.log(`📝  Body: ${body.length} blocks`);

  const patches = {
    body,
    faq: FAQ.map(f => ({ _type: "object", _key: k("faq"), question: f.question, answer: f.answer })),
    excerpt: "How Indian businesses can earn AI-search citations across ChatGPT, Claude, Copilot, Gemini, Google AI Mode and Perplexity. 90-day GEO playbook.",
    seoTitle: "GEO for Indian Businesses: Get Cited by AI Search in 2026",
    tags: [
      "GEO India",
      "generative engine optimization India",
      "AI search citations",
      "AEO 2026",
      "ChatGPT citations India",
      "GEO vs SEO",
      "AI Mode India",
    ],
  };

  console.log(`\n💾  Patching document…`);
  await client.patch(doc._id).set(patches).commit();
  console.log(`✅  Rewrite complete! ${body.length} blocks, ${FAQ.length} FAQ items.\n`);
  console.log(`🎉  Open in Studio to review:`);
  console.log(`    https://${PROJECT_ID}.sanity.studio/structure/insight;${doc._id}\n`);
}

main().catch(err => { console.error(`\n❌  Fatal:`, err.message); process.exit(1); });
