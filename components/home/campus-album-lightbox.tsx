"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { CampusAlbumItem } from "@/data/site-data";
import { StaticImage } from "@/components/ui/static-image";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const SWIPE_THRESHOLD = 56;

const glassControl = cn(
  "flex items-center justify-center rounded-full border border-white/40",
  "bg-white/30 text-[#0F172A] shadow-[0_4px_24px_rgba(11,31,91,0.1)]",
  "backdrop-blur-xl backdrop-saturate-150",
  "transition-all duration-300 ease-out",
  "hover:scale-105 hover:border-white/60 hover:bg-white/50",
  "hover:shadow-[0_8px_32px_rgba(59,130,246,0.18)]",
  "active:scale-95",
);

type CampusAlbumLightboxProps = {
  albums: readonly CampusAlbumItem[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function CampusAlbumLightbox({
  albums,
  activeIndex,
  onClose,
  onNavigate,
}: CampusAlbumLightboxProps) {
  const album = albums[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < albums.length - 1;
  const [direction, setDirection] = useState(0);
  const prevIndexRef = useRef(activeIndex);

  const navigateTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      onNavigate(index);
    },
    [activeIndex, onNavigate],
  );

  const goPrev = useCallback(() => {
    if (hasPrev) navigateTo(activeIndex - 1);
  }, [activeIndex, hasPrev, navigateTo]);

  const goNext = useCallback(() => {
    if (hasNext) navigateTo(activeIndex + 1);
  }, [activeIndex, hasNext, navigateTo]);

  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    [activeIndex - 1, activeIndex + 1].forEach((i) => {
      if (i < 0 || i >= albums.length) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = albums[i].src;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => links.forEach((link) => link.remove());
  }, [activeIndex, albums]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goNext();
    else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={album.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="fixed inset-0 z-[100]"
    >
      <button
        type="button"
        aria-label="Close gallery"
        className="absolute inset-0 bg-white/[0.12] backdrop-blur-[18px] backdrop-saturate-150"
        onClick={onClose}
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={cn(
          glassControl,
          "absolute right-4 top-4 z-30 h-11 w-11 sm:right-6 sm:top-6 sm:h-12 sm:w-12",
          "hover:rotate-90",
        )}
      >
        <X className="h-5 w-5" strokeWidth={2} aria-hidden />
      </button>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-12 py-14 sm:px-20 sm:py-16">
        {hasPrev && (
          <NavButton
            direction="prev"
            label="Previous image"
            onClick={goPrev}
            className="pointer-events-auto absolute left-3 sm:left-5"
          />
        )}
        {hasNext && (
          <NavButton
            direction="next"
            label="Next image"
            onClick={goNext}
            className="pointer-events-auto absolute right-3 sm:right-5"
          />
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="pointer-events-auto relative flex max-h-[min(82vh,calc(100dvh-9rem))] max-w-[min(94vw,1180px)] items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={cn(
              "overflow-hidden rounded-2xl border border-white/25",
              "bg-white/20 shadow-[0_24px_80px_-16px_rgba(11,31,91,0.22),0_8px_32px_-8px_rgba(255,255,255,0.4)_inset]",
              "backdrop-blur-sm",
            )}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={album.src}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={{
                  enter: (d: number) => ({
                    opacity: 0,
                    x: d >= 0 ? 28 : -28,
                    scale: 0.98,
                  }),
                  center: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  },
                  exit: (d: number) => ({
                    opacity: 0,
                    x: d >= 0 ? -28 : 28,
                    scale: 0.98,
                  }),
                }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={handleDragEnd}
                className="cursor-grab active:cursor-grabbing"
              >
                <StaticImage
                  src={album.src}
                  alt={album.alt}
                  sizes="(min-width: 1024px) 90vw, 94vw"
                  className="block max-h-[min(82vh,calc(100dvh-9rem))] max-w-[min(94vw,1180px)] w-auto object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4, delay: 0.08, ease: EASE_OUT }}
        className={cn(
          "absolute bottom-5 left-1/2 z-30 max-w-[min(92vw,520px)] -translate-x-1/2",
          "rounded-2xl border border-white/35 bg-white/40 px-5 py-3.5 text-center",
          "shadow-[0_12px_40px_-8px_rgba(11,31,91,0.15)] backdrop-blur-xl backdrop-saturate-150",
          "sm:bottom-8 sm:px-7 sm:py-4",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-display text-sm font-semibold leading-snug text-[#0F172A] sm:text-base">
          {album.title}
        </p>
        <p className="mt-1 text-xs font-medium tabular-nums tracking-wide text-[#64748B] sm:text-[13px]">
          {activeIndex + 1} / {albums.length}
        </p>
      </motion.div>
    </motion.div>
  );
}

function NavButton({
  direction,
  label,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(glassControl, "h-11 w-11 sm:h-12 sm:w-12", className)}
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} aria-hidden />
    </button>
  );
}
