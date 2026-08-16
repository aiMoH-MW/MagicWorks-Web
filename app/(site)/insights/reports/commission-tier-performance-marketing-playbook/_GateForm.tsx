"use client";

import { useState } from "react";

const PDF_URL = "/reports/commission-tier-performance-marketing-playbook.pdf";

export default function GateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [spend, setSpend] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [gotcha, setGotcha] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !company || !role || !spend) {
      setError("Please fill in all fields.");
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
          company,
          message: `Role: ${role}. Monthly paid media spend: ${spend}. Requested: Commission-Tier Performance Marketing Playbook`,
          source_page: "playbook-commission-tier-performance-marketing",
          _gotcha: gotcha,
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
          Your Playbook is ready.
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
        Get the full 22-page Playbook
      </h2>
      <p className="text-[14px] text-[#3F3F4A] mt-2 mb-6">
        Delivered as a branded PDF. No sales calls unless you request one.
      </p>

      <div className="mb-4">
        <label className="block text-[12px] font-semibold text-[#3F3F4A] mb-1.5">Full name</label>
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
        <label className="block text-[12px] font-semibold text-[#3F3F4A] mb-1.5">Work email</label>
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
        <label className="block text-[12px] font-semibold text-[#3F3F4A] mb-1.5">Company</label>
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
        <label className="block text-[12px] font-semibold text-[#3F3F4A] mb-1.5">Your role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3.5 py-3 border border-[#D8D8DE] rounded-[8px] text-[14px] text-[#1A1A22] bg-white outline-none focus:border-[#5B3FBE] focus:shadow-[0_0_0_3px_rgba(91,63,190,0.12)] transition-all"
        >
          <option value="">Select your role</option>
          <option value="Founder / CEO">Founder / CEO</option>
          <option value="CMO / Marketing Head">CMO / Marketing Head</option>
          <option value="CFO / Finance Leader">CFO / Finance Leader</option>
          <option value="Marketing Team Member">Marketing Team Member</option>
          <option value="Agency / Consultant">Agency / Consultant</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-[12px] font-semibold text-[#3F3F4A] mb-1.5">
          Current monthly paid media spend
        </label>
        <select
          value={spend}
          onChange={(e) => setSpend(e.target.value)}
          className="w-full px-3.5 py-3 border border-[#D8D8DE] rounded-[8px] text-[14px] text-[#1A1A22] bg-white outline-none focus:border-[#5B3FBE] focus:shadow-[0_0_0_3px_rgba(91,63,190,0.12)] transition-all"
        >
          <option value="">Select a range</option>
          <option value="Under ₹5 lakh/month">Under ₹5 lakh per month</option>
          <option value="₹5-10 lakh/month">₹5 to 10 lakh per month</option>
          <option value="₹10-25 lakh/month">₹10 to 25 lakh per month</option>
          <option value="₹25 lakh+/month">₹25 lakh or more per month</option>
          <option value="No paid media currently">We do not run paid media currently</option>
        </select>
      </div>

      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        name="_gotcha"
        type="text"
        value={gotcha}
        onChange={(e) => setGotcha(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      />
      {error && <p className="text-[12px] text-red-500 mb-3">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-[15px] rounded-full hover:scale-[1.02] transition-transform mt-1 disabled:opacity-60 cursor-pointer"
      >
        {submitting ? "Sending…" : "Send me the Playbook"}
      </button>
      <p className="text-[11.5px] text-[#9A9AA8] mt-3 leading-[1.5]">
        By submitting, you agree to receive the Playbook and occasional MagicWorks updates by
        email. We do not share your details with third parties.
      </p>
    </form>
  );
}
