import { StaticImage } from "@/components/ui/static-image";

type PageHeroImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function PageHeroImage({
  src,
  alt,
  priority = false,
  className,
}: PageHeroImageProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 ${className ?? "mb-8"}`}
    >
      <StaticImage
        src={src}
        alt={alt}
        priority={priority}
        sizes="(min-width: 896px) 768px, 100vw"
        className="aspect-[21/9] w-full object-cover sm:aspect-[2.4/1]"
      />
    </div>
  );
}
