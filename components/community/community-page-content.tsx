"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeInView } from "@/components/motion/fade-in-view";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { COMMUNITY_KINDS } from "@/lib/constants";
import type { CommunityKind } from "@/data/site-data";
import { cn } from "@/lib/utils";

type CommunitySection = {
  kind: CommunityKind;
  description?: string;
};

type CommunityPageContentProps = {
  sections: CommunitySection[];
};

function CommunityCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full min-h-[220px] flex-col items-center rounded-xl border border-black/[0.06] bg-white p-6 text-center sm:p-7",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
        "hover:-translate-y-1 hover:border-[#1E3A8A]/20 hover:shadow-[0_14px_36px_rgba(11,31,91,0.14)]",
      )}
    >
      <h2 className="font-display text-lg font-bold leading-snug text-[#0F172A] transition-colors group-hover:text-[#1E3A8A] sm:text-xl">
        {title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#64748B]">{description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] transition-colors group-hover:text-[#123482]">
        Learn More
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}

export function CommunityPageContent({ sections }: CommunityPageContentProps) {
  const sectionByKind = Object.fromEntries(sections.map((s) => [s.kind, s]));

  return (
    <div className="bg-gradient-to-b from-[#F8FAFF] to-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeInView>
          <SectionHeading
            underline
            eyebrow="Campus life"
            title="Community"
            description="Select a group to view details, members, and events."
            className="max-w-2xl"
          />
        </FadeInView>

        <StaggerContainer className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {COMMUNITY_KINDS.map((c) => {
            const section = sectionByKind[c.kind];
            const description = section?.description ?? "Events, members, and highlights.";

            return (
              <StaggerItem key={c.href} className="h-full">
                <CommunityCard title={c.label} description={description} href={c.href} />
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
