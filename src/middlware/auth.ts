import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { AuthenticationError } from "../utils/errors.js";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthenticationError("No token provided");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new AuthenticationError("Invalid token format");
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    // Nota: Los tests fallan porque el bloque `catch` no está diferenciando correctamente entre errores personalizados (`AuthenticationError`) y otros errores.
    // Esto provoca que todos los errores devuelvan el mensaje "Invalid token" en lugar de los mensajes específicos esperados en los tests.
    if (error instanceof AuthenticationError) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  }
};
