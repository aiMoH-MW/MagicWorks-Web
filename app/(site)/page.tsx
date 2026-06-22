import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MagicWorks · AI-First Digital Marketing Agency in Pune",
  description:
    "Human strategy, machine acceleration. We turn traffic, leads, and operations into predictable revenue for ambitious Indian businesses. Book a discovery call.",
  alternates: { canonical: "/" },
};

const pillars = [
  {
    num: "01",
    type: "execution",
    label: "Execution",
    title: "Digital Marketing",
    body: "Predictable revenue from traffic and leads. Search, social, SEO, AEO, and full-funnel programmes on a monthly retainer, with a commission tier for larger ad spends.",
    href: "/services/digital-marketing",
  },
  {
    num: "02",
    type: "execution",
    label: "Execution",
    title: "Web Development",
    body: "AI-native websites that compound brand and conversion. Built on Next.js to generate enquiries, not just to look good. Our default since June 2026.",
    href: "/services/web-development",
  },
  {
    num: "03",
    type: "advisory",
    label: "Advisory: consultation only",
    title: "AI Consultation",
    body: "A clear, defensible AI roadmap. We advise and design the path. You decide who builds it. Independent advice, no bundling.",
    href: "/services/ai-consultation",
  },
  {
    num: "04",
    type: "advisory",
    label: "Advisory: consultation only",
    title: "Marketplace & Platform Consultation",
    body: "Founder-led judgment for portal and platform builders. Independent advice, no bundling, no conflict of interest.",
    href: "/services/platform-consultation",
  },
];

const stats = [
  { num: "17+", cap: "Years building for Indian businesses" },
  { num: "75,000+", cap: "Qualified leads per year for one education client" },
  { num: "4", cap: "Service pillars, one accountable team" },
  { num: "5", cap: "Working days to strategy and proposal" },
];

const steps = [
  { n: "01", t: "Discovery", d: "Thirty minutes to understand your business and goals." },
  { n: "02", t: "Strategy", d: "A clear proposal in five working days, no padding." },
  { n: "03", t: "Onboarding", d: "Access, brand alignment, and kick-off." },
  { n: "04", t: "Execution", d: "Build, launch, improve, with weekly and monthly reviews." },
  { n: "05", t: "Reporting", d: "Reports you can actually read." },
];

