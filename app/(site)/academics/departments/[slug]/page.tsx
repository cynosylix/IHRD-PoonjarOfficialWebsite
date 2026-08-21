import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { departments, getDepartmentBySlug, getProgramsByDepartmentSlug } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { FacultyGrid } from "@/components/content/faculty-grid";
import { PageShell } from "@/components/layout/page-shell";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);
  return {
    title: dept?.name ?? "Department",
    description: dept?.intro.slice(0, 160),
  };
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);
  if (!dept) notFound();

  const deptPrograms = getProgramsByDepartmentSlug(slug);
  const faculty = dept.faculties
    .filter((f) => !f.isLabCoordinator)
    .sort((a, b) => a.order - b.order);
  const labCoordinators = dept.faculties
    .filter((f) => f.isLabCoordinator)
    .sort((a, b) => a.order - b.order);

  return (
    <PageShell
      eyebrow="Academics"
      title={dept.name}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Academics" },
        { label: "Departments", href: "/academics/departments" },
        { label: dept.shortName ?? dept.name },
      ]}
    >
      <div className="cms-content">
        <HtmlBlock html={dept.intro} />
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-brand-900">Vision</h2>
          <div className="cms-content mt-3">
            <HtmlBlock html={dept.vision} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-brand-900">Mission</h2>
          <div className="cms-content mt-3">
            <HtmlBlock html={dept.mission} />
          </div>
        </div>
      </div>

      {deptPrograms.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-brand-900">Programmes</h2>
          <ul className="mt-4 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {deptPrograms.map((program) => (
              <li key={program.slug}>
                <Link
                  href={`/academics/programs/${program.slug}`}
                  className="group flex h-full items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition-colors hover:border-[#1E3A8A]/30 hover:bg-[#F8FAFF]"
                >
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E3A8A]">
                      {program.name}
                    </span>
                    <span className="mt-1 block font-display text-base font-semibold text-[#0F172A]">
                      {program.fullName ?? program.name}
                    </span>
                  </span>
                  <ArrowRight
                    className="mt-1 h-4 w-4 shrink-0 text-[#1E3A8A] transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <FacultyGrid deptSlug={slug} members={faculty} title="Faculty" />

      {labCoordinators.length > 0 ? (
        <FacultyGrid deptSlug={slug} members={labCoordinators} title="Lab coordinators" />
      ) : null}
    </PageShell>
  );
}
