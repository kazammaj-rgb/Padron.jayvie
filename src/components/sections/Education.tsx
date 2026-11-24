"use client";

import { education } from "@/lib/data";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ImageViewer } from "@/components/ui/ImageViewer";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Education() {
  return (
    <section id="education" className="editorial-section relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <div className="section-header">
            <span className="section-kicker font-mono text-sm uppercase tracking-[0.3em] text-accent">03 — Education</span>
            <h2 className="section-title mt-4">Academic <span className="neon-text">Journey</span></h2>
            <p className="section-subtitle">Complete educational background — from elementary to college.</p>
          </div>
        </SectionReveal>

        <ol className="education-timeline">
          {education.map((item, index) => (
            <li key={item.id} className="education-timeline-item">
              <SectionReveal delay={index * 0.03}>
                <article className={`education-entry group ${index === 0 ? "education-entry-current" : ""}`}>
                  <div className="education-period">
                    <span className="chapter-index">0{education.length - index}</span>
                    <span className="education-batch">{item.batch}</span>
                    {index === 0 && <span className="education-current"><span aria-hidden="true" />Currently studying</span>}
                  </div>
                  <div className="education-entry-copy">
                    <span className="editorial-label">{item.level}</span>
                    <h3>{item.school}</h3>
                    <p>{item.course}</p>
                  </div>
                  <ImageViewer src={item.image} alt={`${item.school} photo`} className="education-photo">
                    <Image src={item.image} alt={`${item.school} photo`} fill
                      sizes="(min-width: 1280px) 280px, (min-width: 768px) 220px, 80vw"
                      className="object-cover" />
                    <span className="education-photo-shade" aria-hidden="true" />
                    <span className="education-photo-label">View photo <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></span>
                  </ImageViewer>
                </article>
              </SectionReveal>
            </li>
          ))}
        </ol>

        <SectionReveal>
          <div className="education-footnote">
            <GraduationCap aria-hidden="true" className="h-5 w-5 text-accent" />
            <span>Currently pursuing BS Information Technology</span>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
