import ATSScoreCard from "./ATSScoreCard";
import SkillsCard from "./SkillsCard";

type Props = {
  result: {
    atsScore: number;
    skills: string[];
    totalSkills: number;
  };
};

export default function AnalysisResult({
  result,
}: Props) {
  return (
    <div className="mt-10 space-y-8">

      <ATSScoreCard score={result.atsScore} />

      <SkillsCard skills={result.skills} />

    </div>
  );
}