"use client";

import { Info } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { FadeInView } from "@/components/motion/fade-in-view";
import { cn } from "@/lib/utils";

const FEE_ROWS = [
  { particular: "Admission Fee (1st Year Only)", low: "₹1,000", high: "₹1,000" },
  { particular: "Tuition Fee", low: "₹22,050", high: "₹35,833" },
  { particular: "ID Card", low: "₹150", high: "₹150" },
  { particular: "KTU Sports & Arts Fee", low: "₹530", high: "₹530" },
  {
    particular: "KTU Administration Fee (1st Year Only)",
    low: "₹1,050",
    high: "₹1,050",
  },
  {
    particular: "KTU Affiliation Fee (1st Year Only)",
    low: "₹790",
    high: "₹790",
  },
  { particular: "Caution Deposit (Refundable)", low: "₹5,000", high: "₹5,000" },
  { particular: "PTA Fund (One Time)", low: "₹10,000", high: "₹10,000" },
  { particular: "Bus Fund (One Time)", low: "₹2,500", high: "₹2,500" },
  {
    particular: "Training & Placement Cell (One Time)",
    low: "₹2,500",
    high: "₹2,500",
  },
] as const;

const PLEASE_NOTE = [
  "This fee structure is applicable only for B.Tech admissions (Academic Year 2026–27).",
  "Caution Deposit is refundable as per college regulations.",
  "Fees are subject to revision if notified by IHRD, AICTE, KTU, or the Government of Kerala.",
] as const;

export function isBtechProgramSlug(slug: string) {
  return slug.startsWith("btech-");
}

export function BtechFeeStructureSection() {
  return (
    <FadeInView>
      <section
        id="btech-fee-structure"
        className="scroll-mt-28"
        aria-labelledby="btech-fee-structure-heading"
      >
        <SectionHeading
          id="btech-fee-structure-heading"
          underline
          eyebrow="Admissions"
          title="B.Tech Admission Fee Structure (Academic Year 2026–27)"
          description="The following fee structure is applicable only for students admitted to the B.Tech programmes at College of Engineering Poonjar (CEP) for the Academic Year 2026–27."
        />

        <div
          className={cn(
            "mt-8 overflow-hidden rounded-2xl border border-black/[0.06] bg-white",
            "shadow-[0_8px_28px_rgba(11,31,91,0.08)] sm:mt-10",
          )}
        >
          <div className="-mx-0 max-h-[min(70vh,520px)] overflow-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">
                B.Tech Admission Fee Structure for Academic Year 2026–27 comparing
                Merit Low Fee and Merit High Fee
              </caption>
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#0B1F5B] text-white">
                  <th
                    scope="col"
                    className="px-4 py-3.5 font-semibold tracking-wide sm:px-5"
                  >
                    Fee Particular
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-right font-semibold tracking-wide sm:px-5"
                  >
                    Merit (Low Fee)
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-right font-semibold tracking-wide sm:px-5"
                  >
                    Merit (High Fee)
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEE_ROWS.map((row, index) => (
                  <tr
                    key={row.particular}
                    className={cn(
                      "border-b border-slate-100 transition-colors",
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/80",
                    )}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-[#334155] sm:px-5"
                    >
                      {row.particular}
                    </th>
                    <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-[#475569] sm:px-5">
                      {row.low}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums text-[#475569] sm:px-5">
                      {row.high}
                    </td>
                  </tr>
                ))}
                <tr className="bg-[#1E3A8A] text-white">
                  <th
                    scope="row"
                    className="px-4 py-3.5 font-display text-base font-bold sm:px-5"
                  >
                    Total
                  </th>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right font-display text-base font-bold tabular-nums sm:px-5">
                    ₹45,570
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right font-display text-base font-bold tabular-nums sm:px-5">
                    ₹59,353
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          className={cn(
            "mt-6 rounded-2xl border border-[#1E3A8A]/15 bg-[#F8FAFF] p-5",
            "shadow-[0_8px_28px_rgba(11,31,91,0.06)] sm:p-6",
          )}
          role="note"
          aria-labelledby="btech-fee-second-installment"
        >
          <div className="flex gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
              <Info className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <h3
                id="btech-fee-second-installment"
                className="font-display text-lg font-bold text-[#0F172A]"
              >
                Important Notice — Second Installment
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#475569] sm:text-[15px]">
                Students admitted under the Merit category are required to remit the
                Tuition Fee at the beginning of the Second Semester.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#334155] sm:text-[15px]">
                <li className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#1E3A8A]/10 pb-2">
                  <span className="font-medium">Merit (Low Fee)</span>
                  <span className="font-semibold tabular-nums text-[#0B1F5B]">
                    ₹22,050
                  </span>
                </li>
                <li className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-medium">Merit (High Fee)</span>
                  <span className="font-semibold tabular-nums text-[#0B1F5B]">
                    ₹35,830
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#D4A017]">
            Please Note
          </h3>
          <ul className="mt-3 space-y-2.5">
            {PLEASE_NOTE.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-[#475569] sm:text-[15px]"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </FadeInView>
  );
}
