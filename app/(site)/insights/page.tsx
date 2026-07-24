import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllInsights } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical thinking on digital marketing, AI, web development, and business growth from the MagicWorks team.",
  alternates: { canonical: "/insights" },
  openGraph: {
    url: "https://magicworksitsolutions.com/insights",
    title: "Insights | MagicWorks",
    description:
      "Practical thinking on digital marketing, AI, web development, and business growth from the MagicWorks team.",
  },
};

export const revalidate = 300; // ISR: rebuild at most every 5 minutes

const categoryLabels: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  "web-development": "Web Development",
  "ai-automation": "AI & Automation",
  "seo-aeo": "SEO / AEO",
  "industry-insights": "Industry Insights",
  "company-news": "Company News",
};

export default async function InsightsPage() {
  const articles = await getAllInsights().catch(() => []);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-28 pb-20 min-h-[480px] relative overflow-hidden">
        <svg
          className="absolute right-[-100px] top-[-80px] w-[400px] h-[400px] pointer-events-none opacity-50"
          aria-hidden="true"
        >
          {[80, 140, 200].map((r, i) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke={i === 1 ? "#D4A537" : "#7C63D8"}
              strokeWidth="1.5"
              opacity={i === 1 ? 0.7 : 0.45}
            />
          ))}
        </svg>
        <div className="max-w-[1120px] mx-auto px-8 relative">
          <p className="eyebrow text-[#D4A537] mb-4">Insights</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(36px,5.5vw,60px)] leading-[1.08] text-[#F7F3EA] max-w-[860px]">
            Practical thinking on marketing, AI, and growth.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[580px] mt-4">
            Open and crawlable, because the knowledge we publish should be
            useful before it becomes a reason to call us.
          </p>
          <div className="flex flex-wrap gap-1 mt-10 border-b border-white/10">
            <span className="px-4 py-3 text-[13px] font-semibold text-white border-b-2 border-[#D4A537] -mb-[1px]">All Insights</span>
            <Link href="/insights" className="px-4 py-3 text-[13px] font-semibold text-[#C8B8FF] no-underline hover:text-white border-b-2 border-transparent -mb-[1px] transition-colors">Articles</Link>
            <Link href="/insights/whitepapers" className="px-4 py-3 text-[13px] font-semibold text-[#C8B8FF] no-underline hover:text-white border-b-2 border-transparent -mb-[1px] transition-colors">Whitepapers</Link>
            <Link href="/insights/reports" className="px-4 py-3 text-[13px] font-semibold text-[#C8B8FF] no-underline hover:text-white border-b-2 border-transparent -mb-[1px] transition-colors">Reports</Link>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          {articles.length === 0 ? (
            <p className="text-[#9A9AA8] text-[15px]">
              Articles coming soon. Check back shortly.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {articles.map(
                (a: {
                  _id: string;
                  slug: { current: string };
                  title: string;
                  excerpt: string;
                  categories: string[];
                  publishedAt: string;
                  coverImage?: string;
                  coverImageAlt?: string;
                  externalCoverImageUrl?: string;
                  author?: { name: string };
                }) => {
                  const thumb = a.coverImage ?? a.externalCoverImageUrl;
                  return (
                  <Link
                    key={a._id}
                    href={`/insights/${a.slug.current}`}
                    className="group bg-white border border-[#D8D8DE] rounded-[10px] overflow-hidden no-underline hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)] transition-all flex flex-col"
                  >
                    {thumb && (
                      <div className="relative h-[200px] overflow-hidden">
                        <Image
                          src={thumb}
                          alt={a.coverImageAlt ?? a.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {a.categories?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {a.categories.map((cat: string) => (
                            <span key={cat} className="text-[11px] uppercase tracking-[0.14em] text-[#5B3FBE] font-bold bg-[#EDE9F7] px-2 py-0.5 rounded">
                              {categoryLabels[cat] ?? cat}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="font-[family-name:var(--font-head)] font-bold text-[18px] text-[#2A1B5C] mb-3 group-hover:text-[#5B3FBE] transition-colors">
                        {a.title}
                      </h2>
                      <p className="text-[14px] text-[#3F3F4A] flex-1 mb-4 line-clamp-3">
                        {a.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[12px] text-[#9A9AA8]">
                          {a.publishedAt
                            ? new Date(a.publishedAt).toLocaleDateString(
                                "en-IN",
                                { year: "numeric", month: "short", day: "numeric" }
                              )
                            : ""}
                        </span>
                        {a.author?.name && (
                          <span className="text-[12px] text-[#9A9AA8]">
                            {a.author.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                  );
                }
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
