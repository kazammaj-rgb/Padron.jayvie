/** Inspect ZIP metadata only. The APK is never executed, extracted, or modified. */
export function isApkArchive(bytes: Buffer): boolean {
  if (bytes.length < 22 || bytes.readUInt32LE(0) !== 0x04034b50) return false;

  // ZIP's end record can be followed by a comment of at most 65,535 bytes.
  let end = bytes.length - 22;
  const minimum = Math.max(0, end - 65535);
  for (; end >= minimum; end--) {
    if (bytes.readUInt32LE(end) === 0x06054b50 &&
        end + 22 + bytes.readUInt16LE(end + 20) === bytes.length) break;
  }
  if (end < minimum) return false;

  const entries = bytes.readUInt16LE(end + 10);
  const directorySize = bytes.readUInt32LE(end + 12);
  const directoryOffset = bytes.readUInt32LE(end + 16);
  if (!entries || entries === 0xffff ||
      bytes.readUInt16LE(end + 4) !== 0 || bytes.readUInt16LE(end + 6) !== 0 ||
      bytes.readUInt16LE(end + 8) !== entries ||
      directoryOffset + directorySize !== end) return false;

  let offset = directoryOffset;
  let hasManifest = false;
  for (let index = 0; index < entries; index++) {
    if (offset + 46 > end || bytes.readUInt32LE(offset) !== 0x02014b50) return false;
    const nameLength = bytes.readUInt16LE(offset + 28);
    const extraLength = bytes.readUInt16LE(offset + 30);
    const commentLength = bytes.readUInt16LE(offset + 32);
    const next = offset + 46 + nameLength + extraLength + commentLength;
    if (next > end) return false;
    const name = bytes.toString("utf8", offset + 46, offset + 46 + nameLength);
    const localOffset = bytes.readUInt32LE(offset + 42);
    if (localOffset + 30 > directoryOffset || bytes.readUInt32LE(localOffset) !== 0x04034b50) return false;
    const localNameLength = bytes.readUInt16LE(localOffset + 26);
    const dataOffset = localOffset + 30 + localNameLength + bytes.readUInt16LE(localOffset + 28);
    if (dataOffset + bytes.readUInt32LE(offset + 20) > directoryOffset ||
        name !== bytes.toString("utf8", localOffset + 30, localOffset + 30 + localNameLength)) return false;
    if (name === "AndroidManifest.xml" && bytes.readUInt32LE(offset + 20) > 0 && bytes.readUInt32LE(offset + 24) > 0) hasManifest = true;
    offset = next;
  }
  return offset === end && hasManifest;
}

// Only these exact, supplied commit-pinned files can be downloaded.
const APK_DOWNLOADS = {
  pjrccar: {
    source: "https://raw.githubusercontent.com/kazammaj-rgb/Pj_RC-car.-mobileapk/fc15e7f9e0f3e4f52f03420b4ef901042ac9a7d1/app-debug.apk",
    filename: "pjRcCar.apk",
  },
  "portfolio-cv": {
    source: "https://raw.githubusercontent.com/kazammaj-rgb/padron.jayvie_CV-mobile-APK/aa0e4c41db2074054d3967849b0c9481fffbd852/PadronJayvie-CV.apk",
    filename: "PadronJayvie-CV.apk",
  },
} as const;

type ApkDownloadId = keyof typeof APK_DOWNLOADS;
const MAX_APK_BYTES = 100 * 1024 * 1024;

/** Called only by the explicit download request, never during rendering or build. */
export async function fetchProjectApk(id: ApkDownloadId, signal?: AbortSignal): Promise<Buffer> {
  const response = await fetch(APK_DOWNLOADS[id].source, {
    cache: "no-store",
    signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(30000)]) : AbortSignal.timeout(30000),
  });
  if (!response.ok || !response.body) {
    await response.body?.cancel();
    throw new Error("APK unavailable");
  }
  const declaredSize = Number(response.headers.get("content-length"));
  if (declaredSize > MAX_APK_BYTES) {
    await response.body.cancel();
    throw new Error("APK exceeds download limit");
  }

  const reader = response.body.getReader();
  const chunks: Buffer[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunkOffset = size;
      size += value.byteLength;
      if (size > MAX_APK_BYTES) throw new Error("APK exceeds download limit");
      const chunk = Buffer.from(value);
      // Reject HTML, LFS pointers, and other non-ZIP responses before buffering them.
      for (let i = 0; i < chunk.length && chunkOffset + i < 4; i++) {
        if (chunk[i] !== [0x50, 0x4b, 0x03, 0x04][chunkOffset + i]) throw new Error("Invalid APK response");
      }
      chunks.push(chunk);
    }
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error;
  } finally {
    reader.releaseLock();
  }
  const bytes = Buffer.concat(chunks, size);
  if (!isApkArchive(bytes)) throw new Error("Invalid APK archive");
  return bytes;
}

/** Both download links use identical validation, streaming, and error behavior. */
export async function createApkDownload(id: ApkDownloadId, signal?: AbortSignal): Promise<Response> {
  try {
    const bytes = await fetchProjectApk(id, signal);
    let offset = 0;
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (offset >= bytes.length) { controller.close(); return; }
        const next = Math.min(offset + 64 * 1024, bytes.length);
        controller.enqueue(bytes.subarray(offset, next));
        offset = next;
      },
    });
    return new Response(body, {
      headers: {
        "Content-Type": "application/vnd.android.package-archive",
        "Content-Disposition": `attachment; filename="${APK_DOWNLOADS[id].filename}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("The APK is unavailable right now. Please try again later or view the file on GitHub.", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
}
