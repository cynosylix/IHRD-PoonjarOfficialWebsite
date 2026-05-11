import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "@/components/search/search-client";

export const metadata: Metadata = {
  title: "Search",
  description: "Search pages and static content.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="px-4 py-16 text-center text-slate-600">Loading…</p>}>
      <SearchClient />
    </Suspense>
  );
}
