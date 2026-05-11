import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { facilities, getFacilityBySlug } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return facilities.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = getFacilityBySlug(slug);
  return { title: f?.name ?? "Facility" };
}

export default async function FacilityDetailPage({ params }: Props) {
  const { slug } = await params;
  const f = getFacilityBySlug(slug);
  if (!f) notFound();

  const gallery = f.galleryUrls ?? [];
  const highlights = f.highlights ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.imageUrl ?? "/images/placeholder-campus.svg"}
          alt={f.name}
          className="aspect-video w-full object-cover"
        />
      </div>
      <h1 className="mt-8 text-3xl font-bold text-brand-950">{f.name}</h1>
      {highlights.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-6 text-slate-700">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      <div className="cms-content mt-6">
        <HtmlBlock html={f.description} />
      </div>
      {gallery.length > 0 && (
        <div className="mt-10 columns-2 gap-3 sm:columns-3">
          {gallery.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt=""
              className="mb-3 break-inside-avoid rounded-lg border border-slate-200"
            />
          ))}
        </div>
      )}
    </div>
  );
}
