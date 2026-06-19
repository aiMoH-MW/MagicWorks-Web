"use client";
import { useState } from "react";

export default function WebDevelopmentContactForm({
  sourcePage = "/services/web-development",
  defaultProject = "",
}: {
  sourcePage?: string;
  defaultProject?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const parts: string[] = [];
      const project = fd.get("project") as string;
      const timeline = fd.get("timeline") as string;
      const userMsg = fd.get("message") as string;
      if (project) parts.push(`Project type: ${project}`);
      if (timeline) parts.push(`Timeline: ${timeline}`);
      if (userMsg) parts.push(`\n${userMsg}`);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          company: fd.get("company"),
          pillar: "Web Development",
          source_page: sourcePage,
          message: parts.join("\n"),
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
        <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-2">We have your project details.</h3>
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
        <label className="block text-[12px] font-semibold text-[#2A1B5C] uppercase tracking-[0.08em] mb-1">Project type</label>
        <select name="project" defaultValue={defaultProject} className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[14px] text-[#2A1B5C] focus:outline-none focus:ring-2 focus:ring-[#5B3FBE]/30 bg-white">
          <option value="">Not sure yet</option>
          <option value="AI-native website">AI-native website (flagship)</option>
          <option value="E-commerce">E-commerce</option>
          <option value="Portal or member site">Portal or member site</option>
          <option value="WordPress">WordPress</option>
          <option value="Web AMC">Web AMC (maintenance retainer)</option>
        </select>
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-[#2A1B5C] uppercase tracking-[0.08em] mb-1">Timeline</label>
        <select name="timeline" className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[14px] text-[#2A1B5C] focus:outline-none focus:ring-2 focus:ring-[#5B3FBE]/30 bg-white">
          <option value="">Just Exploring for Now</option>
          <option value="ASAP">ASAP we have deadline</option>
          <option value="1 month">1 Month</option>
          <option value="1–2 months">1 to 2 months</option>
          <option value="2–4 months">2 to 4 months</option>
        </select>
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-[#2A1B5C] uppercase tracking-[0.08em] mb-1">Tell us about your project</label>
        <textarea name="message" rows={3} placeholder="What does the site need to do? Existing stack, rough scope, any constraints..." className="w-full border border-[#D8D8DE] rounded-[8px] px-4 py-3 text-[14px] text-[#2A1B5C] placeholder:text-[#9A9AA8] focus:outline-none focus:ring-2 focus:ring-[#5B3FBE]/30 resize-none" />
      </div>
      {status === "error" && (
        <p className="text-[13px] text-red-600">Something went wrong. Please try again or email us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-[14px] rounded-full hover:scale-[1.01] transition-transform disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Start a project conversation"}
      </button>
    </form>
  );
}
