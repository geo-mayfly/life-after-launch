import Link from "next/link";
import type { Metadata } from "next";
import { site, memberCountLabel } from "@/content/site";
import { getLatestEpisodes } from "@/lib/content";
import { testimonials } from "@/content/testimonials";
import { podcastSeriesSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import BlueWall from "@/components/brand/BlueWall";
import Eyebrow from "@/components/ui/Eyebrow";
import StatCounter from "@/components/ui/StatCounter";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import HomeHero from "@/components/home/HomeHero";
import EpisodeWall from "@/components/episode/EpisodeWall";
import EmailSignup from "@/components/layout/EmailSignup";
import SlackBlock from "@/components/layout/SlackBlock";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.elevatorPitch,
  path: "/",
});

export default function HomePage() {
  const latest = getLatestEpisodes(4);

  return (
    <>
      <JsonLd data={podcastSeriesSchema()} />

      <HomeHero />

      {/* 2 — Latest episodes: the draggable wall. */}
      <BlueWall tone="deep" as="section" className="py-sp-9" aria-labelledby="latest-heading">
        <div className="mx-auto mb-8 flex max-w-wall items-end justify-between px-5 sm:px-8">
          <Eyebrow on="dark" as="div">
            <span id="latest-heading">LATEST EPISODES</span>
          </Eyebrow>
          <Link href="/episodes" className="spark-link text-on-blue-soft hover:text-on-blue">
            All episodes →
          </Link>
        </div>
        <EpisodeWall episodes={latest} label="Latest episodes" itemWidth={300} />
      </BlueWall>

      {/* 3 — What the show is: Bone band, off-centre, lots of air. */}
      <section className="bg-bone py-sp-9" aria-labelledby="show-heading">
        <div className="mx-auto grid max-w-content gap-8 px-5 sm:px-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <Reveal>
            <h2
              id="show-heading"
              className="max-w-2xl font-display text-h1 leading-[1.04] text-ink"
            >
              A mate telling you the real story over a beer.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md text-lead text-ink-2">
              {site.name} takes you inside the hearts and minds of the Founders
              navigating the start-up world. Interview-led, crafted in post, and
              honest to a fault. We don&rsquo;t sand the rough bits off — that&rsquo;s
              the whole point.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4 — The Club: blue band with the live counter. */}
      <BlueWall tone="launch" as="section" className="py-sp-9" aria-labelledby="club-heading">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal>
            <Eyebrow on="dark">THE AUSSIE FOUNDERS CLUB</Eyebrow>
            <h2 id="club-heading" className="mt-4 max-w-2xl font-display text-h1 leading-[1.04] text-on-blue">
              You&rsquo;re not building alone.
            </h2>
            <p className="mt-6 font-display text-h2 text-on-blue">
              Join{" "}
              <span className="text-marigold">
                <StatCounter value={site.memberCount} /> Founders
              </span>{" "}
              in the Slack.
            </p>
            <p className="mt-4 max-w-xl text-on-blue-soft">
              The {site.club} is where the conversation keeps going — real
              founders, real talk, no LinkedIn voice.
            </p>
            <div className="mt-8">
              <Button href={site.slackInvite} variant="primary" size="lg" external>
                Join the Club →
              </Button>
            </div>
          </Reveal>
        </div>
      </BlueWall>

      {/* 5 — Listener love: a pausable, drag-to-browse marquee. */}
      <section className="bg-bone py-sp-9" aria-labelledby="love-heading">
        <div className="mx-auto mb-8 max-w-wall px-5 sm:px-8">
          <Eyebrow as="div">
            <span id="love-heading">FROM THE FOUNDERS</span>
          </Eyebrow>
        </div>
        <Marquee
          items={testimonials.map((t, i) => (
            <figure
              key={i}
              className="w-[340px] rounded-md bg-paper p-7 shadow-sm"
            >
              <blockquote className="font-display text-h3 italic leading-snug text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-small text-ink-3">
                {t.name} · {t.role}
              </figcaption>
            </figure>
          ))}
        />
      </section>

      {/* 6 — Email module. */}
      <section className="bg-bone pb-sp-9">
        <EmailSignup />
      </section>

      {/* 7 — Slack close + footer (footer lives in layout). */}
      <div className="py-sp-8">
        <SlackBlock />
      </div>
    </>
  );
}
