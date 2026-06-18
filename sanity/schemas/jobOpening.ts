import { defineField, defineType } from "sanity";

export const jobOpening = defineType({
  name: "jobOpening",
  title: "Job Openings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
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
      name: "subtitle",
      title: "Role Subtitle",
      type: "string",
      description: 'Shown below the title in the hero. E.g. "Google Ads & Meta Ads"',
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: [
          { title: "Digital Marketing", value: "digital-marketing" },
          { title: "Web Development", value: "web-development" },
          { title: "AI & Consulting", value: "ai-consulting" },
          { title: "Design", value: "design" },
          { title: "Operations", value: "operations" },
          { title: "Sales", value: "sales" },
        ],
      },
    }),
    defineField({
      name: "area",
      title: "Sub-category / Specialisation",
      type: "string",
      description: 'Shown after dept label. E.g. "Paid Media", "Leadership", "AI Product (MagicFlow AI)"',
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Pune, India",
    }),
    defineField({
      name: "type",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Part-time", value: "part-time" },
          { title: "Contract", value: "contract" },
          { title: "Internship", value: "internship" },
        ],
      },
      initialValue: "full-time",
    }),
    defineField({
      name: "experience",
      title: "Experience Required",
      type: "string",
    }),
    defineField({
      name: "salary",
      title: "Salary / Stipend Range",
      type: "string",
      description: 'E.g. "₹2.50 to 3.60 LPA" or "Performance-based stipend"',
    }),
    defineField({
      name: "qualification",
      title: "Qualification",
      type: "string",
      description: 'E.g. "B.Comm / M.Comm / B.E."',
    }),
    defineField({
      name: "mandatory",
      title: "Mandatory Requirement (callout)",
      type: "string",
      description: 'Highlighted callout. E.g. "Must have prior agency experience."',
    }),
    defineField({
      name: "summary",
      title: "Role Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "niceToHave",
      title: "Nice to Have",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "closing",
      title: "Closing Note",
      type: "text",
      rows: 2,
      description: "Short note shown at the bottom of the job description.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Closed", value: "closed" },
          { title: "Draft", value: "draft" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "postedAt",
      title: "Posted At",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "title", department: "department", status: "status" },
    prepare({ title, department, status }) {
      return {
        title,
        subtitle: `${department ?? ""} · ${status ?? ""}`,
      };
    },
  },
});
