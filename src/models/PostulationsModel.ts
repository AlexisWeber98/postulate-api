import { DataTypes, Sequelize } from "sequelize";

enum StatusPostulation {
  Pending = "Pending Response",
  FirstInterview = "First Interview",
  SecondInterview = "Second Interview",
  TechInterview = "Technical Interview",
  Rejected = "Rejected",
  Accepted = "Accepted",
}

export function definePostulationsModel(sequelize: Sequelize) {
  const Postulation = sequelize.define("Postulations", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
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
    trough: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: StatusPostulation.Pending,
      validate: {
        isIn: [Object.values(StatusPostulation)], //asegura que el valor del enum sea válido
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    send_email: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    send_cv: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    recruiter_contact: {
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
