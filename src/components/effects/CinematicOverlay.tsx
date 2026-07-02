"use client";

import { motion } from "framer-motion";

/** Subtle vignette + top shine — additive polish without changing layout. */
export function CinematicOverlay() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[3]"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,245,255,0.06), transparent 55%), radial-gradient(ellipse 100% 80% at 50% 100%, rgba(168,85,247,0.04), transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.5]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(3,7,18,0.55) 100%)",
        }}
      />
    </motion.div>
  );
}
