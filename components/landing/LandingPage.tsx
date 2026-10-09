import LandingForm, { type LandingField } from "./LandingForm";
import StickyCta from "./StickyCta";

/* ------------------------------------------------------------------ */
/* Config types                                                        */
/* ------------------------------------------------------------------ */

export type IconName =
  | "bolt" | "eye" | "chart" | "check" | "doc" | "search" | "display"
  | "video" | "users" | "code" | "cart" | "lock" | "wrench" | "chat"
  | "target" | "palette" | "repeat" | "bulb" | "clock" | "megaphone";

type Item = { icon?: IconName; label?: string; title: string; text: string };

export type Section =
  | { type: "intro"; eyebrow: string; title: string; paragraphs: string[]; cards?: Item[]; tone?: "white" | "dark" }
  | { type: "icons"; eyebrow: string; title: string; intro?: string; items: Item[] }
  | { type: "badges"; eyebrow: string; title: string; intro?: string; items: Item[] }
  | { type: "why"; eyebrow: string; title: string; bullets: string[] }
  | { type: "cards"; eyebrow: string; title: string; items: Item[] }
  | { type: "process"; eyebrow: string; title: string; steps: { title: string; text: string }[] }
  | { type: "fit"; eyebrow: string; title: string; goodLabel: string; badLabel: string; good: string[]; bad: string[] }
  | { type: "faq"; eyebrow: string; title: string; items: { q: string; a: string }[] };

export interface LandingConfig {
  eyebrow: string;
  h1: string;
  lead: string;
  ticks: string[];
  form: {
    title: string;
    subtitle: string;
    cta: string;
    sourcePage: string;
    formName: string;
    pillar: string;
    fields: LandingField[];
  };
  sections: Section[];
  finalCta: { title: string; text: string; ticks: string[]; button: string };
  stickyLabel: string;
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const ICONS: Record<IconName, string> = {
  bolt: "M13 10V3L4 14h7v7l9-11h-7z",
  eye: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  doc: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  search: "M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z",
  display: "M3 3h18v14H3V3zm0 18h18M8 21l4-4 4 4",
  video: "M15 10l4.55-2.4A1 1 0 0121 8.5v7a1 1 0 01-1.45.9L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
  users: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 3a4 4 0 00-3-3.87M5 11a4 4 0 013-3.87",
  code: "M10 20l4-16m4 4l4 4-4 4M6 8l-4 4 4 4",
  cart: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
  lock: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  wrench: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  chat: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zm0-5a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 100-4 2 2 0 000 4z",
  palette: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  repeat: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  bulb: "M9.663 17h4.673M12 3a6 6 0 00-6 6c0 2.5 1.5 4 2 5s.5 2 .5 2h7s0-1 .5-2 2-2.5 2-5a6 6 0 00-6-6z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  megaphone: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
};

function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className ?? "h-5 w-5"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[name]} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

const HEAD = "font-[family-name:var(--font-head)]";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.15em] text-[#D4A537]">
      {children}
    </p>
  );
}

function H2({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2
      className={`${HEAD} mb-6 max-w-2xl text-[30px] font-semibold leading-[1.15] sm:text-[40px] ${
        dark ? "text-white" : "text-[#2A1B5C]"
      }`}
    >
      {children}
    </h2>
  );
}

function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#enquire"
      className="inline-block rounded-full bg-[#D4A537] px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-[#2A1B5C] transition hover:brightness-105 hover:scale-[1.02]"
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Section renderers                                                   */
/* ------------------------------------------------------------------ */

