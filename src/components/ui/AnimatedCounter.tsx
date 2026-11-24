"use client";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({
  end,
  suffix = "",
  duration = 700,
}: AnimatedCounterProps) {
  const reduced = useReducedMotionPreference();
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (reduced) { setCount(end); return; }
    if (!isInView) {
      setCount(0);
      return;
    }
    const startTime = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration, reduced]);

  return (
    <span ref={ref} className="font-mono text-3xl font-bold neon-text md:text-4xl">
      <span aria-hidden="true">{reduced ? end : count}{suffix}</span>
      <span className="sr-only">{end}{suffix}</span>
    </span>
  );
}
