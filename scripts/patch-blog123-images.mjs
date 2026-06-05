/**
 * patch-blog123-images.mjs
 *
 * Adds cover images and inline body images to Blog1 (GEO), Blog2 (Google Ads), Blog3 (CEO Framework).
 * Image URLs sourced from the WordPress CDN via wp-json/wp/v2/media API.
 *
 * Run: node scripts/patch-blog123-images.mjs
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

// ── Load .env.local ───────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
if (!fs.existsSync(envPath)) { console.error("❌  .env.local not found"); process.exit(1); }
const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const [k, ...v] = line.split("=");
  if (k?.trim() && v.length) env[k.trim()] = v.join("=").trim().replace(/^['"]|['"]$/g, "");
}

const PROJECT_ID = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const TOKEN      = env.SANITY_API_TOKEN;
if (!PROJECT_ID) { console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID missing"); process.exit(1); }
if (!TOKEN)      { console.error("❌  SANITY_API_TOKEN missing"); process.exit(1); }

const client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: "2024-01-01", token: TOKEN, useCdn: false });

// ── BerqWP CDN wrapper (same as blog4 approach) ───────────────────────────────
const CDN = "https://images.berqwp.com/?domain=magicworksitsolutions.com&w=300&mw=1920&q=90&url=";
const cdn = (url) => CDN + encodeURIComponent(url);

// ── Blog definitions ──────────────────────────────────────────────────────────
const BLOGS = [
  {
    slug: "geo-for-indian-businesses-2026",
    cover: {
      url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/geo-indian-businesses-2026-hero.webp"),
      alt: "Indian business owner reviewing AI search results showing brand citations across ChatGPT, Perplexity, and Google AI Mode in 2026",
    },
    bodyImages: [
      {
        url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/geo-vs-seo-comparison-2026.png.webp"),
        alt: "Side-by-side comparison showing how SEO optimizes for ranking in blue links while GEO optimizes for citations inside AI-generated answers in 2026",
        caption: "GEO and SEO share the same foundation but diverge sharply in execution: SEO rewards backlinks, GEO rewards third-party citations and named authorship.",
        insertAfterPattern: /GEO.{0,30}different.{0,30}SEO|how.{0,20}GEO.{0,20}different|GEO vs SEO|comparison.{0,30}SEO/i,
      },
      {
        url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/ai-citation-sources-2026-youtube-reddit-wikipediaoup.webp"),
        alt: "Bar chart showing the top AI citation sources in 2026: YouTube, Reddit at 10–24% depending on platform, Wikipedia at 47.9% of ChatGPT sources, plus original research and third-party publications",
        caption: "Where AI engines actually find their citations in 2026. Wikipedia dominates ChatGPT; Reddit leads on Perplexity. Your own site is the weakest source.",
        insertAfterPattern: /where do AI engines|citation sources|where.{0,30}AI.{0,30}find|source 1|YouTube.{0,30}video|YouTube and branded/i,
      },
      {
        url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/geo-90-day-action-plan-timeline-indian-businesses.webp"),
        alt: "90-day GEO action plan timeline for Indian SMEs: Days 1–14 visibility audit, Days 15–45 content rebuild, Days 46–75 third-party citation campaign, Days 76–90 measurement setup",
        caption: "The 90-day GEO playbook for Indian SMEs — same framework MagicWorks runs for clients. No enterprise budget required.",
        insertAfterPattern: /90.day GEO action plan|90-day.{0,20}plan|action plan for Indian|days 1 to 14|visibility audit/i,
      },
    ],
  },
  {
    slug: "google-ai-mode-india-advertisers-2026",
    cover: {
      url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/google-ai-mode-india-90-day-plan-2026.webp"),
      alt: "Indian advertiser dashboard showing Google AI Mode and AI Max for Search changes with 90-day preparation timeline for 2026",
    },
    bodyImages: [
      {
        url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/google-ai-overviews-india-january-2026-launch-countries.webp"),
        alt: "Map of countries where Google launched ads in AI Overviews including India, Singapore, Australia, and Canada — ads show above, below, or inside the AI-generated answer with no opt-out available",
        caption: "Google AI Overview ads are now active in India. You cannot opt out. Reporting does not separate AI Overview performance from regular search results.",
        insertAfterPattern: /ads in AI Overviews.{0,60}India|Change 1|AI Overviews.{0,40}available in India|AI Overviews are now/i,
      },
      {
        url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/ai-max-search-independent-testing-results-2026.webp"),
        alt: "Bar chart comparing AI Max for Search performance results across Google internal data (+7%), SMEC agency (+13% revenue), Brainlabs (40% success rate), and Monks Agency (99% of impressions zero conversions) — wide variance in 2026",
        caption: "Independent AI Max testing results show extreme variance. Well-prepared accounts see gains; poorly-prepared accounts see significant damage. The difference is preparation, not luck.",
        insertAfterPattern: /independent.{0,30}data|Does AI Max.{0,30}work|independent testing|SMEC|Monks Agency|Brainlabs/i,
      },
      {
        url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/google-ads-ai-max-90-day-migration-plan-timeline.webp"),
        alt: "13-week Google Ads AI Max migration timeline: Weeks 1–2 audit, Weeks 3–4 voluntary test migration, Weeks 5–6 AI Overview readiness, Weeks 7–8 cross-functional review rhythm, Weeks 9–10 migration strategy, Weeks 11–13 lock in new model",
        caption: "The 90-day Google Ads AI Max preparation plan — structured by week so pipeline impact stays visible throughout.",
        insertAfterPattern: /90.day plan|90-day.{0,20}Google Ads|how to prepare.{0,30}AI Mode|weeks 1 to 2|audit your current/i,
      },
    ],
  },
  {
    slug: "ai-investment-framework-indian-ceos-marketing-sales-2026",
    cover: {
      url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/AI-Investment-Decision-Framework-Hero.webp"),
      alt: "AI investment decision framework for Indian CEOs in 2026 — four-quadrant filter plotting reversibility vs cost magnitude for marketing and sales AI decisions",
    },
    bodyImages: [
      {
        url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/Four-Quadrant-Decision-Filter.webp"),
        alt: "Four-quadrant AI investment filter for Indian CEOs: plots reversibility (high to low) against cost magnitude (low to high). Best first investments are high-reversibility, low-cost, fast time-to-value, operational. Strategic investments with low reversibility and high cost need board-level scrutiny.",
        caption: "The four-quadrant filter every AI investment must pass before a rupee is committed. Reversibility is the most underweighted factor in Indian AI decision-making.",
        insertAfterPattern: /four.quadrant|four filters|four-quadrant|reversibility|the prioriti|plot every/i,
      },
      {
        url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/Indian-AI-Investment-Budget-Tiers.webp"),
        alt: "Three-tier Indian AI investment pyramid: Tier 1 under ₹5 lakh (experimentation), Tier 2 ₹5–50 lakh (integration, where most businesses should operate in 2026), Tier 3 over ₹50 lakh (strategic, board-level, rare)",
        caption: "Indian AI budgets sort into three tiers with fundamentally different discipline required at each level. Most businesses serious about AI in 2026 should be operating at Tier 2.",
        insertAfterPattern: /investment order|three tiers|three budget tiers|Tier 1|under.{0,15}5 lakh|experimentation layer/i,
      },
      {
        url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/48-to-12-AI-Shutdown-Discipline.webp"),
        alt: "Visual showing MagicWorks built 48 AI agents, shut down 36, and the remaining 12 produce 80% of the value — illustrating that shutdown discipline is the most undervalued practice in Indian AI strategy",
        caption: "MagicWorks built 48 AI agents. Shut down 36. The 12 remaining produce 80% of the value. The willingness to kill is the most undervalued discipline in Indian AI strategy.",
        insertAfterPattern: /48.{0,20}agent|shut down 36|12 agent|willingness to kill|shutdown discipline/i,
      },
      {
        url: cdn("https://magicworksitsolutions.com/wp-content/uploads/2026/05/18-Month-AI-Return-Signal-Timeline.webp"),
        alt: "Timeline showing four AI return signal phases over 18 months: adoption signals (months 1–3), productivity signals (months 3–6), quality and capability signals (months 6–12), financial signals (months 12–18)",
        caption: "The 18-month AI return signal timeline. The financial signal is the slowest — trying to read month-18 returns from month-3 dashboards is the most common reason good AI investments get killed too early.",
        insertAfterPattern: /18.month|months 1 to 3|adoption signals|what.{0,20}good return|measuring.{0,20}returns|financial signal/i,
      },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function blockText(block) {
  if (block._type !== "block" || !Array.isArray(block.children)) return "";
  return block.children.map((c) => c.text ?? "").join("");
}

function findInsertionIndex(body, pattern) {
  for (let i = 0; i < body.length; i++) {
    if (pattern.test(blockText(body[i]))) {
      // Insert after the first following normal paragraph (not a heading)
      for (let j = i + 1; j < Math.min(i + 6, body.length); j++) {
        if (body[j]._type === "block" && (body[j].style === "normal" || !body[j].style) && blockText(body[j]).length > 20) {
          return j + 1;
        }
        // If we hit an externalImage or callout right after, insert before it
        if (body[j]._type === "externalImage" || body[j]._type === "callout" || body[j]._type === "statRow") {
          return j;
        }
      }
      return i + 1;
    }
  }
  return -1;
}

let _imgN = 0;
function imgKey() { return `extimg-${++_imgN}-${Date.now()}`; }

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  for (const blog of BLOGS) {
    console.log(`\n🔍  Looking up: ${blog.slug}`);
    const doc = await client.fetch(
      `*[_type == "insight" && slug.current == $slug][0]{ _id, title, externalCoverImageUrl, coverImage, body }`,
      { slug: blog.slug }
    );
    if (!doc) { console.error(`❌  Not found: ${blog.slug}`); continue; }
    console.log(`✅  Found: "${doc.title}" (${doc._id})`);

    const patches = {};

    // Cover image
    if (!doc.coverImage?.asset && !doc.externalCoverImageUrl) {
      patches.externalCoverImageUrl = blog.cover.url;
      console.log(`🖼️   Setting cover image`);
    } else {
      console.log(`⏭️   Cover image already set`);
    }

    // Body images
    let body = [...(doc.body ?? [])];
    const existingUrls = new Set(
      body.filter((b) => b._type === "externalImage" && b.url).map((b) => b.url)
    );

    const insertions = [];
    for (const img of blog.bodyImages) {
      if (existingUrls.has(img.url)) {
        console.log(`⏭️   Body image already present: ${img.url.slice(-50)}`);
        continue;
      }
      let idx = img.insertAfterPattern ? findInsertionIndex(body, img.insertAfterPattern) : -1;
      if (idx === -1) {
        idx = body.length;
        console.log(`📄  Pattern not matched — appending image`);
      } else {
        console.log(`📄  Inserting image at body index ${idx}`);
      }
      insertions.push({
        idx,
        block: { _type: "externalImage", _key: imgKey(), url: img.url, alt: img.alt, caption: img.caption ?? "" },
      });
    }

    // Insert in reverse order to preserve indices
    insertions.sort((a, b) => b.idx - a.idx);
    for (const { idx, block } of insertions) {
      body = [...body.slice(0, idx), block, ...body.slice(idx)];
    }
    if (insertions.length > 0) patches.body = body;

    if (Object.keys(patches).length === 0) {
      console.log(`✅  Nothing to patch for ${blog.slug}`);
      continue;
    }

    console.log(`💾  Patching ${Object.keys(patches).join(", ")}…`);
    await client.patch(doc._id).set(patches).commit();
    console.log(`✅  Done! Cover + ${insertions.length} body image(s) added.`);
  }
  console.log("\n🎉  All blogs updated with images!\n");
}

main().catch((err) => { console.error("\n❌  Fatal:", err.message); process.exit(1); });
