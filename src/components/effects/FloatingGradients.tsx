"use client";

import { motion } from "framer-motion";

const orbs = [
  { className: "left-[8%] top-[18%] h-72 w-72 bg-cyan-500/20", duration: 14 },
  { className: "right-[10%] top-[35%] h-96 w-96 bg-purple-500/15", duration: 18 },
  { className: "left-[40%] bottom-[15%] h-80 w-80 bg-pink-500/10", duration: 20 },
  { className: "right-[25%] bottom-[30%] h-56 w-56 bg-blue-500/15", duration: 16 },
];

export function FloatingGradients() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[100px] ${orb.className}`}
          animate={{
            y: [0, -30, 20, 0],
            x: [0, 20, -15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
