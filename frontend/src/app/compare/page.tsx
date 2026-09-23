"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowUp,
  ArrowDown,
  Minus,
  TrendingUp,
  Target,
  CheckCircle,
  XCircle,
  Sparkles,
} from "lucide-react";
import { compareAnalyses } from "@/lib/api";

type Comparison = {
  previous: {
    fileName: string;
    atsScore: number;
    matchPercentage: number;
    totalSkills: number;
    matchedSkills: string[];
    missingSkills: string[];
    skillCategories: {
      technical: string[];
      tools: string[];
      analytics: string[];
      soft: string[];
    };
    createdAt: string;
  };
  latest: {
    fileName: string;
    atsScore: number;
    matchPercentage: number;
    totalSkills: number;
    matchedSkills: string[];
    missingSkills: string[];
    skillCategories: {
      technical: string[];
      tools: string[];
      analytics: string[];
      soft: string[];
    };
    createdAt: string;
  };
  changes: {
    atsScore: number;
    matchPercentage: number;
    totalSkills: number;
    matchedSkills: number;
    missingSkills: number;
    newSkills: string[];
    removedSkills: string[];

    skillCategories: {
      technical: number;
      tools: number;
      analytics: number;
      soft: number;
    };
  };
};

function ChangeIndicator({
  value,
  positiveWhenNegative = false,
}: {
  value: number;
  positiveWhenNegative?: boolean;
}) {
  if (value === 0) {
    return (
      <span className="flex items-center gap-1 text-gray-400">
        <Minus size={16} />
        No change
      </span>
    );
  }

  const positive = positiveWhenNegative
    ? value < 0
    : value > 0;

  return (
    <span
      className={`flex items-center gap-1 ${positive ? "text-green-400" : "text-red-400"
        }`}
    >
      {value > 0 ? (
        <ArrowUp size={16} />
      ) : (
        <ArrowDown size={16} />
      )}

      {Math.abs(value)}
    </span>
  );
}

