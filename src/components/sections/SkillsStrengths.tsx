"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { professionalSummary, leadershipMentorship, skillCategories, strengths } from "@/lib/data";
import { ArrowUpRight, BrainCircuit, Code2, HeartHandshake, Laptop2, Layers3, Megaphone, ShieldCheck, Smartphone, Sparkles, Target, TimerReset, Users } from "lucide-react";

const skillCategoryIcons = [Laptop2, Code2, Smartphone] as const;
const strengthIcons = [Sparkles, Target, ShieldCheck, BrainCircuit, TimerReset] as const;
const leadershipIcons = [Megaphone, Users, HeartHandshake] as const;

export function SkillsStrengths() {
  return (
    <section id="skills" className="editorial-section relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="section-header">
            <span className="section-kicker font-mono text-sm uppercase tracking-[0.3em] text-accent">05 — Skills &amp; Strengths</span>
            <h2 className="section-title mt-4">Skills That Support <span className="neon-text">Delivery</span></h2>
            <p className="section-subtitle">Recruiter-friendly snapshot of my development focus, technical stack, and working strengths.</p>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="skills-summary">
            <div>
              <span className="editorial-label">Full-Stack + Mobile Focus</span>
              <h3>Professional<br className="hidden md:block" /> Summary</h3>
            </div>
            <p>{professionalSummary}</p>
          </div>
        </SectionReveal>

        <div className="skill-categories">
          {skillCategories.map((category, index) => {
            const Icon = skillCategoryIcons[index] ?? Layers3;
            return (
              <SectionReveal key={category.title} delay={index * 0.06}>
                <article className="skill-category">
                  <div className="skill-category-top"><Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.25} /><span>0{index + 1}</span></div>
                  <h4>{category.title}</h4>
                  <p>{category.description}</p>
                  <ul className="skill-stack">
                    {category.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </article>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal>
          <div className="skills-focus">
            {["Responsive web interfaces", "Scalable application logic", "Android app development"].map((item) => (
              <span key={item}><ArrowUpRight aria-hidden="true" className="h-4 w-4" />{item}</span>
            ))}
          </div>
        </SectionReveal>

        <div className="skills-traits-layout">
          <SectionReveal>
            <div className="skills-traits">
              <div className="skills-traits-heading"><span className="editorial-label">How I work</span><h3>Strengths</h3><p>Core traits that support dependable project delivery.</p></div>
              <div>
                {strengths.map((strength, index) => {
                  const Icon = strengthIcons[index] ?? BrainCircuit;
                  return (
                    <article key={strength.title} className="trait-row">
                      <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.4} />
                      <div><h4>{strength.title}</h4><p>{strength.description}</p></div>
                    </article>
                  );
                })}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.08}>
            <div className="skills-traits">
              <div className="skills-traits-heading"><span className="editorial-label">Growing together</span><h3>{leadershipMentorship.title}</h3><p>{leadershipMentorship.description}</p></div>
              <div>
                {leadershipMentorship.strengths.map((item, index) => {
                  const Icon = leadershipIcons[index] ?? HeartHandshake;
                  return (
                    <article key={item.title} className="trait-row">
                      <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.4} />
                      <div><h4>{item.title}</h4><p>{item.description}</p></div>
                    </article>
                  );
                })}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
