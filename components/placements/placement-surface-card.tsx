import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PlacementSurfaceCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "blockquote";
};

/** Shared card surface for placement portal sections. */
export function PlacementSurfaceCard({
  children,
  className,
  as: Tag = "div",
}: PlacementSurfaceCardProps) {
  return (
    <Tag
      className={cn(
        "h-full rounded-2xl border border-black/[0.06] bg-white",
        "shadow-[0_8px_28px_rgba(11,31,91,0.08)] transition-all duration-300",
        "hover:-translate-y-1 hover:border-[#1E3A8A]/15 hover:shadow-[0_14px_36px_rgba(11,31,91,0.12)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
