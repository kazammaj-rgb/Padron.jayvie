import {
  CONTENT_SECURITY_POLICY,
  SECURITY_HEADERS,
} from "@/lib/security";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Common scanner / exploit paths — return 404 immediately. */
const BLOCKED_PATH_PREFIXES = [
  "/wp-admin",
  "/wp-login",
  "/wp-content",
  "/wordpress",
  "/.env",
  "/.git",
  "/phpmyadmin",
  "/admin/config",
  "/xmlrpc.php",
  "/shell",
  "/cgi-bin",
];

const BLOCKED_AGENTS =
  /sqlmap|nikto|nmap|masscan|acunetix|nessus|dirbuster|gobuster|havij|zgrab/i;

function applySecurityHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  response.headers.set("Content-Security-Policy", CONTENT_SECURITY_POLICY);
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") ?? "";

  if (BLOCKED_PATH_PREFIXES.some((p) => pathname.toLowerCase().startsWith(p))) {
    return new NextResponse(null, { status: 404 });
  }

  if (BLOCKED_AGENTS.test(userAgent)) {
    return new NextResponse(null, { status: 403 });
  }

  if (request.method === "TRACE" || request.method === "TRACK") {
    return new NextResponse(null, { status: 405 });
  }

  const response = NextResponse.next();
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf|mp3)$).*)",
  ],
};
