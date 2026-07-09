"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  Microscope,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ApplyNowLink } from "@/components/ui/apply-now-link";
import { HtmlBlock } from "@/components/content/html-block";
import { HeadingUnderline, SectionHeading } from "@/components/home/section-heading";
import { FadeInView } from "@/components/motion/fade-in-view";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { ProgramDetailHero } from "@/components/programs/program-detail-hero";
import { WHY_CHOOSE_ITEMS, type ProgramCareer, type ProgramDetailConfig } from "@/data/program-detail-config";
import type { ProgramRow } from "@/data/site-data";
import { cn } from "@/lib/utils";

const WHY_CHOOSE_ICONS: LucideIcon[] = [
  GraduationCap,
  Users,
  Microscope,
  Briefcase,
  Lightbulb,
  FlaskConical,
];

type ProgramDetailPageViewProps = {
  program: ProgramRow;
  typeLabel: string;
  departmentName: string;
  shortDescription: string;
  heroImage: string;
  careers: ProgramCareer[];
  prospectusUrl: string;
  config?: ProgramDetailConfig;
};

function HighlightCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_8px_28px_rgba(11,31,91,0.08)]",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]",
        "sm:p-6",
      )}
    >
      <h3 className="text-center font-display text-xl font-bold leading-snug tracking-tight text-[#0F172A] sm:text-[1.35rem]">
        {title}
      </h3>
      <HeadingUnderline />
      <div className="mt-4 flex-1 text-sm leading-relaxed text-[#64748B]">{children}</div>
    </div>
  );
}

function FeatureCard({ title }: { title: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-center rounded-2xl border border-black/[0.06] bg-white p-5 text-center",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
        "hover:-translate-y-1 hover:border-[#1E3A8A]/15 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]",
        "sm:p-6",
      )}
    >
      <p className="font-display text-sm font-bold leading-snug text-[#0F172A] sm:text-[15px]">
        {title}
      </p>
    </div>
  );
}

function HighlightItemCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "h-full rounded-2xl border border-black/[0.06] bg-white p-5",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
        "hover:-translate-y-1 hover:border-[#1E3A8A]/15 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]",
        "sm:p-6",
      )}
    >
      <p className="text-sm leading-relaxed text-[#64748B]">{children}</p>
    </div>
  );
}

function CareerCard({ title }: { title: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-center rounded-2xl border border-black/[0.06] bg-white px-4 py-6 text-center",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
        "hover:-translate-y-1 hover:border-[#1E3A8A]/15 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]",
      )}
    >
      <p className="font-display text-sm font-bold leading-snug text-[#0F172A] sm:text-[15px]">
        {title}
      </p>
    </div>
  );
}

