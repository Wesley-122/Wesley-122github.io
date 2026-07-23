"use client";

import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import FadeInView from "@/components/shared/FadeInView";
import type { Locale } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface NewsCardProps {
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  coverUrl?: string;
  /** Stagger delay index (0-based). Used for grid layouts. */
  delayIndex?: number;
}

export default function NewsCard({
  locale,
  slug,
  title,
  excerpt,
  category,
  publishDate,
  coverUrl,
  delayIndex = 0,
}: NewsCardProps) {
  return (
    <FadeInView delay={delayIndex * 0.12} distance={30}>
      <Link
        href={`/${locale}/news/${slug}`}
        className="group card flex flex-col overflow-hidden h-full"
      >
        {coverUrl && (
          <div className="aspect-video w-full overflow-hidden bg-neutral-100">
            <img
              src={coverUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-3">
            <Badge variant="accent">{category}</Badge>
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <Calendar className="h-3 w-3" />
              {formatDate(publishDate, locale)}
            </span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-neutral-900 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-500 line-clamp-3">
            {excerpt}
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            {locale === "zh-CN" ? "阅读全文" : "Read More"}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </FadeInView>
  );
}
