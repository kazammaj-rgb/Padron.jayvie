"use client";

/** CSS-only atmosphere: decorative, non-interactive, and independent of page transitions. */
export function CinematicOverlay() {
  return (
    <div className="cinematic-atmosphere pointer-events-none" aria-hidden="true">
      <div className="cinematic-light cinematic-light--one" />
      <div className="cinematic-light cinematic-light--two" />
      <div className="cinematic-grain" />
    </div>
  );
}
