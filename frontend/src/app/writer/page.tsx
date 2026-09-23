"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import WriterForm from "@/features/resume-writer/WriterForm";

export default function WriterPage() {
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
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-sm font-medium text-primary">
            ResumeIQ AI
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            AI Resume Writer
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Create professional, ATS-friendly resume content
            tailored to your target job.
          </p>
        </div>

        <WriterForm />
      </div>
    </main>
  );
}