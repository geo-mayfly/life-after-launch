import BlueWall from "@/components/brand/BlueWall";
import Skeleton from "@/components/ui/Skeleton";

/** Branded episode-detail loading state (brief §4.6). */
export default function EpisodeLoading() {
  return (
    <>
      <BlueWall tone="navy" as="header" className="pb-sp-9 pt-[120px]" vignette={0.5}>
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <div className="grid items-center gap-10 md:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="h-3 w-44 rounded-full bg-[rgba(255,255,255,0.18)]" />
              <div className="mt-6 h-12 w-3/4 rounded-md bg-[rgba(255,255,255,0.14)]" />
              <div className="mt-5 h-4 w-1/2 rounded-full bg-[rgba(255,255,255,0.12)]" />
              <div className="mt-8 flex gap-3">
                <div className="h-11 w-28 rounded-full bg-[rgba(255,255,255,0.12)]" />
                <div className="h-11 w-32 rounded-full bg-[rgba(255,255,255,0.12)]" />
              </div>
            </div>
            <div className="mx-auto w-full max-w-[360px] md:max-w-none">
              <Skeleton aspect="4 / 5" radius="var(--r-lg)" />
            </div>
          </div>
        </div>
      </BlueWall>

      <section className="bg-bone py-sp-9">
        <div className="mx-auto max-w-content space-y-4 px-5 sm:px-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-4 rounded-full bg-bone-deep"
              style={{ width: `${92 - i * 9}%` }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
