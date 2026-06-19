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
    <header className={cn("border-b border-[#1E293B] bg-[#0F172A] text-white", className)}>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav
            className={cn(
              "flex flex-wrap items-center gap-1 text-xs text-slate-400 sm:text-sm",
              centered && "justify-center",
            )}
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={`${crumb.label}-${index}`}>
                {index > 0 ? (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                ) : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={
                      index === breadcrumbs.length - 1 ? "text-slate-200" : "text-slate-500"
                    }
                  >
                    {crumb.label}
                  </span>
                )}
              </Fragment>
            ))}
          </nav>
        ) : null}
        <div
          className={cn(
            breadcrumbs && breadcrumbs.length > 0 ? "mt-5" : "",
            centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
          )}
        >
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "font-display text-[clamp(1.75rem,3vw+0.5rem,2.5rem)] font-bold leading-tight tracking-tight",
              eyebrow && "mt-2",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-slate-300 sm:text-base">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </header>
  );
}
