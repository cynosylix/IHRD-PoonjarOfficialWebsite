"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeInView } from "@/components/motion/fade-in-view";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { StaticImage } from "@/components/ui/static-image";
import { cn } from "@/lib/utils";

export type FacilityListItem = {
  slug: string;
  name: string;
  summary: string;
  imageUrl: string;
};

function CardAccent() {
  return (
    <div className="flex flex-col items-center gap-1" aria-hidden>
      <span className="h-0.5 w-16 rounded-full bg-[#1E3A8A]" />
      <span className="h-0.5 w-8 rounded-full bg-[#D4A017]" />
    </div>
  );
}

function FacilityCard({ facility }: { facility: FacilityListItem }) {
  return (
    <Link
      href={`/facilities/${facility.slug}`}
      className={cn(
        "group relative flex h-full flex-col rounded-3xl p-3 sm:p-3.5",
        "bg-gradient-to-b from-white via-white to-[#F8FAFF]",
        "ring-1 ring-black/[0.04]",
        "shadow-[0_2px_8px_rgba(11,31,91,0.04),0_16px_48px_rgba(11,31,91,0.08)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-2 hover:ring-[#1E3A8A]/20",
        "hover:shadow-[0_4px_16px_rgba(11,31,91,0.08),0_24px_56px_rgba(11,31,91,0.14)]",
      )}
    >
      {/* Full-width top accent bar */}
      <div
        className="absolute inset-x-3 top-0 h-1 overflow-hidden rounded-b-full sm:inset-x-3.5"
        aria-hidden
      >
        <div className="h-full w-full bg-gradient-to-r from-[#0B1F5B] via-[#1E3A8A] to-[#123482]" />
      </div>

      {/* Image — inset with rounded corners */}
      <div className="relative mt-2 aspect-[5/3] shrink-0 overflow-hidden rounded-2xl bg-[#EEF2FF]">
        <StaticImage
          src={facility.imageUrl}
          alt={facility.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F5B]/50 via-[#0B1F5B]/10 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
            Campus Facility
          </p>
          <h2 className="mt-1 font-display text-lg font-bold leading-tight text-white drop-shadow-sm sm:text-xl">
            {facility.name}
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5 text-center sm:px-3 sm:pt-6">
        <CardAccent />
        <p className="mt-4 line-clamp-4 min-h-[5.5rem] flex-1 text-sm leading-[1.7] text-[#64748B] sm:text-[15px]">
          {facility.summary}
        </p>
        <div className="mt-6 flex items-center justify-center border-t border-[#1E3A8A]/8 pt-5">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A8A] transition-colors duration-300 group-hover:text-[#0B1F5B]">
            Learn More
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E3A8A]/10 transition-all duration-300 group-hover:bg-[#1E3A8A] group-hover:text-white">
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

type FacilitiesPageContentProps = {
  facilities: FacilityListItem[];
};

export function FacilitiesPageContent({ facilities }: FacilitiesPageContentProps) {
  return (
    <div className="bg-gradient-to-b from-[#F8FAFF] to-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[75rem]">
        <FadeInView>
          <SectionHeading
            underline
            eyebrow="Campus infrastructure"
            title="Facilities"
            description="Explore computing labs, library, seminar halls, transport, hostel, and canteen services that support student life."
            className="max-w-2xl"
          />
        </FadeInView>

        <StaggerContainer className="mt-10 grid auto-rows-fr grid-cols-1 gap-7 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {facilities.map((facility) => (
            <StaggerItem key={facility.slug} className="flex h-full">
              <FacilityCard facility={facility} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
