/**
 * create-purva-draft-whitepaper-writing-b2b.mjs
 *
 * Creates "Whitepaper Writing: Why Most B2B Whitepapers Don't Get Read Past
 * Page Two" (author: Purva Desai, existing author record) in Sanity as a
 * DRAFT ONLY (not visible on the live site until promoted).
 *
 * Source: Docs/Blogs/Purva/Whitepaper-Writing-B2B/
 *   - Whitepaper-Writing-B2B.docx / .pdf  (article content)
 *   - Whitepaper-Writing-B2B.jpg          (cover image)
 *
 * This script ONLY creates a draft. It does not publish. Scheduled for
 * Tuesday 6 Oct 2026 — promote it that day (or whenever ready) with:
 *   node scripts/publish-draft.mjs insight-purva-whitepaper-writing-b2b
 *
 * Run: node scripts/create-purva-draft-whitepaper-writing-b2b.mjs
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

const POST_DIR = path.join(
  __dirname, "..", "..", "Docs", "Blogs", "Purva",
  "Whitepaper-Writing-B2B"
);

// ── Portable Text helpers ────────────────────────────────────────────────
let _k = 0;
const _prefix = "pvwp";
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
const bullet = (text) => block("normal", [plain(text)], [], "bullet");
const bulletBold = (leadIn, rest) => block("normal", [strong(leadIn), plain(" " + rest)], [], "bullet");
const numberedBold = (leadIn, rest) => block("normal", [strong(leadIn), plain(" " + rest)], [], "number");

// Paragraph with a single inline link plus arbitrary before/after text.
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

const callout = (title, bodyText, variant = "key-takeaway") => ({ _type: "callout", _key: k(), title, body: bodyText, variant });

// ══════════════════════════════════════════════════════════════════════════
// BODY
// ══════════════════════════════════════════════════════════════════════════
const body = [
  p("A whitepaper gets 340 downloads in its first month. The marketing team calls it a win. Three months later, the sales team says almost nobody they've spoken to has actually read past the executive summary. That gap, between downloads and actual reading, is the real whitepaper problem, and it is almost never the research that's at fault."),

  h2("Why the Download Number Is the Wrong Thing to Celebrate"),
  p("A download is a form fill, not a read. Whitepapers as a format currently return about $1.40 in value for every $1 spent, compared to $4.60 for long-form blog posts (Marketful, 2026), a gap that says something structural is underperforming in how most whitepapers get built and delivered, not that research-driven content itself has stopped working."),
  p("Part of that gap is the format itself. More than half of visitors on mobile are unlikely to ever read a whitepaper after downloading it, largely because a fixed-layout PDF is genuinely difficult to read on a smaller screen (Foleon, 2026, citing Statista mobile-traffic estimates). And when researchers compared static whitepapers directly against interactive formats covering similar ground, the static whitepaper converted at 9.1% against 23.4% for the interactive version, in a DemandGen survey of 1,200 B2B marketing decision-makers (Amra & Elma, 2026, citing DemandGen). Treat that specific gap as directional, since interactive and static content are rarely built to answer identical questions, but the direction is consistent with what shows up across the format generally: the container is working against the content."),

  h2("Where Readers Actually Drop Off, and Why It's Rarely the Data"),
  p("The research inside most B2B whitepapers is usually fine. What causes readers to stop is almost always structural, and it shows up in a small number of repeated patterns:"),
  bulletBold("The executive summary describes the topic instead of stating a conclusion.", "A reader who finishes the summary not knowing what the paper actually argues has no reason to keep going."),
  bulletBold("The one useful, specific number is buried on page seven.", "If the sharpest data point in the whole document isn't visible in the first page, most readers never reach it."),
  bulletBold("Sections have generic headings that promise nothing.", "A heading like “Background” tells a skimming reader nothing about whether that section is worth their time. A heading that states a finding does."),
  bulletBold("The evidence section runs long with no visual break.", "A typical, well-structured B2B whitepaper runs 6 to 12 pages: a one-to-two-page executive summary, four to ten pages of evidence-backed analysis, and three to five closing recommendations (Digital Marketing Knight, 2026). Papers that let the evidence section sprawl past that shape, without a chart, scorecard, or framework breaking it up, are where page-two drop-off concentrates most heavily."),

  h2("What “Good” Actually Looks Like: Two Live Examples"),
  p("Rather than describe this in the abstract, it's worth pointing at two whitepapers already live on the MagicWorks site that were built around exactly these structural choices."),
  pLinks([
    { text: "AI Automation Readiness for Indian SMEs", href: "/insights/whitepapers/ai-automation-readiness-indian-smes" },
    { text: " opens with a five-dimension readiness framework a reader can apply to their own business within the first few pages, not after finishing the whole document. The vendor-selection criteria and the phased ninety-day roadmap both give the reader something concrete to act on before they reach the final page, which is a large part of why a reader who starts this paper has a reason to keep going." },
  ]),
  pLinks([
    { text: "Performance Marketing ROI Framework", href: "/insights/whitepapers/performance-marketing-roi" },
    { text: " leads with CPL and ROAS benchmarks across four Indian industries, specific numbers a marketing head can compare against their own campaigns almost immediately, before the paper moves into attribution modelling and the campaign audit checklist that closes it out. The benchmarks earn the read; the checklist earns the follow-up conversation." },
  ]),
  p("Both papers put a usable framework, scorecard, or checklist within the first few pages rather than saving the payoff for the end, which is the single structural habit most underperforming whitepapers skip."),

  h2("Who Should Actually Write It: In-House, Freelance, or Agency"),
  p("Anyone searching for a “white paper writer” is usually further along in deciding to commission one than deciding whether to. The real question at that point is who should actually write it, and the answer depends less on budget than on what the paper needs to accomplish."),
  p("Professional B2B whitepaper writers typically charge between $2,500 and $7,000 or more per project, reflecting the research, interviews, and structural work that goes into a paper meant to influence pipeline rather than simply fill a content calendar (Freelance Writing, 2026). Agencies commonly charge a 30 to 50% premium over an individual freelancer's rate, which covers project management, editorial quality control, and often the design and distribution work that turns a document into a usable asset rather than a Word file (Nathan Ojaokomo, 2026). Neither option is inherently the right call. A specialist freelancer with direct subject-matter depth can outperform a generalist agency on a narrow technical topic, while an agency earns its premium when the deliverable needs to be part of a coordinated system, matching a specific brand voice, feeding a broader content calendar, or built around a repeatable structural template rather than commissioned as a one-off."),
  p("What actually matters, regardless of who holds the pen, is whether the writer understands the structural failures covered above well enough to build around them from the first draft. A skilled writer who has never been told that the executive summary needs to state a conclusion, not describe a topic, will produce exactly the kind of paper that stalls at page two, however strong the underlying research is. This is the argument for treating whitepaper writing as a specialised discipline rather than an extension of general content writing, since the difference between a paper that gets read and one that doesn't rarely comes down to the quality of the research and almost always comes down to the structural decisions made around it."),

  h2("The Structural Fixes That Actually Keep People Reading"),
  numberedBold("Open with the finding, not the framing.", "State the single sharpest conclusion or data point in the first hundred words, before any context-setting. A reader deciding whether to keep going needs a reason within the first paragraph, not the fifth."),
  numberedBold("Cap the executive summary at one page.", "If it needs two, the paper likely needs a second, sharper draft of the summary rather than a longer one. A summary that can't fit on one page is usually trying to make three arguments instead of one."),
  numberedBold("Give every section heading a promise.", "A reader skimming headings alone should be able to tell what they'll get from each section before reading it, rather than a generic label like “Background” or “Analysis” that gives no reason to stop scrolling."),
  numberedBold("Place one visual, chart, scorecard, or framework, every two to three pages,", "not only at the very end. A visual breaks up dense text and gives a skimming reader a natural place to re-engage."),
  numberedBold("Break paragraphs at three to four sentences.", "Dense, unbroken paragraphs are where skimming readers give up fastest, especially past the point where the paper stops being new and starts feeling like effort."),
  numberedBold("Close with something the reader can act on immediately,", "a checklist, a scorecard, or a short framework, rather than only a summary of what was covered. A paper that ends with “in conclusion” gives the reader nothing to do next."),
  numberedBold("Publish an ungated companion post alongside the gated PDF.", "A short, open article covering the paper's central argument lets search engines and AI answer engines index and cite the thinking, even while the full document stays behind a form."),

  h3("For Marketing Heads Commissioning a Whitepaper: Where to Start This Week"),
  bulletBold("Pull the download-to-meeting conversion rate on your last whitepaper specifically,", "not just total downloads, since that is the number that actually reflects whether it got read."),
  bulletBold("Time yourself reading only the first page as a cold reader,", "and be honest about whether you'd continue to page two."),
  bulletBold("Check whether your executive summary states a conclusion or only describes a topic.", "This single fix resolves more page-two drop-off than almost anything else on this list."),

  h2("What This Means for Your Business"),
  p("A whitepaper's download count says nothing about whether it gets read. The format itself, a fixed-layout PDF asking for sustained attention, works against most whitepapers before the writing even starts, which makes structure the lever that actually matters: a one-page executive summary that states a conclusion, a visual every two to three pages, and a closing checklist the reader can use immediately. Both of MagicWorks' own live whitepapers were built around exactly that shape, and it shows in how far into each one a reader actually gets."),

  callout(
    "Want a Whitepaper That Gets Read Past Page Two",
    "MagicWorks' Whitepaper Production service is senior-written research built around the structural choices in this article, sold as a one-off project or a quarterly retainer. If the asset you need is closer to a methodology document than a research paper, Playbook Production runs on similar economics.",
    "key-takeaway"
  ),
  linkPara("Explore ", "Whitepaper Production", "/services/brand-research-publishing/whitepaper-production", ", "),
  linkPara("", "Playbook Production", "/services/brand-research-publishing/playbook-production", ", or"),
  linkPara("", "book a discovery call", "/contact", ". We'll look at your current whitepaper or the one you're planning, and give you honest next steps."),

  p("Purva Desai is a Digital Marketing Executive at MagicWorks IT Solutions, Pune, working across SEO, AEO, GEO, brand strategy, and content strategy."),
];

const faq = [
  { _key: k(), question: "Why do B2B whitepapers underperform other content formats?", answer: "Whitepapers currently return roughly $1.40 in value for every $1 spent, compared to $4.60 for long-form blog posts. Much of that gap traces back to the format itself: a fixed-layout PDF is hard to read on mobile, and most whitepapers bury their sharpest finding several pages in rather than leading with it." },
  { _key: k(), question: "Is the download count a good measure of whether a whitepaper is working?", answer: "No. A download is a form fill, not proof of reading. More than half of visitors on mobile are unlikely to ever read a whitepaper after downloading it, largely because of the PDF format itself. Download-to-meeting conversion, not raw download count, is the number worth tracking." },
  { _key: k(), question: "How long should a B2B whitepaper actually be?", answer: "A typical, well-structured whitepaper runs 6 to 12 pages: a one-to-two-page executive summary, four to ten pages of evidence-backed analysis, and three to five closing recommendations. Papers that let the evidence section sprawl past that shape without a visual break are where readers tend to drop off." },
  { _key: k(), question: "Does gating a whitepaper behind a form hurt readership?", answer: "It can, since a gate trades reach for lead capture, and every gate loses some readers who would have engaged with the content otherwise. Publishing a short, ungated companion post covering the paper's central argument alongside the gated PDF lets search engines and AI answer engines index and cite the thinking, even while the full document stays behind a form." },
  { _key: k(), question: "What is the single fastest fix for a whitepaper that isn't getting read past page two?", answer: "Rewrite the executive summary so it states a conclusion instead of describing a topic. A reader who finishes the summary without knowing what the paper actually argues has no reason to continue, and this single fix resolves more early drop-off than most structural changes further into the document." },
  { _key: k(), question: "Should I hire a freelance writer or an agency for a B2B whitepaper?", answer: "It depends on what the paper needs to do. A specialist freelancer with direct subject-matter depth, typically charging $2,500 to $7,000 or more per project, can outperform a generalist agency on a narrow technical topic. An agency's typical 30 to 50% premium over freelance rates buys project management, editorial quality control, and often design and distribution support, which earns its cost when the paper needs to fit into a coordinated content system rather than stand alone. Either way, the writer's understanding of structure matters more than their day rate." },
];

const POST = {
  id: "insight-purva-whitepaper-writing-b2b",
  title: "Whitepaper Writing: Why Most B2B Whitepapers Don't Get Read Past Page Two",
  seoTitle: "Why B2B Whitepapers Stop Getting Read · MagicWorks",
  slug: "whitepaper-writing-why-b2b-whitepapers-dont-get-read",
  excerpt: "Why most B2B whitepapers lose readers after page two, and the structural fixes that keep people reading, with two live MagicWorks examples.",
  publishedAt: "2026-10-06T03:30:00.000Z",
  imagePath: path.join(POST_DIR, "Whitepaper-Writing-B2B.jpg"),
  imageFilename: "whitepaper-writing-b2b-hero.jpg",
  imageAlt: "A B2B whitepaper open to its executive summary page, with a highlighted conclusion statement and a chart breaking up the surrounding text",
  categories: ["digital-marketing"],
  pillar: "brand-research-publishing",
  tags: ["white paper writer", "B2B whitepaper writing", "whitepaper production", "B2B content marketing", "gated content strategy", "playbook production"],
};

if (POST.title.length > 100) throw new Error(`Title too long (${POST.title.length}/100)`);
if (POST.excerpt.length > 155) throw new Error(`Excerpt too long (${POST.excerpt.length}/155)`);
if (POST.seoTitle.length > 60) throw new Error(`SEO title too long (${POST.seoTitle.length}/60)`);

async function main() {
  console.log("\n=== Creating DRAFT: Whitepaper Writing B2B (Purva Desai) ===\n");

  console.log("🔍  Looking up existing author Purva Desai…");
  const author = await client.fetch(
    `*[_type == "teamMember" && (slug.current == "purva-desai" || name == "Purva Desai")][0]{ _id, name }`
  );
  if (!author) {
    console.error("❌  Could not find an existing Purva Desai teamMember record. Aborting — not creating a new one.");
    process.exit(1);
  }
  console.log(`✅  Found author: ${author.name} (${author._id})\n`);

  const existing = await client.fetch(
    `*[_type == "insight" && slug.current == $slug][0]{ _id }`,
    { slug: POST.slug }
  );
  if (existing) {
    console.log(`⏭️   Post already exists (${existing._id}) — skipping.`);
    return;
  }

  if (!fs.existsSync(POST.imagePath)) {
    console.error(`❌  Hero image not found: ${POST.imagePath}`);
    process.exit(1);
  }
  console.log("📤  Uploading hero image…");
  const asset = await client.assets.upload("image", fs.createReadStream(POST.imagePath), {
    filename: POST.imageFilename,
  });
  console.log(`✅  Image uploaded: ${asset._id}`);

  const doc = {
    _id: `drafts.${POST.id}`,
    _type: "insight",
    title: POST.title,
    seoTitle: POST.seoTitle,
    slug: { _type: "slug", current: POST.slug },
    excerpt: POST.excerpt,
    author: { _type: "reference", _ref: author._id },
    publishedAt: POST.publishedAt,
    categories: POST.categories,
    pillar: POST.pillar,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: POST.imageAlt,
    },
    body,
    faq,
    tags: POST.tags,
    isGated: false,
  };

  console.log("💾  Creating DRAFT document…");
  const created = await client.create(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    NOTE: this is a DRAFT — it is not live on the site until published.`);
  console.log(`    To publish: node scripts/publish-draft.mjs ${POST.id}`);

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
