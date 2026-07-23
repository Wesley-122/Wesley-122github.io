"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface UseAnimatedCounterOptions {
  /** The target number to count to */
  target: number;
  /** Animation duration in seconds (default: 2) */
  duration?: number;
  /** Whether to only animate once (default: true) */
  once?: boolean;
  /** Easing function — "easeOut" (default) or "linear" */
  easing?: "easeOut" | "linear";
}

interface UseAnimatedCounterResult {
  /** Current displayed value */
  displayValue: number;
  /** Ref to attach to the element that triggers animation */
  ref: React.RefObject<HTMLDivElement | null>;
  /** Whether animation has started */
  hasStarted: boolean;
  /** Whether animation has completed */
  hasCompleted: boolean;
}

/**
 * Animates a number from 0 to target when the element scrolls into view.
 * Uses framer-motion's useInView for trigger and manual frame interpolation
 * with requestAnimationFrame for the counting effect.
 */
export function useAnimatedCounter({
  target,
  duration = 2,
  once = true,
  easing = "easeOut",
}: UseAnimatedCounterOptions): UseAnimatedCounterResult {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const hasAnimatedRef = useRef(false);

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;
    setHasStarted(true);

    // If reduced motion, snap to target immediately
    if (prefersReducedMotion.current) {
      setDisplayValue(target);
      setHasCompleted(true);
      return;
    }

    startTimeRef.current = performance.now();

    const easeOut = (t: number): number => {
      return 1 - Math.pow(1 - t, 3); // cubic ease-out
    };

    const linear = (t: number): number => t;

    const easeFn = easing === "linear" ? linear : easeOut;

    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000; // seconds
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeFn(progress);

      setDisplayValue(Math.round(easedProgress * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
        setHasCompleted(true);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, target, duration, easing]);

  return { displayValue, ref, hasStarted, hasCompleted };
}
