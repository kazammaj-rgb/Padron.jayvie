"use client";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

import { ProfileShowcase } from "@/components/ProfileShowcase";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SocialLinksBar } from "@/components/ui/SocialLinksBar";
import { siteConfig } from "@/lib/data";
import { scrollToSection } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";

function TypingRoles() {
  const roles = siteConfig.roles;
  const reduced = useReducedMotionPreference();
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
  const reduced = useReducedMotionPreference();
  const reveal = (delay: number) => ({
    initial: reduced ? false as const : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : .8, delay: reduced ? 0 : delay, ease: [.22, 1, .36, 1] },
  });

  return (
    <section id="home" className="relative">
      <div className="hero-masthead">
        <span><span className="masthead-mark" aria-hidden="true">✳</span> Personal portfolio <span className="masthead-year">/ {new Date().getFullYear()}</span></span>
        <span className="hero-location"><span className="status-dot" />Cauayan, Philippines</span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <motion.div {...reveal(0)} className="hero-eyebrow">
            <span className="eyebrow-line" aria-hidden="true" />
            Aspiring web & mobile developer
          </motion.div>
          <motion.h1 {...reveal(.08)} className="hero-title" aria-label={siteConfig.name}>
            {siteConfig.name.split(" ").map((word, index) => (
              <span key={word} className="hero-title-line" aria-hidden="true"><motion.span
                initial={reduced ? false : { y: "105%" }} animate={{ y: 0 }}
                transition={{ duration: reduced ? 0 : 1.05, delay: reduced ? 0 : .12 + index * .1, ease: [.22, 1, .36, 1] }}
                className={index === 1 ? "hero-title-accent" : undefined}
              >{word.charAt(0) + word.slice(1).toLowerCase()}{index === 1 && <span className="hero-period">.</span>}</motion.span></span>
            ))}
          </motion.h1>
          <motion.p {...reveal(.16)} className="hero-course">{siteConfig.course}</motion.p>
          <motion.p {...reveal(.22)} className="hero-description">{siteConfig.tagline}</motion.p>
          <motion.div {...reveal(.28)} className="hero-roles"><span className="role-prefix" aria-hidden="true">↳</span><TypingRoles /></motion.div>
          <motion.div {...reveal(.34)} className="hero-actions">
            <MagneticButton href="/cv.pdf" download="Jayvie-Gulan-Padron-CV.pdf" variant="primary">
              <Download className="h-4 w-4" />Download CV
            </MagneticButton>
            <MagneticButton variant="outline" onClick={() => scrollToSection("contact")}>
              <Mail className="h-4 w-4" />Contact Me
            </MagneticButton>
            <MagneticButton variant="outline" onClick={() => scrollToSection("personal")}>
              Explore More<ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
          <motion.div {...reveal(.4)} className="hero-socials"><span className="social-caption">Find me on</span><SocialLinksBar /></motion.div>
        </div>
        <ProfileShowcase />
      </div>
      <div className="hero-bottomline">
        <span className="hero-disciplines"><span className="hero-chapter">01 / 07</span> Development <i /> Design <i /> Music</span>
        <button type="button" onClick={() => scrollToSection("personal")} className="hero-explore" aria-label="Explore about me">
          <span>THE STORY CONTINUES</span><ArrowDownRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
