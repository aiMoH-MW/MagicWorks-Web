import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getInsightBySlug, getInsightSlugs, getRelatedInsights } from "@/sanity/queries";
import { estimateReadingTime } from "@/lib/readingTime";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

type RelatedArticle = {
  _id: string;
  slug: { current: string };
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  coverImage?: string;
  coverImageAlt?: string;
  externalCoverImageUrl?: string;
};

type FaqItem = { question: string; answer: string };

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getInsightSlugs().catch(() => []);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsightBySlug(slug).catch(() => null);
  if (!article) return { title: "Article not found" };

  return {
    title: article.seoTitle ?? article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    keywords: article.tags ?? [],
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: article.author?.name ? [article.author.name] : undefined,
      images: article.coverImage
        ? [
            {
              url: article.coverImage,
              width: 1200,
              height: 630,
              alt: article.coverImageAlt ?? article.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle ?? article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

// ── Category labels ───────────────────────────────────────────────────────────

const categoryLabels: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  "web-development": "Web Development",
  "ai-automation": "AI & Automation",
  "seo-aeo": "SEO / AEO",
  "industry-insights": "Industry Insights",
  "company-news": "Company News",
};

// ── PortableText components ───────────────────────────────────────────────────

const articleComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[17px] leading-[1.78] text-[#3F3F4A] mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,2.8vw,28px)] text-[#2A1B5C] mt-14 mb-5 leading-[1.25]">
        <span
          className="block w-10 h-[3px] bg-[#D4A537] mb-3"
          aria-hidden="true"
        />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-[family-name:var(--font-head)] font-bold text-[20px] text-[#5B3FBE] mt-10 mb-3 leading-[1.3]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-[family-name:var(--font-head)] font-semibold text-[17px] text-[#2A1B5C] mt-8 mb-2 leading-[1.35]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-t-2 border-b-2 border-[#D4A537] py-6 font-[family-name:var(--font-head)] italic font-semibold text-[clamp(20px,2.4vw,25px)] leading-[1.45] text-[#2A1B5C]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-7 space-y-2">{children}</ul>,
    number: ({ children }) => (
      <ol className="mb-7 space-y-2 list-decimal pl-5 marker:text-[#5B3FBE] marker:font-semibold">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-[16px] text-[#3F3F4A] leading-[1.68]">
        <span
          className="mt-[9px] flex-shrink-0 w-[7px] h-[7px] rounded-full bg-[#5B3FBE]"
          aria-hidden="true"
        />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-[16px] text-[#3F3F4A] leading-[1.68] pl-1">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#1A1A22]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-[#EDE9F7] text-[#5B3FBE] px-[5px] py-[2px] rounded-[4px] text-[0.875em] font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith("http");
      return (
        <a
          href={value?.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "nofollow noopener noreferrer" : undefined}
          className="text-[#5B3FBE] underline underline-offset-2 decoration-[rgba(91,63,190,0.4)] hover:text-[#2A1B5C] hover:decoration-[#2A1B5C] transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    externalImage: ({ value }) => {
      if (!value?.url) return null;
      return (
        <figure className="my-12 -mx-4 sm:-mx-10 md:-mx-16 lg:-mx-24">
          <div className="relative w-full rounded-[12px] overflow-hidden bg-[#EDE9F7] shadow-[0_16px_56px_rgba(42,27,92,0.18)]" style={{ aspectRatio: "16/9" }}>
            <Image src={value.url} alt={value.alt ?? ""} fill className="object-contain" sizes="(max-width: 768px) 100vw, 1200px" />
          </div>
          {value.caption && (
            <figcaption className="text-center text-[13px] text-[#9A9AA8] mt-4 italic leading-[1.5]">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    image: ({ value }) => {
      const src = value?.url;
      if (!src) return null;
      return (
        <figure className="my-12 -mx-4 sm:-mx-10 md:-mx-16 lg:-mx-24">
          <div
            className="relative w-full rounded-[12px] overflow-hidden bg-[#EDE9F7] shadow-[0_16px_56px_rgba(42,27,92,0.18)]"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src={src}
              alt={value.alt ?? ""}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-[13px] text-[#9A9AA8] mt-4 italic leading-[1.5]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    callout: ({ value }) => {
      const variants = {
        "key-takeaway": {
          bg: "#EDE9F7",
          border: "#5B3FBE",
          titleColor: "#2A1B5C",
          bulletColor: "#D4A537",
        },
        stat: {
          bg: "#FEFAF0",
          border: "#D4A537",
          titleColor: "#2A1B5C",
          bulletColor: "#5B3FBE",
        },
        warning: {
          bg: "#FEF3F2",
          border: "#E53E3E",
          titleColor: "#C53030",
          bulletColor: "#E53E3E",
        },
        info: {
          bg: "#EBF8FF",
          border: "#2B6CB0",
          titleColor: "#1A365D",
          bulletColor: "#2B6CB0",
        },
      };
      const v =
        variants[(value.variant as keyof typeof variants)] ??
        variants["key-takeaway"];
      return (
        <div
          className="my-10 rounded-[10px] px-7 py-6"
          style={{ background: v.bg, borderLeft: `4px solid ${v.border}` }}
        >
          {value.title && (
            <p
              className="font-bold text-[11px] uppercase tracking-[0.12em] mb-3"
              style={{ color: v.titleColor }}
            >
              {value.title}
            </p>
          )}
          {value.body && (
            <p className="text-[16px] leading-[1.72] text-[#3F3F4A]">
              {value.body}
            </p>
          )}
          {(value.items as string[] | undefined)?.length ? (
            <ul className="mt-3 space-y-2">
              {(value.items as string[]).map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] text-[#3F3F4A] leading-[1.65]"
                >
                  <span
                    className="mt-[8px] flex-shrink-0 w-[6px] h-[6px] rounded-full"
                    style={{ background: v.bulletColor }}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    },

    pullquote: ({ value }) => (
      <blockquote className="my-12 border-t-2 border-b-2 border-[#D4A537] py-8 text-center">
        <p className="font-[family-name:var(--font-head)] font-semibold italic text-[clamp(20px,2.4vw,26px)] leading-[1.45] text-[#2A1B5C]">
          &ldquo;{value.text}&rdquo;
        </p>
        {value.attribution && (
          <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-[#9A9AA8]">
            &mdash; {value.attribution}
          </p>
        )}
      </blockquote>
    ),

    statRow: ({ value }) => {
      const stats = (value.stats ?? []) as Array<{
        value: string;
        label: string;
        note?: string;
      }>;
      const colClass =
        stats.length === 1
          ? "grid-cols-1"
          : stats.length === 2
          ? "grid-cols-2"
          : "grid-cols-2 md:grid-cols-3";
      return (
        <div className={`my-10 grid gap-4 ${colClass}`}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-[#D8D8DE] rounded-[10px] px-5 py-6 text-center shadow-[0_2px_12px_rgba(42,27,92,0.06)]"
            >
              <div className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,34px)] text-[#2A1B5C] leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-[12px] font-semibold text-[#5B3FBE] uppercase tracking-[0.08em] mb-1">
                {stat.label}
              </div>
              {stat.note && (
                <div className="text-[11px] text-[#9A9AA8] mt-1">{stat.note}</div>
              )}
            </div>
          ))}
        </div>
      );
    },
  },
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;

  const [article, related] = await Promise.all([
    getInsightBySlug(slug).catch(() => null),
    getRelatedInsights(slug, 3).catch(() => []),
  ]);

  if (!article) notFound();

  const readingTime = estimateReadingTime(article.body ?? []);
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  // ── JSON-LD schemas (SEO + AEO + GEO) ───────────────────────────────────────
  const canonicalUrl = `https://magicworksitsolutions.com/blog/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",     item: "https://magicworksitsolutions.com" },
      { "@type": "ListItem", position: 2, name: "Insights", item: "https://magicworksitsolutions.com/insights" },
      { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
    ],
  };

  const organizationSchema = {
    "@type": "Organization",
    "@id": "https://magicworksitsolutions.com/#organization",
    name: "MagicWorks IT Solutions Pvt. Ltd.",
    url: "https://magicworksitsolutions.com",
    sameAs: ["https://www.linkedin.com/company/magicworks-it-solutions/"],
    logo: {
      "@type": "ImageObject",
      url: "https://magicworksitsolutions.com/wp-content/uploads/2025/10/logo_mwits.png",
      width: 300,
      height: 60,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9764566644",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };

  // GEO — rich Article schema with mentions, citations, speakable (helps AI engines cite)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": canonicalUrl,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    image: article.coverImage
      ? [{ "@type": "ImageObject", url: article.coverImage, width: 1200, height: 630 }]
      : [],
    keywords: article.tags?.join(", ") ?? undefined,
    inLanguage: "en-IN",
    timeRequired: `PT${readingTime}M`,
    articleSection: categoryLabels[article.category] ?? article.category,
    author: article.author
      ? {
          "@type": "Person",
          "@id": "https://magicworksitsolutions.com/about/#swapnil-ughade",
          name: article.author.name,
          jobTitle: "Founder",
          worksFor: { "@type": "Organization", "@id": "https://magicworksitsolutions.com/#organization" },
          url: "https://magicworksitsolutions.com/about/",
          sameAs: article.author.linkedin ? [article.author.linkedin] : [],
        }
      : undefined,
    publisher: organizationSchema,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    isPartOf: { "@type": "WebSite", "@id": "https://magicworksitsolutions.com/#website", name: "MagicWorks IT Solutions" },
    // GEO — speakable tells voice assistants / AI summaries which sections to read aloud
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".article-lede", "article > p:first-child"],
    },
    // GEO — mentions helps AI engines understand entities this article is authoritative about
    mentions: [
      { "@type": "Organization", name: "MIT Project NANDA" },
      { "@type": "Organization", name: "Gartner" },
      { "@type": "Organization", name: "HubSpot", url: "https://www.hubspot.com" },
      { "@type": "Organization", name: "Salesforce", url: "https://www.salesforce.com" },
      { "@type": "Organization", name: "Gong" },
      { "@type": "Organization", name: "Chorus" },
      { "@type": "Organization", name: "Power BI" },
      { "@type": "Organization", name: "Tableau" },
      { "@type": "Product", name: "HubSpot Professional" },
      { "@type": "Product", name: "Salesforce Marketing Cloud" },
      { "@type": "Legislation", name: "DPDP Act 2023", jurisdiction: "IN" },
    ],
    // AEO — citation list matches the 15 sources cited in the article
    citation: [
      { "@type": "CreativeWork", name: "upGrowth: Marketing Automation Pricing India 2026" },
      { "@type": "CreativeWork", name: "Avidly Agency: HubSpot vs Salesforce Pricing 2026" },
      { "@type": "CreativeWork", name: "Brainguru Technologies: AI Chatbot Development Cost 2026" },
      { "@type": "CreativeWork", name: "Codingclave: AI Chatbot Development Cost India 2026" },
      { "@type": "CreativeWork", name: "Mihup: Best Conversation Intelligence India 2026" },
      { "@type": "CreativeWork", name: "Deelan: Sales Enablement Pricing 2026" },
      { "@type": "CreativeWork", name: "Salesmotion: Top 10 Sales Enablement Platforms 2026" },
      { "@type": "CreativeWork", name: "Teract: AI Writing Tools Comparison 2026 (5,000 post test)" },
      { "@type": "CreativeWork", name: "Domo: 15 Best Dashboard Software Platforms 2026" },
      { "@type": "CreativeWork", name: "Uvik Software: AI Development Cost 2026" },
      { "@type": "CreativeWork", name: "CMARIX: Build vs Buy AI Software 2026" },
      { "@type": "CreativeWork", name: "Riseup Labs: True Cost of Implementing AI 2026" },
      { "@type": "CreativeWork", name: "Gartner Press Release: Agentic AI Projects June 2025" },
      { "@type": "CreativeWork", name: "MIT Project NANDA via Fortune: 95% of GenAI Pilots Fail, August 2025" },
      { "@type": "CreativeWork", name: "OG Marka: Conversational AI ROI Enterprise Guide 2026" },
    ],
  };

  // AEO — HowTo schema for the 4-part cost discipline framework
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Budget AI Investments Correctly for Indian Businesses in 2026",
    description: "A 4-part cost discipline framework for Indian CEOs, founders, and CFOs evaluating AI investments in 2026.",
    totalTime: "PT30M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Budget the Iceberg, Not the Tip",
        text: "Multiply the headline vendor price by 3–4× to estimate true first-year cost. Platform licensing is only 25–35% of total spend. Exception: simple SaaS tools (1.5–2× multiplier).",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Plan the Kill Switch Before Launch",
        text: "Define a measurable outcome, a specific evaluation date, and a named owner for shutdown execution before signing any AI contract.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Measure on the Right Horizon",
        text: "Tier 1 (under ₹5L): 90 days. Tier 2 (₹5–50L): 12–18 months. Tier 3 (₹50L+): 18–36 months. Wrong evaluation horizon kills good investments and protects bad ones.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Build the Operational Layer First",
        text: "Audit existing tool value before expanding. 40–60% of existing AI spend in most Indian businesses produces no measurable value because the workflow layer was never built.",
      },
    ],
  };

  // AEO — ItemList for the 5 use cases (helps AI engines surface structured answers)
  const useCaseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "5 AI Use Cases for Indian Marketing and Sales Teams in 2026",
    description: "Honest cost ranges and payback timelines for the five most common AI investments Indian businesses are evaluating in 2026.",
    numberOfItems: 5,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AI-Powered Chatbot Deployment", description: "₹3 to 25 lakh range. Payback 8–14 months at Tier 2. Hidden costs: LLM API (30–50%), multilingual layer (20–30%), CRM integration (150–200% over platform price)." },
      { "@type": "ListItem", position: 2, name: "Marketing Automation with AI Personalisation", description: "₹8 to 50 lakh range. First-year total including implementation. HubSpot Professional: ₹35–60L first-year. Salesforce Marketing Cloud: ₹80L–1.5Cr first-year." },
      { "@type": "ListItem", position: 3, name: "AI Sales Enablement and Conversation Intelligence", description: "₹6 to 40 lakh range. Entry-tier ₹15K–50K per user per year. Mid-tier (Gong, Chorus) ₹50K–1.5L per user per year." },
      { "@type": "ListItem", position: 4, name: "AI-Powered Content Production", description: "₹2 to 15 lakh range. 60–80% of AI-generated content requires editing. Tool cost is 10–20% of total production cost when AI is used properly." },
      { "@type": "ListItem", position: 5, name: "AI-Driven Analytics and Reporting", description: "₹5 to 30 lakh range. Data preparation accounts for 40–60% of year-one cost. Power BI Pro, Tableau Creator: ₹1–5L/year at entry tier." },
    ],
  };

  const faqSchema =
    article.faq?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((f: FaqItem) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      {/* ── JSON-LD (SEO + AEO + GEO) ───────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(useCaseListSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      {/* Matches template: .ahead { padding: 96px 0 64px } + .wrap { max-width: 1120px } */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] relative pt-[96px] pb-[64px]" style={{ overflowX: "clip" }}>
        {/* Rings — exact template values: 640×640, right:-200px, top:-160px */}
        <svg
          className="absolute pointer-events-none"
          style={{ width: "640px", height: "640px", right: "-200px", top: "-160px" }}
          viewBox="0 0 640 640"
          aria-hidden="true"
        >
          <circle cx="320" cy="320" r="310" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
          <circle cx="320" cy="320" r="225" fill="none" stroke="#D4A537" strokeWidth="1.5" opacity="0.65" />
          <circle cx="320" cy="320" r="140" fill="none" stroke="#7C63D8" strokeWidth="1.5" opacity="0.4" />
        </svg>

        {/* .wrap = max-width: 1120px — same as template */}
        <div className="max-w-[1120px] mx-auto px-8 relative">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[13px] text-[#C8B8FF] mb-6 flex-wrap"
          >
            <Link href="/" className="hover:text-[#D4A537] transition-colors no-underline text-[#C8B8FF]">
              Home
            </Link>
            <span aria-hidden="true" className="opacity-50 font-normal">/</span>
            <Link href="/insights" className="hover:text-[#D4A537] transition-colors no-underline text-[#C8B8FF]">
              Insights
            </Link>
            <span aria-hidden="true" className="opacity-50 font-normal">/</span>
            <span className="text-[#9A8FBF] truncate max-w-[260px]">
              {article.title}
            </span>
          </nav>

          {/* Category pill */}
          {article.category && (
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-[#2A1B5C] bg-[#D4A537] px-3 py-[4px] rounded-full mb-6">
              {categoryLabels[article.category] ?? article.category}
            </span>
          )}

          {/* Title — max-w-[760px] matches template .ahead h1 */}
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4.2vw,44px)] leading-[1.14] text-[#F7F3EA] max-w-[760px] mb-6">
            {article.title}
          </h1>

          {/* Author meta strip — matches template .ameta format exactly:
              [avatar] By Name · Primary Role · Date · N min read */}
          <div className="flex items-center gap-4 flex-wrap text-[14px] text-[#C8B8FF]">
            {article.author?.photo ? (
              <Image
                src={article.author.photo}
                alt={article.author.name ?? "Author"}
                width={38}
                height={38}
                className="rounded-full flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#5B3FBE,#D4A537)" }}
              />
            ) : (
              <span
                className="flex-shrink-0 w-[38px] h-[38px] rounded-full inline-block"
                style={{ background: "linear-gradient(135deg,#5B3FBE,#D4A537)" }}
              />
            )}
            <span>
              By{" "}
              {article.author?.linkedin ? (
                <a
                  href={article.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-[#F7F3EA] font-semibold hover:text-[#D4A537] transition-colors no-underline"
                >
                  {article.author.name ?? "MagicWorks"}
                </a>
              ) : (
                <strong className="text-[#F7F3EA] font-semibold">
                  {article.author?.name ?? "MagicWorks"}
                </strong>
              )}
              {article.author?.role && (
                <>
                  {" "}&middot;{" "}
                  {/* Show only primary role (first segment before · or |) */}
                  {article.author.role.split(/[·|]/)[0].trim()}
                </>
              )}
              {formattedDate && (
                <>{" "}&middot; {formattedDate}</>
              )}
              {" "}&middot; {readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* ── COVER IMAGE ──────────────────────────────────────────────── */}
      <div className="bg-[#F7F3EA]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          {(article.coverImage || article.externalCoverImageUrl) ? (
            <div
              className="relative rounded-[14px] overflow-hidden shadow-[0_28px_90px_rgba(42,27,92,0.24)] border border-white/50"
              style={{ marginTop: "-52px", height: "clamp(300px,38vw,540px)" }}
            >
              <Image
                src={article.coverImage ?? article.externalCoverImageUrl}
                alt={article.coverImageAlt ?? article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </div>
          ) : (
            <div
              className="relative rounded-[14px] border border-[#D8D8DE] overflow-hidden"
              style={{
                marginTop: "-52px",
                height: "clamp(300px,38vw,540px)",
                background: "linear-gradient(135deg,#EDE9F7,#fff)",
              }}
            >
              {/* Template decorative ellipses */}
              <span
                className="absolute inset-[60px] rounded-full"
                style={{ border: "1.5px solid rgba(91,63,190,0.2)" }}
              />
              <span
                className="absolute inset-[110px] rounded-full"
                style={{ border: "1.5px solid rgba(212,165,55,0.4)" }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── ARTICLE BODY ─────────────────────────────────────────────── */}
      <div className="bg-[#F7F3EA] pt-14 pb-20">
        <div className="max-w-[1120px] mx-auto px-6 md:px-8">
          <article>
            <PortableText
              value={article.body ?? []}
              components={articleComponents}
            />
          </article>

          {/* ── FAQ ────────────────────────────────────────────────── */}
          {article.faq?.length > 0 && (
            <section
              aria-labelledby="faq-heading"
              className="mt-16 pt-12 border-t border-[#D8D8DE]"
            >
              <h2
                id="faq-heading"
                className="font-[family-name:var(--font-head)] font-bold text-[clamp(22px,2.8vw,28px)] text-[#2A1B5C] mb-2"
              >
                Frequently asked questions
              </h2>
              <hr className="gold-rule mb-8" />
              <div className="article-faq divide-y divide-[#D8D8DE]">
                {article.faq.map((f: FaqItem) => (
                  <details key={f.question} className="group py-1">
                    <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer font-[family-name:var(--font-head)] font-bold text-[17px] text-[#2A1B5C] select-none">
                      <span>{f.question}</span>
                      {/* +/- indicator */}
                      <span
                        className="flex-shrink-0 relative w-5 h-5"
                        aria-hidden="true"
                      >
                        <span className="absolute top-[9px] left-0 w-5 h-0.5 bg-[#D4A537] block" />
                        <span className="absolute top-0 left-[9px] w-0.5 h-5 bg-[#D4A537] block transition-transform duration-200 group-open:scale-y-0" />
                      </span>
                    </summary>
                    <p className="text-[16px] leading-[1.72] text-[#3F3F4A] pb-5 pr-8">
                      {f.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* ── AUTHOR BIO ──────────────────────────────────────────── */}
          {article.author && (
            <div className="mt-16 bg-white border border-[#D8D8DE] rounded-[10px] overflow-hidden shadow-[0_2px_16px_rgba(42,27,92,0.06)]">
              {/* Gold top accent */}
              <div className="h-[3px] bg-[#D4A537]" />
              <div className="p-6 md:p-8 flex gap-5 items-start">
                {article.author.photo ? (
                  <Image
                    src={article.author.photo}
                    alt={article.author.name ?? "Author"}
                    width={64}
                    height={64}
                    className="rounded-full flex-shrink-0 border-2 border-[#D8D8DE]"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5B3FBE] to-[#D4A537] flex-shrink-0" />
                )}
                <div>
                  {article.author.slug ? (
                    <Link
                      href={`/authors/${article.author.slug}`}
                      className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-0.5 hover:text-[#5B3FBE] transition-colors no-underline block"
                    >
                      {article.author.name}
                    </Link>
                  ) : (
                    <p className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-0.5">
                      {article.author.name}
                    </p>
                  )}
                  {article.author.role && (
                    <p className="text-[13px] text-[#5B3FBE] font-semibold mb-3">
                      {article.author.role}
                    </p>
                  )}
                  <p className="text-[14px] text-[#3F3F4A] leading-[1.65]">
                    {article.author.bio ?? "Founder of MagicWorks IT Solutions, with 17+ years across digital marketing, web strategy, and AI. He writes from inside live client engagements — not theory."}
                  </p>
                  <div className="flex gap-4 mt-3">
                    {article.author.slug && (
                      <Link
                        href={`/authors/${article.author.slug}`}
                        className="text-[13px] text-[#5B3FBE] font-semibold hover:text-[#2A1B5C] transition-colors no-underline"
                      >
                        View profile &rarr;
                      </Link>
                    )}
                    {article.author.linkedin && (
                      <a
                        href={article.author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-[#5B3FBE] font-semibold hover:text-[#2A1B5C] transition-colors no-underline"
                      >
                        LinkedIn &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAGS ────────────────────────────────────────────────── */}
          {article.tags?.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[12px] font-medium text-[#5B3FBE] bg-[#EDE9F7] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── RELATED INSIGHTS ─────────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          className="bg-[#EDE9F7] py-16"
          aria-labelledby="related-heading"
        >
          <div className="max-w-[1120px] mx-auto px-6 md:px-8">
            <h2
              id="related-heading"
              className="font-[family-name:var(--font-head)] font-bold text-[24px] text-[#2A1B5C] mb-2"
            >
              Related insights
            </h2>
            <hr className="gold-rule mb-8" />
            <div className="grid md:grid-cols-3 gap-6">
              {(related as RelatedArticle[]).map((r) => (
                <Link
                  key={r._id}
                  href={`/blog/${r.slug.current}`}
                  className="group bg-white border border-[#D8D8DE] rounded-[10px] overflow-hidden no-underline hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.12)] transition-all flex flex-col"
                  style={{ borderTop: "3px solid #5B3FBE" }}
                >
                  {(r.coverImage ?? r.externalCoverImageUrl) && (
                    <div className="relative h-[170px] overflow-hidden bg-[#EDE9F7]">
                      <Image
                        src={(r.coverImage ?? r.externalCoverImageUrl)!}
                        alt={r.coverImageAlt ?? r.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    {r.category && (
                      <span className="text-[11px] uppercase tracking-[0.14em] text-[#5B3FBE] font-bold mb-2">
                        {categoryLabels[r.category] ?? r.category}
                      </span>
                    )}
                    <h3 className="font-[family-name:var(--font-head)] font-bold text-[16px] text-[#2A1B5C] mb-3 leading-[1.35] group-hover:text-[#5B3FBE] transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-[13px] text-[#3F3F4A] flex-1 leading-[1.6] overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                      {r.excerpt}
                    </p>
                    {r.publishedAt && (
                      <p className="mt-3 text-[12px] text-[#9A9AA8]">
                        {new Date(r.publishedAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-[#2A1B5C] py-20 relative overflow-hidden">
        {/* Decorative rings */}
        <svg
          className="absolute left-1/2 bottom-[-220px] -translate-x-1/2 w-[520px] h-[520px] pointer-events-none"
          aria-hidden="true"
          viewBox="0 0 520 520"
        >
          <circle
            cx="260"
            cy="260"
            r="250"
            fill="none"
            stroke="#7C63D8"
            strokeWidth="1.5"
            opacity="0.3"
          />
          <circle
            cx="260"
            cy="260"
            r="180"
            fill="none"
            stroke="#D4A537"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <circle
            cx="260"
            cy="260"
            r="110"
            fill="none"
            stroke="#7C63D8"
            strokeWidth="1.5"
            opacity="0.25"
          />
        </svg>
        <div className="max-w-[560px] mx-auto px-6 md:px-8 text-center relative">
          <p className="eyebrow text-[#D4A537] mb-4">Ready to act?</p>
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[clamp(24px,3vw,32px)] text-[#F7F3EA] mb-4 leading-[1.2]">
            Want to put this into practice?
          </h2>
          <hr className="gold-rule mx-auto mb-6" />
          <p className="text-[16px] text-[#C8B8FF] mb-8 leading-[1.65]">
            Book a discovery call. Thirty minutes, no obligation. We&rsquo;ll
            look at your specific situation and give you honest next steps.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-4 rounded-full no-underline hover:scale-[1.02] transition-transform"
          >
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
