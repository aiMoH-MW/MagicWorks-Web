"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const pillars = [
  "Digital Marketing",
  "Web Development",
  "AI Consultation",
  "Platform Consultation",
  "Not sure yet",
];

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    pillar: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source_page: "/contact" }),
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
        <div className="text-[40px] mb-4">✓</div>
        <h3 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-3">
          Thank you. Message received.
        </h3>
        <p className="text-[15px] text-[#3F3F4A]">
          A team member will reach out within one working day to schedule your
          discovery call.
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
          <label
            htmlFor="name"
            className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1"
          >
            Name *
          </label>
          <input
            id="name"
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
          <label
            htmlFor="email"
            className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1"
          >
            Email *
          </label>
          <input
            id="email"
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
          <label
            htmlFor="phone"
            className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors"
            placeholder="+91 98xxx xxxxx"
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors"
            placeholder="Company name"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="pillar"
          className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1"
        >
          What are you most interested in?
        </label>
        <select
          id="pillar"
          name="pillar"
          value={form.pillar}
          onChange={handleChange}
          className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] bg-white focus:outline-none focus:border-[#5B3FBE] transition-colors"
        >
          <option value="">Select a service</option>
          {pillars.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1"
        >
          Tell us about your goals
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] resize-none focus:outline-none focus:border-[#5B3FBE] transition-colors"
          placeholder="What are you trying to achieve? What has or hasn't worked so far?"
        />
      </div>

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
        {state === "submitting" ? "Sending…" : "Send message"}
      </button>

      <p className="text-[12px] text-[#9A9AA8] text-center">
        We respond within one working day. No spam, ever.
      </p>
    </form>
  );
}
