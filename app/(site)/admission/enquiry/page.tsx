import type { Metadata } from "next";
import { AdmissionEnquiryForm } from "@/components/forms/admission-enquiry-form";

export const metadata: Metadata = {
  title: "Admission Enquiry",
  description: "Submit your admission enquiry to College of Engineering Poonjar.",
};

export default function AdmissionEnquiryPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Admission enquiry</h1>
      <p className="mt-3 text-sm text-slate-600">
        Submitting opens your email app with your details so you can send the message
        to the college office — no data is stored on this website.
      </p>
      <div className="mt-8">
        <AdmissionEnquiryForm />
      </div>
    </div>
  );
}
