import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "wa86etuq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const docs = await client.fetch(`*[_type == "insight"] | order(_createdAt asc) {
  _id, _createdAt, _updatedAt, title, "slug": slug.current, publishedAt, externalCoverImageUrl
}`);

console.log(`Total insight docs: ${docs.length}\n`);

// All docs
for (const d of docs) {
  console.log(`${d._id}  slug: ${d.slug}`);
  console.log(`  title: ${d.title}`);
  console.log(`  created: ${d._createdAt}  published: ${d.publishedAt}`);
  console.log();
}
