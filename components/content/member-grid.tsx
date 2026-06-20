"use client";

import { StaticImage } from "@/components/ui/static-image";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeInView } from "@/components/motion/fade-in-view";
import { communityMemberPhotoUrl } from "@/lib/community-photo";
import { memberInitials, staffPhotoUrl } from "@/lib/staff-photo";
import { cn } from "@/lib/utils";

export type MemberGridEntry = {
  name: string;
  /** Role, designation, department, contact — shown under the name */
  lines?: string[];
  photoUrl?: string;
  order?: number;
  highlight?: boolean;
};

type MemberGridProps = {
  title?: string;
  members: MemberGridEntry[];
  /** When set, resolves senate (etc.) photos by order before name lookup */
  communityKind?: string;
  premium?: boolean;
};

function resolvePhoto(
  member: MemberGridEntry,
  communityKind?: string,
): string | undefined {
  if (member.photoUrl) return member.photoUrl;
  if (communityKind && member.order != null) {
    const community = communityMemberPhotoUrl(communityKind, member.order);
    if (community) return community;
  }
  return staffPhotoUrl(member.name);
}

function MemberPortrait({
  name,
  photo,
  alt,
}: {
  name: string;
  photo?: string;
  alt: string;
}) {
  if (photo) {
    return (
      <StaticImage
        src={photo}
        alt={alt}
        className="h-full w-full object-cover object-top"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
    );
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-brand-100 text-3xl font-semibold tracking-wide text-brand-700"
      aria-hidden
    >
      {memberInitials(name)}
    </div>
  );
}

export function MemberGrid({
  title = "Members",
  members,
  communityKind,
  premium = false,
}: MemberGridProps) {
  if (members.length === 0) return null;

  return (
    <FadeInView className={premium ? "mt-14 sm:mt-16" : "mt-12"}>
      {premium ? (
        <SectionHeading
          underline
          eyebrow="Our team"
          title={title}
          description="Representatives and office bearers serving the campus community."
          className="max-w-2xl"
        />
      ) : (
        <h2 className="text-xl font-semibold text-brand-900">{title}</h2>
      )}
      <ul className={cn("grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-3", premium ? "mt-8" : "mt-6")}>
        {members.map((m) => {
          const photo = resolvePhoto(m, communityKind);
          return (
            <li
              key={`${m.name}-${m.order ?? m.lines?.[0] ?? ""}`}
              className={cn(
                "overflow-hidden rounded-xl border bg-white transition-all duration-300",
                premium
                  ? "border-black/[0.06] shadow-[0_8px_28px_rgba(11,31,91,0.08)] hover:-translate-y-1 hover:border-[#1E3A8A]/15 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]"
                  : m.highlight
                    ? "border-brand-300 shadow-sm"
                    : "border-slate-200 shadow-sm",
              )}
            >
              <div className="aspect-[4/5] overflow-hidden bg-brand-50 sm:aspect-[3/4]">
                <MemberPortrait
                  name={m.name}
                  photo={photo}
                  alt={`${m.name}${m.lines?.[0] ? ` — ${m.lines[0]}` : ""}`}
                />
              </div>
              <div className="p-4 text-center sm:p-5">
                <p className="font-display font-semibold leading-snug text-[#0F172A]">{m.name}</p>
                {m.lines?.map((line) => (
                  <p key={line} className="mt-1 text-sm text-[#64748B]">
                    {line}
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </FadeInView>
  );
}
