"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { experience } from "@/lib/data";
import { ArrowUpRight, Briefcase } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="editorial-section relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="section-header">
            <span className="section-kicker font-mono text-sm uppercase tracking-[0.3em] text-accent">04 — Experience</span>
            <h2 className="section-title mt-4">Work <span className="neon-text">Immersion</span></h2>
            <p className="section-subtitle">Professional experience in leadership, administration, and education.</p>
          </div>
        </SectionReveal>

        <div className="experience-list">
          {experience.map((item, index) => (
            <SectionReveal key={item.id} delay={index * 0.1}>
              <article className="experience-feature">
                <div className="experience-index-panel">
                  <span className="editorial-label">Experience / 0{index + 1}</span>
                  <span className="experience-large-index" aria-hidden="true">0{index + 1}<span>.</span></span>
                  <div className="experience-type"><Briefcase aria-hidden="true" className="h-4 w-4" />{item.type}</div>
                </div>
                <div className="experience-copy">
                  <div className="flex items-center justify-between gap-4">
                    <span className="editorial-label">{item.institution}</span>
                    <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" />
                  </div>
                  <h3>{item.position}</h3>
                  <p>{item.description}</p>
                  <div className="experience-tags">
                    {["Leadership", "Administration", "Education"].map((tag, tagIndex) => (
                      <span key={tag}><span aria-hidden="true">0{tagIndex + 1}</span>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
