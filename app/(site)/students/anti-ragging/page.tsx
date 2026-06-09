import type { Metadata } from "next";
import { studentWelfare } from "@/data/student-welfare";
import { WelfarePageLayout } from "@/components/students/welfare-page-layout";

export const metadata: Metadata = {
  title: "Anti-Ragging Committee",
  description: "Anti-ragging committee members.",
};

export default function AntiRaggingPage() {
  return <WelfarePageLayout section={studentWelfare.antiRagging} />;
}
