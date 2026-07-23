"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FadeInView from "@/components/shared/FadeInView";
import type { Locale } from "@/types/content";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

interface FeatureGridProps {
  locale: Locale;
  title: string;
  subtitle: string;
  features: Feature[];
}

export default function FeatureGrid({ locale, title, subtitle, features }: FeatureGridProps) {
  return (
    <div>
      <div className="mb-12 text-center md:mb-16">
        <FadeInView direction="up">
          <h2 className="text-balance text-3xl font-bold text-neutral-900 md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-neutral-500">
            {subtitle}
          </p>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-primary" />
        </FadeInView>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <FadeInView
            key={index}
            delay={index * 0.15}
            distance={40}
          >
            <Link
              href={feature.href}
              className="group card flex h-full flex-col p-8"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-light text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-neutral-900 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-500">
                {feature.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                {locale === "zh-CN" ? "了解更多" : "Learn more"}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </FadeInView>
        ))}
      </div>
    </div>
  );
}
