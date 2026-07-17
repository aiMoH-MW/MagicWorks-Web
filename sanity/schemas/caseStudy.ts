import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Studies",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Client / Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client Name",
      type: "string",
    }),
    defineField({
      name: "clientUrl",
      title: "Client Website URL",
      type: "url",
      description: "Primary website — rendered as a backlink on the case study page",
    }),
    defineField({
      name: "clientPartnersUrl",
      title: "Client Partners / Profile Page URL",
      type: "url",
      description: "Secondary link (e.g. /partners page) — rendered alongside the main URL",
    }),
    defineField({
      name: "heroMetric",
      title: "Hero Metric (gold number — e.g. 75,000+)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroMetricLabel",
      title: "Hero Metric Label (e.g. qualified leads per year)",
      type: "string",
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      options: {
        list: [
          { title: "Education", value: "education" },
          { title: "Real Estate", value: "real-estate" },
          { title: "Manufacturing", value: "manufacturing" },
          { title: "Professional Services", value: "professional-services" },
          { title: "Healthcare", value: "healthcare" },
          { title: "Ecommerce", value: "ecommerce" },
          { title: "Retail", value: "retail" },
          { title: "Hospitality", value: "hospitality" },
          { title: "Construction", value: "construction" },
          { title: "Technology / SaaS", value: "technology" },
          { title: "Other", value: "other" },
        ],
      },
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
          { title: "Brand, Research & Publishing", value: "brand-research-publishing" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required().warning("Alt text is required for accessibility and SEO") }),
      ],
    }),
    defineField({
      name: "situation",
      title: "Situation",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "intervention",
      title: "Intervention (what MagicWorks did)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "result",
      title: "Result",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "evidenceImage",
      title: "Evidence / Data Screenshot",
      type: "image",
      options: { hotspot: true },
      description: "Optional screenshot (e.g. analytics, Bing Webmaster Tools) shown below the metrics grid",
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({
      name: "metrics",
      title: "Supporting Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Client Testimonial",
      type: "object",
      fields: [
        defineField({ name: "quote", title: "Quote", type: "text" }),
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "role", title: "Role / Company", type: "string" }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "featured",
      title: "Feature on Home page",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", industry: "industry", media: "coverImage" },
    prepare({ title, industry, media }) {
      return { title, subtitle: industry ?? "", media };
    },
  },
});
