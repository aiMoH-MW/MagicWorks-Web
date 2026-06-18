/**
 * Patch "Web Developer (Next.js)" → "Web Developer (Full Stack: React, Node.js & AI Assisted)"
 *
 * Usage:  node scripts/patch-web-developer-job.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

function loadEnv() {
  try {
    const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../.env.local");
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const k = t.slice(0, eq).trim();
      const v = t.slice(eq + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  } catch { /* ignore */ }
}
loadEnv();

const client = createClient({
  projectId: "wa86etuq",
  dataset: "production",
  apiVersion: "2025-06-03",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌  SANITY_API_TOKEN not set in .env.local");
    process.exit(1);
  }

  const job = await client.fetch(
    `*[_type == "jobOpening" && title match "Web Developer*"][0] { _id, title, slug }`
  );

  if (!job) {
    console.error("❌  Could not find a Web Developer job in Sanity.");
    process.exit(1);
  }

  console.log(`Found: "${job.title}" (${job._id})`);
  console.log("Patching...\n");

  await client.patch(job._id).set({
    title: "Web Developer (Full Stack: React, Node.js & AI Assisted)",
    slug: { _type: "slug", current: "web-developer-full-stack" },
    department: "web-development",
    location: "Pune, India",
    type: "full-time",
    experience: "2–4 years",
    status: "active",
    postedAt: "2026-06-17T00:00:00.000Z",
    summary:
      "Build and ship client websites, internal tools, and AI-integrated products. Strong React.js skills and regular use of AI coding tools (Claude / Claude Code) required.",
    responsibilities: [
      "Design, build, and maintain client websites and web applications using React.js and Next.js",
      "Develop backend APIs and server-side logic with Node.js",
      "Integrate AI features and tools into products — using APIs, Claude, or custom pipelines",
      "Use AI coding assistants (Claude Code, GitHub Copilot) as a regular part of your workflow",
      "Collaborate with designers to translate Figma designs into pixel-perfect, performant UIs",
      "Write clean, maintainable TypeScript code with proper component architecture",
      "Participate in code reviews, sprint planning, and client delivery calls",
    ],
    requirements: [
      "2–4 years of professional experience building with React.js and Next.js",
      "Solid Node.js skills for REST APIs, middleware, and server-side logic",
      "Proficiency in TypeScript",
      "Comfort using AI coding tools (Claude Code, Copilot, or similar) daily — not just occasionally",
      "Understanding of web performance, accessibility, and responsive design",
      "Experience with version control (Git) and deploying to platforms like Vercel or AWS",
    ],
    niceToHave: [
      "Experience integrating third-party APIs (Sanity, Supabase, Stripe, OpenAI, Anthropic)",
      "Prior agency experience shipping products for multiple clients",
      "Exposure to AI product development or LLM-powered features",
      "Familiarity with Tailwind CSS or CSS-in-JS approaches",
    ],
  }).commit();

  console.log('✅  Patched successfully: "Web Developer (Full Stack: React, Node.js & AI Assisted)"');
  console.log("    New slug: web-developer-full-stack\n");
}

run().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
