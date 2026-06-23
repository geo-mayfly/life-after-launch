import type { Tone } from "@/content/schema";

/**
 * Listener love (brief §8.3). Illustrative placeholder quotes — replace with
 * real, named, attributed testimonials at build time. All flagged `sample`.
 * Attributions are kept honest (sector + stage, no fabricated names/faces); a
 * branded cloud avatar stands in until real photos land.
 */
export type Testimonial = {
  quote: string;
  sector: string;
  stage: string;
  tone: Tone;
  sample?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Finally a founder podcast that doesn't pretend it was all a smooth ride.",
    sector: "SaaS",
    stage: "Series A",
    tone: "launch",
    sample: true,
  },
  {
    quote: "I listened to one episode and immediately sent it to my co-founder.",
    sector: "DTC",
    stage: "bootstrapped",
    tone: "deep",
    sample: true,
  },
  {
    quote: "It's the chat you wish you could have at 11pm when it's all gone sideways.",
    sector: "marketplace",
    stage: "pre-seed",
    tone: "navy",
    sample: true,
  },
  {
    quote: "No highlight reels. Just the actual mechanics of how it nearly fell over.",
    sector: "fintech",
    stage: "Series B",
    tone: "deep",
    sample: true,
  },
  {
    quote: "The Key Takeaways alone are worth the subscribe. I keep coming back.",
    sector: "B2B",
    stage: "seed",
    tone: "launch",
    sample: true,
  },
  {
    quote: "Two hosts who've actually done it, asking the questions I'd want to ask.",
    sector: "climate tech",
    stage: "Series A",
    tone: "navy",
    sample: true,
  },
  {
    quote: "Honest about the bits everyone else edits out. That's the whole value.",
    sector: "health tech",
    stage: "seed",
    tone: "launch",
    sample: true,
  },
  {
    quote: "I've started recommending it to every first-time founder I meet.",
    sector: "dev tools",
    stage: "bootstrapped",
    tone: "deep",
    sample: true,
  },
];
