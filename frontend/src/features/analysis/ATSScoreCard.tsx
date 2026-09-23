"use client";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  score: number;
};

export default function ATSScoreCard({
  score,
}: Props) {
  const getColor = () => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#facc15";
    return "#ef4444";
  };

  const getLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <h2 className="mb-8 text-center text-2xl font-bold">
        ATS Score
      </h2>

      <div className="mx-auto h-52 w-52">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            pathColor: getColor(),
            textColor: getColor(),
            trailColor: "#e5e7eb",
            strokeLinecap: "round",
          })}
        />
      </div>

      <p className="mt-8 text-center text-xl font-semibold">
        {getLabel()}
      </p>
    </div>
  );
}