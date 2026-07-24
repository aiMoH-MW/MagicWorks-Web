import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsletterFormWP from "@/components/NewsletterForm";

const whitepapers = [
  {
    slug: "ai-automation-readiness-indian-smes",
    title: "AI Automation Readiness for Indian SMEs",
    category: "AI Consultation",
    tagline: "Know exactly where you stand, and where to start.",
    description:
      "Most Indian SMEs know AI matters. Few know where they actually stand. This whitepaper gives founders and operations leaders a structured five-dimension readiness framework (built from MagicWorks AI consultation engagements) to assess your current state, prioritise automation opportunities, and build a phased roadmap without getting sold a solution you're not ready for.",
    whatYoullLearn: [
      "The five dimensions of AI readiness: data, process, people, infrastructure, and governance",
      "How to score your organisation and identify your biggest blockers",
      "Which processes deliver the fastest ROI on automation (and which to avoid first)",
      "A vendor evaluation framework that filters out hype from real capability",
      "A phased 90-day activation roadmap built for resource-constrained SMEs",
      "India-specific benchmarks from real deployments across manufacturing, real estate, and professional services",
    ],
    whoItsFor: [
      "Founders and CEOs evaluating AI adoption",
      "COOs and operations heads responsible for process improvement",
      "Strategy teams building a 2026–27 technology roadmap",
    ],
    pages: "24 pages",
    audience: "Founders · COOs · Operations heads",
    publishedDate: "May 2026",
    googleDriveUrl: "https://drive.google.com/uc?export=download&id=1XXp8iH6y2Anuddt2SrKHNEEq52lqUV72",
  },
  {
    slug: "performance-marketing-roi",
    title: "Performance Marketing ROI Framework",
    category: "Digital Marketing",
    tagline: "Stop guessing what's working. Start measuring what matters.",
    description:
      "Performance marketing in India is full of vanity metrics. This whitepaper delivers the measurement framework MagicWorks uses across client campaigns, covering attribution modelling, CPL and ROAS benchmarks by industry, full-funnel tracking, and a practical audit checklist you can run on your current campaigns today. Built for marketing heads and founders who want to hold their agency accountable.",
    whatYoullLearn: [
      "CPL and ROAS benchmarks across education, real estate, manufacturing, and professional services",
      "How to build a multi-touch attribution model for Indian buyer journeys",
      "The most common ad-spend leakage points, and how to recover them",
      "Full-funnel measurement: from first click to closed revenue",
      "How to structure a monthly performance review that keeps agencies honest",
      "A 30-point campaign audit checklist you can run independently",
    ],
    whoItsFor: [
      "Marketing heads managing agency relationships",
      "Founders reviewing performance marketing spend",
      "Growth managers building in-house reporting capability",
    ],
    pages: "32 pages",
    audience: "Marketing heads · Founders · Growth managers",
    publishedDate: "May 2026",
    googleDriveUrl: "https://drive.google.com/uc?export=download&id=1ReNkY6rW8DexdZfdFxzRbmSB6Xnzy4Nl",
  },
];

