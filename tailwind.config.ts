import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Tailwind is wired to the design tokens in styles/tokens.css.
 * Every theme key references a CSS variable so tokens remain the single
 * source of truth — never hard-code a hex in a component.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "launch-blue": "var(--launch-blue)",
        "launch-blue-bright": "var(--launch-blue-bright)",
        "deep-blue": "var(--deep-blue)",
        "ink-navy": "var(--ink-navy)",
        marigold: "var(--marigold)",
        "marigold-bright": "var(--marigold-bright)",
        "marigold-deep": "var(--marigold-deep)",
        paper: "var(--paper)",
        bone: "var(--bone)",
        "bone-deep": "var(--bone-deep)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        "on-blue": "var(--on-blue)",
        "on-blue-soft": "var(--on-blue-soft)",
        "on-blue-faint": "var(--on-blue-faint)",
        // semantic roles
        text: "var(--text)",
        surface: "var(--surface)",
        accent: "var(--accent)",
        link: "var(--link)",
        positive: "var(--positive)",
        danger: "var(--danger)",
        hairline: "var(--hairline)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
      },
      fontSize: {
        hero: "var(--t-hero)",
        h1: "var(--t-h1)",
        h2: "var(--t-h2)",
        h3: "var(--t-h3)",
        lead: "var(--t-lead)",
        body: "var(--t-body)",
        small: "var(--t-small)",
      },
      spacing: {
        "sp-1": "var(--sp-1)",
        "sp-2": "var(--sp-2)",
        "sp-3": "var(--sp-3)",
        "sp-4": "var(--sp-4)",
        "sp-5": "var(--sp-5)",
        "sp-6": "var(--sp-6)",
        "sp-7": "var(--sp-7)",
        "sp-8": "var(--sp-8)",
        "sp-9": "var(--sp-9)",
      },
      borderRadius: {
        xs: "var(--r-xs)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        lg: "var(--shadow-lg)",
        gold: "var(--shadow-gold)",
      },
      maxWidth: {
        content: "var(--content-max)",
        wall: "var(--wall-max)",
      },
      transitionTimingFunction: {
        brand: "var(--ease)",
        pop: "var(--ease-pop)",
      },
      transitionDuration: {
        fast: "140ms",
        base: "240ms",
        slow: "420ms",
        scene: "720ms",
      },
      letterSpacing: {
        eyebrow: "0.12em",
      },
      lineHeight: {
        display: "0.98",
        tight: "1.06",
      },
    },
  },
  plugins: [typography],
};

export default config;
