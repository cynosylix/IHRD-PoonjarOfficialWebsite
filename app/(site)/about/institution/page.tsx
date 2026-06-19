import type { Metadata } from "next";
import { InstitutionHero } from "@/components/about/institution-hero";
import { InstitutionPageContent } from "@/components/about/institution-page-content";
import { aboutInstitution, pageHeroImages } from "@/data/site-data";

const HERO_FALLBACK = {
  src: "/images/collageOutDoor-2.webp",
  alt: "College of Engineering Poonjar campus",
};

export const metadata: Metadata = {
  title: "About The Institution",
  description: "About College of Engineering Poonjar — vision, mission, and establishment.",
};

export default function AboutInstitutionPage() {
  const campusImage = pageHeroImages["/about/institution"] ?? HERO_FALLBACK;

  return (
    <div className="min-w-0">
      <InstitutionHero imageSrc={campusImage.src} imageAlt={campusImage.alt} />
      <InstitutionPageContent data={aboutInstitution} />
    </div>
  );
}
