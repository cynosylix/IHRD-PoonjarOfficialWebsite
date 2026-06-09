import type { Metadata } from "next";
import Link from "next/link";
import { studentsHubLinks } from "@/data/site-data";
import { PageBanner } from "@/components/layout/page-banner";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Students",
  description: "Student services, forms, and welfare committees.",
};

export default function StudentsHubPage() {
  return (
    <div className="min-w-0">
      <PageBanner
        title="Students"
        description="Application forms, welfare committees, grievance redressal, and student support services."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Students" }]}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studentsHubLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                <Card className="h-full hover:border-brand-300">
                  <CardHeader>
                    <CardTitle className="text-base">{l.title}</CardTitle>
                    <CardDescription>{l.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
