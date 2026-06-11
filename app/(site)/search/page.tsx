import type { Metadata } from "next";
import { Suspense } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { SearchClient } from "@/components/search/search-client";

export const metadata: Metadata = {
  title: "Search",
  description: "Search pages and static content.",
};

export default function SearchPage() {
  return (
    <PageShell
      title="Search"
      description="Find pages, departments, programmes, facilities, and announcements."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      maxWidth="max-w-3xl"
    >
      <Suspense fallback={<p className="text-center text-slate-600">Loading…</p>}>
        <SearchClient />
      </Suspense>
    </PageShell>
  );
}
