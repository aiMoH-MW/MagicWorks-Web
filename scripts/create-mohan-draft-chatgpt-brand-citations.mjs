/**
 * create-mohan-draft-chatgpt-brand-citations.mjs
 *
 * Creates "Why Some Brands Get Quoted by ChatGPT and Others Don't" (author:
 * Mohan Chute, existing author record) in Sanity as a DRAFT ONLY (not visible
 * on the live site until promoted / published).
 *
 * Source: Docs/Blogs/Mohan/As-per-Purva/04_chatgpt_brand_citations/
 *   - why-some-brands-get-quoted-by-chatgpt.md   (article content)
 *   - README-PUBLISHING.md                        (SEO / AEO metadata notes)
 *   - assets/hero-why-brands-get-quoted-chatgpt-1280x512.png  (cover image)
 *   - assets/framework-ai-visibility-chain.png                (inline)
 *   - assets/framework-citation-vs-mention.png                (inline)
 *
 * This script ONLY creates a draft. It does not publish, and it does not
 * delete any existing draft. The post has a future publishedAt value
 * (2026-11-02) that is left untouched — it will be used when the draft is
 * later promoted / published via a separate script.
 *
 * Run: node scripts/create-mohan-draft-chatgpt-brand-citations.mjs
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

const ASSET_DIR = path.join(__dirname, "..", "..", "Docs", "Blogs", "Mohan", "As-per-Purva", "04_chatgpt_brand_citations", "assets");

// ── Portable Text helpers (same pattern as create-mohan-draft-marketplace-cold-start.mjs) ─
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
// BLOG: Why Some Brands Get Quoted by ChatGPT and Others Don't
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgVisibilityChain, imgCitationMatrix) {
  resetKey("cgp");
  return [
    p("A CEO asks ChatGPT for the best partners in a category. Three brands appear. Yours does not."),
    p("A CMO asks a broader question about the problem your company solves. ChatGPT cites an article from a competitor, a trade publication, a YouTube video, and a community discussion. Your website may rank well in Google, yet your brand is absent from the answer."),
    p("The natural reaction is to ask a familiar question: \"What do we need to rank in ChatGPT?\""),
    p("That question is understandable, but it is slightly wrong."),
    p("ChatGPT Search does not expose a simple public ranking formula comparable to a traditional search engine position. OpenAI says ChatGPT can search the web for current information, may rewrite a user's request into one or more targeted searches, and may show citations to relevant sources. OpenAI also states that there is no way to guarantee top placement. For a site to be available to ChatGPT Search, OAI-Searchbot needs to be allowed to crawl it."),
    p("For a business leader, the practical question is therefore not \"How do I get position one in ChatGPT?\""),
    p("It is this:"),
    bq("When an AI system has to answer a buyer's question about our category, does the public web give it enough clear, credible, specific evidence to confidently find us, understand us, trust us, use us as a source, and name us in the answer?"),
    p("That is the C-suite version of Generative Engine Optimization, or GEO."),

    h2("The short answer"),
    p("Some brands get quoted or mentioned by ChatGPT more often because they have a stronger combination of five things:"),
    numberedBold("They are findable.", "Their important pages can be crawled, indexed, retrieved, and understood technically."),
    numberedBold("They are clear.", "The web consistently explains who they are, what they do, where they operate, and which problems they are known for."),
    numberedBold("They have evidence.", "Their content contains facts, examples, frameworks, comparisons, original observations, named expertise, and current information that can help answer a specific question."),
    numberedBold("Other sources corroborate them.", "Their brand and expertise appear beyond their own website through publications, communities, videos, partners, directories, reviews, and other credible third-party contexts."),
    numberedBold("They are relevant to the exact question.", "AI systems often retrieve around a topic through multiple sub-questions, not just one keyword. A page can rank well for a broad term and still be a poor source for the specific answer being assembled."),
    p("None of those factors guarantees a citation. Together, they improve the probability that your brand is considered when an AI answer is built."),

    h2("First, separate three ideas that executives often collapse into one"),
    p("The phrase \"AI visibility\" is being used so loosely that boardroom conversations can become misleading. Three different outcomes need to be separated."),
    h3("1. A citation"),
    p("A citation means the AI answer uses a page or domain as a visible source. The user may see a link, source card, footnote, or citation marker depending on the product and interface."),
    h3("2. A brand mention"),
    p("A brand mention means your company name appears inside the generated answer. You can be mentioned without receiving a link."),
    h3("3. A recommendation"),
    p("A recommendation is stronger. The AI does not merely use your content or mention your company. It presents your brand as an option, example, provider, product, or choice relevant to the user's decision."),
    p("Those outcomes are not interchangeable."),
    p("Semrush's June 2026 research is useful because it quantifies the gap. Across 3,981 domain appearances from 115 prompts, 14 countries, and four AI search environments, 61.7% of citation appearances were what the researchers call \"ghost citations\": the domain was cited, but the brand name was not stated in the answer. The study also found very different behavior by engine. In its dataset, ChatGPT had a high citation rate for brand appearances but a much lower explicit mention rate."),
    p("For a CMO, that means a report saying \"we earned 500 AI citations\" may still be incomplete. If the buyer never sees the brand name, the marketing value is different from being directly named."),

    imageBlock(imgCitationMatrix, "Citation vs mention matrix: Four outcomes showing why a source citation and explicit brand mention must be tracked separately"),

    comparisonTable("Mentioned by name", "Not mentioned by name", [
      { metric: "Cited (source shown)", a: "Strongest outcome: the answer links to your page and states your brand name. Buyers see both the source and the company behind it.", b: "Ghost citation: your page or domain is used as a source, but your brand name never appears in the answer. Semrush found 61.7% of citation appearances fell into this category." },
      { metric: "Not cited (no source shown)", a: "Your brand is named from the model's broader knowledge or other corroborating sources, without a visible link back to your page.", b: "No visibility for this question: the answer neither links to your page nor names your brand." },
    ]),

    h2("How ChatGPT gets from a buyer's question to a source"),
    p("You do not need to understand model architecture to make good business decisions here. A simple mental model is enough."),
    p("Imagine a buyer asks:"),
    block("normal", [strong("\"Which digital marketing agencies in India understand both performance marketing and AI search visibility for B2B companies?\"")]),
    p("The system may not treat that as one static keyword. It can break the request into related information needs:"),
    bullet("digital marketing agencies in India;"),
    bullet("B2B performance marketing expertise;"),
    bullet("AI search, AEO, or GEO capability;"),
    bullet("evidence of relevant client work;"),
    bullet("location or market relevance;"),
    bullet("founder or leadership expertise;"),
    bullet("recent content about AI search;"),
    bullet("third-party confirmation that the agency exists and does what it claims."),
    p("OpenAI's current Search documentation says ChatGPT may rewrite a question into one or more targeted queries when using web search. Ahrefs has studied a related concept it calls fan-out queries, where an AI system retrieves around the original question using semantically related sub-questions."),
    p("That creates an important executive insight:"),
    bq("Your brand does not need to win one keyword. It needs to survive a chain of retrieval and trust decisions across the topic."),
    p("This is why a single page titled \"Best GEO Agency\" is not a serious GEO strategy."),

    h2("Ranking on Google helps, but it is not the same as being cited by ChatGPT"),
    p("Traditional SEO remains important. Strong crawlability, authority, content quality, internal linking, page performance, and topical depth all contribute to a healthier information footprint."),
    p("But multiple studies show that AI citation selection does not simply copy Google's top ten."),
    p("Ahrefs compared ChatGPT citations with Google rankings and reported that only 10% of ChatGPT's short-tail results matched Google's top ten for the same terms in one study. In another fan-out analysis, the overlap with Google's top ten was only 6.82%."),
    block("normal", [plain("This does not mean SEO is irrelevant. It means "), strong("page rank is only one input into a larger selection process"), plain(".")]),
    p("Ahrefs also analyzed ChatGPT's top 1,000 cited pages in September 2025. It found that 28% of those pages had no organic search visibility, while the pages that did rank tended to come from very authoritative domains, with a median Domain Rating of 90 in Ahrefs' own metric."),
    p("The lesson is not \"forget Google.\" The lesson is \"do not assume Google position equals AI citation position.\""),
    p("Google's own 2026 guidance reaches a similar conclusion from the other side. For Google's AI features, the company says the same foundational SEO practices remain relevant and there are no special technical requirements beyond normal eligibility for Search. Its new AI optimization guide emphasizes unique, non-commodity content and useful experiences rather than a separate bag of GEO tricks."),
    p("For a C-suite team, the sensible position is straightforward:"),
    block("normal", [strong("SEO is the foundation. GEO is the broader visibility system built on top of that foundation.")]),

    h2("The five-layer AI visibility chain"),
    p("MagicWorks uses a simple chain to explain why a brand can be strong in one area and still disappear from AI answers."),

    imageBlock(imgVisibilityChain, "Five-layer framework: Find, Understand, Trust, Quote, Remember as the C-suite AI visibility chain"),

    h3("Layer 1: Find - Can the system access you?"),
    p("Before the AI can quote you, its retrieval systems need some way to discover and access relevant information."),
    p("At the most basic level, this means:"),
    bullet("your important pages are crawlable;"),
    bullet("your robots rules are intentional;"),
    bullet("the site is technically stable;"),
    bullet("pages have indexable text, not only visual content;"),
    bullet("canonical tags are sensible;"),
    bullet("important content is not hidden behind scripts that fail to render;"),
    bullet("your sitemap and internal links help discovery;"),
    bullet("you are not accidentally blocking relevant AI search crawlers."),
    p("OpenAI specifically says sites that want to be available in ChatGPT Search should allow OAI-Searchbot and permit traffic from OpenAI's published IP ranges."),
    p("This is not a magic ranking lever. It is an eligibility issue."),
    p("A company can have the best point of view in its industry and still be invisible if the information cannot be retrieved reliably."),

    h3("Layer 2: Understand - Can the system tell what your brand actually is?"),
    p("This is where brand strategy and technical SEO meet."),
    p("If your website says you are a \"digital transformation partner,\" your LinkedIn page says \"AI marketing agency,\" your press mentions describe you as a \"web development company,\" and your directory listings still use a five-year-old description, a machine has to reconcile inconsistent signals."),
    p("Humans can tolerate ambiguity. Retrieval systems prefer clarity."),
    p("A strong entity footprint answers the same basic questions consistently across the web:"),
    bullet("What is the exact brand name?"),
    bullet("What category does the business belong to?"),
    bullet("Which services are core rather than incidental?"),
    bullet("Which industries or customer types are relevant?"),
    bullet("Where does the company operate?"),
    bullet("Who are the named experts behind important claims?"),
    bullet("What makes this company meaningfully different from ten similar companies?"),
    p("This is why positioning has become an AI search issue, not only a brand workshop issue."),
    p("Semrush's 2026 analysis of brand positioning argues that AI systems form an understanding of a company from repeated patterns across websites, media, reviews, social content, and community discussion. The practical implication is that vague positioning creates retrieval ambiguity."),
    p("For the C-suite, the test is simple: ask five independent people to describe your company in one sentence after reading five different public sources. If you get five materially different answers, a machine may face the same problem."),

    h3("Layer 3: Trust - Is there enough evidence to rely on you?"),
    p("The web is full of companies describing themselves as \"leading,\" \"innovative,\" \"trusted,\" and \"award-winning.\" Those words are cheap."),
    p("AI answers are more useful when they can lean on specific, checkable evidence."),
    p("Trust can be strengthened by content that includes:"),
    bullet("original research;"),
    bullet("transparent methodology;"),
    bullet("named authors with relevant credentials;"),
    bullet("case studies with verifiable scope and outcomes;"),
    bullet("client examples that do not exaggerate causality;"),
    bullet("detailed comparisons with trade-offs;"),
    bullet("current statistics linked to primary or credible sources;"),
    bullet("public product documentation;"),
    bullet("industry-specific expertise;"),
    bullet("clear dates and update histories;"),
    bullet("third-party reviews and commentary;"),
    bullet("expert quotes and media references."),
    p("Ahrefs' 2025 study of 75,000 brands found that branded web mentions correlated much more strongly with AI visibility than simple content volume. It also found almost no relationship between the number of pages on a site and AI visibility."),
    p("That is strategically important."),
    p("A company publishing 300 generic articles may build a larger website without building a stronger reputation. A company publishing 20 excellent pieces, backed by original data and reinforced by external mentions, may create a much clearer evidence trail."),
    block("normal", [plain("Correlation is not causation, and Ahrefs states that caveat clearly. But the pattern aligns with a common-sense business principle: "), strong("reputation is built by what others can verify, not by how many times you repeat your own claim.")]),

    h3("Layer 4: Quote - Does your content contain useful answer units?"),
    p("Even a trusted brand can publish content that is difficult to use inside an AI answer."),
    p("Consider two paragraphs."),
    p("The first says:"),
    p("\"We help companies unlock transformative digital growth with innovative solutions tailored to the modern business landscape.\""),
    p("The second says:"),
    p("\"For a mid-market B2B company, an AI process audit should begin with one or two named workflows, baseline cycle time and cost, the people who run the work, the systems and data they depend on, and a defined decision at the end: automate, redesign, buy, build, or stop.\""),
    p("The second paragraph is far more citable because it contains an answer."),
    p("Citable content tends to have several qualities:"),
    bullet("it answers a specific question early;"),
    bullet("it uses concrete nouns rather than vague claims;"),
    bullet("it names conditions and trade-offs;"),
    bullet("it includes statistics with sources;"),
    bullet("it explains how something works;"),
    bullet("it gives a framework, checklist, table, sequence, definition, or comparison;"),
    bullet("it distinguishes fact from opinion;"),
    bullet("it includes enough context to be useful if extracted from the full page."),
    p("Ahrefs' 2026 research on retrieval-augmented generation found that cited pages tended to align semantically with the related queries an AI system used during retrieval. Specialized pages that went deep on one angle could outperform generic pages for that specific angle."),
    p("This is where strong editorial thinking becomes a search advantage."),
    block("normal", [plain("The content does not need to sound like a robot. It needs to contain "), strong("clean units of human expertise"), plain(" that a machine can retrieve without stripping away essential meaning.")]),

    h3("Layer 5: Remember - Does the answer actually name your brand?"),
    p("This is the layer most AI visibility dashboards underplay."),
    p("If an AI answer cites your article as source number six but recommends three competitors by name, who won the commercial moment?"),
    p("Probably not you."),
    p("The distinction between citations and mentions matters because buyers remember names, not source-count totals."),
    p("Semrush's ghost-citation study found that informational content was more likely to earn citations without necessarily generating explicit brand mentions, while comparative content generated materially more brand mentions in its dataset."),
    p("That suggests a balanced content portfolio is necessary."),
    p("A brand needs:"),
    bullet("educational content that earns source authority;"),
    bullet("comparison content that puts the brand into a decision set;"),
    bullet("case studies that connect capability to proof;"),
    bullet("category pages that clearly state what the company does;"),
    bullet("founder or expert content that gives the brand a recognizable human point of view;"),
    bullet("third-party mentions that make the brand less self-referential."),
    block("normal", [plain("In other words, "), strong("you need content that can be quoted and a brand that is worth naming.")]),

    h2("Why topic authority matters more than winning one prompt"),
    p("One of the most dangerous habits in GEO reporting is screenshot optimization."),
    p("Someone asks ChatGPT one favorable question, sees the company mentioned, takes a screenshot, and declares the strategy successful."),
    p("That is not measurement. It is anecdote."),
    p("Semrush and Kevin Indig studied 50,000 brands across 1,094 subject areas in ChatGPT in 2026. Their conclusion was that AI visibility is a topic-level game. A brand may appear for one prompt and disappear for a closely related question. Their study defined meaningful topic ownership more broadly than a single result, looking for repeated presence across related prompts."),
    p("This matters because buyers do not ask one question."),
    p("A CFO might ask:"),
    bullet("What does an AI process audit cost?"),
    bullet("Which AI consulting firms understand manufacturing?"),
    bullet("What should be included in an AI readiness assessment?"),
    bullet("How do I calculate ROI on a first AI pilot?"),
    bullet("Should we hire internally or use an external advisor?"),
    bullet("Which process should we automate first?"),
    p("A brand that appears only for \"AI process audit company India\" has not achieved category visibility. A brand that appears across the whole decision journey has."),
    block("normal", [plain("That is why we recommend building a "), strong("prompt portfolio"), plain(", not a keyword-to-prompt translation sheet.")]),

    h2("The C-suite scorecard: five questions to ask your marketing team"),
    p("You do not need the leadership team to become GEO practitioners. You do need them to ask better questions."),
    h3("Question 1: Are we technically available to AI search systems?"),
    p("Ask for evidence, not reassurance."),
    p("The answer should cover crawl access, indexing, robots directives, structured content, page rendering, and whether major AI search crawlers are being blocked unintentionally."),
    h3("Question 2: Can the public web describe our company consistently?"),
    p("Ask marketing to compare your homepage, service pages, LinkedIn page, founder profiles, Google Business Profile, directories, press mentions, partner pages, and important third-party references."),
    p("You are looking for category consistency, not identical copy."),
    h3("Question 3: What original evidence do we publish that competitors cannot copy tomorrow?"),
    p("Examples include:"),
    bullet("original benchmarks;"),
    bullet("proprietary frameworks;"),
    bullet("anonymized operational insights;"),
    bullet("customer research;"),
    bullet("first-party data;"),
    bullet("expert commentary;"),
    bullet("case studies;"),
    bullet("calculators;"),
    bullet("checklists based on real delivery experience."),
    p("If the answer is \"we publish two SEO blogs a week,\" you have a content calendar, not an evidence strategy."),
    h3("Question 4: Where does our reputation exist outside our own website?"),
    p("Look at trade publications, podcasts, YouTube, LinkedIn, associations, reviews, client sites, partner pages, communities, conference pages, and expert roundups."),
    p("Ahrefs' brand visibility research found strong correlations between broad web mentions and AI visibility, while content volume alone showed very little relationship."),
    p("Again, this is not an invitation to manufacture mentions. Low-quality placements and fake community activity damage credibility. The goal is genuine external corroboration."),
    h3("Question 5: Are we measuring mentions, citations, context, and business outcomes separately?"),
    p("A useful dashboard should not collapse everything into one \"AI visibility score.\""),
    p("At minimum, track:"),
    bulletBold("prompt coverage:", "the proportion of your defined prompt portfolio where the brand appears;"),
    bulletBold("brand mentions:", "how often your brand name appears in the answer;"),
    bulletBold("citations:", "how often your pages or domain are used as visible sources;"),
    bulletBold("citation-plus-mention rate:", "how often both happen together;"),
    bulletBold("competitor share of voice:", "which brands repeatedly appear across the same topic;"),
    bulletBold("source mix:", "your own site versus third-party publications, social platforms, communities, video, reviews, and directories;"),
    bulletBold("message accuracy:", "whether the AI describes your brand correctly;"),
    bulletBold("sentiment and positioning:", "whether the answer frames you as a specialist, generalist, premium option, budget option, local provider, or something else;"),
    bulletBold("AI referral sessions and conversions:", "when clicks do occur;"),
    bulletBold("assisted revenue evidence:", "sales-call mentions, form-source questions, CRM notes, and self-reported discovery."),
    p("Google's new Search Generative AI performance reports, rolled out globally by August 31, 2026, are another sign that AI visibility measurement is becoming a distinct operational discipline, at least within Google's own search ecosystem."),

    h2("What not to do"),
    p("The fastest way to waste a GEO budget is to treat the category like early-2010s SEO and hunt for a trick."),
    h3("Do not mass-produce generic AI articles"),
    p("Google's generative AI content guidance is explicit that using AI to generate many pages without adding value can violate its scaled content abuse policies."),
    p("Even when a page is not penalized, commodity content gives an AI system little reason to prefer your version over thousands of near-identical versions."),
    h3("Do not assume schema is a magic switch"),
    p("Structured data helps machines understand pages and entities. It is useful hygiene. It does not force ChatGPT to cite you."),
    h3("Do not treat llms.txt as a ranking factor"),
    p("Google clarified in June 2026 that llms.txt is not needed for Google Search and does not positively or negatively affect visibility or rankings in its search systems."),
    p("Other services may choose to use such files, but a CMO should not accept \"we added llms.txt\" as evidence that GEO work is complete."),
    h3("Do not buy fake authority"),
    p("Manufactured Reddit posts, low-quality guest posts, fake reviews, spammy directory placements, and paid \"mentions\" with no audience relevance may create more URLs while making the brand less trustworthy."),
    h3("Do not optimize for ChatGPT only"),
    p("Your buyers may use ChatGPT, Google AI Mode, Gemini, Copilot, Perplexity, Claude, YouTube, LinkedIn, classic Google Search, or several of them in one journey."),
    p("AI systems also behave differently. A strategy that chases one platform's current pattern can become brittle."),
    h3("Do not report only traffic"),
    p("AI influence can occur without a click. At the same time, visibility without business value can become vanity."),
    p("Ahrefs noted this tension in its 2026 AI search trends analysis: a page can experience a large jump in AI citations with little business impact. The important shift is from simply counting citations to asking which citations create meaningful exposure, qualified visits, and downstream outcomes."),

    h2("A practical 90-day executive agenda"),
    p("This is not a tactical GEO implementation plan. It is the leadership agenda required to make a GEO program accountable."),
    h3("Days 1-15: Establish the truth"),
    bullet("Create a 30-50 prompt portfolio across awareness, comparison, and decision-stage questions."),
    bullet("Benchmark brand mentions, citations, competitors, source domains, and accuracy across the AI platforms that matter to your buyers."),
    bullet("Check technical accessibility, including OAI-Searchbot and normal search indexing."),
    bullet("Audit how your brand is described across your own site and major third-party profiles."),
    bullet("Identify which service areas have strong evidence and which rely on generic claims."),
    h3("Days 16-45: Fix the weakest layer"),
    p("Do not start by publishing more content."),
    p("Use the five-layer chain."),
    p("If the brand cannot be found, fix discoverability."),
    p("If it is found but described inconsistently, fix entity clarity and positioning."),
    p("If it is clear but unsupported, build evidence and external corroboration."),
    p("If it is trusted but rarely cited, improve answerability, topic depth, and content specificity."),
    p("If it is cited but not named, strengthen branded examples, comparison pages, expert attribution, and decision-stage content."),
    h3("Days 46-75: Build topic coverage, not keyword volume"),
    p("Choose one commercially important topic and map the full buyer-question set around it."),
    p("For MagicWorks, that could be AI process audits for Indian mid-market companies. The cluster might include readiness, data, process selection, ROI, vendor evaluation, build-versus-buy, change management, roadmap execution, and sector-specific use cases."),
    p("Each piece should answer a distinct question. Together, the cluster should make it easier for a human or machine to understand the firm's point of view across the category."),
    h3("Days 76-90: Measure what changed"),
    p("Run the same prompt portfolio again under a controlled method."),
    p("Compare:"),
    bullet("prompt coverage;"),
    bullet("mention share;"),
    bullet("citation share;"),
    bullet("cited pages;"),
    bullet("third-party source visibility;"),
    bullet("competitor movement;"),
    bullet("accuracy;"),
    bullet("AI referrals and conversions;"),
    bullet("sales feedback."),
    p("Do not change the prompt bank silently between periods. Version it, just as you would version a survey instrument."),

    h2("Where MagicWorks fits"),
    p("MagicWorks treats GEO as part of a wider organic visibility system, not as a replacement for SEO."),
    pLinks([
      { text: "Our " },
      { text: "SEO and Answer Engine Optimisation service", href: "/services/digital-marketing/seo-aeo" },
      { text: " covers the technical and on-page foundation: crawlability, site structure, content architecture, entity signals, internal linking, and answer-oriented content." },
    ]),
    pLinks([
      { text: "Our wider " },
      { text: "Digital Marketing practice", href: "/services/digital-marketing" },
      { text: " includes Thought Leadership & GEO for founder-attributed content and AI search visibility." },
    ]),
    pLinks([
      { text: "For a tactical practitioner view, see " },
      { text: "GEO for Indian Businesses: How to Get Cited by AI Search in 2026", href: "/blog/geo-for-indian-businesses-2026" },
      { text: ". For measurement, see " },
      { text: "How to Measure Your Brand's AI Citations", href: "/blog/how-to-measure-ai-citations" },
      { text: "." },
    ]),
    p("The point is not to promise a citation. No credible agency can guarantee that."),
    p("The point is to build the public evidence system that makes your brand easier to retrieve, easier to understand, easier to trust, and more useful to quote when AI systems answer the questions your buyers actually ask."),

    h2("The boardroom takeaway"),
    p("AI visibility is not an SEO side project."),
    p("It is a brand, content, technical, reputation, and measurement problem happening at the same time."),
    p("The companies most likely to win will not be the ones that discover a secret prompt or publish the largest number of AI-written pages. They will be the companies whose public digital footprint makes a coherent case for them across hundreds of small retrieval decisions."),
    p("A useful executive test is only five words:"),
    block("normal", [strong("Find. Understand. Trust. Quote. Remember.")]),
    p("If your brand is weak at any one of those stages, that is where the work should begin."),

    h2("Sources and research notes"),
    numbered("OpenAI Help Center, \"Searching the web with ChatGPT\" and current ChatGPT Search guidance: https://help.openai.com/en/articles/9237897"),
    numbered("Ahrefs, \"ChatGPT May Scrape Google, but the Results Don't Match\": https://ahrefs.com/blog/chatgpt-google-citations/"),
    numbered("Ahrefs, \"67% of ChatGPT's Top 1,000 Citations Are Off-Limits to Marketers\": https://ahrefs.com/blog/chatgpts-most-cited-pages/"),
    numbered("Ahrefs, \"AI Assistants Prefer to Cite Fresher Content\": https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/"),
    numbered("Semrush, \"Why 62% of AI citations don't lead to brand mentions\": https://www.semrush.com/blog/the-ghost-citations-study/"),
    numbered("Semrush, \"AI visibility is a topic-level game: A study of 50,000 brands in ChatGPT\": https://www.semrush.com/blog/chatgpt-topic-authority-study/"),
    numbered("Ahrefs, \"Top Brand Visibility Factors in ChatGPT, AI Mode, and AI Overviews\": https://ahrefs.com/blog/ai-brand-visibility-correlations/"),
    numbered("Google Search Central, \"Optimizing your website for generative AI features on Google Search\": https://developers.google.com/search/docs/fundamentals/ai-optimization-guide"),
    numbered("Google Search Central, \"Introducing Search Generative AI performance reports in Search Console\": https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports"),
    numbered("Semrush, \"Why Brand Positioning Is Now an AI Search Variable\": https://www.semrush.com/blog/brand-positioning-is-an-ai-search-variable/"),
    numbered("Google Search Central, \"Guidance on using generative AI content on your website\": https://developers.google.com/search/docs/fundamentals/using-gen-ai-content"),
    numbered("Google Search Central updates, June 2026 llms.txt clarification: https://developers.google.com/search/updates"),
    numbered("Ahrefs, \"5 AI Search Trends I'm Seeing in 2026\": https://ahrefs.com/blog/ai-search-trends/"),
    numbered("Ahrefs, \"Retrieval-Augmented Generation Explained: How AI Decides Which Pages to Search and Cite\": https://ahrefs.com/blog/retrieval-augmented-generation/"),

    callout(
      "Want An Honest Read on Your Brand's AI Visibility?",
      "MagicWorks helps C-suite teams and marketing leaders diagnose the five-layer AI visibility chain, find the weakest link, and build the public evidence system that gives ChatGPT and other AI answer engines a real reason to find, trust, and name their brand. No agency can guarantee a citation. We can show you exactly where your evidence is thin.",
      "key-takeaway"
    ),
    linkPara("Get the ", "AI Search Visibility Playbook", "/insights/reports/ai-search-visibility-playbook", " for a practical starting checklist, or"),
    linkPara("", "book a conversation with our team", "/contact", " to scope a 90-day AI visibility audit for your brand."),
  ];
}

const FAQ = [
  { question: "Can a company guarantee that ChatGPT will cite or recommend it?", answer: "No. OpenAI states that ChatGPT Search ranking depends on multiple factors and there is no way to guarantee top placement. GEO can improve technical accessibility, content quality, entity clarity, evidence, and external corroboration, but the final output remains controlled by the AI system and the user's specific question." },
  { question: "Does ranking number one on Google mean ChatGPT will cite the same page?", answer: "No. Strong SEO can help because it improves discoverability and authority, but studies have found low overlap between some ChatGPT citation sets and Google's top ten results. AI systems can retrieve and select sources differently." },
  { question: "What is more important, a citation or a brand mention?", answer: "Both matter, but they serve different purposes. A citation attributes information to your page. A brand mention puts your name directly into the buyer's answer. The strongest commercial outcome is often being both named and cited in relevant decision-stage answers." },
  { question: "How long does GEO take?", answer: "Technical fixes can happen quickly, but reputation, topical depth, third-party corroboration, and repeated brand visibility compound over months. A useful first checkpoint is 90 days, with the same prompt portfolio measured before and after. Competitive categories should be treated as an ongoing program, not a one-off optimization." },
  { question: "Is GEO different from AEO?", answer: "The labels overlap in the market. At MagicWorks, AEO refers mainly to technical and on-page work that helps content become understandable and citable in answer engines, while GEO is used for the broader thought-leadership and brand-visibility program across generative AI environments." },
  { question: "Should we create content specifically for ChatGPT?", answer: "Create content for real buyer questions and real decision needs, then structure it so machines can understand and retrieve it cleanly. Avoid writing unnatural pages for one chatbot. Platform behavior changes too quickly for a single-engine content strategy to be durable." },
  { question: "Do third-party mentions matter?", answer: "Research from Ahrefs and Semrush shows strong associations between broader brand presence and AI visibility. Third-party mentions also make intuitive sense as corroborating evidence. The important word is credible. Genuine coverage, expert contributions, reviews, partner references, community discussion, and useful videos are different from manufactured placements." },
  { question: "How should a C-suite team measure AI visibility?", answer: "Use a repeatable prompt portfolio and track mentions, citations, mention-plus-citation rate, competitor share, source mix, answer accuracy, AI referral conversions, and self-reported buyer discovery. Do not reduce the entire program to one opaque visibility score." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "Why Some Brands Get Quoted by ChatGPT and Others Don't";
const SLUG = "why-some-brands-get-quoted-by-chatgpt";
const EXCERPT = "Why do some brands get cited by ChatGPT while others don't? The real drivers: findability, clarity, evidence, corroboration, and relevance.";
const SEO_TITLE = "Why Some Brands Get Quoted by ChatGPT | MagicWorks";
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
    console.log(`⏭️   Post already exists (${existing._id}) — skipping.`);
    return;
  }

  const heroId = await uploadImage("hero-why-brands-get-quoted-chatgpt-1280x512.png");
  const visibilityChainId = await uploadImage("framework-ai-visibility-chain.png");
  const citationMatrixId = await uploadImage("framework-citation-vs-mention.png");

  const doc = {
    _id: "drafts.insight-mohan-chatgpt-brand-citations",
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["seo-aeo"],
    pillar: "digital-marketing",
    publishedAt: "2026-11-02T03:30:00.000Z",
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "Buyer questions and public web sources flowing through an AI retrieval layer into a cited answer",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "generative engine optimization",
      "geo agency",
      "AI visibility",
      "ChatGPT citations",
      "AI search visibility",
      "brand mentions in ChatGPT",
      "answer engine optimization",
    ],
    body: buildBody(visibilityChainId, citationMatrixId),
    faq: FAQ.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
  };

  console.log("💾  Creating DRAFT document…");
  const created = await client.create(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    NOTE: this is a DRAFT — it is not live on the site until published.`);
  console.log(`    Studio review: https://${PROJECT_ID}.sanity.studio/structure/insight;insight-mohan-chatgpt-brand-citations`);

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
