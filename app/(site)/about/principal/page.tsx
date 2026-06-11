import type { Metadata } from "next";
import { principalProfile } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";
import { PageBanner } from "@/components/layout/page-banner";
import { StaticImage } from "@/components/ui/static-image";
import { gmailComposeUrl } from "@/lib/email-links";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "From The Principal's Desk",
  description: "Message from the Principal, College of Engineering Poonjar.",
};

export default function PrincipalPage() {
  const p = principalProfile;

  return (
    <div className="min-w-0">
      <PageBanner
        eyebrow="About"
        title="From The Principal's Desk"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Principal's Desk" },
        ]}
      />

      <div className="bg-gradient-to-b from-slate-50 to-white pb-16 pt-10 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <StaticImage
                src={p.photoUrl ?? "/images/pages/principal.jpg"}
                alt={`${p.name} portrait`}
                className="h-[175px] w-[150px] object-cover object-top"
                priority
                sizes="150px"
              />
            </div>
            <p className="mt-4 text-xl font-semibold text-brand-900">{p.name}</p>
            <p className="mt-1 text-sm font-medium text-slate-600">{p.designation}</p>
          </div>

          <div className="cms-content mt-8 text-justify">
            <HtmlBlock html={p.message} />
          </div>

          <h2 className="mt-10 text-xl font-semibold text-brand-900">Contact Details</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <Table>
              <TableBody>
                {p.email ? (
                  <TableRow>
                    <TableCell className="font-medium">Email :</TableCell>
                    <TableCell>
                      <a
                        href={gmailComposeUrl(p.email)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-700 hover:underline"
                      >
                        {p.email}
                      </a>
                    </TableCell>
                  </TableRow>
                ) : null}
                {p.phone ? (
                  <TableRow>
                    <TableCell className="font-medium">Phone :</TableCell>
                    <TableCell>
                      <a href={`tel:${p.phone}`} className="text-brand-700 hover:underline">
                        {p.phone}
                      </a>
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
