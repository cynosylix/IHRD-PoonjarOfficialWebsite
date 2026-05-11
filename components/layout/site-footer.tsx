import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteSettings } from "@/data/site-data";

export function SiteFooter() {
  const phones = siteSettings.phones;
  const emails = siteSettings.emails;

  return (
    <footer className="border-t border-brand-100 bg-brand-950 text-brand-50">
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          <div className="min-w-0">
            <p className="text-base font-semibold text-white sm:text-lg">
              {siteSettings.collegeName}
            </p>
            <p className="mt-2 text-sm text-brand-100">{siteSettings.tagline}</p>
          </div>
          <div className="min-w-0 space-y-3 text-sm">
            <p className="flex gap-2 font-medium text-white">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              Address
            </p>
            <p className="break-words text-brand-100">{siteSettings.address}</p>
          </div>
          <div className="min-w-0 space-y-3 text-sm">
            {phones.length > 0 && (
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-brand-100">
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                <span className="break-all">{phones.join(" · ")}</span>
              </p>
            )}
            {emails.map((e) => (
              <p key={e} className="flex min-w-0 items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <a
                  href={`mailto:${e}`}
                  className="break-all text-brand-100 underline-offset-2 hover:underline"
                >
                  {e}
                </a>
              </p>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-brand-800 pt-6 text-xs text-brand-200 sm:flex-row">
          <p>© {new Date().getFullYear()} College of Engineering Poonjar. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/search" className="hover:text-white">
              Search
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
