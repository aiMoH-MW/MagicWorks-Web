import type { Metadata } from "next";
import Link from "next/link";
import GateForm from "./_GateForm";

export const metadata: Metadata = {
  title: "Platform Strategy Checklist (Free) · 22 Decisions Before You Build · MagicWorks",
  description:
    "Free checklist for marketplace and platform founders: the 22 decisions that determine whether a platform works, from business model to cold start to defensibility. Download with your email.",
  alternates: {
    canonical: "/insights/reports/platform-strategy-checklist",
  },
  openGraph: {
    title: "The Platform Strategy Checklist · MagicWorks",
    description:
      "22 decisions to make before you build a marketplace or platform. Founder-led, for Indian businesses.",
    type: "website",
  },
};

const PILLARS = [
  {
    num: "01 · decisions 1–4",
    title: "The business model",
    body: "The core transaction, how you earn, the harder side, and unit economics.",
  },
  {
    num: "02 · decisions 5–8",
    title: "Liquidity & cold start",
    body: "Which side first, the cold-start plan, where to start narrow, single-player value.",
  },
  {
    num: "03 · decisions 9–12",
    title: "Trust, quality & money",
    body: "Verification, curation, disintermediation, and how money moves and complies.",
  },
  {
    num: "04 · decisions 13–16",
    title: "Product & build",
    body: "The MVP, build versus no-code, matching and discovery, mobile or web.",
  },
  {
    num: "05 · decisions 17–19",
    title: "Go-to-market & growth",
    body: "Acquiring each side, incentives and the path off them, the metrics that matter.",
  },
  {
    num: "06 · decisions 20–22",
    title: "Defensibility & risk",
    body: "Moat and network effects, regulation and DPDP, capital and milestones. Plus the checklist.",
    gold: true,
  },
];

const LEARNINGS = [
  "How to name your core transaction and business model",
  "Which side to build first, and why",
  "How to plan for cold start, where most platforms die",
  "How to design trust, quality, and money flow",
  "How to scope an MVP and decide build versus no-code",
  "The metrics that matter, not the vanity ones",
  "How to think about moat and network effects",
  "The Indian regulatory basics, including DPDP and intermediary rules",
];

const FAQ = [
  {
    q: "What is the Platform Strategy Checklist?",
    a: "A founder-led checklist of the 22 decisions that determine whether a marketplace or platform works, grouped into six themes from business model to cold start to defensibility, plus a one-page checklist.",
  },
  {
    q: "Is it really free?",
    a: "Yes. We email you the PDF in exchange for your details, and occasionally share relevant insights. You can unsubscribe anytime.",
  },
  {
    q: "Which side of the marketplace should I build first?",
    a: "Usually the harder side to attract, because once it is in place the easier side follows. The real answer is whichever choice best solves your cold start, which the checklist helps you decide.",
  },
  {
    q: "Do I need to build custom, or can I start no-code?",
    a: "Start as lean as you can. Proving the core transaction with simple or no-code tools is far cheaper than discovering, after a custom build, that the transaction does not work.",
  },
  {
    q: "Will MagicWorks build my platform?",
    a: "No. Our platform work is consultation only and founder-led. We help you make these decisions well and design the path. You choose who builds.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://magicworksitsolutions.com/insights/reports/platform-strategy-checklist",
      name: "The Platform Strategy Checklist",
      description:
        "22 decisions to make before you build a marketplace or platform, from the core transaction to cold start to defensibility.",
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
          name: "Platform Strategy Checklist",
          item: "https://magicworksitsolutions.com/insights/reports/platform-strategy-checklist",
        },
      ],
    },
    {
      "@type": "Report",
      name: "The Platform Strategy Checklist",
      headline: "22 decisions to make before you build a marketplace or platform",
      about: ["Marketplace strategy", "Platform business model", "Network effects", "Cold start", "Startup strategy"],
      audience: {
        "@type": "Audience",
        audienceType: "Marketplace and platform founders and product leaders",
      },
      numberOfPages: 6,
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

export default function PlatformStrategyChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero + Gate ────────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
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
            <span className="text-[#F7F3EA]">Platform Strategy Checklist</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
            {/* Left col */}
            <div>
              <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#D4A537] mb-4">
                Free Checklist · 2026
              </span>
              <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(30px,4.4vw,46px)] leading-[1.12] text-[#F7F3EA] my-4">
                The Platform Strategy Checklist
              </h1>
              <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mb-8">
                The 22 decisions that determine whether a marketplace or platform works, from the
                core transaction to cold start to defensibility. Decisions to make on paper, before
                you make them in code.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["6 pages", "8 min read", "Marketplace & platform founders"].map((c) => (
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
                  "22 decisions grouped into six clear themes",
                  "The mistakes that quietly sink platforms",
                  "A one-page checklist to work through with your co-founders",
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
              22 decisions, six themes.
            </h2>
            <p className="text-[18px] leading-[1.55] text-[#3F3F4A] mt-3">
              The decisions that make or break a platform, grouped so you can work through them in
              order, plus a one-page checklist.
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
              Make the hard calls before you spend.
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
                  Founder-led
                </div>
                <div className="text-[14px] font-semibold text-[#C8B8FF] tracking-[0.03em] mt-2 max-w-[250px]">
                  platform consultation, led personally by our founder
                </div>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[26px] text-[#F7F3EA] mb-3">
                  Hard decisions deserve a real sounding board.
                </h2>
                <p className="text-[#C8B8FF] max-w-[560px] leading-[1.6]">
                  Our Marketplace and Platform Consultation is consultation only and led personally
                  by our founder. We help you pressure-test these decisions and design the path. We
                  advise and design; you choose who builds.
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
              Founders and product leaders building, or seriously considering, a marketplace or
              multi-sided platform, in edtech, B2B sourcing and trade, wellness and lifestyle, or
              any sector where two sides need to meet. If that is you, work through these 22 before
              you write a line of code.
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
            Make the hard decisions first.
          </h2>
          <div className="w-16 h-[3px] bg-[#D4A537] mx-auto my-6" />
          <p className="text-[#3F3F4A] max-w-[520px] mx-auto mb-8">
            Download the checklist and work through the 22 with your team.
          </p>
          <a
            href="#get"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[15px] rounded-full hover:scale-[1.02] transition-transform no-underline"
          >
            Get the checklist
          </a>
        </div>
      </section>
    </>
  );
}
