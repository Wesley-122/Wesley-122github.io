"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * PageBanner — 全站子页面顶部栏统一组件
 *
 * 视觉风格与首页 HeroSection 主标语一致：
 *   - 文字渐变填充（纯白 → 浅蓝）
 *   - 三层蓝色荧光 text-shadow
 *   - 1.8s 淡入动画
 *   - 几何装饰随滚动视差漂移
 */

interface PageBannerProps {
  title: string;
  subtitle?: string;
}

const bannerFadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.8, ease: "easeOut" as const },
};

const subtitleFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.2, delay: 0.4, ease: "easeOut" as const },
};

export default function PageBanner({ title, subtitle }: PageBannerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Decorative circles drift at different speeds for parallax depth
  const circleTopY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const circleBottomY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-20"
    >
      {/* 几何装饰 — 视差漂移 */}
      <div className="absolute inset-0 opacity-[0.06]">
        <motion.div
          className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full border border-white"
          style={{ y: circleTopY }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 h-48 w-48 -translate-x-1/2 rounded-full border border-white"
          style={{ y: circleBottomY }}
        />
        {/* Extra subtle decoration */}
        <motion.div
          className="absolute left-0 top-1/2 h-32 w-32 -translate-x-1/2 rounded-full border border-white/50"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
        />
      </div>

      <div className="section-container relative z-10 text-center">
        <motion.h1
          className="banner-title text-balance text-4xl font-extrabold md:text-5xl"
          {...bannerFadeIn}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-lg text-white/55"
            {...subtitleFadeIn}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
