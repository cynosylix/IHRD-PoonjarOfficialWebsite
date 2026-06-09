import { Mail } from "lucide-react";
import { HtmlBlock } from "@/components/content/html-block";
import { gmailComposeUrl } from "@/lib/email-links";
import type { StudentWelfareSection } from "@/data/student-welfare";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function WelfareSectionView({ section }: { section: StudentWelfareSection }) {
  const members = [...section.members].sort((a, b) => a.order - b.order);
  const membersTitle = section.membersTitle ?? "Committee Members";
  const objectivesTitle = section.objectivesTitle ?? "Objectives";

  return (
    <>
      <div className="cms-content">
        <HtmlBlock html={section.content} />
      </div>
      {section.objectives && section.objectives.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-brand-900">{objectivesTitle}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {section.objectives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <h2 className="mt-8 text-xl font-semibold text-brand-900">{membersTitle}</h2>
      <div className="table-scroll mt-4">
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.name}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>{m.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {section.contactEmail ? (
        <p className="mt-6 flex items-center justify-center gap-1.5">
          <Mail className="h-5 w-5 shrink-0 text-brand-700" aria-hidden />
          <a
            href={gmailComposeUrl(section.contactEmail)}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-sm font-medium text-brand-700 underline hover:text-brand-800"
          >
            {section.contactEmail}
          </a>
        </p>
      ) : null}
    </>
  );
}
