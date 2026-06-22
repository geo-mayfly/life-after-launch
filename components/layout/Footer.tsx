import Link from "next/link";
import { site } from "@/content/site";
import BlueWall from "@/components/brand/BlueWall";
import Wordmark from "@/components/brand/Wordmark";

/**
 * Footer (brief §5.2, §8.2) — ink-navy wall: wordmark, nav repeat, Listen,
 * Community, the three-word brand line, legal. Present on every page.
 */

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow text-on-blue-faint">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FootLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls = "spark-link text-on-blue-soft hover:text-on-blue";
  if (external) {
    return (
      <li>
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link href={href} className={cls}>
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer>
      <BlueWall tone="navy" as="div" className="mt-sp-9 pt-sp-9" vignette={0.4}>
        <div className="mx-auto max-w-wall px-5 pb-10 sm:px-8">
          <div className="grid gap-10 border-b border-[rgba(255,255,255,0.10)] pb-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <div>
              <Wordmark size="lg" href="/" />
              <p className="mt-5 max-w-xs font-display text-h3 italic text-on-blue">
                {site.tagline}
              </p>
            </div>

            <Col title="Listen">
              <FootLink href={site.listen.spotify} external>
                Spotify
              </FootLink>
              <FootLink href={site.listen.apple} external>
                Apple Podcasts
              </FootLink>
              <FootLink href={site.listen.youtube} external>
                YouTube
              </FootLink>
            </Col>

            <Col title="The show">
              <FootLink href="/episodes">Episodes</FootLink>
              <FootLink href="/about">About</FootLink>
              <FootLink href="/community">Community</FootLink>
            </Col>

            <Col title="Community">
              <FootLink href={site.slackInvite} external>
                Join the Slack
              </FootLink>
              <FootLink href="/community">Email list</FootLink>
              <FootLink href={site.social.x} external>
                X
              </FootLink>
              <FootLink href={site.social.linkedin} external>
                LinkedIn
              </FootLink>
              <FootLink href={`mailto:${site.email}`}>{site.email}</FootLink>
            </Col>
          </div>

          <div className="flex flex-col gap-3 pt-7 text-small text-on-blue-faint sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {site.launchedYear} {site.name} · An {site.club} podcast
            </p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="spark-link hover:text-on-blue-soft">
                Privacy
              </Link>
              <Link href="/terms" className="spark-link hover:text-on-blue-soft">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </BlueWall>
    </footer>
  );
}
