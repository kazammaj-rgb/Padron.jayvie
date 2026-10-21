"use client";

import { SocialLinksBar } from "@/components/ui/SocialLinksBar";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { BriefcaseBusiness, FolderKanban, GraduationCap, Home, Mail, Moon, Sun, UserRound, Volume2, VolumeX, Wrench } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
}

const sectionIcons = {
  home: Home,
  personal: UserRound,
  education: GraduationCap,
  experience: BriefcaseBusiness,
  skills: Wrench,
  projects: FolderKanban,
  contact: Mail,
};

export function Navbar({ activeSection, onNavigate, musicPlaying, onToggleMusic }: NavbarProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <aside className="portfolio-sidebar fixed inset-y-0 left-0 z-50 flex w-[4.5rem] flex-col border-r border-[var(--glass-border)] bg-[var(--bg-secondary)] px-2 py-4 lg:w-60 lg:px-5 lg:py-6">
      <button
        type="button"
        onClick={() => onNavigate("home")}
        className="mb-8 flex items-center justify-center gap-3 rounded-xl p-2 text-left hover:bg-white/5 lg:justify-start"
        aria-label="Go to home"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d97757] font-display text-lg font-bold text-[#211914]">JP</span>
        <span className="hidden text-sm font-semibold text-[var(--text-primary)] lg:block">Jayvie Padron<span className="mt-1 block text-xs font-normal text-[var(--text-muted)]">Portfolio</span></span>
      </button>

      <p className="mb-2 hidden px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] lg:block">Explore</p>
      <nav aria-label="Portfolio sections" className="flex-1">
        <ul className="flex flex-col gap-1">
          {navLinks.map(({ id, label }) => {
            const Icon = sectionIcons[id as keyof typeof sectionIcons];
            const active = activeSection === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onNavigate(id)}
                  aria-current={active ? "page" : undefined}
                  title={label}
                  className={cn(
                    "flex w-full items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors lg:justify-start",
                    active ? "bg-[#d97757]/15 text-[#d97757]" : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)]"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="hidden lg:block">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mb-4 hidden border-t border-[var(--glass-border)] pt-4 lg:block">
        <SocialLinksBar size="sm" />
        <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
          “Maybe you&apos;re not the best, but at least you&apos;re not the worst either.”
        </p>
        <p className="mt-2 text-[10px] text-[var(--text-muted)]">Jesus loves you · Portfolio v2.0</p>
      </div>
      <div className="flex flex-col items-center gap-2 border-t border-[var(--glass-border)] pt-4 lg:flex-row">
        <button
          type="button"
          onClick={onToggleMusic}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)]"
          aria-label={musicPlaying ? "Turn music off" : "Turn music on"}
          title={musicPlaying ? "Mute portfolio music" : "Play portfolio music"}
        >
          {musicPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>
        {mounted && (
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)]"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        )}
      </div>
      <p className="mt-3 hidden text-center text-[10px] text-[var(--text-muted)] lg:block">© {new Date().getFullYear()} Jayvie</p>
    </aside>
  );
}
