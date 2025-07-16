import { catchAsync } from "../../utils/catchAsync.js";
import { Request, Response } from "express";
import { iaRequest } from "./iaRequest.js";
import serverResponse from "../../utils/response.js";

export const iaController = catchAsync(async (req: Request, res: Response) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    throw new Error("Invalid prompt provided or no prompt request");
  }

  const iaResponse = await iaRequest(prompt);
  res.status(200).json(serverResponse("Ok", { iaResponse }));
});
