import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, Megaphone } from "lucide-react";
import type { Announcement } from "@/data/site-data";
import { format } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Renders `**bold**` segments as <strong> (trusted static copy from site data). */
function RichInline({ text }: { text: string }) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {segments.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export function AnnouncementsSpotlight({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const [featured, ...rest] = announcements;

  return (
    <section
      className="border-t border-slate-200 bg-slate-50/80 py-12 sm:py-14 md:py-16"
      aria-labelledby="announcements-heading"
    >
      <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pb-10">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
              Notices
            </p>
            <h2
              id="announcements-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-brand-950 sm:text-3xl"
            >
              Latest announcements
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              Official updates for students, parents, and visitors.
            </p>
          </div>
          {announcements.length > 0 && (
            <Link
              href="/notices"
              className="inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-brand-700 transition hover:text-brand-900 sm:self-auto"
            >
              View all notices
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>

        {announcements.length === 0 ? (
          <p className="mt-10 text-slate-600">No announcements yet.</p>
        ) : (
          <div
            className={cn(
              "mt-8 grid gap-6 lg:mt-10 lg:gap-8",
              rest.length > 0
                ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start"
                : "",
            )}
          >
            {featured && (
              <article
                className={cn(
                  "overflow-hidden rounded-lg border border-brand-900/80 bg-brand-950 text-white shadow-card",
                  rest.length === 0 ? "max-w-3xl" : "",
                )}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex gap-5 sm:gap-6">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 sm:h-14 sm:w-14"
                      aria-hidden
                    >
                      <Megaphone
                        className="h-6 w-6 text-white sm:h-7 sm:w-7"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      {featured.publishedAt && (
                        <time
                          className="block text-xs font-medium tabular-nums text-brand-200 sm:text-sm"
                          dateTime={featured.publishedAt}
                        >
                          {format.dateLong(featured.publishedAt)}
                        </time>
                      )}
                      <div
                        className={cn(
                          "space-y-4 text-sm leading-relaxed text-white/95 sm:text-[15px] sm:leading-relaxed md:text-base",
                          featured.publishedAt ? "mt-2" : "",
                        )}
                      >
                        {featured.spotlight ? (
                          <>
                            <p>
                              <RichInline text={featured.spotlight.body} />
                            </p>
                            <ul className="list-none space-y-2 border-t border-white/10 pt-4 text-sm sm:text-[15px]">
                              {featured.spotlight.programLines.map((line, idx) => (
                                <li key={idx} className="leading-snug">
                                  <RichInline text={line} />
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <>
                            <p className="text-base font-semibold text-white sm:text-lg">
                              {featured.title}
                            </p>
                            {featured.excerpt && (
                              <p className="text-white/85">{featured.excerpt}</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {rest.length > 0 && (
              <ul className="flex min-w-0 list-none flex-col gap-3">
                {rest.map((a) => (
                  <li key={a.id}>
                    <article className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-slate-300 sm:p-4">
                      <Megaphone
                        className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        {a.publishedAt && (
                          <time
                            className="block text-xs font-medium tabular-nums text-slate-500 sm:text-[13px]"
                            dateTime={a.publishedAt}
                          >
                            {format.dateLong(a.publishedAt)}
                          </time>
                        )}
                        <h3 className="mt-1 text-sm font-semibold leading-snug text-slate-900 sm:text-[15px]">
                          {a.title}
                        </h3>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
