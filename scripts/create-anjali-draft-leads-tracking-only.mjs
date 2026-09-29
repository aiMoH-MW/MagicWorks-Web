/**
 * create-anjali-draft-leads-tracking-only.mjs
 *
 * Creates ONLY Anjali Kalaskar's "The Leads You're Losing to Tracking You Can't See"
 * post in Sanity as a DRAFT (not visible on the live site until promoted).
 *
 * This is a targeted replacement for that one post from create-anjali-blogs-drafts.mjs.
 * That batch script points at a stale image folder (Docs/Blogs/Anjali/5_6334537433966714377)
 * which no longer exists — the content is now under
 * Docs/Blogs/Anjali/Blog_7_TheLeadsYou'reLosingtoTrackingYouCan'tSee/ instead, with a
 * differently-named hero image file. Running the full batch script again would also
 * silently miss/skip its image lookups, AND would recreate stale drafts for posts that
 * are already published (or intentionally discarded, like "Win Before You Spend") — so
 * this script only handles the one post that is actually still pending.
 *
 * Author "author-anjali-kalaskar" is assumed to already exist in Sanity.
 *
 * Run: node scripts/create-anjali-draft-leads-tracking-only.mjs
 * Then: node scripts/publish-draft.mjs insight-anjali-leads-youre-losing-to-tracking
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

const AUTHOR_ID = "author-anjali-kalaskar";
const IMAGE_PATH = path.join(
  __dirname,
  "../../Docs/Blogs/Anjali/Blog_7_TheLeadsYou'reLosingtoTrackingYouCan'tSee/Blog_7_TheLeadsYou'reLosingtoTrackingYouCan'tSee_FeatureImage.jpg"
);

// ── Portable Text helpers (mirrors create-anjali-blogs-drafts.mjs) ──────────
let _k = 0;
let _prefix = "b";
const resetKey = (prefix) => { _k = 0; _prefix = prefix; };
const k = () => `${_prefix}${String(++_k).padStart(3, "0")}`;

const span   = (text, marks = []) => ({ _type: "span", _key: k(), text, marks });
const strong = (text) => span(text, ["strong"]);
const em     = (text) => span(text, ["em"]);
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

function callout(title, body, variant = "key-takeaway", items) {
  const c = { _type: "callout", _key: k(), title, body, variant };
  if (items) c.items = items;
  return c;
}

function linkPara(before, linkText, href, after = "") {
  const lk = k();
  const children = [];
  if (before) children.push(plain(before));
  children.push(linked(linkText, lk));
  if (after) children.push(plain(after));
  return block("normal", children, [{ _key: lk, _type: "link", href }]);
}

// ============================================================
// BLOG 6: The Leads You're Losing to Tracking You Can't See
// ============================================================

resetKey("a6");

const body6 = [
  block("normal", [em("GA4 cross-domain tracking fails quietly and hides real leads. Here is how it breaks, and how to catch it. The biggest risk is the one off your dashboard.")]),

  p("A slow puncture is the worst kind. The tyre looks fine. The car drives fine. Then one morning it is flat, and you realise it had been leaking for days. Broken tracking is a slow puncture. The dashboard looks fine, right up to the moment you learn you have been steering by a bad number."),
  linkPara(
    "This piece is about GA4 cross-domain tracking, and the leads it quietly hides. It comes from the anchor of this series, ",
    "Same War, New Weapons",
    "/blog/same-war-new-weapons",
    ", and from Morgan Housel: the biggest risk is the one you cannot see. Your dashboard feels like the truth. It only shows what it was told to count."
  ),

  block("normal", [strong("The blind spot")]),
  h2("The dashboard only counts what it is told to"),
  p("A report is not reality. It is a record of the events you set up to record. Miss an event, and it simply never appears. There is no error, no warning, no red mark. Just a quiet gap where truth should be. That gap is dangerous because it looks like data. You make confident decisions on numbers that are missing a piece."),

  block("normal", [strong("From the work")]),
  h2("The quarter you cannot see"),
  p("On one account, about a quarter of the leads came in through chat and phone calls, outside the main ads dashboard. Read only the dashboard, and you would undercount the results by a quarter. Worse, you might pause the very campaigns that were driving those calls, because on paper they looked weak."),

  block("normal", [strong("Where GA4 breaks")]),
  h2("How cross-domain tracking quietly fails"),
  p("GA4 cross-domain tracking is meant to follow one person as they move from your ad, to your site, to a checkout or booking page on another domain. When it is set up right, that whole journey stays as one. When it breaks, the same person is counted as two, and the sale on the second domain is never credited to the ad that drove it."),
  p("The damage is not small. When cross-domain tracking fails, session and user counts can inflate by 30 to 50 percent, because every jump between domains starts a fresh visit. Your numbers look busier and convert worse than reality, and both readings are wrong."),
  p("The causes are almost always quiet ones. A domain left off the list. A misconfigured linker. A subdomain treated as a separate site. A cookie banner that allows tracking on one domain and blocks it on another. My favourite trap: a well-meaning script that \"cleans\" URLs and strips the small parameter GA4 uses to stitch the visit together. One team ran that way for two months before anyone noticed the funnel was broken. There is also double counting to watch, where GA4 and Google Ads both record the same conversion and inflate it."),
  p("On one account, cleaning up this kind of cross-domain noise was a single, careful fix. Nothing on the surface had said anything was wrong."),
  block("blockquote", [plain("Broken tracking does not send an alert. It just makes good work look bad, and bad work look fine.")]),

  block("normal", [strong("How it works")]),
  h2("What cross-domain tracking is actually doing"),
  p("To fix it, it helps to see the mechanism. When a visitor moves from one of your domains to another, GA4 has to recognise them as the same person. It does this by passing a small piece of information in the link between the two sites, a stitching parameter you may have seen in a URL as \"_gl\". If that parameter makes the jump, the visit stays whole. If it is dropped, GA4 sees a stranger arriving and starts a brand new session."),
  p("That single dropped parameter is behind most cross-domain problems. Almost everything below is a variation on it."),

  block("normal", [strong("The setup")]),
  h2("Setting it up so it holds"),
  block("normal", [strong("List every domain. "), plain("In your GA4 data stream, add all the domains a visitor crosses. A domain left off the list is a domain that breaks the journey.")], [], "bullet"),
  block("normal", [strong("Check the link carries the parameter. "), plain("Click from one domain to the next and look at the address bar for the stitching parameter. If it is not there, the link is broken.")], [], "bullet"),
  block("normal", [strong("Protect it from scripts. "), plain("Make sure no redirect or URL-cleaning script strips that parameter on the way through.")], [], "bullet"),
  block("normal", [strong("Align consent. "), plain("If a cookie banner blocks tracking on one domain and allows it on another, the chain snaps. The consent choice has to carry across too.")], [], "bullet"),

  block("normal", [strong("The opposite problem")]),
  h2("When one lead is counted twice"),
  p("Broken stitching hides leads. The opposite bug invents them. When GA4 and Google Ads both record the same conversion, or a thank-you page reloads and fires twice, one lead becomes two on the report. You then scale a campaign that looks twice as good as it really is."),
  p("The fix is to decide, once, which tool is the source of truth for each conversion, and to make sure a single action fires a single event. Honest counting cuts both ways: nothing missed, and nothing doubled."),

  block("normal", [strong("Finding the break")]),
  h2("How to debug it in ten minutes"),
  p("You do not need to guess. GA4 and its tools let you watch the data live. Open your site in a debug or preview mode, then walk the exact path a customer takes: ad, to site, to the second domain, to the thank-you page. Watch the realtime view to see whether it stays one session or splits into two."),
  p("If it splits, you have found your leak, and the setup checklist above tells you where to look. Ten minutes of this, once a quarter, is far cheaper than a quarter of decisions made on a broken number."),

  block("normal", [strong("The usual suspects")]),
  h2("What breaks it most often"),
  p("When cross-domain tracking fails, it is nearly always one of a short list. Knowing them turns a mystery into a checklist."),
  block("normal", [strong("A domain left off the list. "), plain("The most common of all. The visit to the unlisted domain simply starts fresh.")], [], "bullet"),
  block("normal", [strong("A redirect or link shortener "), plain("that drops the stitching parameter on the way through.")], [], "bullet"),
  block("normal", [strong("A subdomain mix-up. "), plain("Moving between a subdomain and the main site is not the same as cross-domain, and treating one like the other breaks both.")], [], "bullet"),
  block("normal", [strong("A consent mismatch. "), plain("Tracking allowed on one domain and blocked on the next, so the chain snaps at the border.")], [], "bullet"),
  block("normal", [strong("Privacy and browser limits "), plain("that clear the identifiers tracking leans on, which is why the trend is toward server-side measurement.")], [], "bullet"),
  p("Work down that list and you will find most breaks in minutes. The point is not to memorise the causes. It is to know that a broken funnel almost always has a boring, findable reason, not a mysterious one. The data did not lie to you. Something quietly stopped carrying it across, and it can be found."),

  block("normal", [strong("Why it matters more now")]),
  h2("Privacy made clean tracking harder, and more important"),
  p("This is not getting easier. GA4 now counts everything as events, consent banners can block the very cookies tracking depends on, and privacy rules tighten every year. Each change adds another way for the data to quietly break. That is why more teams are moving measurement server-side in 2026, and why a regular check matters more than it used to. When the ground keeps shifting, the one thing you control is whether you are still measuring honestly."),

  block("normal", [strong("The check")]),
  h2("How to find the leak before it costs you"),
  p("You cannot fix what you cannot see, so the job is to go looking. A short, regular tracking check catches most leaks before they shape a bad decision. The quickest test is to open your site in debug mode, click through to your other domain, and look at the address bar. If the small stitching parameter is not carried across, your journey is broken."),

  callout(
    "A Quick Tracking Check",
    "Run through this before you trust the dashboard:",
    "info",
    [
      "Every conversion action fires, and you have tested it yourself",
      "Leads from chat and phone are counted, not just form fills",
      "Cross-domain journeys stay intact, no breaks or double counts",
      "Every domain is listed, and no cookie banner or script is stripping the link",
      "The totals roughly match what the business actually received",
    ]
  ),

  linkPara(
    "This is the setup work from ",
    "Win Before You Spend",
    "/blog/win-before-you-spend",
    ", taken one level deeper. Decide what counts, then keep checking that it still counts."
  ),

  p("The habit that protects you is a small one. Once a quarter, walk your own funnel like a customer and watch the data follow along behind you. It takes ten minutes, and it catches the slow puncture while it is still small and cheap to fix. Every confident decision you make rests on these numbers. Spend the ten minutes making sure they are telling you the truth."),

  callout(
    "Download: Tracking-Hygiene Checklist",
    "The full version of the check above, to run before every launch and every month after. Free to download, no sign-up.",
    "info"
  ),

  callout(
    "Not Sure Your Numbers Are Honest?",
    "We audit and set up measurement so your dashboard reflects what really happened. Then every other decision rests on solid ground.",
    "cta"
  ),

  block("normal", [strong("Research referenced: "), plain("2026 GA4 cross-domain tracking guides on session inflation, linker and consent misconfigurations, and duplicate conversions.")]),

  linkPara(
    "Part of the ",
    "Same War, New Weapons",
    "/blog/same-war-new-weapons",
    " series on the performance marketing principles that survive every platform update."
  ),
];

const faq6 = [
  {
    _key: k(),
    question: "How much can GA4 session and user counts inflate when cross-domain tracking breaks?",
    answer: "When cross-domain tracking fails, session and user counts can inflate by 30 to 50 percent, because every jump between domains starts a fresh visit instead of continuing the same one. Your numbers look busier and convert worse than reality, and both readings are wrong.",
  },
  {
    _key: k(),
    question: "What is the most common cause of broken GA4 cross-domain tracking?",
    answer: "A domain left off the data stream's domain list is the most common cause. Other frequent causes include a redirect or link shortener stripping the linker parameter, a subdomain mistaken for a separate domain, and a cookie consent mismatch between the two domains.",
  },
  {
    _key: k(),
    question: "How do I check in ten minutes whether my cross-domain tracking is actually working?",
    answer: "Open your site in GA4 debug or preview mode, then walk the exact path a customer takes from ad to site to the second domain to the thank-you page, watching the realtime view. If the journey splits into two sessions instead of staying one, you have found the leak.",
  },
  {
    _key: k(),
    question: "Can tracking also double-count a single lead instead of losing it?",
    answer: "Yes. When GA4 and Google Ads both record the same conversion, or a thank-you page reloads and fires twice, one real lead becomes two on the report, and you can end up scaling a campaign that only looks twice as good as it really is. The fix is deciding, once, which tool is the source of truth for each conversion.",
  },
];

const POST = {
  slug: "leads-youre-losing-to-tracking",
  title: "The Leads You're Losing to Tracking You Can't See",
  seoTitle: "GA4 Cross-Domain Tracking: Leads You're Losing",
  excerpt: "GA4 cross-domain tracking breaks quietly, hiding real leads and inflating counts by 30 to 50 percent. Here is a fast check to catch the leak early.",
  publishedAt: "2026-09-09T09:00:00.000Z",
  imageAlt: "Hero graphic titled 'Your dashboard looks fine, your data isn't,' showing a magnifying glass over game pieces with reported leads, untracked leads, and data lost stats",
  tags: [
    "ga4 cross domain tracking",
    "cross domain tracking setup ga4",
    "ga4 linker parameter _gl",
    "duplicate conversion tracking fix",
    "session inflation ga4 cross domain",
    "server side tracking measurement 2026",
  ],
  body: body6,
  faq: faq6,
};

async function main() {
  console.log("\n=== Creating Anjali Kalaskar draft: Leads You're Losing to Tracking ===\n");

  if (!fs.existsSync(IMAGE_PATH)) {
    console.error(`❌  Missing hero image: ${IMAGE_PATH}`);
    process.exit(1);
  }

  console.log(`📤  Uploading hero image…`);
  const asset = await client.assets.upload("image", fs.createReadStream(IMAGE_PATH), {
    filename: path.basename(IMAGE_PATH),
  });
  console.log(`✅  Image uploaded: ${asset._id}`);

  const draftId = `drafts.insight-anjali-${POST.slug}`;

  const doc = {
    _id: draftId,
    _type: "insight",
    title: POST.title,
    seoTitle: POST.seoTitle,
    slug: { _type: "slug", current: POST.slug },
    excerpt: POST.excerpt,
    author: { _type: "reference", _ref: AUTHOR_ID },
    publishedAt: POST.publishedAt,
    categories: ["digital-marketing"],
    pillar: "digital-marketing",
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: POST.imageAlt,
    },
    body: POST.body,
    faq: POST.faq,
    tags: POST.tags,
    isGated: false,
  };

  console.log("💾  Creating draft document…");
  const doc_ = await client.createOrReplace(doc);
  console.log(`✅  Draft created: ${doc_._id}`);

  console.log(
    "\nTo publish it live, run:\n" +
      "  node scripts/publish-draft.mjs insight-anjali-leads-youre-losing-to-tracking\n"
  );
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
