import { app } from "./app.js";
import db from "./db.js";

const serverPort = process.env.SERVER_PORT || "3001";

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida con éxito.");
    return db.sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(parseInt(serverPort, 10), () => {
      console.log(
        `Servidor y base de datos sincronizados y escuchando en el puerto ${serverPort}`,
      );
    });
  })
  .catch((err: Error) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });
