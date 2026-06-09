import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { siteSettings } from "@/data/site-data";
import { gmailComposeUrl } from "@/lib/email-links";

/** Pages not listed in the main navbar */
const FOOTER_LINKS = [
  { href: "/admission", label: "Admission" },
  { href: "/academics/programs", label: "Programmes" },
  { href: "/students", label: "Students" },
  { href: "/placements", label: "Placements" },
  { href: "/about/principal", label: "Principal's Desk" },
  { href: "/about/iqac", label: "IQAC" },
  { href: "/academics/council", label: "Academic Council" },
  { href: "/academics/syllabus", label: "Syllabus" },
  { href: "/notices", label: "Notices" },
] as const;

const AFFILIATIONS = [
  { href: "https://www.ihrd.ac.in/", label: "IHRD" },
  {
    href: "https://www.ktu.edu.in/",
    label: "APJ Abdul Kalam Technological University",
  },
] as const;

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
      {children}
    </p>
  );
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function SiteFooter() {
  const [primaryEmail] = siteSettings.emails;
  const [landline, mobile] = siteSettings.phones;

  return (
    <footer className="border-t border-brand-800/60 bg-brand-950 text-brand-50">
      <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/footer-logo.webp"
                alt={siteSettings.collegeName}
                width={150}
                height={150}
                className="h-auto w-[108px] object-contain sm:w-[120px]"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-200">
              {siteSettings.tagline}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-brand-400">
              An institution under IHRD, Government of Kerala
            </p>
          </div>

          <div className="min-w-0 lg:col-span-3">
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-brand-100 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:col-span-2">
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-4 space-y-3 text-sm text-brand-100">
              {landline ? (
                <li>
                  <a
                    href={telHref(landline)}
                    className="inline-flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-brand-400" aria-hidden />
                    {landline}
                  </a>
                </li>
              ) : null}
              {mobile ? (
                <li>
                  <a
                    href={telHref(mobile)}
                    className="inline-flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-brand-400" aria-hidden />
                    {mobile}
                  </a>
                </li>
              ) : null}
              {primaryEmail ? (
                <li>
                  <a
                    href={gmailComposeUrl(primaryEmail)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 break-all transition-colors hover:text-white"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden />
                    {primaryEmail}
                  </a>
                </li>
              ) : null}
            </ul>
            <Link
              href="/contact"
              className="mt-4 inline-flex text-sm font-medium text-brand-200 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Full contact details
            </Link>
          </div>

          <div className="min-w-0 sm:col-span-2 lg:col-span-3">
            <FooterHeading>Campus</FooterHeading>
            <div className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-brand-100">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-400"
                aria-hidden
              />
              <address className="not-italic">{siteSettings.address}</address>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-800/80 pt-8">
          <FooterHeading>Affiliated to</FooterHeading>
          <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {AFFILIATIONS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-brand-200 transition-colors hover:text-white"
                >
                  {label}
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800/80 bg-brand-900/40">
        <div className="mx-auto flex max-w-6xl min-w-0 flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-brand-300 sm:flex-row sm:px-6 lg:px-8">
          <p suppressHydrationWarning className="text-center sm:text-left">
            © {new Date().getFullYear()} {siteSettings.collegeName}. All rights
            reserved.
          </p>
          <Link href="/search" className="transition-colors hover:text-white">
            Search
          </Link>
        </div>
      </div>
    </footer>
  );
}
