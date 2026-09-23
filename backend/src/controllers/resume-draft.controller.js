import ResumeDraft from "../models/ResumeDraft.js";

export const createDraft = async (req, res) => {
  try {
    const draft = await ResumeDraft.create({
      user: req.user._id,
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      message: "Resume draft saved successfully.",
      data: draft,
    });
  } catch (error) {
    console.error("Create resume draft error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save resume draft.",
    });
  }
};

export const getDrafts = async (req, res) => {
  try {
    const drafts = await ResumeDraft.find({
      user: req.user._id,
    }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: drafts,
    });
  } catch (error) {
    console.error("Get resume drafts error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume drafts.",
    });
  }
};

export const getDraftById = async (req, res) => {
  try {
    const draft = await ResumeDraft.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: "Resume draft not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: draft,
    });
  } catch (error) {
    console.error("Get resume draft error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume draft.",
    });
  }
};

export const updateDraft = async (req, res) => {
  try {
    const draft = await ResumeDraft.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: "Resume draft not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume draft updated successfully.",
      data: draft,
    });
  } catch (error) {
    console.error("Update resume draft error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update resume draft.",
    });
  }
};

export const deleteDraft = async (req, res) => {
  try {
    const draft = await ResumeDraft.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: "Resume draft not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume draft deleted successfully.",
    });
  } catch (error) {
    console.error("Delete resume draft error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resume draft.",
    });
  }
};