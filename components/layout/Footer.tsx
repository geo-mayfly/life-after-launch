import Link from "next/link";

const listenLinks = ["Acquired", "ACQ2 Show", "Spotify", "YouTube", "Overcast"];
const podcastLinks = ["About", "Episodes", "Sponsor", "Speaking", "Press", "Merch"];
const communityLinks = ["Slack", "X.com", "YouTube", "LinkedIn", "Contact"];

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h2 className="text-[0.75rem] font-black uppercase tracking-[0.2em] text-white/45">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <Link
              href={link === "Episodes" ? "/episodes" : "#"}
              className="text-[0.98rem] text-white/76 transition hover:text-[#00e1c6]"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#081f1a] text-white">
      <div className="mx-auto max-w-[1520px] px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 border-b border-white/12 pb-14 lg:grid-cols-[1.45fr_0.7fr_0.8fr_0.75fr]">
          <section aria-labelledby="footer-email">
            <p className="text-[0.78rem] font-black uppercase tracking-[0.22em] text-[#00e1c6]">
              Emails from Ben & David
            </p>
            <h2
              id="footer-email"
              className="mt-4 max-w-lg font-display text-[clamp(2.3rem,5vw,5.8rem)] leading-[0.9] tracking-[-0.06em]"
            >
              Never miss an episode
            </h2>
            <p className="mt-5 max-w-md text-lg leading-7 text-white/70">
              Get our takeaways, research photos, hints at the next episode, and
              your vote on future topics.
            </p>
            <form className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="footer-email-input">
                Email address
              </label>
              <input
                id="footer-email-input"
                type="email"
                placeholder="email address"
                className="h-14 flex-1 rounded-full border border-white/15 bg-white px-5 text-black outline-none placeholder:text-black/45 focus:border-[#00e1c6]"
              />
              <button
                type="button"
                className="h-14 rounded-full bg-[#00e1c6] px-7 text-[0.78rem] font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
              >
                Subscribe
              </button>
            </form>
          </section>

          <FooterColumn title="Listen" links={listenLinks} />
          <FooterColumn title="The Podcast" links={podcastLinks} />
          <FooterColumn title="Community" links={communityLinks} />
        </div>

        <div className="flex flex-col gap-5 pt-8 text-sm text-white/55 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className="font-sans text-3xl font-black uppercase tracking-[-0.06em] text-white"
            >
              ACQUIRED
            </Link>
            <p className="mt-2 uppercase tracking-[0.2em]">Every Company Has A Story</p>
          </div>
          <p>© 2026 ACQ, LLC. Replica branch for visual implementation.</p>
        </div>
      </div>
    </footer>
  );
}
