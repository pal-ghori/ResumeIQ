import express from "express";

import upload from "../middleware/upload.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

import {
    analyzeResume,
    getAnalysisHistory,
    getAnalysisById,
} from "../controllers/analyze.controller.js";

const router = express.Router();

router.post(
    "/",
    protect,
    upload.single("resume"),
    analyzeResume
);

router.get(
    "/history",
    protect,
    getAnalysisHistory
);

router.get(
    "/:id",
    protect,
    getAnalysisById
);

export default router;