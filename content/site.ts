/**
 * Global site config — the single source of truth for live figures, social
 * and listen URLs, and host info. Change the Founder count in ONE place (§10.4).
 *
 * Items marked TODO are the open items for the brand owner (brief §12.4) and
 * ship with sensible placeholder defaults.
 */

export const site = {
  name: "Life After Launch",
  shortName: "Life After Launch",
  tagline: "Raw. Real. Un-sugar-coated.",
  elevatorPitch:
    "Raw, real, the un-sugar-coated account of what life after launch is really like.",
  description:
    "An interview-led podcast that takes you inside the hearts and minds of the Founders navigating the start-up world. The public face of the Aussie Founders Club.",
  url: "https://lifeafterlaunchpod.com",
  email: "hello@lifeafterlaunchpod.com",
  club: "Aussie Founders Club",

  /** TODO(owner §12.4): confirm the live Founder count. One value, used everywhere. */
  memberCount: 1281,

  /** Show-level listen URLs. TODO(owner §12.4): real platform URLs. */
  listen: {
    spotify: "https://open.spotify.com/show/PLACEHOLDER",
    apple: "https://podcasts.apple.com/podcast/PLACEHOLDER",
    youtube: "https://youtube.com/@lifeafterlaunchpod",
  },

  /** RSS for the podcast feed (linked in <head>). TODO(owner). */
  rss: "https://lifeafterlaunchpod.com/rss.xml",

  /** Slack invite. TODO(owner §12.4): public invite vs. gated/auto-invite. */
  slackInvite: "https://aussiefoundersclub.slack.com/PLACEHOLDER",

  social: {
    x: "https://x.com/lifeafterlaunch",
    linkedin: "https://www.linkedin.com/company/aussie-founders-club",
  },

  hosts: [
    {
      name: "Megan Luttrell",
      role: "Co-host",
      // TODO(owner §12.4): real bio + photo.
      bio: "Placeholder bio. Megan has spent the better part of a decade in and around early-stage companies — building, breaking, and rebuilding. She asks the question everyone's thinking and nobody wants to say out loud.",
      image: { src: "/hosts/megan.jpg", alt: "Megan Luttrell, co-host of Life After Launch, on the blue studio wall" },
      x: "https://x.com/meganluttrell",
      linkedin: "https://www.linkedin.com/in/meganluttrell",
    },
    {
      name: "Geo George",
      role: "Co-host",
      // TODO(owner §12.4): real bio + photo.
      bio: "Placeholder bio. Geo has launched, scaled, and shut things down — and is honest about all three. He's the one who'll follow up the highlight reel with: yeah, but what actually happened?",
      image: { src: "/hosts/geo.jpg", alt: "Geo George, co-host of Life After Launch, on the blue studio wall" },
      x: "https://x.com/geogeorge",
      linkedin: "https://www.linkedin.com/in/geogeorge",
    },
  ],

  /** Filter chips for the Episodes index (brief §8.4). TODO(owner §12.4): confirm taxonomy. */
  topics: ["Fundraising", "Product", "Growth", "Failure", "Mental load", "Exits"],

  /** New in 2026. */
  launchedYear: 2026,
} as const;

export type SiteConfig = typeof site;

/** Live, configurable figures used across pages. */
export const memberCountLabel = site.memberCount.toLocaleString("en-AU");
