import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { communitySections, getCommunityByKind } from "@/data/site-data";
import { communitySlugToKind, communityKindToSlug } from "@/lib/community";
import { HtmlBlock } from "@/components/content/html-block";
import { CommunityMembers } from "@/components/content/community-members";
import { PageShell } from "@/components/layout/page-shell";
import { StaticImage } from "@/components/ui/static-image";
import { format } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return communitySections.map((s) => ({ slug: communityKindToSlug(s.kind) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kind = communitySlugToKind(slug);
  const section = kind ? getCommunityByKind(kind) : undefined;
  return { title: section?.title ?? "Community" };
}

export default async function CommunitySectionPage({ params }: Props) {
  const { slug } = await params;
  const kind = communitySlugToKind(slug);
  if (!kind) notFound();

  const section = getCommunityByKind(kind);
  if (!section) notFound();

  const members = [...section.members].sort((a, b) => a.order - b.order);
  const events = section.events;
  const isLogoSection = kind === "IEEE" || kind === "IEDC" || kind === "NSS";
  const showTopHero = section.heroImageUrl && kind === "ALUMNI";

  return (
    <PageShell
      title={section.title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Community", href: "/community" },
        { label: section.title },
      ]}
    >
      {showTopHero ? (
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200">
          <StaticImage
            src={section.heroImageUrl!}
            alt={section.title}
            className="aspect-video w-full object-cover"
            priority
            sizes="(min-width: 896px) 768px, 100vw"
          />
        </div>
      ) : null}
      <div className="cms-content">
        <HtmlBlock html={section.content} />
      </div>

      {isLogoSection && section.heroImageUrl ? (
        <div className="mt-8 flex justify-center rounded-xl border border-slate-200 bg-white px-6 py-6">
          <StaticImage
            src={section.heroImageUrl}
            alt={
              kind === "IEEE"
                ? "IEEE student branch logo"
                : kind === "NSS"
                  ? "NSS logo"
                  : "IEDC activity"
            }
            className="mx-auto h-auto max-h-72 w-auto max-w-full object-contain"
            sizes="(min-width: 896px) 640px, 100vw"
          />
        </div>
      ) : null}

      {events.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-brand-900">Events</h2>
          <ul className="mt-4 space-y-3">
            {events.map((e) => (
              <li
                key={e.title}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm"
              >
                <p className="font-semibold text-brand-900">{e.title}</p>
                {e.description ? <p className="mt-1 text-slate-600">{e.description}</p> : null}
                {e.eventDate ? (
                  <p className="mt-2 text-xs text-slate-500">{format.date(e.eventDate)}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {members.length > 0 ? <CommunityMembers kind={kind} members={members} /> : null}
    </PageShell>
  );
}
