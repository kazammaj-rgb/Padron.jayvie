"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import {
    professionalSummary,
    leadershipMentorship,
    skillCategories,
    strengths,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    BadgeCheck,
    BrainCircuit,
    Code2,
    HeartHandshake,
    Laptop2,
    Layers3,
    Megaphone,
    Users,
    Rocket,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Target,
    TimerReset,
} from "lucide-react";

const skillCategoryIcons = [Laptop2, Code2, Smartphone] as const;

const strengthIcons = [
    Sparkles,
    Target,
    ShieldCheck,
    BrainCircuit,
    TimerReset,
] as const;

const leadershipIcons = [Megaphone, Users, HeartHandshake] as const;

export function SkillsStrengths() {
    return (
        <section id="skills" className="relative px-4 py-24 md:px-8 md:py-32">
            <div className="mx-auto max-w-7xl">
                <SectionReveal>
                    <div className="text-center">
                        <span className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">
                            04 — Skills & Strengths
                        </span>
                        <h2 className="section-title mt-4">
                            Skills That Support <span className="neon-text">Delivery</span>
                        </h2>
                        <p className="section-subtitle mx-auto">
                            Recruiter-friendly snapshot of my development focus, technical stack, and working strengths.
                        </p>
                    </div>
                </SectionReveal>

                <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <SectionReveal>
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="glass-panel-strong relative overflow-hidden p-6 md:p-8"
                        >
                            <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
                            <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />

                            <div className="relative z-10">
                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">
                                    <Rocket className="h-4 w-4" />
                                    Full-Stack + Mobile Focus
                                </div>

                                <h3 className="font-display text-2xl font-bold md:text-3xl">
                                    Professional Summary
                                </h3>
                                <p className="mt-4 max-w-3xl text-[var(--text-muted)] leading-relaxed md:text-lg">
                                    {professionalSummary}
                                </p>

                                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                    {skillCategories.map((category, index) => {
                                        const Icon = skillCategoryIcons[index] ?? Layers3;
                                        return (
                                            <motion.article
                                                key={category.title}
                                                whileHover={{ y: -3, scale: 1.01 }}
                                                className={cn(
                                                    "rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-cyan-400/30",
                                                    index === 0 && "bg-gradient-to-br from-cyan-400/10 to-transparent",
                                                    index === 1 && "bg-gradient-to-br from-purple-500/10 to-transparent",
                                                    index === 2 && "bg-gradient-to-br from-pink-500/10 to-transparent"
                                                )}
                                            >
                                                <div className="mb-4 flex items-center gap-3">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-white/10">
                                                        <Icon className="h-5 w-5 text-cyan-300" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-display text-base font-semibold">
                                                            {category.title}
                                                        </h4>
                                                        <p className="text-xs text-[var(--text-muted)]">
                                                            {category.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {category.skills.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs font-medium text-[var(--text-primary)]"
                                                        >
                                                            <BadgeCheck className="h-3.5 w-3.5 text-cyan-300" />
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.article>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
                                    {[
                                        "Responsive web interfaces",
                                        "Scalable application logic",
                                        "Android app development",
                                    ].map((item) => (
                                        <span
                                            key={item}
                                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
                                        >
                                            <Sparkles className="h-4 w-4 text-purple-300" />
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </SectionReveal>

                    <SectionReveal delay={0.1}>
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="glass-panel-strong p-6 md:p-8"
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-400/10 ring-1 ring-white/10">
                                    <ShieldCheck className="h-6 w-6 text-purple-300" />
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl font-bold">
                                        Strengths
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Core traits that support dependable project delivery.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                                {strengths.map((strength, index) => {
                                    const Icon = strengthIcons[index] ?? BrainCircuit;

                                    return (
                                        <motion.article
                                            key={strength.title}
                                            whileHover={{ x: 4 }}
                                            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-purple-400/30 hover:bg-purple-400/5"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-white/10 group-hover:ring-purple-400/30">
                                                    <Icon className="h-5 w-5 text-cyan-300 group-hover:text-purple-300" />
                                                </div>
                                                <div>
                                                    <h4 className="font-display text-base font-semibold text-[var(--text-primary)]">
                                                        {strength.title}
                                                    </h4>
                                                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                                                        {strength.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </SectionReveal>

                    <SectionReveal delay={0.15}>
                        <motion.div
                            whileHover={{ y: -4 }}
                            className="glass-panel-strong p-6 md:p-8"
                        >
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/10 ring-1 ring-white/10">
                                    <Users className="h-6 w-6 text-cyan-300" />
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl font-bold">
                                        {leadershipMentorship.title}
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        {leadershipMentorship.description}
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                                {leadershipMentorship.strengths.map((item, index) => {
                                    const Icon = leadershipIcons[index] ?? HeartHandshake;

                                    return (
                                        <motion.article
                                            key={item.title}
                                            whileHover={{ x: 4 }}
                                            className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950/50 ring-1 ring-white/10 group-hover:ring-cyan-400/30">
                                                    <Icon className="h-5 w-5 text-cyan-300 group-hover:text-cyan-200" />
                                                </div>
                                                <div>
                                                    <h4 className="font-display text-base font-semibold text-[var(--text-primary)]">
                                                        {item.title}
                                                    </h4>
                                                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}