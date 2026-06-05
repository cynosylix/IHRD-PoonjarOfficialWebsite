import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteNotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-bold text-brand-950 sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
        The page you are looking for may have been moved or removed. Try one of
        the links below or use search.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button>Back to home</Button>
        </Link>
        <Link href="/admission">
          <Button variant="outline">Admissions</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline">Contact</Button>
        </Link>
        <Link href="/search">
          <Button variant="outline">Search</Button>
        </Link>
      </div>
    </div>
  );
}
