import Link from "next/link";
import { getAllEpisodes, episodeMatchesTopic } from "@/lib/content";
import { toneRecipe, type Tone } from "@/content/schema";
import BlueWall from "@/components/brand/BlueWall";
import CloudHead from "@/components/brand/CloudHead";
import Eyebrow from "@/components/ui/Eyebrow";
import { Stagger, RevealItem } from "@/components/motion/Reveal";

/**
 * Collections — acquired.fm-style "Featured Playlists", framed honestly as
 * curated topic sets (each links into the filtered Episodes index via the
 * ?topic= deep-link; no invented episodes). Acquired's section #4.
 */
const COLLECTIONS: { name: string; topic: string; blurb: string; tone: Tone }[] = [
  {
    name: "When the money ran out",
    topic: "Fundraising",
    blurb: "Cashflow, raises, and the maths that just doesn't add up.",
    tone: "deep",
  },
  {
    name: "When it nearly ended",
    topic: "Failure",
    blurb: "Pivots, co-founder fallouts, and the near-death weeks.",
    tone: "navy",
  },
  {
    name: "Surviving the scale",
    topic: "Growth",
    blurb: "Growth that outran the company — and the founder.",
    tone: "launch",
  },
];

export default function Collections() {
  const all = getAllEpisodes();

  return (
    <section className="mx-auto max-w-wall px-5 sm:px-8" aria-labelledby="collections-heading">
      <div className="mb-8">
        <Eyebrow>NEW HERE?</Eyebrow>
        <h2 id="collections-heading" className="mt-3 font-display text-h2 text-ink">
          Start here.
        </h2>
      </div>

      <Stagger className="grid gap-6 md:grid-cols-3">
        {COLLECTIONS.map((c) => {
          const count = all.filter((e) => episodeMatchesTopic(e, c.topic)).length;
          return (
            <RevealItem key={c.name}>
              <Link
                href={`/episodes?topic=${encodeURIComponent(c.topic)}`}
                className="group block overflow-hidden rounded-lg shadow-sm transition-[transform,box-shadow] duration-base ease-brand hover:-translate-y-1 hover:shadow-lg"
              >
                <BlueWall tone={c.tone} className="relative h-40 overflow-hidden" vignette={0.45}>
                  <div
                    aria-hidden
                    className="absolute -right-4 -top-3 opacity-80 transition-transform duration-slow group-hover:translate-x-1"
                  >
                    <CloudHead size={120} color="rgba(255,255,255,0.85)" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-display text-h3 leading-tight text-on-blue">{c.name}</p>
                  </div>
                </BlueWall>
                <div className="bg-paper p-5" style={{ borderTop: `3px solid ${toneRecipe[c.tone].base}` }}>
                  <p className="text-ink-2">{c.blurb}</p>
                  <p className="mt-3 text-small font-semibold text-deep-blue">
                    {count} {count === 1 ? "episode" : "episodes"} →
                  </p>
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </Stagger>
    </section>
  );
}
