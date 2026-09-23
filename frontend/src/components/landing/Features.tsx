import {
  Brain,
  Target,
  FileSearch,
  GraduationCap,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "ATS Score",
    description:
      "Measure how well your resume performs with Applicant Tracking Systems.",
  },
  {
    icon: Brain,
    title: "Skill Gap Detection",
    description:
      "Compare your resume with job descriptions and discover missing skills.",
  },
  {
    icon: FileSearch,
    title: "Resume Analysis",
    description:
      "AI analyzes your resume and provides actionable improvement suggestions.",
  },
  {
    icon: GraduationCap,
    title: "Learning Roadmap",
    description:
      "Receive a personalized roadmap to improve your technical skills.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold">
          Everything You Need
        </h2>

        <p className="mt-4 text-muted-foreground">
          Powerful AI tools to improve your resume and career opportunities.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 inline-flex rounded-xl bg-blue-500/10 p-3">
                <Icon className="h-6 w-6 text-blue-500" />
              </div>

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}