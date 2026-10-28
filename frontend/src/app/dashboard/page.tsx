"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  History,
  Sparkles,
  Upload,
  TrendingUp,
  BarChart3,
  ArrowUp,
  ArrowDown,
  BookOpen,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { getAnalysisHistory } from "@/lib/api";

type Analysis = {
  _id: string;
  fileName: string;
  atsScore: number;
  matchPercentage: number;
  totalSkills: number;
  createdAt: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();

  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      console.log(
        "[DASHBOARD] authentication finished but no user"
      );

      router.replace("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;

    async function loadHistory() {
      try {
        const response = await getAnalysisHistory();
        setAnalyses(response.data || []);
      } catch (error) {
        console.error("Failed to load dashboard history:", error);
      } finally {
        setHistoryLoading(false);
      }
    }

    loadHistory();
  }, [user]);

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">
          Loading your dashboard...
        </p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const totalAnalyses = analyses.length;

  const averageATS =
    totalAnalyses > 0
      ? Math.round(
        analyses.reduce(
          (total, analysis) => total + analysis.atsScore,
          0
        ) / totalAnalyses
      )
      : 0;

  const latestAnalysis = analyses[0];

  const previousAnalysis = analyses[1];

  const atsGrowth = previousAnalysis
    ? latestAnalysis.atsScore - previousAnalysis.atsScore
    : 0;

  const matchGrowth = previousAnalysis
    ? latestAnalysis.matchPercentage -
    previousAnalysis.matchPercentage
    : 0;

  const skillGrowth = previousAnalysis
    ? latestAnalysis.totalSkills -
    previousAnalysis.totalSkills
    : 0;

  const bestATS =
    analyses.length > 0
      ? Math.max(
        ...analyses.map(
          (analysis) => analysis.atsScore
        )
      )
      : 0;

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="rounded-3xl border border-border bg-card p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Welcome back
              </p>

              <h1 className="mt-1 text-4xl font-bold tracking-tight">
                {user.name}
              </h1>

              <p className="mt-2 text-muted-foreground">
                {user.email}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push("/upload")}
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <Upload className="h-4 w-4" />
                Analyze Resume
              </button>

              <button
                onClick={logout}
                className="rounded-xl border border-border px-5 py-3 font-medium transition hover:bg-muted"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Total Analyses
              </p>

              <FileText className="h-5 w-5 text-primary" />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {totalAnalyses}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Average ATS
              </p>

              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {averageATS}%
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Latest ATS
              </p>

              <BarChart3 className="h-5 w-5 text-blue-500" />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {latestAnalysis
                ? `${latestAnalysis.atsScore}%`
                : "—"}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Latest Match
              </p>

              <History className="h-5 w-5 text-purple-500" />
            </div>

            <p className="mt-3 text-3xl font-bold">
              {latestAnalysis
                ? `${latestAnalysis.matchPercentage}%`
                : "—"}
            </p>
          </div>

        </section>

        {/* Progress */}
        {latestAnalysis && (
          <section className="mt-8 rounded-3xl border border-border bg-card p-7">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">
                  Resume Progress
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Track Your Improvement
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  See how your resume is improving across
                  different versions.
                </p>
              </div>

              {previousAnalysis && (
                <button
                  onClick={() =>
                    router.push(
                      `/compare?previousId=${previousAnalysis._id}&latestId=${latestAnalysis._id}`
                    )
                  }
                  className="flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  <TrendingUp className="h-4 w-4" />
                  View Detailed Comparison
                </button>
              )}
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* ATS Growth */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-sm text-muted-foreground">
                  ATS Growth
                </p>

                <div className="mt-3 flex items-center gap-2">
                  {atsGrowth > 0 ? (
                    <ArrowUp className="h-5 w-5 text-green-500" />
                  ) : atsGrowth < 0 ? (
                    <ArrowDown className="h-5 w-5 text-red-500" />
                  ) : null}

                  <span
                    className={`text-2xl font-bold ${atsGrowth > 0
                      ? "text-green-500"
                      : atsGrowth < 0
                        ? "text-red-500"
                        : ""
                      }`}
                  >
                    {atsGrowth > 0 ? "+" : ""}
                    {atsGrowth}%
                  </span>
                </div>
              </div>

              {/* Job Match Growth */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-sm text-muted-foreground">
                  Job Match Growth
                </p>

                <div className="mt-3 flex items-center gap-2">
                  {matchGrowth > 0 ? (
                    <ArrowUp className="h-5 w-5 text-green-500" />
                  ) : matchGrowth < 0 ? (
                    <ArrowDown className="h-5 w-5 text-red-500" />
                  ) : null}

                  <span
                    className={`text-2xl font-bold ${matchGrowth > 0
                      ? "text-green-500"
                      : matchGrowth < 0
                        ? "text-red-500"
                        : ""
                      }`}
                  >
                    {matchGrowth > 0 ? "+" : ""}
                    {matchGrowth}%
                  </span>
                </div>
              </div>

              {/* Skill Growth */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-sm text-muted-foreground">
                  Skill Growth
                </p>

                <div className="mt-3 flex items-center gap-2">
                  {skillGrowth > 0 ? (
                    <ArrowUp className="h-5 w-5 text-green-500" />
                  ) : skillGrowth < 0 ? (
                    <ArrowDown className="h-5 w-5 text-red-500" />
                  ) : null}

                  <span
                    className={`text-2xl font-bold ${skillGrowth > 0
                      ? "text-green-500"
                      : skillGrowth < 0
                        ? "text-red-500"
                        : ""
                      }`}
                  >
                    {skillGrowth > 0 ? "+" : ""}
                    {skillGrowth}
                  </span>
                </div>
              </div>

              {/* Best ATS */}
              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-sm text-muted-foreground">
                  Best ATS Score
                </p>

                <p className="mt-3 text-2xl font-bold">
                  {bestATS}%
                </p>
              </div>

            </div>

            {!previousAnalysis && (
              <p className="mt-5 text-sm text-muted-foreground">
                Analyze an improved version of your resume to
                start tracking your progress.
              </p>
            )}

          </section>
        )}

        {/* Quick Actions */}
        <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>

            <h2 className="text-xl font-semibold">
              Resume Analysis
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Upload your resume and get an ATS score,
              skill analysis, job match and personalized
              recommendations.
            </p>

            <button
              onClick={() => router.push("/upload")}
              className="mt-6 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Analyze Resume →
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
              <Sparkles className="h-6 w-6 text-purple-500" />
            </div>

            <h2 className="text-xl font-semibold">
              AI Resume Writer
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Generate professional summaries, experience descriptions,
              projects and ATS-friendly resume content with AI.
            </p>

            <button
              onClick={() => router.push("/writer")}
              className="mt-6 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Create with AI →
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
              <FileText className="h-6 w-6 text-orange-500" />
            </div>

            <h2 className="text-xl font-semibold">
              Resume Drafts
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              View, manage and continue working on your saved AI-generated
              resume drafts.
            </p>

            <button
              onClick={() => router.push("/drafts")}
              className="mt-6 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              View Drafts →
            </button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
              <History className="h-6 w-6 text-green-500" />
            </div>

            <h2 className="text-xl font-semibold">
              Analysis History
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Review your previous resume analyses, ATS
              scores and job matching results.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("analysis-history")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="mt-6 rounded-xl border border-border px-5 py-3 font-medium transition hover:bg-muted"
            >
              View History →
            </button>
          </div>

        </section>

        {/* Latest Analysis */}
        {latestAnalysis && (
          <section className="mt-10 rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm text-muted-foreground">
                  Latest Analysis
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  {latestAnalysis.fileName}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {new Date(
                    latestAnalysis.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() =>
                  router.push(
                    `/analysis/${latestAnalysis._id}`
                  )
                }
                className="w-fit rounded-xl border border-border px-5 py-3 font-medium transition hover:bg-muted"
              >
                View Analysis →
              </button>

            </div>
          </section>
        )}

        {/* History */}
        <section
          id="analysis-history"
          className="mt-12"
        >
          <div className="mb-5">
            <h2 className="text-2xl font-bold">
              Analysis History
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your previous resume analyses.
            </p>
          </div>

          {historyLoading ? (
            <div className="rounded-2xl border border-border bg-card p-8">
              <p className="text-sm text-muted-foreground">
                Loading analysis history...
              </p>
            </div>
          ) : analyses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground" />

              <h3 className="mt-4 font-semibold">
                No analyses yet
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Upload your resume to create your first
                analysis.
              </p>

              <button
                onClick={() => router.push("/upload")}
                className="mt-5 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground"
              >
                Upload Resume
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <div
                  key={analysis._id}
                  className="rounded-2xl border border-border bg-card p-5 transition hover:border-primary/50"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-primary/10 p-3">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          {analysis.fileName}
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                          {new Date(
                            analysis.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                      <div>
                        <p className="text-xl font-bold">
                          {analysis.atsScore}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ATS
                        </p>
                      </div>

                      <div>
                        <p className="text-xl font-bold">
                          {analysis.matchPercentage}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Match
                        </p>
                      </div>

                      <div>
                        <p className="text-xl font-bold">
                          {analysis.totalSkills}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Skills
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          router.push(
                            `/analysis/${analysis._id}`
                          )
                        }
                        className="rounded-xl border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                      >
                        View →
                      </button>
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