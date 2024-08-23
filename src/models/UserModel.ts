import { DataTypes, Sequelize } from "sequelize";
import { UUIDV4 } from "sequelize";

export function defineUserModel(sequelize: Sequelize) {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
}
