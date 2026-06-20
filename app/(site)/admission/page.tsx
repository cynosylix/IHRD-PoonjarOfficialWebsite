import type { Metadata } from "next";
import { AdmissionHero } from "@/components/admission/admission-hero";
import { AdmissionPageContent } from "@/components/admission/admission-page-content";
import {
  admissionFeeStructure,
  admissionHelplines,
  programs,
  type ProgramType,
} from "@/data/site-data";

export const metadata: Metadata = {
  title: "Admission",
  description: "Programme-wise admission information for UG, PG, and Diploma courses.",
};

const SECTION_META: Record<
  ProgramType,
  { title: string; blurb: string; label: string }
> = {
  UG: {
    label: "UG",
    title: "B.Tech Admission",
    blurb:
      "Full-time graduate courses of APJ Abdul Kalam Technological University (KTU), approved by AICTE.",
  },
  PG: {
    label: "PG",
    title: "MCA Admission",
    blurb:
      "Master of Computer Applications (MCA) of APJ Abdul Kalam Technological University (KTU), approved by AICTE.",
  },
  DIPLOMA: {
    label: "Diploma",
    title: "Diploma Admission",
    blurb:
      "Three year regular diploma courses affiliated to the Board of Technical Education, Kerala.",
  },
};

const SECTION_ORDER: ProgramType[] = ["UG", "PG", "DIPLOMA"];

export default function AdmissionHubPage() {
  const total = programs.length;
  const sections = SECTION_ORDER.map((type) => ({
    type,
    meta: SECTION_META[type],
    rows: programs.filter((p) => p.type === type).sort((a, b) => a.order - b.order),
  })).filter((s) => s.rows.length > 0);

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
