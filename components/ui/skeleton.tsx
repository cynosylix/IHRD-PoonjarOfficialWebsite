import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  shimmer = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { shimmer?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-md bg-slate-200",
        shimmer ? "shimmer" : "animate-pulse",
        className,
      )}
      {...props}
    />
  );
}
