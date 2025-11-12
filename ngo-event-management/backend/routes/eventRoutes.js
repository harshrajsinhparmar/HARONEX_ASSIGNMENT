import express from "express";
import { createEvent, getEvents, getEventById, deleteEvent } from "../controllers/eventController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.delete("/:id", deleteEvent); // 🧨 Added delete route

export default router;
