import { createApkDownload } from "@/lib/apkDownload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return createApkDownload("portfolio-cv", request.signal);
}

// Metadata checks must not fetch or return the binary.
export function HEAD() {
  return new Response(null, { headers: { "Cache-Control": "no-store" } });
}
