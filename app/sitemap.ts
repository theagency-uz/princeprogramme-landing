import type { MetadataRoute } from "next";

const siteUrl = "https://princeprogramme.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: "2026-08-13",
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${siteUrl}/images/hero-campus.png`,
        `${siteUrl}/images/advisory-session.png`,
        `${siteUrl}/images/central-asia-map-v2.webp`,
        `${siteUrl}/images/new-college-durham.jpg`,
        `${siteUrl}/images/cta-study-hall.png`
      ]
    }
  ];
}
