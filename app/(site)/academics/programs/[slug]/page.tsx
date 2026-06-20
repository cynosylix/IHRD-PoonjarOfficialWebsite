import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { HtmlBlock } from "@/components/content/html-block";
import { ProgramDetailPageView } from "@/components/programs/program-detail-page-view";
import { PageBanner } from "@/components/layout/page-banner";
import { Card } from "@/components/ui/card";
import {
  extractProgramDescription,
  getProgramDetailConfig,
  usesPremiumProgramLayout,
} from "@/data/program-detail-config";
import {
  getDepartmentBySlug,
  getProgramBySlug,
  programs,
  syllabi,
  type ProgramType,
} from "@/data/site-data";

type Props = { params: Promise<{ slug: string }> };

const TYPE_LABEL: Record<ProgramType, string> = {
  UG: "Undergraduate",
  PG: "Postgraduate",
  DIPLOMA: "Diploma",
};

export function generateStaticParams() {
  return [
    ...programs.map((p) => ({ slug: p.slug })),
    { slug: "diploma-engineering" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  return {
    title: program?.fullName ?? program?.name ?? "Programme",
    description: program?.about?.replace(/<[^>]+>/g, " ").slice(0, 160) ?? "",
  };
}

function getProspectusUrl(departmentSlug?: string, programName?: string): string {
  const match = syllabi.find(
    (s) =>
      s.departmentSlug === departmentSlug &&
      (programName ? s.title.toLowerCase().includes("b.tech") : true),
  );
  return match?.fileUrl ?? "https://ktu.edu.in/en/academic/syllabus";
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const typeLabel = TYPE_LABEL[program.type];
  const resolvedSlug = program.slug;

  if (usesPremiumProgramLayout(resolvedSlug)) {
    const config = getProgramDetailConfig(resolvedSlug, program)!;
    const department = program.departmentSlug
      ? getDepartmentBySlug(program.departmentSlug)
      : undefined;

    const defaultDepartment =
      program.type === "DIPLOMA"
        ? "Polytechnic Department"
        : resolvedSlug === "mca"
          ? "Computer Applications"
          : "Engineering Department";

    return (
      <ProgramDetailPageView
        program={program}
        typeLabel={typeLabel}
        departmentName={department?.name ?? defaultDepartment}
        shortDescription={config.heroSummary ?? extractProgramDescription(program.about)}
        heroImage={config.heroImage}
        careers={config.careers}
        prospectusUrl={getProspectusUrl(program.departmentSlug, program.name)}
        config={config}
      />
    );
  }

  const heroTitle = program.fullName ?? program.name;

  return (
    <div className="min-w-0">
      <PageBanner
        eyebrow={typeLabel}
        title={heroTitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Academic Opportunities", href: "/academics/programs" },
          { label: heroTitle },
        ]}
      >
        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-100">
          {program.duration ? (
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-brand-200">
                Duration
              </dt>
              <dd className="mt-0.5 font-medium text-white">{program.duration}</dd>
            </div>
          ) : null}
          {program.intake ? (
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-brand-200">
                Intake
              </dt>
              <dd className="mt-0.5 font-medium text-white">{program.intake}</dd>
            </div>
          ) : null}
          {program.affiliation ? (
            <div className="min-w-0 max-w-xl">
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-brand-200">
                Affiliation
              </dt>
              <dd className="mt-0.5 font-medium text-white">{program.affiliation}</dd>
            </div>
          ) : null}
        </dl>
      </PageBanner>

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
          <section>
            <h2 className="text-xl font-bold text-brand-950 sm:text-2xl">About the programme</h2>
            <div className="cms-content mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <HtmlBlock html={program.about} />
            </div>
          </section>

          {program.eligibility ? (
            <section>
              <h2 className="text-xl font-bold text-brand-950 sm:text-2xl">Academic eligibility</h2>
              <div className="cms-content mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                <HtmlBlock html={program.eligibility} />
              </div>
            </section>
          ) : null}

          {program.allotment ? (
            <section>
              <h2 className="text-xl font-bold text-brand-950 sm:text-2xl">Allotment</h2>
              <div className="cms-content mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                <HtmlBlock html={program.allotment} />
              </div>
            </section>
          ) : null}

          <section>
            <h2 className="text-xl font-bold text-brand-950 sm:text-2xl">Programme objectives</h2>
            <ul className="mt-4 space-y-3">
              {program.objectives.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 text-sm leading-relaxed text-slate-700 shadow-sm"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-950 sm:text-2xl">What you will learn</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {program.learnings.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3.5 text-sm leading-relaxed text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-950 sm:text-2xl">Course outcomes</h2>
            <ol className="mt-4 list-none space-y-3">
              {program.outcomes.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-700">{item}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-950 sm:text-2xl">Programme details</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <dl className="divide-y divide-slate-100">
                <div className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-brand-900">Programme type</dt>
                  <dd className="text-sm text-slate-600">{typeLabel} ({program.type})</dd>
                </div>
                {program.duration ? (
                  <div className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-brand-900">Duration</dt>
                    <dd className="text-sm text-slate-600">{program.duration}</dd>
                  </div>
                ) : null}
                {program.intake ? (
                  <div className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-brand-900">Intake</dt>
                    <dd className="text-sm text-slate-600">{program.intake}</dd>
                  </div>
                ) : null}
                {program.affiliation ? (
                  <div className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-brand-900">Affiliation</dt>
                    <dd className="text-sm text-slate-600">{program.affiliation}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
            {program.departmentSlug ? (
              <p className="mt-4 text-sm text-slate-600">
                Faculty and department information:{" "}
                <Link
                  href={`/academics/departments/${program.departmentSlug}`}
                  className="font-medium text-brand-700 underline-offset-2 hover:underline"
                >
                  View department
                </Link>
              </p>
            ) : null}
          </section>

          <Card className="border-brand-200/60 bg-gradient-to-br from-brand-50/80 to-white p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-brand-950">Interested in this programme?</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Check eligibility, allotment, and application steps on the admissions page.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:shrink-0 sm:flex-row">
                <Link
                  href="/academics/programs"
                  className="inline-flex items-center justify-center rounded-xl border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                >
                  All programmes
                </Link>
                <Link
                  href="/admission"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700"
                >
                  Admissions
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
