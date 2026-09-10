/**
 * create-mohan-draft-coo-ai-process-audit.mjs
 *
 * Creates "The COO's Checklist Before Commissioning an AI Process Audit"
 * (author: Mohan Chute, existing author record) in Sanity as a
 * DRAFT ONLY (not visible on the live site until promoted / published).
 *
 * Source: Docs/Blogs/Mohan/As-per-Purva/01_coo_ai_process_audit/
 *   - the-coos-checklist-before-commissioning-an-ai-process-audit.md  (article content)
 *   - assets/hero-coo-ai-process-audit-1280x512.png                  (cover image)
 *   - assets/audit-to-impact-1280x512.png                            (inline)
 *   - assets/framework-coo-audit-readiness.png                       (inline)
 *
 * This script ONLY creates a draft. It does not publish, and it does not
 * delete any existing draft. The post has a future publishedAt value
 * (2026-10-12) that is left untouched — it will be used when the draft is
 * later promoted / published via a separate script.
 *
 * Run: node scripts/create-mohan-draft-coo-ai-process-audit.mjs
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

const ASSET_DIR = path.join(__dirname, "..", "..", "Docs", "Blogs", "Mohan", "As-per-Purva", "01_coo_ai_process_audit", "assets");

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

// Numbered-list counterpart to pLinks, used for the numbered "Sources and
// further reading" list (mirrors bulletLink's relationship to linkPara).
function numberedLinks(parts) {
  const markDefs = [];
  const children = parts.map((part) => {
    if (part.href) {
      const mk = k();
      markDefs.push({ _key: mk, _type: "link", href: part.href });
      return linked(part.text, mk);
    }
    return part.bold ? strong(part.text) : plain(part.text);
  });
  return block("normal", children, markDefs, "number");
}

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
// BLOG: The COO's Checklist Before Commissioning an AI Process Audit
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgAuditToImpact, imgFramework) {
  resetKey("coo");
  return [
    p("AI process audits are becoming a sensible first step for companies that know they need to use AI but do not want to begin by buying tools. That is progress. The harder truth is that commissioning an audit does not automatically make the company ready to benefit from one."),
    p("A good audit can expose bottlenecks, rank opportunities, separate useful AI from fashionable AI, and turn a vague ambition into a sequenced roadmap. A badly prepared audit can produce a polished document built on incomplete process information, unrealistic baselines, weak ownership, and assumptions nobody inside the business is willing to defend after the consultants leave."),
    p("For a COO, the preparation before the audit matters almost as much as the audit method itself."),

    callout(
      "The short answer",
      "Before commissioning an AI process audit, a COO should be able to name the business outcomes that matter, identify one or two processes worth examining, provide access to the people who actually run them, establish baseline measures, expose the real data and system constraints, define risk boundaries, assign an executive owner, and agree what decision the audit is expected to enable.",
      "key-takeaway"
    ),
    p("That is the checklist this article develops."),

    h2("Why this preparation matters more in 2026"),
    p("AI adoption is no longer a fringe experiment. McKinsey's August 2026 State of AI survey found that nearly nine in ten respondents reported regular AI use in at least one business function. Yet only 37% attributed at least some enterprise-level EBIT impact to AI, essentially unchanged from the prior year. The same report found that AI high performers remained a small minority at about 6% of respondents, and that those high performers were much more likely to redesign workflows, define measurement processes, and show visible senior leadership commitment.[1]"),
    p("That gap between use and enterprise value is exactly why process audits matter."),
    p("The problem is usually not that companies lack access to capable models. The problem is that they have not been precise about what should change in the work, who owns the change, what evidence should guide the decision, and what would count as an improvement."),
    p("IBM's 2025 CEO study reached a similar conclusion from a different angle. Globally, only 25% of AI initiatives in the surveyed organizations had delivered expected ROI, while only 16% had scaled enterprise-wide. IBM also reported that 65% of CEOs were leaning into AI use cases based on ROI.[2] In India, IBM found that CEOs were increasing AI investment while still citing expertise and knowledge as important barriers to innovation.[3]"),
    p("The World Economic Forum's Future of Jobs Report 2025 found that 86% of employers expect AI and information-processing technologies to transform their business by 2030. At the same time, 63% cited skills gaps as a primary barrier to transformation.[4]"),
    p("These statistics should not be read as an argument to slow down. They are an argument to prepare better."),

    h2("An AI process audit is not a technology shopping exercise"),
    p("The easiest way to weaken an audit is to start with a list of tools."),
    p("“We want to evaluate Copilot.”"),
    p("“We need an agent for customer service.”"),
    p("“Can you assess where we can use ChatGPT Enterprise?”"),
    p("“Should we build an internal chatbot?”"),
    p("Those can be valid questions later. They are poor starting points for an operations audit because they anchor the conversation to a solution before the business problem is understood."),
    p("A process audit should begin with the work as it exists today."),
    p("Where does time disappear? Where are decisions repeated? Where does information move slowly? Where does a senior person spend time on low-judgment work? Where are errors expensive? Where do handoffs create rework? Where is an existing team constrained by volume rather than by lack of demand? Where are customers waiting because the organisation is waiting on itself?"),
    pLinks([
      { text: "MagicWorks structures its own " },
      { text: "AI Process Audit & Roadmap", href: "https://magicworksitsolutions.com/services/ai-consultation/process-audit" },
      { text: " around one or two named processes, current-state mapping, opportunity ranking, build-versus-buy decisions, and a sequenced roadmap. The point is to arrive at a decision the company can defend, not a catalogue of technologies." },
    ]),
    p("If you are a COO about to commission an audit, the first question is therefore not “Which AI platform should we evaluate?”"),
    p("It is “Which operational decision do we need this audit to improve?”"),

    h2("The COO's pre-audit checklist at a glance"),
    p("Before the first formal audit workshop, you should be able to answer these ten questions:"),
    block("normal", [strong("What business outcome are we trying to improve?")], [], "number"),
    block("normal", [strong("Which one or two processes deserve examination first?")], [], "number"),
    block("normal", [strong("What does the process actually look like today?")], [], "number"),
    block("normal", [strong("What baseline metrics do we already have?")], [], "number"),
    block("normal", [strong("Who performs the work and who owns the outcome?")], [], "number"),
    block("normal", [strong("What data and systems does the process depend on?")], [], "number"),
    block("normal", [strong("What must never be automated without human judgment?")], [], "number"),
    block("normal", [strong("What security, privacy, regulatory, or contractual boundaries apply?")], [], "number"),
    block("normal", [strong("What budget, time, and change capacity are realistically available?")], [], "number"),
    block("normal", [strong("What decision must the audit enable at the end?")], [], "number"),
    p("The sections below turn those ten questions into a working preparation framework."),

    imageBlock(imgAuditToImpact, "Illustration: A process audit should move from operational discovery to measurable impact"),

    h2("1. Define the business outcome before discussing the use case"),
    p("Every process audit needs an economic or operational destination."),
    p("A weak objective sounds like this:"),
    bullet("Identify AI opportunities in operations."),
    bullet("Understand how AI can improve manufacturing."),
    bullet("Explore AI for the finance department."),
    bullet("Find automation opportunities."),
    p("A stronger objective has a measurable business shape:"),
    bullet("Reduce RFQ-to-quote turnaround from 48 hours to under 12 hours without increasing pricing errors."),
    bullet("Cut the monthly time spent reconciling supplier documents by 40% while preserving approval controls."),
    bullet("Increase first-response speed for service enquiries without reducing the proportion that receive human review when needed."),
    bullet("Reduce proposal-preparation effort per opportunity while improving the consistency of technical and commercial inputs."),
    p("Notice what changed. AI disappeared from the objective."),
    p("That is healthy."),
    p("The audit can now compare AI with simpler alternatives. Perhaps the real answer is workflow redesign, better templates, a rules engine, improved master data, a CRM change, or a lightweight automation with no generative model at all. An independent audit should have permission to reach that conclusion."),
    pLinks([
      { text: "This is consistent with a decision-first approach: define the business decision, evidence, constraints, and measurement first, then allow AI to compete for the right to be used. I have written separately about this in " },
      { text: "Do Not Start With AI. Start With the Decision", href: "https://magicworksitsolutions.com/blog/do-not-start-with-ai-start-with-the-decision" },
      { text: "." },
    ]),

    h3("COO action before the audit"),
    p("Write one sentence that completes this statement:"),
    bq("We are commissioning this audit because we need to improve ______ from ______ to ______ while protecting ______."),
    p("If the blanks cannot be filled, the audit scope is still too vague."),

    h2("2. Pick one or two processes, not the entire company"),
    p("The most common scoping mistake is breadth."),
    p("A leadership team wants an “enterprise AI roadmap,” so every department submits ideas. Finance wants document extraction. Sales wants call analysis. HR wants screening. Operations wants scheduling. Procurement wants supplier intelligence. Marketing wants content generation. Customer service wants an assistant. IT wants code generation."),
    p("The audit becomes a tour of the organisation rather than a deep examination of a business process."),
    p("For mid-market companies, depth is usually more valuable than breadth at the first stage. A well-mapped process reveals dependencies that a department-level idea list misses."),
    p("Take a manufacturing RFQ process. The visible task might be quote drafting. The real chain could include:"),
    bullet("email and portal intake;"),
    bullet("file classification;"),
    bullet("technical drawing review;"),
    bullet("BOM or specification extraction;"),
    bullet("historical pricing retrieval;"),
    bullet("material and labour assumptions;"),
    bullet("production-capacity checks;"),
    bullet("commercial approval;"),
    bullet("exception handling;"),
    bullet("proposal creation;"),
    bullet("customer clarification;"),
    bullet("follow-up and revision."),
    p("AI may help at several points, but only if the audit sees the chain."),

    h3("How to choose the first process"),
    p("Score candidate processes against five factors:"),
    bulletBold("Business value:", "Is the outcome commercially or operationally important?"),
    bulletBold("Repetition:", "Does the process occur often enough for improvement to compound?"),
    bulletBold("Friction:", "Are delays, errors, handoffs, rework, or manual effort visible today?"),
    bulletBold("Data access:", "Is enough information available to understand and potentially improve the process?"),
    bulletBold("Ownership:", "Is there a leader prepared to change how the process operates?"),
    p("A process with moderate AI glamour and strong scores on these five factors is often a better audit candidate than a futuristic idea with no owner and no baseline."),

    h2("3. Map the real process, not the SOP version"),
    p("One of the most valuable things a COO can do before an audit is make it safe for employees to describe how work actually happens."),
    p("The official process may say a quotation is approved in the ERP. The real process may involve a spreadsheet, three WhatsApp messages, a senior manager's memory, a phone call to production, and a PDF that gets copied from a prior proposal."),
    p("The official process may say client intake takes two days. The real process may stall for a week because one senior partner reviews conflict checks only on Friday."),
    p("The official process may say all documents are stored in SharePoint. The real process may depend on one employee's desktop folders."),
    p("An audit based on the official process will optimise fiction."),

    h3("What to prepare"),
    p("For the selected process, collect:"),
    bullet("current SOPs, if they exist;"),
    bullet("screenshots or examples of forms and templates;"),
    bullet("system names and handoff points;"),
    bullet("sample documents;"),
    bullet("exception cases;"),
    bullet("approval rules;"),
    bullet("known workarounds;"),
    bullet("actual cycle-time observations;"),
    bullet("common failure points;"),
    bullet("people who know where the unofficial steps are."),
    p("Do not clean up the process before showing it to the auditor. The mess is data."),

    h2("4. Establish a baseline before anyone promises ROI"),
    p("A useful AI readiness assessment is not complete without measurement readiness."),
    p("You cannot credibly claim a 30% improvement if nobody knows the starting point."),
    p("Before the audit, identify the metrics that describe the current process. Depending on the workflow, those may include:"),
    bullet("cycle time;"),
    bullet("labour hours;"),
    bullet("throughput;"),
    bullet("error rate;"),
    bullet("rework rate;"),
    bullet("approval delay;"),
    bullet("cost per transaction;"),
    bullet("cost of external support;"),
    bullet("missed opportunities;"),
    bullet("customer response time;"),
    bullet("conversion rate;"),
    bullet("backlog size;"),
    bullet("employee time at different seniority levels;"),
    bullet("exception rate;"),
    bullet("compliance incidents."),
    p("Not every process needs a complex dashboard. It does need enough evidence to distinguish a real improvement from enthusiasm after a demo."),
    p("McKinsey's 2026 survey is useful here because it separates individual productivity from enterprise impact. Eighty percent of respondents said AI had improved their individual productivity, yet only 37% reported positive enterprise-level EBIT contribution.[1] Faster individual work does not automatically become better business economics."),
    p("The audit should therefore ask two layers of measurement:"),
    numbered("Did the task get faster or easier?"),
    numbered("Did that improvement change a business outcome that matters?"),

    h3("COO action before the audit"),
    p("Ask the process owner to provide a four-week sample of current performance if possible. If reliable data does not exist, say so. “We do not measure this today” is a valid audit finding. Invented precision is not."),

    h2("5. Bring the people who do the work into the room"),
    p("A process audit run only with CXOs will usually miss the operating truth."),
    p("Senior leaders know the intent of the process. Frontline employees know the friction."),
    p("Both are needed."),
    p("For a manufacturing workflow, that may mean the COO, sales head, estimator, planning manager, ERP administrator, and one or two employees who process the actual RFQs."),
    p("For a professional-services workflow, it may mean the managing partner, practice lead, senior associate, operations manager, knowledge manager, and the person who coordinates client intake or document review."),
    p("The audit should not treat employees as obstacles to automation. They are the source of process knowledge."),
    p("The World Economic Forum's 2025 research found that skills gaps were the most frequently cited barrier to business transformation, at 63% of surveyed employers.[4] That matters because an AI roadmap that ignores learning, role design, and change capacity is not an operational roadmap. It is a technology wish list."),
    pLinks([
      { text: "I explored the leadership side of this issue in " },
      { text: "The AI Literacy Gap: Why Leadership Alignment Has to Come Before Any Roadmap", href: "https://magicworksitsolutions.com/blog/ai-literacy-gap-leadership-alignment" },
      { text: ". The same principle applies one level lower. The people expected to change the work need a credible explanation of why the process is being examined and what the audit is not trying to do." },
    ]),

    h2("6. Test data readiness with actual samples"),
    p("Every AI strategy consulting engagement eventually collides with data reality."),
    p("The relevant questions are practical:"),
    bullet("Where is the data stored?"),
    bullet("Is it structured or buried in documents, email, scans, images, and conversations?"),
    bullet("Is the same field defined consistently across systems?"),
    bullet("How much historical data exists?"),
    bullet("Who owns it?"),
    bullet("Can it legally and contractually be used for the proposed purpose?"),
    bullet("Are there missing values, duplicates, outdated records, or inconsistent labels?"),
    bullet("Can the audit team inspect representative examples?"),
    bullet("Is sensitive data mixed with ordinary operational data?"),
    bullet("What integrations already exist?"),
    p("Do not answer these from memory."),
    p("Sample the real records."),
    p("A data-readiness problem is often not “we have no data.” It is “we have data, but not in a form that supports the decision we want to improve.”"),
    p("That distinction matters."),
    pLinks([
      { text: "MagicWorks' " },
      { text: "AI Readiness Assessment", href: "https://magicworksitsolutions.com/tools/ai-readiness-assessment" },
      { text: " deliberately asks whether relevant data is scattered, partially digital, inconsistent, digital but in need of cleaning, or clean and accessible. It is a simple question, but it prevents a common mistake: assuming digitisation equals readiness." },
    ]),
    linkPara("For a deeper treatment, see ", "The Data Readiness Audit: Why Most AI Initiatives Fail Before the AI Ever Arrives", "https://magicworksitsolutions.com/blog/data-readiness-before-ai-initiatives", "."),

    h2("7. Define the human-judgment boundary before automation is proposed"),
    p("The strongest audit question is not “What can AI do?”"),
    p("It is “Where should AI be allowed to decide?”"),
    p("Some steps are low risk and highly reversible. Drafting a first-pass summary, classifying inbound documents, or retrieving prior examples may be suitable for broad automation."),
    p("Other steps carry commercial, safety, legal, reputational, or financial consequences. Final price approval, safety sign-off, legal interpretation, credit approval, compliance certification, hiring decisions, or commitments to customers may require explicit human authority."),
    p("The boundary should be discussed before the team falls in love with a technical demo."),
    p("NIST's AI Risk Management Framework and its Generative AI Profile are useful because they frame AI risk as an organisational discipline rather than a one-time security review. The framework encourages organisations to identify, measure, manage, and govern risks across the AI lifecycle.[5]"),

    h3("COO action before the audit"),
    p("For each critical decision in the process, classify it as one of the following:"),
    bullet("AI may recommend, human decides."),
    bullet("AI may execute within defined rules, human reviews exceptions."),
    bullet("AI may execute automatically because the consequence is low and reversible."),
    bullet("AI should not be used for this decision at present."),
    p("This single exercise makes later vendor evaluation much more disciplined."),

    h2("8. Make security, privacy, compliance, and contracts visible early"),
    p("Risk should not appear as a final slide after the use cases have already been prioritised."),
    p("The audit needs to know, from the beginning:"),
    bullet("whether customer data can leave your environment;"),
    bullet("whether vendor terms permit model training on your data;"),
    bullet("what data residency requirements apply;"),
    bullet("whether there are sector-specific regulatory constraints;"),
    bullet("whether client confidentiality obligations limit tool use;"),
    bullet("what retention rules apply;"),
    bullet("who can approve access to sensitive repositories;"),
    bullet("whether audit logs are required;"),
    bullet("whether a human must be able to explain or override the result;"),
    bullet("what happens if the model is unavailable or wrong."),
    p("The objective is not to make the audit risk-averse. It is to keep the roadmap executable."),
    p("A high-value use case that cannot pass security review is not a high-priority use case. It is an unresolved dependency."),

    h2("9. Agree the cost model before discussing the business case"),
    p("AI projects create more cost categories than the licence fee."),
    p("A proper business case can include:"),
    bullet("model or software subscriptions;"),
    bullet("token or usage costs;"),
    bullet("integration work;"),
    bullet("data cleaning;"),
    bullet("system changes;"),
    bullet("testing;"),
    bullet("monitoring;"),
    bullet("security and legal review;"),
    bullet("training;"),
    bullet("process redesign;"),
    bullet("change management;"),
    bullet("support;"),
    bullet("human review;"),
    bullet("ongoing evaluation;"),
    bullet("vendor switching costs."),
    p("This has become more relevant as AI usage scales. McKinsey's 2026 survey found that about 20% of respondents said AI-related operating costs, including token costs, had constrained AI use in their organisations.[1]"),
    p("That does not mean AI is too expensive. It means the cost model must be explicit."),
    p("The audit should compare total cost with the fully loaded economics of the current process, not with the salary of one employee or the price of one software licence."),

    h2("10. Decide whether you are buying advice or buying implementation"),
    p("This distinction deserves explicit COO attention."),
    p("Many firms sell an audit and also sell the build. That can be completely legitimate. It can also create an incentive problem: the organisation evaluating whether a project should be built may profit if the answer is yes."),
    p("A COO should therefore ask:"),
    bullet("Does the auditor also implement?"),
    bullet("If yes, how is independence protected?"),
    bullet("Can the audit recommend not building anything?"),
    bullet("Can it recommend a third-party product?"),
    bullet("Can the deliverables be used with another vendor?"),
    bullet("Who owns the process maps, requirements, scoring, and roadmap?"),
    bullet("Are commercial recommendations separated from technical recommendations?"),
    pLinks([
      { text: "MagicWorks chose to make its " },
      { text: "AI Consultation practice", href: "https://magicworksitsolutions.com/services/ai-consultation" },
      { text: " consultation-only for exactly this reason. The roadmap is designed to be executable by the client's own team, an external vendor, or a separate product provider." },
    ]),
    p("You do not have to use that model. You should understand the model you are buying."),

    h2("11. Give the audit a named executive owner"),
    p("Cross-functional projects fail quietly when everyone is involved and nobody is accountable."),
    p("The process owner and the audit sponsor are not always the same person."),
    p("The process owner knows the work. The executive sponsor resolves trade-offs, protects access, approves scope, and makes the final decision when priorities conflict."),
    p("For an AI process audit, the sponsor should be able to:"),
    bullet("require participation from relevant teams;"),
    bullet("grant or escalate access to data and systems;"),
    bullet("challenge unrealistic assumptions;"),
    bullet("approve measurement definitions;"),
    bullet("decide when risk is acceptable;"),
    bullet("commit budget for the next stage if the recommendation is positive;"),
    bullet("stop an initiative if the evidence is weak."),
    p("Without this person, the audit can still produce findings. It may not produce action."),

    h2("12. Define what the audit must deliver"),
    p("Before signing the engagement, agree the outputs."),
    p("At minimum, a serious audit should leave you with:"),
    bullet("a current-state process map;"),
    bullet("identified friction and failure points;"),
    bullet("a ranked opportunity list;"),
    bullet("clear reasons why some opportunities should not be pursued now;"),
    bullet("data-readiness findings;"),
    bullet("risk and governance considerations;"),
    bullet("baseline metrics;"),
    bullet("solution options;"),
    bullet("build-versus-buy reasoning;"),
    bullet("indicative cost and effort ranges;"),
    bullet("priority sequencing;"),
    bullet("pilot or validation design where appropriate;"),
    bullet("ownership recommendations;"),
    bullet("a roadmap with review points."),
    p("A slide titled “Top 10 AI Opportunities” is not a roadmap."),
    p("The best deliverable is a sequence of decisions with enough evidence that the company can act on them after the auditor is gone."),
    linkPara("If you want the next step after the audit, I covered it in ", "From Audit to Action: Turning AI Process-Audit Findings Into a Roadmap You Can Actually Execute", "https://magicworksitsolutions.com/blog/from-audit-to-action-ai-roadmap", "."),

    h2("The seven-part COO readiness test"),
    block("normal", [plain("A simple way to remember the preparation is the "), strong("7P test"), plain(":")]),

    h3("1. Purpose"),
    p("What outcome must improve, and why now?"),

    h3("2. Process"),
    p("Which one or two workflows are in scope, and how do they really operate?"),

    h3("3. Proof"),
    p("What baseline data will show whether anything improved?"),

    h3("4. People"),
    p("Who does the work, who owns it, and who must change behaviour if the roadmap is implemented?"),

    h3("5. Platforms"),
    p("Which systems, repositories, integrations, and data sources are involved?"),

    h3("6. Permissions"),
    p("What security, privacy, contractual, regulatory, and human-judgment boundaries apply?"),

    h3("7. Payback"),
    p("What cost, capacity, revenue, quality, risk, or speed improvement would justify action?"),

    p("If one of these seven areas is completely unknown, the audit can still proceed, but it should treat the unknown as a discovery item rather than assume the answer."),

    imageBlock(imgFramework, "Illustration: From audit preparation to measurable operational impact"),

    h2("Red flags that suggest you are not ready to commission the audit yet"),
    p("Sometimes the right decision is to pause for two weeks and prepare."),
    p("Be cautious if any of these are true:"),
    bullet("Leadership has already selected the tool and only wants the audit to validate it."),
    bullet("The scope is “all departments.”"),
    bullet("Nobody can provide examples of the actual work."),
    bullet("Employees believe the audit is a hidden headcount-reduction exercise."),
    bullet("There is no baseline for the process and nobody is willing to create one."),
    bullet("The process owner has no time to participate."),
    bullet("Security or legal teams will only be consulted after vendor selection."),
    bullet("The business expects a guaranteed ROI percentage before the process has been mapped."),
    bullet("The audit vendor cannot explain how it separates advice from implementation incentives."),
    bullet("The CEO wants an AI roadmap, but there is no budget or ownership for any action after the presentation."),
    p("These conditions do not mean AI is wrong for the company. They mean the organisation is not yet creating the conditions for a useful audit."),

    h2("What a strong first audit looks like for an Indian mid-market company"),
    p("For a ₹100 Cr to ₹500 Cr manufacturer or a 50-plus-person professional-services firm, a disciplined first engagement can be deliberately narrow."),
    p("One or two named processes. Four to six weeks. Real interviews. Real documents. Baseline measurement. Current-state mapping. Opportunity ranking. Build-versus-buy analysis. A sequenced 12-month roadmap."),
    p("That is enough to answer high-value questions:"),
    bullet("Is the process suitable for AI at all?"),
    bullet("Which step should change first?"),
    bullet("What can be automated safely?"),
    bullet("Where is human judgment still essential?"),
    bullet("Is the data ready?"),
    bullet("Should we buy, build, configure, or wait?"),
    bullet("What would a pilot prove?"),
    bullet("What would scaling cost?"),
    bullet("Who should own execution?"),
    bullet("What should happen in the next 30, 90, and 365 days?"),
    p("That is a much more useful outcome than “we identified 27 AI use cases.”"),

    h2("Questions to ask an AI strategy consulting firm before you appoint it"),
    p("Use these questions in the vendor discussion:"),
    block("normal", [strong("How do you select which processes to audit?")], [], "number"),
    block("normal", [strong("Do you begin with business outcomes or with technology categories?")], [], "number"),
    block("normal", [strong("Who do you interview besides leadership?")], [], "number"),
    block("normal", [strong("How do you test data readiness?")], [], "number"),
    block("normal", [strong("How do you calculate current-state cost and potential value?")], [], "number"),
    block("normal", [strong("How do you handle security, privacy, and regulatory constraints?")], [], "number"),
    block("normal", [strong("How do you decide where human approval must remain?")], [], "number"),
    block("normal", [strong("Can your recommendation be “do not automate this”?")], [], "number"),
    block("normal", [strong("Do you sell implementation after the audit?")], [], "number"),
    block("normal", [strong("Will the roadmap be usable by another implementation partner?")], [], "number"),
    block("normal", [strong("How do you make build-versus-buy decisions?")], [], "number"),
    block("normal", [strong("What does the final roadmap contain?")], [], "number"),
    block("normal", [strong("What evidence would make you stop or deprioritise a use case?")], [], "number"),
    block("normal", [strong("How will success be measured after implementation?")], [], "number"),
    block("normal", [strong("Can you show an example of how a finding becomes a decision?")], [], "number"),
    p("The quality of the answers is more revealing than the sophistication of the demo."),

    h2("The final COO question"),
    p("Do not commission an AI process audit because competitors are using AI."),
    p("Commission one when there is an important process, a meaningful business outcome, uncertainty about the right intervention, and a leadership team willing to expose the operational truth."),
    p("The audit should reduce uncertainty before the company spends heavily. If it does that well, it can be one of the highest-leverage AI investments you make because it protects you from the more expensive mistake: scaling the wrong thing."),
    pLinks([
      { text: "If you are not sure whether your organisation is ready, start with the free " },
      { text: "MagicWorks AI Readiness Assessment", href: "https://magicworksitsolutions.com/tools/ai-readiness-assessment" },
      { text: ". If you already have one or two named processes and want a vendor-neutral roadmap, review the " },
      { text: "AI Process Audit & Roadmap", href: "https://magicworksitsolutions.com/services/ai-consultation/process-audit" },
      { text: "." },
    ]),

    h2("Sources and further reading"),
    numberedLinks([
      { text: "McKinsey & Company, " },
      { text: "The state of AI in 2026: On the road to ROI", href: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" },
      { text: ", 25 August 2026." },
    ]),
    numberedLinks([
      { text: "IBM Institute for Business Value, " },
      { text: "CEOs Double Down on AI While Navigating Enterprise Hurdles", href: "https://newsroom.ibm.com/2025-05-06-ibm-study-ceos-double-down-on-ai-while-navigating-enterprise-hurdles" },
      { text: ", 6 May 2025." },
    ]),
    numberedLinks([
      { text: "IBM India, " },
      { text: "Indian CEOs Double Down on AI Investments to Drive Long-Term Innovation", href: "https://in.newsroom.ibm.com/IBM-Study-Indian-CEOs-Double-Down-on-AI-Investments-to-Drive-Long-Term-Innovation" },
      { text: ", 18 June 2025." },
    ]),
    numberedLinks([
      { text: "World Economic Forum, " },
      { text: "Future of Jobs Report 2025", href: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/" },
      { text: "." },
    ]),
    numberedLinks([
      { text: "NIST, " },
      { text: "AI Risk Management Framework", href: "https://www.nist.gov/itl/ai-risk-management-framework" },
      { text: " and " },
      { text: "Generative Artificial Intelligence Profile", href: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence" },
      { text: "." },
    ]),

    callout(
      "Ready to Prepare Your AI Process Audit the Right Way?",
      "MagicWorks runs an independent, vendor-neutral AI Process Audit & Roadmap for COOs who want to know what to fix first, what to automate, and what should stay under human judgment, before any tool is purchased. We advise on the roadmap. You choose who implements it.",
      "key-takeaway"
    ),
    linkPara("", "Book an AI Consultation", "/services/ai-consultation", " to scope your first process audit, or"),
    linkPara("", "get in touch", "/contact", " to talk through where your organisation stands today."),
  ];
}

const FAQ = [
  { question: "What is an AI process audit?", answer: "An AI process audit is a structured examination of one or more business processes to determine where AI, automation, workflow redesign, or other technology can improve speed, cost, quality, capacity, or decision-making. A strong audit maps the current process, evaluates data and system readiness, identifies risks, ranks opportunities, and turns findings into a roadmap." },
  { question: "How is an AI readiness assessment different from an AI process audit?", answer: "An AI readiness assessment is usually broader and faster. It tests whether leadership, processes, data, resources, and governance are mature enough to pursue AI effectively. A process audit goes deeper into named workflows and produces specific recommendations. A readiness assessment can therefore be a useful step before a process audit." },
  { question: "How long should an AI process audit take?", answer: "For one or two named processes in a mid-market business, four to six weeks is often enough for interviews, mapping, data sampling, opportunity analysis, validation, and roadmap design. Very complex regulated workflows may require longer." },
  { question: "What should a COO prepare before an AI process audit?", answer: "Prepare the business objective, process scope, current SOPs and real examples, baseline performance data, relevant employees, system and data access, known risks, budget constraints, and the decision you expect the audit to enable." },
  { question: "Should an AI audit start with a list of use cases?", answer: "A short idea list is useful, but it should not drive the engagement. Start with business processes and outcomes. Use cases should emerge from current-state analysis rather than being imposed by the latest tool demonstration." },
  { question: "Do we need clean data before commissioning an audit?", answer: "No. The audit can help identify data-readiness gaps. You do need enough access to representative data to determine whether the proposed improvements are feasible. If data is scattered, incomplete, or inconsistent, that should become an explicit finding and remediation step." },
  { question: "Should the company implementing the AI also perform the audit?", answer: "It can, but the COO should understand the commercial incentive. Ask whether the audit can recommend a third-party product, internal build, simpler automation, waiting, or doing nothing. The more independent the advice, the easier it is to trust a recommendation that reduces implementation scope." },
  { question: "What is the most important output from an AI process audit?", answer: "A defensible decision sequence. The company should know what to do first, what not to do yet, why, who owns it, what it will cost, how risk is controlled, and how success will be measured." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "The COO's Checklist Before Commissioning an AI Process Audit";
const SLUG = "coo-checklist-before-ai-process-audit";
const EXCERPT = "A practical COO checklist for an AI process audit: define outcomes, map processes, test data readiness, align owners, risk boundaries and measure ROI.";
const SEO_TITLE = "COO Checklist Before an AI Process Audit | MagicWorks";
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

  const heroId = await uploadImage("hero-coo-ai-process-audit-1280x512.png");
  const auditToImpactId = await uploadImage("audit-to-impact-1280x512.png");
  const frameworkId = await uploadImage("framework-coo-audit-readiness.png");

  const doc = {
    _id: "drafts.insight-mohan-coo-ai-process-audit",
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["ai-automation"],
    pillar: "ai-consultation",
    publishedAt: "2026-10-12T03:30:00.000Z",
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "Hero: COO preparing for an AI process audit",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "ai readiness assessment",
      "ai process audit",
      "ai consulting india",
      "ai roadmap",
      "ai readiness checklist",
      "coo ai strategy",
      "ai process automation",
    ],
    body: buildBody(auditToImpactId, frameworkId),
    faq: FAQ.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
  };

  console.log("💾  Creating DRAFT document…");
  const created = await client.create(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    NOTE: this is a DRAFT — it is not live on the site until published.`);
  console.log(`    Studio review: https://${PROJECT_ID}.sanity.studio/structure/insight;insight-mohan-coo-ai-process-audit`);

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
