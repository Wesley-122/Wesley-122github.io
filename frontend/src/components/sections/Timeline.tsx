"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  milestones: Milestone[];
}

const CARD_WIDTH = 380;
const CARD_GAP = 48;
const H_PAD = 200;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Timeline({ milestones }: TimelineProps) {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [vw, setVw] = useState(1440);

  useEffect(() => {
    setMounted(true);
    const check = () => {
      setIsDesktop(window.innerWidth >= 768);
      setVw(window.innerWidth);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 右侧额外留白 = 视口一半 − 卡片一半，确保最后一个节点能滚到屏幕正中央
  const endPad = Math.max(0, vw / 2 - CARD_WIDTH / 2);
  const trackWidth = milestones.length * CARD_WIDTH + (milestones.length - 1) * CARD_GAP + H_PAD + endPad;
  const scrollDistance = Math.max(0, trackWidth - vw);

  /* ── 桌面 Sticky Scroll ── */
  const desktopRef = useRef<HTMLDivElement>(null);

  // target 元素通过 JS 条件渲染确保挂载时非 display:none，Framer Motion 能正确测量
  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -scrollDistance], {
    clamp: true,
  });

  // 服务端/移动端首帧不渲染桌面版，避免 SSR hydration 和 Framer Motion 测量问题
  if (!mounted) {
    return <div style={{ height: 400 }} />; // 占位，避免布局抖动
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
           Desktop (md+) — Sticky Scroll 水平时间轴
           ═══════════════════════════════════════════════════════════ */}
      {isDesktop && (
        <div
          ref={desktopRef}
          className="relative"
          style={{ height: "350vh" }}
        >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-white">
          {/* 渐变遮罩 */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-transparent to-white" />

          {/* 水平轨道 */}
          <motion.div
            className="flex h-[500px] items-stretch"
            style={{ x, paddingLeft: H_PAD, paddingRight: endPad }}
          >
            {milestones.map((milestone, i) => {
              const above = i % 2 === 1;
              return (
                <div
                  key={milestone.year}
                  className="relative flex flex-shrink-0 flex-col items-center justify-center"
                  style={{
                    width: CARD_WIDTH,
                    marginRight: i < milestones.length - 1 ? CARD_GAP : 0,
                  }}
                >
                  {/* 连接线 + 圆点 */}
                  <div className="relative z-10 flex w-full items-center py-2">
                    <div className="h-px flex-1 bg-neutral-200" />
                    <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-primary/10" />
                      <div className="h-4 w-4 rounded-full bg-primary shadow-md shadow-primary/30" />
                      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                    </div>
                    <div
                      className="h-px bg-neutral-200"
                      style={{
                        width: i < milestones.length - 1 ? "100%" : "32px",
                        flex: i < milestones.length - 1 ? 1 : "none",
                      }}
                    />
                  </div>

                  {/* 上方卡片 */}
                  <div className="flex w-full flex-1 flex-col justify-end pb-3">
                    {above && (
                      <motion.div
                        className="card relative p-5"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <div className="absolute top-0 left-0 h-1 w-full rounded-t-lg bg-gradient-to-r from-primary to-accent" />
                        <span className="inline-block rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-white shadow-sm shadow-primary/20">
                          {milestone.year}
                        </span>
                        <h3 className="mt-2 text-base font-semibold text-neutral-900">
                          {milestone.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 line-clamp-3">
                          {milestone.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* 竖线 */}
                  <div className="h-5 w-px bg-neutral-300" />

                  {/* 下方卡片 */}
                  <div className="flex w-full flex-1 flex-col justify-start pt-3">
                    {!above && (
                      <motion.div
                        className="card relative p-5"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <div className="absolute top-0 left-0 h-1 w-full rounded-t-lg bg-gradient-to-r from-primary to-accent" />
                        <span className="inline-block rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-white shadow-sm shadow-primary/20">
                          {milestone.year}
                        </span>
                        <h3 className="mt-2 text-base font-semibold text-neutral-900">
                          {milestone.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 line-clamp-3">
                          {milestone.description}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* 滚动提示 */}
          <motion.div
            className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-sm text-neutral-400"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ⬅ 向下滚动探索发展历程 ➡
          </motion.div>
        </div>
      </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
           Mobile (< md) — 垂直列表
           ═══════════════════════════════════════════════════════════ */}
      {!isDesktop && (
        <div className="relative">
        <div className="absolute left-5 top-4 bottom-4 w-px bg-neutral-200" />
        <div className="space-y-10">
          {milestones.map((milestone) => (
            <motion.div
              key={milestone.year}
              className="relative flex items-start gap-6 pl-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
            >
              <div className="absolute left-[18px] top-2 z-10 h-3 w-3 rounded-full bg-primary shadow-md shadow-primary/30 ring-4 ring-white" />
              <div className="card relative flex-1 overflow-hidden p-5">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-accent" />
                <span className="inline-block rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-white shadow-sm shadow-primary/20">
                  {milestone.year}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      )}
    </>
  );
}
