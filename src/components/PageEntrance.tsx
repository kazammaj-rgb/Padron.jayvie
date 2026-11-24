"use client";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

import { motion, useIsPresent } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

interface PageEntranceProps {
  children: ReactNode;
  onEnterStart?: () => void;
  onEnterComplete?: () => void;
}

export function PageEntrance({ children, onEnterStart, onEnterComplete }: PageEntranceProps) {
  const reduced = useReducedMotionPreference();
  const isPresent = useIsPresent();
  const hasEntered = useRef(false);
  const hasCompleted = useRef(false);

  useLayoutEffect(() => {
    if (!isPresent) {
      hasEntered.current = false;
      hasCompleted.current = false;
      return;
    }
    if (isPresent && !hasEntered.current) {
      hasEntered.current = true;
      onEnterStart?.();
    }
  }, [isPresent, onEnterStart]);

  useEffect(() => {
    // With movement disabled there may be no animation completion event.
    if (reduced && isPresent && !hasCompleted.current) {
      hasCompleted.current = true;
      onEnterComplete?.();
    }
  }, [isPresent, onEnterComplete, reduced]);

  return (
    <motion.div
      className="page-entrance relative z-10"
      data-reveal=""
      initial={reduced ? false : "hidden"}
      animate="visible"
      exit="exit"
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.54, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, y: reduced ? 0 : -6, transition: { duration: reduced ? 0 : 0.16, ease: [0.4, 0, 1, 1] } },
      }}
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      onAnimationComplete={(definition) => {
        if (definition === "visible" && isPresent && !hasCompleted.current) {
          hasCompleted.current = true;
          onEnterComplete?.();
        }
      }}
    >
      {children}
    </motion.div>
  );
}
