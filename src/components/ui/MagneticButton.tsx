"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

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

/** Shared controls keep a stable hit area for mouse, touch, and keyboard. */
export function MagneticButton({ children, className, onClick, href, download, variant = "primary", type = "button", disabled }: MagneticButtonProps) {
  const classes = cn(variant === "primary" ? "btn-primary" : "btn-outline", className);
  if (href) return (
    <a href={disabled ? undefined : href} download={download} className={classes}
      aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined}
      target={!download && href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
      {children}
    </a>
  );
  return <button type={type} onClick={onClick} disabled={disabled} className={classes}>{children}</button>;
}
