import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { programs, type ProgramType } from "@/data/site-data";
import { Card } from "@/components/ui/card";
import {
  ProgramTierCards,
  type ProgramTierPayload,
} from "@/components/academics/program-tier-cards";

export const metadata: Metadata = {
  title: "Academic Opportunities",
  description: "UG, PG, and Diploma programmes at College of Engineering Poonjar.",
};

const SECTION_META: Record<
  ProgramType,
  { title: string; blurb: string }
> = {
  UG: {
    title: "Undergraduate (UG)",
    blurb: "Four-year B.Tech degrees affiliated to APJ Abdul Kalam Technological University.",
  },
  PG: {
    title: "Postgraduate (PG)",
    blurb: "Advanced programmes for students who have completed a recognised bachelor’s degree.",
  },
  DIPLOMA: {
    title: "Diploma",
    blurb: "Technical diploma tracks under SBTE Kerala with industry-aligned foundations.",
  },
};

const SECTION_ORDER: ProgramType[] = ["UG", "PG", "DIPLOMA"];

function buildTierPayload(): ProgramTierPayload[] {
  return SECTION_ORDER.flatMap((type) => {
    const rows = programs.filter((p) => p.type === type).sort((a, b) => a.order - b.order);
    if (rows.length === 0) return [];
    const meta = SECTION_META[type];
    return [
      {
        type,
        title: meta.title,
        blurb: meta.blurb,
        programs: rows.map((r) => ({
          slug: r.slug,
          name: r.name,
          duration: r.duration,
          intake: r.intake,
          affiliation: r.affiliation,
        })),
      },
    ];
  });
}

export default function ProgramsPage() {
  const tiers = buildTierPayload();
  const ug = programs.filter((p) => p.type === "UG").length;
  const pg = programs.filter((p) => p.type === "PG").length;
  const dip = programs.filter((p) => p.type === "DIPLOMA").length;

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
            <span className="text-white/50">Academics</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
            <span className="text-white">Academic Opportunities</span>
          </nav>
          <div className="mt-6 flex flex-col items-center gap-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
                Academics
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.5rem] md:leading-tight">
                Academic Opportunities
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-100 sm:text-base">
                Explore our undergraduate, postgraduate, and diploma programmes designed to
                support your academic and career goals. Admissions, intake, and accreditation are
                subject to university and government regulations. Please contact the office for the
                latest updates and details.
              </p>
            </div>
            <div className="grid w-full max-w-md grid-cols-3 gap-2 sm:max-w-lg sm:gap-3">
              {[
                { label: "UG", value: ug, href: "#ug" },
                { label: "PG", value: pg, href: "#pg" },
                { label: "Diploma", value: dip, href: "#diploma" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-3 text-center backdrop-blur-sm transition hover:border-white/35 hover:bg-white/15 sm:px-4 sm:py-4"
                >
                  <p className="text-2xl font-bold tabular-nums sm:text-3xl">{s.value}</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-200 sm:text-xs">
                    {s.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 text-sm text-slate-600 sm:px-6 lg:px-8">
          <BookOpen className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
          <span>
            Departments and curriculum details are listed under{" "}
            <Link href="/academics/departments" className="font-medium text-brand-700 underline-offset-2 hover:underline">
              Departments
            </Link>
            .
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
          <ProgramTierCards tiers={tiers} />

          <Card className="border-brand-200/60 bg-gradient-to-br from-brand-50/80 to-white p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-brand-950 sm:text-xl">
                  Ready to apply?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                  View eligibility, allotment process, and important links for each admission
                  track on the admissions page.
                </p>
              </div>
              <Link
                href="/admission"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Admissions
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
