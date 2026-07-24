import type { Metadata } from "next";
import { getAllInsights } from "@/sanity/queries";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog: AI, Marketing & Web Insights",
  description:
    "Practical thinking on digital marketing, AI, web development, and business growth from the MagicWorks team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "https://magicworksitsolutions.com/blog",
    title: "Blog: AI, Marketing & Web Insights | MagicWorks",
    description:
      "Practical thinking on digital marketing, AI, web development, and business growth from the MagicWorks team.",
  },
};

export const revalidate = 300; // ISR: rebuild at most every 5 minutes

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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://magicworksitsolutions.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://magicworksitsolutions.com/blog" },
  ],
};

export default async function BlogPage() {
  const articles = await getAllInsights().catch(() => []);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.slice(0, 10).map((a: { slug: { current: string }; title: string }, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://magicworksitsolutions.com/blog/${a.slug.current}`,
      name: a.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {articles.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      )}

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
