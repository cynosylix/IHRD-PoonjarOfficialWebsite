"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, Megaphone, Search } from "lucide-react";
import type { Announcement, NoticeCategory } from "@/data/site-data";
import { NOTICE_CATEGORIES } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { FadeInView } from "@/components/motion/fade-in-view";
import { format } from "@/lib/format";
import { cn } from "@/lib/utils";

type FilterCategory = "All" | NoticeCategory;

const FILTER_OPTIONS: FilterCategory[] = ["All", ...NOTICE_CATEGORIES];

const CATEGORY_STYLES: Record<NoticeCategory, string> = {
  Admissions: "bg-[#0B1F5B] text-white",
  Examinations: "bg-[#7C2D12] text-white",
  Events: "bg-[#1E40AF] text-white",
  Circulars: "bg-[#475569] text-white",
  Placements: "bg-[#92400E] text-white",
};

function stripMarkup(text: string) {
  return text.replace(/\*\*/g, "").replace(/<[^>]+>/g, " ");
}

function noticeDescription(notice: Announcement) {
  if (notice.excerpt) return notice.excerpt;
  if (notice.spotlight?.body) return stripMarkup(notice.spotlight.body);
  return stripMarkup(notice.content);
}

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

function CategoryBadge({ category }: { category: NoticeCategory }) {
  return (
    <span
      className={cn(
        "inline-flex px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider sm:text-[11px]",
        CATEGORY_STYLES[category],
      )}
    >
      {category}
    </span>
  );
}

function NoticeCard({
  notice,
  featured = false,
  onReadMore,
}: {
  notice: Announcement;
  featured?: boolean;
  onReadMore: (id: string) => void;
}) {
  const description = noticeDescription(notice);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onReadMore(notice.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onReadMore(notice.id);
        }
      }}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-none border border-slate-200/90 border-l-[4px] border-l-[#1E3A8A] bg-white transition-all duration-300 ease-out",
        featured
          ? "border-l-[5px] p-7 shadow-[0_10px_36px_-12px_rgba(11,31,91,0.16)] sm:p-8"
          : "p-5 shadow-[0_4px_20px_-8px_rgba(11,31,91,0.12)] sm:p-6",
        "hover:-translate-y-2 hover:border-[#1E3A8A]/35 hover:border-l-[#2563EB] hover:shadow-[0_16px_40px_-10px_rgba(11,31,91,0.2)]",
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#D4A017] via-[#E8B923] to-[#D4A017]/30"
        aria-hidden
      />

      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge category={notice.category} />
        {featured && (
          <span className="inline-flex border border-[#D4A017]/60 bg-[#FFFBEB] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#92400E]">
            New
          </span>
        )}
      </div>

      {notice.publishedAt && (
        <time
          dateTime={notice.publishedAt}
          className="mt-3 inline-block border border-slate-200 bg-[#F8FAFF] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#1E3A8A]"
        >
          {format.dateLong(notice.publishedAt)}
        </time>
      )}

      <h2
        className={cn(
          "mt-3 font-display font-bold leading-snug text-[#0F172A] transition-colors duration-300 group-hover:text-[#1E3A8A]",
          featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
        )}
      >
        {notice.title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-2.5 leading-relaxed text-[#64748B]",
            featured ? "line-clamp-3 text-sm sm:text-[15px]" : "line-clamp-2 text-sm",
          )}
        >
          {description}
        </p>
      )}

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1F5B] transition-colors group-hover:text-[#1E3A8A]">
        Read more
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        />
      </span>
    </article>
  );
}

