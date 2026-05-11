# College of Engineering Poonjar — Static Website

Static, database-free college website built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Lucide**, **React Hook Form + Zod**, and **Sonner** toasts.

Content lives in **`data/site-data.ts`** — edit that file and rebuild to update copy, lists, tables, and links.

## Features

- **Fully static export** (`output: "export"` in `next.config.ts`) — deploy the `out/` folder to any static host (GitHub Pages, S3, Netlify static, IIS static, etc.). No Node server or database required.
- Public pages: home, about, academics, admission, students, placements, facilities, community, contact, search.
- **Forms** (contact, admission enquiry, feedback) open the visitor’s **email client** via `mailto:` — nothing is stored on a server.
- Search runs **in the browser** over the same static content.

## Prerequisites

- Node.js **20+**

## Commands

```bash
npm install
npm run dev          # local preview
npm run build        # produces ./out for static hosting
```

After `npm run build`, upload the contents of the **`out`** directory to your host.

## Content updates

1. Open `data/site-data.ts`.
2. Change text, HTML strings, arrays (announcements, events, departments, etc.).
3. Add PDFs or images under `public/` and reference their paths (e.g. `/documents/form.pdf`).
4. Run `npm run build` again.

## Environment

Copy `.env.example` to `.env` if you want to set `NEXT_PUBLIC_APP_URL` for canonical URLs in metadata (optional for local dev).

## Security / HTML

Rich HTML in `site-data.ts` is rendered with `dangerouslySetInnerHTML`. Only commit trusted content. For user-generated content you would need a backend and sanitization — this project intentionally has neither.

## License

Adjust as appropriate for IHRD / college policy.
