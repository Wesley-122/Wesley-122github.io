"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ScrollProgressState {
  /** 0-1 scroll progress through the entire document */
  progress: number;
  /** Current vertical scroll offset in pixels */
  scrollY: number;
  /** Whether the user is scrolling down (true) or up (false) */
  scrollDirection: "down" | "up";
  /** Maximum possible scroll distance */
  maxScroll: number;
}

/**
 * Tracks document scroll progress with rAF-batched passive listener.
 * Returns scrollY, 0-1 progress, scroll direction, and max scroll distance.
 */
export function useScrollProgress(): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({
    progress: 0,
    scrollY: 0,
    scrollDirection: "down",
    maxScroll: 0,
  });

  const lastScrollY = useRef(0);
  const rafId = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafId.current) return; // already queued
    rafId.current = requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setState({
        progress: maxScroll > 0 ? currentY / maxScroll : 0,
        scrollY: currentY,
        scrollDirection: currentY >= lastScrollY.current ? "down" : "up",
        maxScroll,
      });

      lastScrollY.current = currentY;
      rafId.current = 0;
    });
  }, []);

  useEffect(() => {
    // Set initial maxScroll on mount
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    setState((prev) => ({ ...prev, maxScroll }));

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleScroll]);

  return state;
}
