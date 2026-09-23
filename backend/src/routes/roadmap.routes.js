import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { updateRoadmapProgress } from "../controllers/roadmap.controller.js";

const router = express.Router();

router.put(
  "/:id/progress",
  protect,
  updateRoadmapProgress
);

export default router;