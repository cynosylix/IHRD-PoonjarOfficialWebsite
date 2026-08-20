import type { Metadata } from "next";
import { PrincipalHero } from "@/components/about/principal-hero";
import { PrincipalPageContent } from "@/components/about/principal-page-content";

export const metadata: Metadata = {
  title: "Principal's Message",
  description:
    "Message from the Principal of College of Engineering Poonjar — leadership, vision, and commitment to academic excellence.",
};

export default function PrincipalPage() {
  return (
    <div className="min-w-0">
      <PrincipalHero />
      <PrincipalPageContent />
    </div>
  );
}
