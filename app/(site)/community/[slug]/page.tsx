import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { communitySections, getCommunityByKind } from "@/data/site-data";
import { communitySlugToKind, communityKindToSlug } from "@/lib/community";
import { HtmlBlock } from "@/components/content/html-block";
import { format } from "@/lib/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {section.heroImageUrl && (
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={section.heroImageUrl}
            alt=""
            className="aspect-video w-full object-cover"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold text-brand-950">{section.title}</h1>
      <p className="mt-2 text-slate-600">{section.description}</p>
      <div className="cms-content mt-6">
        <HtmlBlock html={section.content} />
      </div>

      {events.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-brand-900">Events</h2>
          <ul className="mt-4 space-y-3">
            {events.map((e) => (
              <li
                key={e.title}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm"
              >
                <p className="font-semibold text-brand-900">{e.title}</p>
                {e.description && <p className="mt-1 text-slate-600">{e.description}</p>}
                {e.eventDate && (
                  <p className="mt-2 text-xs text-slate-500">{format.date(e.eventDate)}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {members.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-brand-900">Members</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((m) => (
                  <TableRow key={m.name}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell>{m.role ?? "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}
    </div>
  );
}
