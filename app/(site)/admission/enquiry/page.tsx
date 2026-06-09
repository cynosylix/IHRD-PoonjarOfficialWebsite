import type { Metadata } from "next";
import { AdmissionEnquiryForm } from "@/components/forms/admission-enquiry-form";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Admission Enquiry",
  description: "Submit your admission enquiry to College of Engineering Poonjar.",
};

export default function AdmissionEnquiryPage() {
  return (
    <PageShell
      eyebrow="Admissions"
      title="Admission enquiry"
      description="Submitting opens your email app with your details so you can send the message to the college office — no data is stored on this website."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Admission", href: "/admission" },
        { label: "Enquiry" },
      ]}
      maxWidth="max-w-xl"
    >
      <AdmissionEnquiryForm />
    </PageShell>
  );
}
