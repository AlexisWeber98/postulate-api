import dotenv from "dotenv";
import app from "./app";
import db from "./db";

dotenv.config();

const { SERVER_PORT } = process.env;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida con éxito.");
    return db.sequelize.sync({ force: false});
  })
  .then(() => {
    app.listen("3001", () => {
      console.log(
        `Servidor y base de datos sincronizados y escuchando en el puerto ${SERVER_PORT}`
      );
    });
  })
  .catch((err: Error) =>
    console.error("No se pudo conectar a la base de datos:", err)
  );
