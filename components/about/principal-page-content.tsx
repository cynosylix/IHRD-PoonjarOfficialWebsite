"use client";

import { HtmlBlock } from "@/components/content/html-block";
import { FadeInView } from "@/components/motion/fade-in-view";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { StaticImage } from "@/components/ui/static-image";
import {
  principalAchievements,
  principalProfile,
  principalVisionPillars,
} from "@/data/site-data";
import { gmailComposeUrl } from "@/lib/email-links";
import { cn } from "@/lib/utils";

export function PrincipalPageContent() {
  const p = principalProfile;

  return (
    <>
      <section
        className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
        style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%)" }}
      >
        <div className="relative mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(260px,320px)_1fr] lg:gap-12 xl:gap-16">
            <FadeInView direction="left" className="lg:pt-2">
              <div className="mx-auto max-w-[320px] lg:mx-0">
                <div className="group overflow-hidden rounded-xl border-2 border-[#D4A017]/70 bg-white p-1.5 shadow-[0_12px_40px_-12px_rgba(11,31,91,0.2)] transition-shadow duration-300 hover:shadow-[0_18px_48px_-10px_rgba(11,31,91,0.24)]">
                  <div className="overflow-hidden rounded-[10px]">
                    <StaticImage
                      src={p.photoUrl ?? "/images/pages/principal.jpg"}
                      alt={`${p.name} portrait`}
                      className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      priority
                      sizes="(min-width: 1024px) 320px, 280px"
                    />
                  </div>
                </div>

                <div className="mt-6 text-center lg:text-left">
                  <h2 className="font-display text-2xl font-bold text-[#0F172A]">{p.name}</h2>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#1E3A8A]">
                    {p.designation}
                  </p>
                  <dl className="mt-5 space-y-3 border-t border-slate-200/80 pt-5 text-sm">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                        Qualification
                      </dt>
                      <dd className="mt-1 font-medium text-[#0F172A]">{p.qualification}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                        Experience
                      </dt>
                      <dd className="mt-1 font-medium text-[#0F172A]">
                        {p.yearsOfExperience} Years in Academic Leadership
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={0.08}>
              <article className="rounded-none border border-slate-200/90 bg-white p-6 shadow-[0_8px_32px_-12px_rgba(11,31,91,0.12)] sm:p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
                  Message from the Principal
                </p>
                <h2 className="mt-2 font-display text-[clamp(1.35rem,2vw+0.5rem,1.85rem)] font-bold text-[#0F172A]">
                  A Commitment to Excellence and Holistic Growth
                </h2>
                <div className="about-content cms-content mt-6 text-[15px] leading-[1.85] text-[#475569] sm:text-base">
                  <HtmlBlock html={p.message} />
                </div>
              </article>
            </FadeInView>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <blockquote className="relative text-center">
              <div
                className="mx-auto mb-6 h-1 w-16 bg-gradient-to-r from-transparent via-[#1E3A8A] to-transparent"
                aria-hidden
              />
              <p
                className="font-display text-2xl leading-snug text-[#94A3B8]/40 sm:text-3xl"
                aria-hidden
              >
                &ldquo;
              </p>
              <p className="mx-auto max-w-3xl font-display text-lg font-medium italic leading-relaxed text-[#0F172A] sm:text-xl sm:leading-relaxed">
                {p.quote}
              </p>
              <footer className="mt-6 text-sm font-semibold text-[#1E3A8A]">
                — {p.name}, {p.designation}
              </footer>
            </blockquote>
          </FadeInView>
        </div>
      </section>

      <section
        className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
        style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #EEF4FF 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="announcement-blob-drift absolute -left-16 top-[10%] h-64 w-64 rounded-full bg-[#3B82F6]/[0.05] blur-3xl" />
          <div className="announcement-blob-drift-delayed absolute -right-12 bottom-[12%] h-56 w-56 rounded-full bg-[#1E3A8A]/[0.04] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <FadeInView className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
              Vision &amp; Leadership
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.5rem,2.5vw+0.5rem,2.125rem)] font-bold text-[#0F172A]">
              Guiding Principles
            </h2>
          </FadeInView>

          <StaggerContainer className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6">
            {principalVisionPillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <div
                  className={cn(
                    "h-full border border-slate-200/90 border-l-[4px] border-l-[#1E3A8A] bg-white p-6 shadow-[0_4px_24px_-8px_rgba(11,31,91,0.1)]",
                    "transition-all duration-300 hover:-translate-y-1 hover:border-l-[#2563EB] hover:shadow-[0_12px_36px_-10px_rgba(11,31,91,0.16)]",
                  )}
                >
                  <h3 className="font-display text-lg font-bold text-[#0F172A]">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{pillar.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-[#0B1F5B] py-14 text-white sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <FadeInView className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
              Institutional Highlights
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.5rem,2.5vw+0.5rem,2.125rem)] font-bold">
              Achievements at a Glance
            </h2>
          </FadeInView>

          <StaggerContainer className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-4">
            {principalAchievements.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="border border-white/15 bg-white/10 px-4 py-6 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-white/15 sm:px-5 sm:py-7">
                  <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-blue-100/80 sm:text-[13px]">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {(p.email || p.phone) && (
        <section className="border-t border-slate-200/70 bg-white py-12 sm:py-14">
          <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
            <FadeInView>
              <div className="mx-auto max-w-xl border border-slate-200/90 bg-[#F8FAFF] px-6 py-6 text-center sm:px-8 sm:py-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
                  Contact the Principal&apos;s Office
                </p>
                <div className="mt-4 flex flex-col items-center gap-2 text-sm sm:flex-row sm:justify-center sm:gap-6">
                  {p.email ? (
                    <a
                      href={gmailComposeUrl(p.email)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#1E3A8A] transition-colors hover:text-[#0B1F5B]"
                    >
                      {p.email}
                    </a>
                  ) : null}
                  {p.phone ? (
                    <a
                      href={`tel:${p.phone}`}
                      className="font-medium text-[#1E3A8A] transition-colors hover:text-[#0B1F5B]"
                    >
                      {p.phone}
                    </a>
                  ) : null}
                </div>
              </div>
            </FadeInView>
          </div>
        </section>
      )}
    </>
  );
}
