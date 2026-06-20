import type { CommunityKind } from "./site-data";

export const COMMUNITY_HERO_IMAGE = "/images/Jun 19, 2026, 06_03_08 PM.png";

export const COMMUNITY_HERO_SUBTITLES: Record<CommunityKind, string> = {
  ALUMNI: "Connecting graduates and fostering lifelong relationships with the institution.",
  PTA: "Strengthening collaboration between parents, teachers, and the institution.",
  SENATE: "Supporting student representation and academic development.",
  IEEE: "Inspiring innovation and technical excellence among future engineers.",
  IEDC: "Promoting entrepreneurship, innovation, and startup culture.",
  NSS: "Empowering students through community service, leadership, and social responsibility.",
};

export function getCommunityHeroSubtitle(kind: CommunityKind): string {
  return COMMUNITY_HERO_SUBTITLES[kind];
}