function CurriculumAccordion({ items }: { items: string[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `curriculum-panel-${index}`;
        const buttonId = `curriculum-button-${index}`;

        return (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_4px_20px_rgba(11,31,91,0.06)]"
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F8FAFF] sm:px-6"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1E3A8A] text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="font-semibold text-[#0F172A]">Curriculum Module {index + 1}</span>
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-[#64748B] transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-[#64748B] sm:px-6">
                  {item}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProgramDetailPageView({
  program,
  typeLabel,
  departmentName,
  shortDescription,
  heroImage,
  careers,
  prospectusUrl,
  config,
}: ProgramDetailPageViewProps) {
  const heroTitle = config?.heroTitle ?? program.fullName ?? program.name;
  const departmentHref = program.departmentSlug
    ? `/academics/departments/${program.departmentSlug}`
    : undefined;

  const aboutDescription =
    config?.aboutDescription ??
    "A comprehensive engineering pathway designed for academic excellence and industry readiness.";
  const aboutMaxWidth = config?.aboutMaxWidthClass ?? "max-w-[900px]";
  const keyFeatureItems = config?.keyFeatures ?? program.learnings;
  const careerGridClass =
    config?.careerGridCols === "4"
      ? "mt-10 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"
      : "mt-10 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 lg:gap-5";
  const ctaTitle =
    config?.ctaTitle ?? "Start Your Engineering Journey at College of Engineering Poonjar";
  const ctaDescription =
    config?.ctaDescription ??
    "Join a future-focused learning environment designed to prepare you for industry and innovation.";
  const admissionsAlign = config?.admissionsSectionAlign ?? "left";
  const contentAlign = config?.contentSectionAlign ?? admissionsAlign;
  const highlightsDescription =
    config?.highlightsSectionDescription ??
    "Core objectives that define the postgraduate learning experience.";
  const keyFeaturesDescription =
    config?.keyFeaturesSectionDescription ??
    "Advanced computing areas covered through theory, laboratories, and project work.";

  return (
    <div className="min-w-0">
      <ProgramDetailHero
        programName={heroTitle}
        departmentName={departmentName}
        shortDescription={shortDescription}
        duration={program.duration}
        affiliation={program.affiliation}
        intake={program.intake}
        typeLabel={typeLabel}
        heroImage={heroImage}
        prospectusUrl={prospectusUrl}
        departmentHref={departmentHref}
        heroHeight={config?.heroHeight}
        showProspectus={config?.heroButtons !== "apply-contact"}
        contactButtonLabel={config?.contactButtonLabel}
        contactButtonHref={config?.contactButtonHref}
      />

      <div className="bg-gradient-to-b from-[#F8FAFF] to-white">
        {/* Program overview */}
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="program-about">
          <div className="mx-auto max-w-6xl">
            <div className={cn("mx-auto text-center", aboutMaxWidth)}>
              <SectionHeading
                id="program-about"
                className="max-w-none"
                underline
                eyebrow="Programme overview"
                title="About the Programme"
                description={aboutDescription}
              />

              <FadeInView className="mt-8 sm:mt-10">
                <div className="cms-content program-about-content text-sm leading-relaxed text-[#475569] sm:text-base [&_p]:mb-5 [&_p:last-child]:mb-0 [&_p]:text-justify [&_p]:[text-justify:inter-word] [&_p]:hyphens-auto">
                  <HtmlBlock html={program.about} />
                </div>
              </FadeInView>
            </div>

            {config?.keyFeatures ? (
              <>
                <FadeInView className="mt-14">
                  <SectionHeading
                    underline
                    eyebrow="Programme strengths"
                    title="Programme Highlights"
                    description={highlightsDescription}
                  />
                  <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {program.objectives.map((item) => (
                      <StaggerItem key={item}>
                        <HighlightItemCard>{item}</HighlightItemCard>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </FadeInView>

                <FadeInView className="mt-14">
                  <SectionHeading
                    underline
                    eyebrow="Curriculum focus"
                    title="Key Features"
                    description={keyFeaturesDescription}
                  />
                  <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {keyFeatureItems.map((item) => (
                      <StaggerItem key={item}>
                        {config?.keyFeaturesLayout === "detailed" ? (
                          <HighlightItemCard>{item}</HighlightItemCard>
                        ) : (
                          <FeatureCard title={item} />
                        )}
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </FadeInView>
              </>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
                <FadeInView>
                  <HighlightCard title="Programme Highlights">
                    <ul className="space-y-2.5">
                      {program.objectives.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A017]" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </HighlightCard>
                </FadeInView>

                <FadeInView delay={0.06}>
                  <HighlightCard title="Key Features">
                    <ul className="space-y-2.5">
                      {keyFeatureItems.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </HighlightCard>
                </FadeInView>

                {!config?.hideCareerPathwaysCard ? (
                  <FadeInView delay={0.12}>
                    <HighlightCard title="Career Pathways">
                      <ul className="space-y-2.5">
                        {careers.map((c) => (
                          <li key={c.title}>
                            <div className="rounded-xl border border-black/[0.04] bg-[#F8FAFF]/80 px-3.5 py-3 transition-colors hover:border-[#1E3A8A]/10 hover:bg-[#F8FAFF]">
                              <p className="font-semibold leading-snug text-[#0F172A]">{c.title}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </HighlightCard>
                  </FadeInView>
                ) : null}
              </div>
            )}
          </div>
        </section>

        {!config?.hideCurriculumSection ? (
          <section
            className="border-t border-slate-200/60 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
            aria-labelledby="program-curriculum"
          >
            <div className="mx-auto max-w-6xl">
              <SectionHeading
                id="program-curriculum"
                underline
                eyebrow="Curriculum"
                title="What You Will Learn"
                description="Core learning areas covered through the university-approved curriculum, laboratories, and project work."
              />
              <FadeInView className="mt-8">
                <CurriculumAccordion items={program.learnings} />
              </FadeInView>
            </div>
          </section>
        ) : null}

        {/* Career opportunities */}
        <section
          className="border-t border-slate-200/60 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
          aria-labelledby="program-careers"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              id="program-careers"
              underline
              eyebrow="Careers"
              title="Career Opportunities"
              description="Graduates can pursue diverse roles across industry, research, and higher education."
            />
            <StaggerContainer className={careerGridClass}>
              {careers.map((career) => (
                <StaggerItem key={career.title}>
                  <CareerCard title={career.title} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {!config?.hideWhyChooseSection ? (
        <section
          className="border-t border-slate-200/60 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
          aria-labelledby="program-why"
        >
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              id="program-why"
              underline
              eyebrow="Why choose us"
              title="Why Choose This Programme"
              description="Study at College of Engineering Poonjar with the support of experienced faculty and a future-ready learning environment."
            />
            <StaggerContainer className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_CHOOSE_ITEMS.map((item, index) => {
                const Icon = WHY_CHOOSE_ICONS[index] ?? Sparkles;
                return (
                  <StaggerItem key={item.title}>
                    <div
                      className={cn(
                        "h-full rounded-2xl border border-black/[0.06] bg-white p-6",
                        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
                        "hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]",
                      )}
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold text-[#0F172A]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
        ) : null}

        {/* Existing academic sections */}
        <section className="border-t border-slate-200/60 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-14">
            {program.eligibility ? (
              <FadeInView>
                <div className={cn(admissionsAlign === "center" && "mx-auto max-w-[900px] text-center")}>
                  <SectionHeading
                    align={admissionsAlign}
                    underline
                    eyebrow="Admissions"
                    title={config?.eligibilityTitle ?? "Academic Eligibility"}
                    className={admissionsAlign === "center" ? "max-w-none" : undefined}
                  />
                  <div className="cms-content program-about-content mt-8 text-sm leading-relaxed text-[#475569] sm:mt-10 sm:text-base [&_p]:mb-5 [&_p:last-child]:mb-0 [&_p]:text-justify [&_p]:[text-justify:inter-word] [&_p]:hyphens-auto">
                    <HtmlBlock html={program.eligibility} />
                  </div>
                </div>
              </FadeInView>
            ) : null}

            {program.allotment ? (
              <FadeInView>
                <div className={cn(admissionsAlign === "center" && "mx-auto max-w-[900px] text-center")}>
                  <SectionHeading
                    align={admissionsAlign}
                    underline
                    eyebrow="Admissions"
                    title={config?.allotmentTitle ?? "Allotment"}
                    className={admissionsAlign === "center" ? "max-w-none" : undefined}
                  />
                  <div className="cms-content program-about-content mt-8 text-sm leading-relaxed text-[#475569] sm:mt-10 sm:text-base [&_p]:mb-5 [&_p:last-child]:mb-0 [&_p]:text-justify [&_p]:[text-justify:inter-word] [&_p]:hyphens-auto">
                    <HtmlBlock html={program.allotment} />
                  </div>
                </div>
              </FadeInView>
            ) : null}

            {!config?.hideObjectivesSection ? (
            <FadeInView>
              <SectionHeading align="left" underline title="Programme Objectives" />
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {program.objectives.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-2xl border border-black/[0.06] bg-white px-5 py-4 text-sm leading-relaxed text-[#475569] shadow-sm"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeInView>
            ) : null}

            {!config?.hideOutcomesSection ? (
            <FadeInView>
              <SectionHeading align="left" underline title="Course Outcomes" />
              <ol className="mt-6 space-y-3">
                {program.outcomes.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-4 rounded-2xl border border-black/[0.06] bg-white px-5 py-4 shadow-sm"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1E3A8A] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-[#475569]">{item}</p>
                  </li>
                ))}
              </ol>
            </FadeInView>
            ) : null}

            <FadeInView>
              <div className={cn(contentAlign === "center" && "mx-auto max-w-[900px] text-center")}>
                <SectionHeading
                  align={contentAlign}
                  underline
                  title="Programme Details"
                  className={contentAlign === "center" ? "max-w-none" : undefined}
                />
                <div className="mt-6 overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_28px_rgba(11,31,91,0.08)]">
                <dl className="divide-y divide-slate-100">
                  <div className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-[#0F172A]">Programme type</dt>
                    <dd className="text-sm text-[#64748B]">
                      {typeLabel} ({program.type})
                    </dd>
                  </div>
                  {program.duration ? (
                    <div className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-4 sm:px-6">
                      <dt className="text-sm font-semibold text-[#0F172A]">Duration</dt>
                      <dd className="text-sm text-[#64748B]">{program.duration}</dd>
                    </div>
                  ) : null}
                  {program.intake ? (
                    <div className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-4 sm:px-6">
                      <dt className="text-sm font-semibold text-[#0F172A]">Intake</dt>
                      <dd className="text-sm text-[#64748B]">{program.intake}</dd>
                    </div>
                  ) : null}
                  {program.affiliation ? (
                    <div className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-4 sm:px-6">
                      <dt className="text-sm font-semibold text-[#0F172A]">Affiliation</dt>
                      <dd className="text-sm text-[#64748B]">{program.affiliation}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
              {program.departmentSlug ? (
                <p className={cn("mt-4 text-sm text-[#64748B]", contentAlign === "center" && "text-center")}>
                  Faculty and department information:{" "}
                  <Link
                    href={`/academics/departments/${program.departmentSlug}`}
                    className="font-medium text-[#1E3A8A] underline-offset-2 hover:underline"
                  >
                    View department
                  </Link>
                </p>
              ) : null}
              </div>
            </FadeInView>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8" aria-labelledby="program-cta">
          <FadeInView className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1F5B] via-[#1E3A8A] to-[#123482] px-6 py-12 text-center shadow-[0_20px_50px_rgba(11,31,91,0.25)] sm:px-10 sm:py-14 lg:px-14">
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at top left, rgba(212,160,23,0.35), transparent 55%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <h2
                  id="program-cta"
                  className="font-display text-[clamp(1.75rem,3vw+0.5rem,2.5rem)] font-bold text-white"
                >
                  {ctaTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-blue-100/90 sm:text-base">
                  {ctaDescription}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <ApplyNowLink
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#D4A017] px-7 text-sm font-semibold text-[#0B1F5B] transition-colors hover:bg-[#E5B422] sm:w-auto sm:text-[15px]"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </ApplyNowLink>
                  <Link
                    href="/contact"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-7 text-sm font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/15 sm:w-auto sm:text-[15px]"
                  >
                    Contact Admissions
                  </Link>
                </div>
              </div>
            </div>
          </FadeInView>
        </section>
      </div>
    </div>
  );
}
