/**
 * seed-blogs-12-25.mjs
 * Creates Blogs 12-25 (Batch 2) in Sanity CMS and uploads cover images.
 * Author: Swapnil Ughade (team-member-swapnil-ughade)
 *
 * Run from the project root:
 *   node seed-blogs-12-25.mjs
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
let _prefix = "b12";

const resetKey = (prefix) => { _k = 0; _prefix = prefix; };
const k        = () => `${_prefix}k${String(++_k).padStart(3, "0")}`;

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
const p  = (text) => block("normal", [plain(text)]);

const callout = (title, body, variant = "key-takeaway") =>
  ({ _type: "callout", _key: k(), title, body, variant });

// ── Image upload helper ─────────────────────────────────────────────────────────
const BATCH2_DIR = path.join(
  __dirname, "..", "Docs", "Blogs", "New blogs",
  "Blog 2 to 11 hero images", "Batch 2"
);

async function uploadImage(filename) {
  const imgPath = path.join(BATCH2_DIR, filename);
  console.log(`  Uploading ${filename}...`);
  const buffer = fs.readFileSync(imgPath);
  const asset  = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/png",
  });
  console.log(`  Uploaded: ${asset._id}`);
  return asset;
}

const AUTHOR_REF = { _type: "reference", _ref: "team-member-swapnil-ughade" };


// ============================================================
// BLOG 12: WordPress vs AI-Native
// ============================================================
async function createBlog12() {
  resetKey("b12");
  const asset = await uploadImage("blog-12-wordpress-vs-ai-native.png");

  const body = [
    callout(
      "Key Takeaway",
      "This is not a war with a winner. WordPress remains the right choice when your website's job is publishing content and establishing presence on a modest budget with in-house editing. An AI-Native stack is the right choice when your website has processing work to do, when performance is a revenue lever, or when the site must grow intelligent capabilities over its lifetime. Choose based on the site's job description, not the industry's fashion cycle."
    ),
    p("Ask this question in the wrong room and you will get a religious answer. WordPress loyalists will tell you it powers a huge share of the web, which is true. Modern-stack advocates will tell you WordPress is a 2008 architecture dragging a decade of plugins, which is also, often, true."),
    p("You do not need a religion. You need a decision, and decisions come from matching tools to jobs. Here is the framework we use, including the cases where we recommend against our own premium service."),

    h2("The honest case for WordPress"),
    p("Any comparison that opens by burying WordPress is marketing, not analysis, so let us start with what it genuinely does well."),
    block("normal", [
      plain("WordPress is the most proven publishing system ever built. For a content-led site, a blog, a news operation, a straightforward business presence, it offers an editing experience your team already knows, an ecosystem with a plugin for nearly everything, the largest talent pool in web development, and a build cost that modern stacks struggle to match at the entry level. It is also self-owned and portable in a way page builders and closed platforms are not."),
    ]),
    p("If your website's complete job description is to publish content, present credibility, and capture enquiries, and your budget is modest, WordPress executed well is not a compromise. It is the correct engineering answer, and a disciplined WordPress build, lean theme, few plugins, decent hosting, will serve that job for years."),
    p("The key phrase is executed well, which brings us to how WordPress actually fails."),

    h2("How WordPress actually fails in the wild"),
    p("WordPress's problems are rarely WordPress. They are the ecosystem habits that accumulate around it."),
    p("The typical five-year-old WordPress site carries a heavyweight multipurpose theme chosen for its demo, a page builder on top of that, and fifteen to forty plugins, each one a separate developer's code, update cadence, and security surface. The compound result is a site that is architecturally slow, expensive to secure, and fragile to update, where every performance round buys less than the last because the weight is structural."),
    p("The second failure is the ceiling. WordPress was designed to manage and display content, and it is superb at that. Ask it to be an application, to process, evaluate, match, or run intelligent workflows, and you are building against the grain. Possible with enough custom development, but you end up paying application-engineering prices for a foundation that resists the work."),

    h2("What the AI-Native stack changes"),
    p("An AI-Native website is one where intelligence is part of how the site functions, screening applications, understanding questions, processing documents, rather than a widget on the surface."),
    p("Architecturally, that means an application framework such as Next.js as the foundation, a headless CMS so editors still get a clean writing experience while the presentation layer stays fast and free, and backend services where LLM-driven capabilities live behind proper engineering: cost controls, quality checks, privacy handling."),
    p("Three properties fall out of this architecture. Performance by construction rather than by optimisation, because there is no theme-and-plugin sediment to fight. A real home for intelligence, so capabilities can be added over the site's life instead of bolted against the grain. And clean, structured output that both search engines and AI answer engines parse well."),
    p("The honest costs, stated plainly: a higher build investment, a smaller (though rapidly growing) talent pool than WordPress, and a dependency on developers rather than plugins for new functionality."),

    h2("The decision framework: five questions"),
    p("Run your project through these in order. They resolve most cases without a single religious argument."),
    block("normal", [strong("1. What is the website's job in one sentence?"), plain(" Publishing content and presenting the company points to WordPress. Screening, matching, processing, answering, or personalising at volume points to AI-Native. If your sentence contains a verb the site performs on the business's behalf, you have an application requirement wearing a website's name.")], [], null),
    block("normal", [strong("2. Is performance a revenue lever for you?"), plain(" If you run serious paid traffic or compete in organic and AI search, speed is money. A disciplined WordPress build can be fast; an AI-Native build is fast by default and stays fast, because there is no plugin sediment accumulating.")], [], null),
    block("normal", [strong("3. What will you want this site to do in year three?"), plain(" A website is a five-to-seven year asset. If intelligent capabilities are plausibly in your future, the architecture decision is being made now, whether or not the features launch on day one. Retrofitting intelligence onto WordPress is the most expensive path of all.")], [], null),
    block("normal", [strong("4. Who maintains it, honestly?"), plain(" A capable in-house editor with no developer access is an argument for WordPress's self-service ecosystem. A relationship with a development partner removes that advantage and lets the architecture question be decided on merit.")], [], null),
    block("normal", [strong("5. What does the budget actually need to cover?"), plain(" If the budget is entry-level, a lean WordPress build beats a compromised modern build every time. An underfunded AI-Native project is the worst of both worlds.")], [], null),

    h2("The three verdicts"),
    block("normal", [strong("Choose WordPress when"), plain(" the job is publishing and presence, the budget is modest, editing independence matters most, and no processing work is on the roadmap. Then protect the choice: lean theme, minimal plugins, proper hosting, and the discipline to keep it that way.")], [], null),
    block("normal", [strong("Choose the AI-Native stack when"), plain(" the site has work to do beyond display, when performance is tied to revenue, or when the asset must be able to grow intelligence over its lifetime. Pay for engineering once and let the architecture earn its premium.")], [], null),
    p("Beware the middle path: the heavily customised WordPress build straining to act like an application. It combines WordPress's ceiling with custom development's price, and it is where most of the worst websites we audit were born."),
    p("The stack question, asked properly, was never which technology is better. It was what is this website's job, and once that sentence is written honestly, the technology usually picks itself."),
  ];

  const faq = [
    { _key: k(), question: "Is WordPress still a good choice in 2026?", answer: "Yes, for the job it was designed for: publishing content and establishing business presence on a modest budget with in-house editing. A disciplined WordPress build with a lean theme, few plugins, and proper hosting remains the correct engineering answer for that requirement." },
    { _key: k(), question: "When should a business move beyond WordPress?", answer: "When the website has processing work to do, when performance is directly tied to revenue through paid traffic or search visibility, or when intelligent capabilities are plausibly needed within the site's five-to-seven year life. WordPress resists application work, and retrofitting intelligence onto it is the most expensive path." },
    { _key: k(), question: "What is the difference between WordPress and a headless CMS setup?", answer: "WordPress couples content management and presentation in one system. A headless setup separates them: editors work in a clean CMS while a modern framework renders the site, producing faster pages and a proper home for backend intelligence." },
    { _key: k(), question: "Is an AI-Native website more expensive than WordPress?", answer: "The initial build costs more, because it is engineering rather than assembly. The comparison narrows over the asset's life: performance by construction, lower maintenance fragility, and the ability to add intelligent capabilities without re-platforming. If the budget is entry-level, a lean WordPress site is the better choice." },
    { _key: k(), question: "Can WordPress websites use AI features?", answer: "To a point, through plugins and custom development, but WordPress was designed for content display rather than intelligent processing. Substantial AI capabilities end up built against the grain at application-engineering prices. Businesses with real processing requirements are better served choosing an architecture with a natural home for that work." },
  ];

  const doc = {
    _id:         "insight-blog-12",
    _type:       "insight",
    title:       "WordPress vs AI-Native: Choosing the Right Stack for Your Next Website",
    seoTitle:    "WordPress vs AI-Native: Choosing Your Next Website Stack",
    slug:        { _type: "slug", current: "wordpress-vs-ai-native-website-stack" },
    excerpt:     "WordPress is not dead and AI-Native is not hype. An honest decision framework for choosing between them, based on what your website's actual job is.",
    publishedAt: "2026-05-18T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["web-development"],
    pillar:      "web-development",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "WordPress vs AI-Native: choosing the right website stack" },
    body,
    faq,
  };

  console.log("Creating insight-blog-12...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 13: Beyond Chatbots
// ============================================================
async function createBlog13() {
  resetKey("b13");
  const asset = await uploadImage("blog-13-beyond-chatbots-ai-website-features.png");

  const body = [
    callout(
      "Key Takeaway",
      "When businesses picture AI on a website, they picture a chat bubble. But the AI that changes how a business runs is mostly invisible: capabilities that read, evaluate, organise, and process behind the scenes. Six of them are mature enough to build today: application screening, semantic search, document intake, media processing, content personalisation, and quality-and-routing automation. Each replaces a specific human bottleneck, which is exactly how each should be judged."
    ),
    p("There is a reflex we encounter in almost every AI-Native website conversation. The client pictures artificial intelligence on a website, and the picture is always the same: a chat bubble in the bottom corner."),
    p("Conversational AI is real and valuable, and it is its own discipline with its own products, which is precisely why this article is not about it. This article is about the other kind: the AI a visitor never talks to, working inside the website's machinery, doing jobs your team currently does by hand or does not do at all. In our experience this invisible layer is where most of the operational return actually lives."),

    h2("1. Application and submission screening"),
    p("The bottleneck: anything your website collects at volume that a human must then evaluate, job applications, admission enquiries, vendor registrations, grant submissions, membership requests. Someone opens each one, judges it against criteria, and sorts it, which means the judging happens slowly, inconsistently, and often days after the applicant has moved on."),
    p("The capability: the website performs the first evaluation itself. A careers portal reads each incoming resume, scores it against the actual requirements of the role, and presents the team a ranked pipeline with reasoning attached. The human decision is not replaced; it is relocated to where it adds value, choosing among a qualified shortlist rather than excavating one from two hundred files."),
    p("What to demand from the build: transparent criteria you control, visible reasoning per score so the team can audit and correct it, and a design that treats the AI as a first filter with human judgment firmly on top."),

    h2("2. Search that understands questions"),
    p("The bottleneck: the search box that only matches keywords. If your value lives in deep content, courses, documentation, articles, a large catalogue, then every failed search is a visitor who could not find something you actually have. Keyword search fails silently and constantly, and nobody files a complaint; they just leave."),
    p("The capability: semantic search, where the visitor asks in their own words and the site answers from its own content, surfacing the relevant material even when no words match. For knowledge-heavy businesses this quietly changes the website's economics: the existing content library starts earning attention it always deserved and never received."),
    p("There is a strategic bonus. Building this forces your content into the clean, structured, well-organised form that also makes it more extractable by external AI answer engines. The same work improves the search inside your site and your citability outside it."),

    h2("3. Document intake that reads what it receives"),
    p("The bottleneck: the inbox where uploaded documents go to wait. RFQs, requirement briefs, purchase orders, application paperwork: a person opens each file, extracts the relevant details, re-types them into a system, and routes the result to a colleague. It is pure processing labour, and it sits directly on top of your response time to potential customers."),
    p("The capability: the website reads what it receives. An uploaded requirement document is parsed on arrival, the key details are extracted and structured, the enquiry is routed to the right person, and a first-response draft is prepared for human review. For B2B businesses where speed of response wins deals, this converts a days-long queue into a same-hour reply, and it is frequently the single highest-return capability on this list."),

    h2("4. Media that processes itself"),
    p("The bottleneck: the recorded content that never becomes usable content. Webinars, community sessions, lectures, event recordings: hours of valuable material that would need an editor's week to clip, title, and organise, so it sits whole and unwatched in a folder instead."),
    p("The capability: the platform processes its own media. Long recordings are analysed on upload, meaningful segments are identified and clipped, titles and summaries are drafted, and the library organises itself for members to browse. For community platforms, education businesses, and content operations, this turns a production bottleneck into a property of the website, and the content library compounds instead of accumulating."),

    h2("5. Personalisation that respects the visitor"),
    p("The bottleneck: one website speaking identically to every visitor, when your audiences are visibly different. The first-time researcher, the returning comparer, and the ready buyer all see the same page, so the page serves each of them at half strength."),
    p("The capability: the site adapts what it emphasises, surfacing the right case studies to the returning visitor, the right programme to the student whose behaviour signals their level, the right next step to someone deep in a decision. Done honestly, this is relevance, not manipulation."),
    p("What to demand from the build: restraint. Personalisation earns its keep only with genuinely distinct audience needs and enough traffic to matter, and it must be built on privacy-respecting signals with disclosure where appropriate."),

    h2("6. Quality and routing automation across the pipeline"),
    p("The bottleneck: the small judgment tasks stitched through every website operation. Is this form submission spam or real? Which office should this enquiry go to? Does this user-submitted listing meet the guidelines? Each micro-decision is trivial alone and, at volume, consumes a surprising share of someone's week."),
    p("The capability: the website makes the routine calls itself, flags the uncertain ones for a human, and routes everything to the right destination the moment it arrives. This is the least glamorous capability here and often the fastest to pay back, because it removes friction from every other process the site runs."),

    h2("How to choose, and how to judge the return"),
    p("Do not buy the list. Buy the bottleneck."),
    p("The selection method is one exercise: ask where your team spends hours doing repetitive judgment work that touches the website, or where work is not being done at all because no one has the hours. That answer, not a features menu, picks your first capability. One bottleneck, removed properly, beats four capabilities installed shallowly."),
    p("The evaluation method is equally plain: every capability above replaces measurable human effort or captures measurably lost value, so the return can be estimated before the build and verified after it. Hours saved per week, response time before and after, share of content library actually consumed. If a proposed AI feature cannot name its bottleneck and its measure, it is decoration, whatever the demo looks like."),
  ];

  const faq = [
    { _key: k(), question: "What AI features can a website have besides a chatbot?", answer: "The highest-value AI on a website is usually invisible backend capability: screening and scoring applications or submissions, semantic search that understands questions, document intake that reads and routes uploaded files, automatic processing of long-form media into organised clips, content personalisation, and quality-and-routing automation for the small judgment tasks that consume team hours." },
    { _key: k(), question: "What is the most valuable AI capability for a B2B website?", answer: "Frequently document intake: the site reads incoming RFQs and requirement documents, extracts and structures the details, routes them to the right person, and drafts a first response for human review. In businesses where response speed wins deals, converting a days-long queue into a same-hour reply pays back faster than any visible feature." },
    { _key: k(), question: "Is AI-powered application screening safe to use?", answer: "It is, when built with the right constraints: transparent criteria the business controls, visible reasoning attached to every score, and human judgment firmly on top of the AI's first filter. A screening build that cannot explain its decisions should not go live." },
    { _key: k(), question: "What is semantic search on a website?", answer: "Search that understands meaning rather than matching keywords: visitors ask in their own words and the site surfaces the relevant content even when no exact words match. For businesses whose value lives in deep content libraries, it recovers the attention that silent keyword-search failures constantly lose." },
    { _key: k(), question: "How do you measure ROI on AI website features?", answer: "Each capability replaces measurable human effort or captures measurably lost value, so estimate before and verify after: hours of processing work saved weekly, enquiry response time before and after, share of the content library actually consumed, correct-routing rates. A feature that cannot name its bottleneck and its measure is decoration." },
  ];

  const doc = {
    _id:         "insight-blog-13",
    _type:       "insight",
    title:       "Beyond Chatbots: The AI Website Features That Actually Change How Your Business Runs",
    seoTitle:    "Beyond Chatbots: AI Website Features That Change Operations",
    slug:        { _type: "slug", current: "beyond-chatbots-ai-website-features" },
    excerpt:     "The most valuable AI on a website is invisible: screening, understanding, processing, and organising behind the scenes. Six backend capabilities worth building.",
    publishedAt: "2026-05-25T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["web-development", "ai-consultation"],
    pillar:      "web-development",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "Beyond chatbots: AI website features that change operations" },
    body,
    faq,
  };

  console.log("Creating insight-blog-13...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 14: Education Website That Converts
// ============================================================
async function createBlog14() {
  resetKey("b14");
  const asset = await uploadImage("blog-14-education-website-that-converts.png");

  const body = [
    callout(
      "Key Takeaway",
      "An education website's job is not to describe an institution. It is to move a specific person, a student comparing options with a parent looking over their shoulder, from question to enquiry to conversation. The portals that convert well in India share a recognisable anatomy: programme pages built as answers, honest fee visibility, forms designed as filters, proof arranged for the second decision-maker, one-tap contact on the channels Indians actually use, and speed on the phones students actually own."
    ),
    p("Education websites in India split into two families, and you can tell them apart in ten seconds."),
    p("The first family was built to make the institution proud: a slideshow of campus buildings, a chairman's message, a news ticker, and somewhere, four clicks deep, the actual programmes. The second family was built to make a decision easy: it behaves like the best admissions counsellor the institution has, on duty at 11 pm when a working professional is comparing MBA options, or when a parent in another city is quietly vetting the shortlist."),
    p("Having spent years marketing education programmes at serious scale, generating tens of thousands of qualified admissions leads and watching exactly which pages produced them, we can tell you the second family wins by a margin that shows up in enrolment numbers. Here is its anatomy."),

    h2("Start from the visitor's real situation"),
    p("The primary visitor is comparing. Students and professionals shortlist several institutions in the same sitting, arrive with specific questions, and allocate minutes, not hours, to each candidate site. The secondary visitor is verifying: a parent or spouse who often controls the money, arrives later in the journey, and is looking for reasons to trust or veto. And both are overwhelmingly on phones, frequently on mid-range devices over mobile data."),
    p("That picture yields the ruling test for every page: can a distracted person on a phone find the answer to their actual question in under a minute, and act on it in under two? Everything in this playbook is that test, applied."),

    h2("Lesson 1: The programme page is the website"),
    p("The single biggest structural insight from high-performing portals: the programme page, not the home page, is where enrolments are won. Marketing traffic, search traffic, and comparison traffic all land there."),
    p("A converting programme page answers, in order of the visitor's priority: what the programme is and who it is genuinely for, what it costs and how payment works, what outcomes graduates actually achieve, how and when it is delivered, what admission requires and when the deadlines fall, and what happens after clicking enquire. Structure each of those as a direct question with a direct answer."),
    p("Two disciplines elevate a good programme page to a great one. Write for the comparer: state plainly what distinguishes this programme, because the visitor has three competitor tabs open and vague superlatives read as evasion. And keep one page per programme with real depth, rather than a thin grid of look-alike cards."),

    h2("Lesson 2: Fee transparency is a conversion strategy"),
    p("The most searched, most hidden piece of information on Indian education websites is the fee. Institutions hide it hoping to force a counsellor conversation, and the tactic backfires twice: high-intent visitors leave for the portal that answers, and the enquiries that do come in are unfiltered by budget reality."),
    p("The portals that convert well state fees, or at minimum honest ranges with payment and scholarship structure, directly on the programme page. The fee is a filter, and filters are your friend: enquiry volume dips slightly, and everything downstream improves. Transparency also compounds in the AI-search era, because answer engines assemble comparison answers from sites that state facts, and silently exclude the ones that hide them."),

    h2("Lesson 3: Design the form as a filter, not a net"),
    p("The converting pattern asks for a small number of high-signal fields: intended programme, intake, current qualification, city, and a contact channel. Each field must earn its place by predicting intent or enabling follow-up; every decorative field costs completions. Multi-step forms consistently outperform long single walls on mobile."),
    p("Then honour the promise instantly. The form's real product is not a database row; it is the first minutes of a relationship, which is why the acknowledgment, ideally on WhatsApp, should arrive immediately with something genuinely useful attached: the fee structure, the prospectus, a comparison guide. Speed to lead is won or lost in the seconds after submission."),

    h2("Lesson 4: Arrange proof for the person paying"),
    p("Most education sites present proof for the applicant: placements, recruiter logos, campus life. The high-converting ones also quietly serve the second decision-maker, because in Indian education the person filling the form and the person paying the fee are frequently different people with different questions."),
    p("The parent or spouse is scanning for legitimacy and return: accreditations and approvals stated specifically rather than as logo soup, placement and outcome evidence presented honestly with context, faculty credentials, safety and support infrastructure. The strongest pattern we have seen is a section literally designed to be forwarded, a page the applicant can send to the person they need to convince."),

    h2("Lesson 5: Contact must match how India actually communicates"),
    p("A surprising number of education sites still offer exactly two contact routes: a form and a phone number for office hours. Their visitors live on WhatsApp, decide in the evening, and treat an unanswered channel as an answer."),
    p("The converting pattern puts one-tap WhatsApp contact on every programme page, a callback request that respects the visitor's choice of time, and click-to-call that works, all persistent on mobile. The channel promise matters as much as the channel: we reply on WhatsApp within X during these hours converts contact from a gamble into an expectation."),

    h2("Lesson 6: Speed is an admissions metric"),
    p("Everything above sits behind one gate: the page must load fast on a mid-range phone over mobile data, because that is the actual device profile of Indian education traffic. Admission campaigns concentrate spend into narrow seasonal windows at peak auction prices, which means every abandoned load during intake season is bought at the year's most expensive rates."),
    p("Run your three most important programme pages through PageSpeed Insights on mobile this week, then do the counsellor's phone test: load them on a mid-range Android over mobile data and try to complete your own form. If either test fails, fixing it outranks every campaign optimisation on your list."),

    h2("Lesson 7: The intelligent layer is the next separator"),
    p("The lessons so far describe the best of the current generation. The next generation adds a layer of intelligence inside the site's machinery, and education is one of the verticals where it pays back fastest."),
    p("Concretely: search that understands a student's actual question and answers from the institution's own content. Programme discovery that helps a visitor find the right fit from their qualification and goals. Enquiry intake that reads, scores, and routes submissions so counsellors open a ranked pipeline. And content operations that keep hundreds of programme pages current without an editorial bottleneck."),
    p("None of this replaces counsellors. It delivers them better conversations, sooner, which is the entire economic point of an education website."),
  ];

  const faq = [
    { _key: k(), question: "What makes an education website convert well?", answer: "Programme pages built as direct answers to the visitor's real questions, honest fee visibility, enquiry forms designed as filters with instant follow-up, proof arranged for the parent or spouse who often pays, one-tap WhatsApp contact, and fast load times on mid-range phones. The site should behave like the institution's best counsellor, available at any hour." },
    { _key: k(), question: "Should education websites display fees?", answer: "Yes, at least as honest ranges with payment and scholarship structure. Hiding fees loses high-intent visitors to portals that answer, floods counsellors with budget-mismatched enquiries, and excludes the institution from AI-assembled comparison answers, which are built from sites that state facts." },
    { _key: k(), question: "What should an education enquiry form ask?", answer: "A small set of high-signal fields: intended programme, intake, current qualification, city, and contact channel, ideally across a multi-step mobile flow. Every field must predict intent or enable follow-up, and the form should end with a specific promise of who will respond, where, and how soon, honoured immediately." },
    { _key: k(), question: "How important is mobile speed for education websites?", answer: "Decisive. Indian education traffic is overwhelmingly mobile, often on mid-range devices over mobile data, and admissions spend concentrates into seasonal windows at peak advertising prices, so every abandoned slow load is bought at the year's most expensive rates. Programme pages should be tested on real mid-range phones, not just desktop tools." },
    { _key: k(), question: "How can AI improve an education website?", answer: "Inside the site's machinery rather than as a widget: search that answers students' actual questions from the institution's content, programme discovery matched to a visitor's qualifications and goals, and enquiry intake that scores and routes submissions so counsellors start each day with a ranked pipeline. The intelligence delivers better conversations sooner; counsellors still close them." },
  ];

  const doc = {
    _id:         "insight-blog-14",
    _type:       "insight",
    title:       "Building an Education Website That Converts: Lessons from India's Top Ed Portals",
    seoTitle:    "Building an Education Website That Converts: A Playbook",
    slug:        { _type: "slug", current: "education-website-that-converts" },
    excerpt:     "What India's best education portals get right: programme pages that answer, fee transparency, forms that qualify, parent-ready proof, and speed. A full playbook.",
    publishedAt: "2026-06-01T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["web-development", "digital-marketing"],
    pillar:      "web-development",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "Building an education website that converts" },
    body,
    faq,
  };

  console.log("Creating insight-blog-14...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 15: Real Estate Website Buyer Expectations
// ============================================================
async function createBlog15() {
  resetKey("b15");
  const asset = await uploadImage("blog-15-real-estate-website-buyer-expectations.png");

  const body = [
    callout(
      "Key Takeaway",
      "The real estate buyer of 2026 arrives at a developer's website to verify, not to browse. In a market where trust is the scarcest asset, the website's job is to remove doubt: real project status, honest pricing signals, RERA details one tap away, location truth, photography that matches reality, instant WhatsApp contact, and pages that load on the phone in hand at the site visit. Developers who treat the website as a glossy brochure are answering a question buyers stopped asking years ago."
    ),
    p("Real estate marketing in India has a peculiar inversion at its core. It is among the highest-ticket purchases a family ever makes, and it is served by some of the least trustworthy websites in any industry: renders presented as photographs, prices hidden behind forms, possession dates that live in permanent optimism."),
    p("Buyers have adapted. The modern property buyer arrives at a developer's website already armed, with portal listings, locality forums, RERA records, and increasingly an AI assistant's summary of the project's reputation. They are not there to be impressed. They are there to check whether the developer's own story survives contact with what they already know. That shift rewrites the website's job description."),

    h2("Expectation 1: Verification, not persuasion"),
    p("The defining behaviour of the 2026 buyer is cross-checking. Whatever your website claims, the buyer will hold it against the MahaRERA portal or their state's equivalent, portal listings, and community chatter, often before the first call."),
    p("The winning move is to stop resisting this and start serving it. Put the RERA registration number of every project one tap from its page, link the official record, and keep approvals, construction status, and possession timelines stated in plain, dated language. A developer website that makes verification easy is making a statement no slogan can: we expect to be checked, and we will pass. In a low-trust category, that posture is the differentiation."),

    h2("Expectation 2: Honest pricing signals"),
    p("The all-time classic real estate website failure: Price on request. Buyers read those three words fluently, and what they read is more than you think, and a sales call you do not want."),
    p("Full price lists may be commercially impractical in a dynamic market, but honest signals are not: a starting price, a configuration-wise range, indicative EMI framing, and clarity on what is and is not included. Stated ranges lose the enquiries that were never going to buy and earn the trust of the ones who might, while feeding the AI-assembled comparisons that increasingly shape shortlists before any developer knows the buyer exists."),

    h2("Expectation 3: The truth about location"),
    p("Every project website claims twenty minutes to the airport. Every buyer knows to disbelieve it, and then goes to a map to check."),
    p("Serve the check instead of losing it. An honest location section shows the project on a real map, states distances to the things buyers actually organise life around, with realistic travel framing, and is candid about what is operational today versus proposed for someday. Location honesty is cheap to publish and expensive to fake, which is exactly why it works."),

    h2("Expectation 4: Imagery that matches reality"),
    p("Renders have their place: an under-construction project must show its vision. The trust failure is not the render; it is the ambiguity, the careful blur between what exists and what is imagined."),
    p("The 2026 expectation is labelled reality: actual site photography updated on a stated cadence, construction progress with dates, walkthrough video of what stands today alongside the render of what will. Developers who publish dated monthly progress photos convert scepticism into a habit, buyers return monthly to watch, and every return visit is a nurture touch no campaign could buy."),

    h2("Expectation 5: Contact on the buyer's terms"),
    p("Property enquiry has a well-earned reputation as a commitment to be called forever. Buyers hesitate at forms not from low intent but from self-defence."),
    p("The pattern that converts respects that: one-tap WhatsApp as the primary channel, callback requests with a time the buyer chooses, and an explicit statement of what happens after contact. Speed still wins, the first developer to respond meaningfully frames the comparison, but consent about channel and timing is now part of the offer itself."),

    h2("Expectation 6: Performance on the phone at the site visit"),
    p("Real estate browsing has a specific mobile moment most industries lack: the buyer standing at your site, or a competitor's, pulling up your project page on mobile data to check a detail or show a spouse. If that page takes ten seconds to stagger through a video header, the conversation moves on without it."),
    p("Heavy imagery makes property sites structurally prone to slow-load problems. Test your top project pages on PageSpeed Insights on mobile, then do the field test on a mid-range phone over mobile data. The buyer will."),

    h2("Expectation 7: Answers at 11 pm"),
    p("Property decisions are researched at night, full of questions with factual answers: carpet versus built-up for a specific unit, maintenance charges, pet policy, loan tie-ups, possession stage. The 2026 buyer expects the website to answer these directly, and increasingly asks an AI assistant when it does not."),
    p("A genuinely useful, specific FAQ per project, written from the questions your sales team actually hears, structured so both a human and an answer engine can lift the answer, is the first layer. The second, for developers with real portfolio depth, is intelligent search and enquiry intake that reads, scores, and routes buyer requirements so the sales team opens qualified conversations rather than raw phone numbers."),

    h2("The uncomfortable summary"),
    p("Every expectation on this list is a trust mechanism, and that is the honest diagnosis of the category: real estate websites underperform not because they lack features but because they were designed to persuade in a market that has switched to verifying."),
    p("The developers who pass the audit are not the ones with the biggest marketing budgets. They are the ones who understood, earlier than their competitors, that in this market the website is not the brochure. It is the background check, and it should be built to pass one."),
  ];

  const faq = [
    { _key: k(), question: "What should a real estate website include in 2026?", answer: "The trust essentials: RERA registration linked from every project page, honest pricing signals such as starting prices and configuration ranges, truthful location information with realistic distances, dated site photography alongside labelled renders, one-tap WhatsApp contact with clear follow-up expectations, fast mobile performance, and project FAQs that answer real buyer questions directly." },
    { _key: k(), question: "Should property websites show prices?", answer: "At minimum, honest signals: a starting price, configuration-wise ranges, and clarity on inclusions. Price on request filters out trust rather than filtering in leads, and it excludes the project from the AI-assembled comparisons that increasingly shape buyer shortlists." },
    { _key: k(), question: "Why is RERA information important on a developer website?", answer: "Because buyers verify regardless. Modern buyers cross-check every project against official RERA records before calling, so a website that surfaces its registration and links the official record signals confidence and removes a friction step, while one that buries it invites the suspicion it was trying to avoid." },
    { _key: k(), question: "How fast should a real estate website be?", answer: "Fast enough for the site-visit moment: a buyer on a mid-range phone over mobile data, standing at a project, pulling up a page to check a detail. Image-heavy property sites are structurally prone to slow loads, so disciplined image handling and mobile testing on real devices matter more here than in most categories." },
    { _key: k(), question: "How can AI help a real estate website?", answer: "Most valuably behind the scenes: search that answers a buyer's actual questions from project documentation at any hour, and enquiry intake that reads, scores, and routes buyer requirements so sales teams open qualified conversations instead of raw contact lists. In a category flooded with unqualified enquiries, intake intelligence pays back quickly." },
  ];

  const doc = {
    _id:         "insight-blog-15",
    _type:       "insight",
    title:       "What Real Estate Buyers Expect from a Website in 2026",
    seoTitle:    "What Real Estate Buyers Expect from a Website in 2026",
    slug:        { _type: "slug", current: "real-estate-website-buyer-expectations" },
    excerpt:     "Property buyers now verify online before they ever call. The seven expectations a real estate website must meet in 2026, and the trust gap most developers ignore.",
    publishedAt: "2026-06-08T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["web-development", "digital-marketing"],
    pillar:      "web-development",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "What real estate buyers expect from a website in 2026" },
    body,
    faq,
  };

  console.log("Creating insight-blog-15...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 16: Questions Before Hiring Web Agency
// ============================================================
async function createBlog16() {
  resetKey("b16");
  const asset = await uploadImage("blog-16-questions-before-hiring-web-agency.png");

  const body = [
    callout(
      "Key Takeaway",
      "Most website projects fail on terms that were visible in the first meeting, if anyone had asked. Seven questions expose almost everything: who owns the code, domain, and hosting; why this stack for this job; what performance is promised in numbers; how you will edit content without the agency; what happens after launch; who actually does the work; and what the quoted price excludes. An agency that answers all seven plainly is rare. Hire that one."
    ),
    p("Nobody hires a web agency planning to end up hostage to one. Yet the pattern repeats across the audits we run: a business that cannot log in to its own hosting, a completed site nobody can edit, a launch price that turned out to be an instalment."),
    p("None of these failures were hidden. Every one of them was sitting in plain sight during the sales conversation, waiting for a question nobody asked. Here are the seven, with the answers that should satisfy you and the ones that should end the meeting. We build websites for a living, so read this as the checklist we expect to be examined against."),

    h2("Question 1: Who owns the code, the domain, and the hosting accounts?"),
    p("The only acceptable answer is you, in writing, for all three. The domain registered in your account, the hosting contract in your name or transparently accessible to you, and the code and content yours on full payment, with credentials handed over as a deliverable, not a favour."),
    p("The failure pattern is the quiet hostage arrangement: the domain registered under the agency's account for convenience, hosting bundled invisibly into a maintenance fee, code that lives only on the agency's server. Everything is fine until you want to leave. A worthy agency separates these cleanly, including hosting as its own transparent line item, precisely so the relationship continues because you want it to, not because leaving is expensive."),

    h2("Question 2: Why this stack, for this specific job?"),
    p("You are not testing the technology. You are testing the reasoning. The right stack follows from the website's job description, and an agency should be able to connect the two in plain language."),
    p("The red flag is the single-answer shop: every project gets the same platform because that is what the shop sells, whether the platform fits or not. Ask what they would recommend for a job unlike yours, and listen for whether the answer changes. An agency that recommends a simpler, cheaper build than you expected has just shown you its incentives are pointed the right way."),

    h2("Question 3: What performance are you promising, in numbers?"),
    p("Fast is not a commitment. Ask for the commitment in measurable terms: target scores or Core Web Vitals thresholds, measured on mobile, on the finished site with real content, verifiable by you in PageSpeed Insights."),
    p("The reason to be firm here is economic: a slow site taxes every rupee of marketing you will ever run on it, so a build without performance commitments is a build with a hidden recurring cost. Also ask to test two or three of the agency's recent live sites yourself, on your phone, right now. Their portfolio's real-world speed is the most honest performance promise they can make."),

    h2("Question 4: How will my team edit content without calling you?"),
    p("The dependency trap is the most common post-launch complaint in the industry: a beautiful site where changing a headline requires a ticket and an invoice. Before signing, get specific: which parts of the site can your team edit through an admin interface, what does that interface look like (ask for a demonstration, not a description), and what genuinely requires developer work?"),
    p("Modern architectures have removed the old excuse; a well-built site on any serious stack gives editors a clean self-service experience. An agency that cannot show you the editing experience before the contract is asking you to buy the steering wheel sight unseen."),

    h2("Question 5: What exactly happens after launch?"),
    p("A website is not a delivery; it is the start of an operating life. Ask what the first ninety days include, what warranty covers defects versus what counts as new work, what a maintenance arrangement contains and costs, and critically, what happens if you choose not to buy maintenance from them. The answer to that last one tells you whether aftercare is a service or a leash."),
    p("Get response expectations in writing for the scenarios that matter: the site is down, the form stopped delivering enquiries, a security patch is urgent. Vague aftercare is where good projects go to rot."),

    h2("Question 6: Who, by name, will actually do the work?"),
    p("The person who impresses you in the sales meeting is frequently not the person who builds your site. Sometimes the work is subcontracted entirely, which you discover only when questions start taking a week to answer."),
    p("Ask who will be on your project by name and role, whether any part will be outsourced, and who your single point of contact is once the build begins. What you are screening out is the anonymous production line, where your project is a ticket queue and context evaporates at every handoff."),

    h2("Question 7: What does this price not include?"),
    p("The quoted price is rarely the whole price, and the honest agencies distinguish themselves by volunteering the boundary before you ask. Walk the list explicitly: content writing and migration, photography, third-party licences, hosting, integrations, revisions beyond the agreed rounds, and what a change of scope costs and how it gets approved."),
    p("The pattern to fear is not the higher quote; it is the suspiciously low one, because a price that undercuts the market has to recover its margin somewhere. The complete question is never what does it cost. It is what does it cost to get everything I actually need, from build through year one, compared across bidders on the same definition."),

    h2("The pattern behind all seven"),
    p("Read the seven questions again and notice they are one question wearing seven outfits: does this agency's business model depend on you being informed, or on you not being? Ownership, reasoning, measurable promises, self-service, defined aftercare, named humans, and transparent pricing are all versions of the same posture, and agencies either hold that posture everywhere or nowhere."),
    p("Take the list into your next three agency conversations and score the answers honestly. The winner is usually obvious by question four, and it is not always the biggest name or the lowest bid. It is the one that answered fastest and flinched least, because they had nothing in the model that required you not to ask."),
  ];

  const faq = [
    { _key: k(), question: "What should I ask a web development agency before hiring them?", answer: "Seven things expose most of what matters: who owns the code, domain, and hosting; why they recommend this stack for this specific job; what performance they promise in measurable numbers; how your team edits content independently; what happens after launch; who by name does the work; and what the quoted price excludes." },
    { _key: k(), question: "Who should own the website code and domain?", answer: "The client, in writing, for all three assets: domain registered in your account, hosting in your name or transparently accessible, and code plus content transferred on full payment. Hosting should be a separate, transparent line item, never invisibly bundled, so the relationship continues by choice rather than by lock-in." },
    { _key: k(), question: "What is a fair performance commitment for a new website?", answer: "Measurable targets on the finished site with real content: Core Web Vitals thresholds or speed scores, assessed on mobile, verifiable by the client in public tools. A useful supplementary check is testing the agency's recent live sites on your own phone, since their portfolio's real speed is their most honest promise." },
    { _key: k(), question: "Why are very cheap website quotes risky?", answer: "A price that undercuts the market must recover its margin somewhere, typically through change orders, locked-in maintenance and hosting, or invisible corner-cutting discovered after launch. Compare bidders on the total cost of everything you need from build through the first year, on the same definition." },
    { _key: k(), question: "How do I avoid being dependent on my web agency after launch?", answer: "Confirm before signing: a demonstrated content editing interface your team can use, written ownership of all accounts and code, defined aftercare with response expectations, and an explicit answer to what happens if you decline their maintenance plan. Dependency is a design decision, and it is made at contract time." },
  ];

  const doc = {
    _id:         "insight-blog-16",
    _type:       "insight",
    title:       "The 7 Questions to Ask Before Hiring a Web Development Agency in India",
    seoTitle:    "7 Questions to Ask Before Hiring a Web Development Agency",
    slug:        { _type: "slug", current: "questions-before-hiring-web-development-agency" },
    excerpt:     "Ownership, stack, speed, editing, aftercare, team, and true cost: the seven questions that expose whether a web development agency deserves your project.",
    publishedAt: "2026-06-15T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["web-development"],
    pillar:      "web-development",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "Questions to ask before hiring a web development agency" },
    body,
    faq,
  };

  console.log("Creating insight-blog-16...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 17: AI ROI in Indian Manufacturing (STUB - no MD file)
// ============================================================
async function createBlog17() {
  resetKey("b17");
  const asset = await uploadImage("blog-17-ai-roi-indian-manufacturing.png");

  const body = [
    callout(
      "Key Takeaway",
      "AI ROI in Indian manufacturing does not hide in factory automation. It hides in the commercial and administrative work around the factory: quoting, document handling, quality documentation, sales follow-through, and the knowledge locked inside a few senior people. These are information-heavy processes, performed by scarce people, at high volume, and that is exactly the pattern where AI pays back fastest and most predictably."
    ),
    p("The question mid-market Indian manufacturers ask most often about AI is: where do we start? The right answer is rarely where the demos are. Factory floor robotics and production-line vision systems make compelling presentations. They are also capital-intensive, technically complex, and carry real disruption risk for a plant running at capacity."),
    p("The processes that actually pay back first share a different profile. They are not on the shop floor. They are in the offices around it: the commercial team handling enquiries, the back office processing documents, the quality department generating reports, and the sales team following up, or failing to, on every quote that goes out."),

    h2("The pattern that predicts AI payback"),
    p("Across the manufacturers we have worked with, the applications that generate the clearest, fastest return share three characteristics: high information volume, scarce human expertise as the bottleneck, and a measurable output that the business already cares about."),
    p("Quotation turnaround is the clearest example. In most mid-market plants, every RFQ waits in the queue of one or two senior people who alone can price it. That queue is the most expensive commercial bottleneck the business has, because slow quotes lose winnable orders silently. AI compresses the excavation stages of quoting, reading the requirement, matching it to history, running a feasibility check, so the senior person reviews a prepared case file rather than starting from raw material."),
    p("Document handling runs a close second. RFQs, purchase orders, quality records, compliance certificates: information arrives in many formats, must be read and routed by someone qualified to interpret it, and delays cost real money at every stage. Systems that read incoming documents, extract the relevant details, and route them correctly turn a reactive queue into a same-hour workflow."),

    h2("Where manufacturers consistently overestimate ROI"),
    p("Two categories attract over-investment relative to their actual return in the mid-market context."),
    p("Predictive maintenance is compelling in theory and difficult in practice for plants without clean sensor data, consistent machine connectivity, and a maintenance team ready to act on predictions. The data infrastructure cost frequently exceeds the downtime savings unless the plant is already well-instrumented."),
    p("Demand forecasting improves with AI, but the improvement is most valuable when procurement and production planning are already disciplined enough to act on a more accurate forecast. In organisations where planning is informal, a better forecast does not automatically produce better decisions."),

    h2("The measurement discipline that makes it work"),
    p("The manufacturers who succeed with AI adoption share one practice the ones who fail almost always skip: they measure the baseline before they deploy anything. Median quote turnaround, hours spent on document processing, error rates in quality documentation. Without the before, there is no proof of after, and proof is what funds the next project."),
    p("This measurement-first sequence is the foundation of a proper AI process audit, and it is why the audit should precede the tool, not follow it. The plants that start with a tool and hope to measure ROI later are the ones that end up with a quietly cancelled subscription and a house verdict that AI does not work."),
    p("It does work, in the right places, measured from the right baseline. The article on RFQ-to-quote automation, which this article introduces, is the deepest single example of that principle in practice."),
  ];

  const faq = [
    { _key: k(), question: "Where does AI ROI actually come from in Indian manufacturing?", answer: "Primarily from information-heavy commercial and administrative processes: quotation turnaround, document intake and routing, quality documentation, and sales follow-through. These processes are performed by scarce people at high volume, which is the exact pattern AI pays back against fastest and most predictably." },
    { _key: k(), question: "Should Indian manufacturers start AI adoption on the shop floor?", answer: "Usually not first. Factory automation and predictive maintenance require significant data infrastructure investment and carry real production disruption risk. The faster, cleaner returns are typically in the commercial and administrative offices around the factory, where the bottlenecks are information-handling rather than physical process." },
    { _key: k(), question: "What is the most common AI mistake mid-market manufacturers make?", answer: "Buying a tool without measuring the baseline first. Without documented before-state numbers, there is no proof of return, no way to fund the next project, and no way to distinguish a genuine success from a confident-sounding vendor claim." },
    { _key: k(), question: "How do you measure AI ROI in a manufacturing business?", answer: "Start with the process-specific metric the business already tracks or should track: median quote turnaround, hours spent processing documents, error rate in quality records. Capture the baseline before deployment, then measure the same metric after. The simplicity of that comparison is precisely what makes it persuasive to every stakeholder from the shop floor to the board." },
    { _key: k(), question: "What is an AI process audit for manufacturers?", answer: "A structured assessment that maps the business's information-heavy processes, measures their current performance, identifies where AI would pay back first given actual data readiness and process ownership, and delivers a sequenced roadmap. It costs a fraction of one failed pilot and exists precisely to prevent one." },
  ];

  const doc = {
    _id:         "insight-blog-17",
    _type:       "insight",
    title:       "AI ROI in Indian Manufacturing: Where the Numbers Actually Come From",
    seoTitle:    "AI ROI in Indian Manufacturing: Where the Numbers Come From",
    slug:        { _type: "slug", current: "ai-roi-indian-manufacturing" },
    excerpt:     "AI ROI in Indian manufacturing hides not in factory automation but in quotation queues, document handling, and the knowledge locked in a few senior people. Where to look, and why.",
    publishedAt: "2026-06-17T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["ai-consultation"],
    pillar:      "ai-consultation",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "AI ROI in Indian manufacturing" },
    body,
    faq,
  };

  console.log("Creating insight-blog-17...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 18: RFQ to Quote AI Manufacturing
// ============================================================
async function createBlog18() {
  resetKey("b18");
  const asset = await uploadImage("blog-18-rfq-to-quote-ai-manufacturing.png");

  const body = [
    callout(
      "Key Takeaway",
      "In most mid-market manufacturers, every RFQ waits in the queue of one or two senior people who alone can read the requirement, check it against capability and history, and price it. That queue is the most expensive bottleneck in the commercial operation, because slow quotes lose winnable orders silently. AI now compresses the excavation stages of quoting so the senior person's days of preparation become an hour of judgment. The pricing decision stays human. The waiting disappears."
    ),
    p("Walk into the commercial office of a typical mid-market manufacturer and ask one question: where are this week's RFQs right now?"),
    p("The answer is almost always a queue, and the queue almost always ends at the same desk. One senior person, sometimes two, who alone can look at a customer's requirement and see the whole picture: what is really being asked, whether the plant can make it, what it resembles from the past, and what it should cost. Everything waits for that desk. And while it waits, a competitor whose desk moves faster is answering the same customer."),

    h2("The real cost of the quotation queue"),
    block("normal", [strong("The lost orders you never see."), plain(" Procurement teams increasingly work on shortlists and deadlines. When your quotation arrives on day nine and a competitor's arrived on day two, you frequently were not rejected. You were simply no longer in the conversation. Speed of response is treated by buyers as a proxy for reliability of supply.")], [], null),
    block("normal", [strong("The senior time spent on excavation, not judgment."), plain(" Watch what your estimator actually does with an RFQ: hunting through the document for what is being asked, chasing the customer for missing details, digging through old folders for the similar job from three years ago, checking with production about a particular operation. Most of it is retrieval and reconstruction. The judgment occupies a fraction of the elapsed time.")], [], null),
    block("normal", [strong("The key-person fragility."), plain(" When quoting lives in one head, that head's leave, illness, overload, or eventual retirement is a direct revenue risk. Many manufacturers experience this as mysterious monthly variation in quote output that maps exactly to one person's calendar.")], [], null),
    block("normal", [strong("The compounding follow-up failure."), plain(" Because producing each quote is so expensive, following up on sent quotes gets starved. The queue does not just slow quotes down. It consumes the capacity that should be winning them after they are sent.")], [], null),

    h2("What actually happens between RFQ and quote"),
    block("normal", [strong("Stage one: comprehension."), plain(" Someone reads the RFQ, often a PDF, an email chain, a spec sheet, sometimes drawings with accompanying notes, and works out what is actually being requested. In the wild, this information arrives incomplete, inconsistent, and formatted differently by every customer.")], [], null),
    block("normal", [strong("Stage two: structuring."), plain(" The comprehended requirement gets organised into your internal shape: line items against your product or process categories.")], [], null),
    block("normal", [strong("Stage three: retrieval."), plain(" The estimator searches the company's memory: have we made this or something like it, what did it cost, what went wrong last time, which customer-specific quirks apply?")], [], null),
    block("normal", [strong("Stage four: feasibility."), plain(" Can we actually do this: capability, capacity, material availability, any specification that needs a production conversation before promising anything?")], [], null),
    block("normal", [strong("Stage five: pricing and assembly."), plain(" Costs are built up, margins applied with commercial judgment, and the quotation document is assembled in the expected format.")], [], null),
    p("The honest observation: stages one through four are dominated by reading, searching, matching, and checking. Stage five contains the irreplaceable human decisions. The queue, however, forms in front of all five stages equally, because one person owns them all."),

    h2("What AI does to each stage"),
    p("Modern AI systems, properly implemented around your own data, change the shape of the work like this."),
    block("normal", [strong("Comprehension and structuring become minutes."), plain(" The system reads the incoming RFQ in whatever form it arrived, extracts what is being requested, and structures it against your categories, flagging explicitly what is missing or ambiguous, so the clarifying email to the customer goes out on day one rather than emerging on day four.")], [], null),
    block("normal", [strong("Retrieval becomes instant and complete."), plain(" Matched against your quotation and job history, the system surfaces the genuinely similar past work: what was quoted, what it actually cost, margins achieved, issues recorded. This is the stage where the gain is largest, because human retrieval is limited by memory and patience, while the system checks everything.")], [], null),
    block("normal", [strong("Feasibility gets a first pass."), plain(" Requirements are checked against your documented capabilities and known constraints, with anything unusual flagged for a production conversation, so the human review starts from a marked-up document rather than a blank one.")], [], null),
    block("normal", [strong("Assembly becomes a draft awaiting judgment."), plain(" The system prepares the quotation skeleton: structured line items, retrieved cost references, flagged risks. What lands on the senior person's desk is no longer an RFQ requiring days of excavation. It is a prepared case file requiring an hour of the thing they are actually irreplaceable for: judgment about feasibility edge cases, pricing, and commercial strategy.")], [], null),
    p("And what AI should not do: price autonomously and send. The pricing decision encodes relationship knowledge, market feel, and strategic intent that belongs with your commercial leadership. The design principle throughout is preparation by machine, decision by human."),

    h2("Implementing without breaking what works"),
    block("normal", [strong("Start by capturing the baseline."), plain(" Median turnaround, the over-a-week share, quotes produced per month, win rates where you can get them. Without the before, there is no proof of after.")], [], null),
    block("normal", [strong("Feed the system your history before expecting magic."), plain(" Retrieval is only as good as what can be retrieved. The unglamorous first phase is assembling your past quotations, job records, and costing data into a form the system can search.")], [], null),
    block("normal", [strong("Run parallel before running live."), plain(" For the first period, the system prepares while the existing process continues, and the estimator compares. This builds calibrated trust in what the system gets right, and documented knowledge of where it needs correction.")], [], null),
    block("normal", [strong("Keep the senior person at the centre, promoted rather than replaced."), plain(" The estimator's new role is reviewer, corrector, and final judge, with their scarce expertise now applied to every quote rather than rationed by the queue.")], [], null),

    h2("The measurement that makes it undeniable"),
    p("The elegant property of this application is that its success metric already exists and is already understood by everyone from the owner to the sales team: how long does a quote take, and how many go out?"),
    p("Track four numbers from baseline through implementation: median RFQ-to-quote time, share of RFQs answered inside the customer-relevant window, quotations produced per month with unchanged headcount, and, over a longer horizon, win rate on quotes delivered fast versus slow. When the median falls from days to hours, no one in the boardroom asks whether the AI initiative is working."),
    p("The queue in front of your estimator's desk has been treated as a fact of manufacturing life for so long that it has become invisible. It is not a fact of life. It is the most expensive line in your commercial operation that never appears in any account, and it is now, finally, fixable."),
  ];

  const faq = [
    { _key: k(), question: "How does AI speed up the RFQ to quote process?", answer: "By compressing the excavation stages: reading the incoming requirement in whatever format it arrives, structuring what is asked and flagging gaps, retrieving genuinely similar past jobs with their costs and outcomes, running a first feasibility check against documented capabilities, and assembling a draft quotation. The senior estimator then applies judgment and pricing to a prepared case file instead of spending days building one." },
    { _key: k(), question: "Should AI price quotations automatically?", answer: "No. Pricing encodes relationship knowledge, market feel, and commercial strategy that belongs with human leadership, and autonomous quoting will eventually make an expensive promise on the company's behalf. The sound design principle is preparation by machine, decision by human, with every quotation reviewed and signed off before it leaves." },
    { _key: k(), question: "Why do slow quotations lose orders?", answer: "Because procurement teams work on shortlists and deadlines, and a quote arriving on day nine after a competitor's day-two response is often simply out of the conversation, with no rejection ever communicated. Buyers also read response speed as a proxy for supply reliability, so the late quote loses twice." },
    { _key: k(), question: "What data does an AI quotation system need?", answer: "The company's own history: past quotations, job records, and costing data, assembled into searchable form, plus documented capabilities and constraints for feasibility checks. Plants with even moderately organised records are closer to ready than they assume." },
    { _key: k(), question: "How do you measure ROI on AI-assisted quoting?", answer: "Against a baseline captured before implementation: median RFQ-to-quote time, share of RFQs answered within the customer-relevant window, quotations produced per month at unchanged headcount, and win rate on fast versus slow quotes. The metric is already understood across the business, which makes success visible and fundable." },
  ];

  const doc = {
    _id:         "insight-blog-18",
    _type:       "insight",
    title:       "RFQ to Quote in Minutes, Not Days: How AI Is Changing Manufacturing Sales",
    seoTitle:    "RFQ to Quote in Minutes: How AI Is Changing Manufacturing Sales",
    slug:        { _type: "slug", current: "rfq-to-quote-ai-manufacturing-sales" },
    excerpt:     "The quotation queue is the most expensive bottleneck in manufacturing sales. How AI turns days of RFQ excavation into an hour of senior judgment, step by step.",
    publishedAt: "2026-06-22T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["ai-consultation"],
    pillar:      "ai-consultation",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "RFQ to quote in minutes with AI" },
    body,
    faq,
  };

  console.log("Creating insight-blog-18...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 19: AI Readiness Audit for Manufacturers
// ============================================================
async function createBlog19() {
  resetKey("b19");
  const asset = await uploadImage("blog-19-ai-readiness-audit-manufacturers.png");

  const body = [
    callout(
      "Key Takeaway",
      "An AI readiness audit answers the two questions every leadership team should settle before spending a rupee on AI tools: where in this specific company would AI pay back first, and is the company actually ready, in data, process ownership, and people, to capture that payback? It delivers a measured process baseline, a ranked list of AI candidates scored on value and feasibility, an honest readiness gap list, and a sequenced roadmap. It costs a fraction of one failed pilot, which is exactly the disaster it exists to prevent."
    ),
    p("There is a question mid-market manufacturers almost never ask before buying AI, and it is the only question that predicts whether the purchase will work: ready for what, exactly?"),
    p("Readiness sounds like an abstraction until you watch its absence in action. A company buys a capable tool, discovers its data is scattered across folders and one veteran's memory, finds no one owns the process the tool was meant to improve, and quietly shelves the subscription eight months later. The tool was fine. The company was not ready, and nobody had checked. An AI readiness audit is the check."),

    h2("What an audit actually examines"),
    p("A serious audit works through four layers, in order, because each layer's findings shape the next."),
    block("normal", [strong("Layer one: the process map with numbers attached."), plain(" The audit begins where our article on manufacturing AI ROI argued everything should begin: with the work, not the technology. The information-heavy processes of the business get mapped and, critically, measured. Turnaround times, hours consumed, error rates, volumes, and the honest answer to who is the one person this process cannot run without. Most leadership teams are seeing these numbers for the first time, and the baseline alone frequently justifies the audit, because you cannot improve, or even prioritise, what you have never measured.")], [], null),
    block("normal", [strong("Layer two: the data reality check."), plain(" Every AI application runs on the company's own information, so the audit asks, per candidate process: does the data this would need actually exist, where does it live, what state is it in, and what would organising it cost? A readiness gap discovered during implementation costs five times what it costs when discovered on paper.")], [], null),
    block("normal", [strong("Layer three: ownership and people."), plain(" Tools do not adopt themselves. For each candidate, the audit identifies whether there is a natural owner with the authority and motivation to run the change, how the affected people are likely to receive it, and what the review-and-correction workload looks like in the parallel-running phase. It also surfaces the quiet blocker in many plants: the key person whose cooperation the project needs and whose job the project appears, wrongly or rightly, to threaten.")], [], null),
    block("normal", [strong("Layer four: the ranked roadmap."), plain(" Every candidate process gets scored on two axes, payback value from the measured baseline, and feasibility from the data and ownership findings, and ranked. The roadmap then sequences them deliberately: an opening project chosen for clean measurement and cheap disruption, typically administrative rather than production-critical, followed by the heavier projects the first one's verified return will fund.")], [], null),

    h2("What a good audit deliverable looks like"),
    p("Commission an audit and you should receive four things in writing, and you should refuse to accept fog on any of them."),
    p("A process baseline document with actual numbers, which becomes the before against which every future AI claim in your company is tested. A scored and ranked candidate list, with the scoring visible, so leadership can argue with the reasoning rather than receive a verdict. A readiness gap list stating plainly what must be organised, assigned, or cleaned before each project, with effort estimates. And a sequenced roadmap with an explicitly recommended first project and the measurement plan that will prove or disprove it."),
    p("Notice what is absent from that list: a product recommendation. A readiness audit that concludes with and therefore you need our platform was a sales process wearing a clipboard."),

    h2("Who needs one, and who does not"),
    block("normal", [strong("The audit earns its fee when"), plain(" the company runs real process volume, when leadership senses AI matters but cannot rank where to start, when one or two previous tool purchases have quietly failed, or when the company is about to spend serious money on an AI initiative and wants the decision de-risked first. Mid-market manufacturers sit squarely in this zone: enough volume for real returns, short enough decision chains to act on findings this quarter.")], [], null),
    block("normal", [strong("The audit is premature when"), plain(" the business is too small for process volume to matter, when a single obvious and well-understood pain point already dominates everything else, or when leadership wants a document to file rather than a plan to execute.")], [], null),

    h2("The economics of checking first"),
    p("A failed AI pilot costs the subscription, the integration effort, the months of organisational attention, and, most expensively, the credibility of the next attempt, since we tried AI and it did not work becomes the house verdict for years. An audit costs a fraction of that, and its entire function is to spend that fraction finding out, on paper, what the pilot would have found out in production."),
    p("And there is a quieter benefit that outlasts any single project. The audit process itself, measuring the processes, naming the owners, confronting the data reality, is the first act of becoming the kind of company that adopts technology deliberately rather than fashionably. Manufacturers who have been through it make better decisions about every subsequent tool, because they have acquired the habit the audit encodes: baseline first, tool second, proof always."),
  ];

  const faq = [
    { _key: k(), question: "What is an AI readiness audit?", answer: "A structured assessment that establishes where AI would pay back first in a specific company and whether the company can capture that payback. It maps and measures information-heavy processes, checks the data reality behind each AI candidate, identifies process owners and people risks, and delivers a ranked, sequenced roadmap with an explicit first project." },
    { _key: k(), question: "What does an AI readiness audit deliver?", answer: "Four written outputs: a measured process baseline, a scored and ranked list of AI candidate processes with visible reasoning, an honest readiness gap list with effort estimates, and a sequenced roadmap with a recommended opening project and its measurement plan. A product recommendation is deliberately not on the list." },
    { _key: k(), question: "Why should manufacturers audit before buying AI tools?", answer: "Because most failed AI purchases fail on readiness, not on the tool: scattered data, unowned processes, and unprepared people. A readiness gap discovered on paper costs a fraction of one discovered mid-implementation, and a failed pilot additionally poisons organisational appetite for years." },
    { _key: k(), question: "How long does an AI readiness audit take?", answer: "Long enough to measure honestly and short enough to act on: typically weeks, not months, depending on the number of processes in scope and the state of existing records. A good audit is scoped so its roadmap can be funded and started in the same quarter." },
    { _key: k(), question: "Should the audit provider also implement the recommendations?", answer: "They can, but the audit's conclusions must be independent of anything the auditor sells, and the deliverable should stand on its own so implementation can be competed. An audit that reliably concludes in favour of the auditor's own platform is a sales document, whatever it is titled." },
  ];

  const doc = {
    _id:         "insight-blog-19",
    _type:       "insight",
    title:       "The AI Readiness Audit: What It Is and Why Mid-Market Manufacturers Need One",
    seoTitle:    "The AI Readiness Audit: Why Mid-Market Manufacturers Need One",
    slug:        { _type: "slug", current: "ai-readiness-audit-manufacturers" },
    excerpt:     "Before any AI tool, one question: is this company ready, and where would AI pay back first? What an AI readiness audit examines, what it delivers, and who needs one.",
    publishedAt: "2026-06-25T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["ai-consultation"],
    pillar:      "ai-consultation",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "The AI readiness audit for manufacturers" },
    body,
    faq,
  };

  console.log("Creating insight-blog-19...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 20: Professional Services AI Adoption
// ============================================================
async function createBlog20() {
  resetKey("b20");
  const asset = await uploadImage("blog-20-professional-services-ai-adoption.png");

  const body = [
    callout(
      "Key Takeaway",
      "Professional services firms, chartered accountancy practices, law firms, consultancies, architecture and engineering practices, and agencies, run almost entirely on the work AI compresses best: reading documents, drafting documents, and applying accumulated expertise to client situations. The firms that win the transition will use the compression to deepen judgment and advisory value, not to hollow out the training ground their future partners learn on. The adoption playbook is the same one manufacturing is learning: audit the work first, tools second, proof always."
    ),
    p("Ask a partner in a mid-sized professional services firm what their people actually do all day, and the honest inventory is striking: they read documents, they produce documents, and they apply the firm's accumulated expertise to the situation in front of them. Compliance filings, contracts, due diligence, audit working papers, drawings and reports, proposals and deliverables."),
    p("Now notice what the current generation of AI is unambiguously best at: reading documents, drafting documents, and retrieving relevant precedent from a body of accumulated knowledge. The overlap is not partial. It is nearly total, and that is why professional services is not a future AI market. It is the next wave, arriving now."),

    h2("Why this wave, and why now"),
    block("normal", [strong("The work matches the technology."), plain(" In our manufacturing ROI article we described the pattern that predicts AI payback: high-volume judgment work on information, performed by scarce people. Manufacturing has that pattern in its offices, around the shop floor. Professional services firms are that pattern, wall to wall.")], [], null),
    block("normal", [strong("The economics are being questioned from the client side."), plain(" Sophisticated clients increasingly know what AI can do, because they are adopting it themselves. When a first-draft contract, a routine filing, or a standard research memo is visibly compressible from days to hours, clients begin asking why it still bills like days. Firms that adopt early get to redesign their pricing on their own terms; firms that resist will have it redesigned for them by the first serious competitor who moves.")], [], null),
    block("normal", [strong("The leverage model is cracking anyway."), plain(" The classic pyramid, many juniors doing volume work under few seniors, already strains against hiring costs and attrition. AI does not merely pressure that model; it offers an alternative one: a smaller number of stronger people supported by machine leverage.")], [], null),

    h2("Where the returns concentrate"),
    block("normal", [strong("Document intake and review."), plain(" The first read of whatever the client sends: contracts, financials, notices, records, briefs. AI performs the extraction and first-pass flagging, so qualified people start from a marked-up analysis rather than a blank pile. This is the professional services twin of the RFQ comprehension work we described in manufacturing quoting.")], [], null),
    block("normal", [strong("Drafting from precedent."), plain(" Most professional documents are not written; they are assembled, from the firm's own past work, adapted to the current facts. AI systems built on the firm's precedent library produce first drafts in the firm's own voice and standards, with the professional reviewing, correcting, and owning the result.")], [], null),
    block("normal", [strong("The knowledge of the senior few."), plain(" Every firm has its version of the plant veteran: the partner who remembers how the 2018 matter was handled, the senior who knows this regulator's preferences. That knowledge, captured and made retrievable, is transformed from a queue outside one office into a resource every engagement can question.")], [], null),
    block("normal", [strong("Compliance and quality workflows."), plain(" Deadline tracking across hundreds of client obligations, cross-checking deliverables against checklists and standards, assembling routine filings for review. The least glamorous layer and often the fastest payback.")], [], null),
    block("normal", [strong("The firm's own business development."), plain(" Professional firms are famously excellent at client work and famously poor at their own follow-through: proposals unfollowed, dormant clients uncontacted, expertise unpublished. The same AI-supported operations that fix a manufacturer's sales gap fix this one.")], [], null),

    h2("The two traps specific to this industry"),
    block("normal", [strong("The confidentiality trap."), plain(" Client information is the firm's most sacred obligation, and AI adoption done carelessly is already happening in firms that believe they have not adopted AI at all. The answer is not prohibition, which merely keeps the practice invisible; it is governed adoption: firm-controlled systems, clear data boundaries, confidentiality preserved by architecture rather than by memo.")], [], null),
    block("normal", [strong("The apprenticeship trap."), plain(" The volume work AI compresses is also the work juniors learn on. A firm that simply deletes that work has quietly deleted its own training ground, and will discover the cost in five years when its mid-level bench is hollow. The firms handling this well are redesigning development deliberately: juniors work with the AI's output, reviewing, correcting, and learning why the correction was needed, which done properly teaches judgment earlier than the old grind ever did.")], [], null),

    h2("The playbook is the one you have already read"),
    p("The adoption discipline for a professional services firm is the same one we laid out for manufacturers, because the failure modes are identical. Audit before tools: map the firm's work by hours and value, measure the baselines, turnaround on standard matters, hours by work type, dependence on specific seniors, and rank candidates by payback and readiness. Choose an opening project that is internal, measurable, and cheap to disrupt. Run parallel, build calibrated trust, keep the professional's judgment and signature at the centre. And measure against the baseline."),
    p("The firms that move first will not merely be more efficient. They will spend more of their expensive hours on the work clients actually value, judgment, strategy, and counsel, and they will be the names the market, and its answer engines, learn to associate with the future of their profession. The wave is arriving either way. The only decision is whether to be carried or to steer."),
  ];

  const faq = [
    { _key: k(), question: "Why are professional services firms well suited to AI adoption?", answer: "Because their core work, reading documents, drafting documents, and applying accumulated expertise to client situations, is precisely what current AI compresses best. The high-payback pattern found in manufacturing offices, high-volume judgment work on information done by scarce people, describes a professional services firm wall to wall." },
    { _key: k(), question: "Where should a professional services firm start with AI?", answer: "With an audit of its own work, not a tool: measure hours and turnaround by work type, identify dependence on specific seniors, and rank candidate processes by payback and readiness. The opening project should be internal, measurable, and cheap to disrupt, such as document intake or compliance workflow, with client-facing work following once trust is calibrated." },
    { _key: k(), question: "How should firms handle client confidentiality with AI?", answer: "Through governed adoption rather than prohibition: firm-controlled systems with clear data boundaries, so confidentiality is preserved by architecture. Prohibition merely drives staff toward invisible use of consumer tools, which is the highest-risk outcome available." },
    { _key: k(), question: "Will AI remove the training ground for junior professionals?", answer: "Only in firms that let it happen by accident. The volume work AI compresses is the traditional apprenticeship, so development must be redesigned deliberately: juniors reviewing and correcting AI output, learning why corrections are needed, which can teach judgment earlier than the old grind. The people transition deserves the same planning as the technology one." },
    { _key: k(), question: "How does AI change professional services pricing?", answer: "Clients increasingly know which work is AI-compressible and will question hourly assumptions built on pre-AI effort. Firms that adopt early can redesign pricing on their own terms, shifting fees toward judgment and outcomes; firms that resist will have pricing redesigned for them by the first capable competitor who moves." },
  ];

  const doc = {
    _id:         "insight-blog-20",
    _type:       "insight",
    title:       "Why Professional Services Firms Are the Next Wave of Serious AI Adopters",
    seoTitle:    "Why Professional Services Firms Are the Next Serious AI Adopters",
    slug:        { _type: "slug", current: "professional-services-ai-adoption" },
    excerpt:     "CA firms, law practices, consultancies, and agencies run on exactly the work AI compresses best. Why professional services is the next adoption wave, and how to join it without gutting quality.",
    publishedAt: "2026-06-28T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["ai-consultation"],
    pillar:      "ai-consultation",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "Professional services firms and AI adoption" },
    body,
    faq,
  };

  console.log("Creating insight-blog-20...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 21: AI Consultant vs AI Vendor
// ============================================================
async function createBlog21() {
  resetKey("b21");
  const asset = await uploadImage("blog-21-ai-consultant-vs-vendor.png");

  const body = [
    callout(
      "Key Takeaway",
      "A vendor's job is to sell you their product. A consultant's job is to diagnose your situation and recommend whatever serves it, including products the consultant does not sell and, sometimes, no product at all. Both roles are legitimate, but they are different jobs with different incentives, and most wasted AI spend traces to one confusion: taking a vendor's assessment as if it were a consultant's diagnosis. The test is one question: can this person's advice ever cost them money? If the answer is no, you are in a sales process, however consultative it feels."
    ),
    p("Here is a scene playing out in mid-market boardrooms across India this quarter. A company knows AI matters and does not know where to start. A firm arrives offering a free or cheap AI assessment. The assessment is professional, the workshop is genuinely useful, and its conclusion is that the company's highest-priority opportunity happens to be solved by the assessing firm's platform."),
    p("Nobody lied. The demo was real, the platform may even be good. But something important got smuggled past the buyer: a sales process was consumed as if it were a diagnosis, and the company is now evaluating one product instead of understanding its own situation."),

    h2("Two legitimate jobs, one dangerous confusion"),
    block("normal", [strong("A vendor"), plain(" builds and sells a product. Good vendors are deep experts in their product's domain, their demos are informative, and when your problem matches their product, buying from them is exactly right. A vendor's advice is not dishonest; it is scoped. Ask a vendor how to solve your problem and you will receive the truthful answer to a slightly different question: how their product would address it.")], [], null),
    block("normal", [strong("A consultant,"), plain(" properly defined, sells diagnosis and judgment. Their deliverable is an understanding of your situation, your processes measured, your options ranked, your readiness gaps named, and a recommendation that is allowed to land anywhere: on a vendor's product, on a different vendor's product, on an internal fix, or on not yet. The defining property is not superior intelligence. It is that the recommendation is structurally free to disappoint the person making it.")], [], null),
    p("The confusion arises because vendors have learned to package sales processes in consulting language: assessments, audits, roadmaps, workshops. The vocabulary is identical. The incentives are not."),

    h2("Why AI makes this distinction expensive"),
    block("normal", [strong("The buyer usually cannot check the work."), plain(" A manufacturer can evaluate a machine against decades of domain knowledge. Most leadership teams evaluating AI have no equivalent instincts yet, which means the assessor's framing goes unchallenged. Whoever defines the problem has effectively chosen the solution.")], [], null),
    block("normal", [strong("The field is moving too fast for locked bets."), plain(" Capabilities shift quarterly, and pricing with them. Advice that locks you into one vendor's roadmap carries a currency risk that independent advice, re-evaluated per project, does not.")], [], null),
    block("normal", [strong("The real work is rarely the tool."), plain(" As we have argued across this series, AI payback lives in measured processes, organised data, named owners, and disciplined adoption. A vendor's assessment systematically underweights all of that, not from malice but from scope: their product is the deliverable, so the surrounding organisational work becomes a footnote called implementation, which is precisely where unready companies then fail.")], [], null),

    h2("The tells: how to know which one you are talking to"),
    block("normal", [strong("Follow the money to its destination."), plain(" Ask directly: how do you earn, and does any of it depend on which tools I end up buying? An honest answer to this question, whatever it contains, is itself a good sign.")], [], null),
    block("normal", [strong("Ask what they recommended against, recently."), plain(" A real consultant has a story of advising a client not to buy, not to build, or to wait, told with specifics.")], [], null),
    block("normal", [strong("Watch where the first meeting goes."), plain(" A vendor's first meeting moves toward the demo. A consultant's first meeting moves toward your processes. If you have seen a product screen before anyone has asked what your quote turnaround time is, you know which meeting you are in.")], [], null),
    block("normal", [strong("Check whether the deliverable survives without them."), plain(" A diagnosis you have paid for should be a document you own: baselines, ranked options, gaps, a roadmap you could execute with anyone. If the assessment's findings are inseparable from the assessor's platform, you did not buy a diagnosis.")], [], null),
    block("normal", [strong("Notice whether no is on the menu."), plain(" Ask what would make them tell you not to proceed with AI in a given process. A consultant answers immediately, because half their value is preventing bad projects.")], [], null),

    h2("Using both, in the right order"),
    p("The conclusion is not never talk to vendors. It is sequence and role clarity. Diagnosis first, independent of any sale: your processes measured, your candidates ranked, your readiness gaps priced. Then vendors, evaluated against a problem you now own the definition of. Then implementation with whoever earns it, measured against the baseline the diagnosis established."),
    p("In that sequence, vendors become more useful, not less: you ask them sharper questions, compare them on your criteria, and negotiate from an understanding they did not author."),

    h2("Our own position, stated plainly"),
    p("Fairness requires that we apply the test to ourselves, in public. MagicWorks sells AI Process Audits: diagnosis, ranked candidates, readiness gaps, and a roadmap. We do not sell an AI platform, and our audit conclusions are deliberately structured to survive without us, so implementation can be competed. That boundary costs us revenue with some regularity. It is also the entire reason the advice is worth paying for."),
    p("Ask everyone who advises you on AI the one-question version of this article: can your advice ever cost you money? Then watch the answer, not the brochure."),
  ];

  const faq = [
    { _key: k(), question: "What is the difference between an AI consultant and an AI vendor?", answer: "A vendor sells a product, and their advice, however professional, is scoped to that product. A consultant sells diagnosis and judgment: your processes measured, options ranked across the market, and a recommendation structurally free to land on any tool, an internal fix, or no project at all. Both are legitimate; confusing one for the other is where budgets go to die." },
    { _key: k(), question: "Are free AI assessments from vendors worth taking?", answer: "They can be informative, provided you consume them as sales processes rather than diagnoses. The assessment's framing will be shaped like the vendor's product, so treat its conclusions as one input, never as the problem definition you procure against." },
    { _key: k(), question: "How do I test whether an AI advisor is independent?", answer: "Ask how they earn and whether any revenue depends on which tools you buy, ask for a recent example where they recommended against a purchase, and check whether their deliverable would survive without them: baselines, ranked options, and a roadmap you could execute with anyone." },
    { _key: k(), question: "Should the same firm do the AI audit and the implementation?", answer: "It can work when the audit's conclusions are independent and documented well enough to be competed, so the auditor wins implementation on merit rather than by capture. What should raise alarm is an assessment that reliably concludes in favour of the assessor's own platform." },
    { _key: k(), question: "What should I do before talking to AI vendors?", answer: "Own your problem definition first: an independent diagnosis with measured process baselines, ranked candidate use cases, and priced readiness gaps. Vendors evaluated against requirements you defined are far more useful, and far easier to compare and negotiate with, than vendors who authored the requirements themselves." },
  ];

  const doc = {
    _id:         "insight-blog-21",
    _type:       "insight",
    title:       "AI Consultant vs AI Vendor: Know the Difference Before You Spend a Rupee",
    seoTitle:    "AI Consultant vs AI Vendor: Know the Difference First",
    slug:        { _type: "slug", current: "ai-consultant-vs-ai-vendor" },
    excerpt:     "One sells you a diagnosis, the other sells you a product, and the difference decides whether your AI budget buys results. How to tell them apart before you spend.",
    publishedAt: "2026-06-30T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["ai-consultation"],
    pillar:      "ai-consultation",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "AI consultant vs AI vendor" },
    body,
    faq,
  };

  console.log("Creating insight-blog-21...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 22: Platform Founder Outside Counsel
// ============================================================
async function createBlog22() {
  resetKey("b22");
  const asset = await uploadImage("blog-22-platform-founder-outside-counsel.png");

  const body = [
    callout(
      "Key Takeaway",
      "The founder of a platform business knows it better than anyone alive, and that is precisely the problem at certain decisions. Deep context comes bundled with sunk commitments, survivorship stories, and a roadmap full of choices the founder is emotionally invested in defending. Outside counsel earns its fee at five specific inflection points: when growth stalls despite effort, before major technology or rebuild bets, at monetisation redesign, ahead of fundraising scrutiny, and when the roadmap has become a queue of loud requests rather than a strategy."
    ),
    p("Every platform founder carries a private map: why the onboarding flow works the way it does, which early decision saved the company, which feature exists because the biggest customer demanded it, where the bodies of abandoned experiments are buried. No consultant will ever hold that map. This is the honest argument against outside advice, and founders are right to make it."),
    p("And yet the same map is the trap. The founder's knowledge of the platform is inseparable from their investment in it: the architecture they chose, the pricing they defended, the pivot they resisted. At most moments, that intimacy is an advantage. At a handful of specific moments, it is the exact thing standing between the founder and the decision the business needs."),

    h2("Why the smartest founders have the hardest time seeing it"),
    block("normal", [strong("Sunk decisions defend themselves."), plain(" The stack, the marketplace mechanics, the commission structure: each was chosen for good reasons at the time, and each has since accumulated advocates, workarounds, and identity. Evaluating them freshly requires pretending you did not spend two years defending them, which is not a thing human beings do well.")], [], null),
    block("normal", [strong("The loudest signal wins the roadmap."), plain(" Founders hear disproportionately from three sources: the biggest customers, the most recent churn, and the board. All three are real, none is representative, and a roadmap assembled from their requests will drift from strategy to appeasement one reasonable-sounding feature at a time.")], [], null),
    block("normal", [strong("Survivorship stories calcify."), plain(" Whatever worked during the platform's survival phase becomes the house theory of how growth happens, long after the market, the competition, and the platform itself have changed. The theory is defended hardest exactly when it stops working, because questioning it feels like questioning the founding.")], [], null),

    h2("The five inflection points where outside counsel pays"),
    block("normal", [strong("1. Growth has stalled and the internal explanations have stopped changing."), plain(" Every stall produces a house diagnosis, usually we need more marketing or we need feature X. When two or three quarters of acting on the diagnosis have not moved the line, the diagnosis itself is the suspect, and an internal team cannot easily indict the theory its own leadership authored.")], [], null),
    block("normal", [strong("2. Before a major technology bet."), plain(" The rebuild, the re-platform, the version 2 that will consume a year of engineering. These decisions are where sunk-cost gravity is strongest in both directions. An independent review of the actual constraint is cheap insurance against the single most expensive category of platform mistake.")], [], null),
    block("normal", [strong("3. When monetisation needs redesign, not tuning."), plain(" Commission levels can be tuned internally. But when the question is structural, listings versus subscriptions versus transactions versus services, outside counsel brings the pattern library of what has worked across comparable platforms, and, more valuably, no stake in which answer wins.")], [], null),
    block("normal", [strong("4. Ahead of serious external scrutiny."), plain(" A fundraise, a strategic partnership, an acquisition conversation. Sophisticated counterparties will audit your roadmap, your metrics, and your strategy with cold eyes; meeting that audit for the first time in the data room is the expensive way to do it.")], [], null),
    block("normal", [strong("5. When the roadmap has become a queue."), plain(" Open your roadmap and ask of each item: is this here because of strategy, or because someone asked loudly? When the honest answer is mostly the latter, the platform is being steered by its inbox.")], [], null),

    h2("What to buy, and what never to hand over"),
    p("What outside counsel should deliver is diagnosis and evaluation: your platform's position, economics, and roadmap examined against evidence; options ranked with visible reasoning; technology and vendor choices assessed independently. The deliverable should survive without its author."),
    p("What outside counsel should never become is the hands on the wheel. The moment the advisor starts executing, their independence dies, because every subsequent recommendation is shaped by what they would then get to build. We hold this boundary formally in our own platform advisory work: consultation and vendor evaluation only, never execution of what we evaluated. It regularly costs us follow-on revenue, and it is the entire reason the counsel is worth paying for."),
    p("Your map of the platform is irreplaceable, and it has blind spots exactly where your investment is deepest. The founders who scale past those spots are not the ones who never take advice or the ones who outsource their judgment. They are the ones who know the five moments to rent an unowned pair of eyes, and who buy sight, never steering."),
  ];

  const faq = [
    { _key: k(), question: "When should a platform founder hire outside counsel?", answer: "At five inflection points: when growth has stalled and internal explanations have stopped changing, before major technology or rebuild bets, when monetisation needs structural redesign rather than tuning, ahead of fundraising or acquisition scrutiny, and when the roadmap has become a queue of loud requests rather than a strategy." },
    { _key: k(), question: "Why can't internal teams audit their own platform strategy?", answer: "Because the people best placed to evaluate the strategy are usually its authors. Sunk decisions defend themselves, the loudest customers dominate the signal, and the theories that worked during survival calcify past their usefulness. Independence is not superior intelligence; it is the absence of authorship in the story being tested." },
    { _key: k(), question: "What should a platform roadmap audit deliver?", answer: "A diagnosis that survives without its author: the platform's position and economics examined against evidence, roadmap options ranked with visible reasoning, and technology or vendor choices evaluated independently. The founder's team executes; the audit provides sight, not steering." },
    { _key: k(), question: "Should a platform consultant also implement their recommendations?", answer: "No, and this boundary is the source of the advice's value. An advisor who executes what they recommended has an interest in recommending what they would get to build, which is the same conflict a founder would never permit inside their own marketplace design." },
    { _key: k(), question: "How is outside counsel different from adding an advisor to the board?", answer: "Board advisors provide ongoing judgment but accumulate their own investment in past decisions over time. Point-in-time outside counsel is bought precisely for its lack of accumulated stake: a fresh, evidence-led examination at a specific inflection, delivered as a document the company owns." },
  ];

  const doc = {
    _id:         "insight-blog-22",
    _type:       "insight",
    title:       "The Platform Founder's Dilemma: When to Bring in Outside Counsel",
    seoTitle:    "The Platform Founder's Dilemma: When to Bring in Outside Counsel",
    slug:        { _type: "slug", current: "platform-founder-outside-counsel" },
    excerpt:     "Nobody knows your platform like you, which is exactly the problem at certain decisions. The five inflection points where outside counsel pays, and what good counsel looks like.",
    publishedAt: "2026-07-01T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["platform-consultation"],
    pillar:      "platform-consultation",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "The platform founder's dilemma: when to bring in outside counsel" },
    body,
    faq,
  };

  console.log("Creating insight-blog-22...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 23: Edtech Platform Scaling Playbook
// ============================================================
async function createBlog23() {
  resetKey("b23");
  const asset = await uploadImage("blog-23-edtech-platform-scaling-playbook.png");

  const body = [
    callout(
      "Key Takeaway",
      "Most Indian education platforms are built as directories and plateau as directories: real traffic, thin revenue, and a business model that amounts to selling the same enquiry to several institutions. The way out is a value ladder with four rungs: listings that inform, comparison that genuinely decides, guidance that students trust, and outcomes the platform can stand behind. Each rung upgrades the monetisation the previous one could not support. The platforms that climb share three disciplines: they treat trust as the product, they keep supply and demand honest with each other, and they make roadmap decisions by strategy rather than by their loudest paying institution."
    ),
    p("There is a standard biography for Indian edtech marketplaces, and its first chapters are genuinely impressive. A founder spots the chaos of education discovery, builds a clean directory of institutions and programmes, wins search traffic because the content answers real questions, and starts selling leads to institutions. Traffic grows. Revenue appears."),
    p("Then the story stalls. Traffic keeps growing, but revenue per visitor stays flat, institutions grumble about lead quality, students treat the platform as one tab among five, and the roadmap fills with feature requests from whichever institution pays most. The platform has plateaued as a directory, and directories, however large, are commodity businesses: their product is an unqualified phone number, and unqualified phone numbers race to the bottom on price."),

    h2("First, understand what a listings business actually sells"),
    p("The directory model has an honest description that founders rarely say aloud: it sells the same student enquiry to multiple institutions, each of which knows it is one of several buyers. Everything wrong with the plateau follows from that sentence."),
    p("Lead prices stay low because the product is non-exclusive and unverified. Institutions churn because conversion from these leads is poor. Students learn the platform's incentives, notice every institution is top ranked, and withhold trust accordingly. And because no participant deeply trusts the platform, no participant will pay it a premium."),

    h2("Rung one: listings that actually inform"),
    p("The foundation rung is where most platforms already are, but few have finished it properly, and the unfinished parts cap everything above."),
    p("Finished means: coverage that is genuinely comprehensive in the chosen segments, data that is verified and dated rather than scraped and stale, fees stated honestly, and structure that machines can read. In 2026 a large share of education discovery flows through search and AI answer engines. Marking programmes, fees, and institutions up with structured data vocabulary and verifying the platform so AI assistants can cite it correctly is not technical housekeeping. For a content platform, citation in AI answers is the new distribution."),
    p("The test for rung one: would a student researching seriously choose your page over the institution's own? If not, finish this rung before dreaming about the others."),

    h2("Rung two: comparison that genuinely decides"),
    p("The second rung is where a directory becomes a tool. Students do not want fifty options; they want the confidence to eliminate forty-seven, and a platform that helps them do it honestly becomes part of the decision rather than a stop on the way to one."),
    p("Genuine comparison means structured, like-for-like data across programmes, fees with total-cost honesty, eligibility clarity, outcomes where they can be verified, and the willingness to show unflattering truths about paying institutions. This is the rung where most platforms flinch, because honest comparison creates friction with the customers who write the cheques. But it is also where the economics turn: a platform trusted to compare produces enquiries with declared intent and context, and a contextual, qualified enquiry is a different product from a phone number."),

    h2("Rung three: guidance students trust"),
    p("The third rung transforms the business, because it changes who the customer is. Listings and comparisons serve the student to sell to the institution. Guidance serves the student, and gets paid by whoever values the student's confidence, sometimes the student themselves."),
    p("Guidance means the platform behaves like a counsellor at platform scale: helping a specific student, with their qualifications, budget, and goals, arrive at a shortlist that is defensibly right for them. Historically this rung was throttled by economics, because human counselling does not scale. That has changed: intelligent systems can now conduct the sorting and matching conversation at platform scale, with human counsellors concentrated on the decisions that need them."),
    p("An honest warning that belongs on this rung: guidance monetised by institutions creates the conflict every student eventually notices. The platforms that survive the rung publish how they earn, keep paid placement visibly separate from advice, and accept the short-term revenue cost of that separation. Trust is the product here; everything else is packaging."),

    h2("Rung four: outcomes you can stand behind"),
    p("The final rung is where few Indian platforms have arrived, and where the category's real prize sits: the platform that can demonstrate, with data, that students who came through it made better decisions, enrolled in programmes that fit, completed them, and reached the outcomes they were promised."),
    p("Standing behind outcomes means closing the loop, enrolment and outcome data flowing back against the guidance that produced it, at platform scale, and being willing to publish the results honestly. It is expensive, slow, and organisationally demanding, and it is also the only rung competitors cannot copy in a quarter."),

    h2("The three disciplines that decide who climbs"),
    block("normal", [strong("Treat trust as the product with a budget."), plain(" Every rung above the first is built from trust: verification, honest comparison, disclosed sponsorship, separated advice. Platforms that treat these as costs to minimise stay on rung one forever.")], [], null),
    block("normal", [strong("Keep supply and demand honest with each other."), plain(" The directory plateau is fed by a quiet dishonesty in both directions: institutions oversold on lead volume, students oversold on institutional quality. Each rung of the ladder is, at bottom, a mechanism for making the two sides more honest with each other.")], [], null),
    block("normal", [strong("Guard the roadmap from the loudest institution."), plain(" The biggest-paying institutions have an interest in keeping the platform on rung one, where their spend buys prominence rather than scrutiny. A roadmap assembled from their requests will faithfully build the directory forever. Climbing requires prioritisation by strategy, periodically audited by someone with no stake in any requester.")], [], null),
    p("The Indian education market is enormous, chaotic, and emotionally consequential, which is why students and families will reward, disproportionately, the platform that finally behaves like it is on their side. The directory era proved the demand. The ladder is how a platform stops selling phone numbers and starts owning the decision."),
  ];

  const faq = [
    { _key: k(), question: "Why do education marketplaces plateau at the listings stage?", answer: "Because the directory model's underlying product is a non-exclusive, unverified enquiry sold to several institutions at once. Lead prices stay low, institutions churn on poor conversion, and students withhold trust from a platform where every institution is top ranked. More traffic amplifies the model's revenue ceiling rather than breaking it." },
    { _key: k(), question: "How should an edtech platform improve lead quality?", answer: "By climbing from listings to genuine comparison and guidance: structured like-for-like data, honest fees, and matching that establishes a student's intent, fit, and context before an institution ever receives the enquiry. A qualified, contextual enquiry is a different product from a phone number and commands a different price." },
    { _key: k(), question: "What are the main revenue models for education platforms?", answer: "They upgrade rung by rung: commodity lead sales at the listings stage; qualified-lead tiers, labelled sponsored placement, and institution subscriptions at the comparison stage; student-side premium services and B2B2C partnerships at the guidance stage; and success-linked pricing at the outcomes stage. Each model requires the trust the previous rung built." },
    { _key: k(), question: "How does AI change education platform strategy?", answer: "In two directions. Inside the platform, intelligent matching and counselling systems make student guidance economically scalable for the first time. Outside it, education discovery increasingly flows through AI answer engines, so structured data and citation visibility have become distribution strategy rather than technical housekeeping." },
    { _key: k(), question: "How do edtech platforms balance institution revenue with student trust?", answer: "By separating advice from advertising structurally: disclosed sponsorship, paid placement visibly distinct from guidance, and published revenue practices. The platforms that monetise guidance covertly through institutions eventually lose the student trust the entire ladder depends on, which is why trust practices deserve product-level investment." },
  ];

  const doc = {
    _id:         "insight-blog-23",
    _type:       "insight",
    title:       "Edtech Platforms in India: The Playbook for Scaling from Listings to Revenue",
    seoTitle:    "Edtech Platforms in India: Scaling from Listings to Revenue",
    slug:        { _type: "slug", current: "edtech-platform-scaling-playbook" },
    excerpt:     "Most Indian edtech platforms plateau as directories: traffic without revenue. The playbook for climbing the value ladder from listings to trusted, monetised guidance.",
    publishedAt: "2026-07-03T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["platform-consultation"],
    pillar:      "platform-consultation",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "Edtech platform scaling playbook" },
    body,
    faq,
  };

  console.log("Creating insight-blog-23...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 24: B2B Sourcing Marketplace Trust
// ============================================================
async function createBlog24() {
  resetKey("b24");
  const asset = await uploadImage("blog-24-b2b-sourcing-marketplace-trust.png");

  const body = [
    callout(
      "Key Takeaway",
      "B2B sourcing marketplaces are built on a promise of connection, and quietly undermined by a double deficit of trust: buyers do not trust unverified supplier claims, and suppliers do not trust the quality of the leads they pay for. The result is the category's open secret, disintermediation: the moment two parties find each other, they take the relationship offline and the platform loses everything after the introduction. Blocking contact does not fix this; it accelerates it. The platforms that win solve trust as an engineered product so that leaving the platform means losing protection, not saving commission."
    ),
    p("Every B2B sourcing marketplace pitch contains the same beautiful arithmetic: thousands of suppliers, thousands of buyers, and a platform in the middle of every transaction. Every operating B2B marketplace contains the same uncomfortable reality: the platform is in the middle of the first transaction, at best, and then watches the relationship walk out the door."),

    h2("The double deficit"),
    block("normal", [strong("Buyers do not trust the supply."), plain(" A procurement engineer searching the platform finds two hundred suppliers, all claiming the same certifications, the same capacities, the same leading manufacturer status, most with self-declared profiles nobody has checked. The buyer's rational response is to treat the platform as a phone book: useful for names, worthless for judgment, and everything important to be verified offline through the channels they already trusted.")], [], null),
    block("normal", [strong("Suppliers do not trust the demand."), plain(" A supplier pays for a membership or for leads and receives enquiries that are unqualified, duplicated across competitors, price-fishing, or fake. Their rational response is to stop investing in the platform: minimal profile effort, slow responses, and a standing suspicion that renewals are paying for noise. Which degrades the buyer experience further, completing the loop.")], [], null),
    p("Notice the structure: each side's rational self-protection makes the platform worse for the other side. This is the trust spiral that also afflicts education marketplaces, but sharper, because B2B transactions are larger, relationships are longer, and the cost of a bad supplier is not a disappointing course but a broken production schedule."),

    h2("Disintermediation is a symptom, not the disease"),
    p("The category's most discussed pathology is the leak: buyer and supplier meet through the platform, then conduct every subsequent transaction directly, leaving the marketplace with an introduction fee at best. Founders try to fix it with the standard toolkit: hiding contact details, blocking phone numbers in chat, contractual anti-circumvention clauses."),
    p("Here is the honest assessment of that toolkit: it fails, and it deserves to. Determined businesses will always find each other, and every barrier the platform erects is friction charged to its best, most serious users. Worse, the blocking strategy reveals the platform's self-image: a toll gate, extracting rent from an introduction. Businesses despise toll gates and will spend real effort routing around them."),
    p("The reframe that changes everything: disintermediation is not users stealing from the platform. It is users telling the platform, accurately, that after the introduction it adds nothing worth paying for. The leak is the invoice for the trust deficit. You do not fix an invoice by hiding the exit. You fix it by becoming worth staying for."),

    h2("What staying-worthy actually looks like"),
    block("normal", [strong("Verification that means something."), plain(" Not a badge for uploading a certificate, but verification with teeth: documents checked against issuing bodies, factory capabilities confirmed, claims audited on a cycle, and honest tiers that state exactly what was and was not checked. Verification that costs the platform something is the only kind buyers believe. Modern AI has changed the economics here meaningfully, document checking and cross-referencing claims against public records can now run at platform scale.")], [], null),
    block("normal", [strong("Reputation tied to transactions, not opinions."), plain(" Open review systems in B2B fill with noise and manipulation. Reviews that count are attached to verified, on-platform transactions: this buyer bought this category from this supplier, and here is what happened to delivery, quality, and dispute. A transaction-verified reputation is an asset a supplier cannot take with them off-platform.")], [], null),
    block("normal", [strong("Protection inside the transaction."), plain(" Escrow or milestone-based payment structures, dispute resolution that is faster and cheaper than the alternative, and documented terms for quality and delivery. The moment the platform carries risk the parties cannot carry alone, the commission stops being a toll and becomes an insurance premium, and insurance premiums are paid willingly.")], [], null),
    block("normal", [strong("Value at every stage, not just discovery."), plain(" RFQ structuring that makes buyer requirements clear enough to quote accurately, logistics and documentation support, financing partnerships, repeat-order tooling. Each one is a reason the second transaction happens on-platform.")], [], null),
    p("The pattern across all four: the winning platforms stopped asking how do we prevent users from leaving and started asking what would make leaving irrational."),

    h2("The founder's roadmap tension"),
    p("Everything above collides with a hard commercial fact: trust mechanics are slow, expensive, and unglamorous, while the directory business, memberships and lead sales, pays today. The suppliers who pay most under the directory model are frequently the ones verification would embarrass, which means the loudest revenue voices are structurally opposed to the exact investments the platform's future depends on."),
    p("The founders who escape the trap sequence deliberately: pick one category and one corridor, build the full trust stack there until the on-platform transaction is demonstrably safer than the alternative, prove the retention and take-rate math in that wedge, and expand from evidence. Depth first, breadth from proof."),
    p("The B2B sourcing opportunity in India is genuinely enormous, and the graveyard of the category is full of platforms that grew impressive traffic on top of the double deficit and never noticed they were phone books until the renewals stopped. The prize goes to the founder willing to say the quiet part in their own boardroom: nobody trusts anybody on our platform yet, and fixing that, category by category, transaction by transaction, is the entire company."),
  ];

  const faq = [
    { _key: k(), question: "What is the biggest problem facing B2B sourcing marketplaces?", answer: "A double trust deficit: buyers do not trust unverified supplier claims, and suppliers do not trust the quality of the leads they pay for. Each side's rational self-protection degrades the platform for the other, and the visible symptom is disintermediation, users taking relationships offline after the first introduction." },
    { _key: k(), question: "How do marketplaces stop buyers and suppliers going offline?", answer: "Not by blocking contact, which punishes the best users and fails anyway, but by making the on-platform transaction safer and easier than the off-platform one: meaningful verification, transaction-tied reputation, payment protection and dispute resolution, and value at every deal stage. Leaving should mean losing protection, not saving commission." },
    { _key: k(), question: "What makes supplier verification credible?", answer: "Cost and consequence: documents checked against issuing bodies, capabilities confirmed, claims audited on a cycle, and honest tiers that state exactly what was verified. Badges awarded for uploads convince nobody. AI-driven document checking has materially lowered the cost of doing verification properly at scale." },
    { _key: k(), question: "Why do reviews fail on B2B platforms?", answer: "Open opinion-based reviews attract noise and manipulation, and B2B users know it. Reputation systems work when tied to verified on-platform transactions, recording what actually happened to delivery, quality, and disputes. Built that way, a supplier's reputation becomes a platform-specific asset that rewards staying." },
    { _key: k(), question: "Should a B2B marketplace build trust features or grow supply first?", answer: "Depth first in a deliberate wedge: one category and corridor with the full trust stack, proven retention and take-rate math, then expansion from evidence. Growing supply on top of an unsolved trust deficit builds a larger phone book, and the suppliers who pay most under the directory model are often those most opposed to the verification the future requires." },
  ];

  const doc = {
    _id:         "insight-blog-24",
    _type:       "insight",
    title:       "The Trust Problem in B2B Sourcing Marketplaces Nobody Talks About",
    seoTitle:    "The Trust Problem in B2B Sourcing Marketplaces",
    slug:        { _type: "slug", current: "b2b-sourcing-marketplace-trust-problem" },
    excerpt:     "B2B sourcing platforms leak their best users through one unspoken problem: nobody trusts anybody, so everybody leaves. The trust mechanics that fix it, honestly examined.",
    publishedAt: "2026-07-06T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["platform-consultation"],
    pillar:      "platform-consultation",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "The trust problem in B2B sourcing marketplaces" },
    body,
    faq,
  };

  console.log("Creating insight-blog-24...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}


// ============================================================
// BLOG 25: Marketing Agency vs Advisor
// ============================================================
async function createBlog25() {
  resetKey("b25");
  const asset = await uploadImage("blog-25-marketing-agency-vs-advisor.png");

  const body = [
    callout(
      "Key Takeaway",
      "An agency executes: campaigns run, content ships, funnels get built. An advisor diagnoses: where your growth actually leaks, what strategy deserves the budget, which vendors to hire and how to judge them. Founders routinely buy execution when their real problem is diagnosis, and then conclude that marketing doesn't work after a year of well-executed wrong strategy. The test is one question: do you already know, with evidence, what should be done? If yes, hire hands. If no, hire eyes first, and never let the same engagement quietly become both without deciding it."
    ),
    p("There is a specific kind of marketing failure that produces no villain. The founder hired a competent agency. The agency did what agencies do: ran the campaigns, produced the content, sent the reports. Twelve months later, growth has not moved, a real budget is gone, and everyone involved worked hard."),
    p("The autopsy almost always finds the same cause of death: nobody was ever hired to answer the question that came before the campaigns. Not how do we run marketing, but what is actually wrong, and what deserves the money. The founder bought execution when the business needed diagnosis, because execution is what the market mostly sells, and diagnosis is what founders mostly assume they already have."),

    h2("Two different products, one confusing market"),
    block("normal", [strong("An agency sells execution capacity."), plain(" Campaign management, content production, design, development, the operational machine of marketing, delivered month after month. Good agencies are judged on craft and outcomes within a defined strategy. When the strategy is right, an agency is exactly what you need.")], [], null),
    block("normal", [strong("An advisor sells judgment."), plain(" Diagnosis of where growth actually leaks, strategy grounded in your economics rather than in channel fashion, vendor selection and evaluation, and the periodic outside audit of whether the whole system is pointed the right way. The advisor's deliverable is the thing the agency's work should be built on.")], [], null),
    p("The confusion arises because every agency claims strategy, and most sincerely attempt it. But an agency's strategy has a boundary it cannot cross: it will rarely conclude that the answer is less of what the agency sells. Not from dishonesty, from scope. The strategy an execution partner gives you for free is worth respecting, and it is not the same product as strategy from someone whose revenue does not depend on the answer."),

    h2("The diagnostic: which one does your situation need?"),
    block("normal", [strong("1. Can you state, with evidence, why growth is where it is?"), plain(" Not a theory, evidence: which funnel stage leaks, what a customer costs by channel, what the data says. If yes, hire an agency and hold it to the strategy. If your explanation is a rotating set of hunches, you have a diagnosis problem, and pouring execution on top of it is how the no-villain failure gets funded.")], [], null),
    block("normal", [strong("2. Have you already cycled through agencies?"), plain(" Two or three agencies in three years, each starting hopeful and ending flat, is rarely three unlucky picks. It is usually one undiagnosed strategy problem being handed to a series of executors, none of whom were hired to question it.")], [], null),
    block("normal", [strong("3. Is your marketing spend about to change materially?"), plain(" Scaling budget, entering a new market, launching a new line: inflection points are where locked-in assumptions get expensive. An advisor engagement before the scale-up costs a fraction of what a wrong-strategy scale-up costs.")], [], null),
    block("normal", [strong("4. Who currently evaluates your marketing vendors' claims?"), plain(" If the honest answer is the vendors themselves, via their own reports, you are missing the evaluation function entirely, and everything depends on someone on your side knowing which questions to ask.")], [], null),

    h2("Using both without corrupting either"),
    p("Mature marketing operations usually need both roles, and the failure mode is not having both. It is letting them blur."),
    p("The sequence that works mirrors everything this series has argued: diagnosis first, owned by someone independent of execution revenue, then execution by whoever earns it, measured against the diagnosis's baseline, then periodic independent review of whether the system still points the right way. The advisor writes the exam; the agency sits it; and the founder, for the first time, can tell the difference between a strategy problem and an execution problem when results wobble."),
    p("Can one firm do both? Sometimes, and honesty about our own position belongs here. MagicWorks is an execution business in its core services, performance marketing, search and answer engine visibility, websites, and a consultation business in its advisory work, where we hold a strict boundary: our platform and marketing consultancy engagements are consultation and vendor evaluation only, and we do not execute what we were hired to evaluate. The boundary costs us engagements with some regularity. It is also why the diagnosis is worth buying."),

    h2("The one-question version"),
    p("If this whole guide must compress into a single test, it is this: do you already know, with evidence you would defend to an investor, what your marketing should be doing? If yes, hire the best hands you can find and hold them to it. If no, every rupee spent on hands is a rupee spent executing a guess, and the highest-return hire in your marketing budget is the one who replaces the guess with a diagnosis."),
    p("The theme that survived every topic in this series, from AI citations to quotation queues to marketplace trust, turned out to be the same one: in every corner of this industry, the scarce commodity is not effort or tools. It is an honest answer to the question what is actually true here, and what deserves the money. Buy that answer first, from someone free to give it. Everything else in marketing is downstream."),
  ];

  const faq = [
    { _key: k(), question: "What is the difference between a marketing agency and a marketing advisor?", answer: "An agency sells execution capacity: campaigns, content, funnels, and the operational machine of marketing, judged on craft and outcomes within a defined strategy. An advisor sells judgment: diagnosis of where growth leaks, strategy grounded in your economics, and independent evaluation of vendors and results. They are different products, and buying execution to solve a diagnosis problem is the most common expensive mistake in the market." },
    { _key: k(), question: "How do I know if my business needs an advisor instead of an agency?", answer: "Test whether you can state, with evidence, why growth is where it is and what should be done. If you can, hire execution. If your explanation is a rotating set of hunches, if you have cycled through multiple agencies with flat results, or if spend is about to scale materially, hire diagnosis first." },
    { _key: k(), question: "Can a marketing agency provide strategy?", answer: "Good agencies contribute real strategic thinking within their scope, but an execution partner's strategy has a structural boundary: it will rarely conclude that the answer is less of what the partner sells. Strategy from someone whose revenue does not depend on the answer is a different product, and businesses at inflection points should buy it separately." },
    { _key: k(), question: "Should the same firm do marketing strategy and execution?", answer: "Only with a declared boundary. The sequence that protects the client is diagnosis by someone independent of execution revenue, execution by whoever earns it, and periodic independent review. A firm that quietly converts its own diagnosis into billable execution carries the conflict the separation exists to prevent." },
    { _key: k(), question: "What does a marketing advisor engagement typically cover?", answer: "Diagnosis of the full funnel against measured baselines, strategy and budget allocation grounded in unit economics, vendor selection with evaluation criteria the client owns, and periodic audits of results against the plan. The deliverable should survive without the advisor: a document and measurement framework the client's team and agencies execute." },
  ];

  const doc = {
    _id:         "insight-blog-25",
    _type:       "insight",
    title:       "Do You Need a Marketing Agency or a Marketing Advisor? A Founder's Guide",
    seoTitle:    "Marketing Agency or Marketing Advisor? A Founder's Guide",
    slug:        { _type: "slug", current: "marketing-agency-vs-marketing-advisor" },
    excerpt:     "One executes your marketing, the other diagnoses it, and hiring the wrong one wastes a year. How to tell which your business needs, and when you need both.",
    publishedAt: "2026-07-08T09:00:00.000Z",
    author:      AUTHOR_REF,
    categories:  ["digital-marketing", "platform-consultation"],
    pillar:      "digital-marketing",
    isGated:     false,
    coverImage:  { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: "Marketing agency vs marketing advisor" },
    body,
    faq,
  };

  console.log("Creating insight-blog-25...");
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log("\n=== Seed Blogs 12-25 (Batch 2) ===\n");
  await createBlog12();
  await createBlog13();
  await createBlog14();
  await createBlog15();
  await createBlog16();
  await createBlog17();
  await createBlog18();
  await createBlog19();
  await createBlog20();
  await createBlog21();
  await createBlog22();
  await createBlog23();
  await createBlog24();
  await createBlog25();
  console.log("\n=== All 14 blogs seeded successfully! ===\n");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
