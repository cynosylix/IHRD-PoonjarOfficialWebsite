import type { Metadata } from "next";
import { iqacContent, iqacMembers } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { PageBanner } from "@/components/layout/page-banner";
import { Fragment } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "IQAC",
  description: "Internal Quality Assurance Cell — College of Engineering Poonjar.",
};

export default function IqacPage() {
  const members = [...iqacMembers].sort((a, b) => a.order - b.order);

  return (
    <div className="min-w-0">
      <PageBanner
        eyebrow="About"
        title="Internal Quality Assurance Cell or Internal Audit Cell (IQAC/IAC)"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "IQAC" }]}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-brand-900">About IQAC</h2>
          <div className="cms-content mt-3">
            <HtmlBlock html={iqacContent.intro} />
          </div>

          <h2 className="mt-10 text-xl font-semibold text-brand-900">Members</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <Table>
              <TableBody>
                {members.map((m) => (
                  <Fragment key={m.order}>
                    <TableRow>
                      <TableCell className="bg-slate-50 font-medium">{m.role}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{m.member}</TableCell>
                    </TableRow>
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
