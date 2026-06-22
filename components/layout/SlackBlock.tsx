import { site, memberCountLabel } from "@/content/site";
import BlueWall from "@/components/brand/BlueWall";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The "conversation keeps going" Slack invitation (brief §5.2, §8.2).
 * Sits directly above the footer on content pages.
 */
export default function SlackBlock() {
  return (
    <section className="mx-auto max-w-wall px-5 sm:px-8">
      <Reveal>
        <BlueWall
          tone="deep"
          className="overflow-hidden rounded-lg px-7 py-12 sm:px-12 sm:py-16"
        >
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="font-display text-h3 text-on-blue">
                Finished an episode? The conversation keeps going.
              </p>
              <p className="mt-3 text-on-blue-soft">
                Join {memberCountLabel} Founders in the Slack — real founders,
                real talk, no LinkedIn voice.
              </p>
            </div>
            <Button href={site.slackInvite} variant="primary" size="lg" external>
              Join the Slack →
            </Button>
          </div>
        </BlueWall>
      </Reveal>
    </section>
  );
}
