import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      // WordPress origin images (used for imported blog content)
      { protocol: "https", hostname: "magicworksitsolutions.com" },
      // BerqWP image CDN (serves optimised WordPress images)
      { protocol: "https", hostname: "images.berqwp.com" },
    ],
  },
  async redirects() {
    return [
      // /insights/{article-slug} → /blog/{slug} (301 — /blog is now canonical for articles)
      // Excludes /insights/whitepapers and /insights/reports which stay where they are
      {
        source: "/insights/:slug((?!whitepapers|reports)[^/]+)",
        destination: "/blog/:slug",
        permanent: true,
      },
      // /blog (index) → /insights listing page
      {
        source: "/blog",
        destination: "/insights",
        permanent: true,
      },
      // /about/careers/* → /careers/* (/about/careers removed; /careers is now canonical)
      {
        source: "/about/careers/:slug*",
        destination: "/careers/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
