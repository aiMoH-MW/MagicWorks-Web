/**
 * create-mohan-draft-ai-native-customer-before-after.mjs
 *
 * Creates "What Changes for Your Customers When Your Website Becomes
 * AI-Native? A Before/After Walkthrough" (author: Mohan Chute, existing
 * author record) in Sanity as a DRAFT ONLY (not visible on the live site
 * until promoted / published).
 *
 * Source: Docs/Blogs/Mohan/As-per-Purva/05_ai_native_customer_before_after/
 *   - what-changes-for-your-customers-when-your-website-becomes-ai-native.md (article content)
 *   - README-PUBLISHING.md (SEO / AEO / GEO notes)
 *   - assets/hero-ai-native-before-after-1280x512.png              (cover image)
 *   - assets/framework-before-after-customer-journey.png            (inline)
 *   - assets/framework-ai-native-customer-stack.png                 (inline)
 *
 * This script ONLY creates a draft. It does not publish, and it does not
 * delete any existing draft. The post has a future publishedAt value
 * (2026-11-09) that is left untouched -- it will be used when the draft is
 * later promoted / published via a separate script.
 *
 * Editorial note (from README-PUBLISHING.md): do not present AI-native as
 * automatically superior to WordPress. The article intentionally includes
 * a fit test, and that nuance is preserved in the body below (see the
 * "Is an AI-native website automatically better than WordPress?" section).
 *
 * Run: node scripts/create-mohan-draft-ai-native-customer-before-after.mjs
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

const ASSET_DIR = path.join(__dirname, "..", "..", "Docs", "Blogs", "Mohan", "As-per-Purva", "05_ai_native_customer_before_after", "assets");

// ── Portable Text helpers (same pattern as create-mohan-draft-marketplace-cold-start.mjs) ─
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
// BLOG: What Changes for Your Customers When Your Website Becomes AI-Native?
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgJourney, imgStack) {
  resetKey("ain");
  return [
    p("Most conversations about AI-native websites begin in the wrong place."),
    p("They begin with the technology stack."),
    p("Next.js. Large language models. Vector search. Headless CMS. APIs. Agents. Personalization engines."),
    p("All of those matter to the team building the website. None of them is the first thing your customer cares about."),
    p("Your customer cares about something much simpler:"),
    block("normal", [strong("Can I get what I came here for with less effort, less uncertainty, and less waiting?")]),
    p("That is the practical test of an AI-native website."),
    pLinks([
      { text: "At MagicWorks, we define an " },
      { text: "AI-native website", href: "/services/web-development/ai-native-websites" },
      { text: " as a site where intelligence is built into how the website works, not added later as a decorative chatbot. Our current web development architecture uses a Next.js front end, an LLM-backed backend, and a headless CMS, with features such as intelligent search, content personalization, recommendations, conversational lead capture, and AI-assisted workflows included where they earn their place." },
    ]),
    p("This article deliberately avoids starting with architecture. Instead, it follows the customer journey before and after an AI-native redesign."),
    linkPara("For the underlying concept and definition, see our related explainer, ", "What Is an AI-Native Website, and Why Your Next Build Should Be One", "/blog/what-is-an-ai-native-website", "."),
    p("The central question is not, “Where can we put AI on the website?”"),
    p("It is:"),
    bq("Which moments in the customer journey are currently slow, confusing, repetitive, generic, or dependent on a human, and can the website take useful work out of those moments?"),

    h2("The short answer: what actually changes for the visitor?"),
    p("A conventional website mostly waits for the visitor to understand its structure."),
    p("An AI-native website can increasingly understand the visitor's intent and respond to it."),
    p("That change can show up in seven visible ways:"),
    numbered("Visitors can ask instead of hunt."),
    numbered("Search can understand meaning instead of only matching keywords."),
    numbered("The site can present more relevant content based on context."),
    numbered("Forms can become guided conversations instead of dead-end data collection."),
    numbered("Recommendations can become useful rather than generic."),
    numbered("Complex choices can be explained interactively."),
    numbered("The website can learn from customer questions and improve the journey over time."),
    block("normal", [plain("The important word is "), strong("can"), plain(".")]),
    p("AI-native does not mean every page should talk, every visitor should be profiled, or every action should be automated. A good implementation uses intelligence selectively, keeps human control where judgment matters, and measures whether the experience is actually better."),

    h2("Why this matters now: digital friction is still expensive"),
    p("Companies have spent years improving visual design, mobile responsiveness, SEO, and page speed. Yet users still encounter substantial friction online."),
    pLinks([
      { text: "Contentsquare's " },
      { text: "2026 Digital Experience Benchmark analysis", href: "https://contentsquare.com/guides/digital-experience-benchmark/frustration/" },
      { text: " examined more than 99 billion sessions across 6,500 websites and reported that 35.2% of sessions were still affected by friction. It also found that API errors rose 16% year over year, even as slow-load frustration improved." },
    ]),
    p("That is a useful reminder for anyone planning an AI website redesign."),
    p("The goal is not to add more complexity to an already fragile experience."),
    p("The goal is to remove friction."),
    p("A customer should not need to understand your internal departments, product taxonomy, service naming, website navigation, or lead-routing logic just to get an answer."),
    p("A more intelligent website can absorb some of that complexity on the customer's behalf."),

    h2("Before and after: the customer journey at a glance"),
    imageBlock(imgJourney, "Before/after framework: Seven customer moments comparing a conventional website with an AI-native experience"),
    comparisonTable("Conventional website", "AI-native website", [
      { metric: "Arriving", a: "Same page for everyone", b: "Context can shape the first experience" },
      { metric: "Finding information", a: "Menus, filters, keyword search", b: "Natural-language and semantic discovery" },
      { metric: "Understanding an offer", a: "Read multiple pages and infer fit", b: "Guided explanation based on the customer's question" },
      { metric: "Comparing options", a: "Static comparison table", b: "Interactive decision support with clear guardrails" },
      { metric: "Asking a question", a: "Form, phone call, generic chatbot", b: "Grounded assistant using approved business content" },
      { metric: "Becoming a lead", a: "Long form and manual qualification", b: "Conversational capture and structured qualification" },
      { metric: "Returning later", a: "Mostly starts again", b: "Prior context can inform the next step where consent and policy allow" },
    ]),
    p("The table makes the change look simple. The real difference becomes clearer when we walk through each moment."),

    h2("Before: the visitor has to learn your website. After: the website can learn the visitor's intent"),
    p("A traditional website places the burden of interpretation on the visitor."),
    p("The visitor arrives with a goal such as:"),
    bullet("“I need an AI audit for a 200-person manufacturing company.”"),
    bullet("“I need to know whether this agency can migrate us from WordPress.”"),
    bullet("“I am comparing three MBA programs for working professionals.”"),
    bullet("“I need a service provider in Pune who can work with our existing ERP.”"),
    p("The site may organize information very differently:"),
    bullet("Services"),
    bullet("Solutions"),
    bullet("Industries"),
    bullet("Resources"),
    bullet("About"),
    bullet("Contact"),
    p("Those labels make sense to the business. They are not always how the buyer thinks."),

    h3("Before"),
    p("The visitor translates their problem into your navigation."),
    p("They guess which page might contain the answer. They open two or three tabs. They scan. They return to Google. They leave a form only if enough confidence has been created."),

    h3("After"),
    p("An AI-native layer can interpret the visitor's natural-language intent and route them to the most relevant answer, content, comparison, tool, service page, or next action."),
    p("For example, a visitor could ask:"),
    block("normal", [strong("“We are a mid-size manufacturing company and most RFQs still come by email. Where would AI actually help first?”")]),
    p("The website should not answer with generic AI enthusiasm."),
    p("A well-designed assistant might instead:"),
    bullet("recognize the manufacturing context;"),
    bullet("retrieve the site's relevant AI process-audit and manufacturing content;"),
    bullet("ask one clarifying question about RFQ volume or current workflow;"),
    bullet("explain two or three realistic starting points;"),
    bullet("link to the appropriate service or article;"),
    bullet("offer a conversation with a human if the situation is complex."),
    p("That is not a better chatbot."),
    p("It is a different information architecture from the customer's point of view."),

    h2("Before: search matches words. After: search can understand meaning"),
    p("Site search has historically been one of the weakest experiences on many business websites."),
    p("A visitor types “ERP integration with AI” and gets no results because the website uses the phrase “AI-enabled workflow integration.”"),
    p("Or they search for “fees” while the content uses “pricing.”"),
    p("Or they ask a complete question and the search box treats it as a bag of keywords."),

    h3("What semantic search changes"),
    p("An AI-native search experience can use meaning, context, structured content, and retrieval to find relevant material even when the wording differs."),
    p("The customer gets closer to an answer and farther from a list of blue links inside your own website."),
    p("But this only works well when the content layer is clean."),
    p("If your CMS contains outdated pages, duplicated services, contradictory prices, missing metadata, and poorly structured documents, AI search can retrieve the wrong thing faster."),
    p("This is why the content architecture matters as much as the model."),

    h3("A practical before-and-after example"),
    bp("Before:", "Visitor query: “Can you build a portal where dealers see different prices?”"),
    pLinks([
      { text: "Results: zero matches, because the website has a page called " },
      { text: "Role-Based Member Portals", href: "/services/web-development/portals-member-sites" },
      { text: "." },
    ]),
    bp("After:", "The system understands that dealer-specific prices relate to authenticated roles and permissions."),
    p("It surfaces the portals page, summarizes the relevant capability, and asks whether pricing rules come from an ERP, CRM, or the portal database."),
    p("The visitor has moved from searching to solving."),

    h2("Before: every visitor sees the same message. After: the experience can become context-aware"),
    p("Most websites personalize only in trivial ways."),
    p("A returning user may see a recently viewed item. An e-commerce site may recommend similar products. A B2B website often does nothing at all."),
    p("AI-native personalization can be more useful, but it must be handled carefully."),
    p("A visitor from a manufacturing campaign may benefit from manufacturing case studies and process examples. A visitor who arrived from an article about GEO may benefit from AI visibility resources. A returning prospect who previously explored an AI process audit may need a comparison checklist rather than another introductory explanation."),

    h3("The right principle"),
    block("normal", [strong("Personalize the help, not the truth.")]),
    p("The website should not invent a different company for each visitor. Core claims, prices, legal terms, capabilities, and evidence should remain consistent."),
    p("What can change is:"),
    bullet("which content is prioritized;"),
    bullet("which examples are shown first;"),
    bullet("which question is asked next;"),
    bullet("which CTA is most relevant;"),
    bullet("which resources are recommended;"),
    bullet("how much explanation is needed."),
    p("This is closer to a good salesperson adapting the conversation than to a website secretly manipulating the visitor."),

    h3("Privacy and trust are part of the feature"),
    p("Context-aware experiences need a clear consent and data-governance model."),
    p("Do not assume that because an AI system can infer something, the website should act on it."),
    p("For many businesses, useful personalization can be achieved with low-risk signals such as:"),
    bullet("current page;"),
    bullet("campaign source;"),
    bullet("selected industry;"),
    bullet("explicit answers in a conversation;"),
    bullet("language preference;"),
    bullet("previously viewed content where consent permits."),
    p("Sensitive data should not be collected simply because a conversational interface makes collection easier."),

    h2("Before: the form collects. After: the conversation can qualify"),
    p("The standard B2B lead form has barely changed in twenty years:"),
    p("Name. Email. Phone. Company. Message."),
    p("The form tells the sales team almost nothing about urgency, budget, current system, decision stage, internal constraints, or whether the visitor is a good fit."),
    p("So the team follows up manually and asks the questions the website could have asked."),

    h3("The AI-native alternative"),
    p("Conversational lead capture can ask one relevant question at a time."),
    p("A web-development prospect might be guided through:"),
    numbered("What are you trying to build or replace?"),
    numbered("Is the current site on WordPress, a custom stack, or something else?"),
    numbered("Which capabilities matter most: content publishing, lead generation, portal access, commerce, AI search, personalization, or something else?"),
    numbered("What is the target launch window?"),
    numbered("Does the project need integration with a CRM, ERP, payment system, or internal database?"),
    p("The result is not merely a lead."),
    p("It is a structured brief."),
    p("The customer also benefits because they do not need to write a perfect project description from scratch."),

    h3("Do not turn qualification into interrogation"),
    p("A bad implementation simply converts a ten-field form into ten chat questions."),
    p("That is slower."),
    p("The assistant should know when to stop."),
    p("If four answers are enough to route the lead, collect four. Ask for contact information at the moment when the customer understands why continuing the conversation is useful."),

    h2("Before: content explains. After: content can participate in the decision"),
    p("A static page is passive."),
    p("It says, “Here are our services.”"),
    p("An intelligent page can help a customer answer, “Which of these services is relevant to me?”"),
    p("That distinction is important."),
    p("Consider a business comparing WordPress with an AI-native stack."),
    p("A conventional page lists pros and cons."),
    p("An AI-native experience can ask:"),
    bullet("How many editors do you have?"),
    bullet("Do you need authenticated users?"),
    bullet("Is the site mainly a brochure or part of an operational workflow?"),
    bullet("How often do you publish?"),
    bullet("Do you need personalization or AI search?"),
    bullet("Does your team need to self-host the CMS?"),
    p("It can then explain the trade-offs using approved rules and source content."),
    p("The visitor is still making the decision. The website is helping them structure it."),

    h3("This is where grounded AI matters"),
    p("The assistant should retrieve from a controlled knowledge base, product catalog, CMS, or verified data source."),
    p("It should not improvise commercial promises."),
    p("For business-critical decisions, include clear rules such as:"),
    bullet("never invent a price;"),
    bullet("never promise a delivery date that is not in the source system;"),
    bullet("never claim a feature that is not documented;"),
    bullet("distinguish opinion from policy;"),
    bullet("escalate ambiguous or high-value questions to a human."),
    p("AI-native should mean more useful, not more unpredictable."),

    h2("Before: recommendations are generic. After: they can be situational"),
    p("Most website recommendations are basic:"),
    bullet("related posts;"),
    bullet("popular products;"),
    bullet("people also viewed;"),
    bullet("latest resources."),
    p("Useful, but not necessarily relevant to the visitor's current decision."),
    p("A smarter recommendation layer can consider the task."),
    p("For example, a user reading about an AI process audit might receive:"),
    bullet("a readiness checklist if they are still evaluating;"),
    bullet("a manufacturing use-case article if they selected manufacturing;"),
    bullet("a vendor due-diligence checklist if they are comparing providers;"),
    bullet("a case study if they are close to buying;"),
    bullet("a discovery call if their question cannot be answered responsibly online."),
    p("This turns content from a library into a guided path."),

    h2("Before: support begins after the form. After: useful assistance can start immediately"),
    p("Many business websites are open 24/7 while the business is not."),
    p("That gap matters most when a visitor has a simple but decisive question:"),
    bullet("Do you serve our city?"),
    bullet("Can you integrate with our current system?"),
    bullet("Do you work with companies of our size?"),
    bullet("Is this service consulting only or implementation too?"),
    bullet("What information do we need before a discovery call?"),
    p("If the answer exists somewhere on the site, making the user wait until the next working day is unnecessary friction."),
    p("An AI-native assistant can provide immediate, grounded answers and then create a clean handoff."),

    h3("The handoff is part of the customer experience"),
    p("The human should receive context such as:"),
    bullet("what the visitor asked;"),
    bullet("what pages or resources were discussed;"),
    bullet("which answers were given;"),
    bullet("what the visitor said about their requirement;"),
    bullet("where the AI was uncertain;"),
    bullet("preferred contact method."),
    p("The customer should not have to repeat the entire conversation."),
    p("That simple continuity is one of the clearest signs that AI is built into the workflow rather than sitting on top of the website."),

    h2("Before: analytics tells you what people clicked. After: intent becomes measurable"),
    p("Traditional web analytics is strong at behavior:"),
    bullet("page views;"),
    bullet("sessions;"),
    bullet("traffic sources;"),
    bullet("events;"),
    bullet("conversions;"),
    bullet("funnels."),
    block("normal", [plain("AI-native interaction adds a new class of signals: "), strong("what people are trying to accomplish.")]),
    p("A month of anonymized and appropriately governed assistant queries might reveal that customers repeatedly ask:"),
    bullet("whether your service works with a specific platform;"),
    bullet("what your minimum engagement is;"),
    bullet("how quickly implementation begins;"),
    bullet("whether you support a particular industry;"),
    bullet("how your approach differs from a competitor;"),
    bullet("what happens after launch."),
    p("Those questions are not merely support data."),
    p("They are inputs to content strategy, product strategy, sales enablement, SEO, AEO, GEO, FAQ design, service packaging, and roadmap decisions."),

    h3("A new feedback loop appears"),
    p("The process can become:"),
    block("normal", [strong("Question -> Answer -> Outcome -> Content gap -> Improvement -> Better future answer")]),
    pLinks([
      { text: "That is what " },
      { text: "MagicWorks", href: "/services/web-development/ai-native-websites" },
      { text: " means when we say an intelligent website can compound over time." },
    ]),
    p("The website does not “learn” by silently rewriting itself. It learns operationally because the team gains better evidence about customer intent and can improve approved content, rules, workflows, and prompts."),

    h2("The AI-native customer experience stack"),
    imageBlock(imgStack, "AI-native stack: Six layers from fast delivery and structured content through retrieval, conversation, integrations, governance and measurement"),
    p("A practical architecture can be understood as six layers from the customer's point of view."),

    h3("1. Fast, accessible front end"),
    p("AI does not excuse a slow website."),
    pLinks([
      { text: "Google's current " },
      { text: "Core Web Vitals", href: "https://web.dev/articles/vitals" },
      { text: " targets remain a useful baseline: Largest Contentful Paint of 2.5 seconds or less, Interaction to Next Paint of 200 milliseconds or less, and Cumulative Layout Shift of 0.1 or less, measured at the 75th percentile." },
    ]),
    p("The more APIs and intelligent features you add, the more carefully performance needs to be managed."),

    h3("2. Structured content layer"),
    p("The CMS should store content in reusable, structured units rather than trapping everything inside visual page-builder blobs."),
    p("That makes content easier to publish, reuse, retrieve, localize, personalize, and expose to multiple channels."),

    h3("3. Retrieval and search layer"),
    p("This layer helps the system find the most relevant approved information for a user's question."),
    p("It may include semantic search, keyword search, metadata filters, retrieval-augmented generation, or a combination."),

    h3("4. Decision and conversation layer"),
    p("This is where the experience decides what to do next:"),
    bullet("answer;"),
    bullet("ask a clarifying question;"),
    bullet("recommend content;"),
    bullet("calculate;"),
    bullet("qualify;"),
    bullet("route;"),
    bullet("escalate."),

    h3("5. Business-system integration layer"),
    p("Useful intelligence often requires live business context from systems such as:"),
    bullet("CRM;"),
    bullet("inventory;"),
    bullet("booking system;"),
    bullet("ERP;"),
    bullet("product database;"),
    bullet("support platform;"),
    bullet("marketing automation;"),
    bullet("analytics."),
    p("This is the layer that separates a clever demo from an operational website."),

    h3("6. Governance and measurement layer"),
    p("Every AI feature should have defined owners, sources, permissions, failure handling, monitoring, cost controls, and success metrics."),
    p("Without this layer, the website may be intelligent but not manageable."),

    h2("What does not change when a website becomes AI-native?"),
    p("This question is as important as what changes."),

    h3("Your positioning still needs to be clear"),
    p("AI cannot rescue a company that cannot explain what it does."),

    h3("Your content still needs expertise"),
    pLinks([
      { text: "Google's " },
      { text: "2026 guidance for generative AI search", href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" },
      { text: " explicitly emphasizes unique, valuable, non-commodity content and says foundational SEO best practices continue to matter." },
    ]),
    p("AI can help users access your expertise. It should not manufacture expertise that the business does not have."),

    h3("Your UX still needs discipline"),
    p("Every intelligent interaction should have a visible purpose."),
    p("Do not interrupt visitors with a chat bubble, quiz, recommendation rail, pop-up, and personalization banner at the same time."),

    h3("Your sales team still matters"),
    p("For high-consideration services, the website should make human conversations better, not eliminate them."),

    h3("Your legal and privacy obligations still apply"),
    p("An AI feature is not a separate universe. The same standards for consent, data handling, security, claims, accessibility, and customer communication still apply."),

    h2("How to decide which AI-native features deserve to launch first"),
    p("Do not begin with a feature list."),
    p("Begin with a friction list."),
    p("Ask five questions for each candidate feature."),
    bulletBold("Does this solve a repeated customer problem?", "Prevents novelty-driven development."),
    bulletBold("Do we have reliable data or content to power it?", "Reduces hallucination and stale answers."),
    bulletBold("Can we define a safe failure path?", "Protects the customer when AI is uncertain."),
    bulletBold("Can we measure a business or experience outcome?", "Makes ROI testable."),
    bulletBold("Is AI materially better than a simpler rule or UI?", "Prevents overengineering."),

    h3("Example prioritization"),
    p("For a B2B services website:"),
    bp("High priority:", "intelligent search, grounded Q&A, conversational lead qualification, content recommendations."),
    bp("Medium priority:", "personalization by explicit industry or use case, proposal pre-qualification, interactive calculators."),
    bp("Low priority at launch:", "autonomous negotiation, unsupervised commercial commitments, complex agent workflows with weak data controls."),
    p("The order will vary by business."),
    p("The principle should not."),

    h2("A realistic before-and-after measurement plan"),
    p("A website redesign should never be judged by whether the AI demo looks impressive."),
    p("Measure customer behavior before launch and compare it after launch."),

    h3("Baseline metrics"),
    p("Capture at least four weeks of pre-launch data for:"),
    bullet("conversion rate by key journey;"),
    bullet("search usage and search exits;"),
    bullet("form-start and form-completion rate;"),
    bullet("average time to first qualified response;"),
    bullet("bounce or abandonment on key pages;"),
    bullet("lead-to-opportunity quality;"),
    bullet("support questions generated by the website;"),
    bullet("Core Web Vitals;"),
    bullet("content discovery depth;"),
    bullet("top internal-search terms with no useful result."),

    h3("AI-native metrics"),
    p("Add:"),
    bullet("assistant engagement rate;"),
    bullet("answer success rate;"),
    bullet("unanswered or escalated question rate;"),
    bullet("percentage of conversations leading to a useful next action;"),
    bullet("qualified lead rate from conversational journeys;"),
    bullet("recommendation click-through rate;"),
    bullet("content-gap themes discovered from questions;"),
    bullet("cost per successful AI interaction;"),
    bullet("human handoff rate and handoff quality;"),
    bullet("answer accuracy from periodic review samples."),

    h3("The most important measurement rule"),
    block("normal", [strong("Do not optimize for chat volume.")]),
    p("A customer who finds the answer instantly without opening the assistant may be having the better experience."),
    p("The target is lower friction and stronger outcomes, not more AI usage."),

    h2("What a sensible AI-native redesign process looks like"),
    pLinks([
      { text: "MagicWorks' current " },
      { text: "AI-native service", href: "/services/web-development/ai-native-websites" },
      { text: " describes a discovery, design/build, and launch/AMC process, with AI features scoped per project rather than forced into every build." },
    ]),
    p("For a business evaluating the idea, I would break the work into four practical phases."),

    h3("Phase 1: Journey audit"),
    p("Map the top customer journeys and identify where visitors currently:"),
    bullet("search repeatedly;"),
    bullet("abandon;"),
    bullet("ask sales basic questions;"),
    bullet("use the wrong form;"),
    bullet("misunderstand an offer;"),
    bullet("fail to find content;"),
    bullet("wait unnecessarily for a human."),

    h3("Phase 2: Data and content readiness"),
    p("Identify the sources the website would need to answer or act reliably:"),
    bullet("service pages;"),
    bullet("product catalog;"),
    bullet("policy documents;"),
    bullet("CRM fields;"),
    bullet("pricing rules;"),
    bullet("FAQs;"),
    bullet("case studies;"),
    bullet("knowledge base;"),
    bullet("inventory;"),
    bullet("calendars;"),
    bullet("account data."),
    p("Classify what is public, private, sensitive, stale, or contradictory."),

    h3("Phase 3: Prototype one high-value journey"),
    p("Do not build six AI features at once."),
    p("Prototype one complete customer journey from question to outcome."),
    p("For example:"),
    block("normal", [strong("Visitor asks -> assistant clarifies -> approved answer retrieved -> relevant service recommended -> lead qualified -> CRM record created -> human receives context.")]),
    p("Test that journey with real scenarios, including wrong questions, incomplete information, and edge cases."),

    h3("Phase 4: Launch with monitoring"),
    p("Once live, monitor:"),
    bullet("performance;"),
    bullet("accuracy;"),
    bullet("latency;"),
    bullet("AI cost;"),
    bullet("conversion;"),
    bullet("failed answers;"),
    bullet("content gaps;"),
    bullet("customer feedback."),
    p("An AI-native website needs maintenance in the same way that a paid-media account or CRM workflow does. The system is not finished at launch."),

    h2("Is an AI-native website automatically better than WordPress?"),
    p("No."),
    pLinks([
      { text: "A simple brochure website with a few pages, infrequent updates, no complex workflows, and no need for intelligent features may be perfectly well served by " },
      { text: "WordPress", href: "/services/web-development/wordpress" },
      { text: "." },
    ]),
    pLinks([
      { text: "MagicWorks explicitly continues to offer " },
      { text: "WordPress", href: "/services/web-development/wordpress" },
      { text: " when it is genuinely the right fit, while using AI-native architecture as the default for more ambitious new builds." },
    ]),
    p("The decision should depend on the work the site needs to do."),

    h3("Choose the simpler architecture when"),
    bullet("the website is mainly informational;"),
    bullet("content changes are infrequent;"),
    bullet("the budget is limited;"),
    bullet("there is no meaningful personalization or workflow requirement;"),
    bullet("the business is unlikely to use the added flexibility."),

    h3("Consider AI-native architecture when"),
    bullet("the website is a major lead-generation channel;"),
    bullet("users struggle to navigate a large content set;"),
    bullet("different audiences need different guidance;"),
    bullet("the site must integrate with operational systems;"),
    bullet("conversational qualification would save sales time;"),
    bullet("search and recommendations materially affect conversion;"),
    bulletLink("the roadmap includes ", "portals", "/services/web-development/portals-member-sites", ", intelligent workflows, or multiple channels;"),
    bullet("the site is expected to evolve for several years."),
    p("The expensive mistake is not choosing WordPress."),
    p("The expensive mistake is buying architecture that cannot support the roadmap you already know is coming."),

    h2("How does AI-native design affect SEO, AEO, and GEO?"),
    p("It can help, but not because Google rewards the label “AI-native.”"),
    p("A modern architecture can make it easier to produce:"),
    bullet("fast pages;"),
    bullet("structured content;"),
    bullet("clean internal linking;"),
    bullet("reusable author and organization data;"),
    bullet("server-rendered or statically rendered content;"),
    bullet("descriptive metadata;"),
    bullet("machine-readable structured data;"),
    bullet("rich answer-oriented content;"),
    bullet("content that can be updated consistently across channels."),
    pLinks([
      { text: "Google's " },
      { text: "2026 generative AI optimization guidance", href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" },
      { text: " says traditional SEO foundations remain relevant to AI Overviews and AI Mode, and it specifically recommends clear technical structure plus unique, helpful content." },
    ]),
    p("In other words, the architecture creates capability. The content and implementation still determine whether that capability is used well."),

    h2("The customer experience test: seven questions for your next website brief"),
    p("Before approving an AI-native website, ask the project team these seven questions."),
    block("normal", [strong("What becomes easier for the customer on day one?")], [], "number"),
    block("normal", [strong("Which questions can the site answer reliably that it cannot answer today?")], [], "number"),
    block("normal", [strong("Which journeys become shorter?")], [], "number"),
    block("normal", [strong("Which repetitive work is removed from sales, support, or operations?")], [], "number"),
    block("normal", [strong("Which data sources power the answers, and who owns their accuracy?")], [], "number"),
    block("normal", [strong("What happens when the AI does not know?")], [], "number"),
    block("normal", [strong("Which metric will prove the feature made the experience better?")], [], "number"),
    p("If the answers are vague, the project is probably technology-led rather than customer-led."),

    h2("Final takeaway: the website should feel less like software and more like help"),
    p("The best AI-native experiences will not necessarily look futuristic."),
    p("The customer may not even notice that AI is involved."),
    p("They will notice that:"),
    bullet("the right information appeared sooner;"),
    bullet("the site understood the question;"),
    bullet("the next step made sense;"),
    bullet("they did not have to repeat themselves;"),
    bullet("the recommendation felt relevant;"),
    bullet("the form was easier;"),
    bullet("the handoff to a person was smoother."),
    p("That is the before-and-after that matters."),
    p("AI-native web development should not be sold as a collection of fashionable features. It should be designed as a systematic reduction of customer effort."),
    p("If your next redesign brief begins with “add AI,” rewrite the brief."),
    p("Begin with the customer journey."),
    p("Then decide where intelligence earns its place."),

    pLinks([
      { text: "MagicWorks IT Solutions is an AI-first digital marketing and " },
      { text: "web development", href: "/services/web-development" },
      { text: " agency based in Pune, India. Our AI-native website service uses a Next.js front end, LLM-backed backend, and headless CMS architecture, with intelligent capabilities such as search, personalization, recommendations, chat agents, and conversational lead capture scoped according to the business case." },
    ]),

    callout(
      "Thinking About an AI-Native Website?",
      "MagicWorks designs and builds AI-native websites using a Next.js front end, an LLM-backed backend, and a headless CMS, with search, personalization, recommendations, and conversational lead capture scoped to what each business actually needs. If a simpler WordPress build is the right fit, we say so.",
      "key-takeaway"
    ),
    linkPara("", "Explore AI-Native Website Development", "/services/web-development/ai-native-websites", " to see what a scoped implementation could look like, or"),
    linkPara(" ", "book a discovery conversation", "/contact", " with our team, and bring your own before-and-after questions: what should get easier for your customers, and what should stay exactly the same."),
  ];
}

const FAQ = [
  { question: "What is an AI-native website?", answer: "An AI-native website is a website where AI is built into the way the site searches, assists, recommends, personalizes, qualifies, or processes work. It is different from an AI-generated website and different from a conventional website with a chatbot added later." },
  { question: "Does an AI-native website need a chatbot?", answer: "No. Intelligent search, recommendations, personalization, workflow automation, document processing, or guided decision tools may create more value than chat. Chat is an interface, not the definition." },
  { question: "Can an existing website be upgraded instead of fully redesigned?", answer: "Sometimes. If the current architecture exposes clean content and APIs, selected AI capabilities can be added. If the site is highly plugin-dependent, difficult to integrate, or built around unstructured page-builder content, a redesign may be more economical over the full roadmap." },
  { question: "Will AI-native features slow down the website?", answer: "They can if implemented poorly. AI calls should not block basic page rendering or make every interaction dependent on a slow model request. Performance budgets, caching, streaming, fallbacks, and selective use of AI are essential." },
  { question: "Is an AI-native website good for SEO?", answer: "It can provide a strong technical foundation, but it does not guarantee rankings. SEO still depends on crawlability, quality, relevance, internal architecture, authority, content, and user experience. Google continues to recommend the same foundational SEO practices for its generative AI features." },
  { question: "How do you stop an AI website from hallucinating?", answer: "You do not eliminate model uncertainty completely. You reduce risk through retrieval from approved sources, strict instructions, validation, tool permissions, confidence thresholds, constrained outputs, monitoring, and human escalation for sensitive or high-value situations." },
  { question: "What should never be automated without strong controls?", answer: "High-risk decisions, legal or financial commitments, sensitive personal-data handling, contractual promises, refunds, eligibility decisions, and any action where an incorrect autonomous response could materially harm the customer or business." },
  { question: "How should a business measure ROI?", answer: "Measure the specific journey. Relevant metrics can include conversion rate, qualified lead rate, search success, support deflection, response time, completion rate, human handling time, recommendation engagement, and cost per successful interaction. Do not treat AI usage volume as ROI." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "What Changes for Your Customers When Your Website Becomes AI-Native? A Before/After Walkthrough";
const SLUG = "what-changes-for-customers-when-website-becomes-ai-native";
const EXCERPT = "See what changes for customers when a website becomes AI-native: from keyword search to guided answers, and faster, more relevant journeys.";
const SEO_TITLE = "Website Becomes AI-Native: What Changes | MagicWorks";
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
    console.log(`⏭️   Post already exists (${existing._id}), skipping.`);
    return;
  }

  const heroId = await uploadImage("hero-ai-native-before-after-1280x512.png");
  const journeyId = await uploadImage("framework-before-after-customer-journey.png");
  const stackId = await uploadImage("framework-ai-native-customer-stack.png");

  const doc = {
    _id: "drafts.insight-mohan-ai-native-customer-before-after",
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["web-development"],
    pillar: "web-development",
    publishedAt: "2026-11-09T03:30:00.000Z",
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "Customer journey before and after an AI-native website, moving from information hunting to intelligent assistance",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "ai website redesign",
      "ai-native website",
      "customer experience",
      "core web vitals",
      "website redesign india",
      "customer journey",
    ],
    body: buildBody(journeyId, stackId),
    faq: FAQ.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
  };

  console.log("💾  Creating DRAFT document…");
  const created = await client.create(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    NOTE: this is a DRAFT, it is not live on the site until published.`);
  console.log(`    Studio review: https://${PROJECT_ID}.sanity.studio/structure/insight;insight-mohan-ai-native-customer-before-after`);

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
