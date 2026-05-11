import type { Metadata } from "next";
import { iqacContent, iqacMembers } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "IQAC",
  description: "Internal Quality Assurance Cell — College of Engineering Poonjar.",
};

export default function IqacPage() {
  const members = [...iqacMembers].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">IQAC</h1>
      <div className="cms-content mt-6">
        <HtmlBlock html={iqacContent.intro} />
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-brand-900">Functions</h2>
        <div className="cms-content mt-3">
          <HtmlBlock html={iqacContent.functions ?? ""} />
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-brand-900">Members</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.name}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>{m.designation}</TableCell>
                  <TableCell>{m.department ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
