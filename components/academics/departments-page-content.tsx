"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  FlaskConical,
  GraduationCap,
  Users,
} from "lucide-react";
import type { Department } from "@/data/site-data";
import { StaticImage } from "@/components/ui/static-image";
import { FadeInView } from "@/components/motion/fade-in-view";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import {
  DEPARTMENT_FILTERS,
  DEPARTMENT_PORTAL_STATS,
  DEPARTMENT_WHY_CHOOSE,
  FEATURED_DEPARTMENT_SLUG,
  departmentMatchesFilter,
  excerptHtml,
  getProgramCountForDepartment,
  type DepartmentFilterId,
} from "@/lib/department-utils";
import { cn } from "@/lib/utils";

const WHY_ICONS = {
  book: BookOpen,
  users: Users,
  flask: FlaskConical,
  briefcase: Briefcase,
} as const;

const DEPARTMENT_IMAGE_FALLBACK = "/images/pages/departments.jpg";

function DepartmentMeta({ facultyCount, programCount }: { facultyCount: number; programCount: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-xl border border-[#E8EEF8] bg-[#F8FAFF] px-3.5 py-3 transition-colors duration-300 group-hover:border-[#1E3A8A]/10">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#1E3A8A] shadow-sm">
            <Users className="h-4 w-4" aria-hidden />
          </span>
          <p className="font-display text-2xl font-bold leading-none tabular-nums text-[#0B1F5B]">
            {facultyCount}
          </p>
        </div>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
          Faculty
        </p>
      </div>
      <div className="rounded-xl border border-[#E8EEF8] bg-[#F8FAFF] px-3.5 py-3 transition-colors duration-300 group-hover:border-[#1E3A8A]/10">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#1E3A8A] shadow-sm">
            <GraduationCap className="h-4 w-4" aria-hidden />
          </span>
          <p className="font-display text-2xl font-bold leading-none tabular-nums text-[#0B1F5B]">
            {programCount}
          </p>
        </div>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
          Programs
        </p>
      </div>
    </div>
  );
}

function LearnMoreButton({ href, className }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F5B] px-5 py-2.5",
        "text-sm font-semibold text-white",
        "shadow-[0_4px_14px_rgba(11,31,91,0.22)]",
        "transition-all duration-300",
        "hover:bg-[#1E3A8A] hover:shadow-[0_8px_24px_rgba(11,31,91,0.32)]",
        "active:scale-[0.98]",
        className,
      )}
    >
      Learn More
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}

