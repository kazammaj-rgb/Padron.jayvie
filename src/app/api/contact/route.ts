import { isEmailConfigured, sendContactEmail } from "@/lib/email";
import {
  checkRateLimit,
  getClientIp,
  hasExcessiveLinks,
  hasSuspiciousContent,
  isAllowedOrigin,
  isHoneypotTriggered,
  isValidEmail,
  sanitizeText,
  stripHeaderInjection,
} from "@/lib/security";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  try {
    if (request.method !== "POST") {
      return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid request." }, { status: 415 });
    }

    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    const ip = getClientIp(request);
    const rate = checkRateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          error: `Too many messages. Try again in ${rate.retryAfterSec} seconds.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rate.retryAfterSec ?? 60),
          },
        }
      );
    }

    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          error:
            "Email is not configured yet. Add GMAIL_USER and GMAIL_APP_PASSWORD to .env.local (see .env.example).",
        },
        { status: 503 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const raw = body as Record<string, unknown>;

    if (isHoneypotTriggered(raw._gotcha)) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    const name = stripHeaderInjection(
      sanitizeText(String(raw.name ?? ""), 120),
      120
    );
    const email = stripHeaderInjection(
      sanitizeText(String(raw.email ?? ""), 254),
      254
    ).toLowerCase();
    const message = sanitizeText(String(raw.message ?? ""), 5000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (
      hasSuspiciousContent(name, email, message) ||
      hasExcessiveLinks(message)
    ) {
      return NextResponse.json(
        { error: "Message blocked for security reasons." },
        { status: 400 }
      );
    }

    await sendContactEmail({ name, email, message });

    return NextResponse.json({
      success: true,
      message: "Message sent. Jayvie will be notified in Gmail.",
    });
  } catch (err) {
    console.error("Contact form error:", err);

    if (err instanceof Error && err.message === "EMAIL_NOT_CONFIGURED") {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
