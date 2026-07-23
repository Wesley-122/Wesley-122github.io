"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";

type AnimationDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  /** Animation direction (default: "up") */
  direction?: AnimationDirection;
  /** Delay in seconds before animation starts (default: 0) */
  delay?: number;
  /** Animation duration in seconds (default: 0.6) */
  duration?: number;
  /** How far the element travels (px). Default: 30 */
  distance?: number;
  /** Whether animation only plays once (default: true) */
  once?: boolean;
  /** Viewport margin trigger (default: "-50px") */
  margin?: string;
}

const directionVariants: Record<AnimationDirection, Variants> = {
  up: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

/**
 * Minimal reusable scroll-triggered animation wrapper.
 * Consolidates the most-repeated pattern in the codebase:
 *   whileInView + viewport + transition
 *
 * Usage:
 *   <FadeInView delay={0.2}>
 *     <Card />
 *   </FadeInView>
 */
export default function FadeInView({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  once = true,
  margin = "-50px",
}: FadeInViewProps) {
  // Build variants with custom distance
  const variants: Variants = {
    hidden: (() => {
      switch (direction) {
        case "up":    return { opacity: 0, y: distance };
        case "down":  return { opacity: 0, y: -distance };
        case "left":  return { opacity: 0, x: -distance };
        case "right": return { opacity: 0, x: distance };
        case "none":  return { opacity: 0 };
        default:      return { opacity: 0, y: distance };
      }
    })(),
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // easeOutQuad
      }}
    >
      {children}
    </motion.div>
  );
}
