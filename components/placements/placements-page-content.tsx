"use client";

import Link from "next/link";
import {
  Briefcase,
  Building2,
  GraduationCap,
  Handshake,
  LineChart,
  Mail,
  MessageSquare,
  Mic,
  Phone,
  Target,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HtmlBlock } from "@/components/content/html-block";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeInView } from "@/components/motion/fade-in-view";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { PlacementHighlightsShowcase } from "@/components/placements/placement-highlights-showcase";
import { PlacementSurfaceCard } from "@/components/placements/placement-surface-card";
import { StaticImage } from "@/components/ui/static-image";
import {
  PLACEMENT_DEFAULT_STATS,
  PLACEMENT_RECRUITER_SECTORS,
  PLACEMENT_TRAINING_ACTIVITIES,
  type PlacementActivityItem,
  type PlacementStatItem,
  type RecruiterSectorItem,
} from "@/data/placement-page-config";
import { cn } from "@/lib/utils";

const STAT_ICONS: LucideIcon[] = [TrendingUp, Users, Building2, GraduationCap];

const ACTIVITY_ICONS: Record<string, LucideIcon> = {
  "Aptitude Training": Target,
  "Soft Skills Development": MessageSquare,
  "Technical Workshops": Wrench,
  "Mock Interviews": Mic,
  "Career Guidance": GraduationCap,
  "Industry Interaction": Handshake,
};

type PlacementTeamMember = {
  name: string;
  role: string;
  email?: string;
  phone?: string;
};

type SuccessStory = {
  quote: string;
  name: string;
  programme: string;
};

type PlacementsPageContentProps = {
  aboutHtml: string;
  cellIntroHtml: string;
  members: PlacementTeamMember[];
  stats: PlacementStatItem[];
  activities: PlacementActivityItem[];
  recruiters: RecruiterSectorItem[];
  successStories: SuccessStory[];
};

function StatCard({ stat, icon: Icon }: { stat: PlacementStatItem; icon: LucideIcon }) {
  return (
    <PlacementSurfaceCard className="flex flex-col items-center p-6 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <p className="mt-4 font-display text-3xl font-bold tracking-tight text-[#0F172A]">
        {stat.value}
        {stat.suffix ? (
          <span className="text-xl font-bold text-[#1E3A8A]">{stat.suffix}</span>
        ) : null}
      </p>
      <p className="mt-2 font-semibold text-[#0F172A]">{stat.label}</p>
      <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{stat.description}</p>
    </PlacementSurfaceCard>
  );
}

function ActivityCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <PlacementSurfaceCard className="p-5 sm:p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-[#0F172A]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{description}</p>
    </PlacementSurfaceCard>
  );
}

function RecruiterCard({
  name,
  description,
  logoUrl,
}: {
  name: string;
  description: string;
  logoUrl?: string;
}) {
  return (
    <PlacementSurfaceCard className="flex flex-col items-center justify-center px-4 py-6 text-center">
      <div className="flex h-16 w-full max-w-[140px] items-center justify-center rounded-xl bg-[#F8FAFF] p-3 ring-1 ring-[#1E3A8A]/10">
        {logoUrl ? (
          <StaticImage
            src={logoUrl}
            alt={`${name} logo`}
            className="max-h-10 w-auto object-contain"
          />
        ) : (
          <Briefcase className="h-6 w-6 text-[#1E3A8A]" aria-hidden />
        )}
      </div>
      <p className="mt-4 font-display text-base font-bold leading-snug text-[#0F172A] sm:text-lg">
        {name}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{description}</p>
    </PlacementSurfaceCard>
  );
}

function TestimonialCard({ story }: { story: SuccessStory }) {
  return (
    <PlacementSurfaceCard as="blockquote" className="flex flex-col p-6 sm:p-7">
      <p className="flex-1 text-sm italic leading-relaxed text-[#475569] sm:text-[15px]">
        &ldquo;{story.quote}&rdquo;
      </p>
      <footer className="mt-5 border-t border-slate-100 pt-4">
        <p className="font-semibold text-[#0F172A]">{story.name}</p>
        <p className="mt-1 text-sm text-[#64748B]">{story.programme}</p>
      </footer>
    </PlacementSurfaceCard>
  );
}

function ProseBlock({ html }: { html: string }) {
  if (!html.trim()) return null;
  return (
    <div className="cms-content text-sm leading-[1.75] text-[#475569] sm:text-base [&_p]:mb-5 [&_p:last-child]:mb-0 [&_p]:text-justify [&_p]:[text-justify:inter-word] [&_p]:hyphens-auto">
      <HtmlBlock html={html} />
    </div>
  );
}

