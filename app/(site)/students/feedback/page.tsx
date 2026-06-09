import type { Metadata } from "next";
import { facultyFeedbackForms } from "@/data/site-data";
import { PageShell } from "@/components/layout/page-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Faculty Feedback Forms",
  description: "Course-wise faculty feedback forms for students.",
};

export default function StudentFeedbackPage() {
  const forms = [...facultyFeedbackForms].sort((a, b) => a.order - b.order);

  return (
    <PageShell
      eyebrow="Students"
      title="Faculty Feedback Forms"
      description="Course-wise feedback forms for diploma and degree programmes."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Students", href: "/students" },
        { label: "Faculty Feedback Forms" },
      ]}
      maxWidth="max-w-4xl"
    >
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Form</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="font-medium">{f.title}</TableCell>
                <TableCell className="text-right">
                  {f.status === "open" && f.fileUrl ? (
                    <a
                      href={f.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-brand-700 hover:underline"
                    >
                      Clink Here
                    </a>
                  ) : (
                    <span className="text-sm text-slate-600">Closed</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PageShell>
  );
}
