"use client";

import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { FloatingGradients } from "@/components/effects/FloatingGradients";
import { GridPerspective } from "@/components/effects/GridPerspective";
import { ParticleField } from "@/components/effects/ParticleField";
import dynamic from "next/dynamic";
import { Footer } from "@/components/Footer";
import { GsapScrollProvider } from "@/components/GsapScrollProvider";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { PersonalData } from "@/components/sections/PersonalData";
import { SkillsStrengths } from "@/components/sections/SkillsStrengths";
import { Projects } from "@/components/sections/Projects";
import { CinematicOverlay } from "@/components/effects/CinematicOverlay";
import { LightBeams } from "@/components/effects/LightBeams";
import { PageEntrance } from "@/components/PageEntrance";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { usePortfolioMusic } from "@/hooks/usePortfolioMusic";
import { useEffect, useState } from "react";

const ThreeBackground = dynamic(
  () =>
    import("@/components/effects/ThreeBackground").then((m) => m.ThreeBackground),
  { ssr: false }
);

export function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  const { musicPlaying, toggleMusic } = usePortfolioMusic(!loading);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <GsapScrollProvider>
        {/* Layered cinematic background */}
        <div className="mesh-bg parallax-bg fixed inset-0 -z-20" aria-hidden />
        <AuroraBackground />
        <FloatingGradients />
        <GridPerspective />
        <ThreeBackground />
        <ParticleField />
        <LightBeams />
        <CinematicOverlay />
        <div className="noise-overlay fixed inset-0 -z-10 opacity-[0.03]" aria-hidden />

        <ScrollProgress />
        <CursorGlow />

        <Navbar musicPlaying={musicPlaying} onToggleMusic={toggleMusic} />

        <PageEntrance>
          <main className="relative z-10">
            <Hero />
            <SectionDivider />
            <PersonalData />
            <SectionDivider flip />
            <Education />
            <SectionDivider />
            <Experience />
            <SectionDivider flip />
            <SkillsStrengths />
            <SectionDivider />
            <Projects />
            <SectionDivider flip />
            <Contact />
          </main>

          <Footer />
        </PageEntrance>
      </GsapScrollProvider>
    </>
  );
}
