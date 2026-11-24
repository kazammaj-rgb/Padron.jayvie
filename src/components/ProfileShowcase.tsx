"use client";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

import { ProfileImage } from "@/components/ProfileImage";
import { motion } from "framer-motion";
import { usePointerMotion } from "@/hooks/usePointerMotion";
import { ImageViewer } from "@/components/ui/ImageViewer";
import { Expand } from "lucide-react";

export function ProfileShowcase() {
  const reduced = useReducedMotionPreference();
  const { x: rotateY, y: rotateX, handlers } = usePointerMotion({ distanceX: 3, distanceY: -2 });

  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : .2, ease: [.22, 1, .36, 1] }}
      className="profile-showcase-wrap" {...handlers}>
      <span className="portrait-halo" aria-hidden="true" />
      <span className="portrait-orbit" aria-hidden="true" />
      <span className="portrait-index" aria-hidden="true">THE PERSON BEHIND THE PIXELS</span>
      <motion.div className="profile-showcase-card" style={reduced ? undefined : { rotateX, rotateY }}>
        <div className="portrait-topline" aria-hidden="true"><span>JP — PORTRAIT</span><span>01 / 01</span></div>
        <ImageViewer src="/img/jvprofile.png" alt="Jayvie Padron" className="profile-showcase-inner">
          <ProfileImage className="object-contain object-center" />
          <span className="profile-frame-light" aria-hidden="true" />
          <span className="portrait-corner portrait-corner--top" aria-hidden="true" />
          <span className="portrait-corner portrait-corner--bottom" aria-hidden="true" />
          <span className="profile-photo-label"><Expand className="h-3.5 w-3.5" />View photo</span>
        </ImageViewer>
        <div className="portrait-caption"><span>Jayvie G. Padron<small>Developer. Musician. Creative thinker.</small></span><span className="portrait-cross" aria-hidden="true">✳</span></div>
      </motion.div>
    </motion.div>
  );
}
