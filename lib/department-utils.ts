import type { Department, ProgramRow } from "@/data/site-data";
import { programs } from "@/data/site-data";

export function excerptHtml(html: string, max = 140) {
  const text = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export function getProgramCountForDepartment(slug: string): number {
  return getProgramsForDepartment(slug).length;
}

export function getProgramsForDepartment(slug: string): ProgramRow[] {
  return programs
    .filter((p) => p.departmentSlug === slug)
    .sort((a, b) => a.order - b.order);
}

export function programCourseLabel(program: ProgramRow): string {
  if ((program.name === "MCA" || program.name === "BCA") && program.fullName) {
    return `${program.name} – ${program.fullName}`;
  }
  return program.fullName ?? program.name;
}

export type DepartmentFilterId =
  | "all"
  | "engineering"
  | "computer-science"
  | "computer-applications"
  | "electronics"
  | "electrical"
  | "mechanical"
  | "applied-sciences";

export const DEPARTMENT_FILTERS: { id: DepartmentFilterId; label: string }[] = [
  { id: "all", label: "All Departments" },
  { id: "engineering", label: "Engineering" },
  { id: "computer-science", label: "Computer Science" },
  { id: "computer-applications", label: "Computer Applications" },
  { id: "electronics", label: "Electronics" },
  { id: "electrical", label: "Electrical" },
  { id: "mechanical", label: "Mechanical" },
  { id: "applied-sciences", label: "Applied Sciences" },
];

const FILTER_SLUGS: Record<Exclude<DepartmentFilterId, "all">, string[]> = {
  engineering: [
    "computer-science-engineering",
    "electronics-communication-engineering",
    "electrical-electronics-engineering",
    "automobile-engineering",
  ],
  "computer-science": ["computer-science-engineering"],
  "computer-applications": ["computer-applications"],
  electronics: ["electronics-communication-engineering"],
  electrical: ["electrical-electronics-engineering"],
  mechanical: ["automobile-engineering"],
  "applied-sciences": ["applied-science"],
};

export function departmentMatchesFilter(dept: Department, filter: DepartmentFilterId): boolean {
  if (filter === "all") return true;
  return FILTER_SLUGS[filter].includes(dept.slug);
}

export const DEPARTMENT_PORTAL_STATS = [
  { value: 50, suffix: "+", label: "Faculty Members" },
  { value: 2000, suffix: "+", label: "Students" },
  { value: 25, suffix: "+", label: "Years of Excellence" },
] as const;

export const DEPARTMENT_WHY_CHOOSE = [
  {
    title: "Industry-Relevant Curriculum",
    description:
      "Programmes aligned with university standards and industry needs, blending rigorous theory with project-based learning.",
    icon: "book" as const,
  },
  {
    title: "Experienced Faculty",
    description:
      "Dedicated educators and researchers who mentor students through academics, laboratories, and professional development.",
    icon: "users" as const,
  },
  {
    title: "Modern Laboratories",
    description:
      "Well-equipped labs and workshops that give students hands-on experience with contemporary tools and technologies.",
    icon: "flask" as const,
  },
  {
    title: "Placement Support",
    description:
      "Career guidance, training, and placement assistance through the institutional placement unit and industry connect.",
    icon: "briefcase" as const,
  },
] as const;
