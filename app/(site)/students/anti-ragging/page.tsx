import type { Metadata } from "next";
import { FeedbackPageForm } from "@/components/forms/feedback-page-form";

export const metadata: Metadata = {
  title: "Anti-ragging committee",
  description: "Anti-ragging policy and confidential reporting.",
};

export default function AntiRaggingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">Anti-ragging committee</h1>
      <div className="mt-6 max-w-none space-y-3 text-slate-700">
        <p>
          Ragging is strictly prohibited as per UGC regulations and Kerala Government
          norms. Any incident can be reported confidentially using the form below. The
          committee will initiate action as per institutional policy.
        </p>
        <ul>
          <li>24×7 helpline numbers are displayed on campus notice boards.</li>
          <li>Emails are monitored during working hours.</li>
        </ul>
      </div>
      <h2 className="mt-10 text-xl font-semibold text-brand-900">Report / seek help</h2>
      <div className="mt-4">
        <FeedbackPageForm formKey="antiragging" title="Anti-ragging report" />
      </div>
    </div>
  );
}
