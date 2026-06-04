import { client } from "./config";

// ── Insights ──────────────────────────────────────────────────────────────

export async function getAllInsights() {
  return client.fetch(
    `*[_type == "insight" && !isGated] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt, category, pillar, isGated,
      "author": author->{ name, role, "photo": photo.asset->url },
      "coverImage": coverImage.asset->url,
      "coverImageAlt": coverImage.alt
    }`
  );
}

export async function getInsightBySlug(slug: string) {
  return client.fetch(
    `*[_type == "insight" && slug.current == $slug][0] {
      _id, title, slug, excerpt, publishedAt, category, pillar, isGated, faq,
      "author": author->{ name, role, "photo": photo.asset->url, linkedin },
      "coverImage": coverImage.asset->url,
      "coverImageAlt": coverImage.alt,
      body[] {
        ...,
        _type == "image" => {
          ...,
          "url": asset->url,
          "alt": alt
        }
      },
      seoTitle
    }`,
    { slug }
  );
}

export async function getInsightSlugs() {
  return client.fetch(
    `*[_type == "insight"] { "slug": slug.current }`
  );
}

export async function getGatedInsights() {
  return client.fetch(
    `*[_type == "insight" && isGated == true] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt, category,
      "coverImage": coverImage.asset->url,
      "coverImageAlt": coverImage.alt
    }`
  );
}

// ── Case Studies ──────────────────────────────────────────────────────────

export async function getAllCaseStudies() {
  return client.fetch(
    `*[_type == "caseStudy"] | order(publishedAt desc) {
      _id, title, slug, client, heroMetric, heroMetricLabel, industry, pillar, featured,
      "coverImage": coverImage.asset->url,
      "coverImageAlt": coverImage.alt
    }`
  );
}

export async function getFeaturedCaseStudy() {
  return client.fetch(
    `*[_type == "caseStudy" && featured == true] | order(publishedAt desc)[0] {
      _id, title, slug, client, heroMetric, heroMetricLabel, industry, pillar,
      situation, result, metrics,
      "coverImage": coverImage.asset->url
    }`
  );
}

export async function getCaseStudyBySlug(slug: string) {
  return client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id, title, slug, client, heroMetric, heroMetricLabel, industry, pillar,
      situation, intervention, result, metrics, testimonial, publishedAt,
      "coverImage": coverImage.asset->url,
      "coverImageAlt": coverImage.alt
    }`,
    { slug }
  );
}

// ── Job Openings ──────────────────────────────────────────────────────────

export async function getActiveJobOpenings() {
  return client.fetch(
    `*[_type == "jobOpening" && status == "active"] | order(postedAt desc) {
      _id, title, slug, department, location, type, experience, summary, postedAt
    }`
  );
}

export async function getJobOpeningBySlug(slug: string) {
  return client.fetch(
    `*[_type == "jobOpening" && slug.current == $slug][0] {
      _id, title, slug, department, location, type, experience,
      summary, responsibilities, requirements, niceToHave, status, postedAt
    }`,
    { slug }
  );
}

// ── Team Members ──────────────────────────────────────────────────────────

export async function getTeamMembers() {
  return client.fetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id, name, role, bio, linkedin, isFounder,
      "photo": photo.asset->url,
      "photoAlt": photo.alt
    }`
  );
}
