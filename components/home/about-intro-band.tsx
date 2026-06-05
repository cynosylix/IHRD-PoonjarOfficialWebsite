import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aboutInstitution } from "@/data/site-data";

/**
 * Institute intro band — logo on the left, narrative copy + CTA on the right.
 */
export function AboutIntroBand() {
  return (
    <section className="border-y border-slate-200/80 bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="grid min-w-0 grid-cols-1 items-start gap-8 sm:gap-10 md:grid-cols-[minmax(0,25%)_minmax(0,1fr)] md:gap-x-6 md:gap-y-0 lg:gap-x-12">
          <div className="flex min-w-0 justify-center md:justify-start">
            <Image
              src="/images/logo.webp"
              alt="College of Engineering Poonjar"
              width={1000}
              height={413}
              className="h-auto w-full max-w-[220px] object-contain object-left sm:max-w-[260px] md:max-w-none md:w-full"
              sizes="(min-width: 768px) 25vw, 260px"
            />
          </div>

          <div className="min-w-0 space-y-4 text-sm leading-relaxed text-slate-800 sm:space-y-5 sm:text-[15px] md:text-base md:leading-relaxed">
            <p>{aboutInstitution.homeIntro}</p>

            <div className="flex flex-wrap gap-3 pt-1 sm:pt-2">
              <Link
                href="/about/institution"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
              >
                Read more about us
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href="/admission"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-600 to-brand-700 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_-3px_rgb(0_0_128_/_0.55)] transition hover:from-brand-700 hover:to-brand-800 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:w-auto sm:px-8"
              >
                Apply Online
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
