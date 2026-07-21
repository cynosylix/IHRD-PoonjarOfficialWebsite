"use client";

import { FadeInView } from "@/components/motion/fade-in-view";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { StaticImage } from "@/components/ui/static-image";
import {
  facultyDirectoryDepartments,
  facultyDirectoryPhotoUrl,
  type FacultyDirectoryDepartment,
  type FacultyDirectoryMember,
} from "@/data/faculty-directory";
import { memberInitials } from "@/lib/staff-photo";
import { cn } from "@/lib/utils";

function FacultyCard({
  member,
  folder,
}: {
  member: FacultyDirectoryMember;
  folder: string;
}) {
  const photoUrl = facultyDirectoryPhotoUrl(folder, member.photoFile);

  return (
    <article
      className={cn(
        "flex h-full flex-col items-center rounded-2xl border border-black/[0.06] bg-white p-6 text-center",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
        "hover:-translate-y-1.5 hover:border-[#1E3A8A]/15 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]",
        "sm:p-7",
      )}
    >
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-[#1E3A8A]/10 bg-[#EEF4FF] shadow-sm sm:h-32 sm:w-32">
        {photoUrl ? (
          <StaticImage
            src={photoUrl}
            alt={`${member.name} — ${member.designation}`}
            className="h-full w-full object-cover object-top"
            sizes="128px"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-2xl font-semibold tracking-wide text-[#1E3A8A]"
            aria-hidden
          >
            {memberInitials(member.name)}
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="font-display text-lg font-bold leading-snug text-[#0F172A]">
          {member.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
          {member.designation}
        </p>
      </div>
    </article>
  );
}

function DepartmentFacultyBlock({
  department,
}: {
  department: FacultyDirectoryDepartment;
}) {
  const members = [...department.members].sort((a, b) => a.order - b.order);

  return (
    <FadeInView className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="font-display text-[clamp(1.35rem,2vw+0.5rem,1.75rem)] font-bold tracking-tight text-[#0F172A]">
          {department.name}
        </h2>
        <div
          className="mt-3 h-px w-full max-w-sm bg-gradient-to-r from-[#1E3A8A] via-[#D4A017] to-transparent"
          aria-hidden
        />
      </div>

      <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {members.map((member) => (
          <StaggerItem
            key={`${department.folder}-${member.photoFile}`}
            className="h-full"
          >
            <FacultyCard member={member} folder={department.folder} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </FadeInView>
  );
}

export function FacultyDirectoryPageContent() {
  const departments = facultyDirectoryDepartments();

  return (
    <div className="min-w-0 bg-gradient-to-b from-[#F8FAFF] to-white">
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-14 sm:space-y-16 lg:space-y-20">
          {departments.map((department) => (
            <DepartmentFacultyBlock
              key={department.folder}
              department={department}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
