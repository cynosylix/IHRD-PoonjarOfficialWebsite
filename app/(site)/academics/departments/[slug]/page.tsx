import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { departments, getDepartmentBySlug } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
        Department
      </p>
      <h1 className="mt-2 text-3xl font-bold text-brand-950">{dept.name}</h1>
      <div className="cms-content mt-6">
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

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-brand-900">Faculty</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Qualification</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faculty.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-slate-500">
                    No faculty records.
                  </TableCell>
                </TableRow>
              ) : (
                faculty.map((f) => (
                  <TableRow key={f.name}>
                    <TableCell className="font-medium">{f.name}</TableCell>
                    <TableCell>{f.designation}</TableCell>
                    <TableCell>{f.qualification ?? "—"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-brand-900">Lab coordinators</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labCoordinators.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-slate-500">
                    No lab coordinators listed.
                  </TableCell>
                </TableRow>
              ) : (
                labCoordinators.map((f) => (
                  <TableRow key={f.name}>
                    <TableCell className="font-medium">{f.name}</TableCell>
                    <TableCell>{f.designation}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
