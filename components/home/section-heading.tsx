import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-950 sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-prose px-1 text-sm text-slate-600 sm:px-0 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
