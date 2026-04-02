import { Router } from "express";
import {  adminLogin, adminLogOut, adminRegister } from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/register", adminRegister);
adminRouter.post("/login", adminLogin);
adminRouter.post("/logout",adminLogOut)

export default adminRouter;
