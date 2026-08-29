import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Whitepapers | Insights",
  description: "Free whitepapers from MagicWorks IT Solutions: in-depth research on AI automation readiness and performance marketing ROI for Indian businesses.",
  alternates: { canonical: "/insights/whitepapers" },
  openGraph: {
    url: "https://magicworksitsolutions.com/insights/whitepapers",
    title: "Whitepapers | Insights | MagicWorks",
    description: "Free whitepapers from MagicWorks IT Solutions: in-depth research on AI automation readiness and performance marketing ROI for Indian businesses.",
  },
};

const whitepapers = [
  {
    slug: "ai-automation-readiness-indian-smes",
    title: "AI Automation Readiness for Indian SMEs",
    category: "AI Consultation",
    description:
      "A strategic readiness framework for Indian SMEs evaluating AI adoption. Covers a five-dimension process audit, vendor selection criteria, ROI benchmarks, and a phased implementation roadmap tailored to India's business environment.",
    highlights: [
      "Assess your AI readiness across 5 operational dimensions",
      "Identify which processes to automate first for maximum ROI",
      "Evaluate AI vendors without getting lost in demos",
      "A phased 90-day roadmap for first-time AI adopters",
      "India-specific benchmarks from real SME deployments",
    ],
    pages: "10 pages",
    audience: "Founders · COOs · Operations heads",
    publishedDate: "May 2026",
    pdfUrl: "/whitepapers/ai-automation-readiness-indian-smes.pdf",
  },
  {
    slug: "performance-marketing-roi",
    title: "Performance Marketing ROI Framework",
    category: "Digital Marketing",
    description:
      "A data-backed framework for measuring and improving performance marketing ROI across Google Ads, Meta, and LinkedIn. Includes CPL and ROAS benchmarks for Indian markets, attribution models, and a practical campaign audit checklist.",
    highlights: [
      "CPL and ROAS benchmarks across 4 key Indian industries",
      "Build an attribution model that accurately reflects your funnel",
      "Common ad-spend leakage points and how to fix them",
      "The full-funnel measurement framework MagicWorks uses with clients",
      "A campaign audit checklist you can run today",
    ],
    pages: "30 pages",
    audience: "Marketing heads · Founders · Growth managers",
    publishedDate: "May 2026",
    pdfUrl: "/whitepapers/performance-marketing-roi.pdf",
  },
  {
    slug: "ai-native-websites-vs-traditional-websites",
    title: "AI-Native Websites vs Traditional Websites: A Cost-Benefit Analysis",
    category: "AI-Native Websites",
    description:
      "A practical decision framework for CEOs, founders, marketing heads, and CFOs evaluating whether to rebuild on AI-native website architecture or optimise the current site. Covers two cost-benefit dimensions most rebuild proposals miss, six industry-specific compression candidates, and the break-even math.",
    highlights: [
      "The two cost-benefit dimensions of a rebuild: marketing performance and internal operational efficiency",
      "The 53% mobile abandonment math across Rs 5, 10, and 25 lakh monthly ad budgets",
      "The MagicWorks internal case study: HR resume screening compressed from 8 hours to 1 hour daily",
      "Compression candidates across 6 Indian industries: real estate, edtech, healthcare, manufacturing, professional services, and D2C",
      "A prioritisation matrix for choosing your first AI-native compression pilot",
      "The break-even math: typical investment, payback period, and when a rebuild is NOT the right call",
    ],
    pages: "19 pages",
    audience: "CEOs · Founders · Marketing heads · CFOs",
    publishedDate: "August 2026",
    pdfUrl: "/whitepapers/ai-native-websites-vs-traditional-websites.pdf",
  },
  {
    slug: "psychology-behind-content-that-ranks-in-ai-answers",
    title: "The Psychology Behind Content That Ranks in AI Answers",
    category: "SEO / AEO",
    description:
      "A practical framework for marketing leaders and content strategists who want their brand cited, mentioned, and recommended inside ChatGPT, Google AI Overviews, Perplexity, and Copilot. Covers the psychology behind AI citation, an eight-dimension readiness scorecard, editorial governance for brand-fact consistency, and a 90-day roadmap from baseline to measurement.",
    highlights: [
      "Six psychological principles behind AI-citable content, from authority heuristics to structural chunking",
      "An eight-dimension AI visibility readiness scorecard to score any page from 1 to 5",
      "The 2x2 prioritisation matrix for choosing which pages to rewrite first",
      "How to build an editorial governance layer that keeps brand facts consistent everywhere",
      "A 90-day, six-phase roadmap from baseline audit to measurement",
      "MagicWorks' own citation self-audit across ChatGPT, Google AI Overviews, Gemini, and Perplexity",
    ],
    pages: "12 pages",
    audience: "CMOs · Marketing leaders · Content strategists · Founders",
    publishedDate: "August 2026",
    pdfUrl: "/whitepapers/psychology-behind-content-that-ranks-in-ai-answers.pdf",
  },
];

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://magicworksitsolutions.com/insights/whitepapers",
  name: "Whitepapers | MagicWorks Insights",
  description:
    "Free whitepapers from MagicWorks IT Solutions: in-depth research on AI automation readiness and performance marketing ROI for Indian businesses.",
  url: "https://magicworksitsolutions.com/insights/whitepapers",
  isPartOf: { "@id": "https://magicworksitsolutions.com/#website" },
  about: { "@id": "https://magicworksitsolutions.com/#organization" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Insights", item: "https://magicworksitsolutions.com/insights" },
    { "@type": "ListItem", position: 3, name: "Whitepapers", item: "https://magicworksitsolutions.com/insights/whitepapers" },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: whitepapers.map((wp, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://magicworksitsolutions.com/insights/whitepapers/${wp.slug}`,
    name: wp.title,
  })),
};

