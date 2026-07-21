import type { Metadata } from "next";
import { FacultyDirectoryPageContent } from "@/components/academics/faculty-directory-page";
import { PageBanner } from "@/components/layout/page-banner";

export const metadata: Metadata = {
  title: "Faculty",
  description:
    "Faculty members at College of Engineering Poonjar organised by department — Mechanical Engineering, Automobile Engineering, and more.",
};

export default function FacultyPage() {
  return (
    <div className="min-w-0">
      <PageBanner
        eyebrow="Academics"
        title="Faculty"
        description="Department-wise faculty profiles at College of Engineering Poonjar."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Faculty" },
        ]}
      />
      <FacultyDirectoryPageContent />
    </div>
  );
}
