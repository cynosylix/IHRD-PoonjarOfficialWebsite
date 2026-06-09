import type { Metadata } from "next";
import { placementOverview, placementTeamMembers } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { PageBanner } from "@/components/layout/page-banner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Placement",
  description: "Career Guidance and Placement Unit — College of Engineering Poonjar.",
};

export default function PlacementsPage() {
  const members = [...placementTeamMembers].sort((a, b) => a.order - b.order);

  return (
    <div className="min-w-0">
      <PageBanner
        title="Placement"
        description="Career Guidance and Placement Unit — training, recruitment drives, and industry partnerships."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Placement" }]}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="cms-content">
            <HtmlBlock html={placementOverview.content} />
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell>{m.role}</TableCell>
                    <TableCell>
                      {m.email ? (
                        <a href={`mailto:${m.email}`} className="break-all text-brand-700 hover:underline">
                          {m.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
