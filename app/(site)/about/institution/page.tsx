import type { Metadata } from "next";
import { aboutInstitution, pageHeroImages } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { PageBanner } from "@/components/layout/page-banner";
import { PageHeroImage } from "@/components/layout/page-hero-image";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "About The Institution",
  description: "About College of Engineering Poonjar — vision, mission, and establishment.",
};

export default function AboutInstitutionPage() {
  const eoaDocs = [...aboutInstitution.eoaDocuments].sort((a, b) => a.order - b.order);
  const campusImage = pageHeroImages["/about/institution"];

  return (
    <div className="min-w-0">
      <PageBanner
        eyebrow="About"
        title="About The Institution"
        description="Vision, mission, and establishment of College of Engineering Poonjar."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About The Institution" },
        ]}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {campusImage ? (
            <PageHeroImage
              src={campusImage.src}
              alt={campusImage.alt}
              priority
              className="mb-6"
            />
          ) : null}

          <div className="cms-content">
            <HtmlBlock html={aboutInstitution.intro} />
          </div>

          <h2 className="mt-10 text-xl font-semibold text-brand-900">Vision</h2>
          <div className="cms-content mt-3">
            <HtmlBlock html={aboutInstitution.vision} />
          </div>

          <h2 className="mt-10 text-xl font-semibold text-brand-900">Mission</h2>
          <div className="cms-content mt-3">
            <HtmlBlock html={aboutInstitution.mission} />
          </div>

          {eoaDocs.length > 0 ? (
            <ul className="mt-10 space-y-2">
              {eoaDocs.map((doc) => (
                <li key={doc.label}>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-700 hover:underline"
                  >
                    <Download className="h-4 w-4 shrink-0" aria-hidden />
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
