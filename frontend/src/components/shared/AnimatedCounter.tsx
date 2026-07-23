"use client";

import { useAnimatedCounter } from "@/hooks";
import { cn } from "@/lib/cn";

interface AnimatedCounterProps {
  /** The target number to count to */
  target: number;
  /** Text to display after the number (e.g., "+", "%", "K") */
  suffix?: string;
  /** Text to display before the number */
  prefix?: string;
  /** Animation duration in seconds (default: 2) */
  duration?: number;
  /** Extra CSS classes */
  className?: string;
}

/**
 * Displays a number that animates from 0 to target when scrolled into view.
 * Shows a placeholder during SSR to avoid hydration mismatch.
 */
export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const { displayValue, ref, hasStarted } = useAnimatedCounter({
    target,
    duration,
  });

  return (
    <div ref={ref} className={cn("tabular-nums", className)} aria-label={`${prefix}${target}${suffix}`}>
      <span className={cn(!hasStarted && "opacity-0")}>
        {prefix}
        {displayValue}
        {suffix}
      </span>
    </div>
  );
}
