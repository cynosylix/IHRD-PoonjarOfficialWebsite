import type { Metadata } from "next";
import { studentForms } from "@/data/site-data";
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
  title: "Student forms",
  description: "Downloadable student forms and certificates.",
};

export default function StudentFormsPage() {
  const forms = [...studentForms].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Downloadable forms</h1>
      <p className="mt-3 text-slate-600">
        Downloadable forms and office procedures for students. Contact the college office if
        you need assistance.
      </p>
      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-500">
                  No forms listed yet.
                </TableCell>
              </TableRow>
            ) : (
              forms.map((f) => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.title}</TableCell>
                  <TableCell className="capitalize">{f.category}</TableCell>
                  <TableCell className="text-right">
                    <a
                      href={f.fileUrl}
                      {...(f.fileUrl.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline"
                    >
                      <Download className="h-4 w-4" />
                      {f.fileUrl.startsWith("http")
                        ? "Download"
                        : f.category === "office"
                          ? "Details"
                          : "Open"}
                    </a>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
