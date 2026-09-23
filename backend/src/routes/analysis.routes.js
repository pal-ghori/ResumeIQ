import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getAnalysisHistory,
  getAnalysisById,
} from "../controllers/analysis.controller.js";

const router = express.Router();

router.get("/", protect, getAnalysisHistory);

router.get("/:id", protect, getAnalysisById);

export default router;