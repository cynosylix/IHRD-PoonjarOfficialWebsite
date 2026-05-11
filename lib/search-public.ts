import {
  publishedAnnouncements,
  publishedEvents,
  departments,
  facilities,
  programs,
} from "@/data/site-data";

export type SearchHit = {
  title: string;
  href: string;
  snippet: string;
  type: string;
};

/** Client-side friendly: synchronous search over static content */
export function searchPublic(query: string, take = 30): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const hits: SearchHit[] = [];

  publishedAnnouncements().forEach((a) => {
    if (
      a.title.toLowerCase().includes(q) ||
      (a.excerpt ?? "").toLowerCase().includes(q)
    ) {
      hits.push({
        type: "Announcement",
        title: a.title,
        href: "/",
        snippet: a.excerpt ?? a.content.replace(/<[^>]+>/g, "").slice(0, 140),
      });
    }
  });

  publishedEvents().forEach((e) => {
    if (
      e.title.toLowerCase().includes(q) ||
      (e.description ?? "").toLowerCase().includes(q)
    ) {
      hits.push({
        type: "Event",
        title: e.title,
        href: "/",
        snippet: e.description ?? "",
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
    if (
      f.name.toLowerCase().includes(q) ||
      (f.summary ?? "").toLowerCase().includes(q) ||
      f.slug.toLowerCase().includes(q)
    ) {
      hits.push({
        type: "Facility",
        title: f.name,
        href: `/facilities/${f.slug}`,
        snippet: (f.summary ?? "").slice(0, 140),
      });
    }
  });

  programs.forEach((p) => {
    if (p.name.toLowerCase().includes(q)) {
      hits.push({
        type: "Program",
        title: p.name,
        href: "/academics/programs",
        snippet: "",
      });
    }
  });

  return hits.slice(0, take);
}
