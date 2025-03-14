import { Router } from "express";
import {
  createEventApi,
  deleteEventApi,
  getAllEventsApi,
} from "../controllers/eventsController.js";

const eventRoutes = Router();

eventRoutes.get("/get-events", getAllEventsApi);
eventRoutes.post("/add-event", createEventApi);
eventRoutes.post("/update-event", createEventApi);
eventRoutes.delete("/update-event", deleteEventApi);

export default eventRoutes;
