import db from "../../db";
import { Model } from "sequelize";
import { PostulationsModelInterface } from "../../models/modelTypes";
import { ReqPostBody } from "./interface";
const { Postulations, User } = db.models;

export const postPostulationService= async (body: ReqPostBody) => {
  const {
    date,
    position,
    company,
    trough,
    userId,
    status,
    description,
    sendCv,
    sendEmail,
    recruiterContact,
  } = body;

  try {
    const findUserId = await User.findByPk(userId);
    if (!findUserId) throw new Error("user not found");

    const data = await Postulations.create({
      date,
      position,
      company,
      trough,
      userId,
      status,
      description,
      sendCv,
      sendEmail,
      recruiterContact,
    });

    return data ? data : "withouth data";
  } catch (error) {
    throw error;
  }
};

export const getAllPostulationsService = async (userId: string, filters: any) => {
  try {
    const whereClause: any = {};
    whereClause.userId = userId;
    if (filters.date) whereClause.date = filters.date;
    if (filters.position) whereClause.position = filters.position;
    if (filters.company) whereClause.company = filters.company;
    if (filters.trough) whereClause.trough = filters.trough;
    if (filters.status) whereClause.status = filters.status;
    if (filters.description) whereClause.description = filters.description;
    if (filters.sendCv !== undefined)
      whereClause.sendCv = filters.sendCv === "true";
    if (filters.sendEmail !== undefined)
      whereClause.sendEmail = filters.sendEmail === "true";
    console.log("Where Clause:", whereClause);
    const data = await Postulations.findAll({ where: whereClause });

    return data ? data : "withouth data";
  } catch (error) {
    throw error;
  }
};

export const getPostulationByIdService = async (postulationId: string) => {
  try {
    const data = await Postulations.findByPk(postulationId);

    return data ? data : "Postulation not Found";
  } catch (error) {
    throw error;
  }
};

export const updatePostulationService = async (postulationId: string, data: object) => {
  try {
    const postulation = await Postulations.findByPk(postulationId);
    if (!postulation) throw new Error("Postulation not found");

    await postulation.update(data);

    return postulation;
  } catch (error) {
    throw error;
  }
};

export const deletePostulationService = async (id: string) => {
  try {
    await Postulations.destroy({ where: { id } });
    return "Postulation delete";
  } catch (error) {
    throw error;
  }
};
