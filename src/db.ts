import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { defineUserModel } from "./models/UserModel";
import { definePostulationsModel } from "./models/PostulationsModel";

dotenv.config();

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = process.env;

const sequelize = new Sequelize({
  host: DB_HOST,
  dialect: "postgres",
  username: DB_USER,
  password:DB_PASSWORD,
  database: DB_NAME,
  port: parseInt(`${DB_PORT}`)
});

const models = {
  User: defineUserModel(sequelize),
  Postulations: definePostulationsModel(sequelize),
};

// Relación de muchos a muchos entre User y Postulations
models.User.hasMany(models.Postulations, {
  foreignKey: 'userId',
});
models.Postulations.belongsTo(models.User, {
  foreignKey: 'userId',
});

export default { models, sequelize };
