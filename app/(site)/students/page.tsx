import type { Metadata } from "next";
import { StudentsHero } from "@/components/students/students-hero";
import { StudentsPageContent } from "@/components/students/students-page-content";

export const metadata: Metadata = {
  title: "Students",
  description:
    "Student life at College of Engineering Poonjar — services, activities, support, and campus experiences.",
};

export default function StudentsHubPage() {
  return (
    <div className="min-w-0">
      <StudentsHero />
      <StudentsPageContent />
    </div>
  );
}
