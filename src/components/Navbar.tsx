"use client";

import { SocialLinksBar } from "@/components/ui/SocialLinksBar";
import { navLinks } from "@/lib/data";
import { cn, scrollToSection } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/hooks/useTheme";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavbarProps {
  musicPlaying: boolean;
  onToggleMusic: () => void;
}

export function Navbar({ musicPlaying, onToggleMusic }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(navLinks.map((l) => l.id));
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 px-4 py-3 transition-all duration-500 md:px-8",
          scrolled && "py-2"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6",
            scrolled
              ? "glass-panel-strong shadow-neon backdrop-blur-2xl"
              : "bg-transparent"
          )}
        >
          <button
            onClick={() => handleNav("home")}
            className="font-display text-lg font-bold tracking-tight transition-opacity hover:opacity-80 md:text-xl"
          >
            <span className="neon-text">JP</span>
            <span className="ml-2 hidden text-[var(--text-primary)] sm:inline">
              Portfolio
            </span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
                    activeId === link.id
                      ? "text-cyan-400"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {link.label}
                  {activeId === link.id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 -z-10 rounded-lg bg-cyan-400/10 ring-1 ring-cyan-400/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMusic}
              className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:shadow-neon"
              aria-label={musicPlaying ? "Turn music off" : "Turn music on"}
              title={musicPlaying ? "Mute portfolio music" : "Play portfolio music"}
            >
              {musicPlaying ? (
                <Volume2 className="h-4 w-4 text-cyan-400" />
              ) : (
                <VolumeX className="h-4 w-4 text-[var(--text-muted)]" />
              )}
            </button>

            {mounted && (
              <button
                onClick={toggleTheme}
                className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:shadow-neon"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-purple-500" />
                )}
              </button>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 z-[61] flex h-full w-72 flex-col glass-panel-strong p-6 lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display font-bold neon-text">Menu</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => handleNav(link.id)}
                      className={cn(
                        "w-full rounded-xl px-4 py-3 text-left font-medium transition-colors",
                        activeId === link.id
                          ? "bg-cyan-400/10 text-cyan-400"
                          : "hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-cyan-400/80">
                  Social
                </p>
                <SocialLinksBar size="sm" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
