import {
  publishedAnnouncements,
  departments,
  facilities,
  programs,
  admissionTracks,
  communitySections,
  placementTeamMembers,
} from "@/data/site-data";
import { COMMUNITY_KINDS } from "@/lib/constants";

export type SearchHit = {
  title: string;
  href: string;
  snippet: string;
  type: string;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** Client-side friendly: synchronous search over static content */
export function searchPublic(query: string, take = 30): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const hits: SearchHit[] = [];

  publishedAnnouncements().forEach((a) => {
    const text = `${a.title} ${a.excerpt ?? ""} ${stripHtml(a.content)}`.toLowerCase();
    if (text.includes(q)) {
      hits.push({
        type: "Announcement",
        title: a.title,
        href: `/notices#${a.id}`,
        snippet: a.excerpt ?? stripHtml(a.content).slice(0, 140),
      });
    }
  });

  departments.forEach((d) => {
    if (
      d.name.toLowerCase().includes(q) ||
      d.intro.toLowerCase().includes(q) ||
      d.slug.toLowerCase().includes(q)
    ) {
      hits.push({
        type: "Department",
        title: d.name,
        href: `/academics/departments/${d.slug}`,
        snippet: d.intro.slice(0, 140),
      });
    }
  });

  facilities.forEach((f) => {
    const text = `${f.name} ${f.summary ?? ""} ${stripHtml(f.description)}`.toLowerCase();
    if (text.includes(q) || f.slug.toLowerCase().includes(q)) {
      hits.push({
        type: "Facility",
        title: f.name,
        href: `/facilities/${f.slug}`,
        snippet: (f.summary ?? stripHtml(f.description)).slice(0, 140),
      });
    }
  });

  programs.forEach((p) => {
    const text = `${p.name} ${p.fullName ?? ""} ${stripHtml(p.about)}`.toLowerCase();
    if (text.includes(q) || p.slug.toLowerCase().includes(q)) {
      hits.push({
        type: "Program",
        title: p.fullName ?? p.name,
        href: `/academics/programs/${p.slug}`,
        snippet: stripHtml(p.about).slice(0, 140),
      });
    }
  });

  admissionTracks.forEach((t) => {
    const text = `${t.title} ${stripHtml(t.eligibility)} ${stripHtml(t.allotment)}`.toLowerCase();
    if (text.includes(q) || t.slug.includes(q)) {
      hits.push({
        type: "Admission",
        title: t.title,
        href: `/admission/${t.slug}`,
        snippet: stripHtml(t.eligibility).slice(0, 140),
      });
    }
  });

  COMMUNITY_KINDS.forEach((c) => {
    if (c.label.toLowerCase().includes(q)) {
      hits.push({
        type: "Community",
        title: c.label,
        href: c.href,
        snippet: `${c.label} at College of Engineering Poonjar`,
      });
    }
  });

  communitySections.forEach((c) => {
    const text = `${c.title} ${c.description} ${stripHtml(c.content)}`.toLowerCase();
    if (text.includes(q)) {
      const kind = COMMUNITY_KINDS.find((k) => k.kind === c.kind);
      hits.push({
        type: "Community",
        title: c.title,
        href: kind?.href ?? "/community",
        snippet: c.description.slice(0, 140),
      });
    }
  });

  placementTeamMembers.forEach((m) => {
    const text = `${m.name} ${m.role} ${m.email ?? ""}`.toLowerCase();
    if (text.includes(q)) {
      hits.push({
        type: "Placements",
        title: m.name,
        href: "/placements",
        snippet: m.role,
      });
    }
  });

  const staticPages: { title: string; href: string; keywords: string }[] = [
    { title: "Home", href: "/", keywords: "college engineering poonjar ihrd" },
    { title: "Admission", href: "/admission", keywords: "apply eligibility fees lateral entry" },
    { title: "Academic programmes", href: "/academics/programs", keywords: "btech mca diploma courses" },
    { title: "Departments", href: "/academics/departments", keywords: "cse ece engineering departments" },
    { title: "Students", href: "/students", keywords: "forms grievance anti ragging feedback" },
    { title: "Placements", href: "/placements", keywords: "placement cell cgpu recruiters" },
    { title: "Facilities", href: "/facilities", keywords: "library lab hostel canteen transport" },
    { title: "Community", href: "/community", keywords: "alumni pta senate ieee nss iedc" },
    { title: "Notices", href: "/notices", keywords: "announcements notifications" },
    { title: "About institution", href: "/about/institution", keywords: "history vision mission ihrd" },
    { title: "IQAC", href: "/about/iqac", keywords: "quality assurance naac" },
    { title: "Academic Council", href: "/academics/council", keywords: "academic council" },
    { title: "Syllabus", href: "/academics/syllabus", keywords: "ktu sbte syllabus download" },
    { title: "Contact us", href: "/contact", keywords: "phone email address map" },
    { title: "Principal’s Desk", href: "/about/principal", keywords: "principal message" },
    { title: "Admission enquiry", href: "/admission/enquiry", keywords: "apply admission form" },
    { title: "Student forms", href: "/students/forms", keywords: "bonafide certificate forms" },
    { title: "Anti-ragging", href: "/students/anti-ragging", keywords: "anti ragging committee" },
    { title: "Grievance redressal", href: "/students/grievance-redressal", keywords: "complaint grievance" },
  ];

  staticPages.forEach((p) => {
    if (`${p.title} ${p.keywords}`.toLowerCase().includes(q)) {
      hits.push({
        type: "Page",
        title: p.title,
        href: p.href,
        snippet: p.keywords.slice(0, 140),
      });
    }
  });

  return hits.slice(0, take);
}
