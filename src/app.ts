import express from "express";
import morgan from "morgan";
import cors from "cors";
import route from "./routes/index.routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/", route);

export = app;
