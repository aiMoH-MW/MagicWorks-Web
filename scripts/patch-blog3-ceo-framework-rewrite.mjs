/**
 * patch-blog3-ceo-framework-rewrite.mjs
 *
 * Full rewrite of "AI Investment Framework for Indian CEOs" blog post.
 * Source: CEO AI Investment Framework 2026
 *
 * Updates: body (PortableText), faq, excerpt, seoTitle, tags
 * Preserves: existing cover image, slug, author, publishedAt, category
 *
 * Run: node scripts/patch-blog3-ceo-framework-rewrite.mjs
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
    p("Gartner predicts that more than 40 percent of agentic AI projects will be canceled by the end of 2027 due to escalating costs, unclear business value, and inadequate risk controls. MIT's Project NANDA found that 95 percent of enterprise generative AI pilots deliver no measurable business return, despite $30 to $40 billion in global enterprise spending. And yet, according to Deloitte's 2026 State of AI Enterprise India report, 94 percent of Indian organisations expect AI spend to increase in the next year, while NASSCOM data shows less than 15 percent have aligned their AI strategy with their corporate strategy."),
    p("The gap between investment intent and investment discipline is the single biggest problem facing Indian CEOs in 2026. This guide gives you the framework to be in the 5 percent that work, not the 95 percent that fail."),

    sr(
      { value: "95%", label: "of enterprise GenAI pilots deliver no measurable return", note: "MIT Project NANDA" },
      { value: "40%+", label: "of agentic AI projects will be cancelled by 2027", note: "Gartner, June 2025" },
      { value: "94%", label: "of Indian organisations expect AI spend to increase", note: "Deloitte India 2026" },
    ),

    // ── What This Article Covers ──────────────────────────────────────────────
    h2("What This Article Covers"),
    li("The four-quadrant decision filter every AI investment must pass"),
    li("The investment order of operations for Indian businesses in 2026, with rupee budget tiers"),
    li("The shutdown discipline: why most AI projects should be killed earlier than they are"),
    li("Build versus buy versus partner: what the MIT NANDA research actually tells you"),
    li("What \"good return\" looks like on an 18-month AI horizon"),
    li("What to do this week, broken down by role and budget tier"),
    li("Frequently asked questions about AI investment decisions in India"),

    // ── Section 1: Four-Quadrant Filter ──────────────────────────────────────
    h2("1. The Four-Quadrant Decision Filter Every AI Investment Must Pass"),
    p("Most CEOs I work with do not have an AI investment problem. They have an AI decision problem. The investments themselves are often defensible. The order of those investments, the cost commitment relative to reversibility, and the discipline around shutting down what is not working — that is where the money goes wrong."),
    p("Before a single rupee is committed to an AI initiative in your business, run it through these four filters. Each is a real, specific question. None is rhetorical. If the answers add up well, proceed. If they do not, stop."),

    h3("Filter 1: How Reversible is This Decision?"),
    p("AI investments sit on a spectrum from fully reversible to nearly irreversible. A monthly SaaS subscription you can cancel is reversible. An AI implementation that requires rebuilding your team's workflow, retraining your staff on a new system, and rewiring your data pipeline is not. The more irreversible the decision, the higher the bar for evidence before you commit. This is the single most underweighted factor in Indian AI decision-making in 2026."),
    p("Vendors emphasise upside. They rarely talk about what happens if it does not work. As Gartner's Anushree Verma noted in the June 2025 press release on agentic AI cancellation, \"Most agentic AI projects right now are early stage experiments or proof of concepts that are mostly driven by hype and are often misapplied. This can blind organizations to the real cost and complexity of deploying AI agents at scale, stalling projects from moving into production.\""),
    p("For Indian CEOs, the reversibility test is simple: if this fails in 90 days, can I undo it cleanly without wasted teams, broken workflows, or stranded data? If the answer is no, you need significantly more evidence before committing."),

    h3("Filter 2: What is the Cost Magnitude Relative to My Business?"),
    p("Indian AI investments naturally cluster into three budget tiers, and the discipline required at each tier is fundamentally different. Section 2 covers the tiers in detail. The filter at this stage is simpler: is this investment small enough that failure is recoverable, medium enough that failure forces serious reflection, or large enough that failure is a board-level event?"),
    p("The danger zone is medium investments treated like small ones. A ₹25 lakh AI commitment evaluated with the same casual discipline as a ₹2 lakh SaaS subscription is how Indian businesses end up with three abandoned pilots and no measurable returns."),

    h3("Filter 3: What is the Realistic Time to Value?"),
    p("Indian businesses systematically underestimate AI implementation timelines. The vendor pitch says weeks. The pilot phase lasts months. The genuine business impact usually shows up at month 6 to month 9 at the earliest, and clear return on investment more typically lands between months 12 and 18. If your board, your CFO, or you yourself are expecting payback in one quarter, you are setting up the project to be killed exactly when it would have started working."),
    p("There is a specific Indian advantage worth knowing here. Research from OG Marka's 2026 enterprise conversational AI guide found that Indian deployments see 20 to 40 percent faster payback than Western deployments at the same revenue scale, driven by labor cost arbitrage and multilingual necessity. That moves typical enterprise conversational AI payback from 12 to 18 months in Western markets down to 8 to 14 months in India. Real, but still not weeks."),

    h3("Filter 4: Is This Strategic or Operational?"),
    p("Strategic AI investments make your business different. Operational AI investments make your business faster. Both are legitimate. The decision criteria differ. Strategic AI investments should be evaluated on competitive differentiation, defensibility, and 24 to 36 month horizon impact. Operational AI investments should be evaluated on productivity, cost savings, and quality of life for your team. Mixing the two evaluation frames is how Indian businesses end up with strategic-grade investments measured by operational metrics."),

    h3("The Four Quadrants Combined: Your Prioritisation Matrix"),
    p("Plot every active and proposed AI investment against these four filters. The clearest first investments are: high reversibility, low cost, fast time to value, operational. The investments that need genuine board-level scrutiny: low reversibility, high cost, slow time to value, strategic."),

    co("A Worked Example: Indian Education Institution", "Question: invest in a generic AI chatbot for student inquiries, or build a custom NEP 2020-aligned learning assistant?\n\nThe chatbot scores well on filters 1, 2, and 3 (high reversibility, low cost, fast time to value) but is operational, not strategic. The custom learning assistant is lower on filters 1 and 3 but is genuinely strategic.\n\nEvaluate them differently, expect different timelines, and never let the strategic investment be killed using operational-grade ROI metrics applied at the wrong horizon.", "info"),

    pq("The single most underweighted factor in Indian AI decision-making in 2026 is reversibility. If this fails in 90 days, can I undo it cleanly? That one question would have killed half the failed AI projects I have seen this year before they ever started."),

    // ── Section 2: Investment Order of Operations ─────────────────────────────
    h2("2. The Investment Order of Operations for Indian Businesses in 2026"),
    p("Indian AI budgets sort cleanly into three tiers, with different evaluation discipline required at each tier. NASSCOM's 2026 AI Adoption Index found that 67 percent of Indian enterprises allocate less than 10 percent of their IT budget to AI, while 90 percent indicate they are increasing AI allocation within digital budgets in CY26. The Indian AI market is growing at 25 to 35 percent CAGR."),

    h3("Tier 1: Under ₹5 Lakh Per Year (The Experimentation Layer)"),
    p("This is where every Indian business should start, and where most should stay for the first 6 to 12 months of any AI initiative. The point of Tier 1 is not to transform your business. It is to validate AI concepts, build organisational muscle for working with AI, and generate the proof points that justify larger investments later."),

    co("What to Invest in at Tier 1", "", "key-takeaway", [
      "WhatsApp Business AI chatbot for first-touch lead qualification. Indian enterprise conversational AI shows 30 to 60 day payback at this scale.",
      "AI-powered content tools for the marketing team: ChatGPT Team or Claude Pro for content drafting, Jasper or Copy.ai for templated campaign output.",
      "Generic CRM AI features: lead scoring inside HubSpot, AI-driven email sequencing, conversation intelligence in basic call recording tools.",
      "AI-enhanced design and research tools: Canva Pro AI, Perplexity Pro for competitive research, Notion AI for internal knowledge management.",
    ]),

    h4("Education Sector at Tier 1"),
    p("For Indian universities, colleges, coaching institutes, and EdTech companies, the Tier 1 starting points are: WhatsApp AI for prospective student inquiries especially during peak admission windows, AI lead scoring on enquiry forms to identify which prospects are 30 days from enrollment versus 6 months out, AI-powered content tools for the admissions marketing team, and AI-enhanced research tools for faculty productivity. None of these require irreversible commitment. All of them can be evaluated and either expanded or killed within a single admission cycle."),

    h3("Tier 2: ₹5 to 50 Lakh Per Year (The Integration Layer)"),
    p("Tier 2 is where most Indian businesses serious about AI in 2026 should be operating. The investments at this level are real enough to generate measurable returns, but small enough that failure is recoverable. The discipline at Tier 2 is fundamentally different from Tier 1: every investment must have a named owner, a defined success metric, a 90-day review cadence, and a documented kill criterion."),

    co("What to Invest in at Tier 2", "", "key-takeaway", [
      "Dedicated conversational AI for customer support and pre-sales. Indian payback typically 8 to 14 months, with Year 2 ROI in the 300 to 400 percent range when integration is done well.",
      "Marketing automation with AI personalisation: content personalisation at scale, dynamic creative optimisation, and predictive audience segmentation.",
      "Sales enablement AI: conversation intelligence platforms like Gong or Indian equivalents, AI-driven deal scoring, automated meeting note synthesis flowing into your CRM.",
      "AI-enhanced campaign operations: programmatic media buying with AI optimisation, AI-driven landing page testing, automated reporting pipelines.",
    ]),

    h4("Education Sector at Tier 2"),
    p("This is where most Indian education institutions should focus their AI spending in 2026–27. Key use cases: AI-powered counsellor support that helps human counsellors handle more inquiries with higher quality (augmenting, not replacing); multilingual student communication across English plus 2 to 3 regional languages; AI-driven enrollment nurturing across the 9 to 18 month decision cycle; faculty productivity tools; and alumni engagement and re-marketing systems."),

    h3("Tier 3: Over ₹50 Lakh Per Year (The Strategic Layer)"),
    p("Tier 3 investments should be rare. They should require board approval. They should have a multi-year evaluation horizon. Most Indian businesses should not be at Tier 3 in 2026. The ones that are need a clear strategic thesis for why this AI investment creates competitive differentiation that cannot be matched by Tier 2 spending elsewhere."),
    p("What to invest in at Tier 3:"),
    li("Custom AI built on proprietary data that creates genuine competitive advantage. MIT's Project NANDA found that internal builds succeed only one-third as often as buying from specialised vendors."),
    li("Full marketing and sales operating system rebuild around AI. Only when your existing system is genuinely incompatible with AI augmentation."),
    li("Industry-specific AI platforms when the use case justifies the cost. For education, this might mean proprietary learning platforms aligned to NEP 2020."),

    h4("Education Sector at Tier 3"),
    p("For most Indian education institutions, Tier 3 investments should typically be deferred until 2027 or 2028 unless you are a multi-campus institution with proprietary curriculum data and the engineering capacity to support the build. Exceptions: large universities investing in AI tutoring platforms aligned to NEP 2020, EdTech companies building proprietary adaptive learning engines as core product differentiation."),

    h3("The Counterintuitive Finding Most Indian Businesses Miss"),
    co("Where the Real ROI Actually Sits", "MIT's NANDA research found that more than half of generative AI budgets are devoted to sales and marketing tools, yet the biggest measurable ROI sits in back-office automation — where companies eliminate BPO costs, cut external agency spend, and streamline operations.\n\nMarketing and sales AI investments need to be justified on broader grounds: competitive positioning, customer experience, and strategic value. Indian CEOs who try to defend marketing AI spend on cost-savings metrics alone often lose the argument, cancel the investment, then find themselves outpaced by AI-native competitors 12 months later.", "warning"),

    pq("More than half of GenAI budgets are devoted to sales and marketing tools, yet the biggest ROI is in back-office automation. Indian CEOs evaluating marketing and sales AI on cost savings alone will lose the argument every time. The case has to be made on competitive positioning and customer experience."),

    // ── Section 3: Shutdown Discipline ───────────────────────────────────────
    h2("3. The Shutdown Discipline: Why Most AI Projects Should Be Killed Earlier"),
    p("Over the last 18 months at MagicWorks, we built 48 internal AI agents. Lead scoring agents, content drafting agents, reporting agents, campaign optimisation agents — every category of marketing and sales AI we believed our clients would eventually need. We built them so we could understand what worked, what failed, and where the genuine value was."),
    p("We shut down 36 of them. The 12 agents we kept now produce roughly 80 percent of the value across our entire AI operation. The 36 we shut down were not bad agents. Many of them worked technically. But they failed one or more of the three tests every AI investment has to pass: they were not being used, the value was not clearly growing, or the cost-to-value ratio was getting worse over time."),
    p("The willingness to kill is the single most undervalued discipline in Indian AI strategy in 2026."),

    h3("Why Gartner's 40 Percent Cancellation Prediction is Probably Optimistic"),
    p("Gartner predicts that more than 40 percent of agentic AI projects will be canceled by the end of 2027. In our experience, the actual percentage that should be cancelled is higher, but most will not be cancelled because nobody owns the decision. AI projects in Indian businesses tend to die slowly, draining budget and team attention for quarters longer than they should, because no senior person is willing to be the one who declared the experiment over. This is what shutdown discipline solves."),

    h3("The Three Warning Signs You are Funding the Wrong Agent"),

    h4("Warning Sign 1: The Agent Works but Nobody is Changing Their Workflow to Use It"),
    p("This is the most common failure pattern. The AI does what it was built to do, but the team is not adjusting how they work to make use of it. In Indian EdTech, the classic version of this failure is an AI chatbot that answers prospective student queries but never gets used by the counselling team because they do not trust the AI's answers on fee structures and scholarship eligibility. The technology works. The trust does not. The agent dies of disuse."),

    h4("Warning Sign 2: The Agent's Accuracy Plateaus Below the Threshold Your Team Trusts"),
    p("If your agent has been in production for 90 days and accuracy on the cases that matter is stuck below the level your team considers trustworthy, you are unlikely to close the gap with more time. For most marketing and sales AI in Indian businesses, the trust threshold is around 85 to 90 percent on the cases that matter. Below that, your team will spend more time verifying the AI's output than they would have spent doing the work themselves."),

    h4("Warning Sign 3: The Cost-to-Maintain Line Keeps Growing Faster Than the Value Line"),
    p("CMARIX research from 2026 found that operational costs for production AI systems typically surpass development costs within 18 to 24 months. AI is not a one-time investment — it is an ongoing operational commitment. If the cost to maintain your AI is growing faster than the value it produces, the trajectory is unsustainable."),

    h3("The Quarterly Shutdown Review"),
    co("The Quarterly Review Framework", "", "key-takeaway", [
      "Every AI investment is evaluated against three questions every 90 days.",
      "Is it being used by the intended team?",
      "Is the value clear and growing over time?",
      "Is the cost-to-value ratio improving?",
      "Three NO answers: kill it. Two NO answers: one more quarter with a named owner accountable for turning the trajectory around. One NO answer: continue and monitor.",
    ]),

    p("Put the quarterly review in the calendar. Make it the same week every quarter. Have the person responsible for each AI investment present a one-page status update against these three questions."),

    pq("We built 48 internal AI agents at MagicWorks. We shut down 36. The 12 we kept produce 80 percent of the value. The willingness to kill is the single most undervalued discipline in Indian AI strategy in 2026, and it is the discipline that separates the 5 percent of pilots that work from the 95 percent that do not."),

    // ── Section 4: Build vs Buy vs Partner ───────────────────────────────────
    h2("4. Build Versus Buy Versus Partner: What the MIT NANDA Research Actually Tells You"),
    p("This is the section where Indian CEOs lose the most money, often unknowingly. The decision to build AI internally versus buy from a vendor versus partner with a specialist gets framed as a strategic question about control and differentiation. In practice, it is more often a question about success probability."),
    p("The MIT Project NANDA research finding on this point is unambiguous. Companies that purchase AI tools from specialised vendors and build partnerships succeed about 67 percent of the time. Companies that build AI internally succeed only one-third as often. That is a roughly 22 percent success rate for internal builds versus 67 percent for buy and partner approaches."),

    h3("The Default: Buy from a Specialised Vendor"),
    p("For most Indian marketing and sales AI needs, a specialised vendor solution will outperform internal builds. Off-the-shelf conversational AI, marketing automation, CRM AI features, content tools, sales intelligence platforms — all of these categories have mature vendors with solutions that work, integrate cleanly, and have been tested across hundreds of customer accounts. The 67 percent success rate is the baseline."),

    h3("When to Partner with a Specialist"),
    p("Partnering sits between buy and build. You do not own the underlying AI technology, but a specialist partner builds workflows, integrations, and customisations specific to your business. This is often the right answer for Indian businesses with specific workflow needs no off-the-shelf tool addresses cleanly. For education, the classic example is an institution running multiple program-specific enrollment funnels with regional language requirements."),

    h3("When to Build Internally (Rarely)"),
    p("Internal builds make sense in three specific situations and almost no others. First, when you have proprietary data that creates genuine competitive advantage and exposing it to a third party would undermine that advantage. Second, when the AI is core to your product differentiation, not a support function for it. Third, when you have the engineering team to sustain it — per Inkeep's 2026 build-versus-buy framework, that means at least six dedicated engineers and 12 or more months of runway. Most Indian SMEs do not meet these conditions."),

    h3("The Hidden Integration Cost Trap Nobody Warns You About"),
    p("CMARIX's 2026 build-versus-buy guide found that hidden integration costs add 150 to 200 percent to buy decisions. Vendor demos make integration look clean. Real implementation almost never is. Connecting an AI system to your existing CRM, helpdesk, inventory or LMS, billing system, and data warehouse takes longer and costs more than the vendor pitch suggests, every time. Indian CEOs should plan for this explicitly. If a vendor quotes you ₹15 lakh for an annual subscription, budget another ₹15 to ₹30 lakh for integration, change management, and team training before the system reaches productive use."),

    co("Build vs Buy Decision Tree", "", "stat", [
      "Standard marketing or sales workflow → Buy off-the-shelf. Success probability: ~67% (MIT NANDA).",
      "Standard workflow with India-specific customisation needed → Buy and partner. Success probability: ~60–65%.",
      "Multi-vendor stack needing integration glue → Partner-led implementation. Success probability: ~55–65%.",
      "Proprietary data, core to differentiation, 6+ engineers available → Build. Success probability: ~22% (MIT NANDA).",
      "Proprietary data, core to differentiation, fewer than 6 engineers → Reconsider scope or buy. Build success drops below 15%.",
    ]),

    // ── Section 5: What Good Return Looks Like ────────────────────────────────
    h2("5. What \"Good Return\" Looks Like on an 18-Month AI Horizon"),
    p("Most Indian CEOs are measuring AI returns wrong because the financial signal is the slowest part of the system. By the time revenue or cost impact shows up in the P&L, six to twelve months of leading indicators have already played out."),

    h3("Months 1 to 3: Adoption Signals"),
    p("In the first 90 days, do not look at financial impact. Look at whether the team is actually using the AI. Daily active usage is the cleanest measure. Completion rates on AI-recommended actions. Override rates, where the team manually overrides the AI's suggestion. If usage is low, completion rates are weak, or override rates are climbing, the investment is in trouble regardless of what the financial dashboard says later."),

    h3("Months 3 to 6: Productivity Signals"),
    p("Once adoption is established, look at productivity. Is the team doing more of what they were already doing, faster? Hours saved per task is a soft proxy. Output per person per week is the better measure. At this stage, the productivity gains will be modest. Typical real-world gains in months 3 to 6 sit somewhere between 15 and 30 percent on the workflows the AI directly touches."),

    h3("Months 6 to 12: Quality and Capability Signals"),
    p("This is where AI investments start showing their genuine value. The question changes from \"are we doing the same work faster\" to \"are we doing things we could not do before.\" More leads contacted, more personalised outreach, faster response times, lower error rates on routine processes, expanded surface area of customer interactions."),

    h3("Months 12 to 18: Financial Signals"),
    p("Now look at financial outcomes. Revenue impact, cost reduction, margin improvement. By this stage, your AI investments should be either showing measurable returns or showing clear evidence that returns are imminent. If you have done the work in the earlier phases and the financial signals are weak, that is a real warning."),

    h4("Education Sector: The 24-Month Horizon is the Minimum"),
    p("For Indian education institutions, enrollment cycles run 9 to 18 months naturally, from first enquiry to course start. AI investments aimed at enrollment marketing, student communication, or counsellor productivity cannot meaningfully be evaluated on shorter horizons than the underlying business cycle they support. Board reporting cadences for education AI investments should be calibrated to the enrollment cycle, not the fiscal quarter."),

    h3("The Indian Conversational AI Advantage"),
    p("There is one important caveat for Indian businesses. Specific categories of AI — particularly conversational AI for customer support and sales pre-qualification — deliver faster payback in India than in Western markets. OG Marka's 2026 research found Indian deployments achieve 20 to 40 percent faster payback than equivalent Western deployments. For these investments, you may see meaningful financial signal as early as months 6 to 9, with Year 2 returns reaching 300 to 400 percent in well-prepared deployments."),

    // ── Section 6: What to Do This Week ──────────────────────────────────────
    h2("6. What to Do This Week, Broken Down by Role and Budget Tier"),

    h3("For Every Reader, Regardless of Role or Industry"),

    co("Six Actions — This Quarter", "", "key-takeaway", [
      "List every active AI investment in your business. Every subscription, every pilot, every project. Most CEOs cannot name them all without checking. The fact that you cannot is the first problem worth solving.",
      "Run each investment through the four-quadrant filter: reversibility, cost magnitude, time to value, strategic vs operational. Flag high-cost, low-reversibility, slow time-to-value, merely-operational investments as kill candidates.",
      "Identify your current investment tier. Most Indian businesses serious about AI should be in Tier 2 (₹5 to 50 lakh). If you are at Tier 1 after more than a year, you may be under-investing.",
      "Schedule a quarterly shutdown review. Same week every quarter, named owners for each AI investment presenting one-page status updates.",
      "Decide one thing to start, one thing to defer, and one thing to kill this quarter. Write it down. Communicate it to your team.",
      "For education sector: map your enquiry-to-enrollment funnel. Identify the single highest drop-off point. That single drop-off point is where your first AI investment should focus.",
    ]),

    pq("Indian CEOs making AI investment decisions in 2026 should default to buying off-the-shelf vendor solutions, allocate in tiered budgets, run quarterly shutdown reviews, and measure on an 18-month horizon. Skip these four practices and you will be in the 95 percent of pilots that deliver no measurable business return."),

    // ── About the Author ──────────────────────────────────────────────────────
    h2("About the Author"),
    p("Swapnil Ughade is Founder of MagicWorks IT Solutions Private Limited, an AI-first digital marketing agency based in Pune. MagicWorks helps Indian businesses across education, travel and wellness, manufacturing, and B2B services build AI-driven marketing and sales systems that turn investment into measurable outcomes. Swapnil is also building MagicFlow AI, a customer conversation AI product launching shortly that applies the framework in this article to specific marketing and sales use cases."),

    co("Want an AI Investment Audit for Your Business?", "MagicWorks runs an AI Investment Decision Audit for Indian businesses, applying the framework in this article to your current and proposed AI investments. The audit identifies kill candidates, flags under-investment areas, and gives you a tiered 12-month investment plan calibrated to your sector and stage.\n\nCall: +91-9764566644 | Email: sales@magicworksitsolutions.com", "info"),

    // ── Sources ───────────────────────────────────────────────────────────────
    h2("Sources Cited"),
    olLink("Gartner press release: \"Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027\" (June 25, 2025)", "https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027"),
    olLink("MIT Project NANDA via Fortune: \"The GenAI Divide: State of AI in Business 2025\"", "https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/"),
    olLink("NASSCOM: Technology Sector in India Strategic Review 2026", "https://nasscom.in/knowledge-center/publications/technology-sector-india-strategic-review-2026"),
    olLink("NASSCOM: AI Adoption Index", "https://www.nasscom.in/knowledge-center/publications/nasscom-ai-adoption-index"),
    olLink("Deloitte: State of AI in the Enterprise India 2026", "https://www.deloitte.com/in/en/about/press-room/indian-enterprises-lead-global-peers-in-at-scale-ai-adoption-across-most-functions.html"),
    olLink("OG Marka: Conversational AI ROI Enterprise Guide 2026", "https://ogmarka.com/blog/conversational-ai-roi-enterprise-guide"),
    olLink("CMARIX: Build vs Buy AI Software CTO Guide 2026", "https://www.cmarix.com/blog/build-vs-buy-ai-software/"),
    olLink("Inkeep: Build vs Buy AI Support Decision Framework for 2026", "https://inkeep.com/blog/build-vs-buy-ai-support-decision-framework-for-2026"),
    olLink("Solvara: AI Chatbot 2026 ROI Breakdown", "https://www.solvara.tech/blog/ai-chatbot-2026-roi-breakdown"),
    olLink("Growlixa: AI Digital Marketing India 2026 (Pune real estate case study)", "https://www.growlixa.in/blog/ai-digital-marketing-india-2026"),
    olLink("Education Minister Pradhan at Bharat Bodhan AI Conclave 2026 (February 12, 2026)", "https://www.newsonair.gov.in/education-minister-highlights-rapid-ai-adoption-in-indian-education"),
    olLink("Outlook Business: Can AI Give India's Edtech Ecosystem a New Lease of Life? (February 2026)", "https://www.outlookbusiness.com/deeptech/can-ai-give-indias-edtech-ecosystem-a-new-lease-of-life"),
    olLink("Morgan Stanley: AI Market Trends 2026, Board Guidance on AI Investment", "https://www.morganstanley.com/insights/articles/ai-market-trends-institute-2026"),
  ];
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = [
  {
    question: "How much should an Indian business spend on AI in 2026?",
    answer: "Indian AI budgets sort into three tiers. Tier 1 (under ₹5 lakh per year) is appropriate for businesses just starting AI experimentation and should be used to validate concepts before larger commitment. Tier 2 (₹5 to 50 lakh per year) is where most Indian businesses serious about AI should be operating in 2026. Tier 3 (over ₹50 lakh per year) should be rare and reserved for strategic investments with a clear competitive differentiation thesis. NASSCOM's 2026 AI Adoption Index found that 67 percent of Indian enterprises currently allocate less than 10 percent of their IT budget to AI. The discipline matters more than the absolute figure.",
  },
  {
    question: "Should I build AI internally or buy from a vendor?",
    answer: "Default to buy. MIT's Project NANDA research found that purchasing AI tools from specialised vendors and partnerships succeeds about 67 percent of the time, while internal builds succeed only one-third as often. Partner with a specialist when you need workflow customisation, regional language handling, or multi-vendor integration that off-the-shelf tools cannot deliver. Build internally only when you have proprietary data that creates genuine competitive advantage, the AI is core to product differentiation, and you have at least six dedicated engineers with 12 or more months of runway. Most Indian SMEs do not meet these conditions in 2026.",
  },
  {
    question: "When should I shut down an AI project?",
    answer: "Run a quarterly shutdown review against three questions: Is the AI being used by the intended team? Is the value clear and growing over time? Is the cost-to-value ratio improving? Three \"no\" answers means shut it down. Two \"no\" answers means it gets one more quarter with a named owner explicitly accountable for turning the trajectory around. One \"no\" answer means continue and monitor closely. The three warning signs of a failing AI investment are: the agent works but nobody is changing their workflow to use it, the agent's accuracy plateaus below the threshold your team trusts (typically 85 to 90 percent), and the cost-to-maintain line is growing faster than the value line.",
  },
  {
    question: "What is the realistic payback period for marketing and sales AI in India?",
    answer: "Indian conversational AI deployments achieve 20 to 40 percent faster payback than equivalent Western deployments due to labor cost arbitrage and multilingual necessity. Typical payback for enterprise-grade conversational AI runs 8 to 14 months in India, with Year 2 ROI in the 300 to 400 percent range when integration is done well. Tier 1 investments often see payback within 30 to 60 days. Tier 2 investments typically pay back in 8 to 14 months. Tier 3 strategic investments should be evaluated on 24 to 36 month horizons. Indian businesses should expect modest productivity gains (15 to 30 percent) on touched workflows in months 3 to 6, with genuine business impact showing up in months 6 to 12, and clear financial returns in months 12 to 18.",
  },
  {
    question: "How is AI investment in Indian education different from other sectors?",
    answer: "Education AI investment in India differs in three important ways. First, the evaluation horizon must align with the enrollment cycle, which typically runs 9 to 18 months from first enquiry to course start. Most Indian education institutions should plan for 24-month minimum evaluation periods. Second, Indian education has unique multilingual requirements that off-the-shelf global tools handle poorly, making the partner approach often more appropriate than pure buy. Third, the regulatory and curriculum framework is shifting rapidly: NEP 2020 alignment and Education Minister Pradhan's February 2026 announcement that AI will be integrated from Class 3 through advanced research levels.",
  },
  {
    question: "What should an Indian education institution invest in first if they have a ₹15 lakh AI budget for 2026-27?",
    answer: "For a Tier 2 budget of ₹15 lakh, the highest-leverage starting point is AI-powered counsellor support combined with multilingual student communication. Allocate roughly ₹8 to 10 lakh to a specialised conversational AI vendor for multilingual first-touch handling (English plus 2 to 3 regional languages), ₹3 to 5 lakh to integration and counsellor team training, and ₹2 to 3 lakh reserved for the quarterly review and adjustment work. Avoid spreading the budget across too many initiatives in year one. Plan to evaluate on a 12 to 18 month horizon aligned to your enrollment cycle.",
  },
  {
    question: "What is the most common mistake Indian CEOs make with AI investments?",
    answer: "The most common mistake is treating AI like traditional software — scope it, build it, deploy it, and walk away. AI is probabilistic, requires ongoing management and feedback, and drifts over time. The second most common mistake is mixing strategic and operational evaluation frames. The third common mistake is sunk cost thinking on failing AI projects, where CEOs keep funding initiatives that should have been shut down two quarters ago because nobody wants to be the person who declared the experiment over.",
  },
  {
    question: "Should I invest in agentic AI now or wait?",
    answer: "For most Indian businesses, the honest answer is to wait on agentic AI as a primary investment area, while continuing to invest in narrower AI applications that deliver measurable returns today. Gartner's prediction that over 40 percent of agentic AI projects will be canceled by 2027 reflects a genuine market reality: most current agentic AI implementations lack the maturity to deliver autonomous business value reliably. Indian SMEs should focus 2026 investments on proven AI applications (conversational AI for support and sales, marketing automation with AI personalisation, AI-enhanced content and analytics tools). By 2027 to 2028, agentic AI will be substantially more mature, and businesses with strong narrower-AI foundations will be better positioned to layer agentic capabilities on top.",
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
const SLUG = "ai-investment-framework-indian-ceos-marketing-sales-2026";

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
    excerpt: "A CEO framework for AI investment decisions in marketing and sales for Indian businesses in 2026. Budget tiers, build vs buy, and what to shut down.",
    seoTitle: "AI Investment Framework for Indian CEOs: 2026 Guide",
    tags: [
      "AI investment India 2026",
      "AI budget Indian business",
      "build vs buy AI India",
      "AI ROI marketing sales India",
      "CEO AI framework",
      "AI shutdown discipline India",
    ],
  };

  console.log(`\n💾  Patching document…`);
  await client.patch(doc._id).set(patches).commit();
  console.log(`✅  Rewrite complete! ${body.length} blocks, ${FAQ.length} FAQ items.\n`);
  console.log(`🎉  Open in Studio to review:`);
  console.log(`    https://${PROJECT_ID}.sanity.studio/structure/insight;${doc._id}\n`);
}

main().catch(err => { console.error(`\n❌  Fatal:`, err.message); process.exit(1); });
