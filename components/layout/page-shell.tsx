import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PageBanner, type PageBannerCrumb } from "@/components/layout/page-banner";

type PageShellProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbs?: PageBannerCrumb[];
  centered?: boolean;
  bannerChildren?: ReactNode;
  maxWidth?: string;
  children: ReactNode;
  className?: string;
};

export function PageShell({
  title,
  description,
  eyebrow,
  breadcrumbs,
  centered,
  bannerChildren,
  maxWidth = "max-w-6xl",
  children,
  className,
}: PageShellProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <PageBanner
        title={title}
        description={description}
        eyebrow={eyebrow}
        breadcrumbs={breadcrumbs}
        centered={centered}
      >
        {bannerChildren}
      </PageBanner>
      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", maxWidth)}>{children}</div>
      </div>
    </div>
  );
}
