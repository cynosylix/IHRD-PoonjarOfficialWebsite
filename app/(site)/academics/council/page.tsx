import type { Metadata } from "next";
import { academicCouncilPage, pageHeroImages } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { PageBanner } from "@/components/layout/page-banner";
import { PageHeroImage } from "@/components/layout/page-hero-image";

export const metadata: Metadata = {
  title: "Academic Council",
  description: "Academic Council — roles and functions at College of Engineering Poonjar.",
};

export default function AcademicCouncilPage() {
  return (
    <div className="min-w-0">
      <PageBanner
        eyebrow="Academics"
        title="Academic Council"
        description="Roles and functions of the Academic Council."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Academics" },
          { label: "Academic Council" },
        ]}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {pageHeroImages["/academics/council"] ? (
            <PageHeroImage
              src={pageHeroImages["/academics/council"].src}
              alt={pageHeroImages["/academics/council"].alt}
              className="mb-10"
            />
          ) : null}
          <div className="cms-content">
            <HtmlBlock html={academicCouncilPage.description} />
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-brand-900">Functions</h2>
            <div className="cms-content mt-3">
              <HtmlBlock html={academicCouncilPage.functions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
