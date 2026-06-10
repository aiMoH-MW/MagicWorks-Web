import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
const envLines = readFileSync(envPath, "utf8").split("\n");
for (const line of envLines) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}

const client = createClient({
  projectId: "wa86etuq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// ── Block builders ─────────────────────────────────────────────────────────
let _k = 0;
const k = () => `rw01_${++_k}`;

const h2 = (text) => ({
  _type: "block", _key: k(), style: "h2", markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});
const h3 = (text) => ({
  _type: "block", _key: k(), style: "h3", markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});
const p = (text) => ({
  _type: "block", _key: k(), style: "normal", markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});
// Paragraph with inline bold segments: p_b([{t:"plain"}, {t:"bold text", b:true}, {t:"more plain"}])
const p_b = (segments) => ({
  _type: "block", _key: k(), style: "normal", markDefs: [],
  children: segments.map(s => ({ _type: "span", _key: k(), text: s.t, marks: s.b ? ["strong"] : [] })),
});
const bq = (text) => ({
  _type: "block", _key: k(), style: "blockquote", markDefs: [],
  children: [{ _type: "span", _key: k(), text, marks: [] }],
});
const stats = (...items) => ({
  _type: "statRow", _key: k(),
  stats: items.map(([value, label, note]) => ({ _key: k(), value, label, ...(note ? { note } : {}) })),
});
const callout = (variant, title, body, items = []) => ({
  _type: "callout", _key: k(), variant, title, body,
  ...(items.length ? { items } : {}),
});
const pq = (text, attribution) => ({
  _type: "pullquote", _key: k(), text,
  ...(attribution ? { attribution } : {}),
});

// ── Body ───────────────────────────────────────────────────────────────────
const body = [

  h2("The Short Answer"),
  p("India's online business environment in 2026 is the most accessible it has ever been. UPI processes over 15 billion transactions a month. Pan-India logistics delivers to 27,000 pin codes within 48 hours. Razorpay and Cashfree have reduced payment gateway setup to a single afternoon. AI tools have reduced content, customer service, and ad creative costs by 40 to 60 percent."),
  p("Yet approximately 80 percent of Indian online businesses fail within their first three years. The infrastructure argument against starting is largely gone. What remains is a strategy and foundations problem: most founders get the first five decisions wrong, and those decisions are very hard to undo."),
  p("This guide covers the nine steps that separate online businesses that survive and grow from ones that spend money, attract no customers, and quietly close. Written specifically for Indian founders, it uses Indian rupee figures, Indian platforms, and Indian-market data throughout."),

  stats(
    ["700M+", "internet users in India (2024)"],
    ["80%", "online businesses fail within 3 years"],
    ["15B+", "UPI transactions processed per month"]
  ),

  h2("Why 2026 Is the Right Time — And Why Most Founders Still Get It Wrong"),
  p("India's e-commerce market crossed $70 billion in 2024 and is growing at roughly 25 percent per year. The consumer-side infrastructure is genuinely world-class. Bharat has arrived digitally: tier-2 and tier-3 cities now represent more than 60 percent of new e-commerce users."),
  p("The failure rate, however, remains stubbornly high. The reason is almost never product quality. It is almost always one of five foundational mistakes: launching without validation, picking the wrong acquisition channel and spending the whole budget proving it does not work, ignoring unit economics until the bank account is empty, building for desktop when 76 percent of Indian commerce traffic is mobile, or treating GST and legal setup as something to sort out 'later.'"),

  callout(
    "warning",
    "The Expensive Mistake Most Indian Online Founders Make",
    "Building for six months before validating demand is the single most common and expensive first mistake. Validation should take two to four weeks and cost under ₹25,000. Building takes three to six months and costs ₹2 lakh to ₹25 lakh. The order matters."
  ),

  h2("Step 1: Idea Validation — Test Before You Build"),
  p("Validation does not mean asking friends and family if they like the idea. It means finding 10 people willing to pay for something before you build it. Three methods that work for Indian online businesses:"),
  p_b([{ t: "Manual presale: " }, { t: "Put up a landing page with a 'Buy Now' or 'Join Waitlist' button.", b: false }]),
  p("Run ₹3,000 to ₹5,000 in Facebook or Google ads pointing to it. If you cannot get 3 to 5 people to click intent within 10 days on a product that does not exist yet, reconsider the idea before building it. The cost of this test is ₹5,000. The cost of building first and discovering no demand is often ₹5 lakh."),
  p_b([{ t: "Competitive research: " }, { t: "Open Meta Ads Library and search for competitors in your category.", b: false }]),
  p("If 5 to 10 advertisers are spending consistently on this category, demand exists and the market is real. If no one is advertising, two interpretations exist: either the market is untapped (rare and worth investigating) or there is no profitable demand (far more common). Treat the absence of competition as a red flag, not an opportunity, unless you have strong evidence otherwise."),
  p_b([{ t: "Community pre-validation: " }, { t: "Post in relevant Indian communities — LinkedIn India groups, Reddit r/india, r/IndianStartups, or category-specific Facebook groups.", b: false }]),
  p("Describe the problem you solve, not the product. Count responses that say 'I need this' or 'I currently pay for something like this.' Aim for 20 to 30 such responses before concluding demand exists. Do not count 'good idea' responses — interest is not demand."),

  stats(
    ["₹5,000–25,000", "cost of proper idea validation"],
    ["₹2–25 lakh", "cost of building without validation"],
    ["10 paying customers", "minimum proof of demand before building"]
  ),

  h2("Step 2: Brand Identity — Name, Logo, and Legal Positioning"),
  p("Your brand name needs to pass four tests before you commit to it, because renaming after you have built brand equity is expensive and disruptive."),
  p_b([{ t: "Searchability test: " }, { t: "Can your name be found on Google without competing with irrelevant noise? ", b: false }, { t: "'SpiceRoute'" }, { t: " is a terrible brand name because search results are polluted. ", b: false }, { t: "'SpiceRoute Ceramics'" }, { t: " is better.", b: false }]),
  p_b([{ t: "Domain test: " }, { t: "Check .com and .in availability simultaneously. Use GoDaddy or Namecheap's bulk domain checker to test 10 to 15 name variants in one pass. Register both extensions if the .com is available.", b: false }]),
  p_b([{ t: "Trademark clearance: " }, { t: "Search the Indian Trademark Registry at ipindia.gov.in before spending money on branding. Filing a trademark costs ₹4,500 per class for individuals and startups. Registration takes 18 to 24 months but the protection runs from the filing date, not the registration date. File early.", b: false }]),
  p_b([{ t: "Social handle availability: " }, { t: "Check all platforms simultaneously using Namecheckr or a similar tool. Inconsistent handles across platforms create SEO and brand confusion that compounds over time.", b: false }]),
  p("Logo and basic branding: Budget ₹5,000 to ₹20,000 for a freelancer via Fiverr India, Upwork, or local designers sourced through LinkedIn. AI tools — Canva, Looka, Adobe Firefly — produce professional-quality logos for ₹0 to ₹2,000 if budget is a hard constraint at launch."),

  stats(
    ["₹4,500", "trademark registration per class (startup rate)"],
    ["18–24 months", "trademark registration timeline in India"],
    ["₹800–1,500", "annual domain registration cost (.com or .in)"]
  ),

  h2("Step 3: Domain and Hosting — Get This Right the First Time"),
  p("Register your domain for a minimum of three years. Single-year registrations signal temporary intent to search engines. Budget ₹800 to ₹1,500 per year for a .com or .in."),
  h3("Hosting choices for Indian online businesses in 2026"),
  p_b([{ t: "Content businesses, service portfolios, and lead generation sites: " }, { t: "Hostinger India (₹3,500 to ₹8,000 per year) or SiteGround (₹7,000 to ₹15,000 per year). Both operate India-region data centres. Page load speed for Indian audiences is meaningfully faster compared to US or EU servers.", b: false }]),
  p_b([{ t: "E-commerce on WooCommerce: " }, { t: "SiteGround Business or WP Engine (₹15,000 to ₹40,000 per year). Performance matters directly for conversion. Every 100ms of additional load time reduces conversion rates measurably.", b: false }]),
  p_b([{ t: "Shopify stores: " }, { t: "Shopify manages hosting. The Basic India plan is ₹1,994 per month. No separate hosting purchase needed. For most Indian founders selling physical products, Shopify is the fastest and most reliable launch path.", b: false }]),
  p_b([{ t: "High-traffic or SaaS businesses: " }, { t: "AWS (Mumbai region), DigitalOcean (Bangalore), or Hetzner. These require technical setup but give you full control and significantly lower per-unit infrastructure costs at scale.", b: false }]),

  callout(
    "key-takeaway",
    "The Performance and Revenue Link",
    "A 1-second delay in page load reduces conversions by 7 percent (Akamai, 2024). For Indian mobile users on 4G, pages loading in under 2 seconds from an Indian data centre convert measurably better than the same page loading in 4 to 5 seconds from a US server. Choose your host based on where your customers are, not where it is cheapest globally."
  ),

  h2("Step 4: Legal and Compliance — Don't Skip This Step"),
  p("Legal setup is the most skipped foundational step. Three registrations every Indian online business should complete before taking its first rupee:"),
  p_b([{ t: "GST Registration: " }, { t: "Mandatory when turnover exceeds ₹20 lakh per year (₹10 lakh in special category states). Critical exception: for e-commerce sellers on Amazon, Flipkart, or any marketplace, GST registration is mandatory from the first rupee of revenue regardless of turnover. These platforms withhold TCS (Tax Collected at Source) and you need a GSTIN to claim it back. Self-registration via gstin.gov.in is free. A CA charges ₹2,000 to ₹5,000 to file it for you.", b: false }]),
  p_b([{ t: "Business registration: " }, { t: "Sole proprietorship costs nothing to register but offers no liability protection. LLP costs ₹8,000 to ₹12,000 to register and suits partnerships. Private Limited Company costs ₹10,000 to ₹25,000 via the MCA portal or a service provider and is necessary for any business planning to raise external funding.", b: false }]),
  p_b([{ t: "Business current account: " }, { t: "Personal bank accounts used for business transactions create tax complications, accounting nightmares, and cash flow confusion. Open a current account before your first transaction. The initial deposit requirement is typically ₹1,000 to ₹5,000 depending on the bank.", b: false }]),

  callout(
    "warning",
    "The GST Marketplace Trap",
    "Many first-time Indian online business founders start taking marketplace payments before completing GST registration. Amazon and Flipkart withhold TCS on every sale. Without a GSTIN, you cannot claim this deduction back, and it compounds quickly. Start the registration process before you list your first product — not after."
  ),

  h2("Step 5: Business Plan — Five Questions, Not Forty Pages"),
  p("A business plan for a lean Indian online business does not need to be 40 pages with a five-year financial model. It needs to answer five specific questions with real numbers:"),
  p_b([{ t: "1. Who pays and why, exactly? " }, { t: "One specific customer segment with a specific named problem. Not 'anyone who needs our service' or 'people aged 25 to 40.' The more specific the answer, the more useful the plan.", b: false }]),
  p_b([{ t: "2. What is your unit economics? " }, { t: "Revenue per customer, cost to acquire that customer (CAC), gross margin per sale, and months to recover the acquisition cost from gross margin (payback period). If you do not know these numbers, you cannot make good channel or pricing decisions.", b: false }]),
  p_b([{ t: "3. What is the 12-month cash requirement? " }, { t: "Include product or inventory cost, platform fees, paid marketing budget, GST registration, accounting, your salary if this is full-time, and a 20 percent buffer. Most founders underestimate cash requirements by 40 to 60 percent.", b: false }]),
  p_b([{ t: "4. What does month-12 revenue look like in three scenarios? " }, { t: "Base case (realistic), downside (customer acquisition is twice as expensive), and upside (a distribution channel works significantly better than expected). If the downside scenario is fatal, your runway needs to be longer.", b: false }]),
  p_b([{ t: "5. What are the three biggest risks and the mitigation for each? " }, { t: "Write them down. Founders who cannot articulate the risks of their own business are the ones most surprised by them.", b: false }]),

  callout(
    "key-takeaway",
    "The Number That Tells You If Your Business Model Works",
    "LTV:CAC ratio. A healthy online business has a Lifetime Value to Customer Acquisition Cost ratio of 3:1 or better. Below 1.5:1 means you are losing money acquiring customers. Track this from your first sale, not from month six when the damage is done."
  ),

  h2("Step 6: Build a Website That Converts, Not Just Looks Good"),
  p("Platform selection depends on your business type. Getting this wrong is an expensive, time-consuming mistake to undo."),
  p_b([{ t: "Service businesses and consultants: " }, { t: "WordPress with Elementor or Divi (₹5,000 to ₹15,000 one-time build cost for a basic site), or a custom build (₹30,000 to ₹2,00,000 depending on scope and complexity). Connect Razorpay or Cashfree for payments.", b: false }]),
  p_b([{ t: "Physical product e-commerce: " }, { t: "Shopify (fastest to launch, best Indian payment and logistics integrations) or WooCommerce (more flexibility, lower platform fees at scale). For most first-time founders, Shopify is the right starting point.", b: false }]),
  p_b([{ t: "Digital products (courses, templates, reports): " }, { t: "Instamojo (built for India, handles GST compliance, zero setup complexity), Teachable or Thinkific (for courses), or WooCommerce with a digital delivery plugin.", b: false }]),
  h3("Core pages every Indian online business website must have"),
  p("Homepage with one clear call to action. Burying the ask under five options reduces conversion significantly."),
  p("Product or service pages with visible pricing. Hiding prices to 'get people to enquire' consistently reduces qualified leads and attracts price-shoppers who waste your time."),
  p("About page with a real photograph of the founder or team. Indian consumers are relationship-driven. Anonymous businesses convert worse. This is particularly true for services."),
  p("Contact page with a phone number. Indian customers — especially first-time buyers — call before buying. Not having a phone number reduces trust visibly."),
  p("Privacy Policy and Terms of Service. These are legally mandatory under the IT Act 2000 and IT Rules 2021. They are also trust signals."),

  stats(
    ["76%", "Indian e-commerce traffic from mobile devices"],
    ["40%", "cart abandonment increase per 1-second mobile load delay"],
    ["₹1,994/month", "Shopify Basic India pricing (2026)"]
  ),

  h2("Step 7: Set Up Payments and Operations Before You Launch"),
  h3("Payment gateways for Indian businesses in 2026"),
  p_b([{ t: "Razorpay: " }, { t: "India's most widely used payment gateway. 2 percent transaction fee. Excellent documentation. Supports UPI, cards, net banking, wallets, and EMI. Instant settlement available for an additional fee. Most Shopify and WooCommerce developers in India know it well.", b: false }]),
  p_b([{ t: "Cashfree Payments: " }, { t: "Competitive at 1.75 percent for cards. Faster settlements (T+1 or T+0 available). Strong API. Slightly less ecosystem support than Razorpay but cost-effective for high-volume businesses.", b: false }]),
  p_b([{ t: "PayU: " }, { t: "Older and widely used. Better suited for high-volume businesses negotiating custom rates below the standard fee.", b: false }]),
  p_b([{ t: "Instamojo: " }, { t: "Ideal for freelancers, digital product sellers, and very small businesses. Zero technical setup. Link-based payments. Good starting point before you have a full website.", b: false }]),
  p("Do not make Cash on Delivery your primary mode unless your category data makes it unavoidable. COD return rates in Indian e-commerce average 25 to 35 percent. On a business with 40 percent gross margins and a 30 percent COD rate, the unit economics collapse quickly."),
  h3("Logistics and fulfilment"),
  p_b([{ t: "Shiprocket: " }, { t: "Integrates with Shopify, WooCommerce, Amazon, Flipkart, and most Indian e-commerce platforms. Accesses 17+ courier partners. Rates from ₹28 per 500g for economy delivery. Pan-India reach to 27,000+ pin codes. Fastest setup for launch.", b: false }]),
  p("Build a returns policy before your first sale. Publish it visibly. Indian consumer courts have consistently sided with buyers in e-commerce disputes. A clear published policy protects you legally and builds trust simultaneously."),

  callout(
    "key-takeaway",
    "Why Payment Setup Matters More Than the Website Design",
    "67 percent of Indian online shoppers abandon a purchase when their preferred payment method is unavailable (Razorpay Payments Report 2024). UPI is not optional — it is India's primary payment method. Any Indian online business that does not support UPI is leaving a majority of its potential customers on the table."
  ),

  h2("Step 8: Build a Customer Acquisition System, Not a Marketing Wish List"),
  p("A marketing plan that says 'we will do social media and SEO' is not a plan. A customer acquisition system specifies: which channel you will focus on first, what the monthly budget is, what your target CAC is, what the payback period assumption is, and who is personally responsible for each channel."),
  h3("Channel selection guide for Indian online businesses"),
  p_b([{ t: "B2C products (consumer goods, fashion, food, lifestyle): " }, { t: "Meta Ads (Facebook and Instagram) generate the lowest CAC at launch for most B2C categories. Budget ₹20,000 to ₹50,000 for the test phase before expecting to find a winning creative. Most businesses need 30 to 50 ad variations before finding one that converts well.", b: false }]),
  p_b([{ t: "B2B services: " }, { t: "LinkedIn organic content combined with cold outreach consistently outperforms LinkedIn Ads at launch. LinkedIn CPCs in India run ₹800 to ₹2,500 per click. At that price, you need a very high conversion rate to make paid LinkedIn profitable for a business under ₹1 crore ARR.", b: false }]),
  p_b([{ t: "Local services (city-specific): " }, { t: "Google Business Profile optimisation and local SEO consistently outperform paid ads for service businesses targeting a single city. Setup cost is ₹0. Results take 3 to 6 months to compound meaningfully. Start this on day one regardless of other channels.", b: false }]),
  p_b([{ t: "E-commerce: " }, { t: "Google Shopping ads consistently outperform branded search for product discovery with purchase intent. Minimum meaningful test budget: ₹30,000. Below that, the data is too thin to draw conclusions.", b: false }]),
  p_b([{ t: "Content marketing and SEO: " }, { t: "Takes 6 to 12 months to generate meaningful organic traffic. Start writing on day one but do not include organic traffic in your 6-month revenue projections. Write specifically for your customer's questions, not for search engine rankings.", b: false }]),

  stats(
    ["₹20,000–50,000", "Meta Ads spend to find a winning creative"],
    ["₹800–2,500", "LinkedIn Ads CPC in India"],
    ["3–6 months", "local SEO timeline for Indian service businesses"]
  ),

  pq("The acquisition channel that works is not the one everyone says works in your category. It is the one you test methodically with real budget and measure honestly. Most founders already know their acquisition channel is not working. They keep running it anyway because acknowledging it means admitting the business model needs revision."),

  h2("Step 9: Launch, Measure for 90 Days, Then Iterate"),
  h3("Pre-launch checklist"),
  p("Website loads in under 3 seconds on mobile. Test using Google PageSpeed Insights from an Indian IP."),
  p("All payment flows tested with real transactions, not just sandbox mode."),
  p("GST invoice generation working correctly and automatically."),
  p("Google Analytics 4 and Google Search Console connected and verified."),
  p("Meta Pixel or Google Ads conversion tracking live and firing on the correct events."),
  p("Basic post-purchase email sequence ready: order confirmation, delivery update, follow-up at day 7."),
  p("Returns and refund process defined, documented, and tested."),
  h3("The 90-day operating framework"),
  p_b([{ t: "Month 1: " }, { t: "Launch and focus exclusively on customer acquisition. Do not redesign the website. Do not add features or SKUs. Do not pivot. Acquire 10 paying customers or generate enough data to prove a specific channel does not work. Do one thing well.", b: false }]),
  p_b([{ t: "Month 2: " }, { t: "Measure the numbers that matter. What is the CAC from each channel? What is the most common reason for cart abandonment (run a brief survey or check heatmaps via Hotjar or Microsoft Clarity)? What do customers say after buying? What do they complain about?", b: false }]),
  p_b([{ t: "Month 3: " }, { t: "Optimise one variable. One acquisition channel, one conversion rate element, one retention mechanic. Optimising everything at once means you cannot attribute what worked to which change. Systematic iteration compounds over time; scattered optimisation produces noise.", b: false }]),

  pq("The best time to optimise your online business was 90 days after launch. The second best time is right now. Most founders redesign instead of optimising. Optimisation compounds. Redesigns reset the data and delay learning."),

  h2("The Five Most Common Reasons Indian Online Businesses Fail in Year One"),
  p_b([{ t: "1. No customer acquisition budget. " }, { t: "The entire plan was to build the website. There was no plan for getting people to it. Building is not the constraint. Customers are the constraint.", b: false }]),
  p_b([{ t: "2. COD dependence. " }, { t: "Launched with Cash on Delivery as the primary mode because it felt lower-friction. Return rates of 25 to 35 percent destroyed margins within the first three months.", b: false }]),
  p_b([{ t: "3. Premature product expansion. " }, { t: "Added SKUs, features, or services before optimising the first one. Complexity grows faster than capability in early-stage businesses.", b: false }]),
  p_b([{ t: "4. No working capital plan. " }, { t: "Inventory, shipping, and marketing spend happen before customer payment arrives. Founders who did not model this ran out of cash 60 days before the first profitable month.", b: false }]),
  p_b([{ t: "5. Building for the founder, not the customer. " }, { t: "Design, copy, features, and pricing decisions made based on personal preference rather than customer feedback. The founder's taste and the customer's purchase trigger are rarely identical.", b: false }]),

  callout(
    "key-takeaway",
    "What to Do This Week",
    "If starting from zero: write three product or service ideas down, test one using the manual presale method described in Step 1, and check domain availability for 10 name variants. Total time: 4 hours. Total cost: ₹0. If already launched but not growing: calculate your current CAC per channel and your LTV. If CAC exceeds LTV, the business model is broken. Fix this before scaling."
  ),

  h2("India-Specific Tools Reference for 2026"),
  p_b([{ t: "Payments: " }, { t: "Razorpay, Cashfree, PayU, Instamojo", b: false }]),
  p_b([{ t: "E-commerce platforms: " }, { t: "Shopify, WooCommerce, Dukaan (mobile-first), Instamojo", b: false }]),
  p_b([{ t: "Logistics: " }, { t: "Shiprocket, Delhivery, Ecom Express, BlueDart", b: false }]),
  p_b([{ t: "GST and accounting: " }, { t: "ClearTax, Zoho Books, Tally Prime, QuickBooks India", b: false }]),
  p_b([{ t: "Domain registrars: " }, { t: "GoDaddy India, BigRock, Namecheap", b: false }]),
  p_b([{ t: "Hosting: " }, { t: "Hostinger India, SiteGround, WP Engine, AWS Mumbai, DigitalOcean Bangalore", b: false }]),
  p_b([{ t: "Analytics: " }, { t: "Google Analytics 4, Microsoft Clarity (free heatmaps and session recordings)", b: false }]),
  p_b([{ t: "Trademark search: " }, { t: "ipindia.gov.in (Indian Trademark Registry)", b: false }]),

  h2("Sources and Data"),
  p("IAMAI Internet in India Report 2024 — 700M+ internet users, 6+ hours average daily online time"),
  p("NPCI UPI Monthly Statistics (June 2025) — 15+ billion transactions per month"),
  p("Google, Temasek, Bain: e-Conomy SEA / India 2024 — $70 billion e-commerce market, 25% CAGR"),
  p("Akamai: State of Online Retail Performance (2024) — 7% conversion loss per 1-second delay"),
  p("Razorpay Payments Report 2024 — 67% abandonment when preferred payment method unavailable"),
  p("Shopify India pricing page (2026) — ₹1,994/month Basic plan"),
  p("Indian Trademark Office Fee Schedule (2026) — ₹4,500 per class for individuals and startups"),
  p("Shiprocket Rate Calculator (2026) — ₹28/500g economy delivery starting rate"),
  p("Criteo Commerce in Motion India Report (2024) — 76% of e-commerce traffic from mobile"),
  p("Ministry of Commerce MSME Annual Report (2024) — 63 million registered MSMEs in India"),
];

// ── Patch the document ─────────────────────────────────────────────────────
const docId = "insight-wp-094dlbcrbvw9";

console.log(`Patching: ${docId}`);
console.log(`Body blocks: ${body.length}`);

await client
  .patch(docId)
  .set({
    title: "9 Essential Steps to Start an Online Business in India in 2026",
    excerpt: "80% of Indian online businesses fail within 3 years — not because the idea was wrong, but because the foundations were wrong. Here are the 9 steps that change that outcome.",
    seoTitle: "9 Steps to Start an Online Business in India (2026 Guide)",
    tags: [
      "online business India",
      "start online business India",
      "how to start online business",
      "e-commerce India 2026",
      "business plan India",
      "Razorpay",
      "Shopify India",
      "digital marketing India",
      "GST registration online business",
      "Indian startup guide"
    ],
    categories: ["industry-insights", "digital-marketing"],
    body,
  })
  .commit();

console.log("Done. Blog rewritten successfully.");
