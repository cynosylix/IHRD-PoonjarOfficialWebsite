import type { Metadata } from "next";
import Link from "next/link";
import { departments } from "@/data/site-data";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Departments",
  description: "Academic departments at College of Engineering Poonjar.",
};

export default function DepartmentsListPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Departments</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Explore department pages for programmes, vision, mission, and faculty.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => (
          <Link key={d.slug} href={`/academics/departments/${d.slug}`}>
            <Card className="h-full hover:border-brand-300">
              <CardHeader>
                <CardTitle>{d.name}</CardTitle>
                <CardDescription className="line-clamp-4">{d.intro}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
