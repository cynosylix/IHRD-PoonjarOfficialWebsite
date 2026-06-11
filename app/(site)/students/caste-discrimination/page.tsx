import type { Metadata } from "next";
import { studentWelfare } from "@/data/student-welfare";
import { WelfarePageLayout } from "@/components/students/welfare-page-layout";

export const metadata: Metadata = {
  title: "Prevention of Caste Based Discrimination",
  description: "Committee for prevention of caste based discrimination.",
};

export default function CasteDiscriminationPage() {
  return <WelfarePageLayout section={studentWelfare.casteDiscrimination} />;
}
