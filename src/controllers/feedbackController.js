import FeedbackModel from "../models/feedbackModel.js";
import validator from "validator";

export const addFeedback = async (req, res) => {
  try {
    const { title, description, category, submitterName, submitterEmail } =
      req.body;
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields!",
      });
    }
    if (!validator.isEmail(submitterEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please Enter a Valid Email!",
      });
    }

    await FeedbackModel.create({
      title,
      description,
      category,
      submitterName,
      submitterEmail,
    });

    return res.status(201).json({
      success: true,
      message: "Feedback created successfully!",
    });
  } catch (error) {
    console.error("Error in addFeedback!:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
