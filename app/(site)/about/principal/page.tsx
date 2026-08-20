import type { Metadata } from "next";
import { PrincipalHero } from "@/components/about/principal-hero";
import { PrincipalPageContent } from "@/components/about/principal-page-content";

export const metadata: Metadata = {
  title: "Principal's Message",
  description:
    "Prof. Dr. John George, Principal, College of Engineering Poonjar — qualifications, professional profile, and message.",
};

export default function PrincipalPage() {
  return (
    <div className="min-w-0">
      <PrincipalHero />
      <PrincipalPageContent />
    </div>
  );
}
