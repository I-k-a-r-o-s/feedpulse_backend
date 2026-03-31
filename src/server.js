import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());

const port = process.env.PORT;
const startServer = async () => {
  try {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error in startServer!:", error);
    process.exit(1);
  }
};

startServer();
