import { Router } from "express";
import {
  addFeedback,
  getAllFeedback,
  getOneFeedback,
} from "../controllers/feedbackController.js";
import { verifyAdminToken } from "../controllers/adminController.js";

const feedbackRouter = Router();

feedbackRouter.post("/", addFeedback);
feedbackRouter.get("/",verifyAdminToken, getAllFeedback);
feedbackRouter.get("/:id",getOneFeedback)

export default feedbackRouter;
