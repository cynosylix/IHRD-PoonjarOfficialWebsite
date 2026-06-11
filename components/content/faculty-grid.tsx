import type { FacultyRow } from "@/data/site-data";
import { facultyPhotoUrl } from "@/lib/faculty-photo";
import { MemberGrid, type MemberGridEntry } from "@/components/content/member-grid";

type FacultyGridProps = {
  deptSlug: string;
  members: FacultyRow[];
  title?: string;
};

export function FacultyGrid({ deptSlug, members, title = "Faculty" }: FacultyGridProps) {
  const entries: MemberGridEntry[] = members.map((f) => ({
    name: f.name,
    lines: [f.designation, f.qualification].filter(Boolean) as string[],
    photoUrl: facultyPhotoUrl(deptSlug, f.order),
    order: f.order,
  }));

  return <MemberGrid title={title} members={entries} />;
}