export default function ComparePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const previousId = searchParams.get("previousId");
  const latestId = searchParams.get("latestId");

  const [comparison, setComparison] =
    useState<Comparison | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadComparison() {
      if (!previousId || !latestId) {
        setError(
          "Previous and latest analysis IDs are required."
        );
        setLoading(false);
        return;
      }

      try {
        const response = await compareAnalyses(
          previousId,
          latestId
        );

        setComparison(response.data);
      } catch (error) {
        console.error(
          "Failed to load comparison:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load comparison."
        );
      } finally {
        setLoading(false);
      }
    }

    loadComparison();
  }, [previousId, latestId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <p className="text-gray-400">
          Loading comparison...
        </p>
      </main>
    );
  }

  if (error || !comparison) {
    return (
      <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <XCircle
            className="mx-auto mb-4 text-red-400"
            size={48}
          />

          <h1 className="text-xl font-semibold">
            Comparison unavailable
          </h1>

          <p className="mt-2 text-gray-400">
            {error || "Unable to compare analyses."}
          </p>
        </div>
      </main>
    );
  }

  const { previous, latest, changes } = comparison;

  return (
    <main className="min-h-screen bg-[#050505] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-3">
                <TrendingUp className="text-purple-400" />

                <h1 className="text-3xl font-bold">
                  Resume Progress
                </h1>
              </div>

              <p className="mt-2 text-gray-400">
                Compare your previous resume with your
                latest version.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="w-fit rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition hover:bg-white/[0.08]"
            >
              ← Back to Dashboard
            </button>

          </div>
        </div>

        {/* Resume Versions */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-gray-500">
              Previous Version
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              {previous.fileName}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {new Date(
                previous.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.05] p-6">
            <p className="text-sm text-purple-300">
              Latest Version
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              {latest.fileName}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {new Date(
                latest.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

        </div>

        {/* Main Metrics */}
        <div className="grid gap-6 md:grid-cols-4 mb-10">

          <MetricCard
            title="ATS Score"
            previous={previous.atsScore}
            latest={latest.atsScore}
            change={changes.atsScore}
          />

          <MetricCard
            title="Job Match"
            previous={previous.matchPercentage}
            latest={latest.matchPercentage}
            change={changes.matchPercentage}
            suffix="%"
          />

          <MetricCard
            title="Total Skills"
            previous={previous.totalSkills}
            latest={latest.totalSkills}
            change={changes.totalSkills}
          />

          <MetricCard
            title="Matched Skills"
            previous={previous.matchedSkills.length}
            latest={latest.matchedSkills.length}
            change={changes.matchedSkills}
          />

        </div>

        {/* Improvement Summary */}
        <section className="rounded-2xl border border-purple-500/20 bg-purple-500/[0.05] p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-purple-400" />

            <h2 className="text-xl font-semibold">
              Improvement Summary
            </h2>
          </div>

          <p className="text-gray-300 leading-relaxed">
            Your ATS score changed from{" "}
            <span className="font-semibold text-white">
              {previous.atsScore}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-green-400">
              {latest.atsScore}
            </span>
            {" "}and your job match changed from{" "}
            <span className="font-semibold text-white">
              {previous.matchPercentage}%
            </span>{" "}
            to{" "}
            <span className="font-semibold text-green-400">
              {latest.matchPercentage}%
            </span>
            .
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-gray-500">
                Skills Added
              </p>

              <p className="mt-2 text-2xl font-bold text-green-400">
                {changes.newSkills.length}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-gray-500">
                Skills Still Missing
              </p>

              <p className="mt-2 text-2xl font-bold text-orange-400">
                {latest.missingSkills.length}
              </p>
            </div>
          </div>
        </section>

        {/* Skill Growth */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-8">

          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-yellow-400" />

            <h2 className="text-xl font-semibold">
              Skill Growth
            </h2>
          </div>

          {changes.newSkills.length > 0 ? (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium text-green-400">
                New Skills Added
              </h3>

              <div className="flex flex-wrap gap-2">
                {changes.newSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-sm text-green-300"
                  >
                    + {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mb-6">
              No new skills detected.
            </p>
          )}

          {changes.removedSkills.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium text-red-400">
                Skills Removed
              </h3>

              <div className="flex flex-wrap gap-2">
                {changes.removedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-sm text-red-300"
                  >
                    - {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

        </section>

        {/* Skill Category Growth */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 mb-8">

          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="text-purple-400" />

            <div>
              <h2 className="text-xl font-semibold">
                Skill Category Growth
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Compare your skills across different categories.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* Technical */}
            <CategoryGrowthCard
              title="Technical"
              previous={previous.skillCategories.technical.length}
              latest={latest.skillCategories.technical.length}
              change={changes.skillCategories.technical}
            />

            {/* Tools */}
            <CategoryGrowthCard
              title="Tools"
              previous={previous.skillCategories.tools.length}
              latest={latest.skillCategories.tools.length}
              change={changes.skillCategories.tools}
            />

            {/* Analytics */}
            <CategoryGrowthCard
              title="Analytics"
              previous={previous.skillCategories.analytics.length}
              latest={latest.skillCategories.analytics.length}
              change={changes.skillCategories.analytics}
            />

            {/* Soft Skills */}
            <CategoryGrowthCard
              title="Soft Skills"
              previous={previous.skillCategories.soft.length}
              latest={latest.skillCategories.soft.length}
              change={changes.skillCategories.soft}
            />

          </div>
        </section>

        {/* Matched / Missing */}
        <div className="grid gap-6 md:grid-cols-2">

          <SkillList
            title="Latest Matched Skills"
            skills={latest.matchedSkills}
            icon={
              <CheckCircle
                size={20}
                className="text-green-400"
              />
            }
          />

          <SkillList
            title="Latest Missing Skills"
            skills={latest.missingSkills}
            icon={
              <Target
                size={20}
                className="text-orange-400"
              />
            }
          />

        </div>

      </div>
    </main>
  );
}

function MetricCard({
  title,
  previous,
  latest,
  change,
  suffix = "",
}: {
  title: string;
  previous: number;
  latest: number;
  change: number;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <div className="mt-3 flex items-end justify-between">

        <div>
          <p className="text-3xl font-bold">
            {latest}
            {suffix}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Previous: {previous}
            {suffix}
          </p>
        </div>

        <ChangeIndicator
          value={change}
          positiveWhenNegative={
            title === "Missing Skills"
          }
        />

      </div>

    </div>
  );
}

function CategoryGrowthCard({
  title,
  previous,
  latest,
  change,
}: {
  title: string;
  previous: number;
  latest: number;
  change: number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <div className="mt-3 flex items-end justify-between">

        <div>
          <p className="text-3xl font-bold">
            {latest}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Previous: {previous}
          </p>
        </div>

        <ChangeIndicator value={change} />

      </div>

    </div>
  );
}

function SkillList({
  title,
  skills,
  icon,
}: {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      <div className="flex items-center gap-3 mb-5">
        {icon}

        <h2 className="font-semibold">
          {title}
        </h2>
      </div>

      {skills.length === 0 ? (
        <p className="text-gray-500">
          None detected.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

    </section>
  );
}