"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Email module (brief §8.2) — used site-wide. In-voice success/error states.
 * Posts to /api/subscribe with a honeypot; never surfaces raw provider errors.
 */

type State = "idle" | "loading" | "success" | "error";

const COPY = {
  eyebrow: "NEVER MISS AN EPISODE",
  heading: "Get the good stuff in your inbox.",
  body: "Key takeaways, behind-the-scenes from the shoot, a hint at who's next, and your vote on future guests.",
  button: "Join the list",
  success: "Welcome aboard. Check your inbox for a note from Megan & Geo.",
  error: "That didn't go through. Give it another crack?",
};

export default function EmailSignup() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const honeypot = String(data.get("company") ?? "");

    // Light client-side guard; the server validates authoritatively.
    if (honeypot || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setState("error");
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <section
      aria-labelledby="email-heading"
      className="mx-auto max-w-content px-5 sm:px-8"
    >
      <Reveal className="rounded-lg bg-paper p-8 shadow-sm sm:p-12" data-surface="light">
        <div className="grid items-end gap-8 md:grid-cols-[1.1fr_1fr]">
          <div>
            <Eyebrow>{COPY.eyebrow}</Eyebrow>
            <h2
              id="email-heading"
              className="mt-3 font-display text-h2 leading-tight text-ink"
            >
              {COPY.heading}
            </h2>
            <p className="mt-3 max-w-prose text-ink-2">{COPY.body}</p>
          </div>

          <div>
            {state === "success" ? (
              <p
                role="status"
                className="rounded-md bg-bone px-5 py-4 text-ink"
                style={{ borderLeft: "3px solid var(--positive)" }}
              >
                {COPY.success}
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
                {/* honeypot — hidden from humans */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                <label className="sr-only" htmlFor="email-name">
                  Your name (optional)
                </label>
                <input
                  id="email-name"
                  name="name"
                  type="text"
                  placeholder="Your name (optional)"
                  autoComplete="name"
                  className="h-12 rounded-xs border border-hairline bg-paper px-4 text-ink outline-none placeholder:text-ink-3 focus-visible:border-deep-blue"
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="sr-only" htmlFor="email-input">
                    Your email
                  </label>
                  <input
                    id="email-input"
                    name="email"
                    type="email"
                    required
                    placeholder="Your email"
                    autoComplete="email"
                    className="h-12 flex-1 rounded-xs border border-hairline bg-paper px-4 text-ink outline-none placeholder:text-ink-3 focus-visible:border-deep-blue"
                  />
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-marigold px-6 font-semibold text-ink-navy transition-[transform,box-shadow,background-color] duration-fast hover:-translate-y-px hover:bg-marigold-bright hover:shadow-gold active:scale-[0.98] disabled:opacity-70"
                  >
                    {state === "loading" ? "Joining…" : COPY.button}
                  </button>
                </div>
                {state === "error" && (
                  <p role="alert" className="text-small" style={{ color: "var(--danger)" }}>
                    {COPY.error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
