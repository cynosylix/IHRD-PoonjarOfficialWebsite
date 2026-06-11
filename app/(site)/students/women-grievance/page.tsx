import type { Metadata } from "next";
import { studentWelfare } from "@/data/student-welfare";
import { WelfarePageLayout } from "@/components/students/welfare-page-layout";

export const metadata: Metadata = {
  title: "Women's Grievance Cell",
  description: "Women's grievance cell members.",
};

export default function WomenGrievancePage() {
  return <WelfarePageLayout section={studentWelfare.womenGrievance} />;
}
