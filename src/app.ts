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

export const app = express();
app.use(generalLimiter);

setupSwagger(app);

app.use("/health", (req, res) =>
  res.status(200).json({ status: "OK Polisha" }),
);

app.use(validateApiKey);
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/", route);

// { ----- Auth Routes (public) ----- } //
app.use("/auth", authLimiter, authRouter);

// { ----- Protected routes (token required) ----- } //
app.use("/users", authenticate, userRouter);
app.use("/postulations", authenticate, postulationRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: error.message });
});
