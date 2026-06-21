"use client";

import { useEffect, useRef } from "react";
import { StaticImage } from "@/components/ui/static-image";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
  {
    src: "/images/ChatGPT Image Jun 21, 2026, 05_30_37 PM.png",
    width: 1536,
    height: 1024,
  },
  {
    src: "/images/IMG_20240327_164043.jpg.jpeg",
    width: 3264,
    height: 1836,
  },
  {
    src: "/images/IMG_20240902_125631.jpg.jpeg",
    width: 2592,
    height: 4608,
  },
  {
    src: "/images/Jun 19, 2026, 06_03_08 PM.png",
    width: 1536,
    height: 1024,
  },
] as const;

const SLIDE_INTERVAL_MS = 5000;

export function HeroBackgroundSlideshow() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = Array.from(
      container.querySelectorAll<HTMLElement>("[data-hero-slide]"),
    );
    if (slides.length === 0) return;

    let activeIndex = 0;

    HERO_SLIDES.slice(1).forEach(({ src }) => {
      const img = new Image();
      img.src = encodeURI(src);
    });

    const timer = window.setInterval(() => {
      slides[activeIndex]?.classList.remove("hero-bg-slide--active");
      activeIndex = (activeIndex + 1) % slides.length;
      slides[activeIndex]?.classList.add("hero-bg-slide--active");
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    >
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          data-hero-slide
          className={cn(
            "hero-bg-slide absolute inset-0 overflow-hidden",
            index === 0 && "hero-bg-slide--active",
          )}
        >
          <div className="hero-bg-slide-inner h-full w-full">
            <StaticImage
              src={slide.src}
              alt=""
              width={slide.width}
              height={slide.height}
              priority={index === 0}
              sizes="100vw"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
