import type { Metadata } from "next";
import { studentWelfare } from "@/data/student-welfare";
import { WelfarePageLayout } from "@/components/students/welfare-page-layout";

export const metadata: Metadata = {
  title: "Grievance Redressal Committee",
  description: "Grievance redressal committee members.",
};

export default function GrievanceRedressalPage() {
  return <WelfarePageLayout section={studentWelfare.grievanceRedressal} />;
}
