/**
 * seed-blogs-02-11.mjs
 * Creates Blog 02, 04, 05, 06, 07, 08, 09, 10, 11 in Sanity CMS and uploads cover images.
 *
 * Run from the project root:
 *   node seed-blogs-02-11.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse .env.local manually
const envRaw = fs.readFileSync(path.join(__dirname, ".env.local"), "utf8");
const env = Object.fromEntries(
  envRaw.split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const idx = l.indexOf("=");
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
    })
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-06-03",
  token:     env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
});

// Key counter - reset per blog
let _k = 0;
let _kPrefix = "b02";
const k = () => `${_kPrefix}k${String(++_k).padStart(3, "0")}`;
function resetKey(prefix) { _k = 0; _kPrefix = prefix; }

// Portable Text helpers
const span   = (text, marks = []) => ({ _type: "span", _key: k(), text, marks });
const strong = (text) => span(text, ["strong"]);
const linked = (text, markKey) => span(text, [markKey]);
const plain  = (text) => span(text);

function block(style, children, markDefs = [], listItem = null) {
  const b = { _type: "block", _key: k(), style, markDefs, children };
  if (listItem !== null) { b.listItem = listItem; b.level = 1; }
  return b;
}

const h2      = (text) => block("h2", [plain(text)]);
const p       = (text) => block("normal", [plain(text)]);
const callout = (title, body, variant = "key-takeaway") =>
  ({ _type: "callout", _key: k(), title, body, variant });

// Upload cover image helper
async function uploadImage(filename) {
  const imagePath = path.join(
    __dirname, "..", "Docs", "Blogs", "New blogs", "Blog 2 to 11 hero images", filename
  );
  console.log(`  Uploading ${filename}...`);
  const imageBuffer = fs.readFileSync(imagePath);
  const asset = await client.assets.upload("image", imageBuffer, {
    filename,
    contentType: "image/png",
  });
  console.log(`  Image uploaded: ${asset._id}`);
  return asset;
}

// ── Blog 02: SEO vs AEO vs GEO ─────────────────────────────────────────────
async function createBlog02() {
  resetKey("b02");
  const asset = await uploadImage("blog-02-seo-vs-aeo-vs-geo.png");

  const body = [
    callout(
      "Key Takeaway",
      "SEO (Search Engine Optimisation) earns rankings and clicks from search engines. AEO (Answer Engine Optimisation) earns citations from AI systems that answer questions directly. GEO (Generative Engine Optimisation) earns brand mentions inside AI-generated answers through sustained, expert content. They share one foundation but have three different units of success, and most businesses need a deliberate mix, not all three at equal weight."
    ),
    p("The marketing industry has produced three acronyms in three years, and vendors are now selling them as three separate products. That is confusing at best and expensive at worst."),
    p("This article gives you plain definitions, an honest map of where the disciplines overlap, and a straightforward way to decide which one deserves your budget. It is also where we explain how we name these services ourselves, and why."),

    h2("What is SEO?"),
    p("Search Engine Optimisation is the practice of improving your website so search engines rank it higher for the queries your buyers type. It covers technical health (crawlability, speed, mobile performance), on-page relevance (content, structure, internal linking), and authority (backlinks and reputation)."),
    p("The unit of success is a ranking, and the business outcome is a click. Someone searches, sees your page in the results, and visits your site. SEO has been the backbone of organic growth for two decades, and despite yearly obituaries, it still is. Search engines remain the largest discovery layer on the internet, and every newer discipline in this article depends on the infrastructure SEO builds."),

    h2("What is AEO?"),
    p("Answer Engine Optimisation is the practice of structuring content so AI-powered systems can extract it and cite it when they answer a user's question directly. Answer engines include Google's AI Overviews, Microsoft Copilot, ChatGPT, and Perplexity: systems that respond with an answer instead of a list of links."),
    block("normal", [
      plain("The unit of success is a citation. The user may never click, but your brand appears as the source of the answer at the exact moment they are forming an opinion. AEO work includes question-first content structure, direct extractable answers, structured data such as the vocabulary documented at "),
      linked("schema.org", "schOrgLink"),
      plain(", and entity clarity, meaning the engine knows precisely who you are and what you do."),
    ], [{ _key: "schOrgLink", _type: "link", href: "https://schema.org" }]),
    p("If you want the full mechanics, we published a complete practical guide to Answer Engine Optimisation, including the Citation Signals framework we use in client work. This article stays at the map level."),

    h2("What is GEO?"),
    p("Generative Engine Optimisation is the practice of earning brand mentions and citations inside AI-generated answers through a sustained programme of high-quality, expert-attributed content. Where AEO is largely about how content is structured, GEO is about whether the content deserves to exist at all: original points of view, first-hand data, named expertise, and consistency over months."),
    p("The unit of success is a mention: your brand or your founder named inside an AI answer as an authority on the topic, whether or not a link accompanies it. When someone asks an AI assistant who the credible voices on AI adoption in Indian manufacturing are, the names that appear did not get there through schema markup. They got there through a body of work the models learned to associate with the topic."),
    p("That distinction matters because it changes who does the work. Structure is a technical job. A body of work is an editorial one."),

    h2("The overlap: one foundation, three layers"),
    p("Here is the part most vendor pitches skip. The three disciplines are not parallel silos. They stack."),
    block("normal", [
      strong("The shared foundation is a technically healthy, crawlable, fast website with honest content."),
      plain(" Google's own "),
      linked("documentation on AI features in Search", "gscLink02"),
      plain(" confirms that AI surfaces draw on the same index and quality signals as classic search. An answer engine cannot cite a page it cannot crawl. A generative model cannot learn your expertise from content that does not exist. SEO builds the ground floor."),
    ], [{ _key: "gscLink02", _type: "link", href: "https://developers.google.com/search/docs/appearance/ai-features" }]),
    block("normal", [
      strong("AEO is a structural layer on top of that foundation."),
      plain(" The same page that ranks can be restructured to become citable: question headings, extractable summaries, structured data, named authors. Good AEO work usually improves rankings too, because clarity helps humans and crawlers alike."),
    ]),
    block("normal", [
      strong("GEO is an editorial layer on top of both."),
      plain(" It cannot be retrofitted onto a page. It is earned through publishing, consistently, in a named expert voice, across your website and the wider web, until the models corroborate your authority from multiple directions."),
    ]),
    p("Where they differ is the unit of optimisation, the metric, and the owner. SEO optimises pages, measures rankings and traffic, and belongs to your technical and content team. AEO optimises passages, measures citations, and belongs to the same team with a structural playbook. GEO optimises a body of work, measures brand mentions in AI answers, and belongs to your most senior voices, because models cite expertise, and expertise has a name attached."),

    h2("How we name these disciplines, and why"),
    p("At MagicWorks we deliberately do not sell three acronyms. We sell two services, and the naming is intentional."),
    block("normal", [
      strong("Search & Answer Engine Optimisation"),
      plain(" is one combined technical discipline. We never split it, because in practice the work is inseparable: the same audit, the same content restructuring, the same schema, the same measurement loop covers both search rankings and answer-engine citations. Selling them separately would mean billing you twice for one job."),
    ]),
    block("normal", [
      strong("Thought Leadership & GEO"),
      plain(" is a separate service, and GEO lives there on purpose. Generative Engine Optimisation is achieved through consistent, quality, founder-attributed content production, not through technical optimisation alone. It belongs with the editorial programme that produces that content: long-form articles, points of view, and the sustained publishing calendar that turns a senior person's expertise into something AI models cite. The buyer is usually a founder or CXO building personal authority, and the company earns the halo."),
    ]),
    p("You do not have to adopt our naming. But you should demand that whoever you hire can explain where their technical work ends and their editorial work begins. If a proposal charges separately for \"SEO,\" \"AEO,\" and \"GEO\" without a clear answer to that question, you are likely paying three times for overlapping effort."),

    h2("Which one does your business actually need?"),
    p("A practical decision guide, by situation rather than by acronym."),
    block("normal", [
      strong("If your website is slow, thin, or poorly structured:"),
      plain(" start with the foundation. No citation strategy survives a site that engines cannot crawl and users will not stay on. This is Search & Answer Engine Optimisation work, and the answer-engine layer comes along with it."),
    ]),
    block("normal", [
      strong("If you rank reasonably well but never appear in AI answers:"),
      plain(" your problem is structural. Question-first headings, extractable answers, entity clarity, and structured data will move you faster than more backlinks will."),
    ]),
    block("normal", [
      strong("If your category's AI answers name your competitors as the authorities:"),
      plain(" your problem is editorial. You need a sustained thought-leadership programme with a named senior voice, which is GEO territory, and it is a months-long commitment rather than a project."),
    ]),
    block("normal", [
      strong("If you are a founder or CXO whose personal authority drives the business:"),
      plain(" GEO through thought leadership is the highest-leverage option on this page, because models increasingly attribute expertise to people, and your company inherits the trust."),
    ]),
    p("Most businesses we audit need the first two together and underestimate the third. Almost none need three separate retainers."),

    h2("The one-line summary"),
    p("SEO gets you found. AEO gets you cited. GEO gets you named. They share one foundation, and the honest way to buy them is as two disciplines: one technical, one editorial."),

    block("normal", [
      strong("About the author: "),
      plain("Swapnil Ughade is the Founder of MagicWorks IT Solutions Pvt. Ltd., an AI-first digital marketing agency based in Pune, India. He brings 17+ years of experience across digital marketing, web development, and AI strategy, and leads the agency's Search & Answer Engine Optimisation practice."),
    ]),
  ];

  const faq = [
    {
      _key: k(),
      question: "Are SEO, AEO, and GEO different services?",
      answer: "They are related disciplines built on one foundation. SEO and AEO share the same technical and structural work, which is why credible agencies deliver them as one combined service. GEO is different in kind: it is earned through a sustained editorial programme of expert-attributed content, so it belongs with thought leadership rather than technical optimisation.",
    },
    {
      _key: k(),
      question: "Does AEO or GEO replace SEO?",
      answer: "No. AI answer engines crawl and evaluate the same web that search engines do, so SEO remains the foundation both newer disciplines stand on. A site that cannot rank is very unlikely to be cited or mentioned.",
    },
    {
      _key: k(),
      question: "What is the difference between AEO and GEO?",
      answer: "AEO is primarily structural: formatting content so AI systems can extract and cite it, using question-first headings, direct answers, and structured data. GEO is primarily editorial: building a body of expert, named content over time so AI models associate your brand and your people with the topic. AEO changes how a page is written. GEO changes whether the models consider you an authority at all.",
    },
    {
      _key: k(),
      question: "Who should invest in GEO first?",
      answer: "Founders, CEOs, and senior experts whose personal credibility drives business outcomes. AI models increasingly attribute expertise to named people, and a sustained thought-leadership programme under a senior name earns mentions that a company page alone rarely achieves.",
    },
    {
      _key: k(),
      question: "Can one agency handle all three?",
      answer: "Yes, and arguably one agency should, because the disciplines share a foundation and splitting them across vendors creates duplicated audits and conflicting recommendations. The question to ask any agency is where their technical work ends and their editorial work begins. A clear answer signals they understand the difference.",
    },
  ];

  const doc = {
    _id:         "insight-blog-02",
    _type:       "insight",
    title:       "SEO vs AEO vs GEO: What Each One Actually Means and Where They Overlap",
    seoTitle:    "SEO vs AEO vs GEO: What Each Means and Where They Overlap",
    slug:        { _type: "slug", current: "seo-vs-aeo-vs-geo-differences" },
    excerpt:     "SEO, AEO, and GEO are related but not interchangeable. A plain-language guide to what each discipline does, how they overlap, and which one your business needs.",
    publishedAt: "2026-01-05T09:00:00.000Z",
    author:      { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories:  ["digital-marketing", "seo-aeo"],
    pillar:      "digital-marketing",
    isGated:     false,
    coverImage:  {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt:   "SEO vs AEO vs GEO: what each discipline means and where they overlap",
    },
    body,
    faq,
  };

  console.log("  Creating insight-blog-02...");
  const result = await client.createOrReplace(doc);
  console.log("  Done:", result._id);
}

// ── Blog 04: Commission-Based Ad Management ────────────────────────────────
async function createBlog04() {
  resetKey("b04");
  const asset = await uploadImage("blog-04-commission-based-ad-management.png");

  const body = [
    callout(
      "Key Takeaway",
      "Commission-based ad management, where the agency charges a percentage of your monthly ad spend, aligns incentives well for advertisers spending roughly Rs 5 lakh a month or more, because the agency's effort scales with account complexity. Below that level it usually distorts incentives or underpays the work. The model itself is neither good nor bad; the safeguards around it decide everything, and this guide gives you the seven questions that expose whether those safeguards exist."
    ),
    p("If you spend serious money on Google and Meta ads, you have met the percentage-of-spend proposal. The agency takes a commission of whatever you spend each month, and the pitch writes itself: \"we only grow when you grow.\""),
    p("That pitch is half true, which is precisely what makes it dangerous. This article explains the model honestly, from an agency that uses it, including the situations where you should refuse it."),

    h2("How do agencies charge for ad management?"),
    p("Three pricing models cover nearly the entire market, and each one bends the agency's behaviour in a different direction."),
    block("normal", [
      strong("Flat retainer."),
      plain(" A fixed monthly fee regardless of spend. Predictable for you, and it removes any incentive to inflate your budget. Its weakness appears at scale: an account spending Rs 15 lakh a month needs far more optimisation work than one spending Rs 1 lakh, and a flat fee either overcharges the small account or starves the large one of attention."),
    ]),
    block("normal", [
      strong("Percentage of spend, the commission model."),
      plain(" The agency charges an agreed percentage of your monthly ad spend. Fees scale automatically with account size and complexity, which is honest at high spend. Its weakness is the obvious one: the agency earns more when you spend more, whether or not the spend performs."),
    ]),
    block("normal", [
      strong("Performance and hybrid models."),
      plain(" Fees tied partly to outcomes such as leads or revenue, often layered on a smaller base fee. Attractive on paper, but they require clean attribution and conversion tracking that both sides trust, and they can push agencies toward short-term volume tactics that damage lead quality."),
    ]),
    p("There is no fourth model that fixes everything. There are only trade-offs, managed well or badly."),

    h2("When does commission-based pricing work?"),
    p("The model earns its keep under specific conditions, and it is worth being precise about them."),
    block("normal", [
      strong("Your monthly spend is roughly Rs 5 lakh or higher."),
      plain(" At this scale, account complexity genuinely grows with budget: more campaigns, more creative variants, more audience segments, more bid strategy work, more that can quietly go wrong. A fee that scales with spend funds the attention the account actually needs. This is exactly why we work on this model with advertisers in the Rs 5 to Rs 10 lakh and above range, and why we do not pitch it below that level."),
    ]),
    block("normal", [
      strong("Your growth plan involves scaling spend."),
      plain(" If you intend to grow the budget as performance proves out, a commission model means you never renegotiate fees at each stage. The commercial relationship scales with the business relationship."),
    ]),
    block("normal", [
      strong("Conversion data flows freely."),
      plain(" The model only stays honest when both sides stare at the same conversion numbers. Google's and Meta's own "),
      linked("conversion tracking documentation", "convTrackLink"),
      plain(" describes the plumbing; the point is that it must be in place, verified, and visible to you before a commission arrangement starts."),
    ], [{ _key: "convTrackLink", _type: "link", href: "https://support.google.com/google-ads/answer/1722022" }]),
    block("normal", [
      strong("The agency's recommendations sometimes cost the agency money."),
      plain(" This is the tell. A commission-model agency that has ever told you to pause spend, cut a campaign, or hold budget flat during a weak season has proven the safeguards work. One that has only ever recommended increases has proven the opposite."),
    ]),

    h2("When does commission-based pricing fail?"),
    p("Equally specific, and worth reading before any contract."),
    block("normal", [
      strong("Low monthly budgets."),
      plain(" Below a few lakh a month, a percentage fee is too small to fund real management, so the account gets junior attention and templated campaigns, or the agency pads the percentage until you are overpaying a retainer in disguise. At low spend, a transparent flat fee is almost always the better structure."),
    ]),
    block("normal", [
      strong("No independent conversion tracking."),
      plain(" If the only performance numbers come from the agency's own reports, the incentive problem has no counterweight. Spend can drift upward on vanity metrics: impressions, clicks, and reach that never becomes revenue."),
    ]),
    block("normal", [
      strong("Commission on everything, including waste."),
      plain(" Some contracts charge commission on total spend even when a portion of it is demonstrably wasted, such as broad-match bleed or placement junk the agency never audited. The model should reward managed spend, not gross spend."),
    ]),
    block("normal", [
      strong("Quarterly budget recommendations with no downward option."),
      plain(" If every quarterly review ends in \"increase the budget,\" you are not receiving strategy. You are receiving a sales process with a dashboard attached."),
    ]),

    h2("The incentive problem, and how honest agencies solve it"),
    p("Let us name the conflict plainly, because most agencies will not. Under a commission model, the agency's revenue rises with your spend, and your interest is efficient spend, not maximal spend. Those two lines do not automatically point the same way."),
    p("Four safeguards make them converge, and any agency worth hiring will already have them in writing."),
    p("First, performance-tied review, not spend-tied review: budget recommendations justified by cost per conversion and revenue trends, never by \"opportunity\" language alone. Second, your ownership of the ad accounts, always, so you can see raw platform data and leave with your history intact. Third, reporting built on conversions and cost per conversion rather than impressions and clicks. Fourth, a written willingness to recommend spending less when the data says so, demonstrated in practice at least once before you should fully relax."),
    p("We hold ourselves to those four, and we would rather lose a proposal than remove them, because a commission model without safeguards eventually costs the client trust and the agency its reputation. Both are more expensive than any fee."),

    h2("The seven questions to ask before signing a commission agreement"),
    p("Take these into any agency conversation, including one with us."),
    block("normal", [
      strong("1. \"What percentage, calculated on what, exactly?\""),
      plain(" Gross spend, managed spend, or spend net of waste? Ambiguity here compounds monthly."),
    ]),
    block("normal", [
      strong("2. \"Who owns the ad accounts and the data?\""),
      plain(" The only acceptable answer is you. Anything else is a hostage arrangement dressed as convenience."),
    ]),
    block("normal", [
      strong("3. \"Show me a client where you recommended reducing spend.\""),
      plain(" The single most revealing question on this list. Watch for a specific story, not a philosophical answer."),
    ]),
    block("normal", [
      strong("4. \"What conversion tracking will we verify together before launch?\""),
      plain(" No shared source of truth, no commission model."),
    ]),
    block("normal", [
      strong("5. \"Is there a minimum fee, and what happens in low-spend months?\""),
      plain(" A reasonable floor is normal and honest; it funds baseline work in seasonal dips. An undisclosed one is a red flag by omission."),
    ]),
    block("normal", [
      strong("6. \"What does the monthly report lead with?\""),
      plain(" If the answer starts with impressions and reach rather than conversions and cost per conversion, the incentives have already leaked into the reporting."),
    ]),
    block("normal", [
      strong("7. \"What would make you tell us to fire you?\""),
      plain(" Confident agencies have an answer, because they have refused misfit work before. Agencies that need every client cannot afford honesty, and that shows up in your budget eventually."),
    ]),

    h2("The one-line summary"),
    p("Commission-based ad management is the right model for serious spenders working with a disciplined agency, and the wrong model everywhere else. The percentage is not the thing to negotiate hardest. The safeguards are."),

    block("normal", [
      strong("About the author: "),
      plain("Swapnil Ughade is the Founder of MagicWorks IT Solutions Pvt. Ltd., an AI-first digital marketing agency based in Pune, India. He brings 17+ years of experience across digital marketing, web development, and AI strategy. MagicWorks manages performance marketing for advertisers on a commission model, which is exactly why this article names its weaknesses."),
    ]),
  ];

  const faq = [
    {
      _key: k(),
      question: "What is commission-based ad management?",
      answer: "It is an agency pricing model where the management fee is an agreed percentage of your monthly advertising spend on platforms like Google Ads and Meta. Fees scale automatically as the account grows, which suits high-spend advertisers whose accounts genuinely require more work as budgets rise.",
    },
    {
      _key: k(),
      question: "What ad spend level justifies a commission model?",
      answer: "As a working rule, monthly spend of roughly Rs 5 lakh or more. At that scale, account complexity grows with budget and a percentage fee funds proportionate attention. Below that level, a transparent flat retainer usually serves the advertiser better.",
    },
    {
      _key: k(),
      question: "Is percentage-of-spend pricing a conflict of interest?",
      answer: "It contains one, and honest agencies say so. The agency earns more when you spend more, so the model is only safe with safeguards: client ownership of ad accounts, independently verified conversion tracking, conversion-led reporting, and a demonstrated willingness to recommend spending less when the data supports it.",
    },
    {
      _key: k(),
      question: "Should the commission apply to total spend or managed spend?",
      answer: "Managed spend, and the contract should say precisely how it is calculated. Charging commission on demonstrably wasted spend removes the agency's incentive to eliminate that waste.",
    },
    {
      _key: k(),
      question: "What is the most important question to ask a commission-model agency?",
      answer: "Ask them to show you a client where they recommended reducing spend. An agency that has never made that recommendation has never resolved the model's core conflict, no matter what the proposal says.",
    },
  ];

  const doc = {
    _id:         "insight-blog-04",
    _type:       "insight",
    title:       "Commission-Based Ad Management: When It Works, When It Doesn't, and What to Ask Your Agency",
    seoTitle:    "Commission-Based Ad Management: When It Works, When It Fails",
    slug:        { _type: "slug", current: "commission-based-ad-management-guide" },
    excerpt:     "Percentage-of-spend agency pricing explained honestly: when commission-based ad management aligns incentives, when it distorts them, and what to ask your agency.",
    publishedAt: "2026-01-12T09:00:00.000Z",
    author:      { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories:  ["digital-marketing"],
    pillar:      "digital-marketing",
    isGated:     false,
    coverImage:  {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt:   "Commission-based ad management: when it works and when it fails",
    },
    body,
    faq,
  };

  console.log("  Creating insight-blog-04...");
  const result = await client.createOrReplace(doc);
  console.log("  Done:", result._id);
}

// ── Blog 05: Education Funnel ──────────────────────────────────────────────
async function createBlog05() {
  resetKey("b05");
  const asset = await uploadImage("blog-05-education-funnel-enquiry-to-enrolment.png");

  const body = [
    callout(
      "Key Takeaway",
      "Most education institutions do not have a lead generation problem. They have a lead conversion problem. The costly failures happen after the enquiry arrives: slow first response, unqualified enquiries drowning counsellors, single-channel follow-up, no nurture for long decision cycles, and no data loop between admissions and marketing. This article maps all five leaks and gives you a specific fix for each."
    ),
    p("Here is a pattern we see constantly in education marketing audits. The institution wants more enquiries. The ad accounts are working. The counsellors are busy. And the enrolment numbers refuse to move."),
    p("The instinct is always to buy more enquiries. The arithmetic almost never supports it, because doubling a leaky funnel just doubles the leakage. Having generated tens of thousands of qualified education leads for admissions clients over the years, we can tell you where the enrolments actually go missing: in the five stages between \"enquiry received\" and \"seat confirmed.\""),
    p("Walk your own funnel through this article. You will likely find at least two of these leaks running right now."),

    h2("First, map the funnel you actually have"),
    p("Before fixing leaks, name the stages. A typical education funnel runs: enquiry received, first contact made, qualification conversation, counselling or campus interaction, application submitted, fee paid, enrolment confirmed."),
    p("Now pull one number for each stage transition from your last full admission cycle. Most institutions can tell you their enquiry count to the last digit and cannot tell you what percentage of enquiries ever received a first call. That blind spot is the funnel talking. Wherever you cannot produce a number, you have found a place nobody is accountable for, and unaccountable stages are where enrolments disappear."),
    p("With the map in hand, here are the five leaks in the order they occur."),

    h2("Leak 1: The speed-to-lead gap"),
    p("A student who submits an enquiry to you has, in the same sitting, usually submitted three more to your competitors. The first institution to respond meaningfully sets the frame for every conversation that follows, and in high-intent categories the advantage of responding within minutes rather than hours is enormous. Response speed is the cheapest competitive weapon in education marketing, and the most commonly surrendered."),
    p("Audit yourself brutally: take last week's enquiries and measure the median time to first human contact. Include evenings and weekends, because students and working professionals enquire when they are free, not when your office is open."),
    block("normal", [
      strong("The fix"),
      plain(" has three layers. Instant automated acknowledgment on the channel the enquiry came from, ideally WhatsApp, with a genuinely useful next step rather than \"we will get back to you.\" A hard internal SLA for human contact, measured in minutes during working hours. And routing that pushes new enquiries directly to counsellor phones instead of a CRM inbox someone checks twice a day. None of this requires new budget. It requires the decision that speed is a policy, not a hope."),
    ]),

    h2("Leak 2: Unqualified enquiries drowning your counsellors"),
    p("The opposite failure to Leak 1: counsellors so flooded with low-intent enquiries that high-intent ones get the same shallow treatment as everyone else. This leak usually traces back to the marketing itself: broad targeting, \"free counselling\" hooks that attract the merely curious, and forms so short they capture nothing but a phone number."),
    block("normal", [
      strong("The fix"),
      plain(" starts before the enquiry exists. Tighten your form to capture the two or three fields that predict intent for your programmes, such as intended intake, current qualification, and budget comfort where appropriate. Google's "),
      linked("lead form documentation", "leadFormLink"),
      plain(" covers the mechanics of asking qualifying questions at the ad level. Then score enquiries on arrival, even with simple rules, so counsellors call the high-intent list first and the low-intent list enters automated nurture instead of eating call time. A counsellor hour spent on a scored, ready enquiry is worth ten spent dialling cold curiosity."),
    ], [{ _key: "leadFormLink", _type: "link", href: "https://support.google.com/google-ads/answer/9423234" }]),
    p("One honest trade-off: qualification questions reduce raw enquiry volume. Accept that openly. You are not paying for enquiries. You are paying for enrolments."),

    h2("Leak 3: Single-channel, single-attempt follow-up"),
    p("The typical follow-up pattern we find in audits: one call, unanswered, marked \"not reachable,\" closed. Meanwhile the student who did not pick up an unknown number at 2 pm would have replied to a WhatsApp message the same evening."),
    p("Education decisions involve multiple touchpoints and, for younger students, multiple decision-makers, because a parent is often the real economic buyer. A single-channel, single-attempt process treats a considered decision like an impulse purchase."),
    block("normal", [
      strong("The fix"),
      plain(" is a written follow-up cadence that every counsellor runs identically: a defined sequence across call, WhatsApp, and email over the first two weeks, with each touch adding something useful, such as a fee structure, placement information, a comparison guide, or a counsellor introduction video. The "),
      linked("WhatsApp Business platform", "waBizLink"),
      plain(" supports structured, consent-based follow-up at exactly this cadence. Two disciplines keep it honest: every touch must offer value rather than pressure, and the sequence must have a defined end, because a prospect who has said no deserves to stop hearing from you."),
    ], [{ _key: "waBizLink", _type: "link", href: "https://business.whatsapp.com" }]),

    h2("Leak 4: No nurture for the long decision cycle"),
    p("Not every genuine enquiry is ready this intake. A working professional comparing MBA options may research for months before committing, and a parent may enquire a full year before their child's admission window. The standard funnel treats these as dead leads. They are actually your cheapest future enrolments, because you have already paid to acquire them."),
    block("normal", [
      strong("The fix"),
      plain(" is a nurture track separate from the active-intake cadence: a monthly rhythm of genuinely useful content, such as programme comparisons, alumni outcomes, scholarship deadlines, and honest answers to the questions students ask at each stage. Then re-engage the whole nurture list when the next admission window opens. Institutions that do this well quietly harvest enrolments each intake from enquiries their competitors generated, paid for, and abandoned two cycles ago."),
    ]),

    h2("Leak 5: No data loop between admissions and marketing"),
    p("The final leak is structural. Marketing optimises campaigns on enquiry volume and cost per enquiry, while admissions knows which sources produced students who actually enrolled, and the two teams never reconcile the data. The result is predictable: budget flows toward channels that produce cheap enquiries and away from channels that produce enrolments, because nobody is measuring the metric that matters."),
    block("normal", [
      strong("The fix"),
      plain(" is closing the loop: pass enrolment outcomes back against lead source, campaign, and even ad level, then optimise campaigns on cost per enrolment rather than cost per enquiry. The first time an institution runs this analysis, at least one \"expensive\" channel usually turns out to be the cheapest source of actual students, and at least one favourite channel turns out to be manufacturing phone numbers. Until this loop exists, every optimisation upstream is guesswork with a dashboard."),
    ]),

    h2("How to prioritise the five fixes"),
    p("If you can only fix one thing this quarter, fix speed to lead. It requires no new budget, touches every enquiry you already generate, and pays back within the same intake. Qualification and the follow-up cadence come next, because they multiply each other: scored enquiries plus a disciplined cadence transforms counsellor productivity. Nurture and the data loop are the compounding plays; they pay less this intake and more every intake after."),
    p("And measure one master metric through all of it: enquiry-to-enrolment rate, tracked by source, compared cycle over cycle against your own baseline. Industry benchmarks vary too much by programme type, ticket size, and region to be trustworthy; your own trend line is the only benchmark that cannot mislead you."),
    p("The institutions winning admissions right now are rarely the ones spending the most. They are the ones losing the least between the enquiry and the seat."),

    block("normal", [
      strong("About the author: "),
      plain("Swapnil Ughade is the Founder of MagicWorks IT Solutions Pvt. Ltd., an AI-first digital marketing agency based in Pune, India. He brings 17+ years of experience across digital marketing, web development, and AI strategy, with education among the agency's priority verticals, including performance marketing programmes that have generated tens of thousands of qualified admissions leads."),
    ]),
  ];

  const faq = [
    {
      _key: k(),
      question: "Why do education enquiries not convert to enrolments?",
      answer: "The most common causes sit after the enquiry, not before it: slow first response, no qualification so counsellors treat every enquiry identically, single-attempt follow-up on one channel, no nurture for students deciding across a longer cycle, and marketing optimised on enquiry volume instead of enrolment outcomes.",
    },
    {
      _key: k(),
      question: "What is a good response time for student enquiries?",
      answer: "Minutes, not hours. Students typically enquire with several institutions in the same sitting, and the first meaningful response frames every later conversation. An instant automated acknowledgment plus a human contact SLA measured in minutes during working hours is the practical standard to aim for.",
    },
    {
      _key: k(),
      question: "Should education institutions qualify enquiries before counsellors call?",
      answer: "Yes. Capturing two or three intent-predicting fields at the form stage and scoring enquiries on arrival lets counsellors prioritise high-intent prospects while low-intent enquiries enter automated nurture. Raw enquiry volume falls slightly and enrolment conversion rises, which is the correct trade.",
    },
    {
      _key: k(),
      question: "How long should admissions follow-up continue?",
      answer: "Run a defined multi-channel cadence across call, WhatsApp, and email for roughly the first two weeks, with each touch adding useful information. After that, genuine but not-yet-ready enquiries should move to a monthly nurture track rather than being closed, because they convert cheaply in future intakes.",
    },
    {
      _key: k(),
      question: "What is the most important metric in education marketing?",
      answer: "Enquiry-to-enrolment rate, tracked by source and compared against your own previous cycles. Cost per enquiry is easy to optimise and easy to be fooled by; cost per enrolment is the number that reflects reality.",
    },
  ];

  const doc = {
    _id:         "insight-blog-05",
    _type:       "insight",
    title:       "Student Enquiry to Enrolment: Fixing the Leaks in Your Education Marketing Funnel",
    seoTitle:    "Fixing the Leaks in Your Education Marketing Funnel",
    slug:        { _type: "slug", current: "education-marketing-funnel-enquiry-to-enrolment" },
    excerpt:     "Most education institutions lose enrolments after the enquiry, not before it. The five funnel leaks between enquiry and enrolment, and how to fix each one.",
    publishedAt: "2026-01-19T09:00:00.000Z",
    author:      { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories:  ["digital-marketing"],
    pillar:      "digital-marketing",
    isGated:     false,
    coverImage:  {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt:   "Education marketing funnel: fixing leaks between enquiry and enrolment",
    },
    body,
    faq,
  };

  console.log("  Creating insight-blog-05...");
  const result = await client.createOrReplace(doc);
  console.log("  Done:", result._id);
}

// ── Blog 06: Manufacturing Invisible on Google ─────────────────────────────
async function createBlog06() {
  resetKey("b06");
  const asset = await uploadImage("blog-06-manufacturing-invisible-on-google.png");

  const body = [
    callout(
      "Key Takeaway",
      "Most Indian manufacturers are invisible online for five specific reasons: their websites are product catalogues instead of buyer resources, their language matches spec sheets instead of search queries, their location and capability signals are missing, their best content is locked inside PDFs, and they have no presence in the AI answers where younger procurement teams now begin supplier research. Each one is fixable, and this article gives the roadmap."
    ),
    p("Here is a conversation we have had many times with manufacturing founders. The company has run for twenty years. Its offline reputation is excellent. Its order book is built on relationships, referrals, and trade exhibitions. And when a procurement engineer in another city searches for exactly what the company makes, the company is nowhere."),
    p("The founder usually knows this and has usually made peace with it, on the theory that \"our buyers do not find suppliers on Google.\" That theory was defensible in 2015. It is costing real orders in 2026, because the buyer has changed even where the product has not."),

    h2("The buyer changed before the manufacturer noticed"),
    p("Two shifts made online invisibility expensive for industrial companies."),
    p("The first is generational. The engineers and procurement managers shortlisting suppliers today grew up searching for everything. Their default first step is not the industry directory or the exhibition catalogue. It is a search box, and increasingly an AI assistant that returns a shortlist of suppliers with reasons attached. If you are absent from that shortlist, your twenty-year reputation never gets the chance to speak."),
    p("The second is procedural. B2B buying committees now complete a large share of their research before any supplier conversation begins. By the time your sales team hears about a requirement, the vendor list has often been drafted from what the committee could find and verify online. Invisibility does not just cost you discovery. It costs you the RFQs you never knew existed."),
    p("The good news: manufacturing is one of the least competitive online categories in India relative to the value at stake. Your competitors are mostly as invisible as you are, which means the fixes below pay off faster here than in almost any consumer category."),

    h2("Reason 1: Your website is a catalogue, not a resource"),
    p("Open a typical manufacturer's website and you find a home page, an about page, a product grid, and a contact form. Everything on it describes the company. Nothing on it answers a buyer's question."),
    p("But buyers arrive with questions: whether your process suits their material, what tolerances you hold, what your minimum order quantities look like, how you handle quality documentation, what industries you already serve. When the website answers none of these, the buyer either bounces to a competitor who does, or files you under \"unclear\" and moves on. Search engines make the same judgment, because a site with no question-answering content has nothing to rank for beyond its own name."),
    block("normal", [
      strong("The fix:"),
      plain(" build capability and application pages, one for each combination of what you do and who you do it for. \"CNC machining for automotive component suppliers\" is a page. \"Powder coating for architectural aluminium\" is a page. Each answers the real questions a buyer in that segment asks, in their words. This single change typically multiplies the number of queries a manufacturing site can appear for."),
    ]),

    h2("Reason 2: You speak spec sheet, buyers speak problem"),
    p("Manufacturers write in the language of their machines: model numbers, process names, internal category labels. Buyers search in the language of their problems: the application, the material, the industry, the tolerance, the certification, the city."),
    p("The result is a vocabulary gap. Your page about a \"5-axis VMC\" never meets the engineer searching for \"precision aerospace component machining India,\" even though you are exactly what they need."),
    block("normal", [
      strong("The fix"),
      plain(" costs nothing but honesty about how buyers actually talk. Pull the phrases from your sales enquiries, RFQ emails, and exhibition conversations, and let those phrases lead your page titles and headings, with the technical specification supporting rather than leading. You are not dumbing anything down. You are translating from your language to your buyer's."),
    ]),

    h2("Reason 3: Your location and capability signals are missing"),
    p("Industrial searches carry heavy local and credential intent: the city, the region, \"near me,\" the certification, the industry served. Manufacturers routinely fail to state these plainly anywhere a machine can read them."),
    block("normal", [
      strong("The fix"),
      plain(" has three parts. Claim and complete your "),
      linked("Google Business Profile", "gbpLink"),
      plain(" with accurate categories, your full service area, photographs of the actual facility, and your certifications listed. State your locations, industries served, and certifications in crawlable text on the website itself, not only in a footer image. And implement Organization schema, using the vocabulary documented in "),
      linked("Google's structured data guidance", "gsdLink"),
      plain(", so engines can connect your name, location, and capabilities without guessing. These are hours of work, not months, and they move local industrial visibility more than almost anything else."),
    ], [
      { _key: "gbpLink", _type: "link", href: "https://www.google.com/business/" },
      { _key: "gsdLink", _type: "link", href: "https://developers.google.com/search/docs/appearance/structured-data" },
    ]),

    h2("Reason 4: Your best content is trapped in PDFs"),
    p("Somewhere in your company is genuinely excellent material: the capability deck, the process brochure, the quality manual summary. It lives in PDFs, attached to emails and buried behind download links. Search engines index PDFs poorly relative to pages, AI answer engines extract from them worse, and mobile users abandon them almost immediately."),
    block("normal", [
      strong("The fix:"),
      plain(" liberate the content. Every substantial PDF should have an HTML page equivalent, structured with real headings, with the PDF offered as a secondary download for the buyer who wants it. You have already paid to create this material. Publishing it properly is the cheapest content programme you will ever run."),
    ]),

    h2("Reason 5: You are absent from AI answers"),
    p("The newest reason, and the one moving fastest. When a procurement engineer asks an AI assistant to shortlist suppliers for a process in a region, the assistant assembles an answer from what it can find and verify. Manufacturers with clear capability pages, consistent entity information, and honest case content get named. Everyone else does not exist in that conversation."),
    block("normal", [
      plain("This is Answer Engine Optimisation applied to industry, and it rewards exactly the fixes above: question-answering pages, plain buyer language, entity clarity, and structured data. Add one more step: verify your site in "),
      linked("Bing Webmaster Tools", "bingLink06"),
      plain(", because Bing's index feeds Microsoft Copilot, which is precisely the assistant embedded in the Office environment your buyers work in all day. We covered the full mechanics in our practical guide to Answer Engine Optimisation, and every word of it applies doubly to manufacturing, where citable competition is thin."),
    ], [{ _key: "bingLink06", _type: "link", href: "https://www.bing.com/webmasters" }]),

    h2("The 90-day fix roadmap"),
    p("Sequenced for a lean team, in order of effort against impact."),
    block("normal", [
      strong("Weeks 1 to 2:"),
      plain(" claim and complete Google Business Profile, verify Bing Webmaster Tools and Google Search Console, and state locations, certifications, and industries served in crawlable text."),
    ]),
    block("normal", [
      strong("Weeks 3 to 6:"),
      plain(" write your first five capability and application pages, led by the buyer language pulled from real enquiries. Add Organization schema site-wide."),
    ]),
    block("normal", [
      strong("Weeks 7 to 10:"),
      plain(" convert your three most valuable PDFs into structured HTML pages. Add an FAQ section answering the ten questions your sales team hears most, one honest answer each."),
    ]),
    block("normal", [
      strong("Weeks 11 to 13:"),
      plain(" publish your first case story, with the client anonymised if consent is not available, focused on the problem, the process, and the verifiable outcome. Then measure: track which queries and pages generate enquiries, and let that data pick the next five pages."),
    ]),
    p("None of this requires a big budget. It requires deciding that the company's online presence should work as hard as its shop floor does."),

    h2("The quiet advantage of moving first"),
    p("In consumer categories, this playbook is table stakes. In Indian manufacturing, it is still a differentiator, because the majority of your competitors have not moved. The manufacturers who build genuine online visibility in the next two years will be the names AI assistants learn to associate with their categories, and those associations compound. The window for cheap authority in industrial categories is open right now. It will not stay open."),

    block("normal", [
      strong("About the author: "),
      plain("Swapnil Ughade is the Founder of MagicWorks IT Solutions Pvt. Ltd., an AI-first digital marketing agency based in Pune, India. He brings 17+ years of experience across digital marketing, web development, and AI strategy, with manufacturing among the agency's priority verticals."),
    ]),
  ];

  const faq = [
    {
      _key: k(),
      question: "Why do manufacturing companies rank poorly on Google?",
      answer: "Most manufacturer websites are product catalogues with no content answering buyer questions, written in internal technical language rather than the problem-and-application language buyers search with. Combined with missing location signals, absent structured data, and content locked in PDFs, the site gives search engines almost nothing to rank.",
    },
    {
      _key: k(),
      question: "Do B2B industrial buyers really research suppliers online?",
      answer: "Yes, and increasingly before any supplier conversation begins. Younger procurement engineers default to search and AI assistants for shortlisting, which means invisible manufacturers lose RFQs they never knew existed, regardless of offline reputation.",
    },
    {
      _key: k(),
      question: "What content should a manufacturer publish first?",
      answer: "Capability and application pages: one page per combination of process and industry served, written in the buyer's language and answering the questions your sales team hears in real enquiries. These typically multiply the queries a manufacturing site can appear for faster than any other content type.",
    },
    {
      _key: k(),
      question: "How can a manufacturer appear in AI assistant answers?",
      answer: "Through the same fundamentals that drive search visibility, applied with structure: question-answering pages, consistent entity information, Organization schema, and verification in Bing Webmaster Tools, since Bing's index feeds Microsoft Copilot. Industrial categories currently have thin citable competition, so early movers gain ground quickly.",
    },
    {
      _key: k(),
      question: "How long does it take for a manufacturer to see results?",
      answer: "Foundation fixes such as Google Business Profile and entity clarity can influence local visibility within weeks. Capability pages and content typically show meaningful query growth over one to two quarters, with AI citation presence compounding after that. The trend line matters more than any single month.",
    },
  ];

  const doc = {
    _id:         "insight-blog-06",
    _type:       "insight",
    title:       "Why Manufacturing Companies Are Invisible on Google, and How to Fix It",
    seoTitle:    "Why Manufacturing Companies Are Invisible on Google",
    slug:        { _type: "slug", current: "manufacturing-companies-invisible-on-google" },
    excerpt:     "Indian manufacturers with strong offline reputations are often invisible online. The five reasons B2B buyers cannot find you, and how to fix each one.",
    publishedAt: "2026-01-26T09:00:00.000Z",
    author:      { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories:  ["digital-marketing"],
    pillar:      "digital-marketing",
    isGated:     false,
    coverImage:  {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt:   "Why manufacturing companies are invisible on Google and how to fix it",
    },
    body,
    faq,
  };

  console.log("  Creating insight-blog-06...");
  const result = await client.createOrReplace(doc);
  console.log("  Done:", result._id);
}

// ── Blog 07: LinkedIn Thought Leadership ──────────────────────────────────
async function createBlog07() {
  resetKey("b07");
  const asset = await uploadImage("blog-07-linkedin-thought-leadership-ai-citations.png");

  const body = [
    callout(
      "Key Takeaway",
      "Likes are rented attention that expires in 48 hours. Citations are earned authority that compounds for years. A thought leadership programme that AI assistants learn to cite requires five things a viral-posting strategy does not: a narrow expertise lane, a named human voice with consistent identity signals, long-form content anchored on a domain you own, a publishing cadence measured in quarters, and points of view specific enough to be quotable. This article covers all five."
    ),
    p("Ask an AI assistant a serious question in your industry: who understands AI adoption in mid-market manufacturing, what the credible view is on agency pricing models, how education platforms should think about admissions marketing. Names come back. Specific people, cited as authorities, often with their arguments summarised."),
    p("Now ask the uncomfortable follow-up: is your name in any of those answers? For most senior professionals posting diligently on LinkedIn, the answer is no, and the reason is not effort. It is that they optimised for the wrong outcome. The feed rewards engagement. The models reward expertise. Those are different games with different rules, and this article is the playbook for the second one."),

    h2("Likes versus citations: two different games"),
    p("A viral LinkedIn post is a 48-hour event. It reaches a large audience once, generates warm comments, and then the feed moves on, taking the attention with it. Nothing about that event teaches an AI model that you are an authority worth citing."),
    p("A citation is different in kind. When AI assistants repeatedly encounter your name attached to substantive, consistent, verifiable expertise on a topic, they begin to associate the two, and that association surfaces in answers to questions you will never see asked. The audience for one post is whoever scrolled past it that morning. The audience for earned authority is everyone who asks an AI about your topic for years afterward."),
    p("This is the personal-brand dimension of Generative Engine Optimisation, and it is why the discipline belongs to senior individuals rather than company pages. Models increasingly attribute expertise to named people. Your company inherits the halo, but the citation attaches to you."),
    p("The two games are not enemies. Reach helps. But when they conflict, and they often do, the citation game wins, because likes depreciate and authority compounds."),

    h2("Rule 1: Pick a lane narrow enough to own"),
    p("The most common thought leadership failure is breadth. A founder posts about leadership on Monday, hiring on Wednesday, and industry trends on Friday, and after a year of consistent effort, the models have learned nothing, because there is no single topic the name reliably attaches to."),
    p("Authority requires repetition on a theme. Choose the intersection where your genuine expertise meets a question your buyers actually ask AI assistants, and make it uncomfortably specific. Not \"digital marketing\" but \"how AI search is changing marketing for Indian B2B companies.\" Not \"manufacturing\" but \"practical AI adoption in mid-market Indian manufacturing.\" The test: could an AI assistant complete the sentence \"for questions about X, a frequently cited voice is...\" with your name? If X is too broad, the sentence will never be true."),
    p("One lane does not mean one note. It means every piece, whatever its format, feeds the same association."),

    h2("Rule 2: Anchor long-form content on a domain you own"),
    p("Here is the structural insight most LinkedIn-only strategies miss. Feed posts are weak citation material: they are short, hard to reference, platform-locked, and mixed into an ocean of similar content. AI systems cite substantive, structured, stable documents far more readily than social posts."),
    p("So the programme runs on a two-layer architecture. The authority layer is long-form: articles of real depth published on a domain you or your company owns, with proper structure, a named byline, and a stable URL that can be cited five years from now. The distribution layer is LinkedIn: posts that carry the argument's sharpest edge into the feed, earn the conversation, and point back to the anchor piece."),
    p("LinkedIn builds the audience. The owned domain builds the citable record. Founders who invert this, pouring their best thinking into ephemeral posts with nothing anchored anywhere, are writing their body of work in sand."),

    h2("Rule 3: Sound like a person with a position"),
    p("AI models, like humans, cite sources that say something. Content engineered to be agreeable, hedged into neutrality, or ghostwritten into corporate beige gives an assistant nothing to attribute to you, because it contains no view that is distinctly yours."),
    p("The citable voice has three properties. It takes positions: \"commission pricing is wrong below five lakh a month\" is citable, while \"pricing models have pros and cons\" is not. It shows working: first-hand numbers, named methodology, lessons from real engagements, the material a model could not generate without you. And it stays in first person, in your actual vocabulary, because consistency of voice is itself an identity signal that helps systems connect your content across platforms."),
    p("Ghostwriting support is fine, and most serious executive programmes use it. Ghost-thinking is fatal. The positions must be genuinely yours, or the record you build will be one you cannot defend in a room."),

    h2("Rule 4: Make the machines certain who you are"),
    p("This is the unglamorous layer that separates professionals from hobbyists, and it takes one afternoon."),
    block("normal", [
      plain("Your identity must resolve cleanly across the web. That means a real author page on your owned domain with your credentials, "),
      linked("Person schema", "personSchemaLink"),
      plain(" on every article you author, with sameAs links connecting the author page to your LinkedIn profile and anywhere else you publish, a byline that is identical everywhere, and a LinkedIn profile whose headline and about section state your lane in the same language your articles use."),
    ], [{ _key: "personSchemaLink", _type: "link", href: "https://schema.org/Person" }]),
    p("Every mismatch, a differently spelled name, an inconsistent title, an article with no author, forces the model to guess whether these fragments are the same person. Uncertain entities do not get cited. It is that mechanical."),

    h2("Rule 5: Commit to a cadence measured in quarters"),
    p("Authority is a lagging indicator. The models learn from accumulation, which means the programme's unit of commitment is the quarter, not the post."),
    p("A sustainable founder cadence looks like one substantial anchor article a month on the owned domain, two to three LinkedIn posts a week drawn from it, and genuine comment engagement in the conversations where your lane is being discussed, because your name appearing in substantive discussion threads is itself corroboration. What kills programmes is not the wrong cadence but the abandonment curve: intense posting for six weeks, silence for three months, restart. The models, like your audience, learn from the silence too."),
    p("Measure the right things on the right clock. Monthly: publishing consistency and the quality of inbound conversations. Quarterly: run the structured spot checks we described in our AI citation measurement guide, asking the major assistants your lane's key questions and logging whether your name appears. Movement on that scoreboard in under six months is a bonus, not the plan."),

    h2("What this looks like when it works"),
    p("The compounding is quiet and then sudden. First the inbound conversations change quality: prospects arrive having already read you, half-convinced. Then your name starts appearing in AI answers to your lane's questions, initially with a link, later sometimes without one, which is the deeper signal that the association has formed. Then the invitations arrive, to podcasts, panels, and rooms your ads could never have bought entry to, each one adding third-party corroboration that strengthens the citation loop further."),
    p("None of it traces back to a viral post. All of it traces back to the same disciplined loop: a narrow lane, a real position, an owned anchor, clean identity signals, and enough quarters of consistency for the machines and the market to agree on what your name means."),
    p("Likes are rented. Citations are owned. Build the asset, not the applause."),

    block("normal", [
      strong("About the author: "),
      plain("Swapnil Ughade is the Founder of MagicWorks IT Solutions Pvt. Ltd., an AI-first digital marketing agency based in Pune, India. He brings 17+ years of experience across digital marketing, web development, and AI strategy, and runs the agency's Thought Leadership & GEO programmes for founders and CXOs."),
    ]),
  ];

  const faq = [
    {
      _key: k(),
      question: "What is the difference between LinkedIn engagement and AI citations?",
      answer: "Engagement is a short-lived distribution event: a post reaches an audience once and the feed moves on. A citation is an earned association between your name and a topic that AI assistants surface in answers for years. Engagement helps distribution, but only substantive, consistent, attributable expertise earns citations.",
    },
    {
      _key: k(),
      question: "Can LinkedIn posts alone get you cited by AI?",
      answer: "Rarely. Feed posts are short, platform-locked, and weakly structured, which makes them poor citation material. The reliable architecture pairs long-form articles on a domain you own, which become the citable record, with LinkedIn posts that distribute the argument and point back to the anchor.",
    },
    {
      _key: k(),
      question: "How narrow should a thought leadership niche be?",
      answer: "Narrow enough that an AI assistant could plausibly complete the sentence: for questions about this topic, a frequently cited voice is your name. Broad themes like leadership or marketing never produce that association; a specific intersection of your expertise and your buyers' questions can.",
    },
    {
      _key: k(),
      question: "Does ghostwriting hurt AI citation potential?",
      answer: "Ghostwriting support does not, and most serious executive programmes use it. What hurts is ghost-thinking: generic positions that are not genuinely yours produce content with no distinct view to attribute, and inconsistent voice weakens the identity signals models use to connect your work.",
    },
    {
      _key: k(),
      question: "How long does it take for AI assistants to cite a person?",
      answer: "Expect quarters, not weeks. The association forms through accumulated, consistent, well-structured content under a clean identity. Programmes should measure publishing consistency monthly and run structured citation spot checks quarterly, treating movement inside six months as a bonus rather than the plan.",
    },
  ];

  const doc = {
    _id:         "insight-blog-07",
    _type:       "insight",
    title:       "Building a LinkedIn Thought Leadership Programme That Gets Cited by AI, Not Just Liked",
    seoTitle:    "LinkedIn Thought Leadership That Gets Cited by AI, Not Just Liked",
    slug:        { _type: "slug", current: "linkedin-thought-leadership-ai-citations" },
    excerpt:     "Likes fade, citations compound. How to build a LinkedIn thought leadership programme that AI assistants learn to cite: lane, cadence, owned content, and structure.",
    publishedAt: "2026-02-02T09:00:00.000Z",
    author:      { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories:  ["digital-marketing"],
    pillar:      "digital-marketing",
    isGated:     false,
    coverImage:  {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt:   "LinkedIn thought leadership programme that gets cited by AI assistants",
    },
    body,
    faq,
  };

  console.log("  Creating insight-blog-07...");
  const result = await client.createOrReplace(doc);
  console.log("  Done:", result._id);
}

// ── Blog 08: Performance Marketing for High-Ticket Education ──────────────
async function createBlog08() {
  resetKey("b08");
  const asset = await uploadImage("blog-08-performance-marketing-high-ticket-education.png");

  const body = [
    callout(
      "Key Takeaway",
      "High-ticket education marketing is a different sport from volume lead generation. When a programme fee runs into lakhs, the decision cycle stretches to weeks or months, a second decision-maker usually holds the money, and one enrolment justifies significant acquisition cost. The playbook that wins starts from enrolment economics and works backward: allowable cost per enrolment first, then channel roles, then campaign structure, then measurement that counts students rather than form-fills."
    ),
    p("There are two kinds of education marketing, and confusing them is expensive."),
    p("The first optimises for volume: low-fee courses, short decision cycles, success measured in cheap enquiries. The second is the high-ticket game: MBA and executive programmes, professional certifications, premium K-12 admissions, study-abroad pathways, where fees run from one lakh to twenty and beyond. Here the enquiry is not the product. The enrolment is, and everything about how you buy, structure, and measure campaigns has to change accordingly."),
    p("Having managed education portfolios at serious scale, including sustained campaigns generating tens of thousands of qualified admissions leads, here is the playbook we run for the high-ticket version of this sport."),

    h2("Start with the math, not the media plan"),
    p("Every high-ticket campaign should begin with three numbers written on one page, before a single ad exists."),
    p("First, revenue per enrolment: the programme fee, plus any realistic lifetime extension such as alumni programmes or progression courses. Second, your enquiry-to-enrolment rate from the last full cycle, honestly measured by source if you have it. Third, from those two, your allowable cost per enrolment: the acquisition cost at which the economics still work after delivery costs and margin."),
    p("Divide allowable cost per enrolment by your enquiry-to-enrolment rate and you get your allowable cost per enquiry, which is the only sane way to judge whether your campaigns are expensive or cheap. A Rs 900 enquiry looks costly next to a competitor's Rs 300 one, right up until you learn that yours converts at five times the rate because of how it was targeted and qualified. The institution that knows its math buys students. The institution that does not buys spreadsheet rows."),
    p("This is also why high-ticket education sits naturally in commission-tier ad budgets: the value of a single enrolment supports real spend, and the account complexity justifies real management. We wrote separately about when that pricing model works and when it does not."),

    h2("Assign each channel one job"),
    p("The most common structural error in education accounts is asking every channel to do everything. High-ticket buying journeys have stages, and channels map to stages."),
    block("normal", [
      strong("Google Search owns intent capture."),
      plain(" When someone types a programme category with buying intent, comparison intent, or your brand name, Search is where the decision surfaces. This is the channel that should never be starved, and "),
      linked("Google's own documentation", "gadsDocsLink"),
      plain(" covers the mechanics; the strategy layer is below."),
    ], [{ _key: "gadsDocsLink", _type: "link", href: "https://support.google.com/google-ads" }]),
    block("normal", [
      strong("Meta owns demand creation and re-engagement."),
      plain(" Facebook and Instagram find the professional who has not yet searched: the mid-career manager who did not know an executive programme fits their situation, the parent early in the school research cycle. Meta also carries the remarketing load across a long decision cycle, which in high-ticket education is where much of its value actually sits. "),
      linked("Meta's platform documentation", "metaDocsLink"),
      plain(" covers formats; the discipline is keeping its job separate from Search's."),
    ], [{ _key: "metaDocsLink", _type: "link", href: "https://www.facebook.com/business/help" }]),
    block("normal", [
      strong("YouTube owns consideration."),
      plain(" Nobody commits lakhs to a programme from a headline. Campus and faculty content, alumni outcomes, and honest programme explanations do the mid-funnel persuasion that text ads cannot, and they make every other channel's clicks convert better."),
    ]),
    p("The test of a well-structured account: you can state each campaign's single job in one sentence, and its metrics match that job. Demand-creation campaigns judged on last-click enrolments will always look like failures, right up until you switch them off and watch Search volume quietly fall."),

    h2("Structure Search the high-ticket way"),
    p("Four structural rules cover most of what goes wrong inside education Search accounts."),
    block("normal", [
      strong("Defend your brand ruthlessly."),
      plain(" In admission season, competitors and aggregators bid on institution names. Your brand campaign is the cheapest, highest-converting spend in the account, and ceding it means paying an aggregator tomorrow for the student who searched for you today."),
    ]),
    block("normal", [
      strong("Build campaigns around programme-level intent, not institution-level vanity."),
      plain(" The buyer searches for the programme category and the outcome, with their city or \"online\" attached. Campaign structure should mirror that: one intent theme per campaign, with ad copy and landing page matched to it, rather than one generic campaign pointing everything at the home page."),
    ]),
    block("normal", [
      strong("Treat aggregator-dominated queries with respect and math."),
      plain(" In many education categories, comparison portals dominate the expensive head terms. Sometimes the right move is to outbid them on your strongest programmes; often the smarter one is to win the longer, more specific queries they ignore, where intent is higher and clicks are cheaper."),
    ]),
    block("normal", [
      strong("Qualify inside the ad experience."),
      plain(" Fee ranges stated in ad copy, qualifying questions in lead forms, and landing pages that are honest about who the programme is for will lower your enquiry volume and raise everything that matters afterward. In high-ticket, the form is a filter, not a net. This connects directly to the funnel discipline we covered in our enquiry-to-enrolment article, because campaigns and counsellors are one system."),
    ]),

    h2("Respect the second decision-maker"),
    p("High-ticket education almost always has two buyers. For younger students, a parent controls the money. For working professionals, a spouse or an employer shares the decision. Campaigns that speak only to the applicant leave the economic buyer unconvinced and the enrolment unsigned."),
    p("Practically, this means remarketing and consideration content that answers the second decision-maker's questions: outcomes, placement and salary evidence, accreditation, safety, return on the fee. It also means landing pages with a section that an applicant can literally forward to the person they need to convince. The institutions that market to the whole decision unit close the enrolments their competitors' campaigns started."),

    h2("Plan spend around the intake calendar, not the monthly budget"),
    p("Education demand is seasonal and the auction knows it. Costs per click climb as deadlines approach and every institution floods the same weeks."),
    p("The high-ticket answer is to start earlier than feels natural. Demand creation and consideration content should run in the quiet months, building an audience of educated prospects at low cost, so that when the intake window opens, your Search and remarketing campaigns are harvesting warm demand rather than bidding cold against the whole market at peak prices. The budget curve should look like a ramp that peaks before the deadline crush, not a spike inside it. Institutions that discover performance marketing six weeks before their deadline pay the panic tax, every single cycle."),

    h2("Measure enrolments, and feed them back"),
    p("The closing discipline, and the one that separates professional accounts from busy ones: outcomes must flow back into the platforms."),
    p("That means passing enrolment and qualified-stage data back against source, campaign, and ad, through offline conversion imports, so that both your reporting and the platforms' own optimisation learn from students rather than form-fills. Judged on cost per enquiry, the algorithm will happily manufacture cheap phone numbers. Judged on cost per qualified applicant and enrolment, it starts hunting the profiles that actually become students."),
    p("Report the account monthly on exactly four numbers per source: spend, qualified enquiries, applications, enrolments, with the cost of each stage. Everything else in the dashboard is commentary."),
    p("High-ticket education marketing rewards patience, math, and structure, in that order. The institutions that treat it as a volume game buy enquiries. The ones that run this playbook buy students."),

    block("normal", [
      strong("About the author: "),
      plain("Swapnil Ughade is the Founder of MagicWorks IT Solutions Pvt. Ltd., an AI-first digital marketing agency based in Pune, India. He brings 17+ years of experience across digital marketing, web development, and AI strategy, with education among the agency's priority verticals and admissions performance marketing among its anchor engagements."),
    ]),
  ];

  const faq = [
    {
      _key: k(),
      question: "How is high-ticket education marketing different from regular lead generation?",
      answer: "The economics invert the playbook. When one enrolment is worth lakhs, longer decision cycles, second decision-makers, and lead quality dominate, so campaigns are built backward from allowable cost per enrolment rather than forward from cheap cost per enquiry.",
    },
    {
      _key: k(),
      question: "What is a good cost per lead for education programmes?",
      answer: "There is no universal number, and any benchmark offered without your economics attached should be ignored. The right figure is derived: allowable cost per enrolment multiplied by your own enquiry-to-enrolment rate. A more expensive enquiry that converts at several times the rate of a cheap one is the cheaper lead.",
    },
    {
      _key: k(),
      question: "Which channel should education institutions prioritise?",
      answer: "Assign jobs rather than picking winners: Google Search captures existing intent and should never be starved, Meta creates demand and carries remarketing across the long cycle, and YouTube does the consideration work that makes every other channel convert better. The error is asking one channel to do all three jobs.",
    },
    {
      _key: k(),
      question: "When should education ad campaigns start relative to admissions deadlines?",
      answer: "Months before, not weeks. Demand creation in the quiet season builds an educated audience at low cost, so intake-window spend harvests warm demand instead of bidding cold at peak auction prices. Institutions that start six weeks before deadlines pay the panic tax every cycle.",
    },
    {
      _key: k(),
      question: "Should education ads mention fees?",
      answer: "For high-ticket programmes, usually yes, at least as a range. Stating fees filters out enquiries that could never enrol, which lowers raw volume and improves everything downstream: counsellor productivity, application rate, and true cost per enrolment.",
    },
  ];

  const doc = {
    _id:         "insight-blog-08",
    _type:       "insight",
    title:       "Performance Marketing for High-Ticket Education Programmes: A Practical Playbook",
    seoTitle:    "Performance Marketing for High-Ticket Education Programmes",
    slug:        { _type: "slug", current: "performance-marketing-high-ticket-education" },
    excerpt:     "A practical playbook for marketing education programmes with serious fees: the enrolment math, channel roles, campaign structure, and the metrics that matter.",
    publishedAt: "2026-02-09T09:00:00.000Z",
    author:      { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories:  ["digital-marketing"],
    pillar:      "digital-marketing",
    isGated:     false,
    coverImage:  {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt:   "Performance marketing playbook for high-ticket education programmes",
    },
    body,
    faq,
  };

  console.log("  Creating insight-blog-08...");
  const result = await client.createOrReplace(doc);
  console.log("  Done:", result._id);
}

// ── Blog 09: Website Speed Killing Ad ROI ─────────────────────────────────
async function createBlog09() {
  resetKey("b09");
  const asset = await uploadImage("blog-09-website-speed-killing-ad-roi.png");

  const body = [
    callout(
      "Key Takeaway",
      "Every visitor from a paid campaign is a visitor you bought. When your site loads slowly, a share of those bought visitors leave before the page ever appears, which means a slow website is not a technical inconvenience but a recurring tax on every rupee of ad spend. Worse, Google's ad auction factors landing page experience into what you pay per click. This article explains the mechanism, gives you a one-hour diagnosis, and ranks the fixes by payback."
    ),
    p("Here is an audit finding that repeats so often it has become a ritual. An advertiser is unhappy with campaign results. The account gets inspected: targeting is reasonable, ads are decent, bids are sane. Then someone opens the landing page on a mid-range phone over a mobile network, and everyone sits in silence watching a white screen."),
    p("The campaigns were never the problem. The campaigns were delivering paid traffic, at full price, to a page that was quietly discarding it."),

    h2("The mechanism: you bought that visitor"),
    p("Organic traffic makes slowness feel free. A visitor bounces, and no invoice arrives. Paid traffic removes the illusion, because the economics are brutally direct."),
    block("normal", [
      plain("You paid a real price for the click the moment it happened. Whether that click becomes a lead is then decided in the next few seconds by your page. Users abandon slow pages at rates that climb steeply with every additional second of load time, a relationship Google's performance research has documented for years and which the "),
      linked("Core Web Vitals initiative at web.dev", "cwvLink"),
      plain(" exists to address. Every abandoned load is spend converted directly into nothing."),
    ], [{ _key: "cwvLink", _type: "link", href: "https://web.dev/articles/vitals" }]),
    p("Run your own numbers with a simple thought experiment. Take your monthly ad spend, your average cost per click, and an honest estimate of the share of visitors your load time is losing. That share of your budget is not underperforming. It is being incinerated before your marketing gets a chance to fail on its own merits. For a commission-tier advertiser spending lakhs a month, this line item alone often exceeds the cost of fixing the site."),
    p("And this is why speed is a marketing decision wearing a developer's clothes. The person who feels the pain owns the ad budget, not the codebase."),

    h2("The second tax: the auction is watching your landing page"),
    block("normal", [
      plain("The abandonment loss would be bad enough alone. But Google adds a second, less visible penalty: landing page experience is a component of the quality assessment inside the ad auction, as "),
      linked("Google's own documentation", "lpQualLink"),
      plain(" sets out."),
    ], [{ _key: "lpQualLink", _type: "link", href: "https://support.google.com/google-ads/answer/2404197" }]),
    p("The practical translation: two advertisers bidding on the same keyword do not pay the same price. The one whose landing page loads fast and serves the visitor well earns better ad positions at lower cost per click. The one with the slow page pays a premium on every single auction, forever, without ever seeing the surcharge itemised anywhere."),
    p("So the slow site charges you twice. Once in abandoned visitors, and again in inflated click prices across the entire account. Fixing speed is one of the few interventions in paid marketing that lowers costs and raises conversions simultaneously."),

    h2("What the metrics actually mean"),
    p("Core Web Vitals get discussed like an occult science, but the three metrics describe things any business owner immediately understands."),
    block("normal", [
      strong("Largest Contentful Paint (LCP)"),
      plain(" measures how long until the main content is visibly there: the moment your visitor stops looking at a blank or half-built screen. This is the metric most directly tied to abandonment."),
    ]),
    block("normal", [
      strong("Interaction to Next Paint (INP)"),
      plain(" measures responsiveness: when the visitor taps a button or opens your enquiry form, how quickly the page reacts. A page that loads fast but stalls when someone tries to submit a form fails at the most expensive possible moment."),
    ]),
    block("normal", [
      strong("Cumulative Layout Shift (CLS)"),
      plain(" measures visual stability: whether content jumps around as things load. Layout shift is the reason visitors tap \"call now\" and land on something else, and it quietly murders form completion on mobile."),
    ]),
    p("The thresholds and details live at web.dev; the strategic point is simpler. These are not developer vanity metrics. They are a numerical description of whether the visitor you paid for can actually use what you bought them."),

    h2("The one-hour diagnosis"),
    p("You do not need a consultant to find out whether this article is about you. One hour, three steps."),
    block("normal", [
      strong("Step 1, ten minutes:"),
      plain(" run your top three ad landing pages, not just the home page, through "),
      linked("PageSpeed Insights", "psiLink"),
      plain(". Read the field data section first, which reflects real visitor experience where available, before the lab score. Mobile results are the ones that matter."),
    ], [{ _key: "psiLink", _type: "link", href: "https://pagespeed.web.dev" }]),
    block("normal", [
      strong("Step 2, twenty minutes:"),
      plain(" do what the tools cannot and become your own worst-case visitor. Load those same pages on a mid-range Android phone over mobile data, not office Wi-Fi, because that is the device and network reality for a large share of Indian traffic. Time the wait to usable content. Try to complete your own enquiry form. This test has changed more marketing budgets than any dashboard."),
    ]),
    block("normal", [
      strong("Step 3, thirty minutes:"),
      plain(" connect the finding to money. Compare conversion rates by device in your analytics; a mobile rate dramatically below desktop is speed announcing itself in your revenue data. Then apply the thought-experiment math above to your actual spend."),
    ]),
    p("If the pages are fast and the form flows, congratulations, close this tab and go optimise your ads. If not, here is the priority order."),

    h2("Fix in this order, not alphabetically"),
    p("Speed work fails when it is bought as an undifferentiated \"optimisation\" bundle. The payback order is consistent across most sites we audit."),
    block("normal", [
      strong("First, images."),
      plain(" Oversized, uncompressed images are the single most common cause of slow load in the wild, and the cheapest to fix: modern formats, proper sizing, and lazy loading below the fold. Days of work, immediate improvement."),
    ]),
    block("normal", [
      strong("Second, the script pile."),
      plain(" Years of accumulated tags, chat widgets, plugins, and trackers, many loading before your content and some serving tools nobody has opened since 2023. Audit ruthlessly, remove the dead, and defer the rest so the visitor sees your page before your tooling does."),
    ]),
    block("normal", [
      strong("Third, hosting and delivery."),
      plain(" Budget shared hosting has a response-time ceiling no front-end tuning can break through, and a site serving all of India from one distant server pays a distance tax on every visit. Right-sized hosting and a content delivery network fix the floor everything else stands on."),
    ]),
    block("normal", [
      strong("Fourth, the render path."),
      plain(" Blocking stylesheets and scripts, unused framework weight, theme bloat. This is deeper engineering with real payback, but only after the first three are done, which is why it comes fourth despite being where technical proposals love to start."),
    ]),
    block("normal", [
      strong("And know when to stop patching."),
      plain(" Some sites, typically old themes carrying a decade of plugins, are architecturally slow, and each optimisation round buys less than the last. Past that point the honest recommendation is a rebuild on a modern stack, where performance is a starting property rather than a renovation project. That is a bigger conversation than this article, but the wrong answer is paying the double tax for another two years because the rebuild felt like a big decision."),
    ]),

    h2("The takeaway for the person who owns the budget"),
    p("If you run meaningful paid spend, your website's speed is a line item in your marketing economics whether or not anyone has ever presented it that way. It decides how many bought visitors survive to see your offer, and it decides what the auction charges you for each of them."),
    p("Run the one-hour diagnosis this week. If it comes back clean, you have eliminated a suspect. If it does not, you have found the highest-ROI project in your marketing plan, and it is not a campaign."),

    block("normal", [
      strong("About the author: "),
      plain("Swapnil Ughade is the Founder of MagicWorks IT Solutions Pvt. Ltd., an AI-first digital marketing agency based in Pune, India. He brings 17+ years of experience across digital marketing, web development, and AI strategy. MagicWorks delivers site performance and conversion optimisation engagements for advertisers regardless of who originally built their website."),
    ]),
  ];

  const faq = [
    {
      _key: k(),
      question: "Does website speed really affect Google Ads performance?",
      answer: "Yes, twice over. Slow pages lose a share of the visitors you paid for before the page renders, and Google's ad auction factors landing page experience into quality assessment, meaning slow-page advertisers pay more per click for worse positions than fast-page competitors on the same keywords.",
    },
    {
      _key: k(),
      question: "How do I check if my landing pages are slow?",
      answer: "Run your top ad landing pages through PageSpeed Insights, reading real-user field data first and prioritising mobile results. Then load the same pages on a mid-range phone over mobile data and attempt your own enquiry form. If usable content takes more than a few seconds or the form stumbles, you are paying the speed tax.",
    },
    {
      _key: k(),
      question: "What are Core Web Vitals in plain language?",
      answer: "Three measurements of visitor experience: how quickly the main content visibly appears (Largest Contentful Paint), how fast the page responds when someone interacts with it (Interaction to Next Paint), and whether the layout jumps around while loading (Cumulative Layout Shift). Together they describe whether the visitor you paid for can actually use the page.",
    },
    {
      _key: k(),
      question: "What should be fixed first on a slow website?",
      answer: "In payback order: oversized images, then the accumulated pile of scripts and third-party tags, then hosting and content delivery, and only then deeper render-path engineering. Most sites see their largest single improvement from the first two, which are also the cheapest.",
    },
    {
      _key: k(),
      question: "When is it better to rebuild instead of optimising?",
      answer: "When the site is architecturally slow, typically an aging theme carrying years of plugins, and each optimisation round yields less than the last. Past that point, continued patching costs more in wasted ad spend than a rebuild on a modern stack where performance is a starting property.",
    },
  ];

  const doc = {
    _id:         "insight-blog-09",
    _type:       "insight",
    title:       "Why Your Website Speed Is Quietly Killing Your Ad ROI",
    seoTitle:    "Why Your Website Speed Is Quietly Killing Your Ad ROI",
    slug:        { _type: "slug", current: "website-speed-killing-ad-roi" },
    excerpt:     "You pay for every click, but a slow site decides how many clicks become leads. How speed drains paid budgets, how to diagnose it, and what to fix first.",
    publishedAt: "2026-02-16T09:00:00.000Z",
    author:      { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories:  ["digital-marketing"],
    pillar:      "digital-marketing",
    isGated:     false,
    coverImage:  {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt:   "Website speed is quietly killing your ad ROI",
    },
    body,
    faq,
  };

  console.log("  Creating insight-blog-09...");
  const result = await client.createOrReplace(doc);
  console.log("  Done:", result._id);
}

// ── Blog 10: Full-Funnel vs Fragmented Agencies (stub) ────────────────────
async function createBlog10() {
  resetKey("b10");
  const asset = await uploadImage("blog-10-full-funnel-vs-fragmented-agencies.png");

  const body = [
    callout(
      "Key Takeaway",
      "Fragmented agency models create attribution gaps and conflicting incentives. A full-funnel team - one agency owning strategy, execution, and measurement across every channel - eliminates the vendor blame game and optimises toward actual revenue, not channel-level vanity metrics."
    ),
    p("Full article coming soon. This post is part of the MagicWorks Insights series on building smarter marketing systems."),
    p("In the meantime, explore our work on performance marketing, SEO and Answer Engine Optimisation, and how we structure full-funnel engagements for growth-stage businesses."),
    p("Subscribe to be notified when this article publishes."),
  ];

  const faq = [];

  const doc = {
    _id:         "insight-blog-10",
    _type:       "insight",
    title:       "Full-Funnel vs Fragmented Agencies: Why You Need One Team, Not Five Vendors",
    seoTitle:    "Full-Funnel vs Fragmented Agencies: Why You Need One Team",
    slug:        { _type: "slug", current: "full-funnel-vs-fragmented-agencies" },
    excerpt:     "Fragmented agency models create attribution gaps and conflicting incentives. Here is why full-funnel marketing outperforms the vendor-per-channel approach.",
    publishedAt: "2026-02-23T09:00:00.000Z",
    author:      { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories:  ["digital-marketing"],
    pillar:      "digital-marketing",
    isGated:     false,
    coverImage:  {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt:   "Full-funnel vs fragmented agencies: why one team beats five vendors",
    },
    body,
    faq,
  };

  console.log("  Creating insight-blog-10...");
  const result = await client.createOrReplace(doc);
  console.log("  Done:", result._id);
}

// ── Blog 11: What Is an AI-Native Website (stub) ──────────────────────────
async function createBlog11() {
  resetKey("b11");
  const asset = await uploadImage("blog-11-what-is-an-ai-native-website.png");

  const body = [
    callout(
      "Key Takeaway",
      "An AI-native website is built to be understood, cited, and acted upon by AI systems - not just indexed by search crawlers. It combines technical structure, entity clarity, and content architecture so that AI assistants can confidently extract, attribute, and recommend your business."
    ),
    p("Full article coming soon. This post is part of the MagicWorks Insights series on building websites that perform in an AI-first discovery landscape."),
    p("In the meantime, explore our work on Answer Engine Optimisation, web development, and the five signals that determine whether AI systems cite your content."),
    p("Subscribe to be notified when this article publishes."),
  ];

  const faq = [];

  const doc = {
    _id:         "insight-blog-11",
    _type:       "insight",
    title:       "What Is an AI-Native Website and Why Your Business Needs One in 2026",
    seoTitle:    "What Is an AI-Native Website and Why Your Business Needs One in 2026",
    slug:        { _type: "slug", current: "what-is-an-ai-native-website" },
    excerpt:     "An AI-native website is built to be understood, cited, and acted upon by AI systems. Here is what that means in practice and how to get there.",
    publishedAt: "2026-02-28T09:00:00.000Z",
    author:      { _type: "reference", _ref: "team-member-swapnil-ughade" },
    categories:  ["web-development", "ai-automation"],
    pillar:      "web-development",
    isGated:     false,
    coverImage:  {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt:   "What is an AI-native website and why your business needs one in 2026",
    },
    body,
    faq,
  };

  console.log("  Creating insight-blog-11...");
  const result = await client.createOrReplace(doc);
  console.log("  Done:", result._id);
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log("=== seed-blogs-02-11.mjs ===\n");

  console.log("Blog 02: SEO vs AEO vs GEO");
  await createBlog02();
  console.log();

  console.log("Blog 04: Commission-Based Ad Management");
  await createBlog04();
  console.log();

  console.log("Blog 05: Education Funnel - Enquiry to Enrolment");
  await createBlog05();
  console.log();

  console.log("Blog 06: Manufacturing Invisible on Google");
  await createBlog06();
  console.log();

  console.log("Blog 07: LinkedIn Thought Leadership and AI Citations");
  await createBlog07();
  console.log();

  console.log("Blog 08: Performance Marketing for High-Ticket Education");
  await createBlog08();
  console.log();

  console.log("Blog 09: Website Speed Killing Ad ROI");
  await createBlog09();
  console.log();

  console.log("Blog 10: Full-Funnel vs Fragmented Agencies (stub)");
  await createBlog10();
  console.log();

  console.log("Blog 11: What Is an AI-Native Website (stub)");
  await createBlog11();
  console.log();

  console.log("=== All 9 blogs created successfully ===");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
