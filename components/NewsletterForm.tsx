"use client";
import { useState } from "react";

interface Props {
  source: string;
  variant?: "footer" | "whitepaper";
}

export default function NewsletterForm({ source, variant = "footer" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("success");
      setEmail("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (variant === "whitepaper") {
    return (
      <div className="bg-[#2A1B5C] rounded-[12px] p-6 text-white">
        <div className="w-9 h-9 rounded-full bg-[#D4A537]/20 flex items-center justify-center mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A537" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>
        <h3 className="font-bold text-[17px] leading-snug mb-2">Get the next whitepaper free</h3>
        <p className="text-white/70 text-[13px] leading-[1.6] mb-4">
          AI strategy, marketing automation, and India market insights, delivered when each new guide drops. No spam.
        </p>

        {status === "success" ? (
          <div className="bg-[#D4A537]/20 border border-[#D4A537]/40 rounded-lg px-4 py-3 text-[#D4A537] text-[13px] font-semibold">
            You&apos;re in! We&apos;ll notify you when the next one drops.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A537] transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-2.5 rounded-lg hover:bg-white transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing…" : "Notify Me"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-[12px]">{errorMsg}</p>
            )}
            <p className="text-white/40 text-[11px] text-center">Free. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    );
  }

  // Footer variant
  return (
    <div className="rounded-2xl border border-[#D4A537]/40 bg-white/5 px-8 py-7">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="sm:flex-1">
          <p className="text-[#D4A537] text-[11px] uppercase tracking-[0.18em] font-bold mb-1">Stay ahead</p>
          <p className="text-white text-[18px] font-bold leading-tight mb-1">
            AI & marketing insights, delivered monthly.
          </p>
          <p className="text-white/50 text-[12px]">No spam. Unsubscribe anytime.</p>
        </div>

        {status === "success" ? (
          <div className="bg-[#D4A537]/20 border border-[#D4A537]/40 rounded-xl px-5 py-3 text-[#D4A537] text-[13px] font-semibold whitespace-nowrap">
            You&apos;re subscribed!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 sm:w-auto w-full">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 sm:w-[220px] bg-white/10 border border-white/20 rounded-full px-5 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A537] transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 bg-[#D4A537] text-[#2A1B5C] font-bold text-[12px] uppercase tracking-[0.08em] px-6 py-2.5 rounded-full hover:bg-white transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {status === "loading" ? "…" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
      {status === "error" && (
        <p className="text-red-400 text-[12px] mt-2">{errorMsg}</p>
      )}
    </div>
  );
}
