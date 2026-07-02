"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline";
  type?: "button" | "submit";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.2);
    y.set((e.clientY - cy) * 0.2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const baseClass =
    variant === "primary"
      ? "btn-primary premium-btn-glow"
      : "btn-outline premium-btn-glow";

  const content = (
  <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="relative inline-block"
      whileTap={{ scale: 0.96 }}
    >
      <span
        className={cn(
          baseClass,
          "ripple-btn group relative cursor-pointer select-none",
          className,
          disabled && "pointer-events-none opacity-60"
        )}
      >
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="ripple absolute inset-0 scale-0 rounded-full bg-white/30 opacity-0 transition-transform duration-500 group-active:scale-[4] group-active:opacity-100" />
        </span>
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="border-0 bg-transparent p-0">
      {content}
    </button>
  );
}
