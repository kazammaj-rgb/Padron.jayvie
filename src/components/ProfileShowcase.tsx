"use client";

import { ProfileImage } from "@/components/ProfileImage";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ImageViewer } from "@/components/ui/ImageViewer";
import { Expand } from "lucide-react";
import { type PointerEvent } from "react";

export function ProfileShowcase() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 180, damping: 25 });
  const rotateY = useSpring(y, { stiffness: 180, damping: 25 });
  const reset = () => { x.set(0); y.set(0); };
  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(-((event.clientY - rect.top) / rect.height - .5) * 6);
    y.set(((event.clientX - rect.left) / rect.width - .5) * 7);
  };

  return (
    <motion.div initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .6, delay: reduced ? 0 : .16, ease: [.22, 1, .36, 1] }}
      className="profile-showcase-wrap">
      <motion.div className="profile-showcase-card" style={reduced ? undefined : { rotateX, rotateY }}
        onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
        <ImageViewer src="/img/jvprofile.png" alt="Jayvie Padron" className="profile-showcase-inner">
          <ProfileImage className="object-contain object-center" />
          <span className="profile-frame-light" aria-hidden="true" />
          <span className="profile-photo-label"><Expand className="h-3.5 w-3.5" />View photo</span>
        </ImageViewer>
      </motion.div>
    </motion.div>
  );
}
