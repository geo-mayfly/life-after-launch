import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Episode } from "@/content/schema";

export const metadataBase = new URL(site.url);

type BuildArgs = {
  title: string;
  description: string;
  path: string; // e.g. "/about"
  ogImage?: string; // absolute or root-relative
  index?: boolean;
};

/** Base metadata builder — unique title/description, canonical, OG + Twitter. */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  index = true,
}: BuildArgs): Metadata {
  const canonical = path;
  const images = ogImage ? [{ url: ogImage }] : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      url: new URL(path, site.url).toString(),
      title,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/** Episode metadata: "{Episode title} — Life After Launch" + hook-led description. */
export function buildEpisodeMetadata(e: Episode): Metadata {
  const title = e.seo.metaTitle || `${e.episodeTitle} — ${site.name}`;
  const description = e.seo.metaDescription || e.hook;
  return {
    ...buildMetadata({
      title,
      description,
      path: `/episodes/${e.slug}`,
      ogImage: `/episodes/${e.slug}/opengraph-image`,
      index: true,
    }),
    keywords: e.seo.keywords,
  };
}
