// Upload images to Sanity and patch blogs 5-8 with coverImage + body image
// Run: node scripts/upload-blog-images-batch2.mjs
import { createClient } from "@sanity/client";
import { createReadStream, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, "../../Docs/Blogs/extracted_images");

const client = createClient({
  projectId: "wa86etuq",
  dataset: "production",
  apiVersion: "2025-06-03",
  token: "skAG8ZeLB19LZuv7OY9JfdduzrsXvyhUIB6uqvPRshppWRf8v40TT8BqkMkFdNJTdpFUUcauwUEYU71X9sHfLjs4P4AlZhmP6xXkq0gumW8KBAj0yxuSGKL5NCaAshlV8Pj6LUfB6AKpWHsx4JM9fTUR3PSiDMIuBmZwYmwyKD2L6ElPUbJQ",
  useCdn: false,
});

function rkey() {
  return Math.random().toString(36).slice(2, 10);
}

async function uploadImage(filename, label) {
  const filepath = join(IMAGES_DIR, filename);
  const ext = filename.split(".").pop().toLowerCase();
  const mimeMap = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp" };
  const contentType = mimeMap[ext] || "image/jpeg";

  console.log(`  Uploading ${filename} (${(statSync(filepath).size / 1024).toFixed(0)} KB)...`);
  const asset = await client.assets.upload("image", createReadStream(filepath), {
    filename,
    contentType,
    label,
  });
  console.log(`  -> asset id: ${asset._id}`);
  return asset._id;
}

// Map: blog doc ID -> { cover filename, cover alt, body image filename, body image alt, body insert position }
const blogs = [
  {
    id: "blog-indian-b2b-marketing-strategy-gap",
    coverFile: "blog5_image1.jpeg",
    coverAlt: "Business growth chart with coins representing B2B marketing ROI",
    bodyFile: "blog5_image2.png",
    bodyAlt: "Marketing funnel illustration showing lead generation for Indian B2B companies",
    bodyCaption: "A structured funnel connects awareness spend to qualified pipeline",
    bodyInsertAfter: 2, // insert after the 3rd body block (0-indexed)
  },
  {
    id: "blog-pune-ai-social-media-2026",
    coverFile: "blog6_image1.png",
    coverAlt: "Social media marketing apps and notifications on a smartphone",
    bodyFile: "blog6_image2.png",
    bodyAlt: "AI-powered social media management on mobile for Pune businesses",
    bodyCaption: "AI-augmented social media moves at the speed of market trends — hours, not weeks",
    bodyInsertAfter: 4,
  },
  {
    id: "blog-ai-social-media-vs-traditional-2026",
    coverFile: "blog7_image1.png",
    coverAlt: "Hands holding smartphone with social media icons — AI-powered social media",
    bodyFile: "blog7_image2.png",
    bodyAlt: "Business professional using AI-powered social media management",
    bodyCaption: "AI-augmented agencies monitor and optimise campaigns continuously — not at month-end",
    bodyInsertAfter: 5,
  },
  {
    id: "blog-social-media-marketing-company-pune-2026",
    coverFile: "blog8_image1.png",
    coverAlt: "Team reviewing social media marketing strategy for Pune business",
    bodyFile: "blog8_image2.png",
    bodyAlt: "Choosing the right social media marketing company in Pune for pipeline growth",
    bodyCaption: "The right social media partner connects every campaign to your CRM pipeline",
    bodyInsertAfter: 4,
  },
];

async function run() {
  for (const blog of blogs) {
    console.log(`\n── ${blog.id}`);

    // 1. Upload cover image
    const coverAssetId = await uploadImage(blog.coverFile, `Cover: ${blog.id}`);

    // 2. Upload body image
    const bodyAssetId = await uploadImage(blog.bodyFile, `Body: ${blog.id}`);

    // 3. Fetch current doc to get body array
    const doc = await client.getDocument(blog.id);
    if (!doc) { console.error(`  !! Document not found: ${blog.id}`); continue; }

    const currentBody = doc.body || [];

    // 4. Build new body image block
    const bodyImageBlock = {
      _type: "image",
      _key: rkey(),
      asset: { _type: "reference", _ref: bodyAssetId },
      alt: blog.bodyAlt,
      caption: blog.bodyCaption,
    };

    // 5. Insert body image after the specified position
    const insertAt = Math.min(blog.bodyInsertAfter + 1, currentBody.length);
    const newBody = [
      ...currentBody.slice(0, insertAt),
      bodyImageBlock,
      ...currentBody.slice(insertAt),
    ];

    // 6. Patch document
    await client
      .patch(blog.id)
      .set({
        coverImage: {
          _type: "image",
          asset: { _type: "reference", _ref: coverAssetId },
          alt: blog.coverAlt,
        },
        body: newBody,
      })
      .commit();

    console.log(`  ✅  Patched ${blog.id}`);
  }

  console.log("\nAll done. Check your Sanity Studio.");
}

run().catch(console.error);
