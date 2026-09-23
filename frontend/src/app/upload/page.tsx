"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UploadCard from "@/features/upload/UploadCard";
import UploadArea from "@/features/upload/UploadArea";
import UploadedFile from "@/features/upload/UploadedFile";
import AnalyzeButton from "@/features/upload/AnalyzeButton";
import { toast } from "react-toastify";
import {
  analyzeResume,
  getAnalysisById,
} from "@/lib/api";
import { ArrowLeft } from "lucide-react";
import JobDescriptionInput from "@/features/analysis/JobDescriptionInput";
import AnalysisDashboard from "@/features/analysis/AnalysisDashboard";
import type { AnalysisResult } from "@/types/analysis";
import { useAuth } from "@/context/AuthContext";

export default function UploadPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<AnalysisResult | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const searchParams = useSearchParams();
  const improveFrom = searchParams.get("improveFrom");

  useEffect(() => {
    async function loadPreviousAnalysis() {
      if (!improveFrom) {
        return;
      }

      try {
        const response = await getAnalysisById(improveFrom);

        const previousAnalysis = response?.data;

        if (!previousAnalysis) {
          throw new Error("Previous analysis not found.");
        }

        // Keep the same job description for fair comparison
        setJobDescription(
          previousAnalysis.jobDescription || ""
        );

        console.log(
          "Previous analysis loaded:",
          previousAnalysis
        );
      } catch (error) {
        console.error(
          "Failed to load previous analysis:",
          error
        );

        toast.error(
          "Could not load the previous analysis."
        );
      }
    }

    loadPreviousAnalysis();
  }, [improveFrom]);

  // Protect upload page
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please login to analyze your resume.", {
        toastId: "upload-auth-error",
      });

      router.replace("/login");
    }
  }, [authLoading, user, router]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">
          Checking authentication...
        </p>
      </main>
    );
  }

  // Prevent unauthenticated page from rendering
  if (!user) {
    return null;
  }

  function handleFile(file: File) {
    const fileName = file.name.toLowerCase();

    if (
      !fileName.endsWith(".pdf") &&
      !fileName.endsWith(".doc") &&
      !fileName.endsWith(".docx")
    ) {
      toast.error("Only PDF, DOC, or DOCX files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Maximum file size is 5 MB.");
      return;
    }

    setFile(file);
  }

  async function handleAnalyze() {
    if (!file) {
      toast.error("Please upload your resume first.");
      return;
    }

    if (!user) {
      toast.error("Please login to analyze your resume.", {
        toastId: "upload-auth-error",
      });

      router.replace("/login");
      return;
    }

    const selectedFile = file;

    try {
      setLoading(true);

      const response = await analyzeResume(
        file,
        jobDescription,
        improveFrom
      );

      console.log("Analysis response:", response);

      const analysisId = response?.data?.id;

      if (!analysisId) {
        throw new Error(
          "Analysis completed, but no analysis ID was returned."
        );
      }

      toast.success("Resume analyzed successfully!");

      if (improveFrom) {
        router.push(
          `/compare?previousId=${improveFrom}&latestId=${analysisId}`
        );
      } else {
        router.push(`/analysis/${analysisId}`);
      }

    } catch (error) {
      console.error("Resume analysis error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to analyze resume.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <UploadCard>

          {improveFrom && (
            <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <h2 className="font-semibold">
                Improve Your Resume
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Upload your improved resume to compare it with
                your previous analysis.
              </p>
            </div>
          )}

          <UploadArea
            onFileSelect={handleFile}
          />

          {file && (
            <UploadedFile
              file={file}
              onRemove={() => setFile(null)}
            />
          )}

          <JobDescriptionInput
            value={jobDescription}
            onChange={setJobDescription}
          />

          <AnalyzeButton
            disabled={!file || loading}
            loading={loading}
            onClick={handleAnalyze}
          />

          {result && file && (
            <AnalysisDashboard
              file={file}
              result={result}
            />
          )}

        </UploadCard>
      </div>
    </main>
  );
}