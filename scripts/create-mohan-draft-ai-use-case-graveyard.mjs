/**
 * create-mohan-draft-ai-use-case-graveyard.mjs
 *
 * Creates "The AI Use-Case Graveyard: Automating Work That Should Have Been
 * Deleted." (author: Mohan Chute, existing author record) in Sanity as a
 * DRAFT ONLY — not visible on the live site until promoted. The post has a
 * future publishedAt (2026-10-05) for a scheduled Monday publish.
 *
 * Source: Docs/Blogs/Mohan/MagicWorks_Delete_Before_Automate_Blog_Package/delete-before-automate-blog/
 *   - the-ai-use-case-graveyard-delete-before-automate.md   (article content)
 *   - assets/delete-before-automate-hero-1280x512.png       (cover image)
 *   - assets/bad-ai-use-case-warning-signs.png              (inline)
 *   - assets/bad-process-before-after.png                   (inline)
 *   - assets/delete-simplify-standardise-automate.png       (inline)
 *
 * Run: node scripts/create-mohan-draft-ai-use-case-graveyard.mjs
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

const ASSET_DIR = path.join(
  __dirname, "..", "..", "Docs", "Blogs", "Mohan",
  "MagicWorks_Delete_Before_Automate_Blog_Package", "delete-before-automate-blog", "assets"
);

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
// BLOG: The AI Use-Case Graveyard: Automating Work That Should Have Been Deleted.
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgWarningSigns, imgBeforeAfter, imgHierarchy) {
  resetKey("uc");
  return [
    p("AI makes waste look modern."),
    p("A report nobody reads becomes an AI-generated report nobody reads. A seven-step approval becomes an automated seven-step approval. A meeting created to reconcile two systems receives an AI summary instead of being removed. A team saves ten minutes drafting a document and spends twenty minutes checking hallucinated detail."),
    p("The demonstration is impressive because the machine moves quickly. The process is still pointless."),
    p("This is how AI use cases enter the graveyard. They do not always fail technically. Some work exactly as specified. They fail because the organisation automated an activity before asking whether the activity should exist."),

    bq("The first question in an AI process audit is not “Can AI do this?” It is “Why are we doing this at all?”"),

    p("The safest sequence is simple:"),
    numbered("Delete work that does not support a necessary outcome."),
    numbered("Simplify the work that remains."),
    numbered("Standardise the stable decisions and handoffs."),
    numbered("Automate only where technology adds measurable value."),
    p("AI belongs at the end of that hierarchy, not the beginning."),

    h2("The short answer: why should you delete before you automate?"),
    p("Because automation multiplies the process it receives. If the process contains unnecessary outputs, duplicate data entry, unclear ownership, unstable rules or excessive exceptions, AI can increase volume and speed without improving the business result. Deleting and redesigning first reduces cost, risk, integration scope and change-management burden."),
    p("A good AI use case has:"),
    bullet("a necessary, named outcome;"),
    bullet("a clear owner and user;"),
    bullet("a repeated workflow with observable inputs;"),
    bullet("sufficiently stable judgment or an explicit human decision point;"),
    bullet("data the organisation may legally and practically use;"),
    bullet("a measurable baseline;"),
    bullet("value that exceeds build, run, review and change costs."),
    p("If those conditions are missing, another model comparison will not fix the use case."),

    h2("Why organisations automate the wrong work"),

    h3("Technology creates solution pressure"),
    p("When leaders buy an AI platform or announce an AI target, teams feel pressure to find tasks for it. The question becomes “Where can we use AI?” Every document, inbox and approval looks like an opportunity."),
    p("Start with the business constraint instead: revenue delay, avoidable cost, risk, poor customer experience, inconsistent judgment or unavailable capacity. Then ask which process causes it and whether AI is the lightest credible intervention."),

    h3("Existing work looks legitimate because it is familiar"),
    p("A monthly report may have survived three management changes. Nobody knows who reads it, but stopping feels risky. A manual re-entry step may exist because two systems once lacked an integration that now exists. A five-person approval may be a memory of one historical error."),
    p("Automation preserves institutional archaeology unless the team challenges it."),

    h3("Demonstrations hide the full operating cost"),
    p("A prototype can draft, classify or summarise in seconds. Production also needs:"),
    bullet("data access and cleaning;"),
    bullet("authentication and permissions;"),
    bullet("integrations;"),
    bullet("prompt or workflow versioning;"),
    bullet("human review;"),
    bullet("exception handling;"),
    bullet("security and privacy controls;"),
    bullet("monitoring and evaluation;"),
    bullet("support and change management;"),
    bullet("vendor and model-change resilience."),
    p("The correct comparison is not “AI took 30 seconds; a person took 20 minutes.” It is “What is the end-to-end cost and quality of the redesigned process under real conditions?”"),

    h3("Nobody is rewarded for deleting work"),
    p("New tools have sponsors, budgets and launch dates. Removed work has no interface and no demo. Yet deleting a weekly task for 20 people may create more certain value than building an assistant to help them perform it."),

    h2("The evidence points to process, not novelty"),
    pLinks([
      { text: "Gartner predicted in July 2024 that at least " },
      { text: "30% of generative-AI projects would be abandoned after proof of concept by the end of 2025", href: "https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025" },
      { text: ", citing poor data quality, inadequate risk controls, escalating costs and unclear business value. It was a forecast, not a final census, but the four failure categories remain useful screening criteria." },
    ]),
    pLinks([
      { text: "BCG's 2024 survey of 1,000 CxOs and senior executives across 59 countries found that only " },
      { text: "26% of companies had the capabilities to move beyond proofs of concept and generate tangible value", href: "https://www.bcg.com/ja-jp/press/24october2024-ai-adoption-in-2024-74-of-companies-struggle-to-achieve-and-scale-value" },
      { text: ". BCG also reported that roughly 70% of implementation challenges were people- and process-related, 20% technology-related and 10% related to algorithms." },
    ]),
    pLinks([
      { text: "McKinsey's 2025 global AI survey provides the strongest link to workflow redesign. Among 25 tested organisational attributes, " },
      { text: "fundamental workflow redesign had the largest effect on reported EBIT impact", href: "https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/2025/the-state-of-ai-how-organizations-are-rewiring-to-capture-value_final.pdf" },
      { text: ". Yet only 21% of respondents reporting generative-AI use said their organisations had fundamentally redesigned at least some workflows. The research is based on self-reported survey data and correlation, not proof that redesign alone causes EBIT gains. Still, it highlights the management gap." },
    ]),
    p("The common pattern is not “AI does not work”. It is “AI value depends on the system around it.”"),

    h2("The delete → simplify → standardise → automate hierarchy"),
    imageBlock(imgHierarchy, "Four-stage AI use-case hierarchy: delete, simplify, standardise and automate", "Delete, simplify, standardise, automate — the value order for choosing AI use cases."),

    h3("1. Delete: does this work support a necessary outcome?"),
    p("Ask of every output and step:"),
    bullet("Who uses it?"),
    bullet("Which decision changes because of it?"),
    bullet("What risk is controlled?"),
    bullet("What customer value is created?"),
    bullet("What would happen if we stopped for 30 days?"),
    bullet("Is another output already serving the same purpose?"),
    p("Candidates for deletion include:"),
    bullet("reports with no identifiable reader or decision;"),
    bullet("duplicate entry maintained “for backup” without a recovery need;"),
    bullet("status meetings that repeat a dashboard;"),
    bullet("approvals added after isolated incidents and never reviewed;"),
    bullet("content produced to meet a volume target with no audience or distribution;"),
    bullet("fields collected but never used;"),
    bullet("internal summaries of information already accessible in context."),
    p("Deletion does not mean recklessness. Time-box the experiment, identify legal or control requirements and monitor consequences. The burden of proof should sit with continuation, not habit."),

    h3("2. Simplify: can the necessary outcome be reached with fewer steps?"),
    p("Remove handoffs, combine checks, reduce inputs and design a clearer happy path."),
    p("Ask:"),
    bullet("Can data be captured once at source?"),
    bullet("Can two approvals become one risk-based review?"),
    bullet("Can a long form request only decision-relevant fields?"),
    bullet("Can a document become a structured record?"),
    bullet("Can work be handled by one accountable owner?"),
    bullet("Can a customer self-serve the simple case?"),
    p("Simplification reduces the surface AI must understand. It also exposes whether the real need is a normal rule, integration, template or interface change."),

    h3("3. Standardise: is “good” defined well enough to repeat?"),
    p("AI performs poorly when experts disagree silently."),
    p("Standardisation means defining:"),
    bullet("inputs and their source;"),
    bullet("decision rules and thresholds;"),
    bullet("required output and quality criteria;"),
    bullet("owner and reviewer;"),
    bullet("exception categories;"),
    bullet("audit trail;"),
    bullet("timing and service level;"),
    bullet("feedback and correction process."),
    p("Not every decision must become deterministic. For judgment-heavy work, standardise the evidence, rubric and escalation boundary. Preserve human accountability where context, ethics, negotiation or material risk require it."),

    h3("4. Automate: what is the lightest capable intervention?"),
    p("Automation is broader than generative AI. The correct solution may be:"),
    bullet("removing a field;"),
    bullet("a database rule;"),
    bullet("a workflow trigger;"),
    bullet("a standard template;"),
    bullet("robotic process automation;"),
    bullet("search and retrieval;"),
    bullet("predictive scoring;"),
    bullet("a constrained language model;"),
    bullet("a human-in-the-loop assistant;"),
    bullet("no technology change."),
    p("Choose the least complex solution that meets the outcome, quality and risk requirements. Generative AI is valuable for language, unstructured information, pattern extraction and assisted judgment. It is not automatically the right tool for stable calculations or deterministic routing."),

    h2("A faster bad process is still a bad process"),
    imageBlock(imgBeforeAfter, "Illustrative proposal process comparison showing nine handoffs reduced to four before AI assistance", "Redesigning the process first cut nine handoffs down to four before AI assistance was added."),
    p("Imagine a manufacturing company preparing technical proposals."),
    p("The current process has nine handoffs, 42 fields across several files, three repeated reviews and a final reformatting step. Sales enters customer data. Engineering re-enters specifications. Finance calculates pricing. A manager reviews every proposal regardless of risk. Marketing repairs formatting. Sales emails the PDF, then copies the status into the CRM."),
    p("The first AI idea is to generate the proposal document from the 42 fields."),
    p("It saves drafting time, but it also produces proposals faster than engineering can verify them. Missing inputs are filled with plausible language. Three approvals remain. Formatting improves; cycle time barely moves."),

    h3("Redesign before automation"),
    block("normal", [strong("Delete")]),
    bullet("Remove 12 fields nobody uses."),
    bullet("Stop creating a separate internal summary already represented in the CRM."),
    bullet("Remove marketing approval when approved components are used."),
    block("normal", [strong("Simplify")]),
    bullet("Capture customer and opportunity data once."),
    bullet("Combine technical and commercial inputs in one structured record."),
    bullet("Replace three sequential reviews with one parallel exception review."),
    block("normal", [strong("Standardise")]),
    bullet("Define 18 required decision fields."),
    bullet("Create approved scope, assumption and exclusion modules."),
    bullet("Establish risk triggers for unusual margin, delivery, compliance or custom engineering."),
    bullet("Define who approves each exception."),
    block("normal", [strong("Automate")]),
    bullet("Retrieve customer and opportunity data."),
    bullet("Suggest the relevant approved modules."),
    bullet("Draft the executive summary from verified inputs."),
    bullet("Flag missing evidence rather than inventing it."),
    bullet("Generate the document and route only exceptions for review."),
    p("The clean process has four handoffs, 18 decision fields and one risk-based review. These numbers are illustrative, not a measured client result. They demonstrate the value order: most of the gain comes from removing and redesigning work; AI assists the path that remains."),

    h2("Warning signs of a bad AI automation candidate"),
    imageBlock(imgWarningSigns, "Six warning signs of a bad AI automation candidate", "Six warning signs that a task is a poor candidate for AI automation."),

    h3("No owner"),
    p("Nobody is accountable for the outcome, so nobody can approve rules, resolve exceptions or maintain the solution."),

    h3("No customer for the output"),
    p("The task exists by habit. Ask for the named user and decision before improving production."),

    h3("Unstable rules"),
    p("Experts do not agree on what good looks like. Use the project to align judgment before training or prompting a system."),

    h3("Dirty or inaccessible inputs"),
    p("The prototype relies on manual file collection, unapproved data or heroic cleaning. Production cost will be hidden in operations."),

    h3("Exceptions dominate"),
    p("The “standard” path is rare. AI may still assist, but the operating model must acknowledge uncertainty and route cases safely."),

    h3("Speed is the only metric"),
    p("Faster output does not guarantee lower cost, better decisions or reduced risk. Define the business consequence."),

    p("One warning sign is a question. Several are a redesign brief."),

    h2("A practical AI use-case qualification scorecard"),
    p("Score each factor 0, 1 or 2."),
    bulletBold("Outcome necessity:", "0 = output has no clear use; 1 = useful but duplicated; 2 = necessary decision or customer outcome."),
    bulletBold("Process stability:", "0 = highly variable and disputed; 1 = some stable segments; 2 = repeatable flow with known exceptions."),
    bulletBold("Data readiness:", "0 = inaccessible, unsafe or poor; 1 = repairable with effort; 2 = governed and usable."),
    bulletBold("Value:", "0 = convenience only; 1 = plausible but unmeasured; 2 = material cost, revenue, capacity or risk impact."),
    bulletBold("Risk control:", "0 = no owner or review; 1 = controls can be designed; 2 = existing accountable controls."),
    bulletBold("Adoption fit:", "0 = adds work or tool switching; 1 = needs significant change; 2 = fits a real workflow and user need."),
    bulletBold("Technical fit:", "0 = simpler tool is better; 1 = AI useful for a subset; 2 = AI has a clear capability advantage."),
    p("Maximum: 14."),
    bulletBold("0–5:", "delete, redesign or stop."),
    bulletBold("6–9:", "investigate with a narrow process experiment."),
    bulletBold("10–14:", "consider a controlled pilot, subject to risk and economics."),
    p("A high score is not approval. Privacy, law, safety or strategic fit can still stop a use case. A low technical-fit score may point to ordinary automation, which can be the better outcome."),

    h2("Apply the hierarchy to four ordinary workflows"),
    p("Before calculating the return, test the hierarchy against real work. The following patterns appear ordinary, which is exactly why they can survive for years."),

    h3("Example 1: the weekly management report"),
    p("A team spends six hours every Friday collecting numbers from spreadsheets, writing commentary and formatting a presentation. The obvious use case is an AI agent that assembles the deck."),
    p("Start with deletion. Ask who makes a different decision because the report exists. If three of 28 slides serve a real weekly decision, delete the rest. Simplify the surviving output into a live exception view. Standardise metric definitions, owners and cut-off times. Then automate data retrieval and use AI only to draft commentary on material changes, with the metric owner approving it."),
    p("The original idea automated six hours of production. The redesigned system may remove five hours, improve data freshness and expose disagreements in metric definitions. The value came mainly from redesign; AI became a small, useful layer."),

    h3("Example 2: inbound proposal generation"),
    p("A services firm wants AI to create proposals from enquiry forms. But the forms collect little information, salespeople interpret scope differently and old proposals contain inconsistent pricing and promises."),
    p("Automating first would produce polished inconsistency at scale. Delete proposal sections customers do not use. Simplify the discovery questionnaire. Standardise qualification, scope modules, assumptions, proof points and commercial approval. Then let AI assemble a first draft from approved components while a responsible seller confirms the solution and commitment."),
    p("The production metric is not “draft created in two minutes”. It is qualified-proposal turnaround, revision count, approval effort, win rate and gross-margin leakage."),

    h3("Example 3: customer-support triage"),
    p("A support operation wants generative AI to classify every ticket. Observation shows that a large share of tickets comes from one confusing product setting and another group is created by failed account synchronisation."),
    p("Delete demand by fixing the setting and integration. Simplify the categories customers see. Standardise severity, routing and escalation rules. Use deterministic logic for obvious cases and AI for the unstructured remainder. Preserve rapid human escalation when confidence is low or customer impact is high."),
    p("This approach prevents tickets instead of celebrating faster classification. Avoided demand is usually more valuable than processing avoidable demand efficiently."),

    h3("Example 4: internal policy questions"),
    p("An organisation proposes a chatbot because employees repeatedly ask HR and finance the same questions. The source policies are duplicated, outdated and contradictory."),
    p("An answer generator cannot repair missing authority. First delete expired documents and duplicate channels. Simplify the policy set. Standardise ownership, review dates and the wording of approved rules. Only then add retrieval and answer generation with citations, refusal behaviour and a clear route to a human owner."),
    p("Here, content governance is part of the product. Without it, an apparently helpful assistant simply makes conflicting guidance faster to access."),

    p("These examples reveal a practical distinction: a task is not an AI use case merely because AI can touch it. It becomes a credible use case when the necessary outcome, redesigned workflow, accountable owner, controlled information and measurable advantage fit together."),

    h2("Calculate value after the process changes"),
    p("Build the business case from the redesigned baseline, not the old process."),
    p("Suppose the old task takes 1,000 hours a year. Deletion and simplification reduce it to 500. Standardisation reduces rework by another 100. Only 400 hours remain potentially automatable."),
    p("If the business case credits AI with all 1,000 hours, it overstates value by 150%. It also risks paying technology costs to automate 600 hours that no longer need to exist."),
    p("Measure:"),
    bullet("volume entering the redesigned process;"),
    bullet("human time per completed outcome;"),
    bullet("cycle time;"),
    bullet("first-time-right rate;"),
    bullet("exception and escalation rate;"),
    bullet("review time;"),
    bullet("customer or employee outcome;"),
    bullet("error and risk events;"),
    bullet("run, model, integration and support cost;"),
    bullet("adoption and override behaviour."),
    p("Time saved is not automatically cash saved. State what happens to released capacity: fewer contractors, avoided hiring, faster revenue, more customer work, reduced backlog or better control. If nothing changes, call it capacity—not realised financial benefit."),

    h2("What should never be fully automated?"),
    p("Avoid universal rules based only on task category. Use consequence and reversibility."),
    p("Keep accountable human decisions where an error could materially affect:"),
    bullet("employment or access to opportunity;"),
    bullet("health or safety;"),
    bullet("legal rights or compliance;"),
    bullet("credit, insurance or essential services;"),
    bullet("significant pricing or contractual commitment;"),
    bullet("public claims and reputation;"),
    bullet("vulnerable people;"),
    bullet("irreversible customer outcomes."),
    p("AI can retrieve evidence, draft, classify and surface anomalies. Human involvement must be meaningful, informed and empowered to change the outcome—not a ceremonial click."),
    p("McKinsey's 2025 survey found that 27% of respondents at organisations using generative AI said employees reviewed all AI-created content before use, while a similar share said 20% or less was checked. That spread shows there is no settled universal review pattern. Review intensity should follow risk, not fashion."),

    h2("A 30-day delete-before-automate sprint"),

    h3("Week 1: choose one named process"),
    bullet("Select a process linked to a real constraint."),
    bullet("Observe the process as performed, not as documented."),
    bullet("Identify the user, owner, inputs, outputs and decisions."),
    bullet("Capture volume, time, defects, delay and cost."),

    h3("Week 2: challenge every step"),
    bullet("Run the deletion questions."),
    bullet("Trace legal and control requirements."),
    bullet("Remove duplicate outputs and fields."),
    bullet("Design a simpler end-to-end flow."),

    h3("Week 3: standardise judgment"),
    bullet("Define good inputs and outputs."),
    bullet("Agree rules, rubric and exceptions."),
    bullet("Assign ownership and review."),
    bullet("Establish a clean baseline."),

    h3("Week 4: test the lightest intervention"),
    bullet("Compare no-code rule, integration, deterministic automation and AI options."),
    bullet("Prototype on representative cases."),
    bullet("Include difficult and failure cases."),
    bullet("Estimate total production and review cost."),
    bullet("Decide: stop, redesign further, buy, build or pilot."),

    p("The most valuable outcome may be a decision not to automate. That is not a failed audit. It is avoided waste."),

    h2("The operating rule"),
    bq("Automate only the work that survives deletion, simplification and standardisation."),
    p("An AI roadmap should not be a catalogue of tasks a model can perform. Models can perform many tasks. The strategic work is deciding which outcomes deserve investment, what process should exist around them and how success will be measured."),
    p("Delete first. Simplify second. Standardise third. Automate last."),
    p("You will build fewer use cases. More of them will matter."),

    h2("Find out honestly where AI belongs"),
    callout(
      "Find Out Honestly Where AI Belongs",
      "MagicWorks' AI Process Audit & Roadmap is a four-to-six-week advisory engagement covering one or two named processes. We map the work as it is, rank opportunities by value, effort and risk, make build-versus-buy decisions and deliver a sequenced 12-month roadmap. AI Consultation is consultation only — we do not build or operate the recommended system, so the roadmap is designed to be acted on with your team or any partner.",
      "key-takeaway"
    ),
    linkPara("", "Book a discovery call", "https://magicworksitsolutions.com/contact", " and bring the process you are considering automating. We will start with whether it should survive."),

    block("normal", [plain("Part of "), strong("The Invisible Levers"), plain(" series: the visible output gets attention; the less-visible system underneath often decides the result.")]),
  ];
}

const FAQ = [
  { question: "What does “delete before automate” mean?", answer: "It means removing unnecessary work before applying technology. The complete sequence is delete unnecessary activity, simplify the remaining process, standardise its inputs and decisions, then automate only where technology creates measurable value." },
  { question: "Why do AI automation projects fail?", answer: "Common causes include unclear business value, poor data, weak ownership, inadequate risk controls, escalating production cost, low adoption and automating a badly designed process. A successful prototype does not prove a viable operating model." },
  { question: "How do you identify a good AI use case?", answer: "Look for a necessary outcome, repeated workflow, usable data, stable judgment or clear human review, accountable ownership, measurable baseline and material value. Confirm that AI has an advantage over simpler rules, integration or conventional automation." },
  { question: "Should every repetitive task be automated?", answer: "No. Some repetitive tasks should be deleted, combined, redesigned or handled with a simple template. Repetition makes a task easier to automate, but it does not make the task valuable." },
  { question: "What is the difference between standardisation and automation?", answer: "Standardisation defines inputs, rules, outputs, owners and exceptions so work can be repeated reliably. Automation uses technology to execute part of that work. Standardisation can create value even if automation never follows." },
  { question: "How do you calculate AI ROI?", answer: "Compare the total cost and outcome of the redesigned process with a realistic counterfactual. Include build, integration, model usage, review, exceptions, support, change management and risk. Do not credit AI for work already removed through redesign." },
  { question: "When is human review required?", answer: "Use meaningful human review when errors have material, regulated, irreversible or ethical consequences; when context is not fully represented; or when the model's performance is insufficient. Reviewers need evidence, time and authority to change the output." },
  { question: "Is generative AI always better than normal automation?", answer: "No. Deterministic rules, integrations, templates, search or robotic process automation can be cheaper and more reliable for stable work. Generative AI is strongest where language, unstructured information and assisted judgment matter." },
  { question: "What is an AI process audit?", answer: "An AI process audit maps a named workflow, challenges unnecessary work, assesses data and risk, ranks opportunities, evaluates build-versus-buy options and produces a sequenced roadmap. The deliverable is a decision about where AI fits." },
  { question: "How can MagicWorks help with AI use-case prioritisation?", answer: "MagicWorks can audit one or two named processes, create a value-risk-effort ranking, identify work to delete or redesign, assess AI feasibility and provide a vendor-neutral roadmap that can be executed with any partner." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "The AI Use-Case Graveyard: Automating Work That Should Have Been Deleted.";
const SLUG = "ai-use-case-graveyard-delete-before-automate";
const EXCERPT = "Use the delete, simplify, standardise, automate hierarchy to remove waste, redesign workflows and select AI use cases that can create measurable value.";
const SEO_TITLE = "Delete Before Automate: A Better AI Use-Case Framework";
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

  const heroId = await uploadImage("delete-before-automate-hero-1280x512.png");
  const warningSignsId = await uploadImage("bad-ai-use-case-warning-signs.png");
  const beforeAfterId = await uploadImage("bad-process-before-after.png");
  const hierarchyId = await uploadImage("delete-simplify-standardise-automate.png");

  const draftId = "drafts.insight-mohan-ai-use-case-graveyard";

  const doc = {
    _id: draftId,
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["ai-automation"],
    pillar: "ai-consultation",
    publishedAt: "2026-10-05T03:30:00.000Z",
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "A cluttered workflow passing through deletion, simplification and standardisation before reaching automation",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "AI use case prioritisation",
      "process redesign before automation",
      "AI process audit",
      "workflow automation strategy",
      "AI roadmap India",
      "bad automation candidates",
    ],
    body: buildBody(warningSignsId, beforeAfterId, hierarchyId),
    faq: FAQ.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
  };

  console.log("💾  Creating DRAFT document (not published)…");
  const created = await client.createOrReplace(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    Studio review: https://${PROJECT_ID}.sanity.studio/structure/insight;insight-mohan-ai-use-case-graveyard`);
  console.log(`    Scheduled publishedAt: 2026-10-05T03:30:00.000Z (Monday) — remains a DRAFT until explicitly published.`);

  console.log("\n🎉  Done. Draft created — not live.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
