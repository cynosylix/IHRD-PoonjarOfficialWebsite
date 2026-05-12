"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-300 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:flex lg:items-center lg:gap-12 lg:px-8 lg:py-24">
        <div className="max-w-2xl min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur"
          >
            <GraduationCap className="h-4 w-4" />
            IHRD · Government of Kerala
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            College of Engineering{" "}
            <span className="text-brand-200">Poonjar</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-4 text-base text-brand-100 sm:text-lg"
          >
            A centre for quality engineering education, research mindset, and
            holistic student development in the heart of Poonjar.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap"
          >
            <Link
              href="/admission"
              className={cn(
                "inline-flex h-12 w-full items-center justify-center rounded-lg bg-white px-6 text-base font-medium text-brand-900 shadow-sm transition-colors hover:bg-brand-50 sm:w-auto",
              )}
            >
              Admissions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/academics/programs"
              className={cn(
                "inline-flex h-12 w-full items-center justify-center rounded-lg border border-white/40 bg-transparent px-6 text-base font-medium text-white transition-colors hover:bg-white/10 sm:w-auto",
              )}
            >
              Programs
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 hidden min-w-0 flex-1 md:mt-12 md:block"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/placeholder-campus.svg"
              alt="Campus illustration"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
