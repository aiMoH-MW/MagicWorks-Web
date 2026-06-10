import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
const envLines = readFileSync(envPath, "utf8").split("\n");
for (const line of envLines) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}

const client = createClient({
  projectId: "wa86etuq", dataset: "production",
  apiVersion: "2024-01-01", useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const blogs = await client.fetch(`
  *[_type == "insight" && author->name == "Editorial Team"] | order(publishedAt asc) {
    _id, title, "slug": slug.current, excerpt, category, categories, publishedAt, tags, seoTitle, body
  }
`);

// Extract plain text from each blog body
function toText(body) {
  return (body || []).map(block => {
    if (block._type === "block") return block.children?.map(c => c.text).join("") || "";
    if (block._type === "callout") return `[CALLOUT: ${block.title}] ${block.body}`;
    if (block._type === "statRow") return `[STATS: ${block.stats?.map(s => `${s.value} ${s.label}`).join(" | ")}]`;
    if (block._type === "pullquote") return `[PQ: ${block.text}]`;
    return "";
  }).filter(Boolean).join("\n");
}

const output = blogs.map(b => ({
  _id: b._id,
  slug: b.slug,
  title: b.title,
  excerpt: b.excerpt,
  seoTitle: b.seoTitle,
  tags: b.tags,
  category: b.category,
  categories: b.categories,
  bodyLength: (b.body || []).length,
  bodyText: toText(b.body),
}));

writeFileSync(resolve(process.cwd(), "scripts/all-editorial-blogs.json"), JSON.stringify(output, null, 2));
console.log(`Fetched ${blogs.length} blogs. Written to scripts/all-editorial-blogs.json`);
output.forEach((b, i) => console.log(`${i+1}. [${b.bodyLength} blocks] ${b.slug}`));
