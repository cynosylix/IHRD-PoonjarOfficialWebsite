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
npm run dev          # local preview (clears .next cache automatically)
npm run build        # produces ./out — stop dev first, or use a new terminal
```

After `npm run build`, upload the contents of the **`out`** directory to your host.

**Do not use `next start`** — this project is a static export only; there is no Node server in production.

## Deploy on Netlify

1. Push this repo to GitHub/GitLab and connect it in [Netlify](https://www.netlify.com/).
2. Build settings are read from **`netlify.toml`** automatically:
   - Build command: `npm run build`
   - Publish directory: `out`
3. In **Site settings → Environment variables**, add:
   ```
   NEXT_PUBLIC_APP_URL = https://your-site.netlify.app
   ```
   Use your custom domain when you attach one (e.g. `https://cepoonjar.ac.in`).
4. Deploy. Each push to your main branch triggers a rebuild.

Do **not** enable the Netlify Next.js runtime plugin — this site is fully static HTML in `out/`.

## Content updates

1. Open `data/site-data.ts`.
2. Change text, HTML strings, arrays (announcements, events, departments, etc.).
3. Add PDFs or images under `public/` and reference their paths (e.g. `/documents/form.pdf`).
4. Run `npm run build` again.

## Environment

Copy `.env.example` to `.env` for local development. On Netlify, set `NEXT_PUBLIC_APP_URL` in the dashboard so sitemap, robots, and Open Graph URLs use your live domain.

## Security / HTML

Rich HTML in `site-data.ts` is rendered with `dangerouslySetInnerHTML`. Only commit trusted content. For user-generated content you would need a backend and sanitization — this project intentionally has neither.

## License

Adjust as appropriate for IHRD / college policy.
