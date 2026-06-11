import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { admissionTracks, getAdmissionTrack } from "@/data/site-data";
import { ADMISSION_SLUGS } from "@/lib/constants";
import { HtmlBlock } from "@/components/content/html-block";
import { PageShell } from "@/components/layout/page-shell";
import { ExternalLink, FileDown } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return admissionTracks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const track = getAdmissionTrack(slug);
  return { title: track?.title ?? "Admission" };
}

export default async function AdmissionTrackPage({ params }: Props) {
  const { slug } = await params;
  if (!ADMISSION_SLUGS.includes(slug as (typeof ADMISSION_SLUGS)[number])) {
    notFound();
  }
  const track = getAdmissionTrack(slug);
  if (!track) notFound();

  const links = track.importantLinks ?? [];
  const downloads = track.downloads ?? [];

  return (
    <PageShell
      eyebrow="Admissions"
      title={track.title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Admission", href: "/admission" },
        { label: track.title },
      ]}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-brand-900">Eligibility</h2>
          <div className="cms-content mt-3">
            <HtmlBlock html={track.eligibility} />
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-brand-900">Allotment</h2>
          <div className="cms-content mt-3">
            <HtmlBlock html={track.allotment} />
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-brand-900">Fee structure</h2>
          <div className="cms-content mt-3">
            <HtmlBlock html={track.feeStructure} />
          </div>
        </section>
        {links.length > 0 ? (
          <section>
            <h2 className="text-xl font-semibold text-brand-900">Important links</h2>
            <ul className="mt-3 space-y-2">
              {links.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-brand-700 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {downloads.length > 0 ? (
          <section>
            <h2 className="text-xl font-semibold text-brand-900">Downloads</h2>
            <ul className="mt-3 space-y-2">
              {downloads.map((d) => (
                <li key={d.fileUrl}>
                  <a
                    href={d.fileUrl}
                    className="inline-flex items-center gap-2 text-brand-700 hover:underline"
                  >
                    <FileDown className="h-4 w-4" />
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}
