"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const engagements = [
  "AI Literacy Workshop",
  "AI Process Audit + Roadmap",
  "Vendor & Build-vs-Buy Sprint",
  "Embedded AI Advisor",
  "Not sure yet",
];

const teamSizes = [
  "Founder / solo decision-maker",
  "2 to 10 people",
  "11 to 50 people",
  "50+ people",
];

export default function AIConsultationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    engagement: "",
    team_size: "",
    message: "",
    _gotcha: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    try {
      const parts: string[] = [];
      if (form.engagement) parts.push(`Engagement: ${form.engagement}`);
      if (form.team_size) parts.push(`Team size: ${form.team_size}`);
      if (form.message) parts.push(`\n${form.message}`);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          pillar: "AI Consultation",
          source_page: "/services/ai-consultation",
          message: parts.join("\n"),
          _gotcha: form._gotcha,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-10 text-center">
        <div className="text-[40px] mb-4">&#10003;</div>
        <h3 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-3">
          Thank you. We&apos;ll be in touch.
        </h3>
        <p className="text-[15px] text-[#3F3F4A]">
          A team member will reach out within one working day to discuss the right AI engagement for your business.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-10 space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="ai-name" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Name *
          </label>
          <input
            id="ai-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="ai-email" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Email *
          </label>
          <input
            id="ai-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="ai-phone" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Phone
          </label>
          <input
            id="ai-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors"
            placeholder="+91 98xxx xxxxx"
          />
        </div>
        <div>
          <label htmlFor="ai-company" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Company
          </label>
          <input
            id="ai-company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors"
            placeholder="Company name"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="ai-engagement" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Engagement you&apos;re interested in
          </label>
          <select
            id="ai-engagement"
            name="engagement"
            value={form.engagement}
            onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] bg-white focus:outline-none focus:border-[#5B3FBE] transition-colors"
          >
            <option value="">Select engagement</option>
            {engagements.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ai-team-size" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Leadership team size
          </label>
          <select
            id="ai-team-size"
            name="team_size"
            value={form.team_size}
            onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] bg-white focus:outline-none focus:border-[#5B3FBE] transition-colors"
          >
            <option value="">Select team size</option>
            {teamSizes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="ai-message" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
          What AI decision are you facing?
        </label>
        <textarea
          id="ai-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] resize-none focus:outline-none focus:border-[#5B3FBE] transition-colors"
          placeholder="What are you trying to do with AI? What has or hasn't worked so far?"
        />
      </div>

      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        name="_gotcha"
        type="text"
        value={form._gotcha}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      />

      {state === "error" && (
        <p className="text-red-600 text-[14px]">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full cursor-pointer border-none hover:scale-[1.01] transition-transform disabled:opacity-60"
      >
        {state === "submitting" ? "Sending…" : "Book an AI Literacy Workshop"}
      </button>

      <p className="text-[12px] text-[#9A9AA8] text-center">
        We respond within one working day. No spam, ever.
      </p>
    </form>
  );
}
