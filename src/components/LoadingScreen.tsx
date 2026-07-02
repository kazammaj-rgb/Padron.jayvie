"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScene3D = dynamic(
  () =>
    import("@/components/effects/LoadingScene3D").then((m) => m.LoadingScene3D),
  { ssr: false }
);

const LOAD_STEPS = [
  "Booting neural interface...",
  "Loading 3D environment...",
  "Compositing glass UI layers...",
  "Syncing portfolio modules...",
  "Calibrating motion engine...",
  "Ready.",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(p + Math.random() * 10 + 3, 100);
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setStepIndex(
      Math.min(
        Math.floor((progress / 100) * LOAD_STEPS.length),
        LOAD_STEPS.length - 1
      )
    );
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      const exitTimer = setTimeout(() => setExiting(true), 450);
      const doneTimer = setTimeout(onComplete, 1400);
      return () => {
        clearTimeout(exitTimer);
        clearTimeout(doneTimer);
      };
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className={`loader-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden ${exiting ? "loader-screen-exit" : ""}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.7, delay: exiting ? 0.5 : 0 }}
    >
      <div className="loader-bg absolute inset-0 mesh-bg" />
      <div className="loader-grid absolute inset-0" />
      <motion.div
        className="loader-scanline pointer-events-none absolute left-0 right-0 h-40 w-full"
        animate={{ top: ["-30%", "130%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,245,255,0.2),transparent_55%)]" />

      <div
        className={`loader-curtain loader-curtain-left ${exiting ? "loader-curtain-open-left" : ""}`}
      />
      <div
        className={`loader-curtain loader-curtain-right ${exiting ? "loader-curtain-open-right" : ""}`}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotateX: 25 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 flex flex-col items-center px-4"
        style={{ transformPerspective: 1200 }}
      >
        <div className="loader-hex-ring absolute -inset-20 md:-inset-28" />
        <LoadingScene3D />

        <p className="mt-4 font-display text-xl font-bold tracking-[0.12em] md:text-2xl">
          <span className="holographic-text">JAYVIE PADRON</span>
        </p>

        <h2 className="mt-2 font-mono text-[10px] uppercase tracking-[0.55em] text-cyan-400 md:text-xs">
          Premium Portfolio
        </h2>

        <motion.p
          key={stepIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 h-5 text-center font-mono text-xs text-[var(--text-muted)]"
        >
          {LOAD_STEPS[stepIndex]}
        </motion.p>

        <div className="relative mt-8 w-72 md:w-96">
          <div className="h-2 overflow-hidden rounded-full bg-white/5 ring-1 ring-cyan-400/25">
            <motion.div
              className="loader-progress-bar h-full rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-cyan-400/70">
            <span>Initializing</span>
            <span className="tabular-nums">
              {Math.min(Math.floor(progress), 100)}%
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
