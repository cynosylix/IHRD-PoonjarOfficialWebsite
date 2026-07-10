"use client";

import Link from "next/link";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Download, Phone } from "lucide-react";
import { ApplyNowLink } from "@/components/ui/apply-now-link";
import { StaticImage } from "@/components/ui/static-image";
import { cn } from "@/lib/utils";

/** Same overlay as homepage hero — do not modify independently. */
const OVERLAY_GRADIENT = `linear-gradient(
  135deg,
  rgba(11,31,91,0.92) 0%,
  rgba(18,52,130,0.85) 45%,
  rgba(30,58,138,0.65) 70%,
  rgba(255,255,255,0.15) 100%
)`;

const fadeIn = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export type ProgramDetailHeroProps = {
  programName: string;
  departmentName: string;
  shortDescription: string;
  duration?: string;
  affiliation?: string;
  intake?: string;
  typeLabel: string;
  heroImage: string;
  prospectusUrl: string;
  departmentHref?: string;
  heroHeight?: "compact" | "standard";
  showProspectus?: boolean;
  contactButtonLabel?: string;
  contactButtonHref?: string;
};

export function ProgramDetailHero({
  programName,
  departmentName,
  shortDescription,
  duration,
  affiliation,
  intake,
  typeLabel,
  heroImage,
  prospectusUrl,
  departmentHref,
  heroHeight = "compact",
  showProspectus = true,
  contactButtonLabel = "Contact Department",
  contactButtonHref,
}: ProgramDetailHeroProps) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Programmes", href: "/academics/programs" },
    { label: programName },
  ] as const;

  const heightClasses =
    heroHeight === "standard"
      ? {
          section: "min-h-[min(55vh,520px)] sm:min-h-[min(60vh,580px)] lg:min-h-[min(65vh,640px)]",
          inner:
            "min-h-[min(55vh,520px)] sm:min-h-[min(60vh,580px)] lg:min-h-[min(65vh,640px)]",
        }
      : {
          section: "min-h-[min(45vh,440px)] sm:min-h-[min(50vh,500px)] lg:min-h-[min(55vh,560px)]",
          inner:
            "min-h-[min(45vh,440px)] sm:min-h-[min(50vh,500px)] lg:min-h-[min(55vh,560px)]",
        };

  return (
    <section className={cn("relative overflow-hidden text-white", heightClasses.section)}>
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <StaticImage
            src={heroImage}
            alt=""
            priority
            sizes="100vw"
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </div>

      <div
        className="absolute inset-0"
        style={{ background: OVERLAY_GRADIENT }}
        aria-hidden
      />

      <div
        className={cn(
          "relative mx-auto flex max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-14",
          heightClasses.inner,
        )}
      >
        <nav
          className="mb-4 flex flex-wrap items-center gap-1 text-xs text-blue-200/85 sm:mb-5 sm:text-sm"
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

        <div className="max-w-2xl">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4A017]"
          >
            {typeLabel} · {departmentName}
          </motion.p>

          <motion.h1
            custom={0.05}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-2 font-display text-[clamp(1.875rem,3.5vw+0.5rem,2.875rem)] font-bold leading-[1.12] tracking-tight text-white sm:mt-3"
          >
            {programName}
          </motion.h1>

          <motion.p
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-3 max-w-xl text-sm leading-relaxed text-blue-50/95 sm:mt-4 sm:text-[15px] sm:leading-relaxed"
          >
            {shortDescription}
          </motion.p>

          <motion.dl
            custom={0.14}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm sm:mt-5 sm:gap-x-8"
          >
            {duration ? (
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-blue-200/90">
                  Duration
                </dt>
                <dd className="mt-0.5 font-medium text-white">{duration}</dd>
              </div>
            ) : null}
            {intake ? (
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-blue-200/90">
                  Intake
                </dt>
                <dd className="mt-0.5 font-medium text-white">{intake}</dd>
              </div>
            ) : null}
            {affiliation ? (
              <div className="min-w-0 max-w-sm">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-blue-200/90">
                  Affiliation
                </dt>
                <dd className="mt-0.5 font-medium text-white">{affiliation}</dd>
              </div>
            ) : null}
          </motion.dl>

          <motion.div
            custom={0.18}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-5 flex w-full flex-col gap-2.5 sm:mt-6 md:flex-row md:flex-wrap md:gap-3"
          >
            <ApplyNowLink
              className={cn(
                "inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#D4A017] px-5 text-sm font-semibold text-[#0B1F5B] transition-colors duration-200 md:w-auto md:px-6",
                "hover:bg-[#E5B422]",
              )}
            >
              Apply Now
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ApplyNowLink>
            {showProspectus ? (
              <a
                href={prospectusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-5 text-sm font-semibold text-white transition-colors duration-200 md:w-auto md:px-6",
                  "hover:border-white/55 hover:bg-white/15",
                )}
              >
                <Download className="h-4 w-4" aria-hidden />
                Download Prospectus
              </a>
            ) : null}
            <Link
              href={contactButtonHref ?? departmentHref ?? "/contact"}
              className={cn(
                "inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-5 text-sm font-semibold text-white transition-colors duration-200 md:w-auto md:px-6",
                "hover:border-white/55 hover:bg-white/15",
              )}
            >
              <Phone className="h-4 w-4" aria-hidden />
              {contactButtonLabel}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
