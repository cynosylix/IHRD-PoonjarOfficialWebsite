import Link from "next/link";
import {
  publishedAnnouncements,
  facilities,
  publishedTestimonials,
  galleryItems,
} from "@/data/site-data";
import { HeroSection } from "@/components/home/hero-section";
import { AboutIntroBand } from "@/components/home/about-intro-band";
import { AnnouncementsSpotlight } from "@/components/home/announcements-spotlight";
import { SectionHeading } from "@/components/home/section-heading";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CAMPUS_ALBUM = [
  {
    src: "/images/placements_and_passouts_2k25.webp",
    title: "Placements & pass-outs",
    alt: "Placements and pass-outs highlights for the academic year 2025.",
    contain: false,
  },
  {
    src: "/images/scholarship.webp",
    title: "Scholarships",
    alt: "Scholarship and financial support programmes",
    contain: false,
  },
  {
    src: "/images/kuttaottam.webp",
    title: "Marathon Against Drugs",
    alt: "Run for a Better Future",
    description:
      "The College of Engineering Poonjar, in association with IHRD Kerala, organized a Marathon Against Drugs to raise awareness about substance abuse. Students, faculty, and the community participated, promoting a drug-free society and a healthier future.",
    contain: false,
  },
  {
    src: "/images/2.webp",
    title: "Campus highlights",
    alt: "College of Engineering Poonjar — campus moments and activities",
    contain: false,
  },
] as const;

export default function HomePage() {
  const announcements = publishedAnnouncements().slice(0, 6);
  const facilityList = [...facilities].sort((a, b) => a.order - b.order).slice(0, 6);
  const testimonials = publishedTestimonials().slice(0, 6);
  const gallery = [...galleryItems].sort((a, b) => a.order - b.order).slice(0, 8);

  return (
    <>
      <HeroSection />

      <AboutIntroBand />

      <AnnouncementsSpotlight announcements={announcements} />

      <section className="bg-white py-12 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="Campus album"
            description="Moments from campus life, programmes, and celebrations at College of Engineering Poonjar."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {CAMPUS_ALBUM.map((item) => (
              <figure
                key={item.src}
                className="group flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-card transition hover:border-brand-200 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full shrink-0 bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={
                      item.contain
                        ? "h-full w-full object-contain p-4 transition duration-300 group-hover:scale-[1.02]"
                        : "h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    }
                  />
                </div>
                <figcaption className="border-t border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
                  <p className="text-sm font-semibold text-brand-950">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.alt}</p>
                  {"description" in item && item.description ? (
                    <p className="mt-2.5 border-t border-slate-100 pt-2.5 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                      {item.description}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8">
        <SectionHeading
          eyebrow="Campus"
          title="Facilities preview"
          description="Infrastructure that supports learning beyond the classroom."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilityList.map((f) => (
            <Link key={f.slug} href={`/facilities/${f.slug}`}>
              <Card className="h-full hover:border-brand-300">
                <CardHeader>
                  <CardTitle>{f.name}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {f.summary ?? f.description.replace(/<[^>]+>/g, "").slice(0, 140)}…
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-12 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Voices"
            title="Testimonials"
            description="What our alumni and students share about their journey."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <Card key={t.id}>
                <CardHeader>
                  <CardTitle className="text-base">{t.authorName}</CardTitle>
                  <CardDescription>
                    {[t.role, t.batch].filter(Boolean).join(" · ")}
                  </CardDescription>
                  <p className="mt-2 text-sm text-slate-700">{t.content}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Campus in pictures"
          description="A glimpse of life at College of Engineering Poonjar."
        />
        <div className="mt-10 columns-1 gap-4 min-[420px]:columns-2 sm:columns-3 lg:columns-4">
          {gallery.map((g) => (
            <figure
              key={g.id}
              className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.url} alt={g.title ?? "Gallery"} className="w-full object-cover" />
              {g.title && (
                <figcaption className="px-3 py-2 text-xs text-slate-600">{g.title}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
