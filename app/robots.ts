import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Permissive by default (brief §9.3) — reputable AI crawlers welcome. Utility
 * pages are excluded; confirm the final AI-crawler policy with the owner (§12.4).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/privacy", "/terms", "/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
