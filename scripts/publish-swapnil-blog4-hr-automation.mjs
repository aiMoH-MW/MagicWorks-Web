/**
 * publish-swapnil-blog4-hr-automation.mjs
 *
 * Publishes "How We Compressed an 8-Hour Internal Function to 1 Hour
 * Without Reducing Quality" (author: Swapnil Ughade) LIVE, dated today.
 *
 * (Originally built to go live as a Sanity draft scheduled for 24-Aug-2026;
 * switched to an immediate live publish per instruction to just publish
 * everything now instead of scheduling.)
 *
 * Source: Docs/Blogs/New blogs/Swapnil/Blog4_HR_8_Hours_to_30_Minutes_v2.html
 * Hero image: Docs/Blogs/New blogs/Swapnil/Blog4_HR_8_Hours_to_30_Minutes_v2.jpg
 *             (copied to scripts/swapnil-media/blog4-hr-automation-hero.jpg)
 *
 * NOTE: the source HTML's CTA originally linked to a whitepaper page
 * (/reports/ai-native-websites-cost-benefit-analysis) and a service page
 * (/services/ai-native-website-development), neither of which existed on
 * the live site. The whitepaper now exists (Whitepaper 03, built from
 * MagicWorks_Whitepaper_03_AI_Native_Websites.pdf) and this script's final
 * CTA links to it at /insights/whitepapers/ai-native-websites-vs-traditional-websites.
 * The other broken service link was replaced with the real
 * /services/web-development page.
 *
 * NOTE: the 8-hours-to-X-minutes/hours figures and resume volume in this
 * body were realigned to match the more detailed case study in Whitepaper 03
 * (8 hrs -> 1 hr, 1,000 resumes/month at 40/day, 90 sec verification per
 * resume) rather than the source HTML's original 8 hrs -> 30 min / 40-80
 * per week, so the blog and whitepaper cite consistent numbers.
 *
 * Run: node scripts/publish-swapnil-blog4-hr-automation.mjs
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

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

const IMAGE_PATH = path.join(__dirname, "swapnil-media", "blog4-hr-automation-hero.jpg");
const LIVE_ID = "insight-swapnil-hr-ai-transformation";

// ── Portable Text helpers ───────────────────────────────────────────────────
let _k = 0;
const k = () => `sb4${String(++_k).padStart(3, "0")}`;

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
const bulletBold = (leadIn, rest) => block("normal", [strong(leadIn), plain(" " + rest)], [], "bullet");

const callout = (title, body, variant = "key-takeaway", items) => {
  const c = { _type: "callout", _key: k(), title, body, variant };
  if (items) c.items = items;
  return c;
};

const pullquote = (text) => ({ _type: "pullquote", _key: k(), text });

const statRow = (stats) => ({
  _type: "statRow",
  _key: k(),
  stats: stats.map((s) => ({ _key: k(), ...s })),
});

const linkPara = (before, linkText, href, after = "") => {
  const mk = k();
  return block("normal", [plain(before), linked(linkText, mk), plain(after)], [{ _key: mk, _type: "link", href }]);
};

// ── Body ─────────────────────────────────────────────────────────────────────
const body = [
  p("MagicWorks compressed its internal HR resume screening function from 8 hours daily to 1 hour daily by embedding AI scoring directly into the careers page on the website backend, without reducing shortlist quality or hiring outcomes. The transformation freed 7 hours daily that moved into candidate experience, executive assistant support, and sales coordination work. The same pattern applies to five other business functions covered below: sales lead qualification, content quality review, support ticket triage, vendor evaluation, and expense report review."),

  p("The most valuable AI transformation I have seen in the last 12 months was not on a client account. It was inside MagicWorks. Our HR resume screening function used to consume 8 hours a day of one team member's time. Six days a week. Every week. Reviewing incoming resumes against job description requirements, filtering the misfits from the possibles, and forwarding a shortlist to the hiring manager for interview scheduling."),
  p("That function now takes 1 hour a day. Same quality of shortlist, same rate of successful interviews, materially better candidate experience. The 7 hours saved daily did not disappear. It moved into higher-value work that had previously been squeezed at the edges: proactive candidate outreach, executive assistant support for the founder's calendar, and sales coordination during Google Ads campaign launches."),
  p("This is what AI-native business operations actually looks like when it is done properly. Not a chatbot bolted onto a website. Not a productivity tool the team is asked to adopt on top of existing work. A specific function inside the business, redesigned around AI capability, producing the same output in a fraction of the time so that human attention can move to the work that only humans can do."),

  statRow([
    { value: "8 hrs", label: "Daily manual resume screening (1 person, 6 days per week)" },
    { value: "1 hr", label: "Daily supervisory review of AI-scored shortlist (same person, same 6 days)" },
  ]),

  h2("What the function actually was, before the change"),
  p("The starting context. MagicWorks receives 800 to 1,200 resume submissions per month through the careers page, driven by 7 to 8 active positions open at any time. At the midpoint (1,000 resumes per month across roughly 25 working days), that averages 40 resumes per day. Each resume needed to be read, evaluated against the specific job description for the role the candidate applied for, and scored on a rough qualitative scale: strong fit, possible fit, misfit."),
  p("The person doing this work was a senior member of the HR team who had genuine expertise in evaluating resumes for the mix of technical, creative, and operational roles MagicWorks hires. Her judgment was good. Her output was reliable. The issue was volume: each resume required 6 to 12 minutes of careful reading, an average of 12 minutes per resume including logging, shortlist coordination, and candidate follow-up notes. The arithmetic: 40 resumes per day times 12 minutes each equals 480 minutes, or 8 hours per day."),
  p("This consumed essentially all of one senior HR team member's working hours, six days a week, every week. The strategic question was not “can we hire someone faster to do this same work?” It was: “can we redesign the function so that the human judgment we value gets applied at the critical decision moments, and the routine evaluation work gets handled by infrastructure?”"),

  h2("What we actually built"),
  p("The solution is what I now call an AI-native website function. Every resume submitted through the MagicWorks careers page passes through an AI scoring system on the website backend before it ever reaches the HR team. The AI has access to the specific job description for the role the candidate applied for, and it evaluates each resume against that JD using the same criteria our HR team would use."),
  linkPara("This is why the specific website architecture matters: ", "website speed and website architecture", "/blog/website-speed-paid-ad-budget-53-percent-mobile-abandonment", " are the same underlying investment, whether the payoff shows up in ad conversion or in internal operating hours."),
  linkPara("The AI produces three outputs for every submitted resume: a fit score on a defined scale, a reasoning summary explaining the score, and a confidence indicator. This is the exact kind of embedded backend functionality that our ", "AI-native website development approach", "/services/web-development", " is designed to enable."),
  p("The HR team no longer receives a queue of raw resumes to read. They receive a pre-scored, pre-ranked queue. Their job has shifted from “evaluate every resume from scratch” to “verify the AI's judgment on the top-ranked resumes and audit a sample of the lower-ranked ones to catch any drift.” The same 40 resumes per day now flow through the AI scorer automatically; HR spends roughly 90 seconds per resume verifying the top-ranked candidates and auditing a sample of the rest. At 40 resumes times 90 seconds average, that is 60 minutes, or 1 hour per day: same person, same days per week, same shortlist quality, but 7 hours of daily capacity redirected to higher-value work."),

  h3("Step 1: Resume submission via the careers page"),
  p("Candidate uploads resume through the standard careers page form, selecting the specific role they are applying for. The website backend receives the submission immediately."),
  h3("Step 2: AI extracts and evaluates against the job description"),
  p("The AI parses the resume, extracts skills, work experience, education, and qualifying signals, and evaluates them against the specific JD requirements for the role. This happens within seconds of the submission."),
  h3("Step 3: Fit score, reasoning, and confidence indicator produced"),
  p("The AI outputs a numerical fit score, a short reasoning summary explaining the score, and a confidence indicator. All three are stored against the candidate record for the HR team to review."),
  h3("Step 4: HR reviews pre-scored, pre-ranked queue"),
  p("The HR team receives a daily view of new submissions organised by AI fit score in priority order. Each entry shows the AI's reasoning inline. HR verifies the AI's judgment on the top-ranked candidates and audits a sample of the lower-ranked ones."),
  h3("Step 5: Shortlist forwarded to hiring manager, feedback loop closed"),
  p("Verified strong-fit candidates get forwarded to the hiring manager for interview scheduling. Post-interview outcomes flow back into the system so the AI's scoring can be recalibrated against actual hiring success over time."),

  h2("The three quality checks that keep the AI honest"),
  p("The most reasonable concern about AI resume screening is quality. If the AI misses a strong candidate because their resume does not use the exact language the AI was trained on, or if it accepts a weak candidate whose resume uses the right buzzwords without genuine substance, the cost to the business is real. We have three quality checks operating simultaneously to catch both failure modes."),
  bp("Quality check 1: AI reasoning is attached to every score.", "The HR reviewer sees not just the fit score but the AI's explanation of why it produced that score. This means the reviewer can spot AI judgment errors in 30 to 45 seconds per candidate. A resume with a fit score of 8/10 but reasoning that focuses only on years of experience without noticing the missing certification requirement is easy for a human to catch."),
  bp("Quality check 2: Low-confidence cases route to full human review.", "When the AI's confidence in its own judgment falls below a defined threshold (typically because the resume is unusual, the JD is ambiguous, or the fit signals are mixed), the system flags the candidate for full manual review rather than including them in the pre-ranked queue. This catches the edge cases where AI judgment is genuinely unreliable."),
  bp("Quality check 3: Random audit sampling for drift detection.", "Once a week, we randomly sample 10 percent of the resumes the AI scored during the week and route them through independent human review. If the sampled human scores diverge materially from the AI scores, that indicates drift and we retrain the underlying scoring logic. So far, over 6 months of operation, we have not observed material drift."),

  callout(
    "What the Three Quality Checks Accomplish Together",
    "The reasoning attachment catches individual judgment errors in real time. The low-confidence routing catches edge cases where AI is unreliable. The random audit sampling catches systemic drift over time. Together, they let us trust the AI on the routine 70 to 80 percent of resume evaluations where the judgment is clear, while ensuring human expertise applies to the 20 to 30 percent where it genuinely matters.",
    "key-takeaway"
  ),

  h2("What the 7 hours saved actually went into"),
  p("The compression only produces business value if the time saved gets redeployed to work that produces higher value than the work that was displaced. Otherwise you are just automating your way to a smaller HR team, which is not the goal. The 7 hours per day, roughly 42 hours per week freed up by the AI resume scoring system, moved into three specific work streams that had previously been under-served."),
  bp("Candidate experience.", "The HR team now has time to write personalised acknowledgment emails to every applicant within 24 hours, to schedule discovery conversations with borderline candidates who might be worth developing rather than immediately declining, and to maintain warm relationships with strong candidates who are not the right fit for the current role but might fit a future one. Our candidate feedback ratings improved measurably in the 6 months following the transition."),
  bp("Executive assistant support.", "Portions of the freed hours moved into executive assistant work supporting the founder's calendar, client communications, and travel coordination. This work had previously been distributed inefficiently across multiple team members. Consolidating it under one dedicated resource improved quality and reduced coordination friction."),
  bp("Sales coordination during Google Ads campaign launches.", "When we launch a new commission-tier client engagement, there is a spike of coordination work: attribution setup, dashboard configuration, cross-team briefings, and client onboarding. The freed HR hours are available to support this work when spikes occur, reducing the load on the account team during critical periods."),

  pullquote("The compression only produces business value if the time saved gets redeployed to work that produces higher value than the work that was displaced. AI-native operations is not about automating your way to a smaller team. It is about redirecting the same team's attention to work that only humans can do well."),

  h2("Which other business functions this pattern applies to"),
  p("The specific transformation described here is HR resume screening. The underlying pattern is not specific to HR. Any function where humans currently spend significant time on high-volume screening work against clear evaluation criteria is a candidate for the same AI-native redesign."),
  bulletBold("Sales lead qualification:", "score inbound leads against ideal customer profile criteria; sales team spends time only on qualified leads with attached AI reasoning."),
  bulletBold("Content quality review:", "evaluate submitted content against brand guidelines, style, and factual accuracy; editors focus on the substantive edits only."),
  bulletBold("Support ticket triage:", "categorise, prioritise, and route incoming support tickets; humans focus on genuinely complex or high-emotion tickets."),
  bulletBold("Vendor evaluation:", "score vendor proposals against defined criteria; procurement team makes the final decision with structured evidence attached."),
  bulletBold("Expense report review:", "verify expense reports against policy compliance; finance team reviews only flagged exceptions."),
  p("The key requirement for any of these to work is that the evaluation criteria must be well-defined enough that an AI can be trained against them. If your team cannot articulate clearly what “good” looks like for a given evaluation, the AI cannot learn it either. In that case, the first task is not to build the AI system. The first task is to write down the evaluation criteria clearly enough that a new team member could apply them without ambiguity. Then the AI system becomes possible."),

  callout(
    "The Starting Question for Your Own Business",
    "Which functions in your business currently consume significant hours per week on high-volume routine evaluation work with clear criteria? Those are your compression candidates. Start with the one where you already have clear evaluation criteria written down, or where the criteria can be defined without much internal debate. That is where AI-native transformation produces value fastest.",
    "info"
  ),
  linkPara("Our ", "AI Consultation practice", "/services/ai-consultation", " runs process audits specifically to identify these functions across a business."),

  callout(
    "Read the Full AI-Native Websites Whitepaper",
    "This blog covers the HR case study in operational detail. The full whitepaper on AI-Native Websites vs Traditional Websites covers both cost-benefit dimensions: the operational cost dimension (this case study) and the marketing cost dimension (the paid ad budget waste from slow websites). 19 pages, free download.",
    "key-takeaway"
  ),
  linkPara("", "Download the Whitepaper", "/insights/whitepapers/ai-native-websites-vs-traditional-websites", "."),
];

const faq = [
  { _key: k(), question: "What does AI-native business operations mean?", answer: "AI-native business operations means embedding AI functionality directly into the workflows and infrastructure that a business uses to operate, rather than layering AI tools on top of existing manual processes. The distinction matters because AI-native operations reshape the underlying process to take advantage of AI capabilities, while surface-level AI adoption typically just automates isolated tasks without reshaping the workflow." },
  { _key: k(), question: "How does AI resume screening actually work?", answer: "At MagicWorks, every resume submitted through the careers page is processed by an AI scoring system on the website backend before it reaches the HR team. The AI reads the resume, extracts skills, experience, and qualification signals, compares them against the specific job description requirements for the role, and produces a fit score. The HR team receives a pre-scored queue in priority order, with the AI's reasoning attached so a human can quickly verify each judgment call." },
  { _key: k(), question: "How much time did AI resume screening save at MagicWorks?", answer: "The HR resume screening function at MagicWorks previously took approximately 8 hours per day (40 resumes at 12 minutes each), staffed by one full-time person who reviewed each incoming resume manually against JD requirements. After implementing AI-native resume scoring integrated into the careers page, the same function now takes approximately 1 hour per day (40 resumes at roughly 90 seconds each to verify). The 7 hours saved daily moved into higher-value work: candidate experience, executive assistant support, and sales coordination." },
  { _key: k(), question: "What quality checks ensure AI resume scoring is reliable?", answer: "Three quality checks operate simultaneously. First, the AI produces its fit score with a reasoning summary attached, so the human reviewer can verify the logic in 30 to 45 seconds per candidate. Second, the system flags edge cases where the AI's confidence is below a defined threshold, and those cases route to full human review. Third, we periodically sample AI-scored resumes for random human audit to catch any drift in scoring accuracy over time." },
  { _key: k(), question: "What other business functions is this AI-native transformation applicable to?", answer: "The same pattern (pre-processing high-volume decisions on the backend before human review) is applicable to sales lead qualification, content quality review, customer support ticket triage, vendor evaluation, expense report review, and any function where humans currently spend significant time on high-volume screening work that has clear evaluation criteria. The key requirement is a well-defined criteria set that the AI can be trained against." },
];

const title = "How We Compressed an 8-Hour Internal Function to 1 Hour Without Reducing Quality";
const seoTitle = "8 Hours to 1 Hour: MagicWorks HR AI Case Study";
const excerpt = "How MagicWorks compressed HR resume screening from 8 hours daily to 1 hour through website-integrated AI, and where the pattern applies next.";

if (seoTitle.length > 60) { console.error(`❌ seoTitle too long: ${seoTitle.length} chars`); process.exit(1); }
if (excerpt.length > 155) { console.error(`❌ excerpt too long: ${excerpt.length} chars`); process.exit(1); }

async function main() {
  console.log("\n=== Publishing Swapnil Ughade blog: 8 Hours to 1 Hour (HR AI) ===\n");

  console.log("🔍  Looking up existing author Swapnil Ughade…");
  const author = await client.fetch(
    `*[_type == "teamMember" && (slug.current == "swapnil-ughade" || name match "Swapnil*")][0]{ _id, name }`
  );
  if (!author) { console.error("❌  Could not find an existing Swapnil Ughade teamMember record. Aborting."); process.exit(1); }
  console.log(`✅  Found author: ${author.name} (${author._id})`);

  if (!fs.existsSync(IMAGE_PATH)) { console.error(`❌  Hero image not found: ${IMAGE_PATH}`); process.exit(1); }
  console.log("📤  Uploading hero image…");
  const asset = await client.assets.upload("image", fs.createReadStream(IMAGE_PATH), {
    filename: "hr-8-hours-to-1-hour-hero.jpg",
  });
  console.log(`✅  Image uploaded: ${asset._id}`);

  const doc = {
    _id: LIVE_ID,
    _type: "insight",
    title,
    seoTitle,
    slug: { _type: "slug", current: "8-hours-to-1-hour-hr-ai-transformation-case-study" },
    excerpt,
    author: { _type: "reference", _ref: author._id },
    publishedAt: "2026-08-19T09:00:00.000Z",
    categories: ["ai-automation"],
    pillar: "ai-consultation",
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: "8 hours to 1 hour: same work, new system. AI screening dashboard compresses daily resume screening from 8 hours to 1 hour.",
    },
    body,
    faq,
    tags: [
      "AI automation business operations India",
      "AI resume screening",
      "AI-native SME transformation India",
      "HR automation case study",
      "AI workflow compression",
      "AI-integrated website functionality",
      "operational efficiency AI India",
    ],
    isGated: false,
  };

  console.log("\n💾  Publishing live…");
  const created = await client.createOrReplace(doc);
  console.log(`✅  Published: ${created._id}`);
  console.log(`    Live URL: https://magicworksitsolutions.com/blog/${doc.slug.current}`);
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
