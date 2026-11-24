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
import { CinematicOverlay } from "@/components/effects/CinematicOverlay";
import { usePortfolioMusic } from "@/hooks/usePortfolioMusic";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { navLinks } from "@/lib/data";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const { musicPlaying, toggleMusic } = usePortfolioMusic();
  const stageRef = useRef<HTMLDivElement>(null);
  const requestedSection = useRef("home");
  const settledSection = useRef<string | null>(null);
  const pendingFocus = useRef<string | null>(null);
  const completeLoading = useCallback(() => setLoading(false), []);
  const chapterIndex = navLinks.findIndex((link) => link.id === activeSection);
  const previousChapter = navLinks[(chapterIndex - 1 + navLinks.length) % navLinks.length];
  const nextChapter = navLinks[(chapterIndex + 1) % navLinks.length];
  const resetStage = useCallback(() => {
    if (stageRef.current) stageRef.current.scrollTop = 0;
  }, []);
  const finishNavigation = useCallback((id: string) => {
    // A newer request can arrive while the previous page is still exiting.
    if (requestedSection.current !== id) return;
    settledSection.current = id;
    if (pendingFocus.current !== id) return;
    const content = document.getElementById("portfolio-content");
    if (content?.dataset.section === id) {
      content.focus({ preventScroll: true });
      pendingFocus.current = null;
    }
  }, []);
  const navigate = useCallback((id: string) => {
    if (!navLinks.some((link) => link.id === id)) return;
    pendingFocus.current = id;
    if (requestedSection.current === id) {
      if (settledSection.current === id) {
        resetStage();
        finishNavigation(id);
      }
      return;
    }
    requestedSection.current = id;
    settledSection.current = null;
    setActiveSection(id);
  }, [finishNavigation, resetStage]);

  useEffect(() => {
    const handleNavigation = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id;
      if (id) navigate(id);
    };
    window.addEventListener("portfolio:navigate", handleNavigation);
    return () => window.removeEventListener("portfolio:navigate", handleNavigation);
  }, [navigate]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.documentElement.classList.add("fixed-portfolio");
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.classList.remove("fixed-portfolio");
      document.body.style.overflow = previousOverflow;
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
        <CinematicOverlay />
        <AnimatePresence mode="wait">
          <PageEntrance key={activeSection} onEnterStart={resetStage} onEnterComplete={() => finishNavigation(activeSection)}>
            <main id="portfolio-content" data-section={activeSection} tabIndex={-1} className="relative z-10">
              {activeSection === "home" && <Hero />}
              {activeSection === "personal" && <PersonalData />}
              {activeSection === "education" && <Education />}
              {activeSection === "experience" && <Experience />}
              {activeSection === "skills" && <SkillsStrengths />}
              {activeSection === "projects" && <Projects />}
              {activeSection === "contact" && <Contact />}
              {activeSection !== "home" && (
                <nav className="chapter-navigation" aria-label="Continue exploring">
                  <button type="button" className="chapter-link" onClick={() => navigate(previousChapter.id)}>
                    <ArrowLeft aria-hidden="true" />
                    <span><small>Previous chapter</small><strong>{previousChapter.label}</strong></span>
                  </button>
                  <button type="button" className="chapter-link" onClick={() => navigate(nextChapter.id)}>
                    <span><small>{nextChapter.id === "home" ? "Back to the beginning" : "Next chapter"}</small><strong>{nextChapter.label}</strong></span>
                    <ArrowUpRight aria-hidden="true" />
                  </button>
                </nav>
              )}
            </main>
          </PageEntrance>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