function DepartmentCard({ dept }: { dept: Department }) {
  const programCount = getProgramCountForDepartment(dept.slug);
  const href = `/academics/departments/${dept.slug}`;
  const imageSrc = dept.imageUrl ?? DEPARTMENT_IMAGE_FALLBACK;

  return (
    <article
      className={cn(
        "group flex h-full w-full flex-col overflow-hidden rounded-[20px] border border-black/[0.05] bg-white",
        "shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:border-[#1E3A8A]/15",
        "hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]",
      )}
    >
      <div className="shrink-0 px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="relative h-[140px] overflow-hidden rounded-xl bg-gradient-to-br from-[#F8FAFF] to-[#EEF4FF] ring-1 ring-black/[0.04]">
          <StaticImage
            src={imageSrc}
            alt={dept.name}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-contain object-center p-1.5 transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <h3 className="font-display text-[1.25rem] font-bold leading-snug tracking-tight text-[#0F172A] sm:text-[1.35rem]">
          {dept.name}
        </h3>
        <p className="mt-3 line-clamp-3 text-[15px] leading-[1.65] text-[#64748B]">
          {excerptHtml(dept.intro, 160)}
        </p>

        <div className="mt-auto pt-5">
          <DepartmentMeta facultyCount={dept.faculties.length} programCount={programCount} />
          <LearnMoreButton href={href} className="mt-4" />
        </div>
      </div>
    </article>
  );
}

function FeaturedDepartmentCard({ dept }: { dept: Department }) {
  const programCount = getProgramCountForDepartment(dept.slug);
  const href = `/academics/departments/${dept.slug}`;
  const imageSrc = dept.imageUrl ?? DEPARTMENT_IMAGE_FALLBACK;

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-[#1E3A8A]/15 bg-white",
        "shadow-[0_12px_40px_-16px_rgba(11,31,91,0.2)]",
        "transition-shadow duration-300 hover:shadow-[0_20px_52px_-14px_rgba(11,31,91,0.24)]",
      )}
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[220px] overflow-hidden sm:min-h-[260px] lg:min-h-[340px]">
          <StaticImage
            src={imageSrc}
            alt={dept.name}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0B1F5B]/50 via-[#0B1F5B]/20 to-transparent lg:bg-gradient-to-t lg:from-[#0B1F5B]/55 lg:via-transparent lg:to-transparent"
            aria-hidden
          />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
            Featured Department
          </p>
          <h3 className="mt-2 font-display text-[clamp(1.35rem,2vw+0.5rem,1.85rem)] font-bold text-[#0F172A]">
            {dept.name}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[#64748B] sm:text-[15px]">
            {excerptHtml(dept.intro, 280)}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-[#F8FAFF] px-4 py-3">
              <Users className="h-4 w-4 text-[#1E3A8A]" aria-hidden />
              <div>
                <p className="text-lg font-bold tabular-nums text-[#0F172A]">{dept.faculties.length}</p>
                <p className="text-[11px] font-medium uppercase tracking-wider text-[#64748B]">Faculty</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-[#F8FAFF] px-4 py-3">
              <GraduationCap className="h-4 w-4 text-[#1E3A8A]" aria-hidden />
              <div>
                <p className="text-lg font-bold tabular-nums text-[#0F172A]">{programCount}</p>
                <p className="text-[11px] font-medium uppercase tracking-wider text-[#64748B]">Programs</p>
              </div>
            </div>
          </div>

          <Link
            href={href}
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-[#0B1F5B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E3A8A]"
          >
            Explore Department
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function DepartmentsPageContent({ departments }: { departments: Department[] }) {
  const [activeFilter, setActiveFilter] = useState<DepartmentFilterId>("all");

  const sortedDepartments = useMemo(
    () => [...departments].sort((a, b) => a.order - b.order),
    [departments],
  );

  const portalStats = useMemo(
    () => [
      { value: sortedDepartments.length, suffix: "", label: "Departments" },
      ...DEPARTMENT_PORTAL_STATS,
    ],
    [sortedDepartments.length],
  );

  const filteredDepartments = useMemo(
    () => sortedDepartments.filter((d) => departmentMatchesFilter(d, activeFilter)),
    [sortedDepartments, activeFilter],
  );

  const featuredDepartment = useMemo(() => {
    const preferred = filteredDepartments.find((d) => d.slug === FEATURED_DEPARTMENT_SLUG);
    return preferred ?? filteredDepartments[0] ?? null;
  }, [filteredDepartments]);

  const gridDepartments = useMemo(
    () =>
      featuredDepartment
        ? filteredDepartments.filter((d) => d.slug !== featuredDepartment.slug)
        : filteredDepartments,
    [filteredDepartments, featuredDepartment],
  );

  return (
    <div
      className="relative min-w-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #EEF4FF 50%, #F8FAFF 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="announcement-blob-drift absolute -left-20 top-[8%] h-72 w-72 rounded-full bg-[#3B82F6]/[0.06] blur-3xl" />
        <div className="announcement-blob-drift-delayed absolute -right-16 top-[42%] h-64 w-64 rounded-full bg-[#1E3A8A]/[0.05] blur-3xl" />
        <div className="announcement-blob-drift absolute bottom-[12%] left-[30%] h-56 w-56 rounded-full bg-[#60A5FA]/[0.04] blur-3xl" />
      </div>

      <section className="relative border-b border-slate-200/60 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <FadeInView className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
              Academic Strength
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.5rem,2.5vw+0.5rem,2.125rem)] font-bold text-[#0F172A]">
              Department Statistics
            </h2>
          </FadeInView>

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:mt-10 sm:gap-5 lg:grid-cols-4">
            {portalStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div
                  className={cn(
                    "h-full rounded-2xl border border-white/80 bg-white/50 px-4 py-6 text-center backdrop-blur-sm",
                    "shadow-[0_4px_24px_-10px_rgba(11,31,91,0.08)]",
                    "transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A]/20 hover:bg-white/70",
                    "hover:shadow-[0_12px_36px_-10px_rgba(11,31,91,0.14)] sm:px-5 sm:py-7",
                  )}
                >
                  <p className="font-display text-3xl font-bold text-[#0B1F5B] sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#64748B] sm:text-[13px]">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          <FadeInView className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
              Browse by Discipline
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.5rem,2.5vw+0.5rem,2.125rem)] font-bold text-[#0F172A]">
              Explore Our Departments
            </h2>
          </FadeInView>

          <FadeInView delay={0.06} className="mt-8 sm:mt-10">
            <div
              className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Filter departments"
            >
              {DEPARTMENT_FILTERS.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(filter.id)}
                    className={cn(
                      "relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors sm:px-5",
                      isActive ? "text-white" : "text-[#475569] hover:text-[#0B1F5B]",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="department-filter-pill"
                        className="absolute inset-0 rounded-full bg-[#0B1F5B] shadow-[0_4px_16px_-4px_rgba(11,31,91,0.45)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                    <span className="relative z-10">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </FadeInView>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 space-y-10 sm:mt-12 sm:space-y-12"
            >
              {featuredDepartment ? (
                <FeaturedDepartmentCard dept={featuredDepartment} />
              ) : (
                <p className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center text-sm text-[#64748B]">
                  No departments match this category.
                </p>
              )}

              {gridDepartments.length > 0 ? (
                <StaggerContainer
                  key={`${activeFilter}-grid`}
                  className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
                  stagger={0.08}
                >
                  {gridDepartments.map((dept) => (
                    <StaggerItem key={dept.slug} className="flex h-full">
                      <DepartmentCard dept={dept} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="relative border-t border-slate-200/60 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <FadeInView className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
              Why Study With Us
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.5rem,2.5vw+0.5rem,2.125rem)] font-bold text-[#0F172A]">
              Why Choose Our Departments?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">
              A supportive academic environment designed to prepare students for industry, research, and
              lifelong learning.
            </p>
          </FadeInView>

          <StaggerContainer className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {DEPARTMENT_WHY_CHOOSE.map((item) => {
              const Icon = WHY_ICONS[item.icon];
              return (
                <StaggerItem key={item.title}>
                  <div
                    className={cn(
                      "h-full rounded-2xl border border-slate-200/80 bg-white p-6",
                      "shadow-[0_4px_24px_-10px_rgba(11,31,91,0.1)]",
                      "transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A]/20",
                      "hover:shadow-[0_16px_40px_-12px_rgba(11,31,91,0.16)]",
                    )}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#1E3A8A]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-[#0F172A]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{item.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
