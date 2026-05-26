/**
 * In-memory sliding window rate limiter.
 *
 * How it works:
 *   Each unique key (typically an IP address) gets a list of timestamps
 *   representing past requests. On every call we:
 *     1. Drop timestamps older than `windowMs`
 *     2. Count what remains
 *     3. Reject if count >= `limit`, otherwise record this timestamp and allow
 *
 * Trade-offs:
 *   ✓ Zero dependencies, zero infrastructure
 *   ✓ Accurate sliding window (not fixed bucket)
 *   ✗ Resets on server restart / cold start
 *   ✗ Not shared across multiple serverless instances
 *
 * For production at scale, swap the Map for a Redis ZSET — the interface
 * stays identical, only the storage backend changes.
 */

interface RateLimitOptions {
  /** Max requests allowed within the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number; // Unix ms timestamp when the oldest entry expires
}

// Module-level store — persists across requests within the same process
const store = new Map<string, number[]>();

// Prevent unbounded memory growth: evict keys idle for > 1 hour
const EVICT_AFTER_MS = 60 * 60 * 1000;
let lastEviction = Date.now();

function evictStale() {
  const now = Date.now();
  if (now - lastEviction < EVICT_AFTER_MS) return;
  for (const [key, timestamps] of store) {
    if (timestamps.length === 0 || now - timestamps[timestamps.length - 1] > EVICT_AFTER_MS) {
      store.delete(key);
    }
  }
  lastEviction = now;
}

export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  evictStale();

  const now = Date.now();
  const windowStart = now - options.windowMs;

  // Get existing timestamps, drop anything outside the window
  const timestamps = (store.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= options.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: timestamps[0] + options.windowMs, // oldest entry + window = when a slot opens
    };
  }

  timestamps.push(now);
  store.set(key, timestamps);

  return {
    allowed: true,
    remaining: options.limit - timestamps.length,
    resetAt: timestamps[0] + options.windowMs,
  };
}

/**
 * Extract the real client IP from a Next.js request.
 * Checks Vercel / Cloudflare / standard proxy headers before falling back.
 */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}
