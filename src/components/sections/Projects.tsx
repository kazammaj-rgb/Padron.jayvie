"use client";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { projects } from "@/lib/data";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Download,
  ExternalLink,
  Github,
  Radio,
} from "lucide-react";

/** Abstract, code-built artwork; project details and destinations remain below. */
function ProjectArtwork({ project }: { project: (typeof projects)[number] }) {
  if (project.kind === "website") {
    return (
      <div aria-hidden="true" className="project-artwork project-artwork-browser relative w-[82%] max-w-[320px] -rotate-3 overflow-hidden rounded-lg border border-accent/25 bg-[var(--bg-primary)] shadow-2xl transition-transform duration-700 motion-safe:group-hover:rotate-0 motion-safe:group-hover:scale-[1.03]">
        <div className="flex h-7 items-center gap-1.5 border-b border-[var(--glass-border)] px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent/20" />
          <span className="ml-auto h-1 w-10 rounded-full bg-accent/15" />
        </div>
        <div className="relative overflow-hidden px-5 pb-7 pt-6">
          <span className="block font-mono text-[7px] uppercase tracking-[0.3em] text-accent">{project.title}</span>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div className="flex-1 space-y-2">
              <span className="block h-3 w-full rounded-sm bg-[var(--text-primary)] opacity-90" />
              <span className="block h-3 w-3/4 rounded-sm bg-accent/60" />
              <span className="!mt-4 block h-1 w-4/5 rounded-full bg-accent/20" />
              <span className="block h-1 w-3/5 rounded-full bg-accent/20" />
              <span className="!mt-4 block h-4 w-14 rounded-sm border border-accent/30 bg-accent/15" />
            </div>
            <div className="relative flex h-24 w-20 shrink-0 items-center justify-center">
              <span className="absolute h-20 w-20 rounded-full border border-accent/25" />
              <span className="absolute h-14 w-14 rotate-45 border border-accent/50 bg-accent/5" />
              <span className="h-7 w-7 rotate-45 border border-accent/60 bg-accent/20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.icon === "document") {
    return (
      <div aria-hidden="true" className="project-artwork project-artwork-document relative -rotate-6 transition-transform duration-700 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-0">
        <div className="absolute inset-0 translate-x-3 translate-y-2 rotate-[10deg] rounded-lg border border-accent/15 bg-[var(--bg-primary)]" />
        <div className="relative w-36 rounded-lg border border-accent/30 bg-[var(--bg-primary)] p-5 shadow-2xl">
          <div className="flex items-start justify-between border-b border-accent/20 pb-4">
            <span className="font-display text-2xl tracking-tight text-[var(--text-primary)]">JP<span className="text-accent">.</span></span>
            <span className="pt-1 font-mono text-[8px] tracking-widest text-accent">CV</span>
          </div>
          <div className="mt-4 space-y-2">
            <span className="block h-1.5 w-3/4 rounded-full bg-accent/60" />
            <span className="block h-1 w-full rounded-full bg-accent/20" />
            <span className="block h-1 w-5/6 rounded-full bg-accent/20" />
            <span className="!mt-4 block h-1.5 w-1/2 rounded-full bg-accent/50" />
            <span className="block h-1 w-full rounded-full bg-accent/20" />
            <span className="block h-1 w-2/3 rounded-full bg-accent/20" />
          </div>
          <div className="mt-5 flex gap-1.5">
            {[0, 1, 2].map((i) => <span key={i} className="h-3 flex-1 rounded-sm border border-accent/20 bg-accent/5" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="project-artwork project-artwork-controller relative rotate-6 transition-transform duration-700 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-0">
      <div className="relative w-32 rounded-[22px] border border-accent/30 bg-[var(--bg-primary)] p-3 shadow-2xl">
        <span className="mx-auto mb-3 block h-1 w-8 rounded-full bg-accent/20" />
        <div className="flex items-center justify-between border-b border-accent/15 pb-3">
          <span className="font-mono text-[8px] text-accent">pjRcCar</span>
          <Radio className="h-3 w-3 text-accent/70" strokeWidth={1.5} />
        </div>
        <div className="relative mx-auto my-4 grid h-20 w-20 grid-cols-3 grid-rows-3 gap-1">
          <span className="col-start-2 flex items-center justify-center rounded bg-accent/10"><ArrowUp className="h-3 w-3 text-accent" /></span>
          <span className="col-start-1 row-start-2 flex items-center justify-center rounded bg-accent/10"><ArrowLeft className="h-3 w-3 text-accent" /></span>
          <span className="col-start-2 row-start-2 rounded-full border border-accent/40 bg-accent/20" />
          <span className="col-start-3 row-start-2 flex items-center justify-center rounded bg-accent/10"><ArrowRight className="h-3 w-3 text-accent" /></span>
          <span className="col-start-2 row-start-3 flex items-center justify-center rounded bg-accent/10"><ArrowDown className="h-3 w-3 text-accent" /></span>
        </div>
        <div className="flex items-center gap-2 border-t border-accent/15 pt-3">
          <span className="h-1 w-full rounded-full bg-accent/20"><span className="block h-full w-2/3 rounded-full bg-accent/60" /></span>
          <span className="h-2 w-2 shrink-0 rounded-full border border-accent/50" />
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const reduced = useReducedMotionPreference();

  return (
    <section id="projects" className="editorial-section relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="section-header">
            <span className="section-kicker font-mono text-sm uppercase tracking-[0.3em] text-accent">
              06 — Projects
            </span>
            <h2 className="section-title mt-4">
              Featured <span className="neon-text">Work</span>
            </h2>
            <p className="section-subtitle">Explore my website projects and Android applications.</p>
          </div>
        </SectionReveal>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const coverContent = (
              <>
                <div aria-hidden="true" className="project-cover-grid pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(var(--glass-border)_1px,transparent_1px),linear-gradient(90deg,var(--glass-border)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--text-muted)]">{project.category}</span>
                  <span className="font-mono text-[10px] text-accent/70">0{index + 1}</span>
                </div>
                <ProjectArtwork project={project} />
                {project.kind === "website" && (
                  <span className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-2 font-mono text-[9px] tracking-wide text-[var(--text-muted)]">
                    <span className="truncate">{new URL(project.liveUrl).hostname}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-accent" />
                  </span>
                )}
              </>
            );
            const coverClass = "project-cover relative flex min-h-[284px] items-center justify-center overflow-hidden border-b border-[var(--glass-border)] bg-[var(--bg-secondary)] px-3 pb-10 pt-14";

            return (
              <motion.article
                key={project.id}
                data-reveal=""
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className={`project-card group min-w-0 ${index === 0 ? "project-card-featured" : ""}`}
              >
                <div className="project-shell">
                  {project.kind === "website" ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className={`${coverClass} focus-visible:outline-offset-[-3px]`} aria-label={`Visit ${project.title}`}>
                      {coverContent}
                    </a>
                  ) : (
                    <div className={coverClass}>{coverContent}</div>
                  )}

                  <div className="project-content">
                    <span className="project-content-index editorial-label">Selected work / 0{index + 1}</span>
                    <h3 className="font-display font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{project.description}</p>
                    {project.kind === "android" && (
                      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]">Android only · APK download</p>
                    )}
                    <div className="project-actions mt-auto flex flex-wrap gap-3 pt-7">
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
