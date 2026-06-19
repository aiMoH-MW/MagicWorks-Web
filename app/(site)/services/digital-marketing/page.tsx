import type { Metadata } from "next";
import Link from "next/link";
import DigitalMarketingContactForm from "./DigitalMarketingContactForm";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Pune",
  description:
    "Predictable revenue from traffic and leads. Ten digital marketing services on a monthly retainer, with a commission tier for larger ad spends. Book a call.",
  alternates: { canonical: "/services/digital-marketing" },
};

const services = [
  {
    slug: "full-funnel-programme",
    name: "Full-Funnel Digital Marketing",
    desc: "Google Ads, SEO, Meta, email, and reporting run as a single quarterly programme with one point of contact. The complete motion, accountable to one number, with a quarterly business review built in.",
    flagship: true,
  },
  {
    slug: "google-ads-search-marketing",
    name: "Google Ads & Search Marketing",
    desc: "Search, Performance Max, Display, and YouTube campaigns, with conversion tracking and audiences set up properly. The headline service for clients ready to scale paid acquisition.",
    flagship: false,
  },
  {
    slug: "seo-aeo",
    name: "SEO / AEO",
    desc: "Technical SEO, on-page, and content, plus answer-engine presence across ChatGPT, Perplexity, and Google AI Overviews. Local search lives in our GMB service.",
    flagship: false,
  },
  {
    slug: "gmb-optimisation",
    name: "GMB Optimisation",
    desc: "Google Business Profile done thoroughly: listings, reviews, posts, Q&A, and local-pack ranking. Sold on its own or inside an SEO retainer.",
    flagship: false,
  },
  {
    slug: "youtube-video-optimisation",
    name: "YouTube Video Optimisation",
    desc: "Organic YouTube growth: channel hygiene, video SEO, thumbnails, and retention. Strongest for brands and founders with an existing video pipeline.",
    flagship: false,
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    desc: "Facebook and Instagram paid campaigns with creative variants and audience automation, often paired with Google Ads for a true full-funnel motion.",
    flagship: false,
  },
  {
    slug: "linkedin-organic-social",
    name: "LinkedIn & Organic Social",
    desc: "B2B organic presence, LinkedIn-led, with founder-voice and executive thought-leadership ghostwriting where you want it.",
    flagship: false,
  },
  {
    slug: "thought-leadership-geo",
    name: "Thought Leadership & GEO",
    desc: "Founder-attributed long-form content as a sustained programme, built to earn citations in AI answer engines, not just to chase rankings.",
    flagship: false,
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    desc: "List building, nurture sequences, broadcasts, and lifecycle automation. Sold standalone or folded into a full-funnel engagement.",
    flagship: false,
  },
  {
    slug: "site-performance-conversion",
    name: "Site Performance & Conversion",
    desc: "Recover ad ROI on a slow or leaky site: Core Web Vitals, load time, and landing-page conversion. Fixed scope, with measurable before-and-after numbers.",
    flagship: false,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does digital marketing cost at MagicWorks?",
      acceptedAnswer: { "@type": "Answer", text: "Our standard retainer is scoped to the channels and goals agreed at discovery; price depends on the mix of services, ad spend managed, and reporting depth. For confirmed ad spend of ₹5 lakh or more per month, we offer a commission tier that aligns our incentives with your growth. Final pricing is set after the discovery call." },
    },
    {
      "@type": "Question",
      name: "Do you require a long contract?",
      acceptedAnswer: { "@type": "Answer", text: "We recommend twelve months because marketing compounds: search authority, audience data, and creative learnings all build on each other." },
    },
    {
      "@type": "Question",
      name: "Which industries do you focus on?",
      acceptedAnswer: { "@type": "Answer", text: "Our deepest practice is in education, real estate, and manufacturing." },
    },
    {
      "@type": "Question",
      name: "Do you guarantee leads or rankings?",
      acceptedAnswer: { "@type": "Answer", text: "No. What we guarantee is sound method, transparent attribution, and honest monthly reporting." },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://magicworksitsolutions.com/services/digital-marketing#service",
  name: "Digital Marketing",
  alternateName: "Performance Marketing",
  serviceType: "Digital Marketing",
  category: "Marketing Services",
  description:
    "Predictable revenue from traffic and leads. Ten digital marketing services on a monthly retainer — Full-Funnel Programme, Google Ads, SEO & AEO, GMB Optimisation, YouTube, Meta Ads, LinkedIn, Thought Leadership & GEO, Email Marketing, and CRO.",
  url: "https://magicworksitsolutions.com/services/digital-marketing",
  provider: {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
    url: "https://magicworksitsolutions.com",
  },
  areaServed: { "@type": "Country", name: "India" },
  audience: {
    "@type": "Audience",
    audienceType:
      "B2B businesses in education, real estate, manufacturing, and professional services sectors in India seeking predictable lead generation and revenue growth.",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Marketing Services",
    itemListElement: services.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: { "@type": "Service", name: s.name, description: s.desc },
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://magicworksitsolutions.com/services" },
    { "@type": "ListItem", position: 3, name: "Digital Marketing", item: "https://magicworksitsolutions.com/services/digital-marketing" },
  ],
};

export default function DigitalMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* -- HERO -- */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg
          className="absolute right-[-200px] top-[-160px] w-[760px] h-[760px] pointer-events-none opacity-70"
          aria-hidden="true"
        >
          {[120, 200, 280, 360, 440].map((r, i) => (
            <circle
              key={r}
              cx="380"
              cy="380"
              r={r}
              fill="none"
              stroke={i === 2 ? "#D4A537" : "#7C63D8"}
              strokeWidth="1.5"
              opacity={i === 2 ? 0.7 : 0.45}
            />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex gap-2 items-center text-[12px] text-[#9A8FBF]">
              <li>
                <Link href="/" className="hover:text-[#C8B8FF] transition-colors no-underline">Home</Link>
              </li>
              <li aria-hidden="true" className="text-[#5B3FBE]">/</li>
              <li>
                <Link href="/services" className="hover:text-[#C8B8FF] transition-colors no-underline">Services</Link>
              </li>
              <li aria-hidden="true" className="text-[#5B3FBE]">/</li>
              <li className="text-[#C8B8FF]" aria-current="page">Digital Marketing</li>
            </ol>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Pillar 01 · Execution</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(40px,6vw,62px)] leading-[1.08] tracking-[-0.01em] text-[#F7F3EA] max-w-[820px] mt-3">
            Predictable revenue from traffic and leads.
          </h1>
          <hr className="w-[64px] h-[3px] bg-[#D4A537] border-0 my-6" />
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mb-10">
            Performance marketing, SEO, social, and content, run by one accountable team on a monthly retainer. We measure every engagement against the number that matters to your business, never vanity metrics.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a
              href="#dm-enquiry"
              className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block"
            >
              Book a discovery call
            </a>
            <a
              href="#services"
              className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors inline-block"
            >
              See the services
            </a>
          </div>
        </div>
      </section>

      {/* -- AT A GLANCE -- */}
      <section className="bg-[#F7F3EA] py-12 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Engagement", value: "Recurring retainer" },
              { label: "Pricing", value: "Retainer or commission" },
              { label: "Commitment", value: "12 months recommended" },
              { label: "Built for", value: "Marketing heads & founders" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#9A9AA8] mb-1">{item.label}</p>
                <p className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- SERVICES -- */}
      <section id="services" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#5B3FBE] mb-4">What is in scope</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              Ten services, sold on their own or combined.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              Each service stands alone as a focused retainer or project. The core ones combine into Full-Funnel, our complete programme run as a single quarterly motion.
            </p>
          </div>

          {/* Featured card */}
          <div className="bg-[#2A1B5C] text-[#F7F3EA] rounded-[10px] border-t-[3px] border-t-[#D4A537] p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center mb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4A537] mb-2">The flagship programme</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#F7F3EA] mb-3">
                Full-Funnel Digital Marketing
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#C8B8FF] max-w-[620px]">
                Google Ads, SEO, Meta, email, and reporting run as a single quarterly programme with one point of contact. The complete motion, accountable to one number, with a quarterly business review built in.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/services/digital-marketing/full-funnel-programme"
                className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block whitespace-nowrap"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Nine services — 3-column grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {services.filter((s) => !s.flagship).map((s) => (
              <div
                key={s.slug}
                className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-8 flex flex-col transition-all hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)]"
              >
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-3">{s.name}</h3>
                <p className="text-[14px] leading-[1.6] text-[#3F3F4A] flex-1 mb-6">{s.desc}</p>
                <Link
                  href={`/services/digital-marketing/${s.slug}`}
                  className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] no-underline hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- PRICING -- */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <p className="eyebrow text-[#D4A537] mb-4">How pricing works</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#F7F3EA] mb-4">
              Two pricing models. No third.
            </h2>
            <p className="text-[16px] text-[#C8B8FF] leading-[1.6]">
              Clear from the first conversation. We scope to the channels and goals you actually need, and we index retainers annually rather than springing surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-[10px] border-t-[3px] border-t-[#5B3FBE] p-8 flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9A9AA8] mb-3">The default</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-3">
                Standard retainer
              </h3>
              <p className="text-[15px] text-[#3F3F4A] leading-[1.65] flex-1">
                A monthly fee scoped to the services and channels included. The right model for most clients, with the team allocation matched to your goals.
              </p>
              <div className="border-t border-[#F0F0F6] mt-6 pt-4">
                <p className="text-[13px] text-[#9A9AA8]">For clients with monthly ad spend under &#8377;5 lakh. Indexed annually.</p>
              </div>
            </div>

            <div className="bg-white rounded-[10px] border-t-[3px] border-t-[#D4A537] p-8 flex flex-col">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9A9AA8] mb-3">For larger ad spends</p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-3">
                Commission tier
              </h3>
              <p className="text-[15px] text-[#3F3F4A] leading-[1.65] flex-1">
                A reduced or zero retainer plus a percentage of monthly ad spend or attributed revenue. Our incentives and yours point the same way.
              </p>
              <div className="border-t border-[#F0F0F6] mt-6 pt-4">
                <p className="text-[13px] text-[#9A9AA8]">Reserved for confirmed monthly ad spend of &#8377;5 lakh or more, with clean attribution and a 12-month commitment.</p>
              </div>
            </div>
          </div>

          <p className="text-[15px] text-[#C8B8FF] leading-[1.65] mb-8">
            Two situational models sit alongside these: a{" "}
            <strong className="text-[#F7F3EA]">Project Boost</strong> fixed fee for a focused 4 to 12 week campaign push (launches, admission cycles, exhibitions), and the{" "}
            <strong className="text-[#F7F3EA]">Full-Funnel programme</strong>, a premium retainer with a larger team and a quarterly business review.
          </p>

          <div className="border-l-[4px] border-[#D4A537] pl-7 py-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4A537] mb-3">The commission tier rule</p>
            <p className="text-[15px] text-[#C8B8FF] leading-[1.65]">
              You qualify for the commission tier only with a sustained monthly ad spend of &#8377;5 lakh or more, clean attribution through GA4 or a CRM, and a twelve-month commitment. Everyone else stays on a straightforward retainer, however persuasive the conversation. We would rather be honest than oversell.
            </p>
          </div>
        </div>
      </section>

      {/* -- WHO THIS IS FOR -- */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-14">
            <p className="eyebrow text-[#5B3FBE] mb-4">Who this is for</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(26px,3.6vw,34px)] text-[#2A1B5C] leading-[1.18] mb-3">
              We do our best work with a particular kind of client.
            </h2>
            <p className="text-[16px] text-[#3F3F4A] leading-[1.6]">
              Being clear about fit saves everyone time and leads to better results. Here is where we shine, and where we are not the right choice.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#D8D8DE] border-t-[4px] border-t-[#5B3FBE] rounded-[12px] p-10 shadow-[0_2px_20px_rgba(42,27,92,0.07)] hover:shadow-[0_6px_28px_rgba(42,27,92,0.12)] transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-[10px] h-[10px] rounded-full bg-[#5B3FBE] flex-shrink-0" />
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[21px] text-[#2A1B5C]">A strong fit</h3>
              </div>
              <ul className="space-y-0">
                {[
                  "Revenue between ₹5 Cr and ₹500 Cr, with a marketing function in place but underperforming.",
                  "In education, real estate, or manufacturing. We also take selective work in wellness, finance, travel, and recruitment.",
                  "A team that knows what good looks like, even if the current results do not match.",
                  "Serving clients across India: Mumbai, Bangalore, Hyderabad, Delhi-NCR. Offshore: Europe & USA.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 py-[14px] border-b border-[#EDE9F7] last:border-0 list-none">
                    <span className="mt-[7px] flex-shrink-0 w-[8px] h-[8px] rounded-full bg-[#5B3FBE]" />
                    <span className="text-[15px] leading-[1.65] text-[#3F3F4A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[#D8D8DE] border-t-[4px] border-t-[#9A9AA8] rounded-[12px] p-10 shadow-[0_2px_20px_rgba(42,27,92,0.07)] hover:shadow-[0_6px_28px_rgba(42,27,92,0.12)] transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-[10px] h-[2px] bg-[#9A9AA8] flex-shrink-0" />
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[21px] text-[#9A9AA8]">Not a fit</h3>
              </div>
              <ul className="space-y-0">
                {[
                  "Chasing vanity metrics or expecting monthly miracles.",
                  "Unwilling to share conversion data, which we need to be accountable.",
                  "Looking primarily for influencer marketing, PR distribution, or offline media buying.",
                  "Wanting a vendor to take orders rather than a partner who will ask questions first.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 py-[14px] border-b border-[#EDE9F7] last:border-0 list-none">
                    <span className="mt-[13px] flex-shrink-0 w-[12px] h-[2px] bg-[#9A9AA8]" />
                    <span className="text-[15px] leading-[1.65] text-[#3F3F4A]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* -- PROOF -- */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-8">
            <p className="eyebrow text-[#5B3FBE] mb-4">Proof</p>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">
              What this looks like in practice.
            </h2>
          </div>
          <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-12 grid md:grid-cols-[300px_1fr] gap-12 items-center">
            <div>
              <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(56px,8vw,84px)] text-[#2A1B5C] leading-[0.95]">
                75k+
              </div>
              <hr className="w-[64px] h-[3px] bg-[#D4A537] border-0 my-4" />
              <p className="text-[13px] uppercase tracking-[0.12em] text-[#3F3F4A]">
                Qualified admissions leads a year
              </p>
              <p className="text-[13px] mt-3">
                <span className="text-[#5B3FBE] uppercase tracking-[0.06em] font-semibold text-[12px]">
                  Education · SimpliDistance
                </span>
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-head)] italic text-[clamp(18px,2.4vw,24px)] leading-[1.4] text-[#2A1B5C] mb-6">
                &ldquo;75,000+ qualified admissions enquiries a year at a cost per lead 30 to 40% below benchmark, and four times the growth by Year 3.&rdquo;
              </p>
              <Link
                href="/work/simplidistance-mba-enrollments"
                className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] no-underline hover:underline"
              >
                Read the case study →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -- FINAL CTA -- */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-24 relative overflow-hidden">
        <svg
          className="absolute left-1/2 -translate-x-1/2 bottom-[-360px] w-[680px] h-[680px] pointer-events-none opacity-60"
          aria-hidden="true"
        >
          {[150, 240, 330].map((r, i) => (
            <circle
              key={r}
              cx="340"
              cy="340"
              r={r}
              fill="none"
              stroke={i === 1 ? "#D4A537" : "#7C63D8"}
              strokeWidth="1.5"
              opacity={i === 1 ? 0.65 : 0.4}
            />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#F7F3EA] max-w-[640px] mx-auto mb-4">
            Ready to make your marketing predictable?
          </h2>
          <hr className="w-[64px] h-[3px] bg-[#D4A537] border-0 mx-auto my-6" />
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mx-auto mb-10">
            A thirty-minute discovery call, no obligation. We will tell you honestly whether we are the right fit, and what good would look like for you.
          </p>
          <a
            href="#dm-enquiry"
            className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-9 py-[15px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block"
          >
            Book a discovery call
          </a>
        </div>
      </section>

      {/* -- CONTACT FORM -- */}
      <section id="dm-enquiry" className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <hr className="gold-rule mb-6" />
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,32px)] text-[#2A1B5C] mb-4">
                Ready to build a predictable revenue engine?
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#3F3F4A] mb-6">
                A thirty-minute discovery call, no obligation. We will tell you honestly whether we are the right fit.
              </p>
              <ul className="space-y-3 text-[15px] text-[#3F3F4A]">
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>We respond within one working day</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>Monthly retainer, clearly scoped after discovery</li>
                <li className="flex gap-3 items-start"><span className="text-[#D4A537] font-bold mt-[2px]">&#10003;</span>One team, one invoice, transparent attribution</li>
              </ul>
            </div>
            <DigitalMarketingContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
