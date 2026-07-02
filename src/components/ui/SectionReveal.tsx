"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "3d" | "scale";
}

const variants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "3d": {
    hidden: {
      opacity: 0,
      y: 70,
      rotateX: 22,
      scale: 0.92,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function SectionReveal({
  children,
  className,
  delay = 0,
  variant = "3d",
}: SectionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants[variant]}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}
