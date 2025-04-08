import { Request, Response, NextFunction } from "express";

export const catchAsync = (
  controller: (
    req: Request,
    res: Response,
    next?: NextFunction,
  ) => Promise<any>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res).catch((error) => next(error));
  };
};
