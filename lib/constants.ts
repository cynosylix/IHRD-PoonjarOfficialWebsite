/** Primary navigation — public site */
export const MAIN_NAV = [
  { href: "/", label: "Home" },
  { href: "/about/institution", label: "About" },
  { href: "/academics/programs", label: "Academics" },
  { href: "/admission", label: "Admission" },
  { href: "/students", label: "Students" },
  { href: "/placements", label: "Placements" },
  { href: "/facilities", label: "Facilities" },
  { href: "/community", label: "Community" },
  { href: "/contact", label: "Contact Us" },
] as const;

/** About / Academics dropdown */
export const ABOUT_DROPDOWN = [
  { href: "/about/institution", label: "About Institution" },
  { href: "/about/principal", label: "Principal’s Desk" },
  { href: "/about/departments", label: "Departments" },
  { href: "/about/iqac", label: "IQAC" },
  { href: "/academics/council", label: "Academic Council" },
  { href: "/academics/programs", label: "Academic Opportunities" },
  { href: "/academics/syllabus", label: "Syllabus" },
] as const;

export const DEPARTMENT_SLUGS = [
  "computer-science-engineering",
  "computer-applications",
  "electrical-electronics-engineering",
  "electronics-communication-engineering",
  "automobile-engineering",
  "applied-science",
] as const;

export type DepartmentSlug = (typeof DEPARTMENT_SLUGS)[number];

export const ADMISSION_SLUGS = ["btech", "diploma", "mca", "lateral"] as const;

export const COMMUNITY_KINDS = [
  { kind: "ALUMNI" as const, href: "/community/alumni", label: "Alumni" },
  { kind: "PTA" as const, href: "/community/pta", label: "PTA" },
  { kind: "SENATE" as const, href: "/community/senate", label: "Senate" },
  { kind: "IEEE" as const, href: "/community/ieee", label: "IEEE" },
  { kind: "IEDC" as const, href: "/community/iedc", label: "IEDC" },
  { kind: "NSS" as const, href: "/community/nss", label: "NSS" },
];

export const FACILITY_SLUGS = [
  "central-computing-facility",
  "library",
  "seminar-hall",
  "transportation",
  "hostel",
  "canteen",
] as const;
