import type { Metadata } from "next";
import Link from "next/link";
import { syllabi, getDepartmentBySlug } from "@/data/site-data";
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
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Syllabus</h1>
      <p className="mt-3 text-slate-600">
        Official syllabus resources from the university and state board. Department-specific PDFs
        may also be available from the college office.
      </p>
      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
  );
}
