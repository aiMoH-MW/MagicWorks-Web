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
    name: "Full-Funnel Programme",
    desc: "Our flagship engagement: strategy, execution, and attribution across every channel, in one accountable programme.",
    flagship: true,
  },
  {
    slug: "google-ads-search-marketing",
    name: "Google Ads & Search Marketing",
    desc: "Search, Performance Max, and Shopping campaigns built for qualified cost per lead, not spend volume.",
    flagship: false,
  },
  {
    slug: "seo-aeo",
    name: "Search Engine Optimization (SEO) & Answer Engine Optimization (AEO)",
    desc: "Rank in search engines and appear in AI-generated answers. Technical, on-page, and entity optimisation.",
    flagship: false,
  },
  {
    slug: "gmb-optimisation",
    name: "GMB Optimisation",
    desc: "Google Business Profile management to win the local pack and drive walk-ins, calls, and direction requests.",
    flagship: false,
  },
  {
    slug: "youtube-video-optimisation",
    name: "YouTube Video Optimisation",
    desc: "Video SEO, ad placement, and channel strategy to extend reach beyond search into intent-rich video audiences.",
    flagship: false,
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    desc: "Facebook and Instagram campaigns that move buyers from awareness to enquiry with clear funnel logic.",
    flagship: false,
  },
  {
    slug: "linkedin-organic-social",
    name: "LinkedIn & Organic Social",
    desc: "B2B credibility and community-building through consistent, on-brand content across LinkedIn and social platforms.",
    flagship: false,
  },
  {
    slug: "thought-leadership-geo",
    name: "Thought Leadership & GEO",
    desc: "Generative Engine Optimisation: content structured to be cited by AI assistants and LLMs, not just ranked in Google.",
    flagship: false,
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    desc: "Nurture sequences, broadcast campaigns, and lifecycle automation that convert leads into pipeline.",
    flagship: false,
  },
  {
    slug: "site-performance-conversion",
    name: "Site Performance & Conversion",
    desc: "Core Web Vitals, landing page optimisation, and CRO testing to extract more value from existing traffic.",
    flagship: false,
  },
];

