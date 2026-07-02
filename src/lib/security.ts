/**
 * Server-side security helpers for the portfolio API and forms.
 */

const RATE_BUCKETS = new Map<string, { count: number; resetAt: number }>();

/** Sliding-window rate limit (per key, e.g. IP). */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const bucket = RATE_BUCKETS.get(key);

  if (!bucket || now > bucket.resetAt) {
    RATE_BUCKETS.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { allowed: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Prevent email header injection in names / subjects. */
export function stripHeaderInjection(value: string, maxLen: number): string {
  return value
    .replace(/[\r\n\0]/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function sanitizeText(value: string, maxLen: number): string {
  return value
    .replace(/\0/g, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .slice(0, maxLen);
}

const SUSPICIOUS =
  /<script\b|javascript:|on\w+\s*=|data:text\/html|&#x?0*58;|eval\s*\(|expression\s*\(/i;

export function hasSuspiciousContent(...values: string[]): boolean {
  return values.some((v) => SUSPICIOUS.test(v));
}

/** Honeypot must stay empty (bots fill hidden fields). */
export function isHoneypotTriggered(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/** Limit spam floods with many links. */
export function hasExcessiveLinks(text: string, maxLinks = 5): boolean {
  const matches = text.match(/https?:\/\/|www\./gi);
  return (matches?.length ?? 0) > maxLinks;
}

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && EMAIL_RE.test(email);
}

/**
 * Only accept contact POSTs from your site (production domain or localhost).
 * Set ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
 */
export function isAllowedOrigin(request: Request): boolean {
  const configured = process.env.ALLOWED_ORIGINS?.split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (configured && configured.length > 0) {
    if (origin && configured.includes(origin)) return true;
    if (referer) {
      try {
        const refOrigin = new URL(referer).origin;
        if (configured.includes(refOrigin)) return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const host = request.headers.get("host");
  if (!host) return false;

  const expected = `https://${host}`;
  if (origin === expected || origin === `http://${host}`) return true;

  if (referer) {
    try {
      const ref = new URL(referer);
      return ref.host === host;
    } catch {
      return false;
    }
  }

  return !origin;
}

export const SECURITY_HEADERS: Record<string, string> = {
  "X-DNS-Prefetch-Control": "on",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "X-Permitted-Cross-Domain-Policies": "none",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-site",
};

export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://basemaps.cartocdn.com https://*.cartocdn.com https://tiles.basemaps.cartocdn.com",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");
