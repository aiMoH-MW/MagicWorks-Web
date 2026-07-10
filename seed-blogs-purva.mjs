/**
 * seed-blogs-purva.mjs
 * Creates the teamMember document for Purva Desai and 3 insight documents
 * for the "AI and the New Buyer" blog series (Blogs 1-3).
 *
 * Run from the project root:
 *   node seed-blogs-purva.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ── Parse .env.local manually ─────────────────────────────────────────────────
const envRaw = fs.readFileSync(path.join(__dirname, ".env.local"), "utf8");
const env = Object.fromEntries(
  envRaw
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const client = createClient({
  projectId:  env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:    env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-06-03",
  token:      env.SANITY_API_WRITE_TOKEN,
  useCdn:     false,
});

// ── Portable Text helpers ──────────────────────────────────────────────────────
let _k      = 0;
let _prefix = "pd1";

const resetKey = (prefix) => { _k = 0; _prefix = prefix; };
const k        = () => `${_prefix}${String(++_k).padStart(3, "0")}`;

const span   = (text, marks = []) => ({ _type: "span", _key: k(), text, marks });
const strong = (text) => span(text, ["strong"]);
const linked = (text, markKey) => span(text, [markKey]);
const plain  = (text) => span(text);

function block(style, children, markDefs = [], listItem = null) {
  const b = { _type: "block", _key: k(), style, markDefs, children };
  if (listItem !== null) { b.listItem = listItem; b.level = 1; }
  return b;
}

const h2 = (text) => block("h2", [plain(text)]);
const h3 = (text) => block("h3", [plain(text)]);
const h4 = (text) => block("h4", [plain(text)]);
const p  = (text) => block("normal", [plain(text)]);

const callout = (title, body, variant = "key-takeaway") =>
  ({ _type: "callout", _key: k(), title, body, variant });

// ============================================================
// BLOG 1: The New Psychology of Personalisation
// ============================================================

resetKey("pd1");

const body1 = [

  p("Picture two visitors landing on your website in the same minute. One sees your homepage exactly as it is built: a generic hero banner, a generic offer, a generic call to action. The other sees a version shaped by what they searched for last week, the industry they work in, and the page they lingered on. Which one stays longer? Which one buys?"),
  p("You already know the answer. Psychology explains why. The visitor who feels ignored decides, in seconds, that your website was not built for them. Their brain stops paying attention, whether or not you can see it happening in your funnel numbers."),
  p("For years, personalisation meant dropping a first name into an email subject line. That was never psychology. It was a trick, and buyers eventually spot tricks. What actually works is AI personalisation psychology: using data to reduce a buyer's effort, not just to sharpen your aim at them. AI has changed what is possible. It can now personalise at a depth and speed no human team could manage by hand. The businesses using it well are pulling ahead. The ones still sending the same message to everyone are falling behind, often without knowing why."),

  h2("Why Your Buyer's Brain Ignores Generic Marketing"),
  p("Human brains conserve energy wherever they can. Every decision, including whether to keep reading or click away, runs through a simple filter: does this feel like it is about me? If yes, the brain pays attention. If no, it moves on. This is not a modern habit. It is a survival instinct, repurposed for shopping."),
  p("When your message matches a buyer's actual situation, their brain treats it as worth the effort. When it does not, the brain filters it out, along with hundreds of other signals it ignores every day."),
  p("The data backs this up clearly. Consumers are 91% more likely to shop with brands that offer personalised experiences, and AI-powered personalisation has lifted conversion rates by as much as 202% in some implementations (Averi, 2026). Fast-growing companies also pull a meaningfully larger share of revenue from personalisation than slower-growing competitors (Envive, 2026). Worth noting honestly: these particular figures come from industry analyses rather than peer-reviewed or big-four research, so treat the exact multipliers as directional evidence of a real trend, not numbers to build a business case on line by line. Relevance is no longer a bonus feature. It is one of the main filters your buyer uses to decide whether you deserve their attention."),

  h2("What AI Sees That You Cannot Track"),
  p("Before AI, personalisation depended on a marketer's memory or a spreadsheet segment: age, city, maybe a past purchase category. That is a thin slice of what a buyer actually does. AI now tracks browsing sequences, time on page, scroll depth, search terms, cart abandonment, and response timing, and updates that picture in real time, not once a quarter."),
  p("This is why 73% of marketing leaders say AI now plays a direct role in building personalised experiences (Omnisend, 2026). Marketing teams have shifted roughly 40% of their budgets toward personalisation, nearly double the 22% share from 2023 (Marketing LTB, 2026). Your buyers expect this now. It is the baseline, not the bonus."),
  p("Three shifts follow for a growing business:"),
  block("normal", [plain("Recommendations built on what a visitor has actually shown interest in, not a generic bestseller list")],               [], "bullet"),
  block("normal", [plain("Email sequences that adjust based on how far someone has already moved through a decision, not a fixed drip schedule")], [], "bullet"),
  block("normal", [plain("Website content that changes by industry or company size, instead of showing every visitor the same homepage")],        [], "bullet"),

  h2("The Trust Gap Nobody Talks About"),
  p("Here is where most businesses get it wrong. Being understood and feeling watched sit close together in a buyer's mind. Gartner's 2025 research found only 15% of consumers fully trust brands with their data, yet 84% want more control over how personalisation is used on them (Omnibound, 2026). Over half of the personalisation attempts Gartner studied felt intrusive to the people receiving them, not helpful."),
  p("This is not a case against personalisation. It is a case for a specific kind: active personalisation, using data to reduce a buyer's uncertainty rather than chase them across the internet with the same product. Teams that make this shift see up to 2.3 times better purchase completion rates than teams running traditional retargeting (Omnibound, 2026)."),

  h2("Think This Is Just a B2C Problem? It Isn't."),
  p("There is a common assumption that this psychology matters mainly for consumer shopping, not B2B decisions. The data says otherwise. 73% of B2B buyers now want a personalised, consumer-grade experience from vendors, not a generic proposal template (InsightMark Research, 2026). One retail case documented by McKinsey found that raising personalisation depth from 20% to 95% of email campaigns produced a 41% lift in click-through rates and a 25% improvement in overall email performance, inside a B2B context, not a consumer storefront (InsightMark Research, 2026)."),
  p("If you are deciding where to invest next, this reframes personalisation. It is not a digital nice-to-have. It is a measurable lever on pipeline."),

  h2("The One Question to Ask Before You Personalise Anything"),
  p("Before deploying AI-driven personalisation, ask one question: does this make the buyer's next decision easier, or does it just make our targeting sharper? Reducing friction, showing someone the exact service tier for their company size, answering the question they searched for, builds trust. Sharper targeting without added value erodes it. The technology can do both. Which one you build is still a human decision, made by the people running the campaign, not the algorithm inside it."),
  p("None of this works if you cannot tell what a buyer actually wants next, only what they wanted yesterday. That is a different problem, and it is the one we tackle next in this series: how AI replaces guesswork about buyer behaviour with something closer to a real prediction."),

  h2("For Marketing and Sales Leaders: Where to Start This Week"),
  p("The section above is the case for why this matters. Here is where to actually start, whether you run the marketing function or carry a number:"),
  block("normal", [
    strong("Audit one high-traffic page"),
    plain(", your homepage or top landing page, for a single element you could personalise first: the headline, the featured case study, or the primary call to action, based on visitor industry or company size."),
  ], [], "bullet"),
  block("normal", [
    strong("Check whether your tracking goes beyond page views."),
    plain(" If you cannot currently see scroll depth, time on page, or content downloads per visitor, that is your first infrastructure gap to close, not a new AI tool to buy."),
  ], [], "bullet"),
  block("normal", [
    strong("Ask any vendor for a realistic timeline in writing before you sign."),
    plain(" Personalisation that actually works is a multi-month programme, not a one-time setup, and a promise of instant results is a reason to look closer, not a reason to move faster."),
  ], [], "bullet"),
  block("normal", [
    plain("If you want a structured way to run this audit properly rather than guessing at priorities, our "),
    linked("AI Marketing & Personalisation", "pd1amp"),
    plain(" team works through exactly this process with clients."),
  ], [{ _key: "pd1amp", _type: "link", href: "/services/ai-marketing-personalisation" }]),

  callout(
    "What This Means for Your Business",
    "If your personalisation strategy only uses AI to sharpen targeting, you are one misstep away from the trust penalty this data describes. The businesses winning with AI personalisation use it to remove friction and answer specific buyer questions faster, not to follow buyers around with the same offer. Audit your current personalisation touchpoints against one test: does this make the buyer's next decision easier, or does it just make our targeting sharper?",
    "key-takeaway"
  ),

  callout(
    "Want Help Building This",
    "MagicWorks helps growth-stage businesses design AI personalisation that builds trust instead of eroding it. Book a discovery call to see where your current approach stands.",
    "cta"
  ),

  block("normal", [
    strong("About the author: "),
    plain("Purva Desai is a content strategist and digital marketing specialist at MagicWorks IT Solutions Pvt. Ltd. She writes on AI, buyer psychology, and digital marketing strategy."),
  ]),
];

const faq1 = [
  {
    _key: k(),
    question: "Does AI personalisation actually increase conversions, or is it overhyped?",
    answer:   "The directional evidence is real - personalised experiences consistently outperform generic ones across the studies cited in this article - but treat any single multiplier as a trend indicator rather than a number to plan a budget around. The bigger risk is not underinvesting. It is implementing personalisation that feels like surveillance rather than relevance, which actively erodes trust.",
  },
  {
    _key: k(),
    question: "Is AI personalisation just a fancier version of putting a first name in an email?",
    answer:   "No. Basic mail-merge personalisation is a trick buyers have learned to spot. AI personalisation psychology works differently: it uses real behavioural data to reduce a buyer's effort and uncertainty, not just to make an offer look custom. The distinction matters because doing the first kind badly can damage the trust you need for the second kind to work.",
  },
  {
    _key: k(),
    question: "How long before a personalisation programme shows results?",
    answer:   "There is no universal timeline, and any vendor promising immediate results is worth questioning. The businesses cited in this piece treated personalisation as an ongoing programme built on clean data and continuous testing, not a one-time setup.",
  },
  {
    _key: k(),
    question: "What is the biggest risk of getting this wrong?",
    answer:   "Crossing from helpful into intrusive. Gartner's research found that over half of the personalisation attempts it studied felt intrusive to the people receiving them. The safest filter is to ask whether a given use of data makes the buyer's next decision easier, or simply makes your targeting sharper without adding value.",
  },
];

// ============================================================
// BLOG 2: How AI Removes Guesswork from Buyer Behaviour
// ============================================================

resetKey("pd2");

const body2 = [

  p("A sales director tells you a lead feels close. A marketing head greenlights a campaign because the audience feels right. For twenty years, that was the best available substitute for certainty. It no longer has to be."),
  p("AI buyer behaviour prediction can now test instinct against data before you spend a single rupee. This matters most for growing businesses - the ones with the least room to fund a campaign that misses."),
  p("The last piece in this series looked at how AI reads what a specific buyer wants right now, and why relevance earns attention. This piece goes one layer deeper: predicting what that buyer is likely to do before they do it."),

  h2("Why Your Gut Feeling Is Wrong More Often Than You Think"),
  p("This is not a criticism of experienced marketers and sales leaders. It is how human brains process patterns. Everyone is susceptible to a set of predictable biases when judging buyer intent. Recency bias makes the last conversation feel more predictive than it is. Confirmation bias makes a rep see what they expect to see. Anchoring lets an early impression colour every signal that follows. These are default settings in every brain, not flaws unique to your team."),
  p("Predictive models skip all of this. A 2024 peer-reviewed study comparing five machine learning approaches to customer behaviour found gradient boosting and random forest models reaching accuracy scores as high as 82.6%, consistently beating simpler statistical methods (ScienceDirect, 2024). That is not a marginal gain. It is the difference between \"we think this customer will convert\" and \"we tested this pattern against thousands of similar cases and can quantify the odds.\""),

  h2("From Hunches to Lead Scores"),
  p("Picture two reps working the same inbox. One follows up with every enquiry in the order it arrived. The other works from a live score that ranks each lead by likelihood to convert, based on company size, website activity, content engagement, and technographic signals. The second rep closes more, faster, because their time goes to the right prospects first."),
  p("This is what lead scoring does at scale. Salesforce's Einstein platform, one of the earliest large implementations of this approach, analyses thousands of data points per lead and compares them against patterns from previously closed deals to produce that live score (ALM Corp, 2025)."),
  p("The forecasting gap this closes is real. Manual sales forecasts typically land between 70% and 79% accuracy. AI-based forecasting reduces variance to within 8 to 15 percentage points, a 15 to 25% improvement over manual roll-ups (InsightMark Research, 2026). Separately, AI-powered forecasting has been measured at 79% accuracy against 51% for traditional methods inside the same organisations (InsightMark Research, 2026). For you, setting quarterly targets, that is the gap between a forecast built on hope and one built on your own historical data."),

  h2("You Don't Need Amazon's Budget to Use Amazon's Method"),
  p("Amazon's recommendation engine generates an estimated 35% of the company's total revenue through predicted product suggestions, built from purchase history, browsing time, and comparison against similar customers (ALM Corp, 2025). This figure circulates widely in marketing literature, and it is worth being direct about it: the original methodology behind it is not independently published, so treat it as an illustration of the mechanism rather than a verified number. Few businesses run at Amazon's scale regardless. The mechanism behind it, predicting the next likely action from accumulated behaviour, scales down just fine to a mid-size website, email list, or CRM."),
  p("Tesla's Model 3 launch used the same principle differently. Predictive modelling identified which customer segments would respond most to which vehicle features. Enthusiasts got performance specs. Sustainability-minded buyers got environmental impact. Budget-focused buyers got running cost. The result was strong conversion from a comparatively modest marketing spend (ALM Corp, 2025). As with the Amazon figure above, this example is widely cited as illustrative of the approach rather than independently audited. The underlying logic still holds regardless of the exact numbers: it works for any business with enough historical data to train a model against."),

  h2("The One Rule That Breaks Every Model If You Skip It"),
  p("Every predictive model runs on one hard constraint: your data quality sets the ceiling on your prediction quality. Poor input produces poor output, no matter how sophisticated the algorithm is (ALM Corp, 2025). Inconsistent CRM entries, untracked website behaviour, or siloed sales and marketing data will give you unreliable predictions even from the best tools available. Skip this step, and the guesswork does not disappear. It just gets replaced with more confident-looking guesswork."),

  h2("Why This Changes the Budget Conversation, Not Just the Campaign"),
  p("When you can show a CEO which segments a model predicts will convert at a specific rate, budget conversations change shape. Spend stops being justified by activity and starts being justified by predicted outcome: this segment shows a meaningfully higher probability of converting based on eighteen months of data. That shift alone protects a marketing budget during a downturn better than any single campaign result, because it gives leadership a number to hold the plan against."),

  h2("Where to Start on Monday Morning"),
  p("Removing guesswork does not require an enterprise data science team. It requires three things, in order: clean, connected data across marketing and sales; a predictive model trained on that data, custom-built or adopted through your CRM's existing AI features; and a habit of testing the model's predictions against real outcomes so it keeps improving instead of drifting. Treat this as an ongoing discipline, not a one-time setup, and prediction turns into revenue."),

  h2("What Happens to the Team Once the Guesswork Is Gone"),
  p("One thing worth planning for: your best salespeople may resist this at first. Instinct built over years feels like expertise, and in many ways it is. The shift is not asking them to abandon that instinct. It is asking them to test it against a second opinion that never gets tired, never has an off day, and never lets a good first impression override a weak set of signals. The reps who adapt fastest tend to be the ones who see the model as a second pair of eyes on their pipeline, not a replacement for the judgement they built over years of actually talking to buyers."),
  p("Prediction only matters if you still have time to act on it. That window, the gap between when a buyer first notices you and when they actually decide, has been shrinking fast. That is what we look at next in this series."),

  h2("For Marketing and Sales Leaders: Where to Start This Week"),
  p("The case above is the reason this matters. Here is where to actually begin:"),
  block("normal", [
    strong("Pull last quarter's closed-won and closed-lost deals"),
    plain(" and check whether your CRM data is clean enough to spot a pattern - consistent fields, tracked website behaviour, no duplicate or abandoned records. If it is not, that is your starting point, before any model."),
  ], [], "bullet"),
  block("normal", [
    strong("Ask your CRM vendor what predictive features you already have"),
    plain(" before buying a separate tool. Many platforms already include basic lead scoring that goes unused."),
  ], [], "bullet"),
  block("normal", [
    strong("Bring one prediction into your next budget review"),
    plain(", even an informal one, so spend starts getting justified by likelihood to convert rather than by activity volume alone."),
  ], [], "bullet"),
  block("normal", [
    plain("If you want help building this properly rather than bolting a model onto messy data, our "),
    linked("Predictive Marketing & Analytics", "pd2pma"),
    plain(" team runs this exact assessment with clients."),
  ], [{ _key: "pd2pma", _type: "link", href: "/services/predictive-marketing-analytics" }]),

  callout(
    "What This Means for Your Business",
    "Before you invest in predictive AI tools, invest in the data hygiene that makes their predictions reliable. Even the best model cannot outperform inconsistent CRM data. Use predictive lead scoring to redirect sales effort toward the prospects most likely to convert, and bring these numbers into budget conversations so spend decisions rest on probability, not activity.",
    "key-takeaway"
  ),

  callout(
    "Want Help Building This",
    "MagicWorks helps growth-stage businesses turn messy CRM data into predictive models sales teams actually trust. Book a discovery call to see where your data stands today.",
    "cta"
  ),

  block("normal", [
    strong("About the author: "),
    plain("Purva Desai is a content strategist and digital marketing specialist at MagicWorks IT Solutions Pvt. Ltd. She writes on AI, buyer psychology, and digital marketing strategy."),
  ]),
];

const faq2 = [
  {
    _key: k(),
    question: "Does AI buyer behaviour prediction actually outperform an experienced sales rep's gut feeling?",
    answer:   "The peer-reviewed research cited in this article shows predictive models reaching accuracy in the 80%+ range on customer behaviour, consistently ahead of simpler statistical methods. That does not make instinct worthless - it makes it something to test against a second opinion rather than the final word.",
  },
  {
    _key: k(),
    question: "Do we need Amazon-level data to use predictive AI?",
    answer:   "No. The widely cited Amazon and Tesla examples in this piece illustrate the mechanism, not a scale requirement. The underlying approach - predicting the next likely action from accumulated behaviour - works for any business with clean, consistent historical data, regardless of size.",
  },
  {
    _key: k(),
    question: "What is the single biggest reason predictive AI projects fail?",
    answer:   "Poor data quality. A predictive model cannot outperform inconsistent CRM entries, untracked website behaviour, or siloed sales and marketing data. Fixing data hygiene before buying a model is the highest-leverage first step.",
  },
  {
    _key: k(),
    question: "Will this replace our sales team's judgement?",
    answer:   "No, and treating it that way is where most implementations go wrong. The reps who adapt fastest use the model as a second pair of eyes on their pipeline, not a replacement for the relationship judgement built through years of actually talking to buyers.",
  },
];

// ============================================================
// BLOG 3: How AI Shortens the Distance Between Awareness and Action
// ============================================================

resetKey("pd3");

const body3 = [

  p("There used to be a predictable gap between a buyer noticing your brand and a buyer buying from it. They saw an ad, thought about it, mentioned it to a colleague, searched again weeks later, and eventually made contact. That gap gave your sales team time to nurture a lead through a long, visible funnel."),
  p("That gap has mostly disappeared. Understanding the B2B buyer journey AI has created is now a precondition for getting your marketing calendar right, and most businesses have not adjusted it to match."),
  p("The last two pieces in this series covered personalisation and prediction - in other words, knowing what a buyer wants and guessing what they will do next. This piece is about time: how much of it you actually have before they decide."),

  h2("The Buyer Has Already Decided Before You Know They Exist"),
  p("The data is unambiguous. B2B buyers now complete 61% of their purchase journey before making first contact with a vendor, down from 69% a year earlier. That pulls contact roughly six to seven weeks earlier in the process (Corporate Visions, 2026, citing 6sense's 2025 Buyer Experience Report). 83% of buyers say they have already defined their purchase requirements before they speak with a salesperson (6sense, 2025). By the time your team runs the \"discovery call,\" the buyer usually already knows what they want. The call validates a decision. It does not create one."),
  p("This compression comes almost entirely from AI-assisted research. 94% of B2B buyers now use large language models during their buying process. 89% ultimately buy from vendors whose solutions include AI capability, treating it as baseline, not a differentiator (6sense, 2025). Your buyer is not waiting for a rep to explain your category. They are asking an AI tool to summarise it, compare vendors, and shortlist options, often before your marketing team logs the visit."),

  h2("Why Your Buyer Would Rather Ask AI Than Call You"),
  p("This is not just about better tools. It reflects something basic about how the brain handles uncertainty. Faced with a decision, the brain wants the fastest route to a confident answer. For most of digital marketing's history, that route still meant multiple searches, several site visits, and manual comparison. AI collapsed those steps into one conversational exchange. Your buyer can now ask a single question and get a synthesised, comparative answer in seconds."),
  p("The effect on awareness-stage content is significant. B2B buyers review an average of 11.4 pieces of content before they are ready to contact a vendor (The SEO Works, 2026). 72% encountered an AI-generated overview during their research, and 90% of those buyers clicked through to at least one cited source (The SEO Works, 2026). If your content is not part of what AI tools surface and cite, you are invisible for 61% of the journey - the part that happens before anyone reaches out."),

  h2("The Day-One Shortlist Problem"),
  p("Here is the number every marketing head should sit with: 92% of B2B buyers start their research with at least one vendor already in mind, and 95% of the time, the eventual winner was already on that day-one shortlist (The SEO Works, 2026, citing 6sense). The first-choice vendor on that list wins the business roughly 80% of the time. The real competition for a sale is not won on the sales call. It is won, or lost, at the awareness stage, weeks before a buyer identifies themselves."),
  p("This changes what \"top of funnel\" content is for. It is no longer a broad net for volume. It is the deciding round of a competition that finishes before your sales team is invited to compete."),

  h2("Faster Does Not Mean Easier"),
  p("Do not read \"shortened distance\" as \"shorter journey.\" Dreamdata's 2026 benchmarking across 3.5 million B2B customer journeys found the average path from first impression to closed revenue actually stretched to 320 days, involving 6.8 stakeholders across 3.7 channels and roughly 76 touchpoints (The Wise Marketer, 2026). What compressed is the visible part - the part your sales team sees. What expanded is the invisible part: research, comparison, and internal discussion happening across AI tools, review sites, and peer conversations before anyone contacts you. Marketing now owns most of this journey. Dreamdata's data shows marketing touchpoints account for roughly 81% of the total timeline (Prospeo, 2026). The distance shortened only at the visible end. The work before that point grew."),

  h2("Three Things to Change This Quarter"),
  p("First, content quality at the awareness stage now matters more than content quantity, because it needs to earn a place on a shortlist that forms before contact. Second, being cited inside AI research tools is becoming as important as ranking in search results, since research increasingly happens inside AI conversations. Third, brief your sales team on what a lead already knows before contact. Treating an 83%-informed buyer like a cold lead wastes the credibility you already built."),

  h2("The Upside Nobody Mentions"),
  p("None of this is bad news if you adapt. A shorter distance between awareness and action means a well-positioned brand converts attention into revenue faster than the old, linear funnel ever allowed. The businesses losing ground here are not facing tougher competition. They are still building marketing calendars for a twelve-week consideration phase that, for most of their buyers, no longer exists."),

  h2("A Quick Way to Check Where You Stand"),
  p("Ask your team one question this week: if a prospect asked an AI tool to compare us against our two closest competitors right now, what would it say, and would our website even be in the answer? Most leadership teams have never tried this experiment on themselves. It takes ten minutes, and it tells you more about your real market position than most quarterly reports do, because it shows you exactly what your buyer sees during the part of the journey you cannot watch happen."),
  p("None of this compression works in your favour if the AI running your campaigns has no human strategy behind it. That risk is quiet, and it is costly. It is where we turn next in this series."),

  h2("For Marketing and Sales Leaders: Where to Start This Week"),
  p("The case above explains why this matters. Here is where to actually begin:"),
  block("normal", [
    strong("Run the AI shortlist test from the section above literally"),
    plain(" - this week, with your two real competitors named, and write down exactly what came back. That fifteen-minute exercise is more diagnostic than most quarterly marketing reports."),
  ], [], "bullet"),
  block("normal", [
    strong("Pull your last ten closed deals and ask sales what the buyer already knew"),
    plain(" by the time they made contact. If reps are consistently surprised by how informed buyers already are, your content is not reaching the awareness stage the way it needs to."),
  ], [], "bullet"),
  block("normal", [
    strong("Check whether your best content is structured for a single scan-read"),
    plain(" - a clear answer in the first two sentences of each section - before deciding you need more content rather than better-structured content."),
  ], [], "bullet"),
  block("normal", [
    plain("If you want a structured audit of where your business actually stands in AI-driven research today, our "),
    linked("Search & Answer Engine Optimisation", "pd3saeo"),
    plain(" team runs exactly this assessment with clients."),
  ], [{ _key: "pd3saeo", _type: "link", href: "/services/search-answer-engine-optimisation" }]),

  callout(
    "What This Means for Your Business",
    "Review your content and website for what a buyer encounters in the first 60% of their research, before they intend to contact you. That is where deals are now won or lost. Brief your sales team to treat inbound contact as a validation conversation with an informed buyer, not an introduction, and check whether your content is structured clearly enough for AI research tools to cite accurately.",
    "key-takeaway"
  ),

  callout(
    "Want Help Building This",
    "MagicWorks helps businesses get found and cited during the part of the buyer journey they cannot see happening. Book a discovery call to find out where you currently stand.",
    "cta"
  ),

  block("normal", [
    strong("About the author: "),
    plain("Purva Desai is a content strategist and digital marketing specialist at MagicWorks IT Solutions Pvt. Ltd. She writes on AI, buyer psychology, and digital marketing strategy."),
  ]),
];

const faq3 = [
  {
    _key: k(),
    question: "How much of the B2B buyer journey really happens before a vendor is contacted?",
    answer:   "Multiple 2025 and 2026 studies converge on a similar figure: roughly 61% of the purchase journey is typically complete before first vendor contact, and some benchmarks put the fully anonymous portion even higher. The exact number varies by study and category, but the direction is consistent across all of them.",
  },
  {
    _key: k(),
    question: "Does a shorter visible sales cycle mean the overall buying process is simpler now?",
    answer:   "No, and this is the most commonly misunderstood part of the shift. Benchmarking across millions of B2B journeys found the average path from first impression to closed revenue stretched to 320 days, involving nearly seven stakeholders across multiple channels. What shortened is the visible, sales-facing portion. The invisible research phase actually grew.",
  },
  {
    _key: k(),
    question: "What should our sales team do differently if buyers arrive this informed?",
    answer:   "Treat the first call as a validation conversation, not an introduction. Brief reps on what a typically informed buyer already knows before contact, so the conversation confirms a decision rather than re-explaining a category the buyer has already researched.",
  },
  {
    _key: k(),
    question: "How do we know if our content is reaching buyers before they contact us?",
    answer:   "Ask an AI research tool to compare your business against your two closest competitors, using the exact kind of question a buyer would ask. If your business is not part of the answer, your content is not reaching the awareness stage where most of this journey now happens.",
  },
];

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {

  // 1. Create/replace teamMember: Purva Desai
  console.log("Creating teamMember: Purva Desai...");
  await client.createOrReplace({
    _id:       "team-member-purva-desai",
    _type:     "teamMember",
    name:      "Purva Desai",
    slug:      { _type: "slug", current: "purva-desai" },
    role:      "Content Strategist",
    bio:       "Purva Desai is a content strategist and digital marketing specialist at MagicWorks IT Solutions. She writes on AI, buyer psychology, and digital marketing strategy.",
    linkedin:  "https://www.linkedin.com/in/purva-desai-4842b521/",
    isFounder: false,
    order:     2,
  });
  console.log("teamMember: Purva Desai created.");

  // 2. Upload cover images
  const imageDir = path.join(
    __dirname,
    "..",
    "Docs",
    "Blogs",
    "New blogs",
    "Blog 2 to 11 hero images",
    "Batch3 Purva"
  );

  const imageDefs = [
    {
      file:     "01_The_New_Psychology_of_Personalisation.png",
      filename: "blog-purva-01-the-new-psychology-of-personalisation.png",
      label:    "blog-purva-01",
    },
    {
      file:     "02_How_AI_Removes_Guesswork_from_Buyer_Behaviour -.png",
      filename: "blog-purva-02-how-ai-removes-guesswork-from-buyer-behaviour.png",
      label:    "blog-purva-02",
    },
    {
      file:     "03_How_AI_Shortens_the_Distance_Between_Awareness_and_Action.png",
      filename: "blog-purva-03-how-ai-shortens-the-distance-between-awareness-and-action.png",
      label:    "blog-purva-03",
    },
  ];

  const assets = [];
  for (const img of imageDefs) {
    const imagePath = path.join(imageDir, img.file);
    console.log(`Uploading ${img.label}...`);
    const buffer = fs.readFileSync(imagePath);
    const asset  = await client.assets.upload("image", buffer, {
      filename:    img.filename,
      contentType: "image/png",
    });
    console.log(`  Uploaded: ${asset._id}`);
    assets.push(asset);
  }

  // 3. Blog 1
  console.log("Creating insight-purva-01...");
  await client.createOrReplace({
    _id:   "insight-purva-01",
    _type: "insight",

    title:       "The New Psychology of Personalisation: What AI Knows About Your Buyer",
    seoTitle:    "The Psychology of AI Personalisation in Marketing",
    slug:        { _type: "slug", current: "the-new-psychology-of-personalisation-what-ai-knows-about-your-buyer" },
    excerpt:     "Why AI-driven personalisation works on a psychological level, and how to use it to build buyer trust instead of eroding it.",
    publishedAt: "2026-03-10T09:00:00.000Z",

    author:     { _type: "reference", _ref: "team-member-purva-desai" },
    categories: ["ai-marketing", "personalisation"],
    pillar:     "ai-marketing",
    tags:       [
      "AI personalisation psychology",
      "AI marketing personalisation",
      "buyer trust and AI targeting",
      "personalisation psychology in marketing",
      "active personalisation vs retargeting",
    ],

    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assets[0]._id },
      alt:   "Abstract illustration of a human silhouette surrounded by soft orbital data rings, representing AI-driven personalisation",
    },

    body:    body1,
    faq:     faq1,
    isGated: false,
  });
  console.log("insight-purva-01 created.");

  // 4. Blog 2
  console.log("Creating insight-purva-02...");
  await client.createOrReplace({
    _id:   "insight-purva-02",
    _type: "insight",

    title:       "How AI Removes Guesswork from Buyer Behaviour",
    seoTitle:    "How AI Removes Guesswork From Buyer Behaviour",
    slug:        { _type: "slug", current: "how-ai-removes-guesswork-from-buyer-behaviour" },
    excerpt:     "How predictive AI replaces gut-feel sales and marketing calls with data-backed accuracy, and where lead scoring earns the fastest ROI.",
    publishedAt: "2026-04-07T09:00:00.000Z",

    author:     { _type: "reference", _ref: "team-member-purva-desai" },
    categories: ["ai-marketing", "buyer-behaviour"],
    pillar:     "ai-marketing",
    tags:       [
      "AI buyer behaviour prediction",
      "predictive lead scoring",
      "AI sales forecasting accuracy",
      "remove guesswork from marketing",
      "predictive analytics in marketing",
    ],

    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assets[1]._id },
      alt:   "Abstract illustration of an arrow moving confidently through fading question marks, representing AI replacing guesswork with certainty",
    },

    body:    body2,
    faq:     faq2,
    isGated: false,
  });
  console.log("insight-purva-02 created.");

  // 5. Blog 3
  console.log("Creating insight-purva-03...");
  await client.createOrReplace({
    _id:   "insight-purva-03",
    _type: "insight",

    title:       "How AI Shortens the Distance Between Awareness and Action",
    seoTitle:    "How AI Shortens the B2B Buyer Journey to Action",
    slug:        { _type: "slug", current: "how-ai-shortens-the-distance-between-awareness-and-action" },
    excerpt:     "B2B buyers now decide 61% of their purchase before contacting you. What that compression means for your content and sales process.",
    publishedAt: "2026-05-12T09:00:00.000Z",

    author:     { _type: "reference", _ref: "team-member-purva-desai" },
    categories: ["ai-marketing", "buyer-journey"],
    pillar:     "ai-marketing",
    tags:       [
      "B2B buyer journey AI",
      "buyer journey compression",
      "AI-assisted buyer research",
      "shorten sales cycle with AI",
      "awareness stage content strategy",
    ],

    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: assets[2]._id },
      alt:   "Abstract illustration of a compressed timeline ending in a call-to-action, representing how AI has shortened the buyer journey",
    },

    body:    body3,
    faq:     faq3,
    isGated: false,
  });
  console.log("insight-purva-03 created.");

  console.log("\nAll done. 1 author + 3 blogs created.");
  console.log("  /blog/the-new-psychology-of-personalisation-what-ai-knows-about-your-buyer");
  console.log("  /blog/how-ai-removes-guesswork-from-buyer-behaviour");
  console.log("  /blog/how-ai-shortens-the-distance-between-awareness-and-action");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
