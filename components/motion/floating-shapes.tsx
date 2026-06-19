"use client";

import { cn } from "@/lib/utils";

const shapes = [
  { className: "left-[8%] top-[15%] h-16 w-16 border-gold-400/20", delay: "0s" },
  { className: "right-[12%] top-[25%] h-10 w-10 border-white/10", delay: "1s" },
  { className: "left-[20%] bottom-[20%] h-8 w-8 border-gold-300/15", delay: "2s" },
  { className: "right-[25%] bottom-[30%] h-20 w-20 border-white/8", delay: "0.5s" },
  { className: "left-[45%] top-[10%] h-6 w-6 border-gold-500/25", delay: "1.5s" },
  { className: "right-[8%] bottom-[15%] h-12 w-12 border-white/12", delay: "2.5s" },
];

export function FloatingShapes({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={cn(
            "absolute rotate-45 rounded-lg border-2",
            i % 2 === 0 ? "animate-float" : "animate-float-delayed",
            shape.className,
          )}
          style={{ animationDelay: shape.delay }}
        />
      ))}
      <div className="absolute left-[60%] top-[40%] h-32 w-32 animate-pulse-soft rounded-full bg-gold-500/5 blur-2xl" />
      <div className="absolute bottom-[10%] left-[10%] h-48 w-48 animate-pulse-soft rounded-full bg-brand-600/10 blur-3xl" />
    </div>
  );
}
