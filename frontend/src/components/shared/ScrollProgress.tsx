"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks";

/**
 * A thin gradient progress bar fixed at the top of the viewport.
 * Width reflects scroll progress (0-100%) through the page.
 */
export default function ScrollProgress() {
  const { progress } = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-60 h-[3px] origin-left"
      style={{ scaleX: progress }}
      aria-hidden="true"
    >
      <div className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary-light" />
      {/* Subtle glow */}
      <div className="absolute inset-0 blur-sm bg-gradient-to-r from-primary via-accent to-primary-light opacity-60" />
    </motion.div>
  );
}
