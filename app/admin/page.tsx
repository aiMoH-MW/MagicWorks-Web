"use client";
import { useState, useEffect, useCallback } from "react";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "magicworks-admin-2026";

type Tab = "newsletter" | "whitepaper" | "leads" | "consultation" | "contact" | "careers" | "playbooks";

interface Row {
  id: string;
  email?: string;
  name?: string;
  source?: string;
  company?: string;
  phone?: string;
  message?: string;
  pillar?: string;
  subject?: string;
  source_page?: string;
  created_at: string;
}

const TABS: { key: Tab; label: string }[] = [
  { key: "newsletter", label: "Newsletter" },
  { key: "whitepaper", label: "Whitepaper Leads" },
  { key: "playbooks", label: "Playbook Downloads" },
  { key: "leads", label: "Service Enquiries" },
  { key: "consultation", label: "Consultation Enquiries" },
  { key: "contact", label: "Contact Page" },
  { key: "careers", label: "Job Applications" },
];

function exportCSV(rows: Row[], filename: string) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(","), ...rows.map((r) => keys.map((k) => JSON.stringify((r as unknown as Record<string,unknown>)[k] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("newsletter");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState<Record<Tab, number>>({ newsletter: 0, whitepaper: 0, playbooks: 0, leads: 0, consultation: 0, contact: 0, careers: 0 });

  const fetchTab = useCallback(async (t: Tab) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/data?tab=${t}`, {
        headers: { "x-admin-secret": ADMIN_SECRET },
      });
      const json = await res.json();
      setRows(json.data ?? []);
      setCounts((prev) => ({ ...prev, [t]: json.data?.length ?? 0 }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchTab(tab);
  }, [authed, tab, fetchTab]);

  // Prefetch counts
  useEffect(() => {
    if (!authed) return;
    (["newsletter", "whitepaper", "playbooks", "leads", "consultation", "contact", "careers"] as Tab[]).forEach(async (t) => {
      const res = await fetch(`/api/admin/data?tab=${t}`, { headers: { "x-admin-secret": ADMIN_SECRET } });
      const json = await res.json();
      setCounts((prev) => ({ ...prev, [t]: json.data?.length ?? 0 }));
    });
  }, [authed]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_SECRET) {
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password.");
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0E0A1F] flex items-center justify-center">
        <div className="w-full max-w-sm bg-[#1A1040] border border-white/10 rounded-2xl p-8">
          <p className="text-[#D4A537] text-[11px] uppercase tracking-[0.18em] mb-2">Admin</p>
          <h1 className="text-white text-[24px] font-bold mb-6">MagicWorks Dashboard</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4A537] text-[14px]"
            />
            {loginError && <p className="text-red-400 text-[13px]">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.1em] py-3 rounded-lg hover:bg-white transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const newsletterCols = ["created_at", "email", "source"];
  const whitepaperCols = ["created_at", "email", "whitepaper"];
  const playbookCols = ["created_at", "name", "email", "company", "message", "source_page"];
  const leadsCols = ["created_at", "name", "email", "phone", "company", "pillar", "message", "source_page"];
  const contactCols = ["created_at", "name", "email", "phone", "subject", "message"];
  const careersCols = ["created_at", "job_title", "name", "email", "phone", "linkedin_url", "portfolio_url", "cover_letter"];
  const cols =
    tab === "playbooks" ? playbookCols
    : tab === "leads" || tab === "consultation" ? leadsCols
    : tab === "newsletter" ? newsletterCols
    : tab === "contact" ? contactCols
    : tab === "careers" ? careersCols
    : whitepaperCols;

  return (
    <div className="min-h-screen bg-[#0E0A1F] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-8 py-5">
        <p className="text-white/40 text-[11px] uppercase tracking-[0.18em] mb-1">Admin</p>
        <h1 className="text-white text-[22px] font-bold">MagicWorks — Dashboard</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-white/10 pb-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.1em] border-b-2 transition-colors -mb-[1px] ${
                tab === t.key
                  ? "border-[#D4A537] text-[#D4A537]"
                  : "border-transparent text-white/50 hover:text-white/80"
              }`}
            >
              {t.label} ({counts[t.key]})
            </button>
          ))}
        </div>

        {/* Table header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#D4A537] text-[13px] uppercase tracking-[0.14em] font-bold">
            {TABS.find((t) => t.key === tab)?.label}
          </h2>
          <button
            onClick={() => exportCSV(rows, `${tab}-${new Date().toISOString().slice(0, 10)}.csv`)}
            className="flex items-center gap-2 text-[12px] text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-lg px-4 py-2 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-[#1A1040] border border-white/10 rounded-xl overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-white/40 text-[14px]">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="py-16 text-center text-white/40 text-[14px]">No records yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-white/10">
                    {cols.map((c) => (
                      <th key={c} className="text-left px-5 py-3 text-white/40 uppercase tracking-[0.1em] text-[11px] font-semibold whitespace-nowrap">
                        {c.replace(/_/g, " ")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.id ?? i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      {cols.map((c) => {
                        const val = (row as unknown as Record<string, unknown>)[c];
                        const display = c === "created_at"
                          ? new Date(val as string).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                          : (val as string) ?? "—";
                        const isWrap = c === "message" || c === "source_page" || c === "cover_letter";
                        const isLink = c === "linkedin_url" || c === "portfolio_url";
                        return (
                          <td key={c} className={`px-5 py-3 align-top text-white/80 ${isWrap ? "max-w-[280px] whitespace-pre-wrap break-words text-[12px] leading-[1.6]" : "max-w-[180px] truncate"}`}>
                            {c === "email" ? (
                              <a href={`mailto:${display}`} className="text-[#D4A537] hover:underline">{display}</a>
                            ) : isLink && display !== "—" ? (
                              <a href={display.startsWith("http") ? display : `https://${display}`} target="_blank" rel="noopener noreferrer" className="text-[#C8B8FF] hover:underline text-[12px]">{display}</a>
                            ) : c === "source" || c === "pillar" || c === "job_title" ? (
                              <span className="bg-white/10 text-white/60 px-2 py-0.5 rounded text-[11px]">{display}</span>
                            ) : c === "source_page" ? (
                              <span className="text-[#C8B8FF] text-[11px]">{display}</span>
                            ) : display}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <p className="text-white/30 text-[11px] mt-4 text-right">{rows.length} records</p>
      </div>
    </div>
  );
}
