"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronRight,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { IocAboutBenefits } from "@/components/ioc/ioc-about-benefits";
import { IocPartnersShowcase } from "@/components/ioc/ioc-partners-showcase";
import { SectionHeading } from "@/components/home/section-heading";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { FadeInView } from "@/components/motion/fade-in-view";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { StaticImage } from "@/components/ui/static-image";
import { IOC_STATS } from "@/data/ioc-page-config";
import { cn } from "@/lib/utils";

const STAT_ICONS: LucideIcon[] = [Building2, Briefcase, Sparkles, Users, Target];

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass-card h-full rounded-2xl border border-slate-200/60 bg-white/80 p-6 backdrop-blur-sm",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
        "hover:-translate-y-1 hover:border-[#1E3A8A]/20 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function StatCard({
  stat,
  icon: Icon,
}: {
  stat: (typeof IOC_STATS)[number];
  icon: LucideIcon;
}) {
  return (
    <GlassCard className="flex flex-col items-center p-6 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <p className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0F172A]">
        {stat.type === "numeric" ? (
          <>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </>
        ) : (
          stat.headline
        )}
      </p>
      <p className="mt-2 font-semibold text-[#0F172A]">{stat.label}</p>
    </GlassCard>
  );
}

export function IocPageContent() {
  return (
    <div className="bg-gradient-to-b from-[#F8FAFF] to-white">
      <IocAboutBenefits />

      <IocPartnersShowcase />

      {/* Why IOC? */}
      <section
        className="border-y border-[#1E3A8A]/10 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        aria-labelledby="why-ioc-heading"
      >
        <div className="mx-auto max-w-[75rem]">
          <FadeInView>
            <SectionHeading
              id="why-ioc-heading"
              underline
              eyebrow="Impact"
              title="Why IOC?"
              description="Bridging academia and industry to create career-ready engineering professionals."
              className="max-w-2xl"
            />
          </FadeInView>

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-6">
            {IOC_STATS.map((stat, index) => (
              <StaggerItem key={stat.label} className="h-full">
                <StatCard stat={stat} icon={STAT_ICONS[index] ?? Sparkles} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden" aria-labelledby="ioc-cta-heading">
        <div className="absolute inset-0" aria-hidden>
          <StaticImage
            src="/images/slides/industry-campus.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(11,31,91,0.94) 0%,
              rgba(18,52,130,0.88) 50%,
              rgba(30,58,138,0.82) 100%
            )`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-[75rem] px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <FadeInView>
            <h2
              id="ioc-cta-heading"
              className="font-display text-[clamp(1.75rem,3vw+0.5rem,2.5rem)] font-bold text-white"
            >
              Build Your Career with Industry on Campus
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Gain practical experience, work on real-world projects, learn from industry experts, and
              become job-ready through our Industry on Campus initiative.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/academics/programs"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0B1F5B] shadow-lg transition-all duration-300 hover:bg-white/95 hover:shadow-xl"
              >
                Explore Programs
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
              >
                Contact IOC Coordinator
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
