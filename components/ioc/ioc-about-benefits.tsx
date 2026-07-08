"use client";

import { SectionHeading } from "@/components/home/section-heading";
import { FadeInView } from "@/components/motion/fade-in-view";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { StaticImage } from "@/components/ui/static-image";
import { IOC_ABOUT_TEXT, IOC_BENEFIT_IMAGES } from "@/data/ioc-page-config";
import { cn } from "@/lib/utils";

function BenefitImageCard({ image, index }: { image: string; index: number }) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[20px] bg-white",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)]",
        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(11,31,91,0.14)]",
      )}
    >
      <div className="relative h-[200px] overflow-hidden sm:h-[220px] md:h-[240px]">
        <StaticImage
          src={image}
          alt={`Industry on Campus highlight ${index + 1}`}
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F5B]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
      </div>
    </article>
  );
}

export function IocAboutBenefits() {
  const images = [...IOC_BENEFIT_IMAGES];

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="about-ioc-heading">
      <div className="mx-auto max-w-[75rem]">
        <FadeInView>
          <SectionHeading
            id="about-ioc-heading"
            underline
            eyebrow="Our Initiative"
            title="About IOC"
            description={IOC_ABOUT_TEXT}
            className="max-w-3xl"
          />
        </FadeInView>

        <StaggerContainer className="mt-10 flex flex-wrap justify-center gap-6 md:gap-7 lg:gap-8">
          {images.map((image, index) => (
            <StaggerItem
              key={`${image}-${index}`}
              className="w-full sm:w-[calc(50%-0.875rem)] lg:w-[calc(33.333%-1.375rem)] lg:max-w-[380px]"
            >
              <BenefitImageCard image={image} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