const industries = [
  { label: "Education", href: "/industries/education" },
  { label: "Real Estate", href: "/industries/real-estate" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Professional Services", href: "/industries/professional-services" },
];

const faq = [
  {
    q: "What does MagicWorks do?",
    a: "MagicWorks is an AI-first digital marketing agency in Pune. We offer four services: digital marketing, web development, AI consultation, and marketplace and platform consultation, for ambitious Indian businesses.",
  },
  {
    q: "Where is MagicWorks based?",
    a: "Headquartered in Pune, with active clients in Mumbai, Bangalore, Hyderabad, and Delhi-NCR, and growing presence across Europe and the USA.",
  },
  {
    q: "What makes MagicWorks AI-first?",
    a: "We build AI into how we work (from AI-native websites to answer-engine optimisation and an AI consultation practice) rather than treating it as an add-on.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://magicworksitsolutions.com/#organization",
  name: "MagicWorks IT Solutions Pvt. Ltd.",
  url: "https://magicworksitsolutions.com",
  logo: "https://magicworksitsolutions.com/logo.png",
  foundingDate: "2009",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: ["https://linkedin.com/company/magicworks-it-solutions"],
  description:
    "AI-first digital marketing agency in Pune. Digital marketing, web development, AI consultation, and platform consultation for ambitious Indian businesses.",
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://magicworksitsolutions.com/#website",
  name: "MagicWorks IT Solutions",
  url: "https://magicworksitsolutions.com",
  description:
    "AI-first digital marketing agency in Pune. Digital marketing, web development, AI consultation, and platform consultation for ambitious Indian businesses.",
  publisher: { "@id": "https://magicworksitsolutions.com/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://magicworksitsolutions.com/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://magicworksitsolutions.com/",
  url: "https://magicworksitsolutions.com/",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".eyebrow", "h2"],
  },
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg
          className="absolute right-[-200px] top-[-160px] w-[760px] h-[760px] pointer-events-none opacity-70 hidden sm:block"
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
          <p className="eyebrow text-[#D4A537] mb-4">
            AI-first digital marketing agency · Pune
          </p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(40px,6vw,62px)] leading-[1.08] tracking-[-0.01em] text-[#F7F3EA] max-w-[820px] mt-3">
            Human strategy.
            <br />
            Machine acceleration.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-6 mb-10">
            We turn traffic, leads, and operations into predictable revenue for
            ambitious Indian businesses. Four service pillars, one team, built
            to compound over time.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <Link
              href="/contact"
              className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform"
            >
              Book a discovery call
            </Link>
            <Link
              href="/services"
              className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="bg-[#F7F3EA] py-16 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="text-center text-[12px] uppercase tracking-[0.16em] text-[#9A9AA8] mb-8">
            17+ years of practice. Trusted across three priority industries.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.num} className="text-center">
                <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,4vw,44px)] text-[#2A1B5C] leading-none">
                  {s.num}
                </div>
                <p className="text-[13px] text-[#3F3F4A] mt-2">{s.cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              Four pillars. Two that deliver, two that advise.
            </h2>
            <p className="text-[16px] text-[#3F3F4A]">
              Digital Marketing and Web Development produce work you can buy as a
              deliverable. AI Consultation and Platform Consultation produce
              judgment: we advise and design the roadmap, and you stay free to
              choose who builds it. The boundary is deliberate, and it keeps our
              advice honest.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div
                key={p.num}
                className={`bg-white border border-[#D8D8DE] rounded-[10px] p-8 relative transition-all hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)] ${
                  p.type === "execution"
                    ? "border-t-[3px] border-t-[#5B3FBE]"
                    : "border-t-[3px] border-t-[#D4A537]"
                }`}
              >
                <span
                  className={`absolute top-8 right-8 text-[10px] font-bold uppercase tracking-[0.12em] ${
                    p.type === "execution" ? "text-[#5B3FBE]" : "text-[#9a7b1f]"
                  }`}
                >
                  {p.label}
                </span>
                <p className="font-[family-name:var(--font-head)] font-bold text-[14px] text-[#9A9AA8] tracking-[0.1em]">
                  {p.num}
                </p>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mt-1 mb-3">
                  {p.title}
                </h3>
                <p className="text-[15px] text-[#3F3F4A] mb-6">{p.body}</p>
                <Link
                  href={p.href}
                  className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] no-underline hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#F7F3EA] mb-3">
              A clear process, from first conversation to ongoing growth.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="pt-6 border-t-2 border-[#D4A537]">
                <span className="font-[family-name:var(--font-head)] font-bold text-[30px] text-[#F7F3EA] leading-none">
                  {s.n}
                </span>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] mt-3 mb-1">
                  {s.t}
                </h3>
                <p className="text-[13.5px] text-[#C8B8FF]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY SPOTLIGHT */}
      <section className="bg-[#F7F3EA] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-8">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C]">
              Results that speak plainly.
            </h2>
          </div>
          <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-5 sm:p-12 grid md:grid-cols-[280px_1fr] gap-8 sm:gap-12 items-center">
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
                30 to 40% below benchmark cost per lead. 4x growth by Year 3.
                One team, one accountability model, compounding year on year.
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
                {[
                  { v: "4x", l: "Growth by Year 3" },
                  { v: "30–40%", l: "Below benchmark CPL" },
                  { v: "1", l: "Accountable team" },
                ].map((m) => (
                  <div key={m.v} className="bg-[#F7F3EA] rounded-[10px] p-3 sm:p-4 border border-[#D8D8DE]">
                    <div className="font-[family-name:var(--font-head)] font-bold text-[20px] sm:text-[28px] text-[#2A1B5C] leading-tight">
                      {m.v}
                    </div>
                    <p className="text-[11px] sm:text-[13px] text-[#3F3F4A] mt-1 leading-tight">{m.l}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/work"
                className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] no-underline hover:underline"
              >
                See all case studies →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-8">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.4vw,30px)] text-[#2A1B5C] mb-3">
              We go deep in a focused set of sectors.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {industries.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="inline-flex items-center border border-[#5B3FBE] text-[#5B3FBE] bg-white rounded-full px-6 py-3 text-[14px] font-medium no-underline hover:bg-[#5B3FBE] hover:text-white transition-colors"
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-8">
            Common questions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {faq.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-[15px] text-[#2A1B5C] mb-2">{f.q}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-24 relative overflow-hidden">
        <svg
          className="absolute left-1/2 -translate-x-1/2 bottom-[-360px] w-[680px] h-[680px] pointer-events-none opacity-70 hidden sm:block"
          aria-hidden="true"
        >
          {[120, 200, 280, 360].map((r, i) => (
            <circle
              key={r}
              cx="340"
              cy="340"
              r={r}
              fill="none"
              stroke={i === 1 ? "#D4A537" : "#7C63D8"}
              strokeWidth="1.5"
              opacity={i === 1 ? 0.7 : 0.45}
            />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <hr className="gold-rule mx-auto mb-8" style={{ margin: "0 auto 2rem" }} />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,38px)] text-[#F7F3EA] max-w-[640px] mx-auto mb-4">
            Let us build the next chapter together.
          </h2>
          <p className="text-[18px] text-[#C8B8FF] max-w-[520px] mx-auto mb-10">
            A thirty-minute discovery call, no obligation. We will tell you
            honestly whether we are the right fit.
          </p>
          <Link
            href="/contact"
            className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[16px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block"
          >
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