export function NoticesPortal({ notices }: { notices: Announcement[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FilterCategory>("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return notices.filter((notice) => {
      const matchesCategory = category === "All" || notice.category === category;
      if (!matchesCategory) return false;
      if (!query) return true;
      const haystack = [
        notice.title,
        notice.excerpt,
        notice.spotlight?.body,
        stripMarkup(notice.content),
        notice.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [notices, search, category]);

  const showFeatured = !search.trim() && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const gridNotices = showFeatured ? filtered.slice(1) : filtered;

  const activeNotice = useMemo(
    () => notices.find((n) => n.id === activeId) ?? null,
    [notices, activeId],
  );

  const openNotice = useCallback((id: string) => {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (id && notices.some((n) => n.id === id)) {
        setActiveId(id);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [notices]);

  useEffect(() => {
    if (activeId) {
      requestAnimationFrame(() => {
        document.getElementById(activeId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [activeId]);

  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
      style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #EEF4FF 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="announcement-blob-drift absolute -left-20 top-[8%] h-72 w-72 rounded-full bg-[#3B82F6]/[0.06] blur-3xl" />
        <div className="announcement-blob-drift-delayed absolute -right-16 top-[35%] h-64 w-64 rounded-full bg-[#1E3A8A]/[0.05] blur-3xl" />
        <div className="announcement-blob-drift absolute bottom-[10%] left-[30%] h-56 w-56 rounded-full bg-[#60A5FA]/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
        <FadeInView className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
            Official notice board
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#64748B] sm:text-base">
            Browse, search, and filter campus announcements. Select a notice to read the full details.
          </p>
        </FadeInView>

        <FadeInView delay={0.05}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search notices..."
                aria-label="Search notices"
                className="w-full rounded-none border border-slate-200/90 bg-white py-3 pl-10 pr-4 text-sm text-[#0F172A] shadow-sm outline-none transition-all duration-300 placeholder:text-[#94A3B8] focus:border-[#1E3A8A]/50 focus:shadow-md"
              />
            </div>
            <p className="text-sm text-[#64748B]">
              <span className="font-semibold text-[#0F172A]">{filtered.length}</span>{" "}
              notice{filtered.length === 1 ? "" : "s"} found
            </p>
          </div>

          <div
            className="mt-5 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter notices by category"
          >
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={category === option}
                onClick={() => setCategory(option)}
                className={cn(
                  "rounded-none border px-3.5 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-300 sm:text-[13px]",
                  category === option
                    ? "border-[#0B1F5B] bg-[#0B1F5B] text-white shadow-sm"
                    : "border-slate-200/90 bg-white text-[#475569] hover:border-[#1E3A8A]/30 hover:text-[#0B1F5B]",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </FadeInView>

        {filtered.length === 0 ? (
          <FadeInView className="mt-12">
            <div className="border border-dashed border-slate-300/80 bg-white/80 px-6 py-14 text-center">
              <Megaphone
                className="mx-auto h-10 w-10 text-slate-300"
                strokeWidth={1.25}
                aria-hidden
              />
              <p className="mt-4 text-sm font-medium text-[#1E293B]">No notices found</p>
              <p className="mt-1 text-xs text-[#64748B]">
                Try adjusting your search or filter selection.
              </p>
            </div>
          </FadeInView>
        ) : (
          <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
            {showFeatured && featured && (
              <FadeInView>
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  {category === "All" ? "Latest notice" : `Latest ${category.toLowerCase()} notice`}
                </p>
                <div className="announcement-featured-float mx-auto max-w-4xl">
                  <NoticeCard notice={featured} featured onReadMore={openNotice} />
                </div>
              </FadeInView>
            )}

            {gridNotices.length > 0 && (
              <div>
                {showFeatured && (
                  <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                    All notices
                  </p>
                )}
                <StaggerContainer className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
                  {gridNotices.map((notice) => (
                    <StaggerItem key={notice.id}>
                      <NoticeCard notice={notice} onReadMore={openNotice} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}

            {activeNotice && filtered.some((n) => n.id === activeNotice.id) && (
              <FadeInView>
                <article
                  id={activeNotice.id}
                  className="scroll-mt-28 rounded-none border border-slate-200/90 border-l-[5px] border-l-[#1E3A8A] bg-white p-6 shadow-[0_8px_32px_-12px_rgba(11,31,91,0.14)] sm:p-8 lg:p-10"
                >
                  <div
                    className="mb-6 h-[2px] bg-gradient-to-r from-[#D4A017] via-[#E8B923] to-[#D4A017]/30"
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <CategoryBadge category={activeNotice.category} />
                    {activeNotice.id === notices[0]?.id && (
                      <span className="inline-flex border border-[#D4A017]/60 bg-[#FFFBEB] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#92400E]">
                        New
                      </span>
                    )}
                  </div>
                  {activeNotice.publishedAt && (
                    <time
                      dateTime={activeNotice.publishedAt}
                      className="mt-4 inline-block border border-slate-200 bg-[#F8FAFF] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#1E3A8A]"
                    >
                      {format.dateLong(activeNotice.publishedAt)}
                    </time>
                  )}
                  <h2 className="mt-4 font-display text-2xl font-bold text-[#0F172A] sm:text-[1.65rem]">
                    {activeNotice.title}
                  </h2>

                  {activeNotice.spotlight ? (
                    <div className="mt-6 space-y-6">
                      <p className="text-base leading-relaxed text-[#475569]">
                        <RichInline text={activeNotice.spotlight.body} />
                      </p>
                      <div className="border-t border-slate-200/70 pt-6">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
                          Programmes covered
                        </p>
                        <ul className="space-y-2">
                          {activeNotice.spotlight.programLines.map((line, idx) => (
                            <li
                              key={idx}
                              className="flex gap-2 text-sm leading-relaxed text-[#475569] sm:text-[15px]"
                            >
                              <span className="text-[#1E3A8A]">›</span>
                              <RichInline text={line} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="cms-content mt-6 text-base leading-relaxed text-[#475569]">
                      <HtmlBlock html={activeNotice.content} />
                    </div>
                  )}
                </article>
              </FadeInView>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
