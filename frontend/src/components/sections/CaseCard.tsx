"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FadeInView from "@/components/shared/FadeInView";
import type { Locale } from "@/types/content";
import { Badge } from "@/components/ui/badge";

interface CaseCardProps {
  locale: Locale;
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  summary: string;
  technologies: string[];
  thumbnailUrl?: string;
  aiPrompt?: string;
  delayIndex?: number;
}

/** 用 pollinations.ai 生成科技感概念图（免费、无需 API Key） */
function aiImageSrc(prompt: string): string {
  const encoded = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=800&height=450&nologo=true&seed=42`;
}

export default function CaseCard({
  locale,
  slug,
  title,
  clientName,
  industry,
  summary,
  technologies,
  thumbnailUrl,
  aiPrompt,
  delayIndex = 0,
}: CaseCardProps) {
  const imgSrc = aiPrompt ? aiImageSrc(aiPrompt) : thumbnailUrl;

  return (
    <FadeInView delay={delayIndex * 0.12} distance={30}>
      <Link
        href={`/${locale}/cases/${slug}`}
        className="group card flex flex-col overflow-hidden h-full"
      >
        {/* Thumbnail + Overlay */}
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-accent">
          {imgSrc ? (
            <>
              <Image
                src={imgSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized={!!aiPrompt}
              />
              {/* 蓝黑渐变遮罩：确保图片融入网站深蓝主色调 */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-primary/20 to-transparent" />
              {/* 顶部微光边 */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </>
          ) : (
            /* 占位 Fallback */
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-white/20">
                  {clientName.charAt(0)}
                </div>
                <div className="mt-1 text-sm text-white/50">{clientName}</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="accent">{industry}</Badge>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-neutral-900 group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-500 line-clamp-3">
            {summary}
          </p>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            {locale === "zh-CN" ? "查看案例详情" : "View Case Study"}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </FadeInView>
  );
}
