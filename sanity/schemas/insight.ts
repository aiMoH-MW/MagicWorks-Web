import { defineField, defineType } from "sanity";

export const insight = defineType({
  name: "insight",
  title: "Insights (Blog)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (meta description)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(155),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Digital Marketing", value: "digital-marketing" },
          { title: "Web Development", value: "web-development" },
          { title: "AI & Automation", value: "ai-automation" },
          { title: "SEO / AEO", value: "seo-aeo" },
          { title: "Industry Insights", value: "industry-insights" },
          { title: "Company News", value: "company-news" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pillar",
      title: "Service Pillar",
      type: "string",
      options: {
        list: [
          { title: "Digital Marketing", value: "digital-marketing" },
          { title: "Web Development", value: "web-development" },
          { title: "AI Consultation", value: "ai-consultation" },
          { title: "Platform Consultation", value: "platform-consultation" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ (for FAQPage schema)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "isGated",
      title: "Gated (requires email)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title (override)",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "coverImage" },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `By ${author}` : "", media };
    },
  },
  orderings: [
    {
      title: "Published (newest first)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
