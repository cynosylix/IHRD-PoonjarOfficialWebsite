import type { Metadata } from "next";
import { campusAlbum, publishedAnnouncements } from "@/data/site-data";
import { HeroSection } from "@/components/home/hero-section";
import { AboutIntroBand } from "@/components/home/about-intro-band";
import { AnnouncementsSpotlight } from "@/components/home/announcements-spotlight";
import { SectionHeading } from "@/components/home/section-heading";
import { StaticImage } from "@/components/ui/static-image";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: { absolute: "College of Engineering Poonjar" },
  description:
    "Official website of College of Engineering Poonjar — IHRD engineering college offering B.Tech, MCA, and diploma programmes in Kerala.",
  openGraph: {
    title: "College of Engineering Poonjar",
    description:
      "Quality technical education under IHRD, Government of Kerala — admissions, academics, placements, and campus life.",
    url: getSiteUrl(),
    images: [{ url: "/images/collageOutDoor-2.webp", width: 1920, height: 495, alt: "College of Engineering Poonjar campus" }],
  },
};

export default function HomePage() {
  const featuredAnnouncements = publishedAnnouncements().slice(0, 4);

  return (
    <>
      <HeroSection />

      <AboutIntroBand />

      <AnnouncementsSpotlight announcements={featuredAnnouncements} />

      <section className="bg-white py-12 sm:py-14 md:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="Campus album"
            description="Moments from campus life, programmes, and celebrations."
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {campusAlbum.map((item) => (
              <figure
                key={item.src}
                className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-card transition hover:border-brand-200 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100">
                  <StaticImage
                    src={item.src}
                    alt={item.alt}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="border-t border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
                  <p className="text-sm font-semibold text-brand-950">{item.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
