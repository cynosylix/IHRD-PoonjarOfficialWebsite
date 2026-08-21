import type { Metadata } from "next";
import { AdmissionHero } from "@/components/admission/admission-hero";
import { AdmissionPageContent } from "@/components/admission/admission-page-content";
import {
  admissionFeeStructure,
  admissionHelplines,
  programs,
} from "@/data/site-data";

export const metadata: Metadata = {
  title: "Admission",
  description: "Programme-wise admission information for UG, PG, and Diploma courses.",
};

const COMPUTER_APPLICATIONS_SLUG = "computer-applications";

const SECTION_META = {
  UG: {
    label: "UG",
    title: "B.Tech Admission",
    blurb:
      "Full-time graduate courses of APJ Abdul Kalam Technological University (KTU), approved by AICTE.",
  },
  DIPLOMA: {
    label: "Diploma",
    title: "Diploma Admission",
    blurb:
      "Three year regular diploma courses affiliated to the Board of Technical Education, Kerala.",
  },
} as const;

export default function AdmissionHubPage() {
  const total = programs.length;

  const ugRows = programs
    .filter((p) => p.type === "UG" && p.departmentSlug !== COMPUTER_APPLICATIONS_SLUG)
    .sort((a, b) => a.order - b.order);

  const computerApplicationsRows = programs
    .filter((p) => p.departmentSlug === COMPUTER_APPLICATIONS_SLUG)
    .sort((a, b) => {
      if (a.slug === "mca") return -1;
      if (b.slug === "mca") return 1;
      return a.order - b.order;
    });

  const diplomaRows = programs
    .filter((p) => p.type === "DIPLOMA")
    .sort((a, b) => a.order - b.order);

  const sections = [];

  if (ugRows.length > 0) {
    sections.push({ id: "ug", meta: SECTION_META.UG, rows: ugRows });
  }
  if (computerApplicationsRows.length > 0) {
    sections.push({
      id: "computer-applications",
      meta: {
        label: "Department",
        title: "Computer Applications",
        blurb:
          "MCA and BCA programmes offered by the Department of Computer Applications.",
      },
      rows: computerApplicationsRows,
      useProgramNameAsLabel: true,
    });
  }
  if (diplomaRows.length > 0) {
    sections.push({ id: "diploma", meta: SECTION_META.DIPLOMA, rows: diplomaRows });
  }

  return (
    <div className="min-w-0">
      <AdmissionHero />
      <AdmissionPageContent
        sections={sections}
        helplines={admissionHelplines}
        feeStructure={admissionFeeStructure}
        totalPrograms={total}
      />
    </div>
  );
}
