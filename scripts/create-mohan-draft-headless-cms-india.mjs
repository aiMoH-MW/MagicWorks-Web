/**
 * create-mohan-draft-headless-cms-india.mjs
 *
 * Creates "Headless CMS for Indian Businesses: Sanity vs Payload vs Strapi"
 * (author: Mohan Chute, existing author record) in Sanity as a DRAFT ONLY
 * (not visible on the live site until promoted / published).
 *
 * Source: Docs/Blogs/Mohan/As-per-Purva/06_headless_cms_india/
 *   - headless-cms-for-indian-businesses-sanity-vs-payload-vs-strapi.md  (article content)
 *   - README-PUBLISHING.md                                              (SEO/AEO notes)
 *   - assets/hero-headless-cms-indian-businesses-1280x512.png           (cover image)
 *   - assets/comparison-sanity-payload-strapi.png                       (inline)
 *   - assets/decision-tree-headless-cms.png                             (inline)
 *
 * This script ONLY creates a draft. It does not publish, and it does not
 * delete any existing draft. The post has a future publishedAt value
 * (2026-11-16) that is left untouched — it will be used when the draft is
 * later promoted / published via a separate script.
 *
 * Note on the source comparison tables: the article compares three
 * platforms (Sanity, Payload, Strapi) but the `comparisonTable` schema only
 * supports two value columns. Both 3-column tables in the source (the
 * high-level comparison and the total-cost-of-ownership table) are split
 * into two 2-column comparisonTable blocks each (Sanity vs Payload, then
 * Sanity vs Strapi) so no column of data is lost.
 *
 * Run: node scripts/create-mohan-draft-headless-cms-india.mjs
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

const ASSET_DIR = path.join(__dirname, "..", "..", "Docs", "Blogs", "Mohan", "As-per-Purva", "06_headless_cms_india", "assets");

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
// BLOG: Headless CMS for Indian Businesses: Sanity vs Payload vs Strapi
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgComparison, imgDecisionTree) {
  resetKey("hcm");
  return [
    p("If you ask three developers which headless CMS you should use, there is a good chance you will get four answers."),
    p("That is not because the tools are bad."),
    p("It is because the decision is rarely about a feature checklist."),
    p("It is about the type of website you are building, the team that will run it, how much infrastructure you want to own, how tightly the CMS must integrate with your application, how many editors will use it, how much governance you need, and what you expect the platform to become over the next three to five years."),
    p("For Indian businesses, a few additional questions matter:"),
    bullet("Do you need the option to host the application and database in an India region?"),
    bullet("Is your development team stronger in Next.js, general Node.js, or content operations?"),
    bullet("Do you want a managed content platform or direct ownership of the database and deployment?"),
    bullet("Will content be used only on one website, or across apps, portals, dealer systems, microsites, and AI experiences?"),
    bullet("How important are editorial preview, workflows, permissions, localization, and auditability?"),
    bullet("Are you buying a CMS, or are you really building a digital product with a CMS inside it?"),
    p("At MagicWorks, our AI-native website architecture names Sanity, Payload, and Strapi as the three headless CMS options we consider depending on project requirements."),
    p("This article explains how I would choose among them in September 2026."),
    p("It is not a sponsored ranking. There is no universal winner."),
    block("normal", [plain("The useful answer is "), strong("best fit by operating model"), plain(".")]),

    h2("The short answer"),
    p("If you need a quick decision before reading the full comparison:"),
    bulletBold("Choose Sanity", "when editorial experience, structured content, real-time collaboration, visual editing, and a managed content backend are more important than owning the content database infrastructure yourself."),
    bulletBold("Choose Payload", "when your product is already centered on Next.js and your development team wants one TypeScript codebase, direct database ownership, deep application logic, authentication, access control, and self-hosting flexibility."),
    bulletBold("Choose Strapi", "when you want a conventional open-source headless CMS with a separate Node.js backend, REST/GraphQL APIs, self-hosting control, a broad content-management model, and a familiar separation between CMS and frontend."),
    p("For many B2B marketing websites, Sanity is the easiest editorial choice."),
    p("For custom portals and application-heavy Next.js builds, Payload is often the most natural engineering choice."),
    p("For organizations that want an open-source CMS backend they can operate independently from the frontend, Strapi is often the balanced choice."),
    p("But those are defaults, not rules."),

    h2("First, what does \"headless CMS\" actually mean?"),
    p("A traditional CMS usually combines two jobs:"),
    numbered("storing and managing content;"),
    numbered("rendering the website visitors see."),
    p("A headless CMS separates those jobs."),
    p("The CMS becomes the content system. The website or application is built separately and requests content through APIs or queries."),
    p("That means the same content can potentially power:"),
    bullet("a website;"),
    bullet("mobile app;"),
    bullet("customer portal;"),
    bullet("dealer portal;"),
    bullet("internal dashboard;"),
    bullet("digital signage;"),
    bullet("campaign microsite;"),
    bullet("product catalog;"),
    bullet("AI assistant;"),
    bullet("search index;"),
    bullet("voice or conversational interface."),
    p("The advantage is flexibility."),
    p("The trade-off is that you now own more architecture decisions."),
    p("A headless CMS is not automatically simpler than WordPress. It is usually more composable."),

    h2("Why MagicWorks uses a headless CMS in AI-native builds"),
    p("MagicWorks' current AI-native web-development service uses a Next.js front end, an LLM-backed backend, and a headless CMS, with Sanity, Payload, or Strapi selected per project."),
    p("There are three reasons this matters in an AI-native architecture."),
    h3("1. Content is easier to structure"),
    p("AI systems work better with clean, reusable content units than with long page-builder blobs."),
    p("A service can have structured fields for:"),
    bullet("title;"),
    bullet("summary;"),
    bullet("industries;"),
    bullet("problem statements;"),
    bullet("eligibility;"),
    bullet("FAQs;"),
    bullet("evidence;"),
    bullet("related case studies;"),
    bullet("pricing notes;"),
    bullet("CTA;"),
    bullet("geographic relevance;"),
    bullet("last reviewed date."),
    p("That structure helps normal publishing and also makes retrieval, search, personalization, and content reuse more reliable."),
    h3("2. The frontend is independent"),
    p("The website can evolve without replacing the content system, and the content system can serve more than one interface."),
    h3("3. AI becomes another consumer of approved content"),
    p("A grounded assistant, semantic search layer, recommendation engine, or internal agent can retrieve from the same governed content source rather than relying on uncontrolled copy-and-paste documents."),
    p("That does not make every headless CMS equally suitable."),
    p("The differences become important once the website moves beyond a simple blog."),

    h2("Sanity vs Payload vs Strapi: the high-level comparison"),
    imageBlock(imgComparison, "Comparison visual: Sanity, Payload and Strapi compared by operating model, control and ideal use case"),
    comparisonTable("Sanity", "Payload", [
      { metric: "Core model", a: "Managed content platform + open-source Studio", b: "Open-source Next.js full-stack framework/CMS" },
      { metric: "Data layer", a: "Sanity hosted Content Lake", b: "Your MongoDB, Postgres, or SQLite" },
      { metric: "Frontend fit", a: "Framework-agnostic, strong Next.js support", b: "Native Next.js integration" },
      { metric: "Editorial UX", a: "Excellent, highly customizable", b: "Strong, code-driven" },
      { metric: "Real-time collaboration", a: "Native strength", b: "Available capabilities, depends on setup" },
      { metric: "Visual editing", a: "Strong built-in tooling", b: "Available, with enterprise capabilities for advanced needs" },
      { metric: "APIs/query", a: "GROQ, GraphQL, APIs", b: "REST, GraphQL, Local API, direct DB patterns" },
      { metric: "Self-host backend", a: "Studio can self-host, Content Lake remains hosted by Sanity", b: "Yes" },
      { metric: "Database ownership", a: "No direct hosting of Content Lake", b: "Yes" },
      { metric: "Best fit", a: "Content-led websites and omnichannel publishing", b: "Next.js products, portals, custom apps" },
    ]),
    comparisonTable("Sanity", "Strapi", [
      { metric: "Core model", a: "Managed content platform + open-source Studio", b: "Open-source Node.js headless CMS" },
      { metric: "Data layer", a: "Sanity hosted Content Lake", b: "Your SQL database when self-hosted, or managed Postgres on Strapi Cloud" },
      { metric: "Frontend fit", a: "Framework-agnostic, strong Next.js support", b: "Framework-agnostic, common with Next.js" },
      { metric: "Editorial UX", a: "Excellent, highly customizable", b: "Strong, familiar CMS-style admin" },
      { metric: "Real-time collaboration", a: "Native strength", b: "More conventional publishing workflow" },
      { metric: "Visual editing", a: "Strong built-in tooling", b: "Live Preview available" },
      { metric: "APIs/query", a: "GROQ, GraphQL, APIs", b: "REST, GraphQL" },
      { metric: "Self-host backend", a: "Studio can self-host, Content Lake remains hosted by Sanity", b: "Yes" },
      { metric: "Database ownership", a: "No direct hosting of Content Lake", b: "Yes when self-hosted" },
      { metric: "Best fit", a: "Content-led websites and omnichannel publishing", b: "API-first websites and enterprise content backends" },
    ]),
    p("This table is a starting point. Procurement decisions should go deeper."),

    h2("Sanity: best when content operations are the center of gravity"),
    p("Sanity is unusual because it is not simply an installable CMS with a database you run."),
    p("Sanity Studio is an open-source React-based editing application. You can host that Studio yourself or let Sanity host it. But the Studio connects to Sanity's hosted APIs and Content Lake. Sanity's own documentation is explicit that content is stored in the hosted Content Lake even when the Studio runs locally or is self-hosted."),
    p("That operating model is important."),
    h3("What Sanity does particularly well"),
    block("normal", [strong("Structured content")]),
    p("Sanity treats content as structured data rather than pages."),
    p("That mindset is excellent for businesses planning:"),
    bullet("multiple sites;"),
    bullet("multilingual content;"),
    bullet("reusable product or service data;"),
    bullet("content personalization;"),
    bullet("omnichannel publishing;"),
    bullet("AI retrieval;"),
    bullet("editorial reuse across markets."),
    block("normal", [strong("Editorial customization")]),
    p("Sanity Studio is built in React and generated from code-defined schemas. Developers can shape the editor around the business rather than forcing editors into a fixed interface."),
    block("normal", [strong("Real-time collaboration")]),
    p("Sanity's Content Lake supports real-time updates, and collaborative editing is a core part of the platform."),
    p("For teams where multiple marketers, editors, designers, and reviewers work in the same content environment, this is a meaningful advantage."),
    block("normal", [strong("Visual editing and live preview")]),
    p("Sanity's Visual Editing tools allow editors to preview content and click into elements from the rendered site. Current documentation supports live updates and a Presentation Tool for visual workflows."),
    p("This matters because one of the traditional complaints about headless CMS platforms is that editors lose the page-like preview experience they had in WordPress."),
    p("Sanity has invested heavily in reducing that gap."),
    block("normal", [strong("GROQ")]),
    p("Sanity's main query language, GROQ, is highly expressive. It can filter, join references, project exactly the fields needed, and reshape the response at query time."),
    p("Developers who learn GROQ often appreciate its power."),
    p("The trade-off is that it is another query language to learn."),
    h3("Where Sanity can be the wrong choice"),
    p("Sanity is less attractive when the organization has a hard requirement to own and operate the content database itself."),
    p("You can self-host Studio, but that is not the same as self-hosting the Content Lake."),
    p("It may also be a weaker fit when the CMS is tightly embedded in a custom transactional application where the same application code needs direct control over authentication, database transactions, and domain logic."),
    p("Sanity can integrate with such systems, but at that point the CMS is one service among several rather than the center of the application."),
    h3("Sanity pricing in September 2026"),
    p("Sanity's current public pricing shows:"),
    bulletBold("Free:", "$0, up to 20 user seats, two public datasets, hosted real-time content database, live previews and visual editing;"),
    bulletBold("Growth:", "$15 per seat per month, up to 50 seats, private or public datasets, additional collaboration capabilities and usage-based scaling;"),
    bulletBold("Enterprise:", "custom pricing with advanced governance, SAML SSO, dedicated support, custom quotas, and other enterprise capabilities."),
    p("Pricing and quotas change. Re-check the official page before budgeting."),
    h3("Sanity is a strong fit for"),
    bullet("content-heavy B2B websites;"),
    bullet("editorial teams with several contributors;"),
    bullet("multi-brand or multi-market publishing;"),
    bullet("structured resource libraries;"),
    bullet("websites where content reuse matters;"),
    bullet("teams that value visual editing and collaboration;"),
    bullet("organizations comfortable with a managed content backend."),

    h2("Payload: best when the CMS is part of the application"),
    p("Payload has changed considerably over the last few years."),
    p("Its current positioning is not merely \"headless CMS.\" Payload calls itself an open-source Next.js backend and full-stack framework."),
    p("That description is accurate in practical terms."),
    p("Payload can provide:"),
    bullet("admin panel;"),
    bullet("database schema and migrations;"),
    bullet("REST and GraphQL APIs;"),
    bullet("authentication;"),
    bullet("access control;"),
    bullet("file uploads;"),
    bullet("live preview;"),
    bullet("custom application logic;"),
    bullet("CMS features;"),
    bullet("direct integration with a Next.js application."),
    p("Payload installs directly into a Next.js app and currently supports MongoDB, Postgres, and SQLite through database adapters."),
    h3("What Payload does particularly well"),
    block("normal", [strong("One TypeScript ecosystem")]),
    p("For a team already building in Next.js and TypeScript, Payload reduces conceptual distance between \"the CMS\" and \"the application.\""),
    p("The CMS is not a remote content SaaS that you only query over HTTP. It can live inside the same application architecture."),
    p("That is attractive for:"),
    bullet("portals;"),
    bullet("authenticated experiences;"),
    bullet("marketplaces;"),
    bullet("member sites;"),
    bullet("content-plus-application products;"),
    bullet("internal tools;"),
    bullet("custom dashboards;"),
    bullet("sites with complex permissions."),
    block("normal", [strong("Database ownership")]),
    p("Payload is open source and MIT licensed. Its current documentation says you can self-host it anywhere you can run the application."),
    p("For Indian businesses that want to deploy the app and database in an India region under their own cloud account, this can be a major advantage."),
    p("The organization controls:"),
    bullet("database provider;"),
    bullet("region;"),
    bullet("backups;"),
    bullet("network setup;"),
    bullet("storage;"),
    bullet("runtime;"),
    bullet("observability;"),
    bullet("upgrade timing."),
    p("That control is valuable, but it creates responsibility."),
    block("normal", [strong("Deep application logic")]),
    p("Because Payload is code-first and sits close to the application, developers can build custom hooks, access-control rules, workflows, integrations, and business logic without treating the CMS as a separate black box."),
    block("normal", [strong("Next.js-native architecture")]),
    p("Payload's current installation model puts Payload directly into the Next.js app folder and ships official integration packages for Next.js."),
    p("For a Next.js-focused agency or product team, this is one of Payload's clearest differentiators."),
    h3("Where Payload can be the wrong choice"),
    p("Payload is not the obvious choice for a marketing team that wants a content platform with minimal infrastructure involvement and little developer ownership."),
    p("Someone still needs to run the application stack."),
    p("The official deployment guidance reminds teams that a production Payload setup may also need database hosting, persistent file storage, email, CDN, and other operational services depending on the project."),
    p("If you self-host because \"open source is cheaper\" but then under-budget DevOps, backups, patching, security, monitoring, and upgrades, the economics can reverse quickly."),
    p("Payload can also be more engineering-centric than a traditional marketing team expects."),
    p("That is not a criticism. It is part of the product's strength."),
    h3("Payload pricing in September 2026"),
    p("Payload's self-hosted open-source core is currently free under the MIT license. Its public get-started page emphasizes self-hosting and also offers enterprise support and advanced enterprise capabilities through sales-led plans."),
    p("In other words, your baseline software-license cost can be zero, but your total cost is not zero."),
    p("Budget for:"),
    bullet("hosting;"),
    bullet("database;"),
    bullet("storage;"),
    bullet("backups;"),
    bullet("monitoring;"),
    bullet("engineering maintenance;"),
    bullet("security patching;"),
    bullet("enterprise support if required."),
    h3("Payload is a strong fit for"),
    bullet("Next.js-heavy engineering teams;"),
    bullet("portals and member sites;"),
    bullet("web applications with substantial custom logic;"),
    bullet("businesses needing direct database and hosting control;"),
    bullet("products where authentication and access control are central;"),
    bullet("teams that want a CMS and application backend in one codebase;"),
    bullet("agencies that expect to customize extensively."),

    h2("Strapi: best when you want a classic open-source headless CMS operating model"),
    p("Strapi is the easiest of the three to explain to someone who already understands traditional backend architecture."),
    p("It is an open-source Node.js headless CMS that generates REST and GraphQL APIs, provides an admin interface for content teams, and can be self-hosted or deployed to Strapi Cloud."),
    p("Strapi 5 continues to position itself as an extensible content framework rather than a closed SaaS."),
    h3("What Strapi does particularly well"),
    block("normal", [strong("Clear separation of concerns")]),
    p("A common Strapi architecture looks like this:"),
    p("Next.js frontend -> Strapi API -> database"),
    p("That separation is familiar and easy to reason about."),
    p("The frontend and CMS can be deployed, scaled, and maintained independently."),
    block("normal", [strong("Open-source self-hosting")]),
    p("Strapi's Community edition is MIT licensed and can be run on your own infrastructure. Strapi explicitly supports self-hosting on your cloud, servers, containers, or other Node.js infrastructure."),
    p("For teams with infrastructure policies, this provides control over where the CMS and database run."),
    block("normal", [strong("Database flexibility within SQL choices")]),
    p("Strapi's current self-hosting guidance lists PostgreSQL, MySQL, and MariaDB for production, with SQLite commonly used in local development."),
    p("This makes Strapi a comfortable choice for organizations already standardized on relational databases."),
    block("normal", [strong("CMS-first administration")]),
    p("Strapi's Content-Type Builder, Content Manager, media library, roles, and familiar admin patterns can feel more conventional to editors than a highly code-shaped system."),
    block("normal", [strong("REST and GraphQL")]),
    p("Strapi can generate APIs quickly from the content model. This is one of its long-standing strengths."),
    h3("Where Strapi can be the wrong choice"),
    p("Strapi can introduce more moving parts than Payload for a pure Next.js project because the CMS is usually a separate application rather than part of the same Next.js runtime."),
    p("That is sometimes an advantage and sometimes unnecessary overhead."),
    p("It can also require careful review of which collaboration, governance, history, SSO, and workflow features are included in the open-source edition versus paid CMS plans."),
    p("Strapi's own 2026 support documentation notes that Strapi Cloud hosting fees and paid CMS feature licensing are separate. A paid Cloud plan does not automatically include every paid CMS capability."),
    p("That distinction matters during procurement."),
    h3("Strapi Cloud pricing in September 2026"),
    p("Strapi's current public Cloud pricing lists:"),
    bulletBold("Starter:", "$35 per project per month;"),
    bulletBold("Pro:", "$90 per project per month;"),
    bulletBold("Business:", "$450 per project per month."),
    p("The plans differ in API requests, storage, bandwidth, backups, environments, observability, runtime behavior, and SLA. Paid CMS features can require separate licensing."),
    p("Again, verify before purchase because SaaS pricing changes."),
    h3("Strapi is a strong fit for"),
    bullet("organizations that want open-source CMS control;"),
    bullet("API-first website architectures;"),
    bullet("teams comfortable operating a separate Node.js backend;"),
    bullet("businesses standardized on PostgreSQL/MySQL/MariaDB;"),
    bullet("projects that may serve multiple frontends;"),
    bullet("organizations that want to choose between self-hosting and a managed Strapi deployment."),

    h2("Which one gives Indian businesses the most control over hosting?"),
    p("If \"control\" means you want to choose your own cloud, region, database, storage, network, and backup strategy, Payload and self-hosted Strapi offer the most direct control."),
    p("Sanity lets you self-host the Studio interface, but the Content Lake remains a Sanity-hosted service."),
    p("That does not automatically make Sanity less secure or less suitable."),
    p("It means the procurement model is different."),
    h3("Ask these questions instead of simply asking \"Can it be hosted in India?\""),
    numbered("Which data actually lives in the CMS?"),
    numbered("Does the CMS store personal data or only public content?"),
    numbered("Where is the database hosted?"),
    numbered("Who controls backups and deletion?"),
    numbered("What logs contain user or editor information?"),
    numbered("Are there internal contractual or client requirements about region?"),
    numbered("Does the business need on-prem or isolated-network operation?"),
    numbered("Who will operate and patch a self-hosted stack?"),
    p("A self-hosted CMS is not automatically more compliant."),
    p("It simply gives you more responsibility and more control."),

    h2("Which one is easiest for content editors?"),
    p("This depends on implementation quality more than buyers expect."),
    p("A badly configured Sanity Studio can be confusing."),
    p("A well-designed Payload admin can be excellent."),
    p("A Strapi project with clean content models can be easy to use."),
    p("Still, there are broad tendencies."),
    h3("Sanity"),
    p("Best when editors need:"),
    bullet("structured content;"),
    bullet("real-time collaboration;"),
    bullet("live preview;"),
    bullet("strong visual editing;"),
    bullet("custom editorial workflows;"),
    bullet("content reused across many surfaces."),
    h3("Payload"),
    p("Best when editors are working inside a product whose content model is tightly coupled with application objects, roles, users, or transactions."),
    h3("Strapi"),
    p("Best when editors want a recognizable CMS administration experience with content types, components, media, and conventional publishing workflows."),
    h3("The question I would ask during vendor selection"),
    p("Do not let developers demo only the schema code."),
    p("Give two real editors three tasks:"),
    numbered("create a new landing page;"),
    numbered("update a service across two locations;"),
    numbered("preview, review, and publish a change."),
    p("Time the tasks."),
    p("Observe where they hesitate."),
    p("The CMS is an operational tool. Editor friction becomes an ongoing business cost."),

    h2("Which one is best for Next.js?"),
    p("All three work with Next.js."),
    p("The difference is architectural intimacy."),
    h3("Payload: closest integration"),
    p("Payload is explicitly designed to run inside a Next.js application. Its documentation describes it as a Next.js full-stack framework and provides direct installation into the app."),
    p("If your team wants one codebase and one strongly typed domain model, Payload is compelling."),
    h3("Sanity: strong composable pairing"),
    p("Sanity has extensive Next.js guidance and tooling, but the content platform remains a separate hosted service."),
    p("This separation is often ideal for content-heavy websites because marketers can operate the content layer independently while developers build the frontend."),
    h3("Strapi: traditional service boundary"),
    p("Strapi normally runs as its own Node.js backend and exposes APIs to Next.js."),
    p("That is clean and familiar, but it means managing two applications."),

    h2("Which one is best for AI-native websites?"),
    p("All three can support AI-native experiences."),
    p("The important question is which kind of AI-native website you are building."),
    h3("Sanity for content intelligence"),
    p("Sanity is attractive when AI needs to work with a rich content graph:"),
    bullet("articles;"),
    bullet("services;"),
    bullet("people;"),
    bullet("FAQs;"),
    bullet("case studies;"),
    bullet("product information;"),
    bullet("campaign content;"),
    bullet("localized variants."),
    p("Its structured content model and query capabilities make it a strong knowledge source."),
    p("Sanity is also adding its own AI tools and currently prices AI actions through a credit model."),
    h3("Payload for application intelligence"),
    p("Payload is attractive when AI is part of the application workflow:"),
    bullet("authenticated assistant;"),
    bullet("user-specific recommendations;"),
    bullet("AI-supported portal;"),
    bullet("document processing;"),
    bullet("role-based actions;"),
    bullet("internal tools;"),
    bullet("custom business workflows."),
    p("Because authentication, data, access control, and application code can sit close together, AI tools can be integrated into a strongly controlled workflow."),
    h3("Strapi for API-centered AI integration"),
    p("Strapi works well when AI services consume CMS content through stable REST/GraphQL APIs while the organization maintains a conventional backend boundary."),
    p("It is especially sensible when several applications already consume the same CMS APIs."),

    h2("Pricing: do not compare subscription numbers alone"),
    p("A common buying mistake is to compare:"),
    bullet("Sanity: $15 per seat;"),
    bullet("Strapi Cloud: $35 per project;"),
    bullet("Payload: free."),
    p("That comparison is misleading because the cost models are different."),
    h3("Compare total cost of ownership"),
    p("Use a three-year model with these categories:"),
    comparisonTable("Sanity", "Payload", [
      { metric: "CMS subscription/license", a: "Plan + usage", b: "Open-source core; enterprise optional" },
      { metric: "Hosting", a: "Content backend managed by Sanity; frontend separate", b: "You choose app, DB, storage, CDN" },
      { metric: "DevOps", a: "Lower for content backend", b: "Higher if fully self-hosted" },
      { metric: "Engineering customization", a: "Medium to high", b: "High flexibility, engineering-led" },
      { metric: "Editor enablement", a: "Usually strong", b: "Depends on implementation" },
      { metric: "Enterprise support", a: "Paid tier", b: "Enterprise" },
      { metric: "Migration/exit cost", a: "Content export + rebuild integration", b: "High ownership of code/data" },
    ]),
    comparisonTable("Sanity", "Strapi", [
      { metric: "CMS subscription/license", a: "Plan + usage", b: "Open-source core or paid CMS features" },
      { metric: "Hosting", a: "Content backend managed by Sanity; frontend separate", b: "Self-hosted stack or Strapi Cloud" },
      { metric: "DevOps", a: "Lower for content backend", b: "Higher self-hosted, lower on Cloud" },
      { metric: "Engineering customization", a: "Medium to high", b: "Medium to high" },
      { metric: "Editor enablement", a: "Usually strong", b: "Usually familiar" },
      { metric: "Enterprise support", a: "Paid tier", b: "Enterprise / paid plans" },
      { metric: "Migration/exit cost", a: "Content export + rebuild integration", b: "High ownership when self-hosted" },
    ]),
    p("A system with a higher SaaS bill can have a lower operational cost."),
    p("A free open-source CMS can be economically excellent if your team already owns the infrastructure capability."),
    p("The right comparison is not license versus license."),
    block("normal", [plain("It is "), strong("total operating model versus total operating model"), plain(".")]),

    h2("Lock-in: a more honest way to think about it"),
    p("\"Vendor lock-in\" is often discussed as if open source eliminates it."),
    p("It does not."),
    p("There are at least four kinds of lock-in."),
    h3("1. Data lock-in"),
    p("How easy is it to export the raw content and assets?"),
    h3("2. Schema lock-in"),
    p("How much of your content model depends on proprietary concepts?"),
    h3("3. Application lock-in"),
    p("How much frontend and business logic assumes one CMS API or query language?"),
    h3("4. Operational lock-in"),
    p("How much does your team depend on one provider's hosting, workflows, permissions, search, preview, and support model?"),
    p("Sanity has more platform dependency at the content-service layer."),
    p("Payload and Strapi give more direct infrastructure ownership when self-hosted, but your custom code can create its own migration cost."),
    p("Open source gives you rights and options."),
    p("It does not make a future migration free."),

    h2("Security and governance: the CMS is part of your production attack surface"),
    p("Do not choose a CMS based only on developer popularity."),
    p("Ask about:"),
    bullet("authentication;"),
    bullet("editor roles;"),
    bullet("API permissions;"),
    bullet("SSO requirements;"),
    bullet("audit logs;"),
    bullet("content history;"),
    bullet("backup and restore;"),
    bullet("secrets management;"),
    bullet("patching cadence;"),
    bullet("vulnerability management;"),
    bullet("staging environments;"),
    bullet("approval workflows;"),
    bullet("media permissions;"),
    bullet("API rate limits;"),
    bullet("infrastructure ownership."),
    p("For self-hosted systems, assign a named owner for patching and monitoring."),
    p("Open source is only an advantage if you maintain the software you deploy."),
    p("Payload's 2026 release notes, for example, include active security and dependency fixes, a reminder that modern CMS software requires routine updates."),

    h2("Localization and Indian multi-market publishing"),
    p("Indian businesses often have more localization complexity than the phrase \"multilingual website\" suggests."),
    p("You may need:"),
    bullet("English plus Hindi;"),
    bullet("state-specific language versions;"),
    bullet("different regulatory text by market;"),
    bullet("city-specific pages;"),
    bullet("different product availability;"),
    bullet("franchise or dealer content;"),
    bullet("national and local campaign variants."),
    p("All three platforms can support localized content, but the content model should be designed deliberately before implementation."),
    p("Do not simply duplicate every page for every language."),
    p("Define:"),
    bullet("which fields localize;"),
    bullet("which are global;"),
    bullet("who can edit each locale;"),
    bullet("fallback rules;"),
    bullet("URL structure;"),
    bullet("translation workflow;"),
    bullet("preview requirements;"),
    bullet("SEO metadata per locale."),
    p("CMS selection cannot compensate for a poor localization model."),

    h2("The decision tree I would use"),
    imageBlock(imgDecisionTree, "Decision tree: First-pass questions that help an Indian business shortlist Sanity, Payload or Strapi"),
    p("Start with the architecture, not the brand name."),
    numberedBold("Question 1: Is this primarily a content website or a web application?", "If primarily content, lean Sanity or Strapi. If deeply application-like, lean Payload."),
    numberedBold("Question 2: Must you own and place the content database in your infrastructure?", "If yes, lean Payload or self-hosted Strapi. If no, Sanity remains fully viable."),
    numberedBold("Question 3: Is your engineering team strongly Next.js and TypeScript centered?", "If yes, Payload deserves serious consideration."),
    numberedBold("Question 4: Is editorial collaboration and live visual editing the dominant requirement?", "If yes, Sanity deserves serious consideration."),
    numberedBold("Question 5: Do you want a separate, conventional CMS backend with REST/GraphQL APIs?", "If yes, Strapi is a natural fit."),
    numberedBold("Question 6: Is there a multi-channel content roadmap?", "All three can support it. Sanity's structured-content model is particularly strong for content reuse, while Strapi's API-first model and Payload's code-first model can also work well depending on how channels are built."),

    h2("My recommendation by business scenario"),
    h3("Scenario 1: B2B services website with 10 to 30 editors"),
    bp("Likely choice:", "Sanity"),
    bp("Why:", "strong editorial experience, reusable content, real-time collaboration, visual preview, managed content backend."),
    p("Choose Payload instead if the site also contains substantial authenticated application logic."),
    h3("Scenario 2: Customer portal or member platform built on Next.js"),
    bp("Likely choice:", "Payload"),
    bp("Why:", "authentication, access control, direct database ownership, application logic, and CMS in the same TypeScript ecosystem."),
    h3("Scenario 3: Enterprise website with an internal infrastructure team and API-first architecture"),
    bp("Likely choice:", "Strapi"),
    bp("Why:", "open-source backend, familiar Node.js architecture, self-hosting, standard API boundary, relational database fit."),
    h3("Scenario 4: Multi-brand content platform for several websites"),
    bp("Likely choice:", "Sanity or Strapi"),
    p("Sanity if editorial collaboration and structured reuse dominate."),
    p("Strapi if infrastructure ownership and conventional APIs dominate."),
    h3("Scenario 5: High-control deployment with India-region infrastructure"),
    bp("Likely choice:", "Payload or self-hosted Strapi"),
    p("Both can be deployed on infrastructure you control. The choice then depends on whether you prefer integrated Next.js full-stack architecture or a separate CMS service."),
    h3("Scenario 6: Marketing team with almost no internal engineering capacity"),
    bp("Likely choice:", "Sanity with an implementation partner"),
    p("A managed content backend reduces operational burden. But editor workflows still need deliberate configuration."),

    h2("What I would not use as selection criteria"),
    h3("GitHub stars alone"),
    p("Popularity is useful but not a business architecture."),
    h3("\"Open source\" as a complete answer"),
    p("Open source tells you about licensing and control. It does not tell you total operating cost, editor experience, support quality, or implementation complexity."),
    h3("Lowest first-year price"),
    p("CMS decisions usually outlive the initial build."),
    h3("Developer preference alone"),
    p("The developer may leave. The content team will use the system every week."),
    h3("AI feature count"),
    p("AI features are changing too quickly for a procurement decision to depend on who has the longest AI menu this quarter."),
    p("Choose the content and application architecture first."),
    h3("\"It can do everything\""),
    p("All three can be extended substantially."),
    p("The question is not whether something is technically possible."),
    block("normal", [plain("The question is "), strong("how much custom engineering and operational burden the capability creates"), plain(".")]),

    h2("A 15-point CMS evaluation checklist"),
    p("Before choosing a headless CMS development company or approving a platform, score each candidate from 1 to 5 on these criteria."),
    numbered("Editor ease of use"),
    numbered("Preview and visual editing"),
    numbered("Structured content modeling"),
    numbered("Next.js integration"),
    numbered("API/query flexibility"),
    numbered("Authentication and permissions"),
    numbered("Workflow and governance"),
    numbered("Localization"),
    numbered("Hosting flexibility"),
    numbered("Data ownership"),
    numbered("Security operations"),
    numbered("Developer hiring availability"),
    numbered("Upgrade path"),
    numbered("Three-year total cost of ownership"),
    numbered("Fit with the future product roadmap"),
    p("Then weight the criteria."),
    p("For a media company, editorial experience may deserve 20% of the total score."),
    p("For a portal, authentication and application logic may deserve 20%."),
    p("For a regulated enterprise, hosting and governance may dominate."),
    p("Do not use equal weights unless every requirement is genuinely equal."),

    h2("Questions to ask a headless CMS development company"),
    p("If an agency recommends one platform immediately, ask why."),
    p("A good discovery conversation should include questions such as:"),
    bullet("How many content editors will use the system?"),
    bullet("What content types do you publish today?"),
    bullet("What will the same content need to power in three years?"),
    bullet("Do you require self-hosting?"),
    bullet("Do you need an India-region deployment?"),
    bullet("Which enterprise features are mandatory?"),
    bullet("How will preview work?"),
    bullet("How will editors create landing pages without developers?"),
    bullet("What is the backup and restore plan?"),
    bullet("What is the upgrade strategy?"),
    bullet("How are roles and permissions modeled?"),
    bullet("How will structured data and SEO metadata be managed?"),
    bullet("What is the migration and exit strategy?"),
    bullet("What does ongoing maintenance cost?"),
    bullet("Which parts are platform fees versus infrastructure versus agency support?"),
    p("The CMS should be chosen after these answers, not before them."),

    h2("Final verdict"),
    p("Sanity, Payload, and Strapi are all credible modern platforms."),
    p("They represent three different philosophies."),
    bp("Sanity says:", "let the content platform be managed, real-time, structured, collaborative, and highly customizable for editors."),
    bp("Payload says:", "put the CMS inside the application stack, own the code and database, and use one TypeScript/Next.js ecosystem for content plus product logic."),
    bp("Strapi says:", "run an open-source CMS backend as a service, expose clean APIs, and choose whether to self-host or use managed infrastructure."),
    p("For an Indian business, the right choice depends less on which logo appears in the most technology stacks and more on which operating model your organization can sustain."),
    p("The CMS you choose should make editors faster, developers more confident, integrations cleaner, governance clearer, and the next three years of the roadmap easier to execute."),
    p("If it does not, it is the wrong CMS, regardless of how modern it looks in the demo."),

    h2("About MagicWorks"),
    p("MagicWorks IT Solutions is an AI-first digital marketing and web development agency based in Pune, India. Our current AI-native website architecture uses Next.js with an LLM-backed backend and a headless CMS, with Sanity, Payload, or Strapi chosen according to the project rather than standardized blindly."),
    p("Explore:"),
    bulletLink("", "AI-Native Website Development", "/services/web-development/ai-native-websites"),
    bulletLink("", "Web Development at MagicWorks", "/services/web-development"),
    bulletLink("", "What Is an AI-Native Website, and Why Your Next Build Should Be One", "/blog/what-is-an-ai-native-website"),
    bulletLink("", "Portals and Member Sites", "/services/web-development/portals-member-sites"),

    h2("Sources and further reading"),
    bulletLink("", "MagicWorks, \"AI-Native Website Development\"", "https://magicworksitsolutions.com/services/web-development/ai-native-websites"),
    bulletLink("", "Sanity Docs, \"Hosting and deployment - Sanity Studio\"", "https://www.sanity.io/docs/studio/deployment"),
    bulletLink("", "Sanity Docs, \"Studio\"", "https://www.sanity.io/docs/studio"),
    bulletLink("", "Sanity Docs, \"Real-time updates\"", "https://www.sanity.io/docs/content-lake/realtime-updates"),
    bulletLink("", "Sanity Docs, \"Visual Editing\"", "https://www.sanity.io/docs/visual-editing"),
    bulletLink("", "Sanity Docs, \"GROQ introduction\"", "https://www.sanity.io/docs/content-lake/groq-introduction"),
    bulletLink("", "Sanity, \"Pricing\"", "https://www.sanity.io/pricing"),
    bulletLink("", "Payload Docs, \"What is Payload?\"", "https://payloadcms.com/docs/getting-started/what-is-payload"),
    bulletLink("", "Payload Docs, \"Installation\"", "https://payloadcms.com/docs/getting-started/installation"),
    bulletLink("", "Payload Docs, \"Database\"", "https://payloadcms.com/docs/database/overview"),
    bulletLink("", "Payload, \"Get started\"", "https://payloadcms.com/get-started"),
    bulletLink("", "Payload Docs, \"Production Deployment\"", "https://payloadcms.com/docs/production/deployment"),
    bulletLink("", "Strapi, \"Self-host Strapi\"", "https://strapi.io/hosting"),
    bulletLink("", "Strapi 5 Documentation", "https://docs.strapi.io/"),
    bulletLink("", "Strapi, \"Features\"", "https://strapi.io/features"),
    bulletLink("", "Strapi Support, \"Understanding Strapi Cloud usage and billing\"", "https://support.strapi.io/articles/3581379360-understanding-strapi-cloud-usage-and-billing"),
    bulletLink("", "Strapi, \"Cloud Pricing\"", "https://strapi.io/pricing-cloud"),
    bulletLink("", "Sanity Docs, \"How AI Credits work\"", "https://www.sanity.io/docs/platform-management/how-ai-credits-work"),
    bulletLink("", "Payload, \"Release Notes\"", "https://payloadcms.com/posts/releases"),

    callout(
      "Choosing Between Sanity, Payload and Strapi?",
      "MagicWorks builds AI-native websites on Next.js and selects Sanity, Payload, or Strapi per project rather than defaulting to one platform. If you want an independent recommendation based on your team, editors, hosting requirements, and roadmap rather than a vendor's own pitch, we are happy to walk through it with you.",
      "key-takeaway"
    ),
    linkPara("Explore ", "MagicWorks Web Development", "/services/web-development", ", or"),
    linkPara("", "book a discovery conversation", "/contact", " to get an independent recommendation for your headless CMS architecture."),
  ];
}

const FAQ = [
  { question: "Is Sanity open source?", answer: "Sanity Studio is open source and can be self-hosted, but it connects to Sanity's hosted APIs and Content Lake. The content backend itself is a managed Sanity service." },
  { question: "Is Payload really free?", answer: "Payload's self-hosted core is MIT licensed and currently free to use. You still pay for the infrastructure and engineering required to run the application, database, storage, backups, monitoring, and related services. Enterprise support and features are separate." },
  { question: "Is Strapi free?", answer: "Strapi's Community edition is open source and can be self-hosted. Strapi also sells managed Cloud hosting and paid CMS/enterprise capabilities." },
  { question: "Which CMS is best for Next.js?", answer: "Payload is the most tightly integrated because it runs directly inside a Next.js application. Sanity and Strapi also work well with Next.js but usually operate as separate content services." },
  { question: "Which is easiest for marketers?", answer: "Sanity is often strongest for collaborative editorial workflows and visual editing. Strapi provides a familiar CMS-style admin. Payload can be excellent but is usually more engineering-shaped. The real answer depends on how the implementation partner configures the content models and editor interface." },
  { question: "Which provides the most data control?", answer: "Self-hosted Payload and Strapi provide direct control over application hosting and database placement. Sanity's Content Lake remains hosted by Sanity, even if the Studio interface is self-hosted." },
  { question: "Which is best for an AI-native website?", answer: "There is no single best option. Sanity is strong when AI needs a rich structured content layer. Payload is strong when AI is deeply integrated with authenticated application workflows. Strapi is strong when AI services should consume content through a conventional API-first backend." },
  { question: "Which is cheapest?", answer: "That cannot be answered from license price alone. Compare three-year total cost including SaaS fees, cloud hosting, database, storage, DevOps, support, maintenance, engineering time, and enterprise features." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "Headless CMS for Indian Businesses: Sanity vs Payload vs Strapi";
const SLUG = "headless-cms-for-indian-businesses-sanity-vs-payload-vs-strapi";
const EXCERPT = "An honest Sanity vs Payload vs Strapi comparison to help Indian businesses choose the right headless CMS for their team and roadmap.";
const SEO_TITLE = "Sanity vs Payload vs Strapi | MagicWorks";
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

  const heroId = await uploadImage("hero-headless-cms-indian-businesses-1280x512.png");
  const comparisonId = await uploadImage("comparison-sanity-payload-strapi.png");
  const decisionTreeId = await uploadImage("decision-tree-headless-cms.png");

  const doc = {
    _id: "drafts.insight-mohan-headless-cms-india",
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["web-development"],
    pillar: "platform-consultation",
    publishedAt: "2026-11-16T03:30:00.000Z",
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "Three headless CMS options, Sanity, Payload and Strapi, presented as different architecture choices",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "headless cms development company",
      "Sanity CMS",
      "Payload CMS",
      "Strapi",
      "headless CMS India",
      "CMS comparison",
    ],
    body: buildBody(comparisonId, decisionTreeId),
    faq: FAQ.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
  };

  console.log("💾  Creating DRAFT document…");
  const created = await client.create(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    NOTE: this is a DRAFT — it is not live on the site until published.`);
  console.log(`    Studio review: https://${PROJECT_ID}.sanity.studio/structure/insight;insight-mohan-headless-cms-india`);

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
