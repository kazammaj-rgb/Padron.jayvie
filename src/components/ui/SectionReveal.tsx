"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "scale";
}

export function SectionReveal({ children, className, delay = 0, variant = "fade" }: SectionRevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: variant === "fade" ? 12 : 0, scale: variant === "scale" ? .98 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .05 }}
      transition={{ duration: .38, delay: reduced ? 0 : Math.min(delay, .15), ease: [.22, 1, .36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}
