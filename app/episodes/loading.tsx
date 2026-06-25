import BlueWall from "@/components/brand/BlueWall";
import Skeleton from "@/components/ui/Skeleton";

/**
 * Branded loading state (brief §4.6) — blue-field blocks with a soft bone
 * shimmer; poster skeletons hold the exact 4/5 aspect ratio (CLS 0). No
 * grey spinners, ever.
 */
export default function EpisodesLoading() {
  return (
    <BlueWall tone="deep" as="section" className="pb-sp-9 pt-[120px]" vignette={0.5}>
      <div className="mx-auto max-w-wall px-5 sm:px-8">
        <div className="h-3 w-28 rounded-full bg-[rgba(255,255,255,0.18)]" />
        <div className="mt-6 h-12 w-3/4 max-w-2xl rounded-md bg-[rgba(255,255,255,0.14)]" />
        <div className="mt-4 h-4 w-1/2 max-w-md rounded-full bg-[rgba(255,255,255,0.12)]" />

        <div className="mt-12 grid gap-7 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} aspect="4 / 5" />
          ))}
        </div>
      </div>
    </BlueWall>
  );
}
