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
      name: "externalCoverImageUrl",
      title: "Cover Image URL (external — use when Sanity upload not available)",
      type: "url",
      description: "Paste a public image URL. Used as fallback when no Sanity cover image is set.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image (Sanity CDN)",
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
        // ── External Image (URL-based, no Sanity upload required) ───
        {
          type: "object",
          name: "externalImage",
          title: "External Image (URL)",
          fields: [
            defineField({
              name: "url",
              title: "Image URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: {
            select: { title: "alt", subtitle: "url" },
            prepare(v: Record<string, string>) {
              return { title: v.title || "External Image", subtitle: v.subtitle };
            },
          },
        },
        // ── Comparison Table ─────────────────────────────────────────
        {
          type: "object",
          name: "comparisonTable",
          title: "Comparison Table",
          fields: [
            defineField({ name: "colA", title: "Column A Label", type: "string" }),
            defineField({ name: "colB", title: "Column B Label", type: "string" }),
            defineField({
              name: "rows",
              title: "Rows",
              type: "array",
              of: [{
                type: "object",
                fields: [
                  defineField({ name: "metric", title: "Metric / Label", type: "string" }),
                  defineField({ name: "a", title: "Column A Value", type: "string" }),
                  defineField({ name: "b", title: "Column B Value", type: "string" }),
                ],
                preview: {
                  select: { title: "metric", a: "a", b: "b" },
                  prepare(v: Record<string, string>) {
                    return { title: v.title, subtitle: `${v.a} | ${v.b}` };
                  },
                },
              }],
            }),
          ],
          preview: {
            select: { colA: "colA", colB: "colB" },
            prepare(v: Record<string, string>) {
              return { title: "Comparison Table", subtitle: `${v.colA} vs ${v.colB}` };
            },
          },
        },
        // ── Callout Box ──────────────────────────────────────────────
        {
          type: "object",
          name: "callout",
          title: "Callout Box",
          fields: [
            defineField({ name: "title", title: "Box Title", type: "string" }),
            defineField({ name: "body", title: "Body Text", type: "text", rows: 3 }),
            defineField({
              name: "variant",
              title: "Style",
              type: "string",
              options: {
                list: [
                  { title: "Key Takeaways (violet)", value: "key-takeaway" },
                  { title: "Stat Highlight (gold)", value: "stat" },
                  { title: "Warning (red)", value: "warning" },
                  { title: "Info (blue)", value: "info" },
                ],
                layout: "radio",
              },
              initialValue: "key-takeaway",
            }),
            defineField({
              name: "items",
              title: "Bullet Items (optional)",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { title: "title", variant: "variant" },
            prepare(v: Record<string, string>) {
              const icons: Record<string, string> = {
                "key-takeaway": "💡",
                stat: "📊",
                warning: "⚠️",
                info: "ℹ️",
              };
              return {
                title: v.title || "Callout Box",
                subtitle: `${icons[v.variant] ?? "📦"} ${v.variant ?? "key-takeaway"}`,
              };
            },
          },
        },
        // ── Pull Quote ───────────────────────────────────────────────
        {
          type: "object",
          name: "pullquote",
          title: "Pull Quote",
          fields: [
            defineField({
              name: "text",
              title: "Quote Text",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "attribution",
              title: "Attribution (optional)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "text" },
            prepare(v: Record<string, string>) {
              return { title: v.title ? `"${v.title}"` : "Pull Quote" };
            },
          },
        },
        // ── Stats Row ────────────────────────────────────────────────
        {
          type: "object",
          name: "statRow",
          title: "Stats Row",
          fields: [
            defineField({
              name: "stats",
              title: "Stats (2–3 recommended)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "value",
                      title: "Value (e.g. ₹15L or 95%)",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "note",
                      title: "Note (optional, small text)",
                      type: "string",
                    }),
                  ],
                  preview: {
                    select: { value: "value", label: "label" },
                    prepare(v: Record<string, string>) {
                      return { title: v.value, subtitle: v.label };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { stats: "stats" },
            prepare(v: Record<string, Array<{ value: string; label: string }>>) {
              const count = v.stats?.length ?? 0;
              return {
                title: `Stats Row (${count} stat${count !== 1 ? "s" : ""})`,
                subtitle: v.stats?.map((s) => s.value).join(" · ") ?? "",
              };
            },
          },
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
          preview: {
            select: { title: "question" },
            prepare(v: Record<string, string>) {
              return { title: v.title || "FAQ item" };
            },
          },
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
      title: "SEO Title (override, max 60 chars)",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "tags",
      title: "Tags (for AEO/GEO)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "coverImage" },
    prepare(v: Record<string, string>) {
      return {
        title: v.title,
        subtitle: v.author ? `By ${v.author}` : "",
      };
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
