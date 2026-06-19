import type { Metadata } from "next";
import { CouncilHero } from "@/components/academics/council-hero";
import { CouncilPageContent } from "@/components/academics/council-page-content";

export const metadata: Metadata = {
  title: "Academic Council",
  description:
    "Academic Council at College of Engineering Poonjar — leadership, governance, and academic excellence.",
};

export default function AcademicCouncilPage() {
  return (
    <div className="min-w-0">
      <CouncilHero />
      <CouncilPageContent />
    </div>
  );
}
