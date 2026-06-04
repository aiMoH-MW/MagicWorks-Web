"use client";

import type { Metadata } from "next";
import { useState } from "react";
import Link from "next/link";

// Metadata can't be exported from a "use client" component — use a wrapper.
// The parent layout handles the sitewide title template.

const reports = [
  {
    id: "ai-readiness-playbook",
    title: "AI Readiness Playbook for Indian SMEs",
    description:
      "A practical 40-page guide for founders and operations heads: how to assess your AI readiness, which processes to prioritise, and how to run a build-vs-buy decision without getting lost in vendor hype.",
    category: "AI Consultation",
    pages: "40 pages",
    readTime: "25 min read",
    audience: "Founders, COOs, Operations heads",
  },
  {
    id: "digital-marketing-benchmarks-2026",
    title: "Digital Marketing Benchmarks for Indian Businesses 2026",
    description:
      "CPL, ROAS, and conversion benchmarks across education, real estate, manufacturing, and professional services. Based on MagicWorks campaign data. Use it to sanity-check what your agency is telling you.",
    category: "Digital Marketing",
    pages: "28 pages",
    readTime: "15 min read",
    audience: "Marketing heads, founders",
  },
  {
    id: "platform-strategy-checklist",
    title: "Platform Strategy Checklist: 22 Decisions Before You Build",
    description:
      "The 22 strategy decisions every marketplace or platform founder must make before committing to a build. Business model, network cold start, pricing, build-or-buy on key modules, and go-to-market sequencing.",
    category: "Platform Consultation",
    pages: "18 pages",
    readTime: "12 min read",
    audience: "Platform founders, product heads",
  },
];

function GateForm({ reportId, title, onUnlock }: { reportId: string; title: string; onUnlock: () => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !name) { setError("Please enter your name and email."); return; }
    setSubmitting(true);
    setError("");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, source: `report-${reportId}`, message: `Requested report: ${title}` }),
      });
      onUnlock();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <p className="text-[13px] text-[#3F3F4A]">Enter your details to download this report.</p>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-2.5 text-[14px] text-[#2A1B5C] outline-none focus:border-[#5B3FBE] transition-colors"
      />
      <input
        type="email"
        placeholder="Work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-2.5 text-[14px] text-[#2A1B5C] outline-none focus:border-[#5B3FBE] transition-colors"
      />
      {error && <p className="text-[12px] text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-3 rounded-full hover:scale-[1.01] transition-transform disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Get the report →"}
      </button>
      <p className="text-[11px] text-[#9A9AA8]">No spam. We will email you the PDF and occasionally share relevant Insights. Unsubscribe anytime.</p>
    </form>
  );
}

function ReportCard({ report }: { report: typeof reports[number] }) {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[12px] p-8">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5B3FBE] mb-3">{report.category}</p>
      <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-3 leading-[1.3]">
        {report.title}
      </h2>
      <p className="text-[14px] text-[#3F3F4A] leading-[1.65] mb-4">{report.description}</p>
      <div className="flex gap-4 text-[11px] text-[#9A9AA8] mb-5 flex-wrap">
        <span>{report.pages}</span>
        <span>·</span>
        <span>{report.readTime}</span>
        <span>·</span>
        <span>{report.audience}</span>
      </div>

      {unlocked ? (
        <div className="bg-[#EDE9F7] border border-[#D8D8DE] rounded-[10px] p-5 text-center">
          <p className="font-semibold text-[14px] text-[#2A1B5C] mb-1">Check your inbox.</p>
          <p className="text-[13px] text-[#3F3F4A]">
            We have sent the report to your email. It may take a few minutes to arrive.
          </p>
        </div>
      ) : (
        <div className="bg-[#F7F3EA] border border-[#D8D8DE] rounded-[10px] p-5">
          <div className="flex items-center gap-3 mb-1">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><rect x="1" y="7" width="12" height="9" rx="2" stroke="#9A9AA8" strokeWidth="1.5"/><path d="M4 7V5a3 3 0 1 1 6 0v2" stroke="#9A9AA8" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <p className="text-[12px] font-semibold text-[#9A9AA8] uppercase tracking-[0.1em]">Free — unlocks with email</p>
          </div>
          <GateForm reportId={report.id} title={report.title} onUnlock={() => setUnlocked(true)} />
        </div>
      )}
    </div>
  );
}

export default function InsightsReportsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-20 relative overflow-hidden">
        <svg className="absolute right-[-100px] top-[-80px] w-[400px] h-[400px] pointer-events-none opacity-50" aria-hidden="true">
          {[80, 140, 200].map((r, i) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav className="flex items-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/insights" className="hover:text-[#F7F3EA] transition-colors no-underline">Insights</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Reports</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Gated resources</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(32px,5vw,52px)] leading-[1.1] text-[#F7F3EA] max-w-[680px]">
            In-depth reports, free with your email.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[520px] mt-4">
            Playbooks, benchmarks, and strategy checklists on digital marketing, AI, and platform building. High-value, bottom-of-funnel content. Open articles stay open — we only gate the long-form assets.
          </p>
        </div>
      </section>

      {/* Reports grid */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-7">
            {reports.map((r) => (
              <ReportCard key={r.id} report={r} />
            ))}
          </div>
        </div>
      </section>

      {/* Open articles CTA */}
      <section className="bg-[#EDE9F7] py-16">
        <div className="max-w-[1120px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-1">
              Want open articles instead?
            </h2>
            <p className="text-[15px] text-[#3F3F4A]">
              All top-of-funnel Insights are open and crawlable — no gate.
            </p>
          </div>
          <Link
            href="/insights"
            className="bg-[#2A1B5C] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[13px] rounded-full no-underline hover:scale-[1.02] transition-transform whitespace-nowrap"
          >
            Browse all Insights →
          </Link>
        </div>
      </section>
    </>
  );
}
