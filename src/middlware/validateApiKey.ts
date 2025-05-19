import { NextFunction, Request, Response } from "express";

export const validateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ message: "API Key not found" });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "Invalid API Key" });
  }

  next();
};

