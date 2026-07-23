"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import type { Locale } from "@/types/content";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const getTargetPath = (targetLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    if (segments[0] === "zh-CN" || segments[0] === "en") {
      segments[0] = targetLocale;
      return "/" + segments.join("/");
    }
    return `/${targetLocale}${pathname}`;
  };

  return (
    <div className="flex items-center rounded-lg border border-neutral-200 p-0.5">
      <Link
        href={getTargetPath("zh-CN")}
        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
          currentLocale === "zh-CN"
            ? "bg-primary text-white shadow-sm"
            : "text-neutral-500 hover:text-neutral-700"
        }`}
      >
        中
      </Link>
      <Link
        href={getTargetPath("en")}
        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
          currentLocale === "en"
            ? "bg-primary text-white shadow-sm"
            : "text-neutral-500 hover:text-neutral-700"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
