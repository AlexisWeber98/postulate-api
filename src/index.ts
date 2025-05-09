import { app } from "./app.js";
import db from "./db.js";
import { setupSwagger } from "./config/swagger.js";
import dotenv from "dotenv";

const config = dotenv.config();

const serverPort = process.env.SERVER_PORT || "6001";

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida con éxito.");
    return db.sequelize.sync({ force: false });
  })
  .then(() => {
    setupSwagger(app);
    app.listen(parseInt(serverPort), "0.0.0.0", () => {
      console.log(
        `Servidor y base de datos sincronizados y escuchando en el puerto ${serverPort}`,
      );
    });
  })
  .catch((err: Error) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });
