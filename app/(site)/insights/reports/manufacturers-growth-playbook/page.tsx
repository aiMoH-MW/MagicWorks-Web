import type { Metadata } from "next";
import Link from "next/link";
import GateForm from "./_GateForm";

export const metadata: Metadata = {
  title: "The Manufacturer's Growth Playbook (Free) · From Referrals to Predictable Inbound · MagicWorks",
  description:
    "Free playbook for Indian manufacturers: move from referrals to predictable inbound, the channels that actually work, and where AI fits. Practical, honest. Download with your email.",
  alternates: {
    canonical: "/insights/reports/manufacturers-growth-playbook",
  },
  openGraph: {
    title: "The Manufacturer's Growth Playbook · MagicWorks",
    description:
      "From referrals to predictable inbound, and where AI fits. Built for Indian manufacturers.",
    type: "website",
  },
};

const PILLARS = [
  {
    num: "01",
    title: "Why referrals hit a ceiling",
    body: "The honest reason relationship-led growth caps out, and what replaces it.",
  },
  {
    num: "02",
    title: "How buyers buy now",
    body: "Long, technical, multi-stakeholder, and shaped online before they ever call.",
  },
  {
    num: "03",
    title: "The growth foundation",
    body: "A site that proves you deliver, findability, and enquiry capture that does not leak.",
  },
  {
    num: "04",
    title: "The channels that work",
    body: "The few intent-driven channels that fit technical, long-cycle buying.",
  },
  {
    num: "05",
    title: "Where AI genuinely helps",
    body: "Quoting, proposals, buyer questions, and knowledge. Not gimmicks.",
  },
  {
    num: "+",
    title: "90-day plan & checklist",
    body: "A realistic sequence from referral-led to a working engine, plus a one-page checklist.",
    gold: true,
  },
];

const LEARNINGS = [
  "Why referrals cap your growth, and what to build instead",
  "How technical buyers research and shortlist suppliers",
  "The website and findability foundation to fix first",
  "The few channels that actually work for manufacturers",
  "How to capture and follow up enquiries so none leak",
  "Where AI pays off, starting with quoting and enquiries",
  "A 90-day plan to a working demand engine",
  "The myths and vanity metrics to ignore",
];

const FAQ = [
  {
    q: "Does digital marketing really work for manufacturing?",
    a: "Yes, when it is built for how manufacturers are bought from: long cycles, technical buyers, and high-value deals. The intent-driven channels, done properly, bring qualified enquiries.",
  },
  {
    q: "Is it really free?",
    a: "Yes. We email you the PDF in exchange for your details, and occasionally share relevant insights. You can unsubscribe anytime.",
  },
  {
    q: "How long before we see results?",
    a: "Foundational fixes can lift enquiries within weeks, but manufacturing cycles are long, so the real engine builds over a few months and then compounds. Treat it as a system, not a campaign.",
  },
  {
    q: "Where does AI actually help a manufacturer?",
    a: "Mostly in the work around the sale: faster quoting, proposals and documents, answering buyer questions, and internal knowledge. Start with one clear use case and keep a human in the loop.",
  },
  {
    q: "Will this replace our sales team?",
    a: "No. It brings them better enquiries and removes busywork. Manufacturing deals are still won on trust and relationships, which your people own.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://magicworksitsolutions.com/insights/reports/manufacturers-growth-playbook",
      name: "The Manufacturer's Growth Playbook",
      description:
        "From referrals to predictable inbound, and where AI fits. A practical playbook for Indian manufacturers.",
      isPartOf: {
        "@type": "WebSite",
        name: "MagicWorks IT Solutions",
        url: "https://magicworksitsolutions.com",
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com/" },
        { "@type": "ListItem", position: 2, name: "Insights", item: "https://magicworksitsolutions.com/insights" },
        { "@type": "ListItem", position: 3, name: "Reports", item: "https://magicworksitsolutions.com/insights/reports" },
        {
          "@type": "ListItem",
          position: 4,
          name: "Manufacturer's Growth Playbook",
          item: "https://magicworksitsolutions.com/insights/reports/manufacturers-growth-playbook",
        },
      ],
    },
    {
      "@type": "Report",
      name: "The Manufacturer's Growth Playbook",
      headline: "From referrals to predictable inbound, and where AI fits",
      about: ["Manufacturing marketing", "Lead generation", "B2B demand generation", "SEO", "AI in manufacturing"],
      audience: {
        "@type": "Audience",
        audienceType: "Founders, managing directors, and sales heads at Indian manufacturing businesses",
      },
      numberOfPages: 7,
      inLanguage: "en-IN",
      isAccessibleForFree: true,
      author: { "@type": "Organization", name: "MagicWorks IT Solutions Pvt. Ltd." },
      publisher: {
        "@type": "Organization",
        name: "MagicWorks IT Solutions Pvt. Ltd.",
        url: "https://magicworksitsolutions.com",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function ManufacturersGrowthPlaybookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero + Gate ────────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-24 relative overflow-hidden">
        <svg
          className="absolute right-[-220px] bottom-[-260px] w-[640px] h-[640px] pointer-events-none"
          viewBox="0 0 640 640"
          aria-hidden="true"
        >
          <circle cx="320" cy="320" r="310" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
          <circle cx="320" cy="320" r="225" fill="none" stroke="#D4A537" strokeWidth="1.5" opacity="0.7" />
          <circle cx="320" cy="320" r="140" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-[13px] text-[#C8B8FF] mb-6">
            <Link href="/" className="hover:text-[#D4A537] transition-colors no-underline text-[#C8B8FF]">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/insights" className="hover:text-[#D4A537] transition-colors no-underline text-[#C8B8FF]">Insights</Link>
            <span className="opacity-50">/</span>
            <Link href="/insights/reports" className="hover:text-[#D4A537] transition-colors no-underline text-[#C8B8FF]">Reports</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Manufacturer&apos;s Growth Playbook</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
            {/* Left col */}
            <div>
              <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#D4A537] mb-4">
                Free Playbook · 2026
              </span>
              <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(30px,4.4vw,46px)] leading-[1.12] text-[#F7F3EA] my-4">
                The Manufacturer&apos;s Growth Playbook
              </h1>
              <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mb-8">
                Move from referrals to predictable inbound. The channels that actually work for
                manufacturers, and an honest view of where AI fits. Built for how technical buyers
                really buy.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["7 pages", "9 min read", "MDs, founders & sales heads"].map((c) => (
                  <span
                    key={c}
                    className="text-[12px] font-semibold text-[#F7F3EA] bg-white/[0.08] border border-white/[0.16] rounded-full px-3.5 py-[7px]"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <ul className="list-none space-y-1">
                {[
                  "A path from referral-led to a predictable demand engine",
                  "The few channels that work for technical, long-cycle buyers",
                  "Where AI genuinely helps, and where it does not",
                ].map((b) => (
                  <li key={b} className="relative pl-6 py-1.5 text-[15px] text-[#F7F3EA]">
                    <span className="absolute left-0 top-[13px] w-2 h-2 rounded-full bg-[#D4A537]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gate form card */}
            <div id="get">
              <div className="bg-white rounded-[14px] border-t-[4px] border-t-[#D4A537] shadow-[0_24px_60px_rgba(0,0,0,0.28)] p-12">
                <GateForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's Inside ─────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#5B3FBE] mb-3">
              What is inside
            </span>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#2A1B5C] mt-3">
              A demand engine, built for manufacturers.
            </h2>
            <p className="text-[18px] leading-[1.55] text-[#3F3F4A] mt-3">
              The foundation, the channels, where AI fits, a 90-day plan, and a one-page checklist.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div
                key={p.num}
                className={`bg-white border border-[#D8D8DE] border-t-[3px] ${
                  p.gold ? "border-t-[#D4A537]" : "border-t-[#5B3FBE]"
                } rounded-[10px] p-8`}
              >
                <div className="font-[family-name:var(--font-head)] font-bold text-[13px] text-[#D4A537]">
                  {p.num}
                </div>
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mt-1.5 mb-2">
                  {p.title}
                </h3>
                <p className="text-[14px] text-[#3F3F4A]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ─────────────────────────────────────────────── */}
      <section className="bg-[#EDE9F7] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-12">
            <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#5B3FBE] mb-3">
              What you will learn
            </span>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#2A1B5C] mt-3">
              Win qualified enquiries you can predict.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-1">
            {LEARNINGS.map((l) => (
              <div key={l} className="relative pl-8 py-2 text-[15.5px] text-[#1A1A22]">
                <span className="absolute left-0 top-[14px] w-[9px] h-[9px] rounded-full border-2 border-[#5B3FBE]" />
                {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="relative">
            <svg
              className="absolute left-[-200px] top-[-160px] w-[520px] h-[520px] pointer-events-none"
              viewBox="0 0 520 520"
              aria-hidden="true"
            >
              <circle cx="260" cy="260" r="250" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
              <circle cx="260" cy="260" r="180" fill="none" stroke="#D4A537" strokeWidth="1.5" opacity="0.7" />
              <circle cx="260" cy="260" r="110" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
            </svg>
            <div className="relative grid md:grid-cols-[auto_1fr] gap-12 items-center">
              <div>
                <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(36px,5.2vw,56px)] text-[#D4A537] leading-tight">
                  17
                </div>
                <div className="text-[14px] font-semibold text-[#C8B8FF] tracking-[0.03em] mt-2 max-w-[250px]">
                  years growing Indian businesses, manufacturing among them
                </div>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[26px] text-[#F7F3EA] mb-3">
                  Built for how manufacturers actually buy.
                </h2>
                <p className="text-[#C8B8FF] max-w-[560px] leading-[1.6]">
                  We have spent seventeen years helping Indian businesses grow, and manufacturing is
                  one of the sectors we focus on. We deliver the marketing and advise on AI
                  independently, so the plan fits long cycles and technical buyers, not borrowed
                  consumer tactics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who It's For ──────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="bg-white border border-[#D8D8DE] border-l-[4px] border-l-[#D4A537] rounded-[10px] p-12">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[24px] text-[#2A1B5C] mb-3">
              Who it is for
            </h2>
            <p className="text-[18px] leading-[1.55] text-[#3F3F4A] max-w-[720px]">
              Founders, managing directors, and sales heads at Indian manufacturing businesses that
              have grown on referrals and relationships, and want a more predictable way to win new
              enquiries, with an honest view of where AI actually helps. If that is you, this is
              written for you.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="max-w-[680px] mb-10">
            <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#5B3FBE] mb-3">
              Questions
            </span>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#2A1B5C] mt-3">
              Before you download
            </h2>
          </div>
          <div>
            {FAQ.map(({ q, a }) => (
              <details key={q} className="group border-t border-[#D8D8DE] last:border-b">
                <summary className="flex justify-between items-center gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C]">
                  {q}
                  <span className="flex-none w-5 h-5 relative">
                    <span className="absolute top-[9px] left-0 w-5 h-[2px] bg-[#D4A537]" />
                    <span className="absolute top-0 left-[9px] w-[2px] h-5 bg-[#D4A537] transition-transform duration-200 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="text-[15.5px] text-[#3F3F4A] pb-6 leading-[1.6]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-[#EDE9F7] py-24 text-center">
        <div className="max-w-[1120px] mx-auto px-8">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,30px)] text-[#2A1B5C] max-w-[600px] mx-auto">
            Stop depending on referrals alone.
          </h2>
          <div className="w-16 h-[3px] bg-[#D4A537] mx-auto my-6" />
          <p className="text-[#3F3F4A] max-w-[520px] mx-auto mb-8">
            Download the playbook and start building a predictable demand engine.
          </p>
          <a
            href="#get"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[15px] rounded-full hover:scale-[1.02] transition-transform no-underline"
          >
            Get the playbook
          </a>
        </div>
      </section>
    </>
  );
}
