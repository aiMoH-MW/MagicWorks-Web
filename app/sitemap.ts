import type { MetadataRoute } from "next";
import { getInsightSlugs, getAllCaseStudies, getActiveJobOpenings, getGatedInsights } from "@/sanity/queries";

const base = "https://magicworksitsolutions.com";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: base,                                                                    changeFrequency: "weekly",  priority: 1.0 },
  { url: `${base}/contact`,                                                       changeFrequency: "monthly", priority: 0.9 },
  { url: `${base}/services`,                                                      changeFrequency: "monthly", priority: 0.9 },
  { url: `${base}/services/digital-marketing`,                                   changeFrequency: "monthly", priority: 0.9 },
  { url: `${base}/services/digital-marketing/full-funnel-programme`,             changeFrequency: "monthly", priority: 0.9 },
  { url: `${base}/services/digital-marketing/google-ads-search-marketing`,       changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services/digital-marketing/seo-aeo`,                           changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services/digital-marketing/meta-ads`,                          changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services/digital-marketing/thought-leadership-geo`,            changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services/digital-marketing/site-performance-conversion`,       changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services/digital-marketing/gmb-optimisation`,                  changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services/digital-marketing/email-marketing`,                   changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/services/digital-marketing/linkedin-organic-social`,           changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/services/digital-marketing/youtube-video-optimisation`,        changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/services/web-development`,                                     changeFrequency: "monthly", priority: 0.9 },
  { url: `${base}/services/web-development/ai-native-websites`,                  changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services/web-development/ecommerce`,                           changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services/web-development/maintenance-amc`,                     changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/services/ai-consultation`,                                     changeFrequency: "monthly", priority: 0.9 },
  { url: `${base}/services/ai-consultation/process-audit`,                       changeFrequency: "monthly", priority: 0.85 },
  { url: `${base}/services/ai-consultation/workshop`,                            changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/services/ai-consultation/vendor-sprint`,                       changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/services/ai-consultation/embedded-advisor`,                    changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/services/platform-consultation`,                               changeFrequency: "monthly", priority: 0.9 },
  { url: `${base}/services/platform-consultation/roadmap-audit`,                 changeFrequency: "monthly", priority: 0.85 },
  { url: `${base}/services/platform-consultation/workshop`,                      changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/services/platform-consultation/advisory-sprint`,               changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/services/platform-consultation/embedded-advisor`,              changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/industries`,                                                   changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/industries/education`,                                         changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/industries/real-estate`,                                       changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/industries/manufacturing`,                                     changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/industries/professional-services`,                             changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/work`,                                                         changeFrequency: "weekly",  priority: 0.85 },
  { url: `${base}/blog`,                                                         changeFrequency: "daily",   priority: 0.85 },
  { url: `${base}/insights/reports`,                                             changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/insights/whitepapers`,                                         changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/insights/reports/ai-search-visibility-playbook`,               changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/about`,                                                        changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/careers`,                                                      changeFrequency: "weekly",  priority: 0.65 },
  { url: `${base}/tools/ai-readiness-assessment`,                                changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/tools/roi-calculator`,                                         changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/group`,                                                        changeFrequency: "monthly", priority: 0.6 },
  { url: `${base}/group/magicflow-ai`,                                           changeFrequency: "monthly", priority: 0.6 },
  { url: `${base}/group/magic-pipeline`,                                         changeFrequency: "monthly", priority: 0.6 },
  { url: `${base}/group/magicworks-host`,                                        changeFrequency: "monthly", priority: 0.6 },
  { url: `${base}/privacy`,                                                      changeFrequency: "yearly",  priority: 0.3 },
  { url: `${base}/terms`,                                                        changeFrequency: "yearly",  priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic slugs from Sanity — fall back to empty arrays if unreachable
  const [insightSlugs, caseStudies, jobs, whitepapers] = await Promise.all([
    getInsightSlugs().catch(() => []),
    getAllCaseStudies().catch(() => []),
    getActiveJobOpenings().catch(() => []),
    getGatedInsights().catch(() => []),
  ]);

  const insightRoutes: MetadataRoute.Sitemap = insightSlugs.map(
    (s: { slug: string }) => ({
      url: `${base}/blog/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map(
    (s: { slug: { current: string }; publishedAt?: string }) => ({
      url: `${base}/work/${s.slug.current}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: s.publishedAt ? new Date(s.publishedAt) : undefined,
    })
  );

  const careerRoutes: MetadataRoute.Sitemap = jobs.map(
    (j: { slug: { current: string } }) => ({
      url: `${base}/careers/${j.slug.current}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })
  );

  const whitepaperRoutes: MetadataRoute.Sitemap = whitepapers.map(
    (w: { slug: { current: string }; publishedAt?: string }) => ({
      url: `${base}/insights/whitepapers/${w.slug.current}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: w.publishedAt ? new Date(w.publishedAt) : undefined,
    })
  );

  return [
    ...staticRoutes,
    ...insightRoutes,
    ...caseStudyRoutes,
    ...careerRoutes,
    ...whitepaperRoutes,
  ];
}
