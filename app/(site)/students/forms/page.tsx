import type { Metadata } from "next";
import { studentForms } from "@/data/site-data";
import { PageShell } from "@/components/layout/page-shell";
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
  title: "Application Forms",
  description: "Downloadable student application forms and certificates.",
};

export default function StudentFormsPage() {
  const forms = [...studentForms].sort((a, b) => a.order - b.order);

  return (
    <PageShell
      eyebrow="Students"
      title="Application Forms"
      description="Download common application forms, no-dues certificates, semester registration, and permission forms."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Students", href: "/students" },
        { label: "Application Forms" },
      ]}
      maxWidth="max-w-4xl"
    >
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="font-medium">{f.title}</TableCell>
                <TableCell className="text-right">
                  <a
                    href={f.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline"
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    PDF
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PageShell>
  );
}