const faq = [
  {
    q: "How much does digital marketing cost at MagicWorks?",
    a: "Our standard retainer is scoped to the channels and goals agreed at discovery; price depends on the mix of services, ad spend managed, and reporting depth. For confirmed ad spend of ?5 lakh or more per month, we offer a commission tier that aligns our incentives with your growth. Final pricing is set after the discovery call.",
  },
  {
    q: "Do you require a long contract?",
    a: "We recommend twelve months because marketing compounds: search authority, audience data, and creative learnings all build on each other. We will tell you that honestly rather than locking you into short cycles that prevent real results.",
  },
  {
    q: "Which industries do you focus on?",
    a: "Our deepest practice is in education, real estate, and manufacturing. These are the sectors where we have the most benchmarks, the most referenceability, and the clearest sense of what good looks like.",
  },
  {
    q: "Do you guarantee leads or rankings?",
    a: "No. Anyone who guarantees a specific number of leads or a ranking position is either unaware of how these channels work or is not being honest with you. What we guarantee is sound method, transparent attribution, and honest monthly reporting.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Marketing",
  provider: {
    "@type": "Organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
  },
  areaServed: "IN",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://magicworksitsolutions.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://magicworksitsolutions.com/services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Digital Marketing",
      item: "https://magicworksitsolutions.com/services/digital-marketing",
    },
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

      {/* HERO */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-32 pb-24 relative overflow-hidden">
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
          {/* Breadcrumb */}
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
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-6 mb-10">
            Performance marketing, SEO, social, and content, run by one
            accountable team on a monthly retainer. We measure every engagement
            against the number that matters to your business, never vanity
            metrics.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a
              href="#dm-enquiry"
              className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform"
            >
              Book a discovery call
            </a>
            <Link
              href="/work"
              className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* AT A GLANCE STRIP */}
      <section className="bg-[#F7F3EA] py-12 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#9A9AA8] mb-8">
            At a glance
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Engagement type", value: "Monthly retainer" },
              { label: "Pricing", value: "Retainer or commission" },
              { label: "Recommended term", value: "12 months" },
              { label: "Buyers", value: "Marketing heads & founders" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#9A9AA8] mb-1">
                  {item.label}
                </p>
                <p className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEN SERVICES GRID */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              Ten services. One team. One invoice.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              Each service is available individually or combined into our
              Full-Funnel Programme: one accountable engagement that spans every
              channel your buyers use.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.slug}
                className={`bg-white rounded-[10px] p-8 relative transition-all hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)] ${
                  s.flagship
                    ? "border border-[#D4A537] border-t-[3px] border-t-[#D4A537]"
                    : "border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE]"
                }`}
              >
                {s.flagship && (
                  <span className="absolute top-8 right-8 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D4A537]">
                    Flagship
                  </span>
                )}
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-3">
                  {s.name}
                </h3>
                <p className="text-[15px] text-[#3F3F4A] mb-6">{s.desc}</p>
                <Link
                  href={`/services/digital-marketing/${s.slug}`}
                  className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] no-underline hover:underline"
                >
                  Learn more ?
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#F7F3EA] mb-3">
              Two honest pricing models.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 border border-white/20 rounded-[10px] p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-4">
                Standard retainer
              </p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#F7F3EA] mb-4">
                Monthly fee, clearly scoped.
              </h3>
              <p className="text-[15px] text-[#C8B8FF] leading-[1.6]">
                For businesses with ad spend under ?5 lakh per month. Scoped
                monthly fee, indexed annually.
              </p>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-[10px] p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-4">
                Commission tier
              </p>
              <h3 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#F7F3EA] mb-4">
                Aligned incentives at scale.
              </h3>
              <p className="text-[15px] text-[#C8B8FF] leading-[1.6]">
                For confirmed ad spend of ?5 lakh or more per month. Clean
                attribution, twelve-month commitment required.
              </p>
            </div>
          </div>
          <div className="bg-[#D4A537]/15 border border-[#D4A537]/40 rounded-[10px] p-8">
            <p className="text-[14px] text-[#F7F3EA] leading-[1.65]">
              <span className="font-bold text-[#D4A537]">Note: </span>
              The commission tier requires confirmed ad spend of ?5L or more per
              month and a twelve-month commitment. Final pricing set after
              discovery call.
            </p>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-8">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">
              Results that speak plainly.
            </h2>
          </div>
          <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-12 grid md:grid-cols-[280px_1fr] gap-12 items-center">
            <div>
              <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(56px,8vw,84px)] text-[#2A1B5C] leading-[0.95]">
                75,000+
              </div>
              <p className="text-[13px] uppercase tracking-[0.12em] text-[#3F3F4A] mt-3">
                Qualified leads per year
              </p>
              <p className="text-[13px] mt-4">
                <span className="text-[#5B3FBE] uppercase tracking-[0.06em] font-semibold text-[12px]">
                  SimpliDistance · Education
                </span>
              </p>
            </div>
            <div>
              <p className="text-[16px] text-[#3F3F4A] mb-6">
                High-intent search advertising scaled MBA enrolments year on year.
                One attribution model, compounding lead growth, cost per lead held
                30–40% below category benchmark through Year 3.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { v: "75,000+", l: "Qualified leads per year" },
                  { v: "4–8%", l: "Admission conversion rate" },
                  { v: "30–40%", l: "Below benchmark CPL" },
                  { v: "4×", l: "Lead growth by Year 3" },
                ].map((m) => (
                  <div
                    key={m.l}
                    className="bg-[#F7F3EA] rounded-[10px] p-4 border border-[#D8D8DE]"
                  >
                    <div className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C]">
                      {m.v}
                    </div>
                    <p className="text-[13px] text-[#3F3F4A] mt-1">{m.l}</p>
                  </div>
                ))}
              </div>
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

      {/* FAQ */}
      <section className="bg-[#EDE9F7] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-8">
            Common questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faq.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-[15px] text-[#2A1B5C] mb-2">
                  {f.q}
                </h3>
                <p className="text-[14px] text-[#3F3F4A] leading-[1.65]">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INLINE CONTACT FORM */}
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
