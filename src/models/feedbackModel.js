import mongoose from "mongoose";
import { isEmail } from "validator";

const feedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },
    category: {
      type: String,
      enum: ["Bug", "Feature Request", "Improvement", "Other"],
      required: true,
      default: "Other",
    },
    status: {
      type: String,
      enum: ["New", "In Review", "Resolved"],
      default: "New",
      index: true,
    },
    submitterName: {
      type: String,
      trim: true,
      default: "",
    },
    submitterEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      validate: [isEmail(), "Invalid Email"],
    },

    // AI fields
    ai_category: {
      type: String,
      enum: ["Bug", "Feature Request", "Improvement", "Other"],
      default: "",
      index: true,
    },
    ai_sentiment: {
      type: String,
      enum: ["Positive", "Neutral", "Negative"],
      default: "",
    },
    ai_priority: {
      type: Number,
      min: 1,
      max: 10,
      default: null,
      index: true,
    },
    ai_summary: {
      type: String,
      default: "",
    },
    ai_tags: {
      type: [String],
      default: [],
    },
    ai_processed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

feedbackSchema.index({ status: 1, category: 1 });
feedbackSchema.index({ createdAt: -1 });
feedbackSchema.index({ ai_priority: -1 });

const FeedbackModel = mongoose.model("FeedbackModel", feedbackSchema);
export default FeedbackModel;
