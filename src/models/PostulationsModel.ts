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
            type: DataTypes.STRING,
            references: {
                model: 'Users', // Nombre de la tabla de usuarios
                key: 'id'
            },
            allowNull: false
        },
    })

  return Postulation;
}

export default definePostulationsModel;
