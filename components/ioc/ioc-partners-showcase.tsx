"use client";

import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeInView } from "@/components/motion/fade-in-view";
import { StaticImage } from "@/components/ui/static-image";
import { IOC_PARTNERS, type IocPartner } from "@/data/ioc-page-config";
import { cn } from "@/lib/utils";

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology specializations">
      {tags.map((tag) => (
        <li key={tag}>
          <span className="inline-block rounded-full border border-[#1E3A8A]/12 bg-[#F8FAFF] px-3.5 py-1.5 text-xs font-medium text-[#1E3A8A] transition-colors duration-300 hover:border-[#1E3A8A]/25 hover:bg-white">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

function KnowMoreButton({ href }: { href?: string }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0B1F5B] hover:shadow-[0_8px_24px_rgba(11,31,91,0.2)]"
    >
      Know More
      <ExternalLink
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </a>
  );
}

function LogoPanel({ partner }: { partner: IocPartner }) {
  return (
    <div className="flex items-center justify-center py-2 transition-transform duration-500">
      <div className="flex w-full max-w-sm items-center justify-center rounded-2xl bg-white p-8 shadow-[0_12px_40px_rgba(11,31,91,0.08)] ring-1 ring-[#1E3A8A]/8 transition-all duration-500 hover:shadow-[0_16px_48px_rgba(11,31,91,0.12)] lg:p-10">
        <StaticImage
          src={partner.logo}
          alt={`${partner.name} logo`}
          className="max-h-20 w-auto object-contain sm:max-h-24 lg:max-h-28"
        />
      </div>
    </div>
  );
}

function ContentPanel({ partner }: { partner: IocPartner }) {
  return (
    <div className="min-w-0">
      {partner.heading ? (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
          {partner.heading}
        </p>
      ) : null}

      <h3
        className={cn(
          "font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl",
          partner.heading && "mt-2",
        )}
      >
        {partner.name}
      </h3>

      <div className="mt-3 flex flex-col gap-1" aria-hidden>
        <span className="h-0.5 w-16 rounded-full bg-[#1E3A8A]" />
        <span className="h-0.5 w-8 rounded-full bg-[#D4A017]" />
      </div>

      <p className="mt-5 text-sm leading-[1.75] text-[#64748B] sm:text-base">
        {partner.description}
      </p>

      <TagList tags={partner.tags} />
      <KnowMoreButton href={partner.website} />
    </div>
  );
}

function PartnerBlock({ partner, index }: { partner: IocPartner; index: number }) {
  const logoLeft = partner.logoPosition === "left";
  const bgClass = index % 2 === 0 ? "bg-[#F8FAFF]" : "bg-white";

  return (
    <FadeInView>
      <article
        className={cn(
          "border-y border-[#1E3A8A]/6 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24",
          bgClass,
        )}
      >
        <div
          className={cn(
            "mx-auto grid max-w-[75rem] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20",
            !logoLeft && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
          )}
        >
          <LogoPanel partner={partner} />
          <ContentPanel partner={partner} />
        </div>
      </article>
    </FadeInView>
  );
}

export function IocPartnersShowcase() {
  return (
    <section id="partners" className="scroll-mt-24" aria-labelledby="partners-heading">
      <div className="bg-white px-4 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-[75rem]">
          <FadeInView>
            <SectionHeading
              id="partners-heading"
              underline
              eyebrow="Collaboration"
              title="Industry Partners Showcase"
              description="Leading technology companies partnering with IHRD to deliver industry-oriented education, training, and career opportunities."
              className="max-w-2xl"
            />
          </FadeInView>
        </div>
      </div>

      {IOC_PARTNERS.map((partner, index) => (
        <PartnerBlock key={partner.id} partner={partner} index={index} />
      ))}
    </section>
  );
}
