import { z } from "zod";

/**
 * The episode content model (brief §7.1 / §12.2).
 * Episodes are typed TS objects validated against this schema at load time;
 * the build fails loudly on invalid or missing fields, which keeps the data
 * clean and lets the wall / detail pages render every field with confidence.
 *
 * Adding an episode = one file in content/episodes/ + a poster image.
 */

export const toneSchema = z.enum(["launch", "deep", "navy"]);
export type Tone = z.infer<typeof toneSchema>;

export const insightSchema = z.object({
  /** Bold lead-in: a complete, standalone, extractable claim (GEO). */
  lead: z.string().min(1),
  /** 2–4 sentences of support in the show's voice. */
  body: z.string().min(1),
  /** One concrete data point, rendered as a marigold-on-navy stat chip. */
  stat: z.string().optional(),
});
export type Insight = z.infer<typeof insightSchema>;

export const episodeSchema = z.object({
  slug: z.string().min(1),
  episodeTitle: z.string().min(1),
  hook: z.string().min(1),
  season: z.number().int().positive(),
  episodeNumber: z.number().int().positive(),
  publishDate: z.string().min(1), // ISO 8601
  duration: z.string().min(1), // "1h 04m"
  tone: toneSchema,

  anonymous: z.boolean().optional(),
  guestName: z.string().optional(),
  guestRole: z.string().optional(),
  guestCompany: z.string().optional(),
  guestBio: z.string().optional(),

  image: z.object({ src: z.string().min(1), alt: z.string().min(1) }),

  listen: z.object({
    spotify: z.string().url().optional(),
    apple: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }),

  embed: z
    .object({ provider: z.enum(["spotify", "youtube"]), id: z.string() })
    .optional(),

  overview: z.array(z.string().min(1)).min(1),

  pullQuote: z.object({
    text: z.string().min(1),
    attribution: z.string().min(1),
  }),

  keyTakeaways: z.object({
    question: z.string().min(1),
    dek: z.string().min(1),
    tldr: z.string().optional(),
    insights: z.array(insightSchema).min(3).max(6),
    synthesis: z.string().min(1),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(2).max(4),
  }),

  chapters: z.array(z.object({ time: z.string(), label: z.string() })).optional(),
  links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  related: z.array(z.string()),

  seo: z.object({
    metaTitle: z.string().min(1),
    metaDescription: z.string().min(1),
    ogImage: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),

  sample: z.boolean().optional(),
});

export type Episode = z.infer<typeof episodeSchema>;

/** Tone recipe (brief §3.2) — wall base → gradient-to (into shadow). */
export const toneRecipe: Record<Tone, { base: string; to: string; label: string }> = {
  launch: { base: "var(--launch-blue)", to: "var(--deep-blue)", label: "launch" },
  deep: { base: "var(--deep-blue)", to: "var(--ink-navy)", label: "deep" },
  navy: { base: "var(--ink-navy)", to: "#041d39", label: "navy" },
};