export async function generateStaticParams() {
  return whitepapers.map((wp) => ({ slug: wp.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const wp = whitepapers.find((w) => w.slug === slug);
  if (!wp) return {};
  return {
    title: `${wp.title} | Whitepapers`,
    description: wp.description.slice(0, 160),
    alternates: { canonical: `/insights/whitepapers/${wp.slug}` },
  };
}

// "May 2026" -> "2026-05-01" (only month/year is tracked, so day is approximated)
function toIsoDate(monthYear: string): string {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [month, year] = monthYear.split(" ");
  const mi = months.indexOf(month);
  if (mi === -1 || !year) return monthYear;
  return `${year}-${String(mi + 1).padStart(2, "0")}-01`;
}

// Reference the single canonical Organization entity defined in app/layout.tsx
// rather than redeclaring it here — avoids stale/conflicting data under the
// same @id (previously had an outdated WordPress logo path and an incomplete
// sameAs array).
const organizationSchema = {
  "@type": "Organization",
  "@id": "https://magicworksitsolutions.com/#organization",
};

export default async function WhitepaperDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const wp = whitepapers.find((w) => w.slug === slug);
  if (!wp) notFound();

  const others = whitepapers.filter((w) => w.slug !== slug);
  const canonicalUrl = `https://magicworksitsolutions.com/insights/whitepapers/${wp.slug}`;

  const reportSchema = {
    "@context": "https://schema.org",
    "@type": ["Report", "Article"],
    "@id": `${canonicalUrl}#report`,
    headline: wp.title,
    name: wp.title,
    description: wp.description,
    url: canonicalUrl,
    datePublished: toIsoDate(wp.publishedDate),
    isAccessibleForFree: true,
    inLanguage: "en-IN",
    author: organizationSchema,
    publisher: organizationSchema,
    about: wp.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    isPartOf: { "@id": "https://magicworksitsolutions.com/#website" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
      { "@type": "ListItem", position: 2, name: "Insights", item: "https://magicworksitsolutions.com/insights" },
      { "@type": "ListItem", position: 3, name: "Whitepapers", item: "https://magicworksitsolutions.com/insights/whitepapers" },
      { "@type": "ListItem", position: 4, name: wp.title, item: canonicalUrl },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: canonicalUrl,
    name: `${wp.title} | Whitepapers`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".aeo-lede"],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-100px] top-[-80px] w-[400px] h-[400px] pointer-events-none opacity-40" aria-hidden="true">
          {[80, 140, 200].map((r, i) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/insights" className="hover:text-[#F7F3EA] transition-colors no-underline">Insights</Link>
            <span className="opacity-50">/</span>
            <Link href="/insights/whitepapers" className="hover:text-[#F7F3EA] transition-colors no-underline">Whitepapers</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA] truncate max-w-[200px]">{wp.title}</span>
          </nav>

          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
            <div>
              <p className="eyebrow text-[#D4A537] mb-4">{wp.category}</p>
              <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(30px,4.8vw,52px)] leading-[1.08] text-[#F7F3EA] max-w-[820px] mb-4">
                {wp.title}
              </h1>
              <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[620px]">{wp.tagline}</p>
              <div className="flex gap-4 text-[11px] text-[#9A8FBF] mt-5 flex-wrap">
                <span>{wp.pages}</span>
                <span>·</span>
                <span>{wp.audience}</span>
                <span>·</span>
                <span>Published {wp.publishedDate}</span>
              </div>
            </div>

            {/* Download CTA card */}
            <div className="bg-white/[0.08] border border-white/[0.15] rounded-[14px] p-7 min-w-[240px] text-center">
              <div className="w-16 h-20 mx-auto mb-4 bg-[#EDE9F7] rounded-[6px] flex items-center justify-center">
                <svg width="28" height="36" viewBox="0 0 28 36" fill="none" aria-hidden="true">
                  <rect x="1" y="1" width="26" height="34" rx="3" stroke="#5B3FBE" strokeWidth="1.5" fill="white"/>
                  <path d="M6 11h16M6 16h16M6 21h10" stroke="#D4A537" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-[12px] text-[#C8B8FF] mb-4">Free PDF · {wp.pages}</p>
              <a
                href={wp.googleDriveUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block bg-[#D4A537] text-[#2A1B5C] font-bold text-[12px] uppercase tracking-[0.08em] py-3 px-6 rounded-full no-underline hover:scale-[1.02] transition-transform"
              >
                Download PDF →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-[2fr_1fr] gap-16">

            {/* Left: main content */}
            <div>
              <h2 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-4">About this whitepaper</h2>
              <p className="aeo-lede text-[16px] text-[#3F3F4A] leading-[1.75] mb-10">{wp.description}</p>

              <h2 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-5">What you'll learn</h2>
              <ul className="space-y-4 mb-10">
                {wp.whatYoullLearn.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[3px] shrink-0 w-5 h-5 rounded-full bg-[#D4A537] flex items-center justify-center text-[10px] font-bold text-[#2A1B5C]">{i + 1}</span>
                    <span className="text-[15px] text-[#3F3F4A] leading-[1.6]">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-4">Who this is for</h2>
              <ul className="space-y-2">
                {wp.whoItsFor.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[15px] text-[#3F3F4A]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-[3px] shrink-0" aria-hidden="true">
                      <circle cx="7" cy="7" r="6" stroke="#5B3FBE" strokeWidth="1.2"/>
                      <path d="M4.5 7l1.8 1.8 3.2-3.6" stroke="#5B3FBE" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: sticky download + related */}
            <div className="space-y-6">
              <div className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[12px] p-7 text-center">
                <p className="text-[13px] font-semibold text-[#2A1B5C] mb-1">{wp.title}</p>
                <p className="text-[12px] text-[#9A9AA8] mb-5">{wp.pages} · Free PDF</p>
                <a
                  href={wp.googleDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-3 rounded-full no-underline hover:scale-[1.02] transition-transform mb-3"
                >
                  Download PDF →
                </a>
                <Link
                  href="/insights/whitepapers"
                  className="block text-[12px] text-[#5B3FBE] hover:underline no-underline"
                >
                  ← All whitepapers
                </Link>
              </div>

              {/* Newsletter opt-in */}
              <NewsletterFormWP source={`whitepaper-${wp.slug ?? slug}`} variant="whitepaper" />

              {others.length > 0 && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#9A9AA8] mb-3">Also available</p>
                  {others.map((o) => (
                    <Link
                      key={o.slug}
                      href={`/insights/whitepapers/${o.slug}`}
                      className="block bg-white border border-[#D8D8DE] rounded-[10px] p-5 mb-3 no-underline hover:border-[#5B3FBE] transition-colors group"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5B3FBE] mb-1">{o.category}</p>
                      <p className="text-[13px] font-semibold text-[#2A1B5C] leading-[1.4] group-hover:text-[#5B3FBE] transition-colors">{o.title}</p>
                      <p className="text-[11px] text-[#9A9AA8] mt-1">{o.pages}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#2A1B5C] py-16">
        <div className="max-w-[1120px] mx-auto px-8 text-center">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3.5vw,36px)] text-[#F7F3EA] mb-4">
            Want to talk through what you read?
          </h2>
          <p className="text-[16px] text-[#C8B8FF] max-w-[480px] mx-auto mb-8">
            Book a free 30-minute discovery call. We&apos;ll map the whitepaper findings to your specific business.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-10 py-4 rounded-full no-underline hover:scale-[1.02] transition-transform"
          >
            Book a discovery call →
          </Link>
        </div>
      </section>
    </>
  );
}
