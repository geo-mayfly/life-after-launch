import Link from "next/link";
import { site } from "@/content/site";
import BlueWall from "@/components/brand/BlueWall";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * TopicRail — acquired.fm-style "browse by industry" tag menu, on its own
 * contrasting deep-blue band (tone rhythm). Each topic deep-links into the
 * filtered Episodes index (crawlable <a>s).
 */
export default function TopicRail() {
  return (
    <BlueWall tone="deep" as="section" className="py-sp-8" aria-labelledby="topics-heading">
      <div className="mx-auto max-w-wall px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Eyebrow on="dark" as="div">
            <span id="topics-heading">BROWSE BY TOPIC</span>
          </Eyebrow>
          <ul className="flex flex-wrap gap-3">
            {site.topics.map((topic) => (
              <li key={topic}>
                <Link
                  href={`/episodes?topic=${encodeURIComponent(topic)}`}
                  className="inline-flex rounded-full border border-[rgba(255,255,255,0.3)] px-4 py-2 text-[0.85rem] font-semibold text-on-blue transition-[transform,border-color,background-color] duration-fast hover:-translate-y-px hover:border-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)]"
                >
                  {topic}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/episodes"
                className="inline-flex rounded-full bg-marigold px-4 py-2 text-[0.85rem] font-semibold text-ink-navy transition-transform duration-fast hover:-translate-y-px"
              >
                All episodes →
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </BlueWall>
  );
}
