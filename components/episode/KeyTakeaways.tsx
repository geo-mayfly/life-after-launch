import type { Episode } from "@/content/schema";
import { site } from "@/content/site";
import Eyebrow from "@/components/ui/Eyebrow";
import StatCallout from "@/components/episode/StatCallout";
import FaqAccordion from "@/components/episode/FaqAccordion";
import ListenButtons from "@/components/episode/ListenButtons";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";

/**
 * Key Takeaways (brief §7.4) — the McKinsey-style, citable article and the
 * page's SEO/GEO centrepiece. Semantic, answer-first, extractable. Emits no
 * schema itself (the page wires Article + FAQPage JSON-LD); this is the
 * visible, accessible article on Bone "printed matter".
 */
export default function KeyTakeaways({ episode }: { episode: Episode }) {
  const kt = episode.keyTakeaways;
  const guest = episode.anonymous
    ? "an anonymous Founder"
    : episode.guestName ?? "our guest";

  return (
    <article className="mx-auto max-w-content px-5 sm:px-8" id="key-takeaways">
      <div className="paper-grain rounded-lg bg-bone p-7 sm:p-12" data-surface="light">
        <Reveal>
          <Eyebrow>KEY TAKEAWAYS</Eyebrow>
          {/* Question-led H2 — matches a real founder query (SEO long-tail + GEO). */}
          <h2 className="mt-4 max-w-3xl font-display text-h2 leading-tight text-ink">
            {kt.question}
          </h2>
          <p className="prose-bone mt-5 text-lead text-ink-2">{kt.dek}</p>

          {kt.tldr && (
            <p
              className="mt-6 border-l-[3px] pl-5 font-display text-h3 italic leading-snug text-ink"
              style={{ borderColor: "var(--marigold)" }}
            >
              <span className="eyebrow mb-2 block not-italic text-deep-blue">
                TL;DR
              </span>
              {kt.tldr}
            </p>
          )}
        </Reveal>

        {/* Numbered insights — each lead-in is a standalone, quotable claim. */}
        <Stagger as="ol" className="mt-12 space-y-12">
          {kt.insights.map((insight, i) => (
            <RevealItem as="li" key={i} className="grid gap-1">
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className="inline-flex shrink-0 items-center justify-center rounded-md bg-ink-navy px-3 py-1 font-display text-h3 leading-none text-marigold"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-h3 font-semibold leading-snug text-ink">
                    {insight.lead}
                  </p>
                  <p className="prose-bone mt-3 text-ink-2">{insight.body}</p>
                  {insight.stat && <StatCallout>{insight.stat}</StatCallout>}
                </div>
              </div>
            </RevealItem>
          ))}
        </Stagger>

        {/* Synthesis — the "so what". */}
        <Reveal className="mt-12 border-t border-hairline pt-8">
          <h3 className="eyebrow text-deep-blue">The so-what</h3>
          <p className="prose-bone mt-3 text-lead text-ink">{kt.synthesis}</p>
        </Reveal>

        {/* FAQ — visible + FAQPage schema (highest-leverage GEO feature). */}
        <Reveal className="mt-12">
          <h3 className="font-display text-h3 text-ink">Frequently asked</h3>
          <div className="mt-4">
            <FaqAccordion items={kt.faq} />
          </div>
        </Reveal>

        {/* Attribution + listen links. */}
        <Reveal className="mt-10">
          <p className="text-ink-2">
            Distilled from{" "}
            <em className="font-display not-italic font-semibold">{site.name}</em>{" "}
            EP {String(episode.episodeNumber).padStart(2, "0")},{" "}
            <em>“{episode.episodeTitle}”</em>, with {guest}. Listen for the full
            story →
          </p>
          <div className="mt-4">
            <ListenButtons listen={episode.listen} size="sm" />
          </div>
        </Reveal>
      </div>
    </article>
  );
}
