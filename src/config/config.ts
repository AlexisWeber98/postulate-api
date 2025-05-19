import dotenv from "dotenv";

const config = dotenv.config();

export const serverPort = process.env.SERVER_PORT;
export const dbName = process.env.DB_NAME;
export const dbHost = process.env.DB_HOST;
export const dbPassword = process.env.DB_PASSWORD;
export const dbPort = process.env.DB_PORT;
export const dbUser = process.env.DB_USER;
