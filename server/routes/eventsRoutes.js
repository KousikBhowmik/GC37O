import { Router } from "express";
import {
  createEventApi,
  deleteEventApi,
  getAllEventsApi,
  updateEventApi,
} from "../controllers/eventsController.js";
import tokenVerification from "../middlewares/tokenVerification.js";

const eventRoutes = Router();

eventRoutes.get("/get", tokenVerification , getAllEventsApi);
eventRoutes.post("/add", tokenVerification, createEventApi);
eventRoutes.put("/update/:eventId", updateEventApi);
eventRoutes.delete("/delete/:eventId", deleteEventApi);

export default eventRoutes;
