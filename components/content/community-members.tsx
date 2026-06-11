import type { CommunityMember } from "@/data/site-data";
import { MemberGrid } from "@/components/content/member-grid";
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
};

export function CommunityMembers({ kind, members, title = "Members" }: CommunityMembersProps) {
  if (members.length === 0) return null;

  if (kind === "PTA") {
    return (
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-brand-900">{title}</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>{m.role ?? "—"}</TableCell>
                  <TableCell>
                    {m.phone ? (
                      <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="text-brand-700 hover:underline">
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
      </section>
    );
  }

  return (
    <MemberGrid
      title={title}
      communityKind={kind}
      members={members.map((m) => ({
        name: m.name,
        lines: m.role ? [m.role] : undefined,
        order: m.order,
      }))}
    />
  );
}
