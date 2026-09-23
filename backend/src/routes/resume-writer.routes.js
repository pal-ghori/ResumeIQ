import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  createSummary,
  createExperience,
  createProject,
  createSkills,
  createFullResume,
} from "../controllers/resume-writer.controller.js";

const router = express.Router();

router.post("/summary", protect, createSummary);

router.post("/experience", protect, createExperience);

router.post("/project", protect, createProject);

router.post("/skills", protect, createSkills);

router.post("/full", protect, createFullResume);

export default router;