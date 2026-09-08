/**
 * publish-mohan-sales-operating-system.mjs
 *
 * Publishes "Your Website Is Not a Brochure. It Is a Sales Operating
 * System." (author: Mohan Chute, existing author record) LIVE today.
 *
 * Source: Docs/Blogs/MagicWorks_Website_Sales_Operating_System_Blog_Package/
 *   - your-website-is-a-sales-operating-system.md              (article content)
 *   - assets/website-sales-operating-system-hero-1280x512.png  (cover image)
 *   - assets/connected-b2b-buyer-statistics.png                (inline)
 *   - assets/website-sales-operating-system-flow.png           (inline)
 *   - assets/website-operating-system-90-day-roadmap.png       (inline)
 *
 * Run: node scripts/publish-mohan-sales-operating-system.mjs
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

const ASSET_DIR = path.join(__dirname, "..", "..", "Docs", "Blogs", "MagicWorks_Website_Sales_Operating_System_Blog_Package", "assets");

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

function pLinks(parts) {
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
// BLOG: Your Website Is Not a Brochure. It Is a Sales Operating System.
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgHero, imgBuyer, imgFlow, imgRoadmap) {
  resetKey("wso");
  return [
    p("The most expensive part of a website is often the work it fails to do."),
    p("It may look polished. The homepage may carry the right colours, the service pages may be technically complete, and the contact form may send an email to somebody. Yet after the launch, marketing still cannot explain which pages create qualified enquiries. Sales still receives incomplete leads. Follow-up still depends on somebody noticing an email. Management still sees traffic in one report, campaign spend in another, and revenue in a third."),
    p("The website is live, but the commercial system is disconnected."),
    p("That is the difference between a brochure and a sales operating system. A brochure displays information. A sales operating system receives demand, interprets intent, helps buyers make progress, captures useful context, routes opportunities, triggers follow-up, and returns outcome data so the next visitor gets a better experience."),

    bq("The short answer: A website sales operating system is a connected digital system in which acquisition, content, search, enquiry capture, qualification, CRM, follow-up and analytics work as one revenue process. The pages are the visible interface. The real value sits in the decisions, data flows, integrations and feedback loops behind them."),

    p("The essential flow is:"),
    bp("Traffic → intent → relevant page → action → qualification → CRM → follow-up → outcome → improvement.", ""),
    p("If any handoff breaks, the website can appear successful while quietly losing business."),

    h2("Buyers do not experience your departments. They experience one journey."),
    p("Inside a company, paid media, SEO, web development, content, CRM and sales may belong to different people. The buyer does not care. A prospect who searches on Google, reads a comparison page, returns through LinkedIn, asks a question in chat and finally speaks to sales experiences one continuous relationship with the company."),
    pLinks([
      { text: "The evidence supports this connected view. McKinsey's 2024 B2B Pulse research, based on nearly 4,000 B2B decision makers across 13 countries, found that buyers use an average of " },
      { text: "ten interaction channels during the buying journey", href: "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/five-fundamental-truths-how-b2b-winners-keep-growing" },
      { text: ". The company website was among the most frequently used touchpoints. More than half of respondents said they were likely to turn to another supplier when the experience across channels was not smooth. In the same research, 51% identified a lack of customer tracking across channels as an impediment to doing business." },
    ]),
    pLinks([
      { text: "Salesforce's 2024 State of Service findings point to the same expectation from another direction. " },
      { text: "Seventy-three percent of business buyers wanted companies to anticipate their needs", href: "https://www.salesforce.com/news/stories/customer-service-statistics-2024/" },
      { text: ", while only 33% of customers believed companies generally anticipated and acted on needs proactively. That gap is not solved by adding another homepage banner. It is solved by connecting customer context to the next appropriate action." },
    ]),
    imageBlock(imgBuyer, "Evidence showing why B2B websites need connected journeys, customer tracking and proactive follow-up", "Buyers move between channels, expect continuity, and notice when a business forgets what they've already told it."),
    p("These statistics should not be treated as universal conversion promises. They come from different studies with different samples. Together, however, they show a consistent operating reality: buyers move between channels, expect continuity, and notice when the business forgets what they have already told it."),
    p("Your website sits at the centre of that journey. It is where anonymous attention can become identifiable intent. It is also where useful context is most often discarded."),

    h2("What does “website as a sales operating system” mean?"),
    p("The phrase does not mean that your website replaces the sales team, CRM or marketing platforms. It means the website coordinates them around the buyer's next decision."),
    p("A well-designed sales operating system performs seven jobs:"),
    numberedBold("Attract the right demand.", "It receives visitors from search, advertisements, social media, referrals, email, partner links and direct visits with source context intact."),
    numberedBold("Recognise likely intent.", "It uses the landing page, search term, campaign, location, device, behaviour and declared need to understand why a visitor may be present."),
    numberedBold("Make the next step obvious.", "It presents useful proof, answers, comparisons and pathways based on the visitor's stage rather than forcing everybody through the same generic homepage."),
    numberedBold("Capture meaningful context.", "Forms, chat and calls collect enough information to enable action without creating unnecessary friction."),
    numberedBold("Qualify and route.", "The system distinguishes a strong opportunity from a vague enquiry, spam message, job application or support request, then sends it to the right owner."),
    numberedBold("Trigger and support follow-up.", "The CRM creates ownership, reminders, service-level expectations, nurture sequences and a visible history."),
    numberedBold("Learn from outcomes.", "Qualified lead, opportunity, sale and lost-reason data return to marketing and content decisions."),
    imageBlock(imgFlow, "The seven-stage website sales operating system from acquisition to measurement and continuous improvement", "The seven-stage website sales operating system."),
    p("The homepage is not the system. The form is not the system. The CRM is not the system. The operating system is the set of agreed handoffs between them."),

    h2("A brochure site and a sales operating system can look equally good"),
    p("This is why the problem is easy to miss. A brochure site is not necessarily ugly or outdated. It can win design awards. A sales operating system may use a restrained visual design. The distinction becomes visible only when you trace what happens before and after a visitor sees the page."),
    comparisonTable("Brochure website", "Website sales operating system", [
      { metric: "Primary purpose", a: "Present the company", b: "Move the right buyer to the right next action" },
      { metric: "Traffic", a: "Count visits and sessions", b: "Preserve source, campaign and intent context" },
      { metric: "Content", a: "Describe services", b: "Answer buyer questions by stage, role and use case" },
      { metric: "Conversion", a: "One generic contact form", b: "Multiple deliberate actions with appropriate friction" },
      { metric: "Lead data", a: "Name, email, phone, message", b: "Identity plus source, need, urgency, fit and consent" },
      { metric: "Routing", a: "Send an email notification", b: "Assign an owner using explicit business rules" },
      { metric: "Follow-up", a: "Depends on individual memory", b: "Uses CRM tasks, response standards and nurture" },
      { metric: "Measurement", a: "Traffic, rankings and form submissions", b: "Qualified leads, opportunities, revenue and loss reasons" },
      { metric: "Improvement", a: "Redesign every few years", b: "Review and optimise continuously" },
      { metric: "AI", a: "Add a chatbot because it is fashionable", b: "Apply intelligence only where a defined workflow benefits" },
    ]),
    p("A brochure asks, “What information should we publish?” A sales operating system asks, “What must happen when a buyer with this need arrives?”"),
    p("That second question changes the project brief. Navigation becomes journey design. Content becomes decision support. Analytics becomes operational instrumentation. Forms become data capture. Integrations become handoffs. Maintenance becomes continuous revenue improvement."),

    h2("The seven layers of a website sales operating system"),

    h3("1. Acquisition must carry context into the site"),
    p("Traffic is not one thing. A visitor searching for “ERP implementation partner for manufacturing” is in a different state from someone who clicked a general awareness post. A returning customer looking for support is different from a first-time buyer. A school admissions lead in Pune may require a different response from an overseas partnership enquiry."),
    p("The acquisition layer should preserve enough context to distinguish them. At minimum, this usually includes:"),
    bullet("landing page and previous page;"),
    bullet("source and medium;"),
    bullet("campaign and content identifiers;"),
    bullet("advertising click IDs where relevant;"),
    bullet("first visit and latest visit timestamps;"),
    bullet("device and broad location signals, handled with appropriate privacy controls; and"),
    bullet("any declared product, service or location interest."),
    p("UTM parameters are useful, but only if they survive the journey. A common failure occurs when the parameters are available on the landing page but disappear before the person submits a form three pages later. Marketing then knows a lead exists but cannot connect it reliably to the campaign that created it."),
    p("Preserving context is not merely an analytics task. It affects sales. A salesperson who can see that an enquiry came from a manufacturing case study, returned twice, and requested an implementation timeline can open the conversation differently from one who receives only “New website lead.”"),

    h3("2. Intent should shape the next pathway"),
    p("The website does not need to read a visitor's mind. It needs to provide clear routes for the intents the business already understands."),
    p("For a B2B services company, those intents may include:"),
    bullet("understand the problem;"),
    bullet("compare approaches;"),
    bullet("assess credibility;"),
    bullet("see evidence from a similar industry;"),
    bullet("estimate scope, time or investment;"),
    bullet("speak to an expert;"),
    bullet("request a proposal;"),
    bullet("find support; or"),
    bullet("explore a career."),
    p("The page should make the likely next step visible without pretending every visitor is ready for a sales call. An early-stage buyer may need a diagnostic article or checklist. A buyer with a live requirement may need a short project form. An existing customer may need a support route that does not enter the sales pipeline."),
    p("This is where site architecture becomes commercial architecture. Service pages, industry pages, case studies, articles and tools should not exist as isolated content types. They should form intentional paths that help a buyer reduce uncertainty."),

    h3("3. Content should help the buyer make a decision"),
    p("Brochure copy says what the company does. Decision-support content explains when the service is appropriate, what alternatives exist, what the process requires, what risks matter and what a good result looks like."),
    p("Useful content answers questions such as:"),
    bullet("Is this solution suitable for a company of our size?"),
    bullet("What will our team need to contribute?"),
    bullet("What is included and excluded?"),
    bullet("How long will implementation take?"),
    bullet("What should we measure before launch?"),
    bullet("Which risks or dependencies could change the plan?"),
    bullet("How is this different from a cheaper or simpler option?"),
    p("These answers improve conversion because they improve fit. They may also discourage an unsuitable enquiry, which is a commercial benefit. A sales operating system is not designed to maximise raw lead volume. It is designed to create more productive movement between buyer need and business capability."),
    pLinks([
      { text: "The content layer is also central to SEO, AEO and GEO. Google's July 2026 guidance on generative AI search emphasises " },
      { text: "unique, non-commodity, expert-led content, clear organisation, crawlability, good page experience and relevant images", href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" },
      { text: ". It explicitly says that foundational SEO remains relevant and that special “AEO/GEO hacks” are not required." },
    ]),
    p("That is good operating-system logic. The same page that helps a human compare choices gives search and answer systems clearer evidence to retrieve, interpret and cite."),

    h3("4. Conversion should match the value and stage of the interaction"),
    p("Many websites use one contact form for everything. It asks the same questions of a serious buyer, a student, a vendor, a job applicant and a person sending spam. The form is easy to build, but the resulting queue is expensive to operate."),
    p("A better conversion architecture offers a small set of deliberate actions:"),
    bulletBold("Low commitment:", "download a relevant resource, subscribe, save a comparison or ask a narrow question."),
    bulletBold("Medium commitment:", "request an assessment, share a requirement, calculate an estimate or book a short consultation."),
    bulletBold("High commitment:", "submit a detailed brief, request a proposal, upload an RFQ or schedule a decision meeting."),
    bulletBold("Non-sales:", "access support, careers, media, vendor or partnership routes without contaminating the sales pipeline."),
    p("The amount of information requested should match the value of the next step. Asking for twelve fields to download a checklist creates unnecessary friction. Asking only for an email address when a company wants a detailed proposal leaves sales without enough context."),
    p("Conversational lead capture can help when the requirement is complex, provided it asks one useful question at a time, validates contact information, handles consent, recognises non-sales intents and offers a human route. A chatbot that answers generic questions but fails to capture source, requirement and ownership is another brochure element. A well-designed assistant is part of the operating workflow."),

    h3("5. Qualification and routing should happen before the inbox"),
    p("A form submission is an event. It is not yet a qualified lead."),
    p("Qualification can use explicit factors such as:"),
    bullet("service or product fit;"),
    bullet("company type, geography or sector;"),
    bullet("urgency and timing;"),
    bullet("budget or commercial threshold where appropriate;"),
    bullet("problem specificity;"),
    bullet("buying role;"),
    bullet("existing relationship; and"),
    bullet("evidence of spam, duplication, support need or career intent."),
    p("Not every factor needs AI. Stable conditions are often better handled with deterministic rules. If every careers enquiry must go to HR, route it there. If a service is available only in selected locations, use a clear location rule. If the enquiry contains an unstructured RFQ, technical document or long narrative, AI may help extract and summarise the relevant evidence for human review."),
    p("The goal is not to hide leads from sales. It is to make priority and ownership visible. A practical routing result might be:"),
    bullet("high-fit, time-sensitive enquiry → assigned immediately to the relevant business owner;"),
    bullet("good fit, early stage → assigned to nurture with a human review task;"),
    bullet("incomplete but potentially relevant → request missing information;"),
    bullet("existing customer → support or account-management route;"),
    bullet("job seeker → careers workflow; and"),
    bullet("spam or obvious solicitation → quarantined, with an audit trail."),
    linkPara("MagicWorks explores the AI-assisted version of this workflow in its guide to ", "AI lead qualification for B2B companies in India", "/blog/ai-lead-qualification-b2b-india-sales-heads-2026", ". The principle remains the same with or without AI: define the decision, inputs, exceptions and owner before automating it."),

    h3("6. CRM and follow-up turn captured demand into accountable work"),
    p("The moment after submission is where many websites stop. The lead appears in an inbox, an acknowledgement is sent, and the website's role is considered complete."),
    p("From the buyer's point of view, the important work has just begun."),
    p("A sales operating system should create a structured record in the CRM or lead-management system, preserve the original context, assign an owner, set a next action, and track whether the response standard was met. The record should not rely on a salesperson copying data from an email."),
    p("At minimum, the receiving system should know:"),
    bullet("who the person is and how consent was captured;"),
    bullet("which company or account may be involved;"),
    bullet("what the person needs;"),
    bullet("where the enquiry originated;"),
    bullet("what content or campaign influenced the action, where available;"),
    bullet("how the lead was classified and why;"),
    bullet("who owns the next step;"),
    bullet("when the next step is due; and"),
    bullet("what eventually happened."),
    p("Follow-up should adapt to the case. An urgent project request needs a human response. An early-stage subscriber may need a useful nurture sequence. A lead that has already shared its location and service interest should not be asked the same questions again. Continuity is the visible result of integration."),
    p("This is also where response-time discussions become more honest. “Respond faster” is too vague. Define the clock, the cases it applies to, the owner and the escalation. For example: qualified web-development enquiries received during business hours should be acknowledged immediately by the system and reviewed by an accountable person within one working day. That is operational language, not a hopeful promise."),

    h3("7. Measurement must return revenue outcomes to the website"),
    p("Most website dashboards stop at sessions, traffic sources and form counts. Those metrics are useful diagnostics, but they do not tell management whether the website is creating business."),
    p("The measurement layer should connect three views:"),
    numberedBold("Acquisition:", "What brought the visitor?"),
    numberedBold("Behaviour and intent:", "What did the visitor engage with or request?"),
    numberedBold("Commercial outcome:", "Did the interaction become a qualified lead, opportunity, sale, retained customer or documented loss?"),
    p("Without the third view, marketing can optimise for the easiest form submission rather than the strongest opportunity. Sales can dismiss marketing leads without returning structured reasons. The website team can redesign pages based on opinions because downstream evidence never comes back."),
    p("A useful measurement stack might include:"),
    comparisonTable("Primary questions", "Example measures", [
      { metric: "Acquisition", a: "Are we attracting relevant demand?", b: "Qualified traffic share, cost by source, landing-page relevance" },
      { metric: "Engagement", a: "Are buyers finding useful answers?", b: "Meaningful page paths, content-assisted enquiries, return visits" },
      { metric: "Conversion", a: "Can the right visitor take the right next step?", b: "Completion rate by action, error rate, call/chat/form mix" },
      { metric: "Qualification", a: "Are captured enquiries commercially useful?", b: "Qualified lead rate, fit distribution, disqualification reasons" },
      { metric: "Follow-up", a: "Does the business act consistently?", b: "Time to first human response, overdue actions, contact rate" },
      { metric: "Pipeline", a: "Do leads progress?", b: "Opportunity rate, stage velocity, proposal rate" },
      { metric: "Revenue", a: "Does the system create economic value?", b: "Win rate, revenue, acquisition cost, payback, customer value" },
      { metric: "Learning", a: "Are we improving the system?", b: "Test outcomes, loss reasons addressed, content gaps closed" },
    ]),
    p("This does not require perfect attribution. It requires enough shared evidence to make better decisions. In long B2B journeys, several interactions may influence a sale. A responsible system preserves first-touch and latest-touch data, records key content interactions where lawful and practical, and avoids pretending that one click deserves all the credit."),

    h2("Performance is not a technical score. It is sales capacity."),
    p("A slow site reduces the number of buyers who reach the next step. It can also distort campaign economics because the business pays for attention that never becomes a usable session."),
    pLinks([
      { text: "Google's older mobile benchmark remains widely quoted: in its 2017 analysis, " },
      { text: "53% of mobile site visits were abandoned when a page took longer than three seconds to load", href: "https://www.thinkwithgoogle.com/_qs/documents/2453/64237_mobile-page-speed-new-industry-benchmarks_D2QxHYw.pdf" },
      { text: ". The figure is dated and based on the mobile environment of that period, so it should not be presented as a current universal threshold. The operating principle, however, is still sound: latency creates commercial friction." },
    ]),
    pLinks([
      { text: "More recent evidence provides a useful real-world example. A June 2026 web.dev case study reported that Nuvemshop improved the share of stores with good Largest Contentful Paint from 57% to 96% and the Core Web Vitals pass rate from 48% to 72%. For the same cohort of Brazilian stores, " },
      { text: "mobile organic conversion increased 8.9% and cart engagement increased 8.4%", href: "https://web.dev/case-studies/nuvemshop" },
      { text: ". These are case-study results, not a guaranteed outcome for every website, but they show why performance belongs in the commercial system rather than a separate technical checklist." },
    ]),
    linkPara("MagicWorks covers the acquisition side of this issue in ", "Why Your Website Speed Is Quietly Killing Your Ad ROI", "/blog/website-speed-killing-ad-roi", ". The broader point is that speed affects every layer: user experience, search visibility, campaign efficiency, form completion and the credibility of the brand."),
    p("Performance work should therefore use both technical and business measures. Track Core Web Vitals and server response, but also monitor landing-page progression, conversion, qualified lead rate and revenue outcomes before and after meaningful changes."),

    h2("A worked example: a Pune manufacturing company"),
    p("Consider an illustrative mid-market industrial automation company based in Pune and selling across India. It receives enquiries from Google Search, trade directories, LinkedIn, referrals, exhibitions and existing customers. The current website has attractive service pages and a single form that asks for name, email, phone and message."),
    p("The marketing report shows 14,000 monthly sessions and 190 form submissions. On paper, the site appears productive. Sales sees a different picture:"),
    bullet("many messages are vendor solicitations or job enquiries;"),
    bullet("requirements lack plant location, application, timeline and technical context;"),
    bullet("high-value RFQs sit beside generic enquiries in one inbox;"),
    bullet("campaign data is missing from forwarded emails;"),
    bullet("salespeople keep separate spreadsheets;"),
    bullet("no one records a consistent reason when an enquiry is rejected; and"),
    bullet("marketing cannot connect closed orders back to the content or source that influenced them."),
    p("The company does not need a more dramatic homepage. It needs a better operating design."),

    h3("Step 1: define buyer paths"),
    p("The site distinguishes four common journeys: a plant team with an active automation requirement, a consultant researching capabilities, an existing customer requesting service, and a job applicant. Navigation and calls to action make those paths explicit."),

    h3("Step 2: improve decision-support content"),
    p("Service pages add relevant applications, supported industries, scope boundaries, implementation stages, required client inputs, proof and frequently asked technical questions. Case studies link to the services and outcomes they demonstrate. An RFQ guide explains what information helps the engineering team respond accurately."),

    h3("Step 3: redesign capture"),
    p("A short general-enquiry form remains available. A separate project-requirement pathway asks for plant location, application, current process, desired outcome, timeline and document upload. Existing customers and careers traffic are routed away from the sales queue."),

    h3("Step 4: qualify and route"),
    p("Rules use service fit, location, urgency and declared requirement to assign an initial route. Uploaded documents are stored securely. If the company later adds AI extraction, it can summarise the application and identify missing fields, but a person remains responsible for technical and commercial judgment."),

    h3("Step 5: create CRM accountability"),
    p("Each sales enquiry creates a CRM record with source, landing page, UTM data, requirement, consent, classification, owner and due date. The buyer receives a useful acknowledgement describing what will happen next. Overdue priority enquiries are escalated."),

    h3("Step 6: close the learning loop"),
    p("Sales records fit, stage, value and loss reason. Marketing reviews which campaigns and pages create qualified opportunities, not just submissions. If visitors frequently ask whether the company serves food-processing plants, the answer becomes clearer on the relevant industry page. If a paid campaign produces many low-fit requests, targeting and landing-page messaging are corrected."),
    p("The visible website may change modestly. The commercial behaviour changes substantially. That is the invisible lever."),

    h2("The 15-question website operating-system audit"),
    p("You can assess the current state without beginning with a redesign. Trace one recent lead from its first known source to its final outcome and ask the following questions."),

    h3("Acquisition and intent"),
    numbered("Can we identify the source, campaign and original landing page for a submitted enquiry?"),
    numbered("Do important buyer intents have clear pathways, or does every visitor enter through generic navigation?"),
    numbered("Can a buyer find information by industry, problem, use case or stage, rather than only by our internal service names?"),

    h3("Content and conversion"),
    numbered("Do core pages answer suitability, process, evidence, timing, dependencies and scope questions?"),
    numbered("Does each important page offer a next step appropriate to the visitor's likely readiness?"),
    numbered("Do forms and chat collect enough context for useful action without asking for unnecessary information?"),
    numbered("Are support, careers, vendor and spam enquiries kept out of the sales queue?"),

    h3("Qualification and handoff"),
    numbered("Is the definition of a qualified lead documented and shared by marketing and sales?"),
    numbered("Does every meaningful enquiry receive an owner and a due next action?"),
    numbered("Can the salesperson see the lead's requirement and source context without searching across email and spreadsheets?"),
    numbered("Are high-value, urgent or sensitive cases routed differently from routine requests?"),

    h3("Measurement and improvement"),
    numbered("Can we connect website actions to qualified leads, opportunities and revenue?"),
    numbered("Are disqualification and loss reasons returned to marketing in a consistent format?"),
    numbered("Do we review performance, content gaps and conversion paths at least monthly?"),
    numbered("Can we name three website changes made in the last quarter because downstream business data justified them?"),

    p("Score one point for each confident yes:"),
    bulletBold("12-15:", "The operating model is strong. Focus on bottlenecks, experimentation and deeper integration."),
    bulletBold("8-11:", "The foundations exist, but important handoffs or feedback loops are leaking value."),
    bulletBold("4-7:", "The site supports sales in places but behaves mainly as disconnected pages and tools."),
    bulletBold("0-3:", "Treat the next website initiative as operating-system design, not a visual refresh."),
    p("The score is a conversation starter, not a benchmark. A regulated or high-value B2B business may need stronger controls than a low-risk self-service service. The important result is identifying the exact handoff where information, ownership or learning disappears."),

    h2("How to move from brochure to operating system in 90 days"),
    p("The transition does not have to begin with a complete rebuild. Start with one commercially important journey and make it observable end to end."),
    imageBlock(imgRoadmap, "A 90-day roadmap to map the revenue journey, redesign one priority path and connect outcomes to continuous improvement", "A 90-day roadmap: map the journey, redesign one path, then connect outcomes."),

    h3("Days 1-30: map the revenue journey and repair measurement"),
    p("Choose one priority service, product or location. Bring marketing, sales, operations and the website owner into the same working session. Map:"),
    bullet("the acquisition sources;"),
    bullet("the buyer's major questions;"),
    bullet("the pages and proof used;"),
    bullet("the conversion actions;"),
    bullet("the fields captured;"),
    bullet("the qualification decision;"),
    bullet("the destination system;"),
    bullet("the owner and response standard;"),
    bullet("the pipeline stages; and"),
    bullet("the final outcomes and loss reasons."),
    p("Then validate the plumbing. Test UTM persistence, form delivery, phone and email links, analytics events, consent records, CRM field mapping, duplicate handling and owner assignment. Use test leads with clearly marked dummy data and remove them after validation."),
    p("The deliverable for this phase is not a mock-up. It is a current-state journey map, measurement baseline and prioritised list of broken handoffs."),

    h3("Days 31-60: redesign the highest-value path"),
    p("Improve one path completely instead of making small changes everywhere. Rewrite the landing and service content around buyer decisions. Add relevant proof and scope boundaries. Simplify or expand the conversion step based on what sales genuinely needs. Separate non-sales paths. Create qualification rules, CRM fields, ownership and response standards."),
    p("At this stage, resist the temptation to automate every task. A manual but explicit handoff is better than an automated process nobody trusts. Document the operating rule first. Automate once the rule survives real cases."),
    p("The deliverable is a working priority journey from source to owned CRM record, with a clear buyer acknowledgement and measurable service level."),

    h3("Days 61-90: connect outcomes and establish the improvement rhythm"),
    p("Add the downstream fields needed to evaluate lead quality, opportunity progression, revenue and loss reasons. Create a dashboard that combines acquisition, website and CRM outcomes at a decision-making level. It need not contain every metric. It should answer:"),
    bullet("Which sources and pages create qualified opportunities?"),
    bullet("Where do good-fit visitors abandon or stall?"),
    bullet("Which enquiries miss the response standard?"),
    bullet("Which objections or missing answers appear repeatedly?"),
    bullet("Which segments create revenue efficiently?"),
    bullet("What will we change next, and how will we evaluate it?"),
    p("Run the first monthly operating review. Give each agreed improvement an owner, hypothesis, success measure and review date. The website becomes a system when this loop continues after launch."),

    h2("What technology does the system require?"),
    p("There is no single mandatory stack. The right choice depends on complexity, scale, internal capability, integration needs, governance and the work the website must perform."),
    linkPara("A straightforward services business may operate effectively with a well-structured WordPress site, reliable forms, analytics, consent management and a CRM integration. A business with complex personalisation, document processing, member workflows, intelligent search or high-performance requirements may benefit from a modern application stack such as Next.js, a headless CMS and server-side services. MagicWorks calls the latter an ", "AI-native website", "/blog/what-is-an-ai-native-website", " when intelligence is built into the site's actual functioning, such as reading, evaluating, matching, organising or processing work. A chatbot alone does not make a site AI-native, and AI is not required for a website to operate as a sales system."),
    p("Choose technology after defining the workflow. Evaluate whether the stack can:"),
    bullet("render fast, accessible pages across devices;"),
    bullet("produce crawlable, indexable content;"),
    bullet("support structured content and clean URLs;"),
    bullet("preserve source and consent data;"),
    bullet("integrate securely with CRM and other systems;"),
    bullet("handle failures and retries without losing enquiries;"),
    bullet("expose meaningful analytics events;"),
    bullet("support role-based access and data retention rules;"),
    bullet("evolve without a complete rebuild for every new capability; and"),
    bullet("be maintained by the organisation or its accountable partner."),
    p("The architecture should fit the operating responsibility. A technically impressive stack with unclear ownership becomes another disconnected asset."),

    h2("Where AI belongs, and where it does not"),
    p("AI can strengthen selected layers of the system:"),
    bullet("conversationally understand a visitor's requirement;"),
    bullet("search a complex knowledge base using natural language;"),
    bullet("extract structured fields from an uploaded brief or RFQ;"),
    bullet("recommend lead priority with reasons and confidence;"),
    bullet("personalise content within defined rules;"),
    bullet("draft a response for human review;"),
    bullet("identify repeated content gaps in conversations; or"),
    bullet("summarise interaction history for a salesperson."),
    p("It should not be used merely to make the site appear modern. Before adding AI, define the recurring decision or processing task, the evidence available, the acceptable error, the human authority, the privacy boundary and the business metric. If a fixed rule or clearer form solves the problem, use it."),
    p("AI also increases the importance of the underlying system. An assistant cannot give a reliable service answer if the knowledge base is outdated. It cannot route a lead correctly if the service taxonomy is inconsistent. It cannot personalise responsibly if consent and identity are unclear. Intelligence amplifies the quality of the operating design it receives."),

    h2("SEO, AEO and GEO are system functions, not publishing labels"),
    p("Search visibility is often treated as a traffic project that ends when a visitor lands. A sales operating system connects discoverability to satisfaction and outcome."),
    p("For conventional search, this includes crawlable pages, clean information architecture, descriptive titles, internal links, fast delivery, useful content and clear entity information. For answer and generative search experiences, it also means publishing specific, attributable expertise that can be retrieved and supported by evidence."),
    p("The practical requirements overlap:"),
    bullet("define the question each page answers;"),
    bullet("provide a direct answer before deeper explanation where appropriate;"),
    bullet("use descriptive headings that reflect real buyer questions;"),
    bullet("support important claims with first-party or authoritative sources;"),
    bullet("distinguish research findings from interpretation and illustrative examples;"),
    bullet("connect the author to a credible profile and relevant experience;"),
    bullet("use original diagrams and images with descriptive filenames and alt text;"),
    bullet("link related pages so entities, services and evidence form a coherent topic cluster;"),
    bullet("keep essential content in crawlable HTML; and"),
    bullet("measure whether organic and AI-discovery visits create meaningful engagement and qualified demand."),
    p("This article follows that model. It offers a clear definition, an original seven-layer framework, an audit, a 90-day implementation path, cited evidence, visible FAQs and author attribution. Those elements are useful to people first. Their machine readability is a consequence of clarity, not a substitute for it."),
    pLinks([
      { text: "For publication, use " },
      { text: "BlogPosting", bold: true },
      { text: " or " },
      { text: "Article", bold: true },
      { text: " structured data with accurate author, dates, headline, image and publisher information. Keep the structured data consistent with what is visible on the page. Do not add " },
      { text: "FAQPage", bold: true },
      { text: " markup expecting a Google FAQ rich result: Google " },
    ]),
    linkPara("", "stopped showing that feature in May 2026 and removed its documentation in June 2026", "https://developers.google.com/search/updates", ". The FAQs still belong on the page because they answer real questions and provide useful passage-level content."),

    h2("The operating principle"),
    p("The visible pages get the attention. The less-visible system decides whether that attention becomes revenue."),
    p("When commissioning a new website or reviewing an existing one, do not begin with colour, animation or the number of pages. Begin by tracing the journey:"),
    bq("Where did the visitor come from? What are they trying to decide? What should they see next? What information must be captured? Who owns the response? What happens after the handoff? Which outcome returns to improve the system?"),
    p("If the project can answer those questions, design and technology have a commercial job to perform. If it cannot, a beautiful launch may still leave the business operating through inboxes, spreadsheets and memory."),
    bq("The rule: Treat every page, form, integration and metric as part of one buyer-to-revenue workflow. If a component cannot name the decision or handoff it improves, it is probably decoration."),

    callout(
      "Ready to Make Your Website Work Like a Revenue System?",
      "MagicWorks combines web development and digital marketing to connect acquisition, content, conversion, CRM and measurement around one accountable business journey. Our web-development practice builds fast, conversion-focused and AI-native websites where the use case justifies them. Our digital-marketing practice brings the traffic, content, SEO/AEO, campaign measurement and optimisation discipline needed to keep the system improving.",
      "key-takeaway"
    ),
    linkPara("Explore ", "Web Development", "/services/web-development", ", "),
    linkPara("", "Digital Marketing", "/services/digital-marketing", ", or"),
    linkPara("", "book a discovery call", "/contact", ". In thirty minutes, we will help identify whether your highest-value opportunity is a rebuild, a targeted conversion repair, better CRM integration, improved measurement or a simpler operating change."),
  ];
}

const FAQ = [
  { question: "What is a website sales operating system?", answer: "A website sales operating system is a connected setup in which traffic acquisition, buyer intent, content, forms or chat, qualification, CRM, follow-up and analytics work as one revenue process. The web pages are the interface; the system includes the data flows, ownership rules, integrations and feedback loops behind them." },
  { question: "How is a sales operating system different from a lead-generation website?", answer: "A lead-generation website focuses mainly on producing enquiries. A sales operating system continues beyond submission. It preserves source context, qualifies and routes the enquiry, creates CRM accountability, supports follow-up, records pipeline outcomes and uses that evidence to improve acquisition and content." },
  { question: "Does every business need an AI-native website?", answer: "No. AI-native architecture is valuable when the website must perform meaningful processing or judgment, such as document extraction, intelligent search, matching, personalisation or lead triage. A straightforward business may achieve excellent results with a fast conventional site, clear content, reliable integrations and disciplined follow-up." },
  { question: "Should a website connect directly to the CRM?", answer: "For most businesses that depend on enquiries, yes. A direct, tested integration reduces manual entry, preserves source and requirement data, assigns ownership and makes response times measurable. The integration should include validation, duplicate handling, failure alerts, consent records and a safe fallback so no lead disappears silently." },
  { question: "Which metrics show whether a B2B website is generating revenue?", answer: "Track qualified lead rate, opportunity rate, time to first human response, pipeline value, win rate, revenue and acquisition cost by source or journey. Use traffic, rankings, engagement and form completion as diagnostic measures, not as the final definition of success." },
  { question: "How can an Indian B2B company improve website lead quality?", answer: "Clarify the industries, locations, problems and project types the company serves; build pages around buyer decisions; ask for the minimum context sales needs; separate careers and support traffic; preserve campaign data; and agree on qualification rules with sales. Add AI only when unstructured requirements or volume make it useful." },
  { question: "Is WordPress suitable for a website sales operating system?", answer: "It can be. WordPress can support a strong operating system when the workflow is straightforward and integrations, security, performance and maintenance are managed carefully. More complex portals, intelligent features, personalisation or high-scale workflows may justify a modern application framework and headless architecture." },
  { question: "How long does it take to turn a brochure website into a sales system?", answer: "A business can often repair one priority journey within 60 to 90 days if decisions are timely and the existing stack can support the required integrations. A full rebuild may take longer. Begin with journey mapping, baseline measurement and one end-to-end path rather than waiting to redesign the entire website." },
  { question: "How do SEO, AEO and GEO fit into the system?", answer: "They help the right audience discover useful content through search and generative experiences. The operating-system approach then connects that discovery to the next buyer action and commercial outcome. Strong foundations overlap: expert-led content, clear structure, crawlability, performance, attribution, internal linking and honest measurement." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "Your Website Is Not a Brochure. It Is a Sales Operating System.";
const SLUG = "website-sales-operating-system";
const EXCERPT = "Learn how a website sales operating system connects traffic, intent, content, lead capture, CRM, follow-up and measurement to generate revenue.";
const SEO_TITLE = "Your Website Is a Sales Operating System | MagicWorks";
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

  const heroId = await uploadImage("website-sales-operating-system-hero-1280x512.png");
  const buyerId = await uploadImage("connected-b2b-buyer-statistics.png");
  const flowId = await uploadImage("website-sales-operating-system-flow.png");
  const roadmapId = await uploadImage("website-operating-system-90-day-roadmap.png");

  const doc = {
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["web-development"],
    pillar: "web-development",
    publishedAt: new Date().toISOString(),
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "A website interface connected to acquisition channels, lead qualification, CRM, follow-up and measurement systems",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "website as a sales system",
      "B2B website strategy",
      "lead generation website India",
      "conversion-focused website",
      "website CRM integration",
      "AI-native website",
      "web development company Pune",
      "full-funnel website strategy",
    ],
    body: buildBody(heroId, buyerId, flowId, roadmapId),
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
