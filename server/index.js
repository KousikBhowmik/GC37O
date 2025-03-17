import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";
import connectDB from "./configs/mongoDB.js";
import authRouter from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import eventRoutes from "./routes/eventsRoutes.js";

dotenv.config();

const app = express();

// -------------------- Middlewares ----------------------
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
app.use(express.json());

// ------------------ Fibre Base connection -------------------

// @ts-ignore
const serviceAccount = JSON.parse(process.env.FB_SDK_SECRET);

admin.initializeApp({
  credential: admin.credential.cert({
    ...serviceAccount,
    privateKey: serviceAccount.private_key.replace(/\\n/g, "\n"),
  }),
});

admin
  .auth()
  .listUsers(1) //-------------- Fetching 1 user for test ------------------
  .then(() => {
    console.log("Firebase connected successfully!");
  })
  .catch((error) => {
    console.error("Firebase didn't connect: ", error);
  });

// ------------------ DB connection -------------------

await connectDB();

// -------------------- Routes -------------------------

app.get("/", (_, res) => {
  res.send("server is running on !");
});
app.use("/api/authentication", authRouter);
app.use("/api/tasks", taskRoutes);
app.use("/api/events", eventRoutes);

// ----------------- Server starting ------------------

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;
