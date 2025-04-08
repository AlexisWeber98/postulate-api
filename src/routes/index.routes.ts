import express from "express";
import { userRouter } from "../modules/users/userRoutes.js";
import { postulationRouter } from "../modules/postulations/postulationRoutes.js";

const router = express.Router();

// Rutas de usuarios
router.use("/users", userRouter);

// Rutas de postulaciones
router.use("/postulations", postulationRouter);

export default router;
