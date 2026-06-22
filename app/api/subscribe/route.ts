import { NextResponse } from "next/server";

/**
 * Email signup route (brief §10.5 contract):
 *   POST /api/subscribe  body { email: string; name?: string }
 *   200 {ok:true} · 400 {ok:false,error:"invalid_email"} · 429 · 502 {ok:false,error:"provider"}
 *
 * Validates server-side, honeypot + per-IP rate-limit, provider double-opt-in.
 * The client maps each state to the §8.2 strings and never sees raw provider errors.
 *
 * TODO(owner §12.4): wire to the real provider (ConvertKit/Beehiiv/Mailchimp)
 * via env (e.g. PROVIDER_API_KEY). Until configured, this accepts and logs.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Simple in-memory per-IP limiter (swap for a durable store in production).
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: { email?: unknown; name?: unknown; company?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields.
  if (typeof body.company === "string" && body.company.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  try {
    // TODO(owner): call the email provider with double-opt-in here.
    // const res = await fetch(PROVIDER_URL, { ... });
    // if (!res.ok) throw new Error("provider");
    if (process.env.NODE_ENV !== "production") {
      console.log(`[subscribe] would subscribe: ${email}`);
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "provider" }, { status: 502 });
  }
}
