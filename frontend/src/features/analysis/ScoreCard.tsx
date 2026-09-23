"use client";

import { motion } from "framer-motion";
import { Award, Target } from "lucide-react";

interface Props {
  title: string;
  score: number;
  type: "ats" | "match";
}

export default function ScoreCard({
  title,
  score,
  type,
}: Props) {
  const Icon = type === "ats" ? Award : Target;

  const status =
    score >= 80
      ? "Excellent"
      : score >= 60
      ? "Good"
      : score >= 40
      ? "Average"
      : "Needs Improvement";

  const gradient =
    type === "ats"
      ? "from-emerald-500 to-green-600"
      : "from-blue-500 to-cyan-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      className={`rounded-3xl bg-gradient-to-br ${gradient} p-8 text-white shadow-xl`}
    >
      <div className="flex items-center gap-3">
        <Icon size={28} />

        <h2 className="text-xl font-semibold">
          {title}
        </h2>
      </div>

      <div className="mt-8 text-center">

        <h1 className="text-6xl font-black">
          {score}%
        </h1>

        <p className="mt-3 text-lg font-medium opacity-90">
          {status}
        </p>

      </div>
    </motion.div>
  );
}