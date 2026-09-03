/**
 * publish-mohan-decision-first-ai.mjs
 *
 * Publishes "Do Not Start With AI. Start With the Decision." (author: Mohan
 * Chute, existing author record) LIVE today.
 *
 * Source: Docs/Blogs/Mohan/decision-first-ai-blog/
 *   - do-not-start-with-ai-start-with-the-decision.md  (article content)
 *   - assets/do-not-start-with-ai-hero-1280x512.png    (cover image)
 *   - assets/ai-adoption-scaled-value-statistics.png   (inline)
 *   - assets/decision-first-ai-five-d-framework.png    (inline)
 *   - assets/decision-first-ai-rfq-workflow.png        (inline)
 *
 * Run: node scripts/publish-mohan-decision-first-ai.mjs
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

const ASSET_DIR = path.join(__dirname, "..", "..", "Docs", "Blogs", "Mohan", "decision-first-ai-blog", "assets");

// ── Portable Text helpers (same pattern as publish-anjali-blogs-round2.mjs) ─
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
// BLOG: Do Not Start With AI. Start With the Decision.
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgAdoption, imgFiveD, imgRfq) {
  resetKey("dfa");
  return [
    p("Most AI roadmaps begin in the wrong room."),
    p("They begin in a product demonstration, where a tool writes a proposal, summarises a meeting, predicts demand or answers a customer in seconds. The demonstration is impressive. Someone asks, “Where else can we use this?” A list of departments appears. Marketing wants content generation. HR wants screening. Operations wants forecasting. Finance wants document extraction. Within a few weeks, the organisation has an AI plan."),
    p("What it often does not have is a clearly defined business decision."),
    p("That missing definition matters more than the model, vendor or interface. If the team cannot state exactly what recurring judgment should improve, how good judgment is recognised, what an error costs, and which outcome will prove the change worked, then an AI project has no stable target. It may still produce an impressive output. It is much less likely to produce durable value."),

    bq("The short answer: A decision-first AI strategy begins with a repeated business decision that is slow, costly, inconsistent or data-heavy. The organisation defines the desired outcome, evidence, rules, exceptions, risk limits and success metric first. Only then does it decide whether the right intervention is process redesign, conventional automation, analytics, an AI assistant or no technology at all."),

    p("The sequence is simple:"),
    bp("Decision → judgment → evidence → intervention → technology.", ""),
    p("AI comes last, because AI is an instrument of decision design. It is not the strategy itself."),

    h2("AI adoption is high. Scaled value is not."),
    pLinks([
      { text: "There is no shortage of AI activity. The latest " },
      { text: "Stanford AI Index 2026", href: "https://hai.stanford.edu/ai-index/2026-ai-index-report" },
      { text: " says organisational AI adoption reached 88%. McKinsey's 2025 global survey similarly found that " },
      { text: "88% of respondents reported regular AI use in at least one business function", href: "https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/november%202025/the-state-of-ai-2025-agents-innovation_cmyk-v1.pdf" },
      { text: "." },
    ]),
    p("But activity is not the same as scale, and scale is not the same as value. In the same McKinsey research, nearly two-thirds of respondents said their organisations had not yet begun scaling AI across the enterprise. Only 39% reported enterprise-level EBIT impact. The gap between 88% usage and 39% reported EBIT impact is not proof that AI does not work. It is evidence that access to capable technology does not automatically produce a business result."),
    pLinks([
      { text: "India shows a similar tension. Deloitte India's State of GenAI findings reported that " },
      { text: "more than 80% of Indian organisations were exploring autonomous agents", href: "https://www.deloitte.com/in/en/about/press-room/india-rides-the-agentic-ai-wave.html" },
      { text: ", and 71% were pursuing more than ten generative AI experiments. Yet the same study found that only 29% said they could fully scale even 30% of their AI proofs of concept. Those figures come from different questions, so they should not be collapsed into one conversion rate. Read together, however, they show a familiar pattern: experimentation is abundant; disciplined selection and scaling are harder." },
    ]),
    imageBlock(imgAdoption, "Three statistics showing high AI adoption but lower scaling and enterprise-level EBIT impact", "AI adoption is high, but scaling and enterprise-level EBIT impact lag well behind it."),

    p("The hidden lever is not access to AI. It is the quality of the decisions made before, during and after the technology is introduced:"),
    bullet("Which business problem deserves attention?"),
    bullet("Which exact decision inside that problem should change?"),
    bullet("What evidence is available at the moment of decision?"),
    bullet("What can AI safely recommend or perform?"),
    bullet("What must remain under human authority?"),
    bullet("What measured outcome will justify continuing?"),
    p("Companies that answer those questions early give technology something precise to improve. Companies that skip them often end up measuring model behaviour, user excitement or output volume because the business outcome was never made explicit."),

    h2("The tool-first sequence creates an invisible design error"),
    p("A tool-first AI initiative usually follows this sequence:"),
    numbered("See a capability."),
    numbered("Search for places to deploy it."),
    numbered("Choose a department."),
    numbered("Automate whatever work looks similar to the demonstration."),
    numbered("Decide later how to measure success."),
    p("The problem is not that the tool is necessarily bad. The problem is that the organisation has allowed the capability to define the need."),
    p("Imagine buying a high-speed industrial drill and then walking through the factory asking which surfaces could use a hole. The drill may be excellent. The new holes may even be clean. Neither fact proves the factory needed them."),
    p("AI creates the same temptation because its outputs are visible and immediate. A generated summary looks like work completed. A prediction looks like insight. A chatbot response looks like service. Yet each output may sit several steps away from the decision that creates economic value."),
    p("A sales-call summary has value only if it improves a later decision: what should the account executive do next, which opportunity needs escalation, or what evidence should change the forecast? A demand prediction has value only if it improves a replenishment or capacity decision. A drafted proposal has value only if it reduces response time without damaging accuracy, positioning or win probability."),
    p("When the downstream decision is unspecified, output quality becomes the substitute metric. Teams debate whether the summary is “good”, whether the text “sounds human”, or whether the forecast is “accurate enough” without agreeing on the business action the output is meant to support."),
    p("That is the invisible design error: the model is evaluated in isolation from the operating decision it is supposed to improve."),

    h2("What counts as a decision?"),
    p("In this context, a decision is not limited to a boardroom choice. It is any repeated point at which a person or system must select, prioritise, classify, recommend, approve, route, schedule, price, forecast or act."),
    p("Examples include:"),
    bullet("Which incoming enquiries should sales contact first?"),
    bullet("Which RFQs require same-day engineering review?"),
    bullet("Which invoices should be held for exception checking?"),
    bullet("Which customer issue needs a senior human response?"),
    bullet("Which machine reading warrants preventive inspection?"),
    bullet("Which clause in a draft contract needs legal attention?"),
    bullet("Which inventory item is likely to stock out before replenishment?"),
    bullet("Which candidate meets the stated job criteria and should move to human review?"),
    p("These are better starting points than broad ambitions such as “use AI in sales” or “automate operations” because they have boundaries. A bounded decision has an input, a point of judgment, an action, an owner and a consequence."),
    p("A useful decision statement follows this pattern:"),
    bq("When [trigger] occurs, [owner] uses [evidence] to decide [action], so that [business outcome] improves within [time horizon], while keeping [risk] below [limit]."),
    p("For example:"),
    bq("When a new industrial RFQ arrives, the inside-sales lead uses customer fit, order potential, technical complexity, deadline and historical conversion evidence to decide whether it needs same-day engineering review, so that high-potential opportunities receive faster responses without crowding out urgent existing work."),
    p("Notice what this statement does not say. It does not say “build an AI RFQ assistant.” It describes the operating decision. Once that decision is clear, the team can assess whether AI belongs and what role it should play."),

    h2("The Five-D Decision-First AI Test"),
    p("We use five questions to move a conversation from AI enthusiasm to a defensible use case. The questions are deliberately technology-neutral. A strong process may lead to an AI pilot, conventional workflow automation, a dashboard, a simpler operating rule or a decision not to invest yet."),
    imageBlock(imgFiveD, "The Five-D Decision-First AI Test: Define, Diagnose, Describe, Determine and Decide", "The Five-D Decision-First AI Test."),

    h3("1. Define the decision"),
    p("What exact choice, recommendation or action repeats?"),
    p("If the answer is a department, a job title or a vague process, keep narrowing. “Use AI in customer service” is a theme. “Decide whether an incoming support message can receive a standard response or must be escalated” is a decision."),
    p("Write down:"),
    bullet("the trigger that starts the decision;"),
    bullet("who makes it today;"),
    bullet("the available options;"),
    bullet("the evidence considered;"),
    bullet("the action that follows; and"),
    bullet("the people affected by the result."),
    p("This step prevents scope from drifting. It also exposes when one apparent process contains several decisions with different owners and risk levels. A customer-service workflow may include intent classification, customer identification, urgency detection, answer retrieval, response drafting and refund approval. Treating the whole journey as one “chatbot use case” hides important differences. Classification might be safe to automate. Refund approval might require human authority."),

    h3("2. Diagnose the drag"),
    p("Why is the current decision worth changing?"),
    p("Four kinds of friction often make a decision a credible candidate:"),
    bulletBold("Delay:", "The right person receives the case too late."),
    bulletBold("Cost:", "Skilled people spend too much time assembling or checking routine evidence."),
    bulletBold("Inconsistency:", "Similar cases receive materially different treatment without a defensible reason."),
    bulletBold("Cognitive load:", "The volume or number of signals exceeds what a person can review reliably."),
    p("Quantify the drag before proposing the remedy. Useful baselines include median handling time, backlog, rework, error cost, missed service-level agreements, conversion rate, stock-outs, write-offs and escalation volume."),
    p("Frequency matters, but it is not enough. A daily decision that consumes thirty seconds may not justify a project. A monthly decision that can create a large financial, safety or reputational loss may justify careful decision support. Measure both volume and consequence."),
    p("The baseline creates an honest counterfactual. If the organisation cannot describe current performance, it cannot later distinguish AI impact from seasonality, staff changes, a new policy or general process improvement."),

    h3("3. Describe good judgment"),
    p("How does a capable person make this decision well?"),
    p("This is often the most valuable part of the exercise because experienced employees carry decision rules that have never been documented. They know which exceptions matter, which customers require context, when a standard threshold should be ignored and which apparently strong signal is misleading."),
    p("Ask top performers to work through real cases, including awkward ones. Capture:"),
    bullet("the minimum evidence required;"),
    bullet("positive and negative signals;"),
    bullet("disqualifying conditions;"),
    bullet("exceptions to the standard rule;"),
    bullet("confidence levels;"),
    bullet("when they seek a second opinion; and"),
    bullet("what would make them reverse the decision."),
    p("Do not force every judgment into a rigid rule merely to make it automatable. The purpose is to understand the work, not to pretend uncertainty does not exist."),
    p("If good judgment cannot yet be described, AI will not magically clarify it. The project may first need policy alignment, taxonomy design, process standardisation or better data capture. That preparatory work is not a detour from AI strategy. It is AI strategy."),

    h3("4. Determine readiness and boundaries"),
    p("Can the decision be supported reliably, and under what controls?"),
    p("Four readiness areas matter:"),
    bp("Evidence and data.", "Does the required information exist at the moment of decision? Is it accessible, consistent and representative of the real cases the system will face? If key reasons live only in email threads or employee memory, the first project may be improving data capture."),
    bp("Ownership.", "Who owns the business outcome, not merely the software? A system with an IT owner but no operational owner can remain technically available while business use quietly collapses."),
    bp("Risk.", "What is the cost of a false positive, false negative, delayed answer, biased result, data leak or unsupported claim? The acceptable error rate for prioritising a low-value internal task is different from the acceptable error rate for credit, employment, safety, legal or medical decisions."),
    bp("Human authority.", "Is AI informing, recommending, drafting, routing, approving or acting? State the boundary explicitly. “Human in the loop” is not a sufficient control unless the human has time, evidence, authority and a clear reason to challenge the system."),
    pLinks([
      { text: "This context-first sequence aligns with the US National Institute of Standards and Technology's AI Risk Management Framework. NIST's " },
      { text: "Map function", href: "https://airc.nist.gov/airmf-resources/playbook/map/" },
      { text: " asks organisations to establish the intended purpose, business context, users, impacts, requirements, alternatives and human roles before deployment. It also explicitly recommends considering non-AI alternatives." },
    ]),

    h3("5. Decide the intervention"),
    p("What is the simplest intervention capable of improving the decision?"),
    p("AI is one option on a ladder, not the default top rung:"),
    comparisonTable("Best fit", "Typical example", [
      { metric: "Do nothing yet", a: "Low value, low frequency or insufficient evidence", b: "Keep a rare exception under expert review" },
      { metric: "Clarify the process", a: "Roles or criteria are ambiguous", b: "Define who approves discounts and on what basis" },
      { metric: "Use a fixed rule", a: "Logic is stable, explicit and deterministic", b: "Route enquiries by geography or contract value" },
      { metric: "Improve analytics", a: "People need visibility, not prediction", b: "Show backlog, aging and conversion by segment" },
      { metric: "Add AI assistance", a: "Evidence is messy and judgment benefits from synthesis", b: "Extract RFQ details and recommend priority with reasons" },
      { metric: "Permit bounded AI action", a: "Volume is high, risk is low and exceptions are detectable", b: "Auto-route routine tickets while escalating low-confidence cases" },
    ]),
    p("If a simple rule solves the problem, use the rule. It will usually be cheaper to test, easier to explain and more predictable to maintain. If the process itself is broken, redesign it. If the data is not ready, fix the data. AI earns its place when it is the simplest credible way to handle the uncertainty, unstructured information, pattern recognition or scale involved."),

    h2("A worked example: prioritising manufacturing RFQs"),
    p("Consider an illustrative mid-market manufacturer receiving RFQs by email from existing customers, distributors and new prospects."),
    p("The tool-first request might be: “We need an AI assistant for the sales inbox.”"),
    p("That request immediately creates vendor and feature questions. Which model? Can it read attachments? Can it connect to email? Can it draft replies? Those are legitimate implementation questions, but they arrive too early."),
    bp("The decision-first question is:", "Which RFQs deserve same-day engineering and commercial review?"),

    h3("Current decision"),
    p("An inside-sales coordinator reads each message and attachment, checks whether the enquiry fits the company's products, estimates potential value, looks for delivery urgency, considers whether the customer is strategic and sends promising cases to engineering. When volume spikes, some good opportunities wait too long. Different coordinators also interpret “priority” differently."),

    h3("Desired business outcome"),
    p("Increase the share of high-potential RFQs that receive a qualified response within one working day, without increasing engineering time spent on poor-fit enquiries."),

    h3("Evidence used by good decision-makers"),
    bullet("Customer type and relationship history"),
    bullet("Product and material fit"),
    bullet("Estimated order size or recurring potential"),
    bullet("Completeness of drawings and specifications"),
    bullet("Requested delivery window"),
    bullet("Technical novelty and likely engineering effort"),
    bullet("Historical win rate for similar enquiries"),
    bullet("Reasons similar quotations were won or lost"),

    h3("Boundaries"),
    p("The system may extract fields, flag missing information, suggest a priority category and explain its reasons. It may not reject an RFQ, commit a price, promise a delivery date or deprioritise a strategically important account without human review."),

    h3("Measurement"),
    bullet("Median time from receipt to triage"),
    bullet("Percentage of priority RFQs reviewed within one working day"),
    bullet("Engineering hours spent on low-fit opportunities"),
    bullet("False deprioritisation rate for opportunities later judged valuable"),
    bullet("Quotation turnaround time"),
    bullet("Win rate and contribution margin for priority RFQs"),

    imageBlock(imgRfq, "Comparison of a tool-first RFQ workflow and a decision-first RFQ triage workflow", "Tool-first vs. decision-first: the same RFQ inbox, two very different starting questions."),

    pLinks([
      { text: "Now the technology decision becomes clearer. An AI assistant may be appropriate because the evidence arrives in unstructured emails, PDFs and drawings, and the priority judgment involves several interacting signals. But the role is bounded: AI assembles evidence and recommends; accountable people decide the high-risk commercial actions." },
    ]),
    p("The pilot also becomes testable. Instead of asking whether users liked the assistant, the company can compare triage time, response SLA and costly misses against a baseline."),
    linkPara("For more on designing that measurement before scaling, see ", "How to Measure ROI on an AI Pilot Before You Scale It", "/blog/measure-roi-ai-pilot-before-scaling", "."),

    h2("The seven signals of a strong AI use case"),
    p("After the Five-D discussion, use a simple scorecard to compare opportunities. A promising use case usually has most of these characteristics:"),

    h3("1. It is tied to a named outcome"),
    p("“Improve efficiency” is too vague. “Reduce median proposal qualification time from four hours to one hour while holding the review-error rate below 2%” is testable."),

    h3("2. The decision repeats often enough"),
    p("Repetition creates learning, measurement and economic leverage. A one-off strategic decision may benefit from research support, but it is rarely the best starting point for an operational AI system."),

    h3("3. The current friction is measurable"),
    p("The team can produce a baseline for time, cost, quality, delay, risk or revenue. Without a baseline, even a genuine improvement may remain impossible to prove."),

    h3("4. Good judgment can be explained"),
    p("Experienced operators can describe the evidence, criteria, exceptions and escalation conditions. Perfect agreement is unnecessary, but hidden disagreement must be surfaced."),

    h3("5. The evidence is available"),
    p("The system can access enough representative information at the right time. A beautiful model trained on incomplete, inconsistent or biased records will formalise the weakness rather than remove it."),
    linkPara("Our ", "data-readiness audit guide", "/blog/data-readiness-before-ai-initiatives", " explains how to test this before commissioning a build."),

    h3("6. The risk is bounded and reversible"),
    p("Errors can be detected, corrected and contained. Early pilots should favour decisions where a wrong recommendation does not create irreversible harm."),

    h3("7. Someone owns adoption and impact"),
    p("A named business owner has authority to change the workflow, train users, resolve exceptions and stop the initiative if it does not meet the agreed threshold."),

    p("These signals are not a mathematical guarantee. They are a forcing function. They help leadership compare opportunities on business merit rather than presentation quality."),

    h2("A practical prioritisation method"),
    p("List candidate decisions, not candidate tools. Then score each from 1 to 5 across seven dimensions:"),
    bullet("Outcome value"),
    bullet("Decision frequency"),
    bullet("Current friction"),
    bullet("Judgment clarity"),
    bullet("Data readiness"),
    bullet("Risk containment"),
    bullet("Adoption ownership"),
    p("Do not simply choose the highest total. Use gates."),
    p("If there is no named outcome owner, stop. If the harm from error is high and there is no credible oversight design, stop. If the required data is unavailable, redirect the initiative toward data readiness. If a deterministic rule can produce most of the benefit, test the rule first."),
    p("Among the opportunities that pass those gates, choose one where learning can compound. A first use case should teach the organisation how to define requirements, evaluate outputs, monitor risk, manage change and measure value. Running many disconnected pilots can dilute the limited attention needed to build that capability."),
    linkPara("See ", "The AI Pilot Trap: Why Running Five Small Pilots Is Worse Than Running One", "/blog/ai-pilot-trap-portfolio-strategy", " for a portfolio approach."),

    h2("Write the decision brief before the technology brief"),
    p("Before requesting a proposal from a vendor or internal engineering team, create a one-page decision brief. If the brief cannot be completed, the initiative is not ready for a technical scope."),
    p("The decision brief should contain:"),
    numberedBold("Decision statement:", "What exact decision or action will change?"),
    numberedBold("Trigger and frequency:", "When and how often does it occur?"),
    numberedBold("Current owner:", "Who is accountable today?"),
    numberedBold("Business outcome:", "Which existing metric should improve?"),
    numberedBold("Baseline:", "What is current performance?"),
    numberedBold("Target and threshold:", "What result makes a pilot worth continuing?"),
    numberedBold("Evidence:", "Which data and documents inform good judgment?"),
    numberedBold("Rules and exceptions:", "What must the system understand or flag?"),
    numberedBold("Human authority:", "What may AI recommend, draft or do, and what must a person approve?"),
    numberedBold("Failure costs:", "What happens when the system is wrong, late or unavailable?"),
    numberedBold("Non-AI alternatives:", "Could process redesign, a rule or analytics solve it more simply?"),
    numberedBold("Exit condition:", "When will the organisation pause, change or stop the project?"),
    p("The last item deserves more attention than it usually receives. Deloitte India's 2025 release reported that 94% of surveyed firms would need more than six months to exit an AI project that failed to meet ROI goals, and 76% expected exit to take more than a year. The numbers reflect surveyed organisations, not a universal law, but the lesson is practical: reversibility should be designed before commitment, not discovered after disappointment."),

    h2("Start with a decision workshop, not a software shortlist"),
    p("For an Indian mid-market company, a useful first workshop can be run in half a day. It does not require a model demonstration."),

    h3("Step 1: Collect decisions from the work"),
    p("Ask department leaders to bring examples of recurring decisions that cause queues, rework, inconsistent outcomes or customer delay. Require real cases, not broad innovation themes."),

    h3("Step 2: Observe the decision where it happens"),
    p("Speak with the people doing the work. Review the screens, spreadsheets, messages and documents they actually use. Leadership descriptions often remove the very exceptions that determine whether a use case is viable."),

    h3("Step 3: Build the decision statement"),
    p("Name the trigger, owner, evidence, action, outcome and risk boundary. Split large workflows into separate decisions."),

    h3("Step 4: Establish the baseline"),
    p("Use existing operational metrics where possible. If no baseline exists, run a short manual measurement period before introducing AI."),

    h3("Step 5: Compare interventions"),
    p("Consider process clarification, fixed rules, workflow automation, analytics and AI. Estimate the simplest version of each."),

    h3("Step 6: Select one bounded experiment"),
    p("Choose a use case with clear ownership, available evidence, measurable value and reversible risk. Define the threshold for scale in advance."),

    h3("Step 7: Decide build, buy or wait"),
    linkPara("Only after the decision is defined should the team compare solution paths. If that choice is current, use the framework in ", "Build, Buy, or Wait: A Practical Framework for Your Next AI Investment Decision", "/blog/build-buy-or-wait-ai-investment-decision", "."),

    p("At the end of the workshop, the valuable deliverable is not a catalogue of tools. It is a prioritised set of decision briefs, with explicit reasons why some opportunities should proceed, some need preparation and some should be left alone."),

    h2("When AI should support a decision, not make it"),
    p("The phrase “decision automation” can hide several different levels of authority:"),
    bulletBold("Retrieve:", "Find relevant information."),
    bulletBold("Summarise:", "Compress evidence for a person."),
    bulletBold("Classify:", "Assign a category or route."),
    bulletBold("Recommend:", "Suggest an action with reasons and confidence."),
    bulletBold("Draft:", "Prepare an output for approval."),
    bulletBold("Execute:", "Take the action within defined limits."),
    bulletBold("Govern:", "Monitor performance, exceptions and drift."),
    p("An organisation should choose the lowest level that captures sufficient value."),
    p("For high-stakes or unusual cases, retrieval, summarisation and recommendation may deliver most of the benefit while preserving human accountability. For routine, low-risk and easily reversible cases, bounded execution may be justified. The key is to design escalation around uncertainty and consequence, not around a generic promise that a human is “in the loop.”"),
    p("A human reviewer cannot provide meaningful oversight if they receive hundreds of alerts, lack the source evidence, cannot understand the recommendation, or are punished for disagreeing with the system. Effective oversight requires capacity, context and authority."),

    h2("What decision-first AI changes for leadership"),
    p("Decision-first strategy changes the questions asked in governance meetings."),
    p("Instead of:"),
    bullet("Which AI platform should we buy?"),
    bullet("How many AI projects are running?"),
    bullet("How many employees have licences?"),
    bullet("How much content did the system generate?"),
    p("Leadership asks:"),
    bullet("Which business decisions are materially better?"),
    bullet("What evidence shows the change was caused by the intervention?"),
    bullet("Where are people overriding the recommendation, and why?"),
    bullet("Which errors are costly even if they are rare?"),
    bullet("Is the simplest suitable solution still AI?"),
    bullet("What should be stopped, narrowed or scaled next?"),
    p("This is a more demanding conversation because it removes activity as a proxy for progress. It is also the conversation that protects the organisation from expensive momentum."),
    p("McKinsey's 2025 survey found that 80% of respondents' organisations set efficiency as an objective for AI initiatives, while the companies reporting the most value were more likely to pursue growth or innovation as additional objectives and to redesign workflows. That does not mean efficiency is the wrong goal. It means installing AI on top of unchanged work may capture only a fraction of the opportunity."),
    p("Decision design reveals where the workflow, incentives, roles or information flow must change alongside the technology."),

    h2("What this means for Indian founders and operators"),
    pLinks([
      { text: "Indian businesses face a fast-moving technology market, a large vendor field and strong pressure to “do something with AI.” The Government of India's IndiaAI Mission, approved with a " },
      { text: "₹10,371.92 crore budget outlay", href: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2012355&lang=2&reg=3" },
      { text: ", shows the scale of national ambition around compute, datasets, skills, startup finance, applications and safe, trusted AI." },
    ]),
    p("That momentum is valuable. It also makes selection discipline more important."),
    p("For a manufacturer in Pune, a professional-services firm in Mumbai, or a growing education business serving customers across India, the most defensible roadmap will not be the one with the longest list of tools. It will be the one that connects a small number of well-chosen decisions to measurable commercial or operational outcomes."),
    p("Local context matters. Data may sit across ERP exports, CRM records, email, WhatsApp, shared drives and employee knowledge. Business rules may differ by region, channel, language, product line or customer relationship. A global product demonstration will not surface those conditions. A decision-first audit will."),
    linkPara("This is why vendor neutrality matters. If the adviser who defines the problem is financially rewarded for recommending a large implementation, the roadmap can become a pipeline for the build. MagicWorks keeps ", "AI Consultation", "/services/ai-consultation", " separate from implementation: we help leaders decide what to automate, in what order, and whether to build, buy or wait. The client remains free to choose who executes."),

    h2("The rule"),
    bq("Do not ask where AI can be used. Ask which repeated business decision deserves to become faster, clearer, more consistent or better informed. Define good judgment, evidence, risk and measurement. Then let AI compete with every simpler alternative for the right to be used."),
    p("That sequence may produce fewer pilots. It should produce better ones."),

    callout(
      "Start With the Decision, and Leave With a Roadmap",
      "If your leadership team has a growing list of AI ideas but no defensible order, we map the decisions inside the work, test readiness and value, define the measurement and recommend whether to build, buy, redesign, wait or stop. The engagement is consultation-only — there is no obligation to buy an implementation from us, because we do not bundle one into the advice.",
      "key-takeaway"
    ),
    linkPara("Learn more about the ", "AI Process Audit & Roadmap", "/services/ai-consultation/process-audit", ", "),
    linkPara("", "book a discovery call", "/contact", ", or"),
    linkPara("take the ", "AI readiness assessment", "/tools/ai-readiness-assessment", " to identify the first decision worth examining."),

    p("Part of The Invisible Levers, a MagicWorks series about the less-visible systems underneath business outcomes: decision quality, architecture, incentives, measurement, matching and operational discipline."),

    h2("Sources and further reading"),
    bulletLink("", "Stanford HAI, The 2026 AI Index Report", "https://hai.stanford.edu/ai-index/2026-ai-index-report"),
    bulletLink("", "McKinsey & Company, The State of AI in 2025", "https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/november%202025/the-state-of-ai-2025-agents-innovation_cmyk-v1.pdf"),
    bulletLink("", "Deloitte India, State of GenAI — India perspective", "https://www.deloitte.com/in/en/about/press-room/india-rides-the-agentic-ai-wave.html"),
    bulletLink("", "NIST AI Risk Management Framework Playbook, Map", "https://airc.nist.gov/airmf-resources/playbook/map/"),
    bulletLink("", "Press Information Bureau, Cabinet Approval for the IndiaAI Mission", "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2012355&lang=2&reg=3"),
  ];
}

const FAQ = [
  { question: "What is a decision-first AI strategy?", answer: "A decision-first AI strategy starts by defining a repeated business decision, its owner, evidence, desired outcome, risk limits and success metric. The team then selects the simplest suitable intervention. AI is used only when it is a better fit than process redesign, rules, workflow automation, analytics or no change." },
  { question: "Why should a business not start with an AI tool?", answer: "Starting with a tool encourages the organisation to search for work that resembles the tool's demonstration. This can create technically impressive outputs with no clear effect on revenue, cost, quality, risk or customer experience. Starting with the decision gives the technology a measurable business target." },
  { question: "How do we identify a good AI use case?", answer: "A strong AI use case has a named business outcome, sufficient frequency or consequence, measurable current friction, explainable judgment, accessible evidence, bounded risk and an accountable owner. It should also be difficult to solve as effectively with a simpler deterministic rule or process change." },
  { question: "What is an example of AI supporting a business decision?", answer: "In manufacturing RFQ triage, AI can extract details from emails and attachments, compare them with product fit and historical evidence, then recommend priority with reasons and confidence. A human can retain authority over rejection, pricing, delivery commitments and strategically important accounts." },
  { question: "Should AI automate the whole decision?", answer: "Usually not at the beginning. Many organisations capture substantial value by using AI to retrieve, summarise, classify, recommend or draft while a person approves consequential actions. Greater autonomy is appropriate only when cases are routine, risk is low, errors are detectable and actions are reversible." },
  { question: "How should an AI use case be measured?", answer: "Choose a business metric before the pilot starts, record the baseline, define the minimum improvement worth scaling and track costly errors as well as average performance. Technical measures such as accuracy and latency are useful diagnostics, but they do not replace outcome measures such as cycle time, conversion, margin, defect rate or service cost." },
  { question: "Who should own an AI initiative?", answer: "The business leader accountable for the operating outcome should own the initiative. IT, data, legal, security and vendors may own important workstreams, but they should not replace operational ownership. Someone must have authority to change the process, resolve exceptions, train users and stop the project." },
  { question: "When is conventional automation better than AI?", answer: "Conventional automation is usually better when the logic is stable, explicit and deterministic. Routing an enquiry by postcode, sending a reminder after a fixed number of days or validating a required field does not need probabilistic AI. Rules are cheaper, easier to explain and easier to test." },
  { question: "How can an Indian mid-market company start an AI roadmap?", answer: "Begin with a focused decision workshop or process audit. Identify recurring decisions with measurable friction, document how good operators handle them, test data and risk readiness, compare non-AI alternatives and select one bounded pilot. Define the scale or stop threshold before comparing vendors." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "Do Not Start With AI. Start With the Decision.";
const SLUG = "do-not-start-with-ai-start-with-the-decision";
const EXCERPT = "A practical decision-first AI strategy for Indian business leaders: define the decision, test the use case, measure value, and choose AI only when it fits.";
const SEO_TITLE = "Decision-First AI Strategy: Start With the Decision";
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

  const heroId = await uploadImage("do-not-start-with-ai-hero-1280x512.png");
  const adoptionId = await uploadImage("ai-adoption-scaled-value-statistics.png");
  const fiveDId = await uploadImage("decision-first-ai-five-d-framework.png");
  const rfqId = await uploadImage("decision-first-ai-rfq-workflow.png");

  const doc = {
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["ai-automation"],
    pillar: "ai-consultation",
    publishedAt: "2026-09-03T09:00:00.000Z",
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "Business inputs converge at a gold decision point before activating a violet AI network",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "AI use case prioritisation",
      "AI strategy for business",
      "AI roadmap India",
      "AI decision framework",
      "AI consultation India",
      "AI consulting Pune",
      "business decision automation",
      "AI use case assessment",
    ],
    body: buildBody(adoptionId, fiveDId, rfqId),
    faq: FAQ.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
  };

  console.log("💾  Creating LIVE document…");
  const created = await client.create(doc);
  console.log(`✅  Published: ${created._id}`);
  console.log(`    Live URL: https://magicworksitsolutions.com/blog/${SLUG}`);
  console.log(`    Studio: https://${PROJECT_ID}.sanity.studio/structure/insight;${created._id}`);

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
