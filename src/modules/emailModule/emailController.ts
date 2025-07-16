import { catchAsync } from "../../utils/catchAsync.js";
import { Request, Response } from "express";
import serverResponse from "../../utils/response.js";
import { whiteListService } from "./emailService.js";
import { ValidationError } from "../../utils/errors.js";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const whiteListController = catchAsync(
  async (req: Request, res: Response) => {
    const email = req.body.email;

    if (!email || typeof email !== "string" || !isValidEmail(email))
      throw new ValidationError("Invalid email provided or no email request");

    const data = await whiteListService(email);

    if (!data) throw new Error("Email not whitelisted");

    return res.status(200).json(serverResponse("Ok", { data }));
  },
);
