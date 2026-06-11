import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { departments, getDepartmentBySlug } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { FacultyGrid } from "@/components/content/faculty-grid";
import { PageShell } from "@/components/layout/page-shell";

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

      <FacultyGrid deptSlug={slug} members={faculty} title="Faculty" />

      {labCoordinators.length > 0 ? (
        <FacultyGrid deptSlug={slug} members={labCoordinators} title="Lab coordinators" />
      ) : null}
    </PageShell>
  );
}
