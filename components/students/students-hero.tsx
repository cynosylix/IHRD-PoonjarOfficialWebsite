import Link from "next/link";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { StaticImage } from "@/components/ui/static-image";
import { pageHeroImages } from "@/data/site-data";

const HERO_IMAGE = pageHeroImages["/students"].src;

const OVERLAY = `linear-gradient(
  135deg,
  rgba(11,31,91,0.65) 0%,
  rgba(18,52,130,0.45) 50%,
  rgba(255,255,255,0.08) 100%
)`;

export function StudentsHero() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Students" },
  ] as const;

  return (
    <section className="relative min-h-[min(52vh,520px)] overflow-hidden sm:min-h-[min(58vh,580px)] lg:min-h-[min(64vh,640px)]">
      <div className="absolute inset-0" aria-hidden>
        <StaticImage
          src={HERO_IMAGE}
          alt=""
          priority
          sizes="100vw"
          className="h-full w-full min-h-full min-w-full object-cover object-center brightness-[1.06] contrast-[1.05] saturate-[1.02]"
        />
      </div>
      <div className="absolute inset-0" style={{ background: OVERLAY }} aria-hidden />

      <div className="relative mx-auto flex min-h-[min(52vh,520px)] max-w-6xl flex-col justify-center px-4 py-12 sm:min-h-[min(58vh,580px)] sm:px-6 sm:py-14 lg:min-h-[min(64vh,640px)] lg:px-8 lg:py-16">
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
          Student Life
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-100/90 sm:text-base">
          Empowering students through academics, innovation, leadership, and campus experiences.
        </p>
      </div>
    </section>
  );
}
