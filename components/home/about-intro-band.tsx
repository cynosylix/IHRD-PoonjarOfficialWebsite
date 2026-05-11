import Link from "next/link";
import { Merriweather } from "next/font/google";
import { ArrowRight } from "lucide-react";

const serif = Merriweather({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

/**
 * Institute intro band — layout inspired by classic college “about” strips:
 * branding + serif logotype on the left, narrative copy + CTA on the right.
 */
export function AboutIntroBand() {
  return (
    <section className="border-y border-slate-200/80 bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="grid min-w-0 grid-cols-1 items-start gap-8 sm:gap-10 md:grid-cols-[minmax(0,25%)_minmax(0,1fr)] md:gap-x-6 md:gap-y-0 lg:gap-x-12">
          {/* Left: logo mark + logotype */}
          <div className="flex min-w-0 flex-row items-start gap-4 sm:gap-5 md:flex-col md:gap-6">
            <div className="shrink-0" aria-hidden>
              <svg
                viewBox="0 0 128 128"
                className="h-20 w-20 shrink-0 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32"
                role="img"
                aria-label=""
              >
                <defs>
                  <pattern
                    id="cep-tri-pattern"
                    width="12"
                    height="12"
                    patternUnits="userSpaceOnUse"
                    patternTransform="scale(1) rotate(0)"
                  >
                    <polygon
                      points="6,0 12,12 0,12"
                      className="fill-brand-600"
                      opacity={0.92}
                    />
                  </pattern>
                </defs>
                <circle cx="64" cy="64" r="62" fill="url(#cep-tri-pattern)" />
                <circle
                  cx="64"
                  cy="64"
                  r="62"
                  fill="none"
                  stroke="rgb(30 58 138 / 0.15)"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className={`min-w-0 flex-1 ${serif.className}`}>
              <p className="text-xl font-bold leading-tight tracking-tight text-slate-900 sm:text-2xl md:text-3xl lg:text-4xl">
                College of Engineering
              </p>
              <p className="mt-1 text-lg font-bold text-slate-800 sm:mt-2 sm:text-xl md:text-2xl lg:text-3xl">
                Poonjar
              </p>
            </div>
          </div>

          {/* Right: copy + CTA */}
          <div className="min-w-0 space-y-4 text-sm leading-relaxed text-slate-800 sm:space-y-5 sm:text-[15px] md:text-base md:leading-relaxed">
            <p>
              Established in 2000 under the Institute of Human Resources Development
              (IHRD), Government of Kerala, College of Engineering Poonjar is a distinguished
              institution committed to excellence in technical education, innovation, and
              holistic student development. Situated amidst the serene hills and greenery
              of Poonjar, the college provides an ideal academic environment that inspires
              learning, creativity, and professional growth. Guided by the IHRD vision of
              {'\u201c'}
              Think Globally and Act Locally,
              {'\u201d'} the institution focuses on nurturing scientifically skilled, socially
              responsible, and industry-ready professionals through quality education,
              experienced faculty, modern infrastructure, and advanced learning facilities.
              With a strong emphasis on academic excellence, technological advancement,
              ethical values, and lifelong learning, College of Engineering Poonjar continues
              to empower students to meet global challenges and contribute meaningfully to
              the progress of society and the nation.
            </p>

            <div className="pt-1 sm:pt-2">
              <Link
                href="/admission"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-600 to-brand-700 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_-3px_rgb(37_99_235_/_0.55)] transition hover:from-brand-700 hover:to-brand-800 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:w-auto sm:px-8"
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
