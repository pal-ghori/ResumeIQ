type Props = {
  title: string;
  skills: string[];
};

export default function SkillsList({
  title,
  skills,
}: Props) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        {title}
      </h2>

      {skills.length === 0 ? (
        <p className="text-muted-foreground">
          No skills found.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}