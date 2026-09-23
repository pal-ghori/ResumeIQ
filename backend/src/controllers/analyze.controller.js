import { extractText } from "../utils/extractText.js";
import { cleanText } from "../utils/cleanText.js";
import { extractSkills } from "../services/skillExtractor.js";
import { calculateAdvancedATS } from "../services/atsCalculator.js";
import { matchJobSkills } from "../services/jobMatcher.js";
import { generateResumeFeedback } from "../services/resumeFeedback.js";
import { analyzeSections } from "../services/sectionAnalyzer.js";
import Analysis from "../models/Analysis.js";
import { categorizeSkills }
  from "../services/skillCategorizer.js";

import { generateRoadmap }
  from "../services/improvementRoadmap.js";

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded.",
      });
    }

    const {
      jobDescription = "",
      previousAnalysis = null,
    } = req.body;

    console.log("========== JOB DESCRIPTION ==========");
    console.log(jobDescription);
    console.log("=====================================");

    // Step 1: Extract text
    const extractedText = await extractText(
      req.file.path,
      req.file.mimetype
    );

    // Step 2: Clean text
    const cleanedText = cleanText(extractedText);

    // Step 3: Analyze sections
    const sections = analyzeSections(cleanedText);

    // Step 4: Extract resume skills
    const skills = extractSkills(cleanedText);

    const skillCategories =
      categorizeSkills(skills);

    // Step 5: Extract job skills
    const jobSkills = extractSkills(jobDescription);

    // Step 6: Compare skills
    const comparison = matchJobSkills(
      skills,
      jobSkills
    );

    // Step 7: Calculate ATS score
    const atsScore = calculateAdvancedATS({
      resumeText: extractedText,
      skills,
      matchPercentage: comparison.matchPercentage,
    });

    // Step 8: Generate feedback
    const feedback = generateResumeFeedback({
      skills,
      matchedSkills: comparison.matchedSkills,
      missingSkills: comparison.missingSkills,
      resumeText: extractedText,
    });

    const improvementRoadmap =
      generateRoadmap(
        comparison.missingSkills
      );

    // Step 9: Save analysis
    const savedAnalysis = await Analysis.create({
      user: req.user._id,
      previousAnalysis,
      fileName: req.file.originalname,
      atsScore,
      matchPercentage: comparison.matchPercentage,
      totalSkills: skills.length,
      skills,
      matchedSkills: comparison.matchedSkills,
      missingSkills: comparison.missingSkills,
      feedback,
      sections,
      skillCategories,
      improvementRoadmap,
      jobDescription,
    });

    console.log(
      "Analysis saved:",
      savedAnalysis._id
    );

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      data: {
        id: savedAnalysis._id,
        atsScore,
        extractedText,
        sections,
        skills,
        totalSkills: skills.length,
        jobSkills,
        matchedSkills: comparison.matchedSkills,
        missingSkills: comparison.missingSkills,
        matchPercentage: comparison.matchPercentage,
        feedback,
        skillCategories,
        improvementRoadmap,
      },
    });
  } catch (error) {
    console.error("Resume analysis error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET USER ANALYSIS HISTORY
export const getAnalysisHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: analyses,
    });
  } catch (error) {
    console.error(
      "Get analysis history error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch analysis history.",
    });
  }
};


// GET SINGLE ANALYSIS
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

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error(
      "Get analysis error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch analysis.",
    });
  }
};