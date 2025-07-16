import { iaController } from "./iaController.js";
import express from "express";

export const iaRouter = express.Router();

iaRouter.post("/", iaController);
