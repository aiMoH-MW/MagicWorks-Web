import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTeamMemberBySlug, getInsightsByAuthor } from "@/sanity/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await getTeamMemberBySlug(slug);
  if (!author) notFound();

  const articles = await getInsightsByAuthor(author.name);

  return (
    <main className="bg-[#F7F3EA] min-h-screen">
      {/* Hero */}
      <section className="bg-[#2A1B5C] pt-20 pb-16">
        <div className="max-w-[900px] mx-auto px-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
          {author.photo ? (
            <Image
              src={author.photo}
              alt={author.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-[#D4A537] flex-shrink-0 object-cover"
            />
          ) : (
            <div className="w-[120px] h-[120px] rounded-full border-4 border-[#D4A537] bg-gradient-to-br from-[#5B3FBE] to-[#D4A537] flex-shrink-0" />
          )}
          <div className="text-center sm:text-left">
            <p className="text-[#D4A537] text-[11px] uppercase tracking-[0.2em] font-bold mb-2">Author</p>
            <h1 className="text-white font-bold text-[clamp(28px,4vw,42px)] leading-tight mb-2">
              {author.name}
            </h1>
            {author.role && (
              <p className="text-[#C8B8FF] text-[15px] font-medium mb-4">{author.role}</p>
            )}
            {author.bio && (
              <p className="text-white/70 text-[15px] leading-[1.7] max-w-[600px]">{author.bio}</p>
            )}
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 text-[#D4A537] text-[13px] font-semibold no-underline hover:text-white transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn Profile
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-[900px] mx-auto px-8 py-16">
        <h2 className="text-[#2A1B5C] font-bold text-[22px] mb-2">
          Articles by {author.name}
        </h2>
        <div className="h-[3px] w-12 bg-[#D4A537] mb-8" />

        {articles.length === 0 ? (
          <p className="text-[#9A9AA8] text-[15px]">No articles published yet.</p>
        ) : (
          <div className="grid gap-6">
            {articles.map((a: { slug: { current: string }; coverImage?: string; externalCoverImageUrl?: string; title: string; category?: string; publishedAt?: string; excerpt?: string }) => (
              <Link
                key={a.slug.current}
                href={`/insights/${a.slug.current}`}
                className="flex gap-5 bg-white rounded-[10px] overflow-hidden border border-[#E8E4F0] hover:border-[#D4A537] transition-all no-underline group shadow-sm"
              >
                {(a.coverImage || a.externalCoverImageUrl) && (
                  <Image
                    src={a.externalCoverImageUrl ?? a.coverImage!}
                    alt={a.title}
                    width={120}
                    height={90}
                    className="object-cover flex-shrink-0 w-[120px] h-[90px]"
                  />
                )}
                <div className="p-4 flex flex-col justify-center">
                  {a.category && (
                    <span className="text-[#D4A537] text-[10px] uppercase tracking-widest font-bold mb-1">
                      {a.category}
                    </span>
                  )}
                  <h3 className="text-[#2A1B5C] font-bold text-[16px] leading-snug group-hover:text-[#5B3FBE] transition-colors mb-1">
                    {a.title}
                  </h3>
                  {a.publishedAt && (
                    <span className="text-[#9A9AA8] text-[12px]">
                      {new Date(a.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
