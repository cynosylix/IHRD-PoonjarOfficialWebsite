import type { Metadata } from "next";
import {
  siteSettings,
  principalProfile,
  admissionHelplines,
  placementTeamMembers,
} from "@/data/site-data";
import { ContactForm } from "@/components/forms/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Address, phone, email, map, and contact form.",
};

export default function ContactPage() {
  const phones = siteSettings.phones;
  const emails = siteSettings.emails;

  return (
    <div className="mx-auto max-w-6xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:px-8">
      <h1 className="text-2xl font-bold leading-tight text-brand-950 sm:text-3xl md:text-4xl">
        Contact us
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Reach the college office for admissions, academics, and general enquiries.
      </p>

      <div className="mt-8 grid min-w-0 gap-8 sm:mt-10 lg:grid-cols-2 lg:gap-10">
        <div className="min-w-0 space-y-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-900">
              <MapPin className="h-4 w-4" />
              Address
            </p>
            <p className="mt-2 break-words text-sm text-slate-700">{siteSettings.address}</p>
          </div>
          {phones.length > 0 && (
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-900">
                <Phone className="h-4 w-4" />
                College office
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {phones.map((phone) => (
                  <li key={phone}>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-brand-700 hover:underline">
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-brand-900">Principal</p>
            <p className="mt-2 text-sm text-slate-700">{principalProfile.name}</p>
            <a
              href={`tel:${principalProfile.phone.replace(/\s/g, "")}`}
              className="mt-1 block text-sm text-brand-700 hover:underline"
            >
              {principalProfile.phone}
            </a>
          </div>
          {placementTeamMembers[0] && (
            <div>
              <p className="text-sm font-semibold text-brand-900">Training &amp; placement</p>
              <p className="mt-2 text-sm text-slate-700">{placementTeamMembers[0].name}</p>
              {placementTeamMembers[0].phone && (
                <a
                  href={`tel:${placementTeamMembers[0].phone.replace(/\s/g, "")}`}
                  className="mt-1 block text-sm text-brand-700 hover:underline"
                >
                  {placementTeamMembers[0].phone}
                </a>
              )}
            </div>
          )}
          {admissionHelplines.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-brand-900">Admission helpline</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {admissionHelplines.map((h) => (
                  <li key={h.phone}>
                    <span className="block font-medium text-slate-800">{h.name}</span>
                    <a
                      href={`tel:${h.phone.replace(/\s/g, "")}`}
                      className="text-brand-700 hover:underline"
                    >
                      {h.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {emails.length > 0 && (
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-900">
                <Mail className="h-4 w-4" />
                Email
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {emails.map((e) => (
                  <li key={e}>
                    <a href={`mailto:${e}`} className="text-brand-700 hover:underline">
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {siteSettings.mapEmbedUrl && (
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <iframe
                title="Campus map"
                src={siteSettings.mapEmbedUrl}
                className="aspect-video min-h-[200px] w-full min-w-0 max-w-full sm:min-h-[240px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-brand-900">Send a message</h2>
          <p className="mt-1 text-sm text-slate-600">
            This static site opens your email app with your message — nothing is stored
            on a server.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
