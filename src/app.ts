import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import route from "./routes/index.routes.js";
import { setupSwagger } from "./config/swagger.js";
import { validateApiKey } from "./middlware/validateApiKey.js";
import { authenticate } from "./middlware/auth.js";
import { generalLimiter, authLimiter } from "./middlware/rateLimit.js";
import { userRouter } from "./modules/users/userRoutes.js";
import { authRouter } from "./modules/users/authRoutes.js";
import { postulationRouter } from "./modules/postulations/postulationRoutes.js";

import {
  frontendUrl,
  frontendUrlWww,
  frontendUrlDevelop1,
  frontendUrlDevelop2,
} from "./config/config.js";

export const app = express();

const corsOptions = {
  origin: [
    frontendUrl,
    frontendUrlWww,
    frontendUrlDevelop1,
    frontendUrlDevelop2,
  ].filter(Boolean) as string[],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  exposedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

setupSwagger(app);

app.use("/health", (_req, res) =>
  res.status(200).json({ status: "OK Polisha" }),
);

app.use("/auth", authLimiter, authRouter);

app.use("/", generalLimiter, route);

app.use("/users", validateApiKey, authenticate, userRouter);
app.use("/postulations", validateApiKey, authenticate, postulationRouter);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: error.message });
});
