import type { Metadata } from "next";
import Link from "next/link";
import { facilities } from "@/data/site-data";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StaticImage } from "@/components/ui/static-image";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Campus facilities at College of Engineering Poonjar.",
};

export default function FacilitiesPage() {
  const list = [...facilities].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Facilities</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Explore computing labs, library, seminar halls, transport, hostel, and canteen
        services that support student life.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((f) => (
          <Link key={f.slug} href={`/facilities/${f.slug}`}>
            <Card className="h-full overflow-hidden p-0 hover:border-brand-300">
              <div className="aspect-video bg-brand-50">
                <StaticImage
                  src={f.imageUrl ?? "/images/placeholder-campus.svg"}
                  alt={f.name}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <CardHeader className="p-6">
                <CardTitle>{f.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {f.summary ?? f.description.replace(/<[^>]+>/g, "").slice(0, 120)}…
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
