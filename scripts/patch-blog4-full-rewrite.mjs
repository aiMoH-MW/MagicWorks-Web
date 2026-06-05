/**
 * patch-blog4-full-rewrite.mjs
 *
 * Full rewrite of "The Real Cost of AI in Indian Marketing and Sales" blog post.
 * Source: Blog4_Real_Cost_of_AI_with_images (1).docx
 *
 * Updates: body (PortableText), faq, excerpt, seoTitle, tags
 * Preserves: existing cover image, slug, author, publishedAt, category
 *
 * Run: node scripts/patch-blog4-full-rewrite.mjs
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

// ── Image blocks (existing CDN URLs from patch-ai-cost-images.mjs) ─────────────
const CDN = "https://images.berqwp.com/?domain=magicworksitsolutions.com&w=300&mw=1920&q=90&url=";
const WP  = "https://magicworksitsolutions.com/wp-content/uploads/2026/05/";
const enc = (f) => CDN + encodeURIComponent(WP + f);

const IMG_MATRIX = {
  _type: "externalImage", _key: k("img"),
  url: enc("5-use-case-comparison-matrix.webp"),
  alt: "Comparison matrix of 5 AI use cases for Indian marketing and sales in 2026: AI Chatbot Deployment (₹3–25L, 8–14 months, High hidden cost intensity), Marketing Automation+AI (₹8–50L, 12–18 months, Very High), Sales Enablement+Conversation Intel (₹6–40L, 9–15 months, High), AI Content Production (₹2–15L, 4–8 months, Medium), AI Analytics & Reporting (₹5–30L, 6–12 months, Medium).",
  caption: "Five AI use cases compared by budget range, realistic payback timeline, hidden cost intensity, and best-fit business profile.",
};

const IMG_ICEBERG = {
  _type: "externalImage", _key: k("img"),
  url: enc("ai-cost-iceberg.webp"),
  alt: "The AI cost iceberg: platform licence at 25–35% of total is visible. Hidden below: integration 150–200% of platform cost, implementation 20–50%, team training ₹30K–₹1.5L, multilingual layer 20–30% premium, LLM API usage 30–50% of ongoing cost, annual maintenance 15–30% of initial cost.",
  caption: "Vendor pricing pages show only 25–35% of true first-year cost. The remaining 65–75% is hidden below the waterline.",
};

const IMG_HUBSPOT = {
  _type: "externalImage", _key: k("img"),
  url: enc("hubspot-vs-salesforce-tco.webp"),
  alt: "First-Year TCO comparison for a typical mid-sized Indian business (20 sales users + 5 marketing users): HubSpot Professional ₹35–60 lakh vs Salesforce Marketing Cloud ₹80 lakh–1.5 crore. The 2–3x gap is driven almost entirely by hidden operational costs, not licence fees. Per Avidly Agency 2026 research.",
  caption: "HubSpot Professional vs Salesforce Marketing Cloud TCO. The 2–3× gap is in hidden operational costs, not licences. Per Avidly Agency 2026 research.",
};

const IMG_PROBABILITY = {
  _type: "externalImage", _key: k("img"),
  url: enc("probability-weighted-ai-cost.webp"),
  alt: "Probability-weighted expected value: a ₹15 lakh AI project has 95% probability of zero measurable return (MIT Project NANDA) and 5% probability of 3–5x return, producing a net expected return of −₹10 to −₹12 lakh.",
  caption: "The probability-weighted math shows most AI investments have a negative expected return without proper shutdown discipline. MIT Project NANDA: 95% of enterprise GenAI pilots produce no measurable return.",
};

// ── Full body ─────────────────────────────────────────────────────────────────
function buildBody() {
  return [

    // ── Short Answer ──────────────────────────────────────────────────────────
    h2("The Short Answer"),
    p("Most Indian businesses evaluating AI in 2026 are working with bad cost data. Vendor pricing pages typically show 25 to 35 percent of true first-year cost. Gartner found that more than 53 percent of AI projects take longer than expected to deliver ROI. MIT’s Project NANDA found that 95 percent of enterprise generative AI pilots produce no measurable business return despite $30 to $40 billion in global spending. Total cost of ownership over three years runs roughly 1.5 to 2 times the initial build cost once maintenance, integration, and operational overhead are included."),
    p("This blog publishes honest rupee budgets across five specific AI use cases that Indian marketing and sales teams are evaluating right now: chatbot deployment, marketing automation with AI personalisation, sales enablement and conversation intelligence, AI content production, and AI-driven analytics. Each use case includes the realistic Indian rupee budget tiers, the hidden costs that almost never appear in vendor quotes, the payback timelines for Indian businesses specifically, and the honest ‘is this worth it’ verdict for businesses at different scales."),
    p("The guide is written for Indian CEOs, founders, CFOs, and senior marketing and sales leaders making budget decisions in 2026, with education sector decision-makers as the priority audience because that is where the cost discipline question is most urgent."),

    sr(
      { value: "95%", label: "of GenAI pilots fail to deliver ROI", note: "MIT Project NANDA, 2025" },
      { value: "25–35%", label: "of true cost shown on vendor pricing pages", note: "upGrowth, May 2026" },
      { value: "1.5–2×", label: "total 3-year TCO vs initial build cost", note: "Uvik Software, 2026" },
    ),

    // ── What This Article Covers ──────────────────────────────────────────────
    h2("What This Article Covers"),
    li("Why the AI cost conversation is broken in Indian business in 2026"),
    li("Use Case 1: AI-powered chatbot deployment (₹3 to 25 lakh range)"),
    li("Use Case 2: Marketing automation with AI personalisation (₹8 to 50 lakh range)"),
    li("Use Case 3: AI sales enablement and conversation intelligence (₹6 to 40 lakh range)"),
    li("Use Case 4: AI-powered content production (₹2 to 15 lakh range)"),
    li("Use Case 5: AI-driven analytics and reporting (₹5 to 30 lakh range)"),
    li("The hidden 95 percent cost: probability-weighted AI investment math"),
    li("What good cost discipline looks like: a practical framework"),
    li("Frequently asked questions about AI cost in Indian business in 2026"),

    IMG_MATRIX,

    // ── Section 1 ─────────────────────────────────────────────────────────────
    h2("1. Why the AI Cost Conversation is Broken in Indian Business in 2026"),
    p("The single most common conversation I have with Indian CEOs in 2026 starts the same way. They tell me they evaluated an AI tool, the vendor quoted them a number, and they want to know if that number is real. The honest answer almost every time is: the number is technically accurate, but it represents 25 to 35 percent of what you will actually spend in year one."),
    p("There are three structural reasons Indian businesses are working with bad AI cost data in 2026. Naming them clearly is the first step to making better investment decisions."),

    h3("Reason 1: Vendor Pricing Pages Show 25 to 35 Percent of True Cost"),
    p("The platform license is the entry fee. It is not the bill. Research from upGrowth’s May 2026 India marketing automation pricing analysis found that platform costs typically represent only 25 to 35 percent of total first-year cost for enterprise marketing tools. Implementation, integration, change management, and ongoing operational costs make up the rest."),
    p("Teams that buy platforms without accounting for the other 65 to 75 percent typically stall within 90 days and churn the license inside 12 months. We see this pattern across MagicWorks client conversations almost weekly. A founder signs up for a tool based on the sticker price, runs into the integration and adoption work three months later, and concludes that AI does not work for their business. The technology was fine. The budget was missing two-thirds of the actual requirement."),

    IMG_ICEBERG,

    pq("The platform license is the entry fee, not the bill. Teams that buy platforms without accounting for the other 65 to 75 percent of true cost typically stall within 90 days and churn the license inside 12 months."),

    h3("Reason 2: Global Cost Benchmarks Do Not Translate Cleanly to India"),
    p("When you read ‘enterprise AI chatbot costs $50,000 to $400,000’ in a global report, that figure maps poorly to Indian market reality. Indian deployments operate under different cost structures driven by three factors."),
    p("First, labor cost arbitrage means implementation and ongoing operations cost 40 to 70 percent less than equivalent Western deployments. Second, multilingual requirements add complexity that most global tools handle poorly, often requiring local partner build on top of vendor platforms. Third, the DPDP Act 2023 creates compliance requirements that affect tool selection and data localisation costs in ways global benchmarks do not capture."),
    p("The net effect: Indian AI deployments often cost 30 to 50 percent less in absolute rupees than the global benchmark would suggest, but with a different cost mix and a different risk profile. CEOs who use global benchmarks directly tend to either over-budget for tools or under-budget for integration and ongoing operations."),

    h3("Reason 3: The ‘AI is Getting Cheaper’ Narrative Obscures the Real Story"),
    p("Model API costs are genuinely falling. Implementation, integration, and ongoing operational costs are rising. The net total cost of ownership for production AI is roughly flat or slightly increasing in 2026. The CEO who reads that ‘AI is getting cheaper’ and budgets accordingly is consistently surprised by the real bills."),
    p("Per research from Uvik’s 2026 AI development cost analysis, total cost of ownership over three years typically runs 1.5 to 2 times the initial build cost once you include maintenance, retraining, compute, and integration upkeep. Data preparation alone often accounts for 30 to 50 percent of total cost in year one and is consistently the most underestimated line item."),

    h3("The Transparency Frame for This Blog"),
    p("What follows is the honest cost data across five specific AI use cases that Indian marketing and sales teams are evaluating in 2026. Each use case includes both verified industry benchmarks and the general patterns we see across MagicWorks client work. No client names. No exact rupee figures from any single engagement. Just the realistic ranges, the hidden costs that almost never appear in vendor quotes, and the operator verdict on whether the math works for businesses at different scales."),

    // ── Section 2: Chatbot ────────────────────────────────────────────────────
    h2("2. Use Case 1: AI-Powered Chatbot Deployment (₹3 to 25 Lakh Range)"),
    p("The most-requested AI use case in Indian businesses in 2026, also the most consistently miscosted. Vendor pitches start at ₹50,000. Real deployments at meaningful scale typically cost 6 to 20 times that figure once you account for integration, multilingual support, training, and ongoing operations."),

    h3("The Honest Cost Tiers for Indian Businesses in 2026"),
    p("Per Brainguru Technologies’ April 2026 India pricing research and the patterns we see across MagicWorks client deployments, Indian AI chatbot investments cluster into three distinct tiers."),

    co("Chatbot Deployment: 3-Tier Cost Structure", "", "stat", [
      "Tier 1 (Basic): ₹30,000 to ₹1.5 lakh — Simple FAQ deflection, low query complexity. Realistic payback: 30 to 60 days.",
      "Tier 2 (Mid): ₹3 to 12 lakh — NLP-driven, CRM-integrated, multilingual support. Realistic payback: 8 to 14 months.",
      "Tier 3 (Enterprise): ₹15 to 60 lakh — Multi-channel, multilingual, deep integration. Realistic payback: 12 to 18 months.",
    ]),

    h3("The Hidden Costs Nobody Warns You About"),
    p("Vendor quotes systematically miss four cost layers that often double or triple the true first-year cost."),
    liM([{ text: "LLM API usage costs", marks: ["strong"] }, { text: " scale with conversation volume. For mid-tier deployments handling 50,000+ conversations per month, API costs alone typically run ₹50,000 to ₹2 lakh per month — often 30 to 50 percent of ongoing operational cost and almost never in initial quotes.", marks: [] }]),
    liM([{ text: "Multilingual layer", marks: ["strong"] }, { text: " adds 20 to 30 percent to base cost. For Indian businesses serving prospects across English plus 2 to 3 regional languages, this is non-optional and frequently underbudgeted.", marks: [] }]),
    liM([{ text: "Integration costs", marks: ["strong"] }, { text: " with CRM, helpdesk, payment, and ERP systems typically add 150 to 200 percent over the headline platform price. Vendor demos make integration look clean. Real implementation almost never is.", marks: [] }]),
    liM([{ text: "Human escalation workflow design and team training", marks: ["strong"] }, { text: " adds ₹30,000 to ₹1.5 lakh one-time, plus ongoing process maintenance.", marks: [] }]),
    liM([{ text: "Annual maintenance", marks: ["strong"] }, { text: " typically runs 15 to 30 percent of initial build cost. AI chatbots require ongoing tuning, knowledge base updates, and conversation flow refinement.", marks: [] }]),

    h3("Why Indian Chatbot Deployments Often Pay Back Faster Than Global Benchmarks Suggest"),
    p("There is one important offset to the cost realism above. Research indicates that Indian deployments achieve 20 to 40 percent faster payback than equivalent Western deployments due to labor cost arbitrage and multilingual necessity. A mid-sized Pune real estate developer reportedly saw their sales team’s closing rate jump from 3 percent to 14 percent after chatbot deployment, with ₹80,000 per month in previously wasted ad budget recovered."),
    p("The combination means a Tier 2 Indian chatbot deployment that genuinely costs ₹8 lakh all-in (not just the ₹3 lakh license) often pays back in 8 to 14 months rather than the 12 to 18 months Western benchmarks would suggest. The math still works. It just requires honest budgeting."),

    h3("The Verdict: Is Chatbot Deployment Worth It?"),
    p("For businesses with high inquiry volume and constrained sales or support teams, yes, almost universally. The math is strongest when each handled query saves at least 10 to 15 minutes of human time and the chatbot can handle 60 percent or more of first-touch queries without escalation. Below those thresholds, the payback math becomes marginal."),

    h4("Education Sector"),
    p("Indian universities, colleges, coaching institutes, and EdTech companies see particularly strong returns from Tier 2 chatbot deployment for prospective student inquiries. The math is strongest during peak admission windows when human counsellor capacity becomes the bottleneck. Multilingual support across English plus 2 to 3 regional languages is essentially mandatory for institutions serving Tier 2 and Tier 3 cities, adding 25 to 30 percent to base cost. A real multilingual student communication chatbot for an Indian institution serving multiple programs typically lands in the ₹8 to 15 lakh first-year range, not the ₹3 lakh starting figure vendor quotes might suggest."),

    // ── Section 3: Marketing Automation ──────────────────────────────────────
    h2("3. Use Case 2: Marketing Automation with AI Personalisation (₹8 to 50 Lakh Range)"),
    p("The second most common AI investment for Indian marketing teams in 2026, and the one where total cost of ownership most frequently surprises buyers. The platform sticker price comparison between HubSpot, Marketo, and Salesforce Marketing Cloud typically misses 60 to 70 percent of true first-year cost."),

    h3("The Three Cost Layers Nobody Compares Correctly"),
    p("Per upGrowth’s May 2026 India marketing automation pricing research, every marketing automation investment in India has three distinct cost layers, and most buyers only compare the first one."),
    liM([{ text: "Platform licensing:", marks: ["strong"] }, { text: " ₹2,500 to ₹3.5 lakh per month depending on tier and contact volume.", marks: [] }]),
    liM([{ text: "Implementation and onboarding:", marks: ["strong"] }, { text: " ₹1.5 lakh to ₹25 lakh one-time.", marks: [] }]),
    liM([{ text: "Ongoing agency or in-house management:", marks: ["strong"] }, { text: " ₹75,000 to ₹5 lakh per month.", marks: [] }]),
    p("Total first-year cost ranges from approximately ₹8 lakh (basic HubSpot Professional with light agency support) to ₹85 lakh to ₹1.2 crore (enterprise Salesforce Marketing Cloud with dedicated agency team). The 10x to 15x spread is not driven primarily by license fees. It is driven by implementation depth, integration complexity, and ongoing management discipline."),

    h3("The HubSpot Versus Salesforce Reality Check"),
    p("For a typical Indian mid-size company with 20 sales users and 5 marketing users (per Avidly Agency’s February 2026 pricing analysis):"),
    liM([{ text: "HubSpot Professional:", marks: ["strong"] }, { text: " first-year cost typically ₹35 to ₹60 lakh (software + onboarding), with annual recurring costs of ₹30 to ₹50 lakh.", marks: [] }]),
    liM([{ text: "Salesforce Marketing Cloud:", marks: ["strong"] }, { text: " first-year cost typically ₹80 lakh to ₹1.5 crore (software + heavy implementation + add-ons), with annual recurring costs often exceeding ₹70 lakh to ₹1 crore, plus the salary of a required administrator.", marks: [] }]),

    IMG_HUBSPOT,

    p("The 2 to 3 times TCO gap between these two platforms is almost entirely in hidden operational costs, not license fees. Salesforce’s entry-level tiers frequently lack the API access, workflow automation, or granular reporting Indian mid-market businesses actually need, which forces a step up to the Enterprise tier with add-ons. To get feature parity, you almost always compare HubSpot Professional against Salesforce Enterprise plus paid add-ons, and the cost comparison shifts dramatically when done correctly."),

    pq("The 2 to 3 times TCO gap between HubSpot and Salesforce is almost entirely in hidden operational costs, not license fees. Comparing them on monthly subscription alone is how Indian businesses end up with the wrong tool at the wrong scale."),

    h3("The 2026 AI-Tier Wrinkle Most Buyers Miss"),
    p("AI-native features inside HubSpot (Breeze), Marketo (Adobe Sensei), and Salesforce (Einstein) now sit behind higher-tier pricing gates in 2026. The entry tiers look identical to 2024 pricing. The capability gap between entry and mid-tier has widened by 40 to 60 percent. Teams benchmarking 2024 prices against 2026 quotes routinely underbudget the AI layer specifically and end up either paying for the upgrade later or running marketing automation without the AI features that justified the investment in the first place."),

    h3("Realistic Payback Timelines"),
    liM([{ text: "Tier 1 (₹8 to 20 lakh first-year):", marks: ["strong"] }, { text: " 6 to 12 months for businesses with mature contact data and clear campaign workflows.", marks: [] }]),
    liM([{ text: "Tier 2 (₹20 to 50 lakh first-year):", marks: ["strong"] }, { text: " 12 to 18 months. The typical sweet spot for Indian mid-market businesses.", marks: [] }]),
    liM([{ text: "Tier 3 (₹50 lakh+ first-year):", marks: ["strong"] }, { text: " 18 to 24 months. Enterprise deployments with multi-region complexity.", marks: [] }]),

    h3("The 90-Day Stall Pattern"),
    p("Across MagicWorks client conversations, we see one specific failure pattern in marketing automation almost weekly. A team buys a platform at the right tier, gets stuck in implementation around month 3 or 4, runs out of internal capacity to drive adoption, and quietly stops using the platform meaningfully by month 6. The license keeps auto-renewing because nobody wants to be the person who declared the investment a failure. By month 12, the team has paid for a platform that produces no measurable returns and is back to manual campaign management."),
    p("The cure is not buying a different platform. The cure is budgeting for the implementation and management layer at the same time as the license. If you cannot afford the ₹5 to 15 lakh implementation budget for a HubSpot Professional deployment, you cannot actually afford HubSpot Professional, even though the monthly license fits the budget."),

    h3("The Verdict: Is Marketing Automation Worth It?"),
    co("When It Works vs When It Does Not", "", "key-takeaway", [
      "YES: businesses with 5,000+ active contacts in a cleaned database, a marketing team capable of designing campaign workflows, and budget for both the platform AND the management layer.",
      "NO: businesses still cleaning their customer database (the AI layer cannot fix bad data), fewer than 2,000 active contacts, or without a named platform owner to drive adoption.",
    ]),

    h4("Education Sector"),
    p("Marketing automation with AI personalisation is particularly powerful for Indian education institutions nurturing prospective students through the 9 to 18 month enrollment decision cycle. The typical sweet spot is Tier 2 budget (₹15 to 30 lakh first-year) for institutions running multi-program enrollment funnels with regional language requirements. The ROI math is strongest when the platform replaces 2 to 3 hours of daily counsellor time spent on routine follow-ups, freeing them to focus on warm prospects in the final 60 days of the enrollment cycle."),

    // ── Section 4: Sales Enablement ───────────────────────────────────────────
    h2("4. Use Case 3: AI Sales Enablement and Conversation Intelligence (₹6 to 40 Lakh Range)"),
    p("The fastest-growing AI investment category in Indian B2B sales in 2026, and the one where vendor bundling most frequently inflates costs beyond what most teams actually need."),

    h3("The Honest Cost Tiers"),
    liM([{ text: "Entry-tier conversation intelligence:", marks: ["strong"] }, { text: " ₹15,000 to ₹50,000 per user per year. Indian platforms are positioned at roughly 90 percent below Gong’s pricing.", marks: [] }]),
    liM([{ text: "Mid-tier conversation intelligence (Gong, Chorus, Outreach):", marks: ["strong"] }, { text: " ₹50,000 to ₹1.5 lakh per user per year.", marks: [] }]),
    liM([{ text: "Enterprise sales enablement stack:", marks: ["strong"] }, { text: " ₹2 lakh to ₹6 lakh per user per year when bundling conversation intelligence, content management, coaching modules, and engagement platforms.", marks: [] }]),

    h3("The Over-Provisioning Risk"),
    p("Enterprise vendors naturally bundle their most advanced tools, but this creates a massive over-provisioning risk for the typical Indian mid-market business. A coaching platform at roughly ₹4,500 per user per month, a content tool at ₹6,500 per user per month, and an engagement platform at ₹8,500 per user per month adds up to roughly ₹19,500 per user per month — ₹6 lakh per user per year before implementation fees. For a 30-person sales team, this lands at ₹1.8 crore per year for the tooling alone."),

    h3("The Market Consolidation Wrinkle"),
    p("Per Salesmotion’s 2026 sales enablement market analysis, the category just consolidated dramatically. Seismic acquired Highspot in February 2026. Vector Capital merged Showpad with Bigtincan in October 2025. Gong entered enablement with Gong Enable in early 2026, blurring the line between conversation intelligence and enablement."),
    p("If your team is mid-contract with any of these vendors, the platform you bought is now part of a different company, with uncertain roadmap integration timelines and potentially different renewal terms. Indian buyers in particular should pressure vendors for written clarity on what their platform will look like 12 to 18 months from now."),

    h3("The Indian Conversation Intelligence Advantage"),
    p("Indian conversation intelligence platforms like Mihup are gaining meaningful share in 2026 because of three structural advantages over global tools. First, Indian language depth across the 22 official languages, which most global platforms handle poorly. Second, DPDP Act 2023 compliance built natively, including data localisation requirements (with penalties up to ₹250 crore for significant data fiduciaries). Third, INR pricing typically 40 to 70 percent lower than equivalent global platforms."),
    p("The India BFSI contact center analytics market alone generated $18.5 million in 2024 and is expected to reach $65.2 million by 2030 at 23.7 percent CAGR, with India the fastest-growing regional market in Asia-Pacific. The growth is being captured disproportionately by Indian-built platforms. For Indian businesses operating across multiple languages and regulated industries, the local platform option deserves serious evaluation alongside the global names."),

    h3("Realistic Payback Timelines"),
    liM([{ text: "Tier 1 conversation intelligence:", marks: ["strong"] }, { text: " 3 to 6 months for sales teams of 10 or more closing deals above ₹1 lakh per closed deal.", marks: [] }]),
    liM([{ text: "Tier 2 full sales enablement (with content management and coaching):", marks: ["strong"] }, { text: " 9 to 15 months.", marks: [] }]),
    liM([{ text: "Tier 3 enterprise stack:", marks: ["strong"] }, { text: " 12 to 18 months minimum.", marks: [] }]),

    h3("The Verdict: Is AI Sales Enablement Worth It?"),
    p("Yes for B2B sales teams of 10 or more with clear deal values above ₹1 lakh per closed deal. The math is particularly strong for sales teams running long, multi-touch deal cycles where conversation intelligence helps identify coaching opportunities the manager would otherwise miss. Below the 10-person team size or below the ₹1 lakh deal value threshold, the math gets harder."),

    h4("Education Sector"),
    p("Direct fit for education sales (counsellor-led enrollment) is less obvious than for B2B sales teams. The strongest use case is institutions running B2B partnerships, corporate training programs, or executive education with named sales teams handling enterprise accounts. For pure admissions counselling teams of 5 to 15 people, basic conversation recording tools often deliver 70 percent of the value at 10 percent of the cost of full sales enablement platforms."),

    // ── Section 5: Content Production ────────────────────────────────────────
    h2("5. Use Case 4: AI-Powered Content Production (₹2 to 15 Lakh Range)"),
    p("The most miscosted use case in Indian marketing in 2026. Vendor sticker prices look small. Real productive deployment costs are typically 3 to 5 times higher than the tool subscriptions suggest. The hidden cost is human time around the AI, not the AI itself."),

    h3("The Honest Cost Layers"),
    liM([{ text: "Individual tool subscriptions:", marks: ["strong"] }, { text: " ChatGPT Plus, Claude Pro, Jasper Creator — roughly ₹20,000 to ₹50,000 per user per year.", marks: [] }]),
    liM([{ text: "Mid-tier team deployment:", marks: ["strong"] }, { text: " ₹2 to 5 lakh per year for a 10-person marketing team with proper tools across drafting, optimisation, and visual content.", marks: [] }]),
    liM([{ text: "Enterprise content operation:", marks: ["strong"] }, { text: " ₹8 to 15 lakh per year including Jasper Business or equivalent with brand voice training, custom workflow templates, and approval system integration.", marks: [] }]),

    h3("The 60 to 80 Percent Editing Reality"),
    p("Per Teract’s March 2026 testing of 5,000 AI-generated social media posts across 12 AI writing tools (Jasper, Copy.ai, Writesonic, Rytr, ChatGPT Plus, Claude Pro, and others), generic tools produced content that required 60 to 80 percent editing to be platform-appropriate and brand-authentic."),
    p("The implication is significant: the tool cost is the small part of the total cost equation. The human time required to make AI output usable is the real expense. For a marketing team producing 30 pieces of content per month, the editing time alone often runs 40 to 60 hours of senior marketer time. At a fully-loaded senior marketer cost of ₹1,500 to ₹2,500 per hour, this represents ₹6 lakh to ₹18 lakh per year in human cost on top of the ₹1 to 3 lakh in tool subscriptions. The tool cost is roughly 10 to 20 percent of total content production cost when AI is used properly."),

    h3("The Brief-Writing Investment Most Teams Skip"),
    p("The single biggest predictor of AI content quality is the quality of the brief. Teams that invest 30 to 45 minutes in detailed briefing for each piece of content produce output that requires 15 to 25 percent editing. Teams that prompt AI tools with one-line instructions produce output that requires the full 60 to 80 percent editing burden. The math heavily favours the disciplined approach, but the brief-writing time is consistently underbudgeted in content production cost models."),

    h3("Realistic Payback Timelines"),
    liM([{ text: "Tier 1 (under ₹2 lakh per year, individual tools):", marks: ["strong"] }, { text: " 30 to 90 days for any marketing team producing 10+ pieces of content per month.", marks: [] }]),
    liM([{ text: "Tier 2 (₹2 to 8 lakh per year, team deployment with workflows):", marks: ["strong"] }, { text: " 4 to 8 months.", marks: [] }]),
    liM([{ text: "Tier 3 (₹8 to 15 lakh per year, enterprise content operation):", marks: ["strong"] }, { text: " 6 to 12 months.", marks: [] }]),

    h3("The Verdict: Is AI Content Production Worth It?"),
    p("Universally yes for any business producing more than 10 pieces of content per month, but only if you also invest in the brief-writing and editing workflows around the tools. Tool spend without workflow discipline produces output that requires more editing than original drafting. The discipline matters more than the tool selection."),

    h4("Education Sector"),
    p("AI content tools are particularly powerful for Indian education marketing teams creating program-specific content at scale: course descriptions, faculty profiles, student testimonials, comparison content across programs. Often the highest-ROI Tier 1 AI investment for institutions, with payback frequently visible within the first quarter of disciplined use. The multilingual content angle is particularly valuable for institutions serving prospects across English, Hindi, and 2 to 3 regional languages."),

    // ── Section 6: Analytics ──────────────────────────────────────────────────
    h2("6. Use Case 5: AI-Driven Analytics and Reporting (₹5 to 30 Lakh Range)"),
    p("The least-discussed AI investment in Indian business in 2026, frequently the highest-ROI when deployed well. Vendor pitches focus on dashboard aesthetics. Real value comes from replacing analyst time and surfacing decisions that would otherwise be missed."),

    h3("The Honest Cost Tiers"),
    liM([{ text: "Entry tier (Power BI Pro, Tableau Creator, Domo standard):", marks: ["strong"] }, { text: " ₹1 to 5 lakh per year for small teams. Power BI slots cleanly into businesses already running Microsoft 365 and Azure infrastructure.", marks: [] }]),
    liM([{ text: "Mid-tier with AI features (Power BI Premium, Tableau Cloud, Domo Pro):", marks: ["strong"] }, { text: " ₹5 to 15 lakh per year for mid-size businesses.", marks: [] }]),
    liM([{ text: "Enterprise embedded analytics (Sisense, ThoughtSpot, Looker):", marks: ["strong"] }, { text: " ₹15 to 30 lakh per year for businesses building data products or embedding analytics for customers. Embedded analytics deployments for 500+ users typically run ₹42 lakh to ₹2.5 crore+ per year.", marks: [] }]),

    h3("The Hidden Costs"),
    liM([{ text: "Data preparation and cleansing:", marks: ["strong"] }, { text: " typically 40 to 60 percent of total cost in year one. Most teams budget for the tool and forget the data layer entirely.", marks: [] }]),
    liM([{ text: "Custom calculations and advanced measures:", marks: ["strong"] }, { text: " building dashboards that ask the right business questions requires senior analyst time, not just tool access.", marks: [] }]),
    liM([{ text: "Integration costs:", marks: ["strong"] }, { text: " connecting operational systems (CRM, ERP, marketing automation, finance) often adds 50 to 100 percent over the headline platform price.", marks: [] }]),

    h3("Realistic Payback Timelines"),
    liM([{ text: "Tier 1:", marks: ["strong"] }, { text: " 3 to 6 months if dashboards replace manual reporting work and the team actually uses them.", marks: [] }]),
    liM([{ text: "Tier 2:", marks: ["strong"] }, { text: " 6 to 12 months when AI features start producing actionable insights, not just visualisations.", marks: [] }]),
    liM([{ text: "Tier 3:", marks: ["strong"] }, { text: " 12 to 24 months. Embedded analytics for software products has different economics where the cost is justified by customer retention rather than internal productivity.", marks: [] }]),

    h3("The Verdict: Is AI Analytics Worth It?"),
    p("Strong yes for any business with multiple data sources and reporting bottlenecks. AI analytics is often the most under-invested AI category in Indian businesses, frequently delivering 3 to 5 times the ROI of more visible AI deployments because it directly replaces senior analyst time and surfaces decisions that would otherwise be missed. The math is strongest when the business has clear KPIs the team wants to track and weakest when dashboards are a substitute for actual strategic discipline."),

    h4("Education Sector"),
    p("AI analytics is particularly valuable for Indian education institutions tracking enrollment funnels across multiple programs, multiple campuses, or multiple counselling teams. Predictive analytics on student dropout risk, course completion rates, and program profitability is becoming a real differentiator for institutions that invest in the data foundation. The combination of NEP 2020 reporting requirements and the rapid growth of online and hybrid programs makes this category increasingly important for Indian institutions in 2026 and 2027."),

    // ── Section 7: Probability-Weighted Math ──────────────────────────────────
    h2("7. The Hidden 95 Percent Cost: Probability-Weighted AI Investment Math"),
    p("The ‘cost of AI’ question implicitly assumes the AI works. The MIT Project NANDA research found that 95 percent of enterprise generative AI pilots deliver no measurable business return. The Gartner finding from 2025 indicates that more than 40 percent of agentic AI projects will be cancelled by end of 2027 due to escalating costs, unclear business value, and inadequate risk controls."),
    p("These findings have an uncomfortable implication for cost calculation. The real cost of any specific AI investment in Indian business in 2026 includes the probability that it produces zero measurable return. That probability is high enough to change the math in ways most CEOs do not account for."),

    h3("The Probability-Weighted Return Calculation"),
    p("Consider an Indian business evaluating a ₹15 lakh AI investment. The vendor projects a 3x return over 18 months. Standard ROI math says this is a good deal: ₹15 lakh invested produces ₹45 lakh in value, net positive ₹30 lakh. The probability-weighted math is different. Per MIT Project NANDA:"),
    li("95 percent probability of producing zero measurable return"),
    li("5 percent probability of producing 3 to 5 times return"),
    p("The probability-weighted return is roughly 15 to 25 percent, not 200 percent. The expected value of the investment is between ₹2.25 lakh and ₹3.75 lakh, against a ₹15 lakh cost. The math no longer works. This is uncomfortable to acknowledge because it implies that most Indian AI investments in 2026 are being made on bad math."),

    IMG_PROBABILITY,

    pq("The real cost of AI in Indian business in 2026 is not the vendor invoice. It is the vendor invoice multiplied by the probability that the investment will actually produce returns. For most Indian deployments, that probability is much lower than CEOs assume."),

    h3("Why Discipline Matters More Than Budget Size"),
    p("The path to changing the probability calculation is not spending more money. It is spending the same money with much better discipline. A ₹5 lakh investment with clear success metrics, a named owner, and a documented kill criterion will outperform a ₹50 lakh investment with vague KPIs and no shutdown discipline every time."),
    p("Most Indian businesses funding 48 AI initiatives at ₹2 lakh each are misallocating compared to businesses funding 12 initiatives at ₹8 lakh each with proper discipline. The total budget is similar. The probability-weighted returns are dramatically different."),

    // ── Section 8: Cost Discipline Framework ─────────────────────────────────
    h2("8. What Good Cost Discipline Looks Like: A Practical Framework"),
    p("A four-part discipline framework for Indian CEOs evaluating AI cost decisions in 2026."),

    h3("Discipline 1: Budget the Iceberg, Not the Tip"),
    p("For any AI investment in 2026, multiply the headline vendor price by 3 to 4 times to estimate true first-year cost. Implementation, integration, change management, ongoing operations, and team training collectively account for 65 to 75 percent of actual spending. If the math no longer makes sense after this multiplier, you have your answer before signing the contract."),
    p("For a vendor quoting ₹5 lakh per year on subscription, plan for ₹15 to 20 lakh in actual first-year spending. For a vendor quoting ₹20 lakh, plan for ₹60 to 80 lakh. The exception is genuinely simple SaaS tools where the multiplier shrinks to 1.5x to 2x. The exception applies less often than CEOs hope."),

    h3("Discipline 2: Plan the Kill Switch Before the Launch"),
    p("Every AI investment should have a defined kill criterion, in writing, before procurement begins. The criterion has three parts: a measurable outcome the investment must achieve, a specific date by which it must achieve it, and the named person responsible for executing the shutdown if the outcome is not achieved."),
    p("Without all three, the investment will not be killed even when it should be, because nobody owns the decision. The MagicWorks framework applies directly: every AI investment gets evaluated against three questions every 90 days. Is it being used by the intended team? Is the value clear and growing over time? Is the cost-to-value ratio improving? Three ‘no’ answers means kill it. Build the criterion before launch, not after problems emerge."),

    h3("Discipline 3: Measure on the Right Horizon"),
    liM([{ text: "Tier 1 investments (under ₹5 lakh):", marks: ["strong"] }, { text: " should show clear results within 90 days, or they are killed.", marks: [] }]),
    liM([{ text: "Tier 2 investments (₹5 to 50 lakh):", marks: ["strong"] }, { text: " should show clear leading indicators by month 3 to 6 and financial returns by month 12 to 18.", marks: [] }]),
    liM([{ text: "Tier 3 investments (₹50 lakh+):", marks: ["strong"] }, { text: " need 18 to 36 month evaluation horizons with board-level reporting cadence.", marks: [] }]),
    p("Evaluating Tier 2 investments on Tier 1 timelines is how good investments get killed too early. Evaluating Tier 1 investments on Tier 2 timelines is how bad investments get protected longer than they should. Get the horizon right per tier."),

    h3("Discipline 4: Build the Operational Layer Before Adding More Tools"),
    p("Most Indian businesses underinvest in workflow design, team training, and process integration relative to tool acquisition. A ₹3 lakh workflow build around existing tools often produces better returns than a ₹15 lakh new tool purchase, because the workflow build addresses the actual constraint (team capability and process maturity) rather than adding more technology to an already complex stack."),
    p("Before approving any new AI tool purchase in 2026, ask one question: have we exhausted the value from the AI tools we already have? If the answer is ‘I do not know,’ do the audit before approving the new spend. Most Indian businesses discover that 40 to 60 percent of their existing AI tool spend produces no measurable value because the workflow layer was never built."),

    h3("What to Do This Week"),
    co("Five Concrete Actions — Start This Week", "", "key-takeaway", [
      "List every AI tool subscription and project in your business. Capture the headline cost and your estimate of true total cost (apply the 3–4× multiplier). Most leaders are surprised by the gap.",
      "For each active investment, write the kill criterion: specific outcome, specific date, named owner. If you cannot write the criterion clearly, that is the first problem to solve.",
      "Run the probability-weighted math on your three largest AI investments. What is the realistic probability of measurable return, and what is the expected value at that probability? If expected value falls below cost, escalate the decision.",
      "Schedule a quarterly cost discipline review. Same week every quarter, named owners present one-page status updates against three questions: usage, value growth, cost-to-value trajectory.",
      "Decide one tool to consolidate or kill this quarter. Not every quarter has new investments to approve, but every quarter should have at least one discontinuation decision.",
    ]),

    pq("Indian AI investment in 2026 is a budgeting problem before it is a technology problem. CEOs who get the budget discipline right will outperform CEOs who get the tool selection right. The two are not the same skill."),

    // ── Six Hidden Costs ──────────────────────────────────────────────────────
    h2("Six Consistently Underbudgeted Hidden Costs"),
    co("Hidden Costs Checklist — Budget for All Six Before Signing", "", "warning", [
      "Integration with existing systems (CRM, ERP, helpdesk, marketing automation): adds 150–200% over platform price.",
      "Data preparation and cleansing: accounts for 30–50% of year-one total cost — the most underestimated line item.",
      "Multilingual support: adds 20–30% to base cost for Indian deployments serving English and regional languages.",
      "Annual maintenance and retraining: runs 15–30% of initial build cost. AI requires continuous management.",
      "Team training and change management: ₹30,000 to ₹5 lakh one-time depending on team size, plus ongoing process maintenance.",
      "LLM API usage costs: scale with conversation or generation volume, often 30–50% of ongoing operational cost for chatbots and AI assistants.",
    ]),

    // ── About the Author ──────────────────────────────────────────────────────
    h2("About the Author"),
    p("Swapnil Ughade is Founder of MagicWorks IT Solutions Private Limited, an AI-first digital marketing agency based in Pune. MagicWorks helps Indian businesses across education, travel and wellness, manufacturing, and B2B services build AI-driven marketing and sales systems that turn investment into measurable outcomes. Swapnil is also building MagicFlow AI, a customer conversation AI product launching shortly that applies the cost discipline framework in this article to specific marketing and sales use cases."),

    co("Want an AI Cost Audit for Your Business?", "MagicWorks runs an AI Cost Audit for Indian businesses, applying the cost discipline framework in this article to your current and proposed AI investments. The audit produces a written assessment of your existing AI tool spend versus actual usage, identifies tools to consolidate or kill, flags under-invested categories, and gives you a tiered 12-month budget plan calibrated to your sector and stage. Particularly useful for education sector decision-makers planning 2026–27 AI budgets.\n\nCall: +91-9764566644 | Email: sales@magicworksitsolutions.com", "info"),

    // ── Sources ───────────────────────────────────────────────────────────────
    h2("Sources Cited"),
    ol("upGrowth: Marketing Automation Pricing India 2026 — platform pricing layers, 25–35% sticker price rule"),
    ol("Avidly Agency: HubSpot vs Salesforce Pricing 2026 — TCO comparison for mid-sized companies"),
    ol("Brainguru Technologies: AI Chatbot Development Cost 2026 — India pricing, multilingual cost premium"),
    ol("Codingclave: AI Chatbot Development Cost India 2026 — 50+ projects, real Indian pricing"),
    ol("Mihup: Best Conversation Intelligence India 2026 — Indian platform advantage, DPDP Act compliance"),
    ol("Deelan: Sales Enablement Pricing 2026 — full cost breakdown including hidden fees"),
    ol("Salesmotion: Top 10 Sales Enablement Platforms 2026 — market consolidation, Seismic-Highspot merger"),
    ol("Teract: AI Writing Tools Comparison 2026 — 60–80% editing finding from 5,000 post test"),
    ol("Domo: 15 Best Dashboard Software Platforms 2026 — analytics pricing benchmarks"),
    ol("Uvik Software: AI Development Cost 2026 — TCO 1.5–2× initial build, data prep underestimation"),
    ol("CMARIX: Build vs Buy AI Software CTO Guide 2026 — 150–200% hidden integration costs"),
    ol("Riseup Labs: True Cost of Implementing AI 2026 — 15–30% annual maintenance, ongoing cost realities"),
    ol("Gartner: Over 40% of Agentic AI Projects Cancelled by 2027 (June 25, 2025)"),
    ol("MIT Project NANDA via Fortune: 95% of GenAI Pilots Fail (August 2025)"),
  ];
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = [
  {
    question: "What is the realistic total cost of AI implementation for an Indian business in 2026?",
    answer: "Total first-year cost typically runs 3 to 4 times the headline vendor subscription price. Per upGrowth’s May 2026 India marketing automation pricing research, platform licensing is only 25 to 35 percent of true first-year cost. The remaining 65 to 75 percent goes to implementation and onboarding (₹1.5 lakh to ₹25 lakh one-time), ongoing agency or in-house management (₹75,000 to ₹5 lakh per month), and integration work (typically 150 to 200 percent over the headline platform price). Total cost of ownership over three years runs 1.5 to 2 times the initial build cost. Indian businesses applying global cost benchmarks directly tend to underestimate by 30 to 50 percent because of differences in implementation cost structure, multilingual requirements, and DPDP Act compliance overhead.",
  },
  {
    question: "Why are vendor pricing pages misleading?",
    answer: "Vendor pricing pages show platform licensing cost, which is typically 25 to 35 percent of true first-year cost. They omit implementation timelines, onboarding fees, required technical resources, integration costs, change management, team training, and the 6 to 12 month ramp to measurable ROI. Buyers who compare monthly license fees across vendors typically pick the cheapest tier and discover six months later that the real cost was 3 to 4 times the license. The platform is the entry fee. The integration, migration, workflow design, data hygiene, and ongoing management are the actual expense.",
  },
  {
    question: "How much should I budget for AI chatbot deployment in India?",
    answer: "Indian AI chatbot deployment clusters into three budget tiers. Tier 1 basic rule-based chatbots: ₹30,000 to ₹1.5 lakh first-year for FAQ deflection with low query complexity. Tier 2 mid-tier AI chatbots with NLP, CRM integration, and multilingual support: ₹3 to 12 lakh first-year all-in. Tier 3 enterprise-grade conversational AI with multi-channel deployment, deep integration, and ongoing optimisation: ₹15 to 60 lakh first-year all-in. Realistic payback runs 30 to 60 days for Tier 1, 8 to 14 months for Tier 2 (faster than Western benchmarks due to labor cost arbitrage), and 12 to 18 months for Tier 3. Hidden costs to budget separately include LLM API usage (30 to 50 percent of ongoing operational cost), multilingual layer (adds 20 to 30 percent to base cost), integration with CRM and helpdesk (adds 150 to 200 percent), and annual maintenance (15 to 30 percent of initial build cost).",
  },
  {
    question: "What is the difference between HubSpot and Salesforce total cost of ownership?",
    answer: "For a typical Indian mid-size company with 20 sales users and 5 marketing users (per Avidly Agency’s February 2026 pricing analysis), HubSpot Professional typically lands at ₹35 to ₹60 lakh first-year cost with ₹30 to ₹50 lakh annual recurring cost. Salesforce Marketing Cloud typically lands at ₹80 lakh to ₹1.5 crore first-year cost with ₹70 lakh to ₹1 crore annual recurring cost plus the salary of a required administrator. The 2 to 3 times TCO gap is almost entirely in hidden operational costs (implementation depth, integration complexity, administration overhead), not license fees. Salesforce entry-level tiers typically lack the API access and workflow automation Indian mid-market businesses need, forcing a step up to Enterprise tier plus add-ons for feature parity with HubSpot Professional.",
  },
  {
    question: "How much do sales enablement and conversation intelligence tools actually cost?",
    answer: "Entry-tier conversation intelligence (Indian platforms like Mihup): ₹15,000 to ₹50,000 per user per year. Mid-tier conversation intelligence (Gong, Chorus, Outreach): ₹50,000 to ₹1.5 lakh per user per year. Enterprise sales enablement stack bundling conversation intelligence, content management, coaching, and engagement: ₹2 lakh to ₹6 lakh per user per year. Per Deelan’s 2026 research, a 30-person sales team running a full bundle lands at roughly ₹1.8 crore per year for tooling alone. Indian conversation intelligence platforms are gaining share due to Indian language depth, DPDP Act compliance built natively, and INR pricing 40 to 70 percent lower than equivalent global platforms.",
  },
  {
    question: "Is AI content production worth the investment for small marketing teams?",
    answer: "Yes for any business producing more than 10 pieces of content per month. Individual tool subscriptions cost ₹20,000 to ₹50,000 per user per year. The real cost is human time around the AI: brief writing, editing, fact-checking, and brand voice maintenance. Per Teract’s 2026 testing of 5,000 AI-generated posts, generic tools produced content requiring 60 to 80 percent editing to be platform-appropriate and brand-authentic. Teams investing 30 to 45 minutes in detailed briefing per piece reduce the editing burden to 15 to 25 percent. The discipline matters more than the tool selection.",
  },
  {
    question: "What hidden costs should I plan for when budgeting AI?",
    answer: "Six hidden costs consistently underbudgeted in Indian AI deployments: (1) Integration with existing systems adds 150 to 200 percent over headline platform price. (2) Data preparation and cleansing accounts for 30 to 50 percent of total cost in year one. (3) Multilingual support adds 20 to 30 percent to base cost. (4) Annual maintenance and retraining runs 15 to 30 percent of initial build cost. (5) Team training and change management adds ₹30,000 to ₹5 lakh one-time. (6) LLM API usage costs often represent 30 to 50 percent of ongoing operational cost for chatbots and AI assistants. Budget honestly for all six or expect the investment to overrun.",
  },
  {
    question: "What is the realistic payback period for AI investments in India?",
    answer: "Payback timelines depend on investment tier and use case. Tier 1 (under ₹5 lakh): 30 to 90 days for high-volume use cases (basic chatbots, individual AI content tools), or 3 to 6 months for analytics dashboards. Tier 2 (₹5 to 50 lakh): typically 8 to 14 months for chatbots and conversational AI (faster than Western markets by 20 to 40 percent due to labor cost arbitrage), 12 to 18 months for marketing automation and sales enablement. Tier 3 (₹50 lakh+): 18 to 36 months minimum. Critical context: per MIT NANDA research, 95 percent of enterprise generative AI pilots deliver no measurable business return. The discipline to identify the 5 percent that work and shut down the 95 percent that do not matters more than the absolute payback timeline.",
  },
  {
    question: "How does Indian AI cost compare to global benchmarks?",
    answer: "Indian AI implementations typically cost 30 to 50 percent less in absolute rupees than equivalent Western deployments, driven by labor cost arbitrage, Indian-built platforms priced 40 to 70 percent below global equivalents, and lower integration and consulting costs. However, Indian deployments allocate more to multilingual layer (20 to 30 percent premium for regional language support), DPDP Act compliance, and ongoing operational support. Indian businesses applying global benchmarks directly tend to underbudget specific line items even when the total cost is lower.",
  },
  {
    question: "What should an Indian education institution budget for AI in 2026-27?",
    answer: "For most Indian education institutions in 2026-27, the highest-leverage AI investment is Tier 2 budget (₹5 to 50 lakh per year, with typical sweet spot at ₹15 to 30 lakh) focused on counsellor support, multilingual student communication, enrollment nurturing across the 9 to 18 month decision cycle, and faculty productivity tools. For a ₹15 lakh budget: allocate ₹8 to 10 lakh to a specialised conversational AI vendor for multilingual first-touch student inquiry handling (English plus 2 to 3 regional languages), ₹3 to 5 lakh to integration and counsellor team training, ₹2 to 3 lakh reserved for quarterly review and adjustment work. Evaluate on 24-month horizons minimum. Defer Tier 3 investments above ₹50 lakh until 2027–28 for most institutions.",
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
const SLUG = "real-cost-of-ai-indian-marketing-sales-2026";

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
    excerpt: "Honest rupee costs for AI in Indian marketing and sales across 5 use cases. Real budgets, hidden costs, payback timelines, and the 95% failure problem.",
    seoTitle: "The Real Cost of AI in Indian Marketing & Sales: 2026 Guide",
    tags: [
      "AI cost India",
      "AI implementation India",
      "marketing automation India",
      "AI chatbot cost India",
      "AI ROI India",
      "hidden costs AI India",
      "AI investment India 2026",
      "education AI India",
    ],
  };

  console.log(`\n💾  Patching document…`);
  await client.patch(doc._id).set(patches).commit();
  console.log(`✅  Rewrite complete! ${body.length} blocks, ${FAQ.length} FAQ items.\n`);
  console.log(`🎉  Open in Studio to review:`);
  console.log(`    https://${PROJECT_ID}.sanity.studio/structure/insight;${doc._id}\n`);
}

main().catch(err => { console.error(`\n❌  Fatal:`, err.message); process.exit(1); });
