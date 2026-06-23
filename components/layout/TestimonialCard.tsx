import type { Testimonial } from "@/content/testimonials";
import { toneRecipe } from "@/content/schema";
import CloudHead from "@/components/brand/CloudHead";

/**
 * Testimonial card — quote + a branded cloud avatar standing in for the
 * Founder's photo (honest placeholder until real, named quotes land).
 */
export default function TestimonialCard({ t }: { t: Testimonial }) {
  const recipe = toneRecipe[t.tone];
  return (
    <figure className="flex h-full w-[340px] flex-col justify-between rounded-md bg-paper p-7 shadow-sm">
      <blockquote className="font-display text-h3 italic leading-snug text-ink">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
          style={{ background: `linear-gradient(160deg, ${recipe.base}, ${recipe.to})` }}
          aria-hidden
        >
          <CloudHead size={28} color="rgba(255,255,255,0.92)" />
        </span>
        <span className="text-small text-ink-2">
          Founder · {t.sector} · {t.stage}
        </span>
      </figcaption>
    </figure>
  );
}
