"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { personalData } from "@/lib/data";
import { calculateAge } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Cake,
  Globe,
  Heart,
  MapPin,
  User,
} from "lucide-react";

const baseCardConfig = [
  {
    title: "Identity",
    icon: User,
    gradient: "from-accent/20 to-accent/10",
  },
  {
    title: "Location",
    icon: MapPin,
    gradient: "from-accent/20 to-accent/10",
  },
  {
    title: "Personal",
    icon: Heart,
    gradient: "from-accent/20 to-accent/10",
  },
] as const;

export function PersonalData() {
  const age = calculateAge(personalData.birthDate);

  const identityWithAge = personalData.identity.map((item) =>
    item.label === "Age" ? { ...item, value: String(age) } : item
  );

  const cardConfig = [
    { ...baseCardConfig[0], data: identityWithAge },
    { ...baseCardConfig[1], data: personalData.location },
    { ...baseCardConfig[2], data: personalData.personal },
  ];

  return (
    <section
      id="personal"
      className="relative px-4 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="text-center">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
              01 — Personal Data
            </span>
            <h2 className="section-title mt-4">
              About <span className="neon-text">Me</span>
            </h2>
            <p className="section-subtitle mx-auto">
              I&apos;m a Full-Stack and Mobile Application Developer focused on creating modern, efficient, and user-friendly websites and mobile applications. As a student, I am available for full-time night-shift roles and part-time opportunities. I am dedicated to meeting client expectations, delivering quality work on schedule, and continuously improving my skills to provide the best possible solutions.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Age", value: age, suffix: "" },
            { label: "Languages", value: 3, suffix: "" },
            { label: "Talents", value: 3, suffix: "" },
            { label: "Years", value: age, suffix: "+" },
          ].map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.1}>
              <div className="glass-panel p-6 text-center">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm text-[var(--text-muted)]">{stat.label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {cardConfig.map((card, cardIndex) => (
            <SectionReveal key={card.title} delay={cardIndex * 0.15}>
              <TiltCard>
                <motion.div
                  data-reveal="" whileHover={{ y: -2 }}
                  className={`glass-panel-strong overflow-hidden bg-gradient-to-br ${card.gradient} p-6 md:p-8`}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/30">
                      <card.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-display text-xl font-bold">{card.title}</h3>
                  </div>

                  <ul className="space-y-4">
                    {card.data.map((item, i) => (
                      <motion.li
                        data-reveal="" key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: i * 0.05 }}
                        className="group border-b border-[var(--glass-border)] pb-4 last:border-0"
                      >
                        <span className="text-xs font-mono uppercase tracking-wider text-accent/80">
                          {item.label}
                        </span>
                        <p className="mt-1 text-sm font-medium text-[var(--text-primary)] md:text-base">
                          {item.value}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-16 glass-panel p-8">
            <h3 className="mb-8 flex items-center gap-2 font-display text-xl font-bold">
              <Cake className="h-5 w-5 text-accent" />
              Timeline Flow
            </h3>
            <div className="relative flex flex-col gap-0 md:flex-row md:justify-between">
              <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-accent via-accent to-accent md:left-0 md:top-1/2 md:block md:h-px md:w-full md:-translate-y-1/2" />
              {[
                { year: "2002", event: "Born — April 5" },
                { year: "2013", event: "Elementary Graduate" },
                { year: "2024", event: "BS IT — ISU Cauayan" },
                { year: "Now", event: "Building the future" },
              ].map((item, i) => (
                <motion.div
                  data-reveal="" key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex items-start gap-4 pb-8 md:flex-col md:items-center md:pb-0 md:text-center"
                >
                  <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent text-xs font-bold text-[var(--text-primary)]">
                    {i + 1}
                  </div>
                  <div>
                    <span className="font-mono text-accent">{item.year}</span>
                    <p className="text-sm text-[var(--text-muted)]">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {["Singer", "Musician", "Music Director"].map((talent) => (
              <span
                key={talent}
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-5 py-2 text-sm font-medium"
              >
                <Globe className="h-4 w-4 text-accent" />
                {talent}
              </span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