export function PlacementsPageContent({
  aboutHtml,
  cellIntroHtml,
  members,
  stats,
  activities,
  recruiters,
  successStories,
}: PlacementsPageContentProps) {
  const displayStats = stats.length > 0 ? stats : PLACEMENT_DEFAULT_STATS;
  const displayActivities =
    activities.length > 0 ? activities : PLACEMENT_TRAINING_ACTIVITIES;
  const displayRecruiters = recruiters.length > 0 ? recruiters : PLACEMENT_RECRUITER_SECTORS;

  return (
    <div className="bg-gradient-to-b from-[#F8FAFF] to-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[75rem] space-y-14 sm:space-y-16 lg:space-y-20">
        <PlacementHighlightsShowcase stats={displayStats} />

        <section aria-labelledby="placement-stats-heading">
          <FadeInView>
            <SectionHeading
              id="placement-stats-heading"
              underline
              eyebrow="At a glance"
              title="Placement Statistics"
              description="Career guidance, training, and recruitment support through the CGPU."
              className="max-w-2xl"
            />
          </FadeInView>
          <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {displayStats.map((stat, index) => (
              <StaggerItem key={stat.label} className="h-full">
                <StatCard stat={stat} icon={STAT_ICONS[index] ?? LineChart} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section aria-labelledby="about-cgpu-heading">
          <FadeInView>
            <SectionHeading
              id="about-cgpu-heading"
              underline
              eyebrow="Career Guidance and Placement Unit"
              title="About CGPU"
              className="max-w-2xl"
            />
            <div className="mx-auto mt-8 max-w-[900px] sm:mt-10">
              <ProseBlock html={aboutHtml} />
            </div>
          </FadeInView>
        </section>

        <section aria-labelledby="training-activities-heading">
          <FadeInView>
            <SectionHeading
              id="training-activities-heading"
              underline
              eyebrow="Career development"
              title="Training & Placement Activities"
              description="Programs designed to prepare students for industry and higher studies."
              className="max-w-2xl"
            />
          </FadeInView>
          <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {displayActivities.map((activity) => (
              <StaggerItem key={activity.title} className="h-full">
                <ActivityCard
                  title={activity.title}
                  description={activity.description}
                  icon={ACTIVITY_ICONS[activity.title] ?? GraduationCap}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section aria-labelledby="recruiters-heading">
          <FadeInView>
            <SectionHeading
              id="recruiters-heading"
              underline
              eyebrow="Industry connect"
              title="Top Recruiters"
              description="Recruitment drives and opportunities across diverse industry sectors."
              className="max-w-2xl"
            />
          </FadeInView>
          <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {displayRecruiters.map((recruiter) => (
              <StaggerItem key={recruiter.name} className="h-full">
                <RecruiterCard
                  name={recruiter.name}
                  description={recruiter.description}
                  logoUrl={recruiter.logoUrl}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {successStories.length > 0 ? (
          <section aria-labelledby="success-stories-heading">
            <FadeInView>
              <SectionHeading
                id="success-stories-heading"
                underline
                eyebrow="Student voices"
                title="Success Stories"
                description="Experiences from students who benefited from campus training and guidance."
                className="max-w-2xl"
              />
            </FadeInView>
            <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
              {successStories.map((story) => (
                <StaggerItem key={story.name} className="h-full">
                  <TestimonialCard story={story} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        ) : null}

        <section aria-labelledby="placement-cell-heading">
          <FadeInView>
            <SectionHeading
              id="placement-cell-heading"
              underline
              eyebrow="Leadership"
              title="Placement Cell"
              description="Activities of the CGPU are coordinated by the Placement Cell committee."
              className="max-w-2xl"
            />
            {cellIntroHtml ? (
              <div className="mx-auto mt-6 max-w-[900px]">
                <ProseBlock html={cellIntroHtml} />
              </div>
            ) : null}
          </FadeInView>

          <FadeInView className="mx-auto mt-8 max-w-[900px] space-y-4 sm:mt-10 md:hidden">
            {members.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_8px_28px_rgba(11,31,91,0.08)]"
              >
                <p className="font-semibold text-[#0F172A]">{member.name}</p>
                <p className="mt-1 text-sm text-[#64748B]">{member.role}</p>
                <div className="mt-3 flex flex-col gap-1.5 border-t border-slate-100 pt-3">
                  {member.email ? (
                    <Link
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1.5 break-all text-sm font-medium text-[#1E3A8A] hover:underline"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {member.email}
                    </Link>
                  ) : null}
                  {member.phone ? (
                    <Link
                      href={`tel:${member.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E3A8A] hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {member.phone}
                    </Link>
                  ) : null}
                  {!member.email && !member.phone ? (
                    <span className="text-sm text-[#64748B]">—</span>
                  ) : null}
                </div>
              </div>
            ))}
          </FadeInView>

          <FadeInView className="mx-auto mt-8 hidden max-w-[900px] overflow-x-auto rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_28px_rgba(11,31,91,0.08)] sm:mt-10 md:block">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-[#F8FAFF]">
                  <th className="px-5 py-4 font-semibold text-[#0F172A] sm:px-6">Name</th>
                  <th className="px-5 py-4 font-semibold text-[#0F172A] sm:px-6">Designation</th>
                  <th className="px-5 py-4 font-semibold text-[#0F172A] sm:px-6">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((member) => (
                  <tr key={member.name} className="transition-colors hover:bg-[#F8FAFF]/80">
                    <td className="px-5 py-4 font-medium text-[#0F172A] sm:px-6">{member.name}</td>
                    <td className="px-5 py-4 text-[#64748B] sm:px-6">{member.role}</td>
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex flex-col gap-1.5">
                        {member.email ? (
                          <Link
                            href={`mailto:${member.email}`}
                            className="inline-flex items-center gap-1.5 break-all font-medium text-[#1E3A8A] transition-colors hover:text-[#0B1F5B] hover:underline"
                          >
                            <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                            {member.email}
                          </Link>
                        ) : null}
                        {member.phone ? (
                          <Link
                            href={`tel:${member.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-1.5 font-medium text-[#1E3A8A] transition-colors hover:text-[#0B1F5B] hover:underline"
                          >
                            <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                            {member.phone}
                          </Link>
                        ) : null}
                        {!member.email && !member.phone ? "—" : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </FadeInView>
        </section>
      </div>
    </div>
  );
}
