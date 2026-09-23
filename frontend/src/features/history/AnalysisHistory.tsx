"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { getAnalysisHistory } from "@/lib/api";
import { useRouter } from "next/navigation";
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
};

export default function AnalysisHistory() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) {
      return;
    }

    async function loadHistory() {
      try {
        setLoading(true);

        const response = await getAnalysisHistory();

        setAnalyses(response.data || []);
      } catch (error) {
        console.error(
          "Failed to load history:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [authLoading, user]);

  if (authLoading || loading) {
    return (
      <div className="mt-12 rounded-2xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Loading analysis history...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          Analysis History
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          View your previous resume analyses.
        </p>
      </div>

      {analyses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <FileText className="mx-auto h-10 w-10 text-muted-foreground" />

          <h3 className="mt-4 font-semibold">
            No analyses yet
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Upload your resume to create your first analysis.
          </p>
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

                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />

                      {new Date(
                        analysis.createdAt
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-center">

                  <div>
                    <p className="text-xl font-bold">
                      {analysis.atsScore}%
                    </p>

                    <p className="text-xs text-muted-foreground">
                      ATS Score
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-bold">
                      {analysis.matchPercentage}%
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Job Match
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

                </div>

                <button
                  onClick={() =>
                    router.push(`/analysis/${analysis._id}`)
                  }
                  className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                >
                  View
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}