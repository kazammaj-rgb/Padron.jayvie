"use client";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

import { SocialIcon, type SocialIconKey } from "@/components/ui/SocialIcons";
import { socialLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "h-11 w-11",
  md: "h-12 w-12",
  lg: "h-14 w-14",
};

interface SocialLinksBarProps {
  className?: string;
  size?: Size;
  stagger?: boolean;
  showLabels?: boolean;
}

export function SocialLinksBar({
  className,
  size = "md",
  stagger = false,
  showLabels = false,
}: SocialLinksBarProps) {
  const reduced = useReducedMotionPreference();
  return (
    <ul
      className={cn("m-0 flex list-none flex-wrap items-center gap-3 p-0", className)}
      role="list"
      aria-label="Social media links"
    >
      {socialLinks.map((link, i) => (
        <motion.li
          data-reveal=""
          key={link.name}
          initial={stagger && !reduced ? { opacity: 0, y: 8, scale: 0.96 } : false}
          animate={stagger ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={stagger ? { delay: reduced ? 0 : Math.min(i * 0.055, 0.2), duration: reduced ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] } : undefined}
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.name} — open profile`}
            title={link.name}
            className={cn(
              "social-control group relative flex items-center justify-center rounded-xl glass-panel",
              sizeClasses[size],
              showLabels && "h-auto w-auto gap-2 px-4 py-2.5"
            )}
          >
            <span className="social-control-icon text-[var(--text-muted)]">
              <SocialIcon icon={link.icon as SocialIconKey} />
            </span>
            {showLabels && (
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {link.name}
              </span>
            )}
            <span className="social-control-glow" aria-hidden="true" />
          </a>
        </motion.li>
      ))}
    </ul>
  );
}
