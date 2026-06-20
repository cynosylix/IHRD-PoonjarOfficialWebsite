import { cn } from "@/lib/utils";

export function HeadingUnderline({ align = "center" }: { align?: "center" | "left" }) {
  return (
    <div
      className={cn(
        "mt-3 flex flex-col gap-1",
        align === "center" ? "items-center" : "items-start",
      )}
      aria-hidden
    >
      <span className="h-0.5 w-[6.5rem] rounded-full bg-[#1E3A8A] sm:w-28" />
      <span className="h-0.5 w-10 rounded-full bg-[#D4A017]" />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
  id,
  underline = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  id?: string;
  underline?: boolean;
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
      {underline ? <HeadingUnderline align={align} /> : null}
      {description && (
        <p
          className={cn(
            "text-sm leading-relaxed text-[#64748B] sm:text-base",
            underline ? "mt-4" : "mt-3",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
