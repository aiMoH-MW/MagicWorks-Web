"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const categoryLabels: Record<string, string> = {
  "digital-marketing": "Digital Marketing",
  "web-development": "Web Development",
  "ai-automation": "AI & Automation",
  "seo-aeo": "SEO / AEO",
  "industry-insights": "Industry Insights",
  "company-news": "Company News",
};

type Article = {
  _id: string;
  slug: { current: string };
  title: string;
  excerpt: string;
  categories: string[];
  publishedAt: string;
  coverImage?: string;
  coverImageAlt?: string;
  externalCoverImageUrl?: string;
  author?: { name: string; slug?: string; photo?: string };
};

export default function BlogClient({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState("all");

  // Collect all unique categories that actually appear in articles
  const allCats = Array.from(
    new Set(articles.flatMap((a) => a.categories ?? []))
  ).filter((c) => categoryLabels[c]);

  const filtered =
    active === "all"
      ? articles
      : articles.filter((a) => a.categories?.includes(active));

  return (
    <>
      {/* Category filter chips */}
      {allCats.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActive("all")}
            className={"px-4 py-2 rounded-full text-[13px] font-semibold transition-colors border " +
              (active === "all"
                ? "bg-[#2A1B5C] text-white border-[#2A1B5C]"
                : "bg-white text-[#3F3F4A] border-[#D8D8DE] hover:border-[#5B3FBE] hover:text-[#5B3FBE]")}
          >
            All
          </button>
          {allCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={"px-4 py-2 rounded-full text-[13px] font-semibold transition-colors border " +
                (active === cat
                  ? "bg-[#2A1B5C] text-white border-[#2A1B5C]"
                  : "bg-white text-[#3F3F4A] border-[#D8D8DE] hover:border-[#5B3FBE] hover:text-[#5B3FBE]")}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      )}

      {/* Articles grid */}
      {filtered.length === 0 ? (
        <p className="text-[#9A9AA8] text-[15px]">No articles in this category yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((a, index) => {
            const thumb = a.coverImage ?? a.externalCoverImageUrl;
            return (
              <div
                key={a._id}
                className="group bg-white border border-[#D8D8DE] rounded-[10px] overflow-hidden hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(42,27,92,0.10)] transition-all flex flex-col"
              >
                <Link href={"/blog/" + a.slug.current} className="no-underline flex flex-col flex-1">
                  {thumb && (
                    <div className="relative h-[200px] overflow-hidden">
                      <Image
                        src={thumb}
                        alt={a.coverImageAlt ?? a.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={index < 3}
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
                          ? new Date(a.publishedAt).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                            })
                          : ""}
                      </span>
                      {a.author?.name && !a.author.slug && (
                        <span className="text-[12px] text-[#9A9AA8]">{a.author.name}</span>
                      )}
                    </div>
                  </div>
                </Link>
                {a.author?.name && a.author.slug && (
                  <div className="px-6 pb-4 -mt-2">
                    <Link
                      href={"/authors/" + a.author.slug}
                      className="inline-flex items-center gap-1.5 text-[12px] text-[#9A9AA8] hover:text-[#5B3FBE] no-underline"
                    >
                      {a.author.photo && (
                        <Image
                          src={a.author.photo}
                          alt={a.author.name}
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                        />
                      )}
                      {a.author.name}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
