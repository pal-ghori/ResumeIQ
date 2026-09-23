import {
  generateSummary,
  generateExperience,
  generateProject,
  generateSkills,
  generateFullResume,
} from "../services/resume-writer.service.js";

export const createSummary = async (req, res) => {
  try {
    const result = await generateSummary(req.body);

    res.status(200).json({
      success: true,
      data: {
        content: result,
      },
    });
  } catch (error) {
    console.error("Generate summary error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate summary.",
    });
  }
};

export const createExperience = async (req, res) => {
  try {
    const result = await generateExperience(req.body);

    res.status(200).json({
      success: true,
      data: {
        content: result,
      },
    });
  } catch (error) {
    console.error("Generate experience error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate experience.",
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const result = await generateProject(req.body);

    res.status(200).json({
      success: true,
      data: {
        content: result,
      },
    });
  } catch (error) {
    console.error("Generate project error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate project description.",
    });
  }
};

export const createSkills = async (req, res) => {
  try {
    const result = await generateSkills(req.body);

    res.status(200).json({
      success: true,
      data: {
        content: result,
      },
    });
  } catch (error) {
    console.error("Generate skills error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate skills.",
    });
  }
};

export const createFullResume = async (req, res) => {
  try {
    const result = await generateFullResume(req.body);

    res.status(200).json({
      success: true,
      data: {
        content: result,
      },
    });
  } catch (error) {
    console.error("Generate full resume error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate resume.",
    });
  }
};