import { PageShell } from "@/components/layout/page-shell";
import { WelfareSectionView } from "@/components/content/welfare-section";
import type { StudentWelfareSection } from "@/data/student-welfare";

type WelfarePageLayoutProps = {
  section: StudentWelfareSection;
};

export function WelfarePageLayout({ section }: WelfarePageLayoutProps) {
  return (
    <PageShell
      eyebrow="Students"
      title={section.title}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Students", href: "/students" },
        { label: section.title },
      ]}
      maxWidth="max-w-3xl"
    >
      <WelfareSectionView section={section} />
    </PageShell>
  );
}
