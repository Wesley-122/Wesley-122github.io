"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageSquare, Calendar } from "lucide-react";
import type { Locale } from "@/types/content";

interface CTABannerProps {
  locale: Locale;
  title: string;
  subtitle: string;
}

export default function CTABanner({ locale, title, subtitle }: CTABannerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Decorative circles drift with parallax
  const circle1Y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const circle2X = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-dark px-8 py-16 text-center text-white shadow-xl md:px-16"
    >
      {/* Decorative circles — parallax movement */}
      <motion.div
        className="absolute -left-20 -top-20 h-64 w-64 rounded-full border border-white/10"
        style={{ y: circle1Y }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full border border-white/10"
        style={{ x: circle2X }}
      />
      {/* Extra decoration */}
      <div className="absolute left-1/4 top-1/2 h-32 w-32 rounded-full border border-white/5" />

      <div className="relative z-10">
        <h2 className="banner-title text-balance text-3xl font-extrabold sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-white/55">{subtitle}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary shadow-lg transition-all hover:bg-neutral-100 hover:shadow-xl hover:scale-105"
          >
            <MessageSquare className="h-5 w-5" />
            {locale === "zh-CN" ? "在线咨询" : "Online Consultation"}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-transparent px-8 py-4 text-base font-medium text-white transition-all hover:bg-white/10"
          >
            <Calendar className="h-5 w-5" />
            {locale === "zh-CN" ? "预约演示" : "Schedule Demo"}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
