"use client";

export function LightBeams() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
      <div className="light-beam light-beam-1" />
      <div className="light-beam light-beam-2" />
      <div className="light-beam light-beam-3" />
    </div>
  );
}
