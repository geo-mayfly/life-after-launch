import { site } from "@/content/site";
import type { Episode } from "@/content/schema";
import { formatDate } from "@/lib/content";

/**
 * JSON-LD builders (brief §9.2). Each returns a plain object to be rendered
 * inside a <script type="application/ld+json"> by the <JsonLd> component.
 * Validate every type in Google's Rich Results Test (zero errors = launch gate).
 */

const ORG_ID = `${site.url}/#organization`;
const SERIES_ID = `${site.url}/#podcast`;
const WEBSITE_ID = `${site.url}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.club,
    url: site.url,
    logo: `${site.url}/brand/logo-marigold.png`,
    sameAs: [site.social.x, site.social.linkedin, site.listen.youtube],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/episodes?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function podcastSeriesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "@id": SERIES_ID,
    name: site.name,
    url: site.url,
    description: site.description,
    webFeed: site.rss,
    publisher: { "@id": ORG_ID },
    author: site.hosts.map((h) => ({ "@type": "Person", name: h.name })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${site.url}${it.url}`,
    })),
  };
}

export function podcastEpisodeSchema(e: Episode) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    url: `${site.url}/episodes/${e.slug}`,
    name: e.episodeTitle,
    episodeNumber: e.episodeNumber,
    datePublished: e.publishDate,
    timeRequired: e.duration,
    description: e.hook,
    partOfSeries: { "@id": SERIES_ID, "@type": "PodcastSeries", name: site.name },
    partOfSeason: { "@type": "PodcastSeason", seasonNumber: e.season },
    ...(e.listen.spotify || e.listen.apple || e.listen.youtube
      ? {
          associatedMedia: {
            "@type": "MediaObject",
            contentUrl: e.listen.spotify || e.listen.youtube || e.listen.apple,
          },
        }
      : {}),
  };
}

/** The Key Takeaways article, as schema.org Article. */
export function articleSchema(e: Episode) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: e.keyTakeaways.question,
    description: e.keyTakeaways.dek,
    datePublished: e.publishDate,
    author: site.hosts.map((h) => ({ "@type": "Person", name: h.name })),
    publisher: { "@id": ORG_ID },
    isPartOf: { "@type": "PodcastEpisode", name: e.episodeTitle },
    about: e.guestCompany ?? site.name,
  };
}

export function faqSchema(e: Episode) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: e.keyTakeaways.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function collectionPageSchema(episodes: Episode[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Every Founder has a story.",
    url: `${site.url}/episodes`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: episodes.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/episodes/${e.slug}`,
        name: e.episodeTitle,
      })),
    },
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About — ${site.name}`,
    url: `${site.url}/about`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": SERIES_ID },
    mainEntity: site.hosts.map((h) => ({
      "@type": "Person",
      name: h.name,
      jobTitle: h.role,
      sameAs: [h.x, h.linkedin],
    })),
  };
}

export function communitySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.club,
    url: `${site.url}/community`,
    description:
      "The Slack community where the conversation keeps going after the episode ends.",
    potentialAction: {
      "@type": "JoinAction",
      target: site.slackInvite,
      name: "Join the Club",
    },
  };
}

/** Helper so episode pages can describe themselves in a sentence (alt text etc.). */
export function episodeDateLabel(e: Episode): string {
  return formatDate(e.publishDate);
}
