import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export default function SiteNotFound() {
  return (
    <PageShell
      title="Page not found"
      description="The page you are looking for may have been moved or removed."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "404" }]}
      maxWidth="max-w-lg"
    >
      <div className="text-center">
        <p className="text-sm font-semibold text-brand-600">404</p>
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
    </PageShell>
  );
}
