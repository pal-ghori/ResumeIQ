import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import Analysis from "../models/Analysis.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const analyses = await Analysis.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .select(
        "fileName atsScore matchPercentage totalSkills matchedSkills missingSkills createdAt"
      );

    res.status(200).json({
      success: true,
      data: analyses,
    });
  } catch (error) {
    console.error("Analysis history error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analysis history.",
    });
  }
});

export default router;