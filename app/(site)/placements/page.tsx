import type { Metadata } from "next";
import {
  placementOverview,
  placementTeamMembers,
  placementDrives,
  placementStatistics,
  placementActivities,
} from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "@/lib/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Placements",
  description: "Training and placement cell — drives, statistics, and activities.",
};

export default function PlacementsPage() {
  const members = [...placementTeamMembers].sort((a, b) => a.order - b.order);
  const drives = placementDrives;
  const stats = [...placementStatistics].sort((a, b) =>
    b.academicYear.localeCompare(a.academicYear),
  );
  const activities = [...placementActivities].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Placements</h1>
      <div className="cms-content mt-6 max-w-3xl">
        <HtmlBlock html={placementOverview.content} />
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-brand-900">Placement cell members</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <Card key={m.name} className={m.isOfficer ? "border-brand-300" : ""}>
              <CardHeader>
                <CardTitle className="text-base">{m.name}</CardTitle>
                <CardDescription>{m.role}</CardDescription>
                {m.isOfficer && (
                  <p className="text-xs font-semibold uppercase text-brand-600">
                    Placement officer
                  </p>
                )}
                {(m.email || m.phone) && (
                  <p className="text-xs text-slate-600">
                    {[m.email, m.phone].filter(Boolean).join(" · ")}
                  </p>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-brand-900">Recruitment drives</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Selected</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drives.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-500">
                    No drives listed yet.
                  </TableCell>
                </TableRow>
              ) : (
                drives.map((d) => (
                  <TableRow key={d.company}>
                    <TableCell className="font-medium">{d.company}</TableCell>
                    <TableCell>
                      {d.driveDate ? format.date(d.driveDate) : "—"}
                    </TableCell>
                    <TableCell>{d.package ?? "—"}</TableCell>
                    <TableCell>{d.selectedCount ?? "—"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-brand-900">Placement statistics</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Offers</TableHead>
                <TableHead>Highest</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Placement %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.map((s) => (
                <TableRow key={s.academicYear}>
                  <TableCell className="font-medium">{s.academicYear}</TableCell>
                  <TableCell>{s.totalOffers ?? "—"}</TableCell>
                  <TableCell>{s.highestPackage ?? "—"}</TableCell>
                  <TableCell>{s.averagePackage ?? "—"}</TableCell>
                  <TableCell>
                    {s.placementPercent != null ? `${s.placementPercent}%` : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-brand-900">
          Activities and training
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {activities.map((a) => (
            <Card key={a.title}>
              <CardHeader>
                <CardTitle className="text-base">{a.title}</CardTitle>
                <CardDescription>{a.description}</CardDescription>
                {a.activityDate && (
                  <p className="text-xs text-slate-500">{format.date(a.activityDate)}</p>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
