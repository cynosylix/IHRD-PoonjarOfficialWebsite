"use client";

import type { CommunityMember } from "@/data/site-data";
import { MemberGrid } from "@/components/content/member-grid";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeInView } from "@/components/motion/fade-in-view";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CommunityMembersProps = {
  kind: string;
  members: CommunityMember[];
  title?: string;
  premium?: boolean;
};

export function CommunityMembers({
  kind,
  members,
  title = "Members",
  premium = false,
}: CommunityMembersProps) {
  if (members.length === 0) return null;

  if (kind === "PTA") {
    return (
      <FadeInView className={premium ? "mt-14 sm:mt-16" : "mt-12"}>
        {premium ? (
          <SectionHeading
            underline
            eyebrow="Leadership"
            title={title}
            description="Parent-Teacher Association general body representatives."
            className="max-w-2xl"
          />
        ) : (
          <h2 className="text-xl font-semibold text-brand-900">{title}</h2>
        )}
        <div
          className={
            premium
              ? "mt-8 overflow-x-auto rounded-xl border border-black/[0.06] bg-white shadow-[0_8px_28px_rgba(11,31,91,0.08)]"
              : "mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white"
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={`${m.name}-${m.order}`}>
                  <TableCell className="font-medium text-[#0F172A]">{m.name}</TableCell>
                  <TableCell className="text-[#64748B]">{m.role ?? "—"}</TableCell>
                  <TableCell>
                    {m.phone ? (
                      <a
                        href={`tel:${m.phone.replace(/\s/g, "")}`}
                        className="font-medium text-[#1E3A8A] hover:underline"
                      >
                        {m.phone}
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
      </FadeInView>
    );
  }

  return (
    <MemberGrid
      title={title}
      communityKind={kind}
      premium={premium}
      members={members.map((m) => ({
        name: m.name,
        lines: m.role ? [m.role] : undefined,
        order: m.order,
      }))}
    />
  );
}
