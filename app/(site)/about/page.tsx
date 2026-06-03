import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About MagicWorks",
  description:
    "Founded 2009. AI-first digital marketing agency in Pune. Seventeen years building for ambitious Indian businesses across digital marketing, web development, and AI.",
  alternates: { canonical: "/about" },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About MagicWorks IT Solutions",
  url: "https://magicworksitsolutions.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
    foundingDate: "2009",
    description: "AI-first digital marketing agency in Pune, India.",
    address: { "@type": "PostalAddress", addressLocality: "Pune", addressRegion: "Maharashtra", addressCountry: "IN" },
  },
};

const timeline = [
  { year: "2009", event: "Founded. First client. First lesson in why strategy matters more than tools." },
  { year: "2012", event: "Incorporated as MagicWorks IT Solutions Pvt. Ltd." },
  { year: "2016", event: "Digital marketing becomes the anchor practice. Education sector becomes a priority vertical." },
  { year: "2020", event: "Web development practice formalised. First AI-assisted builds." },
  { year: "2024", event: "AI Consultation launched as a standalone advisory pillar. Manufacturing becomes Priority 1 vertical." },
  { year: "2026", event: "AI-native website stack (Next.js + LLM backend) becomes the default for all new web builds." },
];

const values = [
  { title: "Honest over comfortable", body: "We tell clients what we actually think, including when we are not the right fit. It is a harder sell and a better business." },
  { title: "Compound over campaign", body: "We are not a campaign agency. Every engagement is designed to get better over time, not to reset at renewal." },
  { title: "Specificity over jargon", body: "No vanity metrics, no padded decks. Reports you can actually read. Strategies you can actually explain to your board." },
  { title: "Consultation-only for advisory", body: "Our AI and Platform practices do not bundle advice with implementation. We designed that boundary deliberately to keep the advice honest." },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[680px] h-[680px] pointer-events-none opacity-60" aria-hidden="true">
          {[100, 180, 260, 340, 420].map((r, i) => (
            <circle key={r} cx="340" cy="340" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">About</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[700px]">
            Seventeen years of practice. Evolving with purpose.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[560px] mt-5">
            Founded in 2009. Incorporated 2012. Built on the conviction that human strategy and machine acceleration are not opposites — they are the combination that creates compounding results for ambitious Indian businesses.
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#2A1B5C] mb-5">What we stand for.</h2>
            <p className="text-[16px] text-[#3F3F4A] mb-4">MagicWorks is an AI-first digital marketing agency. We work with ambitious Indian businesses that want predictable revenue from traffic, leads, and operations — not just activity reports.</p>
            <p className="text-[16px] text-[#3F3F4A] mb-4">We are not a campaign factory. We are not a technology vendor. We are a practice: four service pillars, one team, one accountability model, built to compound over time.</p>
            <p className="text-[16px] text-[#3F3F4A]">The word &ldquo;purpose&rdquo; in our tagline is deliberate. Every decision — about which services to offer, which clients to work with, which advice to give — is made against a long-term standard, not a short-term target.</p>
          </div>
          <div className="space-y-5">
            {values.map(v => (
              <div key={v.title} className="border-l-4 border-[#D4A537] pl-5">
                <h3 className="font-semibold text-[15px] text-[#2A1B5C] mb-1">{v.title}</h3>
                <p className="text-[14px] text-[#3F3F4A]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#2A1B5C] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <hr className="gold-rule mb-6" />
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,3vw,30px)] text-[#F7F3EA]">How we got here.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {timeline.map(t => (
              <div key={t.year} className="pt-5 border-t border-white/20">
                <span className="font-[family-name:var(--font-head)] font-bold text-[#D4A537] text-[22px]">{t.year}</span>
                <p className="text-[15px] text-[#C8B8FF] mt-2">{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#F7F3EA] py-16 border-b border-[#D8D8DE]">
        <div className="max-w-[1120px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "17+", cap: "Years of practice" },
            { num: "2009", cap: "Year founded" },
            { num: "4", cap: "Service pillars" },
            { num: "Pune", cap: "Headquartered" },
          ].map(s => (
            <div key={s.num}>
              <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,40px)] text-[#2A1B5C] leading-none">{s.num}</div>
              <p className="text-[13px] text-[#3F3F4A] mt-2">{s.cap}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#EDE9F7] py-16">
        <div className="max-w-[1120px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-1">Ready to work together?</h2>
            <p className="text-[15px] text-[#3F3F4A]">Or explore what we have built.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link href="/contact" className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[13px] rounded-full no-underline hover:scale-[1.02] transition-transform">
              Book a discovery call
            </Link>
            <Link href="/about/careers" className="border border-[#5B3FBE] text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[13px] rounded-full no-underline hover:bg-[#5B3FBE] hover:text-white transition-colors">
              View open roles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
