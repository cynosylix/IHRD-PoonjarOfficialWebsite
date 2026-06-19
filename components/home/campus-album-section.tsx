"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { CampusAlbumItem } from "@/data/site-data";
import { SectionHeading } from "@/components/home/section-heading";
import { CampusAlbumLightbox } from "@/components/home/campus-album-lightbox";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";
import { StaticImage } from "@/components/ui/static-image";
import { cn } from "@/lib/utils";

function AlbumCard({
  album,
  onOpen,
}: {
  album: CampusAlbumItem;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative w-full overflow-hidden rounded-none bg-white text-left shadow-[0_4px_24px_-8px_rgba(11,31,91,0.12)] transition-shadow duration-300 hover:shadow-[0_14px_36px_-10px_rgba(11,31,91,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E3A8A]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <StaticImage
          src={album.src}
          alt={album.alt}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B1F5B]/75 via-[#0B1F5B]/20 to-transparent transition-opacity duration-300 group-hover:from-[#0B1F5B]/85 group-hover:via-[#0B1F5B]/35"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="font-display text-sm font-semibold leading-snug text-white transition-transform duration-300 group-hover:-translate-y-1 sm:text-[15px]">
            {album.title}
          </p>
        </div>
      </div>
    </button>
  );
}

export function CampusAlbumSection({
  albums,
  className,
}: {
  albums: readonly CampusAlbumItem[];
  className?: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section
        className={cn(
          "relative overflow-hidden border-t border-slate-200/60 py-16 sm:py-20 lg:py-24",
          className,
        )}
        aria-labelledby="campus-album-heading"
        style={{ background: "linear-gradient(180deg, #F8FAFF 0%, #EEF4FF 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="announcement-blob-drift absolute -left-16 top-[12%] h-64 w-64 rounded-full bg-[#3B82F6]/[0.05] blur-3xl" />
          <div className="announcement-blob-drift-delayed absolute -right-12 bottom-[15%] h-56 w-56 rounded-full bg-[#1E3A8A]/[0.04] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="campus-album-heading"
            eyebrow="Gallery"
            title="Campus Album"
            description="Moments from campus life, programmes, and celebrations."
          />

          <StaggerContainer
            className="mt-12 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7"
            stagger={0.08}
          >
            {albums.map((album, index) => (
              <StaggerItem key={album.src}>
                <AlbumCard album={album} onOpen={() => setLightboxIndex(index)} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <CampusAlbumLightbox
            key="campus-album-lightbox"
            albums={albums}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
