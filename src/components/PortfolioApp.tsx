"use client";

import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { PersonalData } from "@/components/sections/PersonalData";
import { SkillsStrengths } from "@/components/sections/SkillsStrengths";
import { Projects } from "@/components/sections/Projects";
import { PageEntrance } from "@/components/PageEntrance";
import { usePortfolioMusic } from "@/hooks/usePortfolioMusic";
import { MotionConfig } from "framer-motion";
import { navLinks } from "@/lib/data";
import { useCallback, useEffect, useRef, useState } from "react";

export function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const { musicPlaying, toggleMusic } = usePortfolioMusic();
  const stageRef = useRef<HTMLDivElement>(null);
  const navigated = useRef(false);
  const completeLoading = useCallback(() => setLoading(false), []);
  const navigate = useCallback((id: string) => {
    if (!navLinks.some((link) => link.id === id)) return;
    navigated.current = true;
    setActiveSection(id);
  }, []);

  useEffect(() => {
    const handleNavigation = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id;
      if (id) navigate(id);
    };
    window.addEventListener("portfolio:navigate", handleNavigation);
    return () => window.removeEventListener("portfolio:navigate", handleNavigation);
  }, [navigate]);

  useEffect(() => {
    const stage = stageRef.current;
    if (stage) stage.scrollTop = 0;
    if (navigated.current) {
      document.getElementById("portfolio-content")?.focus({ preventScroll: true });
    }
  }, [activeSection]);

  useEffect(() => {
    document.documentElement.classList.add("fixed-portfolio");
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.classList.remove("fixed-portfolio");
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {loading && <LoadingScreen onComplete={completeLoading} />}

      <a href="#portfolio-content" className="skip-link">Skip to content</a>
      <Navbar
        activeSection={activeSection}
        onNavigate={navigate}
        musicPlaying={musicPlaying}
        onToggleMusic={toggleMusic}
      />

      <div className="portfolio-stage" ref={stageRef}>
        <PageEntrance key={activeSection}>
          <main id="portfolio-content" tabIndex={-1} className="relative z-10">
            {activeSection === "home" && <Hero />}
            {activeSection === "personal" && <PersonalData />}
            {activeSection === "education" && <Education />}
            {activeSection === "experience" && <Experience />}
            {activeSection === "skills" && <SkillsStrengths />}
            {activeSection === "projects" && <Projects />}
            {activeSection === "contact" && <Contact />}
          </main>
        </PageEntrance>
      </div>
    </MotionConfig>
  );
}
