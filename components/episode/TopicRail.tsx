import Link from "next/link";
import { site } from "@/content/site";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * TopicRail — acquired.fm-style "browse by industry" tag menu. Each topic
 * deep-links into the filtered Episodes index (crawlable <a>s).
 */
export default function TopicRail() {
  return (
    <section className="mx-auto max-w-wall px-5 sm:px-8" aria-labelledby="topics-heading">
      <Eyebrow as="div">
        <span id="topics-heading">BROWSE BY TOPIC</span>
      </Eyebrow>
      <ul className="mt-5 flex flex-wrap gap-3">
        {site.topics.map((topic) => (
          <li key={topic}>
            <Link
              href={`/episodes?topic=${encodeURIComponent(topic)}`}
              className="inline-flex rounded-full border border-hairline px-4 py-2 text-[0.85rem] font-semibold text-ink transition-[transform,border-color,color] duration-fast hover:-translate-y-px hover:border-deep-blue hover:text-deep-blue"
            >
              {topic}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/episodes"
            className="inline-flex rounded-full bg-ink-navy px-4 py-2 text-[0.85rem] font-semibold text-marigold transition-transform duration-fast hover:-translate-y-px"
          >
            All episodes →
          </Link>
        </li>
      </ul>
    </section>
  );
}
