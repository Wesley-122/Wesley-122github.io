"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  milestones: Milestone[];
}

/* ── 卡片滑入变体：左右交替 ── */
const cardSlideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1.0] as const },
  },
};

const cardSlideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1.0] as const },
  },
};

export default function Timeline({ milestones }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── 整条时间线的滚动进度 ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 25%"],
  });

  /* 线条从 0 到完整高度随滚动显现 */
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* ═══════ 垂直时间线（桌面端） ═══════ */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 hidden md:block">
        {/* 背景线（弱化） */}
        <div className="absolute inset-0 bg-neutral-200" />
        {/* 前景线（随滚动绘制，渐变从透明到品牌蓝再到透明） */}
        <motion.div
          className="absolute inset-0 origin-top bg-gradient-to-b from-transparent via-primary to-transparent"
          style={{ scaleY: lineScaleY }}
        />
      </div>

      <div className="space-y-16 md:space-y-20">
        {milestones.map((milestone, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={milestone.year}
              className={cn(
                "relative flex flex-col items-center gap-6 md:gap-8",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              )}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                // 每个卡片在前一个出现 0.2s 后开始
                delayChildren: index * 0.05,
              }}
            >
              {/* ── 卡片内容 ── */}
              <div className={cn("flex-1 w-full", isEven ? "md:text-right" : "md:text-left")}>
                <motion.div
                  className="card relative overflow-hidden p-6 group"
                  variants={isEven ? cardSlideLeft : cardSlideRight}
                >
                  {/* 卡片内部品牌色微光条 */}
                  <div
                    className={cn(
                      "absolute top-0 h-1 w-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      isEven ? "left-0" : "right-0"
                    )}
                  />

                  {/* 年份徽章 */}
                  <motion.span
                    className="inline-block rounded-full bg-primary px-3.5 py-1 text-xs font-bold text-white mb-3 shadow-md shadow-primary/20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                  >
                    {milestone.year}
                  </motion.span>

                  <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary transition-colors">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {milestone.description}
                  </p>
                </motion.div>
              </div>

              {/* ── 中心点 ── */}
              <motion.div
                className="relative z-10 hidden md:flex items-center justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* 外圈波纹 */}
                <motion.div
                  className="absolute h-6 w-6 rounded-full bg-primary/15"
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: {
                      scale: [0, 1.6, 1],
                      opacity: [0, 0.4, 0],
                      transition: { duration: 1.2, delay: 0.3, ease: "easeOut" },
                    },
                  }}
                />
                {/* 内圈实心点 */}
                <motion.div
                  className="relative h-3 w-3 rounded-full bg-primary shadow-md shadow-primary/30"
                  variants={{
                    hidden: { scale: 0 },
                    visible: {
                      scale: 1,
                      transition: { duration: 0.35, delay: 0.25, ease: "easeOut" },
                    },
                  }}
                />
                {/* 光环 */}
                <motion.div
                  className="absolute h-4 w-4 rounded-full border border-primary/25"
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: { duration: 0.5, delay: 0.35, ease: "easeOut" },
                    },
                  }}
                />
              </motion.div>

              {/* 移动端圆点（左侧） */}
              <motion.div
                className="absolute left-0 top-7 md:hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-primary shadow-md shadow-primary/30"
                  variants={{
                    hidden: { scale: 0 },
                    visible: { scale: 1, transition: { duration: 0.3, delay: 0.2 } },
                  }}
                />
              </motion.div>

              {/* ── 占位（另一侧） ── */}
              <div className="flex-1 hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
