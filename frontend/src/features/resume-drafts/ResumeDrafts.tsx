"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  CalendarDays,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import {
  getResumeDrafts,
  deleteResumeDraft,
} from "@/lib/api";

type ResumeDraft = {
  _id: string;
  title: string;
  jobRole: string;
  summary?: string;
  experience?: string;
  projects?: string;
  skills?: string;
  education?: string;
  createdAt: string;
  updatedAt: string;
};

export default function ResumeDrafts() {
  const router = useRouter();

  const [drafts, setDrafts] = useState<ResumeDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadDrafts() {
    try {
      setLoading(true);

      const response = await getResumeDrafts();

      setDrafts(response.data || []);
    } catch (error) {
      console.error("Failed to load drafts:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load resume drafts."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDrafts();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume draft?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteResumeDraft(id);

      setDrafts((current) =>
        current.filter((draft) => draft._id !== id)
      );

      toast.success("Resume draft deleted.");
    } catch (error) {
      console.error("Failed to delete draft:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete resume draft."
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <section className="mt-12 rounded-2xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Loading resume drafts...
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          Resume Drafts
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your saved AI-generated resume content.
        </p>
      </div>

      {drafts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <FileText className="mx-auto h-10 w-10 text-muted-foreground" />

          <h3 className="mt-4 font-semibold">
            No resume drafts yet
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Generate content with the AI Resume Writer and save it
            as a draft.
          </p>

          <button
            type="button"
            onClick={() => router.push("/writer")}
            className="mt-5 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90"
          >
            Create Resume
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {drafts.map((draft) => (
            <div
              key={draft._id}
              className="rounded-2xl border border-border bg-card p-5 transition hover:border-primary/50"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {draft.title}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {draft.jobRole || "No target role specified"}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />

                      Updated{" "}
                      {new Date(
                        draft.updatedAt || draft.createdAt
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/drafts/${draft._id}`)
                    }
                    className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                  >
                    View
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    disabled={deletingId === draft._id}
                    onClick={() =>
                      handleDelete(draft._id)
                    }
                    className="flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />

                    {deletingId === draft._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}