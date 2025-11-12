import express from "express";
import { createNGO, getNGOs, deleteNGO,getNGOById } from "../controllers/ngoController.js";

const router = express.Router();

router.post("/", createNGO);
router.get("/", getNGOs);
router.delete("/:id", deleteNGO); 
router.get("/:id", getNGOById);

export default router;
