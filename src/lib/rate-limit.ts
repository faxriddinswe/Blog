/**
 * Best-effort in-memory sliding-window limiter.
 *
 * Limitation (documented in docs/DEPLOYMENT.md): on Vercel each serverless
 * instance has its own memory, so the limit is per instance, not global.
 * Good enough with the honeypot (+ optional Turnstile) for a portfolio;
 * a shared store (Upstash / Vercel KV) is the upgrade path — ask before adding.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_KEYS = 5000;

const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()): { ok: boolean } {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { ok: false };
  }
  recent.push(now);
  hits.set(key, recent);

  // Bound memory: drop the oldest keys if a flood of unique IPs arrives.
  if (hits.size > MAX_KEYS) {
    for (const k of hits.keys()) {
      hits.delete(k);
      if (hits.size <= MAX_KEYS) break;
    }
  }
  return { ok: true };
}
