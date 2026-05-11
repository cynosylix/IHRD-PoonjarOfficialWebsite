import type { Metadata } from "next";
import { FeedbackPageForm } from "@/components/forms/feedback-page-form";

export const metadata: Metadata = {
  title: "Women grievance cell",
  description: "Women grievance cell — confidential redressal.",
};

export default function WomenGrievancePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Women grievance cell</h1>
      <p className="mt-4 text-slate-700">
        The cell addresses grievances related to gender-based discrimination and
        harassment in line with institutional policy and applicable law. You may use
        the form for initial contact; sensitive cases may also be brought directly to
        the office during working hours.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-brand-900">Contact the cell</h2>
      <div className="mt-4">
        <FeedbackPageForm formKey="women_grievance" title="Women grievance cell" />
      </div>
    </div>
  );
}
