import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageBanner } from "@/components/layout/page-banner";
import {
  siteSettings,
  principalProfile,
  admissionHelplines,
  placementTeamMembers,
} from "@/data/site-data";
import { gmailComposeUrl } from "@/lib/email-links";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Mail, MapPin, Phone, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact College of Engineering Poonjar, a Unit of IHRD, Government of Kerala — address, phone, email, and campus map.",
};

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function Panel({
  title,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  icon: typeof MapPin;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}
    >
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-600">
        <Icon className="h-4 w-4 shrink-0" aria-hidden />
        {title}
      </h2>
      <div className="mt-3 text-sm text-slate-700">{children}</div>
    </section>
  );
}

function PhoneLink({ phone }: { phone: string }) {
  return (
    <a
      href={telHref(phone)}
      className="flex items-center gap-2 font-medium text-brand-700 hover:underline"
    >
      <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {phone}
    </a>
  );
}

function EmailLink({ email }: { email: string }) {
  return (
    <a
      href={gmailComposeUrl(email)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 break-all font-medium text-brand-700 hover:underline"
    >
      <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {email}
    </a>
  );
}

export default function ContactPage() {
  const phones = siteSettings.phones;
  const emails = siteSettings.emails;
  const placementOfficer = placementTeamMembers[0];
  const primaryEmail = emails[0];

  return (
    <div className="min-w-0">
      <PageBanner
        heroImage="/images/IMG_20240327_164043.jpg.jpeg"
        title="Contact us"
        description="Phone numbers, email addresses, and campus location."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact us" }]}
      />

      <div className="bg-slate-50/80 pb-12 pt-6 sm:pb-14 sm:pt-8">
        <div className="mx-auto max-w-5xl space-y-5 px-4 sm:space-y-6 sm:px-6 lg:px-8">
          {primaryEmail ? (
            <Panel title="Email the college office" icon={Mail}>
              <p className="text-slate-600">
                Tap below to open Gmail in your browser and write to the college office. You
                can sign in with any Google account.
              </p>
              <a
                href={gmailComposeUrl(primaryEmail, {
                  subject: "Enquiry — College of Engineering Poonjar",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                Compose email in Gmail
                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
              </a>
            </Panel>
          ) : null}

          <Panel title="College office" icon={MapPin}>
            <dl className="space-y-4">
              <div>
                <dt className="text-xs font-medium text-slate-500">Address</dt>
                <dd className="mt-1 leading-relaxed">{siteSettings.address}</dd>
              </div>
              {phones.length > 0 ? (
                <div>
                  <dt className="text-xs font-medium text-slate-500">Phone</dt>
                  <dd className="mt-1 space-y-1.5">
                    {phones.map((phone) => (
                      <div key={phone}>
                        <PhoneLink phone={phone} />
                      </div>
                    ))}
                  </dd>
                </div>
              ) : null}
              {emails.length > 0 ? (
                <div>
                  <dt className="text-xs font-medium text-slate-500">Email</dt>
                  <dd className="mt-1 space-y-1.5">
                    {emails.map((email) => (
                      <div key={email}>
                        <EmailLink email={email} />
                      </div>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
          </Panel>

          <div className="grid gap-4 sm:grid-cols-2">
            <Panel title="Principal" icon={User} className="h-full">
              <p className="font-semibold text-brand-900">{principalProfile.name}</p>
              <p className="mt-0.5 text-slate-600">{principalProfile.designation}</p>
              <div className="mt-3 space-y-2">
                {principalProfile.phone ? <PhoneLink phone={principalProfile.phone} /> : null}
                {principalProfile.email ? (
                  <EmailLink email={principalProfile.email} />
                ) : null}
              </div>
            </Panel>

            {placementOfficer ? (
              <Panel title="Training & placement" icon={User} className="h-full">
                <p className="font-semibold text-brand-900">{placementOfficer.name}</p>
                <p className="mt-0.5 text-slate-600">Training and Placement Officer</p>
                <div className="mt-3 space-y-2">
                  {placementOfficer.phone ? (
                    <PhoneLink phone={placementOfficer.phone} />
                  ) : null}
                  {placementOfficer.email ? (
                    <EmailLink email={placementOfficer.email} />
                  ) : null}
                </div>
              </Panel>
            ) : null}
          </div>

          {admissionHelplines.length > 0 ? (
            <Panel title="Admission helpline numbers" icon={Phone}>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Phone</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admissionHelplines.map((h) => (
                      <TableRow key={h.phone}>
                        <TableCell className="font-medium">{h.name}</TableCell>
                        <TableCell className="text-right">
                          <a
                            href={telHref(h.phone)}
                            className="text-brand-700 hover:underline"
                          >
                            {h.phone}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Panel>
          ) : null}

          {siteSettings.mapEmbedUrl ? (
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-2 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                  Campus location
                </h2>
                {siteSettings.mapOpenUrl ? (
                  <a
                    href={siteSettings.mapOpenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline"
                  >
                    Open in Google Maps
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </a>
                ) : null}
              </div>
              <div className="relative h-[300px] w-full sm:h-[400px]">
                <iframe
                  title="College of Engineering Poonjar on Google Maps"
                  src={siteSettings.mapEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
