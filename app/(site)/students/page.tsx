import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Students",
  description: "Student services, forms, and welfare committees.",
};

const links = [
  { href: "/students/forms", title: "Downloadable forms", desc: "Bonafide, transfers, and more." },
  { href: "/students/feedback", title: "Feedback", desc: "Share structured feedback with the institution." },
  { href: "/students/anti-ragging", title: "Anti-ragging committee", desc: "Policy and reporting." },
  { href: "/students/women-grievance", title: "Women grievance cell", desc: "Confidential support and redressal." },
  { href: "/students/grievance-redressal", title: "Grievance redressal committee", desc: "Academic and administrative grievances." },
];

export default function StudentsHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Students</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Access forms, feedback channels, and statutory committees supporting student
        welfare.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
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
  );
}
