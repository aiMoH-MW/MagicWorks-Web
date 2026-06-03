/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://magicworksitsolutions.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: [
    "/studio",
    "/studio/*",
    "/api/*",
    "/privacy",
    "/terms",
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/studio", "/api"] },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://magicworksitsolutions.com"}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Give higher priority to key pages
    const highPriority = ["/", "/services", "/contact", "/work", "/about"];
    const medPriority = [
      "/services/digital-marketing", "/services/web-development",
      "/services/ai-consultation", "/services/platform-consultation",
      "/industries",
    ];
    const priority = highPriority.includes(path)
      ? 1.0
      : medPriority.includes(path)
      ? 0.9
      : 0.7;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
