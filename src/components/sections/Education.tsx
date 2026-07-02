"use client";

import { education } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GraduationCap, School } from "lucide-react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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
      variants={itemVariants}
      className="education-timeline-item relative flex gap-4 md:gap-8"
    >
      {/* Timeline column */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold shadow-neon",
            index === 0
              ? "border-cyan-400 bg-cyan-400/20 text-cyan-400"
              : "border-purple-400/60 bg-purple-500/10 text-purple-300"
          )}
        >
          {education.length - index}
        </motion.div>
        {!isLast && (
          <div
            className="mt-2 min-h-[4rem] w-0.5 flex-1 bg-gradient-to-b from-cyan-400/80 via-purple-500/50 to-transparent"
            aria-hidden
          />
        )}
      </div>

      {/* Card */}
      <motion.article
        className="education-card group relative mb-8 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[var(--glass-bg)] p-5 shadow-glass backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-neon md:p-6"
        whileHover={{ y: -4, scale: 1.01 }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="relative size-full">
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover opacity-30 transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 768px) 720px, 100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-950/55 to-slate-900/65" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.16),transparent_30%)]" />
        </div>

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/25 bg-slate-950/50 backdrop-blur-sm sm:mx-0">
            <School className="h-6 w-6 text-cyan-300" />
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-left">
            <span
              className={cn(
                "inline-block rounded-full px-3 py-1 text-xs font-mono font-medium uppercase tracking-wider",
                index === 0
                  ? "bg-cyan-400/15 text-cyan-400 ring-1 ring-cyan-400/30"
                  : "bg-purple-500/10 text-purple-300 ring-1 ring-purple-500/20"
              )}
            >
              {item.level}
            </span>

            <h3 className="mt-3 font-display text-lg font-bold leading-snug text-[var(--text-primary)] md:text-xl">
              {item.school}
            </h3>

            <p className="mt-2 text-sm font-medium text-cyan-400/90 md:text-base">
              {item.course}
            </p>

            <p className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 font-mono text-sm text-[var(--text-muted)] backdrop-blur-sm">
              <GraduationCap className="h-4 w-4 text-purple-400" />
              Batch: {item.batch}
            </p>
          </div>
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
      <motion.div
        className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">
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
          className="relative mt-14 list-none pl-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-6 py-3">
            <GraduationCap className="h-5 w-5 text-cyan-400" />
            <span className="text-sm text-[var(--text-muted)]">
              Currently pursuing BS Information Technology
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
