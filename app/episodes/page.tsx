import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllEpisodes, episodeCount } from "@/lib/content";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Skeleton from "@/components/ui/Skeleton";
import BlueWall from "@/components/brand/BlueWall";
import Eyebrow from "@/components/ui/Eyebrow";
import EpisodesExplorer from "@/components/episode/EpisodesExplorer";
import EmailSignup from "@/components/layout/EmailSignup";
import SlackBlock from "@/components/layout/SlackBlock";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Every Founder has a story",
  description:
    "The raw ones, the messy ones, the ones that actually worked. Drag through the full Life After Launch archive and pick your poison.",
  path: "/episodes",
});

export default function EpisodesPage() {
  const episodes = getAllEpisodes();

  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema(episodes),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Episodes", url: "/episodes" },
          ]),
        ]}
      />

      <BlueWall tone="deep" as="section" className="pb-sp-9 pt-[120px]" vignette={0.5}>
        <div className="mx-auto max-w-wall px-5 sm:px-8">
          <Reveal>
            <Eyebrow on="dark">THE ARCHIVE</Eyebrow>
            <h1 className="mt-4 max-w-3xl font-display text-h1 leading-[1.02] text-on-blue">
              Every Founder has a story.
            </h1>
            <p className="mt-5 max-w-2xl text-lead text-on-blue">
              The raw ones, the messy ones, the ones that actually worked. Drag
              through and pick your poison.
            </p>
            <p className="mt-3 text-on-blue-faint">
              {episodeCount} episodes and counting.
            </p>
          </Reveal>

          <div className="mt-12">
            <Suspense
              fallback={
                <div className="grid gap-7 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} aspect="4 / 5" />
                  ))}
                </div>
              }
            >
              <EpisodesExplorer episodes={episodes} />
            </Suspense>
          </div>
        </div>
      </BlueWall>

      <section className="bg-bone py-sp-9">
        <EmailSignup />
      </section>

      <div className="pb-sp-8">
        <SlackBlock />
      </div>

      <span className="sr-only">
        Listen to {site.name} on Spotify, Apple Podcasts and YouTube.
      </span>
    </>
  );
}
