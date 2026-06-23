import type { Metadata } from "next";
import Link from "next/link";
import { site, memberCountLabel } from "@/content/site";
import { episodeCount } from "@/lib/content";
import { testimonials } from "@/content/testimonials";
import { buildMetadata } from "@/lib/seo";
import { aboutPageSchema, podcastSeriesSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import BlueWall from "@/components/brand/BlueWall";
import GuestPortrait from "@/components/brand/GuestPortrait";
import Eyebrow from "@/components/ui/Eyebrow";
import StatCounter from "@/components/ui/StatCounter";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import TestimonialCard from "@/components/layout/TestimonialCard";
import EmailSignup from "@/components/layout/EmailSignup";
import SlackBlock from "@/components/layout/SlackBlock";

export const metadata: Metadata = buildMetadata({
  title: "About the show",
  description:
    "The un-sugar-coated story of building. Interview-led, crafted in post, honest to a fault — hosted by Megan Luttrell and Geo George.",
  path: "/about",
});

function HostPortrait({ name, tone }: { name: string; tone: "deep" | "navy" }) {
  // Collage placeholder — bust silhouette, NO cloud (the cloud is guests-only).
  // TODO(owner §12.4): swap for real host photography.
  return (
    <div className="relative">
      <GuestPortrait tone={tone} withCloud={false} className="aspect-[4/5] w-full rounded-lg" />
      <span className="absolute bottom-3 left-3 rounded-full bg-paper px-3 py-1 text-[0.72rem] font-semibold text-ink shadow-sm">
        {name}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutPageSchema(),
          podcastSeriesSchema(),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
          ]),
        ]}
      />

      {/* Hero */}
      <BlueWall tone="launch" as="header" className="pb-sp-9 pt-[120px]" vignette={0.5}>
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal>
            <Eyebrow on="dark">ABOUT THE SHOW</Eyebrow>
            <h1 className="mt-4 max-w-3xl font-display text-h1 leading-[1.02] text-on-blue">
              The un-sugar-coated story of building.
            </h1>
            <p className="mt-6 text-lead text-on-blue">
              New in {site.launchedYear} ·{" "}
              <span className="text-on-blue">
                <StatCounter value={episodeCount} /> episodes
              </span>{" "}
              ·{" "}
              <span className="text-marigold">
                <StatCounter value={site.memberCount} /> Founders
              </span>{" "}
              in the Club.
            </p>
          </Reveal>
        </div>
      </BlueWall>

      {/* The show — long-form prose */}
      <section className="paper-grain bg-bone py-sp-9">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal>
            <Eyebrow>THE SHOW</Eyebrow>
            <div className="prose-bone mt-6 text-lead">
              <p>
                {site.name} takes you inside the hearts and minds of the Founders
                navigating the start-up world — the part that happens{" "}
                <em>after</em> the launch post, when it gets real.
              </p>
              <p>
                Every episode is interview-led and crafted in post: we open cold
                on a killer grab from the heart of the conversation, then your
                hosts hook you in within the first two minutes. No highlight
                reels, no &ldquo;and the rest is history.&rdquo; We sit in the
                hard bits — the near-misses, the co-founder fallouts, the raises
                that didn&rsquo;t save anyone — because that&rsquo;s where the
                actual lessons live.
              </p>
              <p>
                It&rsquo;s hosted by two people who&rsquo;ve been through it,
                made for the people going through it now. A mate telling you the
                real story over a beer.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Meet the hosts — asymmetric, editorial */}
      <section className="bg-bone pb-sp-9" aria-labelledby="hosts-heading">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal>
            <h2 id="hosts-heading" className="font-display text-h2 text-ink">
              Meet the hosts
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-col gap-16">
            {site.hosts.map((host, i) => (
              <Reveal
                key={host.name}
                className={`grid items-center gap-8 md:grid-cols-[0.7fr_1.3fr] ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="max-w-[280px]">
                  <HostPortrait name={host.name} tone={i % 2 === 0 ? "deep" : "navy"} />
                </div>
                <div>
                  <p className="eyebrow text-deep-blue">{host.role}</p>
                  <h3 className="mt-2 font-display text-h2 text-ink">{host.name}</h3>
                  <p className="mt-4 max-w-prose text-ink-2">{host.bio}</p>
                  <div className="mt-5 flex gap-5">
                    <a
                      href={host.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spark-link font-medium text-deep-blue"
                    >
                      X
                    </a>
                    <a
                      href={host.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="spark-link font-medium text-deep-blue"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The format */}
      <BlueWall tone="navy" as="section" className="py-sp-9" vignette={0.45}>
        <div className="mx-auto grid max-w-content gap-8 px-5 sm:px-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <Reveal>
            <h2 className="max-w-xl font-display text-h1 leading-[1.04] text-on-blue">
              How an episode goes.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lead text-on-blue">
              One Founder. One honest conversation. We open on the moment it
              nearly fell apart, then walk it back to the start and forward to
              what they&rsquo;d tell you now. Forty minutes to an hour, no fluff.
            </p>
          </Reveal>
        </div>
      </BlueWall>

      {/* The audience — a few real, number-forward stats */}
      <section className="bg-bone py-sp-9">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Eyebrow>THE AUDIENCE</Eyebrow>
          <Stagger className="mt-8 grid gap-8 sm:grid-cols-3">
            {[
              { value: site.memberCount, label: "Founders in the Club", suffix: "" },
              { value: episodeCount, label: "episodes and counting", suffix: "" },
              { value: 2, label: "seasons in 2026", suffix: "" },
            ].map((s) => (
              <RevealItem key={s.label}>
                <p className="font-display text-hero leading-none text-deep-blue">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-ink-2">{s.label}</p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Listener love — fuller set */}
      <section className="bg-bone pb-sp-9">
        <div className="mx-auto mb-8 max-w-wall px-5 sm:px-8">
          <Eyebrow as="div">FROM THE FOUNDERS</Eyebrow>
        </div>
        <Marquee items={testimonials.map((t, i) => <TestimonialCard key={i} t={t} />)} />
      </section>

      <section className="bg-bone pb-sp-9">
        <EmailSignup />
      </section>
      <div className="pb-sp-8">
        <SlackBlock />
      </div>

      <Link href="/episodes" className="sr-only">
        Browse all episodes
      </Link>
    </>
  );
}
