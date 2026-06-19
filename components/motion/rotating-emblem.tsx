"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function RotatingEmblem({ className }: { className?: string }) {
  return (
    <div className={cn("hero-perspective", className)}>
      <div
        className="relative h-full w-full animate-spin-slow"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-full border border-gold-400/30 bg-gradient-to-br from-white/10 to-white/5 shadow-glow backdrop-blur-sm"
          style={{ transform: "rotateY(20deg) rotateX(10deg)" }}
        >
          <div className="flex h-full w-full items-center justify-center p-4">
            <Image
              src="/images/logo.webp"
              alt=""
              width={200}
              height={83}
              className="h-auto w-3/4 object-contain opacity-90"
              aria-hidden
            />
          </div>
        </div>
        <div
          className="absolute -inset-3 rounded-full border border-dashed border-gold-400/20"
          style={{ transform: "rotateX(60deg)" }}
        />
        <div
          className="absolute -inset-6 rounded-full border border-gold-500/10"
          style={{ transform: "rotateY(-30deg) rotateX(45deg)" }}
        />
      </div>
    </div>
  );
}
