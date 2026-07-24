import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Marketing for Education Institutes",
  description:
    "MagicWorks helps education businesses generate high-intent student enquiries. See how we drove 75,000+ qualified leads per year for SimpliDistance.",
  alternates: { canonical: "/industries/education" },
  openGraph: {
    url: "https://magicworksitsolutions.com/industries/education",
    title: "Digital Marketing for Education Institutes | MagicWorks",
    description:
      "MagicWorks helps education businesses generate high-intent student enquiries. See how we drove 75,000+ qualified leads per year for SimpliDistance.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://magicworksitsolutions.com/industries" },
    { "@type": "ListItem", position: 3, name: "Education", item: "https://magicworksitsolutions.com/industries/education" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Marketing for Education",
  serviceType: "Digital Marketing",
  description: "Lead generation, SEO, paid media, and AI-native websites for schools, colleges, and edtech companies in India.",
  url: "https://magicworksitsolutions.com/industries/education",
  provider: { "@id": "https://magicworksitsolutions.com/#organization" },
  areaServed: { "@type": "Country", name: "India" },
};

const faq = [
  { q: "How does MagicWorks generate student enquiries?", a: "We run Google Search campaigns targeting active course seekers, Meta Ads timed to admission cycles, SEO for sustained organic pipeline, and AI-native websites built for conversion. Our anchor case study is SimpliDistance: 75,000+ qualified admissions leads per year at 30–40% below benchmark CPL." },
  { q: "What makes your education marketing different?", a: "We understand admission cycles and programme-level targeting. We distinguish between a click, an enquiry, and an enrolment-ready lead, and we build campaigns around that distinction." },
  { q: "Do you work with online and distance education providers?", a: "Yes. SimpliDistance, our longest-running education client, is India's fastest-growing portal for distance and online MBA admissions." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const services = [
  { title: "Google Ads & Search Marketing", body: "Capture students actively searching for courses, programmes, and admissions. Deep intent targeting aligned to course type and admission timelines." },
  { title: "SEO / AEO", body: "Rank for high-intent queries and appear in AI-generated answer results. Build long-term organic enquiry pipelines." },
  { title: "Meta Ads", body: "Awareness and retargeting campaigns across Facebook and Instagram, timed to admission cycles and open days." },
  { title: "AI-Native Websites", body: "Conversational lead capture, intelligent course finders, and admission-focused landing pages built on Next.js." },
  { title: "GMB Optimisation", body: "Local search presence for physical campuses, centres, and offices." },
  { title: "Email & Nurture", body: "Lifecycle automation from first enquiry to enrolment confirmation." },
];

export default function EducationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">Industry · Education</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[780px]">
            High-intent student enquiries, compounding year on year.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            Education is one of our deepest verticals. We understand admission cycles, programme-level targeting, and the difference between a click and an enrolment-ready lead.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Book a discovery call
            </Link>
            <Link href="/work" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              See case studies
            </Link>
          </div>
        </div>
      </section>

      {/* Anchor case study */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <hr className="gold-rule mb-6" />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-10">
            What this looks like in practice.
          </h2>
          <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-10 grid md:grid-cols-[260px_1fr] gap-10 items-center">
            <div>
              <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(52px,7vw,76px)] text-[#2A1B5C] leading-[0.95]">75,000+</div>
              <p className="text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mt-2">Qualified leads per year</p>
              <p className="text-[12px] mt-3 text-[#5B3FBE] uppercase tracking-[0.06em] font-semibold">SimpliDistance · Education</p>
            </div>
            <div>
              <p className="text-[16px] text-[#3F3F4A] mb-6">India's fastest-growing portal for distance and online MBA admissions. Google Search-first performance marketing framework. 4–8% admission conversion rate, 30–40% below benchmark CPL, 4x growth by Year 3.</p>
              <div className="grid grid-cols-3 gap-4">
                {[{ v: "4–8%", l: "Admission conversion rate" }, { v: "30–40%", l: "Below benchmark CPL" }, { v: "4x", l: "Growth by Year 3" }].map(m => (
                  <div key={m.v} className="bg-[#F7F3EA] rounded-[8px] p-4 border border-[#D8D8DE]">
                    <div className="font-[family-name:var(--font-head)] font-bold text-[24px] text-[#2A1B5C]">{m.v}</div>
                    <p className="text-[12px] text-[#3F3F4A] mt-1">{m.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-10">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C]">
              How we work with education businesses.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.title} className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-6">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mb-2">{s.title}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[780px] mx-auto px-8">
          <hr className="gold-rule mb-6" />
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-10">
            Frequently asked questions.
          </h2>
          <div className="article-faq flex flex-col gap-6">
            {faq.map((f) => (
              <div key={f.q} className="border-b border-[#D8D8DE] pb-6">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mb-2">{f.q}</h3>
                <p className="text-[15px] text-[#3F3F4A] leading-[1.6]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] text-center py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.5vw,34px)] text-[#F7F3EA] max-w-[560px] mx-auto mb-4">
            Ready to build an enrolment machine?
          </h2>
          <p className="text-[16px] text-[#C8B8FF] mb-8 max-w-[440px] mx-auto">Thirty minutes to understand your admission cycle and goals.</p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
