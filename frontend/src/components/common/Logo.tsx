export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-md">
        IQ
      </div>

      <div>
        <h1 className="text-lg font-bold text-white">
          ResumeIQ
        </h1>

        <p className="text-xs text-slate-400">
          AI Resume Intelligence
        </p>
      </div>
    </div>
  );
}