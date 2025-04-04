import express from "express";
import morgan from "morgan";
import cors from "cors";
import route from "./routes/index.routes.js";
import { setupSwagger } from "./config/swagger.js";

export const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/", route);

setupSwagger(app);
