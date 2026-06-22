import type { Metadata } from "next";
import { site } from "@/content/site";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms for using the Life After Launch website.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <article className="bg-bone py-sp-9 pt-[140px]" data-surface="light">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Eyebrow>LEGAL</Eyebrow>
        <h1 className="mt-4 font-display text-h1 text-ink">Terms</h1>
        <div className="prose-bone mt-8">
          <p>
            This is placeholder copy. By using this site you agree to be
            reasonable. The {site.name} name, artwork and episode content belong
            to the {site.club}.
          </p>
          <p>
            When the show&rsquo;s real terms are supplied by the brand owner,
            they replace this page. Questions:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
    </article>
  );
}
