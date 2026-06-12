/**
 * create-blog5-ai-lead-qualification.mjs
 *
 * Creates the "AI Lead Qualification for B2B India" blog post in Sanity.
 * Source: Blog5_AI_Lead_Qualification_with_images.docx
 * Revised content only (strikethrough excluded per editorial markup).
 *
 * Run: node scripts/create-blog5-ai-lead-qualification.mjs
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

// ── Key generator ─────────────────────────────────────────────────────────────
let _n = 0;
function k(prefix = "b") { return `${prefix}${++_n}`; }

// ── PortableText builders ──────────────────────────────────────────────────────
function p(text) {
  return { _type: "block", _key: k(), style: "normal", markDefs: [],
    children: [{ _type: "span", _key: k("s"), text, marks: [] }] };
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
function eimg(url, alt, caption = "") {
  return { _type: "externalImage", _key: k("img"), url, alt, caption };
}

// ── Upload images ─────────────────────────────────────────────────────────────
async function uploadImages() {
  const imgDir = path.join(__dirname, "../../Docs/Blogs/extracted_blog5_images");
  const results = {};
  const files = [
    { key: "hero",     name: "hero.png" },
    { key: "sixcomp",  name: "sixcomp.png" },
    { key: "speed",    name: "speed.png" },
    { key: "timeline", name: "timeline.png" },
    { key: "whatsapp", name: "whatsapp.png" },
  ];
  for (const file of files) {
    const filePath = path.join(imgDir, file.name);
    console.log(`📤  Uploading ${file.name}…`);
    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload("image", stream, {
      filename: `blog5-ai-lead-qualification-${file.key}.png`,
      contentType: "image/png",
    });
    results[file.key] = { _id: asset._id, url: asset.url };
    console.log(`✅  ${file.name} → ${asset._id}`);
  }
  return results;
}

// ── Body ──────────────────────────────────────────────────────────────────────
function buildBody(imgs) {
  return [

    // ── Short Answer ──────────────────────────────────────────────────────────
    h2("The Short Answer"),
    p("Three forces are converging on Indian B2B sales teams in 2026 that will multiply lead volume while making most of that volume worthless. Google AI Mode auto-upgrades to AI Max in September 2026 and will flood lead forms with low-intent AI-driven inquiries. Meta lead ads in India already produce CPL of ₹500 to ₹1,500, but most of those are students, freelancers, or wrong-fit prospects. WhatsApp inbound volume in Indian B2B is hitting 60 to 80 percent reply rates on cold outreach versus 10 to 20 percent for email, but most replies are just curiosity."),
    p("Meanwhile the data on what actually works is unforgiving. The Artemis GTM 2026 benchmark across 1,247 companies found median B2B response time is 42 hours, and only 7 percent of companies meet the 5-minute window where leads convert at 21 percent versus 2.3 percent at 24 hours."),
    p("This guide gives Indian sales heads the framework, the Indian rupee budget tiers, the WhatsApp-first implementation pattern, and the 90-day plan to build the filter before they need it."),

    sr(
      { value: "42 hrs",  label: "median B2B lead response time",          note: "Artemis GTM 2026, 1,247 companies" },
      { value: "21×",     label: "more likely to qualify within 5 minutes", note: "MIT/HBR Lead Response Study" },
      { value: "7%",      label: "of companies meet the 5-min window",      note: "Artemis GTM 2026 benchmark" },
    ),

    // ── TOC ───────────────────────────────────────────────────────────────────
    h2("What This Article Covers"),
    li("Why your best salesperson is now your AI filter, and what that means structurally"),
    li("The speed-to-lead math, and why Indian B2B is leaving lakhs on the floor every month"),
    li("The Indian WhatsApp reality and why it is your highest-leverage qualification channel"),
    li("The six-component AI lead qualification framework for Indian B2B sales heads"),
    li("Build, buy, or partner decision, with Indian rupee budget tiers under ₹1 lakh, ₹1–5 lakh, ₹5–20 lakh"),
    li("The 90-day implementation plan you can start this quarter"),
    li("The four mistakes that kill AI lead qualification in Indian B2B"),
    li("Frequently asked questions about AI lead qualification for Indian sales heads"),

    // ── Section 1 ─────────────────────────────────────────────────────────────
    h2("1. Why Your Best Salesperson Is Now Your AI Filter"),
    p("Most Indian B2B sales heads are trying to solve the same problem with the same broken model. More leads come in, sales team stays the same size, manual triage falls behind, and the leads that would have converted go cold while the team is busy responding to leads that never had a chance. This is not a sales team performance problem. It is a structural problem with the qualification model itself."),
    p("The traditional model: marketing produces leads from Google Ads, Meta Ads, LinkedIn, organic search, content downloads, and webinar signups. The lead lands in the CRM. An SDR or junior salesperson manually opens it, reads it, decides if it is worth a call, and either calls it or moves on. As lead volume rises, this process scales linearly with headcount. As headcount stays flat, the queue grows. And as the queue grows, the leads that needed a 5-minute response get a 47-hour response, and the conversion math collapses."),

    h3("The Five-Force Compression Hitting Indian B2B Sales in 2026"),
    p("Five independent forces are compressing on Indian B2B sales teams simultaneously, and the combination is what makes the problem urgent."),
    li("Lead volume is rising fast. Meta and Google ads in India are getting cheaper per lead but often weaker in quality. AI search platforms are sending traffic that wants instant answers, not next-week callbacks. Starting in September 2026, campaigns using Dynamic Search Ads, automatically created assets, and campaign-level broad match settings will transition to AI Max; this may increase low-intent enquiries unless the qualification layer is ready."),
    li("Sales team capacity is flat. Most Indian B2B businesses cannot scale headcount fast enough to handle 2x to 3x lead volume, and the unit economics of doing so rarely work even if they could hire."),
    li("Buyer expectations have shifted. According to Salesforce 2026 research, 82 percent of B2B buyers now expect immediate response to sales inquiries. Sub-2-second AI response time is the new benchmark per netpartners 2026 research on conversational AI bot performance."),
    li("Speed compounds against you when competitors have an AI filter and you do not. The first-responder wins approximately 50 percent of competitive deals per LeanData 2026 research."),
    li("Manual qualification cannot match AI on consistency. Research from monday.com's 2026 AI qualification study found AI scoring lifts qualification accuracy from around 60 percent (manual) to as high as 75 to 90 percent when AI is layered on top of BANT or MEDDIC frameworks."),

    h3("The New Model: AI as the First Responder, Humans as the Closers"),
    p("The model that actually works in Indian B2B in 2026 inverts the order of operations. AI is the first responder. The AI filter does instant 24/7 triage, scores intent, qualifies fit, and routes the 15 to 20 percent of leads that are genuinely sales-ready to humans. The human team works on a much smaller, much warmer set of conversations. The remaining 80 to 85 percent of leads enter AI-managed nurture sequences that monitor for re-engagement signals and elevate them when they become sales-ready."),
    p("This is where leading Indian B2B teams are moving in 2026. When the inputs are clean and the handoff is designed well, teams can improve qualification accuracy, cut response time from days to minutes, and increase sales productivity because reps spend more time with qualified prospects instead of triaging junk. Treat any 2x to 3x conversion-lift claim as a target scenario, not a guarantee; the result depends on ICP clarity, traffic quality, sales follow-up, and CRM discipline."),

    h3("Where MagicFlow AI Fits in This Picture"),
    p("This is the problem MagicFlow AI was built to solve. MagicFlow AI is the conversational AI product we are building at MagicWorks, designed specifically for Indian B2B sales contexts. It handles multilingual first-touch qualification across English plus regional languages, runs BANT-style qualification on inbound conversations through natural dialogue rather than rigid forms, integrates natively with WhatsApp Business API for the Indian-specific channel reality, and syncs qualified leads directly into your CRM with full conversation context for the receiving sales rep. The product is launching shortly and applies the framework in this article to the specific lead qualification problem Indian sales teams face. The framework matters more than any specific product."),

    pq("AI is the first responder. The AI filter can triage 24/7, qualify fit, and route genuinely sales-ready leads to humans. The human team works on a smaller, warmer set of conversations. This is the direction leading Indian B2B teams are moving in 2026."),

    // ── Section 2 ─────────────────────────────────────────────────────────────
    h2("2. The Speed-to-Lead Math, and Why Indian B2B Is Leaving Lakhs on the Floor"),
    p("Every Indian sales head needs to internalise the speed-to-lead math. The numbers are not subtle, and they explain why most current Indian B2B sales operations are mathematically losing to faster competitors regardless of how good the closing skills are."),

    h3("The Benchmark Data from 2026 Research"),
    p("The following benchmarks come from primary research across thousands of B2B companies, all published in 2025–2026 and validated against the original 2011 MIT-Harvard Business Review Lead Response Management Study (2,241 companies analysed). The findings have held up consistently across 15 years of validation."),
    li("Median B2B lead response time across 1,247 companies: 42 hours per Artemis GTM 2026 benchmark. Only 23 percent of B2B companies respond within 5 minutes. Only 7 percent meet the original 5-minute benchmark consistently."),
    li("Leads contacted within 5 minutes: 21x more likely to qualify than leads contacted at 30 minutes. After 5 minutes, qualification odds drop 10x per InsideSales.com analysis of 15,000 leads."),
    li("5-minute responders close at 32 percent. 24-hour responders close at 12 percent. A 2.6x gap, all else being equal per Optifai 2026 analysis of 939 B2B companies."),
    li("Calling within 60 seconds: 391 percent improvement in conversion versus calling at 2 minutes per Velocify research across 3.5 million leads."),
    li("78 percent of customers buy from the business that responds to them first. 35 to 50 percent of sales go to the first responder, regardless of price or product fit."),

    eimg(
      imgs.speed.url,
      "Speed-to-lead conversion data for Indian B2B 2026: 21x more likely to qualify if contacted within 5 minutes, 32% close rate at 5-min response vs 12% at 24 hours. Median response time is 42 hours across 1,247 companies.",
      "Speed-to-lead benchmarks from 2026 research. Most Indian B2B companies are in the 42-hour response window where conversion rates are lowest."
    ),

    h3("The Indian Rupee Math Your CFO Will Understand"),
    p("Important framing: the rupee math below is an illustrative scenario to show the sensitivity of pipeline to response speed and qualification quality. It should be recalculated using your actual lead volume, conversion rate, deal value, and sales capacity before being used in a budget approval."),
    p("Consider a typical Indian B2B SaaS company spending ₹5 lakh per month on Google and Meta ads, generating 200 leads per month at ₹2,500 average CPL. If this company currently responds in 24+ hours (roughly 42 percent of B2B companies in 2026 per the data), they convert at approximately 12 percent — 24 closed deals per month, ₹48 lakh per month in pipeline."),
    p("If the same company shifts to 5-minute response with AI lead qualification, they convert at approximately 32 percent — 64 closed deals per month, ₹1.28 crore per month in pipeline from the same ₹5 lakh in ad spend. The difference: ₹80 lakh per month in additional pipeline. Over a year, roughly ₹9.6 crore in pipeline difference. The annual cost of the system: ₹1 to 5 lakh per Section 5 of this article."),

    pq("₹5 lakh per month in ad spend, same sales team, same product. The only variable: speed and qualification quality. The difference over a year: ₹9.6 crore in pipeline. The annual cost of the system that delivers this: ₹1 to 5 lakh. The math is uncomfortable to ignore."),

    h3("The Compounding Problem Nobody Talks About"),
    p("Speed-to-lead is not just about response time. It is about response speed combined with qualification quality. The 21x advantage in qualification only matters if the lead is actually a fit. If your AI responds in 5 minutes but the response is wrong-fit, you have built a faster way to waste time. The right system combines speed with intent scoring, so the leads humans see are both fast-answered and pre-screened. This is why AI lead qualification is the right framing, not just 'speed-to-lead automation' or 'lead routing AI'. The qualification layer is the part that makes the speed actually count."),

    // ── Section 3 ─────────────────────────────────────────────────────────────
    h2("3. The Indian WhatsApp Reality, and Why This Is Your Highest-Leverage Channel"),
    p("There is a structural difference between Indian B2B and Western B2B that most globally written sales playbooks miss. Indian buyers live on WhatsApp. Any AI lead qualification system built for India that does not centre WhatsApp is leaving most of the conversation volume on the floor."),

    h3("The Indian B2B WhatsApp Data"),
    p("The data on WhatsApp performance in Indian B2B comes from vendor and client research rather than broad industry surveys. Read these as benchmarks to test against your own context, not universal averages."),
    li("In crossnibble's 2026 India-specific vendor research, cold WhatsApp outreach reported 60 to 80 percent reply rates versus 10 to 20 percent for email."),
    li("In 12Grids' 2026 Indian B2B client benchmarks (not broad industry averages), WhatsApp message open rates were 82 to 91 percent versus 22 to 28 percent for email."),
    li("In 12Grids' client benchmarks, WhatsApp lead qualification time dropped from an average of 48 hours to under 2 hours when an AI bot handled first touch."),
    li("EchoLeads' 2026 vendor research reported 45 to 60 percent higher conversion rates with AI-driven WhatsApp qualification versus rule-based bots."),
    li("In 12Grids' client benchmarks, proper WhatsApp CRM integration helped sales reps manage 40 to 60 percent more conversations per day, while automated follow-up improved consistency versus manual follow-up."),

    eimg(
      imgs.whatsapp.url,
      "WhatsApp vs email lead qualification comparison for Indian B2B 2026: 60-80% WhatsApp reply rates vs 10-20% email, 82-91% WhatsApp open rates vs 22-28% email, qualification time drops from 48 hours to under 2 hours with AI bot first touch.",
      "WhatsApp versus email performance in Indian B2B. Source: crossnibble and 12Grids 2026 vendor and client research. Validate these benchmarks in your own funnel."
    ),

    h3("Why WhatsApp Specifically Wins in India"),
    p("WhatsApp is where Indian buyers actually are. Most B2B prospects in India will not pick up unknown phone calls, will not check email for hours, will not respond to LinkedIn messages from strangers, but will respond to WhatsApp messages within minutes. WhatsApp is the dominant personal communication channel in India, which means it gets immediate attention. The interface lowers the friction of a quick reply versus the formality of email. Meta Business Verification (Green Tick) provides legitimacy signalling that even cold outreach gets credit for."),

    h3("The Setup Pattern That Works for Indian B2B"),
    p("Across MagicWorks client work and the patterns we see in successful Indian B2B WhatsApp implementations, the architecture that produces the speed-to-lead and qualification accuracy benchmarks is consistent."),
    li("Click-to-WhatsApp ads on Meta and Google land prospects directly in chat with no intermediate form filling. In some Indian B2B campaigns, this can improve top-of-funnel conversion — but treat any 30 to 50 percent uplift claim as a benchmark to test, not a guaranteed outcome."),
    li("AI agent handles first-touch in 2-second response time (the netpartners 2026 benchmark for current-generation conversational AI), greeting the prospect, acknowledging their inquiry, and starting the qualification conversation."),
    li("AI runs BANT-style qualification through natural conversation. Three to five questions maximum, conversational tone, never feels like an interrogation form."),
    li("Qualified leads route to the right sales rep based on territory, industry, deal size, or product line. The receiving rep sees the full conversation transcript so they can pick up exactly where the AI left off."),
    li("Disqualified or not-yet-ready leads enter AI-managed nurture sequences that monitor for re-engagement signals and elevate them when they become sales-ready."),
    li("CRM sync happens automatically so the rep sees the full conversation, and marketing has accurate attribution back to the original ad campaign."),

    h3("Compliance Checklist for Indian B2B WhatsApp Automation"),
    p("Implementing WhatsApp automation in India requires DPDP Act compliance. The key obligations:"),
    li("Capture explicit opt-in before automated WhatsApp outreach and keep a record of when, where, and how consent was collected."),
    li("Use approved WhatsApp template messages for business-initiated conversations, and include a clear opt-out instruction in nurture flows."),
    li("Collect only the qualification data you actually need; map which fields move into the CRM, who can access them, and how long they are retained."),
    li("Under India's DPDP Act, give a clear notice, process personal data only for the specified purpose, and make consent withdrawal as easy as giving consent."),
    li("Maintain logs, role-based access, and data-processing terms with your WhatsApp BSP, CRM, and AI vendors. Serious failure to protect personal data can attract penalties up to ₹250 crore."),

    h3("The Cost Math, Anchored to Indian Budget Realities"),
    p("A working Indian WhatsApp AI lead qualification stack costs roughly ₹1 to 5 lakh first-year all-in for many Indian B2B businesses (Tier 2 in the cost framework in Section 5). The pipeline impact can be material when the business already has meaningful inquiry volume, clean ICP definitions, and disciplined sales follow-up. Validate ROI in your own 90-day pilot instead of assuming vendor benchmarks will transfer directly."),

    // ── Section 4 ─────────────────────────────────────────────────────────────
    h2("4. The Six-Component AI Lead Qualification Framework for Indian B2B Sales Heads"),
    p("Below is the six-component framework that any Indian B2B sales team can implement this quarter, with concrete guidance on what to do at each component and what good looks like."),

    eimg(
      imgs.sixcomp.url,
      "Six-component AI lead qualification framework for Indian B2B: (1) ICP definition with measurable signals, (2) behavioral signal tracking, (3) intent signals from third-party data, (4) conversational AI for first-touch, (5) AI-enhanced BANT/CHAMP/MEDDIC, (6) closed-loop feedback.",
      "The six-component AI lead qualification framework for Indian B2B. Each component builds on the previous; skipping any one creates a gap the system cannot compensate for."
    ),

    h3("Component 1: ICP Definition with Measurable Signals"),
    p("Most Indian B2B teams define their Ideal Customer Profile qualitatively — 'we sell to mid-market manufacturing companies.' This is not enough to build an AI qualification system on. AI scoring requires measurable signals: company size bands (employee count or revenue ranges), industry classification (NIC codes or similar), geographic location (city tier or specific cities), technology stack (does the company use the integrations your product needs), and growth signals (recent funding, hiring patterns, market expansion announcements)."),
    p("The cleaner the input signals, the better the AI scoring. Most Indian B2B teams should spend the first two weeks of any AI lead qualification project just clarifying ICP signals, before evaluating any vendor or building any qualification flow. This is the single highest-leverage activity in the implementation process."),

    h3("Component 2: Behavioral Signal Tracking"),
    p("Track what the prospect actually does, not just who they are. The behavioural signals that matter most for Indian B2B in 2026: pricing page visits (worth 15 to 25 points in a 100-point composite score), demo request submissions (worth 30 to 40 points), case study downloads in your specific industry (worth 10 to 15 points), email engagement signals (5 to 10 points per signal, capped at 20), and account-level signals where multiple stakeholders from the same company engage (separate company-level score on top of individual lead score)."),
    p("The houseofmartech 2026 framework recommends a 50 percent + 30 percent + 20 percent split: 50 points behavioural, 30 points firmographic fit, 20 points intent signals from third-party data, totalling 100 points. Set your Marketing Qualified Lead threshold at 60 to 80 points and your Sales Qualified Lead threshold higher."),

    h3("Component 3: Intent Signals from Third-Party Data"),
    p("Intent signals show that a prospect is researching your category, even before they hit your website or fill out a form. For Indian B2B, this includes review site visits (G2, Capterra, Software Suggest, GoodFirms which is India-specific), competitor comparison searches, and category-level Google searches. AI lead qualification platforms increasingly include intent data as native inputs through partnerships with Bombora, ZoomInfo Intent, or similar providers. The value of intent data is that it lets you reach high-DNA prospects in the awareness phase before they have committed to a vendor shortlist, which the demandzen 2026 research found is when the eventual winner usually gets selected."),

    h3("Component 4: Conversational AI for First-Touch Qualification"),
    p("EchoLeads' 2026 vendor research reports that AI agents can handle 70 to 85 percent of incoming inquiries end-to-end in some implementations, with the remaining 15 to 30 percent routed to humans. Treat this as a vendor benchmark to validate during your pilot."),
    p("The critical design choice: the AI must feel like a knowledgeable colleague, not an interrogation form. Three to five qualification questions, conversational tone, and immediate value when the prospect asks for pricing, product information, or scheduling. The single biggest design failure is AI that feels like a form. Indian buyers in particular abandon conversations that feel mechanical, and the conversation continues only when the AI delivers value at every turn."),

    h3("Component 5: AI-Enhanced BANT, CHAMP, or MEDDIC Frameworks"),
    p("Traditional qualification frameworks get enhanced when AI gathers signals automatically. Traditional BANT is reactive: you wait for prospects to confirm they have budget. AI lead qualification is proactive: it spots high-DNA matches before prospects have fully formed their requirements."),
    p("Indian sales heads should layer AI on top of their existing qualification framework, not replace it. BANT still works for short, transactional sales (deal value under ₹5 lakh, single decision-maker). MEDDIC or MEDDPICC works for enterprise deals with 6 to 10 stakeholders. CHAMP works as a middle ground for most Indian B2B businesses. The framework matters less than the consistency with which it gets applied across leads, which is where AI provides the biggest lift."),

    h3("Component 6: Closed-Loop Feedback"),
    p("AI scoring accuracy improves over time as the system learns which leads actually convert. Quarterly review of which signals correlated with closed-won versus closed-lost deals, and adjust the scoring weights accordingly. This is what separates a static rule-based scoring system (60 percent accurate per monday.com 2026 research) from a learning AI system (75 to 90 percent accurate)."),
    p("The closed-loop feedback is where most Indian B2B teams skip the work, treating AI scoring as a one-time setup rather than an ongoing operational discipline. Set up the quarterly review the same way Blog 3 framework recommends for AI shutdown discipline: same week every quarter, named owner, one-page status update against three core questions — is it being used, is the value growing, is the cost-to-value ratio improving."),

    pq("The framework matters less than the consistency with which it gets applied across leads. AI provides the biggest lift precisely by enforcing the consistency that manual qualification cannot. The closed-loop feedback layer is where most Indian B2B teams skip the work, and where the difference between 60 percent and 90 percent accuracy actually lives."),

    // ── Section 5 ─────────────────────────────────────────────────────────────
    h2("5. Build, Buy, or Partner: Indian Rupee Budget Tiers for AI Lead Qualification in 2026"),
    p("The tiers below are based on patterns we see across MagicWorks client work and verified against published 2026 Indian platform pricing. The tiers are meaningfully lower than equivalent Western benchmarks because the Indian WhatsApp Business API ecosystem has commoditised rapidly through 2025–2026."),

    h3("Tier 1: Under ₹1 Lakh First-Year (The Entry Layer)"),
    p("Tier 1 is where most Indian B2B businesses serious about AI lead qualification should start. The investments are small enough that failure is recoverable, but real enough that you will learn what works and what does not in your specific context."),
    co("Tier 1: What to Invest In", "", "stat", [
      "Native AI scoring inside your existing CRM — HubSpot Free or Starter, Zoho CRM Standard or Professional, Freshsales Suite, Salesforce Starter Suite.",
      "Basic WhatsApp Business API automation via Indian-built platforms: Wati, AiSensy, and Interakt offer entry tiers at ₹500 to ₹5,000 per month.",
      "Rule-based qualification flows with light AI scoring on top and conditional branching for common B2B patterns.",
      "Best fit: B2B teams under 10 people, or businesses with average deal size under ₹50,000 where heavier investment does not justify the spend.",
    ]),

    h3("Tier 2: ₹1 to 5 Lakh First-Year (The Integration Layer)"),
    p("Tier 2 is where most Indian B2B businesses serious about AI lead qualification should be operating by mid-2026. The investments at this level produce measurable returns within 6 to 12 months, but are small enough that kill criteria can be applied cleanly if things do not work."),
    co("Tier 2: What to Invest In", "", "stat", [
      "Dedicated AI conversational platform with BANT, CHAMP, or MEDDIC qualification logic built in. AI-driven conversation flows, not rule-based.",
      "WhatsApp Business API as primary channel, with web chat and email integration secondary. Unified inbox for all conversations.",
      "Native CRM integration (HubSpot Professional, Zoho CRM Enterprise, or Salesforce Professional). Lead routing automatic based on qualification score, territory, and product line.",
      "Behavioral and intent signal capture: pricing page visits, demo requests, content downloads, competitor comparison searches.",
      "Multilingual handling for English plus 1–2 regional languages relevant to your prospect base.",
    ]),
    p("MagicFlow AI is the conversational AI product we are building at MagicWorks for the Indian B2B context (launching shortly), with multilingual support for English plus regional languages, native WhatsApp integration, and BANT-style qualification logic. Magic Pipeline is the outreach CRM we are building to take qualified leads forward through the sales pipeline. Other Tier 2 contenders include Wati Conversational AI, AiSensy with AI add-ons, Drift, Intercom, and LeadSquared."),
    p("Tier 2 fits most Indian B2B businesses with sales teams between 10 and 50 people, deals between ₹50,000 and ₹5 lakh average value, and inbound lead volume above 100 leads per month. This is the sweet spot where AI lead qualification produces the highest ROI for the lowest operational complexity."),

    h3("Tier 3: ₹5 to 20 Lakh First-Year (The Enterprise Layer)"),
    p("Tier 3 is for Indian B2B businesses that have outgrown Tier 2 and need full sales enablement stacks, predictive lead scoring with custom ML models, and multi-channel orchestration. Tier 3 investments should require explicit ROI justification and have multi-quarter evaluation horizons."),
    co("Tier 3: What to Invest In", "", "stat", [
      "Full sales enablement stack with AI conversation intelligence — Gong, Chorus, Outreach (global); Mihup (Indian platform with DPDP Act compliance and regional language depth).",
      "Predictive lead scoring with custom ML models trained on your historical win/loss data, deal size, and conversion patterns.",
      "Multi-channel orchestration covering WhatsApp, Email, LinkedIn, Voice, and SMS, with AI deciding the right channel and timing for each prospect.",
      "Indian compliance features including DPDP Act handling (penalties up to ₹250 crore for serious violations), regional language depth across 2–4 languages, and full audit trail.",
      "Account-based marketing and sales features for B2B deals with multiple stakeholders.",
    ]),
    p("Tier 3 fits Indian B2B businesses with sales teams of 50+ people, deal values above ₹5 lakh average, multi-product sales motions, and complex enterprise buying committees. Most Indian SMEs and mid-market B2B businesses should not be at Tier 3 in 2026."),

    h3("The Honest Tradeoff for Indian Sales Heads in 2026"),
    p("Most Indian B2B businesses should be in Tier 2. Tier 1 lacks the qualification depth to actually filter the lead volume spike when it hits in late 2026 and 2027. Tier 3 is overkill for businesses where the ROI math does not justify the operational complexity. The discipline from Blog 3 still applies: budget the iceberg not the tip (multiply headline vendor prices by 3 to 4 for true first-year cost), plan the kill switch before launch, and evaluate on the right horizon — 6 to 12 months for Tier 2, not 30 to 90 days."),

    // ── Section 6 ─────────────────────────────────────────────────────────────
    h2("6. The 90-Day Implementation Plan You Can Start This Quarter"),
    p("Most Indian B2B businesses can complete this plan within a single fiscal quarter and see meaningful results by month 4 to month 6."),

    eimg(
      imgs.timeline.url,
      "90-day AI lead qualification implementation timeline for Indian B2B: Days 1-15 foundation (audit, ICP, vendor selection), Days 16-45 build (WhatsApp API, qualification flow, CRM integration, sales training), Days 46-75 launch (10-25% of inbound leads, weekly reviews), Days 76-90 scale and first quarterly review.",
      "The 90-day implementation plan for AI lead qualification. Most Indian B2B businesses can complete this within a single fiscal quarter."
    ),

    h3("Days 1 to 15: Foundation Phase"),
    li("Audit current lead sources, response times, and conversion rates by source. Capture: lead source, monthly volume, average response time, lead-to-MQL conversion, MQL-to-SQL conversion, SQL-to-closed conversion."),
    li("Define your ICP with measurable signals: company size bands, industry classification, geographic location, technology stack, growth signals. Document in writing."),
    li("Identify your highest-converting historical accounts from the last 12 months and document their common patterns. This becomes the training data for your AI scoring model."),
    li("Select 2 to 3 AI qualification platforms to evaluate. Schedule vendor demos. Request reference calls with existing customers in similar industries or business sizes."),

    h3("Days 16 to 45: Build Phase"),
    li("Deploy WhatsApp Business API if not already in place. Apply through your chosen Business Solution Provider (BSP). Allow 3 to 5 business days for approval."),
    li("Build initial qualification conversation flow: 3 to 5 questions maximum. First question opens the conversation, next 2–4 handle BANT or CHAMP-style qualification, final question confirms next steps or schedules a call."),
    li("Configure CRM integration and lead routing rules. Define which qualification scores trigger which actions (route to sales rep, enter nurture sequence, disqualify with reason)."),
    li("Train AI scoring model on historical win/loss data if the platform supports it."),
    li("Conduct internal training session for the sales team. Walk through the new handoff experience, what they will see when a lead arrives from AI, and how to follow up effectively when the conversation has already started."),

    h3("Days 46 to 75: Launch Phase"),
    li("Go live with AI qualification on 10 to 25 percent of inbound leads initially. Use a random split (every fourth lead, or by lead source) to compare AI-routed leads to human-routed leads on conversion outcomes."),
    li("Compare AI-routed leads to human-routed leads on three metrics: time to first response, qualification accuracy, and lead-to-meeting conversion rate."),
    li("Tune qualification thresholds based on early data. If too many leads are being passed to humans, raise the qualification score threshold. If too many are being disqualified incorrectly, lower the threshold or adjust signal weights."),
    li("Hold weekly reviews with the sales team during this phase. Their qualitative feedback on lead quality is as important as the quantitative metrics."),

    h3("Days 76 to 90: Scale and Review Phase"),
    li("Expand AI qualification to 100 percent of inbound leads. Continue running comparison metrics where possible to validate continued improvement."),
    li("Conduct first quarterly shutdown review per Blog 3 framework. Three questions: is it being used, is value clear and growing, is cost-to-value ratio improving? Document the answers and decide on continuation, adjustment, or kill."),
    li("Measure final metrics: time-to-first-response, qualification accuracy, MQL-to-SQL conversion, sales rep satisfaction, pipeline created from AI-qualified leads."),
    li("Document what you learned in the first 90 days. Adjust the system before locking in Year 2 plans, vendor renewals, or budget allocations."),

    h3("The Single Most Important Metric to Track"),
    p("Of all the metrics in the 90-day plan, one stands out as the most predictive: time from lead submission to first qualifying conversation. If this number drops from 42 to 47 hours (Indian B2B median per Optifai 2026) to under 5 minutes, the AI lead qualification system is working. If it does not drop, the system is failing regardless of what the other metrics say. This single number is the leading indicator that everything else will follow."),

    // ── Section 7 ─────────────────────────────────────────────────────────────
    h2("7. The Four Mistakes That Kill AI Lead Qualification in Indian B2B"),
    p("Across MagicWorks client work, four mistakes account for the majority of failed implementations. Each is genuinely contrarian to what most vendors will tell you, which is exactly why each is worth flagging."),

    h3("Mistake 1: Building the Qualification Flow Before Defining the ICP"),
    p("Most Indian sales heads start with the tool ('which WhatsApp platform should we choose?') before clarifying the inputs ('which leads are actually qualified for us?'). The result is an AI that scores leads against vague criteria, producing outputs sales teams do not trust. When sales teams do not trust the AI scoring, they manually triage every lead anyway, which defeats the entire purpose of the investment. Spend the first two weeks defining ICP with measurable signals before evaluating any vendor or building any qualification flow. This is the single highest-leverage activity in the implementation."),

    h3("Mistake 2: Treating AI as a Replacement for the Sales Team Rather Than a Filter"),
    p("The winning model is AI filter + human close. Indian B2B teams that push AI too far into closing motions risk losing trust in high-consideration purchases, especially where relationship, implementation fit, and procurement confidence matter. In 2026, the safer operating model is AI for first-touch qualification and routing, with humans handling discovery, trust-building, negotiation, and close."),

    h3("Mistake 3: Skipping the WhatsApp Layer"),
    p("Building an AI lead qualification system that does not include WhatsApp is structurally weaker for Indian B2B. The reply rates are too lopsided — 60 to 80 percent on WhatsApp versus 10 to 20 percent on email per crossnibble 2026 research. Email-only AI qualification is leaving most of the conversation volume on the floor. In 2026, Indian B2B buyers prefer WhatsApp for business communication, and an AI system that does not meet them there will systematically underperform."),

    h3("Mistake 4: Killing the System After 60 Days When Leading Indicators Are Not Yet Financial"),
    p("Per Blog 3 framework, AI investments need to be measured on the right horizon. Lead qualification AI typically shows adoption signals in 30 to 60 days (the team is using it), productivity signals in 90 to 120 days (the team is doing more with the same effort), quality and capability signals at 6 to 9 months (better conversations, better fit, better win rates), and clear financial impact at 9 to 18 months. Companies that pull the plug at month 2 because revenue impact is not yet visible are killing systems that would have worked. Use the right metrics at the right horizon, not financial metrics at month 2."),

    pq("Indian sales heads who do not build an AI lead qualification filter before the next lead-volume spike risk doing manual triage on more low-intent enquiries while faster competitors qualify and route first-touch conversations automatically. The math is uncomfortable, but it is actionable."),

    // ── About the Author ──────────────────────────────────────────────────────
    h2("About the Author"),
    p("Swapnil Ughade is Founder of MagicWorks IT Solutions Private Limited, an AI-first digital marketing agency based in Pune. MagicWorks helps Indian businesses across education, travel and wellness, manufacturing, and B2B services build AI-driven marketing and sales systems that turn investment into measurable outcomes. Swapnil is building two AI products that apply the framework in this article: MagicFlow AI, a conversational AI for inbound lead qualification, and Magic Pipeline, an outreach CRM for Indian B2B sales teams. Both products are launching shortly."),

    co("Want an AI Lead Qualification Audit for Your B2B Sales Operation?", "MagicWorks runs an AI Lead Qualification Audit for Indian B2B businesses, applying this framework to your current lead sources, response times, WhatsApp/CRM setup, and conversion patterns. The audit produces a written assessment, identifies the highest-leverage qualification improvements, and recommends a practical 90-day rollout path calibrated to your sector, deal size, and budget tier.\n\nCall: +91-9764566644 | Email: sales@magicworksitsolutions.com", "info"),

    // ── Related Reading ───────────────────────────────────────────────────────
    h2("Related Reading from MagicWorks"),
    li("Google AI Max is Here: What Indian Advertisers Must Change in the Next 90 Days. The second article in this series, covering the September 2026 migration of Dynamic Search Ads, automatically created assets, and campaign-level broad match settings into AI Max. The lead-quality problem this article warns about is the problem that AI lead qualification solves."),
    li("The CEO's Framework for AI Investment Decisions in Marketing and Sales. The third article in this series, with the four-quadrant decision filter, the 48-to-12 shutdown story, and the build vs buy vs partner analysis that informs the Section 5 decision in this article."),
    li("The Real Cost of AI in Indian Marketing and Sales: Honest Numbers Across 5 Use Cases. The fourth article in this series, covering the rupee budget tiers and hidden costs that anchor the Section 5 budget discussion in this article."),

    // ── Sources ───────────────────────────────────────────────────────────────
    h2("Sources Cited in This Article"),
    olLink("Artemis GTM: 2026 Speed to Lead Benchmark across 1,247 B2B companies", "https://artemisgtm.ai/research/speed-to-lead-benchmark-2026/"),
    olLink("Optifai: Lead Response Time Benchmarks across 939 B2B companies (Q2 2025 to Q1 2026)", "https://optif.ai/learn/questions/lead-response-time-benchmark/"),
    olLink("LeanData: Speed to Lead B2B Guide 2026", "https://www.leandata.com/blog/speed-to-lead-speed-is-the-key-to-lead-conversion/"),
    olLink("MIT/HBR Lead Response Management Study (Oldroyd, McElheran, Elkington, 2011 — validated 2026)", "https://hbr.org/2011/03/the-short-life-of-online-sales-leads"),
    olLink("12Grids: WhatsApp Business CRM for B2B Lead Generation in India 2026", "https://www.12grids.com/articles/whatsapp-business-crm-lead-generation-india-b2b"),
    olLink("crossnibble: WhatsApp AI Automation for B2B Lead Qualification (India-specific)", "https://www.crossnibble.com/blog/whatsapp-ai-chatbot-b2b-qualification/"),
    olLink("OryNet: Cost Per Lead in India by Industry (Google and Meta Comparison 2026)", "https://orynet.com/cost-per-lead-in-india-by-industry-google-meta-comparison-2026/"),
    olLink("EchoLeads: Affordable WhatsApp Automation for B2B Lead Qualification 2026", "https://echoleads.ai/blog/affordable-whatsapp-automation-b2b-lead-qualification"),
    olLink("monday.com: How to Qualify Sales Leads with AI 2026", "https://monday.com/blog/crm-and-sales/how-to-qualify-sales-leads/"),
    olLink("House of MarTech: Lead Qualification Framework for 2026", "https://houseofmartech.com/blog/lead-qualification-framework-for-2026-combining-behavioral-signals-firmographics-and-ai-scoring"),
    olLink("NetPartners: Lead Response Time 2026 — The 5-Minute Rule Explained", "https://netpartners.marketing/lead-response-time-2/"),
    olLink("GrowthSpree: Eliminate Junk Leads from Meta and Google for B2B SaaS 2026", "https://www.growthspreeofficial.com/blogs/how-to-eliminate-junk-leads-from-meta-google-for-b2b-saas-2026-playbook"),
    olLink("DemandZen: How AI Assists in Lead Qualification (Beyond BANT) 2026", "https://demandzen.com/how-does-ai-assist-in-lead-qualification-predictive-models"),
    olLink("CalLeads AI: Lead Response Time Statistics 2026", "https://calleadsai.com/blog/lead-response-time-statistics-2026"),
    olLink("Salesforce: State of the Connected Customer — 82 percent of B2B buyers expect immediate response", "https://www.salesforce.com/resources/research-reports/state-of-the-connected-customer/"),
    olLink("Google: Dynamic Search Ads transition to AI Max 2026", "https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/"),
    olLink("India DPDP Act 2023 (Digital Personal Data Protection Act)", "https://www.indiacode.nic.in/bitstream/123456789/22037/1/a2023-22.pdf"),
  ];
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = [
  {
    question: "What is AI lead qualification and how is it different from manual lead scoring?",
    answer: "AI lead qualification uses machine learning to evaluate inbound leads against your ICP and intent signals automatically, scoring fit and intent through real-time conversation rather than waiting for a sales rep to manually review the lead. Manual lead scoring uses static rules — +10 points for VP title, +5 for company size over 100. AI lead qualification uses adaptive models that learn which signals actually correlate with closed deals over time, improving accuracy from approximately 60 percent (manual) to 75 to 90 percent (AI-enhanced) per monday.com 2026 research. The key difference is that AI lead qualification handles first-touch conversation, not just scoring. The AI engages the prospect, asks qualifying questions through natural conversation, gathers signals, and routes qualified leads to humans with full context. Manual lead scoring is a number. AI lead qualification is a working system.",
  },
  {
    question: "How fast should I respond to B2B leads in India in 2026?",
    answer: "Under 5 minutes if possible, sub-2-seconds for the AI first-touch and under 60 minutes for the human follow-up. The data is unambiguous. Leads contacted within 5 minutes are 21x more likely to qualify than leads contacted at 30 minutes per HBR/MIT research validated through 2026. 5-minute responders close at 32 percent versus 24-hour responders at 12 percent per Optifai 2026 analysis of 939 B2B companies. The median Indian B2B response time is 42 to 47 hours, which means most of your competitors are losing the speed-to-lead race. AI lead qualification is how you win it without scaling your sales team headcount, because AI can deliver 2-second response time on first-touch 24/7 while your team handles the warmer follow-up conversations.",
  },
  {
    question: "Why is WhatsApp so important for Indian B2B lead qualification?",
    answer: "WhatsApp is where many Indian buyers actually respond. In crossnibble's 2026 India-specific vendor research, cold WhatsApp outreach reported 60 to 80 percent reply rates versus 10 to 20 percent for email. In 12Grids' Indian B2B client benchmarks, WhatsApp message open rates were 82 to 91 percent versus 22 to 28 percent for email, and qualification time dropped from 48 hours to under 2 hours when an AI bot handled first touch. Treat these as vendor/client benchmarks to validate in your own funnel, not universal market averages. The setup that works for Indian B2B: click-to-WhatsApp ads on Meta and Google, AI agent handles first-touch quickly, qualified leads route to sales reps with full conversation context, and CRM sync happens automatically.",
  },
  {
    question: "How much does AI lead qualification cost in India?",
    answer: "Indian AI lead qualification costs sort into three tiers. Tier 1 (under ₹1 lakh per year) covers native AI scoring in your CRM plus basic WhatsApp Business API automation through platforms like Wati, AiSensy, or Interakt. Tier 2 (₹1 to 5 lakh per year) covers dedicated AI conversational platforms with BANT/MEDDIC qualification logic, full WhatsApp plus web chat plus email integration, native CRM sync, and behavioral signal tracking. Tier 3 (₹5 to 20 lakh per year) covers full sales enablement stacks with AI conversation intelligence, predictive lead scoring with custom ML models, and multi-channel orchestration. Most Indian B2B businesses serious about AI lead qualification should be in Tier 2 by mid-2026. The Indian rupee tiers are meaningfully lower than equivalent Western benchmarks because the Indian WhatsApp Business API ecosystem has commoditised rapidly.",
  },
  {
    question: "Should I use AI lead qualification on top of BANT or MEDDIC?",
    answer: "Yes, layer AI on top of your existing qualification framework rather than replacing it. Traditional BANT is reactive: you wait for prospects to confirm they have budget. AI lead qualification is proactive: it spots high-DNA matches before prospects have fully formed their requirements. BANT still works for short, transactional sales (deal value under ₹5 lakh, single decision-maker). MEDDIC or MEDDPICC works for enterprise deals with 6 to 10 stakeholders. CHAMP works as a middle ground for most Indian B2B businesses. The framework matters less than the consistency with which it gets applied across leads, which is where AI provides the biggest lift. AI does not replace the framework; it enforces the consistency the framework promises but manual qualification cannot deliver.",
  },
  {
    question: "How long does it take to see results from AI lead qualification?",
    answer: "Adoption signals show in 30 to 60 days (the team is using the AI). Productivity signals show in 90 to 120 days (the team is doing more with the same effort — response times drop, conversation volume per rep rises). Quality and capability signals show at 6 to 9 months (better conversations, better fit, better win rates). Clear financial impact shows at 9 to 18 months (pipeline value, closed-won revenue, cost-per-acquisition improvements). Companies that pull the plug at month 2 because revenue impact is not yet visible are killing systems that would have worked. The single most important metric in the first 90 days is time from lead submission to first qualifying conversation. If that drops from 42 hours to under 5 minutes, the system is working. Other metrics will follow.",
  },
  {
    question: "What is the best AI lead qualification platform for Indian businesses?",
    answer: "The right platform depends on your tier. For Tier 1 (under ₹1 lakh per year), Indian platforms like Wati, AiSensy, and Interakt offer entry-tier WhatsApp Business API automation with light AI scoring layered on top. For Tier 2 (₹1 to 5 lakh per year), evaluate dedicated AI conversational platforms with BANT/MEDDIC logic, WhatsApp-first workflows, multilingual handling, native CRM sync, and proof from similar Indian B2B customers. MagicFlow AI is the conversational AI product we are building at MagicWorks for the Indian B2B context (launching shortly). Other contenders at Tier 2 include Wati Conversational AI, Drift, Intercom, and LeadSquared. For Tier 3 (₹5 to 20 lakh per year), evaluate full sales enablement stacks such as Gong, Mihup, Outreach, and broader CRM/marketing automation platforms. The right answer depends on your sales motion, deal size, data quality, WhatsApp requirements, and team size, not on which platform has the strongest marketing.",
  },
  {
    question: "How does AI lead qualification work for education sector institutions?",
    answer: "Indian education institutions use AI lead qualification with two adjustments from generic B2B. First, the qualification criteria are different — instead of BANT, education institutions qualify on programme fit, fee affordability, eligibility (academic prerequisites), and decision timeline relative to enrollment cycles. Second, the evaluation horizon must align with the enrollment cycle, typically 9 to 18 months from first enquiry to course start. AI investments aimed at student enrollment cannot be meaningfully evaluated on shorter horizons than the underlying business cycle. WhatsApp dominance applies equally in education: most prospective students in India will not check email regularly but will respond to WhatsApp within minutes. The Tier 2 budget (₹1 to 5 lakh per year) typically covers what most Indian education institutions need for AI counsellor support combined with multilingual student communication.",
  },
  {
    question: "What is the biggest mistake Indian sales heads make with AI lead qualification?",
    answer: "Building the qualification flow before defining the ICP. Most Indian sales heads start with the tool ('which WhatsApp platform should we choose?') before clarifying the inputs ('which leads are actually qualified for us?'). The result is an AI that scores leads against vague criteria, producing outputs sales teams do not trust. When sales teams do not trust the AI scoring, they manually triage every lead anyway, which defeats the entire purpose of the investment. Spend the first two weeks defining ICP with measurable signals — company size bands, industry classification, geographic location, technology stack, growth signals — before evaluating any vendor or building any qualification flow. The second biggest mistake is treating AI as a replacement for the sales team rather than a filter. The winning model is AI filter + human close, not AI close.",
  },
  {
    question: "Should I build AI lead qualification internally or buy from a vendor?",
    answer: "Default to buy, per the MIT Project NANDA research covered in Blog 3 of this series. Companies that purchase AI tools from specialised vendors and build partnerships succeed about 67 percent of the time. Companies that build AI internally succeed only one-third as often (approximately 22 percent). For most Indian B2B businesses, off-the-shelf AI lead qualification vendor solutions outperform internal builds. Partner with a specialist when you need Indian language depth, multi-vendor integration glue, or workflow customisation that off-the-shelf tools cannot deliver. Build internally only when you have proprietary data that creates genuine competitive advantage, the AI is core to product differentiation rather than a support function, and you have at least six dedicated engineers with 12 or more months of runway. Most Indian SMEs do not meet these conditions in 2026.",
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
const SLUG = "ai-lead-qualification-b2b-india-sales-heads-2026";

async function main() {
  // Guard: don't create duplicates
  const existing = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id }`,
    { slug: SLUG }
  );
  if (existing) {
    console.error(`❌  Document already exists: ${existing._id}`);
    console.error(`    Delete it in Studio first, or run a patch script instead.`);
    process.exit(1);
  }

  // Author lookup
  console.log("\n🔍  Looking up author Swapnil Ughade…");
  const author = await client.fetch(
    `*[_type == "teamMember" && name match "Swapnil*"][0]{ _id, name }`
  );
  if (!author) { console.error("❌  Author not found — check teamMember documents"); process.exit(1); }
  console.log(`✅  Author: ${author.name} (${author._id})`);

  // Upload images
  console.log("\n📤  Uploading images…");
  const imgs = await uploadImages();

  // Build body
  const body = buildBody(imgs);
  console.log(`\n📝  Body: ${body.length} blocks`);

  // Assemble document
  const doc = {
    _type: "insight",
    title: "AI Lead Qualification for B2B India: How Sales Heads Should Build the Filter Before the Lead Volume Spike",
    slug:        { _type: "slug", current: SLUG },
    excerpt:     "How Indian B2B sales heads should build AI lead qualification before the lead volume spike. WhatsApp benchmarks, rupee tiers, and 90-day plan.",
    seoTitle:    "AI Lead Qualification for B2B India: 2026 Sales Head Guide",
    categories:  ["AI & Automation"],
    pillar:      "AI Consultation",
    publishedAt: "2026-05-29T10:00:00.000Z",
    author:      { _type: "reference", _ref: author._id },
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: imgs.hero._id } },
    tags: [
      "AI lead qualification B2B India",
      "WhatsApp lead qualification India",
      "AI sales filter",
      "speed to lead India",
      "B2B lead scoring India 2026",
      "AI BANT qualification",
    ],
    body,
    faq: FAQ.map(f => ({ _type: "object", _key: k("faq"), question: f.question, answer: f.answer })),
  };

  console.log("\n💾  Creating document…");
  const created = await client.create(doc);
  console.log(`✅  Created: ${created._id}`);
  console.log(`\n🎉  Open in Studio to review:`);
  console.log(`    https://${PROJECT_ID}.sanity.studio/structure/insight;${created._id}\n`);
}

main().catch(err => { console.error(`\n❌  Fatal:`, err.message); process.exit(1); });
