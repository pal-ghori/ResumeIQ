import { extractText } from "../utils/extractText.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    // Extract text from the uploaded resume
    const extractedText = await extractText(
      req.file.path,
      req.file.mimetype
    );

    // Print extracted text in the terminal
    console.log("========== EXTRACTED RESUME TEXT ==========");
    console.log(extractedText);
    console.log("==========================================");

    res.status(200).json({
      success: true,
      message: "Resume uploaded and text extracted successfully.",
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: req.file.path,
      },
      extractedText,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};