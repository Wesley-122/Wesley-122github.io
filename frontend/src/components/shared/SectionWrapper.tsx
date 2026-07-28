"use client";

import { cn } from "@/lib/cn";
import { motion, type Variants } from "framer-motion";

type AnimationVariant = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up" | "none";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  alt?: boolean;
  /** Animation variant for the section content (default: "fade-up") */
  variant?: AnimationVariant;
  /** Viewport margin trigger (default: "-100px") */
  margin?: string;
  /** Duration in seconds (default: 0.6) */
  duration?: number;
}

const variantMap: Record<AnimationVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

/**
 * Section wrapper with scroll-triggered content animation.
 *
 * For staggered child animations, wrap individual children in <FadeInView> with
 * different delays instead of relying on variant propagation.
 */
export default function SectionWrapper({
  children,
  className,
  id,
  alt,
  variant = "fade-up",
  margin = "0px",
  duration = 0.6,
}: SectionWrapperProps) {
  const variants = variantMap[variant];

  return (
    <section
      id={id}
      className={cn("section-padding", alt && "section-alt", className)}
    >
      {variant === "none" ? (
        <div className="section-container">{children}</div>
      ) : (
        <motion.div
          className="section-container"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin }}
          transition={{
            duration,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
