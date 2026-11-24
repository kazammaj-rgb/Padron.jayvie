"use client";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "scale";
}

export function SectionReveal({ children, className, delay = 0, variant = "fade" }: SectionRevealProps) {
  const reduced = useReducedMotionPreference();

  return (
    <motion.div
      data-reveal=""
      initial={reduced ? false : { opacity: 0, y: variant === "fade" ? 18 : 8, scale: variant === "scale" ? 0.99 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: reduced ? 0 : 0.62, delay: reduced ? 0 : Math.min(Math.max(delay, 0), 0.2), ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
