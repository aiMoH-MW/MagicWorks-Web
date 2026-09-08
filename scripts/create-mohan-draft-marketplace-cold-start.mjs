/**
 * create-mohan-draft-marketplace-cold-start.mjs
 *
 * Creates "Cold Start Is Not a Marketing Problem. It Is a Market-Design
 * Problem." (author: Mohan Chute, existing author record) in Sanity as a
 * DRAFT ONLY (not visible on the live site until promoted / published).
 *
 * Source: Docs/Blogs/Mohan/MagicWorks_Marketplace_Cold_Start_Blog_Package/marketplace-cold-start-blog/
 *   - cold-start-is-a-market-design-problem.md          (article content)
 *   - assets/marketplace-cold-start-market-design-hero-1280x512.png  (cover image)
 *   - assets/marketplace-density-vs-total-users.png                  (inline)
 *   - assets/marketplace-six-layer-cold-start-sequence.png           (inline)
 *   - assets/marketplace-cold-start-liquidity-dashboard.png          (inline)
 *
 * This script ONLY creates a draft. It does not publish, and it does not
 * delete any existing draft. The post has a future publishedAt value
 * (2026-09-14) that is left untouched — it will be used when the draft is
 * later promoted / published via a separate script.
 *
 * Run: node scripts/create-mohan-draft-marketplace-cold-start.mjs
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

const ASSET_DIR = path.join(__dirname, "..", "..", "Docs", "Blogs", "Mohan", "MagicWorks_Marketplace_Cold_Start_Blog_Package", "marketplace-cold-start-blog", "assets");

// ── Portable Text helpers (same pattern as publish-mohan-decision-first-ai.mjs) ─
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
// BLOG: Cold Start Is Not a Marketing Problem. It Is a Market-Design Problem.
// ════════════════════════════════════════════════════════════════════════════
function buildBody(imgDensity, imgSixLayer, imgDashboard) {
  resetKey("mcs");
  return [
    p("Most marketplace launch plans sound like ordinary marketing plans wearing platform language."),
    p("Recruit sellers. Run ads. Acquire buyers. Offer discounts. Grow registrations. Add categories. Enter more cities. Put the two curves on a dashboard and wait for a network effect to appear."),
    p("Then launch day arrives. Buyers search and find nothing suitable. Suppliers join, receive no serious enquiries and stop responding. The growth team buys another wave of traffic to compensate. That traffic meets the same thin market, converts badly and leaves. Cost per acquisition rises. More incentives are added. The dashboard gets busier while the market gets weaker."),
    p("This is usually called a cold-start marketing problem. It is not."),
    p("It is a market-design problem."),
    p("Marketing can bring people to a marketplace. It cannot make the right supply available in the right place, at the right time, for the right demand. It cannot decide which side must be secured first, how transactions should be governed, which behaviour should be subsidised, how trust should be created or what minimum density makes the experience useful. Those are design decisions."),

    bq("A marketplace has not launched when both sides can sign up. It has launched when the right participants can complete a valuable exchange with acceptable reliability."),

    p("That distinction is the invisible lever. The visible launch gets attention: the app, the campaign, the registration number and the press release. The less-visible market underneath decides whether any of it compounds."),

    h2("The short answer: how do you solve a marketplace cold start?"),
    p("A practical marketplace cold-start strategy is to define the smallest viable market, secure the constrained side, concentrate compatible demand in the same place and time, manually produce the first successful matches, build trust into the transaction, and expand only after liquidity becomes repeatable without unsustainable incentives."),
    p("In other words:"),
    numbered("Define one atomic market."),
    numbered("Anchor the harder or more valuable side."),
    numbered("Concentrate the other side around it."),
    numbered("Match by hand before automating."),
    numbered("Design trust and incentives around the complete exchange."),
    numbered("Prove repeatable liquidity, then expand."),
    pLinks([
      { text: "This sequence matters because a marketplace is not one product. It is a coordinated system of participants whose value depends on one another. The classic economics is clear: two-sided platforms must get both sides on board, and the price structure between those sides can matter as much as the total price charged. That is the foundation of Jean-Charles Rochet and Jean Tirole's " },
      { text: "seminal work on two-sided markets", href: "https://www.ugr.es/~scarbo/ROCHETIR.pdf" },
      { text: "." },
    ]),
    p("The founder's practical problem is more specific: not merely getting both sides on board, but getting enough compatible, available and trusted participants into the same atomic market so useful transactions happen."),

    h2("The chicken-and-egg problem is really a sequencing problem"),
    p("The familiar version goes like this: suppliers will not join without buyers, and buyers will not come without suppliers. It sounds circular, so founders often respond symmetrically—spend on both sides at once."),
    p("Symmetry is usually the mistake."),
    p("The two sides rarely have equal difficulty, equal value or equal tolerance for waiting. One side may be scarce. One may be fragmented. One may already have a workable alternative. One may need weeks of verification before becoming usable. One may arrive only at a certain hour. One may be willing to multi-home across several platforms; the other may make an annual procurement decision. Treating those realities as two identical acquisition funnels destroys useful information."),
    p("The better question is not, “How do we acquire both sides?” It is, “Which side constrains a successful transaction, and what must be true before the other side arrives?”"),
    p("For a specialist industrial-services marketplace, the constraint may be verified technicians who can attend a plant quickly and meet safety requirements. For a wellness-booking platform, it may be credible practitioners with reliable appointment slots. For a B2B sourcing marketplace, it may be buyers with real, well-specified demand rather than thousands of passive supplier listings. For an education platform, it may be a small set of excellent instructors or, in another model, one anchor institution that brings an entire cohort."),
    pLinks([
      { text: "NFX, drawing on its experience with more than 60 early marketplaces, recommends getting the harder side first and reports that once the harder side reaches meaningful activity, the easier side can become " },
      { text: "two to ten times easier to acquire", href: "https://www.nfx.com/post/19-marketplace-tactics-for-overcoming-the-chicken-or-egg-problem" },
      { text: ". That range is an operator observation, not a universal benchmark. The durable lesson is the asymmetry: identify the constraint before buying growth." },
    ]),

    h3("A useful diagnostic"),
    p("Ask each side four questions:"),
    comparisonTable("Supply side", "Demand side", [
      { metric: "What must participants change?", a: "New workflow, pricing, availability, fulfilment or data?", b: "New search, buying, payment or approval behaviour?" },
      { metric: "What do they risk?", a: "Idle time, fees, reputation, leakage or poor-fit leads?", b: "Quality, delay, fraud, budget or switching cost?" },
      { metric: "How quickly do they get value?", a: "First viable enquiry, utilisation or repeat business?", b: "First credible option, quote, booking or delivery?" },
      { metric: "What happens if the platform is thin?", a: "No enquiries; poor leads; platform abandoned.", b: "No match; long wait; weak choice; platform abandoned." },
    ]),
    p("The side with the largest activation burden is not automatically the side to acquire first. But it is the side whose readiness must be designed first. If its profiles are incomplete, its availability is fictional or its response behaviour is unreliable, demand acquisition will simply expose the weakness faster."),

    h2("Registrations are not density, and density is not liquidity"),
    p("Three ideas are often mixed together:"),
    bulletBold("Activity", "means participants signed up, listed, searched, enquired or opened the app."),
    bulletBold("Density", "means enough relevant participants are present within the same market boundary."),
    bulletBold("Liquidity", "means a qualified participant has a high probability of completing the intended exchange within an acceptable time and at acceptable terms."),
    p("A marketplace can be active but not dense. It can be dense on paper but not liquid. A directory with 5,000 suppliers is not useful if only 50 respond, only five serve the buyer's location, and none can meet the required specification this week."),
    pLinks([
      { text: "Andreessen Horowitz defines match rate as the rate at which marketplace participants successfully find one another and recommends examining the “zeros”—qualified attempts that produce no transaction. Its " },
      { text: "marketplace-metrics guide", href: "https://a16z.com/13-metrics-for-marketplace-companies/" },
      { text: " also separates market depth, time to match, retention and unit economics. That is a better operating vocabulary than downloads and registrations." },
    ]),

    imageBlock(imgDensity, "Illustrative comparison showing how 200 suppliers spread across many markets can create less useful density than 30 concentrated suppliers"),

    p("Consider a simple illustration. Two hundred suppliers sounds better than 30. But spread the 200 across ten cities and ten categories and the arithmetic average is only two suppliers per city-category cell. Concentrate 30 verified, available suppliers in one city and one urgent category and a buyer may have 30 relevant options."),
    p("Real marketplaces are more complex: availability, quality, price bands, language, timing, capacity and buyer fit all reduce the usable pool. That only strengthens the point. Total supply is not the same as relevant supply."),
    p("The same error happens with geography. A caregiver in Delhi adds no value to a family that needs an in-person caregiver in Pune tomorrow. A spare-part listing in Ahmedabad may not solve a plant shutdown near Chakan if delivery takes three days. In locally networked businesses, a new city is not merely more reach. It is another cold start."),
    p("That is why the atomic market comes first."),

    h2("Start with the atomic market, not the total addressable market"),
    block("normal", [plain("An "), strong("atomic market"), plain(" is the smallest combination of demand and supply within which the marketplace can repeatedly deliver its core value. It is the unit that must become liquid before expansion.")]),
    p("It can be defined by:"),
    bullet("geography: one neighbourhood, industrial cluster, campus or city;"),
    bullet("category: one service, product family or job type;"),
    bullet("customer: one buyer segment with a shared problem;"),
    bullet("time: one service window, season or recurring event;"),
    bullet("transaction: one tightly specified request and fulfilment pattern;"),
    bullet("trust level: one verification or compliance standard."),
    p("The atomic market is not always geographic. A remote expert marketplace could be globally accessible but still need to begin with one role, such as fractional finance leaders for Indian manufacturing SMEs. A B2B sourcing platform may begin with one component family and one buyer cluster. A cohort-learning marketplace may focus on one exam, one language and one intake month."),
    p("The discipline is to make the market narrow enough that each new participant increases the probability of a useful match, but large enough that the exchange can repeat."),
    pLinks([
      { text: "DoorDash offers a clean operating example. Co-founder Tony Xu wrote that it began with " },
      { text: "only a couple of dozen restaurants in Palo Alto", href: "https://about.doordash.com/en-us/news/doordash-celebrates-its-10th-dashiversary" },
      { text: ", no other delivery area, no category beyond restaurants and fewer than six operating hours a day. The ambition was a last-mile network for every city; the initial market was intentionally small." },
    ]),
    p("That narrowness did not remove operating risk. Three months in, demand after a Stanford football game overwhelmed available Dashers, leaving orders more than an hour late on average. DoorDash refunded every order, spending about 40% of its remaining runway. The lesson is not that a narrow launch guarantees balance. It is that a narrow market makes imbalance observable and correctable. A nationwide launch would have hidden the cause inside averages."),

    h3("Atomic-market test"),
    p("Write this sentence without using “everyone”, “anywhere”, “all categories” or “24/7”:"),
    bq("For [specific buyer] in [specific context], we make it reliable to find [specific available supply] and complete [specific transaction] within [acceptable time]."),
    p("If the sentence is vague, the launch surface is probably too broad."),

    h2("The six-layer cold-start sequence"),
    imageBlock(imgSixLayer, "The six-layer marketplace cold-start sequence: define, anchor, concentrate, match, trust and prove"),

    h3("1. Define the exchange before the audience"),
    p("The first design object is not a persona or campaign. It is the successful exchange."),
    p("What exactly must happen for both sides to say the platform was worth using? A completed payment? A verified quote? A scheduled visit? A fulfilled order? A shortlist that meets procurement criteria? An accepted seat in a course?"),
    p("Then define the boundaries: who, what, where, when and under which conditions. Include the unhappy paths. What if supply accepts but does not fulfil? What if demand posts a vague request? What if the parties move off-platform? What if price changes after contact? What does the platform guarantee, and what does it merely facilitate?"),
    p("This work determines the first product scope. If the exchange requires availability, verification and a clear service radius, then profiles, search filters and payment screens are not enough. The platform needs an operating model for those conditions."),

    h3("2. Anchor the constrained side"),
    p("Find the side whose absence makes the market unusable and make that side available, not merely registered."),
    p("Availability may require:"),
    bullet("verified credentials and complete catalogue data;"),
    bullet("current capacity or appointment slots;"),
    bullet("service-area and lead-time commitments;"),
    bullet("response standards;"),
    bullet("price or quote rules;"),
    bullet("onboarding support;"),
    bullet("one-sided software that creates value before demand arrives;"),
    bullet("an anchor participant who brings many others."),
    p("A supplier count that includes incomplete, inactive or unavailable profiles is inventory fiction. Early marketplaces should publish less supply if that supply is more credible."),
    p("Sometimes demand is the anchor. A large manufacturer issuing real RFQs can attract a supplier network. A university can bring a cohort that makes instructor recruitment viable. NFX describes this as finding one giant user for initial supply or demand. The principle is to secure a dependable source of transaction intent, not to fetishise one side."),

    h3("3. Concentrate compatible demand"),
    p("Once the constrained side is usable, demand must be directed into the same atomic market. This is where marketing finally becomes powerful—because it is amplifying a designed market rather than exposing an empty one."),
    p("Concentration can come from:"),
    bullet("one buyer community;"),
    bullet("one industrial association;"),
    bullet("one neighbourhood;"),
    bullet("one weekly buying window;"),
    bullet("one narrowly worded search campaign;"),
    bullet("one partner with an existing audience;"),
    bullet("one use case whose urgency shortens adoption time."),
    p("Do not optimise the first campaign for cheapest registrations. Optimise for qualified requests that can be fulfilled by the supply already present. If your marketplace serves commercial cleaning, “business services” traffic is broad. “Emergency post-construction cleaning for offices in Baner and Hinjawadi” may be narrow enough to learn."),
    p("The best first demand often has high pain, clear specifications and a short path to decision. It produces faster feedback than aspirational browsing."),

    h3("4. Manufacture the first matches by hand"),
    p("Founders sometimes treat manual work as proof that the platform is not scalable. At cold start, it is proof that the team is still learning what must eventually scale."),
    p("Concierge matching can reveal:"),
    bullet("which request fields actually predict fit;"),
    bullet("which suppliers respond and why;"),
    bullet("what buyers mean by “urgent”, “verified” or “within budget”;"),
    bullet("where trust breaks;"),
    bullet("which negotiations happen outside the interface;"),
    bullet("which exceptions are common enough to become product rules."),
    p("NFX explicitly recommends connecting both sides by hand as a cold-start tactic. DoorDash's founding team also delivered orders, created menus, handled support and onboarded Dashers themselves. Manual operations are not a permanent architecture. They are an instrumented prototype of the market."),
    p("The rule is simple: do not automate confusion. First make ten, then 50, then 100 transactions work with human judgment. Record every intervention. Repeated interventions become workflow; repeated judgment becomes product logic; rare exceptions remain operations."),

    h3("5. Design trust and incentives around behaviour"),
    p("Early incentives are useful when they buy a behaviour that increases market quality. They are dangerous when they buy vanity activity."),
    p("Paying suppliers to complete verification, publish live availability or accept a first qualified job may strengthen liquidity. Paying for a profile that never responds does not. Waiving buyer fees for the first completed transaction can reduce risk. Paying for app installs cannot guarantee intent."),
    p("Every incentive should answer four questions:"),
    numbered("Which behaviour are we buying?"),
    numbered("Which side becomes more valuable because of it?"),
    numbered("How will we know the behaviour would continue without the subsidy?"),
    numbered("What is the maximum incentive-adjusted cost per successful exchange?"),
    p("Trust design matters just as much. In B2B markets, verification may include GST details, certifications, audit history, delivery capability or approved payment terms. In wellness, it may include practitioner credentials, informed consent, privacy and cancellation policy. In local services, it may include background checks, insurance, service guarantees and dispute resolution."),
    p("Trust is not a badge added after onboarding. It is the set of rules that makes participants willing to transact with a stranger."),

    h3("6. Prove repeatable liquidity before expanding"),
    p("Expansion should follow evidence that the atomic market works across cohorts and without permanently rising subsidies."),
    p("The evidence is not one good launch weekend. Look for:"),
    bullet("a rising or stable match rate for qualified requests;"),
    bullet("a falling time to first viable response;"),
    bullet("a declining zero rate;"),
    bullet("repeat core actions from both sides;"),
    bullet("reliable supplier fulfilment;"),
    bullet("improving organic or referral contribution;"),
    bullet("better unit economics as the market matures;"),
    bullet("no hidden collapse in quality, cancellations or off-platform leakage."),
    p("Andreessen Horowitz notes that local network effects should be tracked market by market because the effect resets in each geography. It also argues that older, denser local markets should generally show stronger retention than newer ones. That gives founders a useful expansion test: can the playbook reproduce the improvement curve in the next atomic market?"),
    p("If not, adding cities multiplies cold starts. It does not solve them."),

    h2("Marketing-led launch versus market-design-led launch"),
    comparisonTable("Marketing-led launch", "Market-design-led launch", [
      { metric: "Starting question", a: "How do we acquire both sides?", b: "What makes one exchange succeed reliably?" },
      { metric: "Market boundary", a: "Large TAM, many categories or cities", b: "One atomic market with explicit constraints" },
      { metric: "Supply goal", a: "Registrations or listings", b: "Verified, relevant, available capacity" },
      { metric: "Demand goal", a: "Traffic, leads or installs", b: "Qualified requests the current supply can fulfil" },
      { metric: "Early operations", a: "Push users into product flows", b: "Concierge matches and record interventions" },
      { metric: "Incentive logic", a: "Discount activity", b: "Buy behaviour that improves liquidity" },
      { metric: "Primary dashboard", a: "CAC, sign-ups, app opens", b: "Match rate, zero rate, time to match, repeat, margin" },
      { metric: "Expansion trigger", a: "Growth slows or capital arrives", b: "Liquidity repeats with improving economics" },
      { metric: "Likely failure mode", a: "Paid traffic amplifies a thin market", b: "Market stays narrow until the model is learnable" },
    ]),
    p("This does not make marketing secondary. It makes marketing sequenced. Once the market has enough useful depth, acquisition accelerates learning and transactions. Before that point, every new visitor is a test of the market design. Buying millions of tests does not improve a design that the team has not instrumented."),

    h2("A worked example: a Pune industrial-maintenance marketplace"),
    p("Imagine a founder building a B2B marketplace that connects factories around Pune with industrial-maintenance providers. The long-term vision covers electrical systems, pumps, compressed air, HVAC, CNC maintenance, calibration, safety inspection and spare parts across Maharashtra."),
    p("The initial launch plan is broad:"),
    bullet("onboard 500 vendors across 20 service categories;"),
    bullet("target factories across Pune district;"),
    bullet("run search and LinkedIn campaigns;"),
    bullet("offer free leads to vendors;"),
    bullet("celebrate 5,000 registrations as traction."),
    p("It looks ambitious. It is also almost impossible to diagnose."),
    p("A maintenance manager with a failed air compressor near Chakan does not need “industrial services”. She needs a verified technician who services that compressor type, can enter the plant under the required safety conditions, has a slot today and will provide a credible estimate. Five hundred vendor logos do not answer that question."),

    h3("Redesign the atomic market"),
    p("The team narrows the launch to:"),
    bq("Maintenance managers at small and mid-sized manufacturing plants in the Chakan industrial cluster who need urgent compressed-air system diagnosis during weekday operating hours, matched with verified local service providers able to respond within two hours."),
    p("Now the market can be designed."),
    p("The team recruits 30 providers, but only 18 pass verification and only 12 commit live response windows. Those 12 are the usable initial supply. It partners with two industrial associations and directly onboards 40 maintenance managers. Requests are submitted through a structured form asking compressor type, symptom, operating impact, location, access requirements and preferred response time."),
    p("For six weeks, the operations team matches every request manually."),

    h3("Illustrative first-month numbers"),
    p("The following numbers are hypothetical and exist to show the operating logic, not to claim a market benchmark:"),
    comparisonTable("Month-one observation", "What the team learns", [
      { metric: "Qualified requests", a: "50", b: "Demand is real enough to study." },
      { metric: "Requests with ≥1 viable provider response", a: "34", b: "Match rate is 68%; 16 requests still become zeros." },
      { metric: "Median time to first viable response", a: "42 minutes", b: "Acceptable for some cases, too slow for shutdowns." },
      { metric: "Provider acceptance-to-attendance rate", a: "82%", b: "Some “available” providers are not operationally reliable." },
      { metric: "Completed paid jobs", a: "24", b: "Request volume is not transaction volume." },
      { metric: "Buyers returning within 30 days", a: "11 of 40", b: "Early repeat signal; reasons need qualitative follow-up." },
      { metric: "Total incentives", a: "₹48,000", b: "₹2,000 incentive cost per completed job before other variable costs." },
    ]),
    p("The growth team could call 50 requests a success. The market team sees 16 zeros, ten matches that did not become paid jobs and a meaningful incentive burden."),
    p("Interviews show that eight zeros came from requests outside the promised service window, five from compressor models not covered by the current providers, and three from providers who had not updated availability. The next actions are obvious:"),
    bullet("state the response window more clearly;"),
    bullet("recruit providers for the two uncovered compressor families;"),
    bullet("add an availability confirmation at the start of each day;"),
    bullet("create a response-tier distinction for “plant shutdown” versus “performance issue”;"),
    bullet("stop campaigns in pin codes the current supply cannot serve;"),
    bullet("pay an incentive for completed attendance, not simple lead acceptance."),
    p("After two more months, assume match rate rises from 68% to 84%, median response falls from 42 to 24 minutes, and incentive cost per completed job falls because more providers participate without a bonus. Those figures still do not prove the full Maharashtra vision. They show that one atomic market is becoming usable."),
    p("Only then should the team choose the next adjacent market: perhaps the same category in Pimpri-Chinchwad, or the same buyer cluster with pump maintenance. Expanding both geography and category at once would erase the ability to know which change broke liquidity."),

    h2("What statistics should a cold-start team actually review?"),
    imageBlock(imgDashboard, "A marketplace liquidity dashboard showing match rate, time to match, zero rate, repeat rate, supplier utilisation and incentive-adjusted margin"),

    h3("1. Match rate"),
    bp("Formula:", "successful matches ÷ qualified requests."),
    p("Define “successful” tightly. A supplier viewing a lead may not count. A viable quote, accepted booking or completed transaction may. Segment the rate by location, category, time window and buyer type; a blended number can hide empty cells."),

    h3("2. Zero rate"),
    bp("Formula:", "qualified requests with no viable option ÷ qualified requests."),
    p("Every zero needs a reason code: no supply, no availability, price mismatch, specification mismatch, trust failure, response delay, buyer abandonment or product error. The zero-rate trend is often more actionable than total conversion."),

    h3("3. Time to match"),
    p("Use the median and a high percentile, not only the average. A median of 20 minutes can coexist with a painful tail of buyers waiting hours. Define the clock from genuine demand creation to first viable response, not to a notification being sent."),

    h3("4. Supplier utilisation"),
    bp("Formula:", "productive capacity ÷ available capacity."),
    p("Low utilisation makes the marketplace unattractive to supply. Very high utilisation can mean demand is going unserved. The right target depends on the category, but the directional question is universal: do good suppliers receive enough valuable work to remain responsive?"),

    h3("5. Repeat core-action rate"),
    p("Track whether participants repeat the action that represents value: request, quote, book, fulfil, reorder or refer. Logins are weak evidence. For episodic categories, use an appropriate window or measure multi-product expansion and referrals instead."),

    h3("6. Fulfilment quality"),
    p("Acceptance is not completion. Track cancellations, no-shows, disputes, rework, refunds, delivery variance and rating distribution. A high match rate with poor fulfilment is not liquidity; it is a faster route to distrust."),

    h3("7. Incentive-adjusted contribution margin"),
    bp("Formula:", "platform revenue minus payment, support, verification, fulfilment, refunds and both-side incentives attributable to the transaction."),
    p("Gross merchandise value is not platform revenue, and platform revenue is not contribution. Incentives can be legitimate cold-start investment. They become dangerous when the market appears healthy only while the subsidy grows."),

    h3("8. Market-level cohort improvement"),
    p("Do newer participants in a mature atomic market retain better than comparable participants in a newly launched one? Does organic acquisition rise as successful transactions create referrals? Does time to match fall as density grows? These are the behavioural signs that a network effect is becoming operational rather than rhetorical."),
    pLinks([
      { text: "Uber's explanation of its " },
      { text: "batched marketplace matching", href: "https://www.uber.com/us/en/marketplace/matching/" },
      { text: " makes a related point at scale: waiting a few seconds to evaluate a pool of nearby riders and drivers can reduce collective wait time compared with immediately pairing each rider to the closest driver. Uber says the matching system saves an aggregate ten years of people's time each day. That scale is far from a startup cold start, but the mechanism is instructive: market value depends on the quality of the pool and the matching rule, not simply the number of accounts." },
    ]),

    h2("The first 90 days: a market-design operating plan"),
    h3("Days 1–15: define the market and failure conditions"),
    bullet("Write the atomic-market sentence."),
    bullet("Map the complete exchange from intent to fulfilled value."),
    bullet("Name the constrained side and the evidence behind that choice."),
    bullet("Define qualified demand, viable supply and a successful match."),
    bullet("List regulatory, trust, payment and fulfilment risks."),
    bullet("Set a small baseline dashboard before campaigns begin."),

    h3("Days 16–30: secure usable supply or anchor demand"),
    bullet("Recruit the minimum credible participant set."),
    bullet("Verify capability, availability and response commitment."),
    bullet("Remove inactive and incomplete inventory from public view."),
    bullet("Give the anchor side immediate utility where possible: scheduling, catalogue tools, RFQ structure, lead management or demand insight."),
    bullet("Create reason codes for rejection, non-response and failure."),

    h3("Days 31–60: concentrate demand and concierge every match"),
    bullet("Run narrowly targeted acquisition into the designed market."),
    bullet("Manually review each qualified request."),
    bullet("Match with human judgment and record every intervention."),
    bullet("Interview successful and unsuccessful participants each week."),
    bullet("Repair the largest zero-rate cause before adding more traffic."),
    bullet("Test incentives against completed behaviour, not registrations."),

    h3("Days 61–90: codify, reduce subsidy and decide"),
    bullet("Turn repeated interventions into workflow or product logic."),
    bullet("Publish clear service, quality and response standards."),
    bullet("Compare cohorts and market cells, not blended totals."),
    bullet("Reduce one incentive and observe whether behaviour holds."),
    bullet("Calculate contribution after fulfilment and subsidies."),
    bullet("Decide: deepen the market, adjust the exchange, pause it or expand one adjacent dimension."),
    p("The milestone is not “launch completed”. It is a decision supported by evidence."),

    h2("The mistakes that make a marketplace look bigger and work worse"),

    h3("Launching too many cells"),
    p("Every category-geography-time combination is a separate liquidity problem. Ten cities times ten categories is not one market; it is potentially 100 cold starts."),

    h3("Treating listed supply as available supply"),
    p("If capacity, credentials, service radius and response behaviour are unknown, the listing is content—not inventory."),

    h3("Paying for sign-up instead of successful behaviour"),
    p("The incentive disappears; the inactive account remains. Pay for verification, responsiveness, fulfilment, repeat or another behaviour that increases transaction quality."),

    h3("Automating before understanding exceptions"),
    p("An algorithm can scale a bad match rule. Concierge work reveals which constraints deserve code and which deserve operations."),

    h3("Hiding zeros inside a conversion funnel"),
    p("A buyer who searches and leaves is not merely a lost conversion. It may be evidence of missing supply, weak relevance, poor trust or unacceptable timing. Capture the cause."),

    h3("Expanding because one market is saturated with spend"),
    p("Rising CAC does not automatically mean the next city is ready. It may mean the current market has weak retention or a limited use case. Expansion should follow repeatable liquidity, not campaign fatigue."),

    h3("Confusing openness with usefulness"),
    pLinks([
      { text: "More participants, categories and integrations can widen access while reducing discovery quality. ONDC's DigiDukaan programme offers a useful India-specific example of focused ecosystem building: its official page reports " },
      { text: "10,000+ kiranas, 1,000+ distributors and 35+ brands", href: "https://www.ondc.org/pages/digidukaan.html" },
      { text: ", with the programme live in Hyderabad and expanding to additional cities. Those counts describe an initiative, not a general marketplace benchmark. The strategic signal is the coordinated operating network around a specific procurement problem, not openness alone." },
    ]),

    h2("A 15-question marketplace cold-start audit"),
    p("Answer these before approving a large launch budget."),
    numbered("What exact exchange proves value for both sides?"),
    numbered("What is the smallest atomic market in which that exchange can repeat?"),
    numbered("Which side constrains successful transactions, and what evidence supports that view?"),
    numbered("How many registered suppliers are verified, relevant and available now?"),
    numbered("What makes a demand request qualified and fulfilable?"),
    numbered("What is the present match rate by market cell?"),
    numbered("What percentage of qualified requests produce zero viable options?"),
    numbered("What is the median and 90th-percentile time to first viable response?"),
    numbered("Why do matched transactions fail before completion?"),
    numbered("Which trust mechanism reduces the largest participant risk?"),
    numbered("What behaviour does each incentive buy?"),
    numbered("What is contribution margin after variable operations and incentives?"),
    numbered("Which early matches required manual intervention, and what did that intervention teach?"),
    numbered("What evidence shows participants repeat the core action or refer others?"),
    numbered("Which single adjacent dimension—buyer, category, geography or time—will be tested next?"),
    p("If several answers are unknown, the business does not need a bigger campaign yet. It needs a sharper market model and a better-instrumented first market."),

    h2("The operating rule"),
    bq("Do not scale the audience faster than the market can produce successful exchanges."),
    p("Prove one market. Make its supply real. Bring it compatible demand. Observe the exchange. Fix the zeros. Reduce the subsidy. Then expand one dimension at a time."),
    p("The cold-start problem feels like a shortage of users because empty marketplaces are visible as low traffic. But the deeper shortage is usually coordination: the right participants are not available under the same conditions, the match rule is immature, trust is incomplete, or the incentive system rewards the wrong behaviour."),
    p("Marketing cannot repair those things from outside. It can only send them more people."),
    p("That is why market design comes first."),

    callout(
      "Building a Platform? Start With the Market, Not the Feature List.",
      "MagicWorks provides founder-led, independent Marketplace & Platform Consultation for early platform decisions: core use case, monetisation, market entry, roadmap sequencing, build-versus-buy choices and the first 90 days. We advise. You choose who builds. There is no bundled implementation and no incentive to recommend a larger platform than the market needs.",
      "key-takeaway"
    ),
    linkPara("", "Request a Platform Strategy Workshop", "/services/platform-consultation", " or"),
    linkPara("", "book a discovery conversation", "/contact", ". Bring the real constraints—budget, timeline, operating capability and current dependencies—and we will help you identify the smallest market worth proving."),

    block("normal", [plain("Part of "), strong("The Invisible Levers"), plain(" series: the visible output gets attention; the less-visible system underneath often decides the result.")]),
  ];
}

const FAQ = [
  { question: "What is the marketplace cold-start problem?", answer: "The marketplace cold-start problem occurs when each participant group has too little reason to join or remain because the other side is not yet useful. Suppliers see no qualified demand; buyers find insufficient relevant supply. The practical solution is to sequence and concentrate the market, not simply acquire both sides broadly." },
  { question: "Is a marketplace cold start a marketing problem?", answer: "Usually not at its root. Marketing can attract participants, but it cannot create availability, relevance, trust, matching rules or sustainable incentives. Those are market-design decisions. Marketing works best after an atomic market has enough usable depth to serve the demand being acquired." },
  { question: "Which side of a marketplace should be built first?", answer: "Start by diagnosing the constrained side: the side whose absence, poor readiness or slow response prevents a successful exchange. Often that is supply, but anchor demand can lead in B2B or institutional marketplaces. The correct sequence depends on activation burden, scarcity, alternatives, trust and time to value." },
  { question: "What is an atomic market?", answer: "An atomic market is the smallest bounded market in which a platform can repeatedly deliver its core exchange. It may be defined by geography, category, buyer type, time window, transaction pattern or trust standard. Each new atomic market must establish its own usable density." },
  { question: "What is marketplace liquidity?", answer: "Marketplace liquidity is the probability that a qualified participant can complete the intended exchange within an acceptable time and at acceptable terms. It is commonly assessed through match rate, zero rate, time to match, fulfilment, repeat behaviour and market-level unit economics." },
  { question: "How much supply is enough to launch a marketplace?", answer: "There is no universal number. Enough supply means sufficient verified, relevant and available capacity to fulfil qualified demand inside the chosen atomic market. Thirty concentrated suppliers may create more value than hundreds spread across incompatible categories and locations." },
  { question: "Should early marketplace matches be manual?", answer: "Often, yes. Concierge matching helps a team learn the real fit criteria, trust barriers, exceptions and operating interventions before encoding them in software. Manual work should be instrumented and temporary: repeated patterns become product logic or standard operations." },
  { question: "What are the best cold-start marketplace metrics?", answer: "Track match rate, zero rate, time to first viable response, supplier utilisation, completion quality, repeat core actions and incentive-adjusted contribution margin. Segment them by the atomic market. Registrations, listings and app opens are useful inputs but weak evidence of market health." },
  { question: "When should a marketplace expand to another city or category?", answer: "Expand when the first atomic market shows repeatable liquidity, reliable fulfilment, repeat behaviour and improving economics without escalating subsidies. Change one major dimension at a time so the team can identify what causes performance to improve or break." },
  { question: "How can MagicWorks help with a marketplace launch?", answer: "MagicWorks offers independent platform strategy workshops and roadmap audits for founders and product leaders. The work can cover the core exchange, market entry sequence, monetisation, first-90-day roadmap, build-versus-buy decisions and vendor risk. MagicWorks advises; the client remains free to choose who builds and operates the platform." },
];

// ── Field-length guards (fail fast, before hitting the API) ─────────────────
const TITLE = "Cold Start Is Not a Marketing Problem. It Is a Market-Design Problem.";
const SLUG = "marketplace-cold-start-market-design";
const EXCERPT = "A practical marketplace cold-start strategy for sequencing supply and demand, building density, designing incentives and measuring liquidity.";
const SEO_TITLE = "Marketplace Cold Start: Design the Market First";
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

  const heroId = await uploadImage("marketplace-cold-start-market-design-hero-1280x512.png");
  const densityId = await uploadImage("marketplace-density-vs-total-users.png");
  const sixLayerId = await uploadImage("marketplace-six-layer-cold-start-sequence.png");
  const dashboardId = await uploadImage("marketplace-cold-start-liquidity-dashboard.png");

  const doc = {
    _id: "drafts.insight-mohan-marketplace-cold-start-market-design",
    _type: "insight",
    title: TITLE,
    slug: { _type: "slug", current: SLUG },
    excerpt: EXCERPT,
    categories: ["industry-insights"],
    pillar: "platform-consultation",
    publishedAt: "2026-09-14T03:30:00.000Z",
    author: { _type: "reference", _ref: authorId },
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroId },
      alt: "Sparse supply and demand converging into a dense, liquid two-sided marketplace",
    },
    seoTitle: SEO_TITLE,
    tags: [
      "marketplace liquidity",
      "two-sided marketplace",
      "chicken-and-egg problem",
      "marketplace launch strategy",
      "marketplace density",
      "platform strategy India",
    ],
    body: buildBody(densityId, sixLayerId, dashboardId),
    faq: FAQ.map((f, i) => ({ _type: "object", _key: `faq${i}`, question: f.question, answer: f.answer })),
  };

  console.log("💾  Creating DRAFT document…");
  const created = await client.create(doc);
  console.log(`✅  Draft created: ${created._id}`);
  console.log(`    NOTE: this is a DRAFT — it is not live on the site until published.`);
  console.log(`    Studio review: https://${PROJECT_ID}.sanity.studio/structure/insight;insight-mohan-marketplace-cold-start-market-design`);

  console.log("\n🎉  Done.\n");
}

main().catch((err) => {
  console.error("\n❌  Fatal:", err.message);
  process.exit(1);
});
