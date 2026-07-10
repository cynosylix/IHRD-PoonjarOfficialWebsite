"use client";

import { useMemo } from "react";
import { Mail, Phone } from "lucide-react";
import type { AcademicCouncilMember } from "@/data/site-data";
import {
  academicCouncilMembers,
  academicCouncilPage,
  academicCouncilResponsibilities,
  departments,
  programs,
} from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { FadeInView } from "@/components/motion/fade-in-view";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { gmailComposeUrl } from "@/lib/email-links";
import { cn } from "@/lib/utils";

function SectionDivider() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6" aria-hidden>
      <div className="h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/25 to-transparent" />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <FadeInView className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">{eyebrow}</p>
      <h2 className="mt-2 font-display text-[clamp(1.5rem,2.5vw+0.5rem,2.125rem)] font-bold text-[#0F172A]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">{description}</p>
      ) : null}
    </FadeInView>
  );
}

function getInitials(name: string) {
  return name
    .replace(/^(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ContactFooter({
  email,
  phone,
  variant = "default",
}: {
  email?: string;
  phone?: string;
  variant?: "default" | "leadership";
}) {
  const hasContact = Boolean(email || phone);
  const boxHeight = variant === "leadership" ? "h-[128px]" : "h-[96px]";

  return (
    <div className={cn("mt-auto shrink-0", variant === "leadership" ? "pt-5" : "pt-4")}>
      <div
        className={cn(
          "flex flex-col justify-center overflow-hidden rounded-xl border border-[#E8EEF8] bg-[#F8FAFF] p-4",
          boxHeight,
        )}
      >
        {hasContact ? (
          <div className="space-y-2.5">
            {email ? (
              <a
                href={gmailComposeUrl(email)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-0 items-center gap-2.5 text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#0B1F5B]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#1E3A8A] shadow-sm ring-1 ring-[#E2E8F0]">
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="min-w-0 truncate">{email}</span>
              </a>
            ) : null}
            {phone ? (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex min-w-0 items-center gap-2.5 text-sm font-medium text-[#1E3A8A] transition-colors hover:text-[#0B1F5B]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#1E3A8A] shadow-sm ring-1 ring-[#E2E8F0]">
                  <Phone className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="min-w-0 truncate">{phone}</span>
              </a>
            ) : null}
          </div>
        ) : (
          <p className="line-clamp-3 text-sm leading-relaxed text-[#64748B]">
            Contact through the college office for correspondence and appointments.
          </p>
        )}
      </div>
    </div>
  );
}

function LeadershipCard({ member }: { member: AcademicCouncilMember }) {
  const initials = getInitials(member.name);

  return (
    <article
      className={cn(
        "group relative flex h-[386px] w-full flex-col overflow-hidden rounded-2xl border border-black/[0.05] bg-white",
        "shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
        "transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1E3A8A]/20",
        "hover:shadow-[0_20px_48px_rgba(11,31,91,0.14)]",
      )}
    >
      <div
        className="h-1 shrink-0 bg-gradient-to-r from-[#D4A017] via-[#E8C547] to-[#D4A017]"
        aria-hidden
      />

      <div className="relative h-[120px] shrink-0 overflow-hidden bg-gradient-to-br from-[#0B1F5B] via-[#123482] to-[#1E3A8A] px-5 py-4 sm:px-6">
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/[0.06] blur-2xl"
          aria-hidden
        />
        <div className="relative flex h-full items-center gap-4">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
              "bg-white/15 font-display text-lg font-bold text-white backdrop-blur-sm",
              "ring-1 ring-white/25 transition-transform duration-300 group-hover:scale-105",
            )}
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4A017]">
              {member.designation}
            </p>
            <h3 className="mt-1 line-clamp-2 min-h-[2.75rem] font-display text-[1.15rem] font-bold leading-snug text-white sm:text-[1.25rem]">
              {member.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-6">
        <p className="line-clamp-3 min-h-[4.125rem] shrink-0 text-sm leading-relaxed text-[#475569] sm:text-[15px]">
          {member.departmentOrRole}
        </p>
        <ContactFooter email={member.email} phone={member.phone} variant="leadership" />
      </div>
    </article>
  );
}

function CouncilMemberCard({ member }: { member: AcademicCouncilMember }) {
  const initials = getInitials(member.name);

  return (
    <article
      className={cn(
        "group relative flex h-[304px] w-full flex-col overflow-hidden rounded-2xl border border-black/[0.05] bg-white",
        "shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
        "transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A]/15",
        "hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]",
      )}
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#1E3A8A] to-[#3B82F6] opacity-80" aria-hidden />

      <div className="flex min-h-0 flex-1 flex-col p-5 pl-6 sm:p-6 sm:pl-7">
        <div className="flex shrink-0 items-start gap-3">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
              "bg-[#EEF4FF] font-display text-sm font-bold text-[#0B1F5B]",
              "ring-1 ring-[#1E3A8A]/10 transition-colors duration-300 group-hover:bg-[#0B1F5B] group-hover:text-white",
            )}
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1E3A8A]">
              {member.designation}
            </p>
            <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] font-display text-lg font-bold leading-snug text-[#0F172A]">
              {member.name}
            </h3>
          </div>
        </div>

        <p className="mt-4 line-clamp-3 min-h-[4.125rem] shrink-0 text-sm leading-relaxed text-[#64748B]">
          {member.departmentOrRole}
        </p>
        <ContactFooter email={member.email} phone={member.phone} />
      </div>
    </article>
  );
}

function ResponsibilityCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-black/[0.05] bg-white p-6 sm:p-7",
        "shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
        "transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A]/15",
        "hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]",
      )}
    >
      <p className="font-display text-3xl font-bold leading-none text-[#E2E8F0] transition-colors duration-300 group-hover:text-[#BFDBFE]">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-3 font-display text-lg font-bold text-[#0F172A] sm:text-xl">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#64748B] sm:text-[15px]">{description}</p>
    </article>
  );
}

export function CouncilPageContent() {
  const sortedMembers = useMemo(
    () => [...academicCouncilMembers].sort((a, b) => a.order - b.order),
    [],
  );

  const leadershipMembers = useMemo(
    () => sortedMembers.filter((m) => m.leadership),
    [sortedMembers],
  );

  const councilMembers = useMemo(
    () => sortedMembers.filter((m) => !m.leadership),
    [sortedMembers],
  );

  const stats = useMemo(
    () => [
      { value: sortedMembers.length, suffix: "", label: "Total Members" },
      { value: departments.length, suffix: "", label: "Departments Represented" },
      { value: academicCouncilResponsibilities.length, suffix: "", label: "Committees" },
      { value: programs.length, suffix: "", label: "Academic Programs" },
    ],
    [sortedMembers.length],
  );

  return (
    <div
      className="relative min-w-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #EEF4FF 50%, #F8FAFF 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="announcement-blob-drift absolute -left-20 top-[6%] h-72 w-72 rounded-full bg-[#3B82F6]/[0.05] blur-3xl" />
        <div className="announcement-blob-drift-delayed absolute -right-16 top-[38%] h-64 w-64 rounded-full bg-[#1E3A8A]/[0.04] blur-3xl" />
      </div>

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="mx-auto max-w-3xl rounded-2xl border border-black/[0.05] bg-white/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:p-8">
              <div className="cms-content text-[15px] leading-[1.85] text-[#475569]">
                <HtmlBlock html={academicCouncilPage.description} />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      <SectionDivider />

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Council at a Glance" title="Academic Council Statistics" />

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div
                  className={cn(
                    "h-full rounded-2xl border border-white/80 bg-white/50 px-4 py-6 text-center backdrop-blur-sm",
                    "shadow-[0_4px_24px_-10px_rgba(11,31,91,0.08)]",
                    "transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A]/20 hover:bg-white/70",
                    "hover:shadow-[0_12px_36px_-10px_rgba(11,31,91,0.14)] sm:px-5 sm:py-7",
                  )}
                >
                  <p className="font-display text-3xl font-bold text-[#0B1F5B] sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#64748B] sm:text-[13px]">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Governance Leadership"
            title="Council Leadership"
            description="The principal leadership roles guiding academic policy, administration, and institutional governance."
          />

          <StaggerContainer className="mt-8 grid auto-rows-fr gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {leadershipMembers.map((member) => (
              <StaggerItem key={member.order} className="flex h-full w-full">
                <LeadershipCard member={member} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Representatives"
            title="Council Members"
            description="Faculty, student, and stakeholder representatives who contribute to academic decision-making."
          />

          <StaggerContainer
            className="mt-8 grid auto-rows-fr gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
            stagger={0.07}
          >
            {councilMembers.map((member) => (
              <StaggerItem key={member.order} className="flex h-full w-full">
                <CouncilMemberCard member={member} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Roles & Functions"
            title="Meeting Responsibilities"
            description="Key areas of academic governance addressed by the Academic Council throughout the academic year."
          />

          <StaggerContainer className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {academicCouncilResponsibilities.map((item, index) => (
              <StaggerItem key={item.title} className="flex h-full">
                <ResponsibilityCard title={item.title} description={item.description} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInView delay={0.1} className="mt-10 sm:mt-12">
            <div className="rounded-2xl border border-black/[0.05] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:p-8">
              <h3 className="font-display text-lg font-bold text-[#0F172A] sm:text-xl">
                Additional Functions
              </h3>
              <div className="cms-content mt-4 text-sm leading-relaxed text-[#64748B] sm:text-[15px]">
                <HtmlBlock html={academicCouncilPage.functions} />
              </div>
            </div>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
