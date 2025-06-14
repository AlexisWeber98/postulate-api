import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Postulate-API",
      version: "1.0.0",
      description: "API documentation for Postulate",
    },
    servers: [
      {
        url: "http://localhost:6001",
        description: "Development local server",
      },
      {
        url: "https://api-postulate.alexisweber.com",
        description: "Production server",
      }
    ],
  },
  apis: ["./src/modules/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express): void => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
