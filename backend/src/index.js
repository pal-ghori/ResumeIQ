import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import uploadRoutes from "./routes/upload.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import authRoutes from "./routes/auth.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";
import resumeWriterRoutes from "./routes/resume-writer.routes.js";
import resumeDraftRoutes from "./routes/resume-draft.routes.js";
import comparisonRoutes from "./routes/comparison.routes.js";
import roadmapRoutes from "./routes/roadmap.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResumeIQ Backend Running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/resume-writer", resumeWriterRoutes);
app.use("/api/resume-drafts", resumeDraftRoutes);
app.use("/api/compare", comparisonRoutes);
app.use("/api/roadmap", roadmapRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
};

startServer();