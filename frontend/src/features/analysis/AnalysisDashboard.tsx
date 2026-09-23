import ScoreCard from "./ScoreCard";
import SkillsList from "./SkillsList";
import ResumeOverview from "./ResumeOverview";
import FeedbackCard from "./FeedbackCard";
import ResumeStructure from "./ResumeStructure";

import type { AnalysisResult } from "@/types/analysis";

type Props = {
  file: File;
  result: AnalysisResult;
};

export default function AnalysisDashboard({
  file,
  result,
}: Props) {
  return (
    <div className="mt-10 space-y-8">

      <ResumeOverview
        fileName={file.name}
        fileSize={file.size}
        totalSkills={result.totalSkills}
      />

      <ResumeStructure
  sections={result.sections}
/>

      <div className="grid gap-6 md:grid-cols-2">

        <ScoreCard
          title="ATS Score"
          score={result.atsScore}
          type="ats"
        />

        <ScoreCard
          title="Job Match"
          score={result.matchPercentage}
          type="match"
        />

      </div>

      <FeedbackCard
        strengths={result.feedback.strengths}
        improvements={result.feedback.improvements}
      />

      <SkillsList
        title="Matched Skills"
        skills={result.matchedSkills}
      />

      <SkillsList
        title="Missing Skills"
        skills={result.missingSkills}
      />

      <SkillsList
        title="Resume Skills"
        skills={result.skills}
      />

    </div>
  );
}