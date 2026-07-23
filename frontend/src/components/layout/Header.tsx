"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV_ITEMS } from "@/lib/constants";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/types/content";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isActive = (href: { zh: string; en: string }) => {
    const target = locale === "zh-CN" ? href.zh : href.en;
    if (target === `/${locale}`) {
      return pathname === target || pathname === target + "/";
    }
    return pathname.startsWith(target);
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-nav"
          : "bg-white"
      )}
    >
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo — 全局L K方形品牌图标 */}
          <Link
            href={locale === "zh-CN" ? "/zh-CN" : "/en"}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/logo/lk-brand-icon.svg"
              alt="LKtechnology"
              width={36}
              height={36}
              className="h-9 w-9 flex-shrink-0"
              priority
            />
            <span className="hidden text-lg font-semibold text-neutral-900 sm:block">
              LKtechnology
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={locale === "zh-CN" ? item.href.zh : item.href.en}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-neutral-600 hover:text-primary hover:bg-accent-light"
                )}
              >
                {locale === "zh-CN" ? item.label.zh : item.label.en}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4/5 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={locale === "zh-CN" ? "/zh-CN/contact" : "/en/contact"}
              className="hidden sm:inline-flex btn-primary text-sm !py-2 !px-4"
            >
              {locale === "zh-CN" ? "立即咨询" : "Contact Us"}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden"
              aria-label="Menu"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileOpen && (
          <div className="border-t border-neutral-100 py-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={locale === "zh-CN" ? item.href.zh : item.href.en}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-accent-light text-primary"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-primary"
                  )}
                >
                  {locale === "zh-CN" ? item.label.zh : item.label.en}
                </Link>
              ))}
            </nav>
            <div className="mt-4 px-4">
              <Link
                href={locale === "zh-CN" ? "/zh-CN/contact" : "/en/contact"}
                className="btn-primary w-full text-center"
              >
                {locale === "zh-CN" ? "立即咨询" : "Contact Us"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
