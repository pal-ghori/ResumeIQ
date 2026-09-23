"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "95%",
    label: "ATS Accuracy",
  },
  {
    value: "10K+",
    label: "Resumes Analyzed",
  },
  {
    value: "500+",
    label: "Skills Tracked",
  },
];

export default function HeroStats() {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        duration: 0.2,
      }}
      className="mt-12 grid grid-cols-3 gap-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-card p-4 text-center"
        >
          <h3 className="text-2xl font-bold text-blue-500">{stat.value}</h3>

          <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </motion.div>
  );
}
