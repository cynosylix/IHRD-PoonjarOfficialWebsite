import type { Metadata } from "next";
import { principalProfile } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Principal’s Desk",
  description: "Message from the Principal, College of Engineering Poonjar.",
};

export default function PrincipalPage() {
  const p = principalProfile;

  return (
    <div className="mx-auto max-w-4xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8">
      <h1 className="text-2xl font-bold leading-tight text-brand-950 sm:text-3xl md:text-4xl">
        Principal’s Desk
      </h1>
      <div className="mt-8 flex min-w-0 flex-col gap-8 sm:mt-10 md:flex-row md:items-start md:gap-10">
        <div className="mx-auto w-full max-w-[280px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm sm:max-w-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.photoUrl ?? "/images/placeholder-campus.svg"}
            alt={p.name}
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-brand-900 sm:text-lg">{p.name}</p>
          <p className="text-sm text-slate-600">{p.designation}</p>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            {p.email && (
              <p className="flex min-w-0 items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${p.email}`}
                  className="min-w-0 break-all text-brand-700 underline"
                >
                  {p.email}
                </a>
              </p>
            )}
            {p.phone && (
              <p className="flex min-w-0 items-center gap-2 break-words">
                <Phone className="h-4 w-4 shrink-0" />
                {p.phone}
              </p>
            )}
          </div>
          <div className="cms-content mt-6 min-w-0">
            <HtmlBlock html={p.message} />
          </div>
        </div>
      </div>
    </div>
  );
}
