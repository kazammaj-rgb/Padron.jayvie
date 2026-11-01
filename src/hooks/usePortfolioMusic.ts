"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_SRC = "/portfolioMusic.mp3";
const MUSIC_VOLUME = 0.35;
const MUTE_PREF_KEY = "portfolio-music-muted";

export function usePortfolioMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = MUSIC_VOLUME;
    audio.preload = "none";
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
      return true;
    } catch {
      setMusicPlaying(false);
      return false;
    }
  }, []);

  const pauseMusic = useCallback(() => {
    audioRef.current?.pause();
    setMusicPlaying(false);
  }, []);

  const toggleMusic = useCallback(async () => {
    if (musicPlaying) {
      pauseMusic();
      try { sessionStorage.setItem(MUTE_PREF_KEY, "true"); } catch { /* Playback still works without storage. */ }
      return;
    }

    const started = await playMusic();
    if (started) {
      try { sessionStorage.setItem(MUTE_PREF_KEY, "false"); } catch { /* Playback still works without storage. */ }
    }
  }, [musicPlaying, playMusic, pauseMusic]);

  return { musicPlaying, toggleMusic };
}
