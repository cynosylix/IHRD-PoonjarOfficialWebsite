import type { Metadata } from "next";
import { facilities } from "@/data/site-data";
import { FACILITIES_HERO_IMAGE } from "@/data/facilities-page-config";
import { FacilitiesPageContent } from "@/components/facilities/facilities-page-content";
import { PageBanner } from "@/components/layout/page-banner";
import type { FacilityListItem } from "@/components/facilities/facilities-page-content";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Campus facilities at College of Engineering Poonjar.",
};

function facilitySummary(description: string, summary?: string): string {
  if (summary) return summary;
  const plain = description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return plain.length > 120 ? `${plain.slice(0, 120)}…` : plain;
}

export default function FacilitiesPage() {
  const list: FacilityListItem[] = [...facilities]
    .sort((a, b) => a.order - b.order)
    .map((f) => ({
      slug: f.slug,
      name: f.name,
      summary: facilitySummary(f.description, f.summary),
      imageUrl: f.imageUrl ?? "/images/placeholder-campus.svg",
    }));

  return (
    <div className="min-w-0">
      <PageBanner
        heroImage={FACILITIES_HERO_IMAGE}
        centered
        title="Facilities"
        description="Explore computing labs, library, seminar halls, transport, hostel, and canteen services that support student life."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Facilities" }]}
      />

      <FacilitiesPageContent facilities={list} />
    </div>
  );
}
