"use client";

import { useEffect } from "react";

const LOAD_STEPS = [
  "Booting neural interface...",
  "Loading portfolio environment...",
  "Compositing glass UI layers...",
  "Syncing portfolio modules...",
  "Calibrating motion engine...",
  "Ready.",
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const frame = requestAnimationFrame(onComplete);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] rounded-xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] px-5 py-3" aria-hidden="true">
      <p className="text-xs font-semibold">JAYVIE PADRON</p>
      <p className="font-mono text-[10px] text-[var(--text-muted)]">Premium Portfolio</p>
      <span className="sr-only">{LOAD_STEPS.join(" ")} Initializing 100%</span>
    </div>
  );
}
