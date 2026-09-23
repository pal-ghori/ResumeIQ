import Analysis from "../models/Analysis.js";

export const getAnalysisHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: analyses,
    });
  } catch (error) {
    console.error("Get analysis history error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analysis history.",
    });
  }
};

export const getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error("Get analysis by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analysis.",
    });
  }
};