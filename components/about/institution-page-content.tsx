"use client";

import {
  Download,
} from "lucide-react";
import { HtmlBlock } from "@/components/content/html-block";
import { FadeInView } from "@/components/motion/fade-in-view";
import { aboutInstitution } from "@/data/site-data";
import { cn } from "@/lib/utils";

const INFO_ITEMS = [
  { label: "Established", value: "2000" },
  { label: "Managed By", value: "IHRD" },
  {
    label: "Affiliated To",
    value: "APJ Abdul Kalam Technological University",
  },
  { label: "Location", value: "Poonjar, Kottayam" },
] as const;

const EXTRA_SECTIONS = [
  {
    id: "campus-environment",
    title: "Campus Environment",
    content: `College of Engineering Poonjar is located in a scenic place on a calm hilly region with pure air and greenery congenial for any student to pursue learning with dedication. The tranquil natural surroundings create an atmosphere that encourages focus, reflection, and holistic personal development throughout the academic journey.`,
  },
  {
    id: "academic-excellence",
    title: "Academic Excellence",
    content: `Under the Institute of Human Resources Development (IHRD), the college delivers education and training of consistently high standards through innovative and versatile programmes. Guided by the principle "Think Globally and Act Locally," our academic framework prepares graduates with the knowledge, skills, and judgement required for professional and societal contribution.`,
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    content: `As a government engineering institution, the college provides well-equipped laboratories, modern classrooms, and dedicated learning spaces that support hands-on technical education. Our infrastructure is designed to complement classroom learning with practical exposure, enabling students to develop competence across engineering and technology disciplines.`,
  },
] as const;

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:border-[#D4A017]/50 hover:shadow-md",
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-snug text-[#0F172A] sm:text-[15px]">
        {value}
      </p>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="text-center">
      <h2 className="font-display text-xl font-bold text-[#0F172A] sm:text-2xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-16 bg-[#D4A017]/80" aria-hidden />
    </div>
  );
}

function ContentSection({
  id,
  title,
  children,
  delay = 0,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeInView delay={delay}>
      <article
        id={id}
        className={cn(
          "rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 sm:p-10",
          "hover:shadow-md",
        )}
      >
        <SectionHeading title={title} />
        <div className="about-content mt-8">{children}</div>
      </article>
    </FadeInView>
  );
}

type InstitutionPageContentProps = {
  data: typeof aboutInstitution;
};

export function InstitutionPageContent({ data }: InstitutionPageContentProps) {
  const eoaDocs = [...data.eoaDocuments].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#F8FAFC] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
        <FadeInView>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INFO_ITEMS.map((item) => (
              <InfoCard key={item.label} {...item} />
            ))}
          </div>
        </FadeInView>

        <FadeInView delay={0.08} className="mt-10 sm:mt-12">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <SectionHeading title="Our Institution" />
            <div className="about-content mt-8">
              <HtmlBlock html={data.intro} />
            </div>
          </div>
        </FadeInView>

        <div className="my-12 h-px bg-slate-200 sm:my-16" aria-hidden />

        <div className="space-y-12 sm:space-y-14">
          <ContentSection id="vision" title="Vision">
            <HtmlBlock html={data.vision} />
          </ContentSection>

          <ContentSection id="mission" title="Mission" delay={0.05}>
            <HtmlBlock html={data.mission} />
          </ContentSection>

          {EXTRA_SECTIONS.map((section, index) => (
            <ContentSection
              key={section.id}
              id={section.id}
              title={section.title}
              delay={0.05 * (index + 2)}
            >
              <p>{section.content}</p>
            </ContentSection>
          ))}
        </div>

        {eoaDocs.length > 0 ? (
          <FadeInView delay={0.1} className="mt-12 sm:mt-16">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
              <SectionHeading title="Extension of Approval" />
              <ul className="mt-8 space-y-3">
                {eoaDocs.map((doc) => (
                  <li key={doc.label}>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-[#1E3A8A] transition-colors",
                        "hover:border-[#D4A017]/40 hover:bg-[#F8FAFC]",
                      )}
                    >
                      <Download className="h-4 w-4 shrink-0 text-[#D4A017]" aria-hidden />
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInView>
        ) : null}
      </div>
    </div>
  );
}
