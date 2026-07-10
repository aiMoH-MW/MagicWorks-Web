/**
 * seed-blogs-03-10-11.mjs
 * Creates Blog 03, Blog 10, and Blog 11 in Sanity CMS and uploads their cover images.
 *
 * Run from the project root:
 *   node seed-blogs-03-10-11.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -- Parse .env.local manually ------------------------------------------------
const envRaw = fs.readFileSync(path.join(__dirname, ".env.local"), "utf8");
const env = Object.fromEntries(
  envRaw.split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const client = createClient({
  projectId:  env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-06-03",
  token:      env.SANITY_API_WRITE_TOKEN,
  useCdn:     false,
});

// -- Portable Text helpers ----------------------------------------------------
let _prefix = "b03";
let _k = 0;

function resetKey(prefix) {
  _prefix = prefix;
  _k = 0;
}

const k      = () => `${_prefix}k${String(++_k).padStart(3, "0")}`;
const span   = (text, marks = []) => ({ _type: "span", _key: k(), text, marks });
const strong = (text) => span(text, ["strong"]);
const linked = (text, markKey) => span(text, [markKey]);
const plain  = (text) => span(text);

function block(style, children, markDefs = [], listItem = null) {
  const b = { _type: "block", _key: k(), style, markDefs, children };
  if (listItem !== null) { b.listItem = listItem; b.level = 1; }
  return b;
}

const h2 = (text) => block("h2", [plain(text)]);
const h3 = (text) => block("h3", [plain(text)]);
const p  = (text) => block("normal", [plain(text)]);

const callout = (title, body, variant = "key-takeaway") =>
  ({ _type: "callout", _key: k(), title, body, variant });

// =============================================================================
// BLOG 03
// How to Measure Your Brand's AI Citations: A Step-by-Step Guide
// =============================================================================

resetKey("b03");

const body03 = [

  callout(
    "Key Takeaway",
    "You can measure AI citations today, but only partially and only honestly. Bing Webmaster Tools gives you direct citation data for Copilot. GA4 shows referral traffic from ChatGPT, Perplexity, and Gemini. Structured monthly spot checks cover the rest. Any total cross-platform figure is an extrapolation, and this guide shows you how to build one responsibly, methodology included."
  ),

  p("Every agency now claims to deliver \"AI visibility.\" Almost none of them can show you how they measure it."),

  p("That gap is not the agencies' fault alone. Most AI platforms simply do not report citation data, so the industry filled the vacuum with vague scores and unverifiable claims. This guide is the opposite: a complete measurement workflow you can run yourself this week, with an honest line drawn between what you can verify and what you can only estimate."),

  p("We use this exact workflow to report client results, including the AI citation figures published in our own case studies. If a vendor ever shows you an AI visibility number, this article tells you what to ask them."),

  h2("Why measurement is the missing half of AI search"),

  p("Optimisation without measurement is faith. In classic SEO you had rankings, impressions, and clicks to tell you whether the work was paying off. In AI search, most of the equivalent data does not exist publicly, which creates two failure modes."),

  p("The first is abandonment: teams optimise, see nothing in three weeks, and quit before the compounding starts. The second is gullibility: teams accept any impressive-sounding number a vendor presents, because there is no obvious way to check it."),

  p("Both failure modes have the same cure. Learn what is directly measurable, measure it consistently, and treat everything else as a labelled estimate."),

  h2("Step 1: Verify your site in Bing Webmaster Tools"),

  block("normal", [
    linked("Bing Webmaster Tools", "b03bwtLink"),
    plain(" is currently the single most valuable measurement platform for AI citations, for one structural reason: Bing's index powers Microsoft Copilot and feeds ChatGPT's web browsing. Microsoft is also the only major player that surfaces citation-level data to site owners."),
  ], [{ _key: "b03bwtLink", _type: "link", href: "https://www.bing.com/webmasters" }]),

  p("If your site is not verified there yet, do it today. Verification takes minutes: sign in, add your site, and confirm ownership via DNS record, an XML file, or by importing your existing Google Search Console property, which is the fastest route."),

  p("Once verified and once data accumulates, examine your search performance reporting with particular attention to how your pages surface in Copilot answers. As of mid-2026, Microsoft reports impressions and citation activity that let you see which pages are being pulled into AI answers, which queries trigger them, and how that volume trends month over month. Interface labels change often, so explore the performance section rather than hunting for one fixed report name."),

  p("Three things to log monthly from this platform: total Copilot-related citations or impressions, your top ten cited pages, and the query themes triggering them. These three numbers become the verified core of everything else in this workflow."),

  h2("Step 2: Segment AI referral traffic in GA4"),

  block("normal", [
    plain("AI assistants increasingly link their sources, and when users click those links, the visit lands in your analytics with an identifiable referrer. Google's "),
    linked("Analytics documentation", "b03gaLink"),
    plain(" covers the mechanics of building comparisons and exploration reports; here is what to build."),
  ], [{ _key: "b03gaLink", _type: "link", href: "https://support.google.com/analytics" }]),

  p("Create a segment or exploration filtering session source to include the AI platforms: chatgpt.com, perplexity.ai, copilot.microsoft.com, and gemini.google.com, plus any regional assistants relevant to your market. Save it as a reusable comparison so every standard report can be viewed through the AI-referral lens."),

  p("Then track three metrics monthly: AI referral sessions, the landing pages receiving them, and their conversion behaviour compared to organic search traffic. In our client work, AI referral visitors frequently behave like pre-qualified traffic, because they arrive after an assistant has already answered their basic questions. Verify that pattern in your own data rather than taking ours on faith, and treat it as a hypothesis until your numbers confirm it."),

  p("One honest caveat: referral traffic undercounts real influence. Many users read the AI answer, absorb your brand, and never click. Traffic is the visible edge of a larger effect, which is exactly why Step 1 and Step 3 exist."),

  h2("Step 3: Run structured monthly spot checks"),

  p("This is the manual layer, and it is more rigorous than it sounds if you systematise it."),

  p("Build a prompt bank of fifteen to twenty-five questions your real buyers ask, drawn from sales calls, search query data, and your FAQ pages. Include the full journey: early questions (\"what is an AI process audit\"), comparison questions (\"best digital marketing agencies for education in Pune\"), and decision questions (\"questions to ask before hiring a performance marketing agency\")."),

  p("On a fixed day each month, run every prompt through the same four platforms: Google AI Overviews or AI Mode, Copilot, ChatGPT, and Perplexity. Log four things per prompt: whether you were cited, whether you were named without a link, which competitors appeared, and which of your pages was used. A simple spreadsheet is enough; consistency matters more than tooling."),

  p("Two disciplines keep this honest. Use a clean browser profile or incognito session so personalisation does not flatter you, and never change the prompt bank mid-year without versioning it, or your trend line becomes meaningless."),

  p("After three months you will have something most of your competitors do not: a defensible citation share trend across the platforms that matter, built from primary observation."),

  h2("Step 4: Extrapolate responsibly, and show your working"),

  p("Here is the step where most published AI visibility numbers quietly go wrong, so let us do it in the open."),

  p("You have verified citation data from exactly one ecosystem: Bing and Copilot. Total citations across all platforms cannot be observed directly. They can only be estimated, and the least-bad method is market-share extrapolation: if platform-usage data suggests Copilot represents a given share of AI assistant activity in your markets, your verified Copilot citations can be scaled to estimate the whole."),

  block("normal", [
    plain("The mechanics are simple. Take your verified Copilot citation count, take a credible estimate of Copilot's share of AI assistant usage from a source such as "),
    linked("StatCounter Global Stats", "b03scLink"),
    plain(" or an equivalent published dataset, and divide. If your verified count represents a small single-digit share of the market, your estimated total is proportionally larger."),
  ], [{ _key: "b03scLink", _type: "link", href: "https://gs.statcounter.com" }]),

  p("The discipline is in the disclosure. An extrapolated figure is only honest when it is published with three things attached: the verified base number, the market-share source and date, and the explicit label \"estimated.\" This is exactly how we present the figures in our own case studies: the verified Bing and Copilot count stands on its own, and the extrapolated total is shown with its methodology. Any number presented without that chain is marketing, not measurement."),

  p("When you evaluate an agency's AI visibility claims, ask one question: \"What is the verified number underneath this, and where does the multiplier come from?\" The quality of the answer tells you everything."),

  h2("Step 5: Build a simple monthly report"),

  p("Pull the layers into one page, reported monthly, trended quarterly."),

  p("The verified section carries your Bing Webmaster Tools citation data and your GA4 AI referral metrics. The observed section carries your spot-check citation share by platform and the competitor names appearing alongside yours. The estimated section, clearly labelled, carries any extrapolated totals with their methodology stated inline."),

  p("Then read trends, not absolutes. A month-over-month rise in verified citations, a widening citation share in your spot checks, and growing AI referral conversions are the signals that your Answer Engine Optimisation work is compounding. A single big number, in either direction, means very little in a measurement environment this young."),

  h2("The mistakes that corrupt AI citation data"),

  p("Four patterns we see repeatedly in audits, so you can avoid them."),

  block("normal", [
    strong("Checking too soon and too emotionally. "),
    plain("Citation share moves on a timescale of months. A weekly check produces noise and anxiety, not insight."),
  ]),

  block("normal", [
    strong("Letting personalisation flatter you. "),
    plain("If you research your own industry daily on your own accounts, assistants will over-serve you your own brand. Clean sessions only."),
  ]),

  block("normal", [
    strong("Changing the prompt bank silently. "),
    plain("Every prompt change resets the trend line. Version it like code."),
  ]),

  block("normal", [
    strong("Reporting the extrapolation as the fact. "),
    plain("The verified number is the fact. The extrapolation is the context. Reversing those two is how the industry earned its credibility problem."),
  ]),

  h2("What good looks like after six months"),

  p("Run this workflow consistently and by month six you will know your verified Copilot citation trend, which pages earn citations and for which query themes, your citation share against named competitors on the platforms your buyers actually use, and whether AI-referred visitors convert. That knowledge feeds directly back into what you publish next, which is the real point. Measurement is not the scoreboard at the end of the game. It is the map for the next quarter of content."),

  p("Rankings win clicks. Citations win trust. Measurement is how you prove you are earning both."),

  block("normal", [
    strong("About the author: "),
    plain("Swapnil Ughade is the Founder of MagicWorks IT Solutions Pvt. Ltd., an AI-first digital marketing agency based in Pune, India. He brings 17+ years of experience across digital marketing, web development, and AI strategy, and leads the agency's Search & Answer Engine Optimisation practice."),
  ]),
];

const faq03 = [
  {
    _key: k(),
    question: "Can you directly measure AI citations?",
    answer: "Only partially. Bing Webmaster Tools reports citation-level data for Microsoft Copilot, which makes it the single verified source available to site owners today. ChatGPT, Perplexity, and Google AI Overviews do not provide equivalent citation reporting, so those platforms are tracked through referral analytics and structured manual spot checks.",
  },
  {
    _key: k(),
    question: "How do I see Copilot citations in Bing Webmaster Tools?",
    answer: "Verify your site ownership first, then review the search performance reporting once data accumulates, paying attention to how your pages surface in Copilot answers. Microsoft's interface labels change periodically, so explore the performance section rather than searching for a fixed report name.",
  },
  {
    _key: k(),
    question: "How do I track ChatGPT and Perplexity traffic in GA4?",
    answer: "Create a comparison or exploration segment filtering session source for chatgpt.com, perplexity.ai, copilot.microsoft.com, and gemini.google.com. Track sessions, landing pages, and conversion behaviour monthly, and remember that referral traffic undercounts influence because many users read AI answers without clicking.",
  },
  {
    _key: k(),
    question: "Are total AI citation numbers accurate?",
    answer: "Total cross-platform figures are always extrapolations, because most platforms do not report citation data. A responsible extrapolation states its verified base number, its market-share source, and an explicit \"estimated\" label. A figure presented without that methodology should be treated as marketing rather than measurement.",
  },
  {
    _key: k(),
    question: "How often should I measure AI citation share?",
    answer: "Log verified data and run spot checks monthly, but judge progress quarterly. Citation share compounds on a timescale of months, and weekly checking produces noise rather than insight.",
  },
];

// =============================================================================
// BLOG 10
// Full-Funnel Marketing Explained: Why Fragmented Agencies Cost You More
// =============================================================================

resetKey("b10");

const body10 = [

  callout(
    "Key Takeaway",
    "Full-funnel marketing means one accountable team owns the entire journey from first impression to closed revenue, with shared data and one strategy. Fragmented marketing, one vendor for ads, another for SEO, a third for the website, a fourth for content, looks like buying best-in-class specialists and quietly charges four hidden taxes: attribution blindness, handoff loss, incentive conflict, and coordination overhead paid in your team's hours. Specialists are not the problem. Unowned seams between them are."
  ),

  p("There is a moment in many marketing reviews when the room goes quiet. The ads agency has presented good numbers. The SEO vendor has presented good numbers. The web developer insists the site is fine. And revenue has not moved."),

  p("Everyone in the room is telling the truth as their dashboard defines it. The problem lives in the spaces between the dashboards, and nobody in the room is paid to look there."),

  h2("What full-funnel actually means"),

  p("Strip the jargon and the funnel is just the journey: a stranger becomes aware of you, considers you, contacts you, and becomes revenue. Full-funnel marketing means a single accountable team owns that entire journey, with three properties that sound obvious and are rare in practice."),

  block("normal", [
    plain("One strategy, so awareness activity is designed to feed the consideration activity, which is designed to feed conversion, rather than three channels each maximising their own metric. One data spine, so the same definitions and tracking follow a lead from first click to closed revenue, using shared measurement of the kind "),
    linked("Google's Analytics documentation", "b10gaLink"),
    plain(" describes, rather than four vendors with four attribution stories. And one throat to choke, in the affectionate management sense: when revenue stalls, one partner is accountable for finding the leak, wherever in the journey it sits."),
  ], [{ _key: "b10gaLink", _type: "link", href: "https://support.google.com/analytics" }]),

  p("Fragmentation is the default alternative, and it usually happens by accident rather than decision: an ads freelancer hired in 2021, an SEO vendor added in 2023, a developer retained from the original site build, a content person somewhere. Each hire was individually sensible. The system nobody designed is what you now run."),

  h2("Tax 1: Attribution blindness"),

  p("The first hidden cost of fragmentation is that nobody can see the whole journey, so nobody can tell you the truth about it."),

  p("Your ads vendor reports on clicks and platform-attributed conversions. Your SEO vendor reports rankings and organic traffic. Each measures from their channel's first touch to their channel's last, and the real buyer, who saw an ad, later searched your brand, read two blog posts, and converted a month later, is claimed in full by everyone and understood by no one. Budget decisions then get made on channel-flattering numbers rather than journey truth, which is how spend drifts toward whatever is easiest to attribute rather than whatever actually creates customers."),

  p("A full-funnel setup does not make attribution perfect, nothing does, but it puts one team behind one measurement framework with no incentive to flatter any single channel."),

  h2("Tax 2: The handoff loss"),

  p("Every seam between vendors is a place where performance leaks, and the leaks compound because no vendor's scope covers the seam."),

  p("The classic example is the one we wrote about in our website speed article: an ads agency buying excellent traffic that a slow landing page discards. The ads agency's scope ends at the click. The developer's scope is uptime, not conversion. The leak between them can quietly consume a meaningful share of the ad budget for years, because it is in nobody's job description to notice."),

  p("The same seam pattern repeats everywhere. SEO content written without knowing which queries the paid team already wins, so both teams pay for the same intent twice. Landing pages built without the follow-up process in mind, feeding half-qualified enquiries into an unprepared sales motion, the exact failure chain we mapped in our education funnel article. Creative learnings from paid social that never reach the organic content calendar. Each individual leak looks small. A funnel is a multiplication of stages, and small percentage losses multiplied across five stages produce the flat revenue line that started this article."),

  h2("Tax 3: Incentive conflict at your expense"),

  p("Fragmented vendors are not villains, but their incentives are shaped by their scope, and scoped incentives produce predictable distortions."),

  p("A vendor paid on a single channel will always sincerely believe your next rupee belongs in that channel. When the honest answer to \"why are conversions down\" sits in another vendor's territory, raising it means starting an inter-vendor conflict on your time, so the diagnosis quietly narrows to whatever is fixable in-scope. And when results stall, fragmented setups produce the blame carousel: ads points at the landing page, the developer points at traffic quality, SEO points at the algorithm, and each claim is unfalsifiable because no one holds the full data."),

  p("None of this requires bad faith. It only requires everyone doing exactly the job they were scoped and paid to do. The distortion is structural, which is why hiring better specialists does not fix it."),

  h2("Tax 4: You became the integration layer"),

  p("The least visible cost is the one your own calendar pays. In a fragmented setup, the only place the full picture exists is inside your head, which means you are performing an unpaid second job: briefing each vendor on what the others are doing, reconciling contradictory reports, mediating the blame carousel, and carrying context between meetings."),

  p("For a founder or marketing head, this coordination overhead routinely consumes hours every week, and it is the most expensive labour in the company doing work an integrated team would do as a matter of course. Worse, integration quality is capped by your availability: the month you are busy with a launch or a funding round is the month the seams go unwatched."),

  h2("The honest counterargument, and where it holds"),

  p("Fairness requires saying this plainly: fragmentation is sometimes right, and full-funnel is not a universal answer."),

  p("A genuinely rare specialist need, say a complex marketplace SEO problem or a niche creative discipline, can justify a dedicated expert no generalist team matches. Very large organisations with strong in-house marketing operations can act as their own integration layer and manage best-in-class specialists well, because the full picture lives inside a capable internal team rather than one overloaded founder. And a single-channel business genuinely dependent on one motion may not have enough funnel to integrate."),

  p("The question that decides it is not \"specialist or generalist.\" It is: who owns the seams? If you have a strong internal owner of the whole journey, specialists can work. If the honest answer is \"me, in the evenings,\" fragmentation is charging you all four taxes right now."),

  h2("What to look for in a full-funnel partner"),

  p("Consolidation only pays if the integrated partner is actually integrated, so interrogate that directly."),

  p("Ask to see how their strategy document connects stages: does the ads plan reference the content plan, does the website work carry conversion accountability, is there one measurement framework from click to revenue? Ask who, by name, is accountable when revenue stalls, and what their diagnosis process looks like across channels. Ask for an example where they moved budget away from one of their own services because the data said so, which is the integrated equivalent of the question we recommend asking commission-model agencies. And be suspicious of \"full-service\" shops that are really one strong discipline with resold everything else; integration is an operating model, not a service list."),

  p("A funnel is one system. The vendors can be many or one, but the accountability cannot be fragmented, because revenue does not happen in channels. It happens in the seams, and someone has to own them."),

  block("normal", [
    strong("About the author: "),
    plain("Swapnil Ughade is the Founder of MagicWorks IT Solutions Pvt. Ltd., an AI-first digital marketing agency based in Pune, India. He brings 17+ years of experience across digital marketing, web development, and AI strategy. MagicWorks delivers performance marketing, search and answer engine visibility, and website development as one accountable system."),
  ]),
];

const faq10 = [
  {
    _key: k(),
    question: "What is full-funnel marketing?",
    answer: "Full-funnel marketing means one accountable team owns the entire customer journey, from first awareness through consideration to conversion and revenue, with a single strategy and a single measurement framework, rather than separate vendors each optimising their own channel in isolation.",
  },
  {
    _key: k(),
    question: "Why do multiple marketing agencies cost more than one?",
    answer: "Fragmentation charges four hidden taxes: attribution blindness, because no vendor sees the whole journey; handoff loss at every seam between scopes, such as good ads sent to slow landing pages; structural incentive conflicts, where each vendor sincerely recommends more of their own channel; and coordination overhead, because the client becomes the unpaid integration layer.",
  },
  {
    _key: k(),
    question: "Is it ever better to use specialist agencies?",
    answer: "Yes: for genuinely rare specialist problems, or when a strong internal marketing team can act as the integration layer and own the seams between vendors. The deciding question is not specialist versus generalist but who owns the whole journey. If nobody does, fragmentation is costing you now.",
  },
  {
    _key: k(),
    question: "How do I evaluate whether an agency is genuinely full-funnel?",
    answer: "Ask how their strategy connects stages, who is personally accountable when revenue stalls, and for an example where they moved budget away from one of their own services because the data justified it. Integration is an operating model with one measurement spine, not a long service list.",
  },
  {
    _key: k(),
    question: "What is the biggest sign my marketing is too fragmented?",
    answer: "Every vendor's report looks good while revenue stays flat, and diagnosing why requires you to personally reconcile contradictory dashboards. Healthy setups produce one journey-level answer; fragmented ones produce a blame carousel.",
  },
];

// =============================================================================
// BLOG 11
// What Is an AI-Native Website, and Why Your Next Build Should Be One
// =============================================================================

resetKey("b11");

const body11 = [

  callout(
    "Key Takeaway",
    "An AI-Native website is one where artificial intelligence is built into how the site works, processing, deciding, and acting on the business's behalf, rather than bolted on as a chat widget or used merely to generate the pages. A careers site that reads and scores every incoming application is AI-Native. A brochure site with AI-written text is not. The difference is architectural, it has to be designed in from the start, and it is quietly redrawing what a website is for."
  ),

  p("The term \"AI website\" now means at least three completely different things, and vendors are happily selling all three under one label. Before you commission your next build, you deserve the precise definition, because two of the three are not worth premium money."),

  h2("Three things \"AI website\" gets used to mean"),

  block("normal", [
    strong("The AI-generated website. "),
    plain("Tools that produce a site from a prompt: pages, text, images, done in an afternoon. Impressive as a demo, and legitimate for a hobby project or a landing page test. But the AI's involvement ends at generation. What you get is a static brochure that happened to be written by a machine, often visibly templated, and carrying no intelligence whatsoever once live."),
  ]),

  block("normal", [
    strong("The AI-decorated website. "),
    plain("A conventional site with an AI feature attached to the surface, almost always a chat widget. The site itself is unchanged underneath; the intelligence sits in a bolt-on that could be removed tomorrow without the site noticing. Conversational assistants have real value in the right role, but a widget does not make a website intelligent any more than a radio makes a car self-driving."),
  ]),

  block("normal", [
    strong("The AI-Native website. "),
    plain("Intelligence built into the site's actual functioning: the site reads, evaluates, organises, personalises, or processes as part of how it does its job. Remove the AI and the site does not lose a feature. It loses its central capability."),
  ]),

  p("The first is generation. The second is decoration. Only the third is architecture, and architecture is what you should mean when you pay for AI-Native."),

  h2("What AI-Native looks like in practice"),

  p("Definitions stick better as examples, so here are the kinds of builds that earn the label."),

  block("normal", [
    strong("A careers site that does the first screening itself. "),
    plain("Applications arrive, and the site reads each resume, evaluates it against the role's actual requirements, scores it, and organises the pipeline so the HR team opens a ranked shortlist instead of a folder of two hundred PDFs. The website is not displaying job listings. It is performing the first round of recruitment."),
  ]),

  block("normal", [
    strong("A community content platform that processes its own media. "),
    plain("Long recordings are uploaded, and the platform identifies the meaningful segments, clips them, titles them, and organises them for members, work that previously consumed an editor's week, now happening as a property of the platform itself."),
  ]),

  block("normal", [
    strong("A knowledge-heavy site whose search actually understands questions. "),
    plain("Instead of keyword matching, visitors ask in their own words and the site answers from its own content, the way they have learned to ask everything else. For a business with deep documentation, courses, or a large catalogue, this single capability changes what the website is worth."),
  ]),

  block("normal", [
    strong("A portal that reads the documents it receives. "),
    plain("Enquiry forms, uploaded requirements, RFQ documents: the site extracts what matters, structures it, routes it to the right person, and drafts the first response for human review. The common thread in every example: the site has a job beyond displaying pages, and the AI is how that job gets done."),
  ]),

  h2("Why this requires different architecture, not a plugin"),

  p("Here is the part vendors gloss over. AI-Native capability cannot be retrofitted onto a template site with a plugin, for reasons that are structural rather than commercial."),

  block("normal", [
    plain("Intelligent features are backend capabilities: they need server-side logic that calls language models, processes data, stores results, and enforces rules about cost, privacy, and quality. A traditional theme-and-plugins site has no natural home for that layer. The builds that carry it well are engineered on a modern stack: a framework like "),
    linked("Next.js", "b11nextjsLink"),
    plain(" providing the application layer, a headless CMS managing content separately from presentation, and LLM-backed services doing the intelligent work behind well-designed seams."),
  ], [{ _key: "b11nextjsLink", _type: "link", href: "https://nextjs.org" }]),

  block("normal", [
    plain("This stack brings two side benefits that justify themselves even before the AI does. Performance: sites built this way are fast by construction, which, as we covered in our ad ROI article, is itself a revenue property. And structural clarity: clean, semantic, well-organised output of the kind "),
    linked("Google's documentation", "b11googleLink"),
    plain(" rewards, which also happens to be exactly what AI answer engines extract from best. An AI-Native build is, almost incidentally, an Answer Engine Optimisation asset."),
  ], [{ _key: "b11googleLink", _type: "link", href: "https://developers.google.com/search/docs" }]),

  p("One honest boundary from our own architecture: conversational AI for sales, the assistant that qualifies leads in chat, is a distinct discipline with its own product category, and we treat it as adjacent to web development rather than part of it. This article, and the AI-Native definition, is about intelligence inside the site's own functioning. The two complement each other; they should not be confused for each other."),

  h2("Who actually needs one, and who does not"),

  p("Premium architecture deserves an honest qualification test, so here it is in both directions."),

  block("normal", [
    strong("You likely need AI-Native if "),
    plain("your website sits in the middle of a repetitive judgment process: screening, sorting, matching, evaluating, or answering, at a volume where humans currently do it slowly or not at all. Recruitment flows, education platforms matching students to programmes, content communities, B2B portals digesting enquiries and documents, knowledge businesses whose value is locked in content nobody can search well. In each case the AI does not decorate the site. It removes an operational bottleneck, and the build pays back in saved hours and faster responses, which is exactly how it should be evaluated."),
  ]),

  block("normal", [
    strong("You likely do not need AI-Native if "),
    plain("your website's whole job is presence and credibility: a services brochure, a portfolio, a simple local business site. Intelligence with nothing to process is expense with nothing to return, and the honest recommendation for that situation is a fast, well-structured conventional build. We say this as a company that sells AI-Native development: the qualification question protects both sides, and any vendor who thinks every business needs this is selling architecture as fashion."),
  ]),

  p("The deciding question is one sentence: what judgment or processing work would the website take off your team's hands? A specific answer means you have an AI-Native project. A vague one means you have a brochure requirement, and there is no shame in that."),

  h2("Why \"your next build,\" not \"someday\""),

  p("The reason to take this seriously now rather than in some future redesign cycle comes down to how websites age."),

  p("A website is typically a five-to-seven year asset. A site commissioned today on yesterday's architecture will spend its entire life unable to take on the intelligent capabilities its owner will, at some point in those years, certainly want, because the foundation has no place to put them. The AI-Native decision is not really about which features launch on day one. It is about whether the asset you are paying for can grow intelligence over its lifetime or is sealed at birth."),

  p("That is why the question belongs at the start of your next build conversation, whoever you have it with: not \"can we add AI,\" but \"what work should this website be doing for us, and is the architecture being proposed capable of doing it?\""),

  block("normal", [
    strong("About the author: "),
    plain("Swapnil Ughade is the Founder of MagicWorks IT Solutions Pvt. Ltd., an AI-first digital marketing agency based in Pune, India. He brings 17+ years of experience across digital marketing, web development, and AI strategy. MagicWorks builds AI-Native websites on Next.js, headless CMS, and LLM-backed backends."),
  ]),
];

const faq11 = [
  {
    _key: k(),
    question: "What is an AI-Native website?",
    answer: "An AI-Native website has artificial intelligence built into how the site functions: it reads, evaluates, organises, personalises, or processes work as part of doing its job, such as a careers site that scores incoming applications. This is architecturally different from a site generated by AI tools or a conventional site with a chat widget attached.",
  },
  {
    _key: k(),
    question: "Is a website with a chatbot AI-Native?",
    answer: "No. A chat widget is a surface feature that could be removed without the site noticing; AI-Native means the intelligence is part of the site's core functioning. Conversational AI for sales is a legitimate, separate discipline, and it complements rather than defines an AI-Native build.",
  },
  {
    _key: k(),
    question: "What technology stack do AI-Native websites use?",
    answer: "Typically a modern application framework such as Next.js, a headless CMS separating content from presentation, and LLM-backed backend services performing the intelligent work. This architecture also produces fast, well-structured sites, which benefits both paid campaign performance and visibility in AI answer engines.",
  },
  {
    _key: k(),
    question: "Which businesses benefit most from AI-Native websites?",
    answer: "Businesses whose website sits inside a repetitive judgment process at volume: recruitment and application screening, education platforms matching students to programmes, content communities processing media, B2B portals digesting enquiries and documents, and knowledge businesses with large searchable content. The build pays back in removed operational bottlenecks.",
  },
  {
    _key: k(),
    question: "Who should not pay for an AI-Native website?",
    answer: "Businesses whose site's entire job is presence and credibility, such as a simple services brochure or portfolio. Intelligence with nothing to process returns nothing, and the honest recommendation there is a fast, well-structured conventional build.",
  },
];

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  // ---------------------------------------------------------------------------
  // Blog 03
  // ---------------------------------------------------------------------------
  console.log("\n=== Blog 03: How to Measure Your Brand's AI Citations ===");

  const imagePath03 = path.join(
    __dirname,
    "..",
    "Docs",
    "Blogs",
    "New blogs",
    "Blog 2 to 11 hero images",
    "blog-03-how-to-measure-ai-citations.png"
  );

  console.log("Uploading cover image for blog 03...");
  const asset03 = await client.assets.upload(
    "image",
    fs.readFileSync(imagePath03),
    {
      filename:    "blog-03-how-to-measure-ai-citations.png",
      contentType: "image/png",
    }
  );
  console.log("Image uploaded:", asset03._id);

  const doc03 = {
    _id:   "insight-blog-03",
    _type: "insight",

    title:       "How to Measure Your Brand's AI Citations: A Step-by-Step Guide Using Bing Webmaster Tools and Beyond",
    seoTitle:    "How to Measure Your Brand's AI Citations: Step-by-Step Guide",
    slug:        { _type: "slug", current: "how-to-measure-ai-citations" },
    excerpt:     "A practical, honest workflow for measuring AI citations using Bing Webmaster Tools, GA4 referral data, and structured spot checks, plus how to extrapolate responsibly.",
    publishedAt: "2026-01-08T09:00:00.000Z",

    author:     { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories: ["digital-marketing", "seo-aeo"],
    pillar:     "digital-marketing",
    tags:       ["how to measure AI citations", "AI citations", "Bing Webmaster Tools", "AI referral traffic GA4", "AI search measurement"],

    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset03._id },
      alt:   "How to measure AI citations using Bing Webmaster Tools and GA4",
    },

    body:    body03,
    faq:     faq03,
    isGated: false,
  };

  console.log("Creating Sanity document for blog 03...");
  const result03 = await client.createOrReplace(doc03);
  console.log("Done! Document ID:", result03._id);
  console.log("URL: https://magicworksitsolutions.com/blog/how-to-measure-ai-citations");

  // ---------------------------------------------------------------------------
  // Blog 10
  // ---------------------------------------------------------------------------
  console.log("\n=== Blog 10: Full-Funnel Marketing vs Fragmented Agencies ===");

  const imagePath10 = path.join(
    __dirname,
    "..",
    "Docs",
    "Blogs",
    "New blogs",
    "Blog 2 to 11 hero images",
    "blog-10-full-funnel-vs-fragmented-agencies.png"
  );

  console.log("Uploading cover image for blog 10...");
  const asset10 = await client.assets.upload(
    "image",
    fs.readFileSync(imagePath10),
    {
      filename:    "blog-10-full-funnel-vs-fragmented-agencies.png",
      contentType: "image/png",
    }
  );
  console.log("Image uploaded:", asset10._id);

  const doc10 = {
    _id:   "insight-blog-10",
    _type: "insight",

    title:       "Full-Funnel Marketing Explained: Why Fragmented Agencies Cost You More in the Long Run",
    seoTitle:    "Full-Funnel Marketing: Why Fragmented Agencies Cost More",
    slug:        { _type: "slug", current: "full-funnel-marketing-vs-fragmented-agencies" },
    excerpt:     "Splitting your marketing across specialist vendors looks efficient and quietly costs more. The hidden taxes of fragmentation and when a full-funnel partner wins.",
    publishedAt: "2026-02-23T09:00:00.000Z",

    author:     { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories: ["digital-marketing"],
    pillar:     "digital-marketing",
    tags:       ["full funnel marketing", "integrated marketing agency", "fragmented agencies", "marketing strategy", "marketing measurement"],

    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset10._id },
      alt:   "Full-funnel marketing versus fragmented agencies: the hidden costs of fragmentation",
    },

    body:    body10,
    faq:     faq10,
    isGated: false,
  };

  console.log("Creating Sanity document for blog 10...");
  const result10 = await client.createOrReplace(doc10);
  console.log("Done! Document ID:", result10._id);
  console.log("URL: https://magicworksitsolutions.com/blog/full-funnel-marketing-vs-fragmented-agencies");

  // ---------------------------------------------------------------------------
  // Blog 11
  // ---------------------------------------------------------------------------
  console.log("\n=== Blog 11: What Is an AI-Native Website ===");

  const imagePath11 = path.join(
    __dirname,
    "..",
    "Docs",
    "Blogs",
    "New blogs",
    "Blog 2 to 11 hero images",
    "blog-11-what-is-an-ai-native-website.png"
  );

  console.log("Uploading cover image for blog 11...");
  const asset11 = await client.assets.upload(
    "image",
    fs.readFileSync(imagePath11),
    {
      filename:    "blog-11-what-is-an-ai-native-website.png",
      contentType: "image/png",
    }
  );
  console.log("Image uploaded:", asset11._id);

  const doc11 = {
    _id:   "insight-blog-11",
    _type: "insight",

    title:       "What Is an AI-Native Website, and Why Your Next Build Should Be One",
    seoTitle:    "What Is an AI-Native Website? Why Your Next Build Should Be One",
    slug:        { _type: "slug", current: "what-is-an-ai-native-website" },
    excerpt:     "An AI-Native website has intelligence built into how it works, not a chatbot bolted on and not AI-generated pages. The definition, real examples, and who needs one.",
    publishedAt: "2026-02-28T09:00:00.000Z",

    author:     { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories: ["ai-native-website"],
    pillar:     "ai-native-website",
    tags:       ["AI-native website", "AI website development", "Next.js", "LLM-backed website", "web architecture"],

    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset11._id },
      alt:   "What is an AI-Native website: intelligence built into how the site works",
    },

    body:    body11,
    faq:     faq11,
    isGated: false,
  };

  console.log("Creating Sanity document for blog 11...");
  const result11 = await client.createOrReplace(doc11);
  console.log("Done! Document ID:", result11._id);
  console.log("URL: https://magicworksitsolutions.com/blog/what-is-an-ai-native-website");

  console.log("\nAll three blogs seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
