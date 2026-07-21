/** CEP Admission 2026–27 online application (Google Form). */
export const ADMISSION_APPLICATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScFaw36u8_bNVFDmC0LkWd_0K925TkLBBRe2xEsg3iNaBDDqA/viewform";

/** Primary navigation — public site */
export const MAIN_NAV = [
  { href: "/admission", label: "Admission" },
  { href: "/students", label: "Students" },
  { href: "/placements", label: "Placements" },
  { href: "/facilities", label: "Facilities" },
  { href: "/community", label: "Community" },
  { href: "/ioc", label: "IOC - Industry on Campus" },
  { href: "/contact", label: "Contact Us" },
] as const;

/** About / Academics dropdown */
export const ABOUT_DROPDOWN = [
  { href: "/about/institution", label: "About The Institution" },
  { href: "/about/principal", label: "Principal's Desk" },
  { href: "/academics/departments", label: "Departments" },
  { href: "/faculty", label: "Faculty" },
  { href: "/about/iqac", label: "IQAC" },
  { href: "/academics/council", label: "Academic Council" },
  { href: "/academics/programs", label: "Academic Opportunities" },
  { href: "/academics/syllabus", label: "Syllabus" },
  { href: "/notices", label: "Notices" },
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

export const ADMISSION_SLUGS = ["lateral"] as const;

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
