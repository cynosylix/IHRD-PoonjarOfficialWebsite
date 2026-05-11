import type { Metadata } from "next";
import { aboutInstitution } from "@/data/site-data";
import { HtmlBlock } from "@/components/content/html-block";

export const metadata: Metadata = {
  title: "About Institution",
  description: "History, vision, and mission of College of Engineering Poonjar.",
};

export default function AboutInstitutionPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-brand-950">About Institution</h1>
      <section className="mt-10 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-brand-900">History</h2>
          <div className="cms-content mt-3">
            <HtmlBlock html={aboutInstitution.history} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-brand-900">Vision</h2>
          <div className="cms-content mt-3">
            <HtmlBlock html={aboutInstitution.vision} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-brand-900">Mission</h2>
          <div className="cms-content mt-3">
            <HtmlBlock html={aboutInstitution.mission} />
          </div>
        </div>
      </section>
    </div>
  );
}
