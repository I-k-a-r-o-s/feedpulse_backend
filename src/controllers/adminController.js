import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import AdminModel from "../models/adminModel.js";

const oneDay = 24 * 60 * 60 * 1000; //1 day in milliseconds

//cookie options for JWT token
const cookiesOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: oneDay,
};

//set cookie with JWT token
const setCookie = (res, token) => {
  res.cookie("token", token, cookiesOptions);
};

//generate JWT token and set it in the cookie
const generateToken = (res, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  setCookie(res, token);
};

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

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    generateToken(res, { id: admin._id });
    return res.status(200).json({
      success: true,
      message: "Admn Logged In Successfully!",
      admin: {
        email: admin.email,
      },
    });
  } catch (error) {
    console.log("Error in adminLogin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const adminLogOut = async (req, res) => {
  try {
    res.clearCookie("token", cookiesOptions);
    return res.status(200).json({
      success: true,
      message: "Admin Logged Out Successfully!",
    });
  } catch (error) {
    console.log("Error in adminLogout:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
