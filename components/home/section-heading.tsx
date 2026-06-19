import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  id?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4A017]">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-2 font-display text-[clamp(1.5rem,2.5vw+0.5rem,2.25rem)] font-bold tracking-tight text-[#0F172A]"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
