import type { Metadata } from "next";
import { Megaphone } from "lucide-react";
import { publishedAnnouncements } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { PageBanner } from "@/components/layout/page-banner";
import { format } from "@/lib/format";

export const metadata: Metadata = {
  title: "Notices",
  description:
    "Official announcements and notices for College of Engineering Poonjar.",
};

export default function NoticesPage() {
  const list = publishedAnnouncements();

  return (
    <div className="min-w-0">
      <PageBanner
        eyebrow="Notices"
        title="Notices & announcements"
        description="Official updates for students, parents, and visitors."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Notices" }]}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-3xl min-w-0 px-4 sm:px-6 lg:px-8">
          <ul className="space-y-3">
            {list.length === 0 ? (
              <li className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
                No announcements yet.
              </li>
            ) : (
              list.map((a) => (
                <li
                  key={a.id}
                  id={a.id}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-4"
                >
                  <div className="flex gap-4">
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
                      <p className="mt-1 text-sm font-semibold leading-snug text-slate-900 sm:text-[15px]">
                        {a.title}
                      </p>
                      {a.excerpt && (
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {a.excerpt}
                        </p>
                      )}
                      {a.content && (
                        <div className="cms-content mt-3 border-t border-slate-100 pt-3 text-sm">
                          <HtmlBlock html={a.content} />
                        </div>
                      )}
                      {a.spotlight && (
                        <div className="mt-3 rounded-lg border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-slate-700">
                          <p className="font-medium text-brand-900">Programmes covered</p>
                          <ul className="mt-2 list-disc space-y-1 pl-5">
                            {a.spotlight.programLines.map((line, idx) => (
                              <li key={idx}>{line.replace(/\*\*/g, "")}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
