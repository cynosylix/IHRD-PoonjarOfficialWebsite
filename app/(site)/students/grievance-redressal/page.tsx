import type { Metadata } from "next";
import { FeedbackPageForm } from "@/components/forms/feedback-page-form";

export const metadata: Metadata = {
  title: "Grievance redressal committee",
  description: "Academic and administrative grievance redressal.",
};

export default function GrievanceRedressalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">
        Grievance redressal committee
      </h1>
      <p className="mt-4 text-slate-700">
        Students may submit academic or administrative grievances through the form
        below. Please include relevant details (course, semester, dates) to help the
        committee process your request efficiently.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-brand-900">Submit grievance</h2>
      <div className="mt-4">
        <FeedbackPageForm
          formKey="grievance_redressal"
          title="Grievance redressal"
        />
      </div>
    </div>
  );
}
