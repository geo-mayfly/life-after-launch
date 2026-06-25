import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acquired Podcast | Every Company Has a Story",
  description:
    "Deep dives into how the world's greatest companies were built and why they worked.",
};

const tiles = [
  {
    name: "Hermes",
    mark: "H",
    label: "Hermes",
    style: { background: "#803f00", color: "#f7efe0", accent: "#f5a759" },
  },
  {
    name: "Costco",
    mark: "COSTCO",
    label: "Costco",
    style: { background: "#0a1628", color: "#e5e8ed", accent: "#4d6b8f" },
  },
  {
    name: "Jensen Huang",
    mark: "JH",
    label: "Jensen Huang",
    style: { background: "#173000", color: "#e1eed8", accent: "#7db852" },
  },
  {
    name: "Starbucks",
    mark: "STAR",
    label: "Starbucks",
    style: { background: "#173000", color: "#e1eed8", accent: "#7db852" },
  },
  {
    name: "Vanguard",
    mark: "V",
    label: "Vanguard",
    style: { background: "#550606", color: "#f2e6e0", accent: "#e07878" },
  },
  {
    name: "Disney I",
    mark: "D",
    label: "Disney I",
    style: { background: "#1a1a1a", color: "#eeeeee", accent: "#7a7a7a" },
  },
  {
    name: "Rolex",
    mark: "ROLEX",
    label: "Rolex",
    style: { background: "#063514", color: "#e1eed8", accent: "#7db852" },
  },
  {
    name: "Ferrari",
    mark: "F",
    label: "Ferrari",
    style: { background: "#550606", color: "#f2e6e0", accent: "#e07878" },
  },
  {
    name: "Mark Zuckerberg",
    mark: "MZ",
    label: "Mark Zuckerberg",
    style: { background: "#0c3b3a", color: "#d7f3f1", accent: "#63bfbc" },
  },
  {
    name: "Google Search",
    mark: "G",
    label: "Google Search",
    style: { background: "#1a1a1a", color: "#eeeeee", accent: "#7a7a7a" },
  },
  {
    name: "NFL",
    mark: "NFL",
    label: "NFL",
    style: { background: "#0a1628", color: "#e5e8ed", accent: "#4d6b8f" },
  },
  {
    name: "Visa",
    mark: "VISA",
    label: "Visa",
    style: { background: "#16273c", color: "#e0e9f2", accent: "#4f7fe2" },
  },
] as const;

const smallEpisodes = [
  {
    season: "Spring 2026",
    title: "Vanguard",
    subtitle: "The Communist Capitalist Who Saved Investors a Trillion Dollars",
    mark: "V",
    color: "#550606",
  },
  {
    season: "Spring 2026",
    title: "Ferrari",
    subtitle: "The Prancing Horse and the Business of Desire",
    mark: "F",
    color: "#550606",
  },
  {
    season: "Spring 2026",
    title: "Formula 1",
    subtitle: "From Bankrupt Teams to A Global Sports Empire",
    mark: "F1",
    color: "#121212",
  },
] as const;

const testimonials = [
  {
    quote:
      "I recommend you guys to friends and to colleagues all the time. You have nailed an important set of stories for serious audiences.",
    name: "Chris Cox",
    role: "Chief Product Officer, Meta",
  },
  {
    quote:
      "Even if it is a topic I do not know I am interested in, I will give it a shot because it is you guys. I trust you.",
    name: "Daniel Ek",
    role: "CEO and Co-Founder, Spotify",
  },
  {
    quote: "It is hard to stop once you start listening.",
    name: "Eddy Cue",
    role: "SVP Services, Apple",
  },
  {
    quote: "Keep up the A+ work. It is a podcast I recommend to all my teammates and friends.",
    name: "Tony Xu",
    role: "Co-founder & CEO, DoorDash",
  },
] as const;

function EpisodeTile({ tile }: { tile: (typeof tiles)[number] }) {
  const palette = tile.style as CSSProperties & { accent: string };

  return (
    <Link
      href="#featured"
      className="group relative isolate flex min-h-[260px] overflow-hidden rounded-[1.35rem] p-5 text-left shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1"
      style={{
        background: palette.background,
        color: palette.color,
      }}
    >
      <span
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 30% 10%, currentColor 0 1px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
        aria-hidden
      />
      <span className="absolute right-4 top-4 z-10 text-[0.62rem] font-black uppercase tracking-[0.18em] opacity-75">
        {tile.label}
      </span>
      <span
        className="absolute inset-x-5 bottom-5 z-10 translate-y-5 rounded-full px-4 py-3 text-center text-[0.68rem] font-black uppercase tracking-[0.18em] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
        style={{ background: palette.accent, color: "#050505" }}
      >
        Explore Acquired
      </span>
      <span className="m-auto max-w-[85%] text-center font-sans text-[clamp(2.5rem,5vw,5.4rem)] font-black uppercase leading-[0.86] tracking-[-0.08em]">
        {tile.mark}
      </span>
    </Link>
  );
}

