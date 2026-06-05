/**
 * Renders trusted HTML from static site content (data/site-data.ts).
 * Only commit content you trust; sanitize if accepting user-generated HTML.
 */
export function HtmlBlock({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
