import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getInsightBySlug, getInsightSlugs } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getInsightSlugs().catch(() => []);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsightBySlug(slug).catch(() => null);
  if (!article) return { title: "Article not found" };

  return {
    title: article.seoTitle ?? article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getInsightBySlug(slug).catch(() => null);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    image: article.coverImage ?? undefined,
    author: article.author
      ? { "@type": "Person", name: article.author.name }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "MagicWorks IT Solutions Pvt. Ltd.",
      url: "https://magicworksitsolutions.com",
    },
  };

  const faqSchema = article.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faq.map((f: { question: string; answer: string }) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero */}
      <section className="bg-[#2A1B5C] text-[#F7F3EA] py-16">
        <div className="max-w-[720px] mx-auto px-8">
          <Link
            href="/insights"
            className="text-[#D4A537] text-[13px] uppercase tracking-[0.12em] font-bold no-underline hover:underline mb-6 inline-block"
          >
            ← Insights
          </Link>
          {article.category && (
            <p className="eyebrow text-[#D4A537] mb-3">{article.category}</p>
          )}
          <h1 className="font-[family-name:var(--font-head)] font-bold text-[clamp(28px,4vw,42px)] leading-[1.15] text-[#F7F3EA] mb-4">
            {article.title}
          </h1>
          <p className="text-[18px] leading-[1.55] text-[#C8B8FF]">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/20">
            {article.author && (
              <div className="flex items-center gap-3">
                {article.author.photo && (
                  <Image
                    src={article.author.photo}
                    alt={article.author.name}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="text-[14px] font-semibold text-[#F7F3EA]">
                    {article.author.name}
                  </p>
                  {article.author.role && (
                    <p className="text-[12px] text-[#9A8FBF]">
                      {article.author.role}
                    </p>
                  )}
                </div>
              </div>
            )}
            {article.publishedAt && (
              <span className="text-[13px] text-[#9A8FBF] ml-auto">
                {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {article.coverImage && (
        <div className="max-w-[720px] mx-auto px-8 -mt-0">
          <Image
            src={article.coverImage}
            alt={article.coverImageAlt ?? article.title}
            width={720}
            height={400}
            className="w-full rounded-[10px] object-cover"
          />
        </div>
      )}

      {/* Body */}
      <article className="max-w-[720px] mx-auto px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <PortableText value={article.body} />
        </div>

        {/* FAQ */}
        {article.faq?.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#D8D8DE]">
            <h2 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {article.faq.map((f: { question: string; answer: string }) => (
                <div key={f.question}>
                  <h3 className="font-semibold text-[16px] text-[#2A1B5C] mb-2">
                    {f.question}
                  </h3>
                  <p className="text-[15px] text-[#3F3F4A]">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* CTA */}
      <section className="bg-[#EDE9F7] py-16">
        <div className="max-w-[720px] mx-auto px-8 text-center">
          <h2 className="font-[family-name:var(--font-head)] font-bold text-[22px] text-[#2A1B5C] mb-3">
            Want to put this into practice?
          </h2>
          <p className="text-[15px] text-[#3F3F4A] mb-6">
            Book a discovery call. Thirty minutes, no obligation.
          </p>
          <Link
            href="/contact"
            className="bg-[#D4A537] text-[#2A1B5C] font-bold text-[13px] uppercase tracking-[0.08em] px-8 py-[14px] rounded-full no-underline hover:scale-[1.02] transition-transform inline-block"
          >
            Book a discovery call
          </Link>
        </div>
      </section>
    </>
  );
}