export default function WhitepapersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg className="absolute right-[-100px] top-[-80px] w-[400px] h-[400px] pointer-events-none opacity-40" aria-hidden="true">
          {[80, 140, 200].map((r, i) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={i === 1 ? "#D4A537" : "#7C63D8"} strokeWidth="1.5" opacity={i === 1 ? 0.7 : 0.45} />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <nav className="flex items-center gap-2 text-[12px] text-[#C8B8FF] mb-6">
            <Link href="/blog" className="hover:text-[#F7F3EA] transition-colors no-underline">Insights</Link>
            <span className="opacity-50">/</span>
            <span className="text-[#F7F3EA]">Whitepapers</span>
          </nav>
          <p className="eyebrow text-[#D4A537] mb-4">Free to download</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(36px,5.5vw,60px)] leading-[1.08] text-[#F7F3EA] max-w-[860px]">
            Research-backed whitepapers for decision-makers.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[580px] mt-4">
            Practical, data-driven guides on AI adoption and performance marketing, written for Indian business leaders who need more than vendor slides.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {whitepapers.map((wp) => (
              <div
                key={wp.slug}
                className="bg-white border border-[#D8D8DE] border-t-[3px] border-t-[#D4A537] rounded-[12px] p-8 flex flex-col"
              >
                {/* Category + date */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5B3FBE]">{wp.category}</span>
                  <span className="text-[11px] text-[#9A9AA8]">{wp.publishedDate}</span>
                </div>

                {/* Cover placeholder */}
                <div className="w-full aspect-[16/7] bg-[#EDE9F7] rounded-[8px] mb-6 flex items-center justify-center relative overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
                    {[40, 80, 120].map((r) => (
                      <circle key={r} cx="50%" cy="50%" r={r} fill="none" stroke="#5B3FBE" strokeWidth="1" />
                    ))}
                  </svg>
                  <div className="relative text-center px-4">
                    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" className="mx-auto mb-2" aria-hidden="true">
                      <rect x="1" y="1" width="30" height="38" rx="3" stroke="#5B3FBE" strokeWidth="1.5" fill="white"/>
                      <path d="M7 12h18M7 18h18M7 24h12" stroke="#D4A537" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p className="text-[11px] font-semibold text-[#5B3FBE] uppercase tracking-[0.1em]">Whitepaper</p>
                  </div>
                </div>

                {/* Title & description */}
                <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] leading-[1.3] mb-3">
                  {wp.title}
                </h2>
                <p className="text-[14px] text-[#3F3F4A] leading-[1.65] mb-5">{wp.description}</p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {wp.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[13px] text-[#3F3F4A]">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-[2px] shrink-0" aria-hidden="true">
                        <circle cx="7" cy="7" r="6" stroke="#D4A537" strokeWidth="1.2"/>
                        <path d="M4.5 7l1.8 1.8 3.2-3.6" stroke="#D4A537" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Meta row */}
                <div className="flex gap-3 text-[11px] text-[#9A9AA8] mb-6 flex-wrap">
                  <span>{wp.pages}</span>
                  <span>·</span>
                  <span>{wp.audience}</span>
                </div>

                {/* CTAs */}
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <a
                    href={wp.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex-1 bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-3 rounded-full text-center no-underline hover:scale-[1.02] transition-transform"
                  >
                    Download PDF →
                  </a>
                  <Link
                    href={`/insights/whitepapers/${wp.slug}`}
                    className="flex-1 border border-[#2A1B5C] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] py-3 rounded-full text-center no-underline hover:bg-[#EDE9F7] transition-colors"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#EDE9F7] py-16">
        <div className="max-w-[1120px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#2A1B5C] mb-1">
              Want short-form articles instead?
            </h2>
            <p className="text-[15px] text-[#3F3F4A]">
              All Insights articles are open, ungated, and updated regularly.
            </p>
          </div>
          <Link
            href="/insights"
            className="bg-[#2A1B5C] text-[#F7F3EA] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[13px] rounded-full no-underline hover:scale-[1.02] transition-transform whitespace-nowrap"
          >
            Browse all Insights →
          </Link>
        </div>
      </section>
    </>
  );
}
