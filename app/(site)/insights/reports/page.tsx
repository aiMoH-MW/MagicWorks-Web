"use client";

import { useState } from "react";
import Link from "next/link";

type FilterKey = "all" | "ai" | "dm" | "web" | "platform" | "industry";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI & Search" },
  { key: "dm", label: "Digital Marketing" },
  { key: "web", label: "Web" },
  { key: "platform", label: "Platform" },
  { key: "industry", label: "Industry" },
];

type Playbook = {
  cat: FilterKey;
  catLabel: string;
  title: string;
  description: string;
  meta: string[];
  href?: string;
  cta?: string;
  preview?: string[];
};

const PLAYBOOKS: Playbook[] = [
  {
    cat: "ai",
    catLabel: "Search & AI Visibility",
    title: "The AI Search Visibility Playbook",
    description:
      "How to get found and cited inside ChatGPT, Perplexity, and Google AI Overviews. A five-pillar method, a 30/60/90 day plan, and an honest account of what you can and cannot control.",
    meta: ["20+ pages", "20 min read", "Founders & marketing heads"],
    href: "/insights/reports/ai-search-visibility-playbook",
    preview: [
      "Five-pillar AI visibility method",
      "Write content AI engines actually quote",
      "Schema & technical quick-wins",
      "30 / 60 / 90 day action plan",
      "Myths vs what actually works",
    ],
  },
  {
    cat: "ai",
    catLabel: "AI Consultation",
    title: "AI Readiness Playbook for Founders",
    description:
      "A practical guide for founders and operations leaders: how to assess AI readiness, which processes to prioritise, and how to run a build-vs-buy decision without the vendor hype.",
    meta: ["7 pages", "10 min read", "Founders, COOs"],
    href: "/insights/reports/ai-readiness-playbook",
    cta: "Get the playbook",
    preview: [
      "Five-dimension readiness assessment",
      "Where AI pays off first",
      "Honest build vs. buy framework",
      "90-day pilot plan",
      "Myths and a one-page checklist",
    ],
  },
  {
    cat: "platform",
    catLabel: "Platform Consultation",
    title: "Platform Strategy Checklist: 22 Decisions Before You Build",
    description:
      "The 22 strategy decisions every marketplace or platform founder must make first: business model, network cold start, pricing, build-or-buy, and go-to-market sequencing.",
    meta: ["6 pages", "8 min read", "Platform founders"],
    href: "/insights/reports/platform-strategy-checklist",
    cta: "Get the checklist",
    preview: [
      "Business model and unit economics",
      "Liquidity and cold start plan",
      "Trust, quality and money flow",
      "Product, MVP and go-to-market",
      "Defensibility and DPDP compliance",
    ],
  },
  {
    cat: "web",
    catLabel: "Web Development",
    title: "The AI-Native Website Spec Sheet",
    description:
      "What to demand from your next website build: the RFP essentials, the performance bar, conversion must-haves, and which AI features earn their place versus which are hype.",
    meta: ["20+ pages", "15 min read", "Founders, marketing heads"],
    href: "/insights/reports/ai-native-website-spec-sheet",
    cta: "Get the spec sheet",
    preview: [
      "Nine-part brief-ready specification",
      "Performance and technical requirements",
      "SEO and AI findability requirements",
      "Conversion must-haves",
      "Ownership, RFP and red flags",
    ],
  },
  {
    cat: "industry",
    catLabel: "Manufacturing",
    title: "The Manufacturer's Growth Playbook",
    description:
      "Move from referrals to predictable inbound. The channels that actually work for manufacturers, and an honest view of where AI fits. Built for how technical buyers really buy.",
    meta: ["7 pages", "9 min read", "MDs, founders & sales heads"],
    href: "/insights/reports/manufacturers-growth-playbook",
    cta: "Get the playbook",
    preview: [
      "From referral-led to a predictable demand engine",
      "The channels that work for technical, long-cycle buyers",
      "Where AI pays off: quoting, enquiries, and knowledge",
      "A 90-day plan to a working demand engine",
      "Myths and vanity metrics to ignore",
    ],
  },
  {
    cat: "industry",
    catLabel: "Professional Services",
    title: "AI for Professional Services Firms",
    description:
      "A partner's guide to confidentiality, process, and ROI. Where AI creates value in a firm, how to handle the risk, and a staged, safe path to adoption. Vendor-neutral.",
    meta: ["7 pages", "10 min read", "Partners & firm leaders"],
    href: "/insights/reports/ai-for-professional-services",
    cta: "Get the guide",
    preview: [
      "Where AI gives your experts genuine leverage",
      "The confidentiality and risk framework partners need",
      "How to vet a vendor's data handling",
      "A staged path from internal use to client-facing",
      "A 90-day plan to a first safe pilot",
    ],
  },
];

