"use client";

import { education } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GraduationCap, School } from "lucide-react";
import Image from "next/image";
import { ImageViewer } from "@/components/ui/ImageViewer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

function EducationCard({
  item,
  index,
  isLast,
}: {
  item: (typeof education)[0];
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.li
      data-reveal="" variants={itemVariants}
      className="education-timeline-item relative flex gap-4 md:gap-8"
    >
      {/* Timeline column */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          data-reveal="" className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold shadow-neon",
            index === 0
              ? "border-accent bg-accent/20 text-accent"
              : "border-accent/60 bg-accent/10 text-accent"
          )}
        >
          {education.length - index}
        </motion.div>
        {!isLast && (
          <div
            className="mt-2 min-h-[4rem] w-0.5 flex-1 bg-gradient-to-b from-accent/80 via-accent/50 to-transparent"
            aria-hidden
          />
        )}
      </div>

      {/* Card */}
      <motion.article
        data-reveal="" className="education-card group relative mb-8 flex-1 overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-5 shadow-glass backdrop-blur-xl transition-all duration-300 hover:border-accent/30 hover:shadow-neon md:p-6"
        whileHover={{ y: -3 }}
      >
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-[var(--icon-bg)] backdrop-blur-sm sm:mx-0">
            <School className="h-6 w-6 text-accent" />
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <span
              className={cn(
                "inline-block rounded-full px-3 py-1 text-xs font-mono font-medium uppercase tracking-wider",
                index === 0
                  ? "bg-accent/15 text-accent ring-1 ring-accent/30"
                  : "bg-accent/10 text-accent ring-1 ring-accent/20"
              )}
            >
              {item.level}
            </span>

            <h3 className="mt-3 font-display text-lg font-bold leading-snug text-[var(--text-primary)] md:text-xl">
              {item.school}
            </h3>

            <p className="mt-2 text-sm font-medium text-accent/90 md:text-base">
              {item.course}
            </p>

            <p className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[var(--surface-soft)] px-3 py-1.5 font-mono text-sm text-[var(--text-muted)] backdrop-blur-sm">
              <GraduationCap className="h-4 w-4 text-accent" />
              Batch: {item.batch}
            </p>
          </div>

          <ImageViewer
            src={item.image}
            alt={`${item.school} photo`}
            className="relative mx-auto block h-24 w-32 shrink-0 cursor-zoom-in overflow-hidden rounded-xl border border-[var(--glass-border)] bg-[var(--bg-secondary)] sm:mx-0"
          >
            <Image
              src={item.image}
              alt={`${item.school} photo`}
              fill
              sizes="128px"
              className="object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-black/70 px-2 py-1 text-xs text-white">View photo</span>
          </ImageViewer>
        </div>
      </motion.article>
    </motion.li>
  );
}

export function Education() {
  return (
    <section
      id="education"
      className="relative overflow-visible px-4 py-24 md:px-8 md:py-32"
    >

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          data-reveal="" initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15, margin: "-80px" }}
          transition={{ duration: 0.35 }}
          className="text-center"
        >
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
            02 — Education
          </span>
          <h2 className="section-title mt-4">
            Academic <span className="neon-text">Journey</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Complete educational background — from elementary to college.
          </p>
        </motion.div>

        <motion.ol
          data-reveal="" className="relative mt-14 list-none pl-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12, margin: "-40px" }}
        >
          {education.map((item, index) => (
            <EducationCard
              key={item.id}
              item={item}
              index={index}
              isLast={index === education.length - 1}
            />
          ))}
        </motion.ol>

        <motion.div
          data-reveal="" initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-6 py-3">
            <GraduationCap className="h-5 w-5 text-accent" />
            <span className="text-sm text-[var(--text-muted)]">
              Currently pursuing BS Information Technology
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
