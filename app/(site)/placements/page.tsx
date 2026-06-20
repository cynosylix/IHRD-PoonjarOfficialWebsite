import type { Metadata } from "next";
import {
  placementActivities,
  placementDrives,
  placementOverview,
  placementStatistics,
  placementTeamMembers,
} from "@/data/site-data";
import {
  PLACEMENT_HERO_IMAGE,
  splitPlacementContent,
} from "@/data/placement-page-config";
import { studentTestimonials } from "@/data/student-portal";
import { PlacementsPageContent } from "@/components/placements/placements-page-content";
import { PageBanner } from "@/components/layout/page-banner";
import { buildPlacementStats } from "@/lib/placement-stats";

export const metadata: Metadata = {
  title: "Placement",
  description: "Career Guidance and Placement Unit — College of Engineering Poonjar.",
};

const PLACEMENT_SUCCESS_STORIES = studentTestimonials
  .filter((t) => /placement|career|engineer/i.test(t.quote))
  .slice(0, 2)
  .map((t) => ({
    quote: t.quote,
    name: t.name,
    programme: t.programme,
  }));

export default function PlacementsPage() {
  const members = [...placementTeamMembers].sort((a, b) => a.order - b.order);
  const { aboutHtml, cellIntroHtml } = splitPlacementContent(placementOverview.content);
  const stats = buildPlacementStats(placementStatistics);
  const activities = [...placementActivities]
    .sort((a, b) => a.order - b.order)
    .map(({ title, description }) => ({ title, description }));
  const recruiters = placementDrives.map((drive) => ({
    name: drive.company,
    description: [drive.description, drive.package ? `Package: ${drive.package}` : ""]
      .filter(Boolean)
      .join(" — "),
    logoUrl: drive.logoUrl,
  }));

  return (
    <div className="min-w-0">
      <PageBanner
        heroImage={PLACEMENT_HERO_IMAGE}
        centered
        underline
        title="Placements"
        description="Career Guidance and Placement Unit — training, recruitment drives, and industry partnerships."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Placements" }]}
      />

      <PlacementsPageContent
        aboutHtml={aboutHtml}
        cellIntroHtml={cellIntroHtml}
        members={members}
        stats={stats}
        activities={activities}
        recruiters={recruiters}
        successStories={PLACEMENT_SUCCESS_STORIES}
      />
    </div>
  );
}
