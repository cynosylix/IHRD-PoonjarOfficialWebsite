"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { studentsHubLinks } from "@/data/student-welfare";
import {
  studentAchievements,
  studentActivities,
  studentPortalStats,
  studentQuickAccess,
  studentServices,
  studentTestimonials,
} from "@/data/student-portal";
import { FadeInView } from "@/components/motion/fade-in-view";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { StaticImage } from "@/components/ui/static-image";
import { cn } from "@/lib/utils";

function SectionDivider() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6" aria-hidden>
      <div className="h-px bg-gradient-to-r from-transparent via-[#1E3A8A]/25 to-transparent" />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <FadeInView className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">{eyebrow}</p>
      <h2 className="mt-2 font-display text-[clamp(1.5rem,2.5vw+0.5rem,2.125rem)] font-bold text-[#0F172A]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">{description}</p>
      ) : null}
    </FadeInView>
  );
}

function PortalLinkCard({
  title,
  description,
  href,
  className,
}: {
  title: string;
  description: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full min-h-[200px] flex-col rounded-[20px] border border-black/[0.05] bg-white p-6",
        "shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
        "transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1E3A8A]/15",
        "hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]",
        className,
      )}
    >
      <h3 className="font-display text-lg font-bold text-[#0F172A] transition-colors group-hover:text-[#1E3A8A] sm:text-xl">
        {title}
      </h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#64748B]">{description}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#1E3A8A]">
        Explore
        <span
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden
        >
          →
        </span>
      </span>
    </Link>
  );
}

