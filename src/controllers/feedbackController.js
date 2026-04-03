import FeedbackModel from "../models/feedbackModel.js";
import validator from "validator";
import { geminiIntegration } from "../services/geminiServices.js";

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
    
    if (submitterEmail && !validator.isEmail(submitterEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email!",
      });
    }

    //Gemini integration
    let geminiAnalysis = {};
    try {
      geminiAnalysis = await geminiIntegration(title, description);
    } catch (error) {
      console.log("Gemini analysis Error!:");
    }

    await FeedbackModel.create({
      title,
      description,
      category,
      submitterName,
      submitterEmail,
      ai_category: geminiAnalysis.category || null,
      ai_sentiment: geminiAnalysis.sentiment || null,
      ai_priority: geminiAnalysis.priority_score || null,
      ai_summary: geminiAnalysis.summary || null,
      ai_tags: geminiAnalysis.tags || [],
      ai_processed: Object.keys(geminiAnalysis).length > 0,
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
      return res.status(200).json({
        success: false,
        message: "Database is empty!",
      });
    }
    return res.status(200).json({
      success: true,
      message:"All Feedbacks fetched Successfully!",
      allFeedback,
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

export const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status not found!",
      });
    }

    const validStatuses = ["New", "In Review", "Resolved"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status! Allowed values: ${validStatuses.join(", ")}`,
      });
    }

    const feedback = await FeedbackModel.findById(id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found!",
      });
    }

    feedback.status = status;
    await feedback.save();
    return res.status(200).json({
      success: true,
      message: "Status updated successfully!",
      feedback,
    });
  } catch (error) {
    console.error("Error in updateFeedbackStatus!:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await FeedbackModel.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Feedback deleted successfully!",
    });
  } catch (error) {
    console.error("Error in deleteFeedback!:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
