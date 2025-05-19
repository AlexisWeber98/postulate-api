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
    if (error instanceof AuthenticationError) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  }
};
