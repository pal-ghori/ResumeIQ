"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, FileText } from "lucide-react";
import { toast } from "react-toastify";

import {
  getResumeDraftById,
  updateResumeDraft,
} from "@/lib/api";

type Draft = {
  _id: string;
  title: string;
  jobRole: string;
  summary?: string;
  experience?: string;
  projects?: string;
  skills?: string;
  education?: string;
};

export default function DraftDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadDraft() {
      try {
        const response = await getResumeDraftById(id);
        setDraft(response.data);
      } catch (error) {
        console.error("Failed to load draft:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load resume draft."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadDraft();
    }
  }, [id]);

  function updateField(
    field: keyof Draft,
    value: string
  ) {
    setDraft((current) =>
      current
        ? {
            ...current,
            [field]: value,
          }
        : current
    );
  }

  async function handleSave() {
    if (!draft) return;

    try {
      setSaving(true);

      await updateResumeDraft(id, {
        title: draft.title,
        jobRole: draft.jobRole,
        summary: draft.summary || "",
        experience: draft.experience || "",
        projects: draft.projects || "",
        skills: draft.skills || "",
        education: draft.education || "",
      });

      toast.success("Resume draft updated successfully.");
    } catch (error) {
      console.error("Failed to update draft:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update resume draft."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">
          Loading resume draft...
        </p>
      </main>
    );
  }

  if (!draft) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />

          <h1 className="mt-4 text-2xl font-bold">
            Resume draft not found
          </h1>

          <button
            type="button"
            onClick={() => router.push("/drafts")}
            className="mt-6 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground"
          >
            Back to Drafts
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl">

        <button
          type="button"
          onClick={() => router.push("/drafts")}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Drafts
        </button>

        <div className="mb-8">
          <p className="text-sm font-medium text-primary">
            ResumeIQ
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Edit Resume Draft
          </h1>

          <p className="mt-2 text-muted-foreground">
            Review and edit your AI-generated resume content.
          </p>
        </div>

        <div className="space-y-6">

          {/* Basic Information */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Basic Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Resume Title
                </label>

                <input
                  value={draft.title}
                  onChange={(e) =>
                    updateField("title", e.target.value)
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Target Job Role
                </label>

                <input
                  value={draft.jobRole}
                  onChange={(e) =>
                    updateField("jobRole", e.target.value)
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

            </div>
          </section>

          {/* Professional Summary */}
          <EditorSection
            title="Professional Summary"
            value={draft.summary || ""}
            onChange={(value) =>
              updateField("summary", value)
            }
          />

          {/* Experience */}
          <EditorSection
            title="Work Experience"
            value={draft.experience || ""}
            onChange={(value) =>
              updateField("experience", value)
            }
          />

          {/* Projects */}
          <EditorSection
            title="Projects"
            value={draft.projects || ""}
            onChange={(value) =>
              updateField("projects", value)
            }
          />

          {/* Skills */}
          <EditorSection
            title="Skills"
            value={draft.skills || ""}
            onChange={(value) =>
              updateField("skills", value)
            }
          />

          {/* Education */}
          <EditorSection
            title="Education"
            value={draft.education || ""}
            onChange={(value) =>
              updateField("education", value)
            }
          />

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-5 w-5" />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>
      </div>
    </main>
  );
}

function EditorSection({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">
        {title}
      </h2>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        placeholder={`Enter ${title.toLowerCase()}...`}
        className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 leading-relaxed outline-none focus:ring-2 focus:ring-primary"
      />
    </section>
  );
}