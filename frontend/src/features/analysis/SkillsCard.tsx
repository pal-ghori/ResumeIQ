type Props = {
  skills: string[];
};

export default function SkillsCard({
  skills,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <h2 className="text-xl font-bold">
        Skills Detected
      </h2>

      <div className="mt-6 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-blue-500/20 px-4 py-2 text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}