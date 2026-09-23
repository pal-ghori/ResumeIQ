"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowLeftRight,
  CalendarDays,
  FileText,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";

import { getAnalysisHistory } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type Analysis = {
  _id: string;
  fileName: string;
  atsScore: number;
  matchPercentage: number;
  totalSkills: number;
  matchedSkills: string[];
  missingSkills: string[];
  createdAt: string;
  previousAnalysis?: string | null;
};

export default function HistoryPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please login to view your analysis history.");
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;

    async function loadHistory() {
      try {
        setLoading(true);

        const response = await getAnalysisHistory();

        setAnalyses(response.data || []);
      } catch (error) {
        console.error("Failed to load history:", error);

        toast.error("Failed to load analysis history.");
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [user]);

  const filteredAnalyses = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return analyses;
    }

    return analyses.filter((analysis) =>
      analysis.fileName.toLowerCase().includes(query)
    );
  }, [analyses, search]);

  if (authLoading || loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">
          {authLoading
            ? "Checking authentication..."
            : "Loading analysis history..."}
        </p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              ResumeIQ
            </p>

            <h1 className="mt-1 text-4xl font-bold tracking-tight">
              Analysis History
            </h1>

            <p className="mt-2 text-muted-foreground">
              View and review all your previous resume analyses.
            </p>
          </div>

          <button
            onClick={() => router.push("/upload")}
            className="flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Analyze New Resume
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <div className="mt-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by resume filename..."
              className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <section className="mb-8 rounded-2xl border border-border/60 bg-card/50 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Improvement Journey
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Track how your resume improves across multiple analyses.
            </p>
          </div>

          <div className="space-y-4">
            {analyses.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No analysis history available yet.
              </p>
            ) : (
              [...analyses]
                .reverse()
                .map((analysis, index, orderedAnalyses) => {
                  const previous =
                    index > 0
                      ? orderedAnalyses[index - 1]
                      : null;

                  const atsChange = previous
                    ? analysis.atsScore - previous.atsScore
                    : 0;

                  const skillsChange = previous
                    ? analysis.totalSkills - previous.totalSkills
                    : 0;

                  return (
                    <div
                      key={analysis._id}
                      className="relative rounded-xl border border-border/60 bg-background/60 p-5"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Version {index + 1}
                          </p>

                          <h3 className="mt-1 font-medium">
                            {analysis.fileName}
                          </h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {new Date(
                              analysis.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              ATS Score
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                              {analysis.atsScore}
                            </p>

                            {previous && atsChange !== 0 && (
                              <p className="text-xs text-muted-foreground">
                                {atsChange > 0 ? "+" : ""}
                                {atsChange} from previous
                              </p>
                            )}
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Job Match
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                              {analysis.matchPercentage}%
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">
                              Skills
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                              {analysis.totalSkills}
                            </p>

                            {previous && skillsChange !== 0 && (
                              <p className="text-xs text-muted-foreground">
                                {skillsChange > 0 ? "+" : ""}
                                {skillsChange} from previous
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </section>

        {/* Summary */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Total Analyses
            </p>

            <p className="mt-2 text-3xl font-bold">
              {analyses.length}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Highest ATS Score
            </p>

            <p className="mt-2 text-3xl font-bold">
              {analyses.length > 0
                ? `${Math.max(
                  ...analyses.map(
                    (analysis) => analysis.atsScore
                  )
                )}%`
                : "—"}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">
              Total Skills Detected
            </p>

            <p className="mt-2 text-3xl font-bold">
              {analyses.reduce(
                (total, analysis) =>
                  total + analysis.totalSkills,
                0
              )}
            </p>
          </div>

        </div>

        {/* History List */}
        <section className="mt-10">

          {analyses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />

              <h2 className="mt-5 text-xl font-semibold">
                No analyses yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Upload your first resume to receive your ATS
                score, skill analysis, job match and improvement
                recommendations.
              </p>

              <button
                onClick={() => router.push("/upload")}
                className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Analyze Your Resume
              </button>
            </div>
          ) : filteredAnalyses.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <Search className="mx-auto h-10 w-10 text-muted-foreground" />

              <h2 className="mt-4 font-semibold">
                No matching analyses
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Try searching with a different filename.
              </p>
            </div>
          ) : (
            <div className="space-y-5">

              {filteredAnalyses.map((analysis) => (
                <div
                  key={analysis._id}
                  className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    {/* File information */}
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-primary/10 p-3">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>

                      <div>
                        <h2 className="font-semibold">
                          {analysis.fileName}
                        </h2>

                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4" />

                          {new Date(
                            analysis.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Scores */}
                    <div className="grid grid-cols-3 gap-8 text-center">

                      <div>
                        <p className="text-2xl font-bold">
                          {analysis.atsScore}%
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          ATS Score
                        </p>
                      </div>

                      <div>
                        <p className="text-2xl font-bold">
                          {analysis.matchPercentage}%
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Job Match
                        </p>
                      </div>

                      <div>
                        <p className="text-2xl font-bold">
                          {analysis.totalSkills}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Skills
                        </p>
                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        onClick={() =>
                          router.push(
                            `/analysis/${analysis._id}`
                          )
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium transition hover:bg-muted"
                      >
                        View Analysis
                        <ArrowRight className="h-4 w-4" />
                      </button>

                      {analysis.previousAnalysis && (
                        <button
                          onClick={() =>
                            router.push(
                              `/compare?previousId=${analysis.previousAnalysis}&latestId=${analysis._id}`
                            )
                          }
                          className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-5 py-3 text-sm font-medium text-primary transition hover:bg-primary/20"
                        >
                          <ArrowLeftRight className="h-4 w-4" />
                          Compare Improvement
                        </button>
                      )}
                    </div>

                  </div>

                  {/* Skill summary */}
                  <div className="mt-6 border-t border-border pt-5">

                    <div className="flex flex-wrap gap-2">

                      {analysis.matchedSkills
                        .slice(0, 5)
                        .map((skill) => (
                          <span
                            key={`matched-${skill}`}
                            className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500"
                          >
                            {skill}
                          </span>
                        ))}

                      {analysis.missingSkills
                        .slice(0, 5)
                        .map((skill) => (
                          <span
                            key={`missing-${skill}`}
                            className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-500"
                          >
                            Missing: {skill}
                          </span>
                        ))}

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}