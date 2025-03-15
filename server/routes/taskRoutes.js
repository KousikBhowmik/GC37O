import { Router } from "express";
import {
  createTaskApi,
  deleteTaskApi,
  getAllTasksApi,
  updateTaskApi,
} from "../controllers/tasksController.js";
import tokenVerification from "../middlewares/tokenVerification.js";

const taskRoutes = Router();

taskRoutes.get("/get", tokenVerification, getAllTasksApi);
taskRoutes.post("/add", tokenVerification,  createTaskApi);
taskRoutes.put("/update/:taskId", updateTaskApi);
taskRoutes.delete("/delete/:taskId", deleteTaskApi);

export default taskRoutes;
