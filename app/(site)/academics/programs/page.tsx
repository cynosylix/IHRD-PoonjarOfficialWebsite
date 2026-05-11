import type { Metadata } from "next";
import { programs, type ProgramType } from "@/data/site-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Programs Offered",
  description: "UG, PG, and Diploma programmes at College of Engineering Poonjar.",
};

function ProgramTable({ title, type }: { title: string; type: ProgramType }) {
  const rows = programs.filter((p) => p.type === type).sort((a, b) => a.order - b.order);
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-brand-900">{title}</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Programme</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Affiliation</TableHead>
              <TableHead>Intake</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.name}>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.duration ?? "—"}</TableCell>
                <TableCell>{r.affiliation ?? "—"}</TableCell>
                <TableCell>{r.intake ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Programs Offered</h1>
      <p className="mt-3 text-slate-600">
        Programmes are offered as per university and government regulations. Contact
        the office for the latest intake and accreditation status.
      </p>
      <ProgramTable title="Undergraduate (UG)" type="UG" />
      <ProgramTable title="Postgraduate (PG)" type="PG" />
      <ProgramTable title="Diploma" type="DIPLOMA" />
    </div>
  );
}
