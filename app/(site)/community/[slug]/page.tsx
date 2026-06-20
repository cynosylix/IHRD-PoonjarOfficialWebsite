import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommunitySectionPageView } from "@/components/community/community-section-page-view";
import { communitySections, getCommunityByKind } from "@/data/site-data";
import { communitySlugToKind, communityKindToSlug } from "@/lib/community";

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

  return (
    <CommunitySectionPageView
      kind={kind}
      title={section.title}
      content={section.content}
      heroImageUrl={section.heroImageUrl}
      members={members}
      events={section.events}
    />
  );
}
