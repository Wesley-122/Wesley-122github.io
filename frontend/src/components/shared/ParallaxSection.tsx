"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Speed multiplier. 0 = fixed (doesn't move), 0.5 = half speed, 1 = normal scroll. Default: 0.5 */
  speed?: number;
  /** Direction of parallax. "up" = moves slower than scroll (rises), "down" = moves faster. Default: "up" */
  direction?: "up" | "down";
}

/**
 * Wraps content in a parallax container that moves at a different speed
 * relative to the page scroll. Uses framer-motion useScroll + useTransform
 * for GPU-composited performance.
 *
 * Use this for decorative background elements and geometric shapes
 * to create depth on scroll.
 */
export default function ParallaxSection({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // When speed=0.5, element moves at half the scroll speed
  // range: scroll from 0 to 1 → element moves by speed fraction of viewport
  const yRange = direction === "up" ? [speed * 100, -speed * 100] : [-speed * 100, speed * 100];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div
      ref={containerRef}
      style={{ y }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
