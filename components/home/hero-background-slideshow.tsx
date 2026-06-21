"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { StaticImage } from "@/components/ui/static-image";

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
const FADE_DURATION_S = 1.25;
const ZOOM_SCALE = 1.06;

export function HeroBackgroundSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const goToNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(goToNext, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [goToNext]);

  useEffect(() => {
    HERO_SLIDES.slice(1).forEach(({ src }) => {
      const img = new Image();
      img.src = encodeURI(src);
    });
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={slide.src}
            className="absolute inset-0 overflow-hidden"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{
              duration: FADE_DURATION_S,
              ease: "easeInOut",
            }}
            style={{ zIndex: isActive ? 1 : 0 }}
          >
            <motion.div
              className="h-full w-full"
              initial={false}
              animate={{
                scale:
                  isActive && !prefersReducedMotion ? ZOOM_SCALE : 1,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : SLIDE_INTERVAL_MS / 1000,
                ease: "linear",
              }}
            >
              <StaticImage
                src={slide.src}
                alt=""
                width={slide.width}
                height={slide.height}
                priority={index === 0}
                sizes="100vw"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
