/**
 * Listener love (brief §8.3). Sample placeholder quotes — replace with real
 * testimonials at build time. All flagged `sample: true`.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  sample?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Finally a founder podcast that doesn't pretend it was all a smooth ride.",
    name: "sample Founder",
    role: "SaaS",
    sample: true,
  },
  {
    quote: "I listened to one episode and immediately sent it to my co-founder.",
    name: "sample Founder",
    role: "DTC",
    sample: true,
  },
  {
    quote:
      "It's the chat you wish you could have at 11pm when it's all gone sideways.",
    name: "sample Founder",
    role: "marketplace",
    sample: true,
  },
  {
    quote:
      "No highlight reels. Just the actual mechanics of how it nearly fell over.",
    name: "sample Founder",
    role: "fintech",
    sample: true,
  },
  {
    quote: "The Key Takeaways alone are worth the subscribe. I keep coming back.",
    name: "sample Founder",
    role: "B2B",
    sample: true,
  },
  {
    quote: "Two hosts who've actually done it, asking the questions I'd want to ask.",
    name: "sample Founder",
    role: "climate tech",
    sample: true,
  },
];
