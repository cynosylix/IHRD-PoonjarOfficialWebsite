"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeInView } from "@/components/motion/fade-in-view";
import { aboutInstitution, siteSettings } from "@/data/site-data";
import { cn } from "@/lib/utils";

export function AboutIntroBand() {
  return (
    <section className="border-b border-slate-200 bg-white pt-10 sm:pt-12 lg:pt-14">
      <div className="mx-auto max-w-[900px] px-4 pb-14 sm:px-6 sm:pb-16 lg:pb-20">
        <FadeInView className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="group mb-5 inline-block transition-transform duration-300 hover:scale-[1.03]"
          >
            <Image
              src="/images/logo.webp"
              alt={siteSettings.collegeName}
              width={1000}
              height={413}
              className="h-auto w-[180px] object-contain sm:w-[200px] lg:w-[220px]"
              sizes="220px"
            />
          </Link>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#1E3A8A]">
            {siteSettings.collegeName}
          </p>

          <h2 className="mb-3 font-display text-[clamp(1.75rem,3vw+0.5rem,2.25rem)] font-bold tracking-tight text-[#0F172A]">
            About the Institution
          </h2>

          <div className="mb-6 h-px w-14 bg-[#D4A017]" aria-hidden />

          <p className="text-[15px] leading-[1.8] text-[#475569] sm:text-base sm:leading-[1.85]">
            {aboutInstitution.homeIntro}
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/about/institution"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-md border border-[#CBD5E1] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] transition-colors",
                "hover:border-[#1E3A8A] hover:bg-[#F8FAFC]",
              )}
            >
              Read More About Us
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
