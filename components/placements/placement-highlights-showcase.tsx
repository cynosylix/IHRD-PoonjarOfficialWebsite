"use client";

import {
  Award,
  Building2,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { FadeInView } from "@/components/motion/fade-in-view";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import {
  PLACEMENT_HIGHLIGHTS_2025,
  type PlacementStatItem,
} from "@/data/placement-page-config";
import { StaticImage } from "@/components/ui/static-image";
import { cn } from "@/lib/utils";

const HIGHLIGHT_ICONS: LucideIcon[] = [Award, Users, Building2, TrendingUp];

type NumericHighlightStat = {
  label: string;
  value: number;
  suffix: string;
};

function parseNumericStats(stats: PlacementStatItem[]): NumericHighlightStat[] {
  return stats
    .map((stat) => {
      const numeric = Number(stat.value.replace(/[^\d.]/g, ""));
      if (!Number.isFinite(numeric) || numeric <= 0) return null;
      return {
        label: stat.label,
        value: Math.round(numeric),
        suffix: stat.suffix ?? "",
      };
    })
    .filter((item): item is NumericHighlightStat => item !== null)
    .slice(0, 4);
}

function HighlightCardAccent() {
  return (
    <div className="absolute inset-x-0 top-0" aria-hidden>
      <span className="block h-1 w-full rounded-t-[18px] bg-gradient-to-r from-[#0B1F5B] via-[#1E3A8A] to-[#123482]" />
      <div className="mt-1 flex justify-center">
        <span className="h-0.5 w-8 rounded-full bg-[#D4A017]" />
      </div>
    </div>
  );
}

function HighlightCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[18px] bg-white text-center",
        "border border-black/[0.06] px-6 pb-6 pt-8 sm:px-7 sm:pb-7 sm:pt-9",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
        "hover:-translate-y-1.5 hover:border-[#1E3A8A]/15",
        "hover:shadow-[0_14px_40px_rgba(11,31,91,0.14)]",
      )}
    >
      <HighlightCardAccent />

      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] transition-colors duration-300 group-hover:bg-[#1E3A8A]/15">
        <Icon className="h-5 w-5" aria-hidden />
      </div>

      <h3 className="mt-4 font-display text-base font-bold leading-snug text-[#0F172A] sm:text-lg">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#64748B]">{description}</p>
    </article>
  );
}

type PlacementHighlightsShowcaseProps = {
  stats: PlacementStatItem[];
};

export function PlacementHighlightsShowcase({ stats }: PlacementHighlightsShowcaseProps) {
  const numericStats = parseNumericStats(stats);
  const { image, imageAlt, badge, title, subtitle, highlights } = PLACEMENT_HIGHLIGHTS_2025;

  return (
    <section aria-labelledby="placement-highlights-heading">
      <FadeInView>
        <div className="mx-auto max-w-[900px] text-center">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border border-[#1E3A8A]/15",
              "bg-[#1E3A8A]/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#1E3A8A]",
            )}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#D4A017]" aria-hidden />
            {badge}
          </span>

          <SectionHeading
            id="placement-highlights-heading"
            align="center"
            underline
            title={title}
            description={subtitle}
            className="mt-5"
          />
        </div>
      </FadeInView>

      <StaggerContainer className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {highlights.map((item, index) => (
          <StaggerItem key={item.title} className="h-full">
            <HighlightCard
              title={item.title}
              description={item.description}
              icon={HIGHLIGHT_ICONS[index] ?? Award}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {numericStats.length > 0 ? (
        <FadeInView className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:mt-12 sm:gap-8">
          {numericStats.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "min-w-[140px] rounded-2xl border border-[#1E3A8A]/10",
                "bg-gradient-to-b from-[#F8FAFF] to-white px-6 py-5 text-center",
                "shadow-[0_8px_28px_rgba(11,31,91,0.08)]",
              )}
            >
              <p className="font-display text-3xl font-bold text-[#1E3A8A] sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-[#64748B]">{stat.label}</p>
            </div>
          ))}
        </FadeInView>
      ) : null}

      <FadeInView className="mx-auto mt-12 w-full max-w-[1000px] sm:mt-14 lg:mt-16">
        <div
          className={cn(
            "overflow-hidden rounded-2xl bg-[#F8FAFF]",
            "shadow-[0_12px_40px_rgba(11,31,91,0.14)] ring-1 ring-black/[0.04]",
          )}
        >
          <StaticImage
            src={image}
            alt={imageAlt}
            priority
            width={1000}
            height={1600}
            sizes="(max-width: 1000px) 100vw, 1000px"
            className="block h-auto w-full"
          />
        </div>
      </FadeInView>
    </section>
  );
}
