import Link from "next/link";
import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { StaticImage } from "@/components/ui/static-image";
import { cn } from "@/lib/utils";

const OVERLAY = `linear-gradient(
  135deg,
  rgba(11,31,91,0.65) 0%,
  rgba(18,52,130,0.45) 50%,
  rgba(255,255,255,0.08) 100%
)`;

type InstitutionHeroProps = {
  imageSrc: string;
  imageAlt: string;
};

export function InstitutionHero({ imageSrc }: InstitutionHeroProps) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/institution" },
    { label: "Institution" },
  ] as const;

  return (
    <section className="relative min-h-[50vh] overflow-hidden md:min-h-[65vh] lg:min-h-[80vh]">
      <div className="absolute inset-0" aria-hidden>
        <StaticImage
          src={imageSrc}
          alt=""
          priority
          sizes="100vw"
          className="h-full w-full object-cover object-center brightness-[1.06] contrast-[1.05] saturate-[1.02]"
        />
      </div>
      <div className="absolute inset-0" style={{ background: OVERLAY }} aria-hidden />

      <div className="relative mx-auto flex min-h-[50vh] max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 md:min-h-[65vh] md:py-16 lg:min-h-[80vh] lg:px-8 lg:py-20">
        <nav
          className="mb-5 flex flex-wrap items-center gap-1 text-xs text-blue-200/80 sm:mb-6 sm:text-sm"
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

        <h1 className="font-display text-[clamp(2rem,4vw+0.5rem,3rem)] font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(11,31,91,0.45)]">
          About the Institution
        </h1>
      </div>
    </section>
  );
}
