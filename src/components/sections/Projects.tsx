"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, ExternalLink, Folder, Play, Smartphone, Globe } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Filter = "all" | "apps" | "websites";

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const filters: { id: Filter; label: string; icon: React.ReactNode }[] = [
    { id: "all", label: "All", icon: <Folder className="h-4 w-4" /> },
    { id: "apps", label: "Apps", icon: <Smartphone className="h-4 w-4" /> },
    { id: "websites", label: "Websites", icon: <Globe className="h-4 w-4" /> },
  ];

  return (
    <section
      id="projects"
      className="relative px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="text-center">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">
              05 — Projects
            </span>
            <h2 className="section-title mt-4">
              Featured <span className="neon-text">Work</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Recent websites and apps I&apos;ve built, including live deployments you can explore.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300",
                  filter === f.id
                    ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 shadow-neon"
                    : "glass-panel hover:border-cyan-400/30"
                )}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        <motion.div
          layout
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group perspective-1000"
              >
                <div className="glass-panel-strong preserve-3d overflow-hidden transition-all duration-500 hover:shadow-neon-lg">
                  <div className="relative aspect-video overflow-hidden bg-slate-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <Code2 className="h-16 w-16 text-cyan-400/30" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform hover:scale-110"
                        aria-label="Play preview"
                      >
                        <Play className="h-6 w-6 fill-white text-white" />
                      </button>
                    </div>
                    <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-mono capitalize text-cyan-400 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)] line-clamp-2">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-mono text-purple-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <MagneticButton href={project.liveUrl} variant="primary">
                        <ExternalLink className="h-4 w-4" />
                        Live Preview
                      </MagneticButton>
                      <MagneticButton href={project.sourceUrl} variant="outline">
                        <Code2 className="h-4 w-4" />
                        Source Code
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
