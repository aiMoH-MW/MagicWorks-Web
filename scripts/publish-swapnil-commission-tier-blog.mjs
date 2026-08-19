/**
 * publish-swapnil-commission-tier-blog.mjs
 *
 * Publishes "Commission-Tier Performance Marketing: The Six Questions to
 * Ask Before You Sign" (author: Swapnil Ughade) LIVE, dated today.
 *
 * Source: Docs/Reports/MagicWorks_Blog1_Commission_Tier_Six_Questions (1).html
 * Hero image: Docs/Reports/MagicWorks_Blog1_Commission_Tier_Six_Questions (1).png
 *
 * Looks up the existing Swapnil Ughade teamMember record by slug/name
 * (does NOT create or modify his author record).
 *
 * Note: the source HTML's own metadata says "21 August 2026" as the
 * intended publish date, but this script publishes it LIVE today
 * (2026-08-16) per the explicit "publish this blog" instruction. If you
 * actually wanted it held until 21-Aug, tell me and I'll patch publishedAt
 * and/or move it to a draft.
 *
 * Run: node scripts/publish-swapnil-commission-tier-blog.mjs
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

const IMAGE_PATH = path.join(
  __dirname, "..", "..", "Docs", "Reports",
  "MagicWorks_Blog1_Commission_Tier_Six_Questions (1).png"
);

// ── Portable Text helpers ───────────────────────────────────────────────────
let _k = 0;
const k = () => `sct${String(++_k).padStart(3, "0")}`;

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
const bq = (text) => block("blockquote", [plain(text)]);

const callout = (title, body, variant = "key-takeaway", items) => {
  const c = { _type: "callout", _key: k(), title, body, variant };
  if (items) c.items = items;
  return c;
};

const linkPara = (before, linkText, href, after = "") => {
  const mk = k();
  return block("normal", [plain(before), linked(linkText, mk), plain(after)], [{ _key: mk, _type: "link", href }]);
};

// ── Body ─────────────────────────────────────────────────────────────────────
const body = [
  p("A specific conversation keeps repeating itself in the offices of Indian marketing heads and founders. The business is spending ₹5 lakh, or ₹10 lakh, or ₹20 lakh per month on Google Ads and Meta Ads. The current agency is delivering campaigns on a fixed retainer that stays the same regardless of what the ad spend produces. The uncomfortable question sits in the room: why am I paying the agency the same fee whether we generate 100 leads or 1,000?"),
  p("Commission-tier performance marketing is one honest answer to that question. Rather than paying for agency time, the client pays a base fee that covers the cost of running the account professionally, plus a commission on incremental attributable revenue above a defined baseline. When the account performs, the agency earns well. When it underperforms, the agency earns the base and no more. Both parties see the same numbers, and both parties have skin in the game."),
  p("The model works genuinely well for some businesses. It works badly for others. In our work at MagicWorks over the last decade, we have observed that the businesses for whom commission-tier produces value share four consistent characteristics, and the businesses for whom it produces dispute share the inverse. Before signing any commission-tier agreement with any agency, you should be able to answer six questions with clarity. Ambiguity on any of them is not a signal to abandon the model; it is a signal that additional work is needed before commencing."),
  p("What follows is the six-question diagnostic we use at MagicWorks when evaluating whether a client-agency pair should attempt commission-tier. The questions are transferable to any commission-tier evaluation, regardless of which agency you are considering."),

  callout(
    "The Six Questions at a Glance",
    "Is performance measurable within a reasonable attribution window? Is the baseline defensible and mutually agreed? Is the market opportunity large enough to justify the incremental investment? Is the CFO aligned with variable monthly agency payouts? Is the client team operationally ready for higher-velocity work? Is there genuine data transparency between both parties?",
    "key-takeaway"
  ),

  h2("Question 1: Is performance measurable?"),
  p("Commission-tier requires that both parties can see, agree on, and trust the outcome numbers. If your business cannot produce a defensible attribution methodology within a reasonable window, commission-tier will produce more argument than value."),
  p("A \"reasonable\" attribution window is 7 to 30 days for most direct response businesses (ecommerce, lead generation, sign-ups). It extends to 60 or 90 days for higher-consideration purchases like distance education admissions, professional services engagements, or high-value B2B. Beyond 90 days, attribution becomes fragile because too many other influences enter the buyer's journey between paid media click and eventual conversion."),
  p("What \"measurable\" specifically requires: a defined conversion event that fires reliably in Google Ads and Meta Ads reporting; a reasonable attribution model (last click for direct response, position-based or data-driven for longer cycles); and internal analytics infrastructure that captures conversions consistently across the tracking window."),
  p("Businesses that struggle with this question typically fall into two categories. Multi-channel businesses where paid media is one of several touchpoints, and single-channel attribution understates the paid media contribution. Long sales cycle businesses where the eventual purchase is months away from the paid media click, and the attribution window is too long for the trailing baseline to be reliable."),
  bp("If your answer is uncertain:", "before committing to commission-tier, run a 60 to 90 day attribution audit with your current agency or an independent consultant. Establish which conversion events are measurable, what window they fire in, and how confident both sides are in the numbers. Commission-tier then commences on the basis of those verified numbers, not on a hoped-for attribution methodology."),

  h2("Question 2: Is the baseline defensible?"),
  p("The baseline is the revenue level the paid media accounts would produce without the new agency's active optimisation. It is the reference point against which incremental revenue, and therefore commission, is measured. Setting the baseline correctly is the second-most common source of disputes in commission-tier engagements. Set it too low, and the client feels the agency is being paid commission on outcomes the business would have produced anyway. Set it too high, and the agency feels it will never earn commission because the reference point is unfair."),
  p("The MagicWorks approach is calibrated to remove this ambiguity. The baseline is calculated at the start of the engagement from the previous 90 days of paid media performance, with adjustments for seasonality using the same 90-day window from 12 months earlier where data exists. The baseline is then locked for the first 6 months. At the six-month mark, both parties review the baseline together and adjust for any material market shifts or permanent structural changes to the business."),
  p("The baseline is not a moving target that adjusts automatically as the account grows. If it did, the agency would be penalised for its own success, which defeats the purpose of the commission structure. The baseline moves only at defined review windows, and only by mutual written agreement."),
  bp("If your answer is uncertain:", "the trailing 90-day performance data is the starting point. Before signing, both parties should independently calculate the baseline from the same source data, compare their numbers, and reconcile any differences. If reconciliation cannot happen easily, that is a signal that analytics discipline needs work before commission-tier commences."),

  h2("Question 3: Is the market opportunity large enough?"),
  p("Commission-tier assumes there is genuine incremental revenue to unlock. If the business is already at market saturation for its category, or if the growth constraint is on the supply side (inventory, delivery capacity, sales team bandwidth) rather than on the demand side, the paid media account has limited room to grow regardless of agency effort."),
  p("The specific threshold worth targeting is at least 30 to 50 percent growth headroom above the baseline in the first 12 months. Below that, the agency's commission earnings will be modest and both parties will feel the model is underperforming, even when the agency is doing genuinely good work."),
  p("This is the question clients answer least honestly. The optimistic answer is \"yes, we have huge upside.\" The realistic answer requires sanity-checking three things. Is the total addressable market for the paid media targeting genuinely large enough for the growth thesis? Is the business capable of converting the additional traffic into customers without operational strain? Are there constraints, inventory, delivery, sales capacity, geographic reach, that would cap growth even if paid media performs well?"),
  bp("If your answer is uncertain:", "run a market size analysis before signing. Establish the total addressable market, the business's current share, and the realistic growth curve for the next 12 to 18 months. If the growth ceiling is close to the current baseline, commission-tier will disappoint both parties."),

  h2("Question 4: Is the CFO aligned?"),
  p("This is the question that surprises most marketing heads. The commission-tier model is a marketing team decision in spirit, but a CFO decision in practice. If the CFO is not aligned, monthly commission payouts become a recurring point of internal friction, and the marketing head ends up defending the model to finance every month instead of focusing on account performance."),
  p("What CFO alignment specifically requires: the CFO has read and understood the commission-tier agreement structure. The CFO is comfortable with variable monthly agency payouts within the defined cap. The finance team has a clear process for approving and paying commission-based invoices, which look different from fixed retainer invoices. And the accounting treatment of the commission, whether it is expensed against paid media budget or as a separate agency line item, is defined and consistent."),
  p("In our work at MagicWorks, businesses where the CFO discovers the commission-tier structure after signing tend to renegotiate within six months, and the renegotiation is uncomfortable for both sides. Businesses where the CFO is aligned from the start have materially smoother engagements and are more likely to extend the arrangement past the initial term."),
  bp("If your answer is uncertain:", "schedule a specific conversation with your CFO or finance leader before signing. Walk through the base fee, commission structure, and cap. Answer their questions honestly, including the honest answer to \"what is the maximum monthly agency payout possible.\" If the CFO is not comfortable, restructure to a fixed retainer or a hybrid model with a lower commission ceiling."),

  h2("Question 5: Is the client team operationally ready?"),
  p("Commission-tier engagements run at higher operational velocity than retainer engagements. The agency has direct financial incentive to test more creatives, iterate more campaigns, and make more optimisation decisions. All of that requires client team responsiveness."),
  p("Specifically: creative reviews that take five days in a retainer engagement need to take 24 to 48 hours in a commission-tier engagement. Weekly performance discussions replace monthly reporting cycles. Business context changes, new product launches, competitive shifts, seasonality, need to be communicated to the agency within days, not weeks. The typical client-side commitment is 4 to 8 hours per week from a dedicated point of contact."),
  p("If the client's marketing team is thinly staffed, or is prioritising multiple channels and cannot dedicate meaningful weekly attention to the paid media account, the commission-tier engagement will underperform. The agency's effort will not translate into velocity because the client-side bottleneck will slow everything down."),
  bp("If your answer is uncertain:", "honestly audit your marketing team's capacity for the next two quarters. If someone on the team can be assigned as the primary point of contact for the commission-tier engagement with 4 to 8 hours per week dedicated to it, the operational readiness is there. If not, either restructure the team or accept that a slower-velocity retainer engagement is a better fit for now."),

  h2("Question 6: Is there data transparency?"),
  p("This is the question that is easiest to answer \"yes\" to in theory and hardest to sustain in practice. Data transparency requires ongoing effort. The client has to share business outcome data, not just campaign metrics, so the agency can see whether paid media is actually driving revenue. The agency has to share campaign structure, creative variants tested, and optimisation decisions so the client can see what the agency is actually doing. And both parties have to agree on a single source of truth for the numbers that determine commission."),
  p("The MagicWorks approach: at the start of the engagement, both parties agree on the specific reports, dashboards, and data sources that will be used for baseline calculation and commission calculation. These sources are documented in the engagement agreement. If either party wants to change the source or methodology mid-engagement, the change requires mutual written consent."),
  p("The businesses that struggle with this question typically have fragmented internal analytics infrastructure. The paid media platform reports show one number, the CRM shows another, and the finance system shows a third. Reconciling these into a single trusted source for commission calculation is genuinely difficult, and if the reconciliation is not done before signing, it becomes a recurring monthly dispute."),
  bp("If your answer is uncertain:", "run a data audit before signing. Identify which systems the numbers come from, who owns them internally, and whether the client and agency can access the same views of the same numbers. If the answer is no, invest in the analytics infrastructure first, before commencing commission-tier."),

  h2("How to interpret your six answers"),
  p("The six questions produce a simple filter for whether commission-tier fits your business today."),
  bp("All six answered \"yes\" with clarity:", "commission-tier is likely a strong fit. Proceed to a structured commission-tier engagement conversation with the agencies you are evaluating."),
  bp("Four or five answered \"yes,\" one or two \"uncertain\":", "commission-tier is likely a fit after specific pre-engagement work on the uncertain areas. Address those first, data audit, attribution review, CFO conversation, or team capacity plan, then commence."),
  bp("Two or three answered \"no\" or \"uncertain\":", "commission-tier is not the right structure for your business today. A well-structured retainer with clear performance dashboards will serve you better in the near term. Revisit commission-tier in 6 to 12 months as your operational infrastructure matures."),
  bp("Four or more answered \"no\":", "the business either needs significant operational work before commission-tier becomes viable, or should honestly conclude that commission-tier is not the right model for its context. Either answer is legitimate and worth taking seriously."),

  bq("The pattern that emerged across the last decade of MagicWorks paid media work: businesses that skip past ambiguous answers to save time produce failed commission-tier engagements. Businesses that address the underlying issues first and commence from a position of clarity produce results that make both parties glad they did the work."),

  callout(
    "Want the Full Framework?",
    "The Commission-Tier Performance Marketing Playbook covers the six diagnostic questions in expanded detail, plus the ₹5 lakh minimum threshold, the anchor case study (₹19.8M ad spend, 50,000+ qualified leads at ₹396 CPL over 16 months), and the 90-day onboarding plan. 22 pages, free download.",
    "cta"
  ),
  linkPara("", "Download the Playbook", "/insights/reports/commission-tier-performance-marketing-playbook", ""),
];

const faq = [
  { _key: k(), question: "What is commission-tier performance marketing?", answer: "Commission-tier performance marketing is a hybrid pricing structure where the digital marketing agency earns a fixed base fee plus a commission on incremental attributable revenue above a defined baseline. The base fee covers the cost of running the account professionally, and the commission rewards outcomes that exceed the baseline. It aligns agency incentives to business outcomes rather than hours billed." },
  { _key: k(), question: "Is performance measurable for commission-tier engagements?", answer: "Commission-tier performance marketing requires that both parties can measure the direct outcome of paid media within a reasonable attribution window. For most direct response businesses, 7 to 30 days is reasonable. For higher-consideration B2B or education businesses, up to 90 days works. Beyond 90 days, attribution becomes fragile and commission-tier becomes difficult to structure fairly." },
  { _key: k(), question: "How is the commission-tier baseline calculated?", answer: "The commission-tier baseline is calculated from the trailing 90-day performance of the paid media accounts before the engagement begins, adjusted for seasonality using the same 90-day window from the previous year where data exists. The baseline is then locked for the first six months, with a formal review at the six-month mark." },
  { _key: k(), question: "Why does CFO alignment matter for commission-tier agreements?", answer: "CFO alignment matters because commission-tier produces variable monthly agency payouts, and the CFO or finance leader must understand and support this variability. Businesses where the CFO discovers the commission-tier structure after signing tend to renegotiate within six months. Businesses where the CFO is aligned from the start have materially smoother engagements." },
  { _key: k(), question: "What ad spend threshold makes commission-tier viable?", answer: "Commission-tier performance marketing becomes structurally viable at ₹5 lakh or more per month in combined Google Ads and Meta Ads spend. Below this threshold, the absolute rupees of commission do not scale with the effort required to run the account professionally, and a well-structured retainer serves both sides better." },
  { _key: k(), question: "What are the six diagnostic questions before signing commission-tier?", answer: "Is performance measurable within a reasonable attribution window? Is the baseline defensible and agreed by both parties? Is the market opportunity large enough to justify incremental investment? Is the CFO aligned with variable monthly payouts? Is the client team operationally ready for higher-velocity work? Is there data transparency between both parties?" },
];

async function main() {
  console.log("\n=== Publishing Swapnil Ughade blog: Commission-Tier Six Questions ===\n");

  console.log("🔍  Looking up existing author Swapnil Ughade…");
  const author = await client.fetch(
    `*[_type == "teamMember" && (slug.current == "swapnil-ughade" || name match "Swapnil*")][0]{ _id, name }`
  );
  if (!author) { console.error("❌  Could not find an existing Swapnil Ughade teamMember record. Aborting."); process.exit(1); }
  console.log(`✅  Found author: ${author.name} (${author._id})`);

  if (!fs.existsSync(IMAGE_PATH)) { console.error(`❌  Hero image not found: ${IMAGE_PATH}`); process.exit(1); }
  console.log("📤  Uploading hero image…");
  const asset = await client.assets.upload("image", fs.createReadStream(IMAGE_PATH), {
    filename: "commission-tier-six-questions-hero.png",
  });
  console.log(`✅  Image uploaded: ${asset._id}`);

  const doc = {
    _id: "insight-swapnil-commission-tier-six-questions",
    _type: "insight",
    title: "Commission-Tier Performance Marketing: The Six Questions to Ask Before You Sign",
    seoTitle: "Commission-Tier Marketing: 6 Questions Before You Sign",
    slug: { _type: "slug", current: "six-questions-commission-tier-performance-marketing" },
    excerpt: "Six diagnostic questions marketing heads, founders, and CFOs must answer honestly before signing a commission-tier performance marketing agreement.",
    author: { _type: "reference", _ref: author._id },
    publishedAt: "2026-08-16T09:00:00.000Z",
    categories: ["digital-marketing"],
    pillar: "digital-marketing",
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: "Should your agency be paid the same whether you get 100 leads or 1,000? Commission-tier performance marketing starts with six hard questions.",
    },
    body,
    faq,
    tags: [
      "commission-tier performance marketing",
      "performance-based digital marketing India",
      "commission-based marketing agency India",
      "how to structure agency commission",
      "performance marketing agency structure India",
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
