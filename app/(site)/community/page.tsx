import type { Metadata } from "next";
import Link from "next/link";
import { communitySections } from "@/data/site-data";
import { COMMUNITY_KINDS } from "@/lib/constants";
import { PageBanner } from "@/components/layout/page-banner";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Community",
  description: "Alumni, PTA, Senate, IEEE, IEDC, and NSS at CEPoonjar.",
};

export default function CommunityHubPage() {
  const sectionByKind = Object.fromEntries(communitySections.map((s) => [s.kind, s]));

  return (
    <div className="min-w-0">
      <PageBanner
        title="Community"
        description="Campus associations and student bodies — select a group to view details, members, and events."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Community" }]}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {COMMUNITY_KINDS.map((c) => {
              const section = sectionByKind[c.kind];
              return (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="group flex items-start gap-4 px-5 py-5 transition-colors hover:bg-brand-50/60 sm:px-6"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-brand-900 group-hover:text-brand-700">
                        {c.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {section?.description ?? "Events, members, and highlights."}
                      </p>
                    </div>
                    <ChevronRight
                      className="mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600"
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
