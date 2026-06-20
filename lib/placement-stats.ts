import type { PlacementStatItem } from "@/data/placement-page-config";

type PlacementStatisticsRow = {
  academicYear: string;
  totalOffers?: number;
  highestPackage?: string;
  averagePackage?: string;
  placementPercent?: number;
  visitedCompanies?: number;
};

export function buildPlacementStats(rows: PlacementStatisticsRow[]): PlacementStatItem[] {
  const latest = rows[0];
  if (!latest) return [];

  const stats: PlacementStatItem[] = [];

  if (latest.placementPercent != null) {
    stats.push({
      label: "Placement Rate",
      value: String(latest.placementPercent),
      suffix: "%",
      description: `Academic year ${latest.academicYear}`,
    });
  }

  if (latest.visitedCompanies != null) {
    stats.push({
      label: "Recruiters Visited",
      value: String(latest.visitedCompanies),
      suffix: "+",
      description: `Companies engaged in ${latest.academicYear}`,
    });
  }

  if (latest.highestPackage) {
    stats.push({
      label: "Highest Package",
      value: latest.highestPackage.replace(/[^\d.]/g, "") || latest.highestPackage,
      suffix: latest.highestPackage.includes("LPA") ? " LPA" : "",
      description: `Top offer — ${latest.academicYear}`,
    });
  }

  if (latest.averagePackage) {
    stats.push({
      label: "Average Package",
      value: latest.averagePackage.replace(/[^\d.]/g, "") || latest.averagePackage,
      suffix: latest.averagePackage.includes("LPA") ? " LPA" : "",
      description: `Mean offer — ${latest.academicYear}`,
    });
  }

  if (latest.totalOffers != null) {
    stats.push({
      label: "Students Placed",
      value: String(latest.totalOffers),
      suffix: "+",
      description: `Offers recorded in ${latest.academicYear}`,
    });
  }

  return stats;
}
