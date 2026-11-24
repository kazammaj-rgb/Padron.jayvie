"use client";

import { usePointerMotion } from "@/hooks/usePointerMotion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  download?: string;
  variant?: "primary" | "outline";
  type?: "button" | "submit";
  disabled?: boolean;
}

/** Native controls stay stationary while the label responds to fine mouse input. */
export function MagneticButton({ children, className, onClick, href, download, variant = "primary", type = "button", disabled }: MagneticButtonProps) {
  const { x, y, handlers } = usePointerMotion({ distanceX: 3.5, distanceY: 2.5, disabled });
  const classes = cn("magnetic-control", variant === "primary" ? "btn-primary" : "btn-outline", className);
  const content = (
    <motion.span
      className="magnetic-button-content pointer-events-none inline-flex min-w-0 items-center justify-center gap-[inherit]"
      style={{ x, y }}
    >
      {children}
    </motion.span>
  );

  if (href) return (
    <a
      {...handlers}
      href={disabled ? undefined : href}
      onClick={disabled ? undefined : onClick}
      download={download}
      className={classes}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      target={!download && href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  );

  return (
    <button {...handlers} type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
