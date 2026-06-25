import type { Metadata } from "next";
import { getAllInsights } from "@/sanity/queries";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog: AI, Marketing & Web Insights",
  description:
    "Practical thinking on digital marketing, AI, web development, and business growth from the MagicWorks team.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://magicworksitsolutions.com/blog",
  name: "MagicWorks Blog",
  description: "Practical thinking on digital marketing, AI, web development, and business growth from the MagicWorks team.",
  url: "https://magicworksitsolutions.com/blog",
  isPartOf: { "@id": "https://magicworksitsolutions.com/#website" },
  about: { "@id": "https://magicworksitsolutions.com/#organization" },
};

export default async function BlogPage() {
  const articles = await getAllInsights().catch(() => []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />

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
          <p className="eyebrow text-[#D4A537] mb-4">Insights / Blog</p>
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(36px,5.5vw,60px)] leading-[1.08] text-[#F7F3EA] max-w-[860px]">
            Practical thinking on marketing, AI, and growth.
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF] max-w-[580px] mt-4">
            Open and crawlable, because the knowledge we publish should be
            useful before it becomes a reason to call us.
          </p>
        </div>
      </section>

      {/* Articles grid with category filter */}
      <section className="bg-[#F7F3EA] py-20">
        <div className="max-w-[1120px] mx-auto px-8">
          {articles.length === 0 ? (
            <p className="text-[#9A9AA8] text-[15px]">
              Articles coming soon. Check back shortly.
            </p>
          ) : (
            <BlogClient articles={articles as Parameters<typeof BlogClient>[0]["articles"]} />
          )}
        </div>
      </section>
    </>
  );
}
