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
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: [
          // Prevents browsers from MIME-sniffing a response from the declared content-type
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Prevents clickjacking by disallowing this site from being framed
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Sends full referrer for same-origin; only origin for cross-origin HTTPS
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable features the site doesn't use
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          // Basic CSP — allows self, trusted CDNs, and Google/Meta/Vercel services
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.clarity.ms https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://cdn.sanity.io https://images.berqwp.com https://magicworksitsolutions.com https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
              "connect-src 'self' https://wa86etuq.api.sanity.io https://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://va.vercel-scripts.com",
              "frame-src 'self' https://www.googletagmanager.com https://cal.com https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
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
      // /insights (index) → /blog (blog is now canonical listing)
      {
        source: "/insights",
        destination: "/blog",
        permanent: true,
      },
      // Old WordPress slugs for "how to hire a digital marketing agency" — redirect to current post
      {
        source: "/blog/the-complete-guide-to-hiring-a-digital-marketing-agency-in-india-2026",
        destination: "/blog/the-ultimate-guide-to-hiring-the-best-digital-marketing-agency",
        permanent: true,
      },
      {
        source: "/blog/how-to-hire-a-digital-marketing-agency-india",
        destination: "/blog/the-ultimate-guide-to-hiring-the-best-digital-marketing-agency",
        permanent: true,
      },
      // /about/careers/* → /careers/* (/about/careers removed; /careers is now canonical)
      {
        source: "/about/careers/:slug*",
        destination: "/careers/:slug*",
        permanent: true,
      },

      // ── Old WordPress URLs (pre-June 2026 site) ──────────────────────────────
      // Business challenges section (old WP URL structure)
      { source: "/business-challenges/:slug*", destination: "/services/ai-consultation", permanent: true },
      { source: "/business-challenges", destination: "/services", permanent: true },

      // Service pages — old structure
      { source: "/digital-marketing/:slug*", destination: "/services/digital-marketing", permanent: true },
      { source: "/web-development-saas-app-development/:slug*", destination: "/services/web-development", permanent: true },
      { source: "/web-development-saas-app-development", destination: "/services/web-development", permanent: true },
      { source: "/ai-automation-integration/:slug*", destination: "/services/ai-consultation", permanent: true },
      { source: "/ai-automation-integration", destination: "/services/ai-consultation", permanent: true },

      // Case studies → Work
      { source: "/case-studies/:slug*", destination: "/work", permanent: true },

      // Thank-you page (old WP form submission landing)
      { source: "/thank-you", destination: "/contact", permanent: true },
      { source: "/thank-you/", destination: "/contact", permanent: true },

      // Old WP blog slugs imported into new site — redirect to /blog (Sanity handles canonical slugs)
      { source: "/blog/e-commerce-d2c-lifestyle-brand", destination: "/blog", permanent: true },
      { source: "/blog/e-commerce-d2c-lifestyle-brand/", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
