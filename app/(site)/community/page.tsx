import type { Metadata } from "next";
import { communitySections } from "@/data/site-data";
import { CommunityPageContent } from "@/components/community/community-page-content";
import { PageBanner } from "@/components/layout/page-banner";

export const metadata: Metadata = {
  title: "Community",
  description: "Alumni, PTA, Senate, IEEE, IEDC, and NSS at CEPoonjar.",
};

export default function CommunityHubPage() {
  return (
    <div className="min-w-0">
      <PageBanner
        heroImage="/images/IMG_20240327_164043.jpg.jpeg"
        title="Community"
        description="Campus associations and student bodies — select a group to view details, members, and events."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Community" }]}
      />

      <CommunityPageContent sections={communitySections} />
    </div>
  );
}
