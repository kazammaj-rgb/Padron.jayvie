"use client";

import { SocialIcon, type SocialIconKey } from "@/components/ui/SocialIcons";
import { socialLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "h-10 w-10",
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
      className={cn("flex flex-wrap items-center gap-3", className)}
      role="list"
      aria-label="Social media links"
    >
      {socialLinks.map((link, i) => (
        <motion.a
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
          whileHover={{ scale: 1.12, y: -4 }}
          whileTap={{ scale: 0.96 }}
          className={cn(
            "group relative flex items-center justify-center rounded-xl glass-panel transition-all duration-300",
            "hover:border-cyan-400/50 hover:shadow-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60",
            sizeClasses[size],
            showLabels && "h-auto w-auto gap-2 px-4 py-2.5"
          )}
        >
          <span className="text-[var(--text-muted)] transition-colors duration-300 group-hover:text-cyan-400">
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
                "radial-gradient(circle at 50% 50%, rgba(0,245,255,0.12), transparent 70%)",
            }}
            aria-hidden
          />
        </motion.a>
      ))}
    </motion.div>
  );
}
