"use client";

import { useState, useRef } from "react";

type State = "idle" | "submitting" | "success" | "error";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_MB = 5;

export default function ApplyForm({ jobSlug, jobTitle }: { jobSlug: string; jobTitle: string }) {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", linkedin_url: "", portfolio_url: "", cover_letter: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setResumeError("");
    if (!file) { setResume(null); return; }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setResumeError("Only PDF or Word documents (.doc / .docx) are accepted.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setResumeError(`File must be under ${MAX_MB} MB.`);
      e.target.value = "";
      return;
    }
    setResume(file);
  }

  function removeFile() {
    setResume(null);
    setResumeError("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("job_slug", jobSlug);
      fd.append("job_title", jobTitle);
      if (resume) fd.append("resume", resume, resume.name);

      const res = await fetch("/api/careers", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-[#D4A537]/15 flex items-center justify-center mx-auto mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A537" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-2">Application received.</h3>
        <p className="text-[14px] text-[#3F3F4A]">We review every application and will be in touch if there is a fit.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[10px] p-8 space-y-5">
      <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C]">Apply for this role</h3>

      {/* Name + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { name: "name",  label: "Full name *",  type: "text",  required: true,  placeholder: "Your name" },
          { name: "email", label: "Email *",       type: "email", required: true,  placeholder: "you@email.com" },
        ].map(f => (
          <div key={f.name}>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">{f.label}</label>
            <input name={f.name} type={f.type} required={f.required} placeholder={f.placeholder}
              value={form[f.name as keyof typeof form]} onChange={handleChange}
              className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors" />
          </div>
        ))}
      </div>

      {/* Phone + LinkedIn */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { name: "phone",        label: "Phone",        type: "tel", placeholder: "+91 98xxx xxxxx" },
          { name: "linkedin_url", label: "LinkedIn URL",  type: "url", placeholder: "linkedin.com/in/you" },
        ].map(f => (
          <div key={f.name}>
            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">{f.label}</label>
            <input name={f.name} type={f.type} placeholder={f.placeholder}
              value={form[f.name as keyof typeof form]} onChange={handleChange}
              className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors" />
          </div>
        ))}
      </div>

      {/* Portfolio */}
      <div>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">Portfolio / Work URL</label>
        <input name="portfolio_url" type="url" placeholder="yoursite.com or Behance, GitHub…"
          value={form.portfolio_url} onChange={handleChange}
          className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] focus:outline-none focus:border-[#5B3FBE] transition-colors" />
      </div>

      {/* Resume upload */}
      <div>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">
          Resume / CV <span className="normal-case text-[#9A9AA8]">(PDF or Word · max 5 MB)</span>
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          className={`w-full border border-dashed rounded-[6px] px-4 py-4 flex items-center gap-3 cursor-pointer transition-colors ${
            resume ? "border-[#5B3FBE] bg-[#EDE9F7]/40" : "border-[#D8D8DE] bg-white hover:border-[#5B3FBE]"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={resume ? "#5B3FBE" : "#9A9AA8"}
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>

          <span className={`text-[14px] flex-1 ${resume ? "text-[#2A1B5C] font-medium" : "text-[#9A9AA8]"}`}>
            {resume ? resume.name : "Click to upload your resume"}
          </span>

          {resume ? (
            <button type="button" onClick={e => { e.stopPropagation(); removeFile(); }}
              className="text-[#9A9AA8] hover:text-red-500 transition-colors shrink-0" aria-label="Remove file">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          ) : (
            <span className="text-[11px] text-[#9A9AA8] shrink-0">.pdf · .doc · .docx</span>
          )}
        </div>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
        {resumeError && <p className="text-red-500 text-[12px] mt-1">{resumeError}</p>}
      </div>

      {/* Cover letter */}
      <div>
        <label className="block text-[11px] uppercase tracking-[0.12em] text-[#3F3F4A] mb-1">Cover letter / note</label>
        <textarea name="cover_letter" rows={4} placeholder="Why this role? What would you bring?"
          value={form.cover_letter} onChange={handleChange}
          className="w-full border border-[#D8D8DE] rounded-[6px] px-4 py-3 text-[14px] text-[#1A1A22] resize-none focus:outline-none focus:border-[#5B3FBE] transition-colors" />
      </div>

      {state === "error" && (
        <p className="text-red-600 text-[13px]">
          Something went wrong. Email us at{" "}
          <a href="mailto:careers@magicworksitsolutions.com" className="underline">careers@magicworksitsolutions.com</a>
        </p>
      )}

      <button type="submit" disabled={state === "submitting"}
        className="w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-[14px] rounded-full border-none cursor-pointer hover:scale-[1.01] transition-transform disabled:opacity-60">
        {state === "submitting" ? "Sending…" : "Submit Application"}
      </button>
    </form>
  );
}
