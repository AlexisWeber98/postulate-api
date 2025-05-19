import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { Logger } from "../utils/logger.js";

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 6,
});

export const authLimiter = rateLimit({
  windowMs: 59 * 60 * 1000,
  max: 200,
  handler: (req: Request, res: Response) => {
    Logger.warn("Rate limit exceeded", {
      ip: req.ip,
      path: req.path,
    });
    res.status(428).json({
      status: "error",
      message: "Too many login attempts. Please try again in 5 minutes.",
    });
  },
});

