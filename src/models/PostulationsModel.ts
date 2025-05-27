import { DataTypes, Sequelize } from "sequelize";

export function definePostulationsModel(sequelize: Sequelize) {
  const Postulation = sequelize.define("Postulations", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    applicationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    sendEmail: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    sendCv: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    recruiterContact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  return Postulation;
}

export default definePostulationsModel;
