import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/content/site";
import { getAllEpisodes } from "@/lib/content";
import { testimonials } from "@/content/testimonials";
import { podcastSeriesSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import BlueWall from "@/components/brand/BlueWall";
import GuestPortrait from "@/components/brand/GuestPortrait";
import Eyebrow from "@/components/ui/Eyebrow";
import StatCounter from "@/components/ui/StatCounter";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import TestimonialCard from "@/components/layout/TestimonialCard";
import FeaturedEpisode from "@/components/home/FeaturedEpisode";
import RecentReleases from "@/components/episode/RecentReleases";
import Collections from "@/components/episode/Collections";
import TopicRail from "@/components/episode/TopicRail";
import ProvidersRow from "@/components/episode/ProvidersRow";
import EmailSignup from "@/components/layout/EmailSignup";
import SlackBlock from "@/components/layout/SlackBlock";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${site.tagline}`,
  description: site.elevatorPitch,
  path: "/",
});

export default function HomePage() {
  const all = getAllEpisodes();
  const featured = all[0];
  const recent = all.slice(1, 5);

  return (
    <>
      <JsonLd data={podcastSeriesSchema()} />

      {/* 1 — Content-forward hero: the latest episode, framed by the brand. */}
      <FeaturedEpisode episode={featured} />

      {/* 2 — The library: recent releases grid + curated collections. */}
      <section className="paper-grain bg-bone py-sp-9">
        <RecentReleases episodes={recent} heading="Recent releases" />
        <div className="mt-sp-9">
          <Collections />
        </div>
      </section>

      {/* 3 — Browse by topic (acquired's industry tags), contrasting band. */}
      <TopicRail />

      {/* 4 — What the show is + the hosts. */}
      <section className="bg-paper py-sp-9" aria-labelledby="show-heading">
        <div className="mx-auto grid max-w-content items-center gap-12 px-5 sm:px-8 md:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <Eyebrow>THE SHOW</Eyebrow>
            <h2
              id="show-heading"
              className="mt-3 max-w-2xl font-display text-h1 leading-[1.04] text-ink"
            >
              A mate telling you the real story over a beer.
            </h2>
            <p className="mt-5 max-w-md text-lead text-ink-2">
              {site.name} takes you inside the hearts and minds of the Founders
              navigating the start-up world. Interview-led, crafted in post, and
              honest to a fault. We don&rsquo;t sand the rough bits off — that&rsquo;s
              the whole point.
            </p>
            <Link
              href="/about"
              className="spark-link mt-6 inline-block font-semibold text-deep-blue"
            >
              More about the show →
            </Link>
          </Reveal>

          {/* Hosts mini */}
          <Reveal delay={0.08}>
            <p className="eyebrow text-deep-blue">Your hosts</p>
            <div className="mt-4 grid grid-cols-2 gap-5">
              {site.hosts.map((host, i) => (
                <Link key={host.name} href="/about" className="group block">
                  <GuestPortrait
                    tone={i % 2 === 0 ? "deep" : "navy"}
                    withCloud={false}
                    className="aspect-[4/5] w-full rounded-md transition-transform duration-base group-hover:-translate-y-1"
                  />
                  <p className="mt-3 font-display text-h3 leading-tight text-ink">
                    {host.name}
                  </p>
                  <p className="text-small text-ink-3">{host.role}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — Listener love. */}
      <section className="paper-grain bg-bone py-sp-9" aria-labelledby="love-heading">
        <div className="mx-auto mb-8 max-w-wall px-5 sm:px-8">
          <Eyebrow as="div">
            <span id="love-heading">FROM THE FOUNDERS</span>
          </Eyebrow>
        </div>
        <Marquee items={testimonials.map((t, i) => <TestimonialCard key={i} t={t} />)} />
      </section>

      {/* 6 — The Club (brand punch, breaks the light run). */}
      <BlueWall tone="launch" as="section" className="py-sp-9" aria-labelledby="club-heading">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal>
            <Eyebrow on="dark">THE AUSSIE FOUNDERS CLUB</Eyebrow>
            <h2
              id="club-heading"
              className="mt-4 max-w-2xl font-display text-h1 leading-[1.04] text-on-blue"
            >
              You&rsquo;re not building alone.
            </h2>
            <p className="mt-6 font-display text-h2 text-on-blue">
              Join{" "}
              <span className="text-marigold">
                <StatCounter value={site.memberCount} /> Founders
              </span>{" "}
              in the Slack.
            </p>
            <p className="mt-4 max-w-xl text-on-blue">
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

      {/* 7 — Listen everywhere + email. */}
      <section className="bg-bone py-sp-9">
        <div className="mx-auto mb-12 max-w-content px-5 sm:px-8">
          <Reveal className="flex flex-col gap-5 border-b border-hairline pb-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-h3 text-ink">
              Available everywhere you listen.
            </p>
            <ProvidersRow />
          </Reveal>
        </div>
        <EmailSignup />
      </section>

      {/* 8 — Slack close. */}
      <div className="pb-sp-8">
        <SlackBlock />
      </div>
    </>
  );
}
