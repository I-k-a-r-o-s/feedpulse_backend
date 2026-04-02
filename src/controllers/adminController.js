import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import AdminModel from "../models/adminModel.js";

export const adminRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Fields!",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(409).json({
        success: false,
        message: "Invalid Email Format!",
      });
    }

    const checkExisting = await AdminModel.findOne({ email });
    if (checkExisting) {
      return res.status(409).json({
        success: false,
        message: "Admin Already Exists!",
      });
    }

    //hash the password before saving to database
    const passwordHash = await bcrypt.hash(password, 10);
    await AdminModel.create({
      email,
      password: passwordHash,
    });
    return res.status(201).json({
      success: true,
      message: "Admin Registered Successfully!",
    });
  } catch (error) {
    console.log("Error in adminRegister:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
  } catch (error) {}
};
{
  /**export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Fields!",
      });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    // Generate and send JWT token to frontend
    const token = createToken(email);
    return res.status(200).json({
      success: true,
      message: "Admin Login Successful!",
      token,
    });
  } catch (error) {
    console.log("Error in adminLogin!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const verifyAdminToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token Provided!",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid or Expired Token!",
        });
      }
      req.admin = decoded;
      next();
    });
  } catch (error) {
    console.log("Error in verifyAdminToken!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
}; */
}
