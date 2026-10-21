"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, ExternalLink, Folder, Smartphone, Globe, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ImageViewer } from "@/components/ui/ImageViewer";

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
                    ? "bg-[#d97757] text-[#211914] shadow-none"
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <div className="glass-panel-strong overflow-hidden transition-all duration-500 hover:shadow-neon-lg">
                  <div className="relative aspect-video overflow-hidden bg-[var(--bg-secondary)]">
                    <ImageViewer
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 z-10 block h-full w-full cursor-zoom-in"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-[#211f1c] px-3 py-2 text-sm text-white">
                        <Eye className="h-4 w-4" /> View image
                      </span>
                    </ImageViewer>
                    <span className="absolute left-4 top-4 z-20 rounded-full bg-[#211f1c] px-3 py-1 text-xs font-mono capitalize text-[#e1a184]">
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
