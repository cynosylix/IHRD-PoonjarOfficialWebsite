import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, ChevronRight, Megaphone } from "lucide-react";
import type { Announcement } from "@/data/site-data";
import { format } from "@/lib/format";
import { cn } from "@/lib/utils";

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
      className="relative overflow-hidden border-b border-slate-200/60 py-16 sm:py-20 lg:py-24"
      aria-labelledby="announcements-heading"
      style={{
        background: "linear-gradient(180deg, #F8FAFF 0%, #EEF4FF 100%)",
      }}
    >
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="announcement-blob-drift absolute -left-20 top-[10%] h-72 w-72 rounded-full bg-[#3B82F6]/[0.07] blur-3xl" />
        <div className="announcement-blob-drift-delayed absolute -right-16 top-[40%] h-64 w-64 rounded-full bg-[#1E3A8A]/[0.06] blur-3xl" />
        <div className="announcement-blob-drift absolute bottom-[5%] left-[35%] h-56 w-56 rounded-full bg-[#60A5FA]/[0.05] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
              Official notices
            </p>
            <h2
              id="announcements-heading"
              className="mt-2 font-display text-[clamp(1.5rem,2.5vw+0.5rem,2.25rem)] font-bold tracking-tight text-[#0F172A]"
            >
              Latest announcements
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#64748B] sm:text-base">
              Timely information for students, parents, and visitors — admissions,
              schedules, and campus updates.
            </p>
          </div>
          {count > 0 && (
            <Link
              href="/notices"
              className="inline-flex shrink-0 items-center gap-2 self-start border border-[#1E3A8A]/20 bg-white/80 px-4 py-2.5 text-sm font-semibold text-[#0B1F5B] shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#1E3A8A] hover:bg-white hover:shadow-md sm:self-auto"
            >
              View all notices
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>

        {count === 0 ? (
          <div className="mt-12 border border-dashed border-slate-300/80 bg-white/70 px-6 py-12 text-center backdrop-blur-sm">
            <Megaphone
              className="mx-auto h-10 w-10 text-slate-300"
              strokeWidth={1.25}
              aria-hidden
            />
            <p className="mt-4 text-sm font-medium text-[#1E293B]">No announcements yet</p>
            <p className="mt-1 text-xs text-[#64748B]">
              New notices will appear here when published.
            </p>
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-10 sm:mt-12 sm:gap-12">
            {featured && (
              <div className="announcement-featured-float mx-auto w-full max-w-[1000px]">
                <Link href={`/notices#${featured.id}`} className="group block">
                  <article
                    className={cn(
                      "relative overflow-hidden rounded-none border border-slate-200/90 border-l-[5px] border-l-[#1E3A8A] bg-white p-6 shadow-[0_8px_30px_-10px_rgba(11,31,91,0.14)] transition-all duration-300 ease-out sm:p-7",
                      "group-hover:border-[#1E3A8A]/40 group-hover:border-l-[#2563EB] group-hover:bg-white group-hover:shadow-[0_16px_40px_-12px_rgba(11,31,91,0.2)]",
                    )}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#D4A017] via-[#E8B923] to-[#D4A017]/30 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />

                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex bg-[#0B1F5B] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white sm:text-[11px]">
                        Latest Update
                      </span>
                      <span className="inline-flex border border-[#D4A017]/60 bg-[#FFFBEB] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#92400E]">
                        New
                      </span>
                    </div>

                    {featured.publishedAt && (
                      <time
                        dateTime={featured.publishedAt}
                        className="mt-4 inline-block border border-slate-200 bg-[#F8FAFF] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#1E3A8A]"
                      >
                        {format.dateLong(featured.publishedAt)}
                      </time>
                    )}

                    <h3 className="mt-3 font-display text-xl font-bold leading-snug text-[#0F172A] transition-colors duration-300 group-hover:text-[#1E3A8A] sm:text-[1.35rem]">
                      {featured.title}
                    </h3>

                    {(featured.spotlight?.body || featured.excerpt) && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#64748B] sm:text-[15px] sm:leading-relaxed">
                        {featured.spotlight ? (
                          <RichInline text={featured.spotlight.body} />
                        ) : (
                          featured.excerpt
                        )}
                      </p>
                    )}
                  </article>
                </Link>
              </div>
            )}

            {rest.length > 0 && (
              <div className="mx-auto w-full max-w-[1000px]">
                <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  More updates
                </p>
                <ul className="list-none divide-y divide-slate-200/80 p-0">
                  {rest.map((a) => (
                    <li key={a.id}>
                      <Link
                        href={`/notices#${a.id}`}
                        className="group flex flex-col gap-2 py-6 transition-colors duration-300 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
                      >
                        <div className="min-w-0 flex-1">
                          {a.publishedAt && (
                            <time
                              className="text-[11px] font-semibold uppercase tracking-wider text-[#1E3A8A]/70"
                              dateTime={a.publishedAt}
                            >
                              {format.dateLong(a.publishedAt)}
                            </time>
                          )}
                          <h3 className="mt-2 text-base font-semibold leading-snug text-[#0F172A] transition-colors duration-300 group-hover:text-[#1E3A8A]">
                            {a.title}
                          </h3>
                          {a.excerpt ? (
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#64748B]">
                              {a.excerpt}
                            </p>
                          ) : null}
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#0B1F5B] transition-colors group-hover:text-[#1E3A8A]">
                          Read notice
                          <ChevronRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </span>
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
