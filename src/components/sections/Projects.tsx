"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { projects } from "@/lib/data";
import { motion, useReducedMotion } from "framer-motion";
import { Download, ExternalLink, FileText, Github, Globe, Smartphone } from "lucide-react";

export function Projects() {
  const reduced = useReducedMotion();

  return (
    <section id="projects" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="text-center">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
              05 — Projects
            </span>
            <h2 className="section-title mt-4">
              Featured <span className="neon-text">Work</span>
            </h2>
            <p className="section-subtitle mx-auto">Explore my deployed project.</p>
          </div>
        </SectionReveal>

        <div className="mx-auto mt-12 grid w-full max-w-5xl gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => {
            const android = project.kind === "android";
            const coverContent = (
              <>
                <span className="absolute left-4 top-4 rounded-full border border-[var(--glass-border)] bg-[var(--surface-soft)] px-3 py-1 text-xs font-mono capitalize text-[var(--accent)]">
                  {project.category}
                </span>
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent" aria-hidden="true">
                  {project.kind === "website" ? <Globe className="h-8 w-8" /> :
                    project.icon === "document" ? <FileText className="h-8 w-8" /> : <Smartphone className="h-8 w-8" />}
                </span>
                <span className="max-w-full px-4 text-sm font-mono tracking-wide text-[var(--text-muted)] [overflow-wrap:anywhere]">
                  {project.kind === "website" ? new URL(project.liveUrl).hostname : project.title}
                </span>
              </>
            );
            const coverClass = "relative flex aspect-video min-h-[200px] flex-col items-center justify-center gap-4 overflow-hidden bg-[var(--bg-secondary)] text-center";

            return (
              <motion.article key={project.id} data-reveal=""
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : .4, delay: reduced ? 0 : index * .05 }}
                className="group min-w-0">
                <div className="glass-panel-strong flex h-full flex-col overflow-hidden">
                  {project.kind === "website" ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className={`${coverClass} focus-visible:outline-offset-[-3px]`} aria-label={`Visit ${project.title}`}>
                      {coverContent}
                    </a>
                  ) : (
                    <div className={coverClass}>{coverContent}</div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{project.description}</p>
                    {android && (
                      <p className="mt-3 text-xs text-[var(--text-muted)]">Android only · APK download</p>
                    )}
                    <div className="mt-auto flex flex-wrap gap-3 pt-6">
                      {project.kind === "website" ? (
                        <MagneticButton href={project.liveUrl} variant="primary" className="max-w-full whitespace-normal px-3 text-[13px] sm:px-5 sm:text-sm">
                          <ExternalLink className="h-4 w-4" />Visit Live Project
                        </MagneticButton>
                      ) : (
                        <>
                          <MagneticButton href={project.downloadUrl} variant="primary" className="max-w-full whitespace-normal px-3 text-[13px] sm:px-5 sm:text-sm">
                            <Download className="h-4 w-4" />Download APK
                          </MagneticButton>
                          <MagneticButton href={project.githubUrl} variant="outline" className="max-w-full whitespace-normal px-3 text-[13px] sm:px-5 sm:text-sm">
                            <Github className="h-4 w-4" />View on GitHub
                          </MagneticButton>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
