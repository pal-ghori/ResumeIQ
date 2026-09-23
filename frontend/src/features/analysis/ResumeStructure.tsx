import { CheckCircle2, XCircle } from "lucide-react";
import type { Sections } from "@/types/analysis";

type Props = {
  sections: Sections;
};

export default function ResumeStructure({ sections }: Props) {
  const items = [
    { label: "Contact", present: sections.contact },
    { label: "Summary", present: sections.summary },
    { label: "Experience", present: sections.experience },
    { label: "Education", present: sections.education },
    { label: "Projects", present: sections.projects },
    { label: "Skills", present: sections.skills },
    { label: "Certifications", present: sections.certifications },
    { label: "Achievements", present: sections.achievements },
    { label: "Languages", present: sections.languages },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Resume Structure
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ label, present }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border p-3"
          >
            {present ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}

            <span className="font-medium">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}