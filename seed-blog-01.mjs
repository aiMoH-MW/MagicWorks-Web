/**
 * seed-blog-01.mjs
 * Creates Blog 01 "How AI Search Is Changing SEO: A Practical Guide to Answer Engine Optimisation"
 * in Sanity CMS and uploads the cover image.
 *
 * Run from the project root:
 *   node seed-blog-01.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Parse .env.local manually ─────────────────────────────────────────────────
const envRaw = fs.readFileSync(path.join(__dirname, ".env.local"), "utf8");
const env = Object.fromEntries(
  envRaw.split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-06-03",
  token:     env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
});

// ── Portable Text helpers ──────────────────────────────────────────────────────
let _k = 0;
const k  = () => `b01k${String(++_k).padStart(3, "0")}`;

const span   = (text, marks = []) => ({ _type: "span", _key: k(), text, marks });
const strong = (text) => span(text, ["strong"]);
const linked = (text, markKey) => span(text, [markKey]);
const plain  = (text) => span(text);

function block(style, children, markDefs = [], listItem = null) {
  const b = { _type: "block", _key: k(), style, markDefs, children };
  if (listItem !== null) { b.listItem = listItem; b.level = 1; }
  return b;
}

const h2 = (text) => block("h2", [plain(text)]);
const h3 = (text) => block("h3", [plain(text)]);
const p  = (text) => block("normal", [plain(text)]);

const callout = (title, body, variant = "key-takeaway") =>
  ({ _type: "callout", _key: k(), title, body, variant });

// ── Body blocks ────────────────────────────────────────────────────────────────
const body = [

  // Opening callout
  callout(
    "Key Takeaway",
    "Answer Engine Optimisation, often shortened to AEO, is the practice of structuring content so AI systems like ChatGPT, Copilot, Perplexity, and Google AI Overviews cite it when answering user questions. It builds on SEO but changes the unit of success. Rankings win clicks. Citations win trust."
  ),

  // Intro
  p("Ask yourself a simple question. When was the last time you clicked through ten blue links to answer something?"),
  p("Chances are, you asked ChatGPT. Or Perplexity. Or you read the AI Overview at the top of Google and never scrolled further. Your customers are doing the same thing. That shift has a name, and it has a discipline built around it: Answer Engine Optimisation."),
  p("This guide explains what Answer Engine Optimisation is, how it differs from the SEO you already know, and what to actually do about it. No hype, no doom. Just the mechanics."),

  // ── Section 1 ─────────────────────────────────────────────────────────────
  h2("What is Answer Engine Optimisation?"),
  p("Answer Engine Optimisation is the practice of structuring your content so that AI-powered answer engines can find it, understand it, trust it, and cite it when they respond to a user's question."),
  p("An answer engine is any system that responds to a query with a direct answer instead of a list of links. That includes ChatGPT, Microsoft Copilot, Perplexity, Google's AI Overviews and AI Mode, and voice assistants. When one of these systems answers a question about your industry, it draws on sources. Answer Engine Optimisation is the work of becoming one of those sources."),
  p("The goal is a citation, not a click. When an AI assistant names your brand or links your page as the source of its answer, you earn visibility at the exact moment a buyer is forming an opinion. That moment used to belong to position one on Google. Increasingly, it belongs to whoever the answer engine trusts."),
  p("Remember the line, because everything in this guide flows from it. Rankings win clicks. Citations win trust."),

  // ── Section 2 ─────────────────────────────────────────────────────────────
  h2("Why this matters now, not in five years"),
  p("Three things changed between 2023 and 2026."),

  block("normal", [
    plain("First, AI answers moved from novelty to default. Google now shows AI Overviews on a large share of informational queries, which means users often get their answer before they reach any organic listing. Google's own "),
    linked("Search Central documentation on AI features", "gscLink"),
    plain(" confirms that the same crawling and quality signals feed these surfaces, which is exactly why the work described below pays off twice."),
  ], [{ _key: "gscLink", _type: "link", href: "https://developers.google.com/search/docs/appearance/ai-features" }]),

  p("Second, standalone assistants became research tools. Buyers ask Perplexity or ChatGPT to compare vendors, summarise options, and recommend next steps."),
  p("Third, the behaviour became habitual. Once someone learns to ask instead of search, they rarely go back."),
  p("The practical consequence is blunt. A page can rank well on Google and still be invisible in the conversations where decisions are actually being made. Ranking and being cited are related, but they are not the same thing."),

  // Case study paragraph with two links
  block("normal", [
    plain("We see this in our own client work. "),
    linked("The Holistic Care", "thcLink"),
    plain(", a Pune-based wellness and mindfulness education platform we work with, earns AI citations across more than 100 countries, including 118,200+ confirmed Bing and Copilot citations verified through Microsoft Bing Webmaster Tools, with an average of 25 of its pages cited per query session. Its traditional rankings did not predict that outcome. The structure of its content did. The full case study, methodology included, is in our "),
    linked("Work section", "csLink"),
    plain("."),
  ], [
    { _key: "thcLink", _type: "link", href: "https://theholisticcare.com" },
    { _key: "csLink",  _type: "link", href: "/work/the-holistic-care" },
  ]),

  // ── Section 3 ─────────────────────────────────────────────────────────────
  h2("The Citation Signals framework: how answer engines choose what to cite"),
  p("Nobody outside the AI labs knows the exact algorithmic weighting. But after tracking citation behaviour across platforms in our client work, we see the same five signals decide who gets cited. We call this the Citation Signals framework, and every recommendation in this guide maps back to one of the five."),

  h3("Signal 1: Direct, extractable answers"),
  p("Answer engines favour content that answers a question cleanly in the first sentence or two of a section, then elaborates. If your page buries the answer under 400 words of preamble, the engine has to work harder to extract it, and it usually picks a competitor who made the job easier."),
  p("Test your own pages against this. Open your most important service page and find the first sentence that a stranger could quote as a complete answer to a buyer question. If you have to scroll to find it, so does the engine."),

  h3("Signal 2: Clear structure"),
  p("Headings that mirror real questions, short paragraphs, lists where lists make sense, and one idea per section. AI systems parse structure the way humans skim it. A wall of text is as unhelpful to a language model as it is to a reader on a phone."),

  h3("Signal 3: Entity clarity"),
  p("The engine needs to know exactly who you are, what you do, where you operate, and how you relate to your topic. Consistent naming across your site, an unambiguous About page, organisation schema, and named author attribution all feed this. Vague brands get skipped because the engine cannot confidently vouch for them."),
  p("Entity clarity is also where individual expertise matters. Content attributed to a named person with verifiable credentials carries more weight than content attributed to nobody. Engines are learning to trust people, not just domains."),

  h3("Signal 4: Demonstrated expertise"),
  p("First-hand data, specific numbers, named methodology, and original analysis get cited. Recycled generic advice does not, because the engine already has a thousand versions of it. The bar is simple: does your page contain something the model could not have written without you?"),

  h3("Signal 5: Corroboration across the web"),
  p("Answer engines cross-reference. A claim that appears only on your site is weaker than one echoed in your LinkedIn content, industry publications, and third-party mentions. This is why a content programme beats a content page."),

  // ── Section 4 ─────────────────────────────────────────────────────────────
  h2("SEO vs Answer Engine Optimisation: what carries over and what changes"),
  p("Here is the good news. If your SEO fundamentals are strong, you are not starting from zero. Roughly speaking:"),

  block("normal", [
    strong("What carries over directly: "),
    plain("technical health (crawlability, speed, mobile performance), quality backlinks, topical authority built over time, and honest, well-researched content. Answer engines still crawl the same web Google does. Bing's index, in particular, matters more than it has in a decade, because Copilot and ChatGPT lean on it."),
  ]),
  block("normal", [
    strong("What changes: "),
    plain("the unit of optimisation. SEO optimises pages to rank for keywords. Answer Engine Optimisation optimises passages to answer questions. A single page might contain eight citable passages or none, regardless of where it ranks."),
  ]),
  block("normal", [
    strong("What gets demoted: "),
    plain("keyword-stuffed content written for crawlers, thin pages that exist only to capture a search term, and content that hedges every statement to avoid committing to an answer. Answer engines want an answer. Content that refuses to give one gets ignored."),
  ]),
  block("normal", [
    strong("What gets promoted: "),
    plain("the question-first article, the transparent methodology, the specific number, the named point of view. In other words, the content a genuine expert would write anyway."),
  ]),

  // ── Section 5 ─────────────────────────────────────────────────────────────
  h2("Where most businesses get this wrong"),
  p("Before the checklist, three failure patterns we see repeatedly in audits, so you can skip them."),

  block("normal", [
    strong("The rewrite trap. "),
    plain("Teams take existing pages and lightly rephrase headings as questions without changing the substance underneath. The heading promises an answer the section never delivers. Engines notice the mismatch, and so do readers."),
  ]),
  block("normal", [
    strong("The tool trap. "),
    plain("A wave of software now promises \"AI visibility\" scores and one-click optimisation. Tools can help you monitor, but no tool can manufacture Signal 4. If your content contains nothing original, no amount of technical polish makes it citable."),
  ]),
  block("normal", [
    strong("The abandonment trap. "),
    plain("A company optimises five pages, checks Copilot three weeks later, sees nothing, and concludes it does not work. Citation share builds the way topical authority always has, through consistent output over months. The businesses winning citations today started before they could measure the reward."),
  ]),

  // ── Section 6: Checklist ──────────────────────────────────────────────────
  h2("A practical Answer Engine Optimisation checklist"),
  p("Work through these in order. The early items cost little and compound. Each one maps to a signal from the framework above."),

  block("normal", [
    strong("Rewrite your headings as questions your buyers actually ask. "),
    plain("Not \"Our Approach to Lead Generation\" but \"How long does it take to see results from Google Ads?\" Then answer that question in the first two sentences below the heading. (Signals 1 and 2)"),
  ], [], "number"),

  block("normal", [
    strong("Add a direct-answer summary to your key pages. "),
    plain("A two to three sentence definition or answer near the top of the page, written so it could stand alone if quoted. This is the passage engines lift. You are reading an example of it at the top of this article. (Signal 1)"),
  ], [], "number"),

  block("normal", [
    strong("Implement structured data. "),
    plain("Organisation schema site-wide, FAQPage schema on question-heavy pages, Article schema with a named human author on your blog. The full vocabulary is documented at "),
    linked("schema.org", "schemaLink"),
    plain(". Schema does not guarantee citations, but it removes ambiguity about who you are and what the page covers. (Signal 3)"),
  ], [{ _key: "schemaLink", _type: "link", href: "https://schema.org" }], "number"),

  block("normal", [
    span("Verify your site in ", ["strong"]),
    span("Bing Webmaster Tools", ["strong", "bingLink"]),
    plain(". Bing powers Copilot and feeds ChatGPT's browsing. It is also the only major platform that currently shows you citation-level data. If you do nothing else this month, do this. (Measurement for every signal)"),
  ], [{ _key: "bingLink", _type: "link", href: "https://www.bing.com/webmasters" }], "number"),

  block("normal", [
    strong("Publish original data and methodology. "),
    plain("Even one honest, well-documented case study or benchmark gives engines something citable that exists nowhere else. Show your working. Engines reward transparency because it is easier to verify. (Signal 4)"),
  ], [], "number"),

  block("normal", [
    strong("Fix entity consistency. "),
    plain("Same legal name, same brand name, same service names, everywhere. If your website, LinkedIn, and directory listings describe you three different ways, you are asking the engine to guess. (Signal 3)"),
  ], [], "number"),

  block("normal", [
    strong("Put a named expert behind your content. "),
    plain("Real author pages, real credentials, consistent bylines that match your LinkedIn presence. Anonymous corporate content is the easiest content for an engine to ignore. (Signals 3 and 4)"),
  ], [], "number"),

  block("normal", [
    strong("Answer the follow-up questions too. "),
    plain("Users ask engines chains of questions. Content that anticipates the second and third question in a buying journey gets cited across the whole conversation, not just the opening query. (Signal 1)"),
  ], [], "number"),

  block("normal", [
    strong("Keep publishing. "),
    plain("Citation share builds through consistent, quality output over months. One optimised page is a start. A programme is a strategy. (Signal 5)"),
  ], [], "number"),

  // ── Section 7 ─────────────────────────────────────────────────────────────
  h2("How do you know it is working?"),
  p("Measurement is the honest gap in most Answer Engine Optimisation advice, so let us be direct about what you can and cannot see."),
  p("You can see Bing and Copilot citations directly in Microsoft Bing Webmaster Tools, which reports how often your pages are cited in Copilot answers. You can see referral traffic from ChatGPT, Perplexity, and Gemini in your analytics if you segment by source. You can run structured spot checks, asking the major engines your key buyer questions monthly and logging whether you appear."),
  p("You cannot see a complete cross-platform citation count, because most platforms do not report it. Any total figure is an extrapolation, and anyone quoting one should show the methodology behind it. We publish ours when we report client results, and we would encourage you to demand the same from any agency showing you AI visibility numbers."),
  p("We will cover the full measurement workflow, step by step, in a dedicated guide on this blog."),

  // ── Section 8 ─────────────────────────────────────────────────────────────
  h2("What this means for your business"),
  p("If you sell to buyers who research before they buy, and almost everyone now does, part of that research is happening inside AI assistants where your rankings do not reach. Rankings win clicks. Citations win trust. You now need both."),
  p("The response is not panic and it is not a new bag of tricks. It is a return to the thing search engines wanted all along: content that genuinely answers questions, backed by real expertise, structured so a machine and a human can both follow it. The businesses winning AI citations in 2026 are mostly the ones who committed to that standard before it was fashionable."),
  p("Start with the checklist above. Verify Bing Webmaster Tools this week. Rewrite one key page with question-first headings this month. Then measure, and let the data tell you where to go deeper."),

  // Author bio
  block("normal", [
    strong("About the author: "),
    plain("Swapnil Ughade is the Founder of MagicWorks IT Solutions Pvt. Ltd., an AI-first digital marketing agency based in Pune, India. He brings 17+ years of experience across digital marketing, web development, and AI strategy, and leads the agency's Search & Answer Engine Optimisation practice."),
  ]),
];

// ── FAQ ────────────────────────────────────────────────────────────────────────
const faq = [
  {
    _key: k(),
    question: "What is the difference between SEO and Answer Engine Optimisation?",
    answer: "SEO optimises pages to rank in search engine results so users click through to your site. Answer Engine Optimisation structures content so AI systems like ChatGPT, Copilot, and Perplexity cite it when answering user questions directly. The fundamentals overlap, but the unit of success differs: SEO earns clicks, Answer Engine Optimisation earns citations.",
  },
  {
    _key: k(),
    question: "Does Answer Engine Optimisation replace SEO?",
    answer: "No. Answer engines crawl and rank the same web that search engines do, so strong SEO remains the foundation. Answer Engine Optimisation is an additional layer of structure and clarity on top of it. Businesses need both, delivered as one discipline rather than two competing projects.",
  },
  {
    _key: k(),
    question: "How long does it take to get cited by AI search engines?",
    answer: "There is no fixed timeline, and any guarantee should make you suspicious. In our experience, well-structured content on a technically healthy site can begin appearing in AI citations within a few months, with citation share compounding as the content programme continues. Consistency matters more than any single optimisation.",
  },
  {
    _key: k(),
    question: "Which AI platforms should Indian businesses optimise for first?",
    answer: "Start with Google AI Overviews, since Google remains the dominant discovery layer in India, and Microsoft Copilot via Bing, because Bing Webmaster Tools is currently the only platform giving you direct citation data. ChatGPT and Perplexity follow, and content optimised for the first two typically performs on all four.",
  },
  {
    _key: k(),
    question: "Can you measure AI citations accurately?",
    answer: "Partially. Bing Webmaster Tools reports Copilot citations directly, and analytics tools show referral traffic from AI platforms. Total cross-platform citation figures are extrapolations, so always ask for the methodology behind any number an agency shows you.",
  },
];

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  // 1. Upload cover image
  const imagePath = path.join(
    __dirname,
    "..",
    "Docs",
    "Blogs",
    "New blogs",
    "blog-01-ai-search-answer-engine-optimisation.png"
  );

  console.log("Uploading cover image...");
  const imageBuffer = fs.readFileSync(imagePath);
  const asset = await client.assets.upload("image", imageBuffer, {
    filename: "blog-01-ai-search-answer-engine-optimisation.png",
    contentType: "image/png",
  });
  console.log("Image uploaded:", asset._id);

  // 2. Build document
  const doc = {
    _id:   "insight-aeo-guide-2026",
    _type: "insight",

    title:       "How AI Search Is Changing SEO: A Practical Guide to Answer Engine Optimisation",
    seoTitle:    "AI Search Is Changing SEO: Answer Engine Optimisation Guide",
    slug:        { _type: "slug", current: "ai-search-answer-engine-optimisation-guide" },
    excerpt:     "AI assistants answer questions before users see search results. Learn how Answer Engine Optimisation works and how to make your content citable.",
    publishedAt: "2026-07-09T09:00:00.000Z",

    author:     { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories: ["digital-marketing", "seo-aeo"],
    pillar:     "digital-marketing",
    tags:       ["answer engine optimisation", "AEO", "AI search optimisation", "AI citations", "SEO for AI search"],

    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: "Answer Engine Optimisation: how AI search is changing SEO",
    },

    body,
    faq,
    isGated: false,
  };

  // 3. Create in Sanity (createOrReplace for idempotency)
  console.log("Creating Sanity document...");
  const result = await client.createOrReplace(doc);
  console.log("Done! Document ID:", result._id);
  console.log("URL: https://magicworksitsolutions.com/blog/ai-search-answer-engine-optimisation-guide");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
