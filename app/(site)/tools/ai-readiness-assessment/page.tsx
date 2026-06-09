"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: "leadership",
    text: "Does your leadership team have a shared understanding of what AI can and cannot do today?",
    options: [
      { label: "No, it is mostly speculation", score: 0 },
      { label: "Partial: some members do, most do not", score: 1 },
      { label: "Mostly, we have had some exposure", score: 2 },
      { label: "Yes, we have a clear, grounded view", score: 3 },
    ],
  },
  {
    id: "processes",
    text: "Have you identified specific business processes where AI might reduce cost or improve speed?",
    options: [
      { label: "No, we have not looked yet", score: 0 },
      { label: "We have vague ideas but nothing specific", score: 1 },
      { label: "Yes, we have one or two specific candidates", score: 2 },
      { label: "Yes, several mapped with clear pain points", score: 3 },
    ],
  },
  {
    id: "data",
    text: "How clean and accessible is the data for the processes you want to improve?",
    options: [
      { label: "Scattered or mostly manual", score: 0 },
      { label: "Partially digital but inconsistent", score: 1 },
      { label: "Digital but needs cleaning", score: 2 },
      { label: "Clean, structured, and accessible", score: 3 },
    ],
  },
  {
    id: "budget",
    text: "Has your organisation allocated budget or resource for AI exploration or implementation in the next 12 months?",
    options: [
      { label: "No budget allocated", score: 0 },
      { label: "Under discussion", score: 1 },
      { label: "Some budget set aside", score: 2 },
      { label: "Yes, committed and sized", score: 3 },
    ],
  },
  {
    id: "urgency",
    text: "What is driving your interest in AI right now?",
    options: [
      { label: "Curiosity, no specific pressure", score: 0 },
      { label: "Competitive pressure to explore", score: 1 },
      { label: "A specific operational pain point", score: 2 },
      { label: "Clear cost or growth target it must hit", score: 3 },
    ],
  },
];

type Recommendation = {
  level: string;
  color: string;
  headline: string;
  body: string;
  cta: string;
  ctaHref: string;
};

function getRecommendation(score: number, max: number): Recommendation {
  const pct = (score / max) * 100;
  if (pct <= 30) {
    return {
      level: "Early stage",
      color: "#9A9AA8",
      headline: "Build the foundation first.",
      body: "Your organisation is in the early stages of AI readiness. The most valuable next step is not a technology project; it is building a shared, honest understanding of what AI can and cannot do. A Literacy Workshop for your leadership team will fast-track the alignment needed before any process work begins.",
      cta: "Learn about the AI Literacy Workshop",
      ctaHref: "/services/ai-consultation/workshop",
    };
  }
  if (pct <= 65) {
    return {
      level: "Ready to explore",
      color: "#D4A537",
      headline: "You are ready to map the opportunity.",
      body: "You have some grounding and at least one candidate process in mind. The right next step is an AI Process Audit: a four-to-six-week engagement that maps one or two named processes against current AI capability, ranks the opportunities honestly, and hands you a sequenced twelve-month roadmap you can act on with any partner.",
      cta: "Learn about the AI Process Audit",
      ctaHref: "/services/ai-consultation/process-audit",
    };
  }
  return {
    level: "Well positioned",
    color: "#5B3FBE",
    headline: "You are well positioned to act.",
    body: "You have clear processes in mind, reasonable data foundations, and the organisational will to move. An AI Process Audit or a focused Vendor & Build-vs-Buy Sprint could move quickly from here. A discovery call is the fastest way to scope the right engagement.",
    cta: "Book a discovery call",
    ctaHref: "/contact",
  };
}

