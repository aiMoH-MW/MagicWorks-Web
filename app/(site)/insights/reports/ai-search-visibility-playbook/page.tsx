import type { Metadata } from "next";
import Link from "next/link";
import GateForm from "./_GateForm";

export const metadata: Metadata = {
  title: "AI Search Visibility Playbook: Free Guide",
  description:
    "Free playbook: how to get found and cited inside ChatGPT, Perplexity, and Google AI Overviews. Practical and execution-led for Indian businesses.",
  alternates: {
    canonical: "/insights/reports/ai-search-visibility-playbook",
  },
  openGraph: {
    title: "The AI Search Visibility Playbook",
    description:
      "How to get found and cited inside ChatGPT, Perplexity, and Google AI Overviews. Free, for Indian businesses.",
    type: "website",
  },
};

const PILLARS = [
  {
    num: "01",
    title: "Be a recognised entity",
    body: "The foundation most businesses skip: one consistent, credible identity across the web.",
  },
  {
    num: "02",
    title: "Write answer-first content",
    body: "Structure your pages so an answer engine can lift a clear, self-contained answer.",
  },
  {
    num: "03",
    title: "Make it machine-readable",
    body: "The schema and technical basics that let engines read, understand, and quote you.",
  },
  {
    num: "04",
    title: "Earn credibility signals",
    body: "The authority, mentions, and original data that make engines trust your source.",
  },
  {
    num: "05",
    title: "Measure and iterate",
    body: "How to test prompts, track citations, and improve in quarterly cycles.",
  },
  {
    num: "+",
    title: "30 / 60 / 90 day plan",
    body: "A realistic sequence to go from invisible to genuinely findable, plus a one-page checklist.",
    gold: true,
  },
];

const LEARNINGS = [
  "How AI answer engines actually decide what to cite",
  "The difference between ranking and being quoted",
  "SEO, AEO, and GEO explained plainly, and how they fit together",
  "The specific moves that earn citations",
  "How to make your best pages quotable",
  "How to track your visibility across ChatGPT, Perplexity, and Google",
  "Why small businesses can win citations against larger ones",
  "The myths to ignore, including guaranteed-ranking promises",
];

const FAQ = [
  {
    q: "What is the AI Search Visibility Playbook?",
    a: "A practical guide for Indian businesses on how to be found, named, and quoted by AI answer engines like ChatGPT, Perplexity, and Google AI Overviews. It covers a five-pillar method, a 30, 60, and 90 day plan, and an honest account of what is and is not in your control.",
  },
  {
    q: "Is it really free?",
    a: "Yes. We email you the PDF in exchange for your details, and occasionally share relevant insights. You can unsubscribe anytime.",
  },
  {
    q: "Who is it for?",
    a: "Founders, marketing heads, and growth leaders who can see search is changing and want a clear, execution-led plan rather than hype.",
  },
  {
    q: "Is this just theory?",
    a: "No. It is written from live client work. One MagicWorks client, The Holistic Care, had its content cited more than 75,000 times by AI answer engines in three months, according to their Copilot Search Console report.",
  },
  {
    q: "Will MagicWorks contact me?",
    a: "We will email you the playbook and occasionally share relevant insights. No spam, and you can unsubscribe at any time.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id":
        "https://magicworksitsolutions.com/insights/reports/ai-search-visibility-playbook",
      name: "The AI Search Visibility Playbook",
      description:
        "How to get found and cited inside ChatGPT, Perplexity, and Google AI Overviews. A free playbook for Indian businesses.",
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
          name: "AI Search Visibility Playbook",
          item: "https://magicworksitsolutions.com/insights/reports/ai-search-visibility-playbook",
        },
      ],
    },
    {
      "@type": "Report",
      name: "The AI Search Visibility Playbook",
      headline:
        "How to get found and cited inside ChatGPT, Perplexity, and Google AI Overviews",
      about: ["AI search", "Answer Engine Optimisation", "Generative Engine Optimisation", "SEO"],
      audience: {
        "@type": "Audience",
        audienceType: "Founders, marketing and growth leaders at Indian businesses",
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

export default function AISearchVisibilityPlaybookPage() {
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
            <span className="text-[#F7F3EA]">AI Search Visibility Playbook</span>
          </nav>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
            {/* Left col */}
            <div>
              <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#D4A537] mb-4">
                Free Playbook · 2026
              </span>
              <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(30px,4.4vw,46px)] leading-[1.12] text-[#F7F3EA] my-4">
                The AI Search Visibility Playbook
              </h1>
              <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mb-8">
                How to get found and cited inside ChatGPT, Perplexity, and Google AI Overviews.
                Written for Indian businesses, from real client work, not theory.
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {["20+ pages", "20 min read", "Founders & marketing heads"].map((c) => (
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
                  "The five-pillar method to become a source AI answers are built from",
                  "A practical 30, 60, and 90 day plan",
                  "An honest account of what you can and cannot control",
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
              A method, not a list of tips.
            </h2>
            <p className="text-[18px] leading-[1.55] text-[#3F3F4A] mt-3">
              The playbook is built around five pillars you can work through with your team, plus a
              phased plan and an honest myths section.
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
              Take away clear, usable answers.
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
                  75,000+
                </div>
                <div className="text-[14px] font-semibold text-[#C8B8FF] tracking-[0.04em] mt-2">
                  AI citations in 3 months
                </div>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[26px] text-[#F7F3EA] mb-3">
                  This is what it looks like when it works.
                </h2>
                <p className="text-[#C8B8FF] max-w-[560px] leading-[1.6]">
                  One MagicWorks client, The Holistic Care, a mindfulness and wellbeing education
                  brand, had its content cited more than 75,000 times by AI answer engines in three
                  months, according to their Copilot Search Console report. The reason is exactly
                  what this playbook teaches: deep, genuinely useful, question-led content is what
                  answer engines quote.
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
              Founders, marketing heads, and growth leaders at Indian businesses who can see that
              search is changing and want a clear, honest plan rather than hype. If you are
              responsible for how your business gets found, this is written for you.
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
            Get found inside the answer.
          </h2>
          <div className="w-16 h-[3px] bg-[#D4A537] mx-auto my-6" />
          <p className="text-[#3F3F4A] max-w-[520px] mx-auto mb-8">
            Download the playbook and start stacking the odds in your favour.
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
