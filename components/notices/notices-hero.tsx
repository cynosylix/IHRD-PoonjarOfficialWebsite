import Link from "next/link";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { StaticImage } from "@/components/ui/static-image";

const HERO_IMAGE = "/images/collageOutDoor-2.webp";

const OVERLAY = `linear-gradient(
  135deg,
  rgba(11,31,91,0.65) 0%,
  rgba(18,52,130,0.45) 50%,
  rgba(255,255,255,0.08) 100%
)`;

export function NoticesHero() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Notices" },
  ] as const;

  return (
    <section className="relative min-h-[38vh] overflow-hidden sm:min-h-[42vh] lg:min-h-[46vh]">
      <div className="absolute inset-0" aria-hidden>
        <StaticImage
          src={HERO_IMAGE}
          alt=""
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-center brightness-[1.06] contrast-[1.05] saturate-[1.02]"
        />
      </div>
      <div className="absolute inset-0" style={{ background: OVERLAY }} aria-hidden />

      <div className="relative mx-auto flex min-h-[38vh] max-w-6xl flex-col justify-center px-4 py-10 sm:min-h-[42vh] sm:px-6 sm:py-12 lg:min-h-[46vh] lg:px-8 lg:py-14">
        <nav
          className="mb-4 flex flex-wrap items-center gap-1 text-xs text-blue-200/80 sm:mb-5 sm:text-sm"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, index) => (
            <Fragment key={crumb.label}>
              {index > 0 ? (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
              ) : null}
              {"href" in crumb && crumb.href ? (
                <Link href={crumb.href} className="transition-colors hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#D4A017]">{crumb.label}</span>
              )}
            </Fragment>
          ))}
        </nav>

        <h1 className="font-display text-[clamp(1.75rem,3.5vw+0.5rem,2.75rem)] font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(11,31,91,0.45)]">
          Notices &amp; Announcements
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-100/90 sm:text-base">
          Stay updated with academic, administrative, examination, and campus notifications.
        </p>
      </div>
    </section>
  );
}
