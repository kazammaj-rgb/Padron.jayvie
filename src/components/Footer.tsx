"use client";

import { SocialLinksBar } from "@/components/ui/SocialLinksBar";
import { navLinks, siteConfig } from "@/lib/data";
import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 overflow-hidden">
      <svg
        className="absolute bottom-0 left-0 w-full text-[var(--bg-secondary)]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          fill="currentColor"
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L0,120Z"
          animate={{
            d: [
              "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L0,120Z",
              "M0,48L48,58.7C96,69,192,91,288,85.3C384,80,480,48,576,42.7C672,37,768,59,864,64C960,69,1056,59,1152,53.3C1248,48,1344,48,1392,48L1440,48L1440,120L0,120Z",
              "M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L0,120Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative bg-[var(--bg-secondary)] px-4 pb-12 pt-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="font-display text-2xl font-bold neon-text">
                {siteConfig.name}
              </h3>
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                {siteConfig.course} — Building the future through code, music, and
                creativity.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-display font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-sm text-[var(--text-muted)] transition-colors hover:text-cyan-400"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-display font-semibold">Connect</h4>
              <SocialLinksBar size="sm" />
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
              © {year} &ldquo;maybe you&apos;re not the best, but at least you&apos;re not the worst either.&rdquo; — Jayvie Padron
              <Heart className="mx-1 h-4 w-4 fill-pink-500 text-pink-500" />
              Jesus Loves you.
            </p>
            <p className="font-mono text-xs text-cyan-400/60">
              Next-Gen Portfolio v2.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
