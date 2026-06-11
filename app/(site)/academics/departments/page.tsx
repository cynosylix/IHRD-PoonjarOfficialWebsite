import type { Metadata } from "next";
import Link from "next/link";
import { departments } from "@/data/site-data";
import { PageBanner } from "@/components/layout/page-banner";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Departments",
  description: "Academic departments at College of Engineering Poonjar.",
};

function excerpt(html: string, max = 160) {
  const text = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export default function DepartmentsListPage() {
  const list = [...departments].sort((a, b) => a.order - b.order);

  return (
    <div className="min-w-0">
      <PageBanner
        eyebrow="Academics"
        title="Departments"
        description="Explore department pages for programmes, vision, mission, and faculty."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Academics" },
          { label: "Departments" },
        ]}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {list.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/academics/departments/${d.slug}`}
                  className="group flex items-start gap-4 px-5 py-5 transition-colors hover:bg-brand-50/60 sm:px-6"
                >
                  {d.shortName ? (
                    <span
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold tracking-wide text-brand-800"
                      aria-hidden
                    >
                      {d.shortName}
                    </span>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-brand-900 group-hover:text-brand-700">
                      {d.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {excerpt(d.intro)}
                    </p>
                  </div>
                  <ChevronRight
                    className="mt-2 h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
