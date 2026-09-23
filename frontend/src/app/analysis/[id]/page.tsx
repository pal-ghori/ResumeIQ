"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Target,
  Lightbulb,
  Download,
} from "lucide-react";

import {
  getAnalysisById,
  updateRoadmapProgress,
} from "@/lib/api";
import jsPDF from "jspdf";

type Analysis = {
  _id: string;
  fileName: string;
  atsScore: number;
  matchPercentage: number;
  totalSkills: number;
  skills: string[];
  matchedSkills: string[];
  missingSkills: string[];

  skillCategories: {
    technical: string[];
    tools: string[];
    soft: string[];
    analytics: string[];
  };

  roadmapProgress: Record<string, boolean[]>;

  improvementRoadmap: {
    skill: string;
    category: string;
    priority: string;
    estimatedTime: string;
    why: string;

    stages: {
      title: string;
      topics: string[];
    }[];

    howToImprove: string;
    resources: string[];
  }[];

  feedback: {
    strengths: string[];
    improvements: string[];
  };

  sections: Record<string, boolean>;
  jobDescription: string;
  createdAt: string;
};

function getScoreLabel(score: number) {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 50) return "Average";
  return "Needs Improvement";
}

function getScoreClass(score: number) {
  if (score >= 80) return "text-green-500";
  if (score >= 65) return "text-blue-500";
  if (score >= 50) return "text-yellow-500";
  return "text-red-500";
}

