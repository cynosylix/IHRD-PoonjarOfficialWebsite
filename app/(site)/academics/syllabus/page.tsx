import type { Metadata } from "next";
import Link from "next/link";
import { syllabi, syllabusPageIntro, getDepartmentBySlug } from "@/data/site-data";
import { PageBanner } from "@/components/layout/page-banner";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Syllabus",
  description: "Download syllabus PDFs organised by department.",
};

export default function SyllabusPage() {
  const rows = [...syllabi].sort((a, b) => a.order - b.order);

  return (
    <div className="min-w-0">
      <PageBanner
        eyebrow="Academics"
        title="Syllabus"
        description={syllabusPageIntro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Academics" },
          { label: "Syllabus" },
        ]}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Resource</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-slate-500">
                      No syllabus files listed yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((s) => {
                    const dept = s.departmentSlug
                      ? getDepartmentBySlug(s.departmentSlug)
                      : undefined;
                    return (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.title}</TableCell>
                        <TableCell>
                          {dept ? (
                            <Link
                              href={`/academics/departments/${dept.slug}`}
                              className="text-brand-700 hover:underline"
                            >
                              {dept.name}
                            </Link>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell>{s.semester ?? "—"}</TableCell>
                        <TableCell>{s.academicYear ?? "—"}</TableCell>
                        <TableCell className="text-right">
                          <a
                            href={s.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline"
                          >
                            <Download className="h-4 w-4" aria-hidden />
                            {s.fileUrl.endsWith(".pdf") ? "PDF" : "Visit site"}
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
