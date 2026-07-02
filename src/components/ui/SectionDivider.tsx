"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  flip?: boolean;
}

export function SectionDivider({ flip }: SectionDividerProps) {
  return (
    <div className="relative h-24 w-full overflow-hidden md:h-32" aria-hidden>
      <motion.svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`absolute w-full ${flip ? "bottom-0 rotate-180" : "top-0"}`}
        style={{ height: "100%" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <defs>
          <linearGradient id="divider-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,245,255,0.15)" />
            <stop offset="50%" stopColor="rgba(168,85,247,0.25)" />
            <stop offset="100%" stopColor="rgba(236,72,153,0.15)" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#divider-grad)"
          animate={{
            d: [
              "M0,64 C240,100 480,20 720,64 C960,108 1200,28 1440,64 L1440,120 L0,120 Z",
              "M0,48 C240,80 480,40 720,56 C960,72 1200,32 1440,48 L1440,120 L0,120 Z",
              "M0,64 C240,100 480,20 720,64 C960,108 1200,28 1440,64 L1440,120 L0,120 Z",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}
