import {
  Upload,
  BrainCircuit,
  SearchCheck,
  GraduationCap,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description:
      "Upload your resume in PDF or DOCX format securely.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Our AI analyzes your resume and extracts important information.",
  },
  {
    icon: SearchCheck,
    title: "Skill Gap Detection",
    description:
      "Compare your resume with job descriptions and identify missing skills.",
  },
  {
    icon: GraduationCap,
    title: "Learning Roadmap",
    description:
      "Receive personalized recommendations and a roadmap to improve.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      <div className="text-center">
        <h2 className="text-4xl font-bold">
          How ResumeIQ Works
        </h2>

        <p className="mt-4 text-muted-foreground">
          Improve your resume in four simple steps.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="relative rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {index + 1}
              </div>

              <div className="mt-4 inline-flex rounded-xl bg-blue-500/10 p-4">
                <Icon className="h-8 w-8 text-blue-500" />
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
}