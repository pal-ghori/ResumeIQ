import Analysis from "../models/Analysis.js";

export const getAnalysisHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .select(
        "fileName atsScore matchPercentage totalSkills skills matchedSkills missingSkills feedback sections jobDescription createdAt"
      );

    res.status(200).json({
      success: true,
      data: analyses,
    });
  } catch (error) {
    console.error("History error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analysis history.",
    });
  }
};