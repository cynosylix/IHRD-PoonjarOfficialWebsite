import { departments } from "@/data/departments";
import { communitySections } from "@/data/community-sections";
import { facultyPhotoUrl } from "@/lib/faculty-photo";
import { communityMemberPhotoUrl } from "@/lib/community-photo";

const PRINCIPAL_PHOTO = "/images/pages/principal.jpg";

/** Normalize names for cross-page photo matching (faculty, senate, committees). */
export function normalizeStaffName(name: string): string {
  return name
    .toLowerCase()
    .replace(/&amp;/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^(mr|mrs|ms|dr|prof)\s+/, "")
    .trim();
}

function buildStaffPhotoMap(): Map<string, string> {
  const map = new Map<string, string>();

  const add = (name: string, photo: string) => {
    const key = normalizeStaffName(name);
    if (key && !map.has(key)) map.set(key, photo);
  };

  add("Dr. M V Rajesh", PRINCIPAL_PHOTO);
  add("M V Rajesh", PRINCIPAL_PHOTO);
  add("Principal", PRINCIPAL_PHOTO);

  for (const dept of departments) {
    for (const f of dept.faculties) {
      add(f.name, facultyPhotoUrl(dept.slug, f.order));
    }
  }

  const senate = communitySections.find((s) => s.kind === "SENATE");
  if (senate) {
    for (const m of senate.members) {
      const photo = communityMemberPhotoUrl("SENATE", m.order);
      if (photo) add(m.name, photo);
    }
  }

  return map;
}

const STAFF_PHOTO_MAP = buildStaffPhotoMap();

/** Find a portrait for a staff or committee member by name (faculty / senate / principal). */
export function staffPhotoUrl(name: string): string | undefined {
  const key = normalizeStaffName(name);
  if (!key) return undefined;
  return STAFF_PHOTO_MAP.get(key);
}

export function memberInitials(name: string): string {
  const parts = name
    .replace(/&amp;/g, " ")
    .split(/\s+/)
    .filter((w) => w && !/^(mr|mrs|ms|dr|prof)\.?$/i.test(w));
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
