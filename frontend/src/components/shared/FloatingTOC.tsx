"use client";

import { useState, useEffect, useCallback } from "react";
import { X, List, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface TocItem {
  slug: string;
  title: string;
  category: string;
}

interface FloatingTOCProps {
  items: TocItem[];
  /** 按钮提示文字 */
  label?: string;
}

/**
 * 右下角悬浮"更多"按钮 + 滑出目录面板。
 * 点击目录项 → 平滑滚动到对应卡片（以 id="news-{slug}" 为锚点）。
 */
export default function FloatingTOC({ items, label = "目录" }: FloatingTOCProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // 滚动超过一屏才显示按钮
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 打开抽屉时锁定 body 滚动
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = useCallback((slug: string) => {
    setOpen(false);
    // 等抽屉关闭动画完成再滚动
    setTimeout(() => {
      const el = document.getElementById(`news-${slug}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  }, []);

  if (items.length === 0) return null;

  return (
    <>
      {/* 遮罩层 */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* 侧边抽屉 */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <h3 className="text-lg font-semibold text-neutral-900">{label}</h3>
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
            aria-label="关闭目录"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="overflow-y-auto h-[calc(100%-73px)] px-4 py-3">
          {items.map((item) => (
            <button
              key={item.slug}
              onClick={() => scrollTo(item.slug)}
              className="group flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-accent-light"
            >
              <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-300 group-hover:text-primary transition-colors" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-neutral-700 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </p>
                <span className="mt-0.5 inline-block text-xs text-neutral-400">
                  {item.category}
                </span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* 悬浮按钮 */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-24 right-6 z-30 flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-light hover:shadow-xl hover:-translate-y-0.5",
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
        aria-label="打开新闻目录"
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">更多</span>
      </button>
    </>
  );
}
