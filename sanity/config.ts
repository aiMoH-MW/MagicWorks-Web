import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

function getConfig() {
  return {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2025-06-03",
    // useCdn: false — CDN bypasses auth token on private datasets, returning empty results.
    // Always query the live API with the read token so all published docs are returned.
    useCdn: false,
    perspective: "published" as const,
    token: process.env.SANITY_API_READ_TOKEN,
  };
}

// Lazy singleton — only created on first call, not at module load time.
// Prevents Vercel build failures when env vars are not set during compilation.
let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (!_client) _client = createClient(getConfig());
  return _client;
}

// Convenience alias for query files
export const client = new Proxy({} as SanityClient, {
  get(_t, prop) {
    return (getSanityClient() as unknown as Record<string, unknown>)[prop as string];
  },
});

export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(getSanityClient()).image(source);
}
