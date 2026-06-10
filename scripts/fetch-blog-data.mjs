import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
const envLines = readFileSync(envPath, "utf8").split("\n");
for (const line of envLines) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}

const client = createClient({
  projectId: "wa86etuq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Get Swapnil blog for style reference
const swapnil = await client.fetch(
  `*[_type == "insight" && slug.current == "real-cost-of-ai-indian-marketing-sales-2026"][0]{
    title, slug, excerpt, category, categories, publishedAt,
    "author": author->{ name },
    body
  }`
);
console.log("=== SWAPNIL BLOG STRUCTURE ===");
console.log("Title:", swapnil?.title);
console.log("Excerpt:", swapnil?.excerpt);
console.log("Body blocks count:", swapnil?.body?.length);
console.log("Body block types:", [...new Set(swapnil?.body?.map(b => b._type))]);
console.log("Body sample (first 3):", JSON.stringify(swapnil?.body?.slice(0,3), null, 2));

// Get all Editorial Team blogs
const editorialBlogs = await client.fetch(
  `*[_type == "insight" && author->name == "Editorial Team"] | order(publishedAt asc) {
    _id, title, "slug": slug.current, excerpt, category, categories, publishedAt,
    "bodyLength": count(body)
  }`
);
console.log("\n=== EDITORIAL TEAM BLOGS ===");
console.log("Total:", editorialBlogs.length);
editorialBlogs.forEach((b, i) => {
  console.log(`${i+1}. [${b.slug}]`);
  console.log(`   Title: ${b.title}`);
  console.log(`   Body blocks: ${b.bodyLength}`);
  console.log(`   Category: ${b.category || b.categories}`);
  console.log();
});
