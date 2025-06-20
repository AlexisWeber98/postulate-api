import { app } from "./app.js";
import db from "./db.js";
import { setupSwagger } from "./config/swagger.js";
import { serverPort } from "./config/config.js";

const port =
  typeof serverPort === "string" ? parseInt(serverPort, 10) : serverPort;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida con éxito.");
    return db.sequelize.sync({ force: false });
  })
  .then(() => {
    setupSwagger(app);
    app.listen(port, "0.0.0.0", () => {
      console.log(
        `Servidor y base de datos sincronizados y escuchando en el puerto ${serverPort}`,
      );
    });
  })
  .catch((err: Error) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });
