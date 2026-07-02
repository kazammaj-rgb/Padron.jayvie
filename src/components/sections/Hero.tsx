"use client";

import { ProfileShowcase } from "@/components/ProfileShowcase";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialLinksBar } from "@/components/ui/SocialLinksBar";
import { siteConfig } from "@/lib/data";
import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown, Download, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function TypingRoles() {
  const roles = siteConfig.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setRoleIndex((i) => (i + 1) % roles.length);
          }
        }
      },
      deleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles]);

  return (
    <span className="font-mono text-lg text-cyan-400 md:text-xl">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-1 inline-block h-5 w-0.5 bg-cyan-400 align-middle"
      />
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="section-glow relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-20 pt-28 md:px-8"
    >
      <motion.div
        className="parallax-slow absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="parallax-fast absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-500/15 blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.45, 0.25, 0.45] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="parallax-slow absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/5 blur-[140px]"
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 text-sm text-cyan-400"
          >
            <Sparkles className="h-4 w-4" />
            Aspiring WEB & MOBILE developer
          </motion.div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-7xl">
            <span className="holographic-text">{siteConfig.name}</span>
          </h1>

          <p className="mt-3 text-lg font-medium text-purple-400 md:text-xl">
            {siteConfig.course}
          </p>

          <p className="mt-6 max-w-xl text-[var(--text-muted)] md:text-lg">
            {siteConfig.tagline}
          </p>

          <div className="mt-6 min-h-[2rem]">
            <TypingRoles />
          </div>

          <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <MagneticButton href="/cv.pdf" variant="primary">
              <Download className="h-4 w-4" />
              Download CV
            </MagneticButton>
            <MagneticButton
              variant="outline"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </MagneticButton>
            <MagneticButton
              variant="outline"
              onClick={() => scrollToSection("personal")}
            >
              Explore More
            </MagneticButton>
          </motion.div>

          <SocialLinksBar
            className="mt-10 justify-center lg:justify-start"
            stagger
          />
        </motion.div>

        <div className="order-1 flex justify-center lg:order-2">
          <ProfileShowcase />
        </div>
      </div>

      <motion.button
        onClick={() => scrollToSection("personal")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] transition-colors hover:text-cyan-400"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
