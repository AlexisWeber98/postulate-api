import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import route from "./routes/index.routes.js";
import { setupSwagger } from "./config/swagger.js";

export const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/", route);
app.use("/health", (req, res) =>
  res.status(200).json({ status: "OK Polisha" }),
);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: error.message });
});
setupSwagger(app);
