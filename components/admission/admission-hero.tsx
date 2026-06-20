"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { ApplyNowLink } from "@/components/ui/apply-now-link";
import { StaticImage } from "@/components/ui/static-image";
import { cn } from "@/lib/utils";

const HERO_IMAGE = "/images/IMG_20240902_125631.jpg.jpeg";

/** Same overlay as homepage hero — do not modify independently. */
const OVERLAY_GRADIENT = `linear-gradient(
  135deg,
  rgba(11,31,91,0.92) 0%,
  rgba(18,52,130,0.85) 45%,
  rgba(30,58,138,0.65) 70%,
  rgba(255,255,255,0.15) 100%
)`;

const fadeIn = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export function AdmissionHero() {
  return (
    <section className="relative min-h-[min(72vh,640px)] overflow-hidden text-white sm:min-h-[min(78vh,720px)]">
      <div className="absolute inset-0" aria-hidden>
        <StaticImage
          src={HERO_IMAGE}
          alt=""
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{ background: OVERLAY_GRADIENT }}
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(72vh,640px)] max-w-6xl flex-col justify-center px-4 py-16 sm:min-h-[min(78vh,720px)] sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
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
            className="mt-4 font-display text-[clamp(2.25rem,4.5vw+0.75rem,3.5rem)] font-bold leading-[1.08] tracking-tight text-white"
          >
            Admissions Open
          </motion.h1>

          <motion.p
            custom={0.12}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-5 max-w-xl text-[clamp(1rem,1.1vw+0.5rem,1.25rem)] font-medium leading-relaxed text-blue-50/95"
          >
            Begin your journey with IHRD College Poonjar and build a successful future through
            quality education and innovation.
          </motion.p>

          <motion.div
            custom={0.18}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <ApplyNowLink
              className={cn(
                "inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#D4A017] px-7 text-sm font-semibold text-[#0B1F5B] transition-colors duration-200 sm:w-auto sm:text-[15px]",
                "hover:bg-[#E5B422]",
              )}
            >
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ApplyNowLink>
            <Link
              href="/contact"
              className={cn(
                "inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-7 text-sm font-semibold text-white transition-colors duration-200 sm:w-auto sm:text-[15px]",
                "hover:border-white/55 hover:bg-white/15",
              )}
            >
              <Phone className="h-4 w-4" aria-hidden />
              Contact Admissions
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
