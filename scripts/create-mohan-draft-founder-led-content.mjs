/**
 * create-mohan-draft-founder-led-content.mjs
 *
 * Creates "Founder-Led Content Is Becoming a Business Asset" (author: Mohan
 * Chute, existing author record) in Sanity as a DRAFT ONLY (not visible on
 * the live site until promoted / published).
 *
 * Source: Docs/Blogs/Mohan/As-per-Purva/03_founder_led_content/
 *   - founder-led-content-ai-search-asset.md   (article content)
 *   - README-PUBLISHING.md                     (SEO metadata / editorial notes)
 *   - assets/hero-founder-led-content-1280x512.png       (cover image)
 *   - assets/chart-thought-leadership-impact.png         (inline)
 *   - assets/framework-founder-content-flywheel.png      (inline)
 *
 * This script ONLY creates a draft. It does not publish, and it does not
 * delete any existing draft. The post has a future publishedAt value
 * (2026-10-26) that is left untouched, to be used when the draft is later
 * promoted / published via a separate script.
 *
 * Run: node scripts/create-mohan-draft-founder-led-content.mjs
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

const ASSET_DIR = path.join(__dirname, "..", "..", "Docs", "Blogs", "Mohan", "As-per-Purva", "03_founder_led_content", "assets");

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
  // parts: array of { text } or { text, href } or { text, bold }
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

// ── Source citations (from the article's numbered "Sources" list) ──────────
const SRC_IAS38 = "https://www.ifrs.org/issued-standards/list-of-standards/ias-38-intangible-assets/";
const SRC_GOOGLE_GENAI_GUIDE = "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide";
const SRC_LINKEDIN_EDELMAN_2024 = "https://www.linkedin.com/business/marketing/blog/research-and-insights/b2b-thought-leadership-research-impact-linkedin-edelman";
const SRC_EDELMAN_2025 = "https://www.edelman.com/expertise/Business-Marketing/2025-b2b-thought-leadership-report";
const SRC_GOOGLE_PROFILEPAGE = "https://developers.google.com/search/docs/appearance/structured-data/profile-page?hl=en";
const SRC_AUTHOR_PAGE = "https://magicworksitsolutions.com/authors/mohan-chute";
const SRC_MW_BLOG = "https://magicworksitsolutions.com/blog";
const SRC_GOOGLE_GENAI_CONTENT_GUIDANCE = "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content";

// ── Internal links (from the article's "Recommended internal links") ───────
const LINK_DO_NOT_START = "/blog/do-not-start-with-ai-start-with-the-decision";
const LINK_GEO_INDIA = "/blog/geo-for-indian-businesses-2026";
const LINK_GEO_SERVICE = "/services/digital-marketing/thought-leadership-geo";
const LINK_CONTACT = "/contact";

// ════════════════════════════════════════════════════════════════════════════
// BLOG: Founder-Led Content Is Becoming a Balance-Sheet Asset. Here's Why
//       AI Search Rewards It.
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgChart, imgFlywheel) {
  resetKey("fnd");
  return [
    p("A founder spends 20 years learning a market, then gives the internet almost none of it."),
    p("The experience stays in sales calls, internal reviews, WhatsApp voice notes, proposal meetings, hiring conversations, and late-night decisions. The website is written in a generic corporate voice. The founder's LinkedIn feed alternates between event photographs and congratulations. The company's most valuable thinking remains inaccessible to buyers until they are already in the room."),
    p("That used to be a missed marketing opportunity."),
    p("In an AI-mediated discovery environment, it is becoming a structural visibility problem."),

    h2("The short answer"),
    pLinks([
      { text: "Founder-led content is not literally a balance-sheet asset under normal accounting standards. " },
      { text: "IAS 38", href: SRC_IAS38 },
      { text: ", for example, says internally generated brands, mastheads, publishing titles, customer lists, and similar items are not recognised as intangible assets because their cost cannot be separated reliably from the cost of developing the business as a whole." },
    ]),
    p("But economically, a strong body of founder-attributed content behaves in an asset-like way."),
    p("It can compound over time. It can reduce the cost of explaining the business. It can improve buyer trust before sales engagement. It can help hidden stakeholders evaluate the company. It can feed sales enablement, recruiting, partnerships, PR, search visibility, and AI-generated answers. It can create a public record of expertise that competitors cannot reproduce simply by buying the same software or copying the same keywords."),
    p("That last point is becoming more important."),
    pLinks([
      { text: "Google's " },
      { text: "2026 guidance for generative search", href: SRC_GOOGLE_GENAI_GUIDE },
      { text: " explicitly tells site owners to create " },
      { text: "unique, non-commodity content", bold: true },
      { text: ", bring " },
      { text: "first-hand experience and a unique point of view", bold: true },
      { text: ", and avoid simply recycling material that a generative AI model could easily produce." },
    ]),
    p("Founder-led content, when it is real, is naturally suited to those requirements."),

    h2("First, a necessary accounting caveat"),
    p("The phrase \"balance-sheet asset\" is intentionally provocative, but it should not be misunderstood."),
    pLinks([
      { text: "Most internally generated brand value does not sit on a company's financial statements as a recognised intangible asset. The " },
      { text: "IFRS Foundation's summary of IAS 38", href: SRC_IAS38 },
      { text: " is clear that internally generated brands and similar items are not recognised as assets." },
    ]),
    p("So this article is not giving accounting advice, and it is not suggesting that your CFO capitalise your founder's LinkedIn posts."),
    p("The useful comparison is economic, not accounting."),
    p("An asset is valuable because it can produce future benefit. A strong content library can do exactly that, repeatedly, after the original effort has been spent."),
    p("A founder records a 45-minute conversation about why a particular AI implementation model fails. That becomes:"),
    bullet("a 3,500-word article;"),
    bullet("a boardroom checklist;"),
    bullet("a LinkedIn post series;"),
    bullet("a webinar segment;"),
    bullet("an internal sales objection-handling guide;"),
    bullet("a short video;"),
    bullet("a client email;"),
    bullet("a training example;"),
    bullet("an answer source for AI systems; and"),
    bullet("a durable page that continues to be discovered months later."),
    p("That is not a one-time campaign impression. It is a reusable intellectual asset."),

    h2("B2B buyers already use thought leadership as a proxy for capability"),
    p("The commercial case for thought leadership existed before generative search."),
    pLinks([
      { text: "LinkedIn and Edelman's 2024 research", href: SRC_LINKEDIN_EDELMAN_2024 },
      { text: " found that " },
      { text: "73% of decision-makers", bold: true },
      { text: " considered an organisation's thought leadership a more trustworthy basis for assessing capabilities than marketing materials or product sheets. The same research found that " },
      { text: "75%", bold: true },
      { text: " of decision-makers and C-suite executives had been prompted by a piece of thought leadership to research a product or service they had not previously considered. Around " },
      { text: "9 in 10", bold: true },
      { text: " said they were moderately or very likely to be more receptive to outreach from a company that consistently produced high-quality thought leadership." },
    ]),
    pLinks([
      { text: "The " },
      { text: "2025 Edelman-LinkedIn report", href: SRC_EDELMAN_2025 },
      { text: " focused on the hidden buyers inside B2B buying groups, the people who may never take the first sales call but can accelerate or block a deal. Edelman notes that more than 40% of B2B deals stall because of internal misalignment within buying groups." },
    ]),
    p("This is where founder-led content becomes more than personal branding."),
    p("It gives unseen stakeholders a way to evaluate the calibre of thinking behind the logo."),
    p("A procurement lead can understand your commercial philosophy. A CTO can assess whether the founder understands implementation risk. A CFO can see whether claims are financially literate. A functional head can decide whether your team understands the operational reality of their industry."),
    p("Those people may never follow the founder on LinkedIn. They can still encounter the thinking through search, internal sharing, sales follow-up, or AI-generated answers."),

    imageBlock(imgChart, "Chart showing how thought leadership research from LinkedIn and Edelman influences B2B buyer trust, research behaviour, and outreach receptiveness"),

    h2("Why founder-led content aligns with AI search"),
    p("It would be easy to oversimplify this into \"AI loves authors.\" That is not a defensible claim."),
    p("There is no public switch inside Google, ChatGPT, Gemini, or Perplexity that says \"founder content gets bonus points.\""),
    p("The stronger argument is structural."),
    p("Founder-led content often contains the exact characteristics that generative search systems and modern search guidance reward."),

    h3("1. A unique point of view"),
    pLinks([
      { text: "Google's " },
      { text: "generative AI optimization guide", href: SRC_GOOGLE_GENAI_GUIDE },
      { text: " recommends content that provides a unique viewpoint and first-hand experience instead of summarising what is already available." },
    ]),
    p("A founder has access to judgment that a commodity content workflow does not."),
    p("Not because founders are automatically smarter, but because they have accumulated context through consequence."),
    p("They know which pricing model looked attractive but failed. They remember the client profile that sounded perfect but became unprofitable. They have watched a hiring philosophy work for five years, then break at a different stage of scale. They know which marketing metric created false confidence. They know which product feature customers said they wanted but did not use."),
    p("Those are difficult insights to fabricate well."),

    h3("2. Experience that can be attributed to a person"),
    p("A named author page can connect articles, role, company, experience, and other public profiles."),
    pLinks([
      { text: "Google supports " },
      { text: "ProfilePage structured data", href: SRC_GOOGLE_PROFILEPAGE },
      { text: " specifically for pages where a person or organisation shares first-hand perspectives. Its documentation notes that Article structured data can link authors to profile pages, helping Search understand creators and their content." },
    ]),
    p("This should not be interpreted as a guaranteed ranking advantage. It is better understood as entity clarity."),
    p("Who wrote this? What else have they written? What organisation are they connected to? Is this person the same expert referenced elsewhere?"),
    p("A coherent author identity makes those relationships easier to understand."),

    h3("3. Non-commodity information"),
    p("The average AI-generated corporate article is getting easier to produce and harder to differentiate."),
    p("That creates a paradox. As content production becomes cheaper, distinctive content becomes more valuable."),
    pLinks([
      { text: "Google's " },
      { text: "2026 guidance", href: SRC_GOOGLE_GENAI_GUIDE },
      { text: " calls out commodity content directly and gives first-hand reviews and experience-based material as examples of stronger, non-commodity content." },
    ]),
    p("Founder-led content can occupy that space when it contains:"),
    bullet("original frameworks;"),
    bullet("specific decisions;"),
    bullet("trade-offs;"),
    bullet("real examples;"),
    bullet("mistakes;"),
    bullet("thresholds;"),
    bullet("numbers that can be defended;"),
    bullet("unpopular but reasoned opinions;"),
    bullet("industry-specific patterns; and"),
    bullet("consequences the author has actually experienced."),

    h3("4. A continuing body of work"),
    p("One article proves little."),
    p("A consistent archive can reveal a pattern of expertise."),
    p("For example, a founder who has written over a year about AI vendor selection, data readiness, decision design, change management, pilot economics, and roadmap governance is not producing isolated SEO pieces. They are building a connected body of reasoning around a domain."),
    p("That creates value for humans because buyers can go deeper. It creates value for retrieval because topics, entities, authors, and internal links become easier to connect."),
    pLinks([
      { text: "At MagicWorks, " },
      { text: "Mohan Chute's author page", href: SRC_AUTHOR_PAGE },
      { text: " already serves this function by grouping articles around AI strategy, marketing, and digital transformation under a consistent expert identity." },
    ]),

    h3("5. Better material for AI answers"),
    p("An AI system asked a nuanced question needs source material with nuance."),
    p("\"What is AI consulting?\" can be answered from generic definitions."),
    p("\"Should an Indian mid-market manufacturer commission an AI process audit before selecting a vendor?\" benefits from first-hand material about readiness, data, workflow ownership, risk, vendor neutrality, and implementation sequencing."),
    p("The more specific the question, the more useful experience-rich content becomes."),

    h2("The founder-content flywheel"),
    p("The asset effect becomes clearer when you map how one strong idea travels through the business."),

    imageBlock(imgFlywheel, "Framework diagram of the founder-content flywheel showing insight, editorial work, publishing, distribution, buyer evaluation, and search and AI discovery stages"),

    h3("Stage 1: Experience creates an insight"),
    p("The founder notices a repeated pattern in client work, product decisions, hiring, operations, sales, or strategy."),
    p("This is the raw intellectual input."),

    h3("Stage 2: Editorial work makes the insight transferable"),
    p("A strategist or editor interviews the founder, challenges unsupported claims, gathers evidence, structures the argument, and turns experience into something another person can use."),
    p("This is where good ghostwriting differs from content outsourcing."),
    p("The writer is not inventing expertise. The writer is extracting, testing, and packaging it."),

    h3("Stage 3: Publishing creates a permanent public object"),
    p("The idea receives a stable URL, a named author, a clear headline, internal links, sources, supporting images, and a date."),
    p("It becomes retrievable."),

    h3("Stage 4: Distribution creates repeated entry points"),
    p("The article becomes a LinkedIn post, email, webinar, sales follow-up, short video, speaking point, or partner contribution."),
    p("Each format points back to the underlying idea."),

    h3("Stage 5: Buyers use it to evaluate the company"),
    p("A prospect reads it before a call. A hidden buyer receives it internally. A salesperson sends it after a meeting. A candidate reads it before accepting an offer. A partner references it in a discussion."),

    h3("Stage 6: Search and AI systems discover a stronger evidence graph"),
    p("The article is crawled, linked, cited, mentioned, and associated with the author and company. Over time, related content makes the topic cluster stronger."),

    h3("Stage 7: Commercial conversations become better informed"),
    p("Prospects arrive with more context. Sales spends less time explaining first principles. The founder's point of view becomes part of the company's market position."),
    p("New conversations then create new insights, restarting the loop."),
    p("This is why a strong content system compounds."),

    h2("Founder-led content is different from founder social posting"),
    p("These are not the same thing."),
    p("A founder can be very active on LinkedIn and still have almost no durable content asset."),
    p("Social content is useful for reach and conversation, but much of it is ephemeral. A long-form article, research note, case analysis, or public framework gives the idea a stable home that can be searched, cited, linked, and revisited."),
    p("The strongest model is usually:"),
    block("normal", [strong("durable long-form source -> social distribution -> conversation -> updated durable source")]),
    p("not:"),
    block("normal", [strong("daily posting -> daily posting -> daily posting -> forget everything after 48 hours")]),
    p("The social feed is the distribution layer. The content library is the knowledge asset."),

    h2("What makes founder content worth citing?"),
    p("Putting the founder's name on generic copy does not create thought leadership."),
    p("A citable founder article usually has six properties."),

    h3("1. It answers a real decision"),
    p("The article should help someone choose, diagnose, prioritise, reject, compare, or act."),
    p("Weak topic: \"The Future of AI in Business.\""),
    linkPara("Stronger topic: \"", "Do Not Start With AI. Start With the Decision.", LINK_DO_NOT_START, "\""),
    p("Weak topic: \"Why Digital Marketing Matters.\""),
    p("Stronger topic: \"How Much Does Digital Marketing Advisory Cost in India, and When Is a Retainer the Wrong Model?\""),
    p("Decision-shaped content is more useful to buyers and more likely to be retrieved for specific questions."),

    h3("2. It contains information only this operator could plausibly know"),
    p("This might be:"),
    bullet("a framework developed in practice;"),
    bullet("a threshold used to qualify opportunities;"),
    bullet("a repeated failure pattern;"),
    bullet("a commercial trade-off;"),
    bullet("a before-and-after example;"),
    bullet("an implementation sequence;"),
    bullet("a lesson from an unsuccessful approach; or"),
    bullet("a strong opinion backed by operating evidence."),

    h3("3. It separates evidence from opinion"),
    p("Founder authority becomes more credible when the article says clearly:"),
    p("\"Here is what the research shows.\""),
    p("\"Here is what we have observed.\""),
    p("\"Here is our interpretation.\""),
    p("\"Here is an illustrative example.\""),
    p("These are different categories of claim."),
    p("Blurring them weakens trust."),

    h3("4. It includes verifiable sources"),
    pLinks([
      { text: "The " },
      { text: "2024 LinkedIn-Edelman research", href: SRC_LINKEDIN_EDELMAN_2024 },
      { text: " found that " },
      { text: "55% of decision-makers", bold: true },
      { text: " saw strong research and data as a top characteristic of high-quality thought leadership." },
    ]),
    p("That does not mean every article needs 40 citations. It means material claims should be supportable."),

    h3("5. It has a recognisable voice"),
    p("A founder who genuinely believes everything every industry report says is not a thought leader. They are a summary engine."),
    p("Strong content has judgment."),
    p("It can say:"),
    p("\"This is where I disagree.\""),
    p("\"This is true for enterprises but wrong for a 100-person Indian company.\""),
    p("\"This looks efficient in a demo but creates operational debt after six months.\""),
    p("\"This metric is useful until it becomes a target.\""),
    p("The voice should be distinct without becoming theatrical."),

    h3("6. It avoids self-congratulation"),
    p("The fastest way to make founder content unreadable is to turn every insight into a disguised sales pitch."),
    p("The buyer should receive value before being asked to buy."),
    pLinks([
      { text: "MagicWorks' own " },
      { text: "blog", href: SRC_MW_BLOG },
      { text: " positioning says the knowledge should be useful before it becomes a reason to call us. That is the right standard for founder-led publishing." },
    ]),

    h2("Why AI-generated sameness makes human expertise more valuable"),
    p("Generative AI has changed the economics of drafting."),
    p("A competent first draft that once took four hours can now take minutes. Research can be organised faster. Outlines can be tested. Counterarguments can be surfaced. Long transcripts can be converted into structured notes."),
    p("This is useful. It also means the internet is receiving an enormous amount of competent, familiar, average content."),
    p("The new bottleneck is not text production."),
    p("It is proprietary perspective."),
    p("AI can help a founder express an idea. It cannot retroactively live the founder's 20 years of decisions."),
    p("That creates an important operating principle:"),
    bq("Use AI to reduce the cost of packaging expertise, not to replace the expertise itself."),
    pLinks([
      { text: "Google's " },
      { text: "content guidance", href: SRC_GOOGLE_GENAI_CONTENT_GUIDANCE },
      { text: " supports this distinction. It says generative AI can be useful for research and structure, but automatically generating many pages without adding value can violate spam policies." },
    ]),
    p("The risk is not \"AI-written\" versus \"human-written\" as a simplistic binary."),
    p("The risk is whether the finished piece contains original, accurate, accountable value."),

    h2("A founder-led content operating system that does not consume the founder's week"),
    p("Founders often reject content programmes for a legitimate reason: they do not have time to become full-time creators."),
    p("They should not have to."),
    p("A practical system can run on 60 to 90 minutes of founder input per week."),

    h3("Step 1: Build an insight backlog"),
    p("Capture recurring questions from:"),
    bullet("sales calls;"),
    bullet("proposals;"),
    bullet("client reviews;"),
    bullet("hiring;"),
    bullet("delivery retrospectives;"),
    bullet("product discussions;"),
    bullet("board meetings;"),
    bullet("customer objections;"),
    bullet("competitor moves; and"),
    bullet("internal Slack or WhatsApp conversations."),
    p("Do not start with keywords. Start with real decisions."),

    h3("Step 2: Run one structured interview"),
    p("A good 45-minute interview can produce multiple assets if the interviewer asks for specifics."),
    p("Useful prompts include:"),
    bullet("What do most companies get wrong about this?"),
    bullet("What would make you advise a client not to buy this service?"),
    bullet("What changed your mind on this topic?"),
    bullet("What is the most expensive mistake you have seen?"),
    bullet("What number or threshold do you actually use?"),
    bullet("What would a good COO ask before signing?"),
    bullet("What advice sounds smart but fails in practice?"),
    bullet("Which part of your own process has changed in the last two years?"),

    h3("Step 3: Research and fact-check around the viewpoint"),
    p("The editorial team adds external evidence, validates statistics, checks current product or regulatory facts, and challenges overgeneralisation."),
    p("This is where credibility is won."),

    h3("Step 4: Produce a pillar asset"),
    p("Create one substantial source item:"),
    bullet("long-form article;"),
    bullet("research note;"),
    bullet("playbook;"),
    bullet("case analysis;"),
    bullet("webinar;"),
    bullet("video essay; or"),
    bullet("benchmark report."),

    h3("Step 5: Repurpose without flattening the idea"),
    p("Turn the source into multiple formats, but preserve the central argument."),
    p("Do not rewrite it into 20 generic motivational posts."),

    h3("Step 6: Connect the author entity"),
    p("Each major article should clearly name the author and connect to a substantive author page. The author page should use consistent role, organisation, biography, relevant credentials, and links to other work."),
    pLinks([
      { text: "Google's " },
      { text: "ProfilePage documentation", href: SRC_GOOGLE_PROFILEPAGE },
      { text: " gives a technical model for this relationship." },
    ]),

    h3("Step 7: Review quarterly"),
    p("Every quarter, ask:"),
    bullet("Which ideas generated qualified conversations?"),
    bullet("Which articles are being cited or surfaced in AI search?"),
    bullet("Which content is used most by sales?"),
    bullet("Which themes are now associated with the founder?"),
    bullet("Which pages should be updated with new evidence?"),
    bullet("Where is the founder repeating the same explanation privately that still has no public asset?"),

    h2("The 12-month founder-content portfolio"),
    p("A serious founder content programme should not be a random calendar of 52 posts."),
    p("It should build a portfolio."),
    p("For a B2B founder or senior executive, I would structure the year around five asset classes."),

    h3("Asset class 1: Category points of view"),
    p("These explain what the market is getting wrong and how the founder sees the category changing."),
    p("Examples:"),
    bulletLink("", "why AI projects should start with a decision, not a tool", LINK_DO_NOT_START, ";"),
    bullet("why a website should be treated as a sales operating system;"),
    bullet("why founder-led content is a business asset;"),
    bullet("why AI consultation and AI implementation should sometimes be separated."),

    h3("Asset class 2: Decision frameworks"),
    p("These help buyers make choices."),
    p("Examples:"),
    bullet("build, buy, or wait;"),
    bullet("vendor due diligence;"),
    bullet("readiness scorecards;"),
    bullet("pricing decision trees;"),
    bullet("platform selection frameworks; and"),
    bullet("audit checklists."),

    h3("Asset class 3: Evidence assets"),
    p("These include:"),
    bullet("case studies;"),
    bullet("benchmark data;"),
    bullet("original research;"),
    bullet("implementation retrospectives;"),
    bullet("before-and-after analyses; and"),
    bullet("measurable experiments."),

    h3("Asset class 4: Contrarian or corrective pieces"),
    p("These challenge advice that is widely repeated but incomplete."),
    p("Contrarian does not mean provocative for attention. It means willing to say, \"The common answer is wrong under these conditions.\""),

    h3("Asset class 5: Founder operating notes"),
    p("These humanise expertise without becoming lifestyle content."),
    p("Examples:"),
    bullet("what changed in our sales process after 50 proposals;"),
    bullet("the hiring test we stopped using;"),
    bullet("what I misunderstood about AI adoption two years ago;"),
    bullet("the client profile we now say no to; or"),
    bullet("the metric I no longer use in board reviews."),
    p("Together, these categories create a more complete public model of how the founder thinks."),

    h2("How to measure the asset, not just the posts"),
    p("If you measure founder content only by likes and impressions, you will underinvest or chase the wrong behaviour."),
    p("Use a multi-layer scorecard."),

    h3("Human attention metrics"),
    bullet("qualified readers;"),
    bullet("engaged time;"),
    bullet("newsletter growth;"),
    bullet("repeat visitors;"),
    bullet("saves and shares by target roles;"),
    bullet("inbound speaking or partnership requests."),

    h3("Buyer influence metrics"),
    bullet("prospects who mention an article;"),
    bullet("content-assisted opportunities;"),
    bullet("sales usage of founder assets;"),
    bullet("hidden-buyer engagement;"),
    bullet("deal velocity where relevant content was consumed;"),
    bullet("win-loss references to expertise or trust."),

    h3("Search metrics"),
    bullet("branded search growth;"),
    bullet("non-branded ranking coverage;"),
    bullet("internal link growth;"),
    bullet("referring domains;"),
    bullet("Search Console performance."),

    h3("AI visibility metrics"),
    bullet("non-branded mention frequency;"),
    bullet("citation frequency;"),
    bullet("number of priority topics associated with the founder or brand;"),
    bullet("source quality;"),
    bullet("factual accuracy in AI answers;"),
    bullet("Google Search Console generative AI impressions where available."),

    h3("Asset reuse metrics"),
    bullet("number of sales sequences using the asset;"),
    bullet("number of derivative posts or videos;"),
    bullet("webinar reuse;"),
    bullet("onboarding or training reuse;"),
    bullet("case-study linkage;"),
    bullet("partner or media reuse."),
    p("This final category matters because a durable content asset should work in more than one channel."),

    h2("The risks of founder-led content"),
    p("The model is powerful, but it can fail in predictable ways."),

    h3("Risk 1: The founder becomes a production bottleneck"),
    p("If every sentence requires founder approval, the programme will collapse under calendar pressure."),
    p("Fix it with a clear editorial doctrine: what the founder must approve, what the editor can decide, and what claims require evidence."),

    h3("Risk 2: Ghostwriting becomes fictional writing"),
    p("The editor should sharpen the founder's thinking, not manufacture a personality."),
    p("If the founder would never say it, does not believe it, or cannot defend it in a room, do not publish it under their name."),

    h3("Risk 3: AI makes the voice generic"),
    p("AI tools are useful for structure, synthesis, and editing. They are dangerous when used to fill gaps in experience with confident filler."),
    p("The cure is source discipline. Every important idea should trace back to a founder interview, operating evidence, a verified external source, or a clearly labelled interpretation."),

    h3("Risk 4: The founder talks beyond their expertise"),
    p("Thought leadership rewards depth, not omniscience."),
    p("A founder should be comfortable saying, \"I do not know,\" or bringing in another named specialist when the subject belongs to someone else."),

    h3("Risk 5: The company cannot survive the founder's identity"),
    p("Founder-led does not mean founder-only."),
    p("Over time, build an expert network across the organisation. The founder can establish the publishing standard, then bring delivery leaders, strategists, engineers, researchers, and clients into the knowledge graph."),
    p("A resilient brand should become known for the quality of its people, not one personality alone."),

    h2("Why this matters for Indian B2B companies now"),
    p("Many Indian B2B firms have a structural advantage they are not using."),
    p("Their founders often have direct, long-duration experience across sales, delivery, pricing, hiring, regulation, client relationships, and market cycles. In a Western enterprise, those insights might be distributed across five vice presidents and a research team. In an Indian mid-market company, they can sit inside one or two senior people."),
    p("The disadvantage is that very little of it is public."),
    p("The website is often agency-written. The founder profile is thin. Case studies are confidential or superficial. The best material is buried in proposals. LinkedIn is inconsistent. Search results therefore contain far less evidence than the company deserves."),
    linkPara("", "AI search widens the cost of that invisibility because buyers can ask richer questions before speaking to sales", LINK_GEO_INDIA, "."),
    p("The company that publishes its real judgment has more surface area to be discovered."),
    p("The company that keeps its judgment private forces every buyer to start from the logo and brochure."),

    h2("A practical founder content cadence"),
    p("For a busy founder, a credible monthly rhythm can be enough."),
    p("Week 1: one 60-minute insight interview."),
    p("Week 2: one long-form draft plus research and fact-checking."),
    p("Week 3: founder review focused on argument, not grammar."),
    p("Week 4: publish the article and repurpose into three to five focused distribution assets."),
    p("That gives the business 12 strong long-form pieces a year."),
    p("Twelve substantive founder articles with connected internal links, strong sources, original frameworks, and consistent authorship can be more valuable than 200 generic posts."),
    p("The goal is not volume. It is cumulative authority."),

    h2("The founder-content principle"),
    p("Founders often think of content as something marketing needs from them."),
    p("The more useful framing is the reverse."),
    p("Marketing is the system that converts founder knowledge into a reusable business asset."),
    bq("Your experience already exists. The strategic question is whether it remains trapped in meetings or becomes a public body of evidence that compounds trust, search visibility, AI discoverability, and sales leverage."),
    pLinks([
      { text: "At MagicWorks, our " },
      { text: "Thought Leadership & GEO service", href: LINK_GEO_SERVICE },
      { text: " is built around that conversion. The founder or executive supplies the judgment. Our team structures the interview, researches the evidence, produces the long-form source material, strengthens the author entity, and distributes the ideas in ways that support both human buyers and AI discovery." },
    ]),
    p("The objective is not to turn founders into influencers."),
    p("It is to make their best thinking discoverable before the sales call."),

    callout(
      "Ready to Turn Your Expertise Into a Discoverable Asset?",
      "MagicWorks' Thought Leadership & GEO service turns founder and executive judgment into durable, citable content: structured interviews, evidence-backed long-form articles, a strengthened author entity, and distribution that supports both human buyers and AI search visibility.",
      "cta"
    ),
    linkPara("", "Explore Thought Leadership & GEO", LINK_GEO_SERVICE, " or"),
    linkPara("", "book a discovery conversation", LINK_CONTACT, " to map out your founder's first pillar asset."),
  ];
}

const FAQ = [
  { question: "What is founder-led content?", answer: "Founder-led content is material published under a founder or senior executive's real identity that expresses their first-hand expertise, judgment, frameworks, and point of view. It can include articles, research, videos, webinars, social posts, interviews, playbooks, and case analyses. The defining feature is that the ideas are genuinely attributable to the named person." },
  { question: "Is founder-led content the same as personal branding?", answer: "Personal branding is broader and can include reputation, social presence, networking, speaking, and visibility. Founder-led content is a specific knowledge asset within that system. It focuses on turning expertise into durable material that helps buyers, employees, partners, search engines, and AI systems understand how the founder thinks." },
  { question: "Why does founder-led content help GEO or AI search visibility?", answer: "Founder-led material often contains unique viewpoints, first-hand experience, original frameworks, and clear authorship. These characteristics align with Google's 2026 guidance for valuable, non-commodity content in generative search. Strong author pages and consistent entity information also help clarify the relationship between a creator, their articles, and their organisation." },
  { question: "Does Google rank content higher just because a founder wrote it?", answer: "There is no public Google rule that gives founders an automatic ranking boost. The advantage comes from content quality and distinctiveness. A real operator can often contribute experience and original information that generic content lacks. That is useful to readers and can make the material more defensible in search and generative retrieval." },
  { question: "How much founder time is required?", answer: "A good editorial system can run on roughly 60 to 90 minutes of founder input per week, sometimes less. The highest-value use of founder time is the interview and argument review. Research, drafting, formatting, sourcing, repurposing, and publishing can be handled by the editorial team." },
  { question: "Can AI write founder content?", answer: "AI can assist with transcription, research organisation, outline testing, drafting, editing, and repurposing. It should not invent experiences, opinions, client results, or claims and then attribute them to the founder. The final piece must remain accurate, accountable, and recognisably grounded in the founder's real judgment." },
  { question: "Should every company use the founder as the main author?", answer: "No. Founder-led content is strongest when the founder has meaningful domain expertise and wants to be publicly associated with the category. Some businesses should feature other specialists or a network of experts. Over time, founder-led publishing should expand into expert-led publishing so the brand is not dependent on one person." },
  { question: "How do we measure ROI from founder thought leadership?", answer: "Use a blended scorecard: qualified engagement, branded search, sales-assisted usage, influenced opportunities, inbound conversations, AI citations, non-branded mentions, Search Console visibility, and reuse across sales, recruiting, partnerships, and events. Direct last-click attribution will understate the value because thought leadership often influences buyers before a formal conversion event." },
  { question: "Is founder-led content really an asset?", answer: "Economically, it can behave like one because it continues to generate future utility after publication. Accounting standards generally do not allow internally generated brand and publishing value to be recognised as an intangible asset on the balance sheet, so the phrase should be understood as a strategic and economic analogy, not accounting treatment." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "Founder-Led Content Is Becoming a Business Asset";
const SLUG = "founder-led-content-ai-search-asset";
const EXCERPT = "Why founder-led content compounds trust, sales enablement and AI search visibility, plus a practical system for turning expertise into a durable B2B asset.";
const SEO_TITLE = "Founder-Led Content as a Business Asset | MagicWorks";
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

  const heroId = await uploadImage("hero-founder-led-content-1280x512.png");
  const chartId = await uploadImage("chart-thought-leadership-impact.png");
  const flywheelId = await uploadImage("framework-founder-content-flywheel.png");

  const doc = {
    _id: "drafts.insight-mohan-founder-led-content",
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["seo-aeo"],
    pillar: "digital-marketing",
    publishedAt: "2026-10-26T03:30:00.000Z",
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "Founder expertise expanding into a connected network of content, buyers and AI discovery",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "founder-led content",
      "geo agency",
      "executive personal branding",
      "thought leadership",
      "AI search visibility",
      "generative engine optimization",
    ],
    body: buildBody(chartId, flywheelId),
    faq: FAQ.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
  };

  console.log("💾  Creating DRAFT document…");
  const created = await client.create(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    NOTE: this is a DRAFT, it is not live on the site until published.`);
  console.log(`    Studio review: https://${PROJECT_ID}.sanity.studio/structure/insight;insight-mohan-founder-led-content`);

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