function FeaturedCard({ p }: { p: Playbook }) {
  return (
    <div className="bg-white border border-[#D8D8DE] border-t-[4px] border-t-[#D4A537] rounded-[12px] overflow-hidden shadow-[0_4px_24px_rgba(42,27,92,0.07)] hover:shadow-[0_20px_60px_rgba(42,27,92,0.13)] hover:-translate-y-[3px] transition-all duration-300">
      <div className="grid lg:grid-cols-[3fr_2fr]">
        {/* Left */}
        <div className="p-10 lg:p-12 flex flex-col">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#5B3FBE]">
              {p.catLabel}
            </span>
            <span className="text-[10.5px] font-bold tracking-[0.08em] uppercase rounded-full px-[11px] py-1 text-[#9a7b1f] bg-[rgba(212,165,55,0.16)]">
              Free
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,2.4vw,30px)] leading-[1.2] text-[#2A1B5C] mb-4">
            {p.title}
          </h3>
          <p className="text-[15px] text-[#3F3F4A] leading-[1.65] mb-8 flex-grow">
            {p.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {p.meta.map((m) => (
              <span
                key={m}
                className="text-[11.5px] font-semibold text-[#3F3F4A] bg-[#EDE9F7] rounded-full px-3 py-[5px]"
              >
                {m}
              </span>
            ))}
          </div>
          <div>
            <Link
              href={p.href!}
              className="inline-block bg-[#2A1B5C] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:bg-[#5B3FBE] transition-colors duration-200"
            >
              {p.cta ?? "Get the playbook"} →
            </Link>
          </div>
        </div>

        {/* Right: preview panel */}
        {p.preview && (
          <div className="bg-[#F7F3EA] border-t border-[#D8D8DE] lg:border-t-0 lg:border-l border-[#D8D8DE] p-10 flex flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A9AA8] mb-5">
              What&apos;s inside
            </p>
            <ul className="space-y-3.5 list-none">
              {p.preview.map((item, i) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="font-[family-name:var(--font-head)] font-bold text-[12px] text-[#D4A537] flex-none mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="text-[13.5px] text-[#3F3F4A] leading-[1.45]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 pt-6 border-t border-[#D8D8DE]">
              <p className="text-[12px] text-[#9A9AA8] leading-[1.55]">
                Plus a one-page checklist you can share with your team.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SoonCard({ p }: { p: Playbook }) {
  return (
    <div className="flex flex-col bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-8 opacity-75 hover:opacity-90 transition-opacity duration-200">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-[#5B3FBE]">
          {p.catLabel}
        </span>
        <span className="text-[10px] font-bold tracking-[0.08em] uppercase rounded-full px-[10px] py-[3px] text-[#9A9AA8] bg-[#F0F0F2] border border-[#D8D8DE]">
          Soon
        </span>
      </div>
      <h3 className="font-[family-name:var(--font-head)] font-bold text-[17px] leading-[1.3] text-[#2A1B5C] mb-2.5">
        {p.title}
      </h3>
      <p className="text-[13.5px] text-[#3F3F4A] leading-[1.6] flex-grow">{p.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#D8D8DE]">
        {p.meta.map((m) => (
          <span
            key={m}
            className="text-[11px] font-semibold text-[#9A9AA8] bg-[#F7F3EA] rounded-full px-2.5 py-[4px] border border-[#D8D8DE]"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function InsightsReportsPage() {
  const [active, setActive] = useState<FilterKey>("all");

  const allFiltered = active === "all" ? PLAYBOOKS : PLAYBOOKS.filter((p) => p.cat === active);
  const liveBooks = allFiltered.filter((p) => !!p.href);
  const soonBooks = allFiltered.filter((p) => !p.href);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        {/* Rings — right */}
        <svg
          className="absolute right-[-180px] top-[-140px] w-[600px] h-[600px] pointer-events-none"
          viewBox="0 0 600 600"
          aria-hidden="true"
        >
          <circle cx="300" cy="300" r="290" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.35" />
          <circle cx="300" cy="300" r="210" fill="none" stroke="#D4A537" strokeWidth="1.5" opacity="0.6" />
          <circle cx="300" cy="300" r="130" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.35" />
        </svg>
        {/* Rings — bottom-left accent */}
        <svg
          className="absolute left-[-120px] bottom-[-120px] w-[340px] h-[340px] pointer-events-none"
          viewBox="0 0 340 340"
          aria-hidden="true"
        >
          <circle cx="170" cy="170" r="160" fill="none" stroke="#7C63D8" strokeWidth="1" opacity="0.2" />
          <circle cx="170" cy="170" r="100" fill="none" stroke="#D4A537" strokeWidth="1" opacity="0.3" />
        </svg>

        <div className="max-w-[1120px] mx-auto px-8 relative">
          <span className="block font-bold text-[11px] uppercase tracking-[0.22em] text-[#D4A537] mb-5">
            Gated Resources
          </span>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,46px)] leading-[1.1] text-[#F7F3EA] max-w-[680px]">
            In-depth playbooks,<br className="hidden sm:block" /> free with your email.
          </h1>
          <div className="w-14 h-[3px] bg-[#D4A537] my-5" />
          <p className="text-[17px] leading-[1.6] text-[#C8B8FF] max-w-[560px]">
            Execution-ready guides on digital marketing, AI, and platform building. Open articles
            stay open — we only gate the long-form assets.
          </p>

          {/* Insight-type tabs */}
          <div className="flex flex-wrap gap-1 mt-10 border-b border-white/10 pb-0">
            {[
              { label: "All Insights", href: "/insights" },
              { label: "Articles", href: "/insights" },
              { label: "Whitepapers", href: "/insights/whitepapers" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-4 py-3 text-[13px] font-semibold text-[#C8B8FF] no-underline hover:text-white border-b-2 border-transparent -mb-[1px] transition-colors"
              >
                {label}
              </Link>
            ))}
            <span className="px-4 py-3 text-[13px] font-semibold text-white border-b-2 border-[#D4A537] -mb-[1px]">
              Reports
            </span>
          </div>
        </div>
      </section>

      {/* ── Filter + Content ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F7F3EA]">
        <div className="max-w-[1120px] mx-auto px-8">

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`text-[13px] font-semibold px-[18px] py-2 rounded-full border transition-all duration-150 cursor-pointer ${
                  active === f.key
                    ? "bg-[#2A1B5C] text-[#F7F3EA] border-[#2A1B5C]"
                    : "bg-white text-[#3F3F4A] border-[#D8D8DE] hover:border-[#5B3FBE] hover:text-[#5B3FBE]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {allFiltered.length === 0 ? (
            <p className="text-[#9A9AA8] italic py-8">No reports in this category yet.</p>
          ) : (
            <>
              {/* Live / featured cards */}
              {liveBooks.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-2 h-2 rounded-full bg-[#D4A537] flex-none" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#3F3F4A]">
                      Available now
                    </span>
                  </div>
                  <div className="space-y-6">
                    {liveBooks.map((p) => (
                      <FeaturedCard key={p.title} p={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* Coming-soon cards */}
              {soonBooks.length > 0 && (
                <div>
                  {liveBooks.length > 0 && (
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-grow h-px bg-[#D8D8DE]" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A9AA8] flex-none">
                        Coming soon
                      </span>
                      <div className="flex-grow h-px bg-[#D8D8DE]" />
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {soonBooks.map((p) => (
                      <SoonCard key={p.title} p={p} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Open reading band ─────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4A537] mb-2">
                No gate needed
              </p>
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[24px] text-[#F7F3EA]">
                Prefer open reading?
              </h2>
              <p className="text-[15px] text-[#C8B8FF] mt-1.5 max-w-[440px] leading-[1.55]">
                All top-of-funnel Insights are open and crawlable — no email required.
              </p>
            </div>
            <Link
              href="/insights"
              className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform whitespace-nowrap flex-none"
            >
              Browse all Insights →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
