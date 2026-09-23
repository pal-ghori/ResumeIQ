export default function UploadCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-xl">
      {children}
    </div>
  );
}