import { Sequelize } from "sequelize";
import { defineUserModel } from "./models/UserModel.js";
import { definePostulationsModel } from "./models/PostulationsModel.js";
import { dbName, dbHost, dbPassword, dbPort, dbUser } from "./config/config.js";

const sequelize = new Sequelize({
  host: dbHost,
  dialect: "postgres",
  username: dbUser,
  password: dbPassword,
  database: dbName,
  port: parseInt(`${dbPort}`),
});

const models = {
  User: defineUserModel(sequelize),
  Postulations: definePostulationsModel(sequelize),
};

models.User.hasMany(models.Postulations, {
  foreignKey: "userId",
});
models.Postulations.belongsTo(models.User, {
  foreignKey: "userId",
});

export default { models, sequelize };
