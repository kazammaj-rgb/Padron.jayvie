"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { experience } from "@/lib/data";
import { motion } from "framer-motion";
import { Award, Briefcase, Building2 } from "lucide-react";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <div className="text-center">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
              03 — Experience
            </span>
            <h2 className="section-title mt-4">
              Work <span className="neon-text">Immersion</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Professional experience with futuristic timeline presentation.
            </p>
          </div>
        </SectionReveal>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-accent via-accent to-transparent md:block" />

          {experience.map((item, index) => (
            <SectionReveal key={item.id} delay={index * 0.15}>
              <TiltCard>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="glass-panel-strong relative mx-auto max-w-2xl overflow-hidden p-8 md:p-10"
                >

                  <div className="relative z-10">
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1 text-xs font-mono text-accent">
                        <Briefcase className="h-3.5 w-3.5" />
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/20 ring-1 ring-accent/30">
                        <Building2 className="h-7 w-7 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold md:text-3xl">
                          {item.position}
                        </h3>
                        <p className="mt-1 text-lg text-accent">
                          {item.institution}
                        </p>
                        <p className="mt-4 text-[var(--text-muted)] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {["Leadership", "Administration", "Education"].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--surface-soft)] px-3 py-1.5 text-xs font-medium"
                          >
                            <Award className="h-3.5 w-3.5 text-accent" />
                            {tag}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
