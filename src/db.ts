import { Sequelize } from "sequelize";
import { defineUserModel } from "./models/UserModel.js";
import { definePostulationsModel } from "./models/PostulationsModel.js";
import { databaseUrl } from "./config/config.js";

if (!databaseUrl) {
  throw new Error("Database URL is not defined. Check your configuration.");
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  define: {
    timestamps: true,
  },
});

const models = {
  User: defineUserModel(sequelize),
  Postulations: definePostulationsModel(sequelize),
};

models.User.hasMany(models.Postulations, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
models.Postulations.belongsTo(models.User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default { models, sequelize };
