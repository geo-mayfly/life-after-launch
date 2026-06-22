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
import Eyebrow from "@/components/ui/Eyebrow";
import EpisodeHero from "@/components/episode/EpisodeHero";
import EpisodeEmbed from "@/components/episode/EpisodeEmbed";
import KeyTakeaways from "@/components/episode/KeyTakeaways";
import PullQuote from "@/components/episode/PullQuote";
import Chapters from "@/components/episode/Chapters";
import RelatedWall from "@/components/episode/RelatedWall";
import StickyListenBar from "@/components/episode/StickyListenBar";
import CloudHead from "@/components/brand/CloudHead";
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

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) notFound();

  const related = getRelatedEpisodes(episode, 3);
  const guestName = episode.anonymous
    ? "An anonymous Founder"
    : episode.guestName;

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

      <EpisodeHero episode={episode} />

      {/* Overview — long, on-voice description on Bone paper. */}
      <section className="bg-bone py-sp-9" aria-labelledby="overview-heading">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal>
            <h2 id="overview-heading" className="eyebrow text-deep-blue">
              The episode
            </h2>
            <div className="prose-bone mt-5 text-lead">
              {episode.overview.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Optional inline embed (off unless `embed` is set). */}
      {episode.embed && (
        <section className="bg-bone pb-sp-8">
          <EpisodeEmbed episode={episode} />
        </section>
      )}

      {/* Key Takeaways — the SEO/GEO centrepiece. */}
      <section className="bg-bone pb-sp-9">
        <KeyTakeaways episode={episode} />
      </section>

      {/* Pull-quote — one big display-serif grab, scale-in. */}
      <section className="bg-bone">
        <PullQuote
          text={episode.pullQuote.text}
          attribution={episode.pullQuote.attribution}
        />
      </section>

      {/* Chapters + Guest & links. */}
      <section className="bg-bone py-sp-9">
        <div className="mx-auto grid max-w-content gap-12 px-5 sm:px-8 md:grid-cols-2">
          {episode.chapters && episode.chapters.length > 0 && (
            <Reveal>
              <h2 className="eyebrow text-deep-blue">Chapters</h2>
              <div className="mt-5">
                <Chapters chapters={episode.chapters} />
              </div>
            </Reveal>
          )}

          <Reveal delay={0.06}>
            <h2 className="eyebrow text-deep-blue">Guest &amp; links</h2>
            <div className="mt-5 flex items-start gap-4">
              {episode.anonymous && (
                <CloudHead size={56} color="var(--deep-blue)" />
              )}
              <div>
                <p className="font-semibold text-ink">{guestName}</p>
                {episode.guestBio && (
                  <p className="mt-2 text-ink-2">{episode.guestBio}</p>
                )}
              </div>
            </div>
            {episode.links && episode.links.length > 0 && (
              <ul className="mt-6 flex flex-col gap-2">
                {episode.links.map((l, i) => (
                  <li key={i}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spark-link font-medium text-deep-blue"
                    >
                      {l.label} →
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </section>

      {/* More from the series. */}
      {related.length > 0 && (
        <section className="bg-bone pb-sp-9">
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <Eyebrow>YOU MAY ALSO ENJOY</Eyebrow>
            <h2 className="mb-8 mt-3 font-display text-h2 text-ink">
              More from the series
            </h2>
          </div>
          <div className="mx-auto max-w-content px-5 sm:px-8">
            <RelatedWall episodes={related} />
          </div>
        </section>
      )}

      {/* Club close + email. */}
      <div className="bg-bone pb-sp-9">
        <EmailSignup />
      </div>
      <div className="pb-sp-8">
        <SlackBlock />
      </div>

      <StickyListenBar episode={episode} />

      <span className="sr-only">
        Distilled from {site.name}. Listen on Spotify, Apple Podcasts and YouTube.
      </span>
    </>
  );
}
