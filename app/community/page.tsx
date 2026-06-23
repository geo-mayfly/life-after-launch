import type { Metadata } from "next";
import { site, memberCountLabel } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { communitySchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import BlueWall from "@/components/brand/BlueWall";
import CloudHead from "@/components/brand/CloudHead";
import Eyebrow from "@/components/ui/Eyebrow";
import StatCounter from "@/components/ui/StatCounter";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, RevealItem } from "@/components/motion/Reveal";
import EmailSignup from "@/components/layout/EmailSignup";

export const metadata: Metadata = buildMetadata({
  title: "Join the Club",
  description: `The Slack where the conversation keeps going after the episode ends. Join ${memberCountLabel} Founders in the Aussie Founders Club.`,
  path: "/community",
});

const VALUE_LINES = [
  "Founders who'll tell you the truth at 11pm when it's gone sideways.",
  "Episode takeaways and behind-the-scenes before anyone else.",
  "A vote on who we interview next.",
  "Zero LinkedIn voice. Promise.",
];

// Decorative cloud-head field — "you'll be one of them". Reduced-motion-safe.
const FIELD = [
  { x: "6%", y: "12%", size: 90, o: 0.18 },
  { x: "78%", y: "8%", size: 120, o: 0.16 },
  { x: "32%", y: "30%", size: 70, o: 0.14 },
  { x: "60%", y: "40%", size: 100, o: 0.2 },
  { x: "14%", y: "58%", size: 130, o: 0.16 },
  { x: "86%", y: "62%", size: 80, o: 0.14 },
  { x: "44%", y: "70%", size: 110, o: 0.18 },
  { x: "70%", y: "84%", size: 90, o: 0.15 },
  { x: "24%", y: "88%", size: 75, o: 0.13 },
];

export default function CommunityPage() {
  return (
    <>
      <JsonLd
        data={[
          communitySchema(),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Community", url: "/community" },
          ]),
        ]}
      />

      {/* Hero */}
      <BlueWall tone="launch" as="header" className="pb-sp-9 pt-[120px]" vignette={0.5}>
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal>
            <Eyebrow on="dark">THE AUSSIE FOUNDERS CLUB</Eyebrow>
            <h1 className="mt-4 font-display text-hero leading-[0.95] text-on-blue">
              Join the Club.
            </h1>
            <p className="mt-6 font-display text-h2 text-marigold">
              <StatCounter value={site.memberCount} /> Founders and counting.
            </p>
            <p className="mt-5 max-w-xl text-lead text-on-blue">
              The Slack where the conversation keeps going after the episode
              ends. Real founders, real talk, no pitch decks.
            </p>
            <div className="mt-8">
              <Button href={site.slackInvite} variant="primary" size="lg" external>
                Join the Slack →
              </Button>
            </div>
          </Reveal>
        </div>
      </BlueWall>

      {/* What you get inside */}
      <section className="bg-bone py-sp-9" aria-labelledby="inside-heading">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <Reveal>
            <h2 id="inside-heading" className="max-w-xl font-display text-h1 leading-[1.04] text-ink">
              What&rsquo;s actually in there.
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
            {VALUE_LINES.map((line, i) => (
              <RevealItem
                key={i}
                className="flex items-start gap-4 bg-paper p-7"
              >
                <span className="mt-1 font-display text-h3 text-marigold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lead text-ink">{line}</p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Emails from Megan & Geo */}
      <section className="bg-bone pb-sp-9" aria-labelledby="emails-heading">
        <div className="mx-auto grid max-w-content items-center gap-10 px-5 sm:px-8 md:grid-cols-[1fr_0.8fr]">
          <Reveal>
            <Eyebrow>STRAIGHT TO YOUR INBOX</Eyebrow>
            <h2 id="emails-heading" className="mt-3 font-display text-h2 text-ink">
              Emails from Megan &amp; Geo.
            </h2>
            <p className="mt-4 max-w-prose text-ink-2">
              Our key takeaways, a few photos from the shoot, a hint at the next
              episode, and your vote on future topics.
            </p>
          </Reveal>

          {/* Preview thumbnail — a mock email card */}
          <Reveal delay={0.08}>
            <div className="rotate-[-1.5deg] rounded-md bg-paper p-6 shadow-lg">
              <p className="eyebrow text-deep-blue">LIFE AFTER LAUNCH · THE EMAIL</p>
              <p className="mt-3 font-display text-h3 leading-snug text-ink">
                The hire nobody claps for
              </p>
              <p className="mt-3 text-small text-ink-2">
                This week: why the ops lead saved the company, three photos from
                the shoot, and a vote on who&rsquo;s next…
              </p>
              <div className="mt-5 h-px bg-hairline" />
              <p className="mt-4 text-small text-ink-3">See ya, Megan &amp; Geo</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12">
          <EmailSignup />
        </div>
      </section>

      {/* The wall, quietly — a drifting field of Founders */}
      <BlueWall tone="deep" as="section" className="relative overflow-hidden py-sp-9" vignette={0.5}>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {FIELD.map((c, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: c.x, top: c.y, opacity: c.o }}
            >
              <CloudHead size={c.size} color="#FFFFFF" drift />
            </div>
          ))}
        </div>
        <div className="relative mx-auto max-w-content px-5 text-center sm:px-8">
          <Reveal>
            <p className="mx-auto max-w-2xl font-display text-h2 text-on-blue">
              {memberCountLabel} Founders are already in there. You&rsquo;ll be
              one of them.
            </p>
            <p className="mt-6 text-small text-on-blue">
              Hit follow, go hard on the five stars, and we&rsquo;ll see ya in
              the Slack. See ya!
            </p>
            <div className="mt-8">
              <Button href={site.slackInvite} variant="primary" size="lg" external>
                Join the Slack →
              </Button>
            </div>
          </Reveal>
        </div>
      </BlueWall>
    </>
  );
}
