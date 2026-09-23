import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  createDraft,
  getDrafts,
  getDraftById,
  updateDraft,
  deleteDraft,
} from "../controllers/resume-draft.controller.js";

const router = express.Router();

router.post("/", protect, createDraft);

router.get("/", protect, getDrafts);

router.get("/:id", protect, getDraftById);

router.put("/:id", protect, updateDraft);

router.delete("/:id", protect, deleteDraft);

export default router;