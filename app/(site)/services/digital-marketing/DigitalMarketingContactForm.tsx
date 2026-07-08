"use client";
import { useState } from "react";

export default function DigitalMarketingContactForm({
  sourcePage = "/services/digital-marketing",
  defaultService = "",
}: {
  sourcePage?: string;
  defaultService?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const parts: string[] = [];
      const service = fd.get("service") as string;
      const budget = fd.get("budget") as string;
      const userMsg = fd.get("message") as string;
      if (service) parts.push(`Service interest: ${service}`);
      if (budget) parts.push(`Monthly ad budget: ${budget}`);
      if (userMsg) parts.push(`\n${userMsg}`);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          company: fd.get("company"),
          pillar: "Digital Marketing",
          source_page: sourcePage,
          message: parts.join("\n"),
          _gotcha: fd.get("_gotcha"),
        }),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-white border border-[#D8D8DE] rounded-[14px] p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-[#EDE9F7] flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><path d="M2 8l5 5L18 2" stroke="#5B3FBE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-2">We have your enquiry.</h3>
        <p className="text-[15px] text-[#3F3F4A]">We will be in touch within one working day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#D8D8DE] rounded-[14px] p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[12px] font-semibold text-[#2A1B5C] uppercase tracking-[0.08em] mb-1">Name <span className="text-[#D4A537]">*</span></label>
          <input required name="name" type="text" placeholder="Your name" className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[14px] text-[#2A1B5C] placeholder:text-[#9A9AA8] focus:outline-none focus:ring-2 focus:ring-[#5B3FBE]/30" />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#2A1B5C] uppercase tracking-[0.08em] mb-1">Email <span className="text-[#D4A537]">*</span></label>
          <input required name="email" type="email" placeholder="you@company.com" className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[14px] text-[#2A1B5C] placeholder:text-[#9A9AA8] focus:outline-none focus:ring-2 focus:ring-[#5B3FBE]/30" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[12px] font-semibold text-[#2A1B5C] uppercase tracking-[0.08em] mb-1">Phone</label>
          <input name="phone" type="tel" placeholder="+91 98765 43210" className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[14px] text-[#2A1B5C] placeholder:text-[#9A9AA8] focus:outline-none focus:ring-2 focus:ring-[#5B3FBE]/30" />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#2A1B5C] uppercase tracking-[0.08em] mb-1">Company</label>
          <input name="company" type="text" placeholder="Company name" className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[14px] text-[#2A1B5C] placeholder:text-[#9A9AA8] focus:outline-none focus:ring-2 focus:ring-[#5B3FBE]/30" />
        </div>
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-[#2A1B5C] uppercase tracking-[0.08em] mb-1">Service interest</label>
        <select name="service" defaultValue={defaultService} className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[14px] text-[#2A1B5C] focus:outline-none focus:ring-2 focus:ring-[#5B3FBE]/30 bg-white">
          <option value="">Not sure yet: tell us your goal</option>
          <option value="Full-Funnel Programme">Full-Funnel Programme (flagship)</option>
          <option value="Google Ads">Google Ads & Search Marketing</option>
          <option value="SEO / AEO">SEO / AEO</option>
          <option value="GMB Optimisation">GMB Optimisation</option>
          <option value="YouTube">YouTube Video Optimisation</option>
          <option value="Meta Ads">Meta Ads</option>
          <option value="LinkedIn & Social">LinkedIn & Organic Social</option>
          <option value="Thought Leadership & GEO">Thought Leadership & GEO</option>
          <option value="Email Marketing">Email Marketing</option>
          <option value="Site Performance & CRO">Site Performance & Conversion</option>
        </select>
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-[#2A1B5C] uppercase tracking-[0.08em] mb-1">Monthly ad budget</label>
        <select name="budget" className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[14px] text-[#2A1B5C] focus:outline-none focus:ring-2 focus:ring-[#5B3FBE]/30 bg-white">
          <option value="">Not running paid ads yet</option>
          <option value="Under ₹1L">Under ₹1 lakh / month</option>
          <option value="₹1L–₹5L">₹1L – ₹5L / month</option>
          <option value="₹5L+">₹5 lakh+ / month</option>
        </select>
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-[#2A1B5C] uppercase tracking-[0.08em] mb-1">What are you trying to grow?</label>
        <textarea name="message" rows={3} placeholder="Tell us about your business and current situation..." className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[14px] text-[#2A1B5C] placeholder:text-[#9A9AA8] focus:outline-none focus:ring-2 focus:ring-[#5B3FBE]/30 resize-none" />
      </div>
      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        name="_gotcha"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      />

      {status === "error" && (
        <p className="text-[13px] text-red-600">Something went wrong. Please try again or email us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-[14px] rounded-full hover:scale-[1.01] transition-transform disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Book a discovery call"}
      </button>
    </form>
  );
}
