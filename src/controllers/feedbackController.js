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
        message: "Please enter a valid email!",
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

export const getAllFeedback = async (req, res) => {
  try {
    const allFeedback = await FeedbackModel.find();
    if (!allFeedback || allFeedback.length === 0) {
      return res.status(204).json({
        success: false,
        message: "Database is empty!",
      });
    }
    return res.status(200).json({
      success: true,
      data: allFeedback,
    });
  } catch (error) {
    console.error("Error in getAllFeedback!:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getOneFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await FeedbackModel.findById(id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Feedback retrieved successfully!",
      feedback,
    });
  } catch (error) {
    console.error("Error in getOneFeedback!:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updateFeedback = async (req, res) => {};
export const deleteFeedback = async (req, res) => {};
