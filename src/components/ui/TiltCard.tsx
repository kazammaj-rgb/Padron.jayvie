"use client";

import { usePointerMotion } from "@/hooks/usePointerMotion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
  const { x, y, handlers } = usePointerMotion({ distanceX: 1.7, distanceY: -1.7 });

  return (
    <div {...handlers} className={cn("tilt-card group relative h-full", className)}>
      <motion.div
        className="tilt-card-surface h-full"
        style={{ rotateX: y, rotateY: x, transformPerspective: 1000 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