function StudioScene() {
  return (
    <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] bg-[#201814] shadow-[0_32px_100px_rgba(0,0,0,0.35)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_28%,rgba(255,238,202,0.5),transparent_22%),linear-gradient(135deg,#5b3a25,#17110f_70%)]" />
      <div className="absolute bottom-0 left-[7%] h-[72%] w-[36%] rounded-t-full bg-[#b18462] shadow-2xl">
        <div className="absolute left-1/2 top-[10%] h-28 w-28 -translate-x-1/2 rounded-full bg-[#efc4a3]" />
        <div className="absolute bottom-0 left-1/2 h-[62%] w-[78%] -translate-x-1/2 rounded-t-[5rem] bg-[#22304a]" />
      </div>
      <div className="absolute bottom-0 right-[8%] h-[75%] w-[36%] rounded-t-full bg-[#9e6e4b] shadow-2xl">
        <div className="absolute left-1/2 top-[9%] h-28 w-28 -translate-x-1/2 rounded-full bg-[#e8b68f]" />
        <div className="absolute bottom-0 left-1/2 h-[64%] w-[78%] -translate-x-1/2 rounded-t-[5rem] bg-[#2d1f19]" />
      </div>
      <div className="absolute bottom-10 left-1/2 h-32 w-[58%] -translate-x-1/2 rounded-t-[999px] bg-[#70472d]" />
      <div className="absolute left-8 top-8 rounded-full border border-white/25 px-4 py-2 text-[0.62rem] font-black uppercase tracking-[0.2em] text-white/80">
        Presented by J.P. Morgan
      </div>
      <p className="absolute bottom-6 right-8 text-[0.58rem] font-black uppercase tracking-[0.18em] text-white/45">
        Photograph: Cayce Clifford, New York Times
      </p>
    </div>
  );
}

function PlayButton() {
  return (
    <button
      type="button"
      aria-label="Play episode"
      className="grid h-16 w-16 place-items-center rounded-full bg-[#00e1c6] text-black shadow-lg transition hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" aria-hidden>
        <path d="M8 5v14l11-7z" fill="currentColor" />
      </svg>
    </button>
  );
}

