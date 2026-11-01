"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export function PageEntrance({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .24, ease: [.22, 1, .36, 1] }}>
      {children}
    </motion.div>
  );
}
