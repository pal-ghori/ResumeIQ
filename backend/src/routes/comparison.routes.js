import express from "express";
import { compareAnalyses } from "../controllers/comparison.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, compareAnalyses);

export default router;