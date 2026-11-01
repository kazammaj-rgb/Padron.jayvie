"use client";

import { ProfileShowcase } from "@/components/ProfileShowcase";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialLinksBar } from "@/components/ui/SocialLinksBar";
import { siteConfig } from "@/lib/data";
import { scrollToSection } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Download, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function TypingRoles() {
  const roles = siteConfig.roles;
  const reduced = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState(roles[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const current = roles[roleIndex];
    const complete = !deleting && text === current;
    const timeout = setTimeout(() => {
      if (complete) setDeleting(true);
      else if (deleting && text.length === 0) {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      } else setText(current.slice(0, text.length + (deleting ? -1 : 1)));
    }, complete ? 2400 : deleting ? 35 : 65);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles, reduced]);

  return (
    <>
      <span className="font-mono" aria-hidden="true">
        {reduced ? roles.join(" · ") : text}<span className="typing-caret" />
      </span>
      <span className="sr-only">{roles.join(", ")}</span>
    </>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduced ? false as const : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: .45, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] },
  });

  return (
    <section id="home" className="relative">
      <div className="hero-layout">
        <div>
          <motion.div {...reveal(0)} className="hero-eyebrow">
            <Sparkles className="h-3.5 w-3.5" />
            Aspiring WEB & MOBILE developer
          </motion.div>
          <motion.h1 {...reveal(.05)} className="hero-title">
            {siteConfig.name}
          </motion.h1>
          <motion.p {...reveal(.10)} className="hero-course">{siteConfig.course}</motion.p>
          <motion.p {...reveal(.15)} className="hero-description">{siteConfig.tagline}</motion.p>
          <motion.div {...reveal(.18)} className="hero-roles"><TypingRoles /></motion.div>
          <motion.div {...reveal(.22)} className="hero-actions">
            <MagneticButton href="/cv.pdf" download="Jayvie-Gulan-Padron-CV.pdf" variant="primary">
              <Download className="h-4 w-4" />Download CV
            </MagneticButton>
            <MagneticButton variant="outline" onClick={() => scrollToSection("contact")}>
              <Mail className="h-4 w-4" />Contact Me
            </MagneticButton>
            <MagneticButton variant="outline" onClick={() => scrollToSection("personal")}>
              Explore More
            </MagneticButton>
          </motion.div>
          <motion.div {...reveal(.26)} className="hero-socials"><SocialLinksBar /></motion.div>
        </div>
        <ProfileShowcase />
      </div>
      <button type="button" onClick={() => scrollToSection("personal")} className="hero-explore" aria-label="Scroll down">
        <span>EXPLORE</span><ChevronDown className="h-5 w-5" />
      </button>
    </section>
  );
}