function Block({ s, i }: { s: Section; i: number }) {
  switch (s.type) {
    case "intro": {
      const dark = s.tone === "dark";
      return (
        <section className={`w-full px-6 py-20 ${dark ? "bg-[#2A1B5C]" : "bg-white"}`}>
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <H2 dark={dark}>{s.title}</H2>
            <div className="max-w-3xl space-y-4">
              {s.paragraphs.map((p, k) => (
                <p
                  key={k}
                  className={`text-[16px] leading-[1.75] ${dark ? "text-white/80" : "text-[#3F3F4A]"}`}
                >
                  {p}
                </p>
              ))}
            </div>
            {s.cards && (
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {s.cards.map((c) => (
                  <div
                    key={c.title}
                    className={`rounded-2xl p-7 transition hover:-translate-y-1 ${
                      dark
                        ? "border border-white/10 bg-white/[0.06]"
                        : "border border-black/10 bg-[#F7F3EA]"
                    }`}
                  >
                    <h3
                      className={`${HEAD} mb-2 text-[20px] font-semibold ${dark ? "text-[#D4A537]" : "text-[#2A1B5C]"}`}
                    >
                      {c.title}
                    </h3>
                    <p className={`text-[14px] leading-relaxed ${dark ? "text-white/75" : "text-[#3F3F4A]"}`}>
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );
    }

    case "icons":
      return (
        <section className="w-full bg-[#F7F3EA] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <H2>{s.title}</H2>
            {s.intro && <p className="mb-10 max-w-2xl text-[16px] leading-relaxed text-[#3F3F4A]">{s.intro}</p>}
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
              {s.items.map((it) => (
                <div key={it.title}>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F4E6C8] text-[#2A1B5C]">
                    <Icon name={it.icon ?? "check"} />
                  </div>
                  <h3 className="mb-2 text-[16px] font-semibold text-[#2A1B5C]">{it.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#3F3F4A]">{it.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "badges":
      return (
        <section className="w-full bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <H2>{s.title}</H2>
            {s.intro && <p className="mb-12 max-w-2xl text-[16px] leading-relaxed text-[#3F3F4A]">{s.intro}</p>}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
              {s.items.map((it) => (
                <div key={it.title} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#2A1B5C] text-[#D4A537] shadow-lg shadow-[#2A1B5C]/20">
                    <Icon name={it.icon ?? "check"} className="h-6 w-6" />
                  </div>
                  <p className="mb-1 text-[14px] font-semibold text-[#2A1B5C]">{it.title}</p>
                  <p className="text-[12px] leading-snug text-[#3F3F4A]">{it.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "why":
      return (
        <section className="w-full bg-[#2A1B5C] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <H2 dark>{s.title}</H2>
            <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
              {s.bullets.map((b) => (
                <div key={b} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4A537] text-[13px] font-bold text-[#2A1B5C]">
                    ✓
                  </span>
                  <p className="text-[15px] leading-snug text-white/90">{b}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <CtaButton>Talk to us</CtaButton>
            </div>
          </div>
        </section>
      );

    case "cards":
      return (
        <section className="w-full bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <H2>{s.title}</H2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {s.items.map((it) => (
                <div
                  key={it.title}
                  className="group rounded-2xl border border-black/10 bg-white p-7 transition hover:-translate-y-1 hover:border-[#D4A537] hover:shadow-xl"
                >
                  {it.label && (
                    <span className="mb-3 inline-block rounded-full bg-[#EDE8F8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#5B3FBE]">
                      {it.label}
                    </span>
                  )}
                  <h3 className={`${HEAD} mb-2 text-[20px] font-semibold text-[#2A1B5C]`}>{it.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#3F3F4A]">{it.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "process":
      return (
        <section className={`w-full px-6 py-20 ${i % 2 ? "bg-[#F7F3EA]" : "bg-white"}`}>
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <H2>{s.title}</H2>
            <div
              className={`mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 ${
                s.steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
              }`}
            >
              {s.steps.map((st, k) => (
                <div key={st.title} className="relative rounded-2xl border border-black/10 bg-white p-6">
                  <p className={`${HEAD} mb-3 text-[32px] font-semibold text-[#D4A537]`}>
                    {String(k + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mb-2 text-[16px] font-semibold text-[#2A1B5C]">{st.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[#3F3F4A]">{st.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "fit":
      return (
        <section className="w-full bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <H2>{s.title}</H2>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-[#D4A537]/50 bg-[#F4E6C8]/40 p-7">
                <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.12em] text-[#2A1B5C]">{s.goodLabel}</p>
                <ul className="space-y-4">
                  {s.good.map((g) => (
                    <li key={g} className="flex gap-3 text-[15px] leading-snug text-[#3F3F4A]">
                      <span className="mt-0.5 font-bold text-[#2A7A4B]">✓</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#F7F3EA] p-7">
                <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.12em] text-[#2A1B5C]">{s.badLabel}</p>
                <ul className="space-y-4">
                  {s.bad.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-snug text-[#3F3F4A]">
                      <span className="mt-0.5 font-bold text-[#B23A3A]">✕</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      );

    case "faq":
      return (
        <section className="w-full bg-[#F7F3EA] px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <H2>{s.title}</H2>
            <div className="mt-8 space-y-3">
              {s.items.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-black/10 bg-white p-5 open:border-[#D4A537] open:shadow-md"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-[#2A1B5C]">
                    {f.q}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4E6C8] text-[18px] leading-none transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#3F3F4A]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function LandingPage({ config }: { config: LandingConfig }) {
  const faq = config.sections.find((s) => s.type === "faq");
  const faqSchema =
    faq && faq.type === "faq"
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[#2A1B5C] px-6 py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #5B3FBE 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #D4A537 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.15em] text-[#D4A537]">
              {config.eyebrow}
            </p>
            <h1 className={`${HEAD} mb-6 text-[38px] font-semibold leading-[1.05] text-white sm:text-[60px]`}>
              {config.h1}
            </h1>
            <p className="mb-8 max-w-xl text-[18px] leading-relaxed" style={{ color: "#C8B8FF" }}>
              {config.lead}
            </p>
            <ul className="mb-8 flex flex-col gap-3">
              {config.ticks.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[15px] text-white/90">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D4A537] text-[13px] font-bold text-[#2A1B5C]">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="tel:+919764566644"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-white border-b-2 border-[#D4A537] pb-0.5"
            >
              Prefer to talk? +91 97645 66644
            </a>
          </div>

          <div id="enquire" className="scroll-mt-28 lg:col-span-2">
            <LandingForm {...config.form} />
          </div>
        </div>
      </section>

      {config.sections.map((s, i) => (
        <Block key={i} s={s} i={i} />
      ))}

      {/* FINAL CTA */}
      <section className="relative w-full overflow-hidden bg-[#2A1B5C] px-6 py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-[320px] w-[320px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #5B3FBE 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className={`${HEAD} mb-4 text-[32px] font-semibold leading-[1.15] text-white sm:text-[44px]`}>
            {config.finalCta.title}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[16px] leading-relaxed" style={{ color: "#C8B8FF" }}>
            {config.finalCta.text}
          </p>
          <ul className="mx-auto mb-10 flex max-w-md flex-col gap-2.5 text-left">
            {config.finalCta.ticks.map((t) => (
              <li key={t} className="flex items-center gap-3 text-[15px] text-white/90">
                <span className="text-[#D4A537]">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <CtaButton>{config.finalCta.button}</CtaButton>
        </div>
      </section>

      <StickyCta label={config.stickyLabel} />
    </>
  );
}
