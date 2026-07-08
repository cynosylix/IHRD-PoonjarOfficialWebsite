import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { IocPageContent } from "@/components/ioc/ioc-page-content";
import { StaticImage } from "@/components/ui/static-image";
import { IOC_HERO_IMAGE } from "@/data/ioc-page-config";

export const metadata: Metadata = {
  title: "Industry on Campus (IOC)",
  description:
    "Industry on Campus (IOC) — bridging academics and industry through strategic partnerships with leading technology companies at College of Engineering Poonjar, IHRD.",
};

const OVERLAY_GRADIENT = `linear-gradient(
  135deg,
  rgba(11,31,91,0.92) 0%,
  rgba(18,52,130,0.85) 45%,
  rgba(30,58,138,0.65) 70%,
  rgba(255,255,255,0.15) 100%
)`;

export default function IocPage() {
  return (
    <div className="min-w-0">
      <header className="relative overflow-hidden border-b border-[#1E293B] text-white">
        <div className="absolute inset-0" aria-hidden>
          <StaticImage
            src={IOC_HERO_IMAGE}
            alt=""
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0" style={{ background: OVERLAY_GRADIENT }} aria-hidden />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <nav
            className="flex flex-wrap items-center gap-1 text-xs text-slate-400 sm:text-sm"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="text-slate-200">Industry on Campus</span>
          </nav>

          <div className="mx-auto mt-8 max-w-3xl text-center lg:mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
              IHRD · Industry Collaboration
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,4vw+0.5rem,3rem)] font-bold leading-tight tracking-tight">
              Industry on Campus (IOC)
            </h1>
            <div className="mx-auto mt-3 flex flex-col items-center gap-1" aria-hidden>
              <span className="h-0.5 w-28 rounded-full bg-[#1E3A8A]" />
              <span className="h-0.5 w-10 rounded-full bg-[#D4A017]" />
            </div>
            <p className="mt-5 text-base font-medium text-slate-200 sm:text-lg md:text-xl">
              Connecting Education with Industry to Build Future-Ready Professionals
            </p>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">
              Industry on Campus (IOC) is an initiative that bridges the gap between academics and
              industry by bringing leading technology companies directly to the campus. Through
              strategic collaborations, students gain practical knowledge, industry exposure,
              internships, live projects, expert mentorship, certifications, and placement
              opportunities.
            </p>
            <a
              href="#partners"
              className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D4A017] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-lg transition-all duration-300 hover:bg-[#e8b81a] hover:shadow-xl"
            >
              Explore Our Industry Partners
              <ChevronRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </header>

      <IocPageContent />
    </div>
  );
}
