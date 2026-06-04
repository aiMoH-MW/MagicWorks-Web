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
      // /blog/{slug} → /insights/{slug} (301 — preserves WordPress SEO)
      {
        source: "/blog/:slug",
        destination: "/insights/:slug",
        permanent: true,
      },
      // /blog (index) → /insights
      {
        source: "/blog",
        destination: "/insights",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
