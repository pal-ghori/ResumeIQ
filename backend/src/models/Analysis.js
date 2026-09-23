import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    previousAnalysis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Analysis",
      default: null,
    },

    fileName: {
      type: String,
      required: true,
    },

    atsScore: {
      type: Number,
      required: true,
    },

    matchPercentage: {
      type: Number,
      required: true,
    },

    totalSkills: {
      type: Number,
      default: 0,
    },

    skills: {
      type: [String],
      default: [],
    },

    matchedSkills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    skillCategories: {
      technical: {
        type: [String],
        default: [],
      },

      tools: {
        type: [String],
        default: [],
      },

      soft: {
        type: [String],
        default: [],
      },

      analytics: {
        type: [String],
        default: [],
      },
    },

    improvementRoadmap: [
      {
        skill: {
          type: String,
          required: true,
        },

        category: {
          type: String,
          default: "Technical",
        },

        priority: {
          type: String,
          enum: ["High", "Medium", "Low"],
          default: "Medium",
        },

        why: {
          type: String,
          default: "",
        },

        stages: [
          {
            title: {
              type: String,
              required: true,
            },

            topics: {
              type: [String],
              default: [],
            },
          },
        ],

        howToImprove: {
          type: String,
          default: "",
        },

        resources: {
          type: [String],
          default: [],
        },
      },
    ],

    roadmapProgress: {
      type: Map,
      of: [Boolean],
      default: {},
    },

    feedback: {
      strengths: {
        type: [String],
        default: [],
      },

      improvements: {
        type: [String],
        default: [],
      },
    },

    sections: {
      type: Object,
      default: {},
    },

    jobDescription: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },

);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;