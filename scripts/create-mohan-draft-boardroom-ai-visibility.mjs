/**
 * create-mohan-draft-boardroom-ai-visibility.mjs
 *
 * Creates "The Boardroom Question: Is Your Brand Visible Inside AI Answers?"
 * (author: Mohan Chute, existing author record) in Sanity as a DRAFT ONLY
 * (not visible on the live site until promoted / published).
 *
 * Source: Docs/Blogs/Mohan/As-per-Purva/02_boardroom_ai_visibility/
 *   - is-your-brand-visible-inside-ai-answers.md   (article content)
 *   - assets/hero-boardroom-ai-visibility-1280x512.png            (cover image)
 *   - assets/framework-boardroom-ai-visibility-scorecard.png      (inline)
 *   - assets/chart-ai-search-behavior.png                         (inline)
 *
 * This script ONLY creates a draft. It does not publish, and it does not
 * delete any existing draft. The post has a future publishedAt value
 * (2026-10-19) that is left untouched; it will be used when the draft is
 * later promoted / published via a separate script.
 *
 * Run: node scripts/create-mohan-draft-boardroom-ai-visibility.mjs
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// ── Load .env.local ────────────────────────────────────────────────────────
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

const ASSET_DIR = path.join(__dirname, "..", "..", "Docs", "Blogs", "Mohan", "As-per-Purva", "02_boardroom_ai_visibility", "assets");

// ── Portable Text helpers (same pattern as publish-mohan-decision-first-ai.mjs) ─
let _k = 0;
let _prefix = "b";
const resetKey = (prefix) => { _k = 0; _prefix = prefix; };
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
const bp = (leadIn, rest) => block("normal", [strong(leadIn), plain(" " + rest)]);
const bullet = (text) => block("normal", [plain(text)], [], "bullet");
const bulletBold = (leadIn, rest) => block("normal", [strong(leadIn), plain(" " + rest)], [], "bullet");
const numbered = (text) => block("normal", [plain(text)], [], "number");
const numberedBold = (leadIn, rest) => block("normal", [strong(leadIn), plain(" " + rest)], [], "number");
const bq = (text) => block("blockquote", [plain(text)]);

// Paragraph with a single inline link plus arbitrary before/after text.
function pLinks(parts) {
  // parts: array of { text } or { text, href }
  const markDefs = [];
  const children = parts.map((part) => {
    if (part.href) {
      const mk = k();
      markDefs.push({ _key: mk, _type: "link", href: part.href });
      return linked(part.text, mk);
    }
    return part.bold ? strong(part.text) : plain(part.text);
  });
  return block("normal", children, markDefs);
}

const linkPara = (before, linkText, href, after = "") => {
  const mk = k();
  return block("normal", [plain(before), linked(linkText, mk), plain(after)], [{ _key: mk, _type: "link", href }]);
};

const bulletLink = (before, linkText, href, after = "") => {
  const mk = k();
  return block("normal", [plain(before), linked(linkText, mk), plain(after)], [{ _key: mk, _type: "link", href }], "bullet");
};

const callout = (title, body, variant = "key-takeaway", items) => {
  const c = { _type: "callout", _key: k(), title, body, variant };
  if (items) c.items = items;
  return c;
};

const comparisonTable = (colA, colB, rows) => ({
  _type: "comparisonTable",
  _key: k(),
  colA, colB,
  rows: rows.map(r => ({ _key: k(), ...r })),
});

const imageBlock = (assetId, alt, caption) => {
  const b = { _type: "image", _key: k(), asset: { _type: "reference", _ref: assetId }, alt };
  if (caption) b.caption = caption;
  return b;
};

// ════════════════════════════════════════════════════════════════════════════
// BLOG: The Boardroom Question: Is Your Brand Visible Inside AI Answers?
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgScorecard, imgChart) {
  resetKey("brd");
  return [
    p("For years, boardrooms have asked a familiar set of digital questions. Are we ranking on Google? Is branded search growing? What is our cost per lead? How much pipeline came from paid media? What is our share of voice against the three competitors we care about?"),
    p("Those questions still matter. One more now belongs beside them:"),
    bq("When a buyer asks an AI system about our category, our problem, our competitors, or the best provider to consider, does our brand appear in the answer at all?"),
    p("That is not a technical SEO question. It is a market visibility question."),

    h2("The short answer"),
    p("AI search visibility is the degree to which your brand, expertise, evidence, products, services, people, and point of view appear accurately inside answers generated by systems such as Google AI Overviews, Google AI Mode, ChatGPT, Perplexity, Gemini, Claude, and Microsoft Copilot."),
    p("The board should care because the discovery journey is changing at scale. Google said in August 2026 that AI Overviews had more than 2.5 billion monthly active users and AI Mode had passed 1 billion monthly users. Pew Research found that, in its March 2025 browsing study, people who encountered a Google AI summary clicked a traditional result in 8% of visits, compared with 15% on pages without an AI summary. Only 1% clicked a source link inside the AI summary itself."),
    p("The implication is not that websites are becoming irrelevant. The implication is that a growing share of evaluation can happen before the website visit."),
    p("If your brand is missing from that layer, you can lose consideration before your analytics system records a session."),

    h2("Visibility used to mean rank. Now it also means inclusion."),
    p("The old mental model was straightforward. A buyer searched. Google returned links. The marketing team fought for a higher position. The buyer clicked. The website persuaded. Sales followed up."),
    p("The new journey can be less linear."),
    p("A CFO asks, \"Which AI consulting firms in India work with mid-market manufacturers and are vendor-neutral?\""),
    p("A CMO asks, \"What should I look for in an agency that combines SEO, AI search visibility, and founder thought leadership?\""),
    p("A COO asks, \"What is a realistic first AI project for a 300-person manufacturing company with fragmented ERP data?\""),
    p("The system may synthesize an answer from several sources, compare approaches, identify risks, name providers, and give the buyer a preliminary shortlist before a conventional results page becomes the centre of attention."),
    p("That changes the unit of competition."),
    p("You are no longer competing only for a ranking position. You are competing to become part of the model's useful answer."),
    p("Google's own guidance makes an important point here. Its generative search features still rely on foundational search systems, including indexing, retrieval, ranking, and quality signals. Google explicitly says SEO remains relevant, and it warns site owners against chasing special GEO tricks instead of building valuable, unique, non-commodity content."),
    p("So the boardroom question is not, \"Should we stop SEO and start GEO?\""),
    p("It is, \"Does our current search and content system give AI experiences enough trustworthy material to understand us, distinguish us, and cite us?\""),

    h2("AI visibility has five levels"),
    p("It helps to define the problem more precisely. A brand can be \"visible\" in very different ways."),

    h3("Level 0: Absent"),
    p("The brand does not appear for important category, problem, comparison, or recommendation prompts. Competitors do."),
    p("This is the clearest risk. The market may know you, but the machine-readable public evidence around you is too thin, inconsistent, generic, or inaccessible for the system to use confidently."),

    h3("Level 1: Discoverable but generic"),
    p("The brand appears only when the user asks for it by name. The system can repeat basic facts from the website, but it does not associate the brand with a broader problem or category."),
    p("This is branded retrieval, not category visibility."),

    h3("Level 2: Category association"),
    p("The brand appears in answers about the category or problem, usually as one option among several. The description is reasonably accurate, but the system does not yet have strong evidence for a distinctive point of view."),

    h3("Level 3: Recommendation or comparison inclusion"),
    p("The brand appears in shortlists, comparisons, \"best fit\" discussions, or provider evaluation answers where the user's intent is commercial."),
    p("At this level, accuracy becomes critical. A wrong service description, outdated location, incorrect pricing assumption, or old positioning can damage consideration even if the brand is technically visible."),

    h3("Level 4: Trusted reference"),
    p("The brand, its people, or its original material is used as evidence. The system cites an article, framework, study, case result, technical guide, author, or expert viewpoint to support an answer."),
    p("This is the strongest form of AI visibility because you are not merely being mentioned. You are helping shape the answer."),
    p("For a B2B company, the difference between Level 1 and Level 4 is strategically large."),

    h2("Why this belongs on the board agenda"),
    p("AI visibility can sound like a marketing channel issue until you trace where it touches commercial decisions."),

    h3("1. It affects whether you enter the consideration set"),
    p("In a conventional funnel, a buyer can discover you through ads, events, referrals, analyst reports, organic search, social media, or outbound sales."),
    p("Generative search adds another route. A buyer can ask for an explanation or recommendation and receive a compressed market map."),
    p("If you are consistently absent, the buyer may never know to search for you by name."),
    p("That is a brand problem, not simply a traffic problem."),

    h3("2. It changes how category narratives are formed"),
    p("Every market has contested questions."),
    p("Should an AI consultant also implement the solution?"),
    p("Is headless architecture justified for a mid-market website?"),
    p("Does a B2B manufacturer need Meta Ads, or only Google Search?"),
    p("Should a founder publish under their own name or keep all content under the corporate brand?"),
    p("If your competitors have extensive, well-cited public material and you do not, AI systems have more evidence from which to reconstruct their point of view than yours."),
    p("Over time, that can influence how the category itself is described."),

    h3("3. It can reduce the visibility of weak measurement"),
    p("This is the uncomfortable part. A zero-click or low-click answer can influence a buyer without sending a referral session."),
    p("Pew's click data illustrates the measurement problem. When AI summaries appeared, outbound clicks were lower, and clicks on the cited AI-summary sources were rare."),
    p("That means a brand can gain influence without gaining a neat referral line in analytics. It can also lose influence without seeing an obvious traffic collapse linked to a single channel."),
    p("Boards should therefore resist two simplistic conclusions:"),
    bullet("\"AI search sends little traffic, so it does not matter.\""),
    bullet("\"Our organic traffic is stable, so our AI visibility must be fine.\""),
    p("Neither statement follows automatically from the data."),

    h3("4. It exposes weaknesses in brand evidence"),
    p("Generative systems are useful stress tests for how clearly a company explains itself in public."),
    p("Ask five AI systems what your company does, who it serves, how it is different, what proof exists, and when a buyer should choose you."),
    p("If the answers are vague or contradictory, the problem often predates AI. The website may be inconsistent. Service names may vary. Case studies may be thin. Author bios may not demonstrate expertise. Third-party references may be missing. Old pages may still outrank new positioning."),
    p("AI visibility work often reveals ordinary brand hygiene problems that were previously easier to ignore."),

    h2("The boardroom AI visibility scorecard"),
    p("A useful board discussion needs more than screenshots of ChatGPT answers. It needs a repeatable measurement model."),
    imageBlock(imgScorecard, "Framework: Boardroom AI visibility scorecard"),
    p("At MagicWorks, I would frame the scorecard around seven questions."),

    h3("1. Query coverage: Are we present for the questions that matter?"),
    p("Build a prompt set around real buyer intent, not vanity queries."),
    p("Include:"),
    bullet("category discovery questions;"),
    bullet("problem-definition questions;"),
    bullet("comparison questions;"),
    bullet("implementation questions;"),
    bullet("pricing and commercial questions;"),
    bullet("risk and due-diligence questions;"),
    bullet("industry-specific questions;"),
    bullet("local or geographic questions;"),
    bullet("brand-specific questions; and"),
    bullet("competitor-alternative questions."),
    p("A manufacturing AI consultancy should not congratulate itself for appearing when someone asks its exact company name. The more valuable test is whether it appears when a COO describes the business problem without naming any provider."),

    h3("2. Mention frequency: How often are we included?"),
    p("Run the same core prompt set across multiple systems and repeat it over time."),
    p("Do not treat one answer as a permanent rank. Generative responses vary by model, freshness, geography, account context, and retrieval path."),
    p("Track the percentage of priority prompts in which the brand appears, and separate branded from non-branded prompts."),

    h3("3. Citation quality: What evidence is being used?"),
    p("A mention supported by your strongest case study is different from a mention pulled from an old directory listing."),
    p("Classify citations by source type:"),
    bullet("your own service pages;"),
    bullet("original research;"),
    bullet("case studies;"),
    bullet("founder or expert articles;"),
    bullet("trusted third-party publications;"),
    bullet("business profiles;"),
    bullet("directories;"),
    bullet("community content;"),
    bullet("review platforms; and"),
    bullet("outdated or low-quality sources."),
    p("The goal is not simply more citations. It is better evidence."),

    h3("4. Accuracy: Is the answer actually right?"),
    p("Track factual accuracy for:"),
    bullet("company name;"),
    bullet("services;"),
    bullet("industries;"),
    bullet("geography;"),
    bullet("positioning;"),
    bullet("people;"),
    bullet("proof points;"),
    bullet("commercial model; and"),
    bullet("claims about outcomes."),
    p("An inaccurate recommendation can be worse than no recommendation because the buyer may reject you for something you never claimed."),

    h3("5. Distinctiveness: Does the answer explain why we are different?"),
    p("If every agency in your category is described as \"data-driven, customer-centric, AI-powered, end-to-end,\" then visibility without distinctiveness has limited strategic value."),
    p("A good test is to remove the company name from the AI-generated description. Could your leadership team still identify the brand?"),
    p("If not, your public positioning may be too generic."),

    h3("6. Source defensibility: Do we have material worth citing?"),
    p("Google's 2026 guidance repeatedly stresses unique, valuable, non-commodity content and first-hand experience."),
    p("That means the content portfolio should include things competitors cannot produce by changing the logo:"),
    bullet("original frameworks;"),
    bullet("real operating lessons;"),
    bullet("anonymised but truthful patterns from client work;"),
    bullet("verified case results;"),
    bullet("decision criteria;"),
    bullet("benchmarks where the methodology is clear;"),
    bullet("founder or specialist opinions grounded in experience;"),
    bullet("product or process comparisons with trade-offs; and"),
    bullet("industry-specific implementation detail."),
    p("This is where content becomes evidence rather than inventory."),

    h3("7. Business movement: Is visibility changing commercial behaviour?"),
    p("AI visibility should eventually connect to business indicators, even if attribution is imperfect."),
    p("Watch for:"),
    bullet("growth in branded search;"),
    bullet("higher direct traffic from relevant markets;"),
    bullet("prospects mentioning ChatGPT, Gemini, Perplexity, AI Mode, or \"online research\" in calls;"),
    bullet("more informed inbound questions;"),
    bullet("improved conversion from high-intent content;"),
    bullet("shorter explanation time in sales conversations;"),
    bullet("higher assisted conversion from thought-leadership pages; and"),
    bullet("stronger win rates where the prospect consumed expert content before the call."),
    p("Google's Search Console now includes dedicated generative AI performance reporting for AI Overviews, AI Mode, and generative features in Discover, rolled out worldwide by August 31, 2026. That is useful because it begins to move AI visibility from anecdote toward measurable search performance, at least inside Google's ecosystem."),

    imageBlock(imgChart, "Chart: AI search scale and click behaviour"),

    h2("Seven reasons a strong brand can still be invisible in AI answers"),

    h3("Reason 1: The content is competent but interchangeable"),
    p("Many B2B websites are full of technically correct content that could have been written by any company in the category."),
    p("\"Digital transformation improves efficiency.\""),
    p("\"AI can streamline operations.\""),
    p("\"SEO helps businesses grow online.\""),
    p("None of this is wrong. None of it gives a retrieval system a compelling reason to associate the idea with your brand."),
    p("Google now describes this kind of material as commodity content and recommends unique, experience-based information that adds something difficult to reproduce."),

    h3("Reason 2: Expertise has no visible owner"),
    p("Anonymous corporate publishing removes context."),
    p("Who formed the opinion? What have they done? Why should the reader trust this judgment? Is the author connected to the company? Do they have a coherent body of work?"),
    p("Named authorship is not a magic ranking switch. It is a clarity mechanism. It helps humans and machines connect ideas to people, experience, and a continuing body of evidence."),

    h3("Reason 3: The brand entity is inconsistent"),
    p("One page says \"AI automation agency.\" Another says \"digital transformation partner.\" A third says \"software company.\" A fourth lists services that no longer exist."),
    p("The company description on LinkedIn differs from the website. Old directories carry an outdated address. Author bios use different job titles. Service names drift across pages."),
    p("A system trying to build a reliable representation of the organisation has to reconcile all of that noise."),

    h3("Reason 4: The best evidence is trapped in sales decks"),
    p("Many companies possess excellent proof that never reaches the public web."),
    p("A proposal contains a clear framework. A sales deck has a useful comparison table. A client report contains a verified before-and-after result. A founder explains a nuanced position brilliantly in private calls."),
    p("If none of this becomes crawlable, attributable, permission-safe public content, AI systems cannot use it as evidence."),

    h3("Reason 5: Third-party corroboration is weak"),
    p("Self-description matters, but independent references matter differently."),
    p("A buyer trusts a company saying \"we are good\" less than a combination of a company explanation, a verified client story, an industry mention, an expert interview, and consistent public references."),
    p("The same logic applies to generative retrieval. You want a coherent web of evidence, not a single site shouting into the void."),

    h3("Reason 6: Technical basics block discovery"),
    p("Generative search does not eliminate crawling, indexing, internal linking, canonicalisation, page experience, or textual accessibility."),
    p("Google is explicit that pages must still be indexed and eligible to appear in Search, and that ordinary SEO foundations remain relevant to generative features."),
    p("If important content is inaccessible, duplicated, buried in scripts, orphaned from internal links, or blocked by infrastructure, no content strategy can compensate fully."),

    h3("Reason 7: The company is optimising for algorithms instead of buyers"),
    p("The fastest way to produce weak GEO content is to ask, \"What format does the AI want?\" before asking, \"What would a serious buyer find genuinely useful?\""),
    p("Google's 2026 guidance is unusually direct on this. There is no special requirement to split every page into artificial chunks, no special Google benefit from llms.txt, and no need to rewrite the web in a machine-only dialect."),
    p("Useful content first. Machine readability follows from clarity."),

    h2("What CEOs and CMOs should ask in the next quarterly review"),
    p("A good board-level AI visibility discussion can fit on one page."),
    p("Ask marketing to bring answers to these ten questions:"),
    numbered("What are the 25 to 50 AI prompts that best represent real buyer questions in our category?"),
    numbered("Across those prompts, how often do we appear without the buyer naming us first?"),
    numbered("Which competitors appear more often than we do?"),
    numbered("What descriptions are AI systems giving about us, and where are they wrong?"),
    numbered("Which pages or third-party sources are most frequently used as evidence?"),
    numbered("Which priority topics have no strong first-party source from us?"),
    numbered("Which claims do we make that have no public proof?"),
    numbered("Are our founder and expert profiles connected clearly to a body of authoritative content?"),
    numbered("What does Google Search Console show for generative AI visibility?"),
    numbered("What will we change in the next 90 days, and how will we know it improved?"),
    p("That is enough to move the conversation from novelty to management discipline."),

    h2("A practical 90-day AI visibility agenda"),

    h3("Days 1 to 15: Establish the baseline"),
    p("Create the priority prompt set and test it across the AI experiences most relevant to your buyers."),
    p("For Indian B2B, that may include Google AI Mode, Google AI Overviews, ChatGPT, Gemini, Microsoft Copilot, Perplexity, and Claude. The exact mix depends on audience and industry."),
    p("Record mention, citation, accuracy, competitor presence, and source type."),
    p("At the same time, audit:"),
    bullet("Search Console generative AI reporting;"),
    bullet("branded search trends;"),
    bullet("crawl/indexation of priority pages;"),
    bullet("service-page consistency;"),
    bullet("author profiles;"),
    bullet("case-study depth;"),
    bullet("structured data accuracy; and"),
    bullet("major third-party profiles."),

    h3("Days 16 to 45: Repair the evidence layer"),
    p("Do not start by publishing 30 new articles."),
    p("Fix the pages that define the company."),
    p("Strengthen service pages with clear fit, scope, trade-offs, process, proof, and buyer questions. Align company descriptions. Update old profiles. Connect author pages. Improve internal links. Publish or strengthen case studies with verified numbers and context."),
    p("Where an important topic is covered only by generic content, replace it with first-hand material."),

    h3("Days 46 to 75: Build citation-worthy assets"),
    p("Create a small number of stronger assets around priority questions."),
    p("Examples:"),
    bullet("an original board-level framework;"),
    bullet("a sector-specific benchmark;"),
    bullet("a transparent pricing guide;"),
    bullet("a decision checklist;"),
    bullet("a comparison based on actual implementation constraints;"),
    bullet("a founder viewpoint that challenges a common assumption; or"),
    bullet("a case study showing situation, intervention, result, and limits."),
    p("These assets should be useful even if AI search did not exist."),

    h3("Days 76 to 90: Expand distribution and measure again"),
    p("Repurpose the strongest ideas into founder posts, presentations, short videos, webinars, partner contributions, and third-party conversations."),
    p("Then rerun the prompt set."),
    p("Look for change in:"),
    bullet("non-branded mentions;"),
    bullet("citation sources;"),
    bullet("accuracy;"),
    bullet("competitor comparison;"),
    bullet("Search Console impressions in generative features; and"),
    bullet("sales feedback."),
    p("The first 90 days are not about declaring victory. They are about establishing a measurement system and improving the evidence AI systems have available."),

    h2("Why this is especially relevant for Indian businesses"),
    p("India is not waiting for a Western search transition to arrive later."),
    p("Google rolled AI Mode out to users in India in July 2025, after an initial Labs experiment, and extended language support over time. By 2026, generative search had become part of mainstream search behaviour, not a niche experiment."),
    p("For Indian B2B companies, three factors make the issue more important."),
    p("First, buyers often research in long, conversational questions rather than clean two-word keywords. That is exactly the type of query generative systems are designed to handle."),
    p("Second, India has highly fragmented category language. The same service can be described differently by founders, procurement teams, functional leaders, agencies, software vendors, and regional markets. Strong entity clarity therefore matters."),
    p("Third, many mid-market Indian companies have deep operating expertise but a thin public evidence layer. The founder knows the category. Sales knows the objections. Delivery knows the trade-offs. The website says, \"We provide innovative end-to-end solutions.\""),
    p("That gap is now more expensive."),

    h2("What not to do"),

    h3("Do not buy a GEO package that promises guaranteed AI rankings"),
    p("Generative answers are not a stable top-ten list. Systems, retrieval methods, prompts, and models change. Any vendor promising a fixed permanent position should be questioned closely."),

    h3("Do not manufacture fake mentions"),
    p("Google's guidance explicitly warns against inauthentic mentions. More importantly, fake authority is fragile. It creates reputational risk and gives you no durable advantage."),

    h3("Do not publish hundreds of thin pages for prompt variants"),
    p("Google warns that scaled content created mainly to manipulate rankings or generative answers can violate spam policies."),
    p("One strong page that genuinely answers an important buyer question is more defensible than 50 near-duplicates."),

    h3("Do not abandon SEO fundamentals"),
    p("AI search still depends on discoverable, indexable, well-structured web content. Technical SEO, internal linking, page experience, and content quality remain the foundation."),

    h3("Do not measure only clicks"),
    p("Clicks matter. They are no longer the whole visibility picture."),

    h2("The boardroom principle"),
    p("A company can be well-known in its own network and still be poorly represented in the answer layer that a growing number of buyers use to understand the market."),
    p("That is why the question belongs above the channel level."),
    bq("If an AI system had to explain our category to a serious buyer today, would our company be absent, mentioned, recommended, or cited as evidence?"),
    p("The answer tells you something important about the strength of your digital brand, not merely your SEO."),
    pLinks([
      { text: "At MagicWorks, we separate the work into two connected disciplines. Our " },
      { text: "SEO/AEO service", href: "/services/digital-marketing/seo-aeo" },
      { text: " covers the technical and on-page foundation, including crawlability, content structure, entity signals, schema, and answer-engine presence. Our " },
      { text: "Thought Leadership & GEO programme", href: "/services/digital-marketing/thought-leadership-geo" },
      { text: " focuses on founder-attributed long-form content built to earn attention and citations around the questions decision-makers actually ask." },
    ]),
    p("The goal is not to game AI systems. It is to make the company's best expertise more discoverable, attributable, useful, and difficult to confuse with everybody else's."),

    h2("Sources"),
    bulletLink("Google, ", "\"New opportunities, control and insights for website owners\"", "https://blog.google/products-and-platforms/products/search/new-controls-website-owners/", ", updated August 31, 2026."),
    bulletLink("Pew Research Center, ", "\"Google users are less likely to click on links when an AI summary appears in the results\"", "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/", ", July 22, 2025."),
    bulletLink("Google Search Central, ", "\"Optimizing your website for generative AI features on Google Search\"", "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide", ", 2026."),
    bulletLink("Google Search Central, ", "\"Introducing Search Generative AI performance reports in Search Console\"", "https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports", ", June 3, 2026, updated August 31, 2026."),
    bulletLink("Google India Blog, ", "\"AI Mode in Google Search Rolling Out in India\"", "https://blog.google/intl/en-in/feed/ai-mode-in-google-search-rolling-out-in-india/", ", July 8, 2025."),
    bulletLink("MagicWorks, ", "Digital Marketing services and SEO/AEO service pages", "/services/digital-marketing", "."),
    bulletLink("Google Search Central, ", "\"Google Search's guidance on using generative AI content on your website\"", "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content", "."),

    callout(
      "Is Your Brand Actually Visible Inside AI Answers?",
      "MagicWorks combines SEO/AEO technical foundations with founder-attributed Thought Leadership & GEO content to help brands appear, get cited, and stay accurate inside AI-generated answers. We can run a prompt-set audit against your category and show you exactly where you stand today.",
      "key-takeaway"
    ),
    linkPara("", "Request an AI Visibility Scorecard", "/services/digital-marketing/seo-aeo", " for your category, or"),
    linkPara("", "book a discovery conversation", "/contact", ". Bring your priority buyer questions and we will show you where your brand is absent, mentioned, recommended, or cited today."),
  ];
}

const FAQ = [
  { question: "What is AI search visibility?", answer: "AI search visibility is the extent to which a brand, its experts, products, services, evidence, and ideas appear accurately in AI-generated answers. It includes brand mentions, recommendation inclusion, citations, accuracy, and topic association across systems such as Google AI Overviews, AI Mode, ChatGPT, Perplexity, Gemini, Claude, and Microsoft Copilot." },
  { question: "Is AI visibility the same as GEO?", answer: "GEO, or Generative Engine Optimization, is one label used for work intended to improve visibility in generative search and answer systems. At MagicWorks, GEO is specifically tied to founder-attributed thought leadership and citation visibility, while AEO covers technical and on-page answer-engine readiness. Google itself treats optimization for its generative Search features as part of SEO rather than a separate set of hacks." },
  { question: "Does ranking number one on Google guarantee visibility in AI answers?", answer: "No. Strong organic visibility is helpful, and Google says its AI features rely on core Search systems, but an AI answer is assembled differently from a conventional ranked results page. Visibility depends on the query, retrieval path, available evidence, source quality, and the system being used." },
  { question: "How do we measure brand visibility in ChatGPT and other AI systems?", answer: "Start with a controlled prompt set representing real buyer questions. Track non-branded mention frequency, citation sources, factual accuracy, competitor inclusion, topic coverage, and changes over time. Add platform-specific data where available, such as Google's generative AI performance reports in Search Console." },
  { question: "Should we create llms.txt for GEO?", answer: "You can create it for services that may use it, but Google says llms.txt does not help or hurt visibility in Google Search and is not required for AI Overviews or AI Mode. It should not distract from crawlability, useful content, entity consistency, and real evidence." },
  { question: "Does AI-generated content hurt AI visibility?", answer: "Using AI tools is not automatically a problem. Google says generative AI can help with research and structure, but scaled pages with little originality or added value can violate spam policies. The standard should be accuracy, usefulness, first-hand value, and clear editorial responsibility." },
  { question: "How long does GEO take?", answer: "There is no universal timetable. Technical corrections can be visible quickly after recrawling. Building authority, third-party corroboration, and a recognisable body of expert content takes longer. A 90-day programme is enough to establish a baseline, repair major gaps, publish priority evidence, and measure early movement, but durable visibility compounds over quarters." },
  { question: "Who should own AI visibility inside a company?", answer: "Marketing usually owns the measurement and publishing system, but the inputs should come from leadership, sales, delivery, product, and subject-matter experts. Because AI visibility touches positioning, evidence, and reputation, it should be reviewed at CMO or business-leader level rather than delegated entirely to an SEO execution team." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "The Boardroom Question: Is Your Brand Visible Inside AI Answers?";
const SLUG = "is-your-brand-visible-inside-ai-answers";
const EXCERPT = "A board-level guide to AI search visibility: what it means, why it matters, how to measure it, and the 90-day actions CEOs and CMOs should ask for.";
const SEO_TITLE = "Is Your Brand Visible Inside AI Answers? | MagicWorks";
if (TITLE.length > 100) throw new Error(`Title too long (${TITLE.length}/100)`);
if (EXCERPT.length > 155) throw new Error(`Excerpt too long (${EXCERPT.length}/155)`);
if (SEO_TITLE.length > 60) throw new Error(`SEO title too long (${SEO_TITLE.length}/60)`);

// ── Author: reuse Mohan Chute if it exists, create only if missing ─────────
async function ensureAuthor() {
  console.log("\n🔍  Checking for author Mohan Chute…");
  const existing = await client.fetch(
    `*[_type == "teamMember" && (slug.current == "mohan-chute" || name == "Mohan Chute")][0]{ _id, name }`
  );
  if (existing) {
    console.log(`✅  Author exists: ${existing.name} (${existing._id})`);
    return existing._id;
  }
  console.log("📝  Creating author Mohan Chute…");
  const created = await client.createIfNotExists({
    _id: "author-mohan-chute",
    _type: "teamMember",
    name: "Mohan Chute",
    slug: { _type: "slug", current: "mohan-chute" },
    role: "Founder, MagicWorks IT Solutions",
    bio: "Founder of MagicWorks IT Solutions, with 17+ years across digital marketing, web strategy, and AI. He writes from inside live client engagements, not theory.",
    linkedin: "https://www.linkedin.com/in/mohanchute/",
    isFounder: true,
    order: 1,
  });
  console.log(`✅  Created: ${created._id}`);
  return created._id;
}

async function uploadImage(filename) {
  const imgPath = path.join(ASSET_DIR, filename);
  if (!fs.existsSync(imgPath)) throw new Error(`Missing image: ${imgPath}`);
  console.log(`📤  Uploading ${filename}…`);
  const asset = await client.assets.upload("image", fs.createReadStream(imgPath), {
    filename,
    contentType: "image/png",
  });
  console.log(`✅  Uploaded: ${asset._id}`);
  return asset._id;
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  const authorId = await ensureAuthor();

  const existing = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id }`,
    { slug: SLUG }
  );
  if (existing) {
    console.log(`⏭️   Post already exists (${existing._id}), skipping.`);
    return;
  }

  const heroId = await uploadImage("hero-boardroom-ai-visibility-1280x512.png");
  const scorecardId = await uploadImage("framework-boardroom-ai-visibility-scorecard.png");
  const chartId = await uploadImage("chart-ai-search-behavior.png");

  const doc = {
    _id: "drafts.insight-mohan-boardroom-ai-visibility",
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["seo-aeo"],
    pillar: "digital-marketing",
    publishedAt: "2026-10-19T03:30:00.000Z",
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "Boardroom leaders reviewing AI answer visibility across digital sources",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "generative engine optimization",
      "ai visibility",
      "geo agency",
      "ai search visibility",
      "brand visibility ai answers",
      "generative search",
    ],
    body: buildBody(scorecardId, chartId),
    faq: FAQ.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
  };

  console.log("💾  Creating DRAFT document…");
  const created = await client.create(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    NOTE: this is a DRAFT; it is not live on the site until published.`);
  console.log(`    Studio review: https://${PROJECT_ID}.sanity.studio/structure/insight;insight-mohan-boardroom-ai-visibility`);

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
