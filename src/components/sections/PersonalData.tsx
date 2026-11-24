"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { personalData } from "@/lib/data";
import { calculateAge } from "@/lib/utils";
import { ArrowUpRight, Music2 } from "lucide-react";

const milestones = [
  { year: "2002", event: "Born — April 5" },
  { year: "2013", event: "Elementary Graduate" },
  { year: "2024", event: "BS IT — ISU Cauayan" },
  { year: "Now", event: "Building the future" },
];

export function PersonalData() {
  const age = calculateAge(personalData.birthDate);
  const identityWithAge = personalData.identity.map((item) =>
    item.label === "Age" ? { ...item, value: String(age) } : item
  );
  const details = [
    { title: "Identity", data: identityWithAge },
    { title: "Location", data: personalData.location },
    { title: "Personal", data: personalData.personal },
  ];

  return (
    <section id="personal" className="editorial-section relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="section-header personal-intro">
            <div>
              <span className="section-kicker font-mono text-sm uppercase tracking-[0.3em] text-accent">02 — Personal Data</span>
              <h2 className="section-title mt-4">About <span className="neon-text">Me</span></h2>
              <span className="chapter-note">The person behind the work.</span>
            </div>
            <p className="section-subtitle">
              I&apos;m a Full-Stack and Mobile Application Developer focused on creating modern, efficient, and user-friendly websites and mobile applications. As a student, I am available for full-time night-shift roles and part-time opportunities. I am dedicated to meeting client expectations, delivering quality work on schedule, and continuously improving my skills to provide the best possible solutions.
            </p>
          </div>
        </SectionReveal>

        <div className="personal-stats">
          {[
            { label: "Age", value: age, suffix: "" },
            { label: "Languages", value: 3, suffix: "" },
            { label: "Talents", value: 3, suffix: "" },
            { label: "Years", value: age, suffix: "+" },
          ].map((stat, index) => (
            <SectionReveal key={stat.label} delay={index * 0.06}>
              <div className="personal-stat">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <p>{stat.label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="personal-details">
          {details.map((detail, index) => (
            <SectionReveal key={detail.title} delay={index * 0.08}>
              <article className="personal-detail-card">
                <div className="editorial-card-heading">
                  <span className="chapter-index">0{index + 1}</span>
                  <h3>{detail.title}</h3>
                  <ArrowUpRight aria-hidden="true" className="ml-auto h-4 w-4 text-accent" />
                </div>
                <dl className="personal-data-list">
                  {detail.data.map((item) => (
                    <div key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="personal-timeline">
            <div className="editorial-subheading">
              <h3>Timeline Flow</h3>
              <span>2002 — Present</span>
            </div>
            <ol className="milestone-list">
              {milestones.map((item, index) => (
                <li key={item.year}>
                  <span className="milestone-marker" aria-hidden="true">0{index + 1}</span>
                  <div><span className="milestone-year">{item.year}</span><p>{item.event}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="personal-interests">
            <span className="chapter-note">Beyond the screen</span>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {["Singer", "Musician", "Music Director"].map((talent) => (
                <span key={talent} className="inline-flex items-center gap-2 text-sm">
                  <Music2 aria-hidden="true" className="h-3.5 w-3.5 text-accent" />{talent}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
