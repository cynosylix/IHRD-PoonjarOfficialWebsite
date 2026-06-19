import type { Metadata } from "next";
import { DepartmentsHero } from "@/components/academics/departments-hero";
import { DepartmentsPageContent } from "@/components/academics/departments-page-content";
import { departments } from "@/data/site-data";

export const metadata: Metadata = {
  title: "Departments",
  description:
    "Explore academic departments at College of Engineering Poonjar — faculty, programmes, and excellence across engineering and applied sciences.",
};

export default function DepartmentsListPage() {
  return (
    <div className="min-w-0">
      <DepartmentsHero />
      <DepartmentsPageContent departments={departments} />
    </div>
  );
}
