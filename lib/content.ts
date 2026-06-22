import { episodes } from "@/content/episodes";
import type { Episode } from "@/content/schema";

/** Newest first — the default library order. */
function byNewest(a: Episode, b: Episode) {
  return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
}

export const allEpisodes: Episode[] = [...episodes].sort(byNewest);

export function getAllEpisodes(): Episode[] {
  return allEpisodes;
}

/** The N most recent episodes — for the Home "latest" wall. */
export function getLatestEpisodes(n = 4): Episode[] {
  return allEpisodes.slice(0, n);
}

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return allEpisodes.find((e) => e.slug === slug);
}

export function getAllSlugs(): string[] {
  return allEpisodes.map((e) => e.slug);
}

/** Resolve an episode's `related` slugs to full episodes (skips any misses). */
export function getRelatedEpisodes(episode: Episode, limit = 3): Episode[] {
  const out = episode.related
    .map((slug) => getEpisodeBySlug(slug))
    .filter((e): e is Episode => Boolean(e) && e!.slug !== episode.slug);

  // Backfill with other recent episodes if the related list is thin.
  if (out.length < limit) {
    for (const e of allEpisodes) {
      if (out.length >= limit) break;
      if (e.slug === episode.slug) continue;
      if (out.some((x) => x.slug === e.slug)) continue;
      out.push(e);
    }
  }
  return out.slice(0, limit);
}

export const episodeCount = allEpisodes.length;

/** Format an ISO date as e.g. "14 Mar 2026" (Australian order). */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

/** Eyebrow string: "EP 04 · SEASON 2 · 14 MAR 2026". */
export function episodeEyebrow(e: Episode): string {
  const ep = `EP ${String(e.episodeNumber).padStart(2, "0")}`;
  const season = `SEASON ${e.season}`;
  const date = formatDate(e.publishDate).toUpperCase();
  return `${ep} · ${season} · ${date}`;
}

/** Short eyebrow for posters: "EP 04 · S2". */
export function posterEyebrow(e: Episode): string {
  return `EP ${String(e.episodeNumber).padStart(2, "0")} · S${e.season}`;
}

/**
 * Topic tags per episode (brief §6.2 filter chips). Values match site.topics.
 * Keyed by the fixed sample slugs; real episodes would carry their own tags.
 */
const TOPIC_MAP: Record<string, string[]> = {
  "the-rev-kept-coming": ["Growth", "Mental load"],
  "we-ran-out-of-money-on-a-tuesday": ["Failure", "Mental load"],
  "i-fired-my-co-founder-then-my-best-mate": ["Failure", "Mental load"],
  "nobody-wanted-it-so-we-rebuilt-it": ["Product", "Failure"],
  "the-raise-that-didnt-save-us": ["Fundraising", "Failure"],
  "the-founder-who-walked-away": ["Exits", "Mental load"],
};

export function episodeTopics(slug: string): string[] {
  return TOPIC_MAP[slug] ?? [];
}

export function episodeMatchesTopic(e: Episode, topic: string): boolean {
  if (topic === "All") return true;
  return episodeTopics(e.slug).includes(topic);
}
