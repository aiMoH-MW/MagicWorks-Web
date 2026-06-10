"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

const platformTypes = [
  "Edtech platform",
  "B2B sourcing / trade marketplace",
  "Wellness & lifestyle marketplace",
  "Other platform type",
];

const engagements = [
  "Platform Strategy Workshop",
  "Platform Roadmap Audit",
  "Targeted Advisory Sprint",
  "Embedded Platform Advisor",
  "Not sure yet",
];

export default function PlatformContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    platform_type: "",
    engagement: "",
    message: "",
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
      if (form.platform_type) parts.push(`Platform type: ${form.platform_type}`);
      if (form.engagement) parts.push(`Engagement: ${form.engagement}`);
      if (form.message) parts.push(`\n${form.message}`);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          pillar: "Platform Consultation",
          source_page: "/services/platform-consultation",
          message: parts.join("\n"),
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
        <div className="text-[40px] mb-4">✓</div>
        <h3 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-3">
          Thank you. We&apos;ll be in touch.
        </h3>
        <p className="text-[15px] text-[#3F3F4A]">
          A team member will reach out within one working day to discuss the right engagement format for your platform.
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
          <label htmlFor="pc-name" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Name *
          </label>
          <input
            id="pc-name"
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
          <label htmlFor="pc-email" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Email *
          </label>
          <input
            id="pc-email"
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
          <label htmlFor="pc-phone" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Phone
          </label>
          <input
            id="pc-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors"
            placeholder="+91 98xxx xxxxx"
          />
        </div>
        <div>
          <label htmlFor="pc-company" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Company
          </label>
          <input
            id="pc-company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors"
            placeholder="Company or platform name"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="pc-platform-type" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Platform type
          </label>
          <select
            id="pc-platform-type"
            name="platform_type"
            value={form.platform_type}
            onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] bg-white focus:outline-none focus:border-[#5B3FBE] transition-colors"
          >
            <option value="">Select platform type</option>
            {platformTypes.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pc-engagement" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
            Engagement you&apos;re interested in
          </label>
          <select
            id="pc-engagement"
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
      </div>

      <div>
        <label htmlFor="pc-message" className="block text-[12px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
          Tell us about your platform
        </label>
        <textarea
          id="pc-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[15px] text-[#1A1A22] resize-none focus:outline-none focus:border-[#5B3FBE] transition-colors"
          placeholder="What stage is your platform at? What decision do you need help with?"
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
        {state === "submitting" ? "Sending…" : "Request a Strategy Workshop"}
      </button>

      <p className="text-[12px] text-[#9A9AA8] text-center">
        We respond within one working day. No spam, ever.
      </p>
    </form>
  );
}
