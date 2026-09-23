import Analysis from "../models/Analysis.js";

export const compareAnalyses = async (req, res) => {
  try {
    const { previousId, latestId } = req.query;

    if (!previousId || !latestId) {
      return res.status(400).json({
        success: false,
        message: "Previous and latest analysis IDs are required.",
      });
    }

    const previous = await Analysis.findOne({
      _id: previousId,
      user: req.user._id,
    });

    const latest = await Analysis.findOne({
      _id: latestId,
      user: req.user._id,
    });

    if (!previous || !latest) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found.",
      });
    }

    // Skill comparison
    const previousSkills = previous.skills || [];
    const latestSkills = latest.skills || [];

    const newSkills = latestSkills.filter(
      (skill) =>
        !previousSkills
          .map((s) => s.toLowerCase())
          .includes(skill.toLowerCase())
    );

    const removedSkills = previousSkills.filter(
      (skill) =>
        !latestSkills
          .map((s) => s.toLowerCase())
          .includes(skill.toLowerCase())
    );

    // Skill categories
    const previousCategories = previous.skillCategories || {
      technical: [],
      tools: [],
      analytics: [],
      soft: [],
    };

    const latestCategories = latest.skillCategories || {
      technical: [],
      tools: [],
      analytics: [],
      soft: [],
    };

    // Comparison result
    const comparison = {
      previous: {
        id: previous._id,
        fileName: previous.fileName,
        atsScore: previous.atsScore,
        matchPercentage: previous.matchPercentage,
        totalSkills: previous.totalSkills,
        matchedSkills: previous.matchedSkills || [],
        missingSkills: previous.missingSkills || [],
        skillCategories: previousCategories,
        createdAt: previous.createdAt,
      },

      latest: {
        id: latest._id,
        fileName: latest.fileName,
        atsScore: latest.atsScore,
        matchPercentage: latest.matchPercentage,
        totalSkills: latest.totalSkills,
        matchedSkills: latest.matchedSkills || [],
        missingSkills: latest.missingSkills || [],
        skillCategories: latestCategories,
        createdAt: latest.createdAt,
      },

      changes: {
        atsScore:
          latest.atsScore - previous.atsScore,

        matchPercentage:
          latest.matchPercentage -
          previous.matchPercentage,

        totalSkills:
          latest.totalSkills -
          previous.totalSkills,

        matchedSkills:
          latest.matchedSkills.length -
          previous.matchedSkills.length,

        missingSkills:
          latest.missingSkills.length -
          previous.missingSkills.length,

        newSkills,
        removedSkills,

        skillCategories: {
          technical:
            latestCategories.technical.length -
            previousCategories.technical.length,

          tools:
            latestCategories.tools.length -
            previousCategories.tools.length,

          analytics:
            latestCategories.analytics.length -
            previousCategories.analytics.length,

          soft:
            latestCategories.soft.length -
            previousCategories.soft.length,
        },
      },
    };

    return res.status(200).json({
      success: true,
      data: comparison,
    });
  } catch (error) {
    console.error(
      "Compare analyses error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to compare analyses.",
    });
  }
};