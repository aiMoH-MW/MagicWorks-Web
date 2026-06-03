"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "success" | "error";

export default function ApplyForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", linkedin_url: "", portfolio_url: "", cover_letter: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, job_slug: jobSlug, job_title: jobTitle }),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-8 text-center">
        <div className="text-[36px] mb-3">✓</div>
        <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-2">Application received.</h3>
        <p className="text-[14px] text-[#3F3F4A]">We review every application and will be in touch if there is a fit.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-8 space-y-4">
      <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C]">Apply for this role</h3>

      {[
        { name: "name", label: "Full name *", type: "text", required: true, placeholder: "Your name" },
        { name: "email", label: "Email *", type: "email", required: true, placeholder: "you@email.com" },
        { name: "phone", label: "Phone", type: "tel", required: false, placeholder: "+91 98xxx xxxxx" },
        { name: "linkedin_url", label: "LinkedIn URL", type: "url", required: false, placeholder: "linkedin.com/in/you" },
        { name: "portfolio_url", label: "Portfolio / Work URL", type: "url", required: false, placeholder: "yoursite.com or Behance, GitHub…" },
      ].map(f => (
        <div key={f.name}>
          <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">{f.label}</label>
          <input name={f.name} type={f.type} required={f.required} placeholder={f.placeholder}
            value={form[f.name as keyof typeof form]} onChange={handleChange}
            className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors" />
        </div>
      ))}

      <div>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">Cover letter / note</label>
        <textarea name="cover_letter" rows={4} placeholder="Why this role? What would you bring?"
          value={form.cover_letter} onChange={handleChange}
          className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] resize-none focus:outline-none focus:border-[#5B3FBE] transition-colors" />
      </div>

      {state === "error" && <p className="text-red-600 text-[13px]">Something went wrong. Email us at careers@magicworksitsolutions.com</p>}

      <button type="submit" disabled={state === "submitting"}
        className="w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-[14px] rounded-full border-none cursor-pointer hover:scale-[1.01] transition-transform disabled:opacity-60">
        {state === "submitting" ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}
