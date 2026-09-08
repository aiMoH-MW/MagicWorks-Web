/**
 * create-mohan-draft-cheapest-lead.mjs
 *
 * Creates "The Cheapest Lead Can Be Your Most Expensive Customer." (author:
 * Mohan Chute, existing author record) as a Sanity DRAFT ONLY — not live.
 * The draft carries its real, future publishedAt value; it is left untouched
 * until promoted to published via scripts/publish-draft.mjs on or after that
 * date.
 *
 * Source: Docs/Blogs/Mohan/MagicWorks_Lead_Economics_Blog_Package/lead-economics-blog/
 *   - the-cheapest-lead-can-be-your-most-expensive-customer.md      (article content)
 *   - assets/cheapest-lead-most-expensive-customer-hero-1280x512.png (cover image)
 *   - assets/cheap-vs-quality-lead-economics.png                     (inline)
 *   - assets/lead-economics-chain.png                                (inline)
 *   - assets/lead-quality-scorecard.png                              (inline)
 *
 * Author "author-mohan-chute" is assumed to already exist in Sanity (created
 * separately) — ensureAuthor() only creates it if truly missing.
 *
 * Run: node scripts/create-mohan-draft-cheapest-lead.mjs
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

const ASSET_DIR = path.join(__dirname, "..", "..", "Docs", "Blogs", "Mohan", "MagicWorks_Lead_Economics_Blog_Package", "lead-economics-blog", "assets");

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

// ════════════════════════════════════════════════════════════════════════════
// BLOG: The Cheapest Lead Can Be Your Most Expensive Customer.
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgCheapVsQuality, imgChain, imgScorecard) {
  resetKey("cl");
  return [
    p("Marketing dashboards make cheap leads look efficient."),
    p("The cost per lead falls from ₹1,500 to ₹500. The graph turns green. The campaign gets more budget. The weekly report calls it a win."),
    p("Sales experiences something else. The new leads do not answer. Their requirements are outside scope. They cannot afford the service. They are students, jobseekers, vendors or people collecting prices. Representatives spend hours calling, researching, updating the CRM and writing proposals for opportunities that never existed."),
    p("The campaign is cheap only because the dashboard stops counting too early."),
    p("Cost per lead measures what marketing paid to create a contact. It does not measure the cost of qualifying that contact, the sales capacity it consumes, the probability of closing, the cost of onboarding, the gross profit of the resulting customer or the opportunity cost of ignoring better prospects."),
    bq("The cheapest lead is not the one with the lowest form-fill cost. It is the one that creates the most profitable customer value for the least total commercial effort."),
    p("That is the invisible lever behind lead generation. The visible number is CPL. The business result is lead economics."),

    h2("The short answer: should you optimise for cost per lead or lead quality?"),
    p("Optimise for profitable customer acquisition, not cost per lead alone. Track the complete chain from media cost to qualified opportunity, sales effort, close rate, onboarding cost, gross margin and retention. A higher-cost lead is economically better when it qualifies more often, closes at a higher rate, needs less sales effort and produces stronger customer value."),
    p("The minimum measurement chain is:"),
    numbered("cost per lead;"),
    numbered("qualification rate;"),
    numbered("cost per qualified lead;"),
    numbered("sales hours per opportunity;"),
    numbered("close rate;"),
    numbered("media and labour cost per customer;"),
    numbered("gross profit and retention by source."),
    p("If marketing can see only the first number, it cannot optimise the business outcome."),

    h2("CPL is not wrong. It is incomplete."),
    p("Cost per lead is useful for diagnosing advertising efficiency. It helps compare creative, keyword, audience, landing page and form performance. The mistake is allowing it to become the final success metric."),
    p("Imagine two campaigns."),
    p("Campaign A generates 200 leads at ₹500 each. Campaign B generates 80 leads at ₹1,500 each. On a lead-volume report, A looks better: more than twice the leads at one-third of the unit cost."),
    p("But suppose A closes 5% and B closes 20%."),
    bulletBold("Campaign A:", "₹500 ÷ 5% = ₹10,000 media cost per customer."),
    bulletBold("Campaign B:", "₹1,500 ÷ 20% = ₹7,500 media cost per customer."),
    p("The “expensive” lead produces a customer for 25% less media spend. That is before counting sales effort."),
    p("Now suppose Campaign A's team must process 20 leads to win one customer, while Campaign B needs five. If each early qualification attempt takes 15 minutes, A consumes five hours just at the first screening stage per win; B consumes 1.25 hours. Add discovery, follow-up and low-probability proposals, and the gap widens."),
    imageBlock(imgCheapVsQuality, "Illustrative ₹500 versus ₹1,500 lead economics comparison"),
    p("These figures are illustrative, not benchmarks. Their purpose is to expose the denominator. A low CPL can coexist with a high cost per sale."),

    h3("The formulas that change the conversation"),
    bp("Cost per qualified lead", "= total campaign cost ÷ qualified leads"),
    bp("Cost per sales opportunity", "= total campaign cost ÷ accepted opportunities"),
    bp("Media cost per customer", "= cost per lead ÷ lead-to-customer close rate"),
    bp("Sales labour cost per customer", "= sales hours attributable to the source × loaded hourly sales cost ÷ customers won"),
    bp("Total acquisition cost", "= media + marketing operations + qualification + sales labour + onboarding incentives + attributable tools and agency cost"),
    bp("Customer contribution", "= revenue minus delivery cost, discounts, refunds and variable support cost"),
    bp("Acquisition payback", "= total acquisition cost ÷ monthly customer contribution"),
    p("Every business will allocate overhead differently. The exact accounting convention matters less than using the same convention across sources and carrying the measurement past the form submission."),

    h2("The lead-economics chain"),
    imageBlock(imgChain, "The lead-economics chain from media cost through qualification, sales effort and close rate to customer value"),

    h3("1. Media cost: what did attention cost?"),
    p("Start with spend, clicks, sessions and lead conversion. These show how well the campaign captured attention and converted it into identifiable demand."),
    p("But segment by the signals that can affect quality: search term, audience, campaign, creative promise, landing page, device, geography and time. “Google Ads lead” is too broad to learn from. A branded search, an urgent problem query and a broad informational query can produce completely different economics."),

    h3("2. Qualification: did a real opportunity exist?"),
    p("A qualified lead has a credible combination of fit, need, intent, authority, economics and readiness. Not every field must be known immediately, but the organisation needs a shared definition."),
    p("Qualification should not mean “sales liked it”. It should be observable enough that marketing, sales and leadership can audit it. Typical disqualifiers include:"),
    bullet("wrong customer segment;"),
    bullet("requirement outside service scope;"),
    bullet("geography or timing the business cannot serve;"),
    bullet("no meaningful business problem;"),
    bullet("no access to a decision process;"),
    bullet("budget structurally below the viable level;"),
    bullet("duplicate, spam, vendor or job enquiry;"),
    bullet("no consent or unreachable contact data."),
    p("Do not treat nurture-ready prospects as bad leads. Separate “not now” from “never a fit”. A serious prospect planning for the next quarter belongs in a lifecycle, not in the rejected bucket."),

    h3("3. Sales effort: what human capacity did the lead consume?"),
    p("Sales time is a real acquisition cost even when it does not appear on the advertising invoice."),
    pLinks([
      { text: "Salesforce's 2024 State of Sales research, based on 5,500 sales professionals in 27 countries, found that representatives reported spending " },
      { text: "70% of their time on non-selling tasks", href: "https://www.salesforce.com/news/stories/sales-ai-statistics-2024/" },
      { text: ". That statistic covers more than lead qualification, but it illustrates how limited genuine selling capacity is. Flooding the team with weak leads converts marketing waste into sales administration." },
    ]),
    p("Track effort by stage:"),
    bullet("attempts to make first contact;"),
    bullet("research before discovery;"),
    bullet("discovery-call time;"),
    bullet("internal solutioning;"),
    bullet("demonstrations;"),
    bullet("proposal and estimate preparation;"),
    bullet("follow-up;"),
    bullet("rework caused by incomplete information;"),
    bullet("handoff and onboarding."),
    p("You do not need invasive minute-by-minute monitoring. A simple activity standard or sampled time study can reveal the difference between sources. If one channel needs three times more touches per qualified opportunity, its cheap CPL is borrowing capacity from sales."),

    h3("4. Close rate: did the lead become revenue?"),
    p("Calculate conversion using consistent stages and time windows. A 90-day sales cycle cannot be evaluated from last week's leads. Use cohorts: leads created in a given month and their outcomes after an appropriate maturation period."),
    p("Separate at least:"),
    bullet("lead to contacted;"),
    bullet("contacted to qualified;"),
    bullet("qualified to accepted opportunity;"),
    bullet("opportunity to proposal;"),
    bullet("proposal to won;"),
    bullet("won to successfully onboarded."),
    p("One blended close rate hides where the system fails. Marketing may be producing suitable demand while response is slow. Sales may accept too many weak opportunities. Proposals may be generic. Pricing may be misaligned. Attribution should support diagnosis, not blame."),

    h3("5. Customer value: did the win create a good customer?"),
    p("The final test is not the signed contract. Some customers buy once and require disproportionate support. Some churn before acquisition cost is recovered. Some pay slowly. Others expand, refer peers and become reference accounts."),
    p("Compare by acquisition source:"),
    bullet("gross margin;"),
    bullet("payment behaviour;"),
    bullet("onboarding effort;"),
    bullet("support load;"),
    bullet("early churn;"),
    bullet("renewal or repeat purchase;"),
    bullet("expansion revenue;"),
    bullet("referral contribution;"),
    bullet("refund, dispute or cancellation rate."),
    p("A channel can produce fewer customers and more profit. That is not underperformance."),

    h2("Why cheap-lead campaigns often become expensive"),

    h3("The message attracts curiosity instead of intent"),
    p("“Free consultation”, “lowest price” or a broad educational promise can increase conversion while weakening self-selection. The campaign delivers what it was asked to deliver: more form fills. The brief never asked for economic fit."),

    h3("The form removes useful friction"),
    p("Fewer fields often improve completion rate. But friction is not automatically bad. The right friction helps serious buyers describe the problem and discourages irrelevant submissions."),
    pLinks([
      { text: "The goal is " },
      { text: "appropriate friction", bold: true },
      { text: ". Ask only what will change routing or the next conversation. For a B2B service, requirement, company, role, urgency and approximate budget band may be more valuable than a long demographic form. For an emergency service, phone and location may matter more than company detail." },
    ]),

    h3("Platforms optimise the event you feed them"),
    p("If an ad platform receives “form submitted” as the primary conversion, it will learn which users are likely to submit forms. It does not know which submissions become profitable customers unless offline outcomes are returned accurately."),
    p("When possible, send deeper lifecycle signals: qualified lead, opportunity created and customer won. Keep consent, platform policy and data governance intact. Do not upload sensitive detail that is unnecessary for optimisation."),

    h3("Marketing and sales use different definitions"),
    p("Marketing reports every valid form. Sales counts only meetings. Leadership counts proposals. Nobody reconciles the transitions. The result is not a data problem alone; it is an operating-agreement problem."),
    p("Create one funnel dictionary. For every stage, define:"),
    bullet("entry condition;"),
    bullet("owner;"),
    bullet("required fields;"),
    bullet("service-level expectation;"),
    bullet("exit condition;"),
    bullet("rejection reasons;"),
    bullet("the date used for cohort reporting."),

    h3("Slow response destroys intent"),
    pLinks([
      { text: "Some leads are poor when sales receives them. Others become poor while waiting. The well-known Harvard Business Review article " },
      { text: "“The Short Life of Online Sales Leads”", href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads" },
      { text: " was published in 2011, so its context is dated, but its central warning remains operationally relevant: companies were often too slow to respond to online enquiries." },
    ]),
    p("Measure lead age at first meaningful attempt, contact rate by response-time band and time to the next useful action. Automation can acknowledge and route. It should not pretend that an automated email is a meaningful sales response."),

    h2("The practical lead-quality scorecard"),
    imageBlock(imgScorecard, "A six-factor lead-quality scorecard covering fit, need, intent, authority, economics and readiness"),
    p("Use a simple 0–2 scale for six dimensions. The score does not replace judgment; it makes judgment discussable."),
    comparisonTable("Weaker signal (0–1)", "Strong signal (2)", [
      { metric: "Fit", a: "0 – Outside ICP or service area / 1 – Partial fit or unclear", b: "2 – Strong ICP and service fit" },
      { metric: "Need", a: "0 – No defined problem / 1 – General interest or mild pain", b: "2 – Specific problem with consequence" },
      { metric: "Intent", a: "0 – Passive browsing / 1 – Comparing or researching", b: "2 – Requested action or urgent next step" },
      { metric: "Authority", a: "0 – No route to decision / 1 – Influencer or unknown group", b: "2 – Decision-maker or clear buying process" },
      { metric: "Economics", a: "0 – Structurally unviable / 1 – Unknown or needs validation", b: "2 – Viable budget/value relationship" },
      { metric: "Readiness", a: "0 – No timeline or prerequisites / 1 – Later-stage nurture", b: "2 – Conditions and timing support action" },
    ]),
    p("Maximum score: 12."),
    p("One practical routing model:"),
    bulletBold("0–3:", "reject, self-serve or redirect;"),
    bulletBold("4–6:", "nurture and enrich;"),
    bulletBold("7–9:", "sales development review;"),
    bulletBold("10–12:", "priority response."),
    p("Do not deploy these thresholds blindly. Back-test them against real wins and losses. In some markets, authority is discovered late. In others, compliance or geography should be a hard gate regardless of total score. A scorecard is valuable only when it predicts downstream outcomes."),

    h3("Add reason codes, not just scores"),
    p("A single number hides the action. A score of six could mean excellent fit but no timing, or urgent intent but no economic viability. Store the six component scores and a primary status reason."),
    p("Reason codes make optimisation possible:"),
    bullet("campaign attracts wrong geography → tighten location targeting;"),
    bullet("good fit, no immediate need → create nurture content;"),
    bullet("strong need, low budget → revisit offer or minimum deal size;"),
    bullet("suitable lead, slow contact → fix routing and capacity;"),
    bullet("many vendor/job enquiries → separate navigation and forms;"),
    bullet("high-score leads lost after proposal → inspect offer, proof and sales process."),

    h2("A worked example: ₹500 leads versus ₹1,500 leads"),
    p("Consider a Pune-based technology services company comparing two monthly campaigns. These numbers are hypothetical."),

    h3("Campaign A: low-CPL lead generation"),
    bulletBold("Spend:", "₹1,00,000"),
    bulletBold("Leads:", "200"),
    bulletBold("CPL:", "₹500"),
    bulletBold("Qualified leads:", "20 (10%)"),
    bulletBold("Customers:", "10 (5% of leads)"),
    bulletBold("Media cost per customer:", "₹10,000"),
    bulletBold("Estimated sales time per customer won:", "6 hours"),
    bulletBold("Average first-year customer contribution:", "₹60,000"),

    h3("Campaign B: narrow high-intent acquisition"),
    bulletBold("Spend:", "₹1,20,000"),
    bulletBold("Leads:", "80"),
    bulletBold("CPL:", "₹1,500"),
    bulletBold("Qualified leads:", "40 (50%)"),
    bulletBold("Customers:", "16 (20% of leads)"),
    bulletBold("Media cost per customer:", "₹7,500"),
    bulletBold("Estimated sales time per customer won:", "2 hours"),
    bulletBold("Average first-year customer contribution:", "₹90,000"),

    p("Campaign A wins the CPL contest. Campaign B wins the business contest."),
    p("If loaded sales cost is ₹1,000 per hour, estimated media-plus-sales cost per win becomes:"),
    bulletBold("Campaign A:", "₹10,000 + ₹6,000 = ₹16,000"),
    bulletBold("Campaign B:", "₹7,500 + ₹2,000 = ₹9,500"),
    p("Before onboarding differences, Campaign B's acquisition cost is roughly 41% lower. Its contribution-to-acquisition ratio is also much stronger:"),
    bulletBold("Campaign A:", "₹60,000 ÷ ₹16,000 = 3.75"),
    bulletBold("Campaign B:", "₹90,000 ÷ ₹9,500 ≈ 9.47"),
    p("The figures are deliberately simple. A real model should include agency cost, tools, management allocation, discounts, bad debt, delivery margin and retention. The point is not the ratio itself. The point is that a CPL dashboard could recommend the wrong campaign."),

    h2("How to build a lead-economics dashboard"),

    h3("Join source data to CRM outcomes"),
    p("Capture campaign, source, medium, landing page, keyword or audience identifier, and click IDs where appropriate. Preserve the first meaningful source and the most recent converting touch if both matter to your model."),
    p("Then connect each lead to:"),
    bullet("qualification status and reason;"),
    bullet("opportunity status;"),
    bullet("expected and actual value;"),
    bullet("sales activity;"),
    bullet("win/loss reason;"),
    bullet("customer and onboarding status;"),
    bullet("contribution or margin where available."),
    p("Do not wait for perfect attribution. Start with a reliable source-to-outcome spine and document what remains unknown."),

    h3("Review cohorts, not mixed-age pipeline"),
    p("A September lead may close in November. Compare sources using cohorts old enough to mature or use stage conversion for recent cohorts with clear caveats."),

    h3("Show volume and quality together"),
    p("Do not replace one simplistic metric with another. Leadership needs:"),
    bullet("lead volume;"),
    bullet("CPL;"),
    bullet("qualification rate;"),
    bullet("cost per qualified lead;"),
    bullet("opportunity rate;"),
    bullet("close rate;"),
    bullet("cost per customer;"),
    bullet("sales effort;"),
    bullet("customer contribution."),
    p("A small channel with excellent economics may not have enough scale. A large channel with moderate economics may still be essential. The dashboard should support allocation, not crown one universal winner."),

    h2("What current sales research reinforces"),
    pLinks([
      { text: "HubSpot's 2025 survey of more than 1,000 global sales professionals reported that " },
      { text: "68% said lead quality had improved year over year", href: "https://blog.hubspot.com/sales/hubspot-sales-strategy-report" },
      { text: ", while fewer than 5% said they prioritised lead scoring among success measures. In the same report, no product fit and poor value for money were the two most frequently cited deal-killers, at 37% and 35% respectively." },
    ]),
    p("Those are self-reported survey findings, not causal laws. But they reinforce a useful management point: teams say quality is improving while formal measurement of quality can remain weak."),
    p("Salesforce's 2024 study found that 86% of B2B buyers were more likely to purchase when companies understood their goals, while 59% said representatives did not take enough time to understand their unique challenges. Again, this is survey evidence. Its practical implication is strong: a pipeline full of poorly understood contacts is not a revenue engine."),

    h2("A 30-day lead-economics reset"),

    h3("Week 1: define the shared funnel"),
    bullet("Agree on lead, qualified lead, accepted opportunity and customer."),
    bullet("Create rejection and loss reasons."),
    bullet("Set the response owner and time standard."),
    bullet("Identify the sources and campaigns that must persist into the CRM."),

    h3("Week 2: measure one mature cohort"),
    bullet("Select a recent cohort old enough to have meaningful outcomes."),
    bullet("Reconcile lead count with CRM records."),
    bullet("Calculate qualification, opportunity and close rates by source."),
    bullet("Sample sales effort for good and poor leads."),

    h3("Week 3: repair signal quality"),
    bullet("Update targeting and negative keywords."),
    bullet("Align campaign promise with the actual offer."),
    bullet("Add appropriate form friction."),
    bullet("Fix routing, duplication and spam controls."),
    bullet("Return qualified or won signals to ad platforms where appropriate."),

    h3("Week 4: reallocate with guardrails"),
    bullet("Protect sources that generate profitable customers."),
    bullet("Reduce spend where low CPL hides weak downstream conversion."),
    bullet("Keep a controlled test budget."),
    bullet("Schedule a monthly marketing-sales quality review."),

    h2("The operating rule"),
    bq("Never celebrate a cheaper lead until you know what happened to it."),
    p("The business does not need marketing and sales to agree that every lead is good. It needs them to agree on evidence: who fits, who needs help, what effort was consumed, what closed, what created value and why."),
    p("Once those outcomes flow back to the campaign, optimisation becomes commercial. The team can decide whether to improve targeting, change the message, add friction, speed response, nurture earlier demand, coach sales or revise the offer."),
    p("Cost per lead still matters. It simply takes its proper place at the beginning of the chain."),

    h2("Want fewer vanity leads and more accountable growth?"),
    pLinks([
      { text: "MagicWorks runs " },
      { text: "Digital Marketing", href: "https://magicworksitsolutions.com/services/digital-marketing" },
      { text: " across performance media, SEO/AEO, content, email and reporting with accountability to business outcomes rather than vanity metrics." },
    ]),
    p("We can help connect acquisition data to qualification and downstream conversion, build a practical quality scorecard, repair campaign signals and create a measurement rhythm your marketing and sales teams can use together."),
    linkPara("", "Book a discovery call", "https://magicworksitsolutions.com/contact", " to review where lead cost and lead value are diverging."),
    pLinks([
      { text: "Part of " },
      { text: "The Invisible Levers", bold: true },
      { text: " series: the visible output gets attention; the less-visible system underneath often decides the result." },
    ]),
  ];
}

const FAQ = [
  { question: "What is a good cost per lead?", answer: "There is no universal good CPL. A CPL is acceptable when the resulting qualification rate, close rate, sales effort, customer margin and retention produce sustainable acquisition economics. Compare it with cost per qualified lead and cost per customer, not an isolated industry average." },
  { question: "What is the difference between CPL and CAC?", answer: "Cost per lead divides campaign cost by leads. Customer acquisition cost divides the total attributable acquisition cost by customers won. CAC can include media, marketing operations, sales labour, tools, incentives and onboarding expense, depending on the organisation's accounting convention." },
  { question: "How do you measure lead quality?", answer: "Use observable dimensions such as customer fit, defined need, intent, decision access, economic viability and readiness. Score each dimension, keep reason codes, and validate the score against opportunity, win, margin and retention outcomes." },
  { question: "Can a higher CPL be better?", answer: "Yes. A higher-CPL source is better when it qualifies and closes more often, consumes less sales effort or produces more valuable customers. In the illustrative example in this article, a ₹1,500 lead creates a lower media cost per customer than a ₹500 lead because its close rate is much higher." },
  { question: "What is cost per qualified lead?", answer: "Cost per qualified lead is total campaign cost divided by leads that meet the agreed qualification definition. It shows how much the business pays for contacts that have credible fit and buying potential." },
  { question: "Should forms have more fields to improve quality?", answer: "Only add fields that change qualification, routing or the next interaction. Appropriate friction can improve self-selection, but unnecessary fields reduce completion and create bad data. Test downstream economics, not form conversion alone." },
  { question: "How should marketing and sales align on lead quality?", answer: "Create shared stage definitions, ownership, response standards, required fields and rejection reasons. Review source-level cohorts together each month and use CRM outcomes to improve targeting, content, routing and sales execution." },
  { question: "How often should lead economics be reviewed?", answer: "Operational indicators such as response and qualification can be reviewed weekly. Allocation decisions should usually use monthly or campaign-cycle cohorts, adjusted for the sales cycle. Customer margin and retention need longer review windows." },
  { question: "What data should be sent back to ad platforms?", answer: "Where technically and legally appropriate, send deeper conversion signals such as qualified lead, opportunity or customer won. Use consented, governed data; minimise sensitive information; and keep internal reporting as the source of truth." },
  { question: "How can MagicWorks improve lead quality?", answer: "MagicWorks can audit acquisition sources, tracking, landing pages, forms, qualification, CRM handoffs and downstream outcomes; then optimise campaigns against the commercial measures that matter. The engagement can sit within a focused project or a wider full-funnel digital marketing programme." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "The Cheapest Lead Can Be Your Most Expensive Customer.";
const SLUG = "cheapest-lead-most-expensive-customer";
const EXCERPT = "Why a low CPL can hide high sales effort and poor conversion, plus a practical lead-economics model and quality scorecard for better growth decisions.";
const SEO_TITLE = "Lead Quality vs Cost per Lead: Measure the Real Cost";
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

  const heroId = await uploadImage("cheapest-lead-most-expensive-customer-hero-1280x512.png");
  const cheapVsQualityId = await uploadImage("cheap-vs-quality-lead-economics.png");
  const chainId = await uploadImage("lead-economics-chain.png");
  const scorecardId = await uploadImage("lead-quality-scorecard.png");

  const DRAFT_ID = "drafts.insight-mohan-cheapest-lead-most-expensive-customer";

  const doc = {
    _id: DRAFT_ID,
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["digital-marketing"],
    pillar: "digital-marketing",
    publishedAt: "2026-09-21T03:30:00.000Z",
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "Two lead journeys showing a cheap lead creating waste while a higher-cost qualified lead produces customer value",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "lead economics",
      "cost per qualified lead",
      "customer acquisition cost",
      "lead quality scorecard",
      "B2B lead generation India",
      "marketing sales alignment",
    ],
    body: buildBody(cheapVsQualityId, chainId, scorecardId),
    faq: FAQ.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
  };

  console.log("💾  Creating DRAFT document (not published)…");
  const created = await client.createOrReplace(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    Scheduled publishedAt: ${doc.publishedAt}`);
  console.log(`    Studio review URL: https://${PROJECT_ID}.sanity.studio/structure/insight;insight-mohan-cheapest-lead-most-expensive-customer`);
  console.log(
    "\nTo publish this draft later, run:\n" +
      "  node scripts/publish-draft.mjs insight-mohan-cheapest-lead-most-expensive-customer\n"
  );

  console.log("\n🎉  Done. Draft created, not published.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
