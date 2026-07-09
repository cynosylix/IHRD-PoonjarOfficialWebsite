import type { Metadata } from "next";
import { campusAlbum, publishedAnnouncements } from "@/data/site-data";
import { HeroSection } from "@/components/home/hero-section";
import { AboutIntroBand } from "@/components/home/about-intro-band";
import { AnnouncementsSpotlight } from "@/components/home/announcements-spotlight";
import { CampusAlbumSection } from "@/components/home/campus-album-section";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: { absolute: "College of Engineering Poonjar, a Unit of IHRD, Government of Kerala" },
  description:
    "Official website of College of Engineering Poonjar, a Unit of IHRD, Government of Kerala — offering B.Tech, MCA, and diploma programmes in Kerala.",
  openGraph: {
    title: "College of Engineering Poonjar, a Unit of IHRD, Government of Kerala",
    description:
      "College of Engineering Poonjar, a Unit of IHRD, Government of Kerala — admissions, academics, placements, and campus life.",
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

      <CampusAlbumSection albums={campusAlbum} />
    </>
  );
}
