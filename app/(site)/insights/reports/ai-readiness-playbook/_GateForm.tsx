"use client";

import { useState } from "react";

const PDF_URL =
  "https://drive.google.com/uc?export=download&id=134iy6fMBCPqRL4SZI3TDxwXj1DIn_R5H";

export default function GateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) {
      setError("Please enter your name and email.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: company || undefined,
          message: `Role: ${role || "not specified"}. Requested: AI Readiness Playbook`,
          source_page: "playbook-ai-readiness",
        }),
      });
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="w-[54px] h-[54px] rounded-full bg-[#EDE9F7] text-[#5B3FBE] flex items-center justify-center text-[28px] mx-auto mb-4">
          ✓
        </div>
        <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-1.5">
          Your playbook is ready.
        </h3>
        <p className="text-[14px] text-[#3F3F4A] mb-6 leading-[1.6]">
          Click below to download your PDF.
        </p>
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full hover:scale-[1.02] transition-transform no-underline"
        >
          Download PDF now ↓
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C]">
        Get the playbook
      </h2>
      <p className="text-[14px] text-[#3F3F4A] mt-2 mb-6">
        Enter your details and we will email you the PDF.
      </p>

      <div className="mb-4">
        <label className="block text-[12px] font-semibold text-[#3F3F4A] mb-1.5">
          Full name
        </label>
        <input
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3.5 py-3 border border-[#D8D8DE] rounded-[8px] text-[14px] text-[#1A1A22] bg-white outline-none focus:border-[#5B3FBE] focus:shadow-[0_0_0_3px_rgba(91,63,190,0.12)] transition-all"
        />
      </div>

      <div className="mb-4">
        <label className="block text-[12px] font-semibold text-[#3F3F4A] mb-1.5">
          Work email
        </label>
        <input
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3.5 py-3 border border-[#D8D8DE] rounded-[8px] text-[14px] text-[#1A1A22] bg-white outline-none focus:border-[#5B3FBE] focus:shadow-[0_0_0_3px_rgba(91,63,190,0.12)] transition-all"
        />
      </div>

      <div className="mb-4">
        <label className="block text-[12px] font-semibold text-[#3F3F4A] mb-1.5">
          Company
        </label>
        <input
          type="text"
          autoComplete="organization"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3.5 py-3 border border-[#D8D8DE] rounded-[8px] text-[14px] text-[#1A1A22] bg-white outline-none focus:border-[#5B3FBE] focus:shadow-[0_0_0_3px_rgba(91,63,190,0.12)] transition-all"
        />
      </div>

      <div className="mb-4">
        <label className="block text-[12px] font-semibold text-[#3F3F4A] mb-1.5">
          Your role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3.5 py-3 border border-[#D8D8DE] rounded-[8px] text-[14px] text-[#1A1A22] bg-white outline-none focus:border-[#5B3FBE] focus:shadow-[0_0_0_3px_rgba(91,63,190,0.12)] transition-all"
        >
          <option value="">Select one</option>
          <option>Founder / CEO / Director</option>
          <option>COO / Operations leader</option>
          <option>Functional head</option>
          <option>Other</option>
        </select>
      </div>

      {error && <p className="text-[12px] text-red-500 mb-3">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-[15px] rounded-full hover:scale-[1.02] transition-transform mt-1 disabled:opacity-60 cursor-pointer"
      >
        {submitting ? "Sending…" : "Send me the playbook"}
      </button>
      <p className="text-[11.5px] text-[#9A9AA8] mt-3 leading-[1.5]">
        By submitting, you agree to occasionally receive relevant insights from MagicWorks. No
        spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
