// Simple in-memory rate limiter (for production, use Redis or Upstash)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

export function checkRateLimit(identifier: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // Clean up expired entries
  if (record && now > record.resetAt) {
    rateLimitStore.delete(identifier);
  }

  const current = rateLimitStore.get(identifier);

  if (!current) {
    rateLimitStore.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true, remaining: MAX_REQUESTS - 1 };
  }

  if (current.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0 };
  }

  current.count++;
  return { success: true, remaining: MAX_REQUESTS - current.count };
}

export function getRateLimitIdentifier(req: Request): string {
  // Use IP address or fallback to a generic identifier
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}
