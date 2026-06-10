"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "success" | "error";

const openRoles = [
  {
    slug: "performance-marketing-executive",
    title: "Performance Marketing Executive",
    type: "Full-time · Pune / Hybrid",
    description:
      "Manage Google Ads and Meta campaigns for B2B and B2C clients. Own reporting, optimisation, and strategy. 1–3 years experience preferred.",
    tags: ["Google Ads", "Meta Ads", "Analytics"],
  },
  {
    slug: "ai-automation-specialist",
    title: "AI & Automation Specialist",
    type: "Full-time · Pune / Remote",
    description:
      "Build and deploy AI workflows, automation pipelines, and LLM-powered tools for MagicWorks clients and internal operations.",
    tags: ["AI Workflows", "Python", "n8n / Make"],
  },
  {
    slug: "content-strategist-ai-b2b",
    title: "Content Strategist: AI & B2B",
    type: "Full-time · Pune / Hybrid",
    description:
      "Write long-form content, whitepapers, and thought-leadership pieces for MagicWorks and clients. Strong research skills required.",
    tags: ["Content Strategy", "SEO / AEO", "B2B Writing"],
  },
  {
    slug: "fullstack-developer-nextjs",
    title: "Full-Stack Developer (Next.js)",
    type: "Full-time · Pune / Remote",
    description:
      "Build client websites and internal tools. Strong Next.js, TypeScript, and Supabase skills required. AI integration experience is a big plus.",
    tags: ["Next.js", "TypeScript", "Supabase"],
  },
];

function ApplyForm({ jobSlug, jobTitle, onClose }: { jobSlug: string; jobTitle: string; onClose: () => void }) {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", linkedin_url: "", portfolio_url: "", cover_letter: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
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
      <div className="mt-4 bg-[#F7F3EA] border border-[#D4A537]/40 rounded-[10px] p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#D4A537]/15 flex items-center justify-center mx-auto mb-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A537" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h4 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-1">Application received.</h4>
        <p className="text-[13px] text-[#3F3F4A]">We review every application and will be in touch if there&apos;s a fit.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-[#F7F3EA] border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-7 space-y-4"
    >
      <div className="flex items-center justify-between mb-1">
        <h4 className="font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C]">
          Apply — {jobTitle}
        </h4>
        <button
          type="button"
          onClick={onClose}
          className="text-[#9A9AA8] hover:text-[#2A1B5C] transition-colors"
          aria-label="Close form"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { name: "name", label: "Full name *", type: "text", required: true, placeholder: "Your name" },
          { name: "email", label: "Email *", type: "email", required: true, placeholder: "you@email.com" },
          { name: "phone", label: "Phone", type: "tel", required: false, placeholder: "+91 98xxx xxxxx" },
          { name: "linkedin_url", label: "LinkedIn URL", type: "url", required: false, placeholder: "linkedin.com/in/you" },
        ].map((f) => (
          <div key={f.name}>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">{f.label}</label>
            <input
              name={f.name}
              type={f.type}
              required={f.required}
              placeholder={f.placeholder}
              value={form[f.name as keyof typeof form]}
              onChange={handleChange}
              className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] bg-white focus:outline-none focus:border-[#5B3FBE] transition-colors"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">Portfolio / Work URL</label>
        <input
          name="portfolio_url"
          type="url"
          placeholder="yoursite.com or Behance, GitHub…"
          value={form.portfolio_url}
          onChange={handleChange}
          className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] bg-white focus:outline-none focus:border-[#5B3FBE] transition-colors"
        />
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">Cover letter / note</label>
        <textarea
          name="cover_letter"
          rows={4}
          placeholder="Why this role? What would you bring?"
          value={form.cover_letter}
          onChange={handleChange}
          className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] bg-white resize-none focus:outline-none focus:border-[#5B3FBE] transition-colors"
        />
      </div>

      {state === "error" && (
        <p className="text-red-600 text-[13px]">
          Something went wrong. Email us at{" "}
          <a href="mailto:careers@magicworksitsolutions.com" className="underline">
            careers@magicworksitsolutions.com
          </a>
        </p>
      )}

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="flex-1 bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-[13px] rounded-full border-none cursor-pointer hover:scale-[1.01] transition-transform disabled:opacity-60"
        >
          {state === "submitting" ? "Sending…" : "Submit application"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-[13px] rounded-full border border-[#D8D8DE] text-[13px] text-[#3F3F4A] font-semibold hover:border-[#2A1B5C] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function OpenRoles() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  function toggle(slug: string) {
    setOpenSlug((prev) => (prev === slug ? null : slug));
  }

  return (
    <div className="space-y-4">
      {openRoles.map((role) => {
        const isOpen = openSlug === role.slug;
        return (
          <div
            key={role.slug}
            className={`border border-[#D8D8DE] border-t-[3px] rounded-[12px] p-7 transition-shadow ${
              isOpen
                ? "border-t-[#D4A537] shadow-[0_8px_32px_rgba(42,27,92,0.10)]"
                : "border-t-[#5B3FBE] hover:shadow-[0_8px_32px_rgba(42,27,92,0.10)]"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-1">
                  {role.title}
                </h3>
                <p className="text-[13px] text-[#5B3FBE] font-semibold mb-3">{role.type}</p>
                <p className="text-[15px] text-[#3F3F4A] leading-[1.65] mb-4 max-w-[600px]">
                  {role.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span key={tag} className="text-[12px] font-medium text-[#5B3FBE] bg-[#EDE9F7] px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => toggle(role.slug)}
                className={`shrink-0 self-start font-bold text-[12px] uppercase tracking-[0.08em] px-6 py-3 rounded-full transition-colors whitespace-nowrap ${
                  isOpen
                    ? "bg-[#EDE9F7] text-[#5B3FBE]"
                    : "bg-[#2A1B5C] text-[#F7F3EA] hover:bg-[#D4A537] hover:text-[#2A1B5C]"
                }`}
              >
                {isOpen ? "Close" : "Apply now"}
              </button>
            </div>

            {isOpen && (
              <ApplyForm
                jobSlug={role.slug}
                jobTitle={role.title}
                onClose={() => setOpenSlug(null)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
