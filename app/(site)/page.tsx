import Link from "next/link";
import {
  publishedAnnouncements,
  publishedEvents,
  departments,
  placementStatistics,
  facilities,
  publishedTestimonials,
  galleryItems,
} from "@/data/site-data";
import { HeroSection } from "@/components/home/hero-section";
import { AboutIntroBand } from "@/components/home/about-intro-band";
import { AnnouncementsSpotlight } from "@/components/home/announcements-spotlight";
import { SectionHeading } from "@/components/home/section-heading";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "@/lib/format";

export default function HomePage() {
  const announcements = publishedAnnouncements().slice(0, 6);
  const events = publishedEvents().slice(0, 4);
  const stats = placementStatistics.slice(0, 2);
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
            eyebrow="Calendar"
            title="Events & news"
            description="Workshops, seminars, and campus programmes."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {events.length === 0 ? (
              <p className="text-slate-600">No upcoming events.</p>
            ) : (
              events.map((e) => (
                <Card key={e.id} className="overflow-hidden p-0">
                  <div className="grid min-w-0 grid-cols-1 gap-0 md:min-h-[140px] md:grid-cols-[1fr_160px] md:gap-0">
                    <div className="relative order-1 aspect-[16/10] w-full bg-brand-50 md:order-2 md:aspect-auto md:h-full md:min-h-[120px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={e.imageUrl ?? "/images/placeholder-lab.svg"}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardHeader className="order-2 mb-0 px-4 pb-5 pt-4 sm:px-6 md:order-1 md:px-6 md:py-6">
                      <CardTitle className="text-base leading-snug sm:text-lg">{e.title}</CardTitle>
                      <CardDescription className="line-clamp-2 sm:line-clamp-3">
                        {e.description}
                      </CardDescription>
                      <p className="break-words text-xs text-slate-500">
                        {format.datetime(e.startsAt)}
                        {e.venue ? ` · ${e.venue}` : ""}
                      </p>
                    </CardHeader>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8">
        <SectionHeading
          eyebrow="Academics"
          title="Featured departments"
          description="Explore programmes anchored by experienced faculty and laboratories."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <Link key={d.slug} href={`/academics/departments/${d.slug}`}>
              <Card className="h-full transition hover:border-brand-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{d.name}</CardTitle>
                  <CardDescription className="line-clamp-3">{d.intro}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-brand-950 py-12 text-white sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Careers"
            title="Placement highlights"
            description="Training, industry visits, and placement outcomes at a glance."
            className="[&_h2]:text-white [&_p]:text-brand-100"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {stats.map((s) => (
              <Card key={s.academicYear} className="border-brand-800 bg-brand-900 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Academic year {s.academicYear}</CardTitle>
                  <ul className="mt-2 space-y-1 text-sm text-brand-100">
                    {s.totalOffers != null && <li>Total offers: {s.totalOffers}</li>}
                    {s.highestPackage && <li>Highest package: {s.highestPackage}</li>}
                    {s.averagePackage && <li>Average package: {s.averagePackage}</li>}
                    {s.placementPercent != null && (
                      <li>Placement %: {s.placementPercent}</li>
                    )}
                  </ul>
                  <Link
                    href="/placements"
                    className="mt-3 inline-block text-sm font-medium text-brand-200 underline-offset-2 hover:underline"
                  >
                    View placement cell
                  </Link>
                </CardHeader>
              </Card>
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
