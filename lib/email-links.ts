/** Opens Gmail compose in the browser (works without a desktop mail app). */
export function gmailComposeUrl(
  to: string,
  options?: { subject?: string; body?: string },
): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
  });
  if (options?.subject) params.set("su", options.subject);
  if (options?.body) params.set("body", options.body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
