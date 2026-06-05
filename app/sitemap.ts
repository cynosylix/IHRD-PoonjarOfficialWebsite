import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import {
  departments,
  programs,
  admissionTracks,
  facilities,
} from "@/data/site-data";
import { COMMUNITY_KINDS } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";

const STATIC_ROUTES = [
  "",
  "/about/institution",
  "/about/principal",
  "/about/iqac",
  "/academics/departments",
  "/academics/programs",
  "/academics/council",
  "/academics/syllabus",
  "/admission",
  "/admission/enquiry",
  "/students",
  "/students/forms",
  "/students/feedback",
  "/students/anti-ragging",
  "/students/grievance-redressal",
  "/students/women-grievance",
  "/placements",
  "/facilities",
  "/community",
  "/contact",
  "/search",
  "/notices",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  departments.forEach((d) => {
    entries.push({
      url: `${base}/academics/departments/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  programs.forEach((p) => {
    entries.push({
      url: `${base}/academics/programs/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  admissionTracks.forEach((t) => {
    entries.push({
      url: `${base}/admission/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  });

  facilities.forEach((f) => {
    entries.push({
      url: `${base}/facilities/${f.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  COMMUNITY_KINDS.forEach((c) => {
    entries.push({
      url: `${base}${c.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    });
  });

  return entries;
}
