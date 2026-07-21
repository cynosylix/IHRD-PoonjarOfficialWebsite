"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Phone, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ADMISSION_APPLICATION_FORM_URL } from "@/lib/constants";
import {
  dismissAdmissionModalFor30Days,
  shouldShowAdmissionModal,
} from "@/lib/admission-modal-storage";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const PROGRAM_PILLS = ["B.Tech", "MCA", "BCA",  "Diploma"] as const;

const HELP_DESK = [
  { label: "B.Tech", phones: ["94461 22060"] },
  { label: "Diploma", phones: ["9447460142", "9645084883"] },
  { label: "MCA / BCA", phones: ["98951 87685"] },
] as const;

function formatTel(phone: string) {
  return `tel:+91${phone.replace(/\s/g, "")}`;
}

/** Set to `true` to re-enable the admission announcement popup on load. */
const ENABLE_ANNOUNCEMENT = false;

export function AdmissionAnnouncementModal() {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!ENABLE_ANNOUNCEMENT) return;
    if (shouldShowAdmissionModal()) {
      setIsOpen(true);
    }
  }, []);

  const close = useCallback(() => {
    if (dontShowAgain) {
      dismissAdmissionModalFor30Days();
    }
    setIsOpen(false);
  }, [dontShowAgain]);

  const handleApply = useCallback(() => {
    if (dontShowAgain) {
      dismissAdmissionModalFor30Days();
    }
    window.open(ADMISSION_APPLICATION_FORM_URL, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  }, [dontShowAgain]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          <motion.button
            type="button"
            aria-label="Close admission announcement"
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={close}
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              "relative z-[101] flex w-[95%] max-w-[650px] flex-col",
              "overflow-hidden rounded-2xl bg-white shadow-[0_28px_80px_rgba(15,23,42,0.28)]",
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className={cn(
                "absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full",
                "bg-white/90 text-[#64748B] shadow-sm backdrop-blur-sm transition-colors",
                "hover:bg-white hover:text-[#0F172A]",
              )}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {/* Ad-style header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1F5B] via-[#1E3A8A] to-[#2563eb] px-6 pb-6 pt-7 text-center text-white sm:px-8 sm:pb-7 sm:pt-8">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#D4A017]/20 blur-2xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/10 blur-2xl"
                aria-hidden
              />

              <span className="relative inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FDE68A]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Now Enrolling
              </span>

              <h2
                id={titleId}
                className="relative mt-4 font-display text-[clamp(1.5rem,4vw,1.875rem)] font-bold leading-tight tracking-tight"
              >
                Admissions Open
                <span className="mt-1 block text-[#D4A017]">2026 – 2027</span>
              </h2>

              <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-blue-100/90">
                College of Engineering Poonjar · IHRD
              </p>

              <div className="relative mx-auto mt-3 flex flex-col items-center gap-1" aria-hidden>
                <span className="h-0.5 w-20 rounded-full bg-white/90" />
                <span className="h-0.5 w-10 rounded-full bg-[#D4A017]" />
              </div>
            </div>

            <div className="px-5 pb-5 pt-4 sm:px-7 sm:pb-6 sm:pt-5">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#2563eb]">
                Programs Offered
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {PROGRAM_PILLS.map((program) => (
                  <span
                    key={program}
                    className="rounded-full bg-[#1E3A8A]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#1E3A8A] ring-1 ring-[#1E3A8A]/15"
                  >
                    {program}
                  </span>
                ))}
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-center gap-2 text-[#1E3A8A]">
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Admission Help Desk
                  </p>
                </div>

                <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {HELP_DESK.map((desk) => (
                    <div
                      key={desk.label}
                      className="rounded-xl border border-[#1E3A8A]/10 bg-white p-2.5 text-center shadow-[0_4px_16px_rgba(11,31,91,0.05)]"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-wide text-[#64748B]">
                        {desk.label}
                      </p>
                      <div className="mt-2 flex flex-col gap-1">
                        {desk.phones.map((phone) => (
                          <a
                            key={phone}
                            href={formatTel(phone)}
                            className="text-sm font-semibold text-[#2563eb] transition-colors hover:text-[#1d4ed8] hover:underline"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <label className="flex cursor-pointer items-center justify-center gap-2.5 text-sm text-[#64748B]">
                  <input
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(event) => setDontShowAgain(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#2563eb] focus:ring-[#2563eb]"
                  />
                  Don&apos;t show this again
                </label>

                <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={close}
                    className={cn(
                      "inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-200",
                      "bg-white px-5 text-sm font-semibold text-[#475569] transition-colors sm:max-w-[140px]",
                      "hover:border-slate-300 hover:bg-slate-50",
                    )}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleApply}
                    className={cn(
                      "inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-6",
                      "text-sm font-semibold text-white sm:max-w-[220px]",
                      "bg-[#2563eb] shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-all",
                      "hover:bg-[#1d4ed8] hover:shadow-[0_10px_28px_rgba(37,99,235,0.4)]",
                    )}
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
