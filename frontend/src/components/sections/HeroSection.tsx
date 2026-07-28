"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import type { Locale } from "@/types/content";

interface HeroSectionProps {
  locale: Locale;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

/* ── 拆分标语 ── */
function splitSlogan(title: string): [string, string] {
  const idx = title.search(/[，,·]/);
  if (idx === -1) return [title, ""];
  return [title.slice(0, idx), title.slice(idx + 1).trim()];
}

export default function HeroSection({ locale, title, subtitle, ctaPrimary, ctaSecondary }: HeroSectionProps) {
  const [line1, line2] = splitSlogan(title);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ── Parallax ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.72, 0.28]);
  const circle1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const circle2Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-accent"
    >
      {/* ═══════ 背景层 ═══════ */}
      <div className={mounted ? "hero-bg-animate absolute inset-0" : "absolute inset-0 opacity-0"}>
        <motion.div className="absolute inset-0 opacity-10" style={{ opacity: bgOpacity }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,white_0%,transparent_68%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ y: circle1Y }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full border border-white/10"
          style={{ y: circle2Y }}
        />
        <motion.div
          className="absolute left-10 top-1/3 h-48 w-48 rounded-full border border-white/5"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
        />
      </div>

      {/* ═══════ 内容层 ═══════ */}
      <motion.div className="section-container relative z-10 py-20" style={{ y: contentY }}>
        <div
          className={
            mounted
              ? "hero-text-animate mx-auto max-w-3xl text-center"
              : "mx-auto max-w-3xl text-center opacity-0"
          }
        >
          {/* 标签 */}
          <div className="mb-6">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              LKtechnology
            </span>
          </div>

          {/* ═══════ 主标语 — 两行依次从左侧滑入 ═══════ */}
          {/*
           * .hero-text-panel 容器已移除：backdrop-filter 边缘 + border-radius
           * 会产生可见矩形边界。文字现直接以 rgba(255,255,255,0.85) 半透本色
           * 落在背景上，无任何轮廓分隔。
           *
           * 时序：
           *   行1  → 0s 启动，0.75s ease-out，translateX(-60→0)
           *   行2  → 0.2s 延迟，0.75s ease-out，translateX(-60→0)
           */}
            <h1 className="slogan-text text-balance text-4xl font-extrabold leading-tight tracking-wide sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="sr-only">{title}</span>

              {/* 行1：从左侧滑入，0s 启动 */}
              <span className="block overflow-hidden" aria-hidden="true">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -60 }}
                  animate={mounted ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
                  transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                  {line1}
                </motion.span>
              </span>

              {/* 行2：从左侧滑入，0.2s 延迟 */}
              {line2 && (
                <span className="block overflow-hidden" aria-hidden="true">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, x: -60 }}
                    animate={mounted ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
                    transition={{ duration: 0.75, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                  >
                    {line2}
                  </motion.span>
                </span>
              )}
            </h1>

          {/* 副标题 */}
          <p className="mt-6 text-balance text-lg leading-relaxed text-white/80 sm:text-xl">
            {subtitle}
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary shadow-lg transition-all hover:bg-neutral-100 hover:shadow-xl hover:scale-105"
            >
              {ctaPrimary}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href={`/${locale}/products-services`}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-transparent px-8 py-4 text-base font-medium text-white transition-all hover:bg-white/10 hover:border-white/50"
            >
              {ctaSecondary}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <AnimatedCounter target={70} suffix="+" duration={2} className="text-3xl font-bold text-white sm:text-4xl" />
              <div className="mt-1 text-sm text-white/60">{locale === "zh-CN" ? "精英团队" : "Professionals"}</div>
            </div>
            <div className="text-center">
              <AnimatedCounter target={90} suffix="%" duration={2} className="text-3xl font-bold text-white sm:text-4xl" />
              <div className="mt-1 text-sm text-white/60">{locale === "zh-CN" ? "技术研发占比" : "R&D Engineers"}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white sm:text-4xl">2020</div>
              <div className="mt-1 text-sm text-white/60">{locale === "zh-CN" ? "成立年份" : "Founded"}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white sm:text-4xl">DAMA</div>
              <div className="mt-1 text-sm text-white/60">{locale === "zh-CN" ? "认证实施团队" : "Certified Team"}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