function ActivityCard({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-[280px] w-full overflow-hidden rounded-[20px] border border-black/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)]"
    >
      <StaticImage
        src={image}
        alt={title}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0B1F5B]/90 via-[#0B1F5B]/35 to-[#0B1F5B]/10 transition-opacity duration-300 group-hover:from-[#0B1F5B]/95"
        aria-hidden
      />
      <div className="relative mt-auto flex h-full flex-col justify-end p-5 sm:p-6">
        <h3 className="font-display text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-blue-100/90">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#D4A017]">
          Learn more
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function AchievementCard({
  title,
  value,
  suffix,
  label,
  badge,
}: {
  title: string;
  value: number;
  suffix: string;
  label: string;
  badge: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full min-h-[220px] flex-col rounded-[20px] border border-black/[0.05] bg-white p-6",
        "shadow-[0_10px_30px_rgba(0,0,0,0.08)]",
        "transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A]/15",
        "hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]",
      )}
    >
      <span className="inline-flex w-fit rounded-full bg-[#EEF4FF] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#1E3A8A] ring-1 ring-[#1E3A8A]/10">
        {badge}
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-[#0F172A]">{title}</h3>
      <p className="mt-4 font-display text-4xl font-bold tabular-nums text-[#0B1F5B]">
        <AnimatedCounter value={value} suffix={suffix} />
      </p>
      <p className="mt-2 text-sm font-medium text-[#64748B]">{label}</p>
    </article>
  );
}

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const total = studentTestimonials.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const timer = window.setInterval(() => goTo(index + 1), 7000);
    return () => window.clearInterval(timer);
  }, [index, goTo]);

  const testimonial = studentTestimonials[index];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-[20px] border border-black/[0.05] bg-white px-6 py-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:px-10 sm:py-12">
        <div
          className="pointer-events-none absolute left-8 top-6 font-display text-6xl leading-none text-[#E2E8F0] sm:left-10"
          aria-hidden
        >
          &ldquo;
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center"
          >
            <blockquote className="font-display text-lg font-medium italic leading-relaxed text-[#0F172A] sm:text-xl sm:leading-relaxed">
              {testimonial.quote}
            </blockquote>
            <footer className="mt-8">
              <p className="font-semibold text-[#0F172A]">{testimonial.name}</p>
              <p className="mt-1 text-sm text-[#64748B]">{testimonial.programme}</p>
            </footer>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="rounded-lg border border-slate-200 bg-[#F8FAFF] px-4 py-2 text-sm font-semibold text-[#1E3A8A] transition-colors hover:border-[#1E3A8A]/30 hover:bg-white"
            aria-label="Previous testimonial"
          >
            Previous
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Testimonial slides">
            {studentTestimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-[#0B1F5B]" : "w-2 bg-slate-300 hover:bg-slate-400",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="rounded-lg border border-slate-200 bg-[#F8FAFF] px-4 py-2 text-sm font-semibold text-[#1E3A8A] transition-colors hover:border-[#1E3A8A]/30 hover:bg-white"
            aria-label="Next testimonial"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export function StudentsPageContent() {
  return (
    <div
      className="relative min-w-0 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #EEF4FF 50%, #F8FAFF 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="announcement-blob-drift absolute -left-20 top-[5%] h-72 w-72 rounded-full bg-[#3B82F6]/[0.06] blur-3xl" />
        <div className="announcement-blob-drift-delayed absolute -right-16 top-[35%] h-64 w-64 rounded-full bg-[#1E3A8A]/[0.05] blur-3xl" />
        <div className="announcement-blob-drift absolute bottom-[18%] left-[25%] h-56 w-56 rounded-full bg-[#60A5FA]/[0.04] blur-3xl" />
      </div>

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Student Resources"
            title="Student Services"
            description="Everything you need to thrive academically, professionally, and personally on campus."
          />

          <StaggerContainer className="mt-8 grid auto-rows-fr gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {studentServices.map((service) => (
              <StaggerItem key={service.title} className="flex h-full w-full">
                <PortalLinkCard
                  title={service.title}
                  description={service.description}
                  href={service.href}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Campus at a Glance" title="Student Life Statistics" />

          <StaggerContainer className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-4">
            {studentPortalStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div
                  className={cn(
                    "h-full rounded-2xl border border-white/80 bg-white/50 px-4 py-6 text-center backdrop-blur-sm",
                    "shadow-[0_4px_24px_-10px_rgba(11,31,91,0.08)]",
                    "transition-all duration-300 hover:-translate-y-1 hover:border-[#1E3A8A]/20 hover:bg-white/70",
                    "hover:shadow-[0_12px_36px_-10px_rgba(11,31,91,0.14)] sm:px-5 sm:py-7",
                  )}
                >
                  <p className="font-display text-3xl font-bold text-[#0B1F5B] sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[#64748B] sm:text-[13px]">
                    {stat.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Beyond the Classroom"
            title="Student Activities"
            description="Arts, sports, technical events, social initiatives, and entrepreneurship on campus."
          />

          <StaggerContainer
            className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
            stagger={0.08}
          >
            {studentActivities.map((activity) => (
              <StaggerItem
                key={activity.title}
                className={cn(
                  "flex h-full w-full",
                  activity.title === "Entrepreneurship" && "sm:col-span-2 lg:col-span-1",
                )}
              >
                <ActivityCard {...activity} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Stay Connected"
            title="Quick Access"
            description="Jump to calendars, notices, forms, and essential student resources."
          />

          <StaggerContainer className="mt-8 grid auto-rows-fr gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {studentQuickAccess.map((item) => (
              <StaggerItem key={item.title} className="flex h-full w-full">
                <PortalLinkCard title={item.title} description={item.description} href={item.href} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Proud Moments"
            title="Student Achievements"
            description="Highlights of academic, placement, sports, and cultural accomplishments."
          />

          <StaggerContainer className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {studentAchievements.map((item) => (
              <StaggerItem key={item.title} className="flex h-full w-full">
                <AchievementCard {...item} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      <section className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Student Voices"
            title="What Our Students Say"
            description="Experiences from campus leaders and students across programmes."
          />

          <FadeInView delay={0.08} className="mt-8 sm:mt-10">
            <TestimonialsCarousel />
          </FadeInView>
        </div>
      </section>

      <SectionDivider />

      <section className="relative border-t border-slate-200/60 py-12 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Welfare & Compliance"
            title="Student Support Services"
            description="Forms, feedback, and welfare committees for a safe and inclusive campus."
          />

          <StaggerContainer className="mt-8 grid auto-rows-fr gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {studentsHubLinks.map((link) => (
              <StaggerItem key={link.href} className="flex h-full w-full">
                <PortalLinkCard title={link.title} description={link.desc} href={link.href} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
