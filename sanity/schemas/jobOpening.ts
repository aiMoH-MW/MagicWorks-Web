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
