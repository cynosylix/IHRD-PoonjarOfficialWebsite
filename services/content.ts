import { publishedAnnouncements } from "@/data/site-data";

/** Example service — thin wrapper over static data */
export function getPublishedAnnouncements(limit = 5) {
  return publishedAnnouncements().slice(0, limit);
}
