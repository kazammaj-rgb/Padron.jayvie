"use client";

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
  return (
    <motion.div
      data-reveal=""
      className={cn("flex flex-wrap items-center gap-3", className)}
      role="list"
      aria-label="Social media links"
    >
      {socialLinks.map((link, i) => (
        <motion.a
          data-reveal=""
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
          aria-label={`${link.name} — open profile`}
          title={link.name}
          initial={stagger ? { opacity: 0, scale: 0 } : false}
          animate={stagger ? { opacity: 1, scale: 1 } : undefined}
          transition={stagger ? { delay: 0.55 + i * 0.08, duration: 0.4 } : undefined}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "group relative flex items-center justify-center rounded-xl glass-panel transition-all duration-300",
            "hover:border-accent/50 focus-visible:ring-2 focus-visible:ring-accent/60",
            sizeClasses[size],
            showLabels && "h-auto w-auto gap-2 px-4 py-2.5"
          )}
        >
          <span className="text-[var(--text-muted)] transition-colors duration-300 group-hover:text-accent">
            <SocialIcon icon={link.icon as SocialIconKey} />
          </span>
          {showLabels && (
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {link.name}
            </span>
          )}
          <span
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(76,132,255,0.08), transparent 70%)",
            }}
            aria-hidden
          />
        </motion.a>
      ))}
    </motion.div>
  );
}
