"use client";

import { SectionHeading } from "@/components/home/section-heading";
import { HtmlBlock } from "@/components/content/html-block";
import { CommunityMembers } from "@/components/content/community-members";
import { FadeInView } from "@/components/motion/fade-in-view";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { PageShell } from "@/components/layout/page-shell";
import { StaticImage } from "@/components/ui/static-image";
import { COMMUNITY_HERO_IMAGE, getCommunityHeroSubtitle } from "@/data/community-detail-config";
import type { CommunityEvent, CommunityKind, CommunityMember } from "@/data/site-data";
import { format } from "@/lib/format";
import { cn } from "@/lib/utils";

type CommunitySectionPageViewProps = {
  kind: CommunityKind;
  title: string;
  content: string;
  heroImageUrl?: string;
  members: CommunityMember[];
  events: CommunityEvent[];
};

function CommunityImageGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  if (images.length === 0) return null;

  return (
    <FadeInView className="mt-14 sm:mt-16">
      <SectionHeading
        underline
        eyebrow="Visual highlights"
        title="Gallery"
        description="Moments and identity from our campus community."
        className="max-w-2xl"
      />
      <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <StaggerItem key={image.src}>
            <div className="group overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_8px_28px_rgba(11,31,91,0.08)]">
              <div className="aspect-[4/3] overflow-hidden">
                <StaticImage
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </FadeInView>
  );
}

function CommunityEventsSection({ events }: { events: CommunityEvent[] }) {
  if (events.length === 0) return null;

  return (
    <FadeInView className="mt-14 sm:mt-16">
      <SectionHeading
        underline
        eyebrow="Campus activity"
        title="Events"
        description="Recent initiatives, sessions, and community milestones."
        className="max-w-2xl"
      />
      <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {events.map((event) => (
          <StaggerItem key={event.title}>
            <article
              className={cn(
                "h-full rounded-xl border border-black/[0.06] bg-white p-5 sm:p-6",
                "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
                "hover:-translate-y-1 hover:border-[#1E3A8A]/15 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]",
              )}
            >
              <h3 className="font-display text-lg font-bold text-[#0F172A]">{event.title}</h3>
              {event.description ? (
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{event.description}</p>
              ) : null}
              {event.eventDate ? (
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-[#1E3A8A]">
                  {format.date(event.eventDate)}
                </p>
              ) : null}
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </FadeInView>
  );
}

function resolveGalleryImages(
  kind: CommunityKind,
  heroImageUrl?: string,
): { src: string; alt: string }[] {
  if (!heroImageUrl) return [];

  const altByKind: Partial<Record<CommunityKind, string>> = {
    ALUMNI: "Alumni association at College of Engineering Poonjar",
    IEEE: "IEEE student branch logo",
    IEDC: "IEDC activity",
    NSS: "NSS logo",
  };

  if (kind === "ALUMNI") {
    return [{ src: heroImageUrl, alt: altByKind.ALUMNI ?? "Community highlight" }];
  }

  if (kind === "IEEE" || kind === "IEDC" || kind === "NSS") {
    return [{ src: heroImageUrl, alt: altByKind[kind] ?? "Community highlight" }];
  }

  return [{ src: heroImageUrl, alt: "Community highlight" }];
}

export function CommunitySectionPageView({
  kind,
  title,
  content,
  heroImageUrl,
  members,
  events,
}: CommunitySectionPageViewProps) {
  const galleryImages = resolveGalleryImages(kind, heroImageUrl);
  const showLogoBelowAbout = (kind === "IEEE" || kind === "IEDC" || kind === "NSS") && heroImageUrl;

  return (
    <PageShell
      heroImage={COMMUNITY_HERO_IMAGE}
      centered
      title={title}
      description={getCommunityHeroSubtitle(kind)}
      eyebrow="Community"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Community", href: "/community" },
        { label: title },
      ]}
      maxWidth="max-w-[1000px]"
    >
      <FadeInView>
        <SectionHeading
          underline
          eyebrow="Overview"
          title="About"
          className="max-w-2xl"
        />
        <div className="cms-content mt-8 text-sm leading-relaxed text-[#475569] sm:mt-10 sm:text-base [&_a]:text-[#1E3A8A] [&_p]:mb-5 [&_p:last-child]:mb-0 [&_p]:text-justify [&_p]:[text-justify:inter-word] [&_p]:hyphens-auto">
          <HtmlBlock html={content} />
        </div>
      </FadeInView>

      {showLogoBelowAbout ? (
        <FadeInView className="mt-10 flex justify-center">
          <StaticImage
            src={heroImageUrl!}
            alt={
              kind === "IEEE"
                ? "IEEE student branch logo"
                : kind === "NSS"
                  ? "NSS logo"
                  : "IEDC activity"
            }
            className="h-auto max-h-72 w-auto max-w-full rounded-xl object-contain transition-transform duration-300 hover:scale-[1.02]"
            sizes="(min-width: 896px) 640px, 100vw"
          />
        </FadeInView>
      ) : null}

      {kind === "ALUMNI" && galleryImages.length > 0 ? (
        <CommunityImageGallery images={galleryImages} />
      ) : null}

      <CommunityEventsSection events={events} />

      {members.length > 0 ? (
        <CommunityMembers kind={kind} members={members} premium />
      ) : null}
    </PageShell>
  );
}
