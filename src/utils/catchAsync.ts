import { Request, Response, NextFunction } from "express";
import { CustomError } from "./errors.js";

export const catchAsync = (
  controller: (
    req: Request,
    res: Response,
    next?: NextFunction,
  ) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res).catch((error) => {
      if (error instanceof CustomError) {
        return res.status(error.status).json({
          status: 'error',
          message: error.message,
          code: error.code
        });
      }
      next(error);
    });
  };
};
