import type { Metadata } from "next";
import { NoticesHero } from "@/components/notices/notices-hero";
import { NoticesPortal } from "@/components/notices/notices-portal";
import { publishedAnnouncements } from "@/data/site-data";

export const metadata: Metadata = {
  title: "Notices & Announcements",
  description:
    "Official announcements and notices for College of Engineering Poonjar — admissions, examinations, events, and campus updates.",
};

export default function NoticesPage() {
  const list = publishedAnnouncements();

  return (
    <div className="min-w-0">
      <NoticesHero />
      <NoticesPortal notices={list} />
    </div>
  );
}
