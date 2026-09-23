"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileText, Target } from "lucide-react";

export default function DashboardPreview() {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        rotate: -1,
      }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl border border-border bg-card p-6 shadow-2xl"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Resume Analysis</h3>

        <CheckCircle2 className="h-6 w-6 text-green-500" />
      </div>

      <div className="mt-8">
        <div className="mb-6 rounded-xl bg-muted p-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />

            <p className="font-semibold">ATS Score</p>
          </div>

          <h2 className="mt-3 text-4xl font-bold">92%</h2>
        </div>

        <div className="rounded-xl bg-muted p-4">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-500" />

            <p className="font-semibold">Missing Skills</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm">
              Docker
            </span>

            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm">
              AWS
            </span>

            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm">
              Kubernetes
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
