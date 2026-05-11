import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export const metadata: Metadata = {
  title: "Admission",
  description: "B.Tech, Diploma, MCA, and lateral entry admission information.",
};

const cards = [
  {
    slug: "btech",
    title: "B.Tech Admission",
    desc: "Eligibility, allotment, fee structure, and important links.",
  },
  {
    slug: "diploma",
    title: "Diploma Admission",
    desc: "Polytechnic admission guidelines and schedules.",
  },
  {
    slug: "mca",
    title: "MCA Admission",
    desc: "Postgraduate programme in computer applications.",
  },
  {
    slug: "lateral",
    title: "Lateral Entry",
    desc: "Lateral entry for diploma holders into degree programmes.",
  },
];

export default function AdmissionHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Admission</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Select a track for detailed eligibility, fees, allotment information, and
        downloadable prospectus materials.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.slug} href={`/admission/${c.slug}`}>
            <Card className="h-full hover:border-brand-300">
              <CardHeader>
                <CardTitle>{c.title}</CardTitle>
                <CardDescription>{c.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-12 rounded-2xl border border-brand-100 bg-brand-50 p-8">
        <h2 className="text-lg font-semibold text-brand-900">Need help?</h2>
        <p className="mt-2 text-sm text-slate-700">
          Submit an admission enquiry and our office will respond during working hours.
        </p>
        <Link
          href="/admission/enquiry"
          className="mt-4 inline-block text-sm font-semibold text-brand-700 underline-offset-2 hover:underline"
        >
          Admission enquiry form →
        </Link>
      </div>
    </div>
  );
}
