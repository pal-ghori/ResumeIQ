"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function JobDescriptionInput({
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-xl font-bold">
        Job Description
      </h2>

      <p className="mt-2 text-muted-foreground">
        Paste the job description to calculate the match percentage.
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
        className="mt-6 w-full rounded-xl border border-border bg-background p-4 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste the job description here..."
      />
    </div>
  );
}