export default function HomePage() {
  return (
    <div className="bg-white pt-[74px] text-black">
      <section className="relative bg-[#f7f7f2] px-4 pb-16 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1520px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {tiles.map((tile) => (
            <EpisodeTile key={tile.name} tile={tile} />
          ))}
        </div>

        <aside className="mx-auto mt-6 max-w-[1520px] lg:pointer-events-none lg:absolute lg:bottom-8 lg:right-10 lg:mt-0 lg:w-[360px]">
          <div className="pointer-events-auto rounded-[1.75rem] border border-black/10 bg-white p-5 shadow-[0_22px_80px_rgba(0,0,0,0.22)]">
            <p className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-black/45">
              Emails from Ben & David
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]">
              Our key takeaways, research photos, and your vote on future topics.
            </h2>
            <form className="mt-5 flex gap-2">
              <label className="sr-only" htmlFor="hero-email">
                Email
              </label>
              <input
                id="hero-email"
                type="email"
                placeholder="email address"
                className="h-11 min-w-0 flex-1 rounded-full border border-black/15 px-4 text-sm outline-none focus:border-black/40"
              />
              <button
                type="button"
                className="h-11 rounded-full bg-black px-4 text-[0.68rem] font-black uppercase tracking-[0.14em] text-white"
              >
                Join
              </button>
            </form>
          </div>
        </aside>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[1fr_0.86fr]">
          <StudioScene />
          <div>
            <p className="text-[0.72rem] font-black uppercase tracking-[0.22em] text-black/45">
              Back
            </p>
            <h1 className="mt-8 max-w-[12ch] font-display text-[clamp(5rem,12vw,12rem)] leading-[0.78] tracking-[-0.08em]">
              Every Company Has A Story
            </h1>
            <p className="mt-8 max-w-xl text-[clamp(1.25rem,2vw,2rem)] leading-[1.12] text-black/72">
              Acquired tells the definitive history and strategy of the world's
              greatest companies.
            </p>
            <Link
              href="#featured"
              className="mt-8 inline-flex rounded-full bg-black px-7 py-4 text-[0.74rem] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#00e1c6] hover:text-black"
            >
              About Acquired
            </Link>
          </div>
        </div>
      </section>

      <section id="featured" className="bg-[#f4f0e9] px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr]">
            <div id="listen" className="rounded-[2rem] bg-[#1a1a1a] p-6 text-white shadow-2xl">
              <div className="flex aspect-square flex-col justify-between rounded-[1.35rem] bg-[radial-gradient(circle_at_50%_30%,#f8f8f8,#4f4f4f_42%,#111_74%)] p-6">
                <div className="flex justify-between text-[0.66rem] font-black uppercase tracking-[0.18em] text-white/70">
                  <span>New Release</span>
                  <span>Spring 2026</span>
                </div>
                <div className="text-center font-display text-[clamp(4rem,10vw,8rem)] leading-none tracking-[-0.08em]">
                  D
                </div>
                <div className="rounded-full bg-white/92 p-3 text-black">
                  <div className="flex items-center gap-4">
                    <PlayButton />
                    <div className="h-1 flex-1 rounded-full bg-black/15">
                      <div className="h-full w-[36%] rounded-full bg-black" />
                    </div>
                    <span className="text-sm font-bold">0:00</span>
                    <span className="text-sm font-bold">1x</span>
                  </div>
                </div>
              </div>
            </div>

            <article className="self-center">
              <p className="text-[0.76rem] font-black uppercase tracking-[0.2em] text-black/45">
                New Release - Jun 21, 2026
              </p>
              <h2 className="mt-4 max-w-4xl font-display text-[clamp(4rem,10vw,10rem)] leading-[0.78] tracking-[-0.08em]">
                The Walt Disney Company
              </h2>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-black/72">
                The Walt Disney Company is the most successful enterprise ever
                created for monetizing human nostalgia. During Walt's era, Disney
                operated like an unhinged moonshot factory, betting the company
                on animation, theme parks, and a modern flywheel business model.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/episodes"
                  className="rounded-full bg-black px-7 py-4 text-[0.74rem] font-black uppercase tracking-[0.18em] text-white"
                >
                  Episode Page
                </Link>
                {["Spotify", "YouTube", "Overcast"].map((provider) => (
                  <Link
                    key={provider}
                    href="#listen"
                    className="rounded-full border border-black/15 px-6 py-4 text-[0.74rem] font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
                  >
                    {provider}
                  </Link>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {smallEpisodes.map((episode) => (
              <Link key={episode.title} href="/episodes" className="group">
                <div
                  className="grid aspect-[4/5] place-items-center rounded-[1.5rem] text-white shadow-xl transition group-hover:-translate-y-1"
                  style={{ background: episode.color }}
                >
                  <span className="font-sans text-[clamp(4rem,9vw,8rem)] font-black uppercase tracking-[-0.08em]">
                    {episode.mark}
                  </span>
                </div>
                <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-black/45">
                  {episode.season}
                </p>
                <h3 className="mt-2 text-3xl font-black tracking-[-0.05em]">{episode.title}</h3>
                <p className="mt-1 text-black/62">{episode.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-[1380px]">
          <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.76rem] font-black uppercase tracking-[0.2em] text-black/45">
                From Our Listeners
              </p>
              <h2 className="mt-3 max-w-4xl font-display text-[clamp(4rem,10vw,10rem)] leading-[0.78] tracking-[-0.08em]">
                Acquired reaches over one million listeners every episode.
              </h2>
            </div>
            <Link
              href="/episodes"
              className="w-fit rounded-full bg-[#00e1c6] px-7 py-4 text-[0.74rem] font-black uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white"
            >
              All Episodes
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {testimonials.map((item) => (
              <figure
                key={item.name}
                className="rounded-[1.5rem] border border-black/10 bg-[#f7f7f2] p-7"
              >
                <blockquote className="text-xl leading-8 tracking-[-0.02em]">
                  "{item.quote}"
                </blockquote>
                <figcaption className="mt-8">
                  <div className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-black text-sm font-black uppercase text-white">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <p className="font-black">{item.name}</p>
                  <p className="text-sm text-black/55">{item.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0c3028] px-5 py-20 text-white sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[0.95fr_1fr]">
          <div>
            <p className="text-[0.76rem] font-black uppercase tracking-[0.2em] text-[#00e1c6]">
              Community
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(4rem,10vw,10rem)] leading-[0.78] tracking-[-0.08em]">
              The conversation keeps going.
            </h2>
            <p className="mt-7 max-w-xl text-xl leading-8 text-white/70">
              Join thousands of curious builders, investors, and operators in the
              Slack community around the world's greatest company stories.
            </p>
            <Link
              href="#"
              className="mt-8 inline-flex rounded-full bg-[#00e1c6] px-7 py-4 text-[0.74rem] font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
            >
              Join Slack
            </Link>
          </div>
          <StudioScene />
        </div>
      </section>
    </div>
  );
}
