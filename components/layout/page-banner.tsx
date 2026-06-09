import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type PageBannerCrumb = {
  label: string;
  href?: string;
};

type PageBannerProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbs?: PageBannerCrumb[];
  centered?: boolean;
  children?: ReactNode;
  className?: string;
};

export function PageBanner({
  title,
  description,
  eyebrow,
  breadcrumbs,
  centered = false,
  children,
  className,
}: PageBannerProps) {
  return (
    <header
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-brand-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-brand-300 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav
            className={cn(
              "flex flex-wrap items-center gap-1 text-xs font-medium text-white/70 sm:text-sm",
              centered && "justify-center",
            )}
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={`${crumb.label}-${index}`}>
                {index > 0 ? (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
                ) : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={index === breadcrumbs.length - 1 ? "text-white" : "text-white/50"}>
                    {crumb.label}
                  </span>
                )}
              </Fragment>
            ))}
          </nav>
        ) : null}
        <div
          className={cn(
            "mt-6",
            centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
          )}
        >
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "text-2xl font-bold tracking-tight break-words sm:text-3xl md:text-4xl",
              eyebrow && "mt-2",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-sm leading-relaxed text-brand-100 sm:text-base">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </header>
  );
}
