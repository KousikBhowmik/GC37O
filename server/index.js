import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";
import connectDB from "./configs/mongoDB.js";
import morganMiddleware from "./middlewares/morganMiddleware.js";
import logger from "./logs/logger.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ****************** Middlewares ********************
app.use(
  cors({
    // @ts-ignore
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
// @ts-ignore
app.use(cookieParser());
app.use(morganMiddleware);
app.use(express.json());

// ************** DB connection ****************
await connectDB();

// *************** Routes *********************
app.get("/", (_, res) => {
  res.send("server is running!");
});
app.use("/api/authentication", authRouter);

// **************** Server starting ***************
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  logger.info(`Server is running on ${PORT}`);
});
