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

// Configuración de CORS
const corsOptions = {
  origin: [
    `${frontendUrlDevelop1}`,
    `${frontendUrlDevelop2}`,
    `${frontendUrl}`,
    `${frontendUrlWww}`,
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(generalLimiter);

setupSwagger(app);

app.use("/health", (_req, res) =>
  res.status(200).json({ status: "OK Polisha" }),
);

app.use(validateApiKey);
app.use(express.json());
app.use(morgan("dev"));

app.use("/", route);

// { ----- Auth Routes (public) ----- } //
app.use("/auth", authLimiter, authRouter);

// { ----- Protected routes (token required) ----- } //
app.use("/users", authenticate, userRouter);
app.use("/postulations", authenticate, postulationRouter);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: error.message });
});
