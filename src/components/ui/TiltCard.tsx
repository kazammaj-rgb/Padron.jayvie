"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltCard({ children, className }: TiltCardProps) {
  return (
    <motion.div
      className={cn("group relative", className)}
    >
      {children}
    </motion.div>
  );
}
