import { AdmissionAnnouncementModal } from "@/components/admission/admission-announcement-modal";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { SkipToContent } from "@/components/layout/skip-to-content";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <SkipToContent />
      <SiteNavbar />
      <main id="main-content" className="min-w-0 flex-1 overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
      <AdmissionAnnouncementModal />
    </div>
  );
}
