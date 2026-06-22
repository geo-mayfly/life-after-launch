import Link from "next/link";
import BlueWall from "@/components/brand/BlueWall";
import CloudHead from "@/components/brand/CloudHead";
import { Button } from "@/components/ui/Button";

/** Branded 404 (brief §4.6, §5.1) — the drifting cloud-head, in the show's voice. */
export default function NotFound() {
  return (
    <BlueWall
      tone="navy"
      as="section"
      className="flex min-h-[80vh] items-center justify-center px-5 pt-[72px] text-center"
      vignette={0.55}
    >
      <div className="flex flex-col items-center">
        <CloudHead size={170} color="var(--on-blue-soft)" drift />
        <p className="mt-8 eyebrow text-on-blue-faint">404</p>
        <h1 className="mt-3 max-w-xl font-display text-h1 leading-tight text-on-blue">
          Nothing here yet. The fog hasn&rsquo;t cleared on this one.
        </h1>
        <p className="mt-5 text-on-blue-soft">
          The page you&rsquo;re after has drifted off. Let&rsquo;s get you back.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <Button href="/" variant="primary" size="lg">
            Back home
          </Button>
          <Link href="/episodes" className="spark-link text-on-blue-soft hover:text-on-blue">
            Browse episodes →
          </Link>
        </div>
      </div>
    </BlueWall>
  );
}
