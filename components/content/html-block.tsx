/**
 * Renders trusted HTML from the CMS / admin editor.
 * Content is authored by authenticated staff only; sanitize further if exposing public forms to HTML.
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
