import Link from "next/link";
import type { Episode } from "@/content/schema";
import { episodeEyebrow } from "@/lib/content";
import { site } from "@/content/site";
import BlueWall from "@/components/brand/BlueWall";
import Wordmark from "@/components/brand/Wordmark";
import ListenButtons from "@/components/episode/ListenButtons";
import EpisodeCover from "@/components/episode/EpisodeCover";
import MorphLink from "@/components/motion/MorphLink";

/**
 * FeaturedEpisode — the acquired.fm-style content-forward hero.
 *
 * A slim brand MASTHEAD (wordmark + tagline) establishes identity in the first
 * second, then the newest episode IS the hero below it: a big collectible cover
 * (given visual dominance) paired with title / meta / hook / listen. Brand and
 * content no longer compete in one column — the masthead is the brand, the grid
 * is the episode. The episode title is the page H1 (content-forward, like acquired).
 */
export default function FeaturedEpisode({ episode }: { episode: Episode }) {
  const href = `/episodes/${episode.slug}`;

  return (
    <BlueWall
      tone={episode.tone}
      as="section"
      className="overflow-hidden pb-sp-9 pt-[104px]"
      vignette={0.5}
      aria-labelledby="featured-title"
    >
      <div className="mx-auto max-w-wall px-5 sm:px-8">
        {/* Masthead — brand identity, the 5-second test. The wordmark is the
            page H1 (the homepage is about the show); the nav already links home,
            so the masthead wordmark is non-interactive display. */}
        <div
          className="hero-rise flex flex-col gap-3 border-b border-[rgba(255,255,255,0.16)] pb-7 sm:flex-row sm:items-end sm:justify-between"
          style={{ animationDelay: "0.05s" }}
        >
          <h1 className="leading-none">
            <Wordmark size="lg" href={null} />
          </h1>
          <p className="font-display text-h3 italic text-on-blue">{site.tagline}</p>
        </div>

        {/* Featured episode — the cover is given the dominant column. */}
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <div
              className="hero-rise flex items-center gap-2.5"
              style={{ animationDelay: "0.16s" }}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-marigold" />
              <span className="eyebrow text-on-blue">The latest episode</span>
            </div>

            <p
              className="hero-rise mt-4 eyebrow text-on-blue-soft"
              style={{ animationDelay: "0.22s" }}
            >
              {episodeEyebrow(episode)}
            </p>

            <h2
              id="featured-title"
              className="hero-rise mt-3 max-w-xl font-display text-h1 leading-[1.02] text-on-blue"
              style={{ animationDelay: "0.28s" }}
            >
              <Link href={href} className="transition-opacity hover:opacity-90">
                {episode.episodeTitle}
              </Link>
            </h2>

            <p
              className="hero-rise mt-5 max-w-lg text-lead text-on-blue"
              style={{ animationDelay: "0.38s" }}
            >
              {episode.hook}
            </p>

            <div
              className="hero-rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-4"
              style={{ animationDelay: "0.48s" }}
            >
              <ListenButtons listen={episode.listen} />
              <Link href={href} className="spark-link font-semibold text-on-blue">
                Read the takeaways →
              </Link>
            </div>

            <p className="sr-only">{episode.overview[0]}</p>
          </div>

          {/* The big collectible cover — visually dominant, morphs to the episode. */}
          <div className="order-1 mx-auto w-full max-w-[480px] lg:order-2 lg:max-w-none">
            <MorphLink
              href={href}
              className="group block"
              ariaLabel={`Open ${episode.episodeTitle}`}
            >
              <div
                className="hero-rise aspect-[4/5] overflow-hidden rounded-lg shadow-lg transition-transform duration-base ease-brand group-hover:-translate-y-1"
                style={{ viewTransitionName: `poster-${episode.slug}`, animationDelay: "0.2s" }}
              >
                <EpisodeCover episode={episode} caption={false} />
              </div>
            </MorphLink>
          </div>
        </div>
      </div>
    </BlueWall>
  );
}
