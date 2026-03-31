import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectMongoDB } from "./config/mongodb.js";
import adminRouter from "./routes/adminRoutes.js";

const server = express();
server.use(express.json());
server.use(cors());

server.use("/api/auth/",adminRouter)//admin router

const port = process.env.PORT;
const startServer = async () => {
  try {
    await connectMongoDB();
    server.listen(port, () => {
      console.log(`Server is running on port:- ${port}`);
    });
  } catch (error) {
    console.error("Error in startServer!:", error);
    process.exit(1);
  }
};

startServer();
