import type { Episode } from "@/content/schema";
import { site } from "@/content/site";
import Eyebrow from "@/components/ui/Eyebrow";
import StatCallout from "@/components/episode/StatCallout";
import FaqAccordion from "@/components/episode/FaqAccordion";
import ListenButtons from "@/components/episode/ListenButtons";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

/**
 * Key Takeaways (brief §7.4) — the citable centrepiece, rendered as article-style
 * TILES that explore each theme, with callouts (the marigold-on-navy stat chips),
 * a highlight (TL;DR), and a quote. Still semantic + answer-first for SEO/GEO.
 */
export default function KeyTakeaways({ episode }: { episode: Episode }) {
  const kt = episode.keyTakeaways;
  const guest = episode.anonymous
    ? "an anonymous Founder"
    : episode.guestName ?? "our guest";

  return (
    <div className="paper-grain" data-surface="light">
      <Reveal>
        <Eyebrow>KEY TAKEAWAYS</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-h2 leading-tight text-ink">
          {kt.question}
        </h2>
        <p className="mt-5 max-w-2xl text-lead text-ink-2">{kt.dek}</p>

        {kt.tldr && (
          <p
            className="mt-6 rounded-md border-l-[3px] bg-paper p-5 font-display text-h3 italic leading-snug text-ink shadow-sm"
            style={{ borderColor: "var(--marigold)" }}
          >
            <span className="eyebrow mb-2 block not-italic text-deep-blue">TL;DR</span>
            {kt.tldr}
          </p>
        )}
      </Reveal>

      {/* Insight tiles — each a self-contained theme with its data callout. */}
      <Stagger className="mt-9 grid gap-5 sm:grid-cols-2">
        {kt.insights.map((insight, i) => (
          <RevealItem
            key={i}
            className="flex flex-col rounded-lg border border-hairline bg-paper p-6 shadow-sm"
          >
            <span
              aria-hidden
              className="mb-4 inline-flex w-fit items-center justify-center rounded-md bg-ink-navy px-2.5 py-1 font-display text-[1.15rem] leading-none text-marigold"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-display text-h3 leading-snug text-ink">{insight.lead}</p>
            <p className="prose-bone mt-3 text-ink-2">{insight.body}</p>
            {insight.stat && (
              <div className="mt-auto pt-4">
                <StatCallout>{insight.stat}</StatCallout>
              </div>
            )}
          </RevealItem>
        ))}
      </Stagger>

      {/* Quote highlight — the killer grab from the interview. */}
      <Reveal className="mt-6">
        <figure
          className="rounded-lg p-7 sm:p-9"
          style={{ background: "var(--ink-navy)" }}
        >
          <blockquote className="font-display text-h2 italic leading-[1.12] text-on-blue">
            <span aria-hidden className="text-marigold">
              “
            </span>
            {episode.pullQuote.text}
            <span aria-hidden className="text-marigold">
              ”
            </span>
          </blockquote>
          <figcaption className="mt-5 eyebrow text-on-blue-soft">
            — {episode.pullQuote.attribution}
          </figcaption>
        </figure>
      </Reveal>

      {/* Synthesis — the "so what". */}
      <Reveal className="mt-9 border-t border-hairline pt-7">
        <h3 className="eyebrow text-deep-blue">The so-what</h3>
        <p className="prose-bone mt-3 max-w-2xl text-lead text-ink">{kt.synthesis}</p>
      </Reveal>

      {/* FAQ — visible + FAQPage schema (highest-leverage GEO feature). */}
      <Reveal className="mt-9">
        <h3 className="font-display text-h3 text-ink">Frequently asked</h3>
        <div className="mt-4">
          <FaqAccordion items={kt.faq} />
        </div>
      </Reveal>

      {/* Attribution + listen links. */}
      <Reveal className="mt-8">
        <p className="text-ink-2">
          Distilled from{" "}
          <em className="font-display not-italic font-semibold">{site.name}</em> EP{" "}
          {String(episode.episodeNumber).padStart(2, "0")},{" "}
          <em>“{episode.episodeTitle}”</em>, with {guest}. Listen for the full story →
        </p>
        <div className="mt-4">
          <ListenButtons listen={episode.listen} size="sm" />
        </div>
      </Reveal>
    </div>
  );
}
