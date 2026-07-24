import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Digital Marketing for Professional Services",
  description:
    "MagicWorks works with CA firms, law practices, consultancies, and advisory firms. Trusted advisors advising trusted advisors: AI and digital marketing.",
  alternates: { canonical: "/industries/professional-services" },
  openGraph: {
    url: "https://magicworksitsolutions.com/industries/professional-services",
    title: "Digital Marketing for Professional Services | MagicWorks",
    description:
      "MagicWorks works with CA firms, law practices, consultancies, and advisory firms. Trusted advisors advising trusted advisors.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://magicworksitsolutions.com/industries" },
    { "@type": "ListItem", position: 3, name: "Professional Services", item: "https://magicworksitsolutions.com/industries/professional-services" },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Consultation & Digital Marketing for Professional Services",
  serviceType: "AI Consultation, Digital Marketing",
  description: "AI process audits, AI literacy workshops, and digital marketing for CA firms, law practices, consultancies, and advisory firms.",
  url: "https://magicworksitsolutions.com/industries/professional-services",
  provider: { "@id": "https://magicworksitsolutions.com/#organization" },
  areaServed: { "@type": "Country", name: "India" },
};

const faq = [
  { q: "What can MagicWorks do for a CA firm or law practice?", a: "We offer AI Consultation (process audit and AI literacy workshops designed for partners), LinkedIn and thought leadership content, AI-native websites for digital credibility, and SEO/AEO for practice-area queries. Professional Services is our Priority 2 AI Consultation vertical." },
  { q: "Why is AI Consultation relevant for professional services firms?", a: "Professional services firms have significant automation potential in client onboarding, document review, compliance workflows, and reporting. The right strategy starts from the firm's practice, not from the technology vendor's pitch." },
  { q: "How does the AI advisory work for professional services?", a: "We start with an AI Literacy Workshop to build leadership alignment, then audit your specific processes to identify the highest-value automation opportunities. You choose who implements; we advise independently." },
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
  { title: "AI Process Audit + Roadmap", body: "Identify automation opportunities in client onboarding, document review, compliance workflows, and reporting cycles." },
  { title: "AI Literacy Workshop", body: "Build leadership alignment on AI before committing to any vendor. Designed for partners and senior teams." },
  { title: "LinkedIn & Thought Leadership", body: "Founder-attributed content that establishes authority in your practice area and attracts the right clients." },
  { title: "AI-Native Website", body: "A credibility-first digital presence with intelligent client intake, service pages, and team profiles." },
  { title: "SEO / AEO", body: "Rank for practice-area queries and appear in AI-generated recommendations for professional services." },
  { title: "Email & Nurture", body: "Client education sequences, newsletter programmes, and relationship nurture automation." },
];

export default function ProfessionalServicesPage() {
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
          <p className="eyebrow text-[#D4A537] mb-4">Industry · Professional Services</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[780px]">
            Trusted advisors advising trusted advisors.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px] mt-5 mb-10">
            CA firms, law practices, management consultancies, and advisory firms with 50 or more professionals. We understand how expertise-led businesses grow through reputation, thought leadership, and now, AI.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Book a discovery call
            </Link>
            <Link href="/services/ai-consultation" className="border border-[#F7F3EA] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-white/10 transition-colors">
              AI Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-4">Priority 2 for AI Consultation.</h2>
            <p className="text-[16px] text-[#3F3F4A] mb-4">Professional services firms have more to gain from AI than almost any other sector, and more to lose from the wrong implementation. We help senior partners understand the opportunity, audit the processes most ready for AI, and build a defensible roadmap before committing to any vendor.</p>
            <p className="text-[16px] text-[#3F3F4A]">That is what trusted advisors need from their own advisors: clarity, not hype.</p>
          </div>
          <div className="bg-white border border-[#D8D8DE] border-l-4 border-l-[#D4A537] rounded-[10px] p-8">
            <p className="font-[family-name:var(--font-head)] italic text-[clamp(18px,2.2vw,22px)] text-[#2A1B5C] leading-[1.5]">
              &ldquo;The right AI strategy for a CA firm is not the same as the right AI strategy for a tech startup. We start from your practice, not from the technology.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-10">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C]">What we do for professional services firms.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.title} className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-6">
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
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,28px)] text-[#2A1B5C] mb-10">Frequently asked questions.</h2>
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
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.5vw,34px)] text-[#F7F3EA] max-w-[560px] mx-auto mb-4">Start with a thirty-minute conversation.</h2>
          <p className="text-[16px] text-[#C8B8FF] mb-8 max-w-[440px] mx-auto">No commitment. We will tell you honestly whether and how we can help.</p>
          <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block">
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
