import Link from "next/link";

/**
 * Acquired-style shell: persistent white nav, prominent episode search, and
 * simple pill actions.
 */
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-[74px] max-w-[1520px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Acquired home"
          className="font-sans text-[1.35rem] font-black uppercase leading-none tracking-[-0.06em] text-black sm:text-[1.65rem]"
        >
          ACQUIRED
        </Link>

        <label className="relative mx-auto hidden w-full max-w-[560px] md:block">
          <span className="sr-only">Search episodes</span>
          <svg
            aria-hidden
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="m14 14 4 4M8.5 16a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            placeholder="Search Episodes"
            className="h-11 w-full rounded-full border border-black/15 bg-black/[0.035] pl-11 pr-4 text-[0.95rem] text-black outline-none placeholder:text-black/45 focus:border-black/35"
          />
        </label>

        <nav className="flex items-center justify-end gap-2" aria-label="Primary">
          <Link
            href="/episodes"
            className="hidden rounded-full border border-black/15 px-5 py-2.5 text-[0.76rem] font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white sm:inline-flex"
          >
            Menu
          </Link>
          <Link
            href="#listen"
            className="rounded-full bg-black px-5 py-2.5 text-[0.76rem] font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#00e1c6] hover:text-black"
          >
            Listen
          </Link>
        </nav>
      </div>
    </header>
  );
}
