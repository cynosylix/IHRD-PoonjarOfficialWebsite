import type { Metadata } from "next";
import { FeedbackPageForm } from "@/components/forms/feedback-page-form";

export const metadata: Metadata = {
  title: "Student feedback",
  description: "Submit structured feedback to the institution.",
};

export default function StudentFeedbackPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Student feedback</h1>
      <p className="mt-3 text-sm text-slate-600">
        Your feedback helps us improve academic and support services.
      </p>
      <div className="mt-8">
        <FeedbackPageForm formKey="student_feedback" title="Feedback" />
      </div>
    </div>
  );
}
