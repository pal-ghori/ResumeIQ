type Props = {
  title: string;
  children: React.ReactNode;
};

export default function AnalysisCard({
  title,
  children,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        {title}
      </h2>

      {children}
    </div>
  );
}