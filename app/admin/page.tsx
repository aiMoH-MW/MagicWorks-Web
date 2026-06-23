"use client";
import { useState, useEffect, useCallback } from "react";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "magicworks-admin-2026";

type Tab = "newsletter" | "whitepaper" | "leads" | "consultation" | "careers" | "playbooks";

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

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "newsletter",   label: "Newsletter",              icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { key: "whitepaper",   label: "Whitepaper Leads",        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { key: "playbooks",    label: "Playbook Downloads",      icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { key: "leads",        label: "Service Enquiries",       icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { key: "consultation", label: "Consultation Enquiries",  icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { key: "careers",      label: "Job Applications",        icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
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
  const [counts, setCounts] = useState<Record<Tab, number>>({ newsletter: 0, whitepaper: 0, playbooks: 0, leads: 0, consultation: 0, careers: 0 });
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

  const fetchRows = useCallback(async (t: Tab, from: string, to: string, sort: string) => {
    setLoading(true);
    try {
      const p = new URLSearchParams({ tab: t, sort });
      if (from) p.set("from", from);
      if (to)   p.set("to", to);
      const res = await fetch(`/api/admin/data?${p}`, { headers: { "x-admin-secret": ADMIN_SECRET } });
      const json = await res.json();
      setRows(json.data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchRows(tab, dateFrom, dateTo, sortDir);
  }, [authed, tab, dateFrom, dateTo, sortDir, fetchRows]);

  useEffect(() => {
    if (!authed) return;
    (["newsletter", "whitepaper", "playbooks", "leads", "consultation", "careers"] as Tab[]).forEach(async (t) => {
      const res = await fetch(`/api/admin/data?tab=${t}`, { headers: { "x-admin-secret": ADMIN_SECRET } });
      const json = await res.json();
      setCounts((prev) => ({ ...prev, [t]: json.data?.length ?? 0 }));
    });
  }, [authed]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_SECRET) { setAuthed(true); setLoginError(""); }
    else setLoginError("Incorrect password.");
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
            <button type="submit" className="w-full bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.1em] py-3 rounded-lg hover:bg-white transition-colors">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const newsletterCols  = ["created_at", "email", "source"];
  const whitepaperCols  = ["created_at", "email", "whitepaper"];
  const playbookCols    = ["created_at", "name", "email", "company", "message", "source_page"];
  const leadsCols       = ["created_at", "name", "email", "phone", "company", "pillar", "message", "source_page"];
  const careersCols     = ["created_at", "job_title", "name", "email", "phone", "linkedin_url", "portfolio_url", "resume_url", "cover_letter"];
  const cols =
    tab === "playbooks"                        ? playbookCols
    : tab === "leads" || tab === "consultation" ? leadsCols
    : tab === "newsletter"                      ? newsletterCols
    : tab === "careers"                         ? careersCols
    : whitepaperCols;

  const hasFilter = !!(dateFrom || dateTo);
  const activeTab = TABS.find((t) => t.key === tab)!;

  return (
    <div className="min-h-screen bg-[#0A0818] text-white flex">

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="w-[220px] shrink-0 bg-[#0E0A1F] border-r border-white/[0.07] flex flex-col">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-white/[0.07]">
          <p className="text-[#D4A537] text-[10px] uppercase tracking-[0.22em] font-semibold mb-[2px]">Admin</p>
          <p className="text-white text-[15px] font-bold leading-tight">MagicWorks</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          <p className="px-6 mb-2 text-white/25 text-[10px] uppercase tracking-[0.18em]">Data</p>
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`w-full flex items-center justify-between px-6 py-[10px] text-left transition-all group ${
                  active
                    ? "bg-[#D4A537]/10 border-r-[3px] border-[#D4A537]"
                    : "border-r-[3px] border-transparent hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                    className={active ? "text-[#D4A537]" : "text-white/30 group-hover:text-white/50 transition-colors"}>
                    <path d={t.icon} />
                  </svg>
                  <span className={`text-[12.5px] font-medium leading-snug truncate ${active ? "text-[#D4A537]" : "text-white/50 group-hover:text-white/80 transition-colors"}`}>
                    {t.label}
                  </span>
                </div>
                <span className={`ml-2 shrink-0 text-[10px] font-bold px-[7px] py-[2px] rounded-full ${
                  active ? "bg-[#D4A537] text-[#2A1B5C]" : "bg-white/[0.08] text-white/30"
                }`}>
                  {counts[t.key]}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.07]">
          <p className="text-white/20 text-[10px]">MagicWorks © 2026</p>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="border-b border-white/[0.07] px-8 py-4 flex items-center justify-between bg-[#0E0A1F]">
          <div>
            <h1 className="text-white text-[18px] font-bold leading-none">{activeTab.label}</h1>
            {hasFilter && <p className="text-white/30 text-[11px] mt-1">Date filter active</p>}
          </div>
          <button
            onClick={() => exportCSV(rows, `${tab}-${new Date().toISOString().slice(0, 10)}.csv`)}
            className="flex items-center gap-2 text-[12px] text-white/50 hover:text-white border border-white/[0.12] hover:border-white/30 rounded-lg px-4 py-2 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="px-8 py-4 border-b border-white/[0.07] flex flex-wrap items-center gap-3 bg-[#0E0A1F]/60">
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-[11px] uppercase tracking-[0.1em]">From</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-[6px] text-white text-[12px] focus:outline-none focus:border-[#D4A537]/60 [color-scheme:dark]"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-[11px] uppercase tracking-[0.1em]">To</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-[6px] text-white text-[12px] focus:outline-none focus:border-[#D4A537]/60 [color-scheme:dark]"
            />
          </div>
          <button
            onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
            className="flex items-center gap-[6px] text-[12px] text-white/50 hover:text-white border border-white/[0.12] hover:border-white/30 rounded-lg px-3 py-[6px] transition-colors"
          >
            {sortDir === "desc" ? (
              <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>Newest first</>
            ) : (
              <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>Oldest first</>
            )}
          </button>
          {hasFilter && (
            <button onClick={() => { setDateFrom(""); setDateTo(""); }}
              className="text-[11px] text-[#D4A537]/60 hover:text-[#D4A537] transition-colors underline underline-offset-2">
              Clear
            </button>
          )}
          <span className="ml-auto text-white/20 text-[11px]">{rows.length} records</span>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="bg-[#1A1040]/60 border border-white/[0.08] rounded-xl overflow-hidden">
            {loading ? (
              <div className="py-20 text-center text-white/30 text-[14px]">Loading…</div>
            ) : rows.length === 0 ? (
              <div className="py-20 text-center text-white/30 text-[14px]">
                {hasFilter ? "No records in this date range." : "No records yet."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      {cols.map((c) => (
                        <th key={c} className="text-left px-5 py-3 text-white/30 uppercase tracking-[0.1em] text-[10px] font-semibold whitespace-nowrap">
                          {c.replace(/_/g, " ")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={row.id ?? i} className="border-b border-white/[0.05] hover:bg-white/[0.03] transition-colors">
                        {cols.map((c) => {
                          const val = (row as unknown as Record<string, unknown>)[c];
                          const display = c === "created_at"
                            ? new Date(val as string).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                            : (val as string) ?? "—";
                          const isWrap = c === "message" || c === "source_page" || c === "cover_letter";
                          const isLink = c === "linkedin_url" || c === "portfolio_url";
                          const isResume = c === "resume_url";
                          return (
                            <td key={c} className={`px-5 py-3 align-top text-white/70 ${isWrap ? "max-w-[260px] whitespace-pre-wrap break-words text-[12px] leading-[1.6]" : "max-w-[180px] truncate"}`}>
                              {c === "email" ? (
                                <a href={`mailto:${display}`} className="text-[#D4A537] hover:underline">{display}</a>
                              ) : isResume && display !== "—" ? (
                                <a href={display} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 text-[#D4A537] hover:underline text-[12px] font-medium">
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                  Download
                                </a>
                              ) : isLink && display !== "—" ? (
                                <a href={display.startsWith("http") ? display : `https://${display}`} target="_blank" rel="noopener noreferrer nofollow" className="text-[#C8B8FF] hover:underline text-[12px]">{display}</a>
                              ) : c === "source" || c === "pillar" || c === "job_title" ? (
                                <span className="bg-white/[0.08] text-white/50 px-2 py-0.5 rounded text-[11px]">{display}</span>
                              ) : c === "source_page" ? (
                                <span className="text-[#C8B8FF]/70 text-[11px]">{display}</span>
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
        </div>
      </div>
    </div>
  );
}
