import Analysis from "../models/Analysis.js";

export const updateRoadmapProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill, completedStages } = req.body;

    if (!skill || !Array.isArray(completedStages)) {
      return res.status(400).json({
        success: false,
        message: "Skill and completedStages are required.",
      });
    }

    const analysis = await Analysis.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found.",
      });
    }

    analysis.roadmapProgress.set(
      skill,
      completedStages
    );

    await analysis.save();

    return res.status(200).json({
      success: true,
      message: "Roadmap progress updated successfully.",
      data: Object.fromEntries(analysis.roadmapProgress),
    });
  } catch (error) {
    console.error(
      "Update roadmap progress error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update roadmap progress.",
    });
  }
};