function ScoreCard({
  title,
  score,
  icon,
}: {
  title: string;
  score: number;
  icon: React.ReactNode;
}) {
  const safeScore = Math.min(Math.max(score, 0), 100);
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (safeScore / 100) * circumference;

  return (
    <div className="rounded-3xl border border-border bg-card p-7">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <p
            className={`text-sm font-medium ${getScoreClass(
              safeScore
            )}`}
          >
            {getScoreLabel(safeScore)}
          </p>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center">
        <div className="relative h-36 w-36">
          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-muted/30"
            />

            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              className={getScoreClass(safeScore)}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">
              {safeScore}%
            </span>

            <span className="text-xs text-muted-foreground">
              Score
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalysisDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [analysis, setAnalysis] =
    useState<Analysis | null>(null);

  const [loading, setLoading] = useState(true);
  const [completedStages, setCompletedStages] = useState<
    Record<string, boolean[]>
  >({});

  const handleDownloadPDF = () => {
    if (!analysis) return;

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 20;

    const checkPage = (space = 15) => {
      if (y + space > pageHeight - 15) {
        doc.addPage();
        y = 20;
      }
    };

    const addText = (
      text: string,
      size = 11,
      bold = false
    ) => {
      checkPage();

      doc.setFontSize(size);
      doc.setFont("helvetica", bold ? "bold" : "normal");

      const lines = doc.splitTextToSize(
        text,
        pageWidth - 30
      );

      doc.text(lines, 15, y);

      y += lines.length * (size * 0.5) + 5;
    };

    const addHeading = (text: string) => {
      checkPage(20);

      y += 3;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(text, 15, y);

      y += 10;
    };

    const addList = (items: string[]) => {
      items.forEach((item) => {
        checkPage();

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        const lines = doc.splitTextToSize(
          `• ${item}`,
          pageWidth - 35
        );

        doc.text(lines, 18, y);

        y += lines.length * 5 + 3;
      });
    };

    // --------------------------------
    // HEADER
    // --------------------------------

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("ResumeIQ", 15, y);

    y += 10;

    doc.setFontSize(18);
    doc.text("Resume Analysis Report", 15, y);

    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    addText(`Resume: ${analysis.fileName}`);
    addText(
      `Analyzed on: ${new Date(
        analysis.createdAt
      ).toLocaleDateString()}`
    );

    // --------------------------------
    // SCORE SUMMARY
    // --------------------------------

    addHeading("Score Summary");

    addText(
      `ATS Score: ${analysis.atsScore}%`,
      13,
      true
    );

    addText(
      `Job Match: ${analysis.matchPercentage}%`,
      13,
      true
    );

    addText(
      `Total Skills: ${analysis.totalSkills}`,
      11
    );

    addText(
      `Matched Skills: ${analysis.matchedSkills.length}`,
      11
    );

    addText(
      `Missing Skills: ${analysis.missingSkills.length}`,
      11
    );

    // --------------------------------
    // MATCHED SKILLS
    // --------------------------------

    addHeading("Matched Skills");

    if (analysis.matchedSkills.length > 0) {
      addList(analysis.matchedSkills);
    } else {
      addText("No matched skills found.");
    }

    // --------------------------------
    // MISSING SKILLS
    // --------------------------------

    addHeading("Missing Skills");

    if (analysis.missingSkills.length > 0) {
      addList(analysis.missingSkills);
    } else {
      addText("No missing skills detected.");
    }

    // --------------------------------
    // SKILL CATEGORIES
    // --------------------------------

    addHeading("Skills Overview");

    addText(
      `Technical Skills (${analysis.skillCategories.technical.length})`,
      12,
      true
    );

    addList(analysis.skillCategories.technical);

    addText(
      `Tools (${analysis.skillCategories.tools.length})`,
      12,
      true
    );

    addList(analysis.skillCategories.tools);

    addText(
      `Analytics (${analysis.skillCategories.analytics.length})`,
      12,
      true
    );

    addList(analysis.skillCategories.analytics);

    addText(
      `Soft Skills (${analysis.skillCategories.soft.length})`,
      12,
      true
    );

    addList(analysis.skillCategories.soft);

    // --------------------------------
    // RESUME SKILLS
    // --------------------------------

    addHeading("Resume Skills");

    if (analysis.skills.length > 0) {
      addList(analysis.skills);
    } else {
      addText("No skills detected.");
    }

    // --------------------------------
    // STRENGTHS
    // --------------------------------

    addHeading("Strengths");

    if (analysis.feedback.strengths.length > 0) {
      addList(analysis.feedback.strengths);
    } else {
      addText("No strengths were identified.");
    }

    // --------------------------------
    // IMPROVEMENTS
    // --------------------------------

    addHeading("Recommended Improvements");

    if (analysis.feedback.improvements.length > 0) {
      addList(analysis.feedback.improvements);
    } else {
      addText("No improvements were identified.");
    }

    // --------------------------------
    // IMPROVEMENT ROADMAP
    // --------------------------------

    addHeading("Improvement Roadmap");

    if (analysis.improvementRoadmap.length > 0) {
      analysis.improvementRoadmap.forEach(
        (item, index) => {
          checkPage(30);

          addText(
            `${index + 1}. ${item.skill}`,
            14,
            true
          );

          addText(`Category: ${item.category}`);
          addText(`Priority: ${item.priority}`);
          addText(
            `Estimated Time: ${item.estimatedTime}`
          );

          addText("Why learn this skill:", 11, true);
          addText(item.why);

          addText("What to learn:", 11, true);

          item.stages?.forEach((stage, stageIndex) => {
            addText(
              `Stage ${stageIndex + 1}: ${stage.title}`,
              10,
              true
            );

            addList(stage.topics);
          });

          addText("How to improve:", 11, true);
          addText(item.howToImprove);

          if (item.resources?.length > 0) {
            addText(
              "Recommended Resources:",
              11,
              true
            );

            addList(item.resources);
          }

          y += 5;
        }
      );
    } else {
      addText(
        "No improvement roadmap available."
      );
    }

    // --------------------------------
    // FOOTER
    // --------------------------------

    const totalPages =
      doc.getNumberOfPages();

    for (
      let page = 1;
      page <= totalPages;
      page++
    ) {
      doc.setPage(page);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");

      doc.text(
        `ResumeIQ • Analysis Report • Page ${page} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 8,
        {
          align: "center",
        }
      );
    }

    // --------------------------------
    // DOWNLOAD
    // --------------------------------

    const safeFileName = analysis.fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase();

    doc.save(
      `resumeiq-analysis-${safeFileName}.pdf`
    );
  };

  useEffect(() => {
    async function loadAnalysis() {
      try {
        const id = params.id as string;

        const response = await getAnalysisById(id);

        setAnalysis(response.data);

        setCompletedStages(
          response.data.roadmapProgress || {}
        );
      } catch (error) {
        console.error(
          "Failed to load analysis:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadAnalysis();
    }
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <FileText className="h-12 w-12 text-muted-foreground" />

        <h1 className="mt-5 text-2xl font-bold">
          Analysis not found
        </h1>

        <p className="mt-2 text-center text-muted-foreground">
          The requested analysis could not be found.
        </p>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition hover:bg-muted"
        >
          ← Back to Dashboard
        </button>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="mb-6 flex w-fit items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>

            <p className="text-sm text-muted-foreground">
              Resume Analysis
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              {analysis.fileName}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Analyzed on{" "}
              {new Date(
                analysis.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDownloadPDF}
              className="flex w-fit items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 font-medium transition hover:bg-muted"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>

            <button
              onClick={() => router.push("/upload")}
              className="flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Analyze Another Resume
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Score Cards */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <ScoreCard
            title="ATS Score"
            score={analysis.atsScore}
            icon={<Target className="h-5 w-5" />}
          />

          <ScoreCard
            title="Job Match"
            score={analysis.matchPercentage}
            icon={<FileText className="h-5 w-5" />}
          />
        </section>

        {/* Skills Overview */}
        <section className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Total Skills
            </p>

            <p className="mt-2 text-3xl font-bold">
              {analysis.totalSkills}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Matched Skills
            </p>

            <p className="mt-2 text-3xl font-bold text-green-500">
              {analysis.matchedSkills.length}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Missing Skills
            </p>

            <p className="mt-2 text-3xl font-bold text-red-500">
              {analysis.missingSkills.length}
            </p>
          </div>

        </section>

        {analysis && (
          <div className="rounded-2xl border border-border bg-card p-6 mt-8 grid gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Want to improve your score?
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Update your resume based on the recommendations,
                  then upload it for a fresh analysis.
                </p>
              </div>

              <button
                onClick={() =>
                  router.push(
                    `/upload?improveFrom=${analysis._id}`
                  )
                }
                className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Improve & Re-analyze
              </button>
            </div>
          </div>
        )}

        {/* Matched Skills */}
        <section className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500" />

            <h2 className="text-xl font-semibold">
              Matched Skills
            </h2>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {analysis.matchedSkills.length > 0 ? (
              analysis.matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-green-500/10 px-3 py-1.5 text-sm text-green-500"
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
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />

            <h2 className="text-xl font-semibold">
              Missing Skills
            </h2>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {analysis.missingSkills.length > 0 ? (
              analysis.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-red-500/10 px-3 py-1.5 text-sm text-red-500"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No missing skills detected.
              </p>
            )}
          </div>
        </section>

        {/* Skill Categories */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Skills Overview
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your skills grouped by category.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Technical */}
            <div className="rounded-xl border border-border bg-background/40 p-4">
              <h3 className="font-semibold">
                Technical
              </h3>

              <p className="mt-1 text-2xl font-bold">
                {analysis.skillCategories.technical.length}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {analysis.skillCategories.technical.length > 0 ? (
                  analysis.skillCategories.technical.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs text-blue-500"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No skills detected
                  </span>
                )}
              </div>
            </div>

            {/* Tools */}
            <div className="rounded-xl border border-border bg-background/40 p-4">
              <h3 className="font-semibold">
                Tools
              </h3>

              <p className="mt-1 text-2xl font-bold">
                {analysis.skillCategories.tools.length}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {analysis.skillCategories.tools.length > 0 ? (
                  analysis.skillCategories.tools.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-purple-500/10 px-2.5 py-1 text-xs text-purple-500"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No skills detected
                  </span>
                )}
              </div>
            </div>

            {/* Analytics */}
            <div className="rounded-xl border border-border bg-background/40 p-4">
              <h3 className="font-semibold">
                Analytics
              </h3>

              <p className="mt-1 text-2xl font-bold">
                {analysis.skillCategories.analytics.length}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {analysis.skillCategories.analytics.length > 0 ? (
                  analysis.skillCategories.analytics.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs text-green-500"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No skills detected
                  </span>
                )}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="rounded-xl border border-border bg-background/40 p-4">
              <h3 className="font-semibold">
                Soft Skills
              </h3>

              <p className="mt-1 text-2xl font-bold">
                {analysis.skillCategories.soft.length}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {analysis.skillCategories.soft.length > 0 ? (
                  analysis.skillCategories.soft.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs text-yellow-500"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No skills detected
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Strengths */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500" />

            <h2 className="text-xl font-semibold">
              Strengths
            </h2>
          </div>

          <ul className="mt-5 space-y-3">
            {analysis.feedback.strengths.length > 0 ? (
              analysis.feedback.strengths.map(
                (strength) => (
                  <li
                    key={strength}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-1 text-green-500">
                      •
                    </span>

                    <span>{strength}</span>
                  </li>
                )
              )
            ) : (
              <li className="text-sm text-muted-foreground">
                No strengths were identified.
              </li>
            )}
          </ul>
        </section>

        {/* Improvements */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-yellow-500" />

            <h2 className="text-xl font-semibold">
              Recommended Improvements
            </h2>
          </div>

          <ul className="mt-5 space-y-3">
            {analysis.feedback.improvements.length > 0 ? (
              analysis.feedback.improvements.map(
                (improvement) => (
                  <li
                    key={improvement}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-1 text-yellow-500">
                      •
                    </span>

                    <span>{improvement}</span>
                  </li>
                )
              )
            ) : (
              <li className="text-sm text-muted-foreground">
                No improvements were identified.
              </li>
            )}
          </ul>
        </section>

        {/* Resume Skills */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">
            Resume Skills
          </h2>

          <div className="mt-5 flex flex-wrap gap-2">
            {analysis.skills.length > 0 ? (
              analysis.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border px-3 py-1.5 text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No skills detected.
              </p>
            )}
          </div>
        </section>

        {/* Improvement Roadmap */}
        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Improvement Roadmap
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Personalized guidance to improve the skills missing from your resume.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {analysis.improvementRoadmap.length > 0 ? (
              analysis.improvementRoadmap.map((item, index) => {
                const stageCount = item.stages?.length || 0;

                const completed =
                  completedStages[item.skill] || [];

                const completedCount = completed.filter(
                  Boolean
                ).length;

                const progress =
                  stageCount > 0
                    ? Math.round(
                      (completedCount / stageCount) * 100
                    )
                    : 0;

                const toggleStage = async (stageIndex: number) => {
                  const current =
                    completedStages[item.skill] ||
                    Array(stageCount).fill(false);

                  const updated = [...current];

                  updated[stageIndex] = !updated[stageIndex];

                  // Update UI immediately
                  setCompletedStages((prev) => ({
                    ...prev,
                    [item.skill]: updated,
                  }));

                  try {
                    await updateRoadmapProgress(
                      analysis._id,
                      item.skill,
                      updated
                    );
                  } catch (error) {
                    console.error(
                      "Failed to update roadmap progress:",
                      error
                    );
                  }
                };

                return (
                  <div
                    key={`${item.skill}-${index}`}
                    className="rounded-2xl border border-border bg-background/40 p-5"
                  >
                    {/* Skill Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {item.skill}
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Category: {item.category}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Estimated time: {item.estimatedTime}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${item.priority === "High"
                          ? "bg-red-500/10 text-red-400"
                          : item.priority === "Medium"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-green-500/10 text-green-400"
                          }`}
                      >
                        {item.priority} Priority
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mt-6 rounded-xl border border-border bg-card/50 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">
                          Roadmap Progress
                        </h4>

                        <span className="text-sm font-semibold text-primary">
                          {progress}%
                        </span>
                      </div>

                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground">
                        {completedCount} of {stageCount} stages completed
                      </p>
                    </div>

                    {/* Why Learn */}
                    <div className="mt-5">
                      <h4 className="text-sm font-semibold">
                        Why learn this skill?
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.why}
                      </p>
                    </div>

                    {/* Learning Stages */}
                    <div className="mt-5">
                      <h4 className="text-sm font-semibold">
                        What to learn
                      </h4>

                      <div className="mt-3 space-y-3">
                        {item.stages?.map((stage, stageIndex) => (
                          <div
                            key={`${stage.title}-${stageIndex}`}
                            className="mb-5 rounded-xl border border-border bg-muted/20 p-4"
                          >
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={completed[stageIndex] || false}
                                disabled={
                                  stageIndex > 0 &&
                                  !completed[stageIndex - 1]
                                }
                                onChange={() => toggleStage(stageIndex)}
                                className="mt-1 h-4 w-4 accent-primary disabled:cursor-not-allowed disabled:opacity-40"
                              />

                              <div>
                                <h5 className="text-sm font-semibold text-foreground">
                                  {stage.title}
                                </h5>

                                <ul className="mt-2 space-y-2">
                                  {stage.topics.map(
                                    (topic: string, topicIndex: number) => (
                                      <li
                                        key={`${topic}-${topicIndex}`}
                                        className="flex items-start gap-2 text-sm text-muted-foreground"
                                      >
                                        <span className="mt-1 text-primary">•</span>
                                        <span>{topic}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* How to Improve */}
                    <div className="mt-5 rounded-xl border border-primary/10 bg-primary/5 p-4">
                      <h4 className="text-sm font-semibold">
                        How to improve
                      </h4>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.howToImprove}
                      </p>
                    </div>

                    {/* Resources */}
                    <div className="mt-5">
                      <h4 className="text-sm font-semibold">
                        Recommended resources
                      </h4>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.resources?.map(
                          (
                            resource: string,
                            resourceIndex: number
                          ) => (
                            <span
                              key={`${resource}-${resourceIndex}`}
                              className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground"
                            >
                              {resource}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground">
                No improvement roadmap available.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}