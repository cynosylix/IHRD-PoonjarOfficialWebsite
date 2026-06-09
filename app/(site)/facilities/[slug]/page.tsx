import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { facilities, getFacilityBySlug } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { PageShell } from "@/components/layout/page-shell";
import { StaticImage } from "@/components/ui/static-image";

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
    <PageShell
      title={f.name}
      description={f.summary}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Facilities", href: "/facilities" },
        { label: f.name },
      ]}
      maxWidth="max-w-4xl"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <StaticImage
          src={f.imageUrl ?? "/images/placeholder-campus.svg"}
          alt={f.name}
          className="aspect-video w-full object-cover"
          priority
          sizes="(min-width: 896px) 768px, 100vw"
        />
      </div>
      {highlights.length > 0 ? (
        <ul className="mt-6 list-disc space-y-1 pl-6 text-slate-700">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}
      <div className="cms-content mt-6">
        <HtmlBlock html={f.description} />
      </div>
      {gallery.length > 0 ? (
        <div className="mt-10 columns-2 gap-3 sm:columns-3">
          {gallery.map((url) => (
            <StaticImage
              key={url}
              src={url}
              alt=""
              className="mb-3 break-inside-avoid rounded-lg border border-slate-200"
              sizes="(min-width: 640px) 33vw, 50vw"
            />
          ))}
        </div>
      ) : null}
    </PageShell>
  );
}
