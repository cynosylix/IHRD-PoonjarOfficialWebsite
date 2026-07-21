"use client";

import { CheckCircle2, Info } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeInView } from "@/components/motion/fade-in-view";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { cn } from "@/lib/utils";

const BTECH_DOCUMENTS = [
  { name: "Allotment Memo of this Phase (3 Copies)" },
  { name: "Receipt of Fee Remitted to CEE" },
  { name: "KEAM Entrance Admit Card (3 Copies)" },
  { name: "KEAM 2026 Data Sheet" },
  { name: "SSLC / 10th Certificate (Proof of Date of Birth)" },
  { name: "Plus Two Mark List (3 Copies)" },
  { name: "Migration Certificate", ifApplicable: true },
  { name: "Transfer Certificate (TC)" },
  { name: "Conduct Certificate" },
  { name: "Physical Fitness Certificate" },
  { name: "Eligibility Certificate", ifApplicable: true },
  { name: "Community Certificate (SC/ST/OEC/OBC(H))" },
  { name: "Income Certificate (SC/ST/OEC/OBC(H))" },
  { name: "Non-Creamy Layer Certificate (OBC)" },
  { name: "Income & Assets Certificate (EWS)" },
  { name: "Passport Size Photographs (2 Copies)" },
  { name: "Aadhaar Card Copies (2 Copies)" },
  { name: "Bank Passbook Copy" },
] as const;

const DOCUMENT_INSTRUCTIONS = [
  "Bring all original certificates along with the required photocopies.",
  "Keep additional photocopies for future verification.",
  'Certificates marked "If Applicable" are required only for eligible candidates.',
  "Students should ensure that all documents are valid and up to date.",
  "Failure to produce the required documents may delay the admission process.",
] as const;

export function BtechDocumentsSection() {
  return (
    <FadeInView>
      <section
        id="btech-documents"
        className="scroll-mt-28"
        aria-labelledby="btech-documents-heading"
      >
        <SectionHeading
          id="btech-documents-heading"
          underline
          eyebrow="Admissions"
          title="Documents Required for B.Tech Admission (KEAM 2026)"
          description="Candidates allotted to College of Engineering Poonjar through KEAM 2026 should bring the following documents for admission."
        />

        <StaggerContainer className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {BTECH_DOCUMENTS.map((doc) => (
            <StaggerItem key={doc.name}>
              <div
                className={cn(
                  "flex h-full items-start gap-3 rounded-2xl border border-black/[0.06] bg-white p-4",
                  "shadow-[0_8px_28px_rgba(11,31,91,0.06)] transition-all duration-300",
                  "hover:-translate-y-0.5 hover:border-[#1E3A8A]/15 hover:shadow-[0_12px_32px_rgba(11,31,91,0.1)]",
                  "sm:p-5",
                )}
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug text-[#0F172A] sm:text-[15px]">
                    {doc.name}
                  </p>
                  {"ifApplicable" in doc && doc.ifApplicable ? (
                    <span className="mt-2 inline-flex rounded-full border border-[#D4A017]/35 bg-[#FFF8E8] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#8A6A10]">
                      If Applicable
                    </span>
                  ) : null}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div
          className={cn(
            "mt-8 rounded-2xl border border-[#1E3A8A]/15 bg-[#F8FAFF] p-5",
            "shadow-[0_8px_28px_rgba(11,31,91,0.06)] sm:mt-10 sm:p-6",
          )}
          role="note"
          aria-labelledby="btech-documents-instructions"
        >
          <div className="flex gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
              <Info className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <h3
                id="btech-documents-instructions"
                className="font-display text-lg font-bold text-[#0F172A]"
              >
                Important Instructions
              </h3>
              <ul className="mt-3 space-y-2.5">
                {DOCUMENT_INSTRUCTIONS.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-[#475569] sm:text-[15px]"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </FadeInView>
  );
}
