"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  generateResumeSummary,
  generateResumeExperience,
  generateResumeProject,
  generateResumeSkills,
  generateFullResume,
  createResumeDraft,
} from "@/lib/api";

import GeneratedContent from "./GeneratedContent";

type WriterType =
  | "summary"
  | "experience"
  | "project"
  | "skills"
  | "full";

export default function WriterForm() {
  const [type, setType] =
    useState<WriterType>("summary");
  const router = useRouter();

  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [company, setCompany] = useState("");
  const [projectName, setProjectName] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [education, setEducation] = useState("");
  const [projects, setProjects] = useState("");
  const [existingContent, setExistingContent] =
    useState("");

  /*
   * Keep every generated section separately.
   * This prevents saving one section from
   * clearing previously generated sections.
   */
  const [generatedSummary, setGeneratedSummary] =
    useState("");

  const [generatedExperience, setGeneratedExperience] =
    useState("");

  const [generatedProject, setGeneratedProject] =
    useState("");

  const [generatedSkills, setGeneratedSkills] =
    useState("");

  const [generatedFullResume, setGeneratedFullResume] =
    useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!jobRole.trim()) {
      toast.error("Please enter your target job role.");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      let response;

      if (type === "summary") {
        response = await generateResumeSummary({
          jobRole,
          experience,
          skills,
          existingContent,
        });

        const content = response?.data?.content || "";

        setGeneratedSummary(content);
        setResult(content);
      }

      if (type === "experience") {
        response = await generateResumeExperience({
          jobRole,
          company,
          experience,
          skills,
          existingContent,
        });

        const content = response?.data?.content || "";

        setGeneratedExperience(content);
        setResult(content);
      }

      if (type === "project") {
        response = await generateResumeProject({
          projectName,
          technologies,
          description: existingContent,
          jobRole,
        });

        const content = response?.data?.content || "";

        setGeneratedProject(content);
        setResult(content);
      }

      if (type === "skills") {
        response = await generateResumeSkills({
          jobRole,
          existingSkills: skills,
        });

        const content = response?.data?.content || "";

        setGeneratedSkills(content);
        setResult(content);
      }

      if (type === "full") {
        response = await generateFullResume({
          jobRole,
          experience,
          education,
          skills,
          projects,
          existingResume: existingContent,
        });

        const content = response?.data?.content || "";

        setGeneratedFullResume(content);
        setResult(content);
      }

      toast.success("Content generated successfully.");
    } catch (error) {
      console.error("AI resume writer error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate content."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveDraft() {
    /*
     * For a full resume, save the complete generated
     * resume as the main content.
     */
    if (
      type === "full" &&
      !generatedFullResume
    ) {
      toast.error("Generate a full resume first.");
      return;
    }

    /*
     * For individual sections, at least one generated
     * section must exist.
     */
    const hasGeneratedContent =
      generatedSummary ||
      generatedExperience ||
      generatedProject ||
      generatedSkills ||
      generatedFullResume;

    if (!hasGeneratedContent) {
      toast.error("Generate some content first.");
      return;
    }

    try {
      setLoading(true);

      await createResumeDraft({
        title: `${jobRole || "Resume"} Resume`,
        jobRole,

        /*
         * Preserve all previously generated sections.
         */
        summary: generatedSummary,
        experience: generatedExperience,
        projects: generatedProject,
        skills: generatedSkills || skills,
        education,

        /*
         * If a full resume was generated, keep it
         * available in the existing content field.
         */
        existingContent:
          generatedFullResume || existingContent,
      });

      toast.success("Resume draft saved successfully.");

      setTimeout(() => {
        router.push("/drafts");
      }, 500);
    } catch (error) {
      console.error(
        "Save resume draft error:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save resume draft."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleTypeChange(value: WriterType) {
    setType(value);

    /*
     * Show the already-generated content for that
     * section when switching between tabs.
     */
    if (value === "summary") {
      setResult(generatedSummary);
    }

    if (value === "experience") {
      setResult(generatedExperience);
    }

    if (value === "project") {
      setResult(generatedProject);
    }

    if (value === "skills") {
      setResult(generatedSkills);
    }

    if (value === "full") {
      setResult(generatedFullResume);
    }
  }

  function handleResultChange(content: string) {
    setResult(content);

    /*
     * Keep edits synchronized with the correct section.
     */
    if (type === "summary") {
      setGeneratedSummary(content);
    }

    if (type === "experience") {
      setGeneratedExperience(content);
    }

    if (type === "project") {
      setGeneratedProject(content);
    }

    if (type === "skills") {
      setGeneratedSkills(content);
    }

    if (type === "full") {
      setGeneratedFullResume(content);
    }
  }

  return (
    <>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-xl md:p-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["summary", "Professional Summary"],
            ["experience", "Work Experience"],
            ["project", "Project"],
            ["skills", "Skills"],
            ["full", "Full Resume"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() =>
                handleTypeChange(
                  value as WriterType
                )
              }
              className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${type === value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-muted"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Target Job Role
            </label>

            <input
              value={jobRole}
              onChange={(e) =>
                setJobRole(e.target.value)
              }
              placeholder="e.g. Data Analyst"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {type !== "skills" && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                Experience
              </label>

              <input
                value={experience}
                onChange={(e) =>
                  setExperience(e.target.value)
                }
                placeholder="e.g. Fresher / 2 years"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          {(type === "summary" ||
            type === "experience" ||
            type === "skills" ||
            type === "full") && (
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Skills
                </label>

                <input
                  value={skills}
                  onChange={(e) =>
                    setSkills(e.target.value)
                  }
                  placeholder="Python, SQL, Excel, Power BI..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

          {type === "experience" && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                Company
              </label>

              <input
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
                placeholder="Company name"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          {type === "project" && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Project Name
                </label>

                <input
                  value={projectName}
                  onChange={(e) =>
                    setProjectName(e.target.value)
                  }
                  placeholder="Project name"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Technologies
                </label>

                <input
                  value={technologies}
                  onChange={(e) =>
                    setTechnologies(e.target.value)
                  }
                  placeholder="React, Node.js, MongoDB..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </>
          )}

          {type === "full" && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Education
                </label>

                <textarea
                  value={education}
                  onChange={(e) =>
                    setEducation(e.target.value)
                  }
                  rows={3}
                  placeholder="Your education details..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Projects
                </label>

                <textarea
                  value={projects}
                  onChange={(e) =>
                    setProjects(e.target.value)
                  }
                  rows={4}
                  placeholder="Your project details..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </>
          )}

          {type !== "skills" && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                Existing Content
              </label>

              <textarea
                value={existingContent}
                onChange={(e) =>
                  setExistingContent(e.target.value)
                }
                rows={6}
                placeholder="Paste your existing content here..."
                className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : "Generate with AI"}
          </button>
        </div>
      </div>

      {result && (
        <>
          <GeneratedContent
            content={result}
            onChange={handleResultChange}
          />

          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={loading}
            className="mt-4 w-full rounded-xl border border-border px-5 py-3 font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save as Resume Draft
          </button>
        </>
      )}
    </>
  );
}