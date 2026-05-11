import type { CommunityKind } from "@/data/site-data";

const SLUG_MAP: Record<string, CommunityKind> = {
  alumni: "ALUMNI",
  pta: "PTA",
  senate: "SENATE",
  ieee: "IEEE",
  iedc: "IEDC",
  nss: "NSS",
};

export function communitySlugToKind(slug: string): CommunityKind | null {
  return SLUG_MAP[slug.toLowerCase()] ?? null;
}

export function communityKindToSlug(kind: CommunityKind): string {
  const entry = Object.entries(SLUG_MAP).find(([, v]) => v === kind);
  return entry?.[0] ?? kind.toLowerCase();
}
