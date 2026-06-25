import type { Episode } from "@/content/schema";
import CloudHead from "@/components/brand/CloudHead";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Guest & links — guest bio (or the cloud-head for anonymous Founders) plus any
 * links/sources mentioned in the episode.
 */
export default function GuestLinks({ episode }: { episode: Episode }) {
  const guestName = episode.anonymous
    ? "An anonymous Founder"
    : episode.guestName;
  const role = [episode.guestRole, episode.guestCompany].filter(Boolean).join(", ");

  return (
    <Reveal>
      <h2 className="font-display text-h2 text-ink">Guest &amp; links</h2>

      <div className="mt-6 flex items-start gap-4">
        {episode.anonymous && <CloudHead size={56} color="var(--deep-blue)" />}
        <div>
          {guestName && <p className="font-semibold text-ink">{guestName}</p>}
          {role && <p className="text-small text-ink-3">{role}</p>}
          {episode.guestBio && <p className="mt-2 max-w-prose text-ink-2">{episode.guestBio}</p>}
        </div>
      </div>

      {episode.links && episode.links.length > 0 && (
        <div className="mt-7">
          <h3 className="eyebrow text-deep-blue">Links &amp; sources</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {episode.links.map((l, i) => (
              <li key={i}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spark-link font-medium text-deep-blue"
                >
                  {l.label} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Reveal>
  );
}
