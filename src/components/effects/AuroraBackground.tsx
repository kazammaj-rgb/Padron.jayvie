"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="aurora-blob aurora-blob-1"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-blob aurora-blob-2"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 70, -30, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-blob aurora-blob-3"
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -40, 80, 0],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_72%)]" />
    </motion.div>
  );
}
