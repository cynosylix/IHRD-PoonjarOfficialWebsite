"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ClipboardList,
  Download,
  FileCheck,
  GraduationCap,
  Phone,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ApplyNowLink } from "@/components/ui/apply-now-link";
import { FadeInView } from "@/components/motion/fade-in-view";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { SectionHeading } from "@/components/home/section-heading";
import { cn } from "@/lib/utils";
import type { ProgramRow, ProgramType } from "@/data/site-data";

const ADMISSION_STEPS = [
  {
    step: 1,
    title: "Application Submission",
    description:
      "Submit your application online with accurate personal and academic details for the programme of your choice.",
    icon: ClipboardList,
  },
  {
    step: 2,
    title: "Document Verification",
    description:
      "Required certificates and supporting documents are reviewed by the admission office for completeness.",
    icon: FileCheck,
  },
  {
    step: 3,
    title: "Eligibility Review",
    description:
      "Academic eligibility and reservation criteria are verified as per university and government norms.",
    icon: UserCheck,
  },
  {
    step: 4,
    title: "Admission Confirmation",
    description:
      "Successful candidates receive allotment confirmation and instructions to complete the joining formalities.",
    icon: BadgeCheck,
  },
] as const;

const IMPORTANT_INFO = [
  {
    title: "Allotment Process",
    description:
      "UG, PG, and Diploma admissions follow the official Single Window System (SWS) allotment based on rank lists and online options.",
    icon: CalendarDays,
    href: "https://www.lbscentre.kerala.gov.in",
    linkLabel: "LBS Centre portal",
    external: true,
  },
  {
    title: "Diploma Admissions",
    description:
      "Diploma programme allotments are managed through the Board of Technical Education Kerala online portal.",
    icon: GraduationCap,
    href: "https://www.polyadmission.org",
    linkLabel: "Poly admission portal",
    external: true,
  },
  {
    title: "Admission Support",
    description:
      "Our admission office assists applicants with eligibility queries, document requirements, and programme guidance.",
    icon: Phone,
    href: "/contact",
    linkLabel: "Contact the office",
    external: false,
  },
] as const;

type SectionMeta = {
  label: string;
  title: string;
  blurb: string;
};

type ProgramSection = {
  type: ProgramType;
  meta: SectionMeta;
  rows: ProgramRow[];
};

type Helpline = { name: string; phone: string };
type FeeRow = { course: string; fileUrl: string; order: number };

