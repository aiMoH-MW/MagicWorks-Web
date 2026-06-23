import type { Metadata } from "next";
import Link from "next/link";
import GateForm from "./_GateForm";

export const metadata: Metadata = {
  title: "AI-Native Website Spec Sheet — Free Download",
  description:
    "Free spec sheet: exactly what to demand from your next website so it performs, converts, and gets found in search and AI answers. For Indian businesses.",
  alternates: {
    canonical: "/insights/reports/ai-native-website-spec-sheet",
  },
  openGraph: {
    title: "The AI-Native Website Spec Sheet",
    description:
      "What to demand from your next website build. Vendor-neutral, RFP-ready, free for Indian businesses.",
    type: "website",
  },
};

const PILLARS = [
  {
    num: "01",
    title: "Strategy & outcomes",
    body: "Brief the site around a goal and the metrics you will judge it by, not a page count.",
  },
  {
    num: "02",
    title: "Performance & foundation",
    body: "Fast on real Indian mobile networks, secure, and built on clean, crawlable code.",
  },
  {
    num: "03",
    title: "Findability: SEO & AEO",
    body: "Built to rank in search and to be cited inside AI answers, with the right schema.",
  },
  {
    num: "04",
    title: "Conversion",
    body: "The CTAs, forms, trust signals, and tracking that turn visits into qualified leads.",
  },
  {
    num: "05",
    title: "AI features that earn their place",
    body: "How to tell a genuinely useful AI feature from an expensive gimmick.",
  },
  {
    num: "+",
    title: "Ownership, RFP & checklist",
    body: "What you must own, how handover should work, and a one-page checklist to judge any quote.",
    gold: true,
  },
];

const LEARNINGS = [
  "How to brief a website around revenue, not pages",
  "What “AI-native” really means, and what is just hype",
  "The performance and technical bar to insist on",
  "How to make a site findable in search and AI answers",
  "The conversion essentials most sites miss",
  "Which AI features are worth paying for",
  "What you must own, and how handover should work",
  "The red flags that signal a bad build",
];

const FAQ = [
  {
    q: "What is the AI-Native Website Spec Sheet?",
    a: "A vendor-neutral specification of what a modern business website must do: performance, findability, conversion, AI features, compliance, and ownership. It is organised so you can lift it straight into a brief or RFP, with a one-page checklist.",
  },
  {
    q: "Is it really free?",
    a: "Yes. We email you the PDF in exchange for your details, and occasionally share relevant insights. You can unsubscribe anytime.",
  },
  {
    q: "Do I need a custom site, or is a template fine?",
    a: "It depends on your goal. A template can be fine for the simplest needs, but a business that must convert and rank usually outgrows one quickly. The spec helps you match the build to the outcome.",
  },
  {
    q: "Are AI website builders good enough?",
    a: "For the simplest needs, sometimes. For a site that must convert, rank, and be found in AI answers, they usually fall short on findability, conversion, and ownership. Use the spec to judge any option honestly.",
  },
  {
    q: "Will MagicWorks contact me?",
    a: "We will email you the spec sheet and occasionally share relevant insights. No spam, and you can unsubscribe at any time.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://magicworksitsolutions.com/insights/reports/ai-native-website-spec-sheet",
      name: "The AI-Native Website Spec Sheet",
      description:
        "What to demand from your next website build. A vendor-neutral specification for Indian businesses.",
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
          name: "AI-Native Website Spec Sheet",
          item: "https://magicworksitsolutions.com/insights/reports/ai-native-website-spec-sheet",
        },
      ],
    },
    {
      "@type": "Report",
      name: "The AI-Native Website Spec Sheet",
      headline: "What to demand from your next website build",
      about: ["Web development", "Website performance", "SEO", "Answer Engine Optimisation", "Conversion"],
      audience: {
        "@type": "Audience",
        audienceType: "Founders, marketing and product leaders at Indian businesses",
      },
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

export default function AINativeWebsiteSpecSheetPage() {
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
            <span className="text-[#F7F3EA]">AI-Native Website Spec Sheet</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
            {/* Left col */}
            <div>
              <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#D4A537] mb-4">
                Free Spec Sheet · 2026
              </span>
              <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(30px,4.4vw,46px)] leading-[1.12] text-[#F7F3EA] my-4">
                The AI-Native Website Spec Sheet
              </h1>
              <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mb-8">
                Exactly what to demand from your next website build, so it performs, converts,
                and gets found in search and AI answers. A vendor-neutral spec you can lift
                straight into your brief.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["20+ pages", "15 min read", "Founders & marketing heads"].map((c) => (
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
                  "A nine-part specification you can drop into a brief or RFP",
                  "The red flags that signal a bad build",
                  "A one-page checklist to judge any proposal",
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
              A specification, not a sales pitch.
            </h2>
            <p className="text-[18px] leading-[1.55] text-[#3F3F4A] mt-3">
              Nine sections you can lift into a brief, plus red flags, partner questions, and a
              one-page checklist.
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
                <div className="font-[family-name:var(--font-head)] font-bold text-[14px] text-[#D4A537]">
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
              Brief a build, and judge the result.
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
                <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(44px,7vw,72px)] text-[#D4A537] leading-none">
                  17
                </div>
                <div className="text-[14px] font-semibold text-[#C8B8FF] tracking-[0.04em] mt-2 max-w-[230px]">
                  years building and growing websites for Indian businesses
                </div>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[26px] text-[#F7F3EA] mb-3">
                  Built to a standard, not a price.
                </h2>
                <p className="text-[#C8B8FF] max-w-[560px] leading-[1.6]">
                  We have spent seventeen years building and growing websites for Indian businesses,
                  and this spec is the same standard we hold our own work to. Use it to brief any
                  team and judge the result honestly, whether or not that team is us.
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
              Founders, marketing heads, and product leaders about to commission a new website or a
              relaunch, who want to brief a developer well and judge the result with confidence. If
              you are responsible for the site that represents your business, this is written for you.
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
            Brief your next build with confidence.
          </h2>
          <div className="w-16 h-[3px] bg-[#D4A537] mx-auto my-6" />
          <p className="text-[#3F3F4A] max-w-[520px] mx-auto mb-8">
            Download the spec sheet and demand a website worth having.
          </p>
          <a
            href="#get"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[15px] rounded-full hover:scale-[1.02] transition-transform no-underline"
          >
            Get the spec sheet
          </a>
        </div>
      </section>
    </>
  );
}
