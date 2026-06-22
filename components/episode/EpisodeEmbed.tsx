"use client";

import { useState } from "react";
import type { Episode } from "@/content/schema";

/**
 * Optional inline embed (brief §6.3) — a single tasteful Spotify/YouTube embed,
 * lazy-loaded behind a click-to-load poster. Keeps the page link-out-first and
 * protects performance. Off by default per-episode (only rendered if `embed` set).
 */
export default function EpisodeEmbed({ episode }: { episode: Episode }) {
  const [loaded, setLoaded] = useState(false);
  const embed = episode.embed;
  if (!embed) return null;

  const src =
    embed.provider === "spotify"
      ? `https://open.spotify.com/embed/episode/${embed.id}`
      : `https://www.youtube.com/embed/${embed.id}`;

  return (
    <div className="mx-auto max-w-content px-5 sm:px-8">
      <div className="overflow-hidden rounded-lg" style={{ aspectRatio: "16 / 9" }}>
        {loaded ? (
          <iframe
            src={src}
            title={`Listen to ${episode.episodeTitle}`}
            loading="lazy"
            allow="encrypted-media; picture-in-picture"
            className="h-full w-full border-0"
          />
        ) : (
          <button
            onClick={() => setLoaded(true)}
            className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink-navy text-on-blue transition-colors hover:bg-deep-blue"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-marigold text-ink-navy">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="font-semibold">Play the episode here</span>
            <span className="text-small text-on-blue-soft">
              Loads the {embed.provider === "spotify" ? "Spotify" : "YouTube"} player
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