function StepCard({
  step,
  title,
  description,
  icon: Icon,
}: {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
        "hover:-translate-y-1 hover:border-[#1E3A8A]/15 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]",
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] transition-colors group-hover:bg-[#1E3A8A] group-hover:text-white">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4A017]">
            Step {step}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold text-[#0F172A]">{title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-[#64748B]">{description}</p>
    </div>
  );
}

function ProgramCard({
  program,
  label,
}: {
  program: ProgramRow;
  label: string;
}) {
  const displayName = program.fullName ?? program.name;

  return (
    <Link
      href={`/academics/programs/${program.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
        "hover:-translate-y-1.5 hover:border-[#1E3A8A]/15 hover:shadow-[0_16px_40px_rgba(11,31,91,0.14)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]",
      )}
    >
      <div className="h-1 shrink-0 bg-gradient-to-r from-[#1E3A8A] to-[#D4A017]" aria-hidden />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1E3A8A]">
          {label}
        </p>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-[#0F172A] transition-colors group-hover:text-[#1E3A8A]">
          {displayName}
        </h3>

        <dl className="mt-4 space-y-2 text-sm text-[#64748B]">
          {program.duration ? (
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-[#475569]">Duration</dt>
              <dd>{program.duration}</dd>
            </div>
          ) : null}
          {program.intake ? (
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-[#475569]">Intake</dt>
              <dd>{program.intake}</dd>
            </div>
          ) : null}
        </dl>

        {program.affiliation ? (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[#94A3B8]">
            {program.affiliation}
          </p>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#1E3A8A]">
          View programme details
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

function InfoCard({
  title,
  description,
  icon: Icon,
  href,
  linkLabel,
  external,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  linkLabel: string;
  external?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]",
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-[#0F172A]">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748B]">{description}</p>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A8A] transition-colors hover:text-[#0B1F5B]"
      >
        {linkLabel}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </div>
  );
}

type AdmissionPageContentProps = {
  sections: ProgramSection[];
  helplines: readonly Helpline[];
  feeStructure: readonly FeeRow[];
  totalPrograms: number;
};

export function AdmissionPageContent({
  sections,
  helplines,
  feeStructure,
  totalPrograms,
}: AdmissionPageContentProps) {
  return (
    <div className="min-w-0 bg-gradient-to-b from-[#F8FAFF] to-white">
      {/* Admission process */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="admission-process">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            id="admission-process"
            eyebrow="How it works"
            title="Admission Process"
            description="A transparent, step-by-step pathway from application to confirmation at College of Engineering Poonjar."
          />

          <StaggerContainer className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {ADMISSION_STEPS.map((item) => (
              <StaggerItem key={item.step}>
                <StepCard {...item} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Programmes */}
      <section className="border-t border-slate-200/60 px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="admission-programmes">
        <div className="mx-auto max-w-6xl space-y-14">
          <SectionHeading
            id="admission-programmes"
            eyebrow="Programmes"
            title="Courses Available for Admission"
            description={`Explore ${totalPrograms} programme${totalPrograms === 1 ? "" : "s"} across UG, PG, and Diploma categories.`}
          />

          {sections.map(({ type, meta, rows }) => (
            <FadeInView key={type}>
              <div className="mb-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D4A017]">
                    {meta.label}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-[#0F172A] sm:text-2xl">
                    {meta.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{meta.blurb}</p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full border border-[#1E3A8A]/15 bg-white px-4 py-1.5 text-xs font-semibold text-[#1E3A8A] shadow-sm">
                  {rows.length} programme{rows.length === 1 ? "" : "s"}
                </span>
              </div>

              <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 xl:grid-cols-3">
                {rows.map((program) => (
                  <li key={program.slug}>
                    <ProgramCard program={program} label={meta.label} />
                  </li>
                ))}
              </ul>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* Important information */}
      <section className="border-t border-slate-200/60 px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="admission-info">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            id="admission-info"
            eyebrow="Essential information"
            title="Important Dates & Information"
            description="Official portals, support channels, and resources to guide your admission journey."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {IMPORTANT_INFO.map((item) => (
              <FadeInView key={item.title}>
                <InfoCard {...item} />
              </FadeInView>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <FadeInView>
              <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_28px_rgba(11,31,91,0.08)] sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
                    <Phone className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0F172A]">
                    Admission Helpline Numbers
                  </h3>
                </div>
                <ul className="mt-5 divide-y divide-slate-100">
                  {helplines.map((h) => (
                    <li
                      key={h.phone}
                      className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="text-sm font-medium text-[#334155]">{h.name}</span>
                      <a
                        href={`tel:${h.phone}`}
                        className="text-sm font-semibold text-[#1E3A8A] transition-colors hover:text-[#0B1F5B]"
                      >
                        {h.phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInView>

            <FadeInView delay={0.08}>
              <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_28px_rgba(11,31,91,0.08)] sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
                    <Download className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0F172A]">Fee Structure</h3>
                </div>
                <ul className="mt-5 divide-y divide-slate-100">
                  {[...feeStructure]
                    .sort((a, b) => a.order - b.order)
                    .map((row) => (
                      <li
                        key={row.course}
                        className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="text-sm font-medium text-[#334155]">{row.course}</span>
                        <a
                          href={row.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A8A] transition-colors hover:text-[#0B1F5B]"
                        >
                          Download
                          <Download className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </FadeInView>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <FadeInView>
              <div className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6 text-center shadow-[0_8px_28px_rgba(11,31,91,0.08)] sm:p-7 md:text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4A017]">
                  Lateral entry
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-[#0F172A]">
                  Degree lateral entry
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748B]">
                  Diploma holders may apply for lateral entry into degree programmes as per AICTE
                  and university regulations.
                </p>
                <Link
                  href="/admission/lateral"
                  className="mt-5 inline-flex items-center justify-center gap-2 self-center rounded-xl border border-[#1E3A8A]/20 bg-[#F8FAFF] px-4 py-2.5 text-sm font-semibold text-[#1E3A8A] transition hover:border-[#1E3A8A]/40 hover:bg-white md:self-start"
                >
                  Lateral entry admission
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </FadeInView>

            <FadeInView delay={0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-[#1E3A8A]/10 bg-gradient-to-br from-[#EEF4FF] to-white p-6 text-center shadow-[0_8px_28px_rgba(11,31,91,0.08)] sm:p-7 md:text-left">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4A017]">
                  Support
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-[#0F172A]">Need help?</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#64748B]">
                  Submit an admission enquiry and our office will respond during working hours.
                </p>
                <Link
                  href="/admission/enquiry"
                  className="mt-5 inline-flex items-center justify-center gap-2 self-center rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0B1F5B] md:self-start"
                >
                  Admission enquiry form
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="admission-cta">
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
                id="admission-cta"
                className="font-display text-[clamp(1.75rem,3vw+0.5rem,2.5rem)] font-bold text-white"
              >
                Ready to Join College of Engineering Poonjar?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-blue-100/90 sm:text-base">
                Take the next step towards academic excellence and career success.
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
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </FadeInView>
      </section>
    </div>
  );
}
