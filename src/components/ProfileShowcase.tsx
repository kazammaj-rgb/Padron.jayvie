"use client";

import { ProfileImage } from "@/components/ProfileImage";
import { motion } from "framer-motion";
import { ImageViewer } from "@/components/ui/ImageViewer";

export function ProfileShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="profile-showcase-wrap relative mx-auto flex items-center justify-center overflow-visible p-2"
    >
      <motion.div
        className="profile-showcase-card relative z-10 w-[min(100%,18rem)] shrink-0 sm:w-80 lg:w-[22rem]"
      >
        <ImageViewer
          src="/img/jvprofile.png"
          alt="Jayvie Padron"
          className="profile-showcase-inner relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-2xl border bg-[var(--bg-secondary)] p-3 sm:p-4"
        >
          <ProfileImage className="object-contain object-center" />
          <span className="absolute bottom-3 right-3 rounded-lg bg-[#211f1c] px-3 py-2 text-sm text-white">View photo</span>
        </ImageViewer>
      </motion.div>
    </motion.div>
  );
}
