import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-xl md:p-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Ready to improve your resume?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          Analyze your resume, discover missing skills, and understand
          how well your resume matches your target job.
        </p>

        <div className="mt-10 flex justify-center">
          <Link href="/register">
            <Button className="gap-2">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}