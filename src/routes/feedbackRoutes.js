import { Router } from "express";
import {
  addFeedback,
  deleteFeedback,
  getAllFeedback,
  getOneFeedback,
  updateFeedbackStatus,
} from "../controllers/feedbackController.js";
import { protectedRoute } from "../middleware/authMiddleware.js";
const feedbackRouter = Router();

feedbackRouter.post("/", addFeedback);
feedbackRouter.get("/", protectedRoute, getAllFeedback);
feedbackRouter.get("/:id", getOneFeedback);
feedbackRouter.patch("/:id", protectedRoute, updateFeedbackStatus);
feedbackRouter.delete("/:id", protectedRoute, deleteFeedback);

export default feedbackRouter;
