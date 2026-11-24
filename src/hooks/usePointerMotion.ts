"use client";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

import { useSpring } from "framer-motion";
import { useCallback, useEffect, useRef, type PointerEvent } from "react";

interface PointerMotionOptions {
  distanceX: number;
  distanceY: number;
  disabled?: boolean;
}

/** Event-driven movement with a stationary hit area and no idle animation loop. */
export function usePointerMotion({ distanceX, distanceY, disabled = false }: PointerMotionOptions) {
  const reduced = useReducedMotionPreference();
  const bounds = useRef<DOMRect | null>(null);
  const removeListeners = useRef<(() => void) | null>(null);
  const x = useSpring(0, { stiffness: 240, damping: 24, mass: 0.45 });
  const y = useSpring(0, { stiffness: 240, damping: 24, mass: 0.45 });

  const reset = useCallback(() => {
    bounds.current = null;
    removeListeners.current?.();
    removeListeners.current = null;
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    if (reduced || disabled) {
      reset();
      x.jump(0);
      y.jump(0);
    }
    return () => removeListeners.current?.();
  }, [disabled, reduced, reset, x, y]);

  const move = (event: PointerEvent<HTMLElement>) => {
    const rect = bounds.current;
    if (!rect || !rect.width || !rect.height || reduced || disabled || event.pointerType !== "mouse") return;
    const horizontal = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const vertical = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    x.set(horizontal * distanceX);
    y.set(vertical * distanceY);
  };

  return {
    x: reduced || disabled ? 0 : x,
    y: reduced || disabled ? 0 : y,
    handlers: {
      onPointerEnter: (event: PointerEvent<HTMLElement>) => {
        if (reduced || disabled || event.pointerType !== "mouse" ||
          !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        reset();
        // Read layout once on entry; movement uses this stable outer rectangle.
        bounds.current = event.currentTarget.getBoundingClientRect();
        // An inner scrolling stage can move the control without a pointer exit.
        // Listen only while hovered, then discard stale bounds on any scroll.
        window.addEventListener("scroll", reset, { capture: true, passive: true });
        window.addEventListener("resize", reset, { passive: true });
        window.addEventListener("blur", reset);
        removeListeners.current = () => {
          window.removeEventListener("scroll", reset, true);
          window.removeEventListener("resize", reset);
          window.removeEventListener("blur", reset);
        };
        move(event);
      },
      onPointerMove: move,
      onPointerLeave: reset,
      onPointerCancel: reset,
      onPointerDown: reset,
      onFocus: reset,
      onBlur: reset,
    },
  };
}
