/**
 * create-purva-draft-gbp-multi-location.mjs
 *
 * Creates "Google Business Profile for Multi-Location Businesses in India:
 * What Actually Works in 2026" (author: Purva Desai, existing author record)
 * in Sanity as a DRAFT ONLY (not visible on the live site until promoted).
 *
 * Source: Docs/Blogs/Purva/Google-Business-Profile-Multi-Location-Businesses-India/
 *   - Google-Business-Profile-Multi-Location-Businesses-India.docx / .pdf  (article content)
 *   - Google-Business-Profile-Multi-Location-Businesses-India.jpg         (cover image)
 *
 * This script ONLY creates a draft. It does not publish. Scheduled for
 * Tuesday 22 Sep 2026 — promote it that day (or whenever ready) with:
 *   node scripts/publish-draft.mjs insight-purva-gbp-multi-location-india
 *
 * Run: node scripts/create-purva-draft-gbp-multi-location.mjs
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
  "Google-Business-Profile-Multi-Location-Businesses-India"
);

// ── Portable Text helpers ────────────────────────────────────────────────
let _k = 0;
const _prefix = "pvgbp";
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
const numbered = (text) => block("normal", [plain(text)], [], "number");
const numberedBold = (leadIn, rest) => block("normal", [strong(leadIn), plain(" " + rest)], [], "number");

const linkPara = (before, linkText, href, after = "") => {
  const mk = k();
  return block("normal", [plain(before), linked(linkText, mk), plain(after)], [{ _key: mk, _type: "link", href }]);
};

const callout = (title, bodyText, variant = "key-takeaway") => ({ _type: "callout", _key: k(), title, body: bodyText, variant });

// ══════════════════════════════════════════════════════════════════════════
// BODY
// ══════════════════════════════════════════════════════════════════════════
const body = [
  p("Eight branches. One converts well, three limp along, and four are effectively invisible on Google Maps, even though every branch sells the same thing, follows the same brand standard, and has the same head office behind it. That pattern is the norm for multi-location businesses in India, not the exception, and it rarely comes down to one branch trying less hard than another. It comes down to Google Business Profile being managed as ten separate, disconnected listings instead of one coordinated local search programme."),
  p("That distinction is the entire premise of this article. A single-location business can get away with treating GBP optimisation as a one-time setup task. A multi-location business cannot, because every inconsistency between locations becomes a signal search engines and customers both notice."),

  h2("Why Multi-Location GBP Is Its Own Discipline, Not Ten Single Listings"),
  p("Nearly 43% of multi-location brands maintain inconsistent profile data across their locations (New Media, 2026), a name spelled slightly differently at one branch, a phone number updated at head office but never changed on the listing, an address formatted one way on three profiles and another way on the rest. None of these look like serious problems in isolation. Together, they are a direct signal to Google that the business behind these listings is not being actively maintained, which works against every location at once."),
  p("Consistent NAP, name, address, and phone number, across every location listing is widely cited as one of the highest-return fixes available to a multi-location brand, with industry benchmark estimates putting the ranking impact at roughly a 31% boost from consistency alone (2026 local SEO benchmark data, cited via Nadernejad Media). Treat that specific figure as directional rather than a guaranteed result for any one business, since the underlying study methodology is not independently published, but the direction matches what shows up consistently in local SEO practice: fragmented data actively works against locations that would otherwise rank well on their own merits."),
  p("The other half of the pattern is simpler and more common still. Around 39% of local business profiles carry outdated hours, phone numbers, or address details at any given time (New Media, 2026), which for a single location is a minor inconvenience and for a ten-location chain multiplies into a customer experience problem at scale, someone driving to a branch that closed an hour earlier than the listing claims."),

  h2("The India-Specific Wrinkles Generic GBP Advice Misses"),
  p("Most Google Business Profile guides are written with a single-country, single-language market in mind. Indian multi-location businesses run into a specific set of friction points that generic advice does not cover."),
  bulletBold("Verification.", "Postcard verification remains available but can be genuinely unreliable across Indian addresses, particularly for newer locations, business parks, or addresses without clear street numbering. Video verification, a short one-to-three-minute recording showing the business exterior, visible signage, and proof of physical presence at the address, has become the more dependable route for many Indian businesses opening new locations (Rajesh R Nair, 2026). For a chain opening multiple branches in a short window, planning for video verification from the start avoids weeks of delay per location."),
  bulletBold("Regional language reviews.", "A meaningful share of genuine customer reviews for Indian businesses arrive in Hindi, Marathi, or other regional languages rather than English. A review response process built only for English-language reviews misses a real slice of the conversation happening on your own listings, and Google's local ranking systems weight review recency and response quality regardless of the language the review was written in."),
  bulletBold("Festival-season activity.", "Posting cadence matters more around Diwali, Navratri, and regional festivals than at any other point in the year, both because search volume for many categories spikes and because an inactive profile during a high-intent shopping window looks worse by comparison than the same inactivity in a quieter month."),
  bulletBold("Lunch-break and regional hours.", "Many Indian businesses, particularly in retail and food service, close for a midday break that a generic hours template does not account for. A profile showing “open” during an actual lunch closure creates exactly the kind of customer friction a well-managed GBP programme exists to prevent."),

  h2("What Actually Drives the Local Pack in 2026"),
  p("Local intent now accounts for a substantial share of all Google searches, with roughly 46% of queries in 2026 carrying some form of local intent (SQ Magazine, 2026, updated report). Of that local search volume, an estimated 42% of clicks go to the top three results in the local pack, with roughly three-quarters of all Google Maps clicks going to those same top three positions (SQ Magazine, 2026). Treat these as directional industry figures from an aggregated report rather than an independently verified study, but the underlying pattern, that the local pack is a narrow, high-stakes shortlist rather than a broad results page, is consistent with how local search behaves in practice."),
  p("Verification and profile completeness sit at the foundation of that shortlist. An analysis of large global brands across more than thirty industries found that verification is now treated as a baseline requirement rather than a differentiator, with 76% of profiles in the study already verified (Birdeye, State of Google Business Profile 2026 report). For a business still working through verification delays across its Indian locations, this is the reminder that competitors have largely cleared this bar already, making it a precondition for competing rather than a point of advantage on its own."),

  h2("The Centralisation Problem: One Team, One Dashboard, Every Location"),
  p("The businesses that manage multi-location GBP well share one structural habit: a single team, or a single accountable person, owns every location's profile from one dashboard, rather than leaving each branch manager to update their own listing independently. This does not mean every location looks identical. It means every location starts from the same verified NAP record, the same category decisions, and the same review-response standard, with only the genuinely local details, specific services offered, local landmarks in the description, festival-specific posts, varying branch by branch."),
  p("A centralised approach also makes reporting possible in a way branch-by-branch management never allows. Performance needs to be tracked location by location, not as a single blended average, since a blended number can easily hide three high-performing branches masking four that are quietly losing visibility."),

  h2("What Actually Fixes This: 10 Actions in Order"),
  numberedBold("Build a master NAP record", "for the business, then audit every existing location listing against it, correcting any variation in name, address format, or phone number."),
  numberedBold("Verify or re-verify every location individually.", "Use video verification where postcard delivery has proven unreliable for a given address or region."),
  numberedBold("Standardise category selection", "across all locations, using the same primary category chosen deliberately, not whatever a branch manager selected by default when the listing was first created."),
  numberedBold("Localise service descriptions rather than duplicating them.", "Each location's profile should mention what that specific branch offers, without copying identical text across every listing, which both looks generic to customers and can read as low-effort to Google."),
  numberedBold("Set a review-response service standard", "that applies to every location, a maximum response time and a tone guide, covering regional-language reviews as deliberately as English-language ones."),
  numberedBold("Run photo and post cadence from a shared content calendar,", "including festival-specific posts timed to Diwali, Navratri, and other regionally relevant dates, so no location goes quiet during a high-intent period."),
  numberedBold("Monitor for duplicate or fake listings", "at each address, since multi-location businesses are a common target for old, unclaimed, or duplicate profiles that split local ranking signals."),
  numberedBold("Track rankings and profile views per location,", "not only as a company-wide average, so an underperforming branch is visible before it becomes a pattern."),
  numberedBold("Link each Google Business Profile", "to a matching, location-specific page on your website, rather than sending every listing to the same generic homepage."),
  numberedBold("Re-audit the entire set of profiles quarterly,", "and immediately whenever a location opens, closes, or changes its hours, address, or phone number."),

  h3("For Marketing Heads and Franchise or Ops Leaders: Where to Start This Week"),
  p("The full list above is a quarter's worth of work done properly. Three places to start immediately:"),
  bulletBold("Pull up every location's profile side by side", "and check name, address, and phone number character by character against a single master record. This single exercise usually surfaces the fastest, highest-confidence fixes available."),
  bulletBold("Check the “hours” field on every profile", "against actual branch hours, including lunch breaks and regional holiday closures, since this is the detail most likely to frustrate a customer who trusted the listing."),
  bulletBold("Assign one named person to own GBP across all locations,", "even if the actual posting work stays distributed, so no location's profile goes unmanaged simply because no one was clearly responsible for it."),

  h2("What This Means for Your Business"),
  p("Multi-location Google Business Profile management works when it is run as one coordinated programme rather than ten independent listings. Start with NAP consistency and verification, since those are the baseline every competing profile has likely already cleared. Build in the India-specific details, video verification, regional-language review responses, festival-timed posting, that generic GBP advice consistently misses. Then centralise ownership and reporting so an underperforming location is visible long before it becomes an invisible one."),

  callout(
    "Want This Managed Properly Across Every Location",
    "MagicWorks' GMB Optimisation service handles listings, reviews, posts, Q&A, and local-pack ranking for multi-location Indian businesses, sold on its own or folded into a full SEO / AEO retainer.",
    "key-takeaway"
  ),
  linkPara("Explore ", "GMB Optimisation", "/services/digital-marketing/gmb-optimisation", ", fold it into a full "),
  linkPara("", "SEO / AEO", "/services/digital-marketing/seo-aeo", " retainer, or"),
  linkPara("", "book a discovery call", "/contact", ". We'll look at your locations and give you honest next steps."),

  p("Purva Desai is a Digital Marketing Executive at MagicWorks IT Solutions, Pune, working across SEO, AEO, GEO, brand strategy, and content strategy."),
];

const faq = [
  { _key: k(), question: "Is managing ten Google Business Profiles just ten times the work of managing one?", answer: "No. Multi-location Google Business Profile management is a different discipline, centred on consistency across listings rather than depth on any single one: a shared NAP record, a common category strategy, a review-response process every location follows, and reporting that shows performance location by location, not just as a blended average." },
  { _key: k(), question: "What is the single biggest mistake multi-location businesses make with Google Business Profile?", answer: "Inconsistent business information across locations, a name spelled differently, a phone number that changed at one branch but not in the listing, an address format that varies from one profile to the next. This inconsistency is common among multi-location brands and directly undermines the local ranking signals every location depends on." },
  { _key: k(), question: "How does Google Business Profile verification work for businesses in India specifically?", answer: "Postcard verification exists but can be slow and unreliable for many Indian addresses. Video verification, a short recording showing the business exterior, signage, and proof of physical presence, has become the more dependable option for many Indian businesses, particularly newer locations or ones in areas without clear street-level signage." },
  { _key: k(), question: "Should each location have its own Google Business Profile, or one shared profile?", answer: "Each physical location that serves customers independently should have its own profile, verified separately and tied to its own address. A single shared profile for multiple locations confuses both Google's local ranking systems and customers trying to find the branch nearest them, and can put the listing at risk of suspension." },
  { _key: k(), question: "How often should a multi-location business audit its Google Business Profiles?", answer: "Quarterly at minimum, plus immediately after any location opens, closes, changes hours, or changes its phone number or address. Profiles left unmanaged for more than about a month without a new photo or post can start to see measurable declines in impressions, since Google's local ranking increasingly weights how current a profile looks." },
];

const POST = {
  id: "insight-purva-gbp-multi-location-india",
  title: "Google Business Profile for Multi-Location Businesses in India: What Actually Works in 2026",
  seoTitle: "Multi-Location Google Business Profile Guide · MagicWorks",
  slug: "google-business-profile-multi-location-businesses-india",
  excerpt: "A practical 2026 guide to managing Google Business Profile across multiple Indian locations: verification, NAP consistency, reviews, and reporting.",
  publishedAt: "2026-09-22T03:30:00.000Z",
  imagePath: path.join(POST_DIR, "Google-Business-Profile-Multi-Location-Businesses-India.jpg"),
  imageFilename: "google-business-profile-multi-location-india-hero.jpg",
  imageAlt: "Map view of multiple Indian storefront locations with Google Business Profile pins, illustrating consistent versus inconsistent listing data across branches",
  categories: ["digital-marketing"],
  pillar: "digital-marketing",
  tags: ["local seo", "local seo services", "google my business optimization", "multi-location SEO India", "GMB optimisation", "google business profile management"],
};

if (POST.title.length > 100) throw new Error(`Title too long (${POST.title.length}/100)`);
if (POST.excerpt.length > 155) throw new Error(`Excerpt too long (${POST.excerpt.length}/155)`);
if (POST.seoTitle.length > 60) throw new Error(`SEO title too long (${POST.seoTitle.length}/60)`);

async function main() {
  console.log("\n=== Creating DRAFT: Google Business Profile Multi-Location (Purva Desai) ===\n");

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
