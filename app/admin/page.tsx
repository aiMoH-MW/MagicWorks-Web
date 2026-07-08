"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "magicworks-admin-2026";

type Tab = "newsletter" | "whitepaper" | "leads" | "consultation" | "careers" | "playbooks";
type CareerSortCol = "date" | "role" | "score";

interface ScoreBreakdown {
  resume_score: number;
  experience_score: number;
  cover_score: number;
  profile_score: number;
  ctc_score: number;
}

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
  // careers-specific
  job_title?: string;
  job_slug?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_url?: string;
  cover_letter?: string;
  total_experience?: string;
  relevant_experience?: string;
  current_ctc?: string;
  expected_ctc?: string;
  // AI score
  ai_score?: number | null;
  ai_score_breakdown?: ScoreBreakdown | null;
  ai_score_label?: string | null;
  ai_score_summary?: string | null;
  ai_scored_at?: string | null;
}

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "newsletter",   label: "Newsletter",             icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { key: "whitepaper",   label: "Whitepaper Leads",       icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { key: "playbooks",    label: "Playbook Downloads",     icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { key: "leads",        label: "Service Enquiries",      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { key: "consultation", label: "Consultation Enquiries", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { key: "careers",      label: "Job Applications",       icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
];

function exportCSV(rows: Row[], filename: string) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(","), ...rows.map((r) => keys.map((k) => JSON.stringify((r as unknown as Record<string, unknown>)[k] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── AI Score Badge ────────────────────────────────────────────────────────────
function ScoreBadge({ score, label }: { score: number; label: string }) {
  const color =
    score >= 80 ? { bg: "bg-emerald-500/20", text: "text-emerald-400", ring: "ring-emerald-500/40" }
    : score >= 60 ? { bg: "bg-blue-500/20",   text: "text-blue-400",   ring: "ring-blue-500/40" }
    : score >= 40 ? { bg: "bg-amber-500/20",  text: "text-amber-400",  ring: "ring-amber-500/40" }
    :               { bg: "bg-red-500/20",    text: "text-red-400",    ring: "ring-red-500/40" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ring-1 ${color.bg} ${color.ring}`}>
      <span className={`text-[13px] font-bold tabular-nums ${color.text}`}>{score}</span>
      <span className={`text-[10px] font-medium ${color.text} opacity-80`}>{label}</span>
    </span>
  );
}

// ── Score Breakdown Bar ───────────────────────────────────────────────────────
function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 80 ? "bg-emerald-500" : value >= 60 ? "bg-blue-500" : value >= 40 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[11px] text-white/50">{label}</span>
        <span className="text-[11px] font-semibold text-white/80">{value}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// ── Sort Icon ─────────────────────────────────────────────────────────────────
function SortIcon({ active, asc }: { active: boolean; asc: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round"
      className={"inline ml-1 " + (active ? "text-[#D4A537]" : "text-white/20")}>
      {active && asc
        ? <polyline points="18 15 12 9 6 15" />
        : <polyline points="6 9 12 15 18 9" />}
    </svg>
  );
}

// ── Drag-to-pan horizontal scroll ────────────────────────────────────────────
function DragScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  function onMouseDown(e: React.MouseEvent) {
    dragging.current = true;
    startX.current = e.pageX - (ref.current?.offsetLeft ?? 0);
    scrollLeft.current = ref.current?.scrollLeft ?? 0;
    if (ref.current) ref.current.style.cursor = "grabbing";
    e.preventDefault();
  }
  function onMouseUp() {
    dragging.current = false;
    if (ref.current) ref.current.style.cursor = "grab";
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!dragging.current || !ref.current) return;
    const x = e.pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = scrollLeft.current - (x - startX.current);
  }

  return (
    <div
      ref={ref}
      className="overflow-x-auto select-none"
      style={{ cursor: "grab" }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {children}
    </div>
  );
}

// ── Careers Row with Expandable Score Panel ───────────────────────────────────
function CareerRow({ row }: { row: Row }) {
  const [open, setOpen] = useState(false);

  const val = (key: string) => (row as unknown as Record<string, unknown>)[key];
  const display = (key: string) => {
    const v = val(key);
    if (key === "created_at") return new Date(v as string).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    return (v as string) ?? "—";
  };

  const cols = ["created_at", "job_title", "name", "email", "phone", "total_experience", "relevant_experience", "current_ctc", "expected_ctc", "linkedin_url", "portfolio_url", "resume_url", "ai_score"];

  return (
    <>
      <tr
        className={"border-b border-white/[0.05] transition-colors cursor-pointer " + (open ? "bg-white/[0.05]" : "hover:bg-white/[0.03]")}
        onClick={() => setOpen((o) => !o)}
      >
        {cols.map((c) => {
          const isLink   = c === "linkedin_url" || c === "portfolio_url";
          const isResume = c === "resume_url";
          const isScore  = c === "ai_score";
          const rawVal   = val(c);
          const disp     = display(c);

          return (
            <td key={c} className={"px-4 py-3 align-middle text-white/70 text-[12.5px] " + (isScore ? "" : "max-w-[160px] truncate")}>
              {isScore ? (
                row.ai_score != null && row.ai_score_label ? (
                  <ScoreBadge score={row.ai_score} label={row.ai_score_label} />
                ) : (
                  <span className="text-white/20 text-[11px] italic">Scoring…</span>
                )
              ) : c === "email" ? (
                <a href={"mailto:" + disp} onClick={(e) => e.stopPropagation()} className="text-[#D4A537] hover:underline">{disp}</a>
              ) : isResume && rawVal ? (
                <a href={disp} target="_blank" rel="noopener noreferrer nofollow" onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[#D4A537] hover:underline text-[12px] font-medium">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download
                </a>
              ) : isLink && rawVal ? (
                <a href={(disp as string).startsWith("http") ? disp : "https://" + disp}
                  target="_blank" rel="noopener noreferrer nofollow" onClick={(e) => e.stopPropagation()}
                  className="text-[#C8B8FF] hover:underline text-[12px]">{disp}</a>
              ) : c === "job_title" ? (
                <span className="bg-white/[0.08] text-white/50 px-2 py-0.5 rounded text-[11px]">{disp}</span>
              ) : disp}
            </td>
          );
        })}
        {/* Expand chevron */}
        <td className="px-3 py-3 text-white/20">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            className={"transition-transform " + (open ? "rotate-180" : "")}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </td>
      </tr>

      {/* Expanded score panel */}
      {open && (
        <tr className="border-b border-white/[0.05] bg-[#0E0A1F]/80">
          <td colSpan={cols.length + 1} className="px-6 py-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-3 font-semibold">AI Score Breakdown</p>
                {row.ai_score != null && row.ai_score_breakdown ? (
                  <div className="space-y-2.5">
                    <ScoreBar label="Resume match"         value={row.ai_score_breakdown.resume_score} />
                    <ScoreBar label="Experience fit"       value={row.ai_score_breakdown.experience_score} />
                    <ScoreBar label="Cover letter"         value={row.ai_score_breakdown.cover_score} />
                    <ScoreBar label="Profile completeness" value={row.ai_score_breakdown.profile_score} />
                    <ScoreBar label="CTC fit"              value={row.ai_score_breakdown.ctc_score} />
                  </div>
                ) : (
                  <p className="text-white/30 text-[12px]">Score not yet available — check back in ~30 seconds.</p>
                )}
                {row.ai_scored_at && (
                  <p className="text-white/20 text-[10px] mt-3">
                    Scored {new Date(row.ai_scored_at).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                )}
              </div>
              <div className="space-y-4">
                {row.ai_score_summary && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-2 font-semibold">AI Summary</p>
                    <p className="text-[13px] text-white/70 leading-relaxed">{row.ai_score_summary}</p>
                  </div>
                )}
                {row.cover_letter && (
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 mb-2 font-semibold">Cover Letter</p>
                    <p className="text-[12px] text-white/50 leading-relaxed whitespace-pre-wrap">{row.cover_letter}</p>
                  </div>
                )}
                {!row.ai_score_summary && !row.cover_letter && (
                  <p className="text-white/20 text-[12px] italic">No additional details.</p>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ── Sortable header cell for careers table ────────────────────────────────────
function CareerTh({
  label, sortCol, currentSort, onSort,
}: {
  label: string;
  sortCol?: CareerSortCol;
  currentSort: { col: CareerSortCol; dir: "asc" | "desc" };
  onSort?: (col: CareerSortCol) => void;
}) {
  const sortable = !!(sortCol && onSort);
  const active = sortable && currentSort.col === sortCol;
  const baseClass = "text-left px-4 py-3 text-white/30 uppercase tracking-[0.1em] text-[10px] font-semibold whitespace-nowrap select-none";
  const extraClass = sortable ? " cursor-pointer hover:text-white/60 transition-colors" : "";
  const activeClass = active ? " !text-[#D4A537]/80" : "";
  return (
    <th
      className={baseClass + extraClass + activeClass}
      onClick={sortable ? () => onSort!(sortCol!) : undefined}
    >
      {label}
      {sortable && <SortIcon active={active} asc={currentSort.dir === "asc"} />}
    </th>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed]   = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab]         = useState<Tab>("newsletter");
  const [rows, setRows]       = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [counts, setCounts]   = useState<Record<Tab, number>>({ newsletter: 0, whitepaper: 0, playbooks: 0, leads: 0, consultation: 0, careers: 0 });
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo]   = useState("");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [careerSort, setCareerSort] = useState<{ col: CareerSortCol; dir: "asc" | "desc" }>({ col: "date", dir: "desc" });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

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

  useEffect(() => { setSelectedIds(new Set()); }, [tab]);

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

  async function handleDelete() {
    if (!selectedIds.size) return;
    if (!confirm(`Delete ${selectedIds.size} record${selectedIds.size > 1 ? "s" : ""}? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-secret": ADMIN_SECRET },
        body: JSON.stringify({ ids: [...selectedIds], tab }),
      });
      if (!res.ok) throw new Error("Delete failed");
      const toRemove = selectedIds.size;
      setSelectedIds(new Set());
      setCounts((prev) => ({ ...prev, [tab]: Math.max(0, prev[tab] - toRemove) }));
      await fetchRows(tab, dateFrom, dateTo, sortDir);
    } catch {
      alert("Delete failed. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  function toggleCareerSort(col: CareerSortCol) {
    setCareerSort((prev) =>
      prev.col === col
        ? { col, dir: prev.dir === "desc" ? "asc" : "desc" }
        : { col, dir: col === "score" ? "desc" : "asc" }
    );
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

  const newsletterCols = ["created_at", "email", "source"];
  const whitepaperCols = ["created_at", "email", "whitepaper"];
  const playbookCols   = ["created_at", "name", "email", "company", "message", "source_page"];
  const leadsCols      = ["created_at", "name", "email", "phone", "company", "pillar", "message", "source_page"];
  const cols =
    tab === "playbooks"                         ? playbookCols
    : tab === "leads" || tab === "consultation" ? leadsCols
    : tab === "newsletter"                      ? newsletterCols
    : tab === "careers"                         ? []
    : whitepaperCols;

  const hasFilter  = !!(dateFrom || dateTo);
  const activeTab  = TABS.find((t) => t.key === tab)!;

  const careerRows = tab === "careers"
    ? [...rows].sort((a, b) => {
        const mul = careerSort.dir === "desc" ? -1 : 1;
        if (careerSort.col === "score") {
          return mul * ((a.ai_score ?? -1) - (b.ai_score ?? -1));
        }
        if (careerSort.col === "date") {
          return mul * (new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        }
        const ra = (a.job_title ?? "").toLowerCase();
        const rb = (b.job_title ?? "").toLowerCase();
        return mul * ra.localeCompare(rb);
      })
    : rows;

  return (
    <div className="min-h-screen bg-[#0A0818] text-white flex">

      {/* ── Sidebar ───────────────────────────────────────────── */}
      <aside className={"shrink-0 bg-[#0E0A1F] border-r border-white/[0.07] flex flex-col transition-all duration-200 " + (sidebarOpen ? "w-[220px]" : "w-[52px]")}>
        {/* Header + collapse toggle */}
        <div className={"border-b border-white/[0.07] flex items-center " + (sidebarOpen ? "px-6 py-6 justify-between" : "px-0 py-[18px] justify-center")}>
          {sidebarOpen && (
            <div>
              <p className="text-[#D4A537] text-[10px] uppercase tracking-[0.22em] font-semibold mb-[2px]">Admin</p>
              <p className="text-white text-[15px] font-bold leading-tight">MagicWorks</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="text-white/30 hover:text-white/70 transition-colors p-1 rounded"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              {sidebarOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><polyline points="14 6 6 6 6 14"/></>
                : <><line x1="6" y1="6" x2="18" y2="18"/><polyline points="10 18 18 18 18 10"/></>
              }
            </svg>
          </button>
        </div>
        <nav className="flex-1 py-4">
          {sidebarOpen && <p className="px-6 mb-2 text-white/25 text-[10px] uppercase tracking-[0.18em]">Data</p>}
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                title={!sidebarOpen ? t.label : undefined}
                className={"w-full flex items-center justify-between text-left transition-all group border-r-[3px] " + (sidebarOpen ? "px-6 py-[10px] " : "px-0 py-[10px] justify-center ") + (active ? "bg-[#D4A537]/10 border-[#D4A537]" : "border-transparent hover:bg-white/[0.04]")}>
                <div className={"flex items-center min-w-0 " + (sidebarOpen ? "gap-3" : "gap-0 justify-center w-full")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"
                    className={active ? "text-[#D4A537]" : "text-white/30 group-hover:text-white/50 transition-colors"}>
                    <path d={t.icon} />
                  </svg>
                  {sidebarOpen && (
                    <span className={"text-[12.5px] font-medium leading-snug truncate " + (active ? "text-[#D4A537]" : "text-white/50 group-hover:text-white/80 transition-colors")}>
                      {t.label}
                    </span>
                  )}
                </div>
                {sidebarOpen && (
                  <span className={"ml-2 shrink-0 text-[10px] font-bold px-[7px] py-[2px] rounded-full " + (active ? "bg-[#D4A537] text-[#2A1B5C]" : "bg-white/[0.08] text-white/30")}>
                    {counts[t.key]}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        {sidebarOpen && (
          <div className="px-6 py-4 border-t border-white/[0.07]">
            <p className="text-white/20 text-[10px]">MagicWorks © 2026</p>
          </div>
        )}
      </aside>

      {/* ── Main ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <div className="border-b border-white/[0.07] px-8 py-4 flex items-center justify-between bg-[#0E0A1F]">
          <div>
            <h1 className="text-white text-[18px] font-bold leading-none">{activeTab.label}</h1>
            {tab === "careers" && (
              <p className="text-white/30 text-[11px] mt-1">Click any row to see AI score breakdown · Click column headers to sort · Drag table to scroll</p>
            )}
            {hasFilter && tab !== "careers" && <p className="text-white/30 text-[11px] mt-1">Date filter active</p>}
          </div>
          <div className="flex items-center gap-2">
            {selectedIds.size > 0 && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 text-[12px] text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/60 rounded-lg px-4 py-2 transition-colors disabled:opacity-50">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                </svg>
                {deleting ? "Deleting…" : `Delete ${selectedIds.size} selected`}
              </button>
            )}
            <button
              onClick={() => exportCSV(rows, tab + "-" + new Date().toISOString().slice(0, 10) + ".csv")}
              className="flex items-center gap-2 text-[12px] text-white/50 hover:text-white border border-white/[0.12] hover:border-white/30 rounded-lg px-4 py-2 transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-8 py-4 border-b border-white/[0.07] flex flex-wrap items-center gap-3 bg-[#0E0A1F]/60">
          {tab !== "careers" && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-white/30 text-[11px] uppercase tracking-[0.1em]">From</span>
                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}
                  className="bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-[6px] text-white text-[12px] focus:outline-none focus:border-[#D4A537]/60 [color-scheme:dark]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/30 text-[11px] uppercase tracking-[0.1em]">To</span>
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)}
                  className="bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-[6px] text-white text-[12px] focus:outline-none focus:border-[#D4A537]/60 [color-scheme:dark]" />
              </div>
              <button onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
                className="flex items-center gap-[6px] text-[12px] text-white/50 hover:text-white border border-white/[0.12] hover:border-white/30 rounded-lg px-3 py-[6px] transition-colors">
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
            </>
          )}
          {tab === "careers" && (
            <span className="text-white/25 text-[11px] italic">Click Date, Role or AI Score headers to sort ↑↓</span>
          )}
          <span className="ml-auto text-white/20 text-[11px]">
            {rows.length} records{selectedIds.size > 0 ? ` · ${selectedIds.size} selected` : ""}
          </span>
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
            ) : tab === "careers" ? (
              /* ── Careers table: drag-to-pan + sortable headers ── */
              <DragScroll>
                <table className="w-full text-[13px]" style={{ minWidth: 1100 }}>
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      <CareerTh label="Date"         sortCol="date"  currentSort={careerSort} onSort={toggleCareerSort} />
                      <CareerTh label="Role"         sortCol="role"  currentSort={careerSort} onSort={toggleCareerSort} />
                      <CareerTh label="Name"                         currentSort={careerSort} />
                      <CareerTh label="Email"                        currentSort={careerSort} />
                      <CareerTh label="Phone"                        currentSort={careerSort} />
                      <CareerTh label="Total Exp"                    currentSort={careerSort} />
                      <CareerTh label="Rel. Exp"                     currentSort={careerSort} />
                      <CareerTh label="Current CTC"                  currentSort={careerSort} />
                      <CareerTh label="Expected CTC"                 currentSort={careerSort} />
                      <CareerTh label="LinkedIn"                     currentSort={careerSort} />
                      <CareerTh label="Portfolio"                    currentSort={careerSort} />
                      <CareerTh label="Resume"                       currentSort={careerSort} />
                      <CareerTh label="AI Score" sortCol="score"    currentSort={careerSort} onSort={toggleCareerSort} />
                      <CareerTh label=""                             currentSort={careerSort} />
                    </tr>
                  </thead>
                  <tbody>
                    {careerRows.map((row, i) => (
                      <CareerRow key={row.id ?? i} row={row} />
                    ))}
                  </tbody>
                </table>
              </DragScroll>
            ) : (
              /* Generic table for other tabs */
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      <th className="px-4 py-3 w-10">
                        <input
                          type="checkbox"
                          checked={rows.length > 0 && rows.every((r) => selectedIds.has(r.id))}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedIds(new Set(rows.map((r) => r.id)));
                            else setSelectedIds(new Set());
                          }}
                          className="accent-[#D4A537] w-3.5 h-3.5 cursor-pointer"
                        />
                      </th>
                      {cols.map((c) => (
                        <th key={c} className="text-left px-5 py-3 text-white/30 uppercase tracking-[0.1em] text-[10px] font-semibold whitespace-nowrap">
                          {c.replace(/_/g, " ")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={row.id ?? i} className={"border-b border-white/[0.05] transition-colors " + (selectedIds.has(row.id) ? "bg-[#D4A537]/[0.06]" : "hover:bg-white/[0.03]")}>
                        <td className="px-4 py-3 w-10">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(row.id)}
                            onChange={(e) => {
                              setSelectedIds((prev) => {
                                const next = new Set(prev);
                                if (e.target.checked) next.add(row.id);
                                else next.delete(row.id);
                                return next;
                              });
                            }}
                            className="accent-[#D4A537] w-3.5 h-3.5 cursor-pointer"
                          />
                        </td>
                        {cols.map((c) => {
                          const rawVal = (row as unknown as Record<string, unknown>)[c];
                          const display = c === "created_at"
                            ? new Date(rawVal as string).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                            : (rawVal as string) ?? "—";
                          const isWrap   = c === "message" || c === "source_page" || c === "cover_letter";
                          const isLink   = c === "linkedin_url" || c === "portfolio_url";
                          const isResume = c === "resume_url";
                          return (
                            <td key={c} className={"px-5 py-3 align-top text-white/70 " + (isWrap ? "max-w-[260px] whitespace-pre-wrap break-words text-[12px] leading-[1.6]" : "max-w-[180px] truncate")}>
                              {c === "email" ? (
                                <a href={"mailto:" + display} className="text-[#D4A537] hover:underline">{display}</a>
                              ) : isResume && display !== "—" ? (
                                <a href={display} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1 text-[#D4A537] hover:underline text-[12px] font-medium">
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                  Download
                                </a>
                              ) : isLink && display !== "—" ? (
                                <a href={display.startsWith("http") ? display : "https://" + display} target="_blank" rel="noopener noreferrer nofollow" className="text-[#C8B8FF] hover:underline text-[12px]">{display}</a>
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