export default function AiReadinessAssessmentPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const maxScore = questions.length * 3;
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const allAnswered = Object.keys(answers).length === questions.length;
  const recommendation = getRecommendation(totalScore, maxScore);
  const scorePct = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="min-h-screen bg-[#F7F3EA]">
      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-20 pb-16 relative overflow-hidden">
        <svg className="absolute right-[-200px] top-[-160px] w-[600px] h-[600px] pointer-events-none opacity-50" aria-hidden="true">
          {[100, 180, 260, 340].map((r, i) => (
            <circle key={r} cx="300" cy="300" r={r} fill="none" stroke={i === 2 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 2 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[800px] mx-auto px-8 relative text-center">
          <nav className="flex items-center justify-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/services/ai-consultation" className="hover:text-[#F7F3EA] transition-colors no-underline">AI Consultation</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">AI Readiness Assessment</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Free tool</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4.5vw,46px)] leading-[1.1] text-[#F7F3EA] mb-4">
            How ready is your business for AI?
          </h1>
          <p className="text-[17px] text-[#C8B8FF] max-w-[520px] mx-auto">
            Five honest questions. A readiness score and a sensible next step, with no obligation. Takes about two minutes.
          </p>
        </div>
      </section>

      {/* Assessment or Result */}
      <section className="py-16">
        <div className="max-w-[720px] mx-auto px-8">
          {!submitted ? (
            <>
              <div className="mb-10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-semibold text-[#3F3F4A]">{Object.keys(answers).length} of {questions.length} answered</p>
                  <p className="text-[13px] text-[#9A9AA8]">{questions.length - Object.keys(answers).length} remaining</p>
                </div>
                <div className="h-1.5 bg-[#D8D8DE] rounded-full">
                  <div
                    className="h-1.5 bg-[#5B3FBE] rounded-full transition-all duration-300"
                    style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-8">
                {questions.map((q, qi) => (
                  <div key={q.id} className="bg-white border border-[#D8D8DE] rounded-[12px] p-7">
                    <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#9A9AA8] mb-3">Question {qi + 1}</p>
                    <h2 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] mb-5">{q.text}</h2>
                    <div className="space-y-2.5">
                      {q.options.map((opt) => {
                        const selected = answers[q.id] === opt.score;
                        return (
                          <button
                            key={opt.label}
                            onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.score }))}
                            className={`w-full text-left px-5 py-3.5 rounded-[8px] border text-[14px] transition-all ${
                              selected
                                ? "border-[#5B3FBE] bg-[#EDE9F7] text-[#2A1B5C] font-semibold"
                                : "border-[#D8D8DE] text-[#3F3F4A] hover:border-[#5B3FBE] hover:bg-[#F7F3EA]"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <button
                  onClick={() => allAnswered && setSubmitted(true)}
                  disabled={!allAnswered}
                  className={`px-12 py-[15px] rounded-full font-bold text-[13px] uppercase tracking-[0.08em] transition-all ${
                    allAnswered
                      ? "bg-[#D4A537] text-[#2A1B5C] hover:scale-[1.02] cursor-pointer"
                      : "bg-[#D8D8DE] text-[#9A9AA8] cursor-not-allowed"
                  }`}
                >
                  {allAnswered ? "See my result →" : `Answer all ${questions.length - Object.keys(answers).length} remaining questions`}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {/* Score display */}
              <div className="bg-white border border-[#D8D8DE] rounded-[12px] p-8 text-center">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#9A9AA8] mb-4">Your AI readiness score</p>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#EDE9F7" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke={recommendation.color}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 50 * scorePct / 100} ${2 * Math.PI * 50}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-[family-name:var(--font-head)] font-bold text-[28px] text-[#2A1B5C]">{scorePct}%</span>
                  </div>
                </div>
                <p className="text-[12px] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: recommendation.color }}>
                  {recommendation.level}
                </p>
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[24px] text-[#2A1B5C]">
                  {recommendation.headline}
                </h2>
              </div>

              {/* Recommendation */}
              <div className="bg-[#2A1B5C] rounded-[12px] p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4A537] mb-3">Our recommendation</p>
                <p className="text-[16px] text-[#C8B8FF] leading-[1.7] mb-6">{recommendation.body}</p>
                <Link
                  href={recommendation.ctaHref}
                  className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[13px] rounded-full no-underline hover:scale-[1.02] transition-transform"
                >
                  {recommendation.cta} →
                </Link>
              </div>

              {/* Score breakdown */}
              <div className="bg-white border border-[#D8D8DE] rounded-[12px] p-6">
                <p className="font-semibold text-[14px] text-[#2A1B5C] mb-4">Your answers</p>
                <div className="space-y-3">
                  {questions.map((q) => {
                    const ans = q.options.find((o) => o.score === answers[q.id]);
                    return (
                      <div key={q.id} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#EDE9F7] flex items-center justify-center mt-0.5">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#5B3FBE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        <div>
                          <p className="text-[12px] text-[#9A9AA8]">{q.text}</p>
                          <p className="text-[13px] font-medium text-[#2A1B5C]">{ans?.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Retake */}
              <div className="text-center">
                <button
                  onClick={() => { setAnswers({}); setSubmitted(false); }}
                  className="text-[#5B3FBE] font-bold text-[13px] uppercase tracking-[0.06em] hover:underline"
                >
                  Retake the assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom cross-links */}
      <section className="bg-[#EDE9F7] py-16">
        <div className="max-w-[1120px] mx-auto px-8">
          <p className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] mb-6">Explore the AI Consultation practice</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: "AI Literacy Workshop", href: "/services/ai-consultation/workshop", desc: "Get your leadership team fluent in AI." },
              { name: "AI Process Audit & Roadmap", href: "/services/ai-consultation/process-audit", desc: "A defensible 12-month roadmap for named processes." },
              { name: "AI Consultation", href: "/services/ai-consultation", desc: "All four engagement formats." },
            ].map((r) => (
              <Link key={r.name} href={r.href} className="block bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#5B3FBE] rounded-[10px] p-6 no-underline hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(42,27,92,0.08)] transition-all">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[15px] text-[#2A1B5C] mb-2">{r.name}</h3>
                <p className="text-[13px] text-[#3F3F4A]">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
