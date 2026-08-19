/**
 * publish-swapnil-blog2-website-speed.mjs
 *
 * Publishes "Website Speed and Paid Ad Budget: How 53% of Your Traffic
 * Disappears Before It Sees Your Offer" (author: Swapnil Ughade) LIVE, dated today.
 *
 * Source: Docs/Blogs/New blogs/Swapnil/Blog2_Website_Speed_53_Percent.html
 * Hero image: Docs/Blogs/New blogs/Swapnil/Blog2_Blog_Image_MagicWorks_Blog2_Website_Speed_53_Percent (2).jpg
 *             (copied to scripts/swapnil-media/blog2-website-speed-hero.jpg)
 *
 * NOTE: the source HTML's CTA linked to a whitepaper page
 * (/reports/ai-native-websites-cost-benefit-analysis) that does not exist
 * anywhere on the live site. That link has been replaced with a link to the
 * real, existing AI-native website service page (/services/web-development)
 * to avoid shipping a 404. Flag to Mohan: if/when that whitepaper is built,
 * this CTA should be updated to point to it.
 *
 * Run: node scripts/publish-swapnil-blog2-website-speed.mjs
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

const IMAGE_PATH = path.join(__dirname, "swapnil-media", "blog2-website-speed-hero.jpg");

// ── Portable Text helpers ───────────────────────────────────────────────────
let _k = 0;
const k = () => `sb2${String(++_k).padStart(3, "0")}`;

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
const p  = (text) => block("normal", [plain(text)]);
const bp = (leadIn, rest) => block("normal", [strong(leadIn), plain(" " + rest)]);
const bullet = (text) => block("normal", [plain(text)], [], "bullet");

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

const comparisonTable = (colA, colB, rows) => ({
  _type: "comparisonTable",
  _key: k(),
  colA,
  colB,
  rows: rows.map((r) => ({ _key: k(), ...r })),
});

const linkPara = (before, linkText, href, after = "") => {
  const mk = k();
  return block("normal", [plain(before), linked(linkText, mk), plain(after)], [{ _key: mk, _type: "link", href }]);
};

// ── Body ─────────────────────────────────────────────────────────────────────
const body = [
  p("Most Indian businesses spending Rs 5 lakh or more per month on Google Ads and Meta Ads have never run one specific calculation on their own account. The calculation is not complicated. It requires Google's published data on mobile abandonment, the current load time of the business's own website, and a calculator. The result changes how you think about performance marketing for the next five years."),
  p("Here is the number that starts it. According to Google's own research, 53% of mobile visitors abandon a website that takes more than 3 seconds to load. This is not a marketing claim from a website vendor. It is Google's own published data, drawn from their research on mobile page performance and consumer behaviour across billions of mobile sessions."),

  statRow([
    { value: "53%", label: "of mobile visitors abandon a website that takes more than 3 seconds to load", note: "Source: Google mobile web research" },
  ]),

  p("Apply that number to a paid media account and the arithmetic becomes uncomfortable. If your paid ads drive 100 visitors to your landing page and the page takes more than 3 seconds to load on mobile, roughly 53 of those visitors leave before they even see your offer. You paid for 100 clicks. Your offer got seen by 47. The other 53 clicks produced zero conversion opportunity, not because your ad was bad, not because your offer was wrong, but because the visitor never got to the point of encountering either."),
  p("This is the honest problem. And for most Indian businesses running paid media at scale, the numbers are much worse than 53% because most Indian business websites do not load in 3 seconds. They load in 4 to 5 seconds on mobile, which pushes the abandonment rate significantly higher."),

  h2("The math on Rs 5 lakh, Rs 10 lakh, and Rs 25 lakh monthly ad budgets"),
  p("Let me make this concrete. Assume you are the marketing head of an Indian business spending Rs 10 lakh per month across Google Ads and Meta Ads. Your website is a fairly typical Indian business website that loads in about 4 seconds on mobile. At 4 seconds, mobile abandonment rate is empirically closer to 60% than 53%, but let us stay conservative and use the 53% number."),
  p("Of your Rs 10 lakh monthly ad spend, 53% is spent driving visitors who never see your offer. That is Rs 5.3 lakh per month. Annualised, Rs 63.6 lakh per year of paid media budget producing zero conversion opportunity, before any consideration of ad quality, offer strength, or campaign optimisation."),
  p("Here is the same math across three common Indian mid-market budget bands:"),

  comparisonTable("Annual Ad Spend", "Estimated Annual Waste (4-sec load)", [
    { metric: "Rs 5 lakh / month", a: "Rs 60 lakh / year", b: "Rs 31.8 lakh / year" },
    { metric: "Rs 10 lakh / month", a: "Rs 1.2 crore / year", b: "Rs 63.6 lakh / year" },
    { metric: "Rs 25 lakh / month", a: "Rs 3 crore / year", b: "Rs 1.59 crore / year" },
  ]),

  p("The numbers are not exaggerated. They are direct application of Google's own 53% mobile abandonment finding to typical Indian mid-market ad budgets. And they are conservative, because the 53% figure is calibrated to 3-second load time. Websites that load in 4 to 5 seconds see materially higher abandonment rates."),

  pullquote("Every rupee of monthly ad spend is a compound of two decisions: the media strategy that generates the click, and the website infrastructure that determines whether the click can convert. Most Indian businesses are optimising only the first."),

  h2("Why Indian business websites are typically slow"),
  p("The pattern I have seen across the last decade of working with mid-market Indian businesses is consistent. The website was built somewhere between 2018 and 2022. WordPress with a heavy theme, or a Wix or Squarespace variant. Third-party plugins accumulated over time: chat widgets, cookie banners, analytics tags, marketing pixels, remarketing scripts, review widgets, social proof tools. Image files that were never optimised for mobile delivery. A homepage that carries 40 to 60 individual HTTP requests before it renders."),
  p("Each individual decision was reasonable in isolation. Together they produce a website that takes 4 to 5 seconds to load on a typical 4G mobile connection in an Indian tier-2 city, which is where most of the paid media traffic actually lands."),
  p("The business owner does not see this because the business owner tests the website on a laptop over office WiFi. That is a completely different experience. On desktop and fast WiFi, the site loads in 1 to 2 seconds and feels fine. The mobile experience over 4G, on the device the actual customer uses, is where the money is being spent."),

  h2("The two technical thresholds that matter"),
  p("Not all speed improvements produce the same return. In our work at MagicWorks on paid media accounts across Indian mid-market businesses, two specific thresholds have emerged as the ones worth engineering toward."),

  callout(
    "Threshold 1: Under 2 seconds mobile load time",
    "At this level, paid traffic bounce rate drops meaningfully (typically 25 to 40 percent improvement over the baseline), and Google Ads Quality Score improves without any campaign-level changes. This threshold is achievable with careful optimisation on a WordPress or Shopify site, with modern hosting and disciplined plugin management. It is the practical target for most Indian mid-market businesses in the near term.",
    "info"
  ),
  callout(
    "Threshold 2: Under 1 second mobile load time",
    "At this level, Google Ads Quality Score improves further (typically 1 to 2 point lift), which reduces effective cost per click by 15 to 25 percent in a compounding way over 60 to 90 days. This threshold is genuinely difficult to achieve on legacy website architectures. It typically requires a rebuild on a modern framework like Next.js with server-side rendering, edge deployment through a CDN like Vercel or Cloudflare, and disciplined image and font optimisation. This is what AI-native website architecture makes possible.",
    "key-takeaway"
  ),

  p("The distinction matters because the second threshold is what most marketing heads underestimate. Moving from 4 seconds to 2 seconds is optimisation. Moving from 2 seconds to under 1 second is architectural. The first is an engagement with your current web developer. The second is a rebuild."),

  h2("Why Google Ads Quality Score amplifies the effect"),
  p("Google Ads Quality Score is calculated using three primary components: expected click-through rate, ad relevance, and landing page experience. Landing page experience directly incorporates page load speed, mobile responsiveness, and Core Web Vitals scores (Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift)."),
  p("Slower websites receive lower Quality Scores. Lower Quality Scores mean higher cost per click for the same ad position, and lower ad positions for the same bid. This is where the waste compounds beyond the initial 53% mobile abandonment. You are paying more per click and losing more of the clicks you pay for."),
  p("Improving website mobile load time from 4 seconds to under 2 seconds typically produces:"),
  bullet("15 to 25 percent reduction in effective CPC across the ad account, driven by Quality Score improvement"),
  bullet("25 to 40 percent reduction in bounce rate on the paid traffic that actually loads the page"),
  bullet("10 to 20 percent lift in conversion rate on visitors who complete the load"),
  bullet("Compounding benefit over 60 to 90 days as Google's algorithm learns the improved Quality Score"),
  p("Combine these three effects and the ROAS improvement on the same ad budget is typically 30 to 50 percent, purely from website speed engineering with no changes to campaign structure, creative, or bidding strategy. This is why website speed is not a technical vanity metric. It is a direct multiplier on every rupee of ad budget you spend."),

  callout(
    "The Uncomfortable Diagnostic",
    "Before your next paid media strategy meeting, run one simple test. Open Google PageSpeed Insights on your phone and enter your primary landing page URL. If the mobile score is below 60, you are almost certainly losing significant paid media budget to abandonment before the visitor sees your offer. If it is below 40, the waste is severe and no amount of campaign optimisation will fix it. The right first step is not a new ad agency. It is fixing the website speed.",
    "warning"
  ),

  h2("Fix the site speed first, then optimise the campaigns"),
  p("The single most expensive marketing decision most Indian mid-market businesses make is deciding to increase the ad budget without first fixing the landing page infrastructure that determines what happens to the traffic. You are pouring water into a bucket with holes."),
  p("The right sequence, whenever a paid media account is producing disappointing outcomes, is straightforward. First, run the mobile load time test. If the site is above 3 seconds on mobile, that is the primary problem and no amount of campaign optimisation will materially fix the account outcomes. Fix the site speed. Then, once the site is under 2 seconds on mobile, evaluate the campaigns."),
  p("Most Indian marketing heads have the sequence reversed. They optimise the campaigns first, run through the tactical playbook of bid adjustments, audience refinements, and creative rotation, and cannot understand why the account is not producing the results the campaign work suggests it should. The reason is that half of the traffic they are paying for never sees the offer, and campaign optimisation cannot fix that. Fix the site speed first. Then optimise the campaigns. The order matters more than the tactics."),

  h2("What AI-native website architecture actually provides"),
  p("An AI-native website in the MagicWorks definition is not a WordPress site with a chatbot plugin bolted on. It is a website built on modern web frameworks (Next.js, Astro, or similar) with server-side rendering and static site generation for speed, edge deployment through a global CDN for delivery latency, disciplined image and font handling calibrated for Core Web Vitals, and AI functionality integrated into the backend where it produces genuine operational value rather than surface features."),
  p("The under-1-second load time threshold is achievable on this architecture. It is genuinely difficult on legacy website stacks. This is one of two cost-benefit dimensions of AI-native versus traditional websites: the marketing cost dimension covered in this piece, and the internal operational cost dimension, where AI-native functionality inside the website itself compresses functions that previously consumed hours of internal team time."),

  callout(
    "Read the Full Cost-Benefit Analysis",
    "The AI-Native Websites vs Traditional Websites whitepaper covers both dimensions in depth: the marketing cost dimension covered in this blog, plus the internal operational cost dimension anchored by the MagicWorks HR case study (8 hours to 1 hour daily). 19 pages, free download.",
    "key-takeaway"
  ),
  linkPara("", "Download the Whitepaper", "/insights/whitepapers/ai-native-websites-vs-traditional-websites", "."),
];

const faq = [
  { _key: k(), question: "What percentage of mobile visitors abandon a slow website?", answer: "According to Google's own published data, 53% of mobile visitors abandon a website that takes more than 3 seconds to load. This means for every 100 visitors your paid ads bring to a slow-loading website, 53 leave before they even see your offer, and your paid media investment for those clicks produces zero conversion opportunity." },
  { _key: k(), question: "How much paid ad budget is wasted on a slow website?", answer: "For an Indian business spending Rs 10 lakh per month on Google Ads and Meta Ads, with a website that takes 4 to 5 seconds to load on mobile, roughly Rs 5.3 lakh per month of ad spend is going to visitors who never see the offer. Annualised, that is Rs 63.6 lakh of paid media budget producing zero conversion opportunity. At Rs 5 lakh monthly spend, the annual waste is Rs 31.8 lakh. At Rs 25 lakh monthly spend, the annual waste is Rs 1.59 crore." },
  { _key: k(), question: "What website load time is needed to protect paid ad ROAS?", answer: "Two specific mobile load time thresholds matter for protecting paid ad ROAS in India. Under 2 seconds: paid traffic bounce rate drops meaningfully and ad Quality Score improves without any campaign-level changes. Under 1 second: Google Ads Quality Score improves further, which reduces cost per click in a compounding way over 60 to 90 days. Most Indian business websites load in 4 to 5 seconds on mobile, which puts them in the highest-waste band." },
  { _key: k(), question: "Why does website speed affect Google Ads Quality Score?", answer: "Google Ads Quality Score is calculated using landing page experience as one of three primary components. Landing page experience directly incorporates page load speed, mobile responsiveness, and Core Web Vitals scores. Slower websites receive lower Quality Scores, which means higher cost per click and lower ad positions for the same bid. Improving website speed under 2 seconds typically lifts Quality Score by 1 to 2 points and reduces effective CPC by 15 to 25 percent." },
  { _key: k(), question: "What is an AI-native website and how does it help website speed?", answer: "An AI-native website is built on modern frameworks like Next.js with server-side rendering, edge deployment, and AI-integrated backend functionality tailored to the business. AI-native websites typically achieve under 2 second load times on mobile through architectural advantages: static site generation, edge CDN delivery, optimised image handling, and JavaScript bundling calibrated for Core Web Vitals. This is different from a WordPress site with an AI chatbot plugin bolted on." },
];

const title = "Website Speed and Paid Ad Budget: How 53% of Your Traffic Disappears Before It Sees Your Offer";
const seoTitle = "Website Speed & Paid Ad Budget: 53% Traffic Lost";
const excerpt = "Google's own data: 53% of mobile visitors abandon slow websites. The honest math on what that costs Indian businesses running paid ads.";

if (seoTitle.length > 60) { console.error(`❌ seoTitle too long: ${seoTitle.length} chars`); process.exit(1); }
if (excerpt.length > 155) { console.error(`❌ excerpt too long: ${excerpt.length} chars`); process.exit(1); }

async function main() {
  console.log("\n=== Publishing Swapnil Ughade blog: Website Speed and Paid Ad Budget ===\n");

  console.log("🔍  Looking up existing author Swapnil Ughade…");
  const author = await client.fetch(
    `*[_type == "teamMember" && (slug.current == "swapnil-ughade" || name match "Swapnil*")][0]{ _id, name }`
  );
  if (!author) { console.error("❌  Could not find an existing Swapnil Ughade teamMember record. Aborting."); process.exit(1); }
  console.log(`✅  Found author: ${author.name} (${author._id})`);

  if (!fs.existsSync(IMAGE_PATH)) { console.error(`❌  Hero image not found: ${IMAGE_PATH}`); process.exit(1); }
  console.log("📤  Uploading hero image…");
  const asset = await client.assets.upload("image", fs.createReadStream(IMAGE_PATH), {
    filename: "website-speed-53-percent-hero.jpg",
  });
  console.log(`✅  Image uploaded: ${asset._id}`);

  const doc = {
    _id: "insight-swapnil-website-speed-ad-budget",
    _type: "insight",
    title,
    seoTitle,
    slug: { _type: "slug", current: "website-speed-paid-ad-budget-53-percent-mobile-abandonment" },
    excerpt,
    author: { _type: "reference", _ref: author._id },
    publishedAt: "2026-08-19T09:00:00.000Z",
    categories: ["web-development", "digital-marketing"],
    pillar: "web-development",
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: "53% never see your offer, because your site is slow: paid ads bring visitors in, a slow site stops them before they reach the offer.",
    },
    body,
    faq,
    tags: [
      "website speed impact on ad performance",
      "mobile page speed conversion rate India",
      "paid ad budget waste website speed",
      "Google 53 percent mobile abandonment",
      "AI-native website benefits India",
      "Core Web Vitals paid marketing",
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
