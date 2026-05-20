"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ProgramType } from "@/data/site-data";
import { cn } from "@/lib/utils";

export type ProgramTierPayload = {
  type: ProgramType;
  title: string;
  blurb: string;
  programs: {
    slug: string;
    name: string;
    duration?: string;
    intake?: string;
    affiliation?: string;
  }[];
};

function usePrefersFineHover() {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setMatches(mq.matches);
    const fn = () => setMatches(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  return matches;
}

export function ProgramTierCards({ tiers }: { tiers: ProgramTierPayload[] }) {
  const prefersFineHover = usePrefersFineHover();
  const [tappedOpen, setTappedOpen] = useState<ProgramType | null>(null);

  useEffect(() => {
    if (prefersFineHover) setTappedOpen(null);
  }, [prefersFineHover]);

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-4">
      {tiers.map((tier) => {
        const tapExpanded = !prefersFineHover && tappedOpen === tier.type;
        const count = tier.programs.length;

        const toggleTap = () => {
          if (prefersFineHover) return;
          setTappedOpen((cur) => (cur === tier.type ? null : tier.type));
        };

        return (
          <article
            key={tier.type}
            id={tier.type.toLowerCase()}
            className={cn(
              "group/tier relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-brand-200/80 bg-white shadow-card transition-all duration-500 ease-out",
              "hover:border-brand-300 lg:min-h-[320px] lg:flex-[1] lg:basis-0 lg:hover:z-20 lg:hover:flex-[2.15] lg:hover:shadow-xl",
            )}
          >
            <div className="h-1 shrink-0 bg-gradient-to-r from-brand-600 to-brand-700" aria-hidden />

            <div className="relative flex min-h-0 flex-1 flex-col">
              <div
                className={cn(
                  !prefersFineHover &&
                    "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                )}
                role={!prefersFineHover ? "button" : undefined}
                tabIndex={!prefersFineHover ? 0 : undefined}
                aria-expanded={!prefersFineHover ? tapExpanded : undefined}
                onClick={toggleTap}
                onKeyDown={(e) => {
                  if (prefersFineHover) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleTap();
                  }
                }}
              >
                <div className="border-b border-slate-100 p-5 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
                    {tier.type === "DIPLOMA" ? "Diploma" : tier.type}
                  </p>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-lg font-bold tracking-tight text-brand-950 sm:text-xl">
                      {tier.title}
                    </h2>
                    <span className="text-xs font-medium text-slate-500">
                      {count} programme{count === 1 ? "" : "s"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{tier.blurb}</p>
                  <p
                    className={cn(
                      "mt-4 text-xs font-medium text-brand-600/80 transition-opacity duration-300",
                      prefersFineHover && "opacity-100 group-hover/tier:opacity-0",
                      !prefersFineHover && (tapExpanded ? "opacity-0" : "opacity-100"),
                    )}
                  >
                    {prefersFineHover
                      ? "Hover to view programmes · Click a programme for full details"
                      : `Tap to ${tapExpanded ? "hide" : "view"} programmes · Select one for details`}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6" onClick={(e) => e.stopPropagation()}>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    prefersFineHover && "grid-rows-[0fr] group-hover/tier:grid-rows-[1fr]",
                    !prefersFineHover && (tapExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"),
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <ul className="max-h-[min(52vh,26rem)] space-y-0 overflow-y-auto overscroll-y-contain pb-4 pt-1 [scrollbar-width:thin]">
                      {tier.programs.map((p, index) => (
                        <li
                          key={p.slug}
                          className={cn(index > 0 && "border-t border-slate-100")}
                        >
                          <Link
                            href={`/academics/programs/${p.slug}`}
                            className="group/link block rounded-lg py-3.5 outline-none transition hover:bg-brand-50/80 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                          >
                            <p className="font-semibold leading-snug text-brand-950 group-hover/link:text-brand-700">
                              {p.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-600">
                              {[p.duration, p.intake].filter(Boolean).join(" · ") || "—"}
                            </p>
                            {p.affiliation ? (
                              <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                                {p.affiliation}
                              </p>
                            ) : null}
                            <p className="mt-2 text-xs font-medium text-brand-600 opacity-0 transition-opacity group-hover/link:opacity-100">
                              View programme details →
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
