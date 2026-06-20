import type { ReactNode } from "react";
import { ADMISSION_APPLICATION_FORM_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ApplyNowLinkProps = {
  className?: string;
  children: ReactNode;
};

/** Opens the official CEP Admission 2026 Google Form in a new tab. */
export function ApplyNowLink({ className, children }: ApplyNowLinkProps) {
  return (
    <a
      href={ADMISSION_APPLICATION_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
    >
      {children}
    </a>
  );
}
