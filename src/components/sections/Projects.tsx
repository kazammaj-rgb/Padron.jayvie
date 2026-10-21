"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { projects } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";

export function Projects() {
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
              Explore my deployed project.
            </p>
          </div>
        </SectionReveal>

        <motion.div
          layout
          className="mx-auto mt-12 grid w-full max-w-3xl gap-8"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <div className="glass-panel-strong overflow-hidden transition-all duration-500 hover:shadow-neon-lg">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex aspect-video flex-col items-center justify-center gap-4 overflow-hidden bg-[var(--bg-secondary)] text-center transition-colors hover:bg-[var(--bg-secondary)]/80"
                    aria-label={`Visit ${project.title}`}
                  >
                    <span className="absolute left-4 top-4 rounded-full bg-[#211f1c] px-3 py-1 text-xs font-mono capitalize text-[#e1a184]">
                      {project.category}
                    </span>
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                      <Globe className="h-8 w-8" />
                    </span>
                    <span className="font-mono text-sm tracking-wide text-[var(--text-muted)]">
                      {new URL(project.liveUrl).hostname}
                    </span>
                  </a>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)] line-clamp-2">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <MagneticButton href={project.liveUrl} variant="primary">
                        <ExternalLink className="h-4 w-4" />
                        Visit Live Project
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
