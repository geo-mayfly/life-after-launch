import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllSlugs,
  getEpisodeBySlug,
  getRelatedEpisodes,
} from "@/lib/content";
import { site } from "@/content/site";
import { buildEpisodeMetadata } from "@/lib/seo";
import {
  podcastEpisodeSchema,
  articleSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import BlueWall from "@/components/brand/BlueWall";
import Eyebrow from "@/components/ui/Eyebrow";
import EpisodeHero from "@/components/episode/EpisodeHero";
import EpisodeRail from "@/components/episode/EpisodeRail";
import EpisodeMobileNav from "@/components/episode/EpisodeMobileNav";
import EpisodeEmbed from "@/components/episode/EpisodeEmbed";
import KeyTakeaways from "@/components/episode/KeyTakeaways";
import Transcript from "@/components/episode/Transcript";
import GuestLinks from "@/components/episode/GuestLinks";
import RelatedWall from "@/components/episode/RelatedWall";
import EmailSignup from "@/components/layout/EmailSignup";
import SlackBlock from "@/components/layout/SlackBlock";
import { Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) return {};
  return buildEpisodeMetadata(episode);
}

const sectionPad = "px-5 py-sp-8 scroll-mt-[88px] sm:px-8 lg:px-12";

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) notFound();

  const related = getRelatedEpisodes(episode, 3);

  return (
    <>
      <JsonLd
        data={[
          podcastEpisodeSchema(episode),
          articleSchema(episode),
          faqSchema(episode),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Episodes", url: "/episodes" },
            { name: episode.episodeTitle, url: `/episodes/${episode.slug}` },
          ]),
        ]}
      />

      {/* ── Two-panel: sticky rail (left) + content (right) ── */}
      <div className="lg:grid lg:grid-cols-[minmax(300px,32%)_minmax(0,1fr)]">
        {/* LEFT — navigation + details (sticky), desktop only */}
        <BlueWall tone={episode.tone} as="aside" className="hidden lg:block" vignette={0.5}>
          <EpisodeRail episode={episode} />
        </BlueWall>

        {/* RIGHT — content */}
        <div className="min-w-0">
          <EpisodeHero episode={episode} />

          <div className="bg-bone">
            {/* 2 — Overview */}
            <section id="overview" className={sectionPad} aria-labelledby="overview-h">
              <Reveal>
                <h2 id="overview-h" className="font-display text-h2 text-ink">
                  Overview
                </h2>
                <div className="prose-bone mt-5 text-lead">
                  {episode.overview.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>
            </section>

            {episode.embed && (
              <section className="px-5 pb-sp-8 sm:px-8 lg:px-12">
                <EpisodeEmbed episode={episode} />
              </section>
            )}

            {/* 3 — Key Takeaways tiles */}
            <section id="key-takeaways" className={sectionPad}>
              <KeyTakeaways episode={episode} />
            </section>

            {/* 4 — Transcript + chapters */}
            <section id="transcript" className={sectionPad}>
              <Transcript episode={episode} />
            </section>

            {/* 5 — Guest & links */}
            <section id="guest-links" className={`${sectionPad} pb-sp-9`}>
              <GuestLinks episode={episode} />
            </section>
          </div>
        </div>
      </div>

      {/* Sentinel: marks the end of the in-pane area (mobile nav hides past it). */}
      <div id="episode-twopanel-end" aria-hidden />

      {/* ── Full width, outside the nav pane ── */}
      {related.length > 0 && (
        <section className="bg-bone pb-sp-9 pt-sp-9">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <Eyebrow>YOU MAY ALSO ENJOY</Eyebrow>
            <h2 className="mb-8 mt-3 font-display text-h2 text-ink">
              More from the series
            </h2>
            <RelatedWall episodes={related} />
          </div>
        </section>
      )}

      <div className="bg-bone pb-sp-9">
        <EmailSignup />
      </div>
      <div className="pb-sp-8">
        <SlackBlock />
      </div>

      {/* Mobile "On this page" bar + drawer (replaces the desktop rail) */}
      <EpisodeMobileNav episode={episode} />

      <span className="sr-only">
        Distilled from {site.name}. Listen on Spotify, Apple Podcasts and YouTube.
      </span>
    </>
  );
}
