import { Request, Response, NextFunction } from "express";
import { AuthenticationError, CustomError } from "../utils/errors.js";
import { Logger } from "../utils/logger.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Logger.error("Error en la aplicación", err, {
    path: req.path,
    method: req.method,
    body: req.body,
  });

  if (err instanceof CustomError || err instanceof AuthenticationError) {
    return res.status(err.status).json({
      status: "error",
      code: err.code,
      message: err.message,
    });
  }

  // Para errores de Sequelize
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      status: "error",
      code: "VALIDATION_ERROR",
      message: "Error de validación en la base de datos",
    });
  }

  return res.status(500).json({
    status: "error",
    code: "INTERNAL_SERVER_ERROR",
    message: "Error interno del servidor",
  });
};
