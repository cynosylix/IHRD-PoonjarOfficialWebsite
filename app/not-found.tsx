import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <SkipToContent />
      <SiteNavbar />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-clip">
        <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
          <p className="text-sm font-semibold text-brand-600">404</p>
          <h1 className="mt-2 text-2xl font-bold text-brand-950 sm:text-3xl">
            Page not found
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            The page you are looking for may have been moved or removed.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/">
              <Button>Back to home</Button>
            </Link>
            <Link href="/search">
              <Button variant="outline">Search site</Button>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
