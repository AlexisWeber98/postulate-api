import { Sequelize } from "sequelize";
import { defineUserModel } from "./models/UserModel.js";
import { definePostulationsModel } from "./models/PostulationsModel.js";

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = process.env;

const sequelize = new Sequelize({
  host: DB_HOST,
  dialect: "postgres",
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: parseInt(`${DB_PORT}`),
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
