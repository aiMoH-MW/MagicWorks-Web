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
};

const PLAYBOOKS: Playbook[] = [
  {
    cat: "ai",
    catLabel: "Search & AI Visibility",
    title: "The AI Search Visibility Playbook",
    description:
      "How to get found and cited inside ChatGPT, Perplexity, and Google AI Overviews. A five-pillar method, a 30/60/90 day plan, and an honest account of what you can control.",
    meta: ["20+ pages", "20 min read", "Founders & marketing heads"],
    href: "/insights/reports/ai-search-visibility-playbook",
  },
  {
    cat: "ai",
    catLabel: "AI Consultation",
    title: "AI Readiness Playbook for Founders",
    description:
      "A practical guide for founders and operations leaders: how to assess AI readiness, which processes to prioritise, and how to run a build-vs-buy decision without the vendor hype.",
    meta: ["40 pages", "25 min read", "Founders, COOs"],
  },
  {
    cat: "dm",
    catLabel: "Digital Marketing",
    title: "Digital Marketing Benchmarks 2026",
    description:
      "CPL, ROAS, and conversion benchmarks across education, real estate, manufacturing, and professional services, based on MagicWorks campaign data. Sanity-check what your agency tells you.",
    meta: ["28 pages", "15 min read", "Marketing heads, founders"],
  },
  {
    cat: "platform",
    catLabel: "Platform Consultation",
    title: "Platform Strategy Checklist: 22 Decisions Before You Build",
    description:
      "The 22 strategy decisions every marketplace or platform founder must make first: business model, network cold start, pricing, build-or-buy, and go-to-market sequencing.",
    meta: ["18 pages", "12 min read", "Platform founders"],
  },
  {
    cat: "web",
    catLabel: "Web Development",
    title: "The AI-Native Website Spec Sheet",
    description:
      "What to demand from your next website build: the RFP essentials, the performance bar, conversion must-haves, and which AI features earn their place versus which are hype.",
    meta: ["16 pages", "12 min read", "Founders, marketing heads"],
  },
  {
    cat: "industry",
    catLabel: "Manufacturing",
    title: "The Manufacturer's Growth Playbook",
    description:
      "From referral dependence to predictable inbound, and where AI genuinely fits: the multi-channel motion, plus RFQ-to-quote and proposal automation that actually moves the number.",
    meta: ["20 pages", "15 min read", "MDs, sales heads"],
  },
  {
    cat: "industry",
    catLabel: "Professional Services",
    title: "AI for Professional Services Firms",
    description:
      "A partner's guide to confidentiality, process, and ROI: where AI helps across drafting, intake, knowledge, and billing, and how to think about client risk before you start.",
    meta: ["20 pages", "15 min read", "Partners, firm leaders"],
  },
];

function PlaybookCard({ p }: { p: Playbook }) {
  const live = !!p.href;
  return (
    <div
      className={`flex flex-col bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-12 transition-all duration-200 ${
        live
          ? "hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(42,27,92,0.10)]"
          : "opacity-[0.82]"
      }`}
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#5B3FBE]">
          {p.catLabel}
        </span>
        {live ? (
          <span className="text-[10.5px] font-bold tracking-[0.08em] uppercase rounded-full px-[11px] py-1 text-[#9a7b1f] bg-[rgba(212,165,55,0.16)]">
            Free
          </span>
        ) : (
          <span className="text-[10.5px] font-bold tracking-[0.08em] uppercase rounded-full px-[11px] py-1 text-[#9A9AA8] bg-[#F0F0F2] border border-[#D8D8DE]">
            Coming soon
          </span>
        )}
      </div>
      <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] leading-[1.25] text-[#2A1B5C] mb-3">
        {p.title}
      </h3>
      <p className="text-[14.5px] text-[#3F3F4A] flex-grow">{p.description}</p>
      <div className="flex flex-wrap gap-2 my-6">
        {p.meta.map((m) => (
          <span
            key={m}
            className="text-[11.5px] font-semibold text-[#3F3F4A] bg-[#EDE9F7] rounded-full px-3 py-[5px]"
          >
            {m}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-4 border-t border-[#D8D8DE]">
        {live ? (
          <Link
            href={p.href!}
            className="font-bold text-[13px] tracking-[0.05em] uppercase text-[#5B3FBE] no-underline hover:text-[#2A1B5C] transition-colors"
          >
            Get the report →
          </Link>
        ) : (
          <span className="font-bold text-[13px] tracking-[0.05em] uppercase text-[#9A9AA8]">
            Coming soon
          </span>
        )}
      </div>
    </div>
  );
}

export default function InsightsReportsPage() {
  const [active, setActive] = useState<FilterKey>("all");
  const filtered =
    active === "all" ? PLAYBOOKS : PLAYBOOKS.filter((p) => p.cat === active);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-24 relative overflow-hidden">
        <svg
          className="absolute right-[-200px] top-[-160px] w-[640px] h-[640px] pointer-events-none"
          viewBox="0 0 640 640"
          aria-hidden="true"
        >
          <circle cx="320" cy="320" r="310" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
          <circle cx="320" cy="320" r="225" fill="none" stroke="#D4A537" strokeWidth="1.5" opacity="0.7" />
          <circle cx="320" cy="320" r="140" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <span className="block font-bold text-[12px] uppercase tracking-[0.18em] text-[#D4A537] mb-6">
            Gated Resources
          </span>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(30px,4.4vw,44px)] leading-[1.14] text-[#F7F3EA] max-w-[720px]">
            In-depth reports, free with your email.
          </h1>
          <div className="w-16 h-[3px] bg-[#D4A537] my-6" />
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[600px]">
            Playbooks, benchmarks, and strategy checklists on digital marketing, AI, and platform
            building. Open articles stay open. We only gate the long-form assets.
          </p>
          <div className="flex flex-wrap gap-6 mt-12">
            <Link
              href="/insights"
              className="text-[13px] font-semibold text-[#C8B8FF] no-underline hover:text-white pb-1.5 transition-colors"
            >
              All Insights
            </Link>
            <Link
              href="/insights"
              className="text-[13px] font-semibold text-[#C8B8FF] no-underline hover:text-white pb-1.5 transition-colors"
            >
              Articles
            </Link>
            <Link
              href="/insights/whitepapers"
              className="text-[13px] font-semibold text-[#C8B8FF] no-underline hover:text-white pb-1.5 transition-colors"
            >
              Whitepapers
            </Link>
            <span className="text-[13px] font-semibold text-white pb-1.5 border-b-2 border-[#D4A537]">
              Reports
            </span>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-20">
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

          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {filtered.map((p) => (
                <PlaybookCard key={p.title} p={p} />
              ))}
            </div>
          ) : (
            <p className="text-[#9A9AA8] italic py-8">No reports in this category yet.</p>
          )}
        </div>
      </section>

      {/* Open articles band */}
      <section className="bg-[#EDE9F7] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="bg-white border border-[#D8D8DE] border-l-[3px] border-l-[#D4A537] rounded-[10px] p-12 flex flex-col md:flex-row items-center justify-between gap-8 flex-wrap">
            <div>
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[23px] text-[#2A1B5C]">
                Prefer open reading?
              </h2>
              <p className="text-[14px] text-[#3F3F4A] mt-1.5">
                All our top-of-funnel Insights are open and crawlable, with no gate.
              </p>
            </div>
            <Link
              href="/insights"
              className="font-bold text-[13px] tracking-[0.05em] uppercase text-[#5B3FBE] no-underline hover:text-[#2A1B5C] transition-colors whitespace-nowrap"
            >
              Browse all Insights →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
