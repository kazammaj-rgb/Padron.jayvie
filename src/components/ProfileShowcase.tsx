"use client";

import { ProfileImage } from "@/components/ProfileImage";
import { motion } from "framer-motion";

export function ProfileShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="profile-showcase-wrap relative mx-auto flex items-center justify-center overflow-visible p-2"
    >
      <motion.div
        className="pointer-events-none absolute -inset-6 rounded-[2.25rem] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-50 blur-2xl"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{
          rotate: { duration: 14, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-90"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "220% 220%" }}
        aria-hidden
      />

      <motion.div
        className="profile-showcase-card relative z-10 w-[min(100%,18rem)] shrink-0 sm:w-80 lg:w-[22rem]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div className="profile-showcase-frame relative aspect-square w-full overflow-visible rounded-[1.85rem] p-[3px]">
          <motion.div className="profile-showcase-inner relative h-full w-full overflow-hidden rounded-[1.65rem] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <motion.div className="relative h-full w-full p-3 sm:p-4">
              <ProfileImage className="object-contain object-center drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,245,255,0.8)]"
          style={{
            top: `${18 + Math.sin(i * 1.2) * 28}%`,
            left: `${8 + i * 14}%`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.35, 1, 0.35],
            scale: [1, 1.35, 1],
          }}
          transition={{
            duration: 2.4 + i * 0.25,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
          aria-hidden
        />
      ))}
    </motion.div>
  );
}
