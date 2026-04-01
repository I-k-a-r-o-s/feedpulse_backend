import { Router } from "express";
import {
  addFeedback,
  getAllFeedback,
  getOneFeedback,
  updateFeedbackStatus,
} from "../controllers/feedbackController.js";
import { verifyAdminToken } from "../controllers/adminController.js";

const feedbackRouter = Router();

feedbackRouter.post("/", addFeedback);
feedbackRouter.get("/", verifyAdminToken, getAllFeedback);
feedbackRouter.get("/:id", getOneFeedback);
feedbackRouter.patch("/:id", verifyAdminToken, updateFeedbackStatus);

export default feedbackRouter;
