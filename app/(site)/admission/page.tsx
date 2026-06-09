import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageBanner } from "@/components/layout/page-banner";
import {
  admissionFeeStructure,
  admissionHelplines,
  programs,
  pageHeroImages,
  type ProgramType,
} from "@/data/site-data";
import { PageHeroImage } from "@/components/layout/page-hero-image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Admission",
  description: "Programme-wise admission information for UG, PG, and Diploma courses.",
};

const SECTION_META: Record<
  ProgramType,
  { title: string; blurb: string; label: string }
> = {
  UG: {
    label: "UG",
    title: "B.Tech Admission",
    blurb: "Full-time graduate courses of APJ Abdul Kalam Technological University (KTU), approved by AICTE.",
  },
  PG: {
    label: "PG",
    title: "MCA Admission",
    blurb: "Master of Computer Applications (MCA) of APJ Abdul Kalam Technological University (KTU), approved by AICTE.",
  },
  DIPLOMA: {
    label: "Diploma",
    title: "Diploma Admission",
    blurb: "Three year regular diploma courses affiliated to the Board of Technical Education, Kerala.",
  },
};

const SECTION_ORDER: ProgramType[] = ["UG", "PG", "DIPLOMA"];

function programLabel(name: string, fullName?: string) {
  return fullName ?? name;
}

export default function AdmissionHubPage() {
  const total = programs.length;
  const sections = SECTION_ORDER.map((type) => ({
    type,
    meta: SECTION_META[type],
    rows: programs.filter((p) => p.type === type).sort((a, b) => a.order - b.order),
  })).filter((s) => s.rows.length > 0);

  return (
    <div className="min-w-0">
      <PageBanner
        eyebrow="Admissions"
        title="Admission"
        description="Choose a programme to view academic eligibility, allotment process, course objectives, outcomes, and complete programme information."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Admission" }]}
        centered
      >
        <p className="mt-4 text-sm font-medium text-brand-200">
          {total} programme{total === 1 ? "" : "s"} available
        </p>
      </PageBanner>

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
          {pageHeroImages["/admission"] && (
            <PageHeroImage
              src={pageHeroImages["/admission"].src}
              alt={pageHeroImages["/admission"].alt}
              className="mb-0"
            />
          )}
          {sections.map(({ type, meta, rows }) => (
            <section key={type} aria-labelledby={`admission-${type.toLowerCase()}`}>
              <div className="flex flex-col items-center gap-3 border-b border-slate-200/80 pb-4 text-center">
                <div className="min-w-0 max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                    {meta.label}
                  </p>
                  <h2
                    id={`admission-${type.toLowerCase()}`}
                    className="mt-1 text-xl font-bold text-brand-950 sm:text-2xl"
                  >
                    {meta.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{meta.blurb}</p>
                </div>
                <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
                  {rows.length} programme{rows.length === 1 ? "" : "s"}
                </span>
              </div>

              <ul className="mt-6 flex list-none flex-wrap justify-center gap-4 p-0">
                {rows.map((program) => (
                  <li
                    key={program.slug}
                    className="w-full min-w-0 max-w-sm sm:w-[calc(50%-0.5rem)] sm:max-w-[19rem] xl:w-[calc(33.333%-0.67rem)]"
                  >
                    <Link
                      href={`/academics/programs/${program.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-200/80 bg-white shadow-card transition hover:border-brand-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    >
                      <div
                        className="h-1 shrink-0 bg-gradient-to-r from-brand-600 to-brand-700"
                        aria-hidden
                      />
                      <div className="flex min-h-[11.5rem] flex-1 flex-col p-5 sm:min-h-[12rem] sm:p-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                          {meta.label}
                        </p>
                        <h3 className="mt-2 text-base font-bold leading-snug text-brand-950 transition-colors group-hover:text-brand-700 sm:text-[1.05rem]">
                          {programLabel(program.name, program.fullName)}
                        </h3>

                        <dl className="mt-3 space-y-1.5 text-xs text-slate-600">
                          {program.duration ? (
                            <div className="flex gap-2">
                              <dt className="shrink-0 font-semibold text-slate-500">Duration</dt>
                              <dd>{program.duration}</dd>
                            </div>
                          ) : null}
                          {program.intake ? (
                            <div className="flex gap-2">
                              <dt className="shrink-0 font-semibold text-slate-500">Intake</dt>
                              <dd>{program.intake}</dd>
                            </div>
                          ) : null}
                        </dl>

                        {program.affiliation ? (
                          <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-slate-500">
                            {program.affiliation}
                          </p>
                        ) : null}

                        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-brand-600 transition-colors group-hover:text-brand-700">
                          View programme details
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section aria-labelledby="admission-helplines">
            <h2
              id="admission-helplines"
              className="text-center text-xl font-bold text-brand-950 sm:text-2xl"
            >
              Admission Helpline Numbers
            </h2>
            <div className="mx-auto mt-6 max-w-lg overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <Table>
                <TableBody>
                  {admissionHelplines.map((h) => (
                    <TableRow key={h.phone}>
                      <TableCell className="font-medium">{h.name}</TableCell>
                      <TableCell>
                        <a
                          href={`tel:${h.phone}`}
                          className="text-brand-700 hover:underline"
                        >
                          {h.phone}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section aria-labelledby="admission-fee-structure">
            <h2
              id="admission-fee-structure"
              className="text-center text-xl font-bold text-brand-700 sm:text-2xl"
            >
              Fee Structure
            </h2>
            <div className="mx-auto mt-6 max-w-2xl overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Fee</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...admissionFeeStructure]
                    .sort((a, b) => a.order - b.order)
                    .map((row) => (
                      <TableRow key={row.course}>
                        <TableCell className="font-medium">{row.course}</TableCell>
                        <TableCell className="text-right">
                          <a
                            href={row.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold text-brand-700 hover:underline"
                          >
                            Download
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            aria-label="Additional admission resources"
          >
            <div className="flex h-full w-full max-w-sm flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                Lateral entry
              </p>
              <h2 className="mt-2 text-lg font-bold text-brand-950">Degree lateral entry</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                Diploma holders may apply for lateral entry into degree programmes as per
                AICTE and university regulations.
              </p>
              <Link
                href="/admission/lateral"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-brand-50/50 px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
              >
                Lateral entry admission
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="flex h-full w-full max-w-sm flex-col items-center rounded-2xl border border-brand-200/60 bg-gradient-to-br from-brand-50/80 to-white p-6 text-center shadow-sm sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-600">
                Support
              </p>
              <h2 className="mt-2 text-lg font-bold text-brand-950">Need help?</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                Submit an admission enquiry and our office will respond during working
                hours.
              </p>
              <Link
                href="/admission/enquiry"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700"
              >
                Admission enquiry form
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
