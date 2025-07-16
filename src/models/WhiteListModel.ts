import { DataTypes, Sequelize } from "sequelize";

export const defineWhiteListModel = (sequelize: Sequelize) => {
  return sequelize.define("WhiteList", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    registeredAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
};
