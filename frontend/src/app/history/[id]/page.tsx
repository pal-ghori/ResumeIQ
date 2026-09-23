"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { getAnalysisById } from "@/lib/api";

type Analysis = {
  _id: string;
  fileName: string;
  atsScore: number;
  matchPercentage: number;
  totalSkills: number;
  skills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  feedback: {
    strengths: string[];
    improvements: string[];
  };
  sections: {
    contact: boolean;
    summary: boolean;
    experience: boolean;
    education: boolean;
    projects: boolean;
    skills: boolean;
    certifications: boolean;
    achievements: boolean;
    languages: boolean;
  };
  jobDescription: string;
  createdAt: string;
};

export default function AnalysisDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [analysis, setAnalysis] =
    useState<Analysis | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalysis() {
      try {
        const response = await getAnalysisById(
          params.id as string
        );

        setAnalysis(response.data);
      } catch (error) {
        console.error(
          "Failed to load analysis:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadAnalysis();
  }, [params.id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">
          Loading analysis...
        </p>
      </main>
    );
  }

  if (!analysis) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Analysis not found
          </h1>

          <button
            onClick={() => router.push("/history")}
            className="mt-5 rounded-xl bg-primary px-5 py-3 text-primary-foreground"
          >
            Back to History
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <button
          onClick={() => router.push("/history")}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to History
        </button>

        <div className="mb-10">
          <p className="text-sm text-muted-foreground">
            Resume Analysis
          </p>

          <h1 className="mt-1 text-4xl font-bold">
            {analysis.fileName}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Analyzed on{" "}
            {new Date(
              analysis.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        {/* Scores */}

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-border bg-card p-7 text-center">
            <p className="text-sm text-muted-foreground">
              ATS Score
            </p>

            <p className="mt-3 text-5xl font-bold">
              {analysis.atsScore}%
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 text-center">
            <p className="text-sm text-muted-foreground">
              Job Match
            </p>

            <p className="mt-3 text-5xl font-bold">
              {analysis.matchPercentage}%
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 text-center">
            <p className="text-sm text-muted-foreground">
              Total Skills
            </p>

            <p className="mt-3 text-5xl font-bold">
              {analysis.totalSkills}
            </p>
          </div>

        </div>

        {/* Matched Skills */}

        <section className="mt-8 rounded-2xl border border-border bg-card p-7">
          <h2 className="text-xl font-semibold">
            Matched Skills
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {analysis.matchedSkills.length > 0 ? (
              analysis.matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-600"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No matched skills found.
              </p>
            )}
          </div>
        </section>

        {/* Missing Skills */}

        <section className="mt-6 rounded-2xl border border-border bg-card p-7">
          <h2 className="text-xl font-semibold">
            Missing Skills
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {analysis.missingSkills.length > 0 ? (
              analysis.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-500"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No missing skills found.
              </p>
            )}
          </div>
        </section>

        {/* Strengths */}

        <section className="mt-6 rounded-2xl border border-border bg-card p-7">
          <h2 className="text-xl font-semibold">
            Strengths
          </h2>

          <div className="mt-5 space-y-3">
            {analysis.feedback.strengths.map(
              (strength, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />

                  <p className="text-sm">
                    {strength}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Improvements */}

        <section className="mt-6 rounded-2xl border border-border bg-card p-7">
          <h2 className="text-xl font-semibold">
            Improvement Areas
          </h2>

          <div className="mt-5 space-y-3">
            {analysis.feedback.improvements.map(
              (improvement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />

                  <p className="text-sm">
                    {improvement}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Resume Sections */}

        <section className="mt-6 rounded-2xl border border-border bg-card p-7">
          <h2 className="text-xl font-semibold">
            Resume Structure
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">

            {Object.entries(analysis.sections).map(
              ([section, available]) => (
                <div
                  key={section}
                  className="flex items-center justify-between rounded-xl border border-border p-4"
                >
                  <span className="capitalize text-sm">
                    {section}
                  </span>

                  {available ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )
            )}

          </div>
        </section>

      </div>
    </main>
  );
}