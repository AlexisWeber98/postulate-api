import express from "express";
import { whiteListController } from "./emailController.js";

export const emailRouter = express.Router();

emailRouter.post("/whiteList", whiteListController);
