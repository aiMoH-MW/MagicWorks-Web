"use client";

import { useState } from "react";
import { trackLeadSubmit } from "@/lib/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

export interface LandingField {
  name: string;
  /** Shown in the admin message and notification email, e.g. "Monthly ad budget" */
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
}

interface Props {
  /** Path of the landing page, saved as source_page (also drives email routing) */
  sourcePage: string;
  /** GTM form_name for the lead_form_submit event */
  formName: string;
  /** Saved as the lead's pillar so it shows correctly in /admin */
  pillar: string;
  title: string;
  subtitle: string;
  cta: string;
  fields: LandingField[];
}

const inputCls =
  "w-full rounded-lg bg-white/95 px-4 py-3 text-[15px] text-[#2A1B5C] placeholder-[#3F3F4A]/60 outline-none focus:ring-2 focus:ring-[#D4A537]";

export default function LandingForm({
  sourcePage,
  formName,
  pillar,
  title,
  subtitle,
  cta,
  fields,
}: Props) {
  const [state, setState] = useState<FormState>("idle");
  const [values, setValues] = useState<Record<string, string>>({
    name: "",
    email: "",
    phone: "",
    company: "",
    _gotcha: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");

    // Dropdown answers go into the message so they show in /admin and the email
    const message = fields
      .map((f) => {
        const picked = f.options.find((o) => o.value === values[f.name]);
        return picked && picked.value ? `${f.label}: ${picked.label}` : "";
      })
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          company: values.company,
          pillar,
          message,
          source_page: sourcePage,
          _gotcha: values._gotcha,
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
      trackLeadSubmit(formName);
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: "#3A2A6E", border: "1px solid rgba(91,63,190,0.4)" }}
        role="status"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4A537] text-[26px] text-[#2A1B5C]">
          ✓
        </div>
        <p className="font-[family-name:var(--font-head)] text-[24px] font-semibold text-white mb-2">
          Thank you. We have your details.
        </p>
        <p className="text-[15px] leading-relaxed mb-5" style={{ color: "#C8B8FF" }}>
          A team member will reach out within one working day. Need us sooner?
        </p>
        <a
          href="tel:+919764566644"
          className="inline-block rounded-full border border-[#D4A537] px-6 py-2.5 text-[13px] font-bold uppercase tracking-[0.08em] text-[#D4A537] hover:bg-[#D4A537] hover:text-[#2A1B5C] transition-colors"
        >
          Call +91 97645 66644
        </a>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-7 sm:p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
      style={{ background: "#3A2A6E", border: "1px solid rgba(91,63,190,0.4)" }}
    >
      <p className="font-[family-name:var(--font-head)] text-white text-[22px] font-semibold mb-1">
        {title}
      </p>
      <p className="text-[14px] mb-6" style={{ color: "#C8B8FF" }}>
        {subtitle}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          className={inputCls}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          className={inputCls}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          autoComplete="tel"
          value={values.phone}
          onChange={handleChange}
          className={inputCls}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          autoComplete="organization"
          value={values.company}
          onChange={handleChange}
          className={inputCls}
        />

        {fields.map((f) => (
          <select
            key={f.name}
            name={f.name}
            value={values[f.name] ?? ""}
            onChange={handleChange}
            className={inputCls}
            aria-label={f.label}
          >
            <option value="">{f.placeholder}</option>
            {f.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ))}

        {/* Honeypot: hidden from humans, bots fill it */}
        <input
          name="_gotcha"
          type="text"
          value={values._gotcha}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
        />

        {state === "error" && (
          <p className="text-[13px] text-[#FFB4B4]">
            Something went wrong. Please try again, or call us on +91 97645 66644.
          </p>
        )}

        <button
          type="submit"
          disabled={state === "submitting"}
          className="mt-1 w-full rounded-full bg-[#D4A537] px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-[#2A1B5C] transition hover:brightness-105 hover:scale-[1.01] disabled:opacity-60"
        >
          {state === "submitting" ? "Sending…" : cta}
        </button>

        <p className="text-center text-[12px]" style={{ color: "#C8B8FF" }}>
          We respond within one working day. No spam, ever.
        </p>
      </form>
    </div>
  );
}
