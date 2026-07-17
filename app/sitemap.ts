import type { MetadataRoute } from "next";
import { getInsightSlugs, getAllCaseStudies, getActiveJobOpenings, getGatedInsights, getTeamMemberSlugs } from "@/sanity/queries";

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
  { url: `${base}/services/web-development/wordpress`,                           changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services/web-development/portals-member-sites`,               changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/services/web-development/maintenance-amc`,                    changeFrequency: "monthly", priority: 0.7 },
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
  { url: `${base}/services/brand-research-publishing`,                          changeFrequency: "monthly", priority: 0.9 },
  { url: `${base}/services/brand-research-publishing/brand-guidelines-development`, changeFrequency: "monthly", priority: 0.85 },
  { url: `${base}/services/brand-research-publishing/brand-guidelines-correction`,  changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/services/brand-research-publishing/whitepaper-production`,        changeFrequency: "monthly", priority: 0.85 },
  { url: `${base}/services/brand-research-publishing/playbook-production`,          changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/services/brand-research-publishing/case-study-production`,        changeFrequency: "monthly", priority: 0.7 },
  { url: `${base}/services/brand-research-publishing/video-retainer`,               changeFrequency: "monthly", priority: 0.85 },
  { url: `${base}/services/brand-research-publishing/website-content-writing`,      changeFrequency: "monthly", priority: 0.7 },
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
  { url: `${base}/insights/reports/ai-for-professional-services`,                changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/insights/reports/ai-native-website-spec-sheet`,                changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/insights/reports/ai-readiness-playbook`,                       changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/insights/reports/manufacturers-growth-playbook`,               changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/insights/reports/platform-strategy-checklist`,                 changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/insights/whitepapers/ai-automation-readiness-indian-smes`,     changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/insights/whitepapers/performance-marketing-roi`,               changeFrequency: "monthly", priority: 0.8 },
  { url: `${base}/about`,                                                        changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/careers`,                                                      changeFrequency: "weekly",  priority: 0.65 },
  { url: `${base}/tools/ai-readiness-assessment`,                                changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/tools/roi-calculator`,                                         changeFrequency: "monthly", priority: 0.75 },
  { url: `${base}/group`,                                                        changeFrequency: "monthly", priority: 0.6 },
  { url: `${base}/group/magicflow-ai`,                                           changeFrequency: "monthly", priority: 0.6 },
  { url: `${base}/group/magic-pipeline`,                                         changeFrequency: "monthly", priority: 0.6 },
  { url: `${base}/group/magicworks-host`,                                        changeFrequency: "monthly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic slugs from Sanity — fall back to empty arrays if unreachable
  const [insightSlugs, caseStudies, jobs, whitepapers, teamMembers] = await Promise.all([
    getInsightSlugs().catch(() => []),
    getAllCaseStudies().catch(() => []),
    getActiveJobOpenings().catch(() => []),
    getGatedInsights().catch(() => []),
    getTeamMemberSlugs().catch(() => []),
  ]);

  const insightRoutes: MetadataRoute.Sitemap = insightSlugs.map(
    (s: { slug: string; _updatedAt?: string }) => ({
      url: `${base}/blog/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: s._updatedAt ? new Date(s._updatedAt) : undefined,
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
    (j: { slug: { current: string }; _updatedAt?: string }) => ({
      url: `${base}/careers/${j.slug.current}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
      lastModified: j._updatedAt ? new Date(j._updatedAt) : undefined,
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

  const authorRoutes: MetadataRoute.Sitemap = teamMembers.map(
    (m: { slug: string; _updatedAt?: string }) => ({
      url: `${base}/authors/${m.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: m._updatedAt ? new Date(m._updatedAt) : undefined,
    })
  );

  // Static routes have no per-page CMS date — stamp with build time so Google
  // still receives a lastmod signal (better than none) for freshness.
  const buildTime = new Date();
  const staticRoutesWithDate: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    ...r,
    lastModified: buildTime,
  }));

  return [
    ...staticRoutesWithDate,
    ...insightRoutes,
    ...caseStudyRoutes,
    ...careerRoutes,
    ...whitepaperRoutes,
    ...authorRoutes,
  ];
}
