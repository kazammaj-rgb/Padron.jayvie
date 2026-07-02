"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 400, damping: 35 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 35 });
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 25 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.body.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.body.removeEventListener("mouseleave", leave);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden mix-blend-screen md:block"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400/60"
          animate={{ scale: clicking ? 0.85 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{ scale: clicking ? 1.3 : 1, opacity: clicking ? 0.5 : 0.35 }}
          style={{
            background:
              "radial-gradient(circle, rgba(0,245,255,0.45) 0%, rgba(168,85,247,0.25) 35%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997] hidden md:block"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f5ff]"
          animate={{ scale: clicking ? 0.6 : 1 }}
        />
      </motion.div>
    </>
  );
}
