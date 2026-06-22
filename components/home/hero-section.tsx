"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ApplyNowLink } from "@/components/ui/apply-now-link";
import { HeroBackgroundSlideshow } from "@/components/home/hero-background-slideshow";
import { cn } from "@/lib/utils";

const OVERLAY_GRADIENT = `linear-gradient(
  135deg,
  rgba(11,31,91,0.92) 0%,
  rgba(18,52,130,0.85) 45%,
  rgba(30,58,138,0.65) 70%,
  rgba(255,255,255,0.15) 100%
)`;

const STATS = [
  { value: "2000+", label: "Students" },
  { value: "8", label: "Programs" },
  { value: "6", label: "Departments" },
  { value: "25+", label: "Years of Excellence" },
] as const;

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const statsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.35 },
  },
};

const statCard = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Layer 1 — background slideshow (images only) */}
      <HeroBackgroundSlideshow />

      {/* Layer 2 — fixed blue gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: OVERLAY_GRADIENT }}
        aria-hidden
      />

      {/* Layer 3 — fixed hero content */}
      <div className="relative z-[2] mx-auto flex min-h-[min(92vh,880px)] max-w-6xl flex-col px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pb-24 lg:pt-28">
        {/* Main content */}
        <div className="flex flex-1 items-center">
          <div className="max-w-xl min-w-0 lg:max-w-2xl">
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4A017]"
            >
              IHRD · Government of Kerala
            </motion.p>

            <motion.h1
              custom={0.06}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-5 font-display text-[clamp(2.375rem,5vw+0.75rem,4rem)] font-bold leading-[1.08] tracking-tight text-white"
            >
              IHRD College Poonjar
            </motion.h1>

            <motion.p
              custom={0.12}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-5 max-w-lg text-[clamp(1.0625rem,1.25vw+0.5rem,1.3125rem)] font-medium leading-snug text-blue-50/95"
            >
              Excellence in Technical Education and Innovation
            </motion.p>

            <motion.div
              custom={0.18}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-10 flex w-full flex-col gap-3 sm:flex-row"
            >
              <ApplyNowLink
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#D4A017] px-7 text-sm font-semibold text-[#0B1F5B] transition-colors duration-200 sm:w-auto sm:text-[15px]",
                  "hover:bg-[#E5B422]",
                )}
              >
                Apply for Admission
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ApplyNowLink>
              <Link
                href="/academics/programs"
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-7 text-sm font-semibold text-white transition-colors duration-200 sm:w-auto sm:text-[15px]",
                  "hover:border-white/55 hover:bg-white/15",
                )}
              >
                Explore Programs
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Statistics — inside hero, overlapping bottom */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={statsContainer}
          className={cn(
            "relative z-10 mt-10 flex gap-2 overflow-x-auto scroll-smooth",
            "snap-x snap-mandatory px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "sm:mt-16",
            "md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 md:snap-none",
            "lg:mt-20 lg:grid-cols-4 lg:translate-y-6",
          )}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statCard}
              className={cn(
                "hero-stat-card flex min-w-[5.25rem] flex-1 flex-shrink-0 snap-center flex-col items-center justify-center text-center",
                "md:min-w-0 md:flex-shrink md:snap-align-none",
              )}
            >
              <p className="font-display text-2xl font-bold leading-none text-white md:text-[2.5rem]">
                {stat.value}
              </p>
              <p className="mt-1.5 px-0.5 text-[10px] leading-tight text-white/80 md:mt-3 md:px-0 md:text-base md:leading-normal">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
