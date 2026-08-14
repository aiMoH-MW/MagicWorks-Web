/**
 * publish-anjali-blogs-round1-v2.mjs
 *
 * REPLACES the round-1 content for Anjali Kalaskar's first 2 live posts with
 * corrected versions (no forward-links to unpublished posts, inline charts
 * restored, downloadable PDF lead magnets added):
 *
 *   1. Same War, New Weapons        — 2026-08-02 (unchanged slot)
 *   2. Win Before You Spend          — 2026-08-12 (replaces the old
 *                                      "Before You Chase the New Platform"
 *                                      slot — that post stays unpublished
 *                                      until its own updated version arrives)
 *
 * What it does:
 *   - Uploads 2 cover images + 4 inline images (from scripts/anjali-media/)
 *   - Publishes both posts LIVE via createOrReplace (safe to re-run)
 *   - Downloadable PDFs already copied to public/downloads/ separately —
 *     this script just links to them from the article body
 *
 * Run: node scripts/publish-anjali-blogs-round1-v2.mjs
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

const AUTHOR_ID = "author-anjali-kalaskar";
const SRC_DIR   = path.join(__dirname, "..", "..", "Docs", "Blogs", "Anjali", "5_6334537433966714377", "Magicworks blogs", "Magicworks blogs");
const MEDIA_DIR = path.join(__dirname, "anjali-media");

// ── Portable Text helpers ───────────────────────────────────────────────────
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
const bq = (text) => block("blockquote", [plain(text)]);
const linkPara = (before, linkText, href, after = "") => {
  const mk = k();
  return block("normal", [plain(before), linked(linkText, mk), plain(after)], [{ _key: mk, _type: "link", href }]);
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
// BLOG 1: Same War, New Weapons
// ════════════════════════════════════════════════════════════════════════════
resetKey("sw");

function buildBody1(img1, img2) {
  return [
    p("Every few months, a new tool arrives. Performance Max. AI Max. Smarter bidding. Each one promises an edge. Marketers rush to learn it. Budgets shift. Dashboards get rebuilt."),
    imageBlock(img1, "A centuries-old fortress beside a modern military command centre, representing how the strategic vantage point stays the same even as the tools change"),
    p("Then the next tool arrives, and it starts again."),
    p("Here is the pattern few people name. The tools change often. The strategy underneath barely moves. We keep buying new weapons and fighting the same war. And we keep losing it the same way."),
    p("The churn is real. More than half of paid-search professionals now say the work is harder than it was two years ago, mostly because the platforms automate more and reveal less, according to the State of PPC 2026 survey. New weapons arrive every quarter. The performance marketing principles underneath them do not."),
    p("Think of cricket. The game went from Test to ODI to T20. The bats got heavier. The rules changed. But the fundamentals of batting did not. Watch the ball. Move your feet. Time the shot. A player who owns those wins in any format. A player who only chases the new gear does not."),
    p("Performance marketing works the same way. This guide is about the war, not the weapons."),

    h2("The war and the weapons"),
    p("Split your work into two layers."),
    bulletBold("The weapons", "are the platforms, features, and settings. They change fast. Performance Max today. Something else next year."),
    bulletBold("The war", "is the strategy. Reach the right person. At the right moment. With the right offer. Then measure it honestly. That has not changed since the first ad was ever sold."),
    p("When you confuse the two, you relearn everything with each update. When you separate them, a new tool is just a new way to run an old, proven play."),
    bq("A new feature is rarely a new war. It is almost always a new weapon."),
    p("Below are five performance marketing principles that hold through every update. Each one is old. Each one still decides who wins in 2026."),

    h3("Principle 1: Win before you spend (Sun Tzu)"),
    p("Sun Tzu wrote that battles are won before they are fought. The same is true here. Most results are decided at setup, not in the live auction. Your structure, your targeting, your offer, and your tracking are the real levers. Once the campaign is live, you are mostly reacting."),
    p("A farmer does not fight the monsoon. She prepares the field before the first rain. The work that decides the harvest happens early."),
    bp("In 2026 this looks like:", "a clean campaign structure, tight match types, a sharp offer, and conversion tracking that fires correctly, all in place before you raise the budget."),

    h3("Principle 2: Protect the downside first (Morgan Housel)"),
    p("Morgan Housel writes that survival beats optimization. The goal is not to win big on one bet. The goal is to stay in the game long enough for good results to compound."),
    p("In paid media, this is budget discipline. One large bet can look bold. It can also drain the account before it teaches you anything. Many smaller, measured bets keep you learning and keep you safe."),
    bp("In 2026 this looks like:", "spreading budget across a few tested angles, capping spend on the unproven, and scaling only what has earned it."),

    h3("Principle 3: Do not reinforce defeat (Sun Tzu)"),
    p("A weak campaign rarely improves because you feed it more money. Good commanders do not send more troops to a lost position. They move resources to where they are already winning."),
    bp("In 2026 this looks like:", "reading performance by day, device, and audience, then pausing what is structurally weak and moving that budget to what works."),

    h3("Principle 4: People change slower than platforms (Same as Ever)"),
    p("Interfaces change every year. People do not. We still buy on trust. We still respond to a clear offer. We still fear a loss more than we enjoy a gain. These truths are older than Google Ads and will outlast it."),
    p("So the ad account is not where most wins hide. The offer and the message are. A strong channel cannot save a weak offer. A strong offer works on almost any channel."),
    bp("In 2026 this looks like:", "spending real effort on the offer and the creative, not only the settings."),

    h3("Principle 5: The biggest risk is the one you cannot see (Same as Ever)"),
    p("A river looks calm on the surface. The current that matters runs underneath. Measurement is the same. The numbers on your dashboard feel like the whole truth. The leads you never recorded stay invisible, and they are the ones quietly costing you."),
    bq("Broken tracking does not send an alert. It just makes good work look bad and bad work look fine."),
    bp("In 2026 this looks like:", "checking that tracking fires, that cross-domain data is clean, and that your reports count what actually happened."),

    h2("The war and the weapons, side by side"),
    comparisonTable("What never changes", "What it looks like in 2026", [
      { metric: "Win before you spend", a: "Battles are won at setup, not mid-fight", b: "Structure, targeting, offer, and tracking fixed before budget goes up" },
      { metric: "Protect the downside", a: "Survival beats optimization", b: "Small tested bets, capped risk, scale only what earns it" },
      { metric: "Do not reinforce defeat", a: "Move resources to strength", b: "Pause weak segments, shift budget to what converts" },
      { metric: "People change slower than platforms", a: "Buyers respond to trust and offers", b: "Effort on offer and creative, not only settings" },
      { metric: "Watch the unseen risk", a: "The hidden number decides the result", b: "Clean tracking, honest attribution, verified data" },
    ]),

    h2("How to tell a war from a weapon"),
    p("All of this rests on one skill: telling the two apart in the moment, when the news is loud and everyone else is reacting. Three quick questions do it."),
    p("First, does it change who you are trying to reach, or only how you reach them? A new audience type is a weapon. A whole new kind of buyer is a war. The first is common. The second is rare."),
    p("Second, does it change what you promise, or only how you deliver it? A faster landing page is a weapon. A new business model is a war. Almost every tool touches delivery, not the promise."),
    p("Third, does it change how you measure success, or only what you press to get there? A new bidding control is a weapon. A shift from counting leads to counting lifetime value is closer to a war, because it changes the scoreboard itself."),
    p("Take Performance Max through those three. It changes how you reach people and how you press the buttons. It does not change who you sell to, what you promise, or how you keep score. Two weapons, no war. Your plan holds, and you can test the tool from a place of calm instead of fear."),
    imageBlock(img2, "Two eras of advertising, the 1920s and the 2010s, joined by an infinity symbol, captioned 'Visual representation changed, target strategy never changed'"),

    h2("Before you chase the next tool"),
    p("When the next feature launches, ask one question first. Is this a new weapon, or a new war?"),
    p("Almost always, it is a new weapon. That is good news. It means your strategy still holds. You just have a new way to run it. The teams that stay calm through each update are not smarter. They simply know which layer they are standing on."),
    p("This is why the series that follows is built the way it is. Each piece takes one enduring principle and shows it inside a live 2026 tactic, from campaign setup to budget allocation to tracking. Read together, they are one argument: master the war, and every new weapon becomes a smaller, calmer decision. You stop starting over with each update. You start compounding."),

    callout("The One Line to Remember", "Learn the war once. Relearn the weapons as often as you need. The first stays with you for a career. The second changes by the season.", "key-takeaway"),

    callout("Free Download", "A one-page \"Principles vs Tactics\" cheat sheet you can pin above your desk.", "info"),
    linkPara("Download the ", "Principles vs Tactics cheat sheet (PDF)", "/downloads/same-war-new-weapons-cheat-sheet.pdf", "."),

    callout("Build on the War, Then Fit the Tools", "At MagicWorks, we set the strategy first and fit each platform to it. If your campaigns feel like they restart with every update, that is usually a strategy gap, not a tool gap.", "cta"),
    linkPara("", "Get a free account audit", "/contact", ""),

    p("Anjali Kalaskar writes on performance marketing for MagicWorks IT Solutions, applying timeless strategy principles to live paid-media tactics."),
  ];
}

const faq1 = [
  { _key: k(), question: "What is the difference between a \"war\" and a \"weapon\" in performance marketing?", answer: "A weapon is a platform, feature, or setting, things like Performance Max or a new bidding control, that change often. A war is the underlying strategy: who you reach, what you promise, and how you measure success. Three questions tell them apart: does it change who you target, what you promise, or how you keep score? If not, it is a weapon, not a war." },
  { _key: k(), question: "Does adopting Performance Max or AI Max change my overall strategy?", answer: "No. Run it through the three-question test: it changes how you reach people and how you operate the account, but it does not change who you sell to, what you promise, or how you measure success. That makes it a new weapon, not a new war, so your existing strategy still holds." },
  { _key: k(), question: "What are the five performance marketing principles that survive every platform update?", answer: "Win before you spend (results are decided at setup, not in the live auction), protect the downside first (survival beats one big bet), do not reinforce defeat (move budget to what is winning, not what is losing), people change slower than platforms (the offer matters more than the settings), and the biggest risk is the one you cannot see (broken tracking hides losses silently)." },
  { _key: k(), question: "Why does broken tracking hurt more than most platform changes?", answer: "Broken tracking does not send an alert. It quietly makes good work look bad and bad work look fine, so every decision built on top of it, budget, targeting, bidding, is built on a false number. Verifying that tracking fires correctly and that cross-domain data is clean matters more than reacting to any single feature launch." },
];

// ════════════════════════════════════════════════════════════════════════════
// BLOG 2: Win Before You Spend
// ════════════════════════════════════════════════════════════════════════════

function buildBody2(img1, img2) {
  resetKey("wb");
  return [
    p("Think of an exam hall. The result is not decided in those three hours. It is decided in the months before, in the preparation. On the day, you are only carrying out work that is already done. You cannot cram in the hall."),
    imageBlock(img1, "Illustration of a marketer reviewing a campaign performance dashboard with forecasted results and recommendations, representing planning before launch"),
    linkPara("A Google Ads campaign works the same way. Most of the result is set before the campaign goes live. The auction feels like the main event, but by then the big choices are already made. This is a Google Ads campaign setup checklist built on that truth, and on one idea from the anchor of this series, ", "Same War, New Weapons", "/blog/same-war-new-weapons", ", and from Sun Tzu: battles are won before they are fought."),
    p("The stakes are not small. Audits routinely find that 20 to 40 percent of a Google Ads budget leaks away on irrelevant clicks, based on a WordStream analysis of more than 17,000 accounts. On a one lakh rupee monthly budget, that is twenty to forty thousand rupees gone every month, with nothing to show for it. Most of that leak is set at setup, not in the auction. Below are the five decisions that decide it."),

    h2("The auction only plays the hand you deal it"),
    p("The platforms have changed. The State of PPC 2026 survey of over 1,300 professionals found more than half now say paid search is harder to manage than it was two years ago, mostly because the tools automate more and reveal less. When you control less inside the auction, the choices you make before it matter more. Structure, targeting, the offer, tracking, and negatives are the levers you still hold. Set them well and the auction works with you. Set them poorly and it quietly spends against you."),

    h3("Decision 1: Structure — group by intent, not by convenience"),
    p("Structure is the quietest decision and the most powerful. When keywords with different intent share one ad group, one ad has to speak to all of them. It ends up speaking clearly to none."),
    p("The current best practice is the single-theme ad group: a handful of keywords, roughly five to fifteen, that share one intent. It replaced the older single-keyword approach because Google's bidding now needs conversion volume to learn, and splitting the account too finely starves it. Group by what the searcher wants, not by the exact word they typed. A person comparing options and a person ready to enrol are on different errands. They deserve different ad groups, different messages, different landing pages."),
    p("Here is what that looks like in practice. On one online-education account, about 16,300 phrase-match keywords were sorted by intent before launch. Six groups came out of it. Only about 3 percent were purchase-ready, searches like \"online mba admission\" or \"apply for distance mba\". The other 97 percent wanted something else first: to compare, to research, or to look up a specific institute. Each group needed its own bid and its own message."),
    imageBlock(img2, "Chart showing about 16,300 phrase-match keywords sorted into six search-intent groups, from purchase-ready to off-target, before any budget was spent", "Real account, anonymised. About 16,300 phrase-match keywords, sorted into six intent groups before a rupee was spent."),
    p("That sorting is what produced the structure. Intent tier first, then ad groups split by geography and specialisation, tight phrase-match on the high-intent core, and negatives to hold back the rest."),

    h3("Decision 2: Targeting — decide who you let in"),
    p("Loose match types are an open gate. They let in traffic that looks related but never converts, and you pay for every visit. This matters more in 2026, not less. Broad match has grown more aggressive, and AI Max now matches searches beyond your keyword list. The platform reaches wider by default, in its own interest."),
    p("So decide the gate at setup. Start tight, with phrase and exact match on your high-intent terms, and clear location and audience choices. Widen later, once you have conversion data to guide it. It is far easier to let good traffic in than to stop paying for bad traffic you invited on day one."),

    h3("Decision 3: The offer — the auction cannot sell a weak promise"),
    p("No bid strategy can save a weak offer. If the promise on the page is dull, more spend just buys more people who say no. It also costs you twice. A weak match between ad, keyword, and landing page drags down Quality Score, and a lower Quality Score raises the price you pay for every future click."),
    p("So decide the offer before launch. Make it clear, specific, and worth the click. Point each ad group at a landing page built for that exact intent. A strong offer lifts every number after it: click-through, conversion rate, cost per lead. This is strategy, not settings, and it is where too little time usually goes."),

    h3("Decision 4: Tracking — decide what counts, and check it fires"),
    p("If tracking is wrong, every choice after it is wrong too. Measurement now comes before structure, not after it. Google's own guidance treats conversion tracking as the foundation every automated bid depends on. Break it, and no amount of clever structure saves you."),
    p("There is a volume angle too. Automated bidding wants roughly 30 conversions a month per campaign to learn well. If half of those go uncounted, the algorithm learns from a lie. So before budget goes up, decide what a real conversion is, set it up, and test that it fires with your own hands. This is not glamorous. It is the difference between steering and guessing."),

    h3("Decision 5: Negatives — decide who you refuse to pay for"),
    p("A negative keyword list is a decision about who you will not pay for. It is also the cheapest, most neglected lever in paid media. Refining negatives from the search terms report can win back 10 to 25 percent of wasted spend, yet most accounts build the list late, after the money is already gone."),
    p("Build it before launch, not after. Start with the obvious misfits for your offer, layer account-level negatives for terms that are never relevant, and add to the list every week from the search terms report. It is a small habit that quietly protects the budget, month after month, and in a world of broad match and AI matching, the thing you exclude is one of the few things you still fully control."),

    callout("The Pre-Launch Checklist", "Run these five before you raise the budget.", "key-takeaway", [
      "Keywords sorted by intent, ad groups built to match",
      "Match types and audiences set to keep the wrong traffic out",
      "Offer is clear, specific, and worth the click",
      "Conversion tracking is set up and verified firing",
      "A starting negative keyword list is in place",
    ]),

    callout("Free Download", "The five decisions above as a one-page check you run before every launch. Free to download, no sign-up.", "info"),
    linkPara("Download the ", "campaign pre-launch checklist (PDF)", "/downloads/win-before-you-spend-checklist.pdf", "."),

    h2("Five ways good setups quietly go wrong"),
    bulletBold("Over-splitting the account.", "Hundreds of tiny ad groups feel precise, but they starve the algorithm of the data it needs to learn."),
    bulletBold("Launching with no negatives.", "Every day without a seed list is a day you fund irrelevant clicks."),
    bulletBold("Trusting tracking you never tested.", "If you did not fire the conversion yourself, you do not know it works."),
    bulletBold("One broad ad group for everything.", "Mixed intent means the ad speaks to no one, and Quality Score suffers."),
    bulletBold("A landing page that does not match the ad.", "The click is only won when the page keeps the promise."),
    p("None of these is dramatic. That is why they last. They fail an account slowly, the same way in 2016 and in 2026, which is the whole point of this series: the weapons change, the ways you lose stay the same."),

    h2("The order to actually build a campaign"),
    p("Knowing the five decisions is one thing. The order you make them in matters too, because each one rests on the one before it."),
    bulletBold("Tracking first.", "Set up and test conversions before anything else. Every later choice reads from this number."),
    bulletBold("Then the offer and pages.", "Decide what you promise, and where the click lands, before you pick a single keyword."),
    bulletBold("Then structure.", "Sort keywords by intent and build ad groups to match."),
    bulletBold("Then targeting and negatives.", "Set the gate, and the starting list of who you will not pay for."),
    bulletBold("Budget last, and small.", "Start low, confirm the data is clean, then scale in steps."),
    p("Most rushed launches invert this. They pick keywords first and bolt on tracking last, which is exactly how a month of spend ends up teaching nothing. Build in the right order, and the campaign is honest from its first click."),

    callout("Want a Second Pair of Eyes Before You Spend?", "We audit account setup before budget scales, so the structure, targeting, offer, tracking, and negatives are right from day one. Most wasted spend is decided here, not in the auction.", "cta"),
    linkPara("", "Get a free account audit", "/contact", ""),

    p("This is the second piece in the Same War, New Weapons series on the performance marketing principles that survive every platform update."),
  ];
}

const faq2 = [
  { _key: k(), question: "What percentage of a Google Ads budget typically gets wasted, and why?", answer: "Audits routinely find 20 to 40 percent of a Google Ads budget leaks away on irrelevant clicks, based on a WordStream analysis of more than 17,000 accounts. Most of that leak is decided at setup, structure, targeting, offer, tracking, and negatives, not inside the live auction itself." },
  { _key: k(), question: "What is a single-theme ad group, and why has it replaced single-keyword ad groups?", answer: "A single-theme ad group holds roughly five to fifteen keywords that share one search intent, rather than one keyword per ad group. It replaced the single-keyword approach because Google's automated bidding needs conversion volume to learn well, and splitting an account too finely starves that data." },
  { _key: k(), question: "What order should I build a new Google Ads campaign in?", answer: "Tracking first, since every later decision reads from that number. Then the offer and landing pages, before picking a single keyword. Then structure, sorting keywords by intent. Then targeting and negatives, setting the gate. Budget comes last, started low and scaled once the data is clean." },
  { _key: k(), question: "How much wasted spend can a negative keyword list actually recover?", answer: "Refining negatives from the search terms report can win back 10 to 25 percent of wasted spend. It works best built before launch, with a starting list of obvious misfits and account-level exclusions, then extended weekly, rather than built late after the budget is already gone." },
];

// ── Blog configuration ──────────────────────────────────────────────────────
const BLOGS = [
  {
    slug: "same-war-new-weapons",
    title: "Same War, New Weapons",
    seoTitle: "Performance Marketing Principles That Survive Updates",
    excerpt: "The performance marketing principles that survive every platform update, drawn from Sun Tzu and Morgan Housel, applied to live 2026 tactics.",
    publishedAt: "2026-08-02T09:00:00.000Z",
    coverFile: "Blog_1_SameWarNewWeapons_FeatureImage.png",
    coverAlt: "Hero graphic for 'Same War, New Weapons': the strategy stays, the tools change",
    inline1File: "blog1-image1.jpeg",
    inline2File: "blog1-image2.jpeg",
    buildBody: buildBody1,
    faq: faq1,
    tags: [
      "performance marketing principles",
      "win before you spend strategy",
      "protect the downside in paid media",
      "do not reinforce defeat marketing",
      "people change slower than platforms",
      "biggest risk you cannot see tracking",
    ],
  },
  {
    slug: "win-before-you-spend",
    title: "Win Before You Spend",
    seoTitle: "Google Ads Campaign Setup Checklist: 5 Decisions",
    excerpt: "A Google Ads campaign setup checklist: five decisions made before launch that the live auction can never fix.",
    publishedAt: "2026-08-12T09:00:00.000Z",
    coverFile: "Blog_2_WinBeforeYouSpend_FeatureImage.jpg",
    coverAlt: "Hero graphic for 'Win Before You Spend': a Google Ads campaign pre-launch checklist",
    inline1File: "blog2-image1.png",
    inline2File: "blog2-image2.png",
    buildBody: buildBody2,
    faq: faq2,
    tags: [
      "google ads campaign setup checklist",
      "google ads budget waste",
      "single theme ad group structure",
      "negative keyword list strategy",
      "conversion tracking setup",
      "google ads pre launch checklist",
    ],
  },
];

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n=== Publishing Anjali Kalaskar blogs — Round 1 v2 (corrected, LIVE) ===\n");

  console.log("🔍  Checking author…");
  const author = await client.fetch(
    `*[_type == "teamMember" && (slug.current == "anjali-kalaskar" || name == "Anjali Kalaskar")][0]{ _id, name }`
  );
  if (!author) { console.error("❌  Author Anjali Kalaskar not found. Run create-author-anjali-kalaskar.mjs first."); process.exit(1); }
  console.log(`✅  Author: ${author.name} (${author._id})\n`);

  for (const blog of BLOGS) {
    console.log(`── ${blog.title} ──`);

    const coverPath = path.join(SRC_DIR, blog.coverFile);
    const img1Path  = path.join(MEDIA_DIR, blog.inline1File);
    const img2Path  = path.join(MEDIA_DIR, blog.inline2File);

    for (const p of [coverPath, img1Path, img2Path]) {
      if (!fs.existsSync(p)) { console.error(`❌  Missing file: ${p}`); process.exit(1); }
    }

    console.log("📤  Uploading cover image…");
    const coverAsset = await client.assets.upload("image", fs.createReadStream(coverPath), { filename: blog.coverFile });
    console.log("📤  Uploading inline image 1…");
    const img1Asset = await client.assets.upload("image", fs.createReadStream(img1Path), { filename: blog.inline1File });
    console.log("📤  Uploading inline image 2…");
    const img2Asset = await client.assets.upload("image", fs.createReadStream(img2Path), { filename: blog.inline2File });

    const body = blog.buildBody(img1Asset._id, img2Asset._id);
    const docId = `insight-anjali-${blog.slug}`;

    const doc = {
      _id: docId,
      _type: "insight",
      title: blog.title,
      seoTitle: blog.seoTitle,
      slug: { _type: "slug", current: blog.slug },
      excerpt: blog.excerpt,
      author: { _type: "reference", _ref: author._id },
      publishedAt: blog.publishedAt,
      categories: ["digital-marketing"],
      pillar: "digital-marketing",
      coverImage: { _type: "image", asset: { _type: "reference", _ref: coverAsset._id }, alt: blog.coverAlt },
      body,
      faq: blog.faq,
      tags: blog.tags,
      isGated: false,
    };

    console.log("💾  Publishing live…");
    const created = await client.createOrReplace(doc);
    console.log(`✅  Published: ${created._id}`);
    console.log(`    Live URL: https://magicworksitsolutions.com/blog/${blog.slug}\n`);
  }

  console.log("Done. Both posts are live with corrected content, restored charts, and working PDF downloads.");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
