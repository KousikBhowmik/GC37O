import { Router } from "express";
import {
  createTaskApi,
  deleteTaskApi,
  getAllTasksApi,
  statusUpdateApi,
  updateTaskApi,
} from "../controllers/tasksController.js";

const taskRoutes = Router();

taskRoutes.get("/get-tasks", getAllTasksApi);
taskRoutes.post("/add-task", createTaskApi);
taskRoutes.post("/update-task", updateTaskApi);
taskRoutes.post("/status-update", statusUpdateApi);
taskRoutes.delete("/update-task", deleteTaskApi);

export default taskRoutes;
