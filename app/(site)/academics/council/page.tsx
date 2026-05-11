import type { Metadata } from "next";
import { academicCouncilMembers, academicCouncilPage } from "@/data/site-data";
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
  title: "Academic Council",
  description: "Academic Council — roles, functions, and members.",
};

export default function AcademicCouncilPage() {
  const members = [...academicCouncilMembers].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Academic Council</h1>
      <div className="cms-content mt-6">
        <HtmlBlock html={academicCouncilPage.description} />
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-brand-900">Functions</h2>
        <div className="cms-content mt-3">
          <HtmlBlock html={academicCouncilPage.functions} />
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.name}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>{m.designation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
