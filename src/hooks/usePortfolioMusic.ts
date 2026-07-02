"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_SRC = "/portfolioMusic.mp3";
const MUSIC_VOLUME = 0.35;
const MUTE_PREF_KEY = "portfolio-music-muted";

export function usePortfolioMusic(readyToPlay: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = MUSIC_VOLUME;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      await audio.play();
      setMusicPlaying(true);
      setAutoplayBlocked(false);
      return true;
    } catch {
      setMusicPlaying(false);
      setAutoplayBlocked(true);
      return false;
    }
  }, []);

  const pauseMusic = useCallback(() => {
    audioRef.current?.pause();
    setMusicPlaying(false);
  }, []);

  useEffect(() => {
    if (!readyToPlay) return;

    const userMuted =
      typeof window !== "undefined" &&
      sessionStorage.getItem(MUTE_PREF_KEY) === "true";

    if (userMuted) {
      pauseMusic();
      return;
    }

    void playMusic();
  }, [readyToPlay, playMusic, pauseMusic]);

  const toggleMusic = useCallback(async () => {
    if (musicPlaying) {
      pauseMusic();
      sessionStorage.setItem(MUTE_PREF_KEY, "true");
      return;
    }

    const started = await playMusic();
    if (started) {
      sessionStorage.setItem(MUTE_PREF_KEY, "false");
    }
  }, [musicPlaying, playMusic, pauseMusic]);

  return { musicPlaying, toggleMusic };
}
