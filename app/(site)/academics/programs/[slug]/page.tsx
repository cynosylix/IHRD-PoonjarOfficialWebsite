import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { HtmlBlock } from "@/components/content/html-block";
import { Card } from "@/components/ui/card";
import {
  getProgramBySlug,
  programs,
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

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const typeLabel = TYPE_LABEL[program.type];
  const heroTitle = program.fullName ?? program.name;

  return (
    <div className="min-w-0">
      <header className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-brand-400 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-brand-300 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav className="flex flex-wrap items-center justify-start gap-1 text-xs font-medium text-white/70 sm:text-sm">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
            <Link href="/academics/programs" className="transition hover:text-white">
              Academic Opportunities
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
            <span className="line-clamp-1 text-white">{heroTitle}</span>
          </nav>
          <div className="mt-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
              {typeLabel}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{heroTitle}</h1>
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
                <div className="min-w-[12rem] max-w-xl">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-brand-200">
                    Affiliation
                  </dt>
                  <dd className="mt-0.5 font-medium text-white">{program.affiliation}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </header>

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
            <h2 className="text-xl font-bold text-brand-950 sm:text-2xl">
              What you will learn
            </h2>
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
              <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0">
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
