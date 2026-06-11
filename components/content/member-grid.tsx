import { StaticImage } from "@/components/ui/static-image";
import { communityMemberPhotoUrl } from "@/lib/community-photo";
import { memberInitials, staffPhotoUrl } from "@/lib/staff-photo";

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

export function MemberGrid({ title = "Members", members, communityKind }: MemberGridProps) {
  if (members.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-brand-900">{title}</h2>
      <ul className="mt-6 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {members.map((m) => {
          const photo = resolvePhoto(m, communityKind);
          return (
            <li
              key={`${m.name}-${m.order ?? m.lines?.[0] ?? ""}`}
              className={`overflow-hidden rounded-xl border bg-white shadow-sm ${
                m.highlight ? "border-brand-300" : "border-slate-200"
              }`}
            >
              <div className="aspect-[4/5] bg-brand-50 sm:aspect-[3/4]">
                <MemberPortrait
                  name={m.name}
                  photo={photo}
                  alt={`${m.name}${m.lines?.[0] ? ` — ${m.lines[0]}` : ""}`}
                />
              </div>
              <div className="p-4">
                <p className="font-semibold leading-snug text-brand-900">{m.name}</p>
                {m.lines?.map((line) => (
                  <p key={line} className="mt-1 text-sm text-slate-600">
                    {line}
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
