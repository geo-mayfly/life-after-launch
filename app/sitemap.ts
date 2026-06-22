import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllEpisodes } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/episodes`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/community`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const episodes: MetadataRoute.Sitemap = getAllEpisodes().map((e) => ({
    url: `${site.url}/episodes/${e.slug}`,
    lastModified: new Date(e.publishDate),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticPages, ...episodes];
}
