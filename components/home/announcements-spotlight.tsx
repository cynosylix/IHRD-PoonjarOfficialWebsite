import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, ChevronRight, Megaphone, Newspaper } from "lucide-react";
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
  const count = announcements.length;

  return (
    <section
      className="relative overflow-hidden border-t border-slate-200/90 bg-gradient-to-b from-slate-50 via-white to-brand-50/35 py-14 sm:py-16 md:py-20"
      aria-labelledby="announcements-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-300/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="flex min-w-0 gap-4 sm:gap-5">
            <div
              className="hidden h-[4.5rem] w-1 shrink-0 rounded-full bg-gradient-to-b from-brand-600 to-brand-800 sm:block sm:h-[5.25rem]"
              aria-hidden
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200/90 bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-sm sm:text-[11px]">
                  <Newspaper className="h-3 w-3 text-brand-600" aria-hidden />
                  Official notices
                </span>
                {count > 0 && (
                  <span className="text-xs font-medium tabular-nums text-slate-500">
                    {count} update{count === 1 ? "" : "s"}
                  </span>
                )}
              </div>
              <h2
                id="announcements-heading"
                className="mt-3 text-2xl font-bold tracking-tight text-brand-950 sm:text-3xl md:text-[2rem] md:leading-tight"
              >
                Latest announcements
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                Timely information for students, parents, and visitors — admissions,
                schedules, and campus updates.
              </p>
            </div>
          </div>
          {count > 0 && (
            <Link
              href="/notices"
              className="group inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-800 shadow-sm transition hover:border-brand-300 hover:bg-brand-50 hover:shadow-md sm:self-auto"
            >
              View all notices
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          )}
        </div>

        {count === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center shadow-sm">
            <Megaphone
              className="mx-auto h-10 w-10 text-slate-300"
              strokeWidth={1.25}
              aria-hidden
            />
            <p className="mt-4 text-sm font-medium text-slate-700">No announcements yet</p>
            <p className="mt-1 text-xs text-slate-500">
              New notices will appear here when published.
            </p>
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-5 lg:mt-12 lg:gap-6">
            {featured && (
              <article
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-brand-800/50 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white shadow-card ring-1 ring-white/10",
                  rest.length === 0 && "mx-auto max-w-3xl",
                )}
              >
                <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/4 h-32 w-64 rounded-full bg-brand-400/10 blur-2xl" />

                <div className="relative p-6 sm:p-8 md:p-9">
                  <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-sm sm:h-14 sm:w-14"
                      aria-hidden
                    >
                      <Megaphone
                        className="h-6 w-6 text-brand-100 sm:h-7 sm:w-7"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      {featured.publishedAt && (
                        <time
                          className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tabular-nums text-brand-100 backdrop-blur-sm sm:text-[13px]"
                          dateTime={featured.publishedAt}
                        >
                          {format.dateLong(featured.publishedAt)}
                        </time>
                      )}
                      <div
                        className={cn(
                          "space-y-5 text-sm leading-relaxed text-white/95 sm:text-[15px] sm:leading-relaxed md:text-base",
                          featured.publishedAt ? "mt-4" : "",
                        )}
                      >
                        {featured.spotlight ? (
                          <>
                            <p className="text-[15px] font-medium leading-relaxed text-white sm:text-base">
                              <RichInline text={featured.spotlight.body} />
                            </p>
                            <div className="border-t border-white/15 pt-5">
                              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-200/90">
                                Programmes covered
                              </p>
                              <ul className="grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
                                {featured.spotlight.programLines.map((line, idx) => (
                                  <li
                                    key={idx}
                                    className="rounded-xl border border-white/15 bg-white/10 p-3.5 text-sm leading-snug shadow-sm backdrop-blur-sm sm:p-4"
                                  >
                                    <div className="flex gap-2.5">
                                      <ChevronRight
                                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-300"
                                        aria-hidden
                                      />
                                      <span>
                                        <RichInline text={line} />
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-lg font-semibold text-white sm:text-xl">
                              {featured.title}
                            </p>
                            {featured.excerpt && (
                              <p className="text-white/88">{featured.excerpt}</p>
                            )}
                          </>
                        )}
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          href={`/notices#${featured.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-900 shadow-md transition hover:bg-brand-50"
                        >
                          Full notice
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                        <Link
                          href="/admission"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                          Admissions
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {rest.length > 0 && (
              <div>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  More updates
                </p>
                <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((a) => (
                    <li key={a.id} className="min-w-0">
                      <Link
                        href={`/notices#${a.id}`}
                        className="group flex h-full min-h-[10.5rem] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-card transition hover:border-brand-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:min-h-[11rem] sm:p-6"
                      >
                        <div
                          className="h-1 w-12 shrink-0 rounded-full bg-gradient-to-r from-brand-600 to-brand-700"
                          aria-hidden
                        />
                        <div className="mt-4 flex min-w-0 flex-1 flex-col">
                          {a.publishedAt && (
                            <time
                              className="inline-flex w-fit items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600 sm:text-[11px]"
                              dateTime={a.publishedAt}
                            >
                              {format.dateLong(a.publishedAt)}
                            </time>
                          )}
                          <h3 className="mt-3 text-sm font-bold leading-snug text-brand-950 transition group-hover:text-brand-700 sm:text-[15px]">
                            {a.title}
                          </h3>
                          {a.excerpt ? (
                            <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                              {a.excerpt}
                            </p>
                          ) : (
                            <div className="flex-1" />
                          )}
                          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                            Read notice
                            <ChevronRight
                              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                              aria-hidden
                            />
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
