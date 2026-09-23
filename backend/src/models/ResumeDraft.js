import mongoose from "mongoose";

const resumeDraftSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "Untitled Resume",
      trim: true,
    },

    jobRole: {
      type: String,
      default: "",
      trim: true,
    },

    summary: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    projects: {
      type: String,
      default: "",
    },

    skills: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const ResumeDraft = mongoose.model(
  "ResumeDraft",
  resumeDraftSchema
);

export default ResumeDraft;