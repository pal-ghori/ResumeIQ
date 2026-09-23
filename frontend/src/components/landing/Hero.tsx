import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import DashboardPreview from "./DashboardPreview";
import AnimatedSection from "@/components/common/AnimatedSection";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">
        {/* LEFT SIDE */}

        <div>
          <AnimatedSection>
            <HeroBadge />

            <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
              Land Your <span className="text-blue-500">Dream Job</span> Faster
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
              ResumeIQ analyzes your resume using AI, compares it against job
              descriptions, calculates ATS compatibility, identifies missing
              skills, and generates a personalized learning roadmap.
            </p>

            <HeroButtons />

            <HeroStats />
          </AnimatedSection>
        </div>

        {/* RIGHT SIDE */}

        <AnimatedSection delay={0.3}>
          <DashboardPreview />
        </AnimatedSection>
      </div>
    </section>
  );
}
