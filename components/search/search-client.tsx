"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { SearchHit } from "@/lib/search-public";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SearchClient() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [hits, setHits] = useState<SearchHit[]>([]);

  useEffect(() => {
    let cancelled = false;
    import("@/lib/search-public").then((mod) => {
      if (!cancelled) setHits(mod.searchPublic(q));
    });
    return () => {
      cancelled = true;
    };
  }, [q]);

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

      {q.length >= 2 && (
        <div className="mt-8 space-y-4">
          {hits.length === 0 ? (
            <p className="text-slate-600">No results for &ldquo;{q}&rdquo;.</p>
          ) : (
            hits.map((hit) => (
              <Link
                key={`${hit.href}-${hit.title}`}
                href={hit.href}
                className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-300"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-brand-950">{hit.title}</span>
                  <Badge>{hit.type}</Badge>
                </div>
                {hit.snippet && (
                  <p className="mt-1 text-sm text-slate-600">{hit.snippet}</p>
                )}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
