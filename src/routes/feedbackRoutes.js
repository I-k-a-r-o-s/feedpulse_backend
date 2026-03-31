import { Router } from "express";
import { addFeedback } from "../controllers/feedbackController.js";

const feedbackRouter=Router()

feedbackRouter.post("/",addFeedback)

export default feedbackRouter