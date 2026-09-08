/**
 * create-mohan-draft-brand-guideline.mjs
 *
 * Creates "A Brand Guideline Nobody Uses Is Just a PDF." (author: Mohan Chute,
 * existing author record) in Sanity as a DRAFT ONLY — not visible on the live
 * site until promoted. It will be published later via a scheduled reminder.
 *
 * Source: Docs/Blogs/Mohan/MagicWorks_Operational_Brand_System_Blog_Package/operational-brand-system-blog/
 *   - a-brand-guideline-nobody-uses-is-just-a-pdf.md               (article content)
 *   - assets/brand-guideline-operational-system-hero-1280x512.png  (cover image)
 *   - assets/brand-operating-system-flow.png                      (inline)
 *   - assets/brand-system-audit.png                                (inline)
 *   - assets/documented-vs-operational-brand.png                   (inline)
 *
 * Run: node scripts/create-mohan-draft-brand-guideline.mjs
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

const ASSET_DIR = path.join(__dirname, "..", "..", "Docs", "Blogs", "Mohan", "MagicWorks_Operational_Brand_System_Blog_Package", "operational-brand-system-blog", "assets");

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
// BLOG: A Brand Guideline Nobody Uses Is Just a PDF.
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgFlow, imgAudit, imgDocVsOp) {
  resetKey("bg");
  return [
    p("The launch of a new brand guideline is usually beautiful."),
    p("There is a presentation. The logo sits inside a perfect exclusion zone. The colour palette has elegant names. The typography pages are clean. The voice is “bold, human and trustworthy”. Everyone approves the PDF. It is uploaded to a shared drive."),
    p("Then everyday work resumes."),
    p("Sales copies last year's proposal. HR makes a recruitment post in Canva. A regional team downloads an old logo from WhatsApp. The website agency invents a new button style. An executive asks an AI tool to make the copy “more professional”. Video uses another font because the editor does not have the licensed typeface. The guideline remains technically correct and operationally absent."),
    p("Six months later, the brand team asks why the organisation is inconsistent."),
    p("The problem is not that people dislike the brand. The problem is that the brand exists as documentation while the work happens somewhere else."),

    bq("A guideline creates value only when it changes a real decision at the moment that decision is made."),
    p("That is the invisible lever. The visible asset is the PDF. The business asset is the operating system around it."),

    h2("The short answer: how do you make brand guidelines usable?"),
    p("Turn the guidelines into an operational brand system: a shared set of principles, decision rules, approved assets, reusable templates, workflow guardrails, ownership and feedback. Put each rule inside the tools and moments where teams create websites, proposals, presentations, social posts, videos, emails and documents."),
    p("A usable system has five layers:"),
    numberedBold("Principles", "explain what the brand promises and why."),
    numberedBold("Rules", "translate that promise into verbal, visual and behavioural choices."),
    numberedBold("Tools", "make the correct choice easy through assets, tokens, examples and templates."),
    numberedBold("Workflows", "define ownership, approvals and exceptions."),
    numberedBold("Feedback", "shows what people use, where they struggle and what should evolve."),
    p("The test is not “Do we have guidelines?” It is “Can the people producing common work make the right choice quickly, without waiting for the brand team?”"),

    h2("Why the PDF model breaks"),
    p("A PDF is a delivery format. It is not a deployment model."),
    p("It works well for telling the complete story of a brand, recording decisions and giving partners a reference. It works poorly as the only interface for hundreds of small choices."),
    p("A marketing executive creating a LinkedIn post does not want to search page 68 for image guidance. A salesperson replying to an RFP does not need a philosophical paragraph about “confidence”; she needs the current proposal template, approved proof and three examples of how confidence sounds. A developer needs colour tokens, component states and accessibility rules—not a screenshot of the palette."),
    p("Static guidelines commonly fail for six reasons:"),
    bullet("people cannot find the current version;"),
    bullet("rules describe identity but not decisions;"),
    bullet("examples cover launch assets, not everyday outputs;"),
    bullet("tools do not contain approved components;"),
    bullet("approval is either absent or required for everything;"),
    bullet("nobody measures usage, exceptions or rework."),
    p("None of these is a graphic-design problem. They are operating-system problems."),

    h2("Brand consistency is a workflow outcome"),
    p("Consistency is often discussed as discipline: people should “follow the brand”. That language hides the design responsibility of the organisation."),
    p("If ten people independently make the same mistake, the system probably invited it. Perhaps the rule was ambiguous, the correct asset was hard to find, the template could not handle a real use case, or the approval queue was too slow."),
    pLinks([
      { text: "Older benchmark research makes this point unusually clearly. Demand Metric's 2016 brand-consistency study found that firms with formal guidelines that were enforced were " },
      { text: "more than twice as likely to report consistent brand presentation", href: "https://d2slcw3kip6qmk.cloudfront.net/marketing/press/webinar/The-Impact-of-Brand-Consistency-Report-New_Cover.pdf" },
      { text: ". Yet 42% of organisations with consistently enforced formal guidelines still reported some non-conforming materials being deployed. Only 40% of participants rated their guidelines good or very good for findability." },
    ]),
    p("The study is a decade old and survey-based, so it should not be treated as a current revenue forecast. Its operational lesson remains relevant: guidelines help, but enforcement, access and usability decide whether they work."),
    p("That same report found that 71% of participants experiencing inconsistency cited market confusion as a negative impact. Respondents with inconsistency issues estimated an average 23% revenue upside from always presenting the brand consistently. That 23% is a self-reported estimate, not measured causation; it should never be turned into a guaranteed ROI claim. The safer conclusion is that organisations themselves connect consistency with commercial performance."),

    h2("Documented brand versus operational brand"),
    imageBlock(imgDocVsOp, "Comparison of a documented brand stored in a PDF with an operational brand embedded in work"),
    comparisonTable("Documented brand", "Operational brand", [
      { metric: "Access", a: "A file exists somewhere", b: "Current guidance appears where work happens" },
      { metric: "Voice", a: "Adjectives describe tone", b: "Patterns, examples and forbidden moves guide writing" },
      { metric: "Visual design", a: "Colours, fonts and logo rules are listed", b: "Tokens, components and templates encode them" },
      { metric: "Proof", a: "Claims are discussed generally", b: "Approved facts, sources and case evidence are maintained" },
      { metric: "Governance", a: "Everything needs approval or nothing does", b: "Risk tiers define autonomy and review" },
      { metric: "Partners", a: "A PDF is emailed at kickoff", b: "A usable kit, owner and acceptance checklist are supplied" },
      { metric: "Learning", a: "Updated during a rebrand", b: "Usage, exceptions and performance improve the system" },
    ]),
    p("The operational brand does not eliminate judgment. It reserves judgment for decisions that deserve it."),

    h2("The five-layer brand operating system"),
    imageBlock(imgFlow, "Five-layer brand operating system from principles and rules through tools, workflows and feedback"),

    h3("1. Principles: the few ideas that should survive every format"),
    p("Principles connect brand choices to business strategy. They answer:"),
    bullet("Who are we valuable to?"),
    bullet("What promise are we making?"),
    bullet("What do we believe that competitors do not express as clearly?"),
    bullet("What must people feel, understand or do after encountering us?"),
    bullet("Which trade-offs will we make consistently?"),
    p("“Modern” is not a useful principle. “Explain complexity without making the customer feel uninformed” is. It guides copy, sales behaviour, diagrams, onboarding and support."),
    p("Keep the principle set small enough to remember. If every desirable quality becomes a value, none can resolve a conflict."),

    h3("2. Rules: convert identity into choices"),
    p("Rules should answer repeated questions."),
    bp("Verbal rules", "may cover:"),
    bullet("sentence length and reading level;"),
    bullet("preferred terminology;"),
    bullet("claim and evidence standards;"),
    bullet("voice by situation;"),
    bullet("calls to action;"),
    bullet("inclusive language;"),
    bullet("how AI-assisted text must be reviewed."),
    bp("Visual rules", "may cover:"),
    bullet("logo variants and minimum size;"),
    bullet("colour roles and contrast;"),
    bullet("typography hierarchy;"),
    bullet("spacing and layout rhythm;"),
    bullet("image selection and treatment;"),
    bullet("illustration, icon and data-visualisation style;"),
    bullet("motion and video principles;"),
    bullet("accessible states for digital products."),
    p("The strongest rules include a decision, a reason, a correct example and a tempting incorrect example. “Use plenty of whitespace” is subjective. “Keep one primary action per campaign landing-page section; secondary actions use text links” is operational."),

    h3("3. Tools: make compliance faster than improvisation"),
    p("The brand becomes real through reusable objects:"),
    bullet("master logos and export variants;"),
    bullet("colour and typography tokens;"),
    bullet("website components;"),
    bullet("presentation masters;"),
    bullet("proposal and report templates;"),
    bullet("social formats;"),
    bullet("email signatures;"),
    bullet("video titles and lower-thirds;"),
    bullet("image prompts and selection examples;"),
    bullet("approved company descriptions;"),
    bullet("product naming and proof libraries;"),
    bullet("AI prompt blocks with voice, facts and review requirements."),
    pLinks([
      { text: "Frontify's 2024 analysis of anonymised platform data from Q1 2022 to Q1 2024 illustrates the scale of this problem. Across its dataset, total stored brand assets grew " },
      { text: "458% over three years", href: "https://info.frontify.com/hubfs/2024-07-Brand_building_trends_report-en.pdf" },
      { text: ", while unique downloaded assets grew 357%. Template publications increased 42% from Q1 2023 to Q1 2024, and the average template was published 32.5 times." },
    ]),
    p("Those are Frontify-platform usage figures, not the whole market. They still show why a once-a-year PDF is an inadequate response to an expanding asset environment. Reuse must be designed."),

    h3("4. Workflows: place guardrails around risk"),
    p("Not every output deserves brand-team approval."),
    p("Create three risk tiers:"),
    comparisonTable("Examples", "Operating model", [
      { metric: "Low", a: "Routine social post, internal deck, standard proposal", b: "Self-serve template and checklist" },
      { metric: "Medium", a: "Campaign concept, new landing page, partner collateral", b: "Named reviewer at a defined stage" },
      { metric: "High", a: "New product naming, legal claim, corporate narrative, rebrand", b: "Senior brand, legal and leadership review" },
    ]),
    p("This avoids two extremes. Complete freedom creates drift. Central approval for everything creates delay, workarounds and resentment."),
    p("For each recurring output, define:"),
    bullet("owner;"),
    bullet("approved starting template;"),
    bullet("source of current facts;"),
    bullet("required review;"),
    bullet("turnaround expectation;"),
    bullet("storage location;"),
    bullet("version and retirement rule."),
    p("Governance is not control for its own sake. It is clarity about where teams may move quickly and where the cost of inconsistency is high."),

    h3("5. Feedback: treat brand as maintained infrastructure"),
    p("A living brand system changes when evidence changes."),
    p("Track:"),
    bullet("most and least used assets;"),
    bullet("failed searches;"),
    bullet("frequent template overrides;"),
    bullet("common approval corrections;"),
    bullet("production and approval time;"),
    bullet("repeated partner questions;"),
    bullet("content performance by pattern;"),
    bullet("accessibility defects;"),
    bullet("outdated claims and screenshots;"),
    bullet("new channels not covered by current rules."),
    p("Frontify reported that 20% of searches on its platform returned no results in 2024. A failed brand-library search is not a small analytics event. It is a clue that a user may improvise, reuse an outdated asset or interrupt the brand team."),

    h2("The voice section must do more than list adjectives"),
    p("Many guidelines say the brand is “human, bold, trustworthy and innovative”. Competitors say the same thing. The words are aspirations, not instructions."),
    p("A usable voice system includes:"),

    h3("Voice principles"),
    p("For example:"),
    bulletBold("Clear before clever:", "explain the decision before decorating the sentence."),
    bulletBold("Specific before superlative:", "use proof instead of “best”, “leading” or “world-class”."),
    bulletBold("Confident without certainty theatre:", "state what is known, assumed and recommended."),
    bulletBold("Human without forced informality:", "write naturally; do not manufacture slang."),

    h3("Situation matrix"),
    p("The brand should not sound identical everywhere."),
    comparisonTable("Emphasis", "Avoid", [
      { metric: "Homepage", a: "Clear promise and evidence", b: "Internal jargon" },
      { metric: "Proposal", a: "Specificity, scope and decisions", b: "Vague enthusiasm" },
      { metric: "Support issue", a: "Ownership, calm and next action", b: "Campaign language" },
      { metric: "Thought leadership", a: "Point of view and nuance", b: "Generic summaries" },
      { metric: "Social post", a: "One idea and natural voice", b: "Compressed corporate brochure copy" },
      { metric: "AI-generated draft", a: "Grounded facts and human review", b: "Invented claims or synthetic polish" },
    ]),

    h3("Before-and-after examples"),
    p("Do not merely say “avoid jargon”. Show a real paragraph rewritten in the brand voice and explain why. Examples compress interpretation time better than another adjective."),

    h2("Design systems and brand systems are related, not identical"),
    p("A digital design system manages reusable interface components, states and implementation rules. A brand system covers a wider set of expressions and behaviours: voice, proof, imagery, presentations, video, documents, spaces and service interactions."),
    p("They should share foundations:"),
    bullet("colour tokens;"),
    bullet("typography;"),
    bullet("iconography;"),
    bullet("spacing principles;"),
    bullet("accessible contrast;"),
    bullet("motion behaviour;"),
    bullet("naming conventions;"),
    bullet("version governance."),
    p("If the website uses one source of truth and the campaign team uses another, inconsistency is built into the organisation. Brand and product teams do not need one tool, but they need aligned rules and explicit ownership."),

    h2("A practical example: the proposal that escapes the PDF"),
    p("Imagine a mid-market services company with a polished 90-page guideline. Its sales team creates 25 proposals a month."),
    p("The guideline specifies colours, fonts and tone. It does not include a maintained proposal master, approved proof statements, pricing-table logic or case-study modules. Each salesperson copies an old file. The brand team corrects covers and fonts near the deadline. Scope language varies. Old client counts remain in circulation."),
    p("The operational redesign includes:"),
    numbered("one proposal master with locked styles and flexible sections;"),
    numbered("approved company and service descriptions;"),
    numbered("a proof library with source, owner and review date;"),
    numbered("case-study modules by industry;"),
    numbered("standard pricing and assumption tables;"),
    numbered("a voice checklist for executive summary and scope;"),
    numbered("one medium-risk review before PDF export;"),
    numbered("an archive rule that removes obsolete versions."),
    p("The guideline has not disappeared. Its decisions have entered the workflow."),
    p("Assume, illustratively, that the team previously spent 90 minutes formatting and correcting each proposal. A reusable system reduces this to 30 minutes. At 25 proposals a month, that is 25 hours returned monthly. This is not a promised benchmark; it is the kind of operating value a brand system should measure."),
    p("The larger benefit may be decision quality: clearer scope, current proof, consistent positioning and fewer avoidable reviews."),

    h2("The lightweight brand-system audit"),
    imageBlock(imgAudit, "Six-part audit for findability, decision coverage, reusability, adoption, quality control and evolution"),
    p("Score each dimension 0, 1 or 2 using evidence."),

    h3("1. Findability"),
    bulletBold("0:", "users rely on old folders, chat attachments or colleagues."),
    bulletBold("1:", "a source exists but search and version clarity are inconsistent."),
    bulletBold("2:", "current guidance and assets are easy to find at the moment of need."),

    h3("2. Decision coverage"),
    bulletBold("0:", "guidelines are mostly descriptive."),
    bulletBold("1:", "some common decisions are covered."),
    bulletBold("2:", "priority workflows have specific rules, examples and exceptions."),

    h3("3. Reusability"),
    bulletBold("0:", "teams create from blank files or old outputs."),
    bulletBold("1:", "templates exist but are incomplete or hard to adapt."),
    bulletBold("2:", "maintained components and templates cover recurring work."),

    h3("4. Adoption"),
    bulletBold("0:", "use depends on individual enthusiasm."),
    bulletBold("1:", "the core brand team uses the system."),
    bulletBold("2:", "sales, HR, product, partners and agencies use role-relevant tools."),

    h3("5. Quality control"),
    bulletBold("0:", "everything or nothing is reviewed."),
    bulletBold("1:", "review exists but timing and ownership vary."),
    bulletBold("2:", "risk tiers, owners, service levels and exception paths are clear."),

    h3("6. Evolution"),
    bulletBold("0:", "updates happen only during redesigns."),
    bulletBold("1:", "feedback is collected informally."),
    bulletBold("2:", "usage data, errors and new needs drive planned updates."),

    p("Maximum score: 12. The number is less important than the evidence. Review sampled outputs from the website, sales, social, HR, video and leadership communications. Interview creators, not only approvers."),

    h2("A 90-day transition from PDF to operating system"),

    h3("Days 1–30: observe the real brand"),
    bullet("Collect 30–50 recent outputs across teams."),
    bullet("Identify repeated decisions and recurring defects."),
    bullet("Find every place old assets circulate."),
    bullet("Interview creators about delays and workarounds."),
    bullet("Rank workflows by frequency, visibility and risk."),

    h3("Days 31–60: operationalise three priority workflows"),
    bullet("Convert rules into decision examples."),
    bullet("Build or repair templates and components."),
    bullet("Create approved copy and proof modules."),
    bullet("Define ownership and review tiers."),
    bullet("Place tools inside the platforms teams already use."),

    h3("Days 61–90: launch, measure and retire"),
    bullet("Train teams on real tasks, not a guideline tour."),
    bullet("Archive obsolete assets."),
    bullet("Track template use, failed searches and corrections."),
    bullet("Hold short office hours for exceptions."),
    bullet("Publish a change log and next update cycle."),

    p("Do not attempt to operationalise everything at once. Start with the outputs that combine high volume and high consequence: proposals, campaign landing pages, social templates, executive presentations or product UI."),

    h2("Common mistakes"),

    h3("Making the guideline longer instead of more usable"),
    p("Another 40 pages will not fix a missing proposal template. Add depth only where it changes a decision."),

    h3("Designing for the brand team"),
    p("The brand team already understands the intent. Design the system for the salesperson, recruiter, developer, editor and partner working under time pressure."),

    h3("Locking everything"),
    p("Templates that cannot accommodate real work are abandoned. Define the protected core and the flexible zones."),

    h3("Treating AI as a brand shortcut"),
    p("AI can apply patterns, generate variants and check drafts, but only if it receives current rules, approved facts, examples and review requirements. A prompt that says “use our tone” is not governance."),

    h3("Ignoring retirement"),
    p("Publishing a new asset without removing the old one creates a choice. People will choose the familiar version. Archive visibly, redirect links and communicate the change."),

    h2("The operating rule"),
    bq("If a rule matters, put it where the decision happens."),
    p("The brand guideline should remain the coherent source story. But the organisation needs many practical interfaces to that story: a component for developers, a template for sales, a prompt block for writers, an asset library for agencies and a risk rule for approvers."),
    p("The best brand system does not make every output identical. It makes the organisation recognisable while allowing the right variation for channel, audience and context."),
    p("That is how a brand becomes more than a PDF."),

    callout(
      "Build Brand Assets Your Team Keeps Using",
      "MagicWorks' Brand, Research & Publishing practice creates brand guidelines, whitepapers, playbooks and recurring content systems designed for continued use after delivery. We can audit how the brand appears across your website, decks, social output and collateral, then turn recurring decisions into usable rules, templates and a practical governance model.",
      "key-takeaway"
    ),
    linkPara("Ask about a ", "Brand Audit", "/services/brand-research-publishing", ", or"),
    linkPara("", "book a discovery call", "/contact", "."),

    p("Part of The Invisible Levers series: the visible output gets attention; the less-visible system underneath often decides the result."),
  ];
}

const FAQ = [
  { question: "What is an operational brand system?", answer: "An operational brand system combines principles, rules, approved assets, templates, workflow governance and feedback so teams can make consistent brand decisions during everyday work. It turns a static guideline into maintained organisational infrastructure." },
  { question: "Are PDF brand guidelines still useful?", answer: "Yes. A PDF can record the complete brand story and serve as a portable reference. It becomes insufficient when it is the only way people access rules. Important decisions should also be embedded in templates, components, libraries, tools and workflows." },
  { question: "Why do employees ignore brand guidelines?", answer: "Common reasons include poor findability, vague rules, missing examples, obsolete assets, incomplete templates and slow approvals. Repeated non-compliance often indicates a system design problem, not a motivation problem." },
  { question: "What should brand guidelines include?", answer: "Include positioning and principles, voice, messaging, logo, colour, typography, imagery, layouts, accessibility, channel examples, proof standards, governance and ownership. Prioritise guidance that resolves frequent or high-risk decisions." },
  { question: "How do you measure brand-guideline adoption?", answer: "Measure active users, template and asset use, failed searches, approval corrections, production time, outdated-asset incidents, training completion and sampled output compliance. Combine usage analytics with creator interviews." },
  { question: "What is the difference between a brand system and a design system?", answer: "A design system primarily supports digital product interfaces through components and implementation rules. A brand system governs the wider expression and behaviour of the organisation, including voice, proof, imagery, documents, campaigns, video and service interactions." },
  { question: "How often should brand guidelines be updated?", answer: "Review critical facts and assets continuously and schedule a structured review at least annually or when strategy, products, audience or channels change. Operational systems benefit from smaller versioned updates rather than rare complete rewrites." },
  { question: "Can AI help enforce brand consistency?", answer: "AI can generate variants, retrieve guidance and flag potential deviations, but it needs approved facts, examples, permissions and human review. It should operate inside the brand system, not replace ownership or judgment." },
  { question: "What is a brand audit?", answer: "A brand audit compares the intended brand with real outputs and workflows. It examines consistency, relevance, findability, templates, governance and adoption across channels, then prioritises changes by business impact." },
  { question: "How can MagicWorks help operationalise brand guidelines?", answer: "MagicWorks can audit existing brand use, create or revise guidelines, build practical templates and content systems, and define an adoption and governance plan. The goal is a useful asset that continues shaping work after delivery." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "A Brand Guideline Nobody Uses Is Just a PDF.";
const SLUG = "brand-guideline-nobody-uses-operational-brand-system";
const EXCERPT = "A practical framework for turning static brand guidelines into templates, workflows, governance and feedback your team uses every day.";
const SEO_TITLE = "Turn Brand Guidelines Into an Operational Brand System";
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

  const heroId = await uploadImage("brand-guideline-operational-system-hero-1280x512.png");
  const flowId = await uploadImage("brand-operating-system-flow.png");
  const auditId = await uploadImage("brand-system-audit.png");
  const docVsOpId = await uploadImage("documented-vs-operational-brand.png");

  const draftId = "drafts.insight-mohan-brand-guideline-operational-brand-system";

  const doc = {
    _id: draftId,
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["industry-insights"],
    pillar: "brand-research-publishing",
    publishedAt: "2026-09-28T03:30:00.000Z",
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "A static brand guideline transforming into a living system of websites, proposals, social posts, presentations and video",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "brand guidelines adoption",
      "brand consistency",
      "brand governance",
      "brand templates",
      "brand management system",
      "brand audit India",
    ],
    body: buildBody(flowId, auditId, docVsOpId),
    faq: FAQ.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
  };

  console.log("💾  Creating DRAFT document (not published)…");
  const created = await client.createOrReplace(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    Studio review: https://${PROJECT_ID}.sanity.studio/structure/insight;insight-mohan-brand-guideline-operational-brand-system`);
  console.log("    This post is a DRAFT ONLY — it will not appear on the live site until promoted/published.");

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
