import { getImageSize } from "@/lib/image-sizes";
import { cn } from "@/lib/utils";

type StaticImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  /** LCP / above-the-fold images */
  priority?: boolean;
  sizes?: string;
};

/**
 * Optimized <img> for static export (next/image unoptimized mode).
 * Adds lazy loading, async decoding, and explicit dimensions to reduce CLS.
 */
export function StaticImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: StaticImageProps) {
  const known = getImageSize(src);
  const w = width ?? known?.width;
  const h = height ?? known?.height;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      className={cn("max-w-full", className)}
    />
  );
}
