"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { searchPublic } from "@/lib/search-public";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SearchClient() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const hits = useMemo(() => searchPublic(q), [q]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Search</h1>
      <form action="/search" method="get" className="mt-6 flex gap-2">
        <Input
          name="q"
          defaultValue={q}
          placeholder="Type at least 2 characters…"
          className="flex-1"
          aria-label="Search query"
        />
        <Button type="submit">Search</Button>
      </form>

      <div className="mt-10 space-y-4">
        {q.trim().length < 2 ? (
          <p className="text-sm text-slate-600">Enter a search query to see results.</p>
        ) : hits.length === 0 ? (
          <p className="text-sm text-slate-600">No matches found.</p>
        ) : (
          hits.map((h, i) => (
            <Link
              key={`${h.href}-${h.title}-${i}`}
              href={h.href}
              className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-200"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-brand-900">{h.title}</p>
                <Badge>{h.type}</Badge>
              </div>
              {h.snippet && (
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{h.snippet}</p>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
