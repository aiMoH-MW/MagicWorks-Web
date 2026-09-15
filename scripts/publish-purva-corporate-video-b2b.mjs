/**
 * publish-purva-corporate-video-b2b.mjs
 *
 * Publishes 1 new blog post for Purva Desai, LIVE, today (2026-09-15):
 *   "Corporate Video for B2B: What Actually Gets Watched, and What Gets Skipped"
 *
 * Source: Docs/Blogs/Purva/Corporate Video for B2B What Gets Watched · MagicWorks/
 *   - Corporate Video for B2B What Gets Watched · MagicWorks.docx / .pdf   (article content)
 *   - Corporate Video for B2B What Gets Watched · MagicWorks.jpg          (cover image)
 *
 * Looks up the existing Purva Desai teamMember record by slug/name
 * (does NOT create or modify her author record) and reuses whatever
 * _id is found, so this is safe regardless of which script created her.
 *
 * Run: node scripts/publish-purva-corporate-video-b2b.mjs
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

const POST_DIR = path.join(
  __dirname, "..", "..", "Docs", "Blogs", "Purva",
  "Corporate Video for B2B What Gets Watched · MagicWorks"
);

// ── Portable Text helpers (same pattern used across this project) ──────────
let _k = 0;
const _prefix = "pvvid";
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

const linkPara = (before, linkText, href, after = "") => {
  const mk = k();
  return block("normal", [plain(before), linked(linkText, mk), plain(after)], [{ _key: mk, _type: "link", href }]);
};

const callout = (title, body, variant = "key-takeaway") => ({ _type: "callout", _key: k(), title, body, variant });

// ══════════════════════════════════════════════════════════════════════════
// BODY
// ══════════════════════════════════════════════════════════════════════════
const body = [
  p("The three-minute company overview film sits at 4,200 views and 12% average watch time. The forty-five-second product walkthrough, shot on a laptop camera by someone on the product team, sits at 900 views and 71% completion. Only one of those numbers should worry the marketing head who commissioned both."),
  p("That gap is the whole story of B2B corporate video right now. Budgets have gone up, production quality has gone up, and a lot of that spend is going into videos nobody finishes watching. This is the first piece for a pillar we have not written about before, so it starts with the part most B2B teams get wrong before it gets to what actually works."),

  h2("Why Length Decides Whether a B2B Video Gets Watched at All"),
  p("Length is not a stylistic choice. It is the single biggest factor in whether a B2B video gets finished. Vidyard's benchmark data, drawn from close to a million B2B videos, shows videos under one minute complete at 65%, while videos over twenty minutes drop to a 20% completion rate (Levitate Media, 2026, citing Vidyard). The industry has moved accordingly: average B2B video length compressed from 168 seconds in 2016 to 76 seconds today (Whitehat SEO, 2026)."),
  p("That compression is not really about shrinking attention spans. It is about a market correcting for years of videos that spent their first thirty seconds on a logo animation and a mission statement before saying anything a buyer needed. Seventy-one percent of marketers now say the thirty-second to two-minute window is the most effective length for B2B video (Levitate Media, 2026, citing Wyzowl), which is a narrower window than most production briefs still ask for."),

  h2("Where Video Actually Sits in the B2B Buying Journey"),
  p("Video is not primarily an awareness tool anymore, even though most B2B video budgets are still allocated as if it were. Seventy percent of B2B buyers engage with video during their purchase journey, and that engagement concentrates most heavily in the consideration and vendor-evaluation stages, not at the top of the funnel (Pixel8 Production, 2026, citing Vidyard buyer behaviour data). Seventy-two percent of B2B buyers say vendor video content directly influences their shortlist decisions (Pixel8 Production, 2026), meaning a prospect's shortlist is often shaped before your sales team is in the conversation at all."),
  p("The commercial case for getting this right is concrete. Landing pages with embedded video see conversion increases of up to 86% compared to text-only equivalents (Digital Applied, 2026). Treat that as directional rather than guaranteed for any specific page, since the effect size varies by product complexity and audience, but the direction is consistent: video reduces the cognitive load of evaluating something complicated, which is exactly the job a B2B buyer is doing in the consideration stage."),

  h2("What Actually Gets Watched: Format by Funnel Stage"),
  p("A single video trying to serve every stage of the buying journey is usually the reason a good production budget underperforms. What tends to work instead:"),
  bulletBold("Awareness.", "Under ninety seconds, no ask, built to work with the sound off on a feed. The job here is recognition, not conversion, and anything longer than ninety seconds is fighting the platform it lives on."),
  bulletBold("Consideration.", "Three to five minutes, structured around one specific product capability or use case rather than the whole platform. This is where a genuine product walkthrough or a customer explaining a specific outcome earns its length, because the viewer arrived with an actual question they want answered."),
  bulletBold("Decision.", "Testimonial and case-study format, often five to ten minutes, watched by a smaller number of people who are already close to a purchase decision and want the specific proof points a sales conversation alone will not fully cover."),

  h2("Why “SaaS Explainer Video” Searches Often Point Toward the Wrong Format"),
  p("Anyone researching “SaaS explainer video” is usually picturing the same thing: an animated character walking through a product, illustrated icons representing features, a friendly voiceover tying it together. That format exists for a reason. Animation genuinely does a better job of visualising abstract systems, data flows, and multi-step processes that would be difficult or impossible to film, which is why it remains a common choice for early-stage product education."),
  p("But the production data tells a more complicated story than the search term suggests. Live action remains the dominant format B2B video marketers actually produce, at 51%, with animated video at 23% and screen-recorded video at 19% (Levitate Media, 2026, citing Wyzowl). And 96% of B2B buyers say they have watched an explainer video specifically to learn more about a product or service before evaluating it further (widely cited HubSpot survey data, via multiple 2026 industry sources), which means the format question matters less than whether the explainer actually explains the specific thing a buyer showed up wanting to understand."),
  p("For SaaS specifically, product demo videos, usually screen recordings with voiceover and light annotation rather than full animation, carry the highest influence on B2B purchasing decisions of any video type, according to Vidyard's 2025 buyer-behaviour data (via Greenfroglabs, 2026). A real screen recording of the actual product, narrated by someone who understands it, often earns more trust from a technical buyer than a fully animated sequence explaining the same feature in the abstract. Animation still has its place, typically for the parts of a workflow that genuinely cannot be filmed, but it works best layered onto live footage rather than replacing it entirely."),
  p("This is also where it's worth being direct about scope. MagicWorks' Video Retainer is built around recurring, live-action and screen-recorded production, training, explainer content produced as part of an ongoing programme, A-roll and B-roll, and podcast formats, for brands that want a consistent production cadence rather than a single animated piece. If what you actually need is a one-off animated explainer as a standalone deliverable, that is a different kind of engagement than this service is built to deliver, and it's worth knowing that distinction before a brief gets written."),

  h2("Where Corporate Video Budgets Usually Get Skipped Over"),
  p("A handful of patterns show up repeatedly in underperforming B2B video, and each one is fixable once it's named:"),
  bulletBold("The first thirty seconds are spent on brand, not substance.", "A logo animation and a mission statement before the actual content starts is exactly the stretch where B2B viewers drop off fastest. If the viewer cannot tell what they're about to learn within the first ten seconds, most will not stay for the fortieth."),
  bulletBold("One video is asked to do the job of three.", "A single “company overview” video trying to serve awareness, consideration, and decision-stage viewers at once ends up too long for the top of the funnel and too shallow for the bottom. It satisfies nobody fully because it was never built around one viewer's specific question."),
  bulletBold("There is no distribution plan.", "A well-produced video sitting only on a YouTube channel or a website page, with no plan for where it gets shared, on LinkedIn, in outbound email, embedded in a proposal, gets a fraction of the views it could. Production and distribution are two separate budget lines, and treating them as one is where a lot of good footage goes unwatched."),
  bulletBold("It is treated as a one-off.", "A single, expensive production every year or two rarely builds the kind of audience familiarity a recurring cadence does, and the per-video cost is almost always higher when there is no ongoing production relationship to spread setup costs, crew booking, and pre-production time across."),

  h3("For Marketing Heads: Where to Start This Week"),
  bulletBold("Pull the watch-time and completion data on your last five published videos.", "This single check usually reveals which funnel stage your video budget is actually serving, versus which stage you intended it to serve."),
  bulletBold("Pick one funnel stage's video to fix first,", "rather than trying to rebuild the whole video library at once."),
  bulletBold("Check whether any current video runs longer than its funnel stage justifies.", "A consideration-stage explainer padded to match the length of a decision-stage case study is usually losing viewers it did not need to lose."),

  h2("What This Means for Your Business"),
  p("Length is not a production preference, it is close to the single biggest lever for whether a B2B video gets finished at all. Match the format to the funnel stage it is actually meant to serve: short and sound-off-friendly for awareness, focused and specific for consideration, proof-heavy for decision. Then plan for distribution and recurrence, since a video nobody sees and a one-off production that never gets a second instalment both waste the same budget in different ways."),

  callout(
    "Want Video That Gets Watched, Not Just Produced",
    "MagicWorks' Video Retainer service runs recurring monthly video production for established brands, training, explainer, A-roll and B-roll, and podcast formats, built around a cadence rather than a single one-off shoot.",
    "key-takeaway"
  ),
  linkPara("Explore the ", "Video Retainer service", "/services/brand-research-publishing/video-retainer", ", or"),
  linkPara("", "book a discovery call", "/contact", ". Thirty minutes, no obligation. We'll look at what you're currently producing and give you honest next steps."),

  p("Purva Desai is a Digital Marketing Executive at MagicWorks IT Solutions, Pune, working across SEO, AEO, GEO, brand strategy, and content strategy."),
];

const faq = [
  { _key: k(), question: "What length should a B2B corporate video actually be?", answer: "It depends entirely on the funnel stage. Awareness content performs best under ninety seconds. Consideration-stage explainers and product walkthroughs typically run three to five minutes. Decision-stage testimonials and case studies can justify five to ten minutes for the smaller, more committed audience watching them. A single video trying to cover all three stages usually ends up too long for some viewers and too shallow for others." },
  { _key: k(), question: "Does B2B video actually generate leads, or is it mainly a brand-awareness tool?", answer: "Both, depending on where in the funnel it sits. Seventy percent of B2B buyers engage with video specifically during the consideration and evaluation stages of their purchase journey, and 72% say vendor video content influences their shortlist decisions, which is well past pure brand awareness." },
  { _key: k(), question: "Does a corporate video need to be a polished, expensive production to work?", answer: "No. Completion rate correlates far more strongly with length and relevance than with production polish. A rough product walkthrough that answers a specific buyer question in under two minutes often outperforms a highly produced video that takes three minutes to get to the point." },
  { _key: k(), question: "Where should B2B video actually live: LinkedIn, YouTube, or the company website?", answer: "All three, with different formats for each. Short, sound-off-friendly cuts perform on LinkedIn and social feeds. Longer product and case-study content belongs on YouTube and the website, where a viewer has already chosen to spend more time. Distribution plan matters as much as the video itself." },
  { _key: k(), question: "Is a single, high-budget video project enough, or does video need to be ongoing?", answer: "Ongoing tends to outperform one-off. A recurring production cadence builds audience familiarity over multiple touches and typically lowers the per-video cost, since setup and pre-production overhead gets spread across a series rather than repeated from zero each time." },
  { _key: k(), question: "Should a SaaS explainer video be animated or live action?", answer: "Live action is actually the more common format in practice, at 51% of B2B video production versus 23% animated, and screen-recorded product demos carry the highest influence on B2B purchasing decisions of any video type. Animation still earns its place for visualising abstract workflows or data flows that cannot be filmed, but for most SaaS explainer needs, a real screen recording narrated by someone who understands the product performs at least as well as a fully animated sequence, often better, since it reads as more credible to a technical buyer." },
];

const POST = {
  id: "insight-purva-corporate-video-b2b-what-gets-watched",
  title: "Corporate Video for B2B: What Actually Gets Watched, and What Gets Skipped",
  seoTitle: "Corporate Video for B2B: What Gets Watched · MagicWorks",
  slug: "corporate-video-for-b2b-what-gets-watched",
  excerpt: "A practical look at what B2B corporate video actually gets watched versus skipped, and what that means for your next production brief.",
  publishedAt: "2026-09-15T09:00:00.000Z",
  imagePath: path.join(POST_DIR, "Corporate Video for B2B What Gets Watched · MagicWorks.jpg"),
  imageFilename: "corporate-video-for-b2b-what-gets-watched-hero.jpg",
  imageAlt: "Split comparison of a polished three-minute B2B company overview film against a rough forty-five-second product walkthrough, illustrating watch time versus completion rate",
  categories: ["digital-marketing"],
  pillar: "brand-research-publishing",
  tags: ["corporate video production", "B2B video marketing", "video production company", "saas explainer video", "video retainer", "B2B buyer journey video"],
};

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n=== Publishing Purva Desai blog: Corporate Video for B2B ===\n");

  console.log("🔍  Looking up existing author Purva Desai…");
  const author = await client.fetch(
    `*[_type == "teamMember" && (slug.current == "purva-desai" || name == "Purva Desai")][0]{ _id, name }`
  );
  if (!author) {
    console.error("❌  Could not find an existing Purva Desai teamMember record. Aborting — not creating a new one.");
    process.exit(1);
  }
  console.log(`✅  Found author: ${author.name} (${author._id})\n`);

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
    _id: POST.id,
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

  console.log("💾  Creating/updating live document…");
  const created = await client.createOrReplace(doc);
  console.log(`✅  Published: ${created._id}`);
  console.log(`    Live URL: https://magicworksitsolutions.com/blog/${POST.slug}\n`);

  console.log("=== Done ===");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
