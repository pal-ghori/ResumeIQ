"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ResumeDrafts from "@/features/resume-drafts/ResumeDrafts";

export default function DraftsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">
          Checking authentication...
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
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
        <div className="mb-10">
          <p className="text-sm font-medium text-primary">
            ResumeIQ
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            My Resume Drafts
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            View and manage your saved resume drafts.
          </p>
        </div>

        <ResumeDrafts />
      </div>
    </main>
  );
}