"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Locale } from "@/types/content";

interface ClientLogo {
  name: string;
  logoUrl: string;
}

interface LogoWallProps {
  locale: Locale;
  title: string;
  logos: ClientLogo[];
}

export default function LogoWall({ locale, title, logos }: LogoWallProps) {
  return (
    <div>
      <div className="mb-12 text-center md:mb-16">
        <h2 className="text-balance text-3xl font-bold text-neutral-900 md:text-4xl">
          {title}
        </h2>
        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-primary" />
      </div>

      <div className="relative overflow-hidden py-8">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-neutral-50 to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-neutral-50 to-transparent" />

        <motion.div
          className="flex items-center gap-12"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Double the logos for seamless loop */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex h-20 w-40 flex-shrink-0 items-center justify-center rounded-lg bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <Image
                src={logo.logoUrl}
                alt={logo.name}
                width={140}
                height={56}
                className="max-h-14 max-w-[140px] object-contain"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
