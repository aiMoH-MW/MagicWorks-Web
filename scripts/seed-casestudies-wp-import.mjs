/**
 * Seeds 8 new case studies from WordPress export into Sanity.
 * Run: node scripts/seed-casestudies-wp-import.mjs
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
const token = env.match(/SANITY_API_TOKEN=(.+)/)?.[1]?.trim();

const client = createClient({
  projectId: "wa86etuq",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token,
});

const studies = [
  // ─── 1. Design Institute ──────────────────────────────────────────────────
  {
    _id: "case-study-design-institute-education",
    _type: "caseStudy",
    title: "Design Institute Grows Monthly Inquiries 2.6X With Brand-Led Digital Marketing",
    slug: { _type: "slug", current: "design-institute-2x-inquiry-growth" },
    client: "Design Institute",
    heroMetric: "800+",
    heroMetricLabel: "INQUIRIES PER MONTH",
    industry: "education",
    pillar: "digital-marketing",
    featured: false,
    publishedAt: "2026-01-15T00:00:00Z",
    situation:
      "A well-regarded design institute with strong local walk-in admissions was completely invisible online. Newer competitors with inferior programmes consistently outranked them on search. Around 90% of inquiries came from walk-ins with no ability to reach aspirants beyond a 20 km radius. Social media sat dormant at under 1,000 followers each on Instagram and Facebook, and exceptional student portfolios and placement outcomes had never been digitally showcased.",
    intervention:
      "MagicWorks took a brand-first approach — for a design institute, the quality of digital presentation is the primary sales pitch. We redesigned all digital channels with a cohesive aesthetic including photography, colour palette, and content templates. A systematic Instagram content calendar featured student portfolios, process videos, day-in-the-life reels, and placement announcements. Meta lead generation campaigns targeted 18–25-year-olds with design and creative career interests. YouTube pre-roll ads featuring student success stories ran against users searching for design course terms. We partnered with 6 regional design influencers (10K–100K followers) for authentic campus reviews and structured SEO to capture all target course keywords.",
    result:
      "Within 6 months, monthly inquiries grew from approximately 180 to over 800 — a 2.6X increase. Digital reach expanded 2.5X, application volume lifted 22%, and the institute now holds Page 1 positions for all target course and career terms. The institute is no longer dependent on walk-in geography — it now attracts aspirants from across the state.",
    metrics: [
      { _key: "m1", value: "800+", label: "Monthly inquiries" },
      { _key: "m2", value: "2.5X", label: "Digital reach" },
      { _key: "m3", value: "22%", label: "Application lift" },
      { _key: "m4", value: "2.6X", label: "Inquiry growth" },
    ],
  },

  // ─── 2. Steel Manufacturer (anonymised) ───────────────────────────────────
  {
    _id: "case-study-steel-manufacturer-b2b",
    _type: "caseStudy",
    title: "Steel Manufacturer Generates 110+ RFQs Per Month With B2B SEO and LinkedIn Outreach",
    slug: { _type: "slug", current: "steel-manufacturer-b2b-rfq-growth" },
    client: "Steel Manufacturer",
    heroMetric: "110+",
    heroMetricLabel: "RFQS PER MONTH",
    industry: "manufacturing",
    pillar: "digital-marketing",
    featured: false,
    publishedAt: "2026-01-20T00:00:00Z",
    situation:
      "This established steel manufacturer had grown entirely through dealer relationships and trade fairs with no digital presence beyond a basic website. When key dealer relationships became uncertain, the company had no independent ability to attract new industrial buyers digitally. Procurement managers searching for steel suppliers could not find the company anywhere online, and export-quality product existed but had zero digital infrastructure to reach international buyers.",
    intervention:
      "MagicWorks built the company's B2B digital presence from ground zero. Individual product pages were created per steel category with full specifications, IS standard references, and application use cases. High-intent Google Search campaigns targeted procurement-specific keywords with the RFQ form as the direct conversion goal. LinkedIn campaigns targeted Purchase Managers, Plant Heads, and Procurement Directors at steel, construction, and infrastructure companies. An automated RFQ qualification workflow triggered immediate acknowledgment and routing to the relevant regional sales contact within 15 minutes. English-language export SEO content captured international procurement searches.",
    result:
      "After 6 months, the manufacturer receives 85–110 RFQs per month from domestic and international industrial buyers — from a baseline of zero structured inbound leads. 25% of new leads came from regional buyers outside the existing dealer network, export inquiries grew 30% quarter-over-quarter, and LinkedIn InMail achieved a 28% open rate among decision-makers.",
    metrics: [
      { _key: "m1", value: "110+", label: "RFQs per month" },
      { _key: "m2", value: "30%", label: "Export inquiry growth QoQ" },
      { _key: "m3", value: "25%", label: "New regional buyers" },
      { _key: "m4", value: "28%", label: "LinkedIn InMail open rate" },
    ],
  },

  // ─── 3. Multi-Specialty Hospital ─────────────────────────────────────────
  {
    _id: "case-study-multi-specialty-hospital",
    _type: "caseStudy",
    title: "Multi-Specialty Hospital Adds 1,100 OPD Bookings Per Month With Local SEO and Reputation Recovery",
    slug: { _type: "slug", current: "multi-specialty-hospital-opd-growth" },
    client: "Multi-Specialty Hospital",
    heroMetric: "1,100",
    heroMetricLabel: "OPD BOOKINGS PER MONTH",
    industry: "healthcare",
    pillar: "digital-marketing",
    featured: false,
    publishedAt: "2026-02-01T00:00:00Z",
    situation:
      "This multi-specialty hospital had strong clinical capabilities but was being outranked in Google Maps by competitors with weaker care outcomes but better digital optimisation. Unaddressed negative reviews had suppressed the Google rating, and appointments could only be booked by phone through a frequently busy front desk — leading to high abandonment. No digital promotion existed for individual specialties or doctors, leaving significant patient acquisition potential untapped.",
    intervention:
      "MagicWorks implemented a three-pillar strategy: local search dominance, structured reputation recovery, and frictionless appointment conversion. The Google Business Profile was optimised with complete department and doctor listings plus citation building across 40+ directories. Specialty-specific Google Ads campaigns — Cardiology, Orthopaedics, Gynaecology, Paediatrics — ran with appointment booking as the conversion goal. An automated post-visit SMS workflow delivered direct Google review links to satisfied patients, with satisfaction triage prioritising high-value responders. A specialty-specific booking widget was integrated across the website and Google Business Profile, with WhatsApp confirmation for every booking.",
    result:
      "Google rating recovered to 4.3 stars. Appointment bookings increased 50%. The hospital now generates 1,100+ OPD bookings per month through digital channels, with appointment abandonment significantly reduced through online booking integration across all specialties.",
    metrics: [
      { _key: "m1", value: "1,100", label: "OPD bookings per month" },
      { _key: "m2", value: "4.3★", label: "Google rating" },
      { _key: "m3", value: "50%", label: "Appointment growth" },
      { _key: "m4", value: "40+", label: "Directory citations built" },
    ],
  },

  // ─── 4. D2C Ecommerce Brand ───────────────────────────────────────────────
  {
    _id: "case-study-d2c-lifestyle-brand",
    _type: "caseStudy",
    title: "D2C Lifestyle Brand Achieves 3.5X ROAS and ₹32L Monthly Revenue With Full-Funnel Rebuild",
    slug: { _type: "slug", current: "d2c-lifestyle-brand-roas-growth" },
    client: "D2C Lifestyle Brand",
    heroMetric: "3.5X",
    heroMetricLabel: "ROAS ACHIEVED",
    industry: "ecommerce",
    pillar: "digital-marketing",
    featured: false,
    publishedAt: "2026-02-10T00:00:00Z",
    situation:
      "This D2C lifestyle brand had strong product quality and growing repeat customers, but performance marketing was significantly underperforming. ROAS had declined below 2X, cart abandonment exceeded 70% with zero recovery mechanism — no emails, no push notifications, no retargeting. Meta ad sets mixed prospecting and retargeting audiences causing delivery inefficiency, and despite 8,000+ customer emails, the brand had sent exactly zero marketing emails.",
    intervention:
      "MagicWorks rebuilt the entire performance marketing system simultaneously. Meta campaigns were restructured with full-funnel separation — Prospecting, Consideration, and Conversion — with systematic creative testing using 3 variations per ad set. Google Shopping was rebuilt with optimised product feed titles, Target ROAS bidding, and comprehensive negative keywords. Mobile checkout was streamlined from 4 steps to 2. Using Klaviyo, we built 7 automated email flows from scratch: Welcome, Abandoned Cart (3-touch), Browse Abandonment, Post-Purchase, Win-Back, VIP, and Review Request. Full attribution was set up via GA4, Meta Conversions API, and Google Ads enhanced conversions.",
    result:
      "Monthly revenue reached ₹32 lakhs. ROAS improved from under 2X to 3.5X. Email automation now contributes 18% of monthly revenue directly. Cart abandonment recovery alone generated a meaningful new revenue stream within 60 days of the Klaviyo launch.",
    metrics: [
      { _key: "m1", value: "₹32L", label: "Monthly revenue" },
      { _key: "m2", value: "3.5X", label: "ROAS achieved" },
      { _key: "m3", value: "18%", label: "Revenue via email" },
      { _key: "m4", value: "7", label: "Automated email flows" },
    ],
  },

  // ─── 5. Regional Retail Chain ─────────────────────────────────────────────
  {
    _id: "case-study-regional-retail-chain",
    _type: "caseStudy",
    title: "Regional Retail Chain Increases Footfall 27% With Hyperlocal Store-Level Marketing",
    slug: { _type: "slug", current: "regional-retail-chain-footfall-growth" },
    client: "Regional Retail Chain",
    heroMetric: "27%",
    heroMetricLabel: "FOOTFALL INCREASE",
    industry: "retail",
    pillar: "digital-marketing",
    featured: false,
    publishedAt: "2026-02-15T00:00:00Z",
    situation:
      "A regional retail chain with 6 store locations was struggling against national chains and online competitors. Festive campaign performance had declined year-over-year. All 6 stores ran identical generic messaging with no localisation, customer loyalty was falling with buyers purchasing once but rarely returning, and thousands of customer phone numbers had never been systematically used for re-engagement.",
    intervention:
      "MagicWorks built a store-level hyperlocal marketing system that was centrally managed but delivered precisely localised campaigns per store. Individual Meta campaigns for all 6 locations used 3–5 km geo-targeting with store-specific creatives referencing local landmarks. Google Display Network ads targeted in-market retail shoppers within each store's zone. A WhatsApp marketing programme structured the existing customer database into tiered lists — recent customers, lapsed buyers, and VIP frequent buyers. A full-year promotional calendar was built for 8 key festive periods. Google Ads Store Visit conversions measured offline impact directly.",
    result:
      "Store footfall increased 27% across the chain. Repeat customer rate improved 20%. Campaign reach grew 3X. The WhatsApp programme consistently achieves above 85% open rates, giving the chain an owned communication channel that operates independently of any advertising platform.",
    metrics: [
      { _key: "m1", value: "27%", label: "Footfall increase" },
      { _key: "m2", value: "20%", label: "Repeat customer lift" },
      { _key: "m3", value: "3X", label: "Campaign reach" },
      { _key: "m4", value: "85%+", label: "WhatsApp open rate" },
    ],
  },

  // ─── 6. B2B Enterprise Software / SaaS ───────────────────────────────────
  {
    _id: "case-study-b2b-enterprise-software",
    _type: "caseStudy",
    title: "B2B Enterprise Software Company Achieves 85 Demo Bookings Per Month With Account-Based Marketing",
    slug: { _type: "slug", current: "b2b-enterprise-software-abm-demos" },
    client: "Enterprise Software Company",
    heroMetric: "85",
    heroMetricLabel: "DEMO BOOKINGS PER MONTH",
    industry: "technology",
    pillar: "digital-marketing",
    featured: false,
    publishedAt: "2026-02-20T00:00:00Z",
    situation:
      "This enterprise software company had a genuinely superior product but was failing to reach decision-makers. The website attracted IT managers and junior developers with no purchasing authority, while CTOs, IT Directors, and VP Technology roles — the actual buyers — were invisible to marketing. Demo requests came predominantly from junior IT staff and students rather than enterprise decision-makers with budget authority. Marketing budget was spread across broad awareness channels with no account-based concentration.",
    intervention:
      "MagicWorks implemented a full Account-Based Marketing strategy. We built a prioritised list of 500+ enterprise target accounts segmented by industry, company size (500+ employees), and technology stack fit. LinkedIn Sponsored Content and InMail campaigns matched job titles — CTO, IT Director, VP Technology — to companies on the account list. Product-led SEO content targeted active evaluation queries including comparison pages, ROI calculators, and industry-specific use cases. An AI chat qualification layer routed high-scoring visitors directly to a senior sales rep. Demo nurture sequences provided multi-touchpoint follow-up for prospects not yet ready to book.",
    result:
      "Within 6 months, the company achieved 85 demo bookings per month from qualified enterprise decision-makers — from a pipeline that previously consisted of mostly unqualified junior contacts. Sales closure rate improved 25% as deal quality improved alongside volume.",
    metrics: [
      { _key: "m1", value: "85", label: "Demo bookings per month" },
      { _key: "m2", value: "25%", label: "Sales closure lift" },
      { _key: "m3", value: "500+", label: "Target account list" },
      { _key: "m4", value: "6 mo", label: "Time to results" },
    ],
  },

  // ─── 7. Boutique Hotel & Resort ──────────────────────────────────────────
  {
    _id: "case-study-boutique-hotel-resort",
    _type: "caseStudy",
    title: "Boutique Resort Grows Direct Bookings 38% and Reduces OTA Commission Dependency",
    slug: { _type: "slug", current: "boutique-resort-direct-booking-growth" },
    client: "Boutique Resort",
    heroMetric: "38%",
    heroMetricLabel: "DIRECT BOOKING LIFT",
    industry: "hospitality",
    pillar: "digital-marketing",
    featured: false,
    publishedAt: "2026-03-01T00:00:00Z",
    situation:
      "This boutique resort ran at strong occupancy but was bleeding net margin through OTA commissions of 18–22% per booking. Over 70% of all bookings came through OTAs. Brand search volume was negligible — guests discovered the property through OTAs rather than seeking it directly — a self-reinforcing cycle that compressed profitability every month with no end in sight.",
    intervention:
      "MagicWorks built a direct booking growth strategy on three simultaneous tracks. Google Search campaigns captured all brand name searches and non-branded destination queries for travellers actively searching for accommodation in the area. The website booking engine was rebuilt to be fast, mobile-first, with real-time availability and a clear best-rate guarantee with exclusive direct-booking perks. Seasonal video content showcasing unique resort experiences was distributed as YouTube in-stream ads and Instagram Stories. Counterintuitively, improving OTA profile quality raised OTA ranking — increasing discovery and driving more guests to search by name before booking directly. Post-stay reputation management automated review collection and maintained a 4.6+ Google rating.",
    result:
      "Direct bookings grew 38%, reducing OTA dependency significantly. Brand search volume grew 40%, indicating the resort now has meaningful independent demand. Net booking margin improved substantially as OTA commission spend was partially replaced by direct traffic that cost a fraction of the OTA fee.",
    metrics: [
      { _key: "m1", value: "38%", label: "Direct booking lift" },
      { _key: "m2", value: "40%", label: "Brand search growth" },
      { _key: "m3", value: "4.6+", label: "Google rating maintained" },
      { _key: "m4", value: "↓ OTA", label: "Commission dependency reduced" },
    ],
  },

  // ─── 8. Construction Contractor ───────────────────────────────────────────
  {
    _id: "case-study-construction-contractor",
    _type: "caseStudy",
    title: "Commercial Contractor Generates 13 Project Inquiries Per Month With B2B Digital Credibility Build",
    slug: { _type: "slug", current: "commercial-contractor-b2b-project-inquiries" },
    client: "Commercial Contractor",
    heroMetric: "13",
    heroMetricLabel: "PROJECT INQUIRIES PER MONTH",
    industry: "construction",
    pillar: "digital-marketing",
    featured: false,
    publishedAt: "2026-03-10T00:00:00Z",
    situation:
      "This commercial and industrial contractor had an excellent track record delivering large-scale projects but a digital credibility score of near zero. Procurement managers conducting online due diligence were failing to find the company — it was being eliminated from shortlists before a single conversation took place. All new projects came through tender participation and existing client repeat work. The corporate website was a basic brochure site with no portfolio, no capability statements, no certifications.",
    intervention:
      "MagicWorks built the company's B2B digital credibility and lead generation capability simultaneously. The corporate website was rebuilt from the ground up with a professional project portfolio showcase of 20+ featured projects, capability statements, safety records, and ISO certifications. B2B SEO targeted procurement-specific terms including 'EPC contractor Maharashtra' and 'industrial warehouse construction company India'. A professional LinkedIn Company Page was created with regular project updates and InMail campaigns targeting Project Directors and Procurement Managers at target companies. Monthly thought leadership articles by the MD covered construction industry trends and large-scale project delivery.",
    result:
      "Within 6 months, the company generates 13 qualified project inquiries per month from inbound digital channels alone — from zero previously. Bid participation increased 25% as the company's improved digital presence allowed them to qualify for RFPs they were previously invisible to.",
    metrics: [
      { _key: "m1", value: "13", label: "Project inquiries per month" },
      { _key: "m2", value: "25%", label: "Bid participation lift" },
      { _key: "m3", value: "20+", label: "Portfolio projects showcased" },
      { _key: "m4", value: "6 mo", label: "Time to results" },
    ],
  },
];

async function run() {
  let created = 0;
  let skipped = 0;

  for (const study of studies) {
    const existing = await client.fetch(`*[_id == $id][0]._id`, { id: study._id });
    if (existing) {
      console.log(`⏭  Skipped (already exists): ${study._id}`);
      skipped++;
      continue;
    }
    await client.create(study);
    console.log(`✅ Created: ${study._id} — ${study.title}`);
    created++;
  }

  console.log(`\n✅ Done. ${created} created | ${skipped} skipped.`);
}

run().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
