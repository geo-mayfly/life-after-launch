import type { Metadata } from "next";
import { site } from "@/content/site";
import Eyebrow from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Life After Launch handles your data.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="bg-bone py-sp-9 pt-[140px]" data-surface="light">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Eyebrow>LEGAL</Eyebrow>
        <h1 className="mt-4 font-display text-h1 text-ink">Privacy</h1>
        <div className="prose-bone mt-8">
          <p>
            This is placeholder copy. {site.name} collects only what it needs to
            send you the email list (your email address, and your name if you
            give it). We don&rsquo;t sell your data and we don&rsquo;t run
            cookie-banner-triggering trackers.
          </p>
          <p>
            When the show&rsquo;s real privacy policy is supplied by the brand
            owner, it replaces this page. Questions in the meantime:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </div>
    </article>
  );
}
